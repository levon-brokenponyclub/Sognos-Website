"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

export type CaseStudy = {
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

const AUTOPLAY_MS = 10000;

const TESTIMONIAL_PALETTE = [
  "bg-sognos-care-dark", // #03112f
  "bg-sognos-roster-dark", // #0b3a66
  "bg-sognos-genogram-dark", // #250438
] as const;

export const ALL_STORIES: CaseStudy[] = [
  {
    company: "Flourish Australia",
    companySize: "1,100+",
    industry: "Health & Social Care",
    logo: "/logos/flourish-australia-logo.png",
    panelImage: "/images/customers/flourish-australia.avif",
    quote:
      "Congratulations and well done to everyone that has been a part of this magnificent success! You should all be very proud of the quality of work you produce. You make us very proud - THANK YOU!",
    author: "Susan McCarthy",
    role: "Chief Operating Officer, Flourish Australia",
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
    role: "Operations Delivery Lead, Auckland Airport",
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
    role: "Service Delivery Manager, Penrith City Council",
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

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

interface ProductCustomerStoriesProps {
  stories?: CaseStudy[];
}

export default function ProductCustomerStories({
  stories = ALL_STORIES,
}: ProductCustomerStoriesProps) {
  const total = stories.length;
  const showChrome = total > 1;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const autoplayPlugin = useRef(
    Autoplay({ delay: AUTOPLAY_MS, stopOnInteraction: true }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: "center",
      containScroll: "trimSnaps",
    },
    showChrome ? [autoplayPlugin.current] : [],
  );

  const updateState = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateState();
    emblaApi.on("select", updateState);
    emblaApi.on("reInit", updateState);
    return () => {
      emblaApi.off("select", updateState);
      emblaApi.off("reInit", updateState);
    };
  }, [emblaApi, updateState]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  return (
    <section id="stories" className="w-full bg-white overflow-hidden">
      {/* Heading — constrained to max-w-7xl */}
      <div className="max-w-7xl w-full mx-auto px-6 pt-16 lg:pt-24 pb-8">
        <h2 className="font-heading text-3xl md:text-4xl font-medium text-sognos-navy-dark tracking-tight">
          Customer Stories
        </h2>
      </div>

      {/* Embla viewport — full section width (breaks out of max-w-7xl) */}
      {showChrome ? (
        <div ref={emblaRef} className="relative overflow-hidden">
          <div
            className="flex"
            style={{
              paddingLeft: "max(1.5rem, calc((100vw - 86.25rem) / 2 + 1.5rem))",
            }}
          >
            {stories.map((study, i) => (
              <div
                key={i}
                className={`shrink-0 min-w-0 w-[calc(100vw-3rem)] lg:w-[calc(100vw-12rem)] max-w-[1332px]${i < stories.length - 1 ? " mr-6 sm:mr-8" : ""}`}
              >
                <StoryCard
                  study={study}
                  bg={TESTIMONIAL_PALETTE[i % TESTIMONIAL_PALETTE.length]}
                />
              </div>
            ))}
            {/* Trailing spacer — browsers exclude container paddingRight from scrollWidth,
                so Embla's maxScroll ignores it and the last slide ends flush to the screen.
                Using mr-* on slides (not gap) means no automatic spacing before this spacer,
                so scrollWidth = last_slide.right + spacer_width = right gutter exactly. */}
            <div
              aria-hidden="true"
              className="shrink-0"
              style={{
                width: "max(1.5rem, calc((100vw - 86.25rem) / 2 + 1.5rem))",
              }}
            />
          </div>
        </div>
      ) : (
        <div className="max-w-7xl w-full mx-auto px-6">
          <StoryCard study={stories[0]} bg={TESTIMONIAL_PALETTE[0]} />
        </div>
      )}

      {/* Chrome — constrained to max-w-7xl */}
      {showChrome && (
        <div className="max-w-7xl w-full mx-auto px-6 pb-16 lg:pb-24">
          <div className="pt-8 flex items-center justify-between">
            <div className="hidden flex-1 lg:block" />
            {/* Dots */}
            <div className="flex items-center gap-2">
              {stories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`rounded-full transition-all duration-200 ${
                    i === selectedIndex
                      ? "w-4 h-2 bg-sognos-navy-dark"
                      : "w-2 h-2 bg-sognos-navy-dark/25 hover:bg-sognos-navy-dark/50"
                  }`}
                />
              ))}
            </div>
            {/* Arrows — dark navy fill slides up on hover; white icon on fill, navy at rest */}
            <div className="hidden lg:flex flex-1 justify-end gap-3">
              <button
                onClick={scrollPrev}
                disabled={!canPrev}
                aria-label="Previous story"
                className="group/btn relative isolate flex size-12 items-center justify-center overflow-hidden rounded-full border border-sognos-line text-sognos-navy-dark disabled:cursor-not-allowed disabled:opacity-30 disabled:pointer-events-none"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-y-full rounded-full bg-sognos-navy-dark transition-transform duration-300 group-hover/btn:translate-y-0"
                />
                <ChevronLeft className="relative z-10 size-4 transition-colors duration-300 group-hover/btn:text-white" />
              </button>
              <button
                onClick={scrollNext}
                disabled={!canNext}
                aria-label="Next story"
                className="group/btn relative isolate flex size-12 items-center justify-center overflow-hidden rounded-full border border-sognos-line text-sognos-navy-dark disabled:cursor-not-allowed disabled:opacity-30 disabled:pointer-events-none"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-y-full rounded-full bg-sognos-navy-dark transition-transform duration-300 group-hover/btn:translate-y-0"
                />
                <ChevronRight className="relative z-10 size-4 transition-colors duration-300 group-hover/btn:text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Single-story bottom padding */}
      {!showChrome && <div className="pb-16 lg:pb-24" />}
    </section>
  );
}

function StoryCard({ study, bg }: { study: CaseStudy; bg: string }) {
  return (
    <div className={`${bg} rounded-lg overflow-hidden`}>
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[360px] md:min-h-[400px]">
        {/* Left — quote top, author/role + link bottom-LEFT, logo bottom-RIGHT */}
        <div className="md:col-span-8 flex flex-col p-6 lg:p-10">
          <blockquote className="relative mb-6 lg:mb-8 before:hidden after:hidden">
            <p className="font-angellist text-xl md:text-2xl lg:text-3xl font-normal leading-tight tracking-tight text-white">
              {study.quote}
            </p>
          </blockquote>
          <Link
            href={study.href}
            className="mt-3 inline-block w-fit text-sm font-medium text-white underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            Read Customer Story
          </Link>
          {/* Bottom row: author/role + link on LEFT, logo on RIGHT */}
          <div className="mt-auto pt-6 flex items-end justify-between gap-6">
            <div>
              <p className="text-base font-bold text-white">{study.author}</p>
              <p className="text-base mt-0.5 text-white">{study.role}</p>
            </div>
            {study.logo && (
              <Image
                src={study.logo}
                alt={study.company}
                width={140}
                height={40}
                className="h-13 w-auto max-w-[160px] object-contain brightness-0 invert flex-shrink-0"
              />
            )}
          </div>
        </div>

        {/* Right — full-bleed image, flush to card edges */}
        <div className="relative md:col-span-4 min-h-[280px] md:min-h-0 bg-white/5">
          {study.panelVideo ? (
            <video
              src={study.panelVideo}
              autoPlay
              muted
              playsInline
              loop
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : study.panelImage ? (
            <Image
              src={study.panelImage}
              alt={study.company}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
