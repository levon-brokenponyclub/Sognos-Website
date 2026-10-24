"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";
import PartnerCard from "@/components/ui/PartnerCard";

// Partner slider for the About page. Drag + arrows, no loop, no autoplay —
// a deliberate divergence from the shared slider defaults
// (docs/SLIDER_PATTERN.md say loop + 10s autoplay), chosen because this is a
// short, self-directed set of alliances rather than rotating social proof.
// Built on native scroll-snap like ProductCustomerStories, not Embla.
//
// Visible cards: 3 desktop / 2 tablet / 1 mobile, each card a full slide (no
// peek). Card widths are exact fills so three sit flush on desktop and the
// fourth is revealed by scrolling.

// Card shape kept here as the section's public API; the actual card render
// lives in components/ui/PartnerCard.tsx (2026-08-07 extraction — shared
// with ProductsSection).
export type Partner = {
  name: string;
  logo: string;
  type: string;
  href: string;
  description: string;
};

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
      className="flex h-10 w-10 items-center justify-center rounded-full border border-sognos-line text-sognos-heading transition-opacity duration-300 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-30"
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
          <PartnerCard key={partner.name} partner={partner} external />
        ))}
      </div>
    </>
  );
}
