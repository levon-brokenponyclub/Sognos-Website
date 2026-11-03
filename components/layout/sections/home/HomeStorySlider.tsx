"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ALL_STORIES } from "@/components/layout/sections/ProductCustomerStories";
import { storyStats } from "@/lib/customerStoryBrand";

// Home · Customer Stories — testimonial slider (2026-11-03). One story at a
// time on navy; the card follows customer.io's case-study card
// (/platform/data-integrations): white logo top-left, the story's stats
// (STORY_STATS) top-right behind thin dividers, a large quote, then the
// author with a small square photo and "Read story" to the right. Dots below;
// the arrow keys also step through. Autoplays every 8s, pausing while hovered
// or focused and off under reduced motion; crossfade; wraps around. Hidden
// slides are inert, so their links stay out of the tab order.

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
            const stats = storyStats(st.href.split("/").pop() ?? "");
            return (
              <div
                key={st.company}
                role="group"
                aria-roledescription="slide"
                aria-label={`${k + 1} of ${STORIES.length}`}
                aria-hidden={!on}
                inert={!on}
                className={`transition-[opacity,visibility] duration-500 [grid-area:1/1] motion-reduce:transition-none ${
                  on ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                <figure className="flex flex-col rounded-lg bg-white/5 p-7 sm:p-10 lg:min-h-[30rem] lg:p-14">
                  <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-8">
                    <span className="relative block h-9 w-40">
                      <Image
                        src={st.logo}
                        alt={st.company}
                        fill
                        sizes="160px"
                        className="object-contain object-left brightness-0 invert"
                      />
                    </span>
                    {stats.length > 0 && (
                      <dl className="flex flex-wrap gap-x-10 gap-y-6">
                        {stats.map((x) => (
                          <div key={x.label} className="flex flex-col-reverse border-l border-white/20 pl-5">
                            <dt className="mt-1 text-sm text-white/75">{x.label}</dt>
                            <dd className="font-heading text-2xl tracking-tight text-white">{x.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>

                  <svg
                    aria-hidden="true"
                    viewBox="0 0 50 40"
                    fill="currentColor"
                    className="mt-14 h-9 w-auto text-white lg:mt-20"
                  >
                    <path d="M0 40V24C0 10.7 6.4 2.7 19.2 0l2.4 5.2C14.4 7.6 11 12 10.6 18H20v22H0Zm28 0V24c0-13.3 6.4-21.3 19.2-24l2.4 5.2C42.4 7.6 39 12 38.6 18H48v22H28Z" />
                  </svg>
                  <blockquote className="mt-4 max-w-4xl font-heading text-2xl leading-[1.3] text-pretty text-white md:text-[2rem]">
                    {st.quote}
                  </blockquote>

                  <div className="mt-12 flex flex-wrap items-end justify-between gap-6 lg:mt-auto lg:pt-16">
                    <figcaption className="flex items-center gap-4">
                      <span className="relative block size-14 shrink-0 overflow-hidden rounded">
                        <Image src={st.panelImage} alt="" fill sizes="56px" className="object-cover" />
                      </span>
                      <span className="text-base">
                        <span className="block font-medium text-white">{st.author}</span>
                        <span className="block text-white/70">{st.role}</span>
                      </span>
                    </figcaption>
                    <Link
                      href={st.href}
                      className={`group inline-flex min-h-11 items-center gap-2 text-base font-medium text-white ${FOCUS}`}
                    >
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                        &rarr;
                      </span>
                      Read story
                    </Link>
                  </div>
                </figure>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-1">
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
