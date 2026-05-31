"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  dark?: boolean;
}

function EditionCard({
  edition,
  cardWidthClass = "lg:w-[31.5%]",
}: {
  edition: Edition;
  cardWidthClass?: string;
}) {
  const title = edition.label || edition.name || "";

  return (
    <article
      className={`rounded-lg bg-white p-2 h-[450px] lg:h-[445px] flex-shrink-0 snap-center w-[82vw] ${cardWidthClass}`}
    >
      {/* Inner panel — accent colour throughout (no video bg) */}
      <div className="relative h-full rounded-lg overflow-hidden flex flex-col">
        {/* Logo — centered in upper zone */}
        <div className="flex-1 flex items-center justify-center px-8 pb-[285px]">
          <Image
            src={edition.logo}
            alt={title}
            width={160}
            height={40}
            className="max-w-44 object-contain"
          />
        </div>

        {/* Content — bottom panel, accent bg, white text */}
        <div
          className="absolute bottom-0 rounded-lg left-0 right-0 z-10 px-7 pt-10 pb-8"
          style={{
            backgroundColor: `${edition.accentColor}e6`,
          }}
        >
          <h2 className="font-heading text-[24px] font-medium leading-tight tracking-normal whitespace-pre-line  transition-colors duration-500 text-white">
            {title}
          </h2>
          <p className="mt-4 max-w-sm font-heading font-normal leading-relaxed text-white/90 lg:text-md line-clamp-4">
            {edition.description}
          </p>
          <div className="mt-5">
            <Link
              href={edition.href}
              className="inline-flex items-center gap-2.5 text-md font-semibold text-white hover:opacity-70 transition-opacity"
            >
              View Edition
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/25 text-white shrink-0">
                <svg
                  width="12"
                  height="12"
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
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function EditionCards({
  editions,
  showSliderButtons = true,
  containerClassName = "",
  dark = false,
}: EditionCardsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  // When > 3 cards, reduce width so 4th card peeks (indicate scroll)
  const hasMoreThanThree = editions.length > 3;
  const cardWidthClass = hasMoreThanThree ? "lg:w-[28%]" : "lg:w-[31.5%]";

  const scroll = (dir: "prev" | "next") => {
    const el = sliderRef.current;
    if (!el) return;
    const cardW = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 16
      : el.offsetWidth;
    el.scrollBy({ left: dir === "next" ? cardW : -cardW, behavior: "smooth" });
  };

  return (
    <div className={`relative ${containerClassName}`}>
      <div
        ref={sliderRef}
        className="flex gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
      >
        {editions.map((edition) => (
          <EditionCard
            key={edition.href}
            edition={edition}
            cardWidthClass={cardWidthClass}
          />
        ))}
      </div>

      {showSliderButtons && (
        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            onClick={() => scroll("prev")}
            className={`flex items-center justify-center w-10 h-10 rounded-full border border-dashed transition-colors ${
              dark
                ? "border-white/30 text-white hover:border-white"
                : "border-sognos-border-subtle text-prussian-blue-800 hover:border-prussian-blue-800"
            }`}
            aria-label="Previous edition"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => scroll("next")}
            className={`flex items-center justify-center w-10 h-10 rounded-full border border-dashed transition-colors ${
              dark
                ? "border-white/30 text-white hover:border-white"
                : "border-sognos-border-subtle text-prussian-blue-800 hover:border-prussian-blue-800"
            }`}
            aria-label="Next edition"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
