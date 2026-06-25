"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Workforce from "@/components/ui/Workforce";
import OutcomesFlow from "@/components/ui/OutcomesFlow";
import ProcessFlow from "@/components/ui/ProcessFlow";

const TABS = [
  {
    id: "demand",
    label: "Manage demand",
    description:
      "SognosCare captures every referral, care plan and service request - triaged, assigned and compliance-tracked from day one.",
    Component: ProcessFlow,
  },
  {
    id: "workforce",
    label: "Coordinate workforce",
    description:
      "SognosRoster matches the right worker to every job in real time - factoring skills, location, availability and compliance.",
    Component: Workforce,
  },
  {
    id: "outcomes",
    label: "Track outcomes",
    description:
      "Live dashboards surface utilisation, compliance and costs across every service, site and workforce team.",
    Component: OutcomesFlow,
  },
] as const;

const AUTOPLAY_MS = 5000;

const EXPAND = { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const };
const FADE = { duration: 0.4, ease: [0.32, 0.72, 0, 1] as const };

export default function HowSognosWorksPreview() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitioning = useRef(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      if (!transitioning.current) {
        transitioning.current = true;
        setActive((a) => (a + 1) % TABS.length);
        setTimeout(() => {
          transitioning.current = false;
        }, 500);
      }
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, paused]);

  const handleTab = (idx: number) => {
    if (idx === active || transitioning.current) return;
    transitioning.current = true;
    setActive(idx);
    setPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setPaused(false);
      transitioning.current = false;
    }, AUTOPLAY_MS);
  };

  const heading = (
    <h3 className="font-heading text-3xl lg:text-[28px] font-normal leading-tight tracking-tight text-sognos-heading">
      Stop managing complexity.
      <br />
      <span className="text-sognos-heading/60">
        Start delivering outcomes.
      </span>
    </h3>
  );

  return (
    <section className="w-full overflow-clip bg-background pt-12 md:pt-[120px] pb-12 md:pb-[120px] border-b border-sognos-heading/10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex max-lg:flex-col gap-x-[57px] gap-y-8">
          {/* Left column — heading + accordion */}
          <div className="flex shrink-0 flex-col gap-y-4 justify-between lg:max-w-[401px] lg:pt-1">
            <div className="max-lg:hidden">{heading}</div>

            <div className="border-b border-sognos-heading/10">
              {TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTab(i)}
                  className="relative block w-full cursor-pointer overflow-hidden border-t border-sognos-heading/10 pb-5 text-left"
                >
                  {/* Top progress indicator */}
                  <span className="absolute inset-x-0 top-0 block h-px overflow-hidden">
                    {active === i && (
                      <motion.span
                        key={`progress-${i}-${active}`}
                        className="block h-full bg-sognos-heading"
                        initial={{ width: "0%" }}
                        animate={paused ? false : { width: "100%" }}
                        transition={{
                          duration: AUTOPLAY_MS / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                  </span>

                  {/* Header row: label + number */}
                  <div className="flex w-full items-center justify-between gap-x-4 pt-5">
                    <h4
                      className={`text-xl font-medium leading-snug tracking-tight text-sognos-heading transition-opacity duration-200 ${
                        active === i ? "opacity-100" : "opacity-50"
                      }`}
                    >
                      {tab.label}
                    </h4>
                    <span className="font-heading text-sm tracking-wide text-sognos-heading/65">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Expanding description */}
                  <AnimatePresence initial={false}>
                    {active === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={EXPAND}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[353px] py-3 text-base leading-relaxed text-sognos-body">
                          {tab.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>
          </div>

          {/* Right column — visual well crossfade */}
          <div className="w-full max-w-[791px] max-lg:order-first">
            <div className="mb-6 lg:hidden">{heading}</div>

            <div className="relative aspect-[791/580] w-full max-w-[791px] overflow-hidden rounded-2xl border border-sognos-line bg-white shadow-lg">
              {TABS.map((tab, i) => {
                const Component = tab.Component;
                return (
                  <motion.div
                    key={tab.id}
                    className="absolute inset-0 flex items-center justify-center p-6 lg:p-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: active === i ? 1 : 0 }}
                    transition={FADE}
                    style={{
                      pointerEvents: active === i ? "auto" : "none",
                      zIndex: active === i ? 10 : 0,
                    }}
                  >
                    <Component trigger={active === i} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
