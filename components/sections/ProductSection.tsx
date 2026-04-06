"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParticleCanvas from "@/components/ui/ParticleCanvas";

const card1Shadow =
  "2px 4px 8px rgba(0,0,0,0.02), 8px 16px 24px rgba(0,0,0,0.03), 64px 96px 128px rgba(0,0,0,0.12), 80px 120px 160px rgba(99, 102, 241, 0.15), inset 0 1px 1px rgba(255,255,255,1), 0 0 0 1px rgba(0,0,0,0.04)";
const card2Shadow =
  "2px 4px 8px rgba(0,0,0,0.02), 8px 16px 24px rgba(0,0,0,0.03), 64px 96px 128px rgba(0,0,0,0.12), 80px 120px 160px rgba(20, 184, 166, 0.15), inset 0 1px 1px rgba(255,255,255,1), 0 0 0 1px rgba(0,0,0,0.04)";
const card3Shadow =
  "2px 4px 8px rgba(0,0,0,0.02), 8px 16px 24px rgba(0,0,0,0.03), 64px 96px 128px rgba(0,0,0,0.12), 80px 120px 160px rgba(59, 130, 246, 0.15), inset 0 1px 1px rgba(255,255,255,1), 0 0 0 1px rgba(0,0,0,0.04)";
const innerCard1Shadow =
  "2px 4px 8px rgba(0,0,0,0.02), 8px 16px 24px rgba(0,0,0,0.03), 64px 96px 128px rgba(0,0,0,0.12), 80px 120px 160px rgba(6, 182, 212, 0.15), inset 0 1px 1px rgba(255,255,255,1), 0 0 0 1px rgba(0,0,0,0.04)";

export default function ProductSection() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <section
      aria-label="Platform capabilities"
      className="flex overflow-hidden w-full p-0 relative items-center justify-center border-b border-sognos-border-subtle"
    >
      <div className="max-w-7xl w-full mx-auto px-6 py-24 border-x border-dashed border-sognos-border-subtle z-1">
        {/* Section heading */}
        <div className="mb-16 max-w-4xl">
          <h2 className="text-2xl md:text-4xl text-brand font-heading font-medium tracking-tight">
            Built for regulated operations.{" "}
            <span className="text-soft text-slate-500">
              For organisations that can&apos;t afford to get things wrong —
              from compliance and audit trails to real-time workforce
              optimisation.
            </span>
          </h2>
        </div>

        {/* 3-card grid */}
        <div className="relative grid grid-cols-3 lg:grid-cols-3 gap-6 p-1 rounded-3xl border border-sognos-border-subtle">
          {/* Card 1 — Product One */}
          <div className="flex flex-col group transition-all duration-700 ease-out w-full h-[600px] rounded-3xl relative overflow-hidden border border-card-border bg-gradient-hero">
            {/* Shine border overlay */}
            <div
              className="animate-shine pointer-events-none absolute inset-0 size-full rounded-[inherit]"
              style={
                {
                  ["--shine-duration" as string]: "6s",
                  ["--shine-angle" as string]: "0deg",
                  backgroundImage:
                    "conic-gradient(from var(--shine-angle), transparent 75%, rgb(160, 124, 254), rgb(254, 143, 181), rgb(255, 190, 123), transparent)",
                  padding: "1px",
                  maskImage:
                    "linear-gradient(#fff, #fff), linear-gradient(#fff, #fff)",
                  maskClip: "content-box, border-box",
                  maskComposite: "exclude",
                  WebkitMaskImage:
                    "linear-gradient(#fff, #fff), linear-gradient(#fff, #fff)",
                  WebkitMaskClip: "content-box, padding-box",
                  WebkitMaskComposite: "xor",
                } as React.CSSProperties
              }
            />

            <div className="z-20 side-stack text-center card pt-10 pr-8 pb-0 pl-8 relative items-start justify-between h-full">
              <h2 className="text-2xl tracking-tight font-medium max-w-[280px] leading-tight text-white mb-6">
                SognosCare
              </h2>
              <p className="text-white tracking-tight text-sognos-text-body">
                Deliver safer, simpler care in the field. From mental health to
                aged care, we help providers reduce admin and stay
                service-ready—whatever changes come next.
              </p>

              <div className="cardSlide overflow-hidden absolute bottom-4 left-0 w-full p-4 px-4">
                <div className="cardSlideInner flex flex-col align-bottom justify-between rounded-2xl bg-white gap-10 p-6 pb-2 border border-[#434EC1]">
                  <p>
                    Deliver safer, simpler care in the field. From mental health
                    to aged care, we help providers reduce admin and stay
                    service-ready—whatever changes come next.
                  </p>
                  <div className="border-t border-brand-dark bottom-0 left-0 py-2 flex flex-col-2 align-middle justify-between">
                    <a className="py-3 font-heading font-semibold">
                      Learn More
                    </a>
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      aria-expanded={drawerOpen}
                      onClick={() => setDrawerOpen(true)}
                      className="bg-blue-50 hover:bg-blue-100 p-2.5 rounded-xl text-blue-600 transition-all duration-300 group-hover:scale-110 flex items-center justify-center shadow-sm hover:shadow-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-maximize2-icon lucide-maximize-2"
                      >
                        <path d="M15 3h6v6" />
                        <path d="m21 3-7 7" />
                        <path d="m3 21 7-7" />
                        <path d="M9 21H3v-6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="z-0 flex-1 overflow-hidden w-full h-full relative"></div>
          </div>
        </div>
      </div>

      {/* Bottom drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col justify-end"
            role="dialog"
            aria-modal="true"
            aria-label="Built for regulated industries"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              className="relative z-10 bg-white rounded-t-2xl shadow-xl min-h-[80vh] max-w-7xl w-full mx-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <h3 className="text-lg font-medium text-slate-900 tracking-tight">
                  Built for regulated industries
                </h3>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close"
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-6">
                <p className="text-slate-600 text-base leading-relaxed">
                  Drawer body content goes here.
                </p>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Book a Demo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-full absolute bottom-0 left-0 h-[220px] sm:h-[240px] md:h-[280px] lg:h-[400px] xl:h-[420px] 2xl:h-[650px] z-0 pointer-events-none">
        <div className="overflow-hidden flex flex-row h-full w-full">
          {[
            0, 40, 80, 120, 160, 200, 160, 120, 80, 40, 0, 40, 80, 120, 160,
            200, 160, 120, 80, 40, 0, 40, 80, 120, 160, 200,
          ].map((y, i) => (
            <div
              key={i}
              className="bg-gradient-1-vertical-flipped-test"
              style={{
                width: "56.0769px",
                height: "100%",
                transform: `translateY(${y}px) scaleY(-1)`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
