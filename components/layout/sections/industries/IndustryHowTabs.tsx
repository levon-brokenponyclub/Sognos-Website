"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  LAYOUT,
  TYPE,
} from "@/components/layout/sections/sognoscare/typeScale";
import {
  Compliance,
  Reporting,
} from "@/components/layout/sections/sognoscare/FeatureVisuals";
import { SkillsMatching } from "@/components/layout/sections/sognosroster/FeatureVisuals";
import type { VisualProps } from "@/components/ui/visuals/primitives";

// How Sognos helps — Industries Inspector option A "Tabs" on the brand tint
// (2026-11-02): header, then a vertical tab list (5) that runs the full
// height of a graphic panel (7) on #edf6ff. The active tab shows its copy and a progress bar, then hands
// on to the next (paused on hover / keyboard focus; static under reduced
// motion).
// Arrow keys move between tabs. Graphics are the product visuals, cycled by
// tab (illustrative).

type HelpItem = { title: string; body: string };

const GRAPHICS: ((p: VisualProps) => ReactNode)[] = [
  Compliance,
  SkillsMatching,
  Reporting,
];

function GraphicPanel({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const still = !!useReducedMotion();
  const Visual = GRAPHICS[index % GRAPHICS.length];
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="flex h-full min-h-[400px] items-center justify-center rounded-lg bg-[#edf6ff] px-5 py-8 sm:p-8 lg:min-h-[480px] lg:p-10"
    >
      <Visual show={inView || still} still={still} />
    </div>
  );
}

export default function IndustryHowTabs({
  items,
  industryName,
  description,
}: {
  items: readonly HelpItem[];
  industryName: string;
  description: string;
}) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const step = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + items.length) % items.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className={`bg-sognos-tint ${LAYOUT.section}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={LAYOUT.head}>
          <SectionLabel>How Sognos helps</SectionLabel>
          <h2 className={`${TYPE.h2} text-sognos-heading`}>
            Purpose-built for {industryName}
          </h2>
          <p className={`${TYPE.lede} text-sognos-body`}>{description}</p>
        </div>
        {/* Tabs share the panel's height: each tab grows (flex-1) so the
                list runs top to bottom beside the graphic. */}
        <div
          className={`group/how ${LAYOUT.gap} grid grid-cols-1 gap-3 lg:grid-cols-12 lg:items-stretch lg:gap-4`}
        >
          <div
            role="tablist"
            aria-label="How Sognos helps"
            aria-orientation="vertical"
            className="flex flex-col gap-3 lg:col-span-5"
          >
            {items.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  key={item.title}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`how-tab-${i}`}
                  aria-controls="how-panel"
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className="flex flex-col justify-center rounded-lg border border-sognos-line bg-white p-5 text-left transition-colors hover:border-sognos-heading/40 focus-visible:outline-2 focus-visible:outline-sognos-blue-accent aria-selected:border-sognos-heading lg:flex-1 lg:p-6"
                >
                  <span className="flex items-baseline gap-4">
                    <span
                      className={`font-heading text-sm tabular-nums ${
                        selected
                          ? "text-sognos-blue-accent"
                          : "text-sognos-muted"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`${TYPE.h3Small} text-sognos-heading`}>
                      {item.title}
                    </span>
                  </span>
                  {selected && (
                    <>
                      <span
                        className={`mt-2 block pl-9 ${TYPE.small} text-sognos-body`}
                      >
                        {item.body}
                      </span>
                      <span
                        aria-hidden="true"
                        className="mt-4 ml-9 block h-0.5 overflow-hidden rounded-full bg-sognos-line"
                      >
                        <span
                          key={active}
                          onAnimationEnd={() =>
                            setActive((n) => (n + 1) % items.length)
                          }
                          className="block h-full w-0 animate-[sognos-story-progress_6s_linear_forwards] bg-sognos-blue-accent group-hover/how:[animation-play-state:paused] group-has-[:focus-visible]/how:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none"
                        />
                      </span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
          <div
            role="tabpanel"
            id="how-panel"
            aria-labelledby={`how-tab-${active}`}
            className="lg:col-span-7"
          >
            <GraphicPanel key={active} index={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
