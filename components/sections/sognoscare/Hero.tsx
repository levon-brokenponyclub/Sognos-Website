"use client";

import Link from "next/link";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ─── Case pipeline data ────────────────────────────────────────────────────────

const STAGES = [
  {
    label: "Referral",
    color: "#60a5fa",
    icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
  },
  {
    label: "Assessment",
    color: "#a78bfa",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    label: "Active",
    color: "#34d399",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    label: "Review",
    color: "#fbbf24",
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  },
  { label: "Closed", color: "#f472b6", icon: "M5 13l4 4L19 7" },
] as const;

// Live feed items
const FEED = [
  { text: "Service visit logged", sub: "M. Patel · 09:14" },
  { text: "Compliance check passed", sub: "Auto · 09:15" },
  { text: "Review scheduled", sub: "S. Okafor · 09:17" },
  { text: "Case notes updated", sub: "L. Chen · 09:21" },
  { text: "Outcome recorded", sub: "M. Patel · 09:28" },
] as const;

type Phase = "idle" | "stages" | "ring" | "done";

const STAGE_INTERVAL_MS = 340;
const RING_DURATION_MS = 1400;
const HOLD_MS = 2800;
const RESET_DELAY_MS = 500;

// ─── Compliance ring (SVG) ────────────────────────────────────────────────────

function ComplianceRing({ score }: { score: number }) {
  const R = 38;
  const C = 2 * Math.PI * R;
  const offset = C - (score / 100) * C;

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
        {/* Track */}
        <circle
          cx={48}
          cy={48}
          r={R}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={7}
        />
        {/* Progress */}
        <motion.circle
          cx={48}
          cy={48}
          r={R}
          fill="none"
          stroke="#34d399"
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={C}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      {/* Score label — layered over ring */}
      <div className="absolute flex flex-col items-center">
        <motion.span
          className="text-xl font-bold tabular-nums text-white leading-none"
          animate={{ opacity: score > 0 ? 1 : 0 }}
        >
          {score}%
        </motion.span>
        <span className="text-[10px] text-white/30 mt-0.5">Compliance</span>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SognoscareHero() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [activeStage, setActive] = useState(-1);
  const [ringScore, setRingScore] = useState(0);
  const [feedIdx, setFeedIdx] = useState(0);
  const cancelRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clear = () => {
      if (cancelRef.current) clearTimeout(cancelRef.current);
    };

    const startCycle = () => {
      setPhase("stages");
      setActive(-1);
      setRingScore(0);
      setFeedIdx(0);

      let idx = 0;
      const revealStage = () => {
        setActive(idx);
        idx++;
        if (idx < STAGES.length) {
          cancelRef.current = setTimeout(revealStage, STAGE_INTERVAL_MS);
        } else {
          // All stages revealed — animate ring
          setPhase("ring");
          let score = 0;
          const tickRing = () => {
            score = Math.min(score + 2, 94);
            setRingScore(score);
            if (score < 94) {
              cancelRef.current = setTimeout(tickRing, RING_DURATION_MS / 47);
            } else {
              setPhase("done");
              // Cycle feed items
              let fi = 0;
              const nextFeed = () => {
                fi = (fi + 1) % FEED.length;
                setFeedIdx(fi);
                cancelRef.current = setTimeout(nextFeed, 900);
              };
              cancelRef.current = setTimeout(nextFeed, 900);
              // Hold then reset
              cancelRef.current = setTimeout(() => {
                clear();
                setPhase("idle");
                setActive(-1);
                setRingScore(0);
                setFeedIdx(0);
                cancelRef.current = setTimeout(startCycle, RESET_DELAY_MS);
              }, HOLD_MS);
            }
          };
          tickRing();
        }
      };

      cancelRef.current = setTimeout(revealStage, STAGE_INTERVAL_MS);
    };

    cancelRef.current = setTimeout(startCycle, 600);
    return clear;
  }, []);

  return (
    <section
      data-header-dark
      className="relative bg-gradient-hero pt-36 pb-28 overflow-hidden"
    >
      {/* Radial glow — left-shifted, rose tint for care differentiation */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 22% 50%, var(--color-prussian-blue-700) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── Copy ── */}
          <div>
            <div className="mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/sognos-care-logo.svg"
                alt="SognosCare"
                className="h-8 w-auto"
              />
            </div>

            <h1 className="mb-6 font-heading text-5xl font-normal leading-[1.08] text-white lg:text-5xl">
              Care operations built for the complexity of service delivery
            </h1>

            <p className="mb-10 max-w-xl text-lg leading-relaxed text-white/60">
              Manage cases, track service delivery, meet compliance obligations,
              and report with confidence — in one platform built end-to-end for
              care.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <AnimatedButton href="/contact" variant="white">
                Book a Demo
              </AnimatedButton>
              <Link
                href="#editions"
                className="text-sm font-medium text-white/60 transition-colors duration-200 hover:text-white"
              >
                Explore editions →
              </Link>
            </div>
          </div>

          {/* ── Animation panel ── */}
          <div className="hidden lg:block">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-5 space-y-4">
              {/* Panel header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white/35 uppercase tracking-widest">
                    Case #CR-4821
                  </p>
                  <p className="text-xs text-white/25 mt-0.5">
                    M. Patel · Opened today
                  </p>
                </div>
                <AnimatePresence mode="wait">
                  {phase === "done" ? (
                    <motion.span
                      key="active"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Active
                    </motion.span>
                  ) : (
                    <motion.span
                      key="processing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] border border-white/10 px-3 py-1 text-xs font-semibold text-white/35"
                    >
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-white/35"
                        animate={
                          phase !== "idle"
                            ? { opacity: [1, 0.2, 1] }
                            : { opacity: 1 }
                        }
                        transition={{ repeat: Infinity, duration: 0.9 }}
                      />
                      {phase === "idle" ? "Pending" : "Processing…"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Case pipeline stages */}
              <div className="flex items-center gap-1">
                {STAGES.map((stage, i) => {
                  const isActive = i === activeStage;
                  const isPast =
                    i < activeStage || phase === "ring" || phase === "done";
                  const isFuture = !isActive && !isPast;

                  return (
                    <div
                      key={stage.label}
                      className="flex items-center gap-1 flex-1 min-w-0"
                    >
                      <motion.div
                        className="flex-1 min-w-0 rounded-lg px-2 py-2 text-center"
                        animate={{
                          backgroundColor: isPast
                            ? `${stage.color}18`
                            : isActive
                              ? `${stage.color}22`
                              : "rgba(255,255,255,0.03)",
                          borderColor:
                            isPast || isActive
                              ? `${stage.color}35`
                              : "rgba(255,255,255,0.06)",
                        }}
                        transition={{ duration: 0.25 }}
                        style={{ border: "1px solid" }}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <svg
                            className="w-4 h-4 transition-colors duration-300"
                            fill="none"
                            stroke={
                              isPast || isActive
                                ? stage.color
                                : "rgba(255,255,255,0.2)"
                            }
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d={stage.icon} />
                          </svg>
                          <span
                            className="text-[10px] font-semibold leading-none transition-colors duration-300 truncate w-full text-center"
                            style={{
                              color:
                                isPast || isActive
                                  ? stage.color
                                  : "rgba(255,255,255,0.2)",
                            }}
                          >
                            {stage.label}
                          </span>
                        </div>
                      </motion.div>

                      {/* Connector */}
                      {i < STAGES.length - 1 && (
                        <motion.div
                          className="w-3 h-px shrink-0 rounded-full"
                          animate={{
                            backgroundColor: isPast
                              ? `${stage.color}60`
                              : "rgba(255,255,255,0.08)",
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Compliance ring + live feed — side by side */}
              <div className="grid grid-cols-[auto_1fr] gap-4 pt-1">
                {/* Compliance ring */}
                <div className="relative flex items-center justify-center w-24 h-24">
                  <ComplianceRing score={ringScore} />
                </div>

                {/* Live feed */}
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
                  <div className="px-3 py-2 border-b border-white/[0.06] flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-white/25 uppercase tracking-widest">
                      Live Activity
                    </span>
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                      animate={
                        phase === "done"
                          ? { opacity: [1, 0.3, 1] }
                          : { opacity: 0.3 }
                      }
                      transition={{ repeat: Infinity, duration: 1.4 }}
                    />
                  </div>
                  <div className="px-3 py-2 space-y-2">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={feedIdx}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        <p className="text-xs font-semibold text-white/70">
                          {FEED[feedIdx].text}
                        </p>
                        <p className="text-[10px] text-white/30 mt-0.5">
                          {FEED[feedIdx].sub}
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Dimmed history items */}
                    {[feedIdx > 0 ? feedIdx - 1 : FEED.length - 1].map(
                      (prev) => (
                        <div key={prev} className="opacity-30">
                          <p className="text-xs text-white/40 line-through decoration-white/20">
                            {FEED[prev].text}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
