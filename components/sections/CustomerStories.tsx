"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";

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
  quoteIconColor: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    company: "Meridian Care Group",
    companySize: "Enterprise",
    industry: "Health & Social Care",
    logo: "/logos/penrith-city-council-logo.png",
    quote:
      "Sognos gave us full visibility across every site. Scheduling that used to take hours now happens automatically — and our compliance team finally has the audit trail they need.",
    author: "Sarah Mitchell",
    role: "Director of Operations, Meridian Care Group",
    href: "/customers/meridian-care-group",
    panelClass: "bg-[#cdedfe]",
    quoteIconColor: "#9bdbfd",
  },
  {
    company: "Summit FM Solutions",
    companySize: "Mid-market",
    industry: "Facilities Management",
    logo: "/logos/flourish-australia-logo.png",
    quote:
      "The scheduling overhaul paid for itself in the first quarter. Our field teams finally have a system that works — and management has the data to prove it.",
    author: "James Holt",
    role: "Head of Field Operations, Summit FM Solutions",
    href: "/customers/summit-fm",
    panelClass: "bg-[#ccfff7]",
    quoteIconColor: "#99fff0",
  },
  {
    company: "Lakeshore Council",
    companySize: "Enterprise",
    industry: "Local Government",
    logo: "/logos/auckland-airport-logo.png",
    quote:
      "We've moved from reactive to proactive compliance. Every inspection now, the auditors comment on how thorough our records are. That wasn't possible before Sognos.",
    author: "Claire Donovan",
    role: "Service Delivery Manager, Lakeshore Council",
    href: "/customers/lakeshore-council",
    panelClass: "bg-[#e1ccff]",
    quoteIconColor: "#c399ff",
  },
  {
    company: "Apex Industrial Services",
    companySize: "Enterprise",
    industry: "Industrial Services",
    logo: "/images/logos/apex-industrial.svg",
    quote:
      "From request to worker allocation used to take days. Now it's measured in minutes. The efficiency gains were immediate and the team bought in straight away.",
    author: "Tom Adeyemi",
    role: "Operations Director, Apex Industrial Services",
    href: "/customers/apex-industrial",
    panelClass: "bg-[#ffc999]",
    quoteIconColor: "#ffa966",
  },
  {
    company: "Clearfield Energy",
    companySize: "Enterprise",
    industry: "Energy & Utilities",
    logo: "/images/logos/clearfield-energy.svg",
    quote:
      "Sognos connected our compliance, scheduling and reporting into one place. We reduced incidents by 31% in the first six months — and our first-time fix rate is the best it's ever been.",
    author: "Rachel Osei",
    role: "VP of Service Operations, Clearfield Energy",
    href: "/customers/clearfield-energy",
    panelClass: "bg-[#ffccce]",
    quoteIconColor: "#ff999c",
  },
];

function QuoteIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 39 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-7 shrink-0"
      aria-hidden="true"
    >
      <path
        d="m16.3 4-4.333-4C4.189 5.557.078 12.89.078 20.668v.445C.078 27.779 3.745 32 8.856 32c4.222 0 7.778-3.334 7.778-7.89 0-4.444-3.111-7.332-7.334-7.332a7.15 7.15 0 0 0-2.666.555C7.41 12.223 11.3 7.78 16.3 4.001Zm21.667 0-4.333-4c-7.778 5.556-11.89 12.89-11.89 20.667v.445c0 6.667 3.668 10.889 8.779 10.889 4.222 0 7.777-3.334 7.777-7.89 0-4.444-3.11-7.332-7.333-7.332a7.15 7.15 0 0 0-2.667.555c.778-5.111 4.667-9.555 9.667-13.333Z"
        fill={color}
      />
    </svg>
  );
}

export default function CustomerStories() {
  const [index, setIndex] = useState(0);
  const total = CASE_STUDIES.length;

  const go = (next: number) => {
    if (next < 0 || next >= total) return;
    setIndex(next);
  };

  const study = CASE_STUDIES[index];

  return (
    <section className="w-full border-b border-[--sognos-border-subtle] overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6 py-24 border-x border-dashed border-[--sognos-border-subtle]">

        {/* Section header */}
        <div className="max-w-2xl mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[--sognos-text-muted]">
            Customers
          </p>
          <h2 className="font-heading text-2xl font-medium tracking-tight text-brand md:text-4xl">
            Customer Stories
          </h2>
        </div>

        {/* Card */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] rounded-2xl overflow-hidden border border-[--sognos-border] min-h-[420px]">

          {/* Left panel — white */}
          <div className="bg-white border-b lg:border-b-0 lg:border-r border-[--sognos-border] p-8 flex flex-col">
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
                  <img
                    src={study.logo}
                    alt={study.company}
                    className="h-10 w-auto max-w-[160px] object-contain object-left"
                  />
                </div>
                <div className="mt-auto pt-6">
                  <hr className="border-[--sognos-border] mb-6" />
                  <div className="space-y-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[--sognos-text-muted] mb-1">
                        Company Size
                      </p>
                      <p className="text-sm font-medium text-[--sognos-text-heading]">
                        {study.companySize}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[--sognos-text-muted] mb-1">
                        Industry
                      </p>
                      <p className="text-sm font-medium text-[--sognos-text-heading]">
                        {study.industry}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right panel — accent color */}
          <div className={`p-10 flex flex-col transition-colors duration-300 ${study.panelClass}`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`right-${index}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col h-full"
              >
                <QuoteIcon color={study.quoteIconColor} />

                <blockquote className="mt-6 flex-1">
                  <p
                    className="font-heading text-xl font-normal leading-snug tracking-tight lg:text-2xl"
                    style={{ color: "#122454" }}
                  >
                    {study.quote}
                  </p>
                </blockquote>

                <div className="mt-6">
                  <p className="text-sm font-semibold" style={{ color: "#122454" }}>
                    {study.author}
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: "rgba(18,36,84,0.55)" }}>
                    {study.role}
                  </p>
                </div>

                <div className="mt-8 pt-6 flex justify-end border-t border-[rgba(18,36,84,0.12)]">
                  <AnimatedButton href={study.href} variant="transparent">
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
                  background: i === index ? "var(--sognos-accent)" : "var(--sognos-border)",
                  transform: i === index ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>

          {/* Arrows — bottom right */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label="Previous slide"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-[--sognos-border] text-[--sognos-text-muted] transition-colors hover:border-[--sognos-text-heading] hover:text-[--sognos-text-heading] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
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
          </div>
        </div>

      </div>
    </section>
  );
}
