import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#16161d]/95 backdrop-blur-sm border-b border-[#8b0000]/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-[#8b0000] flex items-center justify-center">
              <span className="text-xl">🔍</span>
            </div>
            <div>
              <h1 className="text-xl text-[#e8e6e3] font-serif italic">CodeDetective</h1>
              <p className="text-xs text-[#8b0000] font-mono">CASE #2026-042</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-[#9ca3af] hover:text-[#8b0000] transition-colors">
              Home
            </Link>
            <Link to="/evidence" className="text-[#9ca3af] hover:text-[#8b0000] transition-colors">
              Evidence
            </Link>
            <Link to="/suspects" className="text-[#9ca3af] hover:text-[#8b0000] transition-colors">
              Suspects
            </Link>
            <Link to="/features" className="text-[#9ca3af] hover:text-[#8b0000] transition-colors">
              Features
            </Link>
            <Link to="/story" className="text-[#9ca3af] hover:text-[#8b0000] transition-colors font-mono">
              Case Brief
            </Link>
            {user ? (
              <div className="flex items-center gap-6">
                <Link to="/profile" className="text-[#e8e6e3] hover:text-[#8b0000] transition-colors font-mono text-sm flex items-center gap-1.5 border border-[#8b0000]/30 px-3 py-1 rounded bg-red-950/10">
                  <span>🕵️‍♂️</span> {user.username}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-[#8b0000] text-[#8b0000] hover:bg-[#8b0000] hover:text-[#e8e6e3] font-mono text-xs uppercase tracking-wider transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link to="/login" className="text-[#9ca3af] hover:text-[#8b0000] transition-colors font-mono text-sm">
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-6 py-2 bg-[#8b0000] text-[#e8e6e3] hover:bg-[#a00000] transition-all duration-300 border border-[#8b0000] font-mono text-sm tracking-wider uppercase"
                >
                  Enlist
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#e8e6e3]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-[#8b0000]/50">
            <div className="flex flex-col gap-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-[#9ca3af] hover:text-[#8b0000] transition-colors text-left py-1">
                Home
              </Link>
              <Link to="/evidence" onClick={() => setIsMenuOpen(false)} className="text-[#9ca3af] hover:text-[#8b0000] transition-colors text-left py-1">
                Evidence
              </Link>
              <Link to="/suspects" onClick={() => setIsMenuOpen(false)} className="text-[#9ca3af] hover:text-[#8b0000] transition-colors text-left py-1">
                Suspects
              </Link>
              <Link to="/features" onClick={() => setIsMenuOpen(false)} className="text-[#9ca3af] hover:text-[#8b0000] transition-colors text-left py-1">
                Features
              </Link>
              <Link to="/story" onClick={() => setIsMenuOpen(false)} className="text-[#9ca3af] hover:text-[#8b0000] transition-colors text-left py-1 font-mono">
                Case Brief
              </Link>
              
              {user ? (
                <div className="flex flex-col gap-3 pt-2 border-t border-[#8b0000]/20">
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="text-[#e8e6e3] font-mono text-sm py-1">
                    🕵️‍♂️ Profile: {user.username}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center py-2 bg-transparent border border-[#8b0000] text-[#8b0000] font-mono text-sm uppercase"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-2 border-t border-[#8b0000]/20">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-center py-2 text-[#9ca3af] border border-[#8b0000]/30 font-mono text-sm">
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-center py-2 bg-[#8b0000] text-[#e8e6e3] font-mono text-sm uppercase"
                  >
                    Enlist
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

