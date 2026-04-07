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

const AUTOPLAY_MS = 6500;

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
    <section className="w-full border-b border-t border-sognos-border-subtle">
      <div className="max-w-7xl w-full mx-auto px-6 py-24 border-x border-dashed border-sognos-border-subtle">
        {/* Heading row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end justify-items-between pb-6">
          <h2 className="text-2xl md:text-4xl text-brand font-heading font-medium tracking-tight">
            One platform.
            <br />
            From referral to outcome.
          </h2>
          <p className="font-heading font-medium leading-tigher section-header-description justify-self-end">
            Sognos connects service demand, workforce scheduling, and compliance
            into a single operational loop. Powered by AI, Microsoft Dynamics
            365.
          </p>
        </div>

        {/* Left tabs + right content */}
        <div className="flex rounded-lg border border-sognos-border-subtle overflow-hidden">
          {/* Left: Tab buttons */}
          <div className="w-[40%] flex-shrink-0 flex flex-col divide-y divide-sognos-border-subtle border-r border-sognos-border-subtle">
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => handleTab(i)}
                className={`relative flex-1 px-5 py-6 text-left transition-colors ${
                  active === i
                    ? "bg-white"
                    : "bg-neutral-50/80 hover:bg-white/60"
                }`}
              >
                {/* Progress bar — top border */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-neutral-100">
                  {active === i && (
                    <motion.div
                      key={`progress-${i}-${active}`}
                      className="h-full bg-brand"
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
                  className={`text-sm font-semibold leading-snug transition-colors ${
                    active === i ? "text-neutral-900" : "text-neutral-400"
                  }`}
                >
                  {tab.label}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
                  {tab.description}
                </p>
              </button>
            ))}
          </div>

          {/* Right: Active diagram */}
          <div className="flex flex-1 min-h-[400px] items-center justify-center overflow-hidden bg-neutral-50/40 p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="w-full flex items-center justify-center"
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
