"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { LAYOUT, TYPE } from "@/components/layout/sections/sognoscare/typeScale";
import { PRODUCTS } from "@/lib/constants";
import { RouteOptimisation } from "@/components/layout/sections/sognosroster/FeatureVisuals";
import { Copilot } from "@/components/layout/sections/sognoscare/FeatureVisuals";
import type { VisualProps } from "@/components/ui/visuals/primitives";

// Works with — approved Frontline mockup option A: product cards, alternating
// layout, graphic 3, Paraform style (product photo under the product wash,
// frosted UI cards, status pill). Which products show follows the solution's
// worksWithRoster / worksWithCare flags. Graphic data is illustrative.

type ProductKey = "roster" | "care";

const STYLE: Record<
  ProductKey,
  { logo: string; photo: string; deep: string; mid: string; pill: string; Visual: (p: VisualProps) => ReactNode }
> = {
  roster: {
    logo: "/logos/sognos-roster-logo-color.svg",
    photo: "/product/RosterBg.avif",
    deep: "#104b90",
    mid: "#59bbf7",
    pill: "−38 min travel today",
    Visual: RouteOptimisation,
  },
  care: {
    logo: "/logos/sognos-care-logo-color.svg",
    photo: "/product/CareBg.avif",
    deep: "#0f1936",
    mid: "#3b6fe0",
    pill: "Copilot draft ready to sign",
    Visual: Copilot,
  },
};

function ParaformPanel({ product }: { product: ProductKey }) {
  const { photo, deep, mid, pill, Visual } = STYLE[product];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const still = !!useReducedMotion();
  return (
    <div
      ref={ref}
      aria-hidden="true"
      // Frosted UI: the visuals' white cards and hairlines turn translucent
      // over the photo.
      className="relative flex h-full min-h-[340px] w-full items-center justify-center overflow-hidden rounded px-5 pt-8 pb-18 sm:px-8 md:min-h-[400px] lg:px-10 [&_.bg-white]:bg-white/75 [&_.bg-white]:backdrop-blur-md [&_.border-sognos-line]:border-white/60"
      style={{
        background: `linear-gradient(160deg, color-mix(in srgb, ${deep} 55%, transparent), color-mix(in srgb, ${mid} 35%, transparent)), url(${photo}) center / cover`,
      }}
    >
      <div className="relative flex w-full justify-center">
        <Visual show={inView || still} still={still} />
      </div>
      <p className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/40 bg-sognos-care-dark/30 px-4 py-2 text-xs text-white backdrop-blur-md">
        <span className="size-1.5 rounded-full" style={{ background: mid }} />
        {pill}
      </p>
    </div>
  );
}

export default function SolutionWorksWith({ products }: { products: ProductKey[] }) {
  return (
    <section className={`bg-white ${LAYOUT.section}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={LAYOUT.rail}>
          <div className={LAYOUT.railLabel}>
            <SectionLabel sticky>Works with</SectionLabel>
          </div>
          <div className={LAYOUT.content}>
            <div className={LAYOUT.head}>
              <h2 className={`${TYPE.h2} text-sognos-heading`}>Connects to the Sognos platform</h2>
            </div>
            <div className={`${LAYOUT.gap} space-y-3 lg:space-y-4`}>
              {products.map((key, i) => {
                const product = PRODUCTS[key];
                return (
                  <div
                    key={key}
                    className="grid grid-cols-1 items-stretch gap-3 rounded-lg bg-sognos-tint p-3 md:grid-cols-2 lg:gap-4"
                  >
                    <div className="flex flex-col justify-between gap-10 p-5 lg:p-8">
                      <Image
                        src={STYLE[key].logo}
                        alt={product.name}
                        width={180}
                        height={32}
                        className="h-8 w-auto self-start"
                      />
                      <div>
                        <span
                          aria-hidden="true"
                          className="mb-5 block h-1 w-10 rounded-full"
                          style={{ background: STYLE[key].mid }}
                        />
                        <h3 className={`${TYPE.h3} text-sognos-heading`}>{product.tagline}</h3>
                        <Link
                          href={product.href}
                          className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-base font-medium text-sognos-heading transition-colors hover:text-sognos-blue-accent focus-visible:outline-2 focus-visible:outline-sognos-blue-accent"
                        >
                          Explore {product.name} <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                    {/* Alternating: the graphic leads on every second card. */}
                    <div className={i % 2 === 1 ? "md:order-first" : undefined}>
                      <ParaformPanel product={key} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
