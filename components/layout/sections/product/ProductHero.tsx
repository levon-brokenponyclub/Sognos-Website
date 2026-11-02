"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useBookDemo } from "@/lib/BookDemoContext";
import { TYPE } from "@/components/layout/sections/sognoscare/typeScale";
import { PRODUCT_THEME, type ProductKey } from "./theme";

export type HeroTrustLogo = { alt: string; src: string };

interface ProductHeroProps {
  product: ProductKey;
  logoSrc: string;
  headline: string;
  subtext: string;
  photoSrc: string;
  /** Floating card line under the product name. */
  tagline: string;
  trustLogos?: HeroTrustLogo[];
}

// "One platform. From intake to outcome." → one line per sentence. Only the
// first sentence break is used, so a CMS headline without one renders as is.
function splitHeadline(headline: string) {
  const i = headline.indexOf(". ");
  return i === -1 ? [headline] : [headline.slice(0, i + 1), headline.slice(i + 2)];
}

// Masked 64px grid over the hero gradient.
const HERO_GRID = {
  backgroundImage:
    "linear-gradient(rgb(255 255 255 / .06) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / .06) 1px, transparent 1px)",
  backgroundSize: "64px 64px",
  maskImage: "radial-gradient(70% 70% at 50% 30%, black, transparent)",
};

// Products Inspector · Hero B "Immersive", gradient tone: product glow +
// grid at half strength, centred copy, then the product photo with a
// floating glass card that bleeds off its foot.
export default function ProductHero({
  product,
  logoSrc,
  headline,
  subtext,
  photoSrc,
  tagline,
  trustLogos = [],
}: ProductHeroProps) {
  const t = PRODUCT_THEME[product];
  const heroRef = useRef<HTMLElement>(null);
  const { openModal } = useBookDemo();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const prefersReducedMotion = useReducedMotion();
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 60],
  );

  return (
    <section
      ref={heroRef}
      id="top"
      data-header-dark
      className="relative overflow-hidden pt-36 pb-16 text-white md:pt-44 md:pb-24"
      style={{ background: t.heroGradient }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(55% 60% at 15% 10%, color-mix(in srgb, ${t.glow[0]} 45%, transparent), transparent 70%), radial-gradient(45% 50% at 95% 90%, color-mix(in srgb, ${t.glow[1]} 30%, transparent), transparent 70%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={HERO_GRID}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          style={{ y }}
          className="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center will-change-transform"
        >
          <Image
            src={logoSrc}
            alt={t.name}
            width={200}
            height={32}
            priority
            className="h-8 w-auto brightness-0 invert"
          />

          <h1 className="font-heading text-5xl font-normal leading-[1.05] tracking-[-0.02em] text-white text-balance md:text-6xl">
            {splitHeadline(headline).map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className={`${TYPE.heroSub} text-white/75`}>{subtext}</p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openModal(t.demoKey)}
              className={`min-h-11 rounded-full bg-white px-7 py-3.5 text-base font-medium text-sognos-heading transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${t.hoverBg}`}
            >
              Book a Demo
            </button>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-base font-medium text-white transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Talk to Sales
              <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
        </motion.div>

        <div className="relative mx-auto mt-14 max-w-6xl md:mt-20">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10 md:aspect-[16/7]">
            <Image
              src={photoSrc}
              alt=""
              fill
              priority
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: `linear-gradient(160deg, color-mix(in srgb, ${t.wash[0]} 55%, transparent), color-mix(in srgb, ${t.wash[1]} 30%, transparent))`,
              }}
            />
          </div>
          <div className="absolute -bottom-6 left-4 rounded-lg border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-md motion-safe:animate-[sognos-float_6s_ease-in-out_infinite] md:left-10">
            <p className="text-xs text-white/75">{t.name}</p>
            <p className="font-heading text-lg">{tagline}</p>
          </div>
        </div>

        {/* Trust logos at the hero foot (kept from the live pages; not in
            the mockup). Four on desktop; the fifth spans on mobile. */}
        {trustLogos.length > 0 && (
          <ul
            aria-label="Trusted by"
            className="mx-auto mt-20 grid max-w-6xl grid-cols-2 items-center gap-x-10 gap-y-8 md:grid-cols-4"
          >
            {trustLogos.map((logo, i) => (
              <li
                key={logo.alt}
                className={`flex items-center justify-center ${
                  i === 4 ? "col-span-2 md:hidden" : i > 4 ? "hidden" : ""
                }`}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={220}
                  height={60}
                  className="h-10 w-auto max-w-[180px] object-contain opacity-80 brightness-0 invert md:h-12"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
