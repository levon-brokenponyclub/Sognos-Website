"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  CARD,
  CheckRows,
  CountUp,
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

// DigPacks solution motion graphics (Products Inspector, pvis "graphic";
// generator: docs/mockups/_generators/product_visuals.py). Card data is
// illustrative.

const BASE = "var(--sognos-digpacks-base)";
const DARK = "var(--sognos-digpacks-dark)";
const SECOND = "#005eb8"; // DigPacks brand secondary (brand guide v1.0)
const ROSE = "#ff8e90";
const AMBER = "#ffad6e";
const TEAL = "#00a98f";

// Panels alternate DigPacks base #b8166e / dark #5d1e4c (polish 2026-11-02).
const PALETTES: Palettes = {
  a: {
    name: "DigPacks brand",
    colours: ["var(--sognos-digpacks-base)", "var(--sognos-digpacks-dark)"],
  },
};

export function DigPacksVisualsProvider({ children }: { children: ReactNode }) {
  return (
    <PaletteProvider storageKey="sognos-digpacks-feature-palette" palettes={PALETTES} initial="a">
      {children}
    </PaletteProvider>
  );
}

const Sparkle = () => <span aria-hidden="true">&#10022;</span>;

// ── Risk Management ─────────────────────────────────────────────────────────
const RAG = { High: ROSE, Med: AMBER, Low: TEAL } as const;
const RISKS = [
  ["High", "Ward 4 ligature points", "J. Patel"],
  ["Med", "Lone working - community", "A. Shaw"],
  ["Low", "Equipment servicing", "R. Moss"],
] as const;
const RISK_FLOW = ["Assessment complete", "Action assigned", "Evidence uploaded", "Approved"];
function RiskManagement({ show, still }: VisualProps) {
  const step = useRun(RISK_FLOW.length, show, still);
  return (
    <div className="w-full max-w-md space-y-3 text-left">
      <Rise show={show} className={`${CARD} overflow-hidden`}>
        <div className="flex items-center justify-between border-b border-sognos-line px-4 py-3">
          <p className="text-sm font-medium text-sognos-heading">Risk register</p>
          <span className="text-xs text-sognos-muted">3 sites</span>
        </div>
        <ul>
          {RISKS.map(([r, t, o]) => (
            <li key={t} className="flex items-center gap-3 border-b border-sognos-line px-4 py-2.5 last:border-b-0">
              <span className="rounded px-1.5 py-0.5 text-[10px] font-medium text-white" style={{ background: RAG[r] }}>
                {r}
              </span>
              <span className="flex-1 truncate text-sm text-sognos-heading">{t}</span>
              <span className="text-xs text-sognos-muted">{o}</span>
            </li>
          ))}
        </ul>
      </Rise>
      <Rise show={show} delay={0.15} className={`${CARD} px-4 py-2`}>
        <CheckRows items={RISK_FLOW} step={step} />
      </Rise>
    </div>
  );
}

// ── Safety Lens ─────────────────────────────────────────────────────────────
function SafetyLens({ show, still }: VisualProps) {
  return (
    <div className="w-full max-w-md space-y-3 text-left">
      <Rise show={show} className="relative overflow-hidden rounded-lg border border-sognos-line" >
        <svg viewBox="0 0 300 140" className="block h-auto w-full" aria-hidden="true">
          <rect width="300" height="140" fill={DARK} />
          <path
            d="M0 110 L300 110 M40 110 L40 30 L120 30 L120 110 M200 30 H260 V80 H200 Z"
            stroke="rgb(255 255 255 / .25)"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="108" cy="72" r="4" fill="rgb(255 255 255 / .6)" />
        </svg>
        {/* Detection boxes: high (pulsing) and medium. */}
        <span className="absolute top-[44%] left-[32%] size-8">
          {!still && (
            <motion.span
              className="absolute inset-0 rounded border-2"
              style={{ borderColor: ROSE }}
              animate={{ opacity: [0.8, 0, 0.8], scale: [1, 1.5, 1] }}
              transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
            />
          )}
          <span className="absolute inset-0 rounded border-2" style={{ borderColor: ROSE }} />
        </span>
        <span className="absolute top-[18%] left-[64%] h-12 w-20 rounded border-2" style={{ borderColor: AMBER }} />
        <span className="absolute bottom-2 left-2 rounded bg-black/40 px-2 py-1 text-[10px] text-white">
          Room 4B &middot; photo analysed
        </span>
      </Rise>
      <Rise show={show} delay={0.15} className={`${CARD} p-4`}>
        <p className="flex items-center gap-2 text-xs font-medium tracking-widest text-sognos-digpacks-ink uppercase">
          <Sparkle /> Draft assessment
        </p>
        <p className="mt-2 min-h-[3.5rem] font-mono text-[12px] leading-relaxed text-sognos-heading">
          <Typed
            text="Door handle: potential ligature point (high). Window restrictor present. Recommend anti-ligature fitting before next review."
            show={show}
            still={still}
            cursor={BASE}
          />
        </p>
      </Rise>
    </div>
  );
}

// ── People & HR Management ──────────────────────────────────────────────────
const HR_FLOW = ["Request submitted", "Line manager approved", "Roster updated", "Employee notified"];
function PeopleHR({ show, still }: VisualProps) {
  const step = useRun(HR_FLOW.length, show, still);
  return (
    <div className="w-full max-w-md space-y-3 text-left">
      <Rise show={show} className={`${CARD} flex items-center gap-3 p-4`}>
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-[11px] font-medium text-white"
          style={{ background: DARK }}
        >
          AS
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-sognos-heading">Leave request &middot; 3 days</p>
          <p className="text-xs text-sognos-muted">A. Shaw &middot; 12-14 Nov</p>
        </div>
        <span className="rounded-full bg-sognos-digpacks-soft px-2.5 py-1 text-[10px] font-medium text-sognos-digpacks-ink">
          Self-service
        </span>
      </Rise>
      <Rise show={show} delay={0.15} className={`${CARD} px-4 py-2`}>
        <CheckRows items={HR_FLOW} step={step} />
      </Rise>
    </div>
  );
}

// ── Vaccination Hub ─────────────────────────────────────────────────────────
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const BOOKED = new Set(["0-0", "0-2", "1-1", "1-3", "2-0", "2-4", "3-2", "3-3", "4-1", "4-4"]);
function VaccinationHub({ show, still }: VisualProps) {
  return (
    <div className="w-full max-w-md space-y-3 text-left">
      <Rise show={show} className={`${CARD} p-4`}>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-sognos-heading">Flu clinic &middot; week 46</p>
          <span className="text-xs text-sognos-muted">
            Booked <CountUp to={186} run={show} still={still} />
          </span>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-1.5 text-center text-[10px] text-sognos-muted">
          {DAYS.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="mt-1.5 grid grid-flow-col grid-cols-5 grid-rows-5 gap-1.5">
          {Array.from({ length: 25 }, (_, n) => {
            const c = Math.floor(n / 5);
            const r = n % 5;
            return BOOKED.has(`${c}-${r}`) ? (
              <motion.span
                key={n}
                className="h-6 rounded"
                style={{ background: BASE }}
                initial={{ opacity: still ? 1 : 0, scale: still ? 1 : 0.6 }}
                animate={show ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, ease: EASE, delay: still ? 0 : n * 0.07 }}
              />
            ) : (
              <span key={n} className="h-6 rounded border border-dashed border-sognos-line" />
            );
          })}
        </div>
      </Rise>
      <Rise show={show} delay={0.15} className={`${CARD} flex items-center justify-between p-3 text-sm`}>
        <span className="text-sognos-body">Recorded externally</span>
        <span className="font-medium text-sognos-heading">
          <CountUp to={42} run={show} still={still} />
        </span>
      </Rise>
    </div>
  );
}

// ── Privacy Impact Assessment ───────────────────────────────────────────────
const PIA_STAGES = ["Screening", "Assessment", "Risks", "Mitigation", "Approval"];
function PrivacyImpact({ show, still }: VisualProps) {
  const at = useCycle(PIA_STAGES.length, show, still, 1500, 2);
  return (
    <div className="w-full max-w-md space-y-3 text-left">
      <Rise show={show} className={`${CARD} p-4`}>
        <p className="text-sm font-medium text-sognos-heading">PIA &middot; New referral portal</p>
        <p className="text-xs text-sognos-muted">Privacy Impact Assessment</p>
        <ol className="mt-4 grid grid-cols-5 gap-1.5">
          {PIA_STAGES.map((s, i) => {
            const state = stepState(i, at);
            return (
              <li key={s} className="flex flex-col gap-2">
                <span
                  className="h-1.5 rounded-full transition-colors duration-500"
                  style={{
                    background: state === "done" ? DARK : state === "now" ? BASE : "var(--sognos-line)",
                  }}
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
      <Rise show={show} delay={0.15} className={`${CARD} grid grid-cols-3 divide-x divide-sognos-line`}>
        {[
          ["7", "risks logged"],
          ["5", "mitigated"],
          ["2", "for approval"],
        ].map(([n, l]) => (
          <div key={l} className="p-3">
            <p className="font-heading text-2xl text-sognos-heading">{n}</p>
            <p className="text-[10px] text-sognos-muted">{l}</p>
          </div>
        ))}
      </Rise>
      <Rise show={show} delay={0.3} className={`${CARD} flex items-center gap-3 p-3`}>
        <span
          className="flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] text-white"
          style={{ background: SECOND }}
        >
          <Sparkle />
        </span>
        <p className="text-xs text-sognos-heading">Agent: 2 questions left in this section</p>
      </Rise>
    </div>
  );
}

// ── IT Service Management ───────────────────────────────────────────────────
const REQUESTS = [
  ["Password reset", "Resolved by FixIT Agent · 1 min"],
  ["New starter laptop", "Assigned to Service Desk · P2"],
  ["Teams access", "Resolved by FixIT Agent · 2 min"],
  ["Printer offline - Ward 3", "Escalated to on-site · P3"],
  ["VPN not connecting", "Guided self-service · resolved"],
] as const;
function ITService({ show, still }: VisualProps) {
  const head = useCycle(REQUESTS.length, show, still, 2600);
  const rows = [0, 1, 2, 3].map((k) => REQUESTS[(head + REQUESTS.length - k) % REQUESTS.length]);
  return (
    <div className="relative w-full max-w-md text-left">
      <Rise show={show} className={`${CARD} overflow-hidden`}>
        <div className="flex items-center justify-between border-b border-sognos-line px-4 py-3">
          <p className="text-sm font-medium text-sognos-heading">Service requests</p>
          <span className="flex items-center gap-1.5 text-[10px] tracking-widest text-sognos-muted uppercase">
            <Pulse color={BASE} still={still} />
            Live
          </span>
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
              <span className="size-1.5 shrink-0 bg-sognos-digpacks-base" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-sognos-heading">{a}</p>
                <p className="text-xs text-sognos-muted">{b}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </Rise>
      <Rise
        show={show}
        delay={0.3}
        className="absolute -top-4 -right-2 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white sm:-right-6"
      >
        <span className="absolute inset-0 rounded-full" style={{ background: SECOND }} />
        <span className="relative flex items-center gap-2">
          <Sparkle /> FixIT Agent
        </span>
      </Rise>
    </div>
  );
}

const VISUALS: Record<string, (p: VisualProps) => ReactNode> = {
  "risk-management": RiskManagement,
  "safety-lens": SafetyLens,
  "people-hr": PeopleHR,
  "vaccination-hub": VaccinationHub,
  "privacy-impact-assessment": PrivacyImpact,
  "it-service-management": ITService,
};

export default function DigPacksFeatureVisual({ id, index }: { id: string; index: number }) {
  return (
    <VisualFrame
      index={index}
      visual={VISUALS[id] ?? Object.values(VISUALS)[index % 6]}
      className="h-full p-5 sm:p-6"
    />
  );
}
