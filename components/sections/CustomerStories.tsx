"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type CaseStudy = {
  company: string;
  companySize: string;
  industry: string;
  logo: string;
  panelImage: string;
  panelVideo?: string;
  quote: string;
  author: string;
  role: string;
  href: string;
};

const AUTOPLAY_MS = 8000;

const CASE_STUDIES: CaseStudy[] = [
  {
    company: "Flourish Australia",
    companySize: "1,100+",
    industry: "Health & Social Care",
    logo: "/logos/flourish-australia-logo.png",
    panelImage: "/images/customers/flourish-australia.avif",
    quote:
      "Congratulations and well done to everyone that has been a part of this magnificent success! You should all be very proud of the quality of work you produce. You make us very proud - THANK YOU!",
    author: "Susan McCarthy",
    role: "Chief Operating Officer @ Flourish Australia",
    href: "/customer-stories/flourish-australia",
  },
  {
    company: "Auckland Airport",
    companySize: "350+",
    industry: "Transport",
    logo: "/logos/auckland-airport-logo.png",
    panelImage: "/images/customers/auckland-airport.webp",
    quote:
      "Thank you to the Sognos team. Hoping to see you and thank you in person for such a successful implementation. Looking forward to a continued successful partnership with Sognos as our Field Service support partners!",
    author: "Anthony Hart",
    role: "Operations Delivery Lead @ Auckland Airport",
    href: "/customer-stories/auckland-airport",
  },
  {
    company: "Penrith City Council",
    companySize: "300+",
    industry: "Local Government",
    logo: "/logos/penrith-city-council-logo.png",
    panelImage: "/images/customers/penrith-city-council.png",
    quote:
      "We've moved from reactive to proactive compliance. Every inspection now, the auditors comment on how thorough our records are. That wasn't possible before Sognos.",
    author: "Claire Donovan",
    role: "Service Delivery Manager @ Penrith City Council",
    href: "/customer-stories/penrith-city-council",
  },
  {
    company: "Gentari Solar Australia",
    companySize: "10,000+",
    industry: "Energy & Utilities",
    logo: "/logos/gentari-logo-rect.webp",
    panelImage: "/images/customers/gentari.webp",
    quote:
      "For us it is of the utmost importance to give our technicians visibility of the history of each of the farms that they service in their routine PMs and capture data at the same time. Dynamics 365 Field Service has not disappointed us in any of our key requirements.",
    author: "Operations Team",
    role: "Gentari Solar Australia",
    href: "/customer-stories/gentari",
  },
];

export default function CustomerStories() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = CASE_STUDIES.length;

  const scrollRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToSlide = useCallback((i: number) => {
    const slide = slideRefs.current[i];
    const container = scrollRef.current;
    if (!slide || !container) return;
    const offset =
      slide.offsetLeft - (container.clientWidth - slide.clientWidth) / 2;
    container.scrollTo({ left: offset, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestIdx = -1;
        let bestRatio = 0;
        entries.forEach((entry) => {
          if (entry.intersectionRatio < 0.5) return;
          const idx = slideRefs.current.findIndex((el) => el === entry.target);
          if (idx === -1) return;
          if (bestIdx === -1 || entry.intersectionRatio > bestRatio) {
            bestIdx = idx;
            bestRatio = entry.intersectionRatio;
          }
        });
        if (bestIdx !== -1) setActive(bestIdx);
      },
      {
        root: container,
        threshold: [0.5, 0.75, 0.9, 1.0],
      },
    );

    slideRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      const next = (active + 1) % total;
      scrollToSlide(next);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, paused, total, scrollToSlide]);

  const handlePill = (i: number) => {
    if (i === active) return;
    setPaused(true);
    scrollToSlide(i);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(
      () => setPaused(false),
      AUTOPLAY_MS * 2,
    );
  };

  return (
    <section className="overflow-hidden bg-background pt-0 pb-10 md:pb-20">
      <div className="w-full py-16">
        {/* Section header */}
        <div className="mx-auto flex flex-col items-center px-6 text-center">
          <p className="mb-4 flex items-center gap-2 text-sm text-sognos-text-muted">
            <span className="size-1.5 shrink-0 rounded-full bg-brand" />
            Testimonials
          </p>
          <h2 className="max-w-[920px] font-heading text-3xl font-normal leading-tight tracking-tight text-sognos-text-heading text-balance md:text-4xl">
            Don&apos;t just take our word for it
          </h2>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="scrollbar-hide mt-[64px] flex w-full gap-5 overflow-x-auto pb-4 md:mt-[106px] md:gap-8"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div
            className="shrink-0"
            style={{
              width: "max(2rem, calc((100vw - min(870px, 80vw)) / 2))",
            }}
            aria-hidden
          />

          {CASE_STUDIES.map((study, i) => {
            const isActive = i === active;
            return (
              <div
                key={study.company}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                className="shrink-0"
                style={{ scrollSnapAlign: "center" }}
              >
                <div className="relative flex w-[80vw] max-w-[870px] flex-col gap-5 md:gap-8">
                  {/* Media with quote/author/role overlaid */}
                  <Link
                    href={study.href}
                    aria-label={`Open testimonial for ${study.author}`}
                    className="group relative block w-full cursor-pointer overflow-hidden rounded-xl bg-prussian-blue-900"
                    style={{ aspectRatio: "870 / 489" }}
                  >
                    {study.panelVideo ? (
                      <video
                        src={study.panelVideo}
                        loop
                        muted
                        playsInline
                        autoPlay
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Image
                        src={study.panelImage}
                        alt={study.company}
                        fill
                        sizes="(min-width: 870px) 870px, 80vw"
                        className="object-cover"
                      />
                    )}

                    {/* Bottom gradient — taller for text readability */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent"
                      aria-hidden
                    />

                    {/* Customer logo top-left */}
                    {study.logo && (
                      <div className="absolute top-3 left-3 md:top-8 md:left-8">
                        <Image
                          src={study.logo}
                          alt={study.company}
                          width={109}
                          height={21}
                          className="h-[16px] w-auto brightness-0 invert drop-shadow-md md:h-[21px]"
                        />
                      </div>
                    )}

                    {/* Quote + author overlaid bottom-left, play button bottom-right */}
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10">
                      <div className="flex items-end justify-between gap-4">
                        <blockquote className="max-w-[85%] flex-1">
                          <p className="font-heading text-base leading-snug tracking-tight text-white text-balance md:text-lg lg:text-xl">
                            &ldquo;{study.quote}&rdquo;
                          </p>
                          <footer className="mt-3 md:mt-4">
                            <p className="text-sm font-medium text-white">
                              {study.author}
                            </p>
                            <p className="mt-0.5 text-xs text-white/65 md:text-sm">
                              {study.role}
                            </p>
                          </footer>
                        </blockquote>

                        {/* Play button */}
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand shadow-md transition-transform duration-200 group-hover:scale-110 md:h-11 md:w-11">
                          <svg
                            width="12"
                            height="14"
                            viewBox="0 0 12 14"
                            fill="none"
                            className="ml-0.5"
                            aria-hidden
                          >
                            <path
                              d="M0.5 0.5L11.5 7L0.5 13.5V0.5Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* White overlay — dims inactive slides */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-xl bg-white transition-opacity duration-500"
                      style={{ opacity: isActive ? 0 : 0.55 }}
                      aria-hidden
                    />
                  </Link>

                  {/* Caption — stats + Read story */}
                  <div
                    className="flex flex-col items-start gap-4 px-6 transition-opacity duration-500 md:flex-row md:items-end md:gap-[40px]"
                    style={{ opacity: isActive ? 1 : 0.4 }}
                  >
                    <div className="flex flex-1 flex-wrap items-end gap-x-10 gap-y-5">
                      <div>
                        <p className="font-heading text-3xl font-light leading-none tracking-tight text-sognos-text-heading lg:text-[40px]">
                          {study.companySize}
                        </p>
                        <p className="mt-2 text-xs uppercase tracking-wide text-sognos-text-muted">
                          Company size
                        </p>
                      </div>
                      <div>
                        <p className="font-heading text-xl font-normal leading-snug tracking-tight text-sognos-text-heading lg:text-2xl">
                          {study.industry}
                        </p>
                        <p className="mt-2 text-xs uppercase tracking-wide text-sognos-text-muted">
                          Industry
                        </p>
                      </div>
                    </div>

                    <Link
                      href={study.href}
                      className="flex h-10 shrink-0 items-center justify-center self-start rounded-full bg-sognos-text-heading px-5 text-sm font-medium text-white transition-colors hover:bg-sognos-text-heading/90 md:w-[174px] md:px-0 md:self-end"
                    >
                      Read customer story
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          <div
            className="shrink-0"
            style={{
              width: "max(2rem, calc((100vw - min(870px, 80vw)) / 2))",
            }}
            aria-hidden
          />
        </div>

        {/* Pill indicator */}
        <div className="mt-5 flex justify-center md:mt-6">
          <div className="flex items-center gap-x-1.5 rounded-full bg-sognos-text-heading/5 px-4 py-3">
            {CASE_STUDIES.map((_, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handlePill(i)}
                  aria-label={`Show testimonial ${i + 1} of ${total}`}
                  className={`relative h-1 cursor-pointer overflow-hidden rounded-full bg-sognos-text-heading/20 shrink-0 transition-[width] duration-300 ${
                    isActive ? "w-8" : "w-1.5"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      key={`fill-${active}`}
                      className="block h-full bg-sognos-text-heading"
                      initial={{ width: "0%" }}
                      animate={paused ? false : { width: "100%" }}
                      transition={{
                        duration: AUTOPLAY_MS / 1000,
                        ease: "linear",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
