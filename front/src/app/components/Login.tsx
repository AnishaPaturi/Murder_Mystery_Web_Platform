import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [mfaRequired, setMfaRequired] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, verifyMfa, devLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (mfaRequired) {
      // MFA Verification Step
      const result = await verifyMfa(email, mfaCode);
      setIsLoading(false);

      if (result.success) {
        navigate("/profile");
      } else {
        setError(result.error || "MFA decryption key is incorrect or expired.");
      }
    } else {
      // Step 1: Normal Login
      const result = await login(email, password);
      setIsLoading(false);

      if (result.success) {
        if (result.mfaRequired) {
          setMfaRequired(true);
        } else {
          navigate("/profile");
        }
      } else {
        setError(result.error || "Failed to login. Please try again.");
      }
    }
  };

  const handleDevBypass = async () => {
    setError("");
    setIsLoading(true);
    const result = await devLogin();
    setIsLoading(false);

    if (result.success) {
      navigate("/profile");
    } else {
      setError(result.error || "Failed to trigger Dev bypass login.");
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
          {mfaRequired ? "MFA VERIFICATION" : "CASE ACCESS"}
        </div>

        <div className="p-8">
          <div className="text-center mb-8 mt-4">
            <h2 className="text-3xl font-serif italic text-[#e8e6e3] tracking-wide">
              {mfaRequired ? "MFA Decryption Key" : "Access Dossier"}
            </h2>
            <div className="w-20 h-[2px] bg-[#8b0000] mx-auto mt-3"></div>
            <p className="text-[#9ca3af] text-sm mt-3 font-mono">
              {mfaRequired ? "ENTER 6-DIGIT SECURITY OTP" : "ENTER DETECTIVE CREDENTIALS"}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-950/30 border-l-4 border-[#8b0000] text-[#e8e6e3] text-sm font-mono flex items-start gap-2">
              <span className="text-[#8b0000]">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!mfaRequired ? (
              <>
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
                    placeholder="detective@bytesofwrath.org"
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
              </>
            ) : (
              <>
                <div className="bg-[#0a0a0f] border border-[#8b0000]/30 p-4 rounded text-xs font-mono text-[#9ca3af] mb-4">
                  <span className="text-[#8b0000] font-bold block mb-1">🚨 MFA TRIGGERED</span>
                  A 6-digit security code has been logged to your **backend console log** (Simulated SMS/Email delivery). Enter it below to authorize.
                </div>
                <div>
                  <label className="block text-xs text-[#9ca3af] font-mono uppercase tracking-wider mb-2">
                    6-DIGIT CODE
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    pattern="[0-9]{6}"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-[#0a0a0f] border border-[#8b0000]/30 text-[#e8e6e3] text-center text-2xl tracking-widest px-4 py-3 rounded focus:outline-none focus:border-[#8b0000] transition-all font-mono placeholder:text-gray-700"
                    placeholder="000000"
                  />
                </div>
              </>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#8b0000] hover:bg-[#a00000] active:bg-[#700000] text-[#e8e6e3] font-mono text-sm tracking-wider uppercase transition-all border border-[#8b0000] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-[#e8e6e3] border-t-transparent rounded-full"></span>
                    {mfaRequired ? "VERIFYING KEY..." : "DECRYPTING..."}
                  </>
                ) : (
                  mfaRequired ? "AUTHORIZE ENTRY" : "DECRYPT DOSSIER"
                )}
              </button>

              {!mfaRequired && (
                <button
                  type="button"
                  onClick={handleDevBypass}
                  disabled={isLoading}
                  className="w-full py-2 bg-[#1a1a24] hover:bg-[#252535] text-[#8b0000] font-mono text-xs tracking-wider uppercase transition-all border border-[#8b0000]/30 rounded flex items-center justify-center gap-1.5"
                >
                  ⚡ QUICK DEV BYPASS (NO CREDENTIALS/MFA)
                </button>
              )}
            </div>

            {mfaRequired && (
              <button
                type="button"
                onClick={() => {
                  setMfaRequired(false);
                  setMfaCode("");
                  setError("");
                }}
                className="w-full text-center text-xs text-[#8b0000] hover:underline font-mono uppercase"
              >
                ← Back to credentials
              </button>
            )}
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
