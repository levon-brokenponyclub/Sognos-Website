"use client";

import Image from "next/image";
import { DEFAULT_CTA_CONTENT } from "@/lib/content/ctaSection";
import { useBookDemo } from "@/lib/BookDemoContext";

// Cohere Home slot: "Ready to put AI to work?" — CTA band.
// Left: title + copy + Book-a-Demo button. Right: two logo marquees (→ and ←).
const LOGOS = DEFAULT_CTA_CONTENT.logos;

function LogoMarquee({ reverse }: { reverse?: boolean }) {
  const track = [...LOGOS, ...LOGOS];
  return (
    <div className="cta-band-wrap overflow-hidden">
      <div
        className={`cta-band-track${reverse ? " reverse" : ""}`}
        aria-hidden="true"
      >
        {track.map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="flex h-16 w-32 shrink-0 items-center justify-center rounded-lg bg-white/10 px-5"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={40}
              sizes="120px"
              className="h-auto w-auto max-h-8 max-w-[96px] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CTABand() {
  const { openModal } = useBookDemo();

  return (
    <section className="relative w-full overflow-hidden py-16 lg:py-24">
      <Image
        src="/images/home/cta-background-image.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-10 overflow-hidden rounded-lg bg-prussian-blue-900 px-8 py-12 lg:grid-cols-2 lg:gap-12 lg:px-14 lg:py-16">
          {/* Left — title, copy, button */}
          <div className="flex flex-col items-start">
            <h2 className="font-heading text-3xl font-normal tracking-tight text-white text-balance md:text-4xl">
              Book a Demo
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/80">
              Schedule a 45-minute call to see how Sognos can unify your
              operations and boost efficiency.
            </p>
            <button
              type="button"
              onClick={() => openModal()}
              className="mt-8 inline-flex w-fit items-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-medium text-prussian-blue-900 transition-opacity hover:opacity-90"
            >
              Book a Demo
              <svg className="size-3" viewBox="0 0 12 13" fill="none" aria-hidden="true">
                <path
                  d="M0.75 6.46875H11.25M11.25 6.46875L6 11.7188M11.25 6.46875L6 1.21875"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Right — two logo marquees */}
          <div className="flex flex-col gap-4">
            <LogoMarquee />
            <LogoMarquee reverse />
          </div>
        </div>
      </div>
    </section>
  );
}
