"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Metric row after middesk.com/solutions/use-cases/lending. Each stat is its
// own ruled column with a notch sitting on the rule, and the number rolls up
// through a stack of interpolated values rather than counting numerically —
// the digits slide, which is what gives the reference its character. Replaces
// a rAF count-up between border-r dividers.

const STATS = [
  { value: 2016, suffix: "", label: "Founded" },
  { value: 10, suffix: "+", label: "Years" },
  { value: 3, suffix: "", label: "Countries served" },
] as const;

// Rows in the roll. The reference uses 30; fewer reads as a jump, many more
// costs DOM for frames nobody sees at this duration.
const STEPS = 30;

// The stack the metric scrolls through. A year starts near its own value
// rather than at zero, or the roll spends its whole length in the 0–1900s.
// The last entry is the exact target, so the resting frame is always right
// even where the interpolation would otherwise round.
function rollValues(value: number, suffix: string): string[] {
  const from = value > 100 ? Math.floor(value * 0.97) : 0;
  return Array.from({ length: STEPS }, (_, i) => {
    const n =
      i === STEPS - 1
        ? value
        : Math.round(from + (value - from) * (i / (STEPS - 1)));
    return `${n}${suffix}`;
  });
}

function RollingStat({
  value,
  suffix,
  label,
  trigger,
}: {
  value: number;
  suffix: string;
  label: string;
  trigger: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  // Reduced motion renders the target alone — no stack to travel through, so
  // there is nothing to animate and nothing to land wrong.
  const rows = prefersReducedMotion
    ? [`${value}${suffix}`]
    : rollValues(value, suffix);
  // Land on the last row. The percentage is of the stack's own height, hence
  // (n-1)/n rather than 100%.
  const offset =
    prefersReducedMotion || trigger
      ? ((rows.length - 1) / rows.length) * 100
      : 0;

  return (
    <div className="relative flex grow flex-col border-t border-sognos-line">
      {/* The visible metric is a scrolling list of numbers, so it is hidden
          from assistive tech and the real value is announced once, here. */}
      <span className="sr-only">{`${value}${suffix}, ${label}`}</span>

      <div aria-hidden="true">
        {/* Notch riding on the rule — offset by its own 8px height so it sits
            on top of the border rather than across it. */}
        <svg
          width="72"
          height="8"
          viewBox="0 0 72 8"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -top-2 left-0 fill-sognos-line"
        >
          <path d="M72 8L65.3171 2.03269C63.851 0.723577 61.9543 0 59.9888 0H2C0.895431 0 0 0.895431 0 2V8H72Z" />
        </svg>

        <div className="pt-6">
          <div className="flex flex-col gap-1">
            {/* One row tall with the overflow clipped — the stack inside is
                what moves. */}
            <div
              className="h-[1.2em] overflow-hidden font-heading text-7xl font-medium tracking-tight text-sognos-heading lg:text-7xl"
              style={{ lineHeight: 1.2 }}
            >
              <div
                className="will-change-transform"
                style={{
                  transform: `translateY(-${offset}%)`,
                  transition: prefersReducedMotion
                    ? undefined
                    : "transform 1100ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {rows.map((row, i) => (
                  <div key={i} className="flex h-[1.2em] shrink-0 items-center">
                    {row}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-lg leading-relaxed text-sognos-body">
              {label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setTriggered(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mt-16 flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-3 lg:gap-4"
    >
      {STATS.map(({ value, suffix, label }) => (
        <RollingStat
          key={label}
          value={value}
          suffix={suffix}
          label={label}
          trigger={triggered}
        />
      ))}
    </div>
  );
}
