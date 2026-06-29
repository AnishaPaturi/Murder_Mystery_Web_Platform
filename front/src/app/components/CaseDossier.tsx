import { Link } from "react-router-dom";

export default function CaseDossier() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e8e6e3] pt-24 pb-16 px-4 md:px-6 relative overflow-hidden">
      {/* Background noir glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8b0000]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#8b0000]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto bg-[#16161d] border border-[#8b0000]/40 rounded-lg shadow-2xl relative overflow-hidden">
        {/* Top folder tab style */}
        <div className="absolute top-0 right-0 bg-[#8b0000] text-[#e8e6e3] text-[11px] font-mono px-4 py-1.5 uppercase tracking-widest rounded-bl">
          FILE STATUS: RESTRICTED
        </div>

        {/* Dossier Header */}
        <div className="p-8 border-b border-[#8b0000]/30 mt-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-serif italic mb-2 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#e8e6e3] to-[#9ca3af]">
                Case Dossier: The Bytes of Wrath
              </h1>
              <p className="text-xs text-[#8b0000] font-mono tracking-widest uppercase">
                CRIME LOCATION: BYTECORP HQ MAIN FRAME
              </p>
            </div>
            <div className="bg-[#0a0a0f] border border-[#8b0000]/50 px-4 py-2 text-center rounded font-mono">
              <span className="text-[10px] text-[#9ca3af] block uppercase">Case ID</span>
              <span className="text-sm text-[#e8e6e3] font-bold">#2026-042</span>
            </div>
          </div>
        </div>

        {/* Dossier Content */}
        <div className="p-8 space-y-8 font-mono text-sm leading-relaxed">
          {/* Section 1: The Victim */}
          <div className="space-y-4">
            <h3 className="text-lg text-[#8b0000] border-b border-[#8b0000]/30 pb-2 flex items-center gap-2">
              <span>💀</span> THE VICTIM
            </h3>
            <div className="bg-[#0a0a0f] p-4 border border-[#8b0000]/20 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[#9ca3af]">FULL NAME:</p>
                <p className="text-[#e8e6e3] text-base font-semibold font-sans">Arthur Pendelton</p>
              </div>
              <div>
                <p className="text-xs text-[#9ca3af]">TITLE:</p>
                <p className="text-[#e8e6e3] text-base font-semibold font-sans">Chief Systems Architect, ByteCorp</p>
              </div>
              <div>
                <p className="text-xs text-[#9ca3af]">TIME OF INCIDENT:</p>
                <p className="text-[#e8e6e3] text-base font-semibold font-sans">June 28, 2026 | ~9:15 PM</p>
              </div>
              <div>
                <p className="text-xs text-[#9ca3af]">CAUSE OF DEATH:</p>
                <p className="text-[#e8e6e3] text-base font-semibold font-sans text-red-500">Asphyxiation (Ventilation Lock-down)</p>
              </div>
            </div>
          </div>

          {/* Section 2: Summary of Crime */}
          <div className="space-y-3">
            <h3 className="text-lg text-[#8b0000] border-b border-[#8b0000]/30 pb-2 flex items-center gap-2">
              <span>🔎</span> SYSTEM ANALYSIS & CRIME BREIF
            </h3>
            <p className="text-[#9ca3af]">
              Arthur was found deceased inside the secure server mainframe cabinet. Environmental control logs were compromised, locking him in while a remote script initiated a full CPU thermal fire, consuming the oxygen.
            </p>
            <p className="text-[#9ca3af]">
              The culprit deleted the secondary security database and scrambled the frontend monitor layouts to delay detection. The case requires a developer with full-stack skills to reconstruct the database logs and ciphers to expose the real killer.
            </p>
          </div>

          {/* Section 3: The Suspects */}
          <div className="space-y-4">
            <h3 className="text-lg text-[#8b0000] border-b border-[#8b0000]/30 pb-2 flex items-center gap-2">
              <span>👥</span> THE PRIMARY SUSPECTS
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#0a0a0f] border border-[#8b0000]/20 p-4 hover:border-[#8b0000] transition-colors">
                <span className="text-xs bg-[#8b0000] text-white px-2 py-0.5 rounded">SARAH CHEN (CTO)</span>
                <p className="mt-2 text-xs text-[#9ca3af]">MOTIVE: Admin rights to the physical servers and overrides. Badge swiped at the room at 9:15 PM.</p>
              </div>
              <div className="bg-[#0a0a0f] border border-[#8b0000]/20 p-4 hover:border-[#8b0000] transition-colors">
                <span className="text-xs bg-[#b45f00] text-white px-2 py-0.5 rounded">MARCUS WEBB (Lead Dev)</span>
                <p className="mt-2 text-xs text-[#9ca3af]">MOTIVE: Denied Principal promotion recommended by Arthur. Arguing over code commits.</p>
              </div>
              <div className="bg-[#0a0a0f] border border-[#8b0000]/20 p-4 hover:border-[#8b0000] transition-colors">
                <span className="text-xs bg-[#8b0000] text-white px-2 py-0.5 rounded">ELENA RODRIGUEZ (Security Analyst)</span>
                <p className="mt-2 text-xs text-[#9ca3af]">MOTIVE: Holds environmental bypass keys. VPN logs show suspicious API connections at 9:20 PM.</p>
              </div>
              <div className="bg-[#0a0a0f] border border-[#8b0000]/20 p-4 hover:border-[#8b0000] transition-colors">
                <span className="text-xs bg-gray-600 text-white px-2 py-0.5 rounded">JAMES PARKER (Product Manager)</span>
                <p className="mt-2 text-xs text-[#9ca3af]">MOTIVE: Budget disputes. Deceased vetoed a high-cost project funding allocation.</p>
              </div>
            </div>
          </div>

          {/* Section 4: MERN Curriculum Alignment */}
          <div className="space-y-4">
            <h3 className="text-lg text-[#8b0000] border-b border-[#8b0000]/30 pb-2 flex items-center gap-2">
              <span>📖</span> DETECTIVE SYLLABUS (MERN CURRICULUM)
            </h3>
            <div className="space-y-3 font-sans text-sm text-[#9ca3af]">
              <div className="flex gap-3">
                <span className="text-[#8b0000] font-mono font-bold">HTML & CSS:</span>
                <span>Rebuild Arthur's corrupted scene monitor interface layout using semantic tags and flex alignment.</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[#8b0000] font-mono font-bold">JavaScript:</span>
                <span>Write cipher functions to decode suspect chat histories and loop arrays to find anomalies.</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[#8b0000] font-mono font-bold">React.js:</span>
                <span>Construct the reactive clue board linking suspects to physical evidence dynamically.</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[#8b0000] font-mono font-bold">Express & Node:</span>
                <span>Expose API endpoints to request case logs securely using customized authentication middleware.</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[#8b0000] font-mono font-bold">MongoDB:</span>
                <span>Store the database logs and query server entries to find the exact timeline matches.</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="p-8 border-t border-[#8b0000]/30 bg-[#0a0a0f]/50 text-center space-y-4">
          <p className="text-xs text-[#9ca3af] font-mono">
            ONLY CODING SKILLS CAN BYPASS THE SECURITY FIREWALL AND REVEAL THE CULPRIT.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/evidence"
              className="px-6 py-2.5 bg-[#8b0000] text-[#e8e6e3] hover:bg-[#a00000] font-mono text-xs uppercase tracking-wider transition-all border border-[#8b0000]"
            >
              Analyze Evidence
            </Link>
            <Link
              to="/suspects"
              className="px-6 py-2.5 bg-transparent border border-[#8b0000] text-[#e8e6e3] hover:bg-[#8b0000]/20 font-mono text-xs uppercase tracking-wider transition-all"
            >
              Interrogate Suspects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
