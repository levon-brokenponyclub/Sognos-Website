"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
      className="flex overflow-hidden bg-slate-50 w-full p-0 relative items-center justify-center border-b border-sognos-border-subtle"
    >
      <div className="max-w-7xl w-full mx-auto px-6 py-24 border-x border-dashed border-sognos-border-subtle">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-1 bg-white rounded-sm border border-sognos-border-subtle">
          {/* Card 1 — Product One */}
          <div className="flex flex-col group transition-all duration-700 ease-out w-full h-[600px] rounded-sm relative overflow-hidden border border-card-border bg-white">
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

            <div className="p-8 pb-0 absolute z-20 flex justify-between items-start">
              <h2 className="text-2xl tracking-tight font-medium max-w-[220px] leading-tight text-slate-800">
                Built for regulated industries
              </h2>
              <button
                type="button"
                aria-haspopup="dialog"
                aria-expanded={drawerOpen}
                onClick={() => setDrawerOpen(true)}
                className="bg-teal-50 hover:bg-teal-100 p-2.5 rounded-xl text-teal-600 transition-colors flex items-center justify-center"
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
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </button>
            </div>

            <div className="relative z-10 flex-1" />
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
    </section>
  );
}
