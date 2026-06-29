import { learningModules } from "../learning/modules";

export default function LearningHub() {
  return (
    <section id="learning" className="py-20 px-6 bg-[#0a0a0f] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#e8e6e3] mb-4 font-serif italic">
            Detective Training Academy
          </h2>
          <div className="w-32 h-1 bg-[#8b0000] mx-auto mb-6"></div>
          <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto">
            Master the MERN stack through structured learning modules. Each completed unit brings you closer to solving the case.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-[#16161d] border-2 border-[#8b0000]/50 p-8 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl text-[#e8e6e3] font-mono">OVERALL PROGRESS</h3>
            <span id="overallProgress" className="text-2xl text-[#8b0000] font-mono">0%</span>
          </div>
          <div className="w-full h-4 bg-[#1a1a24] border border-[#8b0000]/30 relative overflow-hidden">
            <div id="progressBar" className="h-full bg-gradient-to-r from-[#8b0000] to-[#b91c1c] transition-all duration-500" style={{ width: "0%" }}></div>
          </div>
          <p className="text-[#9ca3af] text-center mt-2">
            Complete learning units to advance your detective rank and unlock new investigation techniques
          </p>
        </div>

        {/* Learning Modules */}
        <div className="space-y-12">
          {learningModules.map((module) => (
            <div key={module.id} className="bg-[#16161d] border-2 border-[#8b0000]/50 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 flex items-center justify-center ${module.color} text-white rounded-full flex-shrink-0`}>
                  {module.icon}
                </div>
                <div>
                  <h3 className="text-xl text-[#e8e6e3] mb-1">{module.title}</h3>
                  <p className="text-[#9ca3af]">{module.description}</p>
                </div>
              </div>
              
              {/* Units */}
              <div className="space-y-3">
                {module.units.map((unit) => (
                  <div key={unit.id} className={`flex items-start gap-3 p-4 border border-[#8b0000]/30 ${unit.completed ? 'border-[#8b0000] bg-[#0a0a0f]/50' : 'hover:border-[#8b0000] transition-all duration-300'} `}>
                    <div className={`w-5 h-5 flex items-center justify-center ${unit.completed ? 'bg-[#8b0000] text-white' : 'bg-[#1a1a24] border border-[#8b0000]/50'} rounded-full flex-shrink-0`}>
                      {unit.completed ? '✓' : unit.id}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-lg text-[#e8e6e3] font-mono">{unit.title}</h4>
                        <span className="text-xs text-[#8b0000] bg-[#8b0000]/20 px-2 py-0.5 rounded">{unit.duration}</span>
                      </div>
                      <p className="text-[#9ca3af] text-sm">{unit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button className="px-10 py-4 bg-[#8b0000] text-[#e8e6e3] hover:bg-[#a00000] transition-all duration-300 border-2 border-[#8b0000] hover:border-[#e8e6e3] shadow-lg hover:shadow-[#8b0000]/50 uppercase tracking-wider">
            Begin Detective Training
          </button>
        </div>
      </div>

      {/* Evidence Tag Background */}
      <div className="absolute bottom-20 left-10 transform -rotate-12 opacity-10">
        <div className="border-2 border-[#8b0000] bg-[#16161d] px-8 py-4">
          <p className="text-[#8b0000] font-mono text-2xl">TRAINING #A-4782</p>
        </div>
      </div>
    </section>
  );
}