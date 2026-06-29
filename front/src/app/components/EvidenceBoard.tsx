import { useState } from "react";
import { useAuth, API_URL } from "../context/AuthContext";

export default function EvidenceBoard() {
  const { token, updateLocalUserStats } = useAuth();
  const [unlockedEvidence, setUnlockedEvidence] = useState<number[]>([1]);
  const [selectedEvidence, setSelectedEvidence] = useState<number | null>(null);

  const evidence = [
    {
      id: 1,
      title: "HTML & CSS",
      icon: "🔖",
      status: "Available",
      desc: "Reconstruct crime scene reports",
      details: "Learn the fundamentals by rebuilding corrupted evidence files. Master layouts, styling, and responsive design while piecing together witness statements.",
      challenges: 12,
      duration: "8 hours"
    },
    {
      id: 2,
      title: "JavaScript",
      icon: "🔐",
      status: "Locked",
      desc: "Decrypt suspect communications",
      details: "Unlock encrypted messages using JavaScript. Learn variables, functions, loops, and DOM manipulation to crack coded communications.",
      challenges: 18,
      duration: "12 hours"
    },
    {
      id: 3,
      title: "React.js",
      icon: "🗂️",
      status: "Locked",
      desc: "Build detective dashboard",
      details: "Create an interactive investigation dashboard using React components, hooks, and state management to track suspects and evidence.",
      challenges: 15,
      duration: "14 hours"
    },
    {
      id: 4,
      title: "Node.js & Express",
      icon: "🖥️",
      status: "Locked",
      desc: "Access secure servers",
      details: "Build backend APIs to access police databases. Learn server-side programming, routing, and middleware to retrieve classified information.",
      challenges: 16,
      duration: "10 hours"
    },
    {
      id: 5,
      title: "MongoDB",
      icon: "💾",
      status: "Locked",
      desc: "Query hidden databases",
      details: "Investigate suspect records using database queries. Master CRUD operations, schemas, and data relationships to find inconsistencies.",
      challenges: 14,
      duration: "10 hours"
    },
    {
      id: 6,
      title: "Full Stack",
      icon: "⚡",
      status: "Locked",
      desc: "Reveal the killer",
      details: "Combine all skills to build a complete case management system. The final project unlocks the identity of the murderer.",
      challenges: 20,
      duration: "16 hours"
    },
  ];

  const handleEvidenceClick = (id: number) => {
    if (unlockedEvidence.includes(id)) {
      setSelectedEvidence(id);
    }
  };

  const handleUnlock = async (id: number, title: string) => {
    if (id > 1 && unlockedEvidence.includes(id - 1)) {
      setUnlockedEvidence([...unlockedEvidence, id]);

      if (token) {
        try {
          const res = await fetch(`${API_URL}/user/activity`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              type: "evidence_found",
              description: `Unlocked Investigation Phase: ${title}`,
              xp: 15,
            }),
          });
          const data = await res.json();
          if (res.ok && data.user) {
            updateLocalUserStats(data.user);
          }
        } catch (err) {
          console.error("Error logging unlock activity:", err);
        }
      }
    }
  };

  const handleStartPhase = async (id: number, title: string) => {
    setSelectedEvidence(null);

    if (token) {
      try {
        const res = await fetch(`${API_URL}/user/activity`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: "case_solved",
            description: `Solved Case Challenge in Phase: ${title}`,
            xp: 50,
          }),
        });
        const data = await res.json();
        if (res.ok && data.user) {
          updateLocalUserStats(data.user);
        }
      } catch (err) {
        console.error("Error logging case solve activity:", err);
      }
    }
  };

  const selectedItem = evidence.find(e => e.id === selectedEvidence);

  return (
    <section id="evidence" className="py-20 px-6 bg-[#0a0a0f] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#e8e6e3] mb-4 font-serif italic">
            Investigation Phases
          </h2>
          <div className="w-32 h-1 bg-[#8b0000] mx-auto mb-6"></div>
          <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto">
            Six critical phases stand between you and the truth.
            Complete each investigation module to unlock the next piece of evidence.
          </p>
        </div>

        {/* Evidence Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evidence.map((item) => {
            const isUnlocked = unlockedEvidence.includes(item.id);
            const canUnlock = item.id > 1 && unlockedEvidence.includes(item.id - 1);

            return (
              <div
                key={item.id}
                onClick={() => handleEvidenceClick(item.id)}
                className={`bg-[#16161d] border border-[#8b0000]/50 p-6 transition-all duration-300 group relative overflow-hidden ${
                  isUnlocked ? 'hover:border-[#8b0000] hover:shadow-lg hover:shadow-[#8b0000]/20 cursor-pointer' : 'opacity-50'
                }`}
              >
                {/* Evidence Number */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-[#8b0000]/20 border border-[#8b0000] flex items-center justify-center">
                  <span className="text-[#8b0000] font-mono">#{item.id}</span>
                </div>

                {/* Lock Overlay */}
                {!isUnlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0f]/80 backdrop-blur-sm">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🔒</div>
                      {canUnlock && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnlock(item.id, item.title);
                          }}
                          className="text-sm text-[#8b0000] border border-[#8b0000] px-3 py-1 hover:bg-[#8b0000] hover:text-[#e8e6e3] transition-all"
                        >
                          Unlock Phase
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`text-5xl mb-4 transition-all duration-300 ${isUnlocked ? 'filter-none' : 'filter grayscale'} ${isUnlocked && 'group-hover:scale-110'}`}>
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl text-[#e8e6e3] mb-2 font-mono">{item.title}</h3>

                {/* Description */}
                <p className="text-[#9ca3af] mb-4 min-h-[3rem]">{item.desc}</p>

                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span className={`text-sm border px-3 py-1 font-mono ${
                    isUnlocked ? 'text-[#8b0000] border-[#8b0000]' : 'text-[#9ca3af] border-[#9ca3af]'
                  }`}>
                    {isUnlocked ? item.status : 'Locked'}
                  </span>
                  {isUnlocked && (
                    <span className="text-[#9ca3af] text-sm group-hover:text-[#8b0000] transition-colors">
                      →
                    </span>
                  )}
                </div>

                {/* Hover Effect */}
                {isUnlocked && (
                  <div className="absolute inset-0 bg-[#8b0000]/0 group-hover:bg-[#8b0000]/5 transition-all duration-300 pointer-events-none"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Evidence Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
            <div className="bg-[#16161d] border-2 border-[#8b0000] max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedEvidence(null)}
                className="absolute top-4 right-4 text-[#9ca3af] hover:text-[#e8e6e3] text-2xl"
              >
                ✕
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-6xl">{selectedItem.icon}</div>
                  <div>
                    <div className="border-2 border-[#8b0000] bg-[#0a0a0f] px-3 py-1 mb-2 inline-block">
                      <p className="text-[#8b0000] tracking-widest font-mono text-xs">PHASE #{selectedItem.id}</p>
                    </div>
                    <h3 className="text-3xl text-[#e8e6e3] font-serif italic">{selectedItem.title}</h3>
                  </div>
                </div>
                <p className="text-[#9ca3af] text-lg leading-relaxed">{selectedItem.details}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0a0a0f] border border-[#8b0000]/30 p-4">
                  <p className="text-[#8b0000] text-sm mb-1 font-mono">CHALLENGES</p>
                  <p className="text-[#e8e6e3] text-2xl">{selectedItem.challenges}</p>
                </div>
                <div className="bg-[#0a0a0f] border border-[#8b0000]/30 p-4">
                  <p className="text-[#8b0000] text-sm mb-1 font-mono">DURATION</p>
                  <p className="text-[#e8e6e3] text-2xl">{selectedItem.duration}</p>
                </div>
              </div>

              <button 
                onClick={() => handleStartPhase(selectedItem.id, selectedItem.title)}
                className="w-full py-4 bg-[#8b0000] text-[#e8e6e3] hover:bg-[#a00000] transition-all duration-300 uppercase tracking-wider"
              >
                Start Phase {selectedItem.id}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(#8b0000 1px, transparent 1px), linear-gradient(90deg, #8b0000 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
    </section>
  );
}
