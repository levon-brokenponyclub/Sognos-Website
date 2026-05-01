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
  logo: string;
  panelImage: string;
  panelVideo?: string;
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

const AUTOPLAY_MS = 10000;

const CASE_STUDIES: CaseStudy[] = [
  {
    company: "Flourish Australia",
    companySize: "1,100+",
    industry: "Health & Social Care",
    logo: "/logos/flourish-australia-logo.png",
    panelImage: "/images/customers/flourish-australia.avif",
    quote:
      "Congratulations and well done to everyone that has been a part of this magnificent success! You should all be very proud of the quality of work you produce. You make us very proud - THANK YOU!",
    author: "Susan McCarthy",
    role: "Chief Operating Officer, Flourish Australia",
    href: "/customers/summit-fm",
    panelClass: "bg-prussian-blue-800/10",
    quoteClass: "text-prussian-blue-800",
    authorClass: "text-prussian-blue-800",
    roleClass: "text-prussian-blue-800/75",
    quoteIconColor: "text-prussian-blue-800/20",
    contentBorderClass: "border-prussian-blue-800/20",
    buttonBorderClass: "border-prussian-blue-800",
    buttonTextClass: "text-prussian-blue-800",
    buttonHoverClass: "hover:bg-prussian-blue-800/8",
    buttonIconBgClass: "bg-prussian-blue-800",
  },
  {
    company: "Auckland Airport",
    companySize: "350+",
    industry: "Transport",
    logo: "/logos/auckland-airport-logo.png",
    panelImage: "/images/customers/auckland-airport.webp",
    quote:
      "Thank you to the Sognos team. Hoping to see you and thank you in person for such a successful implementation. Looking forward to a continued successful partnership with Sognos as our Field Service support partners!",
    author: "Anthony Hart",
    role: "Operations Delivery Lead, Auckland Airport",
    href: "/customers/meridian-care-group",
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
  {
    company: "Penrith City Council",
    companySize: "300+",
    industry: "Local Government",
    logo: "/logos/penrith-city-council-logo.png",
    panelImage: "",
    panelVideo:
      "https://www.shutterstock.com/shutterstock/videos/3849131045/preview/stock-footage-industrial-engineer-wearing-protective-safety-equipment-gesturing-and-instructing-near-machinery.webm",
    quote:
      "We've moved from reactive to proactive compliance. Every inspection now, the auditors comment on how thorough our records are. That wasn't possible before Sognos.",
    author: "Claire Donovan",
    role: "Service Delivery Manager, Penrith City Council",
    href: "/customers/lakeshore-council",
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
  {
    company: "Gentari Solar Australia",
    companySize: "10,000+",
    industry: "Energy & Utilities",
    logo: "/logos/gentari-logo-rect.webp",
    panelImage: "/images/customers/gentari.webp",
    quote:
      "For us it is of the utmost importance to give our technicians visibility of the history of each of the farms that they service in their routine PMs and capture data at the same time. Dynamics 365 Field Service has not disappointed us in any of our key requirements.",
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
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, total]);

  // Scroll active tab into view inside the tab strip only (no page scroll)
  useEffect(() => {
    const container = tabsContainerRef.current;
    const el = tabRefs.current[index];
    if (!container || !el) return;
    container.scrollTo({ left: el.offsetLeft, behavior: "smooth" });
  }, [index]);

  const go = (next: number) => {
    if (next < 0 || next >= total) return;
    setIndex(next);
    setPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setPaused(false), AUTOPLAY_MS);
  };

  const study = CASE_STUDIES[index];
  const slideButtonClasses = getSlideButtonClasses(study);

  return (
    <section className="w-full bg-gray-200/70 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6 py-16 lg:py-24 border-x border-dashed border-sognos-border-subtle">
        {/* Section header */}
        <div className="mb-8 flex flex-col items-center lg:items-start gap-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-prussian-blue-800/30 text-prussian-blue-800 font-medium">
            <span className="w-2 h-2 bg-[#1D96FC] rounded-full"></span>
            Customers
          </div>
          <h2 className="text-3xl md:text-4xl text-prussian-blue-800 text-center lg:text-left font-heading font-medium tracking-tight">
            Customer Stories
          </h2>
        </div>

        {/* Card — industry panel style */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col lg:flex-row gap-2 lg:gap-4 flex-1 min-w-0 bg-white rounded-lg p-2 h-auto lg:h-[500px]"
          >
            {/* Left column — image/video with logo + stats */}
            <div className="w-full lg:w-[40%] lg:shrink-0 relative rounded-lg overflow-hidden flex flex-col h-[260px] lg:h-auto">
              {study.panelVideo ? (
                <video
                  src={study.panelVideo}
                  autoPlay
                  muted
                  playsInline
                  loop
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={study.panelImage}
                  alt={study.company}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 35vw"
                />
              )}

              {/* White logo — centered */}
              {study.logo && (
                <div className="relative z-10 flex-1 flex items-center justify-center">
                  <Image
                    src={study.logo}
                    alt={study.company}
                    width={160}
                    height={56}
                    className="w-auto max-w-[220px] object-contain brightness-0 invert"
                  />
                </div>
              )}

              {/* Stats — bottom */}
              <div className="relative z-10 mt-auto p-6 flex gap-8 justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60 mb-1">
                    Company Size
                  </p>
                  <p className="font-heading text-2xl font-medium leading-none tracking-tight text-white">
                    {study.companySize}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60 mb-1">
                    Industry
                  </p>
                  <p className="font-heading text-lg font-medium leading-snug tracking-tight text-white">
                    {study.industry}
                  </p>
                </div>
              </div>

              {/* Gradient overlay — top dark fading down + bottom dark fading up */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
            </div>

            {/* Right column — quote info panel */}
            <div className="flex-1 bg-white rounded-lg p-5 lg:p-7 flex flex-col">
              {/* Quote + author — vertically centered */}
              <div className="flex-1 flex flex-col justify-center">
                <QuoteIcon className={study.quoteIconColor} />

                <blockquote className="mt-4">
                  <p
                    className={`font-heading text-lg lg:text-[26px] font-normal leading-snug tracking-tight ${study.quoteClass}`}
                  >
                    {study.quote}
                  </p>
                </blockquote>

                <div className="mt-6">
                  <p className={`text-sm font-semibold ${study.authorClass}`}>
                    {study.author}
                  </p>
                  <p className={`text-sm mt-0.5 ${study.roleClass}`}>
                    {study.role}
                  </p>
                </div>
              </div>

              {/* CTA — right aligned */}
              <div className="mt-6 lg:mt-8 flex justify-center lg:justify-end">
                <AnimatedButton
                  href={study.href}
                  variant="transparent"
                  className={slideButtonClasses.buttonClassName}
                  bubbleClassName={slideButtonClasses.bubbleClassName}
                >
                  Read case study
                </AnimatedButton>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Logo tab row — below card */}
        <div
          ref={tabsContainerRef}
          className="flex lg:grid lg:grid-cols-4 overflow-x-auto lg:overflow-hidden snap-x snap-mandatory gap-4 lg:gap-10 mt-4 lg:mt-0 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-none"
        >
          {CASE_STUDIES.map((s, i) => (
            <button
              key={i}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              onClick={() => go(i)}
              className={cn(
                "relative flex items-center justify-center py-5 px-3 lg:py-8 lg:px-6 cursor-pointer transition-colors duration-300",
                "shrink-0 basis-[calc(50%-0.5rem)] snap-start lg:shrink lg:basis-auto",
                i === index ? "" : "",
              )}
            >
              {s.logo ? (
                <Image
                  src={s.logo}
                  alt={s.company}
                  width={140}
                  height={48}
                  className="h-7 lg:h-9 w-auto max-w-[140px] object-contain transition-all duration-300"
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

              {/* Progress bar — bottom edge of active tab */}
              <div className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-gray-300">
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
      </div>
    </section>
  );
}
