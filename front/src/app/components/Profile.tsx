import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, API_URL } from "../context/AuthContext";

interface HistoryItem {
  _id: string;
  type: "case_solved" | "evidence_found" | "badge_earned" | "suspect_interviewed" | "notes_updated";
  description: string;
  xp: number;
  date: string;
}

interface HeatmapItem {
  date: string;
  count: number;
}

export default function Profile() {
  const { user, token, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [heatmap, setHeatmap] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<"history" | "badges">("history");
  const [profileLoading, setProfileLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Fetch history & heatmap
  useEffect(() => {
    if (!token) return;

    const fetchProfileData = async () => {
      try {
        setProfileLoading(true);
        // Fetch history
        const historyRes = await fetch(`${API_URL}/user/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const historyData = await historyRes.json();
        if (historyRes.ok) {
          setHistory(historyData);
        }

        // Fetch heatmap
        const heatmapRes = await fetch(`${API_URL}/user/heatmap`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const heatmapData: HeatmapItem[] = await heatmapRes.json();
        if (heatmapRes.ok) {
          const map: Record<string, number> = {};
          heatmapData.forEach((item) => {
            map[item.date] = item.count;
          });
          setHeatmap(map);
        }
      } catch (err) {
        console.error("Error loading profile data:", err);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfileData();
  }, [token]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <span className="animate-spin inline-block w-8 h-8 border-4 border-[#8b0000] border-t-transparent rounded-full"></span>
      </div>
    );
  }

  // Generate 365 days for LeetCode-style activity map
  const getHeatmapGrid = () => {
    const grid = [];
    const today = new Date();
    
    // Find how many days to show to make it align to a neat grid (e.g. 53 weeks = 371 days)
    // Starting 370 days ago so we end up with columns of 7
    const daysToShow = 371; 
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - daysToShow + 1);

    // Rollback to previous Sunday to align rows as Sunday-Saturday
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);

    const totalDays = daysToShow + dayOfWeek;
    
    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const dateStr = currentDate.toISOString().split("T")[0];
      const count = heatmap[dateStr] || 0;
      
      grid.push({
        date: currentDate,
        dateStr,
        count,
      });
    }

    return grid;
  };

  const heatmapGrid = getHeatmapGrid();

  // Helper to determine cell color based on count
  const getCellColor = (count: number) => {
    if (count === 0) return "bg-[#16161d] border-[#222230]";
    if (count === 1) return "bg-[#451010] border-[#8b0000]/20";
    if (count === 2) return "bg-[#701010] border-[#8b0000]/40";
    if (count === 3) return "bg-[#a01515] border-[#a00000]/60";
    return "bg-[#e81b1b] border-red-500 shadow-[0_0_8px_rgba(232,27,27,0.6)] animate-pulse";
  };

  const getDayLetter = (row: number) => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    return days[row];
  };

  // Group cells into 7 rows representing days of the week (0 = Sunday, 1 = Monday, etc.)
  const rows = Array.from({ length: 7 }, (_, rowIndex) => {
    return heatmapGrid.filter((_, idx) => idx % 7 === rowIndex);
  });

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "First Case":
        return "🕵️‍♂️";
      case "Code Breaker":
        return "🧠";
      case "Evidence Collector":
        return "📁";
      case "Interrogation Expert":
        return "💬";
      case "Master Detective":
        return "👑";
      default:
        return "⭐";
    }
  };

  const totalXP = history.reduce((sum, item) => sum + item.xp, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e8e6e3] pt-24 pb-16 px-4 md:px-6 relative overflow-hidden">
      {/* Background noir gradients */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#8b0000]/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Detective Profile Card */}
        <div className="lg:col-span-1 bg-[#16161d] border border-[#8b0000]/40 p-6 rounded-lg relative overflow-hidden h-fit">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#8b0000]"></div>
          
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-[#0a0a0f] border-2 border-[#8b0000] mx-auto rounded-full flex items-center justify-center text-4xl mb-4 relative group">
              🔍
              <div className="absolute -bottom-1 -right-1 bg-[#8b0000] text-xs font-mono px-2 py-0.5 rounded text-[#e8e6e3] border border-[#16161d]">
                LVL {Math.floor(user.completedChallenges / 10) + 1}
              </div>
            </div>
            <h2 className="text-2xl font-serif italic mb-1">{user.username}</h2>
            <p className="text-xs text-[#8b0000] font-mono tracking-widest uppercase mb-4">
              {user.rank}
            </p>
            <div className="inline-block px-3 py-1 bg-red-950/20 border border-[#8b0000]/30 text-[#e8e6e3] text-xs font-mono rounded">
              Phase: {user.currentPhase}
            </div>
          </div>

          <div className="space-y-4 border-t border-[#8b0000]/20 pt-6 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-[#9ca3af]">EMAIL:</span>
              <span className="text-right break-all max-w-[150px]">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9ca3af]">XP ACCUMULATED:</span>
              <span className="text-[#8b0000] font-bold">{totalXP} XP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9ca3af]">BADGES:</span>
              <span>{user.badges.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9ca3af]">CASES INITIATED:</span>
              <span>1 / 1</span>
            </div>
          </div>

          <div className="mt-8 border-t border-[#8b0000]/20 pt-6">
            <button
              onClick={logout}
              className="w-full py-2.5 bg-transparent border border-[#8b0000] text-[#8b0000] hover:bg-[#8b0000] hover:text-[#e8e6e3] font-mono text-sm tracking-wider uppercase transition-all duration-300"
            >
              SIGNOUT (LOG OUT)
            </button>
          </div>
        </div>

        {/* Right Column: Heatmap, Stats & Tabs */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Top Row Stats Blocks */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#16161d] border border-[#8b0000]/30 p-5 rounded relative overflow-hidden">
              <span className="text-[#8b0000] font-mono text-xs uppercase block mb-1">CHALLENGES SOLVED</span>
              <span className="text-3xl font-serif text-[#e8e6e3] font-bold">
                {user.completedChallenges}
              </span>
              <span className="text-xs text-[#9ca3af] block mt-1">out of {user.totalChallenges}</span>
            </div>

            <div className="bg-[#16161d] border border-[#8b0000]/30 p-5 rounded">
              <span className="text-[#8b0000] font-mono text-xs uppercase block mb-1">DETECTION RATE</span>
              <span className="text-3xl font-serif text-[#e8e6e3] font-bold">
                {((user.completedChallenges / user.totalChallenges) * 100).toFixed(1)}%
              </span>
              <span className="text-xs text-[#9ca3af] block mt-1">overall progress</span>
            </div>

            <div className="bg-[#16161d] border border-[#8b0000]/30 p-5 rounded">
              <span className="text-[#8b0000] font-mono text-xs uppercase block mb-1">TOTAL BADGES</span>
              <span className="text-3xl font-serif text-[#e8e6e3] font-bold">
                {user.badges.length}
              </span>
              <span className="text-xs text-[#9ca3af] block mt-1">earned rewards</span>
            </div>

            <div className="bg-[#16161d] border border-[#8b0000]/30 p-5 rounded">
              <span className="text-[#8b0000] font-mono text-xs uppercase block mb-1">RANK TITLE</span>
              <span className="text-xl font-serif text-[#e8e6e3] font-bold truncate block">
                {user.rank.split(" ")[0]}
              </span>
              <span className="text-xs text-[#9ca3af] block mt-1">specialty title</span>
            </div>
          </div>

          {/* LeetCode Style Heatmap Block */}
          <div className="bg-[#16161d] border border-[#8b0000]/40 p-6 rounded-lg">
            <h3 className="text-lg font-serif italic text-[#e8e6e3] mb-4 flex items-center gap-2">
              <span>📊</span> Investigation Activity Calendar
            </h3>
            
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-2 min-w-[760px] select-none">
                {/* Y-axis days labels */}
                <div className="flex flex-col justify-between text-[10px] font-mono text-[#9ca3af] pr-1 py-1 h-[90px]">
                  <span>Sun</span>
                  <span>Tue</span>
                  <span>Thu</span>
                  <span>Sat</span>
                </div>
                
                {/* Heatmap grid */}
                <div className="flex gap-[3px]">
                  {rows[0].map((_, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-[3px]">
                      {rows.map((row, rowIndex) => {
                        const cell = row[colIndex];
                        if (!cell) return null;
                        
                        return (
                          <div
                            key={rowIndex}
                            className={`w-[10px] h-[10px] rounded-[1px] border ${getCellColor(
                              cell.count
                            )} transition-all duration-300 relative group cursor-pointer`}
                          >
                            {/* Hover Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#0a0a0f] border border-[#8b0000] text-[#e8e6e3] text-[10px] font-mono py-1 px-2 rounded whitespace-nowrap z-10 shadow-lg">
                              {cell.count === 0 ? "No" : cell.count} investigation{cell.count !== 1 ? "s" : ""} on {cell.date.toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3 text-xs text-[#9ca3af] font-mono">
              <span>Activity summary over the last 365 days</span>
              <div className="flex items-center gap-1.5">
                <span>Less</span>
                <div className="w-[10px] h-[10px] rounded-[1px] bg-[#16161d] border border-[#222230]"></div>
                <div className="w-[10px] h-[10px] rounded-[1px] bg-[#451010] border border-[#8b0000]/20"></div>
                <div className="w-[10px] h-[10px] rounded-[1px] bg-[#701010] border border-[#8b0000]/40"></div>
                <div className="w-[10px] h-[10px] rounded-[1px] bg-[#a01515] border border-[#a00000]/60"></div>
                <div className="w-[10px] h-[10px] rounded-[1px] bg-[#e81b1b] border border-red-500 shadow-[0_0_4px_rgba(232,27,27,0.5)]"></div>
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Activity / Badges Detail Tabs */}
          <div className="bg-[#16161d] border border-[#8b0000]/40 rounded-lg overflow-hidden">
            <div className="flex border-b border-[#8b0000]/20 font-mono text-sm">
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 py-4 text-center border-b-2 transition-all duration-300 ${
                  activeTab === "history"
                    ? "border-[#8b0000] text-[#e8e6e3] bg-[#8b0000]/5"
                    : "border-transparent text-[#9ca3af] hover:text-[#e8e6e3]"
                }`}
              >
                📜 INVESTIGATION LOGS
              </button>
              <button
                onClick={() => setActiveTab("badges")}
                className={`flex-1 py-4 text-center border-b-2 transition-all duration-300 ${
                  activeTab === "badges"
                    ? "border-[#8b0000] text-[#e8e6e3] bg-[#8b0000]/5"
                    : "border-transparent text-[#9ca3af] hover:text-[#e8e6e3]"
                }`}
              >
                🎖️ COLLECTED REWARDS ({user.badges.length})
              </button>
            </div>

            <div className="p-6">
              {activeTab === "history" ? (
                profileLoading ? (
                  <div className="py-12 flex justify-center">
                    <span className="animate-spin inline-block w-6 h-6 border-2 border-[#8b0000] border-t-transparent rounded-full"></span>
                  </div>
                ) : history.length === 0 ? (
                  <div className="text-center py-12 text-[#9ca3af] font-mono">
                    NO DOSSIER ENTRIES REPORTED YET.
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {history.map((item) => (
                      <div
                        key={item._id}
                        className="bg-[#0a0a0f] border border-[#8b0000]/20 p-4 rounded flex items-center justify-between transition-all hover:border-[#8b0000]/50"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">
                            {item.type === "case_solved" && "🔍"}
                            {item.type === "evidence_found" && "📌"}
                            {item.type === "badge_earned" && "🏆"}
                            {item.type === "suspect_interviewed" && "🗣️"}
                            {item.type === "notes_updated" && "📝"}
                          </span>
                          <div>
                            <p className="text-sm font-medium">{item.description}</p>
                            <span className="text-[10px] text-[#9ca3af] font-mono uppercase block mt-1">
                              {new Date(item.date).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs bg-red-950/40 border border-[#8b0000]/30 text-[#e8e6e3] font-mono px-2.5 py-1 rounded">
                            +{item.xp} XP
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                /* Badges Grid View */
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {user.badges.map((badge, index) => (
                    <div
                      key={index}
                      className="bg-[#0a0a0f] border border-[#8b0000] p-4 text-center rounded relative overflow-hidden group hover:border-[#8b0000] transition-all duration-300"
                    >
                      <div className="text-4xl mb-2 transition-transform duration-300 group-hover:scale-110">
                        {getBadgeIcon(badge)}
                      </div>
                      <p className="text-[#e8e6e3] text-sm font-serif italic mb-1">{badge}</p>
                      <span className="text-[9px] text-[#8b0000] font-mono uppercase tracking-widest">
                        UNLOCKED
                      </span>
                    </div>
                  ))}
                  
                  {/* Demo Locked Badges */}
                  {["Master Detective", "Interrogation Expert"].map((badge, index) => {
                    if (user.badges.includes(badge)) return null;
                    return (
                      <div
                        key={index}
                        className="bg-[#0a0a0f] border border-gray-800/40 p-4 text-center rounded opacity-40 select-none"
                      >
                        <div className="text-4xl mb-2 filter grayscale">🔒</div>
                        <p className="text-[#9ca3af] text-sm font-serif italic mb-1">{badge}</p>
                        <span className="text-[9px] text-gray-600 font-mono uppercase tracking-widest">
                          LOCKED
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
