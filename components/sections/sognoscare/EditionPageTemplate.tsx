"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import EditionCards from "@/components/sections/sognoscare/EditionCards";
import CTASection from "@/components/sections/CTASection";
import ProductCustomerStories from "@/components/sections/ProductCustomerStories";
import ProductFeaturesScroll, {
  type ScrollFeature,
} from "@/components/sections/ProductFeaturesScroll";
import { SOGNOSCARE_EDITIONS } from "@/lib/constants";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Problem = {
  label: string;
  description: string;
};

export type Feature = {
  title: string;
  description: string;
};

export type ProofQuote = {
  quote: string;
  attribution: string;
};

export type CaseStudy = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  company?: string;
  companySize?: string;
  industry?: string;
  logo?: string;
  panelImage?: string;
  panelVideo?: string;
  quote?: string;
  author?: string;
  role?: string;
};

export type EditionData = {
  name: string;
  tagline: string;
  description: string;
  gradient: string;
  accentHex: string;
  accentTextClass: string;
  accentBgClass: string;
  accentBorderClass: string;
  advantagesBg?: string;
  problems: Problem[];
  features: Feature[];
  advantages: string[];
  aiTools: string[];
  proofQuotes: ProofQuote[];
  caseStudy: CaseStudy;
};

// ─── Proof story data ─────────────────────────────────────────────────────────

const FLOURISH_STORY = {
  company: "Flourish Australia",
  companySize: "1,100+",
  industry: "Health & Social Care",
  logo: "/logos/flourish-australia-logo.png",
  panelImage: "/images/customers/flourish-australia.avif",
  quote:
    "Congratulations and well done to everyone that has been a part of this magnificent success! You should all be very proud of the quality of work you produce. You make us very proud - THANK YOU!",
  author: "Susan McCarthy",
  role: "Chief Operating Officer, Flourish Australia",
  href: "/customer-stories/flourish-australia",
};

// ─── Section: Hero ────────────────────────────────────────────────────────────

function Hero({ data }: { data: EditionData }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const opacity = useTransform(scrollYProgress, [0.5, 1], [1, 0.7]);

  // Initialise glow at left-centre on mount — matches AngelList default position
  useEffect(() => {
    if (!heroRef.current) return;
    const { width, height } = heroRef.current.getBoundingClientRect();
    setCursorPos({ x: width * 0.28, y: height * 0.5 });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden pb-20 md:pb-28 bg-gray-50 h-full"
      onMouseMove={handleMouseMove}
    >
      {/* AngelList-style glow: 1px anchor translated to cursor, 600px orb centred on it */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 size-px"
        style={{
          transform: `translateX(${cursorPos.x}px) translateY(${cursorPos.y}px)`,
        }}
      >
        <div
          className="absolute left-0 top-0 size-[305px] -translate-x-1/2 -translate-y-1/2 rounded-full md:size-[600px]"
          style={{
            backgroundImage: `radial-gradient(50% 50% at 50% 50%, ${data.accentHex}99 0%, ${data.accentHex}00 100%)`,
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative will-change-transform"
      >
        <div className="mx-auto max-w-7xl px-6 pt-40 pb-0 text-center">
          {/* Eyebrow */}
          <p
            className={`text-xs font-semibold uppercase tracking-[0.08em] ${data.accentTextClass}`}
          >
            SognosCare — {data.name}
          </p>

          {/* Headline */}
          <h1 className="mx-auto mt-6 max-w-[1100px] font-heading text-balance text-sognos-heading text-5xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.02em]">
            {data.tagline}
          </h1>

          {/* Subtext */}
          <p className="mx-auto mt-6 max-w-[640px] text-lg leading-relaxed text-sognos-muted">
            {data.description}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              className={`rounded-full px-7 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90 ${data.accentBgClass}`}
            >
              Book a Demo
            </button>
            <Link
              href="/products/sognoscare"
              className="inline-flex items-center gap-1.5 text-base font-medium text-sognos-heading transition-opacity hover:opacity-70"
            >
              Explore Editions
              <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Section: What it solves (Problems.tsx pattern) ───────────────────────────

function WhatItSolves({ data }: { data: EditionData }) {
  return (
    <section id="problems" className="overflow-clip bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Single intro */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-sognos-heading text-balance">
            {data.tagline}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sognos-muted text-pretty">
            {data.description}
          </p>
        </div>

        {/* 3-col × 2-row capability grid — AngelList numbered style, edge-flush */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-sognos-line">
          {data.problems.map((p, i) => (
            <div
              key={i}
              className={[
                "flex flex-col py-8 px-6",
                "border-b border-sognos-line lg:border-b-0",
                "lg:[&:nth-child(n+4)]:border-t",
                "lg:border-r lg:[&:nth-child(3n)]:border-r-0",
                "lg:[&:nth-child(3n+1)]:pl-0 lg:[&:nth-child(3n)]:pr-0",
              ].join(" ")}
            >
              <span
                className={`font-heading text-5xl font-medium leading-none ${data.accentTextClass}`}
              >
                {i + 1}
              </span>
              <h3 className="mt-5 font-heading text-base md:text-lg font-medium text-sognos-heading">
                {p.label}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-sognos-muted">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Features (ProductFeaturesScroll pattern) ───────────────────────

function Features({ data }: { data: EditionData }) {
  const scrollFeatures: ScrollFeature[] = data.features.map((f, i) => ({
    id: `feature-${i}`,
    name: f.title,
    description: f.description,
  }));

  return (
    <ProductFeaturesScroll
      header={{ heading: "Core Features" }}
      features={scrollFeatures}
      accentBorderClass={data.accentBorderClass}
      accentTextClass={data.accentTextClass}
      noBg
      swapColumns
    />
  );
}

// ─── Section: Advantages (Advantages.tsx pattern) ─────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-sognos-blue-accent"
      aria-hidden="true"
    >
      <path d="M18 4 7 16l-5-5" />
    </svg>
  );
}

function Advantages({ data }: { data: EditionData }) {
  return (
    <section
      id="advantages"
      className="w-full text-white"
      style={{
        backgroundColor: data.advantagesBg ?? "var(--sognos-care-dark)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left — label col */}
          <div className="lg:col-span-2 lg:sticky lg:top-[100px] lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/50">
              Advantages
            </p>
          </div>

          {/* Right — heading + checklist */}
          <div className="lg:col-[3/-1]">
            <div className="mb-10">
              <h2 className="font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
                Key Advantages
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white">
                Built for the regulatory reality of {data.name.toLowerCase()}{" "}
                care — not adapted from a generic CRM.
              </p>
            </div>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
              className="divide-y divide-white/10 rounded-lg overflow-hidden"
            >
              {data.advantages.map((advantage, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className={`flex items-start gap-4 px-6 py-5 ${
                    i % 2 === 0 ? "bg-white/10" : ""
                  }`}
                >
                  <CheckIcon />
                  <span className="text-base leading-relaxed text-white">
                    {advantage}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Customer Stories (ProductCustomerStories pattern) ───────────────

function ProofStories() {
  return <ProductCustomerStories stories={[FLOURISH_STORY]} />;
}

// ─── Section: Related Editions (Editions.tsx pattern) ────────────────────────

function RelatedEditions({ data }: { data: EditionData }) {
  const relatedEditions = SOGNOSCARE_EDITIONS.filter(
    (edition) => edition.label !== data.name,
  );

  return (
    <section id="editions" className="bg-gray-200/70 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-2">
          <h2 className="font-heading text-3xl md:text-4xl font-medium tracking-tight text-sognos-heading">
            Other SognosCare Editions
          </h2>
          <p className="mt-2 text-lg text-sognos-muted">
            SognosCare is purpose-built for each care sector — choose the
            edition that fits your funding model and compliance requirements.
          </p>
        </div>
        <EditionCards
          editions={relatedEditions}
          showSliderButtons
          containerClassName="w-full"
        />
      </div>
    </section>
  );
}

// ─── Template ─────────────────────────────────────────────────────────────────

export default function EditionPageTemplate({ data }: { data: EditionData }) {
  return (
    <main className="w-full bg-white">
      <Hero data={data} />
      <WhatItSolves data={data} />
      <Features data={data} />
      <Advantages data={data} />
      <ProofStories />
      <RelatedEditions data={data} />
      <div id="calendar">
        <CTASection defaultProduct="sognoscare" />
      </div>
    </main>
  );
}
