"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Avatar,
  CARD,
  CheckRows,
  CountUp,
  Draw,
  EASE,
  PalettePicker,
  PaletteProvider,
  PILL,
  Rise,
  mix,
  useCycle,
  useRun,
  useStoredValue,
  usePalette,
  writeKey,
  type Palettes,
  type VisualProps,
} from "@/components/ui/visuals/primitives";

// Home · Solutions motion graphics (approved in the visuals gallery,
// docs/mockups/sognoscare/04b-feature-visuals.html#home-solutions, set A).
// Replaces the /public/dev/ placeholder art. Each panel is a flat surface
// from the selected palette (A–F, gallery values) or the solution's hero
// photo, with white UI fragments and one motion idea that starts in view.
// Reduced motion: everything renders in its finished state. Card data is
// illustrative.

const STORE_KEY = "sognos-home-solutions-bg";

// Panel palettes — gallery Home · Solutions A–F. Colours run Frontline, CRM,
// Insights, Experience.
const ACCENT = "var(--sognos-blue-accent)";
const PALETTES: Palettes = {
  a: { name: "Tint + accent", colours: ["var(--sognos-tint)", mix(ACCENT, 8)] },
  b: { name: "Accent blues", colours: [mix(ACCENT, 8), mix(ACCENT, 14)] },
  c: { name: "Brand tint", colours: ["var(--sognos-tint)"] },
  d: {
    name: "Product-coded",
    colours: [
      mix("var(--sognos-roster-base)", 14),
      mix("var(--sognos-care-base)", 10),
      mix(ACCENT, 10),
      mix("var(--sognos-genogram-base)", 8),
    ],
  },
  e: { name: "Navy", colours: ["var(--sognos-heading)", "var(--sognos-body)"] },
  f: { name: "Outlined white", colours: ["#ffffff"] },
};

// ── Background mode (panel colour / hero photo) ───────────────────────────

type BgMode = "colour" | "photo";
const BgContext = createContext<BgMode>("colour");

export function SolutionsBackgroundProvider({ children }: { children: ReactNode }) {
  const mode = useStoredValue<BgMode>(STORE_KEY, "colour", (v) => v === "colour" || v === "photo");
  return (
    <PaletteProvider storageKey="sognos-home-solutions-palette" palettes={PALETTES} initial="a">
      <BgContext.Provider value={mode}>{children}</BgContext.Provider>
    </PaletteProvider>
  );
}

// Review control — shown on localhost and Vercel previews, never on production.
export function SolutionsBackgroundToggle() {
  const mode = useContext(BgContext);
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") return null;
  return (
    <div className="flex w-full flex-wrap items-center gap-2 text-xs">
      <div
        role="group"
        aria-label="Solution visuals background"
        className="inline-flex items-center gap-1 rounded-full border border-sognos-line p-1"
      >
        {(["colour", "photo"] as const).map((m) => (
          <button key={m} type="button" aria-pressed={mode === m} onClick={() => writeKey(STORE_KEY, m)} className={PILL}>
            {m === "colour" ? "Panel colour" : "Hero photo"}
          </button>
        ))}
      </div>
      {mode === "colour" && <PalettePicker />}
    </div>
  );
}

// ── Visuals ────────────────────────────────────────────────────────────────

function Frontline({ show, still }: VisualProps) {
  const step = useRun(4, show, still);
  return (
    <div className="w-full max-w-sm space-y-2 text-left">
      <Rise show={show} className={`${CARD} flex items-center gap-3 p-3`}>
        <Avatar src="/images/avatar-james-real.png" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-sognos-heading">J. Kelly &middot; HVAC</p>
          <p className="text-xs text-sognos-muted">Job #4821 &middot; Level 3, North Sydney</p>
        </div>
      </Rise>
      <Rise show={show} delay={0.12} className={`${CARD} px-3 py-1`}>
        <CheckRows items={["Request logged", "Dispatched", "On site", "Completed & signed"]} step={step} />
      </Rise>
    </div>
  );
}

const CRM_FEED = [
  ["Call logged", "Service review · 2 min ago"],
  ["Email sent", "Care plan summary · today"],
  ["Visit completed", "Personal care · yesterday"],
  ["Case closed", "Billing query · Mon"],
] as const;
function Crm({ show, still }: VisualProps) {
  const head = useCycle(CRM_FEED.length, show, still, 2600);
  const rows = [0, 1, 2].map((k) => CRM_FEED[(head + CRM_FEED.length - k) % CRM_FEED.length]);
  return (
    <Rise show={show} className={`${CARD} w-full max-w-sm overflow-hidden text-left`}>
      <div className="flex items-center gap-3 border-b border-sognos-line p-3">
        <Avatar src="/images/avatar-emma-real.png" />
        <div>
          <p className="text-sm font-medium text-sognos-heading">E. Lane</p>
          <p className="text-xs text-sognos-muted">Client since 2021 &middot; 3 services</p>
        </div>
      </div>
      <ul className="min-h-[10.5rem]">
        {rows.map(([a, b], k) => (
          <motion.li
            key={`${head}-${a}`}
            initial={k === 0 && !still ? { opacity: 0, y: -10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-3 border-b border-sognos-line px-3 py-2.5 last:border-b-0"
          >
            <span className="size-1.5 shrink-0 bg-sognos-blue-accent" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-sognos-heading">{a}</p>
              <p className="text-xs text-sognos-muted">{b}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </Rise>
  );
}

function Insights({ show, still }: VisualProps) {
  const kpis: [string, number, string][] = [
    ["Demand", 3120, ""],
    ["Fill rate", 97, "%"],
    ["NPS", 64, ""],
  ];
  return (
    <div className="w-full max-w-sm space-y-2 text-left">
      <div className="grid grid-cols-3 gap-2">
        {kpis.map(([label, to, suf], i) => (
          <Rise key={label} show={show} delay={0.1 * i} className={`${CARD} p-2.5`}>
            <p className="text-[10px] text-sognos-muted">{label}</p>
            <p className="mt-1 font-heading text-lg text-sognos-heading">
              <CountUp to={to} suffix={suf} run={show} still={still} />
            </p>
          </Rise>
        ))}
      </div>
      <Rise show={show} delay={0.3} className={`${CARD} p-3`}>
        <p className="text-[10px] text-sognos-muted">Visits vs capacity &middot; 12 weeks</p>
        <svg viewBox="0 0 300 70" className="mt-1 h-16 w-full" fill="none">
          <path d="M0 30 H300" stroke="var(--sognos-line)" strokeDasharray="4 4" />
          <Draw
            d="M0 52 L27 48 L54 50 L81 40 L108 44 L135 34 L162 36 L189 26 L216 30 L243 20 L270 18 L300 10"
            show={show}
            still={still}
            stroke={ACCENT}
          />
        </svg>
      </Rise>
    </div>
  );
}

function Experience({ show, still }: VisualProps) {
  const step = useRun(4, show, still);
  return (
    <div className="w-full max-w-sm space-y-2 text-left">
      <Rise show={show} className={`${CARD} flex items-center justify-between p-3`}>
        <div>
          <p className="text-xs text-sognos-muted">Satisfaction &middot; last 30 days</p>
          <p className="font-heading text-2xl text-sognos-heading">
            4.8 <span className="text-sm text-sognos-muted">/ 5</span>
          </p>
        </div>
        <span className="flex gap-0.5 text-[#ffad6e]" aria-hidden="true">
          &#9733;&#9733;&#9733;&#9733;&#9733;
        </span>
      </Rise>
      <Rise show={show} delay={0.12} className={`${CARD} px-3 py-1`}>
        <CheckRows
          items={["Enquiry answered < 1h", "Onboarding call", "First visit on time", "Follow-up survey"]}
          step={step}
        />
      </Rise>
    </div>
  );
}

const VISUALS: Record<string, (p: VisualProps) => ReactNode> = {
  frontline: Frontline,
  crm: Crm,
  "customer-insights": Insights,
  "customer-experience": Experience,
};

// ── Panel ──────────────────────────────────────────────────────────────────

export default function SolutionVisual({
  id,
  index,
  photo,
}: {
  id: string;
  index: number;
  /** The solution's hero image (lib/solutions-content.ts). */
  photo?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const still = !!useReducedMotion();
  const mode = useContext(BgContext);
  const { colour } = usePalette();
  const Visual = VISUALS[id];
  const usePhoto = mode === "photo" && !!photo;
  const bg = colour(index);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={usePhoto ? undefined : { background: bg }}
      className={`relative flex aspect-[1554/1320] w-full items-center justify-center overflow-hidden rounded px-5 py-8 transition-colors duration-500 sm:p-8 lg:p-10 ${
        usePhoto ? "bg-sognos-navy" : bg === "#ffffff" ? "border border-sognos-line" : ""
      }`}
    >
      {usePhoto && (
        <>
          <Image src={photo} alt="" fill sizes="(min-width: 640px) 40vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-sognos-navy-dark/20" />
        </>
      )}
      <div className="relative flex w-full justify-center">
        {Visual ? <Visual show={inView || still} still={still} /> : null}
      </div>
    </div>
  );
}
