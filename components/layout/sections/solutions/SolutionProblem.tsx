"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  LAYOUT,
  TYPE,
} from "@/components/layout/sections/sognoscare/typeScale";

// The problem — Solutions Inspector option B "Sticky rail" (2026-11-02): the
// header holds in a sticky column (5) beside numbered pain-point rows (7) on
// navy. Each row rises in; its chip flips from "Issue today" to
// "✓ {solution} fixes" (accent, white text) a beat later. Static under
// reduced motion.

type PainPoint = { title: string; body: string };

function ProblemRow({
  index,
  point,
  name,
}: {
  index: number;
  point: PainPoint;
  name: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  // Long names ("Customer Relationship Management") would squeeze the copy:
  // their chip drops under it instead of taking the third column.
  const stackChip = name.length > 16;

  return (
    <li
      ref={ref}
      className={`grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-white/15 py-10 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] last:border-b motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        stackChip ? "sm:grid-cols-[4rem_1fr]" : "sm:grid-cols-[4rem_1fr_auto]"
      } ${
        inView ? "translate-y-0 opacity-100" : "translate-y-[18px] opacity-0"
      }`}
    >
      <span
        aria-hidden="true"
        className="font-heading text-5xl font-light tabular-nums text-white/25"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 className={`${TYPE.h3} text-white`}>{point.title}</h3>
        <p className={`mt-3 max-w-[46ch] ${TYPE.body} text-white/75`}>
          {point.body}
        </p>
      </div>
      {/* Chip: "Issue today" → "✓ {name} fixes" once the row is in view. */}
      <span
        className={`relative col-start-2 inline-grid h-8 self-start justify-self-start text-xs font-medium whitespace-nowrap ${
          stackChip ? "" : "sm:col-start-3"
        }`}
      >
        <span
          aria-hidden={inView}
          className={`col-start-1 row-start-1 flex items-center justify-center gap-1.5 rounded-full border border-[#ff8e90]/50 px-4 text-[#ff8e90] transition-[opacity,transform] delay-[1400ms] duration-500 motion-reduce:hidden ${
            inView ? "-translate-y-1.5 opacity-0" : "opacity-100"
          }`}
        >
          <span className="size-1.5 rounded-full bg-[#ff8e90]" />
          Issue today
        </span>
        <span
          className={`col-start-1 row-start-1 flex items-center justify-center gap-1.5 rounded-full bg-sognos-blue-accent px-4 text-white transition-[opacity,transform] delay-[1400ms] duration-500 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
            inView ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
          }`}
        >
          &#10003; {name} fixes
        </span>
      </span>
    </li>
  );
}

export default function SolutionProblem({
  name,
  intro,
  painPoints,
}: {
  name: string;
  intro: string;
  painPoints: readonly PainPoint[];
}) {
  return (
    <section className={`bg-sognos-navy ${LAYOUT.section}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-4 lg:sticky lg:top-36">
              <SectionLabel tone="dark">The problem</SectionLabel>
              <h2 className={`${TYPE.h2} text-white`}>What {name} solves</h2>
              <p className={`${TYPE.lede} text-white/75`}>{intro}</p>
            </div>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {painPoints.map((point, i) => (
              <ProblemRow key={point.title} index={i} point={point} name={name} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
