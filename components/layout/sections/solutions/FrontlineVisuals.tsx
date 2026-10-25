"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Avatar,
  Bar,
  CARD,
  CheckRows,
  CountUp,
  Draw,
  EASE,
  PaletteProvider,
  Pulse,
  Rise,
  Typed,
  VisualFrame,
  mix,
  useCycle,
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
const AV = {
  PS: "/images/avatar-priya-real.png",
  JK: "/images/avatar-james-real.png",
  EL: "/images/avatar-emma-real.png",
};

/** Starts a visual once 35% in view; reduced motion → finished state. */
function useShow<T extends Element>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const still = !!useReducedMotion();
  return { ref, show: inView || still, still };
}

// ── The problem · symptom tiles (navy) ────────────────────────────────────

function Mismatch() {
  const still = !!useReducedMotion();
  const [calls, setCalls] = useState(still ? 7 : 1);
  useEffect(() => {
    if (still) return;
    const id = setInterval(() => setCalls((n) => (n >= 7 ? 1 : n + 1)), 900);
    return () => clearInterval(id);
  }, [still]);
  return (
    <div className="w-full space-y-2 text-left">
      <div className="flex items-center justify-between rounded border border-white/10 bg-white/5 px-3 py-2 text-xs">
        <span className="text-white/60">Job #4821 needs</span>
        <span className="text-white">Licensed electrician</span>
      </div>
      <motion.div
        animate={still ? undefined : { x: [0, -3, 3, -2, 2, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2.5 }}
        className="flex items-center justify-between rounded border border-[#ff8e90]/50 bg-[#ff8e90]/10 px-3 py-2 text-xs"
      >
        <span className="flex items-center gap-2 text-white/60">
          <Avatar src={AV.JK} className="size-5" /> Assigned
        </span>
        <span className="text-[#ff8e90]">Plumber &#10005;</span>
      </motion.div>
      <p className="flex items-center gap-2 text-xs text-white/60">
        <span aria-hidden="true">&#9742;</span>
        <span>
          <span className="tabular-nums">{calls}</span> calls to reassign
        </span>
      </p>
    </div>
  );
}

const SLA_START = 899;
function SlaCountdown() {
  const still = !!useReducedMotion();
  const [left, setLeft] = useState(still ? 130 : SLA_START);
  useEffect(() => {
    if (still) return;
    const id = setInterval(() => setLeft((s) => (s <= 120 ? SLA_START : s - 13)), 250);
    return () => clearInterval(id);
  }, [still]);
  const red = left < 300;
  const colour = red ? ROSE : AMBER;
  const m = Math.floor(left / 60);
  const s = left % 60;
  return (
    <div className="flex w-full items-center gap-4 text-left">
      <svg viewBox="0 0 64 64" className="size-16 shrink-0 -rotate-90">
        <circle cx="32" cy="32" r="28" fill="none" stroke="rgb(255 255 255 / .1)" strokeWidth="5" />
        <circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke={colour}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="175.9"
          strokeDashoffset={175.9 * (1 - left / 960)}
          style={{ transition: "stroke-dashoffset 1s linear, stroke .3s" }}
        />
      </svg>
      <div>
        <p className="text-xs text-white/60">SLA &middot; P2 callout</p>
        <p className="font-heading text-2xl tabular-nums text-white">
          00:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
        </p>
        <p className="text-xs" style={{ color: colour }}>
          {red ? "Breach imminent" : "At risk"}
        </p>
      </div>
    </div>
  );
}

function StaleMap() {
  const still = !!useReducedMotion();
  const [mins, setMins] = useState(124);
  useEffect(() => {
    if (still) return;
    const id = setInterval(() => setMins((n) => (n >= 190 ? 124 : n + 1)), 700);
    return () => clearInterval(id);
  }, [still]);
  return (
    <div className="relative h-24 w-full overflow-hidden rounded border border-white/10 bg-white/5">
      <svg viewBox="0 0 240 96" className="absolute inset-0 size-full" preserveAspectRatio="none">
        <path d="M0 30 H240 M0 70 H240 M60 0 V96 M170 0 V96" stroke="rgb(255 255 255 / .08)" strokeWidth="6" />
      </svg>
      <motion.span
        className="absolute left-[58%] top-[38%] size-3 rounded-full border-2 border-white/70 bg-white/40"
        animate={still ? undefined : { opacity: [1, 0.25, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="absolute bottom-2 left-2 rounded bg-black/30 px-2 py-1 text-[11px] text-white/70">
        Last update {Math.floor(mins / 60)}h {String(mins % 60).padStart(2, "0")}m ago
      </span>
    </div>
  );
}

const SYMPTOMS = [Mismatch, SlaCountdown, StaleMap];
export function FrontlineSymptom({ index }: { index: number }) {
  const Symptom = SYMPTOMS[index % SYMPTOMS.length];
  return <Symptom />;
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

// ── Related · mini graphics, keyed by related solution slug ───────────────

const ACTIVITY = [
  ["Call logged", "2 min ago"],
  ["Email sent", "today"],
  ["Visit completed", "yesterday"],
  ["Case closed", "Mon"],
] as const;
function RelatedCrm() {
  const { ref, show, still } = useShow<HTMLDivElement>();
  const start = useCycle(ACTIVITY.length, show, still, 2200);
  return (
    <div ref={ref} className={`${CARD} w-full max-w-[16rem] overflow-hidden text-left`}>
      <div className="flex items-center gap-2 border-b border-sognos-line p-2.5">
        <Avatar src={AV.EL} className="size-6" />
        <p className="text-xs font-medium text-sognos-heading">E. Lane</p>
      </div>
      <ul>
        {[0, 1, 2].map((k) => {
          const [a, b] = ACTIVITY[(start + k) % ACTIVITY.length];
          return (
            <motion.li
              key={`${start}-${k}`}
              initial={still ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE, delay: k * 0.06 }}
              className="flex items-center gap-2 border-b border-sognos-line px-2.5 py-1.5 last:border-b-0"
            >
              <span className="size-1 bg-sognos-blue-accent" />
              <p className="flex-1 truncate text-[11px] text-sognos-heading">{a}</p>
              <p className="text-[10px] text-sognos-muted">{b}</p>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

const CASE_STATES = [
  ["Open", "bg-sognos-tint text-sognos-body", 20],
  ["In progress", "bg-sognos-blue-accent/15 text-sognos-heading", 55],
  ["Closed", "bg-emerald-100 text-emerald-800", 80],
] as const;
function RelatedService() {
  const { ref, show, still } = useShow<HTMLDivElement>();
  const i = useCycle(CASE_STATES.length, show, still, 2000, still ? 2 : 0);
  const [label, cls, used] = CASE_STATES[i];
  return (
    <div ref={ref} className={`${CARD} w-full max-w-[16rem] p-3 text-left`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-sognos-heading">Case #CS-1182</p>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors ${cls}`}>{label}</span>
      </div>
      <p className="mt-1 text-[11px] text-sognos-muted">Billing query &middot; P3</p>
      <p className="mt-3 flex justify-between text-[10px] text-sognos-muted">
        <span>SLA used</span>
        <span>4h target</span>
      </p>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-sognos-tint">
        <motion.span
          className="block h-full rounded-full bg-sognos-blue-accent"
          animate={{ width: `${used}%` }}
          transition={{ duration: still ? 0 : 0.8, ease: EASE }}
        />
      </div>
    </div>
  );
}

function RelatedPowerPlatform() {
  const { ref, show, still } = useShow<HTMLDivElement>();
  const tiles = [
    ["PowerApps_scalable.svg", "App"],
    ["PowerAutomate_scalable.svg", "Flow"],
    ["PowerBI_scalable.svg", "Report"],
  ] as const;
  return (
    <div ref={ref} className="flex w-full max-w-[16rem] items-center gap-2">
      {tiles.map(([file, name], k) => (
        <div key={name} className="contents">
          <div className={`${CARD} flex flex-1 flex-col items-center gap-1.5 p-2.5`}>
            <Image src={`/logos/platform/${file}`} alt="" width={24} height={24} className="size-6" />
            <span className="text-[10px] text-sognos-heading">{name}</span>
          </div>
          {k < 2 && (
            <svg viewBox="0 0 24 8" className="w-5 shrink-0">
              <motion.path
                d="M0 4 H24"
                stroke={ACCENT}
                strokeWidth="2"
                strokeDasharray="4 4"
                animate={still || !show ? undefined : { strokeDashoffset: [0, -16] }}
                transition={{ duration: 1, ease: "linear", repeat: Infinity }}
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

// Keys must match RELATED_GRAPHIC_SLUGS in solutions/frontline.ts.
const RELATED: Record<string, { Graphic: () => ReactNode; bg: string }> = {
  "customer-relationship-management": { Graphic: RelatedCrm, bg: "var(--sognos-tint)" },
  "customer-service": { Graphic: RelatedService, bg: mix(ACCENT, 8) },
  "power-platform": { Graphic: RelatedPowerPlatform, bg: mix("var(--sognos-care-base)", 8) },
};
export function RelatedGraphic({ slug, className = "" }: { slug: string; className?: string }) {
  const entry = RELATED[slug];
  if (!entry) return null;
  const { Graphic, bg } = entry;
  return (
    <div aria-hidden="true" className={`flex items-center justify-center rounded px-4 ${className}`} style={{ background: bg }}>
      <Graphic />
    </div>
  );
}
