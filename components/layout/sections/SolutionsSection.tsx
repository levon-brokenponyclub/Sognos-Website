"use client";

// Horizontal card slider. Swapped with IndustrySection: solutions used to be
// the sticky stack and industries the slider.
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

// Must stay equal to the track's `gap-2`, or arrow paging drifts by the
// difference on every press.
const CARD_GAP_PX = 8;

type Solution = {
  id: string;
  label: string;
  href: string;
  title: string;
  copy: string;
  image: string;
};

const SOLUTIONS: Solution[] = [
  {
    id: "frontline",
    label: "Frontline",
    href: "/solutions/frontline",
    title: "End-to-end field service management",
    copy: "Coordinate mobile teams, manage visits and appointments, and keep every service connected from the field to the office.",
    image:
      "https://plus.unsplash.com/premium_photo-1681967118118-586c2408d0fc?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "crm",
    label: "CRM",
    href: "/solutions/customer-relationship-management",
    title: "A complete client relationship record",
    copy: "Centralise every client interaction, service history, and communication in one place — giving every team member the context they need.",
    image:
      "https://images.unsplash.com/photo-1748609160056-7b95f30041f0?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "customer-insights",
    label: "Customer Insights",
    href: "/solutions/customer-insights",
    title: "Turn service data into operational intelligence",
    copy: "Unified data from care records, rostering, and field operations — surfaced as live dashboards that show what's working and where to act.",
    image:
      "https://plus.unsplash.com/premium_photo-1682126285167-4bbf25c628c6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "customer-experience",
    label: "Customer Experience",
    href: "/solutions/customer-experience",
    title: "Consistent service quality at every touchpoint",
    copy: "From first contact through ongoing delivery, every interaction is tracked, measured, and optimised for consistent service quality.",
    image:
      "https://images.unsplash.com/photo-1586936893354-362ad6ae47ba?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "customer-service",
    label: "Customer Service",
    href: "/solutions/customer-service",
    title: "Faster resolution, clearer accountability",
    copy: "Unified case management, escalation workflows, and response tracking — so every issue is owned, actioned, and closed on time.",
    image:
      "https://plus.unsplash.com/premium_photo-1661573764813-a6ae0ea91e37?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "power-platform",
    label: "Power Platform",
    href: "/solutions/power-platform",
    title: "Extend and automate without engineering overhead",
    copy: "Power Apps, Power Automate, and Power Pages built into the Sognos platform so your team can customise workflows without writing code.",
    image:
      "https://plus.unsplash.com/premium_photo-1663134266506-248c1ca36909?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "quick-start",
    label: "Quick Start",
    href: "/solutions/quick-start",
    title: "Live in weeks, not months",
    copy: "Sognos Quick Start delivers a production-ready deployment in four weeks — pre-built configuration, training, and go-live support included.",
    image:
      "https://plus.unsplash.com/premium_photo-1727356845265-18e80b32081d?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function SolutionsSection({
  heading = "One intelligent platform for demand, workforce, and outcomes",
}: {
  heading?: string;
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
    const step = card ? card.offsetWidth + CARD_GAP_PX : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    // Grey surface so the white cards read against it — the reference's cards
    // are white on a light page, and white-on-white would be invisible.
    <section
      id="solutions"
      className="w-full bg-gray-50 border-b border-sognos-line"
    >
      <div className="max-w-7xl w-full mx-auto px-6 py-16 lg:py-24">
        {/* Heading left, arrows right */}
        <div className="flex w-full items-end justify-between gap-6 pb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-tight text-sognos-heading max-w-4xl">
            {heading}
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

        <div
          ref={scrollerRef}
          onScroll={updateArrows}
          className="flex snap-x snap-mandatory gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SOLUTIONS.map((s) => (
            <Link
              key={s.id}
              href={s.href}
              data-card
              aria-label={s.label}
              // Widths are a fraction of the visible track, not fixed px, so
              // the card count per view is exact and the next card peeks by a
              // deliberate amount. For n cards in view the track holds n cards
              // + n gaps + the peek, so w = (100% − n·8px − peek) / n: 3 up
              // from lg, 2 at md, 1 below.
              //
              // The peek is 120px from lg and 48px below it — the same 120px
              // on a 375px screen would eat half the card. To retune, change
              // the peek in the subtraction: lg is 3·8 + 120 = 144.
              // `snap-start` keeps each card flush to the left edge.
              className="group/card relative isolate flex aspect-[334/354] shrink-0 snap-start flex-col items-start justify-start gap-12 overflow-hidden rounded-lg bg-white p-6 w-[calc(100%-56px)] md:w-[calc((100%-64px)/2)] lg:w-[calc((100%-144px)/3)]"
            >
              {/* 8px accent square, inset by the card's own 24px padding. */}
              <span
                aria-hidden="true"
                className="absolute right-6 top-6 h-2 w-2 bg-sognos-blue-accent"
              />

              {/* 16px title-to-copy and a 16px right inset, per the reference's
                  text group. Both are weight 400 — it has no weight step
                  between them. */}
              <div className="flex flex-col items-start justify-start gap-4 self-stretch pr-4">
                <h3 className="font-heading text-xl font-normal text-sognos-heading transition-colors duration-200 group-hover/card:text-sognos-blue-accent">
                  {s.title}
                </h3>
                <p className="text-base font-normal leading-[1.4] text-sognos-body">
                  {s.copy}
                </p>
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
