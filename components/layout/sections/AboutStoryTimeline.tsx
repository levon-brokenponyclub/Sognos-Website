"use client";

// Replaces the four-paragraph copy column in About > "Our Story" with a
// four-waypoint editorial timeline that closes on the AboutStats tally.
// Each waypoint carries a tag + year + headline + body, hung off the
// notched-rule motif that AboutStats introduces. Motion is scoped and
// reduced-motion guarded:
//
//   • Section eyebrow + H2 fade in via the shared AnimatedEyebrow / no
//     page-level motion added.
//   • Each milestone reveals on view (fade + 16px lift), one-shot, small
//     per-item stagger so the cascade reads deliberate.
//   • The top rule of each milestone fills grey → accent left-to-right as
//     the item enters view. The rail is the timeline, not decoration.
//   • The final "present" milestone carries a beacon pulse behind its
//     notch — one loop that says "we are here now" without copy.
//   • Below the timeline: AboutStats renders as the closing tally, so
//     the story arc lands on a numerical anchor rather than trailing off.
//
// Content is placeholder. Promote MILESTONES to props / lib/content once
// real dates and events are confirmed with Kunal / Rick.

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";
import AboutStats from "@/components/layout/sections/AboutStats";

type Milestone = {
  tag: string;
  year: string;
  headline: string;
  body: string;
  current?: boolean;
};

const MILESTONES: Milestone[] = [
  {
    tag: "Founding",
    year: "2016",
    headline: "Founded in Sydney.",
    body: "Kunal Joshi and Rick Vosila spot the field-service gap in the Microsoft ecosystem. Sognos starts with three people and one Dynamics 365 licence.",
  },
  {
    tag: "Specialisation",
    year: "2019",
    headline: "Aged care becomes the anchor.",
    body: "A NSW aged-care rollout tests the platform against real frontline complexity. The lessons rewrite the product roadmap for the next three years.",
  },
  {
    tag: "Platform",
    year: "2022",
    headline: "Care and Roster ship together.",
    body: "Two products, one operational spine — care operations and workforce optimisation on a shared Dynamics 365 foundation.",
  },
  {
    tag: "Today",
    year: "2025",
    headline: "AI at the centre.",
    body: "SognosGenogram completes the platform, and Copilot moves from proof-of-concept to production across the product line.",
    current: true,
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// The 72×8 notch shape lifted from AboutStats — extracted here so the
// two components share one geometry.
function NotchIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="8"
      viewBox="0 0 72 8"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path d="M72 8L65.3171 2.03269C63.851 0.723577 61.9543 0 59.9888 0H2C0.895431 0 0 0.895431 0 2V8H72Z" />
    </svg>
  );
}

function MilestoneItem({ entry, index }: { entry: Milestone; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const prefersReducedMotion = useReducedMotion();

  const shown = inView || !!prefersReducedMotion;
  const stagger = prefersReducedMotion ? 0 : index * 0.06;

  return (
    <motion.li
      ref={ref}
      initial={{
        opacity: prefersReducedMotion ? 1 : 0,
        y: prefersReducedMotion ? 0 : 16,
      }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay: stagger }}
      className="relative grid grid-cols-1 gap-4 border-t border-sognos-line py-10 last:border-b md:grid-cols-[160px_1fr] md:gap-10 md:py-12"
    >
      {/* Rail fill — accent line draws over the border-t as the item
          enters view. `-mt-px h-px` sits it exactly on the border. */}
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
        animate={{ scaleX: shown ? 1 : 0 }}
        transition={{
          duration: 0.9,
          ease: EASE_OUT,
          delay: stagger + 0.1,
        }}
        className="pointer-events-none absolute left-0 top-0 -mt-px h-px w-full origin-left bg-sognos-blue-accent"
      />

      {/* Notch + optional beacon pulse for the current entry. Beacon is a
          scaled shadow of the notch that fades out as it grows — reads
          as a slow sonar ping rather than a blinking dot. */}
      <div aria-hidden="true" className="absolute -top-2 left-0">
        {entry.current && !prefersReducedMotion ? (
          <motion.span
            className="absolute left-0 top-0 h-2 w-4 origin-left bg-sognos-blue-accent"
            style={{ borderRadius: "0 4px 0 0" }}
            animate={{
              opacity: [0.55, 0, 0.55],
              scaleX: [1, 2.6, 1],
              scaleY: [1, 3.2, 1],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ) : null}
        <NotchIcon className="relative fill-sognos-blue-accent" />
      </div>

      {/* Left column — tag + year. Tag echoes the eyebrow language
          (9px square dot + xs uppercase) without doubling AnimatedEyebrow's
          own motion. */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="size-[9px] shrink-0 bg-sognos-blue-accent"
          />
          <span className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
            {entry.tag}
          </span>
        </div>
        <h3 className="font-heading text-3xl font-medium tabular-nums leading-none tracking-tight text-sognos-heading md:text-4xl">
          {entry.year}
        </h3>
      </div>

      {/* Right column — display-face headline then softer body. */}
      <div className="max-w-xl">
        <p className="font-heading text-xl font-normal leading-snug tracking-tight text-sognos-heading text-balance md:text-2xl">
          {entry.headline}
        </p>
        <p className="mt-3 text-base leading-relaxed text-sognos-body md:text-lg">
          {entry.body}
        </p>
      </div>
    </motion.li>
  );
}

export default function AboutStoryTimeline() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-baseline gap-8 lg:grid-cols-3 lg:gap-10">
          {/* Left column — eyebrow + statement. Same shape as the
              previous About > Our Story left column, so the surrounding
              page rhythm is preserved. */}
          <div className="lg:col-span-1">
            <AnimatedEyebrow
              className="flex w-fit"
              textClassName="text-sognos-muted"
            >
              Our Story
            </AnimatedEyebrow>
            <h2 className="mt-4 max-w-5xl font-heading text-3xl font-medium leading-snug tracking-tight text-sognos-heading text-balance md:text-4xl">
              A decade of building for the frontline.
            </h2>
          </div>

          {/* Right column — timeline. */}
          <div className="lg:col-span-2">
            <ol className="max-w-3xl">
              {MILESTONES.map((entry, i) => (
                <MilestoneItem key={entry.year} entry={entry} index={i} />
              ))}
            </ol>
          </div>
        </div>

        {/* Closing tally — the timeline's arc lands on numerical proof.
            AboutStats is a client component with its own scroll trigger,
            so it plays independently of the milestones above. */}
        <div className="mt-20 md:mt-24">
          <AboutStats />
        </div>
      </div>
    </section>
  );
}
