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

            {/* Animated background orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit] z-0">
              <div
                className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-400/20 rounded-full blur-[80px] animate-pulse"
                style={{ animationDuration: "8s" }}
              />
              <div
                className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-400/20 rounded-full blur-[80px] animate-pulse"
                style={{ animationDuration: "10s", animationDelay: "2s" }}
              />
            </div>

            <div className="z-20 side-stack card flex pt-8 pr-8 pb-0 pl-8 relative items-start justify-between">
              <h5 className="tracking-tight">Products</h5>
              <h2 className="text-2xl tracking-tight font-medium max-w-[280px] leading-tight text-slate-800">
                Native to your Microsoft stack
              </h2>
              <button
                type="button"
                aria-haspopup="dialog"
                aria-expanded={drawerOpen}
                onClick={() => setDrawerOpen(true)}
                className="bg-blue-50 hover:bg-blue-100 p-2.5 rounded-xl text-blue-600 transition-all duration-300 group-hover:scale-110 flex items-center justify-center shadow-sm hover:shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:rotate-12 transition-transform duration-300"
                >
                  <path d="M9 17H7A5 5 0 0 1 7 7h2" />
                  <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
                  <line x1="8" x2="16" y1="12" y2="12" />
                </svg>
              </button>
            </div>

            <div className="z-0 flex-1 overflow-hidden w-full h-full relative">
              <ParticleCanvas
                variant="arc"
                className="w-full h-full absolute inset-0"
              />

              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 600"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <linearGradient
                    id="lineGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                <path
                  d="M-50 450 Q 150 150, 450 350"
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="1.5"
                  className="path-line"
                />

                <circle
                  cx="100"
                  cy="250"
                  r="3"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                >
                  <animate
                    attributeName="r"
                    values="3; 25"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6; 0"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="100"
                  cy="250"
                  r="3"
                  fill="white"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                />

                <circle
                  cx="350"
                  cy="300"
                  r="3"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="1.5"
                >
                  <animate
                    attributeName="r"
                    values="3; 25"
                    dur="3s"
                    begin="1s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6; 0"
                    dur="3s"
                    begin="1s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="350"
                  cy="300"
                  r="3"
                  fill="white"
                  stroke="#06b6d4"
                  strokeWidth="1.5"
                />

                <path
                  d="M50 650 Q 100 300, 300 550"
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="1"
                  className="path-line-2"
                />

                <circle
                  cx="150"
                  cy="400"
                  r="2.5"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="1.5"
                >
                  <animate
                    attributeName="r"
                    values="2.5; 20"
                    dur="3s"
                    begin="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6; 0"
                    dur="3s"
                    begin="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="150"
                  cy="400"
                  r="2.5"
                  fill="white"
                  stroke="#8b5cf6"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Floating badge */}
              <div
                className="absolute top-[60%] left-[10%] bg-white/95 backdrop-blur border border-slate-100 shadow-md rounded-lg py-1.5 px-3 flex items-center gap-2 z-10 animate-float hover:scale-105 transition-transform cursor-default"
                style={{ animationDuration: "4s" }}
              >
                <div
                  className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center animate-pulse"
                  style={{ animationDuration: "3s" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-slate-700">
                  150+{" "}
                  <span className="text-slate-400">Integrations active</span>
                </span>
              </div>
            </div>

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
