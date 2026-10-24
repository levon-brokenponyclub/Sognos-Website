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
import SectionLabel from "@/components/ui/SectionLabel";
import SognoscareHeroStage from "./HeroStage";
import { useBookDemo } from "@/lib/BookDemoContext";
import { TYPE } from "./typeScale";

export type HeroTrustLogo = { alt: string; src: string };

interface SognoscareHeroProps {
  // logoSrc kept optional for caller compatibility; no longer rendered.
  logoSrc?: string;
  headline?: string;
  subtext?: string;
  /** Resolved server-side from the product trust-logo set. */
  trustLogos?: HeroTrustLogo[];
}

const DEFAULTS = {
  headline: "One platform. From intake to outcome",
  subtext:
    "Manage cases, track service delivery, meet compliance obligations, and report with confidence - in one platform built end-to-end for care.",
};

// "One platform. From intake to outcome." → one line per sentence. Only the
// first sentence break is used, so a CMS headline without one renders as is.
function splitHeadline(headline: string) {
  const i = headline.indexOf(". ");
  return i === -1 ? [headline] : [headline.slice(0, i + 1), headline.slice(i + 2)];
}

// Atmospheric glows over the care-dark field, from the existing Care
// gradient colours (after routable.com/manufacturing).
const HERO_GLOW =
  "radial-gradient(70% 60% at 20% 30%, color-mix(in srgb, var(--sognos-care-base) 35%, transparent), transparent 70%), radial-gradient(60% 50% at 85% 70%, color-mix(in srgb, #203e71 60%, transparent), transparent 70%)";

export default function SognoscareHero({
  headline = DEFAULTS.headline,
  subtext = DEFAULTS.subtext,
  trustLogos = [],
}: SognoscareHeroProps = {}) {
  const heroRef = useRef<HTMLElement>(null);
  const { openModal } = useBookDemo();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const prefersReducedMotion = useReducedMotion();
  // 60px travel, matching the Roster and Genogram heroes.
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 60],
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
      className="relative flex min-h-[88vh] flex-col justify-between overflow-hidden bg-sognos-care-dark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: HERO_GLOW }}
      />

      {/* Copy — top padding clears the 80px navbar plus the section bar. */}
      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 pt-44 pb-10 text-center will-change-transform md:pt-52 md:pb-20"
      >
        <SectionLabel tone="dark">SognosCare</SectionLabel>

        <h1 className="font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-white text-balance sm:text-5xl md:text-6xl">
          {splitHeadline(headline).map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className={`${TYPE.heroSub} text-white/75`}>{subtext}</p>

        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => openModal("sognoscare")}
            className="min-h-11 rounded-full bg-white px-7 py-3.5 text-base font-medium text-sognos-care-dark transition-colors hover:bg-sognos-blue-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Book a Demo
          </button>
          <Link
            href="#problems"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-base font-medium text-white transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Learn More
            <span aria-hidden="true">&#8599;</span>
          </Link>
        </div>
      </motion.div>

      {/* Motion stage — option 3 "Day in motion" (01m-hero-a mockup). */}
      <div className="relative w-full px-6 pb-10 md:pb-20">
        <SognoscareHeroStage />
      </div>

      {/* Trust logos at the hero foot — replaces the logo panel and the
          separate trust strip. Four on desktop; on mobile the fifth spans
          the 2-col grid so there's no orphan. */}
      {trustLogos.length > 0 && (
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 md:pb-20">
          <ul
            aria-label="Trusted by"
            className="grid grid-cols-2 items-center gap-x-10 gap-y-8 md:grid-cols-4"
          >
            {trustLogos.map((logo, i) => (
              <li
                key={logo.alt}
                className={`flex items-center justify-center ${
                  i === 4 ? "col-span-2 md:hidden" : i > 4 ? "hidden" : ""
                }`}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={220}
                  height={60}
                  className="h-10 w-auto max-w-[180px] object-contain opacity-80 brightness-0 invert md:h-12"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
