"use client";

import Link from "next/link";
import { useBookDemo } from "@/lib/BookDemoContext";

export default function CTABand() {
  const { openModal } = useBookDemo();

  return (
    <section className="relative w-full overflow-hidden bg-sognos-navy-darkest py-16 lg:py-24 border-b border-white/10">
      {/* Decorative dot-grid, bottom-anchored (Deck-style). `mix-blend-screen`
          drops the SVG's near-black backing so only the dots read over navy. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/cta-bg.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full select-none mix-blend-luminosity"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-col items-center text-center overflow-hidden">
          <h2 className="font-heading text-3xl font-normal tracking-tight text-white text-balance md:text-4xl">
            Transform the way you work
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/65">
            Discover how one intelligent platform helps you simplify operations,
            empower your workforce, and make faster, data-driven decisions.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => openModal()}
              className="rounded bg-sognos-blue-accent px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-90"
            >
              Book a demo
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-base font-medium text-white transition-opacity hover:opacity-70"
            >
              Talk to Sales
              <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
