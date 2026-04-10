"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Heartbeat,
  Buildings,
  ClipboardText,
  Factory,
  Circuitry,
} from "@phosphor-icons/react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { INDUSTRIES } from "@/lib/constants";

// ─── Icons ────────────────────────────────────────────────────────────────────

const ICONS: Record<
  string,
  React.ComponentType<{ size?: number; weight?: "duotone" }>
> = {
  "health-social-care": Heartbeat,
  "facilities-management": Buildings,
  "local-government": ClipboardText,
  "industrial-services": Factory,
  "energy-utilities": Circuitry,
};

// ─── Industry card ────────────────────────────────────────────────────────────

function IndustryCard({ industry }: { industry: (typeof INDUSTRIES)[number] }) {
  const Icon = ICONS[industry.slug];
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-400/30 bg-white hover:bg-true-cobalt-700 transition-colors duration-200 cursor-pointer">
      <div className="h-34 flex items-center px-10">
        <div
          className="text-sognos-text-body bg-prussian-blue-900/5 group-hover:bg-white w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
          style={{ transform: "scale(2.2)", transformOrigin: "center" }}
        >
          {Icon ? <Icon size={20} weight="duotone" /> : null}
        </div>
      </div>

      <div className="p-6 pt-0 flex flex-col flex-1">
        <h3 className="text-2xl font-medium text-prussian-blue-800 group-hover:text-white leading-snug text-balance transition-colors duration-200">
          {industry.name}
        </h3>
        <p className="mt-3 leading-normal text-prussian-blue-900/65 group-hover:text-white/80 line-clamp-4 flex-1 transition-colors duration-200">
          {industry.description}
        </p>
      </div>

      {/* Animated bubble CTA */}
      <Link
        href={industry.href}
        className="relative mx-6 mb-6 mt-4 flex items-center overflow-hidden rounded-full border border-slate-400/30 bg-transparent h-11 px-4 font-semibold text-sm text-prussian-blue-800 group-hover:text-white group-hover:border-white/20 transition-colors duration-300"
      >
        See {industry.name}
        <div className="absolute right-1 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-40px)] group-hover:rotate-45 text-prussian-blue-900/20 bg-prussian-blue-900/5 group-hover:bg-white group-hover:text-prussian-blue-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
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
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </div>
      </Link>
    </div>
  );
}

// ─── Stand-out card ───────────────────────────────────────────────────────────

function StandOutCard() {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-neutral-900 p-7 text-white">
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
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.6", "start 0.1"],
  });

  // 120px margin shrinks to 0 as section scrolls into view
  const margin = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const expandWidth = useMotionTemplate`calc(100vw - ${margin}px)`;

  // Build the 6-slot grid: industries 0–3, stand-out, industry 4
  const slots = [
    ...INDUSTRIES.map((ind) => ({
      type: "industry" as const,
      industry: ind,
    })),
    { type: "standout" as const },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white border-b border-sognos-border-subtle overflow-hidden relative"
    >
      {/* Background layer only — expands and fades independently of content */}
      <motion.div
        className="absolute inset-0 bg-bright-lavender-200 mx-auto h-full rounded-xl"
        style={{ width: expandWidth, opacity, left: "50%", x: "-50%" }}
      />

      {/* Content — always full width, unaffected by background animation */}
      <div className="relative max-w-7xl w-full mx-auto px-6 py-24">
        {/* Heading row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end justify-items-between pb-6">
          <h2 className="text-2xl md:text-4xl text-brand font-heading font-medium tracking-tight">
            Industries
            <br />
            Built for service-intensive operations
          </h2>
          <p className="font-heading font-medium leading-tigher section-header-description justify-self-end">
            Sognos connects service demand, workforce scheduling, and compliance
            into a single operational loop. Powered by AI, Microsoft Dynamics
            365.
          </p>
        </div>

        {/* 3×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {slots.map((slot, i) =>
            slot.type === "industry" ? (
              <IndustryCard key={slot.industry.slug} industry={slot.industry} />
            ) : (
              <StandOutCard key="standout" />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
