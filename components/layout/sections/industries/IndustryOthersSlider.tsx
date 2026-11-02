"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  LAYOUT,
  TYPE,
} from "@/components/layout/sections/sognoscare/typeScale";
import { INDUSTRIES } from "@/lib/constants";
import IndustryCard from "@/components/layout/sections/industries/IndustryCard";

// Industries photo slider — Industries Inspector option D "Slider" (industry
// pages, on the accent) and Home option G "Photo slider" (on the brand tint),
// 2026-11-02: label, heading and short description with arrow buttons, then
// a snap track of white cards, each with the industry's hero photo (wash + hairline frame),
// a sector rule, name, description and Explore. The mockup's per-card stat
// is illustrative and left out until there is real data.


const DESCRIPTION =
  "Sectors where coordinating people, compliance and service delivery is the whole operational problem.";

export default function IndustryOthersSlider({
  excludeSlug,
  tone = "accent",
  heading = "Explore other industries",
}: {
  /** Industry pages leave out their own industry. */
  excludeSlug?: string;
  tone?: "accent" | "tint";
  heading?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const items = INDUSTRIES.filter((ind) => ind.slug !== excludeSlug);
  const accent = tone === "accent";

  const scrollBy = (dir: number) => {
    const el = track.current;
    const card = el?.firstElementChild;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({
      left: (card.getBoundingClientRect().width + gap) * dir,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <section
      className={`overflow-clip ${accent ? "bg-sognos-blue-accent" : "bg-sognos-tint"} ${LAYOUT.section}`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div className={LAYOUT.head}>
            {accent ? (
              <SectionLabel
                tone="dark"
                markerClassName="bg-white"
                className="text-white"
              >
                Industries
              </SectionLabel>
            ) : (
              <SectionLabel>Industries</SectionLabel>
            )}
            <h2
              className={
                accent
                  ? "font-heading text-3xl font-normal leading-[1.1] tracking-[-0.02em] text-balance text-white md:text-5xl"
                  : `${TYPE.h2} text-sognos-heading`
              }
            >
              {heading}
            </h2>
            <p
              className={`${TYPE.lede} ${accent ? "text-white" : "text-sognos-body"}`}
            >
              {DESCRIPTION}
            </p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            {[-1, 1].map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => scrollBy(dir)}
                aria-label={dir < 0 ? "Previous industry" : "Next industry"}
                className={`flex size-11 items-center justify-center rounded-full border bg-white text-sognos-heading transition-colors hover:bg-sognos-heading hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  accent
                    ? "border-white focus-visible:outline-white"
                    : "border-sognos-line focus-visible:outline-sognos-blue-accent"
                }`}
              >
                <span aria-hidden="true">{dir < 0 ? "←" : "→"}</span>
              </button>
            ))}
          </div>
        </div>
        <div
          ref={track}
          className={`${LAYOUT.gap} -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:gap-4 [&::-webkit-scrollbar]:hidden`}
        >
          {items.map((ind) => (
            <IndustryCard
              key={ind.slug}
              industry={ind}
              sizes="420px"
              mediaClassName="h-60"
              className={`w-[85%] shrink-0 snap-start sm:w-[420px] ${accent ? "focus-visible:outline-white" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
