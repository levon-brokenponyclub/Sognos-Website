"use client";
import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useBookDemo } from "@/lib/BookDemoContext";

type HeroProps = {
  headline?: React.ReactNode;
  subtext?: string;
  primaryCTA?: { name: string };
  secondaryCTA?: { name: string; href: string };
  /** Rendered inside the hero section, below the CTAs — the trust strip.
   *  Passed in rather than imported: this is a Client Component and the strip
   *  is an async Server Component, so it has to arrive as a child from a
   *  server parent instead of being rendered here. */
  children?: React.ReactNode;
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Hero({
  // Two lines from `md`; below that the headline wraps naturally so it does
  // not break mid-measure at 36-48px.
  headline = (
    <>
      <span className="md:block">Your entire service operation, </span>
      <span className="text-sognos-blue-accent md:block">
        run on one intelligent platform.
      </span>
    </>
  ),
  subtext = "Sognos helps service organisations unify demand, workforce, and delivery on Microsoft Dynamics 365 and Copilot-powered workflows.",
  primaryCTA = { name: "Book a Demo" },
  secondaryCTA = { name: "Talk to Sales", href: "/contact" },
  children,
}: HeroProps) {
  const { openModal } = useBookDemo();

  // Cinematic scroll, the same treatment sognoscare/Hero.tsx uses: the copy
  // drifts down and fades as the block leaves. The ref is on the copy rather
  // than the section, because the section now also holds the product cards and
  // the trust strip — measuring the whole thing would stretch the progress
  // range over content that is not supposed to move.
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: contentRef,
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

  // Fills the viewport less 7rem, so the How Sognos Works card peeks in from
  // the bottom (2026-11-03); the copy centres below the navbar.
  return (
    <section className="relative flex min-h-[calc(100svh-7rem)] flex-col justify-center overflow-hidden bg-sognos-navy pt-28 pb-16 md:pt-32">

      <motion.div
        ref={contentRef}
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center will-change-transform"
      >
        <motion.h1
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-heading text-4xl font-normal leading-[1.05] tracking-[-0.01em] text-white text-balance sm:text-5xl md:text-6xl"
        >
          {headline}
        </motion.h1>
        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85 text-pretty md:mt-5"
        >
          {subtext}
        </motion.p>
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-8"
        >
          <button
            type="button"
            onClick={() => openModal()}
            className="min-h-11 rounded-full bg-white px-7 py-3.5 text-base font-medium text-sognos-navy-dark transition-colors duration-300 hover:bg-sognos-blue-accent hover:text-white active:scale-[.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {primaryCTA.name}
          </button>
          <Link
            href={secondaryCTA.href}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-base font-medium text-white transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {secondaryCTA.name}
            <span aria-hidden="true">&#8599;</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Trust strip, inside the hero rather than a sibling below it. Sits
          outside the copy block above because it brings its own container,
          and stays still while the copy fades on scroll. */}
      {children && <div className="relative z-10">{children}</div>}
    </section>
  );
}
