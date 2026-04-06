// Server Component — SMIL animations only, no React state required

const INPUTS = [
  {
    id: "referral",
    label: "Referral Intake",
    sub: "Health & social care",
    color: "#F17463",
  },
  {
    id: "case",
    label: "Case Management",
    sub: "Service tracking",
    color: "#5D64FE",
  },
  {
    id: "field",
    label: "Field Delivery",
    sub: "Workforce scheduling",
    color: "#f59e0b",
  },
] as const;

function IconBubble({
  label,
  bg,
  letter,
  src,
}: {
  label: string;
  bg?: string;
  letter?: string;
  src?: string;
}) {
  return (
    <div
      className="wf-icon-bubble"
      style={bg ? { backgroundColor: bg } : undefined}
      title={label}
      aria-label={label}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={label} className="h-5 w-5 object-contain" />
      ) : (
        <span className="text-[10px] font-bold leading-none text-white">
          {letter}
        </span>
      )}
    </div>
  );
}

export default function SognosWorkflow() {
  return (
    <div className="relative mx-auto hidden h-[320px] max-w-[67rem] grid-cols-2 p-4 lg:grid">

      {/* ── LEFT: input nodes + animated connector lines + hub ── */}
      <div className="relative flex items-center justify-between">

        {/* Input stack */}
        <div className="relative z-10 flex h-full flex-col justify-between py-2">
          {INPUTS.map((inp) => (
            <div key={inp.id} className="flex items-center gap-2">
              <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm">
                <p className="whitespace-nowrap text-xs font-semibold text-gray-800">
                  {inp.label}
                </p>
                <p className="whitespace-nowrap text-[10px] text-gray-400">
                  {inp.sub}
                </p>
              </div>
              <div
                className="h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: inp.color }}
              />
            </div>
          ))}
        </div>

        {/* SVG connector lines (absolute overlay) */}
        {/*
          viewBox: 536 × 288 (left col width × inner height after p-4)
          Input dot x ≈ 210 (card ~190px + 2px gap + 4px dot center)
          Hub center x ≈ 512, y = 144 (vertical center)
          Input centers y: 26 (top), 144 (middle), 262 (bottom)
          Paths: top/bottom use L-shape; middle is straight
        */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 536 288"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* ── Base dashed guides ── */}
          <path
            d="M 210 26 L 370 26 L 370 144 L 512 144"
            stroke="#dcdfe6"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <path
            d="M 210 144 L 512 144"
            stroke="#dcdfe6"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <path
            d="M 210 262 L 370 262 L 370 144 L 512 144"
            stroke="#dcdfe6"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* ── Orange beam — top L-shape (path ≈ 420px) ── */}
          <path
            d="M 210 26 L 370 26 L 370 144 L 512 144"
            stroke="#F17463"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="56 480"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="536"
              to="0"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </path>

          {/* ── Blue beam — straight horizontal (path ≈ 302px) ── */}
          <path
            d="M 210 144 L 512 144"
            stroke="#5D64FE"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="56 360"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="416"
              to="0"
              dur="2.1s"
              repeatCount="indefinite"
              begin="0.7s"
            />
          </path>

          {/* ── Amber beam — bottom L-shape (path ≈ 420px) ── */}
          <path
            d="M 210 262 L 370 262 L 370 144 L 512 144"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="56 480"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="536"
              to="0"
              dur="2.8s"
              repeatCount="indefinite"
              begin="1.3s"
            />
          </path>
        </svg>

        {/* Hub node */}
        <div className="relative z-10 -mr-10 flex-shrink-0">
          <div className="wf-hub">
            <div className="wf-hub-ring" />
            <div className="wf-hub-center">
              <span className="block text-[9px] font-bold uppercase leading-none tracking-widest text-white/60">
                Sognos
              </span>
              <span className="mt-0.5 block text-[11px] font-semibold leading-tight text-white">
                Platform
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: integrations, connected badge, final icon ── */}
      {/*
        viewBox: 536 × 288
        Hub enters from x=0, y=144
        Horizontal beam: x=0→130
        Chain A (x≈175): icons at y=20, y=72
        Chain B (x≈255): icons at y=20, y=72
        Connected badge: centered at x=215, y=140
        Final icon: centered at x=215, y=222
      */}
      <div className="relative">

        {/* SVG connectors */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 536 288"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* ── Base horizontal from hub to badge area ── */}
          <line
            x1="0" y1="144" x2="340" y2="144"
            stroke="#dcdfe6"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* ── Chain A vertical (x=175): top icon → badge ── */}
          <line
            x1="175" y1="24" x2="175" y2="70"
            stroke="#dcdfe6"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <line
            x1="175" y1="102" x2="175" y2="132"
            stroke="#dcdfe6"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* ── Chain B vertical (x=255): top icon → badge ── */}
          <line
            x1="255" y1="24" x2="255" y2="70"
            stroke="#dcdfe6"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <line
            x1="255" y1="102" x2="255" y2="132"
            stroke="#dcdfe6"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* ── Vertical down from badge to final icon ── */}
          <line
            x1="215" y1="162" x2="215" y2="210"
            stroke="#dcdfe6"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* ── Animated beam: hub → right ── */}
          <line
            x1="0" y1="144" x2="340" y2="144"
            stroke="#1e96fc"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="56 300"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="356"
              to="0"
              dur="2s"
              repeatCount="indefinite"
              begin="1s"
            />
          </line>
        </svg>

        {/* Chain A — column 1 (Dynamics 365, Power Platform) */}
        <div className="absolute left-[151px] top-[4px]">
          <IconBubble label="Dynamics 365" bg="#0078d4" letter="D" />
        </div>
        <div className="absolute left-[151px] top-[70px]">
          <IconBubble
            label="Power Platform"
            src="/logos/PowerPlatform_scalable.svg"
          />
        </div>

        {/* Chain B — column 2 (Teams, Copilot AI) */}
        <div className="absolute left-[231px] top-[4px]">
          <IconBubble label="Teams" bg="#6264a7" letter="T" />
        </div>
        <div className="absolute left-[231px] top-[70px]">
          <IconBubble label="Copilot AI" bg="#00b7c3" letter="✦" />
        </div>

        {/* Connected badge */}
        <div className="absolute left-[110px] top-[130px]">
          <div className="wf-connected">
            <div className="wf-connected-dot" />
            <span className="text-xs font-semibold text-gray-700">
              Connected
            </span>
          </div>
        </div>

        {/* Final icon (Power Automate) */}
        <div className="absolute left-[191px] top-[210px]">
          <IconBubble
            label="Power Automate"
            src="/logos/PowerAutomate_scalable.svg"
          />
        </div>
      </div>
    </div>
  );
}
