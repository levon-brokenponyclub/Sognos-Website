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
import { RelatedGraphic } from "@/components/layout/sections/solutions/FrontlineVisuals";

// Related solutions — approved Frontline mockup option C: slider with arrow
// buttons, no rail (eyebrow stacked above the heading). Lists every other
// solution, the page's own related picks first. Panels use the related solution's mini graphic when one exists,
// otherwise its hero image.

export type RelatedItem = {
  slug: string;
  name: string;
  body: string;
  image: string;
  hasGraphic: boolean;
};

const BARS = ["#1d96fc", "#3b6fe0", "#59bbf7"];

export default function SolutionRelated({ items }: { items: RelatedItem[] }) {
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

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
    <section className={`bg-sognos-tint ${LAYOUT.section}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div className={LAYOUT.head}>
            <SectionLabel>Solutions</SectionLabel>
            <h2 className={`${TYPE.h2} text-sognos-heading`}>
              Extend your operation further
            </h2>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            {[-1, 1].map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => scrollBy(dir)}
                aria-label={dir < 0 ? "Previous" : "Next"}
                className="flex size-11 items-center justify-center rounded-full border border-sognos-line bg-white text-sognos-heading transition-colors hover:border-sognos-heading focus-visible:outline-2 focus-visible:outline-sognos-blue-accent"
              >
                <span aria-hidden="true">{dir < 0 ? "←" : "→"}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Contained track: from lg, three cards plus a quarter of the fourth
            fill the content width (3 gaps + 3.25 cards). */}
        <div
          ref={track}
          className={`${LAYOUT.gap} flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 scrollbar-hide lg:gap-4`}
        >
          {items.map((item, k) => (
            <Link
              key={item.slug}
              href={`/solutions/${item.slug}`}
              className="group flex w-[85%] shrink-0 snap-start flex-col gap-5 rounded-lg bg-white p-3 transition-colors focus-visible:outline-2 focus-visible:outline-sognos-blue-accent sm:w-[420px] lg:w-[calc((min(100vw,80rem)-6rem)/3.25)]"
            >
              {item.hasGraphic ? (
                <RelatedGraphic slug={item.slug} className="h-56" />
              ) : (
                <div className="relative h-56 overflow-hidden rounded bg-sognos-tint">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="420px"
                    className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col px-3 pb-3">
                <span
                  aria-hidden="true"
                  className="mb-3 h-1 w-10 rounded-full"
                  style={{ background: BARS[k % BARS.length] }}
                />
                <h3 className={`${TYPE.h3Small} text-sognos-heading`}>
                  {item.name}
                </h3>
                <p
                  className={`mt-2 line-clamp-3 ${TYPE.small} text-sognos-body`}
                >
                  {item.body}
                </p>
                <div className="mt-auto pt-6">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-sognos-heading group-hover:text-sognos-blue-accent">
                    Explore{" "}
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      &rarr;
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
