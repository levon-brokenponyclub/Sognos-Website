// Server Component — no "use client" needed.
// All animation via CSS @keyframes and SVG <animateMotion>. No hooks.

const TOP_PATHS = [
  {
    id: "sfd-tp-left",
    d: "M 226 0 C 226 40, 350 40, 350 80",
    motionDelay: "0s",
    dashDelay: "0s",
  },
  {
    id: "sfd-tp-right",
    d: "M 474 0 C 474 40, 350 40, 350 80",
    motionDelay: "0.9s",
    dashDelay: "0.9s",
  },
];

const BOTTOM_PATHS = [
  {
    id: "sfd-bp-1",
    d: "M 350 0 C 350 40, 83 40, 83 80",
    motionDelay: "0s",
    dashDelay: "0s",
  },
  {
    id: "sfd-bp-2",
    d: "M 350 0 C 350 32, 261 48, 261 80",
    motionDelay: "0.45s",
    dashDelay: "0.35s",
  },
  {
    id: "sfd-bp-3",
    d: "M 350 0 C 350 32, 439 48, 439 80",
    motionDelay: "0.9s",
    dashDelay: "0.7s",
  },
  {
    id: "sfd-bp-4",
    d: "M 350 0 C 350 40, 617 40, 617 80",
    motionDelay: "1.35s",
    dashDelay: "1.05s",
  },
];

const OUTCOME_TILES = [
  "Audit Trails",
  "Compliance Reports",
  "Outcome Records",
  "Real-time Alerts",
];

export default function SystemFlowDiagram() {
  return (
    <div
      role="img"
      aria-label="Sognos platform flow: service demand flows through the platform to produce compliance and outcome outputs"
      className="sfd-wrapper"
    >
      {/* Dot grid background */}
      <div className="sfd-dot-grid" aria-hidden="true" />

      {/* Zone 1 — Service Demand */}
      <p className="sfd-zone-label">Service Demand</p>

      <div className="sfd-demand-row">
        {/* Left card — Referrals / Care Plans */}
        <div className="sfd-card">
          <div className="sfd-shimmer" aria-hidden="true" />
          <span className="sfd-card-service sfd-card-service--a">Referrals</span>
          <span className="sfd-card-service sfd-card-service--b">Care Plans</span>
        </div>
        {/* Right card — Field Jobs / Schedules (2.5s offset) */}
        <div className="sfd-card sfd-card--offset">
          <div className="sfd-shimmer" aria-hidden="true" style={{ animationDelay: "1.2s" }} />
          <span className="sfd-card-service sfd-card-service--c">Field Jobs</span>
          <span className="sfd-card-service sfd-card-service--d">Schedules</span>
        </div>
      </div>

      {/* Top connectors: Demand → Platform */}
      <svg
        aria-hidden="true"
        viewBox="0 0 700 80"
        className="sfd-connector-svg"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {TOP_PATHS.map((p) => (
            <path key={`${p.id}-def`} id={p.id} d={p.d} />
          ))}
        </defs>
        {TOP_PATHS.map((p) => (
          <g key={p.id}>
            {/* Static base line */}
            <path d={p.d} stroke="#1a2460" strokeWidth="1" strokeDasharray="4 4" />
            {/* Animated overlay */}
            <path
              d={p.d}
              stroke="#5D64FE"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="sfd-path-animated"
              style={{ animationDelay: p.dashDelay }}
            />
            {/* Pulse dot */}
            <circle r="3" fill="#5D64FE">
              <animateMotion dur="1.8s" begin={p.motionDelay} repeatCount="indefinite">
                <mpath href={`#${p.id}`} />
              </animateMotion>
            </circle>
          </g>
        ))}
      </svg>

      {/* Zone 2 — Sognos Platform */}
      <div className="sfd-platform">
        <span className="sfd-platform-dot" aria-hidden="true" />
        <span className="sfd-platform-label">Sognos Platform</span>
      </div>

      {/* Bottom connectors: Platform → Outcomes */}
      <svg
        aria-hidden="true"
        viewBox="0 0 700 80"
        className="sfd-connector-svg"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {BOTTOM_PATHS.map((p) => (
            <path key={`${p.id}-def`} id={p.id} d={p.d} />
          ))}
        </defs>
        {BOTTOM_PATHS.map((p) => (
          <g key={p.id}>
            <path d={p.d} stroke="#1a2460" strokeWidth="1" strokeDasharray="4 4" />
            <path
              d={p.d}
              stroke="#5D64FE"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="sfd-path-animated"
              style={{ animationDelay: p.dashDelay }}
            />
            <circle r="3" fill="#5D64FE">
              <animateMotion dur="1.8s" begin={p.motionDelay} repeatCount="indefinite">
                <mpath href={`#${p.id}`} />
              </animateMotion>
            </circle>
          </g>
        ))}
      </svg>

      {/* Zone 3 — Outcomes & Compliance */}
      <p className="sfd-zone-label">Outcomes &amp; Compliance</p>

      <div className="sfd-outcomes-row">
        {OUTCOME_TILES.map((label, i) => (
          <div
            key={label}
            className="sfd-tile"
            style={{ animationDelay: `${1.0 + i * 0.4}s` }}
          >
            <div
              className="sfd-shimmer"
              aria-hidden="true"
              style={{ animationDelay: `${i * 0.7}s` }}
            />
            <span className="sfd-tile-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
