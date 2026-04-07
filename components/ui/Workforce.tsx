"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, animate as fmAnimate } from "framer-motion";

// ─── Layout constants ─────────────────────────────────────────────────────────

const VB_W = 640;
const VB_H = 360;
const WORKER_W = 178;
const JOB_W = 172;
const JOB_X = VB_W - JOB_W;
const MID_X = Math.round((WORKER_W + JOB_X) / 2);

const E = [0.22, 1, 0.36, 1] as const;

type Phase = "idle" | "active" | "matching" | "matched";

function pct(val: number, max: number) {
  return `${((val / max) * 100).toFixed(3)}%`;
}

// Rings trigger at 3s; MATCHED = MATCHING + 1300ms (arc duration)
const MATCHING_DELAYS = [1100, 1500, 1900];
const MATCHED_DELAYS = [2000, 2400, 2800];

// ─── Data ─────────────────────────────────────────────────────────────────────

const ITEMS = [
  {
    id: "round",
    worker: {
      name: "Emma Clarke",
      role: "Care Worker",
      avatar: "/images/avatar-emma.png",
      accent: "#1E40AF",
    },
    job: { label: "Morning Round", detail: "Meadowbrook — 08:00" },
    matchPct: 97,
    y: 60,
  },
  {
    id: "visit",
    worker: {
      name: "James Obi",
      role: "Support Worker",
      avatar: "/images/avatar-james.png",
      accent: "#065F46",
    },
    job: { label: "Home Visit", detail: "Thornton St — 09:30" },
    matchPct: 94,
    y: 180,
  },
  {
    id: "meds",
    worker: {
      name: "Priya Menon",
      role: "Nurse",
      avatar: "/images/avatar-priya.png",
      accent: "#6B21A8",
    },
    job: { label: "Medication Admin", detail: "St Luke's — 10:00" },
    matchPct: 99,
    y: 300,
  },
] as const;

// ─── Count-up ─────────────────────────────────────────────────────────────────

function useCountUp(to: number, trigger: boolean, duration = 1.9): string {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!trigger) return;
    const ctrl = fmAnimate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        setDisplay(String(Math.round(v)));
      },
    });
    return ctrl.stop;
  }, [trigger, to, duration]);

  return display;
}

// ─── Worker avatar ────────────────────────────────────────────────────────────

function WorkerAvatar({
  avatar,
  name,
  phase,
}: {
  avatar: string;
  name: string;
  phase: Phase;
}) {
  const matched = phase === "matched";
  return (
    <div className="relative shrink-0">
      <span
        className={`flex h-10 w-10 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-white transition-all duration-500 ${
          matched ? "ring-teal-600" : "ring-yellow-400"
        }`}
      >
        <img
          src={avatar}
          alt={name}
          className="aspect-square h-full w-full object-cover"
        />
      </span>
      {/* Status indicator — top-right */}
      <span
        className={`absolute inline-flex h-4 w-4 items-center justify-center rounded-full transition-all duration-500 ${
          matched ? "bg-teal-600" : "bg-yellow-400"
        }`}
        style={{ top: "-4px", right: "-4px" }}
      >
        {matched ? (
          <svg
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg
            width="7"
            height="7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 1.5" />
          </svg>
        )}
      </span>
    </div>
  );
}

// ─── Match ring (circular progress) ──────────────────────────────────────────

function MatchRing({ matchPct, phase }: { matchPct: number; phase: Phase }) {
  const active = phase === "matching" || phase === "matched";
  const r = 29;
  const circ = 2 * Math.PI * r;
  const count = useCountUp(matchPct, active);

  return (
    <motion.div
      className="relative z-10 flex items-center justify-center rounded-full bg-white"
      style={{ width: 75, height: 75 }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.25, ease: E }}
    >
      <svg
        width="75"
        height="75"
        viewBox="0 0 75 75"
        fill="none"
        className="-rotate-90"
      >
        <circle cx="37.5" cy="37.5" r={r} stroke="#e5e7eb" strokeWidth="4" />
        <motion.circle
          cx="37.5"
          cy="37.5"
          r={r}
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={
            active
              ? { strokeDashoffset: circ * (1 - matchPct / 100) }
              : { strokeDashoffset: circ }
          }
          transition={{ duration: 1.3, ease: E }}
        />
      </svg>
      <span className="absolute text-[16px] font-bold tabular-nums text-neutral-900">
        {active ? count : "0"}%
      </span>
    </motion.div>
  );
}

// ─── Job badge (3 states) ─────────────────────────────────────────────────────

function JobBadge({ phase }: { phase: Phase }) {
  return (
    <AnimatePresence mode="wait">
      {phase === "active" && (
        <motion.span
          key="waiting"
          className="flex-shrink-0 rounded border border-neutral-300 bg-neutral-50 px-2 py-0.5 text-[11px] font-semibold text-neutral-500"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.2, ease: E }}
        >
          Waiting
        </motion.span>
      )}
      {phase === "matching" && (
        <motion.span
          key="matching"
          className="flex-shrink-0 rounded border border-yellow-400 bg-yellow-50 px-2 py-0.5 text-[11px] font-semibold text-yellow-600"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.2, ease: E }}
        >
          Matching
        </motion.span>
      )}
      {phase === "matched" && (
        <motion.span
          key="matched"
          className="flex-shrink-0 rounded border border-emerald-500 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.2, ease: E }}
        >
          Matched
        </motion.span>
      )}
    </AnimatePresence>
  );
}

// ─── Worker card ──────────────────────────────────────────────────────────────

function WorkerCard({
  item,
  index,
  trigger,
  phase,
}: {
  item: (typeof ITEMS)[number];
  index: number;
  trigger: boolean;
  phase: Phase;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: 0, top: pct(item.y, VB_H), translate: "0 -50%" }}
      initial={{ opacity: 0, x: -18 }}
      animate={trigger ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
      transition={{ duration: 0.45, delay: 0.08 + index * 0.18, ease: E }}
    >
      <div
        className="flex items-center gap-3 rounded-full border border-neutral-200 bg-white px-3 py-2.5 shadow-sm"
        style={{ width: WORKER_W }}
      >
        <WorkerAvatar
          avatar={item.worker.avatar}
          name={item.worker.name}
          phase={phase}
        />
        <div className="flex min-w-0 flex-col gap-2">
          <span className="text-[13px] font-semibold text-neutral-900 leading-none truncate">
            {item.worker.name}
          </span>
          <span className="text-[11px] text-neutral-600 leading-none truncate">
            {item.worker.role}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Job card ─────────────────────────────────────────────────────────────────

function JobCard({
  item,
  index,
  trigger,
  phase,
}: {
  item: (typeof ITEMS)[number];
  index: number;
  trigger: boolean;
  phase: Phase;
}) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: pct(JOB_X, VB_W),
        top: pct(item.y, VB_H),
        translate: "0 -50%",
      }}
      initial={{ opacity: 0, x: 18 }}
      animate={trigger ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
      transition={{ duration: 0.45, delay: 0.08 + index * 0.18, ease: E }}
    >
      <div
        className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white shadow-sm"
        style={{ width: JOB_W, padding: "20px 13px" }}
      >
        <div className="flex items-center justify-between gap-1">
          <span className="text-[13px] font-semibold text-neutral-900 leading-none truncate">
            {item.job.label}
          </span>
          <div style={{ position: "relative", top: "-2px" }}>
            <JobBadge phase={phase} />
          </div>
        </div>
        <span className="text-[11px] text-neutral-600 leading-none">
          {item.job.detail}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Workforce ────────────────────────────────────────────────────────────────

export default function Workforce({ trigger = false }: { trigger?: boolean }) {
  const [phases, setPhases] = useState<Phase[]>(["idle", "idle", "idle"]);

  useEffect(() => {
    if (!trigger) {
      const id = setTimeout(() => setPhases(["idle", "idle", "idle"]), 0);
      return () => clearTimeout(id);
    }

    const timers = [
      setTimeout(() => setPhases(["active", "active", "active"]), 0),
      ...MATCHING_DELAYS.map((delay, i) =>
        setTimeout(() => {
          setPhases((prev) => {
            const next = [...prev] as Phase[];
            next[i] = "matching";
            return next;
          });
        }, delay),
      ),
      ...MATCHED_DELAYS.map((delay, i) =>
        setTimeout(() => {
          setPhases((prev) => {
            const next = [...prev] as Phase[];
            next[i] = "matched";
            return next;
          });
        }, delay),
      ),
    ];

    return () => timers.forEach(clearTimeout);
  }, [trigger]);

  return (
    <div
      className="relative mx-auto w-full"
      style={{ maxWidth: VB_W, aspectRatio: `${VB_W}/${VB_H}` }}
      aria-hidden="true"
    >
      {/* Worker cards */}
      {ITEMS.map((item, i) => (
        <WorkerCard
          key={item.id + "-w"}
          item={item}
          index={i}
          trigger={trigger}
          phase={phases[i]}
        />
      ))}

      {/* Job cards */}
      {ITEMS.map((item, i) => (
        <JobCard
          key={item.id + "-j"}
          item={item}
          index={i}
          trigger={trigger}
          phase={phases[i]}
        />
      ))}

      {/* Match rings — z-10 sits above SVG lines, shifted 50px above line */}
      {ITEMS.map((item, i) => (
        <div
          key={item.id + "-r"}
          className="pointer-events-none absolute z-10"
          style={{
            left: pct(MID_X, VB_W),
            top: pct(item.y, VB_H),
            translate: "-50% -50%",
          }}
        >
          <MatchRing matchPct={item.matchPct} phase={phases[i]} />
        </div>
      ))}

      {/* SVG — connection lines */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        fill="none"
      >
        {ITEMS.map((item, i) => (
          <motion.path
            key={item.id}
            d={`M ${WORKER_W},${item.y} H ${JOB_X}`}
            stroke={item.worker.accent}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity={0.25}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              trigger
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              pathLength: { duration: 0.5, delay: 0.58 + i * 0.16, ease: E },
              opacity: { duration: 0.01, delay: 0.58 + i * 0.16 },
            }}
          />
        ))}
      </svg>
    </div>
  );
}
