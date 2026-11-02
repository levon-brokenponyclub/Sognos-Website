"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { LAYOUT, TYPE } from "@/components/layout/sections/sognoscare/typeScale";
import {
  ALL_STORIES,
  type CaseStudy,
} from "@/components/layout/sections/ProductCustomerStories";
import type { ProductKey } from "@/components/layout/sections/product/theme";

// Products Inspector · Stories / CTA D "Story stage" (docs/mockups/products):
// photo stage + oversized quote, driven by a tabbed customer index whose
// progress bars auto-advance (paused on hover / focus, static under reduced
// motion). Surfaces follow the SognosCare colour set, shared by all products.

// Literal class names per product so Tailwind can see them.
const THEME: Record<ProductKey, { soft: string; base: string; bar: string; deep: string }> = {
  care: { soft: "bg-sognos-care-soft", base: "text-sognos-care-base", bar: "bg-sognos-care-base", deep: "bg-sognos-care-deep" },
  roster: { soft: "bg-sognos-roster-soft", base: "text-sognos-roster-base", bar: "bg-sognos-roster-base", deep: "bg-sognos-roster-deep" },
  genogram: { soft: "bg-sognos-genogram-soft", base: "text-sognos-genogram-base", bar: "bg-sognos-genogram-base", deep: "bg-sognos-genogram-deep" },
};

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sognos-blue-accent";
const STEP_BTN = `flex size-11 items-center justify-center rounded-full border border-sognos-line-strong bg-white text-sognos-navy-darkest transition-colors hover:border-sognos-heading ${FOCUS}`;

const pad = (n: number) => String(n).padStart(2, "0");

interface ProductStoryStageProps {
  product: ProductKey;
  stories?: CaseStudy[] | null;
  eyebrow?: string;
  heading?: string;
}

export default function ProductStoryStage({
  product,
  stories,
  eyebrow = "Customer Stories",
  heading = "Proof from the people who run it",
}: ProductStoryStageProps) {
  const items = stories && stories.length > 0 ? stories : ALL_STORIES;
  const n = items.length;
  const [cur, setCur] = useState(0);
  const go = (i: number) => setCur((i + n) % n);
  const t = THEME[product];

  return (
    <section
      id="stories"
      className={`bg-sognos-tint ${LAYOUT.section} ${LAYOUT.anchor}`}
    >
      <div className="group/stage mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-3xl flex-col gap-4">
            <SectionLabel>{eyebrow}</SectionLabel>
            <h2 className={`${TYPE.h2} text-sognos-heading`}>{heading}</h2>
          </div>
          <div className="flex items-center gap-3">
            <p className="mr-1 text-sm tabular-nums text-sognos-muted">
              {pad(cur + 1)} / {pad(n)}
            </p>
            <button type="button" aria-label="Previous story" onClick={() => go(cur - 1)} className={STEP_BTN}>
              <span aria-hidden="true">&larr;</span>
            </button>
            <button type="button" aria-label="Next story" onClick={() => go(cur + 1)} className={STEP_BTN}>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-4">
          {/* Photo stage — slides crossfade. */}
          <div className={`relative min-h-[340px] overflow-hidden rounded sm:min-h-[420px] lg:col-span-7 lg:min-h-[560px] ${t.deep}`}>
            {items.map((s, i) => (
              <div
                key={s.company}
                aria-hidden={i !== cur}
                className={`absolute inset-0 transition-opacity duration-600 motion-reduce:transition-none ${
                  i === cur ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={s.panelImage}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 35%, color-mix(in srgb, var(--sognos-${product}-deep) 85%, transparent))`,
                  }}
                />
                <div className="absolute inset-x-6 bottom-6 flex flex-col items-start gap-4 lg:inset-x-10 lg:bottom-10">
                  <Image
                    src={s.logo}
                    alt=""
                    width={160}
                    height={32}
                    className="h-8 w-auto brightness-0 invert"
                  />
                  <p className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80">
                    {s.industry}
                  </p>
                  <p className="font-heading text-3xl leading-tight text-white md:text-4xl">
                    {s.company}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quote panel — quotes share one grid cell and crossfade. */}
          <div className={`flex flex-col rounded p-6 md:p-8 lg:col-span-5 lg:p-10 ${t.soft}`}>
            <span aria-hidden="true" className={`block font-heading text-7xl leading-[.6] ${t.base}`}>
              &ldquo;
            </span>
            <div className="mt-8 grid flex-1" aria-live="polite">
              {items.map((s, i) => (
                <figure
                  key={s.company}
                  aria-hidden={i !== cur}
                  className={`col-start-1 row-start-1 flex flex-col justify-between gap-10 transition-opacity duration-400 motion-reduce:transition-none ${
                    i === cur ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                >
                  <blockquote className="font-heading text-xl leading-snug text-sognos-heading text-pretty md:text-2xl">
                    {s.quote}
                  </blockquote>
                  <figcaption className="flex flex-wrap items-end justify-between gap-4 border-t border-sognos-line-strong pt-5">
                    <span className="text-sm">
                      <span className="text-sognos-heading">{s.author}</span>
                      <br />
                      <span className="text-sognos-muted">{s.role}</span>
                    </span>
                    <Link
                      href={s.href}
                      tabIndex={i === cur ? undefined : -1}
                      className={`inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-sognos-heading transition-opacity hover:opacity-80 ${FOCUS}`}
                    >
                      Read the story <span aria-hidden="true">&#8599;</span>
                    </Link>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>

        {/* Customer index — the active tab's bar fills, then advances. */}
        <div
          role="tablist"
          aria-label="Customer stories"
          className="mt-3 grid gap-3 lg:mt-4 lg:gap-4"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        >
          {items.map((s, i) => (
            <button
              key={s.company}
              type="button"
              role="tab"
              aria-selected={i === cur}
              onClick={() => go(i)}
              className={`flex min-h-11 flex-col gap-4 rounded border border-sognos-line-strong bg-white p-4 text-left text-sognos-navy-darkest transition-colors hover:border-sognos-heading aria-selected:border-sognos-heading lg:p-5 ${FOCUS}`}
            >
              <span className="flex items-center justify-between gap-3">
                <Image
                  src={s.logo}
                  alt={s.company}
                  width={120}
                  height={24}
                  className="h-6 w-auto max-w-[60%] object-contain object-left"
                />
                <span className="text-xs tabular-nums text-sognos-muted max-sm:hidden">
                  {pad(i + 1)}
                </span>
              </span>
              <span className="hidden text-sm text-sognos-heading sm:block">
                {s.company}
              </span>
              <span aria-hidden="true" className="block h-0.5 w-full overflow-hidden bg-sognos-line">
                {i === cur && (
                  <span
                    key={cur}
                    onAnimationEnd={() => go(cur + 1)}
                    className={`block h-full w-0 animate-[sognos-story-progress_7s_linear_forwards] group-hover/stage:[animation-play-state:paused] group-focus-within/stage:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none ${t.bar}`}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
