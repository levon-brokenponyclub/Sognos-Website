"use client";

// Mission / Vision / Beliefs on the dark navy surface. Layout (2026-10-24,
// from the /dev/about-mockup pass): Mission 2/3 + Vision 1/3 side by side,
// then the three beliefs across the full width, each block labelled in place
// rather than from a left rail. All three stay visible. Enhancements:
//
//   • Section rhythm brought onto the house `py-20 md:py-28`.
//   • Dark-surface alpha ladder applied (white / white/75 / white/50 with
//     dividers at white/20) — no more one-off white/65.
//   • Mission and Vision statements bumped to display face at
//     `text-2xl md:text-3xl font-normal` so the AngelList personality
//     carries the copy without a font-medium weight muddying it.
//   • Beliefs redesigned as a type-first three-column composition — no
//     cards, no boxes. Hairline dividers between columns; numbered marker
//     (01/02/03) + accent tag + display-face title + always-visible body.
//     The pattern matches the "not in a box" direction validated on
//     Leadership.
//   • Row-level reveal on scroll (fade + 20px lift) with per-column
//     stagger on the beliefs row.
//
// Reduced motion respected on every layer.

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";

type Belief = {
  tag: string;
  title: string;
  body: string;
};

const BELIEFS: Belief[] = [
  {
    tag: "Respect",
    title: "Every person is treated with dignity and care.",
    body: "Client, partner, team member — the standard doesn't shift. We hire and grow people who assume the best of others, and we protect that culture without exception.",
  },
  {
    tag: "Value",
    title: "Outcomes over activity. Impact over hours billed.",
    body: "We measure success by what actually changes for the customer, not how busy the team looked getting there.",
  },
  {
    tag: "Excellence",
    title: "The highest standard, held on every deployment.",
    body: "Delivery, ethics, continuous improvement. Every rollout teaches us how to build the next one better — that habit is the discipline.",
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function ValueCell({
  eyebrow,
  className = "",
  children,
}: {
  eyebrow: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const shown = inView || !!prefersReducedMotion;

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: prefersReducedMotion ? 1 : 0,
        y: prefersReducedMotion ? 0 : 20,
      }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className={`min-w-0 py-10 lg:py-14 ${className}`}
    >
      <AnimatedEyebrow textClassName="text-white/80">{eyebrow}</AnimatedEyebrow>
      <div className="mt-6">{children}</div>
    </motion.div>
  );
}

function BeliefColumn({
  belief,
  index,
  isFirst,
  isLast,
}: {
  belief: Belief;
  index: number;
  isFirst: boolean;
  isLast: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const shown = inView || !!prefersReducedMotion;

  // Uniform per-column padding + hairline dividers on non-first columns.
  // Overrides drop outer padding at the row's edges.
  const spacing = isFirst
    ? "md:pr-8 lg:pr-10"
    : isLast
      ? "md:border-l md:border-white/20 md:pl-8 lg:pl-10"
      : "md:border-l md:border-white/20 md:px-8 lg:px-10";

  return (
    <motion.article
      ref={ref}
      initial={{
        opacity: prefersReducedMotion ? 1 : 0,
        y: prefersReducedMotion ? 0 : 16,
      }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        duration: 0.55,
        ease: EASE_OUT,
        delay: prefersReducedMotion ? 0 : index * 0.08,
      }}
      className={`flex flex-col ${spacing}`}
    >
      {/* Numeral marker + accent tag — the enumerable-list signature. */}
      <div className="flex items-baseline gap-3">
        <span
          aria-hidden="true"
          className="font-heading text-5xl font-light leading-none tabular-nums text-white/25 md:text-6xl"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
          {belief.tag}
        </span>
      </div>

      {/* Title — display face at pull-quote scale. */}
      <h3 className="mt-6 max-w-sm font-heading text-xl font-normal leading-snug tracking-tight text-white text-balance md:text-2xl">
        {belief.title}
      </h3>

      {/* Body — always visible per client note. */}
      <p className="mt-4 max-w-sm text-base leading-relaxed text-white/75">
        {belief.body}
      </p>
    </motion.article>
  );
}

export default function AboutValues() {
  return (
    <section className="bg-sognos-navy py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="border-y border-white/20">
          {/* Row 1 — asymmetric 2 : 1. Mission is the display statement,
              Vision the supporting column, split by a hairline. */}
          <div className="grid grid-cols-1 border-b border-white/20 md:grid-cols-3">
            <ValueCell
              eyebrow="Our Mission"
              className="md:col-span-2 md:border-r md:border-white/20 md:pr-12"
            >
              <p className="font-heading text-2xl font-normal leading-snug tracking-tight text-white text-balance md:text-3xl lg:text-4xl">
                Built to support the people delivering care, services and
                frontline operations every day &mdash; simplifying the
                complexity of healthcare through modern business applications
                designed for real-world service delivery.
              </p>
            </ValueCell>

            <ValueCell
              eyebrow="Our Vision"
              className="border-t border-white/20 md:border-t-0 md:pl-12"
            >
              <p className="text-lg leading-relaxed text-white">
                A future where healthcare and frontline teams are empowered by
                connected, intelligent systems that make work simpler and
                create better experiences for patients, clients and the
                communities they support.
              </p>
            </ValueCell>
          </div>

          {/* Row 2 — beliefs across the full width. Type-first columns with
              hairline dividers; no cards, no boxes. */}
          <ValueCell eyebrow="Our Beliefs">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0">
              {BELIEFS.map((belief, i) => (
                <BeliefColumn
                  key={belief.tag}
                  belief={belief}
                  index={i}
                  isFirst={i === 0}
                  isLast={i === BELIEFS.length - 1}
                />
              ))}
            </div>
          </ValueCell>
        </div>
      </div>
    </section>
  );
}
