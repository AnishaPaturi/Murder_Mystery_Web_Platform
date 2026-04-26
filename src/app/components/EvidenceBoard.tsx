export default function EvidenceBoard() {
  const evidence = [
    { id: 1, title: "HTML & CSS", icon: "🔖", status: "Locked", desc: "Reconstruct crime scene reports" },
    { id: 2, title: "JavaScript", icon: "🔐", status: "Locked", desc: "Decrypt suspect communications" },
    { id: 3, title: "React.js", icon: "🗂️", status: "Locked", desc: "Build detective dashboard" },
    { id: 4, title: "Node.js & Express", icon: "🖥️", status: "Locked", desc: "Access secure servers" },
    { id: 5, title: "MongoDB", icon: "💾", status: "Locked", desc: "Query hidden databases" },
    { id: 6, title: "Full Stack", icon: "⚡", status: "Locked", desc: "Reveal the killer" },
  ];

  return (
    <section className="py-20 px-6 bg-[#0a0a0f] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#e8e6e3] mb-4 font-serif italic">
            Investigation Phases
          </h2>
          <div className="w-32 h-1 bg-[#8b0000] mx-auto mb-6"></div>
          <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto">
            Six critical phases stand between you and the truth.
            Complete each investigation module to unlock the next piece of evidence.
          </p>
        </div>

        {/* Evidence Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evidence.map((item, index) => (
            <div
              key={item.id}
              className="bg-[#16161d] border border-[#8b0000]/50 p-6 hover:border-[#8b0000] transition-all duration-300 hover:shadow-lg hover:shadow-[#8b0000]/20 group relative overflow-hidden"
            >
              {/* Evidence Number */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-[#8b0000]/20 border border-[#8b0000] flex items-center justify-center">
                <span className="text-[#8b0000] font-mono">#{item.id}</span>
              </div>

              {/* Icon */}
              <div className="text-5xl mb-4 filter grayscale group-hover:grayscale-0 transition-all duration-300">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl text-[#e8e6e3] mb-2 font-mono">{item.title}</h3>

              {/* Description */}
              <p className="text-[#9ca3af] mb-4 min-h-[3rem]">{item.desc}</p>

              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#8b0000] border border-[#8b0000] px-3 py-1 font-mono">
                  {item.status}
                </span>
                <span className="text-[#9ca3af] text-sm group-hover:text-[#8b0000] transition-colors">
                  →
                </span>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-[#8b0000]/0 group-hover:bg-[#8b0000]/5 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
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
