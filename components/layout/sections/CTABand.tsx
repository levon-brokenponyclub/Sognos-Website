"use client";

import Link from "next/link";
import { useBookDemo } from "@/lib/BookDemoContext";
import { cn } from "@/lib/utils";

// Reusable CTA band. Copy comes from the caller (site defaults:
// lib/content/ctaBand.ts). With no `ctaHref` the primary CTA opens the
// Book a Demo modal, as before.

type CTABandProps = {
  heading: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondary?: { label: string; href: string };
  /** `navy` — rounded dot-grid panel. `strip` — Products Inspector footer
   *  CTA row C on the accent: one line of heading beside the CTAs. */
  variant?: "navy" | "strip";
  className?: string;
};

const PRIMARY =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-white px-7 py-3 text-base font-medium text-sognos-navy-dark transition-colors duration-300 hover:bg-sognos-blue-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function CTABand({
  heading,
  subheading,
  ctaLabel = "Book a Demo",
  ctaHref,
  secondary,
  variant = "navy",
  className,
}: CTABandProps) {
  const { openModal } = useBookDemo();

  // On the accent strip the hover goes navy (the accent hover would vanish).
  const primaryClass =
    variant === "strip"
      ? PRIMARY.replace("hover:bg-sognos-blue-accent", "hover:bg-sognos-navy-dark")
      : PRIMARY;
  const primary = ctaHref ? (
    <Link href={ctaHref} className={primaryClass}>
      {ctaLabel}
    </Link>
  ) : (
    <button type="button" onClick={() => openModal()} className={primaryClass}>
      {ctaLabel}
    </button>
  );

  if (variant === "strip")
    return (
      <section
        data-variant={variant}
        className={cn("border-y border-white/20 bg-sognos-blue-accent py-6 text-white", className)}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 md:flex-row md:items-center md:justify-between">
          {/* 24px heading: white on the accent is 3.1:1, the large-text floor. */}
          <h2 className="flex items-center gap-3 font-heading text-2xl font-normal text-white">
            <span aria-hidden="true" className="block size-[0.66em] shrink-0 bg-white" />
            {heading}
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            {primary}
            {secondary && (
              <Link
                href={secondary.href}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/60 px-5 text-base font-medium text-white transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {secondary.label}
                <span aria-hidden="true">&#8599;</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    );

  return (
    <section
      data-variant={variant}
      className={cn(
        "relative isolate overflow-hidden rounded-lg bg-sognos-navy-darkest px-6 py-12 sm:px-10 md:py-14 lg:px-14 lg:py-16",
        className,
      )}
    >
      {/* Decorative dot-grid, bottom-anchored. `mix-blend-luminosity` drops
          the SVG's near-black backing so only the dots read over navy. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/cta-bg.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 w-full select-none mix-blend-luminosity"
      />
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-normal leading-[1.2] tracking-[-0.01em] text-balance text-white md:text-4xl">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">
              {subheading}
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-start gap-4 sm:flex-row sm:items-center">
          {primary}
          {secondary && (
            <Link
              href={secondary.href}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-base font-medium text-white transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {secondary.label}
              <span aria-hidden="true">&#8599;</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
