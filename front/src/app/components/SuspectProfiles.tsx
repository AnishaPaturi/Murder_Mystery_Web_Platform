import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, API_URL } from "../context/AuthContext";

interface Suspect {
  id: number;
  suspectId: number;
  name: string;
  role: string;
  threat: "LOW" | "MEDIUM" | "HIGH";
  motive: string;
  emoji: string;
  alibi: string;
  evidence: string;
  background: string;
  unlockedAtPhase: number;
  isUnlocked: boolean;
}

export default function SuspectProfiles() {
  const { token } = useAuth();
  const [suspects, setSuspects] = useState<Suspect[]>([]);
  const [selectedSuspect, setSelectedSuspect] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSuspects = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/suspects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setSuspects(data);
      } else {
        setError(data.message || "Failed to load suspects.");
      }
    } catch (err) {
      setError("Error connecting to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuspects();
  }, [token]);

  const handleInterrogateClick = async (suspect: Suspect) => {
    setSelectedSuspect(suspect.id);

    if (token && suspect.isUnlocked) {
      try {
        await fetch(`${API_URL}/user/activity`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: "suspect_interviewed",
            description: `Interrogated Suspect: ${suspect.name} (${suspect.role})`,
            xp: 20,
          }),
        });
      } catch (err) {
        console.error("Error logging suspect interrogation:", err);
      }
    }
  };

  const handleQuestionFurther = async (suspect: Suspect) => {
    if (token && suspect.isUnlocked) {
      try {
        await fetch(`${API_URL}/user/activity`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: "suspect_interviewed",
            description: `Questioned Further: ${suspect.name} (${suspect.role})`,
            xp: 15,
          }),
        });
      } catch (err) {
        console.error("Error logging further questioning:", err);
      }
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="max-w-md bg-[#16161d] border border-[#8b0000]/40 p-8 text-center rounded-lg shadow-2xl">
          <div className="text-5xl mb-4">🚫</div>
          <h2 className="text-2xl font-serif italic text-[#e8e6e3] mb-4">CLASSIFIED DOSSIER</h2>
          <p className="text-[#9ca3af] font-mono text-sm mb-6">
            You must be an active detective to interrogate the suspects of the mainframe security lock-down.
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

  const selectedProfile = suspects.find(s => s.id === selectedSuspect);

  return (
    <section id="suspects" className="py-20 px-6 bg-[#16161d] relative overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-block border-2 border-[#8b0000] bg-[#0a0a0f] px-6 py-2 mb-6 transform -rotate-1">
            <p className="text-[#8b0000] tracking-widest font-mono">CLASSIFIED</p>
          </div>
          <h2 className="text-4xl md:text-5xl text-[#e8e6e3] mb-4 font-serif italic">
            Prime Suspects
          </h2>
          <div className="w-32 h-1 bg-[#8b0000] mx-auto mb-6"></div>
          <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto">
            Four individuals with means, motive, and opportunity.
            Your coding skills will help interrogate each suspect and uncover the truth.
          </p>
        </div>

        {error ? (
          <div className="text-center text-[#8b0000] font-mono py-12">{error}</div>
        ) : (
          /* Suspects Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {suspects.map((suspect) => (
              <div
                key={suspect.id}
                className={`bg-[#0a0a0f] border-2 ${
                  suspect.isUnlocked ? "border-[#8b0000]/50 hover:border-[#8b0000]" : "border-gray-800/40 opacity-60"
                } p-6 transition-all duration-300 group relative rounded`}
              >
                {/* Threat Level Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-mono ${
                  suspect.threat === "HIGH" ? "bg-[#8b0000] text-[#e8e6e3]" :
                  suspect.threat === "MEDIUM" ? "bg-[#b45f00] text-[#e8e6e3]" :
                  "bg-[#4a5568] text-[#e8e6e3]"
                }`}>
                  {suspect.threat}
                </div>

                {/* Photo Placeholder */}
                <div className="w-full aspect-square bg-[#1a1a24] mb-4 flex items-center justify-center border border-[#8b0000]/30 relative overflow-hidden">
                  <div className={`text-6xl ${suspect.isUnlocked ? "filter-none" : "filter grayscale opacity-40"} transition-all duration-300`}>
                    {suspect.emoji}
                  </div>
                  {/* Redacted Effect */}
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_10px,#8b0000_10px,#8b0000_12px)] opacity-20"></div>
                </div>

                {/* Name */}
                <h3 className="text-lg text-[#e8e6e3] mb-1 font-mono tracking-wider">
                  {suspect.name}
                </h3>

                {/* Role */}
                <p className="text-[#9ca3af] mb-3 text-sm">{suspect.role}</p>

                {/* Divider */}
                <div className="w-full h-px bg-[#8b0000]/30 mb-3"></div>

                {/* Motive */}
                <div className="text-xs min-h-[3rem]">
                  <p className="text-[#8b0000] mb-1 font-mono">MOTIVE:</p>
                  <p className="text-[#9ca3af] break-words">{suspect.motive}</p>
                </div>

                {/* Interrogate Button */}
                <button
                  onClick={() => handleInterrogateClick(suspect)}
                  className="w-full mt-4 py-2 border border-[#8b0000] text-[#8b0000] hover:bg-[#8b0000] hover:text-[#e8e6e3] transition-all duration-300 text-sm font-mono uppercase tracking-wider"
                >
                  {suspect.isUnlocked ? "Interrogate" : "Locked (Phase Clue)"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Interrogation Modal */}
        {selectedProfile && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-6 backdrop-blur-sm">
            <div className="bg-[#0a0a0f] border-2 border-[#8b0000] max-w-4xl w-full p-8 relative max-h-[90vh] overflow-y-auto rounded-lg">
              <button
                onClick={() => setSelectedSuspect(null)}
                className="absolute top-4 right-4 text-[#9ca3af] hover:text-[#e8e6e3] text-2xl"
              >
                ✕
              </button>

              {/* Header */}
              <div className="flex items-start gap-6 mb-8 pb-8 border-b border-[#8b0000]/50">
                <div className="w-32 h-32 bg-[#16161d] border-2 border-[#8b0000] flex items-center justify-center flex-shrink-0">
                  <div className="text-6xl">{selectedProfile.emoji}</div>
                </div>
                <div className="flex-1">
                  <div className={`inline-block px-3 py-1 text-xs font-mono mb-2 ${
                    selectedProfile.threat === "HIGH" ? "bg-[#8b0000] text-[#e8e6e3]" :
                    selectedProfile.threat === "MEDIUM" ? "bg-[#b45f00] text-[#e8e6e3]" :
                    "bg-[#4a5568] text-[#e8e6e3]"
                  }`}>
                    THREAT LEVEL: {selectedProfile.threat}
                  </div>
                  <h3 className="text-3xl text-[#e8e6e3] mb-2 font-mono tracking-wider">
                    {selectedProfile.name}
                  </h3>
                  <p className="text-[#8b0000] mb-3">{selectedProfile.role}</p>
                  <p className="text-[#9ca3af] leading-relaxed">{selectedProfile.background}</p>
                </div>
              </div>

              {/* Case Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#16161d] border border-[#8b0000]/30 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">🎯</span>
                    <h4 className="text-[#8b0000] font-mono">MOTIVE</h4>
                  </div>
                  <p className="text-[#e8e6e3] font-mono">{selectedProfile.motive}</p>
                </div>

                <div className="bg-[#16161d] border border-[#8b0000]/30 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">📍</span>
                    <h4 className="text-[#8b0000] font-mono">ALIBI</h4>
                  </div>
                  <p className="text-[#e8e6e3] font-mono">{selectedProfile.alibi}</p>
                </div>

                <div className="bg-[#16161d] border border-[#8b0000]/30 p-6 md:col-span-2">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">🔍</span>
                    <h4 className="text-[#8b0000] font-mono">KEY EVIDENCE</h4>
                  </div>
                  <p className="text-[#e8e6e3] font-mono">{selectedProfile.evidence}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button 
                  onClick={() => handleQuestionFurther(selectedProfile)}
                  disabled={!selectedProfile.isUnlocked}
                  className="flex-1 py-3 bg-[#8b0000] text-[#e8e6e3] hover:bg-[#a00000] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 uppercase tracking-wider font-mono text-xs"
                >
                  Question Further
                </button>
                <button 
                  onClick={() => setSelectedSuspect(null)}
                  className="flex-1 py-3 border-2 border-[#8b0000] text-[#8b0000] hover:bg-[#8b0000] hover:text-[#e8e6e3] transition-all duration-300 uppercase tracking-wider font-mono text-xs"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fingerprint Background */}
      <div className="absolute top-10 right-10 w-64 h-64 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#8b0000" strokeWidth="0.5"/>
          <circle cx="50" cy="50" r="35" fill="none" stroke="#8b0000" strokeWidth="0.5"/>
          <circle cx="50" cy="50" r="30" fill="none" stroke="#8b0000" strokeWidth="0.5"/>
          <circle cx="50" cy="50" r="25" fill="none" stroke="#8b0000" strokeWidth="0.5"/>
          <circle cx="50" cy="50" r="20" fill="none" stroke="#8b0000" strokeWidth="0.5"/>
        </svg>
      </div>
    </section>
  );
}
