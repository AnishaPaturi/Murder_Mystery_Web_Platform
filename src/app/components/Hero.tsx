export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Crime Scene Tape Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-0 w-full h-12 bg-yellow-400 transform -rotate-3 flex items-center justify-center">
          <div className="text-black tracking-widest font-bold text-xl repeat-text">
            ⚠️ CRIME SCENE - DO NOT CROSS ⚠️ CRIME SCENE - DO NOT CROSS ⚠️
          </div>
        </div>
        <div className="absolute bottom-20 left-0 w-full h-12 bg-yellow-400 transform rotate-2 flex items-center justify-center">
          <div className="text-black tracking-widest font-bold text-xl repeat-text">
            ⚠️ CRIME SCENE - DO NOT CROSS ⚠️ CRIME SCENE - DO NOT CROSS ⚠️
          </div>
        </div>
      </div>

      {/* Spotlight Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#0a0a0f]/50 to-[#0a0a0f]"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Case File Header */}
        <div className="mb-8 inline-block">
          <div className="border-2 border-[#8b0000] bg-[#16161d]/80 backdrop-blur-sm px-6 py-3 transform -rotate-1">
            <p className="text-[#8b0000] tracking-widest uppercase">Case #2026-042</p>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="mb-6 tracking-tight">
          <span className="block text-6xl md:text-8xl text-[#e8e6e3] font-serif italic">CodeDetective</span>
          <span className="block text-2xl md:text-4xl text-[#8b0000] mt-4 font-mono">CLASSIFIED INVESTIGATION</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-[#9ca3af] max-w-3xl mx-auto mb-8 leading-relaxed">
          A high-profile murder at TechCorp Industries. The evidence is digital.
          <span className="text-[#8b0000]"> Only you can crack the code.</span>
        </p>

        {/* Mission Briefing */}
        <div className="bg-[#16161d] border border-[#8b0000]/50 p-8 max-w-2xl mx-auto mb-10 shadow-2xl">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-[#8b0000] flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🔍</span>
            </div>
            <div className="text-left">
              <h3 className="text-[#e8e6e3] mb-2">MISSION BRIEFING</h3>
              <p className="text-[#9ca3af] leading-relaxed">
                Learn the complete <span className="text-[#8b0000] font-mono">MERN Stack</span> by solving an
                immersive murder mystery. Build real applications, crack encrypted files, interrogate suspects,
                and unmask the killer through hands-on coding challenges.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4 bg-[#8b0000] text-[#e8e6e3] hover:bg-[#a00000] transition-all duration-300 border-2 border-[#8b0000] hover:border-[#e8e6e3] shadow-lg hover:shadow-[#8b0000]/50 transform hover:-translate-y-1 uppercase tracking-wider">
            🔓 Open Case File
          </button>
          <button className="px-8 py-4 bg-transparent text-[#e8e6e3] border-2 border-[#8b0000] hover:bg-[#8b0000]/20 transition-all duration-300 uppercase tracking-wider">
            📋 View Evidence
          </button>
        </div>

        {/* Confidential Badge */}
        <div className="mt-12">
          <div className="inline-block border-4 border-[#8b0000] px-6 py-2 transform rotate-12 bg-[#0a0a0f]">
            <p className="text-[#8b0000] tracking-widest font-mono">TOP SECRET</p>
          </div>
        </div>
      </div>

      {/* Vignette Effect */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
    </div>
  );
}
