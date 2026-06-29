import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import EvidenceBoard from "./components/EvidenceBoard";
import SuspectProfiles from "./components/SuspectProfiles";
import Features from "./components/Features";
import ProgressTracker from "./components/ProgressTracker";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import CaseDossier from "./components/CaseDossier";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0a0a0f]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/evidence" element={<EvidenceBoard />} />
          <Route path="/suspects" element={<SuspectProfiles />} />
          <Route path="/features" element={<Features />} />
          <Route path="/progress" element={<ProgressTracker />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/story" element={<CaseDossier />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-[#16161d] border-t border-[#8b0000]/50 py-12 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-6">
              <h3 className="text-2xl text-[#e8e6e3] font-serif italic mb-2">CodeDetective</h3>
              <p className="text-[#9ca3af] font-mono text-sm">CASE #2026-042 | CLASSIFIED</p>
            </div>
            <div className="flex justify-center gap-8 mb-6 text-[#9ca3af]">
              <Link to="/" className="hover:text-[#8b0000] transition-colors">
                About
              </Link>
              <Link to="/evidence" className="hover:text-[#8b0000] transition-colors">
                Evidence
              </Link>
              <Link to="/suspects" className="hover:text-[#8b0000] transition-colors">
                Contact
              </Link>
              <Link to="/features" className="hover:text-[#8b0000] transition-colors">
                Privacy
              </Link>
            </div>
            <div className="border-t border-[#8b0000]/30 pt-6">
              <p className="text-[#9ca3af] text-sm">
                © 2026 CodeDetective. All rights reserved. | Learn MERN by solving mysteries.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}