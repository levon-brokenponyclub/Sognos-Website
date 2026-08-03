"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import PlaceholderBox from "@/components/ui/PlaceholderBox";

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
}

export default function ProductFeaturesScroll({
  header,
  features,
  accentBorderClass,
  accentTextClass,
  enableVisuals = false,
  noBg = false,
  swapColumns = false,
}: Props) {
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
        const checkpoint = window.scrollY + 140;
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
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <section id="features" className="w-full bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="flex gap-16 xl:gap-20 items-start">
          {/* Sticky scroll-spy rail */}
          <nav
            aria-label="Feature navigation"
            className="hidden lg:block w-44 xl:w-54 shrink-0 sticky top-[100px] z-10"
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
