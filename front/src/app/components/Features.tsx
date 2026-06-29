import { useState, useEffect } from "react";

export default function Features() {
  const [features] = useState([
    {
      icon: "📖",
      title: "Story-Driven Learning",
      description: "Every code challenge advances the murder mystery plot. Stay engaged from start to finish.",
      stats: { challenges: 0, max: 12 }
    },
    {
      icon: "💻",
      title: "Hands-On Projects",
      description: "Build real MERN applications while uncovering clues, not boring theoretical exercises.",
      stats: { challenges: 0, max: 18 }
    },
    {
      icon: "🎯",
      title: "Gamified Progress",
      description: "Earn badges, unlock ranks, and compete on leaderboards as you solve the case.",
      stats: { challenges: 0, max: 15 }
    },
    {
      icon: "🔓",
      title: "Progressive Unlocking",
      description: "Each completed challenge unlocks new evidence, suspects, and story revelations.",
      stats: { challenges: 0, max: 16 }
    },
    {
      icon: "🏆",
      title: "Achievement System",
      description: "Track your detective skills with certifications and shareable accomplishments.",
      stats: { challenges: 0, max: 14 }
    },
    {
      icon: "🤝",
      title: "Multiplayer Mode",
      description: "Collaborate with other detectives or compete to crack the case first.",
      stats: { challenges: 0, max: 20 }
    }
  ]);

  const [isFeaturedUnlocked, setIsFeaturedUnlocked] = useState(false);

  // Simulate progress loading
  useEffect(() => {
    const timer = setInterval(() => {
      setIsFeaturedUnlocked(true);
    }, 3000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="features" className="py-20 px-6 bg-[#0a0a0f] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#e8e6e3] mb-4 font-serif italic">
            Why CodeDetective?
          </h2>
          <div className="w-32 h-1 bg-[#8b0000] mx-auto mb-6"></div>
          <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto">
            Traditional coding courses are boring. We've transformed MERN stack education
            into an unforgettable investigative thriller.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            // Simulate dynamic progress for each feature
            const progress = Math.min(
              Math.floor((Date.now() / 1000) % (feature.stats.max + 1)), 
              feature.stats.max
            );
            
            return (
              <div
                key={index}
                className="relative group"
              >
                {/* Card */}
                <div className="bg-[#16161d] border border-[#8b0000]/30 p-8 h-full hover:border-[#8b0000] transition-all duration-300 relative overflow-hidden">
                  {/* Corner Clip Effect */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-t-[#8b0000] border-l-[30px] border-l-transparent opacity-50"></div>

                  {/* Icon */}
                  <div className="text-5xl mb-4 filter grayscale group-hover:grayscale-0 transition-all duration-300">
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl text-[#e8e6e3] mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#9ca3af] leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#8b0000] font-mono">Progress</span>
                      <span className="text-[#e8e6e3] font-mono">{progress}/{feature.stats.max}</span>
                    </div>
                    <div className="w-full h-2 bg-[#1a1a24] border border-[#8b0000]/30 relative overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#8b0000] to-[#b91c1c] transition-all duration-500"
                        style={{ width: `${(progress / feature.stats.max) * 100}%` }}
                      >
                        <div className="w-full h-full opacity-50" style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
                        }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-[#8b0000]/0 group-hover:bg-[#8b0000]/5 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-[#16161d] border-2 border-[#8b0000] p-12 max-w-4xl mx-auto relative overflow-hidden">
            {/* Stamp Effect */}
            <div className="absolute top-4 right-4 border-4 border-[#8b0000] px-4 py-2 transform rotate-12 opacity-30">
              <p className="text-[#8b0000] tracking-widest font-mono text-sm">URGENT</p>
            </div>

            <h3 className="text-3xl text-[#e8e6e3] mb-4 font-serif italic">
              The Case Awaits
            </h3>
            <p className="text-[#9ca3af] text-lg mb-8 max-w-2xl mx-auto">
              Every hour you delay, the trail grows colder. Start your investigation now
              and master full-stack development while solving the crime of the century.
            </p>
            <button 
              onClick={() => setIsFeaturedUnlocked(true)}
              disabled={!isFeaturedUnlocked}
              className={`px-10 py-4 bg-[#8b0000] text-[#e8e6e3] hover:bg-[#a00000] transition-all duration-300 border-2 border-[#8b0000] hover:border-[#e8e6e3] shadow-lg hover:shadow-[#8b0000]/50 uppercase tracking-wider ${!isFeaturedUnlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isFeaturedUnlocked ? 'Begin Investigation →' : 'Initializing...'}
            </button>
          </div>
        </div>

        {/* Evidence Tag Background */}
        <div className="absolute bottom-20 left-10 transform -rotate-12 opacity-10">
          <div className="border-2 border-[#8b0000] bg-[#16161d] px-8 py-4">
            <p className="text-[#8b0000] font-mono text-2xl">EVIDENCE #A-4782</p>
          </div>
        </div>
      </div>
    </section>
  );
}