import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#16161d]/95 backdrop-blur-sm border-b border-[#8b0000]/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#8b0000] flex items-center justify-center">
              <span className="text-xl">🔍</span>
            </div>
            <div>
              <h1 className="text-xl text-[#e8e6e3] font-serif italic">CodeDetective</h1>
              <p className="text-xs text-[#8b0000] font-mono">CASE #2026-042</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("home")} className="text-[#9ca3af] hover:text-[#8b0000] transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection("evidence")} className="text-[#9ca3af] hover:text-[#8b0000] transition-colors">
              Evidence
            </button>
            <button onClick={() => scrollToSection("suspects")} className="text-[#9ca3af] hover:text-[#8b0000] transition-colors">
              Suspects
            </button>
            <button onClick={() => scrollToSection("features")} className="text-[#9ca3af] hover:text-[#8b0000] transition-colors">
              Features
            </button>
            <button
              onClick={() => scrollToSection("evidence")}
              className="px-6 py-2 bg-[#8b0000] text-[#e8e6e3] hover:bg-[#a00000] transition-all duration-300 border border-[#8b0000]"
            >
              Start Investigation
            </button>
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
              <button onClick={() => scrollToSection("home")} className="text-[#9ca3af] hover:text-[#8b0000] transition-colors text-left">
                Home
              </button>
              <button onClick={() => scrollToSection("evidence")} className="text-[#9ca3af] hover:text-[#8b0000] transition-colors text-left">
                Evidence
              </button>
              <button onClick={() => scrollToSection("suspects")} className="text-[#9ca3af] hover:text-[#8b0000] transition-colors text-left">
                Suspects
              </button>
              <button onClick={() => scrollToSection("features")} className="text-[#9ca3af] hover:text-[#8b0000] transition-colors text-left">
                Features
              </button>
              <button
                onClick={() => scrollToSection("evidence")}
                className="px-6 py-2 bg-[#8b0000] text-[#e8e6e3] hover:bg-[#a00000] transition-all duration-300 border border-[#8b0000]"
              >
                Start Investigation
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
