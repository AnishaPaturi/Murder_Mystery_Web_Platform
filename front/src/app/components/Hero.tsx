import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Hero() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const startInvestigation = () => {
    if (user) {
      navigate("/evidence");
    } else {
      navigate("/signup");
    }
  };

  const phases = [
    {
      id: 1,
      title: "Phase 1: HTML & CSS",
      sub: "Reconstructing the Scene",
      desc: "Rebuild Arthur's corrupted terminal diagnostic view using HTML structures and Flex alignments.",
      icon: "🔖",
    },
    {
      id: 2,
      title: "Phase 2: JavaScript",
      sub: "Decrypting Communications",
      desc: "Decode substitution cipher keys and string ciphers inside suspect chat logs.",
      icon: "🔐",
    },
    {
      id: 3,
      title: "Phase 3: React.js",
      sub: "The Detective Dashboard",
      desc: "Refactor static clue layouts into reactive, stateful SuspectCard component blocks.",
      icon: "🗂️",
    },
    {
      id: 4,
      title: "Phase 4: Node.js & Express",
      sub: "Secure API Access",
      desc: "Construct secure Express API backend endpoints to route classified system databases.",
      icon: "🖥️",
    },
    {
      id: 5,
      title: "Phase 5: MongoDB",
      sub: "Exposing the Logs",
      desc: "Expose door card swipe records by querying collections using Mongoose find and sort selectors.",
      icon: "💾",
    },
    {
      id: 6,
      title: "Phase 6: Full Stack",
      sub: "Revealing the Killer",
      desc: "Integrate React fetch clients and secure keys to authenticate the final bypass signature.",
      icon: "⚡",
    }
  ];

  return (
    <div className="bg-[#0a0a0f] text-[#e8e6e3] min-h-screen relative overflow-hidden">
      {/* Background Noir Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#8b0000]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8b0000]/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 px-6">
        {/* Crime Scene Tape Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-16 left-0 w-full h-10 bg-yellow-400 transform -rotate-2 flex items-center justify-center">
            <div className="text-black tracking-widest font-mono font-bold text-xs uppercase">
              ⚠️ CRIME SCENE - SECURITY BREACH - DETECTIVE FORCE ONLY ⚠️
            </div>
          </div>
          <div className="absolute bottom-32 left-0 w-full h-10 bg-yellow-400 transform rotate-1 flex items-center justify-center">
            <div className="text-black tracking-widest font-mono font-bold text-xs uppercase">
              ⚠️ CRIME SCENE - SECURITY BREACH - DETECTIVE FORCE ONLY ⚠️
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Case File Header */}
          <div className="inline-block transform -rotate-1">
            <div className="border border-[#8b0000] bg-[#16161d]/90 backdrop-blur-sm px-6 py-2 shadow-[0_0_15px_rgba(139,0,0,0.15)]">
              <p className="text-[#8b0000] tracking-widest uppercase font-mono text-xs">
                CASE #2026-042 | THE BYTES OF WRATH
              </p>
            </div>
          </div>

          {/* Title */}
          <h1 className="space-y-4 tracking-tight">
            <span className="block text-5xl md:text-8xl font-serif italic text-transparent bg-clip-text bg-gradient-to-b from-[#e8e6e3] to-[#9ca3af]">
              The Bytes of Wrath
            </span>
            <span className="block text-lg md:text-2xl text-[#8b0000] font-mono tracking-widest uppercase">
              Classified Full-Stack MERN Case File
            </span>
          </h1>

          {/* Mission Tagline */}
          <p className="text-lg md:text-xl text-[#9ca3af] max-w-2xl mx-auto leading-relaxed">
            Arthur Pendelton was found deceased inside ByteCorp's secure server mainframe. The clues are written in code.
            <span className="text-[#8b0000] font-mono font-bold block mt-2">
              Solve W3Schools-style concept modules to decrypt the truth.
            </span>
          </p>

          {/* Call to Action Group */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={startInvestigation}
              className="px-8 py-3.5 bg-[#8b0000] hover:bg-[#a00000] active:bg-[#700000] text-[#e8e6e3] font-mono text-sm uppercase tracking-wider transition-all border border-[#8b0000] shadow-lg shadow-red-950/30"
            >
              {user ? "Resume Investigation" : "Enlist as Detective"}
            </button>
            <Link
              to="/story"
              className="px-8 py-3.5 bg-transparent border border-[#8b0000] text-[#e8e6e3] hover:bg-[#8b0000]/10 font-mono text-sm uppercase tracking-wider transition-all"
            >
              Read Dossier
            </Link>
          </div>
        </div>
      </section>

      {/* Case Premise Section */}
      <section className="py-20 px-6 bg-[#16161d] border-y border-[#8b0000]/30 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block border border-[#8b0000] bg-[#0a0a0f] px-3 py-1 font-mono text-xs text-[#8b0000]">
              CRIME SYNOPSIS
            </div>
            <h2 className="text-3xl md:text-4xl font-serif italic">Arthur's Last Footprint</h2>
            <div className="w-16 h-1 bg-[#8b0000]"></div>
            <p className="text-[#9ca3af] text-sm leading-relaxed font-mono">
              Arthur was locked inside the ventilation cabinet. A malicious remote command locked the server doors and raised temperatures to 120°F, consuming all oxygen. 
            </p>
            <p className="text-[#9ca3af] text-sm leading-relaxed">
              Every suspect has a motive. Some wanted his position, others hated his security audits. The logs containing the bypass key are locked behind cryptographic challenges.
            </p>
            <div className="border-l-4 border-[#8b0000] bg-[#0a0a0f]/50 p-4 font-mono text-xs text-[#e8e6e3]">
              "The suspect used a substitution cipher, Express router overrides, and Mongoose database injections to hide their traces."
            </div>
          </div>
          <div className="relative aspect-video bg-black border border-[#8b0000]/50 rounded overflow-hidden shadow-lg shadow-[#8b0000]/10 group">
            <video
              src="/The_Silent_Truth.mp4"
              controls
              muted
              loop
              autoPlay
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="absolute top-3 left-3 bg-[#8b0000] text-[#e8e6e3] text-[9px] font-mono px-2 py-0.5 rounded tracking-widest uppercase pointer-events-none select-none animate-pulse">
              🔴 REC - MAIN FRAME CAMERA
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Phases Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif italic">Six Phases of Interrogation</h2>
          <div className="w-32 h-[2px] bg-[#8b0000] mx-auto"></div>
          <p className="text-[#9ca3af] text-sm md:text-base max-w-xl mx-auto">
            Solve each development phase to discover physical clues and interrogate suspects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.map((phase) => (
            <div
              key={phase.id}
              className="bg-[#16161d] border border-gray-800 hover:border-[#8b0000]/60 p-6 rounded transition-all duration-300 relative group"
            >
              <span className="absolute top-4 right-4 text-xs font-mono text-gray-600">PHASE 0{phase.id}</span>
              <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                {phase.icon}
              </div>
              <h3 className="text-lg text-[#e8e6e3] font-mono mb-1">{phase.title}</h3>
              <p className="text-xs text-[#8b0000] font-mono uppercase tracking-widest mb-3">{phase.sub}</p>
              <p className="text-[#9ca3af] text-xs leading-relaxed">{phase.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Gameplay Loop Section */}
      <section className="py-20 px-6 bg-[#16161d] border-t border-[#8b0000]/30 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif italic">The Investigation Gameplay Loop</h2>
          <p className="text-[#9ca3af] text-sm md:text-base max-w-2xl mx-auto">
            Our platform provides a gamified, sandbox learning experience designed to make backend, frontend, and database structures fun and intuitive.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 font-mono text-xs text-[#9ca3af] text-left pt-6">
            <div className="bg-[#0a0a0f] p-5 border border-[#8b0000]/25 rounded">
              <span className="text-[#8b0000] font-bold block mb-2">01. STUDY CONCEPTS</span>
              Read W3Schools documentation directly inside the code decrypter. Master structural semantics, JS, Mongoose query filters, and routes.
            </div>
            <div className="bg-[#0a0a0f] p-5 border border-[#8b0000]/25 rounded">
              <span className="text-[#8b0000] font-bold block mb-2">02. VERIFY CODE</span>
              Write and submit solutions to decrypt corrupted environmental controls. Confetti fires, awarding XP and logging milestones.
            </div>
            <div className="bg-[#0a0a0f] p-5 border border-[#8b0000]/25 rounded">
              <span className="text-[#8b0000] font-bold block mb-2">03. INTERROGATE SUSPECTS</span>
              Every solved challenge unlocks a case file clue, conditionally decrypting redact blocks inside suspect alibi reports.
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={startInvestigation}
              className="px-10 py-3.5 bg-[#8b0000] hover:bg-[#a00000] text-[#e8e6e3] font-mono text-sm uppercase tracking-widest transition-all rounded shadow-lg shadow-red-950/20"
            >
              Start Detective Training
            </button>
          </div>
        </div>
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(#8b0000 1px, transparent 1px), linear-gradient(90deg, #8b0000 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </section>
    </div>
  );
}
