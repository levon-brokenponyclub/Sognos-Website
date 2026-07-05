"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { INDUSTRIES } from "@/lib/constants";

// Cohere Home slot: "Powering progress across industries"
// Left heading + prev/next arrow buttons; horizontal snap-scroll row of large
// square image cards with hover zoom (scale-[1.2]). rounded-lg per design system.
const CARD_IMAGES: Record<string, string> = {
  "health-social-care": "/images/home/industries/health-social-care.jpg",
  "facilities-management": "/images/home/industries/facilities-management.jpg",
  "local-government": "/images/home/industries/local-government.png",
  "industrial-services": "/images/home/industries/industrial-services.jpg",
  "energy-utilities": "/images/home/industries/energy-utilities.jpg",
};

export default function IndustrySection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-background border-b border-sognos-line">
      <div className="max-w-7xl w-full mx-auto px-6 py-16 lg:py-24">
        {/* Header — heading left, arrows right (Cohere) */}
        <div className="flex w-full items-end justify-between gap-6 pb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-medium tracking-tight text-sognos-heading max-w-4xl">
            Purpose-built for service-intensive sectors
          </h2>
          <div className="flex shrink-0 gap-3">
            <ArrowButton
              dir="prev"
              disabled={!canPrev}
              onClick={() => scrollByCard(-1)}
            />
            <ArrowButton
              dir="next"
              disabled={!canNext}
              onClick={() => scrollByCard(1)}
            />
          </div>
        </div>

        {/* Horizontal snap-scroll carousel */}
        <div
          ref={scrollerRef}
          onScroll={updateArrows}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {INDUSTRIES.map((ind) => (
            <Link
              key={ind.slug}
              href={ind.href}
              data-card
              aria-label={ind.name}
              className="group/card relative shrink-0 snap-center overflow-hidden rounded h-[289px] w-[289px] md:h-[399px] md:w-[399px] lg:h-[420px] lg:w-[420px]"
            >
              <Image
                src={CARD_IMAGES[ind.slug] ?? ind.image}
                alt={ind.name}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.2]"
                sizes="(min-width: 1024px) 420px, (min-width: 768px) 399px, 289px"
              />
              {/* Legibility gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-sognos-navy-dark/85 via-sognos-navy-dark/10 to-transparent" />

              {/* Title + arrow pinned bottom */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                <h3 className="font-heading text-xl lg:text-2xl font-medium tracking-tight text-white text-balance max-w-[80%]">
                  {ind.name}
                </h3>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sognos-body transition-transform duration-300 group-hover/card:translate-x-0.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 7h8M7 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowButton({
  dir,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-sognos-line text-sognos-heading transition-colors hover:bg-gray-200/70 disabled:cursor-not-allowed disabled:opacity-30"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
        className={dir === "prev" ? "rotate-180" : ""}
      >
        <path
          d="M3 7h8M7 3l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
