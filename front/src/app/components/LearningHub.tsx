import { useEffect, useState } from "react";
import { useAuth, API_URL } from "../context/AuthContext";

interface Unit {
  id: number;
  title: string;
  duration: string;
  description: string;
  completed?: boolean;
  storySnippet: string;
}

interface LearningModule {
  id: number;
  title: string;
  icon: string;
  color: string;
  description: string;
  units: Unit[];
}

export default function LearningHub() {
  const { user, token } = useAuth();
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/learning`);
      if (res.ok) {
        const data = await res.json();
        setModules(data);
      }
    } catch (err) {
      console.error("Error fetching learning modules:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const handleRegenerateModules = async () => {
    if (!token) return;
    setRegenerating(true);
    setStatusMessage("⏳ Calling OpenRouter AI to regenerate curriculum...");
    setIsError(false);

    try {
      const res = await fetch(`${API_URL}/learning/generate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      
      if (res.ok) {
        setModules(data.modules);
        setStatusMessage("✅ Learning modules successfully regenerated via AI!");
      } else {
        setIsError(true);
        setStatusMessage(data.message || "Failed to generate learning modules.");
      }
    } catch (err) {
      setIsError(true);
      setStatusMessage("Error contacting backend generation endpoint.");
    } finally {
      setRegenerating(false);
    }
  };

  // Check if a unit in a module is completed based on user's current solved challenges progress
  const isModuleCompleted = (moduleId: number) => {
    return user ? user.completedChallenges >= moduleId : false;
  };

  // Calculate Progress Percentages
  const totalUnits = modules.reduce((sum, mod) => sum + mod.units.length, 0);
  const completedUnits = modules.reduce((sum, mod) => {
    const isCompleted = isModuleCompleted(mod.id);
    return sum + (isCompleted ? mod.units.length : 0);
  }, 0);
  
  const progressPercentage = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-[#0a0a0f] flex items-center justify-center">
        <span className="animate-spin inline-block w-8 h-8 border-4 border-[#8b0000] border-t-transparent rounded-full"></span>
      </div>
    );
  }

  return (
    <section id="learning" className="py-20 px-6 bg-[#0a0a0f] relative min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-5xl text-[#e8e6e3] mb-4 font-serif italic">
            Detective Training Academy
          </h2>
          <div className="w-32 h-1 bg-[#8b0000] mx-auto mb-6"></div>
          <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto mb-8">
            Master the MERN stack through structured learning modules. Each completed unit brings you closer to solving the case.
          </p>

          {/* AI Generator Controls (Dev Only) */}
          {token && (
            <div className="max-w-md mx-auto bg-[#16161d] border border-[#8b0000]/40 p-4 rounded mb-8 font-mono text-xs">
              <span className="text-[#8b0000] font-bold block mb-1">🛠️ ADMIN / DEV CONTROLS</span>
              <p className="text-gray-500 mb-3">
                Regenerate the entire curriculum dynamically using OpenRouter AI. Keys are kept securely on the backend server.
              </p>
              <button
                onClick={handleRegenerateModules}
                disabled={regenerating}
                className="px-4 py-2 bg-[#8b0000] hover:bg-[#a00000] text-[#e8e6e3] rounded disabled:opacity-50 transition-all uppercase tracking-wider text-[10px]"
              >
                {regenerating ? "Regenerating..." : "Regenerate Curriculum via OpenRouter"}
              </button>
              {statusMessage && (
                <p className={`mt-3 text-center ${isError ? "text-red-500" : "text-green-500"}`}>
                  {statusMessage}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Progress Overview */}
        <div className="bg-[#16161d] border-2 border-[#8b0000]/50 p-8 mb-12 rounded">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl text-[#e8e6e3] font-mono">OVERALL PROGRESS</h3>
            <span className="text-2xl text-[#8b0000] font-mono">{progressPercentage}%</span>
          </div>
          <div className="w-full h-4 bg-[#1a1a24] border border-[#8b0000]/30 relative overflow-hidden rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-[#8b0000] to-[#b91c1c] transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-[#9ca3af] text-center mt-3 text-sm font-mono">
            {user 
              ? `Completed ${completedUnits} out of ${totalUnits} curriculum units.` 
              : "Sign in to track your detective progression and unlock clues."}
          </p>
        </div>

        {/* Learning Modules */}
        <div className="space-y-12">
          {modules.map((module) => {
            const isCompleted = isModuleCompleted(module.id);
            
            return (
              <div key={module.id} className="bg-[#16161d] border border-[#8b0000]/30 p-6 rounded relative overflow-hidden">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-12 h-12 flex items-center justify-center ${module.color || 'bg-[#8b0000]'} text-white rounded-full flex-shrink-0 text-xl`}>
                    {module.icon}
                  </div>
                  <div>
                    <h3 className="text-xl text-[#e8e6e3] mb-1 font-mono">{module.title}</h3>
                    <p className="text-[#9ca3af] text-sm leading-relaxed">{module.description}</p>
                  </div>
                </div>
                
                {/* Units */}
                <div className="space-y-3 font-sans">
                  {module.units.map((unit) => (
                    <div 
                      key={unit.id} 
                      className={`flex items-start gap-3 p-4 border ${
                        isCompleted 
                          ? 'border-green-600 bg-green-950/5' 
                          : 'border-gray-800/60 bg-[#0a0a0f]/30'
                      } rounded hover:border-[#8b0000]/50 transition-all duration-300`}
                    >
                      <div className={`w-5 h-5 flex items-center justify-center text-xs ${
                        isCompleted 
                          ? 'bg-green-600 text-white' 
                          : 'bg-[#1a1a24] border border-[#8b0000]/50 text-[#8b0000]'
                      } rounded-full flex-shrink-0 font-mono`}
                      >
                        {isCompleted ? '✓' : unit.id}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1.5">
                          <h4 className="text-base text-[#e8e6e3] font-mono">{unit.title}</h4>
                          <span className="text-xs text-[#8b0000] bg-[#8b0000]/15 px-2 py-0.5 rounded font-mono">{unit.duration}</span>
                        </div>
                        <p className="text-[#9ca3af] text-sm mb-2">{unit.description}</p>
                        
                        {/* Thematic Story snippet */}
                        {unit.storySnippet && (
                          <div className="bg-[#0a0a0f]/40 p-2.5 border-l-2 border-[#8b0000] text-xs italic font-mono text-gray-500">
                            {unit.storySnippet}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Evidence Tag Background */}
      <div className="absolute bottom-20 left-10 transform -rotate-12 opacity-5 pointer-events-none">
        <div className="border-2 border-[#8b0000] bg-[#16161d] px-8 py-4">
          <p className="text-[#8b0000] font-mono text-2xl">TRAINING #A-4782</p>
        </div>
      </div>
    </section>
  );
}