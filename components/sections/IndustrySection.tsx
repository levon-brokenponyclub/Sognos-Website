"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { INDUSTRIES } from "@/lib/constants";

const INDUSTRIAL_VIDEO =
  "https://www.shutterstock.com/shutterstock/videos/3849131045/preview/stock-footage-industrial-engineer-wearing-protective-safety-equipment-gesturing-and-instructing-near-machinery.webm";

// ─── Industry card ────────────────────────────────────────────────────────────

function IndustryCard({ industry }: { industry: (typeof INDUSTRIES)[number] }) {
  const isIndustrial = industry.slug === "industrial-services";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg cursor-pointer min-h-96">
      {/* Background: video for industrial, image for all others */}
      {isIndustrial ? (
        <video
          src={INDUSTRIAL_VIDEO}
          autoPlay
          muted
          playsInline
          loop
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <Image
          src={industry.image}
          alt={industry.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-prussian-blue-900/90 via-prussian-blue-900/40 to-transparent" />

      {/* Content */}
      <div className="relative mt-auto p-6 flex flex-col">
        <h3 className="text-xl font-medium text-white leading-snug text-balance">
          {industry.name}
        </h3>
        <p className="mt-2 text-sm leading-normal text-white/70 line-clamp-3">
          {industry.description}
        </p>
        <Link
          href={industry.href}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-white transition-colors"
        >
          Learn more
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

// ─── Stand-out card ───────────────────────────────────────────────────────────

function StandOutCard() {
  return (
    <div className="flex flex-col justify-between rounded-lg bg-prussian-blue-800 p-7 text-white">
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

  const margin = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const expandWidth = useMotionTemplate`calc(100vw - ${margin}px)`;

  const slots = [
    ...INDUSTRIES.map((ind) => ({ type: "industry" as const, industry: ind })),
    { type: "standout" as const },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white border-b border-sognos-border-subtle overflow-hidden relative"
    >
      <motion.div className="absolute inset-0 bg-[#1D96FC] mx-auto h-full" />

      <div className="relative max-w-7xl w-full mx-auto px-6 py-24">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {slots.map((slot) =>
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
