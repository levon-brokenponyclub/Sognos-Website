import ParticleCanvas from "@/components/ui/ParticleCanvas";

const card1Shadow =
  "2px 4px 8px rgba(0,0,0,0.02), 8px 16px 24px rgba(0,0,0,0.03), 64px 96px 128px rgba(0,0,0,0.12), 80px 120px 160px rgba(99, 102, 241, 0.15), inset 0 1px 1px rgba(255,255,255,1), 0 0 0 1px rgba(0,0,0,0.04)";
const card2Shadow =
  "2px 4px 8px rgba(0,0,0,0.02), 8px 16px 24px rgba(0,0,0,0.03), 64px 96px 128px rgba(0,0,0,0.12), 80px 120px 160px rgba(20, 184, 166, 0.15), inset 0 1px 1px rgba(255,255,255,1), 0 0 0 1px rgba(0,0,0,0.04)";
const card3Shadow =
  "2px 4px 8px rgba(0,0,0,0.02), 8px 16px 24px rgba(0,0,0,0.03), 64px 96px 128px rgba(0,0,0,0.12), 80px 120px 160px rgba(59, 130, 246, 0.15), inset 0 1px 1px rgba(255,255,255,1), 0 0 0 1px rgba(0,0,0,0.04)";
const innerCard1Shadow =
  "2px 4px 8px rgba(0,0,0,0.02), 8px 16px 24px rgba(0,0,0,0.03), 64px 96px 128px rgba(0,0,0,0.12), 80px 120px 160px rgba(6, 182, 212, 0.15), inset 0 1px 1px rgba(255,255,255,1), 0 0 0 1px rgba(0,0,0,0.04)";

export default function ProductSection() {
  return (
    <section
      aria-label="Platform capabilities"
      className="flex overflow-hidden text-slate-900 font-sans bg-slate-50 w-full pt-24 pb-24 relative items-center justify-center"
    >
      <div className="max-w-7xl w-full mx-auto px-6">

        {/* Section heading */}
        <div className="mb-16 max-w-2xl">
          <h5 className="text-indigo-600 font-semibold mb-4 tracking-wide text-sm uppercase">
            Enterprise Ready
          </h5>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-6">
            Built for regulated operations
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Purpose-built for organisations that can&apos;t afford to get things
            wrong — from compliance and audit trails to real-time workforce
            optimisation.
          </p>
        </div>

        {/* 3-card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Card 1 — AI Scheduling */}
          <div
            className="flex flex-col group transition-all duration-700 ease-out hover:-translate-y-4 w-full h-[600px] rounded-3xl relative overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #ffffff 0%, #eef2ff 100%)",
              boxShadow: card1Shadow,
            }}
          >
            <ParticleCanvas
              variant="radial"
              className="absolute inset-0 z-0 pointer-events-none opacity-60 w-full h-full"
            />

            <div className="p-8 pb-0 relative z-10 flex justify-between items-start">
              <h2 className="text-2xl tracking-tight font-medium max-w-[200px] leading-tight text-slate-800">
                Intelligent scheduling, powered by AI
              </h2>
              <button className="bg-indigo-50 hover:bg-indigo-100 p-2.5 rounded-xl text-indigo-600 transition-colors flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                  <rect x="9" y="9" width="6" height="6" />
                  <line x1="9" y1="1" x2="9" y2="4" />
                  <line x1="15" y1="1" x2="15" y2="4" />
                  <line x1="9" y1="20" x2="9" y2="23" />
                  <line x1="15" y1="20" x2="15" y2="23" />
                  <line x1="20" y1="9" x2="23" y2="9" />
                  <line x1="20" y1="14" x2="23" y2="14" />
                  <line x1="1" y1="9" x2="4" y2="9" />
                  <line x1="1" y1="14" x2="4" y2="14" />
                </svg>
              </button>
            </div>

            {/* Inner nested card */}
            <div
              className="flex flex-col w-full h-[32rem] rounded-3xl p-8 relative z-10"
              style={{
                background: "linear-gradient(145deg, #ffffff 0%, #f0f9ff 100%)",
                boxShadow: innerCard1Shadow,
              }}
            >
              {/* Chat bubbles */}
              <div className="flex flex-col gap-3 flex-grow justify-end pb-6 relative z-10">
                <div className="self-end bg-white border border-black/5 rounded-2xl rounded-tr-sm p-4 shadow-sm max-w-[85%]">
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    How do we prevent scheduling gaps during peak demand periods?
                  </p>
                </div>
                <div className="self-start bg-white border border-black/5 rounded-2xl rounded-tl-sm p-4 shadow-sm max-w-[85%]">
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    AI just updated your roster thresholds — preventing 4.2% of
                    shift conflicts automatically.
                  </p>
                </div>
              </div>

              {/* Metrics panel */}
              <div className="relative z-10 flex flex-col gap-4">
                <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-sm">
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="flex flex-col">
                      <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center mb-4 border border-cyan-100/50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[13px] font-normal text-gray-900 tracking-tight">AI Accuracy</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 mt-0.5">Scheduling</p>
                        <p className="text-xl font-normal text-cyan-500 tracking-tight">99.8%</p>
                        <p className="text-[10px] text-cyan-600/70 uppercase tracking-widest mt-1">Placement Rate</p>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center mb-4 border border-cyan-100/50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500">
                          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                          <path d="M3 3v5h5" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[13px] font-normal text-gray-900 tracking-tight">Admin Saved</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 mt-0.5">Optimisation</p>
                        <p className="text-xl font-normal text-cyan-500 tracking-tight">+12.4h</p>
                        <p className="text-[10px] text-cyan-600/70 uppercase tracking-widest mt-1">Per Week</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-px bg-black/5 mb-3" />

                  <button className="w-full py-2.5 rounded-xl flex items-center justify-between group/btn transition-all duration-300 hover:bg-gray-50 bg-white">
                    <span className="text-xs text-cyan-600 tracking-widest uppercase font-medium">View insights</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500 group-hover/btn:translate-x-1 transition-transform">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 — Compliance */}
          <div
            className="flex flex-col group transition-all duration-700 ease-out hover:-translate-y-4 w-full h-[600px] rounded-3xl relative overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #ffffff 0%, #f0fdfa 100%)",
              boxShadow: card2Shadow,
            }}
          >
            <div className="p-8 pb-0 relative z-20 flex justify-between items-start">
              <h2 className="text-2xl tracking-tight font-medium max-w-[220px] leading-tight text-slate-800">
                Built for regulated industries
              </h2>
              <button className="bg-teal-50 hover:bg-teal-100 p-2.5 rounded-xl text-teal-600 transition-colors flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </button>
            </div>

            <div className="relative z-10 flex-1 flex items-center justify-center p-8">
              <div
                className="absolute w-64 h-96 bg-gradient-to-tr from-teal-400 via-emerald-300 to-cyan-200 rounded-[2rem] blur-3xl opacity-30 animate-float"
                style={{ animationDelay: "-2s" }}
              />
              <div
                className="relative w-56 h-[340px] rounded-3xl shadow-2xl shadow-teal-500/20 animate-float bg-white overflow-hidden border border-white/40"
              >
                <div className="absolute inset-0 bg-[linear-gradient(150deg,#0d9488_0%,#14b8a6_25%,#06b6d4_45%,#0ea5e9_70%,#ffffff_95%)] opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <div className="flex justify-end items-start gap-2 pt-4 pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                  </div>
                  <div className="flex flex-col pb-2">
                    <span className="text-white font-medium tracking-wider text-sm opacity-80 mb-1">
                      NDIS COMPLIANT
                    </span>
                    <span className="text-white font-medium tracking-widest text-lg opacity-95">
                      AUDIT READY
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 — Integrations */}
          <div
            className="flex flex-col group transition-all duration-700 ease-out hover:-translate-y-4 overflow-hidden w-full h-[600px] rounded-3xl relative"
            style={{
              background: "linear-gradient(145deg, #ffffff 0%, #eff6ff 100%)",
              boxShadow: card3Shadow,
            }}
          >
            {/* Animated background orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl z-0">
              <div
                className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-400/20 rounded-full blur-[80px] animate-pulse"
                style={{ animationDuration: "8s" }}
              />
              <div
                className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-400/20 rounded-full blur-[80px] animate-pulse"
                style={{ animationDuration: "10s", animationDelay: "2s" }}
              />
            </div>

            <div className="z-20 flex pt-8 pr-8 pb-0 pl-8 relative items-start justify-between">
              <h2 className="text-2xl tracking-tight font-medium max-w-[280px] leading-tight text-slate-800">
                Native to your Microsoft stack
              </h2>
              <button className="bg-blue-50 hover:bg-blue-100 p-2.5 rounded-xl text-blue-600 transition-all duration-300 group-hover:scale-110 flex items-center justify-center shadow-sm hover:shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform duration-300">
                  <path d="M9 17H7A5 5 0 0 1 7 7h2" />
                  <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
                  <line x1="8" x2="16" y1="12" y2="12" />
                </svg>
              </button>
            </div>

            <div className="z-0 flex-1 overflow-hidden w-full h-full relative">
              <ParticleCanvas
                variant="arc"
                className="w-full h-full absolute inset-0"
              />

              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 600"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                <path d="M-50 450 Q 150 150, 450 350" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" className="path-line" />

                <circle cx="100" cy="250" r="3" fill="none" stroke="#3b82f6" strokeWidth="1.5">
                  <animate attributeName="r" values="3; 25" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6; 0" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="100" cy="250" r="3" fill="white" stroke="#3b82f6" strokeWidth="1.5" />

                <circle cx="350" cy="300" r="3" fill="none" stroke="#06b6d4" strokeWidth="1.5">
                  <animate attributeName="r" values="3; 25" dur="3s" begin="1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6; 0" dur="3s" begin="1s" repeatCount="indefinite" />
                </circle>
                <circle cx="350" cy="300" r="3" fill="white" stroke="#06b6d4" strokeWidth="1.5" />

                <path d="M50 650 Q 100 300, 300 550" fill="none" stroke="url(#lineGrad)" strokeWidth="1" className="path-line-2" />

                <circle cx="150" cy="400" r="2.5" fill="none" stroke="#8b5cf6" strokeWidth="1.5">
                  <animate attributeName="r" values="2.5; 20" dur="3s" begin="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6; 0" dur="3s" begin="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="400" r="2.5" fill="white" stroke="#8b5cf6" strokeWidth="1.5" />
              </svg>

              {/* Floating badge */}
              <div
                className="absolute top-[60%] left-[10%] bg-white/95 backdrop-blur border border-slate-100 shadow-md rounded-lg py-1.5 px-3 flex items-center gap-2 z-10 animate-float hover:scale-105 transition-transform cursor-default"
                style={{ animationDuration: "4s" }}
              >
                <div
                  className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center animate-pulse"
                  style={{ animationDuration: "3s" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-slate-700">
                  150+ <span className="text-slate-400">Integrations active</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
