"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Edition = {
  label?: string;
  name?: string;
  logo: string;
  href: string;
  accentColor: string;
  description: string;
};

interface EditionCardsProps {
  editions: readonly Edition[];
  showSliderButtons?: boolean;
  containerClassName?: string;
  controlsClassName?: string;
  dark?: boolean; // kept for EditionPageTemplate compat — not applied to new arrow style
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
      className="flex size-11 items-center justify-center rounded-full border border-sognos-line text-sognos-heading transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-sognos-blue-accent disabled:cursor-not-allowed disabled:opacity-30"
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

function EditionCard({
  edition,
  cardWidthClass = "lg:w-[31.5%]",
}: {
  edition: Edition;
  cardWidthClass?: string;
}) {
  const title = edition.label ?? edition.name ?? "";

  // One title and one description per card (the old hover layer duplicated
  // both for screen readers). Edition colour: a 4px top rule at rest, the
  // arrow fills on hover. Description always visible.
  return (
    <Link
      href={edition.href}
      data-card
      className={[
        "group relative flex flex-col justify-between overflow-hidden rounded bg-white p-6",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sognos-blue-accent",
        "flex-shrink-0 snap-start w-[82vw] min-h-[320px]",
        cardWidthClass,
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: edition.accentColor }}
      />

      <div className="flex flex-col gap-6">
        {/* Logo as placeholder icon — FLAG: swap to a per-edition icon. */}
        <div className="w-[140px]">
          <Image
            src={edition.logo}
            alt=""
            width={140}
            height={40}
            className="h-auto w-full object-contain"
          />
        </div>
        <p className="max-w-[45ch] text-base leading-relaxed text-sognos-body">
          {edition.description}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-sognos-line pt-5">
        <h3 className="font-heading text-lg font-normal leading-snug tracking-[-0.005em] text-sognos-heading text-balance">
          {title}
        </h3>
        <span
          aria-hidden="true"
          className="relative isolate flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sognos-tint"
        >
          <span
            className="absolute inset-0 translate-y-full scale-50 rounded-full transition-transform duration-300 group-hover:translate-y-0 group-hover:scale-100"
            style={{ backgroundColor: edition.accentColor }}
          />
          <svg
            viewBox="0 0 14 14"
            fill="none"
            className="relative h-5 w-5 text-sognos-heading transition-colors duration-300 group-hover:text-white"
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
  );
}

export default function EditionCards({
  editions,
  showSliderButtons = true,
  containerClassName = "",
  controlsClassName = "mb-5 flex justify-end gap-3",
}: EditionCardsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const hasMoreThanThree = editions.length > 3;
  const cardWidthClass = hasMoreThanThree ? "lg:w-[28%]" : "lg:w-[31.5%]";

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
    // One card + the track gap (12px / 16px from lg), read off the track.
    const gap = parseFloat(getComputedStyle(el).columnGap || "16") || 16;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <div className={`relative ${containerClassName}`}>
      {showSliderButtons && (
        <div className={controlsClassName}>
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
      )}
      <div
        ref={scrollerRef}
        onScroll={updateArrows}
        className="flex snap-x snap-mandatory gap-3 lg:gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {editions.map((edition) => (
          <EditionCard
            key={edition.href}
            edition={edition}
            cardWidthClass={cardWidthClass}
          />
        ))}
      </div>
    </div>
  );
}
