"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  {
    id: "demand",
    label: "Manage demand",
    description:
      "SognosCare captures every referral, care plan and service request — triaged, assigned and compliance-tracked from day one.",
    image: "/images/how-it-works/01.webp",
  },
  {
    id: "workforce",
    label: "Coordinate workforce",
    description:
      "SognosRoster matches the right worker to every job in real time — factoring skills, location, availability and compliance.",
    image: "/images/how-it-works/02.webp",
  },
  {
    id: "outcomes",
    label: "Track outcomes",
    description:
      "Live dashboards surface utilisation, compliance and costs across every service, site and workforce team.",
    image: "/images/how-it-works/03.webp",
  },
] as const;

const AUTOPLAY_MS = 5000;

// Crisp spring for description expand/collapse
const EXPAND = { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const };
// Image slide — fast deceleration
const SLIDE = { duration: 0.6, ease: [0.32, 0.72, 0, 1] as const };

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
        setTimeout(() => { transitioning.current = false; }, 700);
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

  return (
    <section className="w-full border-sognos-border-subtle bg-slate-100">
      <div className="max-w-7xl w-full mx-auto px-4 py-24">
        <div
          className="grid gap-10 lg:gap-16 grid-cols-1 lg:grid-cols-[40%_1fr] lg:grid-rows-[auto_1fr] lg:items-stretch [grid-template-areas:'heading''image''tabs'] lg:[grid-template-areas:'heading_image''tabs_image']"
        >

          {/* Heading */}
          <h2 className="[grid-area:heading] callout text-center lg:text-left text-3xl md:text-4xl text-prussian-blue-800 font-heading tracking-tight">
            Stop managing complexity. <br />
            <span className="text-soft text-prussian-blue-900/60">
              Start delivering outcomes.
            </span>
          </h2>

          {/* Tab list */}
          <div className="[grid-area:tabs] lg:self-end">
              {TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => handleTab(i)}
                  className="relative w-full text-left border-t border-slate-300 cursor-pointer overflow-hidden"
                >
                  {/* Progress bar — top border */}
                  <div className="absolute inset-x-0 top-0 h-0.5 overflow-hidden bg-transparent">
                    {active === i && (
                      <motion.div
                        key={`progress-${i}-${active}`}
                        className="h-full bg-cornflower-ocean-400"
                        initial={{ width: "0%" }}
                        animate={paused ? false : { width: "100%" }}
                        transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                      />
                    )}
                  </div>

                  {/* Label + number */}
                  <div className="flex items-center justify-between gap-4 py-5">
                    <span
                      className={`text-xl font-semibold leading-snug tracking-tight transition-opacity duration-200 text-prussian-blue-800 ${
                        active === i ? "opacity-100" : "opacity-40"
                      }`}
                    >
                      {tab.label}
                    </span>
                    <span className="shrink-0 text-sm font-mono text-prussian-blue-800/35">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Description — height + opacity expand, no layout jump */}
                  <AnimatePresence initial={false}>
                    {active === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={EXPAND}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-sognos-text-body leading-relaxed">
                          {tab.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              ))}
          </div>

          {/* Image — images stacked, active slides up from below */}
          <div className="[grid-area:image] rounded-xl border border-slate-400/30 overflow-hidden relative min-h-[280px] lg:min-h-[500px] bg-slate-200">
            {TABS.map((tab, i) => (
              <motion.div
                key={tab.id}
                className="absolute inset-0"
                style={{ zIndex: active === i ? 10 : 0 }}
                initial={{ y: i === 0 ? "0%" : "100%" }}
                animate={{ y: active === i ? "0%" : "100%" }}
                transition={
                  active === i
                    ? SLIDE
                    : { duration: 0, delay: 0 } // instant reset, hidden behind active
                }
              >
                <Image
                  src={tab.image}
                  alt={tab.label}
                  fill
                  className="object-cover"
                  sizes="60vw"
                  priority={i === 0}
                />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
