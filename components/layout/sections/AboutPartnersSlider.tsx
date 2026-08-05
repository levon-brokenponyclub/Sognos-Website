"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";

// Partner slider for the About page. Drag + arrows, no loop, no autoplay —
// a deliberate divergence from the shared slider defaults
// (docs/SLIDER_PATTERN.md say loop + 10s autoplay), chosen because this is a
// short, self-directed set of alliances rather than rotating social proof.
// Built on native scroll-snap like ProductCustomerStories, not Embla.
//
// Visible cards: 3 desktop / 2 tablet / 1 mobile, each card a full slide (no
// peek). Card widths are exact fills so three sit flush on desktop and the
// fourth is revealed by scrolling.

export type Partner = {
  name: string;
  logo: string;
  type: string;
  href: string;
  description: string;
};

function IconArrowUpRight() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
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
      aria-label={dir === "prev" ? "Previous partners" : "Next partners"}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-sognos-line text-sognos-heading transition-opacity duration-300 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-30"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className={dir === "prev" ? "" : "rotate-180"}
      >
        <path
          d="M12.5 15L7.5 10L12.5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <a
      data-card
      href={partner.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={partner.name}
      className="group relative flex min-h-[160px] shrink-0 snap-start basis-full flex-col overflow-hidden rounded-lg border border-sognos-line bg-sognos-tint p-5 transition-colors duration-300 hover:border-sognos-blue-accent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sognos-blue-accent sm:basis-[calc((100%-12px)/2)] md:min-h-[244px] lg:basis-[calc((100%-32px)/3)] lg:p-7"
    >
      {/* Resting layer — type on top, logo bottom-left. Fades out on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-col p-5 transition-opacity duration-300 group-hover:opacity-0 motion-reduce:transition-none lg:p-7"
      >
        <h3 className="max-w-[220px] font-heading text-lg font-medium leading-snug tracking-tight text-sognos-heading">
          {partner.type}
        </h3>
        <span className="mt-auto flex h-11 max-w-[55%] items-center">
          <Image
            src={partner.logo}
            alt=""
            width={160}
            height={44}
            className="h-auto max-h-11 w-auto max-w-full object-contain"
          />
        </span>
      </span>

      {/* Hover layer — logo lifts to the top-left, description fades in. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-col p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none lg:p-7"
      >
        <span className="flex h-11 max-w-[55%] items-center">
          <Image
            src={partner.logo}
            alt=""
            width={160}
            height={44}
            className="h-auto max-h-11 w-auto max-w-full object-contain"
          />
        </span>
        <p className="mt-4 pr-4 text-sm leading-snug text-sognos-body line-clamp-4">
          {partner.description}
        </p>
      </span>

      {/* Persistent pill — label swaps "Learn more" → "Visit Website" on hover.
          Anchored bottom-right so the width change extends leftward without
          shifting anything. */}
      <span className="pointer-events-none absolute bottom-5 right-5 flex shrink-0 items-center gap-x-1 whitespace-nowrap rounded border border-sognos-line bg-white px-2 py-0.5 text-xs font-medium text-sognos-body transition-colors duration-300 group-hover:border-sognos-blue-accent group-hover:bg-sognos-blue-accent group-hover:text-white lg:bottom-7 lg:right-7">
        <span className="group-hover:hidden">Learn more</span>
        <span className="hidden group-hover:inline">Visit Website</span>
        <span
          aria-hidden="true"
          className="inline-flex w-0 shrink-0 overflow-hidden transition-[width] duration-200 ease-out group-hover:w-3.5"
        >
          <IconArrowUpRight />
        </span>
      </span>
    </a>
  );
}

export default function AboutPartnersSlider({
  partners,
}: {
  partners: Partner[];
}) {
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
    // One card + one gap. Gap is 12px below lg, 16px from lg — read it off the
    // computed style so the step stays exact if the token changes.
    const gap = card
      ? parseFloat(getComputedStyle(el).columnGap || "16") || 16
      : 16;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <>
      {/* Header + arrows. Arrows drop below the copy on mobile. */}
      <div className="mb-8 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <AnimatedEyebrow className="mb-4" textClassName="text-sognos-muted">
            Our Partners
          </AnimatedEyebrow>
          <h2 className="mb-6 font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
            Let&apos;s build. Together.
          </h2>
          <p className="text-lg leading-relaxed text-sognos-body">
            We&apos;ve partnered with some of the best innovators in the industry
            to bring you new and exciting possibilities - enhanced and integrated
            business solutions to your most complex problems.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
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

      {/* Track. `gap-3 lg:gap-4` matches the card basis math above. */}
      <div
        ref={scrollerRef}
        onScroll={updateArrows}
        className="scrollbar-hide flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto overscroll-x-contain scroll-smooth lg:gap-4"
      >
        {partners.map((partner) => (
          <PartnerCard key={partner.name} partner={partner} />
        ))}
      </div>
    </>
  );
}
