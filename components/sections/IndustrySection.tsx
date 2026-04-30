"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { INDUSTRIES } from "@/lib/constants";

const INDUSTRIAL_VIDEO =
  "https://www.shutterstock.com/shutterstock/videos/3849131045/preview/stock-footage-industrial-engineer-wearing-protective-safety-equipment-gesturing-and-instructing-near-machinery.webm";

const HEALTH_VIDEO =
  "https://www.shutterstock.com/shutterstock/videos/3762351217/preview/stock-footage-help-senior-woman-and-nurse-with-cellphone-in-retirement-home-for-telehealth-app-or-communication.webm";

// ─── Stand-out card (unchanged) ───────────────────────────────────────────────

function StandOutCard() {
  return (
    <div className="flex flex-col justify-between rounded-lg bg-prussian-blue-800 p-7 text-white h-full">
      <div>
        <span className="text-xs font-medium uppercase tracking-widest text-neutral-500">
          Any sector
        </span>
        <h3 className="mt-3 font-heading font-medium text-white leading-snug tracking-tight">
          Not seeing your sector?
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-neutral-400">
          If your team coordinates workforce and manages service delivery at
          scale, Sognos fits. We work across sectors not listed here.
        </p>
      </div>

      <div className="mt-8">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-opacity hover:opacity-90"
        >
          Get in touch
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 7h8M7 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function IndustrySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = INDUSTRIES[activeIndex];
  const isIndustrial = active.slug === "industrial-services";
  const isHealth = active.slug === "health-social-care";

  return (
    <section className="w-full bg-[#1D96FC] border-b border-sognos-border-subtle overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6 py-24">
        {/* Section heading — unchanged */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end justify-items-between pb-6">
          <h2 className="text-2xl md:text-4xl text-white font-heading font-medium tracking-tight">
            Industries
            <br />
            Built for service-intensive operations
          </h2>
          <p className="font-heading font-medium leading-tigher section-header-description text-white justify-self-end">
            Sognos connects service demand, workforce scheduling, and compliance
            into a single operational loop. Powered by AI, Microsoft Dynamics
            365.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex items-center justify-between mb-5">
          {/* Mobile: select dropdown */}
          <select
            className="sm:hidden w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm focus:outline-none"
            value={activeIndex}
            onChange={(e) => setActiveIndex(Number(e.target.value))}
          >
            {INDUSTRIES.map((ind, i) => (
              <option
                key={ind.slug}
                value={i}
                className="text-prussian-blue-900 bg-white"
              >
                {ind.name}
              </option>
            ))}
          </select>

          {/* Desktop: pill tabs */}
          <div className="hidden sm:flex items-center gap-1">
            {INDUSTRIES.map((ind, i) => (
              <button
                key={ind.slug}
                onClick={() => setActiveIndex(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  i === activeIndex
                    ? "bg-prussian-blue-900 text-white"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {ind.name}
              </button>
            ))}
          </div>

          {/* Progress indicator */}
          <div className="hidden sm:flex items-center gap-3 shrink-0 ml-6">
            <div className="relative w-16 h-px bg-white/30">
              <div
                className="absolute inset-y-0 left-0 bg-white transition-all duration-300"
                style={{
                  width: `${((activeIndex + 1) / INDUSTRIES.length) * 100}%`,
                }}
              />
            </div>
            <span className="text-sm text-white/70 tabular-nums">
              {activeIndex + 1} / {INDUSTRIES.length}
            </span>
          </div>
        </div>

        {/* Panel */}
        <div className="flex gap-4 h-[500px]">
          {/* Animated left + center columns */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-4 flex-1 min-w-0 bg-slate-100 rounded-lg p-2"
            >
              {/* Left column — grey info panel */}
              <div className="shrink-0 w-[40%] bg-slate-100 rounded-lg p-7 flex flex-col justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-medium uppercase tracking-widest text-neutral-500">
                    {active.name}
                  </span>
                  <h3 className="mt-3 font-heading text-2xl font-medium text-prussian-blue-800 leading-snug tracking-tight">
                    {active.name}
                  </h3>
                  <Link
                    href={active.href}
                    className="mt-5 inline-flex items-center gap-2.5 text-sm font-medium text-prussian-blue-800 hover:opacity-70 transition-opacity"
                  >
                    Read more
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-prussian-blue-900 text-white shrink-0">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 7h8M7 3l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
                <p className="text-sm leading-relaxed text-neutral-600">
                  {active.description}
                </p>
              </div>

              {/* Center column — portrait image or video */}
              <div className="flex-1 relative rounded-lg overflow-hidden">
                {isIndustrial ? (
                  <video
                    src={INDUSTRIAL_VIDEO}
                    autoPlay
                    muted
                    playsInline
                    loop
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : isHealth ? (
                  <video
                    src={HEALTH_VIDEO}
                    autoPlay
                    muted
                    playsInline
                    loop
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 35vw"
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right column — StandOutCard, static */}
          <div className="shrink-0 w-[28%]">
            <StandOutCard />
          </div>
        </div>
      </div>
    </section>
  );
}
