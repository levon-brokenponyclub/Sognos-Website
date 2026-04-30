"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TABS = [
  {
    name: "Bhavin Shah",
    role: "Project Manager",
    quote:
      "Sognos has a friendly and collaborative atmosphere. Management is transparent and genuinely cares about the team. It's a place where your voice is heard.",
  },
  {
    name: "Rishit Patel",
    role: "Dynamics 365 Technical Consultant",
    quote:
      "At Sognos, I've discovered more than just a workplace — it's a close-knit family dedicated to fostering improvement. Every challenge is a chance to grow.",
  },
  {
    name: "Praneetha Pulivendula",
    role: "Dynamics 365 Senior Technical Consultant",
    quote:
      "I thoroughly enjoy working with my co-workers, constantly learning more about Dynamics 365 modules. The collaborative spirit here is genuinely special.",
  },
];

export default function LifeAtSognos() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TABS[activeIndex];

  return (
    <section className="w-full bg-[#1D96FC] border-b border-sognos-border-subtle overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6 py-24">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end pb-6">
          <h2 className="text-2xl md:text-4xl text-white font-heading font-medium tracking-tight">
            Life at Sognos
          </h2>
          <p className="font-heading font-medium text-white/80 justify-self-end max-w-sm">
            Hear directly from the people who build and deliver Sognos every day.
          </p>
        </div>

        {/* 3-col panel */}
        <div className="flex gap-4 min-h-[420px]">

          {/* Col 1 — tab list */}
          <div className="shrink-0 w-[22%] bg-slate-100 rounded-lg p-7 flex flex-col justify-center gap-0">
            {TABS.map((tab, i) => (
              <button
                key={tab.name}
                onClick={() => setActiveIndex(i)}
                className="text-left border-t border-slate-300 py-5 cursor-pointer"
              >
                <span
                  className={`block font-heading text-lg font-semibold leading-snug tracking-tight transition-opacity duration-200 text-prussian-blue-800 ${
                    i === activeIndex ? "opacity-100" : "opacity-30"
                  }`}
                >
                  {tab.name}
                </span>
                <span
                  className={`block text-xs mt-0.5 transition-opacity duration-200 text-prussian-blue-800 ${
                    i === activeIndex ? "opacity-60" : "opacity-20"
                  }`}
                >
                  {tab.role}
                </span>
              </button>
            ))}
          </div>

          {/* Col 2 — image placeholder */}
          <div className="flex-1 rounded-lg overflow-hidden bg-slate-300 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-end p-7"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-md px-4 py-2">
                  <p className="text-sm font-semibold text-white">{active.name}</p>
                  <p className="text-xs text-white/70">{active.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Col 3 — quote */}
          <div className="shrink-0 w-[34%] bg-prussian-blue-800 rounded-lg p-8 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col h-full justify-between"
              >
                <p className="font-heading text-xl font-normal leading-snug tracking-tight text-white">
                  &ldquo;{active.quote}&rdquo;
                </p>
                <div className="mt-8">
                  <p className="text-sm font-semibold text-white">{active.name}</p>
                  <p className="text-xs text-white/60 mt-0.5">{active.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quote icon */}
            <svg
              viewBox="0 0 39 32"
              fill="none"
              className="w-7 h-6 text-white/20 mt-6 self-end"
              aria-hidden="true"
            >
              <path
                d="m16.3 4-4.333-4C4.189 5.557.078 12.89.078 20.668v.445C.078 27.779 3.745 32 8.856 32c4.222 0 7.778-3.334 7.778-7.89 0-4.444-3.111-7.332-7.334-7.332a7.15 7.15 0 0 0-2.666.555C7.41 12.223 11.3 7.78 16.3 4.001Zm21.667 0-4.333-4c-7.778 5.556-11.89 12.89-11.89 20.667v.445c0 6.667 3.668 10.889 8.779 10.889 4.222 0 7.777-3.334 7.777-7.89 0-4.444-3.11-7.332-7.333-7.332a7.15 7.15 0 0 0-2.667.555c.778-5.111 4.667-9.555 9.667-13.333Z"
                fill="currentColor"
              />
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
