"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import StatementFill from "@/components/ui/StatementFill";
import {
  LAYOUT,
  TYPE,
} from "@/components/layout/sections/sognoscare/typeScale";

// Home · How Sognos Works — Inspector option D "Statement grid" (2026-11-03),
// after customer.io's "Support every stage" panels: the intro line as a
// display statement that fills as it scrolls into view, then the three steps
// as shared-border panels (1px gaps on the line colour, so borders never
// double), each with its step number in the step's colour. No imagery.
// Step 3 has no product, so it takes the neutral heading navy.
// Sits as the hero's single card (2026-11-03): the section keeps the hero's
// navy behind it and the tint card rises out of it with the rounded top the
// product stack used (rounded-t-3xl / md:rounded-t-[40px], border-t).
// Scroll wipe (2026-11-03): as the panels cross the viewport, each one's tint
// sweeps in from the left in turn, 01 → 02 → 03 (clip-path, tied to scroll).
// Reduced motion shows all three filled. Client Component for the scroll.

const STEPS = [
  {
    n: "01",
    title: "Manage demand",
    label: "Intake and triage",
    copy: "Built for care teams delivering complex services across communities, homes and frontline environments.",
    color: "var(--sognos-care-base)",
    fill: "var(--sognos-care-soft)",
  },
  {
    n: "02",
    title: "Coordinate workforce",
    label: "Planning and delivery",
    copy: "Designed around the realities of mobile workforces, scheduling, compliance and service delivery in the field.",
    color: "var(--sognos-roster-base)",
    fill: "var(--sognos-roster-soft)",
  },
  {
    n: "03",
    title: "Track outcomes",
    label: "Insight and improvement",
    copy: "Practical AI embedded where it matters most, helping teams reduce admin, improve decisions and focus on people.",
    color: "var(--sognos-heading)",
    fill: "var(--sognos-genogram-soft)",
  },
] as const;

const STATEMENT =
  "One connected process takes service demand from first contact to coordinated delivery and measurable outcomes.";

/** One panel's tint, wiped in from the left over its share of the scroll. */
function Wipe({
  progress,
  range,
  fill,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  fill: string;
}) {
  const clipPath = useTransform(progress, range, [
    "inset(0 100% 0 0)",
    "inset(0 0% 0 0)",
  ]);
  return (
    <motion.span
      aria-hidden="true"
      className="absolute inset-0"
      style={{ background: fill, clipPath }}
    />
  );
}

export default function HowSognosWorks() {
  const grid = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: grid,
    offset: ["start 80%", "end 45%"],
  });

  return (
    <section className="w-full bg-sognos-navy">
      <div
        className={`w-full rounded-t-3xl border-t border-sognos-line bg-sognos-tint md:rounded-t-[40px] ${LAYOUT.section}`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex max-w-3xl flex-col gap-4">
            <SectionLabel>How Sognos works</SectionLabel>
            <h2 className={`${TYPE.h2} text-sognos-heading`}>
              Healthcare First. Field Services Always. AI at the Centre.
            </h2>
          </div>

          <StatementFill
            text={STATEMENT}
            className="mt-10 max-w-5xl font-heading text-3xl font-normal leading-[1.2] tracking-[-0.015em] text-balance md:mt-14 md:text-[2.75rem]"
          />

          <div
            ref={grid}
            className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded border border-sognos-line bg-sognos-line md:mt-20 md:grid-cols-3"
          >
            {STEPS.map((s, k) => (
              <article
                key={s.n}
                className="relative isolate flex min-h-72 flex-col justify-between gap-12 bg-white p-7 lg:min-h-88 lg:p-10"
              >
                {still ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10"
                    style={{ background: s.fill }}
                  />
                ) : (
                  <span className="absolute inset-0 -z-10">
                    <Wipe
                      progress={scrollYProgress}
                      range={[k / STEPS.length, (k + 1) / STEPS.length]}
                      fill={s.fill}
                    />
                  </span>
                )}
                <div className="flex items-start justify-between gap-6">
                  <span className="text-sm text-sognos-muted">{s.label}</span>
                  <span
                    className="font-heading text-6xl leading-none tracking-[-0.03em] tabular-nums"
                    style={{ color: s.color }}
                  >
                    {s.n}
                  </span>
                </div>
                <div>
                  <h3 className={`${TYPE.h3Small} text-sognos-heading`}>
                    {s.title}
                  </h3>
                  <p
                    className={`mt-3 max-w-[34ch] ${TYPE.small} text-sognos-body`}
                  >
                    {s.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
