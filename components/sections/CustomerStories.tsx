"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { cn } from "@/lib/utils";

type CaseStudy = {
  company: string;
  companySize: string;
  industry: string;
  logo: string;
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

const CASE_STUDIES: CaseStudy[] = [
  // Only first 3 active — add more as case studies are ready
  {
    company: "Flourish Australia",
    companySize: "1 100+",
    industry: "Health & Social Care",
    logo: "/logos/flourish-australia-logo.png",
    quote:
      "Congratulations and well done to everyone that has been a part of this magnificent success! You should all be very proud of the quality of work you produce. You make us very proud - THANK YOU!",
    author: "Susan McCarthy",
    role: "Chief Operating Officer, Flourish Australia",
    href: "/customers/summit-fm",
    panelClass: "bg-seagrass-700/40",
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
    panelClass: "bg-cornflower-ocean-500/30",
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
    companySize: "300 Technicians",
    industry: "Local Government",
    logo: "/logos/penrith-city-council-logo.png",
    quote:
      "We've moved from reactive to proactive compliance. Every inspection now, the auditors comment on how thorough our records are. That wasn't possible before Sognos.",
    author: "Claire Donovan",
    role: "Service Delivery Manager, Penrith City Council",
    href: "/customers/lakeshore-council",
    panelClass: "bg-sandy-brown-500/40",
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
  const total = CASE_STUDIES.length;

  const go = (next: number) => {
    if (next < 0 || next >= total) return;
    setIndex(next);
  };

  const study = CASE_STUDIES[index];
  const slideButtonClasses = getSlideButtonClasses(study);

  return (
    <section className="w-full border-b border-sognos-border-subtle overflow-hidden">
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

        {/* Card */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] rounded-xl overflow-hidden border border-slate-400/30 min-h-105">
          {/* Left panel — white */}
          <div className="bg-white border-b lg:border-b-0 lg:border-r border-sognos-border p-8 flex flex-col">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`left-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col h-full"
              >
                <div className="mb-auto">
                  <Image
                    src={study.logo}
                    alt={study.company}
                    width={160}
                    height={72}
                    className="h-18 w-auto max-w-40 object-contain object-left"
                  />
                </div>
                <div className="mt-auto pt-6">
                  <hr className="border-slate-400/30 mb-6" />
                  <div className="space-y-4">
                    <div>
                      <p className="text-sognos-eyebrow font-semibold uppercase tracking-[0.08em] text-cornflower-ocean-800/50 mb-1">
                        Company Size
                      </p>
                      <p className="text-xl font-medium text-prussian-blue-800">
                        {study.companySize}
                      </p>
                    </div>
                    <div>
                      <p className="text-sognos-eyebrow font-semibold uppercase tracking-[0.08em] text-cornflower-ocean-800/50 mb-1">
                        Industry
                      </p>
                      <p className="text-xl font-medium text-prussian-blue-800">
                        {study.industry}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right panel — accent color */}
          <div
            className={`p-10 flex flex-col transition-colors duration-300 ${study.panelClass}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`right-${index}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col h-full"
              >
                <QuoteIcon className={study.quoteIconColor} />

                <blockquote className="mt-6 flex-1">
                  <p
                    className={`font-heading text-xl font-normal leading-snug tracking-tight line-clamp-4 h-27.5 lg:text-3xl lg:h-[10.3125rem] ${study.quoteClass}`}
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

                <div
                  className={cn(
                    "mt-8 pt-6 flex justify-end border-t",
                    slideButtonClasses.contentBorderClass,
                  )}
                >
                  <AnimatedButton
                    href={study.href}
                    variant="transparent"
                    className={slideButtonClasses.buttonClassName}
                    bubbleClassName={slideButtonClasses.bubbleClassName}
                  >
                    Read case study
                  </AnimatedButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom nav row */}
        <div className="flex items-center justify-between mt-6">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {CASE_STUDIES.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="w-2 h-2 rounded-full transition-all duration-200 cursor-pointer"
                style={{
                  background:
                    i === index
                      ? "var(--sognos-accent)"
                      : "var(--sognos-border)",
                  transform: i === index ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>

          {/* Arrows — bottom right */}
          {/* <div className="flex items-center gap-3">
            <button
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label="Previous slide"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-sognos-border text-sognos-text-muted transition-colors hover:border-sognos-text-heading hover:text-sognos-text-heading disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => go(index + 1)}
              disabled={index === total - 1}
              aria-label="Next slide"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-brand text-white transition-opacity hover:opacity-85 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ArrowRight size={16} />
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
}
