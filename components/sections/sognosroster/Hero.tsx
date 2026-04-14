"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ─── Roster data ───────────────────────────────────────────────────────────────

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const WORKERS = [
  { initials: "SK", hex: "#60a5fa", avatar: "/images/avatar-emma-real.png" },
  { initials: "MT", hex: "#a78bfa", avatar: null },
  { initials: "PN", hex: "#34d399", avatar: "/images/avatar-priya-real.png" },
  { initials: "JO", hex: "#fbbf24", avatar: "/images/avatar-james-real.png" },
];

// 11 shifts total — order determines reveal sequence
const SHIFTS = [
  { w: 0, d: 0, label: "08–14" },
  { w: 1, d: 1, label: "07–15" },
  { w: 2, d: 0, label: "14–22" },
  { w: 3, d: 1, label: "09–17" },
  { w: 0, d: 2, label: "09–17" },
  { w: 1, d: 3, label: "07–15" },
  { w: 2, d: 2, label: "14–22" },
  { w: 3, d: 3, label: "09–17" },
  { w: 0, d: 4, label: "08–14" },
  { w: 2, d: 4, label: "14–22" },
  { w: 3, d: 4, label: "10–18" },
] as const;

type Phase = "idle" | "filling" | "done";

const FILL_INTERVAL_MS = 140;
const HOLD_MS = 2600;
const RESET_DELAY_MS = 600;

// ─── Component ────────────────────────────────────────────────────────────────

export default function SognoscareRosterHero() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [revealed, setRevealed] = useState(0);
  const [utilisation, setUtilisation] = useState(0);
  const cancelRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clear = () => {
      if (cancelRef.current) clearTimeout(cancelRef.current);
    };

    const startCycle = () => {
      setPhase("filling");
      setRevealed(0);
      setUtilisation(0);

      let count = 0;
      const tick = () => {
        count++;
        setRevealed(count);

        if (count < SHIFTS.length) {
          cancelRef.current = setTimeout(tick, FILL_INTERVAL_MS);
        } else {
          // All filled — transition to done
          setPhase("done");

          // Animate utilisation counter
          let u = 0;
          const utTick = () => {
            u = Math.min(u + 3, 94);
            setUtilisation(u);
            if (u < 94) cancelRef.current = setTimeout(utTick, 18);
          };
          utTick();

          // Hold, then reset
          cancelRef.current = setTimeout(() => {
            setPhase("idle");
            setRevealed(0);
            setUtilisation(0);
            cancelRef.current = setTimeout(startCycle, RESET_DELAY_MS);
          }, HOLD_MS);
        }
      };

      cancelRef.current = setTimeout(tick, FILL_INTERVAL_MS);
    };

    // Initial delay before first run
    cancelRef.current = setTimeout(startCycle, 700);
    return clear;
  }, []);

  // Build shift lookup map for current reveal state
  const shiftMap: Record<string, (typeof SHIFTS)[number]> = {};
  SHIFTS.slice(0, revealed).forEach((s) => {
    shiftMap[`${s.w}-${s.d}`] = s;
  });

  return (
    <section
      data-header-dark
      className="relative bg-gradient-hero pt-36 pb-28 overflow-hidden"
    >
      {/* Radial glow — right-shifted for visual separation from SognosCare */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 78% 50%, var(--color-cornflower-ocean-900) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── Copy ── */}
          <div>
            <div className="mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/sognos-roster-logo.svg"
                alt="SognosRoster"
                className="h-8 w-auto"
              />
            </div>

            <h1 className="mb-6 font-heading text-5xl font-normal leading-[1.08] text-white lg:text-5xl">
              Workforce scheduling built for complex service operations
            </h1>

            <p className="mb-10 max-w-xl text-lg leading-relaxed text-white/60">
              Allocate the right people, at the right time, to the right
              services — automatically. SognosRoster removes the manual effort
              from rostering and puts real-time optimisation in the hands of
              your operations team.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <AnimatedButton href="/contact" variant="white">
                Book a Demo
              </AnimatedButton>
              <Link
                href="#features"
                className="text-sm font-medium text-white/60 transition-colors duration-200 hover:text-white"
              >
                See capabilities →
              </Link>
            </div>
          </div>

          {/* ── Roster animation panel ── */}
          <div className="hidden lg:block">
            <div className="rounded-xl bg-white border border-slate-200 p-5">
              {/* Panel header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    Weekly Roster
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    4 workers · 5 days
                  </p>
                </div>
                <AnimatePresence mode="wait">
                  {phase === "done" ? (
                    <motion.span
                      key="done"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-600"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Optimised
                    </motion.span>
                  ) : (
                    <motion.span
                      key="scheduling"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-400"
                    >
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-slate-300"
                        animate={
                          phase === "filling"
                            ? { opacity: [1, 0.25, 1] }
                            : { opacity: 1 }
                        }
                        transition={{ repeat: Infinity, duration: 0.9 }}
                      />
                      {phase === "idle" ? "Awaiting input" : "Scheduling…"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Roster grid */}
              <div
                className="grid gap-1.5"
                style={{ gridTemplateColumns: "auto repeat(5, 1fr)" }}
              >
                {/* Day headers */}
                <div />
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="h-7 flex items-center justify-center text-[11px] font-semibold text-slate-300 tracking-wide"
                  >
                    {day}
                  </div>
                ))}

                {/* Worker rows */}
                {WORKERS.map((worker, wIdx) => (
                  <div key={wIdx} className="contents">
                    {/* Worker avatar */}
                    <div className="flex items-center justify-end pr-1.5">
                      {worker.avatar ? (
                        <div
                          className="h-6 w-6 rounded-full overflow-hidden shrink-0"
                          style={{ border: `1px solid ${worker.hex}50` }}
                        >
                          <Image
                            src={worker.avatar}
                            alt={worker.initials}
                            width={24}
                            height={24}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                          style={{
                            backgroundColor: `${worker.hex}18`,
                            color: worker.hex,
                            border: `1px solid ${worker.hex}40`,
                          }}
                        >
                          {worker.initials}
                        </div>
                      )}
                    </div>

                    {/* Day cells */}
                    {DAYS.map((_, dIdx) => {
                      const shift = shiftMap[`${wIdx}-${dIdx}`];
                      return (
                        <div
                          key={dIdx}
                          className="h-9 rounded-md overflow-hidden"
                        >
                          <AnimatePresence>
                            {shift ? (
                              <motion.div
                                key="filled"
                                initial={{ opacity: 0, scale: 0.82 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  duration: 0.22,
                                  ease: [0.16, 1, 0.3, 1],
                                }}
                                className="h-full flex items-center justify-center rounded-md text-[11px] font-semibold"
                                style={{
                                  backgroundColor: `${worker.hex}18`,
                                  color: worker.hex,
                                  border: `1px solid ${worker.hex}35`,
                                }}
                              >
                                {shift.label}
                              </motion.div>
                            ) : (
                              <div className="h-full rounded-md bg-slate-50 border border-slate-100" />
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Stats bar — always visible */}
              <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-4 gap-2">
                {[
                  {
                    value: phase === "done" ? `${utilisation}%` : "—",
                    label: "Utilisation",
                    highlight: false,
                  },
                  {
                    value: phase === "done" ? "0" : "—",
                    label: "Conflicts",
                    highlight: false,
                  },
                  {
                    value: phase === "done" ? "11" : "—",
                    label: "Shifts filled",
                    highlight: false,
                  },
                  {
                    value: phase === "done" ? "0.3s" : "—",
                    label: "Allocated in",
                    highlight: true,
                  },
                ].map(({ value, label, highlight }) => (
                  <div key={label} className="text-center">
                    <motion.div
                      animate={{
                        color:
                          value === "—"
                            ? "#cbd5e1"
                            : highlight
                              ? "#059669"
                              : "#1e293b",
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-sm font-semibold tabular-nums"
                    >
                      {value}
                    </motion.div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
