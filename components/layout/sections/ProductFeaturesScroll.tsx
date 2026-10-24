"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import PlaceholderBox from "@/components/ui/PlaceholderBox";
import SectionLabel from "@/components/ui/SectionLabel";
import { TYPE } from "@/components/layout/sections/sognoscare/typeScale";

export type ScrollFeature = {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  capabilities?: readonly string[];
  visual?: React.ReactNode;
};

interface Props {
  header: { heading: string; eyebrow?: string };
  features: ScrollFeature[];
  accentBorderClass: string;
  accentTextClass: string;
  enableVisuals?: boolean;
  noBg?: boolean;
  swapColumns?: boolean;
  /** `sectionBar` when the page hangs a ProductSubNav bar (46px) under the
   *  80px navbar — the rail, scroll-spy and jump offsets clear both. */
  stickyOffset?: "default" | "sectionBar";
  /** Optional control row under the heading (e.g. review-only switchers). */
  headerAside?: React.ReactNode;
  /** `cards` — approved card layout (docs/mockups/sognoscare/04-features.html):
   *  3-col rail, tint / tint-50 cards, tagline + h3 + ruled body | visual 6/6. */
  variant?: "default" | "cards";
  /** Tagline colour in the `cards` variant (needs ≥4.5:1 on tint). */
  taglineClass?: string;
}

// Rail sticky top, jump offset (px) and section anchor margin per offset mode.
const OFFSETS = {
  default: { rail: "top-[100px]", scroll: 96, anchor: "" },
  sectionBar: { rail: "top-36", scroll: 146, anchor: "scroll-mt-32" },
} as const;

export default function ProductFeaturesScroll({
  header,
  features,
  accentBorderClass,
  accentTextClass,
  enableVisuals = false,
  noBg = false,
  swapColumns = false,
  stickyOffset = "default",
  headerAside,
  variant = "default",
  taglineClass = "text-sognos-heading",
}: Props) {
  const offset = OFFSETS[stickyOffset];
  const [activeId, setActiveId] = useState(features[0]?.id ?? "");
  const refs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    function getDocTop(el: HTMLElement): number {
      let top = 0;
      let cur: HTMLElement | null = el;
      while (cur) {
        top += cur.offsetTop;
        cur = cur.offsetParent as HTMLElement | null;
      }
      return top;
    }

    let rafId = 0;

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const checkpoint = window.scrollY + offset.scroll + 44;
        let found = features[0]?.id ?? "";
        for (const feat of features) {
          const el = refs.current.get(feat.id);
          if (!el) continue;
          if (getDocTop(el) <= checkpoint) found = feat.id;
        }
        setActiveId(found);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function scrollToFeature(id: string) {
    const el = refs.current.get(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset.scroll;
    window.scrollTo({ top, behavior: "smooth" });
  }

  if (variant === "cards") {
    return (
      <section id="features" className={`w-full bg-white py-20 md:py-28 ${offset.anchor}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Sticky scroll-spy rail */}
            <nav aria-label="Feature navigation" className="hidden lg:col-span-3 lg:block">
              <div className={`sticky ${offset.rail}`}>
                <SectionLabel>{header.eyebrow ?? "Features"}</SectionLabel>
                <ul className="mt-6 space-y-1">
                  {features.map((feat) => {
                    const active = activeId === feat.id;
                    return (
                      <li key={feat.id}>
                        <button
                          type="button"
                          onClick={() => scrollToFeature(feat.id)}
                          aria-current={active ? "true" : undefined}
                          className={`group flex min-h-10 w-full items-center gap-2.5 py-2 text-left text-sm leading-normal font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-sognos-blue-accent ${
                            active ? accentTextClass : "text-sognos-muted hover:text-sognos-heading"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`size-2 shrink-0 rounded-full transition-colors ${
                              active ? "bg-current" : "bg-sognos-line group-hover:bg-sognos-muted"
                            }`}
                          />
                          {feat.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>

            <div className="min-w-0 lg:col-[4/-1]">
              <SectionLabel className="lg:hidden">{header.eyebrow ?? "Features"}</SectionLabel>
              <div className="mt-6 flex max-w-[770px] flex-col gap-4 lg:mt-0">
                <h2 className={`${TYPE.h2} text-sognos-heading`}>{header.heading}</h2>
                {/* Own wrapper: a server-passed element can't sit in a static
                    children array without tripping the dev key check. */}
                {headerAside && <div>{headerAside}</div>}
              </div>

              <div className="mt-10 space-y-4 md:mt-16 lg:space-y-6 xl:mt-20">
                {features.map((feat, i) => (
                  <article
                    key={feat.id}
                    id={feat.id}
                    ref={(el) => {
                      if (el) refs.current.set(feat.id, el);
                      else refs.current.delete(feat.id);
                    }}
                    className={`grid scroll-mt-36 grid-cols-1 gap-8 rounded-lg p-6 md:grid-cols-12 md:p-8 lg:p-10 ${
                      i % 2 === 0 ? "bg-sognos-tint" : "bg-sognos-tint/50"
                    }`}
                  >
                    <div className="flex flex-col justify-between gap-8 md:col-span-6">
                      <div className="flex flex-col gap-2">
                        {feat.tagline && (
                          <p className={`${TYPE.small} font-medium ${taglineClass}`}>{feat.tagline}</p>
                        )}
                        <h3 className={`${TYPE.h3} text-balance text-sognos-heading`}>{feat.name}</h3>
                      </div>
                      <p
                        className={`max-w-[46ch] border-l-2 ${accentBorderClass} pl-4 text-base leading-[1.65] text-pretty text-sognos-body`}
                      >
                        {feat.description}
                      </p>
                    </div>
                    <div className="md:col-span-6">
                      {feat.visual ?? (
                        <PlaceholderBox className="border-sognos-line bg-sognos-body/[0.03] text-sognos-muted" />
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="features" className={`w-full bg-white border-b border-gray-100 ${offset.anchor}`}>
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="flex gap-16 xl:gap-20 items-start">
          {/* Sticky scroll-spy rail */}
          <nav
            aria-label="Feature navigation"
            className={`hidden lg:block w-44 xl:w-54 shrink-0 sticky ${offset.rail} z-10`}
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.08em] text-sognos-muted">
              Features
            </p>
            <div className="space-y-0.5">
              {features.map((feat) => (
                <button
                  key={feat.id}
                  type="button"
                  onClick={() => scrollToFeature(feat.id)}
                  aria-selected={activeId === feat.id}
                  className="group flex items-center gap-x-2.5 py-2 text-left w-full"
                >
                  <span className="relative flex size-2 flex-none items-center justify-center">
                    {activeId === feat.id ? (
                      <motion.span
                        layoutId="feature-rail-bullet"
                        className={`absolute inset-0 rounded-full bg-current ${accentTextClass}`}
                        transition={{
                          type: "spring",
                          damping: 30,
                          stiffness: 300,
                        }}
                      />
                    ) : (
                      <span className="size-1.5 rounded-full bg-gray-300 tracking-tight transition-colors group-hover:bg-gray-400" />
                    )}
                  </span>
                  <span
                    className={`whitespace-nowrap text-sm font-medium transition-colors duration-300 ${
                      activeId === feat.id
                        ? accentTextClass
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  >
                    {feat.name}
                  </span>
                </button>
              ))}
            </div>
          </nav>

          {/* Right column: h2 + flowing cards */}
          <div className="flex-1 min-w-0">
            {/* Section header */}
            <div className="mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-medium text-sognos-body tracking-[-0.03em] max-w-2xl">
                {header.heading}
              </h2>
              {headerAside && <div className="mt-6">{headerAside}</div>}
            </div>

            <div className="space-y-8 lg:space-y-12">
              {features.map((feat, i) => (
                <div
                  key={feat.id}
                  ref={(el) => {
                    if (el) refs.current.set(feat.id, el);
                    else refs.current.delete(feat.id);
                  }}
                  className={`scroll-m-28 grid md:grid-cols-[minmax(0,360px)_1fr] items-stretch gap-8 md:gap-10 lg:gap-12 md:min-h-[380px] lg:min-h-[450px] rounded-lg p-5 py-8 md:p-8 lg:p-10 ${
                    noBg ? "" : i % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                  }`}
                >
                  {/* Text column — left by default, right when swapColumns */}
                  {!swapColumns && (
                    <div className="flex h-full flex-col justify-between gap-6">
                      <h3 className="font-heading text-2xl md:text-3xl font-medium text-sognos-body tracking-tight leading-snug">
                        {feat.name}
                      </h3>
                      <div
                        className={`border-l-2 ${accentBorderClass} pl-4 text-base leading-relaxed text-gray-600`}
                      >
                        {feat.description}
                      </div>
                    </div>
                  )}

                  {/* Visual column */}
                  {enableVisuals && feat.visual ? (
                    feat.visual
                  ) : (
                    <PlaceholderBox className="border-sognos-line bg-sognos-body/[0.03] text-sognos-muted" />
                  )}

                  {/* Text column — right when swapColumns */}
                  {swapColumns && (
                    <div className="flex flex-col gap-4">
                      <h3 className="font-heading text-2xl md:text-3xl font-medium text-sognos-body tracking-tight leading-snug">
                        {feat.name}
                      </h3>
                      <p className="text-base leading-relaxed text-gray-600">
                        {feat.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
