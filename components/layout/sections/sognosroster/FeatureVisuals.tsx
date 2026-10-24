"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Avatar,
  Bar,
  CARD,
  CheckRows,
  Draw,
  EASE,
  PalettePicker,
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

// SognosRoster feature motion graphics (gallery: 04b-feature-visuals.html,
// SognosRoster graphics; palette A default). Card data is illustrative.

const BASE = "var(--sognos-roster-base)";
const ACCENT = "var(--sognos-blue-accent)";
const DEEP = "#104b90";
const ROSE = "#ff8e90";

const alt = (a: string, b: string) => [a, b, a, b, a, b];
const PALETTES: Palettes = {
  a: { name: "Roster tints", colours: alt(mix(BASE, 12), mix(BASE, 20)) },
  b: { name: "Roster blues", colours: alt(mix(ACCENT, 8), mix(ACCENT, 14)) },
  c: { name: "Sky + tint", colours: alt(mix(BASE, 15), "var(--sognos-tint)") },
  d: { name: "Brand tint", colours: ["var(--sognos-tint)"] },
  e: { name: "Roster deep", colours: alt(DEEP, "#03112f") },
  f: { name: "Outlined white", colours: ["#ffffff"] },
};

export function RosterVisualsProvider({ children }: { children: ReactNode }) {
  return (
    <PaletteProvider storageKey="sognos-roster-feature-palette" palettes={PALETTES} initial="a">
      {children}
    </PaletteProvider>
  );
}
export const RosterPalettePicker = () => <PalettePicker label="Feature panel colours" />;

// ── Visuals ────────────────────────────────────────────────────────────────

const AVATARS = ["priya", "james", "emma"].map((n) => `/images/avatar-${n}-real.png`);
const SLOTS: [number, number, number][] = [
  [1, 1, 0],
  [1, 3, 140],
  [2, 2, 420],
  [2, 4, 560],
  [3, 1, 700],
  [3, 5, 980],
  [4, 3, 1190],
  [4, 4, 1260],
  [5, 2, 1470],
  [5, 5, 1680],
];
function Scheduling({ show }: VisualProps) {
  return (
    <Rise show={show} className={`${CARD} w-full max-w-md p-4 text-left`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-sognos-heading">Week 46 roster</p>
        <span className="rounded-full bg-sognos-blue-accent px-2.5 py-1 text-[10px] font-medium text-white">
          Auto-generated
        </span>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-1.5 text-center text-[10px] text-sognos-muted">
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="mt-1.5 grid grid-cols-5 grid-rows-5 gap-1.5">
        {SLOTS.map(([col, row, ms], i) => (
          <motion.span
            key={i}
            className="flex h-8 items-center justify-center rounded border border-sognos-line"
            style={{ gridColumn: col, gridRow: row, background: mix(BASE, 18) }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.45, ease: EASE, delay: ms / 1000 }}
          >
            <Avatar src={AVATARS[i % 3]} className="size-6" />
          </motion.span>
        ))}
      </div>
      <p className="mt-3 text-xs text-sognos-body">142 shifts filled from confirmed demand &middot; 0 conflicts</p>
    </Rise>
  );
}

function SkillsMatching({ show, still }: VisualProps) {
  const items = ["Manual handling certificate", "First aid · current", "Client prefers female worker", "Available 9:00 - 11:00"];
  const step = useRun(items.length, show, still);
  return (
    <div className="w-full max-w-md space-y-3 text-left">
      <Rise show={show} className={`${CARD} flex items-center gap-3 p-4`}>
        <Avatar src={AVATARS[0]} className="size-11" />
        <div className="flex-1">
          <p className="text-sm font-medium text-sognos-heading">P. Shah</p>
          <p className="text-xs text-sognos-muted">Support worker &middot; 4.2 km away</p>
        </div>
        <span className="text-xs font-medium" style={{ color: DEEP }}>
          98% match
        </span>
      </Rise>
      <Rise show={show} delay={0.12} className={`${CARD} px-4 py-2`}>
        <CheckRows items={items} step={step} />
      </Rise>
    </div>
  );
}

const STREETS = ["M-10 60 H410", "M-10 150 H410", "M90 -10 V230", "M260 -10 V230", "M-10 210 L410 20"];
const STOPS: [number, number][] = [
  [50, 180],
  [180, 150],
  [260, 110],
  [340, 60],
];
function RouteOptimisation({ show, still }: VisualProps) {
  return (
    <Rise show={show} className={`${CARD} relative w-full max-w-md overflow-hidden text-left`}>
      <svg viewBox="0 0 400 220" className="block h-auto w-full">
        <rect width="400" height="220" fill="var(--sognos-tint)" />
        {STREETS.map((d) => (
          <path key={d} d={d} stroke="var(--sognos-line)" strokeWidth="10" fill="none" strokeLinecap="round" />
        ))}
        <Draw
          d="M50 180 L90 150 L180 150 L260 110 L260 60 L340 60"
          show={show}
          still={still}
          stroke={ACCENT}
          width={4}
          duration={2.2}
        />
        {STOPS.map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="11" fill={DEEP} />
            <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fill="#fff" fontFamily="sans-serif">
              {i + 1}
            </text>
          </g>
        ))}
      </svg>
      <div className="flex items-center justify-between border-t border-sognos-line px-4 py-3 text-sm">
        <span className="text-sognos-body">4 visits &middot; optimised order</span>
        <span className="font-medium text-emerald-700">&minus;38 min travel</span>
      </div>
    </Rise>
  );
}

function RealTime({ show, still }: VisualProps) {
  const items = ["E. Lane · 2.1 km · reassigned", "P. Shah · 3.4 km · reassigned", "Client + workers notified"];
  const step = useRun(items.length, show, still);
  return (
    <div className="w-full max-w-md space-y-3 text-left">
      <Rise show={show} className={`${CARD} flex items-center gap-3 p-4`}>
        <Pulse color={ROSE} still={still} className="size-2.5" />
        <div className="flex-1">
          <p className="text-sm font-medium text-sognos-heading">J. Kelly called in sick</p>
          <p className="text-xs text-sognos-muted">3 visits uncovered &middot; 7:42 am</p>
        </div>
      </Rise>
      <Rise show={show} delay={0.12} className={`${CARD} px-4 py-2`}>
        <p className="pt-1 text-xs text-sognos-muted">Replacements ranked by proximity + skills</p>
        <CheckRows items={items} step={step} />
      </Rise>
    </div>
  );
}

function MobileApp({ show, still }: VisualProps) {
  const items = ["Shift accepted", "Checked in · GPS", "Notes + signature"];
  const step = useRun(items.length, show, still);
  return (
    <Rise show={show} className="w-56 rounded-[28px] border-[6px] border-sognos-care-dark bg-white p-3 text-left">
      <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-sognos-line" />
      <p className="text-[10px] tracking-widest text-sognos-muted uppercase">Next shift</p>
      <p className="mt-1 text-sm font-medium text-sognos-heading">9:00 &middot; Personal care</p>
      <p className="text-xs text-sognos-muted">14 Elm St, Parramatta</p>
      <div className="mt-2">
        <CheckRows items={items} step={step} />
      </div>
      <p className="mt-3 rounded-full bg-sognos-blue-accent py-2 text-center text-xs font-medium text-white">
        Start visit
      </p>
    </Rise>
  );
}

const DEMAND = [52, 58, 61, 66, 72, 84, 92, 88, 70, 64, 60, 58, 55, 50];
function Copilot({ show, still }: VisualProps) {
  return (
    <div className="w-full max-w-md space-y-3 text-left">
      <Rise show={show} className={`${CARD} p-4`}>
        <p className="text-xs text-sognos-muted">Demand vs capacity &middot; next 14 days</p>
        <div className="mt-3 flex h-20 items-end gap-1">
          {DEMAND.map((h, i) => (
            <Bar
              key={i}
              show={show}
              height={h}
              delay={i * 0.04}
              className="flex-1"
              style={{ background: i >= 5 && i <= 7 ? DEEP : mix(BASE, 45) }}
            />
          ))}
        </div>
      </Rise>
      <Rise show={show} delay={0.12} className="rounded-lg border border-white/10 bg-sognos-care-dark p-4">
        <p className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase" style={{ color: BASE }}>
          <span aria-hidden="true">&#10022;</span> Copilot suggestion
        </p>
        <p className="mt-2 min-h-[3.5rem] font-mono text-[13px] leading-relaxed text-white/85">
          <Typed
            text="Demand peaks Thu-Sat. Offer 6 extra shifts to casual pool and pull 2 workers forward from the southern region."
            show={show}
            still={still}
            cursor={BASE}
          />
        </p>
      </Rise>
    </div>
  );
}

const VISUALS: Record<string, (p: VisualProps) => ReactNode> = {
  scheduling: Scheduling,
  "skills-matching": SkillsMatching,
  "route-optimisation": RouteOptimisation,
  "real-time-adjustments": RealTime,
  "mobile-app": MobileApp,
  copilot: Copilot,
};

export default function RosterFeatureVisual({ id, index }: { id: string; index: number }) {
  return (
    <VisualFrame
      index={index}
      // CMS ids may differ from the defaults — fall back to position.
      visual={VISUALS[id] ?? Object.values(VISUALS)[index % 6]}
      className="min-h-[340px] px-5 py-8 sm:p-8 md:min-h-[400px] lg:p-10"
    />
  );
}
