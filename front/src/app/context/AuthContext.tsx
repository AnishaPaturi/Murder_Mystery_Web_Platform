import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  rank: string;
  currentPhase: string;
  completedChallenges: number;
  totalChallenges: number;
  badges: string[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; mfaRequired?: boolean; email?: string; error?: string }>;
  verifyMfa: (email: string, code: string) => Promise<{ success: boolean; error?: string }>;
  signup: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateLocalUserStats: (updatedFields: Partial<User>) => void;
  fetchUserProfile: () => Promise<void>;
  devLogin: () => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const API_URL = "http://localhost:5000/api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("detective_token"));
  const [loading, setLoading] = useState(true);

  // Fetch profile when token is available
  const fetchUserProfile = async () => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser({
          id: data._id,
          username: data.username,
          email: data.email,
          rank: data.rank,
          currentPhase: data.currentPhase,
          completedChallenges: data.completedChallenges,
          totalChallenges: data.totalChallenges,
          badges: data.badges,
        });
      } else {
        // Token might be invalid/expired
        logout();
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.message || "Login failed" };
      }

      if (data.mfaRequired) {
        return { success: true, mfaRequired: true, email: data.email };
      }

      localStorage.setItem("detective_token", data.token);
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: "Cannot connect to server. Is the backend running?" };
    }
  };

  const verifyMfa = async (email: string, code: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/verify-mfa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.message || "MFA verification failed" };
      }

      localStorage.setItem("detective_token", data.token);
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: "Cannot connect to server. Is the backend running?" };
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.message || "Signup failed" };
      }

      localStorage.setItem("detective_token", data.token);
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: "Cannot connect to server. Is the backend running?" };
    }
  };

  const devLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/dev-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.message || "Dev login failed" };
      }

      localStorage.setItem("detective_token", data.token);
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: "Cannot connect to server. Is the backend running?" };
    }
  };

  const logout = () => {
    localStorage.removeItem("detective_token");
    setToken(null);
    setUser(null);
  };

  const updateLocalUserStats = (updatedFields: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedFields });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        verifyMfa,
        signup,
        logout,
        updateLocalUserStats,
        fetchUserProfile,
        devLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
