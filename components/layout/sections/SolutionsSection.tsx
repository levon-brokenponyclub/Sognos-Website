"use client";

// Horizontal card slider. Swapped with IndustrySection: solutions used to be
// the sticky stack and industries the slider.
import { useCallback, useEffect, useRef, useState } from "react";
import SlideFillLink from "@/components/layout/sections/shared/SlideFillLink";

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
  heading = "Solutions",
  description = "Supporting engagements that extend SognosCare and SognosRoster — from field service and CRM through to Power Platform and rapid deployment.",
}: {
  heading?: string;
  description?: string;
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
      className="w-full bg-sognos-tint border-b border-sognos-line"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:py-28">
        {/* Centred heading over subtext, arrows beneath — the same header
            block IndustrySection uses, so the two homepage sections read as
            one system. The arrows moved below the copy rather than beside it:
            centred type with a control hanging off one side reads lopsided,
            and the heading no longer has a fixed width to balance against. */}
        <div className="flex w-full flex-col items-center gap-8 pb-10 text-center">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl font-medium tracking-tight text-sognos-heading text-balance md:text-5xl">
              {heading}
            </h2>
            {description && (
              <p className="mt-4 text-lg leading-relaxed text-sognos-body text-balance">
                {description}
              </p>
            )}
          </div>
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
            // A div, not a link: the card now carries its own `SlideFillLink`,
            // and an anchor inside an anchor is invalid — the browser closes
            // the outer one early and the card falls apart.
            <div
              key={s.id}
              data-card
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
              // `gap-7` rather than the `gap-12` this had before the CTA. The
              // height is fixed by the aspect ratio, so a third child at 44px
              // plus a second gap has to come out of the spacing: at `gap-12`
              // the column overran by 11px, at `gap-8` by 3px, which left
              // `mt-auto` no slack to pin the button against the bottom
              // padding. At `gap-7` it fits with room to spare.
              className="group/card relative isolate flex aspect-[334/354] shrink-0 snap-start flex-col items-start justify-start gap-7 overflow-hidden rounded-lg bg-white p-6 w-[calc(100%-56px)] md:w-[calc((100%-64px)/2)] lg:w-[calc((100%-144px)/3)]"
            >
              {/* 8px accent square, inset by the card's own 24px padding. */}
              <span
                aria-hidden="true"
                className="absolute right-6 top-6 h-2 w-2 bg-sognos-blue-accent"
              />

              {/* 104×104, the reference's icon size — the SVG is authored at
                  exactly that, so it needs no scaling. Decorative, so the alt
                  is empty and it stays out of the accessibility tree; the card
                  is already labelled by its heading. One placeholder for all
                  seven until per-solution icons exist.

                  A plain <img>, not next/image: the optimizer returns 400 for
                  SVG unless `dangerouslyAllowSVG` is set in next.config, and
                  turning that on site-wide to serve a 2.6KB local file is not
                  a trade worth making. There is nothing to optimise here. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/solutions/icon-placeholder.svg"
                alt=""
                width={104}
                height={104}
                className="shrink-0"
              />

              {/* 16px title-to-copy and a 16px right inset, per the reference's
                  text group. Both are weight 400 — it has no weight step
                  between them. */}
              <div className="flex flex-col items-start justify-start gap-4 self-stretch pr-5">
                {/* Clamped to two lines from lg, with a matching min-height —
                    the clamp alone caps a long title but leaves a one-line
                    title short, so the copy below would still start at a
                    different height on each card. `leading-8` pins the line box
                    to 32px so `min-h-16` is provably exactly two lines. */}
                <h3 className="font-heading text-xl font-normal leading-normal text-sognos-heading transition-colors duration-200 group-hover/card:text-sognos-blue-accent">
                  {s.label}
                </h3>
                <p className="text-base font-normal leading-normal text-sognos-body">
                  {s.copy}
                </p>
              </div>

              {/* Pinned to the card's foot, so the CTA sits on one line across
                  the row whatever the copy above it runs to. `shrink-0` is not
                  optional: the card's height is fixed by its aspect ratio, so
                  without it the flex layout crushes the button to a sliver
                  rather than letting the column overflow. */}
              <SlideFillLink
                href={s.href}
                label="Learn more"
                className="mt-auto shrink-0"
              />
            </div>
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
