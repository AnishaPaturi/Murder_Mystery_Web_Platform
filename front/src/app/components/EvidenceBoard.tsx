import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { useAuth, API_URL } from "../context/AuthContext";

interface Challenge {
  id: number;
  phaseId: number;
  title: string;
  tier: "HTML" | "CSS" | "JS" | "REACT" | "NODE" | "MONGODB";
  description: string;
  instructions: string;
  codeTemplate: string;
  hint: string;
  xp: number;
  isUnlocked: boolean;
  expectedPattern: string;
}

interface Clue {
  phaseId: number;
  title: string;
  isUnlocked: boolean;
  text: string;
}

interface RagChunk {
  title: string;
  content: string;
  source: string;
}

interface RagData {
  query: string;
  synthesized: string;
  chunks: RagChunk[];
}

export default function EvidenceBoard() {
  const { token, user, updateLocalUserStats } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [clues, setClues] = useState<Clue[]>([]);
  const [selectedChallengeId, setSelectedChallengeId] = useState<number | null>(null);
  const [codeSolution, setCodeSolution] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [validationSuccess, setValidationSuccess] = useState(false);
  const [newlyUnlockedClue, setNewlyUnlockedClue] = useState<Clue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // RAG State Variables
  const [activeModalTab, setActiveModalTab] = useState<"instructions" | "documentation">("documentation");
  const [ragData, setRagData] = useState<RagData | null>(null);
  const [ragLoading, setRagLoading] = useState(false);

  const selectedChallenge = challenges.find((c) => c.phaseId === selectedChallengeId);

  const fetchChallenges = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/challenges`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setChallenges(data);
      } else {
        setError(data.message || "Failed to load challenges.");
      }
    } catch (err) {
      setError("Error connecting to server. Is the backend running?");
    }
  };

  const fetchClues = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/case/clues`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setClues(data);
        return data;
      }
    } catch (err) {
      console.error("Error fetching clues:", err);
    }
  };

  const loadData = async () => {
    setLoading(true);
    await Promise.all([fetchChallenges(), fetchClues()]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [token]);

  // Fetch RAG synthesized tutorial based on the challenge topic
  const fetchRagData = async (phaseId: number) => {
    let queryTopic = "";
    switch (phaseId) {
      case 1: queryTopic = "HTML elements tags h1 div strong"; break;
      case 2: queryTopic = "JavaScript string manipulation split reverse join"; break;
      case 3: queryTopic = "React components props JSX destructuring"; break;
      case 4: queryTopic = "Express route routing handlers res.json"; break;
      case 5: queryTopic = "Mongoose model query find sort"; break;
      case 6: queryTopic = "JavaScript strict equality comparison"; break;
      default: queryTopic = "HTML elements";
    }

    setRagLoading(true);
    setRagData(null);

    try {
      const res = await fetch(`${API_URL}/rag?query=${encodeURIComponent(queryTopic)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setRagData(data);
      }
    } catch (err) {
      console.error("Error retrieving RAG documentation:", err);
    } finally {
      setRagLoading(false);
    }
  };

  const handleChallengeClick = (challenge: Challenge) => {
    if (challenge.isUnlocked) {
      setSelectedChallengeId(challenge.phaseId);
      setCodeSolution(challenge.codeTemplate);
      setValidationError("");
      setValidationSuccess(false);
      setActiveModalTab("documentation"); // default to documentation RAG view
      fetchRagData(challenge.phaseId); // fetch live documentation chunks
    }
  };

  const handleSolutionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !selectedChallengeId) return;

    setIsSubmitting(true);
    setValidationError("");
    setValidationSuccess(false);

    try {
      const res = await fetch(`${API_URL}/challenges/${selectedChallengeId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code: codeSolution }),
      });
      const data = await res.json();

      if (res.ok) {
        setValidationSuccess(true);
        // Play success confetti!
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
        
        // Update user progress in React Auth context
        if (data.user) {
          updateLocalUserStats(data.user);
        }
        
        // Reload challenges statuses
        await fetchChallenges();

        // Reload clues, and find the one we just unlocked to display as modal
        const freshClues = await fetchClues();
        if (freshClues) {
          const unlocked = freshClues.find((c: Clue) => c.phaseId === selectedChallengeId);
          if (unlocked && unlocked.isUnlocked) {
            // Trigger Clue Unlock modal popup!
            setTimeout(() => {
              setNewlyUnlockedClue(unlocked);
              setSelectedChallengeId(null); // Close code workspace modal
            }, 800);
          }
        }
      } else {
        setValidationError(data.message || "Compilation error. The code output did not pass test checks.");
      }
    } catch (err) {
      setValidationError("Failed to verify code. Please verify server connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper icons
  const getIcon = (tier: string) => {
    switch (tier) {
      case "HTML": return "🔖";
      case "CSS": return "🎨";
      case "JS": return "🔐";
      case "REACT": return "🗂️";
      case "NODE": return "🖥️";
      case "MONGODB": return "💾";
      default: return "⚡";
    }
  };

  return (
    <section id="evidence" className="py-20 px-6 bg-[#0a0a0f] relative min-h-screen">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl text-[#e8e6e3] mb-4 font-serif italic">
            Investigation Phases
          </h2>
          <div className="w-32 h-1 bg-[#8b0000] mx-auto mb-6"></div>
          <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto">
            Six critical code anomalies stand between you and the truth.
            Examine and submit decryption ciphers for each module to unlock clues.
          </p>
        </div>

        {error ? (
          <div className="text-center text-[#8b0000] font-mono py-12">{error}</div>
        ) : (
          /* Evidence Cards Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((item) => {
              const isUnlocked = item.isUnlocked;

              return (
                <div
                  key={item.phaseId}
                  onClick={() => handleChallengeClick(item)}
                  className={`bg-[#16161d] border ${
                    isUnlocked ? 'border-[#8b0000]/60 hover:border-[#8b0000] hover:shadow-lg hover:shadow-[#8b0000]/10 cursor-pointer' : 'border-gray-800/40 opacity-40 select-none'
                  } p-6 transition-all duration-300 group relative overflow-hidden rounded`}
                >
                  {/* Evidence Number */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-[#8b0000]/10 border border-[#8b0000]/30 flex items-center justify-center">
                    <span className="text-[#8b0000] font-mono">#{item.phaseId}</span>
                  </div>

                  {/* Lock Overlay */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0f]/80 backdrop-blur-sm">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🔒</div>
                        <p className="text-xs text-gray-500 font-mono">PHASE LOCKED</p>
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                    {getIcon(item.tier)}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl text-[#e8e6e3] mb-2 font-mono">{item.title}</h3>

                  {/* Description */}
                  <p className="text-[#9ca3af] mb-4 min-h-[3rem] text-sm leading-relaxed">{item.description}</p>

                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs border px-3 py-1 font-mono uppercase tracking-wider ${
                      user && user.completedChallenges >= item.phaseId 
                        ? 'text-green-500 border-green-500/50 bg-green-950/20' 
                        : 'text-[#8b0000] border-[#8b0000]/50'
                    }`}>
                      {user && user.completedChallenges >= item.phaseId ? 'Solved' : 'Active'}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">+{item.xp} XP</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Dynamic Clues Section */}
        <div className="bg-[#16161d] border-2 border-[#8b0000]/50 rounded p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#8b0000] text-[#e8e6e3] text-[9px] font-mono px-3 py-1 uppercase tracking-widest rounded-bl">
            CASE EVIDENCE OVERVIEW
          </div>
          
          <h3 className="text-2xl font-serif italic text-[#e8e6e3] mb-3 flex items-center gap-2">
            <span>📁</span> Detective Case Clues Folder
          </h3>
          <p className="text-[#9ca3af] text-sm font-sans mb-6 max-w-xl">
            Each resolved phase decryption exposes a vital piece of Arthur's mainframe footprint records. Review files below.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {clues.map((clue) => (
              <div 
                key={clue.phaseId}
                className={`p-4 rounded border transition-all duration-300 ${
                  clue.isUnlocked 
                    ? "bg-[#0a0a0f] border-green-900/50 hover:border-green-600 shadow-[0_0_8px_rgba(22,101,52,0.15)]" 
                    : "bg-[#0c0c12] border-gray-800/40 opacity-70"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{clue.isUnlocked ? "🟢" : "🔒"}</span>
                  <h4 className={`text-xs font-mono uppercase tracking-wider font-bold ${clue.isUnlocked ? "text-green-500" : "text-gray-500"}`}>
                    {clue.title}
                  </h4>
                </div>
                <p className={`text-xs font-mono leading-relaxed ${clue.isUnlocked ? "text-[#e8e6e3]" : "text-gray-600 line-through select-none"}`}>
                  {clue.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Newly Unlocked Clue Celebration Modal */}
        {newlyUnlockedClue && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-6 backdrop-blur-md animate-fade-in">
            <div className="bg-[#0a0a0f] border-2 border-green-600 max-w-md w-full p-8 relative rounded-lg shadow-2xl shadow-green-950/20 text-center">
              <div className="text-6xl mb-4 animate-bounce">🕵️‍♂️🔎</div>
              <h3 className="text-2xl font-serif italic text-green-500 mb-2">
                Clue Unlocked!
              </h3>
              <p className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-6">
                {newlyUnlockedClue.title}
              </p>
              
              {/* Clue Text Block */}
              <div className="bg-[#16161d] border border-green-900 p-4 rounded mb-6 text-left shadow-inner">
                <p className="text-sm font-mono leading-relaxed text-[#e8e6e3]">
                  {newlyUnlockedClue.text}
                </p>
              </div>

              <button
                onClick={() => setNewlyUnlockedClue(null)}
                className="w-full py-2.5 bg-green-700 hover:bg-green-600 active:bg-green-800 text-[#e8e6e3] font-mono text-xs uppercase tracking-wider rounded transition-all"
              >
                File Clue in Dossier Cabinet
              </button>
            </div>
          </div>
        )}

        {/* Evidence Detail / Code Terminal Modal */}
        {selectedChallenge && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 md:p-6 backdrop-blur-md">
            <div className="bg-[#16161d] border-2 border-[#8b0000] max-w-4xl w-full p-6 md:p-8 relative max-h-[95vh] overflow-y-auto rounded-lg shadow-2xl">
              <button
                onClick={() => setSelectedChallengeId(null)}
                className="absolute top-4 right-4 text-[#9ca3af] hover:text-[#e8e6e3] text-2xl"
              >
                ✕
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl">{getIcon(selectedChallenge.tier)}</div>
                  <div>
                    <div className="border border-[#8b0000] bg-[#0a0a0f] px-2.5 py-0.5 mb-1 inline-block">
                      <p className="text-[#8b0000] tracking-widest font-mono text-[10px]">PHASE #{selectedChallenge.phaseId}</p>
                    </div>
                    <h3 className="text-2xl text-[#e8e6e3] font-serif italic">{selectedChallenge.title}</h3>
                  </div>
                </div>

                {/* Tab selectors for W3Schools concepts vs Assignment */}
                <div className="flex border-b border-[#8b0000]/30 mb-4 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveModalTab("documentation")}
                    className={`px-4 py-2 border-b-2 transition-all ${
                      activeModalTab === "documentation"
                        ? "border-[#8b0000] text-[#e8e6e3] bg-[#8b0000]/5 font-bold"
                        : "border-transparent text-[#9ca3af] hover:text-[#e8e6e3]"
                    }`}
                  >
                    📖 OFFICIAL DOCUMENTATION (RAG)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModalTab("instructions")}
                    className={`px-4 py-2 border-b-2 transition-all ${
                      activeModalTab === "instructions"
                        ? "border-[#8b0000] text-[#e8e6e3] bg-[#8b0000]/5 font-bold"
                        : "border-transparent text-[#9ca3af] hover:text-[#e8e6e3]"
                    }`}
                  >
                    🕵️‍♂️ MISSION OBJECTIVE
                  </button>
                </div>
                
                {/* Tab 1: Dynamic RAG Documentation Section */}
                {activeModalTab === "documentation" && (
                  <div className="bg-[#0a0a0f] border border-[#8b0000]/30 p-4 rounded mb-4 font-sans text-sm leading-relaxed max-h-[250px] overflow-y-auto custom-scrollbar">
                    {ragLoading ? (
                      <div className="py-8 text-center text-xs font-mono text-[#8b0000] animate-pulse">
                        ⏳ RETRIEVING OFFICIAL DOCUMENTATION PASSAGES FROM MAINFRAME VECTOR SEARCH RAG...
                      </div>
                    ) : ragData ? (
                      <div className="space-y-6">
                        {/* Synthesized Tutor Explanation */}
                        <div>
                          <p className="text-[10px] text-[#8b0000] font-mono uppercase tracking-wider mb-2 font-bold">
                            🤖 AI TUTOR SYNTHESIZED GUIDE (OFFICIAL GROUNDED SOURCE):
                          </p>
                          <p className="text-[#e8e6e3] text-sm whitespace-pre-line leading-relaxed">
                            {ragData.synthesized}
                          </p>
                        </div>

                        {/* Top Retrieved Document Passages (Step 8) */}
                        <div className="border-t border-[#8b0000]/25 pt-4">
                          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mb-3">
                            📂 TOP RETRIEVED DOCUMENT PATHS (VERIFICATION SOURCES):
                          </p>
                          <div className="space-y-3">
                            {ragData.chunks.map((chunk, idx) => (
                              <div key={idx} className="bg-[#16161d] border border-gray-800 p-3 rounded font-mono text-xs">
                                <div className="flex justify-between text-gray-500 text-[10px] mb-1 pb-1 border-b border-gray-800/60">
                                  <span className="font-bold text-gray-400">📄 {chunk.title}</span>
                                  <span className="text-[#8b0000]">{chunk.source}</span>
                                </div>
                                <p className="text-[#9ca3af] whitespace-pre-line text-[11px] leading-relaxed">
                                  {chunk.content}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-xs font-mono text-gray-500">
                        NO RETRIEVED TEXTS LOADED.
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 2: Code instructions and assignment */}
                {activeModalTab === "instructions" && (
                  <div className="bg-[#0a0a0f] border border-[#8b0000]/20 p-4 rounded mb-4 font-sans text-sm leading-relaxed text-[#9ca3af]">
                    <p className="mb-2 text-[#e8e6e3] font-mono text-xs uppercase tracking-wider text-[#8b0000]">FORENSIC INSTRUCTIONS & ASSIGNMENT:</p>
                    <p className="whitespace-pre-line font-mono text-xs leading-relaxed">{selectedChallenge.instructions}</p>
                    
                    {selectedChallenge.hint && (
                      <div className="text-xs text-gray-500 font-mono mt-4 pt-3 border-t border-[#8b0000]/20 flex items-start gap-1">
                        <span>💡 Hint:</span>
                        <span>{selectedChallenge.hint}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Code Sandbox Workspace */}
              <form onSubmit={handleSolutionSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-[#9ca3af] font-mono uppercase tracking-wider mb-2">
                    🖥️ Code Decrypter Workspace
                  </label>
                  <div className="relative border border-[#8b0000]/40 rounded overflow-hidden">
                    <div className="absolute top-2 left-2 text-xs font-mono text-gray-600 select-none pointer-events-none text-right w-6">
                      1<br />2<br />3<br />4<br />5<br />6
                    </div>
                    <textarea
                      required
                      rows={6}
                      value={codeSolution}
                      onChange={(e) => setCodeSolution(e.target.value)}
                      className="w-full bg-[#0a0a0f] text-[#e8e6e3] pl-10 pr-4 py-2 font-mono text-sm focus:outline-none focus:border-[#8b0000] resize-none leading-relaxed"
                      placeholder="// Write code here..."
                    />
                  </div>
                </div>

                {/* Validation Feedback */}
                {validationError && (
                  <div className="p-4 bg-red-950/20 border-l-4 border-red-600 text-red-400 text-xs font-mono flex items-start gap-2">
                    <span>⚠️</span>
                    <p className="flex-1">{validationError}</p>
                  </div>
                )}

                {validationSuccess && (
                  <div className="p-4 bg-green-950/20 border-l-4 border-green-500 text-green-400 text-xs font-mono flex items-start gap-2">
                    <span>✓</span>
                    <p className="flex-1">SECURITY LOG DECRYPTED! Phase solved. Your XP levels have been synchronized.</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || validationSuccess}
                    className="flex-1 py-3 bg-[#8b0000] hover:bg-[#a00000] text-[#e8e6e3] font-mono text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "COMPILING..." : validationSuccess ? "DECRYPTED" : "VERIFY CODE"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedChallengeId(null)}
                    className="px-6 py-3 border border-[#8b0000] text-[#8b0000] hover:bg-[#8b0000] hover:text-[#e8e6e3] font-mono text-xs uppercase tracking-wider transition-all"
                  >
                    Close
                  </button>
                </div>
              </form>
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
