"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";

interface SognoscareHeroProps {
  // logoSrc kept optional for caller compatibility; no longer rendered.
  logoSrc?: string;
  headline?: string;
  subtext?: string;
}

const DEFAULTS = {
  headline: "One platform. From intake to outcome",
  subtext:
    "Manage cases, track service delivery, meet compliance obligations, and report with confidence - in one platform built end-to-end for care.",
};

export default function SognoscareHero({
  headline = DEFAULTS.headline,
  subtext = DEFAULTS.subtext,
}: SognoscareHeroProps = {}) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const prefersReducedMotion = useReducedMotion();
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 160],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.7],
    prefersReducedMotion ? [1, 1] : [1, 0],
  );

  return (
    <section
      ref={heroRef}
      data-header-dark
      className="relative overflow-hidden pb-20 md:pb-28 bg-sognos-care-dark"
      style={{ fontFamily: "sofia-pro, sans-serif" }}
    >
      {/* Single animated wrapper — all hero content fades/translates as one unit
          over the static dark section background. AngelList pattern.
          Weight ladder applied per CLAUDE_DESIGN_SYSTEM.md §8.2:
            • Hero H1: font-bold (print-aligned)
            • Body: font-light + text-white/85 (bumped alpha for Light on dark) */}
      <motion.div style={{ y, opacity }} className="will-change-transform">
        <div className="mx-auto max-w-7xl px-6 pt-40 pb-0 text-center">
          {/* Eyebrow */}
          <AnimatedEyebrow textClassName="text-white/60">
            SognosCare
          </AnimatedEyebrow>

          {/* Headline — SofiaPro Bold (700) at display scale */}
          <h1 className="mx-auto mt-4 font-heading font-bold text-white leading-14 text-5xl tracking-tight text-balance lg:text-6xl lg:leading-20">
            {headline}
          </h1>

          {/* Subtext — SofiaPro Light (300) with bumped alpha (white/85)
              to hold contrast against sognos-care-dark navy */}
          <p className="mx-auto mt-6 max-w-3xl text-lg font-light leading-relaxed text-white/85">
            {subtext}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Book a Demo — UNWIRED for now (no onClick) */}
            <button
              type="button"
              className="rounded-full bg-white px-7 py-3.5 text-base font-medium text-sognos-care-dark transition-opacity hover:opacity-90"
            >
              Book a Demo
            </button>
            <Link
              href="#"
              className="inline-flex items-center gap-1.5 text-base font-medium text-white transition-opacity hover:opacity-80"
            >
              Learn More
              <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
        </div>

        {/* Hero panel — logo-only for now. Video treatment is documented
            in CLAUDE_DESIGN_SYSTEM.md §14 "Hero panel · video + logo
            crossfade" (canonical reference: sognosroster/Hero.tsx) but
            not applied here until the Care video asset is finalised.
            Panel width matches Roster hero (max-w-6xl). */}
        <div className="mx-auto mt-16 max-w-6xl px-6">
          <div className="relative aspect-[2.4/1] w-full overflow-hidden rounded-lg bg-sognos-care-gradient">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/logos/sognos-care-logo.svg"
                alt="SognosCare"
                width={220}
                height={48}
                priority
                className="h-12 w-auto sm:h-14 lg:h-16"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
