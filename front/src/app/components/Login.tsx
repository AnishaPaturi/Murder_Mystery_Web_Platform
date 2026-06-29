import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      navigate("/profile");
    } else {
      setError(result.error || "Failed to login. Please try again.");
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
          CASE ACCESS
        </div>

        <div className="p-8">
          <div className="text-center mb-8 mt-4">
            <h2 className="text-3xl font-serif italic text-[#e8e6e3] tracking-wide">
              Access Dossier
            </h2>
            <div className="w-20 h-[2px] bg-[#8b0000] mx-auto mt-3"></div>
            <p className="text-[#9ca3af] text-sm mt-3 font-mono">
              ENTER DETECTIVE CREDENTIALS
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-950/30 border-l-4 border-[#8b0000] text-[#e8e6e3] text-sm font-mono flex items-start gap-2">
              <span className="text-[#8b0000]">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs text-[#9ca3af] font-mono uppercase tracking-wider mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0a0a0f] border border-[#8b0000]/30 text-[#e8e6e3] px-4 py-3 rounded focus:outline-none focus:border-[#8b0000] transition-all font-mono placeholder:text-gray-700"
                placeholder="detective@codedetective.org"
              />
            </div>

            <div>
              <label className="block text-xs text-[#9ca3af] font-mono uppercase tracking-wider mb-2">
                PASSWORD / CLASSIFIED KEY
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0a0f] border border-[#8b0000]/30 text-[#e8e6e3] px-4 py-3 rounded focus:outline-none focus:border-[#8b0000] transition-all font-mono placeholder:text-gray-700"
                placeholder="••••••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#8b0000] hover:bg-[#a00000] active:bg-[#700000] text-[#e8e6e3] font-mono text-sm tracking-wider uppercase transition-all border border-[#8b0000] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-[#e8e6e3] border-t-transparent rounded-full"></span>
                  DECRYPTING...
                </>
              ) : (
                "DECRYPT DOSSIER"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#8b0000]/20 text-center">
            <p className="text-xs text-[#9ca3af] font-mono">
              NEW DETECTIVE ON THE FORCE?{" "}
              <Link
                to="/signup"
                className="text-[#8b0000] hover:text-[#a00000] underline font-bold ml-1 transition-all"
              >
                ENLIST / SIGN UP
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
