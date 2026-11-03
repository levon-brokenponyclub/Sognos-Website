"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ALL_STORIES } from "@/components/layout/sections/ProductCustomerStories";
import { BRAND_BG, BRAND_FALLBACK } from "@/lib/customerStoryBrand";

// Home · Customer Stories — Inspector option E "Testimonial slider", after
// angellist.com/funds (2026-11-03). One story at a time on navy: the quote
// card, the story photo in a mono frame overlapping the card's right edge,
// and a logo tile in the client's brand colour (BRAND_BG). Dots below; the
// arrow keys also step through. Autoplays every 8s, pausing while hovered or
// focused and off under reduced motion; crossfade; wraps around. Below lg the
// photo and tile sit above the card.

const STORIES = ALL_STORIES.filter((s) => s.quote).slice(0, 4);

const AUTOPLAY_MS = 8000;

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function HomeStorySlider() {
  const [at, setAt] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (i: number) => setAt((i + STORIES.length) % STORIES.length);
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(at + 1);
    if (e.key === "ArrowLeft") go(at - 1);
  };

  // Restarts on every change of slide, so a manual pick gets the full interval.
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setAt((i) => (i + 1) % STORIES.length), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [at, paused]);

  return (
    <section className="bg-sognos-navy py-20 text-white md:py-28">
      <div
        className="mx-auto max-w-7xl px-6"
        aria-roledescription="carousel"
        aria-label="Customer stories"
        onKeyDown={onKey}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <h2 className="mx-auto max-w-5xl text-center font-heading text-3xl font-normal leading-[1.15] tracking-[-0.015em] text-balance text-white md:text-4xl">
          Why service providers choose Sognos
        </h2>

        <div className="mt-12 grid md:mt-16">
          {STORIES.map((st, k) => {
            const on = k === at;
            return (
              <div
                key={st.company}
                role="group"
                aria-roledescription="slide"
                aria-label={`${k + 1} of ${STORIES.length}`}
                aria-hidden={!on}
                className={`relative flex flex-col-reverse gap-8 transition-[opacity,visibility] duration-500 [grid-area:1/1] motion-reduce:transition-none lg:block lg:pb-20 ${
                  on ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                <figure className="rounded-lg bg-white/5 p-7 sm:p-10 lg:mr-[8%] lg:ml-[5%] lg:min-h-[440px] lg:py-14 lg:pr-[30%] lg:pl-14">
                  <blockquote className="font-heading text-2xl leading-[1.4] text-pretty text-white [text-indent:-0.42em]">
                    &ldquo;{st.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 border-t border-white/10 pt-6 text-base lg:mt-10 lg:pt-8 lg:text-lg">
                    <span className="block font-medium text-white">{st.author}</span>
                    <span className="block text-white/75">{st.role}</span>
                  </figcaption>
                </figure>

                <div
                  className={`relative mx-auto w-52 transition-transform duration-700 ease-[cubic-bezier(.23,1,.32,1)] motion-reduce:transition-none sm:w-60 lg:absolute lg:top-16 lg:right-[3%] lg:mx-0 lg:w-[23%] ${
                    on ? "translate-y-0" : "translate-y-3"
                  }`}
                >
                  <div className="relative aspect-[345/500] overflow-hidden rounded">
                    <Image
                      src={st.panelImage}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 23vw, 240px"
                      className="object-cover grayscale contrast-[1.05]"
                    />
                    <span aria-hidden="true" className="absolute inset-0 bg-sognos-navy opacity-55 mix-blend-color" />
                  </div>
                  <span
                    className="absolute bottom-[6%] -left-[18%] flex aspect-[276/132] w-[80%] items-center justify-center rounded-lg px-5 lg:-left-[38%]"
                    style={{ background: BRAND_BG[st.company] ?? BRAND_FALLBACK }}
                  >
                    <span className="relative h-12 w-[72%]">
                      <Image
                        src={st.logo}
                        alt={st.company}
                        fill
                        sizes="160px"
                        className="object-contain brightness-0 invert"
                      />
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-1 lg:mt-0">
          {STORIES.map((st, k) => (
            <button
              key={st.company}
              type="button"
              aria-label={`Story ${k + 1}: ${st.company}`}
              aria-current={k === at ? "true" : undefined}
              onClick={() => go(k)}
              className={`flex size-6 items-center justify-center rounded-full ${FOCUS}`}
            >
              <span
                className={`block size-2 rounded-full transition-colors duration-200 ${
                  k === at ? "bg-white" : "bg-white/30 hover:bg-white/60"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
