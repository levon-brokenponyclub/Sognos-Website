"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Bar,
  CARD,
  CheckRows,
  CountUp,
  Draw,
  PaletteProvider,
  Pulse,
  Rise,
  Typed,
  VisualFrame,
  mix,
  useRun,
  type Palettes,
  type VisualProps,
} from "@/components/ui/visuals/primitives";

// Frontline motion graphics (approved mockup: docs/mockups/frontline/,
// 2026-10-25 picks). Frontline is a solution, not a product — brand accent +
// navy only. Card data is illustrative.

const ACCENT = "var(--sognos-blue-accent)";
const NAVY = "var(--sognos-care-dark)";
const ROSE = "#ff8e90";
const AMBER = "#ffad6e";

/** Starts a visual once 35% in view; reduced motion → finished state. */
function useShow<T extends Element>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const still = !!useReducedMotion();
  return { ref, show: inView || still, still };
}

// ── Capabilities · Accent Blues panels ────────────────────────────────────

const CAP_PALETTES: Palettes = {
  b: { name: "Accent blues", colours: [mix(ACCENT, 8), mix(ACCENT, 14)] },
};

function Dispatch({ show, still }: VisualProps) {
  const step = useRun(3, show, still);
  return (
    <div className="w-full max-w-sm space-y-2 text-left">
      <Rise show={show} className={`${CARD} p-3`}>
        <p className="text-[10px] uppercase tracking-widest text-sognos-muted">Job #4821 &middot; HVAC fault</p>
        <p className="mt-0.5 text-sm font-medium text-sognos-heading">Level 3, North Sydney</p>
      </Rise>
      <Rise show={show} delay={0.15} className={`${CARD} px-3 py-1`}>
        <CheckRows items={["Skills: HVAC licence", "Nearest: 1.8 km", "Assigned: J. Kelly"]} step={step} />
      </Rise>
    </div>
  );
}

function Sla({ show, still }: VisualProps) {
  return (
    <Rise show={show} className={`${CARD} flex w-full max-w-sm items-center gap-4 p-4 text-left`}>
      <svg viewBox="0 0 64 64" className="size-16 shrink-0 -rotate-90">
        <circle cx="32" cy="32" r="27" fill="none" stroke="var(--sognos-line)" strokeWidth="6" />
        <motion.circle
          cx="32"
          cy="32"
          r="27"
          fill="none"
          stroke={ACCENT}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="170"
          initial={{ strokeDashoffset: 0 }}
          animate={still || !show ? undefined : { strokeDashoffset: [0, 170] }}
          transition={{ duration: 14, ease: "linear", repeat: Infinity }}
        />
      </svg>
      <div className="min-w-0">
        <p className="text-sm font-medium text-sognos-heading">Response SLA &middot; 4h</p>
        <p className="text-xs text-sognos-muted">2h 14m remaining</p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-sognos-body">
          <Pulse color={AMBER} still={still} />
          Alert at 30 min
        </p>
      </div>
    </Rise>
  );
}

const WORKERS = [
  { t: "PS", x: 18, y: 20, bg: ACCENT, path: { x: [0, 46, 0], y: [0, -28, 0] }, d: 7 },
  { t: "JK", x: 62, y: 58, bg: NAVY, path: { x: [0, -38, 0], y: [0, 22, 0] }, d: 8 },
  { t: "EL", x: 40, y: 64, bg: "#00a98f", path: { x: [0, 30, 0], y: [0, 34, 0] }, d: 9 },
];
function LiveMap({ show, still }: VisualProps) {
  return (
    <Rise show={show} className={`${CARD} relative w-full max-w-sm overflow-hidden`}>
      <svg viewBox="0 0 320 170" className="block h-auto w-full">
        <rect width="320" height="170" fill="var(--sognos-tint)" />
        {["M-10 50 H330", "M-10 120 H330", "M80 -10 V180", "M220 -10 V180"].map((d) => (
          <path key={d} d={d} stroke="var(--sognos-line)" strokeWidth="8" fill="none" />
        ))}
      </svg>
      {WORKERS.map((w) => (
        <motion.span
          key={w.t}
          className="absolute flex size-7 items-center justify-center rounded-full border-2 border-white text-[9px] font-medium text-white"
          style={{ left: `${w.x}%`, top: `${w.y}%`, background: w.bg }}
          animate={still || !show ? undefined : w.path}
          transition={{ duration: w.d, ease: "easeInOut", repeat: Infinity }}
        >
          {w.t}
        </motion.span>
      ))}
      {[
        [70, 22],
        [28, 70],
        [86, 72],
      ].map(([x, y]) => (
        <span
          key={`${x}-${y}`}
          className="absolute size-3 rotate-45 rounded-sm border-2 border-white"
          style={{ left: `${x}%`, top: `${y}%`, background: ROSE }}
        />
      ))}
      <div className="flex justify-between border-t border-sognos-line px-3 py-2 text-xs">
        <span className="text-sognos-body">12 workers &middot; 31 jobs</span>
        <span className="text-emerald-700">All on track</span>
      </div>
    </Rise>
  );
}

function MobileApp({ show, still }: VisualProps) {
  const step = useRun(3, show, still);
  return (
    <Rise show={show} className="w-48 rounded-[24px] border-[5px] border-sognos-care-dark bg-white p-3 text-left">
      <div className="mx-auto mb-2 h-1 w-12 rounded-full bg-sognos-line" />
      <p className="text-xs font-medium text-sognos-heading">Job #4821</p>
      <p className="text-[10px] text-sognos-muted">HVAC fault &middot; Level 3</p>
      <div className="mt-1">
        <CheckRows items={["On site", "Photos", "Sign-off"]} step={step} />
      </div>
    </Rise>
  );
}

function AssetLink({ show, still }: VisualProps) {
  return (
    <div className="relative flex w-full max-w-sm items-center gap-3 text-left">
      <Rise show={show} className={`${CARD} flex-1 p-3`}>
        <p className="text-[10px] uppercase tracking-widest text-sognos-muted">Job</p>
        <p className="text-sm font-medium text-sognos-heading">Chiller service</p>
      </Rise>
      <svg viewBox="0 0 40 60" className="h-16 w-8 shrink-0">
        <motion.path
          d="M0 30 H40 M20 30 V8 H40 M20 30 V52 H40"
          stroke={ACCENT}
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          animate={still || !show ? undefined : { strokeDashoffset: [0, -16] }}
          transition={{ duration: 1, ease: "linear", repeat: Infinity }}
        />
      </svg>
      <ul className="flex flex-1 flex-col gap-2">
        {["Chiller CH-02", "Service manual", "Part 7741-B"].map((a, i) => (
          <li key={a}>
            <Rise show={show} delay={0.15 * (i + 1)} className={`${CARD} px-3 py-2 text-xs text-sognos-heading`}>
              {a}
            </Rise>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Reporting({ show, still }: VisualProps) {
  return (
    <div className="w-full max-w-sm space-y-2 text-left">
      <div className="grid grid-cols-2 gap-2">
        {(
          [
            ["First-time fix", 91, "%"],
            ["Jobs this month", 1640, ""],
          ] as const
        ).map(([label, n, suffix], i) => (
          <Rise key={label} show={show} delay={0.1 * i} className={`${CARD} p-3`}>
            <p className="text-[10px] text-sognos-muted">{label}</p>
            <p className="mt-1 font-heading text-xl text-sognos-heading">
              <CountUp to={n} suffix={suffix} run={show} still={still} />
            </p>
          </Rise>
        ))}
      </div>
      <Rise show={show} delay={0.25} className={`${CARD} p-3`}>
        <div className="flex h-16 items-end gap-1.5">
          {[40, 55, 48, 66, 72, 61, 80, 86].map((h, i) => (
            <Bar key={i} show={show} height={h} delay={0.06 * i} className="flex-1 bg-sognos-care-dark" />
          ))}
        </div>
        <p className="mt-2 text-[10px] text-sognos-muted">Completed jobs by region</p>
      </Rise>
    </div>
  );
}

// Order matches the six Frontline capabilities in lib/solutions-content.ts.
const CAPABILITY_VISUALS = [Dispatch, Sla, LiveMap, MobileApp, AssetLink, Reporting];

export function FrontlineCapabilityVisuals({ children }: { children: ReactNode }) {
  return (
    <PaletteProvider storageKey="sognos-frontline-capability-palette" palettes={CAP_PALETTES} initial="b">
      {children}
    </PaletteProvider>
  );
}

export function FrontlineCapabilityVisual({ index }: { index: number }) {
  return (
    <VisualFrame
      index={index}
      visual={CAPABILITY_VISUALS[index % CAPABILITY_VISUALS.length]}
      className="min-h-[240px] px-5 py-8 sm:p-8 md:min-h-[260px]"
    />
  );
}

// ── Platform · navy cards ─────────────────────────────────────────────────

function PlatformRoute() {
  const { ref, show, still } = useShow<HTMLDivElement>();
  return (
    <div ref={ref} className="relative h-36 overflow-hidden rounded bg-white/5">
      <svg viewBox="0 0 300 140" className="size-full">
        <path d="M0 40 H300 M0 100 H300 M80 0 V140 M210 0 V140" stroke="rgb(255 255 255 / .08)" strokeWidth="8" />
        <Draw
          d="M30 115 L80 100 L80 40 L210 40 L210 100 L270 100"
          show={show}
          still={still}
          stroke="var(--sognos-roster-base)"
          width={3}
          duration={2.2}
        />
        {[
          [30, 115],
          [80, 40],
          [210, 100],
          [270, 100],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill={ACCENT} stroke="var(--sognos-navy)" strokeWidth="2" />
        ))}
      </svg>
    </div>
  );
}

function PlatformCopilot() {
  const { ref, show, still } = useShow<HTMLDivElement>();
  return (
    <div ref={ref} className="relative h-36 overflow-hidden rounded bg-white/5 p-4 text-left">
      <p className="text-[10px] font-medium uppercase tracking-widest text-sognos-blue-accent">&#10022; Copilot</p>
      <p className="mt-2 font-mono text-xs leading-relaxed text-white/85">
        <Typed
          text="Move J. Kelly's 2pm to 11am - same site, saves 38 min travel and clears the P2 callout."
          show={show}
          still={still}
          cursor={ACCENT}
        />
      </p>
    </div>
  );
}

function PlatformAutomate() {
  const { ref, show, still } = useShow<HTMLDivElement>();
  const step = useRun(3, show, still);
  return (
    <div ref={ref} className="relative h-36 overflow-hidden rounded bg-white px-3 py-1">
      <CheckRows items={["Job closed", "Invoice drafted", "Customer notified"]} step={step} />
    </div>
  );
}

// Card copy lives in solutions/frontline.ts (same order).
const PLATFORM_VISUALS = [PlatformRoute, PlatformCopilot, PlatformAutomate];
export function FrontlinePlatformVisual({ index }: { index: number }) {
  const Visual = PLATFORM_VISUALS[index % PLATFORM_VISUALS.length];
  return <Visual />;
}
