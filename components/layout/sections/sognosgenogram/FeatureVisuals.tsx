"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  CARD,
  CheckRows,
  Draw,
  EASE,
  PaletteProvider,
  Pulse,
  Rise,
  Typed,
  VisualFrame,
  stepState,
  useCycle,
  useRun,
  type Palettes,
  type VisualProps,
} from "@/components/ui/visuals/primitives";

// SognosGenogram feature motion graphics (Products Inspector; generator:
// docs/mockups/_generators/product_visuals.py). Card data is illustrative.

const BASE = "var(--sognos-genogram-base)";
const ACCENT = "var(--sognos-genogram-accent)";
const DARK = "var(--sognos-genogram-dark)";
const MUTED = "#68706f";
const TEAL = "#00a98f";
const AMBER = "#ffad6e";
const ROSE = "#ff8e90";

// Panels alternate Genogram soft / tint, as in the mockup.
const PALETTES: Palettes = {
  a: {
    name: "Genogram tints",
    colours: ["var(--sognos-genogram-soft)", "var(--sognos-genogram-tint)"],
  },
};

export function GenogramVisualsProvider({ children }: { children: ReactNode }) {
  return (
    <PaletteProvider storageKey="sognos-genogram-feature-palette" palettes={PALETTES} initial="a">
      {children}
    </PaletteProvider>
  );
}

/** SVG group that fades in with the panel, staggered by `order`. */
function In({ show, order, children }: { show: boolean; order: number; children: ReactNode }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.15 * order }}
    >
      {children}
    </motion.g>
  );
}

const Avatar = ({ t, bg = DARK, size = "size-9" }: { t: string; bg?: string; size?: string }) => (
  <span
    className={`flex ${size} shrink-0 items-center justify-center rounded-full border-2 border-white text-[11px] font-medium text-white`}
    style={{ background: bg }}
  >
    {t}
  </span>
);

// ── Interactive genogram builder ────────────────────────────────────────────
function Builder({ show, still }: VisualProps) {
  return (
    <div className="w-full max-w-md space-y-3 text-left">
      <Rise show={show} className={`${CARD} p-4`}>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-sognos-heading">M. Turner &middot; family</p>
          <span className="rounded-full bg-sognos-genogram-soft px-2.5 py-1 text-[10px] font-medium text-sognos-genogram-ink">
            Genogram
          </span>
        </div>
        <svg viewBox="0 0 300 170" className="mt-2 h-auto w-full" aria-hidden="true">
          <path
            d="M70 40 H140 M105 40 V80 M60 80 H150 M60 80 V110 M150 80 V110 M195 40 H250"
            stroke={BASE}
            strokeWidth="2"
            fill="none"
          />
          <Draw d="M150 125 C190 125 200 70 222 55" show={show} still={still} stroke={ACCENT} width={1.5} />
          <In show={show} order={1}>
            <rect x="55" y="27" width="26" height="26" rx="3" fill="#fff" stroke={BASE} strokeWidth="2" />
            <circle cx="140" cy="40" r="13" fill="#fff" stroke={BASE} strokeWidth="2" />
          </In>
          <In show={show} order={2}>
            <rect x="47" y="110" width="26" height="26" rx="3" fill="#fff" stroke={BASE} strokeWidth="2" />
            <circle cx="150" cy="123" r="13" fill={BASE} />
          </In>
          <In show={show} order={3}>
            <rect x="182" y="27" width="26" height="26" rx="3" fill="#fff" stroke={ACCENT} strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="250" cy="40" r="13" fill="#fff" stroke={ACCENT} strokeWidth="2" strokeDasharray="3 3" />
          </In>
          <text x="150" y="160" textAnchor="middle" fontSize="10" fill={MUTED} fontFamily="sans-serif">
            Client
          </text>
        </svg>
      </Rise>
      <Rise show={show} delay={0.15} className="flex gap-2">
        {["+ Person", "Relationship", "Notation"].map((t) => (
          <span key={t} className="rounded-full border border-sognos-line bg-white px-3 py-1.5 text-xs text-sognos-heading">
            {t}
          </span>
        ))}
      </Rise>
    </div>
  );
}

// ── Support network mapping ─────────────────────────────────────────────────
const NET = [
  ["Daughter", 150, 22, BASE],
  ["GP", 262, 62, TEAL],
  ["Support worker", 262, 150, BASE],
  ["OT", 150, 190, TEAL],
  ["Pharmacist", 38, 150, AMBER],
  ["Neighbour", 38, 62, ACCENT],
] as const;
function Network({ show, still }: VisualProps) {
  return (
    <Rise show={show} className={`${CARD} w-full max-w-md p-4 text-left`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-sognos-heading">Support network &middot; M. Turner</p>
        <span className="text-xs text-sognos-muted">6 people</span>
      </div>
      <svg viewBox="0 0 300 212" className="mt-2 h-auto w-full" aria-hidden="true">
        {NET.map(([n, x, y, c]) => (
          <Draw key={n} d={`M150 106 L${x} ${y}`} show={show} still={still} stroke={c} width={1.5} />
        ))}
        <circle cx="150" cy="106" r="22" fill={BASE} />
        <text x="150" y="110" textAnchor="middle" fontSize="11" fill="#fff" fontFamily="sans-serif">
          MT
        </text>
        {NET.map(([n, x, y, c], k) => (
          <In key={n} show={show} order={Math.min(k + 1, 4)}>
            <circle cx={x} cy={y} r="9" fill="#fff" stroke={c} strokeWidth="2" />
            <text x={x} y={y > 106 ? y + 22 : y - 14} textAnchor="middle" fontSize="9" fill={MUTED} fontFamily="sans-serif">
              {n}
            </text>
          </In>
        ))}
      </svg>
      <p className="flex gap-4 text-[10px] text-sognos-muted">
        {[
          ["Family", BASE],
          ["Formal", TEAL],
          ["Strained", AMBER],
        ].map(([l, c]) => (
          <span key={l} className="flex items-center gap-1">
            <span className="size-2 rounded-full" style={{ background: c }} />
            {l}
          </span>
        ))}
      </p>
    </Rise>
  );
}

// ── Risk and protective factor tagging ──────────────────────────────────────
const TAGS = [
  "S. Turner · Protective",
  "J. Turner · Risk - monitor",
  "Neighbour · Protective",
  "Ex-partner · No contact order",
];
function Tagging({ show, still }: VisualProps) {
  const step = useRun(TAGS.length, show, still);
  return (
    <div className="w-full max-w-md space-y-3 text-left">
      <Rise show={show} className={`${CARD} px-4 py-2`}>
        <p className="pt-1 text-xs text-sognos-muted">Relationship tags &middot; M. Turner</p>
        <CheckRows items={TAGS} step={step} />
      </Rise>
      <Rise show={show} delay={0.15} className={`${CARD} flex items-center gap-3 p-3`}>
        <Pulse color={ROSE} still={still} />
        <p className="text-xs text-sognos-heading">1 relationship needs review before the next visit</p>
      </Rise>
    </div>
  );
}

// ── Embedded in the case record ─────────────────────────────────────────────
function CaseRecord({ show }: VisualProps) {
  return (
    <div className="w-full max-w-md text-left">
      <Rise show={show} className={`${CARD} overflow-hidden`}>
        <div className="flex items-center gap-3 border-b border-sognos-line p-4">
          <Avatar t="MT" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-sognos-heading">M. Turner</p>
            <p className="text-xs text-sognos-muted">Case #C-2207 &middot; Child &amp; Family</p>
          </div>
        </div>
        <div className="flex gap-4 border-b border-sognos-line px-4 text-xs">
          {["Overview", "Notes", "Genogram", "Plans"].map((t) => (
            <span
              key={t}
              className={`py-2.5 ${
                t === "Genogram"
                  ? "border-b-2 border-sognos-genogram-base font-medium text-sognos-heading"
                  : "text-sognos-muted"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="p-4">
          <svg viewBox="0 0 300 90" className="h-auto w-full" aria-hidden="true">
            <path d="M90 25 H200 M145 25 V55 M100 55 H190 M100 55 V70 M190 55 V70" stroke={BASE} strokeWidth="2" fill="none" />
            <rect x="76" y="12" width="26" height="26" rx="3" fill="#fff" stroke={BASE} strokeWidth="2" />
            <circle cx="200" cy="25" r="13" fill="#fff" stroke={BASE} strokeWidth="2" />
            <rect x="87" y="66" width="22" height="22" rx="3" fill="#fff" stroke={BASE} strokeWidth="2" />
            <circle cx="190" cy="77" r="11" fill={BASE} />
          </svg>
        </div>
      </Rise>
      <Rise show={show} delay={0.3} className={`${CARD} mt-3 flex items-center justify-between p-3`}>
        <span className="flex -space-x-2">
          {[
            ["PS", BASE],
            ["JK", TEAL],
            ["AL", "#ff7dbc"],
            ["EL", DARK],
          ].map(([t, c]) => (
            <Avatar key={t} t={t} bg={c} size="size-7" />
          ))}
        </span>
        <span className="text-xs text-sognos-body">Same picture for 4 workers</span>
      </Rise>
    </div>
  );
}

// ── Historical snapshots ────────────────────────────────────────────────────
const YEARS = ["2019", "2022", "2025", "2026"];
export function Snapshots({ show, still }: VisualProps) {
  const at = useCycle(YEARS.length, show, still, 1500, 2);
  return (
    <div className="w-full max-w-md space-y-3 text-left">
      <Rise show={show} className={`${CARD} p-4`}>
        <p className="text-xs text-sognos-muted">Network over time</p>
        <ol className="mt-3 grid grid-cols-4 gap-1.5">
          {YEARS.map((y, i) => {
            const state = stepState(i, at);
            return (
              <li key={y} className="flex flex-col gap-2">
                <span
                  className="h-1.5 rounded-full transition-colors duration-500"
                  style={{ background: state === "done" ? DARK : state === "now" ? BASE : "var(--sognos-line)" }}
                />
                <span
                  className={`truncate text-[10px] transition-colors ${
                    state === "now" ? "font-medium text-sognos-heading" : "text-sognos-muted"
                  }`}
                >
                  {y}
                </span>
              </li>
            );
          })}
        </ol>
      </Rise>
      <Rise show={show} delay={0.15} className="grid grid-cols-2 gap-3">
        {[
          ["2022", "4"],
          ["2026", "6"],
        ].map(([y, n]) => (
          <div key={y} className={`${CARD} p-3`}>
            <p className="text-[10px] tracking-widest text-sognos-muted uppercase">{y}</p>
            <p className="mt-1 font-heading text-2xl text-sognos-heading">{n}</p>
            <p className="text-xs text-sognos-muted">supports</p>
          </div>
        ))}
      </Rise>
      <Rise show={show} delay={0.3} className={`${CARD} flex items-center gap-3 p-3`}>
        <span className="flex size-8 shrink-0 items-center justify-center rounded bg-sognos-genogram-soft text-xs text-sognos-genogram-ink">
          &#43;2
        </span>
        <p className="text-xs text-sognos-heading">Neighbour and OT added since last snapshot</p>
      </Rise>
    </div>
  );
}

// ── Copilot AI narrative ────────────────────────────────────────────────────
function Narrative({ show, still }: VisualProps) {
  return (
    <Rise show={show} className="w-full max-w-md overflow-hidden rounded-lg border border-white/10 bg-sognos-genogram-dark text-left">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <p className="text-sm text-white">Family summary &middot; M. Turner</p>
        <span className="text-xs text-white/50">Dynamics 365</span>
      </div>
      <div className="p-4">
        <p className="flex items-center gap-2 text-xs font-medium tracking-widest text-sognos-genogram-accent uppercase">
          <span aria-hidden="true">&#10022;</span> Copilot narrative
        </p>
        <p className="mt-3 min-h-[6rem] font-mono text-[13px] leading-relaxed text-white/85">
          <Typed
            text="M. Turner lives with her daughter, S. Turner, who is her primary carer. A neighbour checks in daily. Contact with her son is strained and is being monitored."
            show={show}
            still={still}
            cursor={ACCENT}
          />
        </p>
        <div className="mt-4 flex gap-2">
          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-sognos-heading">Add to handover</span>
          <span className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/80">Edit</span>
        </div>
      </div>
    </Rise>
  );
}

const VISUALS: Record<string, (p: VisualProps) => ReactNode> = {
  "genogram-builder": Builder,
  "support-network": Network,
  "risk-tagging": Tagging,
  "case-record": CaseRecord,
  "historical-snapshots": Snapshots,
  "copilot-narrative": Narrative,
};

export default function GenogramFeatureVisual({ id, index }: { id: string; index: number }) {
  return (
    <VisualFrame
      index={index}
      visual={VISUALS[id] ?? Object.values(VISUALS)[index % 6]}
      className="min-h-[340px] px-5 py-8 sm:p-8 md:min-h-[400px] lg:p-10"
    />
  );
}
