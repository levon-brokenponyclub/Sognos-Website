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

function EditionCard({
  edition,
  cardWidthClass = "lg:w-[31.5%]",
}: {
  edition: Edition;
  cardWidthClass?: string;
}) {
  const title = edition.label ?? edition.name ?? "";
  const [glow, setGlow] = useState({ x: 0, y: 0, visible: false });

  return (
    <Link
      href={edition.href}
      data-card
      className={[
        "group relative flex overflow-hidden rounded-lg bg-white p-6",
        "flex-shrink-0 snap-center w-[82vw]",
        "aspect-square sm:aspect-auto lg:aspect-[3/4]",
        cardWidthClass,
      ].join(" ")}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setGlow((p) => ({ ...p, x: e.clientX - r.left, y: e.clientY - r.top }));
      }}
      onMouseEnter={() => setGlow((p) => ({ ...p, visible: true }))}
      onMouseLeave={() => setGlow((p) => ({ ...p, visible: false }))}
    >
      {/* AngelList card glow — cursor-tracked, opacity-0→1 on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 size-[272px] transition-[background,opacity] duration-700"
        style={{
          opacity: glow.visible ? 1 : 0,
          transform: `translateX(${glow.x}px) translateY(${glow.y}px)`,
          backgroundImage: `radial-gradient(50% 50%, ${edition.accentColor} 0%, transparent 100%)`,
        }}
      />

      {/* Card body — pushes title+button to bottom */}
      <div className="relative flex w-full flex-col justify-between gap-8">
        {/* Top — logo icon + hover-revealed description */}
        <div className="flex flex-col gap-4">
          {/* Logo as placeholder icon (h-8 / size-8 area).
              FLAG: swap to a dedicated per-edition icon in the styling pass. */}
          <div className="w-[140px]">
            <Image
              src={edition.logo}
              alt={title}
              width={140}
              height={40}
              className="h-auto w-full object-contain"
            />
          </div>

          {/* Description — hidden at rest, revealed on hover.
              FLAG: not visible on touch/mobile — make always-visible on small screens in styling pass. */}
          <p className="max-w-[45ch] translate-y-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 text-sm text-sognos-muted">
            {edition.description}
          </p>
        </div>

        {/* Bottom — edition title + accent arrow button */}
        <div className="flex w-full items-center justify-between">
          <h3 className="font-heading text-lg font-medium tracking-tight text-sognos-heading text-balance">
            {title}
          </h3>

          {/* Arrow button: accent fill slides up on hover */}
          <div className="relative isolate flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black/10">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-y-full scale-50 rounded-full transition-transform duration-300 group-hover:translate-y-0 group-hover:scale-100"
              style={{ backgroundColor: edition.accentColor }}
            />
            <div className="relative">
              <svg
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                className="h-5 w-5 text-sognos-heading transition-colors duration-300 group-hover:text-sognos-heading"
              >
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function EditionCards({
  editions,
  showSliderButtons = true,
  containerClassName = "",
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
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <div className={`relative ${containerClassName}`}>
      {showSliderButtons && (
        <div className="mb-5 flex justify-end gap-3">
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
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
