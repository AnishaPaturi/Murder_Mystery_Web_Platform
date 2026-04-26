export default function Features() {
  const features = [
    {
      icon: "📖",
      title: "Story-Driven Learning",
      description: "Every code challenge advances the murder mystery plot. Stay engaged from start to finish."
    },
    {
      icon: "💻",
      title: "Hands-On Projects",
      description: "Build real MERN applications while uncovering clues, not boring theoretical exercises."
    },
    {
      icon: "🎯",
      title: "Gamified Progress",
      description: "Earn badges, unlock ranks, and compete on leaderboards as you solve the case."
    },
    {
      icon: "🔓",
      title: "Progressive Unlocking",
      description: "Each completed challenge unlocks new evidence, suspects, and story revelations."
    },
    {
      icon: "🏆",
      title: "Achievement System",
      description: "Track your detective skills with certifications and shareable accomplishments."
    },
    {
      icon: "🤝",
      title: "Multiplayer Mode",
      description: "Collaborate with other detectives or compete to crack the case first."
    }
  ];

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
          {features.map((feature, index) => (
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

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-[#8b0000]/0 group-hover:bg-[#8b0000]/5 transition-all duration-300 pointer-events-none"></div>
              </div>
            </div>
          ))}
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
            <button className="px-10 py-4 bg-[#8b0000] text-[#e8e6e3] hover:bg-[#a00000] transition-all duration-300 border-2 border-[#8b0000] hover:border-[#e8e6e3] shadow-lg hover:shadow-[#8b0000]/50 uppercase tracking-wider">
              Begin Investigation →
            </button>
          </div>
        </div>
      </div>

      {/* Evidence Tag Background */}
      <div className="absolute bottom-20 left-10 transform -rotate-12 opacity-10">
        <div className="border-2 border-[#8b0000] bg-[#16161d] px-8 py-4">
          <p className="text-[#8b0000] font-mono text-2xl">EVIDENCE #A-4782</p>
        </div>
      </div>
    </section>
  );
}
