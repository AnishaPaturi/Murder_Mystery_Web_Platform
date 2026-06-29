import { useState } from "react";

export default function ProgressTracker() {
  const [progress, setProgress] = useState({
    completedChallenges: 5,
    totalChallenges: 95,
    currentPhase: "HTML & CSS",
    rank: "Junior Detective",
    badges: ["First Case", "Code Breaker", "Evidence Collector"]
  });

  const progressPercentage = (progress.completedChallenges / progress.totalChallenges) * 100;

  return (
    <section className="py-20 px-6 bg-[#16161d]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#e8e6e3] mb-4 font-serif italic">
            Track Your Investigation
          </h2>
          <div className="w-32 h-1 bg-[#8b0000] mx-auto mb-6"></div>
          <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto">
            Monitor your progress as you solve challenges and advance through the case
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Current Rank */}
          <div className="bg-[#0a0a0f] border-2 border-[#8b0000] p-6 text-center">
            <div className="text-4xl mb-3">🏅</div>
            <h3 className="text-[#8b0000] font-mono mb-2">CURRENT RANK</h3>
            <p className="text-2xl text-[#e8e6e3]">{progress.rank}</p>
          </div>

          {/* Current Phase */}
          <div className="bg-[#0a0a0f] border-2 border-[#8b0000] p-6 text-center">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-[#8b0000] font-mono mb-2">CURRENT PHASE</h3>
            <p className="text-2xl text-[#e8e6e3]">{progress.currentPhase}</p>
          </div>

          {/* Challenges Completed */}
          <div className="bg-[#0a0a0f] border-2 border-[#8b0000] p-6 text-center">
            <div className="text-4xl mb-3">✓</div>
            <h3 className="text-[#8b0000] font-mono mb-2">CHALLENGES</h3>
            <p className="text-2xl text-[#e8e6e3]">
              {progress.completedChallenges}/{progress.totalChallenges}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#0a0a0f] border-2 border-[#8b0000] p-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[#e8e6e3] font-mono">INVESTIGATION PROGRESS</h3>
            <span className="text-[#8b0000] font-mono">{progressPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full h-6 bg-[#1a1a24] border border-[#8b0000]/30 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8b0000] to-[#b91c1c] transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="w-full h-full opacity-50" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
              }}></div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-[#0a0a0f] border-2 border-[#8b0000] p-8">
          <h3 className="text-[#e8e6e3] font-mono mb-6 flex items-center gap-2">
            <span className="text-2xl">🎖️</span>
            EARNED BADGES
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {progress.badges.map((badge, index) => (
              <div key={index} className="bg-[#16161d] border border-[#8b0000]/50 p-4 text-center hover:border-[#8b0000] transition-all">
                <div className="text-3xl mb-2">⭐</div>
                <p className="text-[#e8e6e3] text-sm">{badge}</p>
              </div>
            ))}
            <div className="bg-[#16161d] border border-[#8b0000]/30 p-4 text-center opacity-50">
              <div className="text-3xl mb-2">🔒</div>
              <p className="text-[#9ca3af] text-sm">Locked</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
