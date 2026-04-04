"use client";

// ViewBox: 0 0 457 300
// Left node:    x=64,  y=150
// Center node:  x=229, y=150
// Right nodes:  x=393, y=38/94/150/206/262

const VB_W = 457;
const VB_H = 300;

const LEFT   = { x: 64,  y: 150 };
const CENTER = { x: 229, y: 150 };
const RIGHT  = [
  { y: 38,  label: "Service Demand",    color: "#f97316" },
  { y: 94,  label: "Care Plans",        color: "#ec4899" },
  { y: 150, label: "Workforce",         color: "#22c55e" },
  { y: 206, label: "Field Delivery",    color: "#3b82f6" },
  { y: 262, label: "AI Insights",       color: "#8b5cf6" },
];

// Bezier paths: 5 from right nodes → center, 1 from center → left
const BEAMS = [
  { id: "b1", d: `M 393,38  Q 311,38  229,150`, dur: 3,   delay: 0   },
  { id: "b2", d: `M 393,94  Q 311,94  229,150`, dur: 3,   delay: 0.5 },
  { id: "b3", d: `M 393,150 Q 311,150 229,150`, dur: 2.5, delay: 1   },
  { id: "b4", d: `M 393,206 Q 311,206 229,150`, dur: 3,   delay: 1.5 },
  { id: "b5", d: `M 393,262 Q 311,262 229,150`, dur: 3,   delay: 2   },
  { id: "b6", d: `M 229,150 Q 146,150 64,150`,  dur: 2.5, delay: 0.3 },
];

function pct(val: number, max: number) {
  return `${((val / max) * 100).toFixed(2)}%`;
}

// ── Icons ──────────────────────────────────────────────────────────────────

function NodeCircle({
  size = 48,
  children,
  className = "",
}: {
  size?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`z-10 flex items-center justify-center rounded-full border-2 border-gray-100 bg-white shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] ${className}`}
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  );
}

// Lucide-style SVG icons
const icons = {
  // Left: Delivery outcome (check-circle)
  delivery: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  // Center: Sognos Platform (layers)
  platform: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  // Right nodes
  demand: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  care: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  workforce: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  field: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  ai: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-500">
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
  ),
};

const rightIcons = [icons.demand, icons.care, icons.workforce, icons.field, icons.ai];

// ── Component ──────────────────────────────────────────────────────────────

export default function FlowDiagram() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: VB_H }}
      aria-hidden="true"
    >
      {/* Icon nodes — positioned via % matching SVG viewBox coordinates */}

      {/* Left node: Outcomes */}
      <div
        className="absolute"
        style={{
          left: pct(LEFT.x, VB_W),
          top: pct(LEFT.y, VB_H),
          transform: "translate(-50%, -50%)",
        }}
      >
        <NodeCircle size={48}>{icons.delivery}</NodeCircle>
      </div>

      {/* Center node: Sognos Platform */}
      <div
        className="absolute"
        style={{
          left: pct(CENTER.x, VB_W),
          top: pct(CENTER.y, VB_H),
          transform: "translate(-50%, -50%)",
        }}
      >
        <NodeCircle size={64} className="border-indigo-100 shadow-[0_0_30px_-8px_rgba(99,102,241,0.4)]">
          {icons.platform}
        </NodeCircle>
      </div>

      {/* Right nodes: 5 inputs */}
      {RIGHT.map((node, i) => (
        <div
          key={node.label}
          className="absolute"
          style={{
            left: pct(393, VB_W),
            top: pct(node.y, VB_H),
            transform: "translate(-50%, -50%)",
          }}
        >
          <NodeCircle size={48}>{rightIcons[i]}</NodeCircle>
        </div>
      ))}

      {/* SVG overlay — animated beams */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          {BEAMS.map((b) => (
            <linearGradient
              key={b.id}
              id={`grad-${b.id}`}
              gradientUnits="userSpaceOnUse"
              x1="550"
              x2="600"
              y1="0"
              y2="0"
            >
              <animate
                attributeName="x1"
                values="550;-100"
                dur={`${b.dur}s`}
                begin={`${b.delay}s`}
                repeatCount="indefinite"
                calcMode="linear"
              />
              <animate
                attributeName="x2"
                values="600;-50"
                dur={`${b.dur}s`}
                begin={`${b.delay}s`}
                repeatCount="indefinite"
                calcMode="linear"
              />
              <stop offset="0%"   stopColor="#ffaa40" stopOpacity="0" />
              <stop offset="30%"  stopColor="#ffaa40" />
              <stop offset="70%"  stopColor="#9c40ff" />
              <stop offset="100%" stopColor="#9c40ff" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {/* Gray tracks */}
        {BEAMS.map((b) => (
          <path
            key={`track-${b.id}`}
            d={b.d}
            stroke="gray"
            strokeWidth="2"
            strokeOpacity="0.2"
            strokeLinecap="round"
          />
        ))}

        {/* Animated gradient beams */}
        {BEAMS.map((b) => (
          <path
            key={`beam-${b.id}`}
            d={b.d}
            stroke={`url(#grad-${b.id})`}
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
}
