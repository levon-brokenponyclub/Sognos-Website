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

// Works with — Solutions Inspector option A on the brand tint (2026-11-02):
// white product cards in a 3-column grid (1–2 products sit left at a third of
// the width each). The panel carries the white product logo over the
// graphic (graphic 3, Paraform style: product photo under the product wash,
// frosted UI cards); the accent bar, tagline and link sit below. Which
// products show follows the solution's worksWithRoster / worksWithCare flags.
// Graphic data is illustrative.

type ProductKey = "roster" | "care";

const STYLE: Record<
  ProductKey,
  { logo: string; photo: string; deep: string; mid: string; Visual: (p: VisualProps) => ReactNode }
> = {
  roster: {
    logo: "/logos/sognos-roster-logo-color.svg",
    photo: "/product/RosterBg.avif",
    deep: "#104b90",
    mid: "#59bbf7",
    Visual: RouteOptimisation,
  },
  care: {
    logo: "/logos/sognos-care-logo-color.svg",
    photo: "/product/CareBg.avif",
    deep: "#0f1936",
    mid: "#3b6fe0",
    Visual: Copilot,
  },
};

function ParaformPanel({ product, name }: { product: ProductKey; name: string }) {
  const { logo, photo, deep, mid, Visual } = STYLE[product];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const still = !!useReducedMotion();
  return (
    <div
      ref={ref}
      // Frosted UI: the visuals' white cards and hairlines turn translucent
      // over the photo.
      className="relative flex w-full flex-col items-center gap-6 overflow-hidden rounded px-5 pt-7 pb-8 [&_.bg-white]:bg-white/75 [&_.bg-white]:backdrop-blur-md [&_.border-sognos-line]:border-white/60"
      style={{
        background: `linear-gradient(160deg, color-mix(in srgb, ${deep} 55%, transparent), color-mix(in srgb, ${mid} 35%, transparent)), url(${photo}) center / cover`,
      }}
    >
      <Image
        src={logo}
        alt={name}
        width={180}
        height={32}
        className="h-8 w-auto brightness-0 invert"
      />
      <div aria-hidden="true" className="relative flex w-full justify-center">
        <Visual show={inView || still} still={still} />
      </div>
    </div>
  );
}

export default function SolutionWorksWith({ products }: { products: ProductKey[] }) {
  return (
    <section className={`bg-sognos-tint ${LAYOUT.section}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={LAYOUT.rail}>
          <div className={LAYOUT.railLabel}>
            <SectionLabel sticky>Works with</SectionLabel>
          </div>
          <div className={LAYOUT.content}>
            <div className={LAYOUT.head}>
              <h2 className={`${TYPE.h2} text-sognos-heading`}>Connects to the Sognos platform</h2>
            </div>
            <div className={`${LAYOUT.gap} grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4`}>
              {products.map((key) => {
                const product = PRODUCTS[key];
                return (
                  <div
                    key={key}
                    className="flex flex-col gap-6 rounded-lg border border-white bg-white p-3"
                  >
                    <ParaformPanel product={key} name={product.name} />
                    <div className="flex flex-1 flex-col px-3 pb-4">
                      <span
                        aria-hidden="true"
                        className="mb-5 block h-1 w-10 rounded-full"
                        style={{ background: STYLE[key].mid }}
                      />
                      <h3 className="font-heading text-xl font-normal leading-snug tracking-[-0.005em] text-sognos-heading text-balance">
                        {product.tagline}
                      </h3>
                      <Link
                        href={product.href}
                        className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start pt-6 text-base font-medium text-sognos-heading transition-colors hover:text-sognos-blue-accent focus-visible:outline-2 focus-visible:outline-sognos-blue-accent"
                      >
                        Explore {product.name} <span aria-hidden="true">&rarr;</span>
                      </Link>
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
