"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView, useReducedMotion } from "framer-motion";
import { PRODUCTS } from "@/lib/constants";
import { RouteOptimisation } from "@/components/layout/sections/sognosroster/FeatureVisuals";
import { Copilot } from "@/components/layout/sections/sognoscare/FeatureVisuals";
import { Snapshots } from "@/components/layout/sections/sognosgenogram/FeatureVisuals";
import type { VisualProps } from "@/components/ui/visuals/primitives";

// Product card from the Inspector "Works with" option A (Solutions, reused by
// the Industries Platform section): white card, a fixed 290px Paraform panel
// (product photo under the product wash, frosted UI cards) with the white
// product logo over the graphic, then the accent bar, tagline and link.
// Taller graphics crop at the panel foot. `tone="dark"` puts the card on
// white/5 for navy sections. Graphic data is illustrative.

export type WorksProduct = "roster" | "care" | "genogram";

const STYLE: Record<
  WorksProduct,
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
  genogram: {
    logo: "/logos/sognos-genogram-logo-color.svg",
    photo: "/product/GenoBg.avif",
    deep: "#3a0f45",
    mid: "#91278c",
    Visual: Snapshots,
  },
};

function ParaformPanel({ product, name }: { product: WorksProduct; name: string }) {
  const { logo, photo, deep, mid, Visual } = STYLE[product];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const still = !!useReducedMotion();
  return (
    <div
      ref={ref}
      // Frosted UI: the visuals' white cards and hairlines turn translucent
      // over the photo.
      className="relative flex h-[290px] w-full shrink-0 flex-col items-center gap-6 overflow-hidden rounded px-5 pt-7 [&_.bg-white]:bg-white/75 [&_.bg-white]:backdrop-blur-md [&_.border-sognos-line]:border-white/60"
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

export default function ProductWorksCard({
  product,
  tone = "light",
}: {
  product: WorksProduct;
  tone?: "light" | "dark";
}) {
  const p = PRODUCTS[product];
  const dark = tone === "dark";
  return (
    <div
      className={`flex flex-col gap-6 rounded-lg border p-3 ${
        dark ? "border-white/5 bg-white/5" : "border-white bg-white"
      }`}
    >
      <ParaformPanel product={product} name={p.name} />
      <div className="flex flex-1 flex-col px-3 pb-4">
        <span
          aria-hidden="true"
          className="mb-5 block h-1 w-10 rounded-full"
          style={{ background: STYLE[product].mid }}
        />
        <h3
          className={`font-heading text-xl font-normal leading-snug tracking-[-0.005em] text-balance ${
            dark ? "text-white" : "text-sognos-heading"
          }`}
        >
          {p.tagline}
        </h3>
        <Link
          href={p.href}
          className={`mt-auto inline-flex min-h-11 items-center gap-1.5 self-start pt-6 text-base font-medium transition-colors hover:text-sognos-blue-accent focus-visible:outline-2 focus-visible:outline-sognos-blue-accent ${
            dark ? "text-white" : "text-sognos-heading"
          }`}
        >
          Explore {p.name} <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
