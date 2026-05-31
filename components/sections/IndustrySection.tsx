"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { INDUSTRIES } from "@/lib/constants";

// Header bar height (h-14 = 56px) - cards stick just below it
const HEADER_H = 112;
// Each card in the stack peeks this many px above the one covering it
const PEEK = 0;

export default function IndustrySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = INDUSTRIES[activeIndex];

  return (
    <section className="w-full bg-[#1D96FC] bg-gradient-hero border-b border-sognos-border-subtle">
      <div className="max-w-7xl w-full mx-auto px-6 py-16 lg:py-24">
        {/* Section heading */}
        <div className="grid grid-cols-1 gap-2 lg:gap-5 items-end pb-6">
          <div className="inline-flex mx-auto w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-white/30 text-white font-medium">
            <span className="w-2 h-2 bg-[#1D96FC] rounded-full"></span>
            Built for every industry
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-white text-center tracking-tight mb-6">
            Purpose-built for{" "}
            <span className="text-[#1D96FC]">service-intensive</span> sectors
          </h2>
        </div>

        {/* Mobile - scroll-stacked cards */}
        <div className="lg:hidden mt-10">
          {INDUSTRIES.map((ind, i) => {
            // Earlier cards stick higher (peek above later cards); later cards have higher z-index
            const stickyTop = HEADER_H + i * PEEK;

            return (
              <div
                key={ind.slug}
                style={{ top: stickyTop, zIndex: (i + 1) * 10 }}
                className="sticky mb-3 last:mb-0 bg-white rounded-lg p-2 flex flex-col gap-3"
              >
                <div className="relative w-full h-[215px] rounded-lg overflow-hidden">
                  <Image
                    src={ind.image}
                    alt={ind.name}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <div className="bg-gray-200 rounded-lg p-5 flex flex-col gap-4">
                  <h2 className="font-heading text-[22px] font-medium text-prussian-blue-800 tracking-tight">
                    {ind.name}
                  </h2>
                  <p className="font-heading text-base font-normal leading-relaxed text-sognos-text-body">
                    {ind.description}
                  </p>
                  <Link
                    href={ind.href}
                    className="inline-flex items-center gap-2.5 text-md font-semibold text-prussian-blue-800 hover:opacity-70 transition-opacity"
                  >
                    Read more
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#052048] text-white shrink-0">
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

        {/* Desktop - vertical tabs | animated panel */}
        <div className="hidden lg:flex gap-4 h-[460px] mt-10">
          {/* Left column - vertical tab list */}
          <div className="w-[360px] shrink-0 flex flex-col justify-center">
            {INDUSTRIES.map((ind, i) => (
              <button
                key={ind.slug}
                onClick={() => setActiveIndex(i)}
                className={`w-full text-left py-3 px-5 font-heading text-xl font-medium tracking-tight transition-colors cursor-pointer ${
                  i === activeIndex
                    ? "text-white border-l-3 border-l-[#1D96FC]"
                    : "text-white/70 border-l-3 border-l-[#052048] hover:text-white"
                }`}
              >
                {ind.name}
              </button>
            ))}
          </div>

          {/* Center + right - animated panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-2 flex-1 min-w-0 bg-white rounded-lg p-2"
            >
              {/* Left column - grey info panel */}
              <div className="shrink-0 w-[45%] bg-gray-200/70 rounded-lg p-7 flex flex-col justify-between">
                <div className="flex flex-col">
                  <h2 className="mt-1 mb-1 font-heading text-2xl font-medium text-prussian-blue-800 tracking-tight">
                    {active.name}
                  </h2>
                  <p className="mt-4 max-w-sm font-heading font-normal leading-relaxed text-sognos-body lg:text-lg">
                    {active.description}
                  </p>
                </div>
                <Link
                  href={active.href}
                  className="mt-5 inline-flex items-center gap-2.5 text-md font-semibold text-prussian-blue-800 hover:opacity-70 transition-opacity"
                >
                  Read more
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#052048] text-white shrink-0">
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

              {/* Center column - portrait image or video */}
              <div className="flex-1 relative rounded-lg overflow-hidden">
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 35vw"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
