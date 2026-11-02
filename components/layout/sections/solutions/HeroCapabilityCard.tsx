"use client";

import { useState } from "react";

// Solutions Hero A floating card (Inspector mockup FH_CARD): the first four
// capabilities as an index. The active row expands its status line and fills
// a progress bar, then hands on to the next (paused on hover; static under
// reduced motion).

export default function HeroCapabilityCard({
  name,
  heading,
  items,
}: {
  name: string;
  heading: string;
  items: readonly { title: string; status: string }[];
}) {
  const [on, setOn] = useState(0);

  return (
    <div
      aria-hidden="true"
      className="group/fh absolute inset-x-4 bottom-4 rounded border border-sognos-line bg-white p-4 sm:inset-x-auto sm:left-5 sm:w-[22rem] lg:bottom-5 lg:p-5"
    >
      <p className="text-xs text-sognos-muted">{name}</p>
      <p className="mt-1 font-heading text-lg text-sognos-heading">{heading}</p>
      <ol className="mt-3">
        {items.map((item, i) => {
          const active = i === on;
          return (
            <li key={item.title} className="border-t border-sognos-line pt-2 pb-1.5">
              <div className="grid grid-cols-[1.75rem_1fr_auto] items-baseline gap-2">
                <span className="text-xs tabular-nums text-sognos-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-sm transition-colors duration-300 motion-reduce:transition-none ${
                    active ? "text-sognos-heading" : "text-sognos-muted"
                  }`}
                >
                  {item.title}
                </span>
                <span
                  className={`text-sm text-sognos-blue-accent transition-opacity duration-300 motion-reduce:transition-none ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                >
                  &rarr;
                </span>
              </div>
              <div
                className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
                  active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pt-1 pl-[2.25rem] text-xs text-sognos-muted">{item.status}</p>
                </div>
              </div>
              <span className={`mt-2 block h-0.5 overflow-hidden ${active ? "bg-sognos-line" : ""}`}>
                {active && (
                  <span
                    key={on}
                    onAnimationEnd={() => setOn((n) => (n + 1) % items.length)}
                    className="block h-full w-0 animate-[sognos-story-progress_2.8s_linear_forwards] bg-sognos-blue-accent group-hover/fh:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none"
                  />
                )}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
