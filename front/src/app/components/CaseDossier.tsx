import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, API_URL } from "../context/AuthContext";

interface CaseData {
  caseId: string;
  title: string;
  location: string;
  victim: {
    name: string;
    role: string;
    time: string;
    cause: string;
  };
  summary: string;
  additionalClues: string[];
}

export default function CaseDossier() {
  const { token } = useAuth();
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCaseBriefing = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/case`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setCaseData(data);
        } else {
          setError(data.message || "Failed to load case briefing.");
        }
      } catch (err) {
        setError("Error connecting to server. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };

    fetchCaseBriefing();
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="max-w-md bg-[#16161d] border border-[#8b0000]/40 p-8 text-center rounded-lg shadow-2xl">
          <div className="text-5xl mb-4">🚫</div>
          <h2 className="text-2xl font-serif italic text-[#e8e6e3] mb-4">CLASSIFIED CONTENT</h2>
          <p className="text-[#9ca3af] font-mono text-sm mb-6">
            You must be an enlisted detective on the force to access Arthur's mainframe files.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/login" className="px-5 py-2 bg-[#8b0000] text-[#e8e6e3] font-mono text-xs uppercase tracking-wider">
              Decrypt Login
            </Link>
            <Link to="/signup" className="px-5 py-2 border border-[#8b0000] text-[#8b0000] font-mono text-xs uppercase tracking-wider">
              Enlist
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <span className="animate-spin inline-block w-8 h-8 border-4 border-[#8b0000] border-t-transparent rounded-full"></span>
      </div>
    );
  }

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

        {error ? (
          <div className="p-8 text-center text-[#8b0000] font-mono mt-8">
            <span className="text-4xl mb-4 block">⚠️</span>
            {error}
          </div>
        ) : !caseData ? (
          <div className="p-8 text-center text-[#9ca3af] font-mono mt-8">
            NO DATA RETURNED FROM CRIME LAB.
          </div>
        ) : (
          <>
            {/* Dossier Header */}
            <div className="p-8 border-b border-[#8b0000]/30 mt-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-serif italic mb-2 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#e8e6e3] to-[#9ca3af]">
                    Case Dossier: {caseData.title}
                  </h1>
                  <p className="text-xs text-[#8b0000] font-mono tracking-widest uppercase">
                    CRIME LOCATION: {caseData.location}
                  </p>
                </div>
                <div className="bg-[#0a0a0f] border border-[#8b0000]/50 px-4 py-2 text-center rounded font-mono">
                  <span className="text-[10px] text-[#9ca3af] block uppercase">Case ID</span>
                  <span className="text-sm text-[#e8e6e3] font-bold">{caseData.caseId}</span>
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
                    <p className="text-[#e8e6e3] text-base font-semibold font-sans">{caseData.victim.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9ca3af]">TITLE:</p>
                    <p className="text-[#e8e6e3] text-base font-semibold font-sans">{caseData.victim.role}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9ca3af]">TIME OF INCIDENT:</p>
                    <p className="text-[#e8e6e3] text-base font-semibold font-sans">{caseData.victim.time}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9ca3af]">CAUSE OF DEATH:</p>
                    <p className="text-[#e8e6e3] text-base font-semibold font-sans text-red-500">{caseData.victim.cause}</p>
                  </div>
                </div>
              </div>

              {/* Section 2: Summary of Crime */}
              <div className="space-y-3">
                <h3 className="text-lg text-[#8b0000] border-b border-[#8b0000]/30 pb-2 flex items-center gap-2">
                  <span>🔎</span> SYSTEM ANALYSIS & CRIME BRIEF
                </h3>
                <p className="text-[#9ca3af]">{caseData.summary}</p>
              </div>

              {/* Section 3: Additional Clues */}
              <div className="space-y-3">
                <h3 className="text-lg text-[#8b0000] border-b border-[#8b0000]/30 pb-2 flex items-center gap-2">
                  <span>📌</span> PHYSICAL FORENSIC CLUES
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-[#9ca3af]">
                  {caseData.additionalClues.map((clue, idx) => (
                    <li key={idx}>{clue}</li>
                  ))}
                </ul>
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
          </>
        )}
      </div>
    </div>
  );
}
