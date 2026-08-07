"use client";

// SCAFFOLD — Coordinate Workforce panel for HowSognosWorks (C2). Preview
// at /dev/hiw-roster. Not wired into any live section.
//
// 8s auto-loop cascading through three worker-to-visit matches:
//   1. AI suggestion bubble slides in (chat aesthetic — the 21st.dev
//      through-line committed to in the storyboard)
//   2. Connector line draws left → right (450ms)
//   3. Travelling dot rides the line (500ms, 500ms delay so the line
//      lands first)
//   4. Status pill flips Waiting → Matching → Assigned
//   5. Coverage bar bumps up
// Then next match. After the third, panel holds at 100% for ~1.5s and
// resets.
//
// Reduced motion → all three matches render in their final "Assigned"
// state, no animation, no loop. Coverage bar at 100%. Bubble hidden.
//
// Colours: sognos tokens where possible; Tailwind default emerald/amber/
// violet for the avatar pastels + Assigned pill (standard UX language,
// not a new brand primitive).

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type Match = {
  worker: string;
  role: string;
  avatarBg: string;
  visitTitle: string;
  visitLocation: string;
};

const MATCHES: Match[] = [
  {
    worker: "Emma Clarke",
    role: "Care Worker",
    avatarBg: "bg-amber-200 text-amber-900",
    visitTitle: "Morning Run",
    visitLocation: "Meadowbrook · 08:00",
  },
  {
    worker: "James Obi",
    role: "Support Worker",
    avatarBg: "bg-emerald-200 text-emerald-900",
    visitTitle: "Home Visit",
    visitLocation: "Thornton St · 09:30",
  },
  {
    worker: "Priya Menon",
    role: "Nurse",
    avatarBg: "bg-violet-200 text-violet-900",
    visitTitle: "Medication",
    visitLocation: "St Luke's · 10:00",
  },
];

// Timeline (ms). Full cycle = START_DELAY + N*MATCH_DURATION + SETTLE.
const START_DELAY = 500;
const MATCH_DURATION = 2000;
const SETTLE_DURATION = 1500;

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function HowSognosWorksRoster() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(-1);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setActive(MATCHES.length);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    MATCHES.forEach((_, i) => {
      timers.push(
        setTimeout(
          () => setActive(i),
          START_DELAY + i * MATCH_DURATION,
        ),
      );
    });
    // All done — hold at 100%
    timers.push(
      setTimeout(
        () => setActive(MATCHES.length),
        START_DELAY + MATCHES.length * MATCH_DURATION,
      ),
    );
    // Reset + restart
    timers.push(
      setTimeout(() => {
        setActive(-1);
        const restart = setTimeout(() => setCycle((c) => c + 1), 120);
        timers.push(restart);
      }, START_DELAY + MATCHES.length * MATCH_DURATION + SETTLE_DURATION),
    );

    return () => timers.forEach(clearTimeout);
  }, [cycle, prefersReducedMotion]);

  const matched = Math.max(0, Math.min(active, MATCHES.length));
  const coverage =
    matched === MATCHES.length ? 100 : matched * (100 / MATCHES.length);

  return (
    <div className="relative w-full overflow-hidden rounded border border-sognos-line bg-white">
      {/* Mac window frame — a familiar "product surface" chrome without
          needing to invent one. */}
      <div className="flex items-center border-b border-sognos-line bg-sognos-tint/40 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <motion.span
            className="size-1.5 rounded-full bg-sognos-blue-accent"
            animate={prefersReducedMotion ? {} : { opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-xs font-semibold uppercase tracking-widest text-sognos-muted">
            sognos roster · Live match
          </span>
        </div>
      </div>

      {/* Match rows */}
      <div className="relative flex flex-col gap-5 px-6 py-10 md:gap-6 md:px-12 md:py-14">
        {MATCHES.map((match, i) => (
          <MatchRow
            key={match.worker}
            match={match}
            state={
              active > i || active === MATCHES.length
                ? "done"
                : active === i
                  ? "matching"
                  : "idle"
            }
            prefersReducedMotion={!!prefersReducedMotion}
          />
        ))}

        {/* AI suggestion bubble — floats top-right, updates per match */}
        {!prefersReducedMotion && (
          <div className="pointer-events-none absolute right-4 top-4 z-10 md:right-8 md:top-6">
            <AnimatePresence mode="wait">
              {active >= 0 && active < MATCHES.length && (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="max-w-[260px] rounded border border-sognos-navy/10 bg-sognos-navy px-3.5 py-2.5 text-white"
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded bg-sognos-blue-accent/25 text-[10px] text-sognos-blue-accent"
                    >
                      ✦
                    </span>
                    <div>
                      <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-sognos-blue-accent">
                        Best match
                      </div>
                      <div className="text-sm leading-snug">
                        {MATCHES[active].worker.split(" ")[0]}{" "}
                        <span className="text-white/50">→</span>{" "}
                        {MATCHES[active].visitTitle}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Coverage footer */}
      <div className="flex items-center justify-between gap-4 border-t border-sognos-line px-6 py-4 md:px-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-sognos-muted">
          Coverage
        </span>
        <div className="flex items-center gap-4">
          <div className="h-1 w-32 overflow-hidden rounded-full bg-sognos-line md:w-48">
            <motion.div
              className="h-full origin-left rounded-full bg-sognos-blue-accent"
              animate={{ scaleX: coverage / 100 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              style={{ transformOrigin: "left" }}
            />
          </div>
          <span className="w-12 text-right font-heading text-lg font-medium tabular-nums text-sognos-heading">
            {Math.round(coverage)}%
          </span>
        </div>
      </div>
    </div>
  );
}

function MatchRow({
  match,
  state,
  prefersReducedMotion,
}: {
  match: Match;
  state: "idle" | "matching" | "done";
  prefersReducedMotion: boolean;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6">
      {/* Worker */}
      <div className="flex items-center gap-3">
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-full font-heading text-xs font-medium md:size-11 md:text-sm ${match.avatarBg}`}
        >
          {initials(match.worker)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-sognos-heading md:text-base">
            {match.worker}
          </p>
          <p className="truncate text-xs text-sognos-muted">{match.role}</p>
        </div>
      </div>

      {/* Connector */}
      <Connector state={state} prefersReducedMotion={prefersReducedMotion} />

      {/* Visit */}
      <div className="flex items-center justify-between gap-2 rounded border border-sognos-line bg-white px-3 py-2.5">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-sognos-heading md:text-base">
            {match.visitTitle}
          </p>
          <p className="truncate text-xs text-sognos-muted">
            {match.visitLocation}
          </p>
        </div>
        <StatusPill state={state} />
      </div>
    </div>
  );
}

function Connector({
  state,
  prefersReducedMotion,
}: {
  state: "idle" | "matching" | "done";
  prefersReducedMotion: boolean;
}) {
  return (
    <div className="relative flex h-6 w-14 items-center md:w-24">
      {/* Idle: dashed grey rule */}
      {state === "idle" && (
        <div className="w-full border-t border-dashed border-sognos-line" />
      )}

      {/* Matching / Done: solid accent rule, drawing L→R */}
      {state !== "idle" && (
        <motion.div
          key={`fill-${state}`}
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 origin-left bg-sognos-blue-accent"
          initial={{
            scaleX: prefersReducedMotion || state === "done" ? 1 : 0,
          }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.45,
            ease: EASE_OUT,
          }}
        />
      )}

      {/* Travelling dot while matching */}
      {state === "matching" && !prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute top-1/2 -mt-[3px] size-1.5 rounded-full bg-sognos-blue-accent"
          initial={{ left: "0%" }}
          animate={{ left: "calc(100% - 6px)" }}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.45 }}
        />
      )}
    </div>
  );
}

function StatusPill({ state }: { state: "idle" | "matching" | "done" }) {
  const cls =
    state === "done"
      ? "border-emerald-500/30 bg-emerald-50 text-emerald-700"
      : state === "matching"
        ? "border-sognos-blue-accent/40 bg-sognos-blue-accent/10 text-sognos-blue-accent"
        : "border-sognos-line bg-sognos-tint text-sognos-muted";

  const label =
    state === "done" ? "Assigned" : state === "matching" ? "Matching…" : "Waiting";

  return (
    <span
      className={`shrink-0 rounded border px-2 py-0.5 text-[11px] font-medium tabular-nums ${cls}`}
    >
      {label}
    </span>
  );
}
