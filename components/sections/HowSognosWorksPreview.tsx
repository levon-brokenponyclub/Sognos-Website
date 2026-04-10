"use client";

import { useState, useEffect, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";
import ProcessFlow from "@/components/ui/ProcessFlow";
import Workforce from "@/components/ui/Workforce";
import OutcomesFlow from "@/components/ui/OutcomesFlow";

const TABS = [
  {
    id: "demand",
    label: "Manage demand",
    description:
      "SognosCare captures every referral, care plan and service request — triaged, assigned and compliance-tracked from day one.",
  },
  {
    id: "workforce",
    label: "Coordinate workforce",
    description:
      "SognosRoster matches the right worker to every job in real time — factoring skills, location, availability and compliance.",
  },
  {
    id: "outcomes",
    label: "Track outcomes",
    description:
      "Live dashboards surface utilisation, compliance and costs across every service, site and workforce team.",
  },
] as const;

const AUTOPLAY_MS = 5000;
const FADE_OUT_MS = 300;
const HOLD_MS = 80;
const PANEL_SETTLE_MS = 480;
const PANEL_TRANSITION = { duration: 0.48, ease: [0.4, 0, 0.2, 1] as const };

export default function HowSognosWorksPreview() {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const [paused, setPaused] = useState(false);
  const transitioning = useRef(false);

  const transitionToTab = (idx: number, shouldPause: boolean) => {
    if (idx === active || transitioning.current) return;

    transitioning.current = true;
    if (shouldPause) setPaused(true);

    setRevealed(-1);

    setTimeout(() => {
      setActive(idx);
      setVisited((prev) => new Set([...prev, idx]));

      setTimeout(() => {
        setRevealed(idx);
        transitioning.current = false;
      }, PANEL_SETTLE_MS);
    }, FADE_OUT_MS + HOLD_MS);
  };

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      const next = (active + 1) % TABS.length;
      transitionToTab(next, false);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, paused]);

  const handleTab = (idx: number) => {
    transitionToTab(idx, true);
  };

  return (
    <section className="w-full border-b border-t border-sognos-border-subtle bg-slate-50">
      <div className="max-w-7xl w-full mx-auto px-6 py-24 border-x border-dashed border-slate-600/20">
        {/* Centered heading + logo row */}
        <div className="text-center pb-10">
          <h2 className="callout text-3xl md:text-6xl text-prussian-blue-800 font-heading tracking-tight">
            Stop managing complexity. <br />
            <span className="text-soft text-prussian-blue-900/60">
              Start delivering outcomes.
            </span>
          </h2>
          <p className="mt-4 font-heading font-medium text-neutral-500 max-w-5xl text-balance mx-auto leading-relaxed text-2xl">
            Most care and service organisations run on disconnected tools —
            spreadsheets for rosters, email for referrals, manual processes for
            compliance. Sognos replaces all of it with one intelligent platform
            built natively on Microsoft Dynamics 365.
          </p>

          {/* Platform logos */}
          <div className="flex justify-center mt-8 mb-14">
            <div className="inline-flex items-center gap-5 rounded-full bg-prussian-blue-800 px-6 py-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/Dynamics365.svg"
                alt="Microsoft Dynamics 365"
                className="h-7 w-auto"
              />
              <div className="h-7 w-px bg-white/20" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/Sognos-Solutions-Solutions-Partner.webp"
                alt="Microsoft Solutions Partner"
                className="h-8 w-auto"
              />
              <div className="h-9 w-px bg-white/20" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/copilot-logo.png"
                alt="Microsoft Copilot"
                className="h-9 w-auto"
              />
            </div>
          </div>
        </div>

        {/* Left tabs + right content */}
        <div className="flex rounded-2xl gap-10 overflow-hidden">
          {/* Left: Tab buttons */}
          <div className="w-[45%] gap-3 shrink-0 flex flex-col">
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => handleTab(i)}
                className={[
                  "relative px-5 py-6 text-left rounded-md transition-[background-color,border-color] duration-500 ease-in-out",
                  active === i
                    ? "bg-white border border-slate-400/30"
                    : "bg-sognos-bg-surface border border-transparent hover:bg-white/70",
                ].join(" ")}
              >
                {/* Progress bar — top edge */}
                <div className="absolute inset-x-0 top-0 h-0.75 rounded-t-lg overflow-hidden bg-transparent">
                  {active === i && (
                    <motion.div
                      key={`progress-${i}-${active}`}
                      className="h-full bg-cornflower-ocean-400"
                      initial={{ width: "0%" }}
                      animate={paused ? false : { width: "100%" }}
                      transition={{
                        duration: AUTOPLAY_MS / 1000,
                        ease: "linear",
                      }}
                    />
                  )}
                </div>

                <p
                  className={`text-xl font-medium leading-snug tracking-tight transition-colors ${
                    active === i
                      ? "text-prussian-blue-800"
                      : "text-prussian-blue-800/50"
                  }`}
                >
                  {tab.label}
                </p>

                <AnimatePresence initial={false}>
                  {active === i && revealed === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={PANEL_TRANSITION}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="mt-2 text-sognos-text-body">
                        {tab.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>

          {/* Right: Active diagram */}
          <div className="flex flex-1 h-111.25 bg-white rounded-xl border border-slate-400/30 items-center justify-center overflow-hidden p-8">
            <AnimatePresence mode="wait">
              {revealed === active && (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={PANEL_TRANSITION}
                  className="w-full h-full flex items-center justify-center"
                >
                  {active === 0 && <ProcessFlow trigger={visited.has(0)} />}
                  {active === 1 && <Workforce trigger={visited.has(1)} />}
                  {active === 2 && <OutcomesFlow trigger={visited.has(2)} />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
