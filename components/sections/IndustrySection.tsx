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

// Header bar height (h-14 = 56px) — cards stick just below it
const HEADER_H = 112;
// Each card in the stack peeks this many px above the one covering it
const PEEK = 0;

export default function IndustrySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = INDUSTRIES[activeIndex];
  const isIndustrial = active.slug === "industrial-services";
  const isHealth = active.slug === "health-social-care";

  return (
    <section className="w-full bg-[#1D96FC] bg-gradient-hero border-b border-sognos-border-subtle">
      <div className="max-w-7xl w-full mx-auto px-6 py-16 lg:py-24">
        {/* Section heading */}
        <div className="grid grid-cols-1 gap-2 lg:gap-5 items-end pb-6">
          <div className="inline-flex mx-auto w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-white/30 text-white font-medium">
            <span className="w-2 h-2 bg-[#1D96FC] rounded-full"></span>
            Built for every industry
          </div>
          <h2 className="text-3xl md:text-4xl text-white text-center font-heading font-medium tracking-tight">
            Purpose-built for{" "}
            <span className="text-[#1D96FC]">service-intensive</span> sectors
          </h2>
        </div>

        {/* Mobile — scroll-stacked cards */}
        <div className="lg:hidden mt-10">
          {INDUSTRIES.map((ind, i) => {
            const indIsIndustrial = ind.slug === "industrial-services";
            const indIsHealth = ind.slug === "health-social-care";
            // Earlier cards stick higher (peek above later cards); later cards have higher z-index
            const stickyTop = HEADER_H + i * PEEK;

            return (
              <div
                key={ind.slug}
                style={{ top: stickyTop, zIndex: (i + 1) * 10 }}
                className="sticky mb-3 last:mb-0 bg-white rounded-lg p-2 flex flex-col gap-3"
              >
                <div className="relative w-full h-[215px] rounded-lg overflow-hidden">
                  {indIsIndustrial ? (
                    <video
                      src={INDUSTRIAL_VIDEO}
                      autoPlay
                      muted
                      playsInline
                      loop
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : indIsHealth ? (
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
                      src={ind.image}
                      alt={ind.name}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  )}
                </div>
                <div className="bg-gray-200 rounded-lg p-5 flex flex-col gap-4">
                  <h3 className="font-heading text-[22px] font-medium text-prussian-blue-800 tracking-tight">
                    {ind.name}
                  </h3>
                  <p className="font-heading text-base font-normal leading-relaxed text-sognos-text-body">
                    {ind.description}
                  </p>
                  <Link
                    href={ind.href}
                    className="inline-flex items-center gap-2.5 text-sm font-medium text-prussian-blue-800 hover:opacity-70 transition-opacity"
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
              </div>
            );
          })}
        </div>

        {/* Desktop — vertical tabs | animated panel */}
        <div className="hidden lg:flex gap-4 h-[460px] mt-10">
          {/* Left column — vertical tab list */}
          <div className="w-[360px] shrink-0 flex flex-col justify-center">
            {INDUSTRIES.map((ind, i) => (
              <button
                key={ind.slug}
                onClick={() => setActiveIndex(i)}
                className={`w-full text-left py-3 px-5 font-heading text-xl font-medium tracking-tight transition-colors cursor-pointer ${
                  i === activeIndex
                    ? "text-white border-l-3 border-l-[#1D96FC]"
                    : "text-white/70 border-l-3 border-l-prussian-blue-900 hover:text-white"
                }`}
              >
                {ind.name}
              </button>
            ))}
          </div>

          {/* Center + right — animated panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-4 flex-1 min-w-0 bg-white rounded-lg p-2"
            >
              {/* Left column — grey info panel */}
              <div className="shrink-0 w-[40%] bg-gray-200 rounded-lg p-7 flex flex-col justify-between">
                <div className="flex flex-col">
                  <h3 className="mt-3 mb-6 font-heading text-[26px] font-medium text-prussian-blue-800 tracking-tight">
                    {active.name}
                  </h3>
                  <p className="font-heading text-base font-normal leading-relaxed text-sognos-text-body lg:text-lg">
                    {active.description}
                  </p>
                </div>
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
        </div>
      </div>
    </section>
  );
}
