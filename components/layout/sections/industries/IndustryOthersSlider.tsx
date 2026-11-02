"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  LAYOUT,
  TYPE,
} from "@/components/layout/sections/sognoscare/typeScale";
import { INDUSTRIES } from "@/lib/constants";

// Other industries — Industries Inspector option D "Slider" on the accent
// (2026-11-02): label, statement heading and short description with arrow
// buttons, then a snap track of
// white cards, each with the industry's hero photo (wash + hairline frame),
// a sector rule, name, description and Explore. The mockup's per-card stat
// is illustrative and left out until there is real data.

// Sector rule colours (mockup); Health & Social Care takes the brand accent.
const SECTOR_RULE: Record<string, string> = {
  "health-social-care": "#1d96fc",
  "facilities-management": "#58b368",
  "local-government": "#b9b26a",
  "industrial-services": "#6a9fb5",
  "energy-utilities": "#8fae5a",
};

export default function IndustryOthersSlider({
  excludeSlug,
}: {
  excludeSlug: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const items = INDUSTRIES.filter((ind) => ind.slug !== excludeSlug);

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
      className={`overflow-clip bg-sognos-blue-accent ${LAYOUT.section}`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div className={LAYOUT.head}>
            <SectionLabel
              tone="dark"
              markerClassName="bg-white"
              className="text-white"
            >
              Industries
            </SectionLabel>
            <h2 className="font-heading text-3xl font-normal leading-[1.1] tracking-[-0.02em] text-balance text-white md:text-5xl">
              Explore other industries
            </h2>
            <p className={`${TYPE.lede} text-white`}>
              Sectors where coordinating people, compliance and service delivery
              is the whole operational problem.
            </p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            {[-1, 1].map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => scrollBy(dir)}
                aria-label={dir < 0 ? "Previous industry" : "Next industry"}
                className="flex size-11 items-center justify-center rounded-full border border-white bg-white text-sognos-heading transition-colors hover:bg-sognos-heading hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
            <Link
              key={ind.slug}
              href={ind.href}
              className="group flex w-[85%] shrink-0 snap-start flex-col gap-5 rounded-lg bg-white p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-[420px]"
            >
              <div className="relative h-60 overflow-hidden rounded">
                <Image
                  src={ind.image}
                  alt=""
                  fill
                  sizes="420px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-sognos-care-dark/40 via-transparent to-sognos-care-dark/30"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-[6%] rounded border border-white/60"
                />
              </div>
              <div className="flex flex-1 flex-col px-3 pb-3">
                <span
                  aria-hidden="true"
                  className="mb-3 h-1 w-10 rounded-full"
                  style={{ background: SECTOR_RULE[ind.slug] ?? "#1d96fc" }}
                />
                <h3 className={`${TYPE.h3Small} text-sognos-heading`}>
                  {ind.name}
                </h3>
                <p
                  className={`mt-2 line-clamp-3 ${TYPE.small} text-sognos-body`}
                >
                  {ind.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-sognos-heading group-hover:text-sognos-blue-accent">
                  Explore
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    &rarr;
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
