"use client";

import { useState, useEffect } from "react";
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

export default function HowSognosWorksPreview() {
  const [active, setActive] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      setActive((prev) => {
        const next = (prev + 1) % TABS.length;
        setVisited((v) => new Set([...v, next]));
        return next;
      });
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, paused]);

  const handleTab = (idx: number) => {
    setActive(idx);
    setVisited((prev) => new Set([...prev, idx]));
    setPaused(true);
  };

  return (
    <section className="w-full border-b border-t border-sognos-border-subtle bg-slate-50">
      <div className="max-w-7xl w-full mx-auto px-6 py-24 border-x border-dashed border-sognos-border-subtle">
        {/* Centered heading + logo row */}
        <div className="text-center pb-10">
          <h2 className="callout text-3xl md:text-4xl text-brand font-heading  font-medium tracking-tight">
            Stop managing complexity.{" "}
            <span className="text-soft text-slate-500">
              Start delivering outcomes.
            </span>
          </h2>
          <p className="mt-4 font-heading font-medium text-neutral-500 max-w-4xl text-balance mx-auto leading-relaxed text-lg">
            Most care and service organisations run on disconnected tools —
            spreadsheets for rosters, email for referrals, manual processes for
            compliance. Sognos replaces all of it with one intelligent platform
            built natively on Microsoft Dynamics 365.
          </p>

          {/* Platform logos */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex items-center gap-5 rounded-full bg-dodger-blue-900 px-6 py-3">
              <img
                src="/logos/Dynamics365.svg"
                alt="Microsoft Dynamics 365"
                className="h-7 w-auto"
              />
              <div className="h-7 w-px bg-white/20" />
              <img
                src="/logos/Sognos-Solutions-Solutions-Partner.webp"
                alt="Microsoft Solutions Partner"
                className="h-8 w-auto"
              />
              <div className="h-9 w-px bg-white/20" />
              <img
                src="/logos/copilot-logo.png"
                alt="Microsoft Copilot"
                className="h-9 w-auto"
              />
            </div>
          </div>
        </div>

        {/* Left tabs + right content */}
        <div className="flex rounded-lg gap-10 overflow-hidden">
          {/* Left: Tab buttons */}
          <div className="w-[40%] gap-6 flex-shrink-0 flex flex-col">
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => handleTab(i)}
                className={`relative flex-1 px-5 py-6 text-left transition-colors ${
                  active === i
                    ? "bg-white border border-sognos-border-subtle"
                    : "bg-slate-50 border border-slate-50 hover:bg-white/60 hover:border-sognos-border-subtle"
                }`}
              >
                {/* Progress bar — top border */}
                <div className="absolute inset-x-0 top-0 h-[4px] bg-neutral-100">
                  {active === i && (
                    <motion.div
                      key={`progress-${i}-${active}`}
                      className="h-full bg-boston-blue-200"
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
                  className={`text-xl font-semibold leading-snug transition-colors ${
                    active === i ? "text-neutral-900" : "text-neutral-400"
                  }`}
                >
                  {tab.label}
                </p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-neutral-500">
                  {tab.description}
                </p>
              </button>
            ))}
          </div>

          {/* Right: Active diagram */}
          <div className="flex flex-1 h-[445px] bg-white border border-sognos-border-subtle items-center justify-center overflow-hidden p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="w-full h-full flex items-center justify-center"
              >
                {active === 0 && <ProcessFlow trigger={visited.has(0)} />}
                {active === 1 && <Workforce trigger={visited.has(1)} />}
                {active === 2 && <OutcomesFlow trigger={visited.has(2)} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
