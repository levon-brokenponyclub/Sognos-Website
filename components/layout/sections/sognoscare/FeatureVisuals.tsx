"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bar,
  CARD,
  CountUp,
  Draw,
  EASE,
  PalettePicker,
  PaletteProvider,
  Pulse,
  Rise,
  Typed,
  VisualFrame,
  mix,
  stepState,
  useCycle,
  useRun,
  type Palettes,
  type VisualProps,
} from "@/components/ui/visuals/primitives";

// SognosCare feature motion graphics (gallery: 04b-feature-visuals.html,
// SognosCare graphics; palette C chosen). Card data is illustrative.

const CARE = "var(--sognos-care-base)";
const ACCENT = "var(--sognos-blue-accent)";
const DARK = "var(--sognos-care-dark)";
const ROSE = "#ff8e90";
const AMBER = "#ffad6e";

const alt = (a: string, b: string) => [a, b, a, b, a, b];
const PALETTES: Palettes = {
  a: {
    name: "Sector pastels",
    colours: ["#f4f8f9", "#ebfbe3", "#f5f6ee", "#f7edf3", "var(--sognos-tint)", "#ebfbe3"],
  },
  b: { name: "Brand tint", colours: ["var(--sognos-tint)"] },
  c: { name: "Care blues", colours: alt(mix(CARE, 8), mix(CARE, 14)) },
  d: { name: "Care navy", colours: alt("#0f1936", "#152248") },
  e: {
    name: "Edition tints",
    colours: ["#00a98f", "#ffad6e", "#cbdd61", "#ff8e90", "#caa4ff", "#ff7dbc"].map((c) => mix(c, 18)),
  },
  f: { name: "Outlined white", colours: ["#ffffff"] },
};

export function CareVisualsProvider({ children }: { children: ReactNode }) {
  return (
    <PaletteProvider storageKey="sognos-care-feature-palette" palettes={PALETTES} initial="c">
      {children}
    </PaletteProvider>
  );
}
export const CarePalettePicker = () => <PalettePicker label="Feature panel colours" />;

// ── Visuals ────────────────────────────────────────────────────────────────

const STAGES = ["Referral", "Intake", "Assessment", "Goals", "Delivery", "Review"];
const TEAM = [
  ["PS", CARE],
  ["JK", "#00a98f"],
  ["AL", "#ff7dbc"],
] as const;

function CaseManagement({ show, still }: VisualProps) {
  const at = useCycle(STAGES.length, show, still, 1500, 2);
  return (
    <div className="w-full max-w-md space-y-3 text-left">
      <Rise show={show} className={`${CARD} flex items-center gap-4 p-4`}>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sognos-care-dark text-sm font-medium text-white">
          MT
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-sognos-heading">M. Turner</p>
          <p className="text-xs text-sognos-muted">Support at Home &middot; Level 3</p>
        </div>
        <div className="flex -space-x-2">
          {TEAM.map(([t, c]) => (
            <span
              key={t}
              className="flex size-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-medium text-white"
              style={{ background: c }}
            >
              {t}
            </span>
          ))}
        </div>
      </Rise>
      <Rise show={show} delay={0.12} className={`${CARD} p-4`}>
        <p className="text-xs text-sognos-muted">Participant journey</p>
        <ol className="mt-3 grid grid-cols-6 gap-1.5">
          {STAGES.map((s, i) => {
            const state = stepState(i, at);
            return (
              <li key={s} className="flex flex-col gap-2">
                <span
                  className="h-1.5 rounded-full transition-colors duration-500"
                  style={{ background: state === "done" ? DARK : state === "now" ? ACCENT : "var(--sognos-line)" }}
                />
                <span
                  className={`truncate text-[10px] transition-colors ${
                    state === "now" ? "font-medium text-sognos-heading" : "text-sognos-muted"
                  }`}
                >
                  {s}
                </span>
              </li>
            );
          })}
        </ol>
      </Rise>
      <Rise show={show} delay={0.24} className={`${CARD} flex items-center justify-between p-4 text-sm`}>
        <span className="text-sognos-body">Next review</span>
        <span className="font-medium text-sognos-heading">12 Dec &middot; Care plan</span>
      </Rise>
    </div>
  );
}

const WEEK: [string, number, number, boolean?][] = [
  ["M", 72, 70],
  ["T", 80, 78],
  ["W", 64, 52, true],
  ["T", 88, 88],
  ["F", 76, 74],
  ["S", 40, 40],
  ["S", 32, 30],
];
function ServiceDelivery({ show, still }: VisualProps) {
  return (
    <div className="relative w-full max-w-md text-left">
      <Rise show={show} className={`${CARD} p-5`}>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-sognos-heading">Scheduled vs delivered</p>
          <span className="flex items-center gap-3 text-[10px] text-sognos-muted">
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-sm bg-sognos-line" />
              Scheduled
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-sm bg-sognos-care-dark" />
              Delivered
            </span>
          </span>
        </div>
        <div className="mt-4 flex h-36 items-end gap-3">
          {WEEK.map(([d, s, v, short], i) => (
            <div key={i} className="flex h-full flex-1 flex-col items-center gap-1.5">
              <div className="flex w-full flex-1 items-end justify-center gap-1">
                <Bar show={show} height={s} delay={i * 0.06} className="w-1/2 bg-sognos-line" />
                <Bar
                  show={show}
                  height={v}
                  delay={0.12 + i * 0.06}
                  className="w-1/2"
                  style={{ background: short ? ROSE : DARK }}
                />
              </div>
              <span className="text-[10px] text-sognos-muted">{d}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-2 text-xs text-sognos-body">
          <Pulse color={ROSE} still={still} />
          Wednesday: 12 visits short &mdash; coordinator notified
        </p>
      </Rise>
      <Rise show={show} delay={0.3} className={`${CARD} absolute -right-2 -bottom-4 w-48 p-3 sm:-right-6`}>
        <p className="text-xs text-sognos-muted">Field check-in</p>
        <p className="mt-1 text-sm font-medium text-sognos-heading">9:02 am &middot; GPS verified</p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-emerald-700">
          <span aria-hidden="true">&#10003;</span> On time
        </p>
      </Rise>
    </div>
  );
}

const AUDIT = [
  ["Care plan v4 approved", "Coordinator · 10:14:02"],
  ["Funding rule applied", "Support at Home cap · 10:14:09"],
  ["Incident report filed", "Worker app · 10:15:31"],
  ["Progress note signed", "P. Shah · 10:16:05"],
  ["Document versioned", "Service agreement v2 · 10:16:40"],
] as const;
function Compliance({ show, still }: VisualProps) {
  const head = useCycle(AUDIT.length, show, still, 2600);
  const rows = [0, 1, 2, 3].map((k) => AUDIT[(head + AUDIT.length - k) % AUDIT.length]);
  return (
    <div className="relative w-full max-w-md text-left">
      <Rise show={show} className={`${CARD} overflow-hidden`}>
        <div className="flex items-center justify-between border-b border-sognos-line px-4 py-3">
          <p className="text-sm font-medium text-sognos-heading">Audit trail</p>
          <span className="text-[10px] tracking-widest text-sognos-muted uppercase">&#128274; Immutable</span>
        </div>
        <ul className="min-h-[13rem]">
          {rows.map(([a, b], k) => (
            <motion.li
              key={`${head}-${a}`}
              initial={k === 0 && !still ? { opacity: 0, y: -10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex items-center gap-3 border-b border-sognos-line px-4 py-3 last:border-b-0"
            >
              <span className="size-1.5 shrink-0 bg-sognos-blue-accent" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-sognos-heading">{a}</p>
                <p className="text-xs text-sognos-muted tabular-nums">{b}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </Rise>
      <Rise
        show={show}
        delay={0.3}
        className="absolute -top-4 -right-2 flex items-center gap-2 rounded-full bg-sognos-care-dark px-4 py-2 text-xs font-medium text-white sm:-right-6"
      >
        &#10003; Audit-ready
      </Rise>
    </div>
  );
}

function Reporting({ show, still }: VisualProps) {
  const kpis: [string, number, string][] = [
    ["Participants", 1284, ""],
    ["Hours delivered", 9640, ""],
    ["On budget", 96, "%"],
  ];
  return (
    <div className="w-full max-w-md space-y-3 text-left">
      <div className="grid grid-cols-3 gap-3">
        {kpis.map(([label, to, suf], i) => (
          <Rise key={label} show={show} delay={0.1 * i} className={`${CARD} p-3`}>
            <p className="text-[10px] text-sognos-muted">{label}</p>
            <p className="mt-1 font-heading text-2xl text-sognos-heading">
              <CountUp to={to} suffix={suf} run={show} still={still} />
            </p>
          </Rise>
        ))}
      </div>
      <Rise show={show} delay={0.12} className={`${CARD} p-4`}>
        <p className="text-xs text-sognos-muted">Outcome goals met &middot; last 12 months</p>
        <svg viewBox="0 0 300 80" className="mt-2 h-20 w-full" fill="none">
          <Draw
            d="M0 64 L27 60 L54 62 L81 50 L108 54 L135 42 L162 44 L189 32 L216 36 L243 24 L270 20 L300 12"
            show={show}
            still={still}
            stroke={ACCENT}
          />
        </svg>
      </Rise>
      <Rise show={show} delay={0.36} className={`${CARD} flex items-center gap-3 p-3`}>
        <span className="flex size-9 items-center justify-center rounded bg-sognos-tint text-xs font-medium text-sognos-heading">
          PDF
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-sognos-heading">Monthly funding report</p>
          <p className="text-xs text-sognos-muted">Generated from live data &middot; just now</p>
        </div>
        <span className="text-xs text-emerald-700">&#10003;</span>
      </Rise>
    </div>
  );
}

export function Copilot({ show, still }: VisualProps) {
  return (
    <div className="relative w-full max-w-md text-left">
      <Rise show={show} className="overflow-hidden rounded-lg border border-white/10 bg-sognos-care-dark">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <p className="text-sm text-white">Progress note &middot; M. Turner</p>
          <span className="text-xs text-white/50">Dynamics 365</span>
        </div>
        <div className="p-4">
          <p className="flex items-center gap-2 text-xs font-medium tracking-widest text-sognos-blue-accent uppercase">
            <span aria-hidden="true">&#10022;</span> Copilot draft
          </p>
          <p className="mt-3 min-h-[6rem] font-mono text-[13px] leading-relaxed text-white/85">
            <Typed
              text="Client settled after morning routine. Assisted with shower and breakfast; medication taken 9:15. Mood bright, mobility steady. No concerns raised."
              show={show}
              still={still}
              cursor={ACCENT}
            />
          </p>
          <div className="mt-4 flex gap-2">
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-sognos-heading">Accept</span>
            <span className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/80">Edit</span>
          </div>
        </div>
      </Rise>
      <Rise show={show} delay={0.3} className={`${CARD} absolute -right-2 -bottom-5 w-56 p-3 sm:-right-6`}>
        <p className="flex items-center gap-2 text-xs font-medium text-sognos-heading">
          <Pulse color={AMBER} still={still} />
          Anomaly detected
        </p>
        <p className="mt-1 text-xs text-sognos-body">3 missed visits for A. Nguyen this week</p>
      </Rise>
    </div>
  );
}

const FLOW = [
  ["Trigger", "Care plan change"],
  ["Approval", "Manager approval"],
  ["Microsoft Teams", "Notify team"],
  ["Teams · Care coordination", "Care plan v4 for M. Turner approved — roster updated."],
] as const;
function Automation({ show, still }: VisualProps) {
  const step = useRun(FLOW.length, show, still);
  const fill = (Math.min(step, FLOW.length - 1) / (FLOW.length - 1)) * 100;
  return (
    <div className="relative w-full max-w-md text-left">
      <div
        aria-hidden="true"
        className="absolute top-[2.75rem] bottom-[3.25rem] left-[21px] w-0.5 border-l-2 border-dashed border-sognos-blue-accent/40"
      >
        <div
          className="absolute top-0 -left-0.5 w-0.5 bg-sognos-blue-accent transition-[height] duration-700 ease-out"
          style={{ height: `${show ? fill : 0}%` }}
        />
      </div>
      <div className="relative space-y-4">
        {FLOW.map(([label, title], i) => {
          const state = stepState(i, step);
          return (
            <Rise key={label} show={show} delay={0.1 * i} className="flex items-center gap-4">
              <span
                className={`relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border text-xs font-medium transition-colors duration-300 ${
                  state === "done"
                    ? "border-sognos-care-dark bg-sognos-care-dark text-white"
                    : state === "now"
                      ? "border-sognos-blue-accent bg-sognos-blue-accent text-white"
                      : "border-sognos-line bg-white text-sognos-heading"
                }`}
              >
                <AnimatePresence>
                  {state === "now" && !still && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-sognos-blue-accent"
                      animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.6, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative">{i + 1}</span>
              </span>
              <div
                className={`flex-1 rounded-lg border bg-white p-3 transition-colors duration-300 ${
                  state === "now" ? "border-sognos-blue-accent" : "border-sognos-line"
                }`}
              >
                <p className="text-[10px] tracking-widest text-sognos-muted uppercase">{label}</p>
                <p className="mt-0.5 text-sm font-medium text-sognos-heading">{title}</p>
              </div>
            </Rise>
          );
        })}
      </div>
    </div>
  );
}

const VISUALS: Record<string, (p: VisualProps) => ReactNode> = {
  "case-management": CaseManagement,
  "service-delivery": ServiceDelivery,
  compliance: Compliance,
  reporting: Reporting,
  copilot: Copilot,
  automation: Automation,
};

export default function CareFeatureVisual({ id, index }: { id: string; index: number }) {
  return (
    <VisualFrame
      index={index}
      // CMS ids may differ from the defaults — fall back to position.
      visual={VISUALS[id] ?? Object.values(VISUALS)[index % 6]}
      className="min-h-[340px] px-5 py-8 sm:p-8 md:min-h-[400px] lg:p-10"
    />
  );
}
