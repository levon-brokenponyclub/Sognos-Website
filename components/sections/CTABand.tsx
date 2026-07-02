"use client";

import Link from "next/link";

export default function CTABand() {
  return (
    <section className="relative w-full bg-gray-50 py-16 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-col items-center text-center overflow-hidden rounded-lg bg-sognos-blue-accent px-8 py-12 lg:px-14 lg:py-16">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-white text-balance md:text-4xl">
            Book a Demo
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-white/80">
            Schedule a 45-minute call to see how Sognos can unify your
            operations and boost efficiency.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              disabled
              className="rounded-full bg-white px-7 py-3.5 text-base font-medium text-sognos-heading transition-opacity hover:opacity-90"
            >
              Book a Demo
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
