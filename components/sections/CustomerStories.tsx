"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { cn } from "@/lib/utils";

type CaseStudy = {
  company: string;
  companySize: string;
  industry: string;
  logo: string; // empty string = no logo, falls back to company name text
  quote: string;
  author: string;
  role: string;
  href: string;
  panelClass: string;
  quoteClass: string;
  authorClass: string;
  roleClass: string;
  quoteIconColor: string;
  contentBorderClass: string;
  buttonBorderClass: string;
  buttonTextClass: string;
  buttonHoverClass: string;
  buttonIconBgClass: string;
};

const AUTOPLAY_MS = 6000;

const CASE_STUDIES: CaseStudy[] = [
  {
    company: "Flourish Australia",
    companySize: "1,100+",
    industry: "Health & Social Care",
    logo: "/logos/flourish-australia-logo.png",
    quote:
      "Congratulations and well done to everyone that has been a part of this magnificent success! You should all be very proud of the quality of work you produce. You make us very proud - THANK YOU!",
    author: "Susan McCarthy",
    role: "Chief Operating Officer, Flourish Australia",
    href: "/customers/summit-fm",
    panelClass: "bg-slate-50",
    quoteClass: "text-seagrass-900",
    authorClass: "text-seagrass-900",
    roleClass: "text-seagrass-900/85",
    quoteIconColor: "text-seagrass-900/60",
    contentBorderClass: "border-seagrass-800/35",
    buttonBorderClass: "border-seagrass-900",
    buttonTextClass: "text-seagrass-900",
    buttonHoverClass: "hover:bg-seagrass-900/8",
    buttonIconBgClass: "bg-seagrass-900",
  },
  {
    company: "Auckland Airport",
    companySize: "350+",
    industry: "Transport",
    logo: "/logos/auckland-airport-logo.png",
    quote:
      "Thank you to the Sognos team. Hoping to see you and thank you in person for such a successful implementation. Looking forward to a continued successful partnership with Sognos as our Field Service support partners!",
    author: "Anthony Hart",
    role: "Operations Delivery Lead, Auckland Airport",
    href: "/customers/meridian-care-group",
    panelClass: "bg-slate-50",
    quoteClass: "text-cornflower-ocean-800",
    authorClass: "text-cornflower-ocean-800",
    roleClass: "text-cornflower-ocean-800/85",
    quoteIconColor: "text-cornflower-ocean-800/60",
    contentBorderClass: "border-cornflower-ocean-800/35",
    buttonBorderClass: "border-cornflower-ocean-800",
    buttonTextClass: "text-cornflower-ocean-800",
    buttonHoverClass: "hover:bg-cornflower-ocean-800/8",
    buttonIconBgClass: "bg-cornflower-ocean-800",
  },
  {
    company: "Penrith City Council",
    companySize: "300+",
    industry: "Local Government",
    logo: "/logos/penrith-city-council-logo.png",
    quote:
      "We've moved from reactive to proactive compliance. Every inspection now, the auditors comment on how thorough our records are. That wasn't possible before Sognos.",
    author: "Claire Donovan",
    role: "Service Delivery Manager, Penrith City Council",
    href: "/customers/lakeshore-council",
    panelClass: "bg-slate-50",
    quoteClass: "text-sandy-brown-800",
    authorClass: "text-sandy-brown-800",
    roleClass: "text-sandy-brown-800/85",
    quoteIconColor: "text-sandy-brown-800/60",
    contentBorderClass: "border-sandy-brown-800/12",
    buttonBorderClass: "border-sandy-brown-800",
    buttonTextClass: "text-sandy-brown-800",
    buttonHoverClass: "hover:bg-sandy-brown-800/8",
    buttonIconBgClass: "bg-sandy-brown-800",
  },
  {
    company: "Gentari Solar Australia",
    companySize: "10,000+",
    industry: "Energy & Utilities",
    logo: "/logos/gentari-logo.webp",
    quote:
      "For us it is of the utmost importance to give our technicians visibility of the history of each of the farms that they service in their routine PMs and capture data at the same time. Dynamics 365 Field Service has not disappointed us in any of our key requirements. It has been over five years and the techs love it, and so do we.",
    author: "Operations Team",
    role: "Gentari Solar Australia",
    href: "/customers/gentari-solar",
    panelClass: "bg-prussian-blue-800/10",
    quoteClass: "text-prussian-blue-800",
    authorClass: "text-prussian-blue-800",
    roleClass: "text-prussian-blue-800/75",
    quoteIconColor: "text-prussian-blue-800/40",
    contentBorderClass: "border-prussian-blue-800/20",
    buttonBorderClass: "border-prussian-blue-800",
    buttonTextClass: "text-prussian-blue-800",
    buttonHoverClass: "hover:bg-prussian-blue-800/8",
    buttonIconBgClass: "bg-prussian-blue-800",
  },
];

function QuoteIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 39 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-8 h-7 shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path
        d="m16.3 4-4.333-4C4.189 5.557.078 12.89.078 20.668v.445C.078 27.779 3.745 32 8.856 32c4.222 0 7.778-3.334 7.778-7.89 0-4.444-3.111-7.332-7.334-7.332a7.15 7.15 0 0 0-2.666.555C7.41 12.223 11.3 7.78 16.3 4.001Zm21.667 0-4.333-4c-7.778 5.556-11.89 12.89-11.89 20.667v.445c0 6.667 3.668 10.889 8.779 10.889 4.222 0 7.777-3.334 7.777-7.89 0-4.444-3.11-7.332-7.333-7.332a7.15 7.15 0 0 0-2.667.555c.778-5.111 4.667-9.555 9.667-13.333Z"
        fill="currentColor"
      />
    </svg>
  );
}

function getSlideButtonClasses(study: CaseStudy) {
  return {
    contentBorderClass: study.contentBorderClass,
    buttonClassName: cn(
      study.buttonBorderClass,
      study.buttonTextClass,
      study.buttonHoverClass,
    ),
    bubbleClassName: study.buttonIconBgClass,
  };
}

export default function CustomerStories() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = CASE_STUDIES.length;
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, total]);

  const go = (next: number) => {
    if (next < 0 || next >= total) return;
    setIndex(next);
    // Pause autoplay briefly on manual tab click, then resume
    setPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setPaused(false), AUTOPLAY_MS);
  };

  const study = CASE_STUDIES[index];
  const slideButtonClasses = getSlideButtonClasses(study);

  return (
    <section className="w-full bg-slate-100 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6 py-24 border-x border-dashed border-sognos-border-subtle">
        {/* Section header */}
        <div className="max-w-2xl mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted">
            Customers
          </p>
          <h2 className="font-heading text-2xl font-medium tracking-tight text-brand md:text-4xl">
            Customer Stories
          </h2>
        </div>

          {/* Logo tab row — above card */}
        <div
          className="grid overflow-hidden"
          style={{ gridTemplateColumns: `repeat(${total}, 1fr)` }}
        >
          {CASE_STUDIES.map((s, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={cn(
                "relative flex items-center justify-center py-5 px-6 cursor-pointer transition-colors duration-300",
                i === index
                  ? "bg-white rounded-t-lg"
                  : "bg-slate-100 hover:bg-slate-50",
              )}
            >
              {s.logo ? (
                <Image
                  src={s.logo}
                  alt={s.company}
                  width={140}
                  height={48}
                  className="h-9 w-auto max-w-[140px] object-contain transition-all duration-300"
                  style={{
                    filter: i === index ? "none" : "grayscale(1) opacity(0.35)",
                  }}
                />
              ) : (
                <span
                  className={`text-sm font-semibold tracking-tight transition-all duration-300 ${
                    i === index
                      ? "text-prussian-blue-800 opacity-100"
                      : "text-prussian-blue-800 opacity-35"
                  }`}
                >
                  {s.company}
                </span>
              )}

              {/* Progress bar — top edge of active tab */}
              <div className="absolute inset-x-0 top-0 h-0.5 overflow-hidden bg-transparent">
                {i === index && (
                  <motion.div
                    key={`progress-${i}-${index}`}
                    className="h-full bg-cornflower-ocean-400"
                    initial={{ width: "0%" }}
                    animate={paused ? false : { width: "100%" }}
                    transition={{
                      duration: AUTOPLAY_MS / 1000,
                      ease: "linear",
                    }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Card — two column */}
        <div className="grid grid-cols-[75%_25%] rounded-lg overflow-hidden min-h-[420px]">
          {/* Left column (~75%) — quote + author */}
          <div className="p-10 flex flex-col bg-white">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`left-${index}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col h-full"
              >
                <QuoteIcon className={study.quoteIconColor} />

                <blockquote className="mt-6 flex-1">
                  <p
                    className={`font-heading text-xl font-normal leading-snug tracking-tight lg:text-3xl ${study.quoteClass}`}
                  >
                    {study.quote}
                  </p>
                </blockquote>

                <div className="mt-8">
                  <p className={`text-sm font-semibold ${study.authorClass}`}>
                    {study.author}
                  </p>
                  <p className={`text-sm mt-0.5 ${study.roleClass}`}>
                    {study.role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right column (~25%) — stat + button */}
          <div
            className={cn(
              "border-l p-10 flex flex-col justify-between bg-white",
              study.contentBorderClass,
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`right-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col h-full justify-between"
              >
                {/* Stats */}
                <div className="space-y-5">
                  <div>
                    <p className="text-sognos-eyebrow font-semibold uppercase tracking-[0.08em] text-cornflower-ocean-800/50 mb-1">
                      Company Size
                    </p>
                    <p
                      className={`font-heading text-4xl font-medium leading-none tracking-tight ${study.quoteClass}`}
                    >
                      {study.companySize}
                    </p>
                  </div>
                  <div>
                    <p className="text-sognos-eyebrow font-semibold uppercase tracking-[0.08em] text-cornflower-ocean-800/50 mb-1">
                      Industry
                    </p>
                    <p
                      className={`font-heading text-xl font-medium leading-snug tracking-tight ${study.quoteClass}`}
                    >
                      {study.industry}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <AnimatedButton
                  href={study.href}
                  variant="transparent"
                  className={slideButtonClasses.buttonClassName}
                  bubbleClassName={slideButtonClasses.bubbleClassName}
                >
                  Read case study
                </AnimatedButton>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
