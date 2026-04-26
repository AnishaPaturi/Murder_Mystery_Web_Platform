export default function SuspectProfiles() {
  const suspects = [
    {
      id: 1,
      name: "SARAH CHEN",
      role: "CTO",
      threat: "HIGH",
      motive: "Access to all systems",
      emoji: "👩‍💼"
    },
    {
      id: 2,
      name: "MARCUS Webb",
      role: "Lead Developer",
      threat: "MEDIUM",
      motive: "Recent conflict with victim",
      emoji: "👨‍💻"
    },
    {
      id: 3,
      name: "ELENA RODRIGUEZ",
      role: "Security Analyst",
      threat: "HIGH",
      motive: "Knowledge of vulnerabilities",
      emoji: "👩‍🔬"
    },
    {
      id: 4,
      name: "JAMES PARKER",
      role: "Product Manager",
      threat: "LOW",
      motive: "Financial disputes",
      emoji: "👨‍💼"
    }
  ];

  return (
    <section className="py-20 px-6 bg-[#16161d] relative overflow-hidden">
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

        {/* Suspects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {suspects.map((suspect) => (
            <div
              key={suspect.id}
              className="bg-[#0a0a0f] border-2 border-[#8b0000]/50 p-6 hover:border-[#8b0000] transition-all duration-300 group relative"
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
                <div className="text-6xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
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
              <div className="text-xs">
                <p className="text-[#8b0000] mb-1 font-mono">MOTIVE:</p>
                <p className="text-[#9ca3af]">{suspect.motive}</p>
              </div>

              {/* Interrogate Button */}
              <button className="w-full mt-4 py-2 border border-[#8b0000] text-[#8b0000] hover:bg-[#8b0000] hover:text-[#e8e6e3] transition-all duration-300 text-sm font-mono uppercase tracking-wider">
                Interrogate
              </button>
            </div>
          ))}
        </div>
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
