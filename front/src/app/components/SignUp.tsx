import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters long");
    }

    setIsLoading(true);
    const result = await signup(username, email, password);
    setIsLoading(false);

    if (result.success) {
      navigate("/profile");
    } else {
      setError(result.error || "Failed to create account.");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-[#0a0a0f] relative overflow-hidden px-4">
      {/* Noir Blood-red Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8b0000]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#8b0000]/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Forensic / Case File Outline Container */}
      <div className="w-full max-w-md bg-[#16161d] border border-[#8b0000]/40 rounded-lg shadow-2xl shadow-red-950/20 relative overflow-hidden transition-all duration-300 hover:border-[#8b0000]/80">
        
        {/* Top classified folder tab decorator */}
        <div className="absolute top-0 right-0 bg-[#8b0000] text-[#e8e6e3] text-[10px] font-mono px-3 py-1 uppercase tracking-widest rounded-bl">
          ENLISTMENT
        </div>

        <div className="p-8">
          <div className="text-center mb-6 mt-4">
            <h2 className="text-3xl font-serif italic text-[#e8e6e3] tracking-wide">
              Detective Enlistment
            </h2>
            <div className="w-20 h-[2px] bg-[#8b0000] mx-auto mt-3"></div>
            <p className="text-[#9ca3af] text-sm mt-3 font-mono">
              CREATE YOUR CRIME LAB BADGE
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-950/30 border-l-4 border-[#8b0000] text-[#e8e6e3] text-sm font-mono flex items-start gap-2">
              <span className="text-[#8b0000]">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-[#9ca3af] font-mono uppercase tracking-wider mb-2">
                CODENAME / USERNAME
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#0a0a0f] border border-[#8b0000]/30 text-[#e8e6e3] px-4 py-2.5 rounded focus:outline-none focus:border-[#8b0000] transition-all font-mono placeholder:text-gray-700"
                placeholder="e.g. Sherlock_Coder"
              />
            </div>

            <div>
              <label className="block text-xs text-[#9ca3af] font-mono uppercase tracking-wider mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0a0a0f] border border-[#8b0000]/30 text-[#e8e6e3] px-4 py-2.5 rounded focus:outline-none focus:border-[#8b0000] transition-all font-mono placeholder:text-gray-700"
                placeholder="detective@codedetective.org"
              />
            </div>

            <div>
              <label className="block text-xs text-[#9ca3af] font-mono uppercase tracking-wider mb-2">
                CLASSIFIED KEY / PASSWORD
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0a0f] border border-[#8b0000]/30 text-[#e8e6e3] px-4 py-2.5 rounded focus:outline-none focus:border-[#8b0000] transition-all font-mono placeholder:text-gray-700"
                placeholder="Min 6 characters"
              />
            </div>

            <div>
              <label className="block text-xs text-[#9ca3af] font-mono uppercase tracking-wider mb-2">
                CONFIRM CLASSIFIED KEY
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#0a0a0f] border border-[#8b0000]/30 text-[#e8e6e3] px-4 py-2.5 rounded focus:outline-none focus:border-[#8b0000] transition-all font-mono placeholder:text-gray-700"
                placeholder="Re-enter password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#8b0000] hover:bg-[#a00000] active:bg-[#700000] text-[#e8e6e3] font-mono text-sm tracking-wider uppercase transition-all border border-[#8b0000] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-[#e8e6e3] border-t-transparent rounded-full"></span>
                  ENLISTING...
                </>
              ) : (
                "ENLIST IN THE FORCE"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#8b0000]/20 text-center">
            <p className="text-xs text-[#9ca3af] font-mono">
              ALREADY ON THE FORCE?{" "}
              <Link
                to="/login"
                className="text-[#8b0000] hover:text-[#a00000] underline font-bold ml-1 transition-all"
              >
                DECRYPT DOSSIER (LOG IN)
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
