import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import EvidenceBoard from "./components/EvidenceBoard";
import SuspectProfiles from "./components/SuspectProfiles";
import Features from "./components/Features";
import ProgressTracker from "./components/ProgressTracker";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <Hero />
      <EvidenceBoard />
      <SuspectProfiles />
      <ProgressTracker />
      <Features />

      {/* Footer */}
      <footer className="bg-[#16161d] border-t border-[#8b0000]/50 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-2xl text-[#e8e6e3] font-serif italic mb-2">CodeDetective</h3>
            <p className="text-[#9ca3af] font-mono text-sm">CASE #2026-042 | CLASSIFIED</p>
          </div>
          <div className="flex justify-center gap-8 mb-6 text-[#9ca3af]">
            <a href="#" className="hover:text-[#8b0000] transition-colors">About</a>
            <a href="#" className="hover:text-[#8b0000] transition-colors">Evidence</a>
            <a href="#" className="hover:text-[#8b0000] transition-colors">Contact</a>
            <a href="#" className="hover:text-[#8b0000] transition-colors">Privacy</a>
          </div>
          <div className="border-t border-[#8b0000]/30 pt-6">
            <p className="text-[#9ca3af] text-sm">
              © 2026 CodeDetective. All rights reserved. | Learn MERN by solving mysteries.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}