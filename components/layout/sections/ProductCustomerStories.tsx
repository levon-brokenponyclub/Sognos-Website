"use client";

// Testimonial track, after routable.com's "Leading teams scale payouts" — a
// row of equal-height quote cards, arrow-paged, bleeding past the container's
// right edge under a fade.
//
// Kept on the dark surface rather than the reference's white. That translates
// cleanly because its card has no fill of its own: it is white on a white
// section, defined only by the dotted rules above and below it. Here the same
// card is defined by dotted white/20 rules on the dark panel.
//
// Chosen over the two-column single quote this replaces for four reasons:
//   · three stories are visible at once rather than one behind a timer;
//   · it is not capped at three the way the old indicator row was, so all of
//     Sanity's stories can be used;
//   · `flex-1` on the quote with `mt-auto` on the attribution lines the names
//     up across cards however long the quotes run;
//   · arrows put the reader in control, so there is no timer, ring or pause.
//
// The reference's avatars are deliberately left out.
//
// Both previous builds are in ProductCustomerStories.backup.tsx.
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ElegantDarkPattern from "@/components/layout/sections/shared/ElegantDarkPattern";

export type CaseStudy = {
  company: string;
  companySize: string;
  industry: string;
  logo: string;
  panelImage: string;
  panelVideo?: string;
  quote: string;
  /** The story's short description, from Sanity. */
  description?: string;
  /** Verbatim substring of `quote` to sit behind a translucent block, the
   *  reference's own emphasis. Ignored if it is not found in the quote. */
  highlight?: string;
  author: string;
  role: string;
  href: string;
  brandColor?: string;
};

// Must stay equal to the track's `gap-10`, or arrow paging drifts by the
// difference on every press.
const CARD_GAP_PX = 40;

export const ALL_STORIES: CaseStudy[] = [
  {
    company: "Flourish Australia",
    companySize: "1,100+",
    industry: "Health & Social Care",
    logo: "/logos/flourish-australia-logo.png",
    panelImage: "/images/customers/flourish-australia.avif",
    quote:
      "Congratulations and well done to everyone that has been a part of this magnificent success! You should all be very proud of the quality of work you produce. You make us very proud - Thank you!",
    highlight: "very proud of the quality of work you produce",
    description:
      "Leading not-for-profit organisation supporting people with lived experience of mental health issues to live fulfilling, independent lives.",
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
    highlight: "such a successful implementation",
    description:
      "New Zealand's largest and busiest airport, serving as a critical gateway for international and domestic travel and freight.",
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
    highlight: "moved from reactive to proactive compliance",
    description:
      "Local government council in New South Wales, Australia, transforming field operations management with a custom Dynamics 365 solution.",
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
    highlight: "has not disappointed us in any of our key requirements",
    author: "Operations Team",
    role: "Gentari Solar Australia",
    href: "/customer-stories/gentari",
  },
];

export function SeeMoreLink({
  className,
  href = "/customer-stories",
  label = "See more customer stories",
}: {
  className?: string;
  href?: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-x-1 text-base font-medium ${className ?? ""}`}
    >
      <span>{label}</span>
      <span className="ml-1 inline-flex transition-all duration-300 ease-in-out group-hover:ml-2">
        <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" className="w-3">
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
  );
}

// The reference sets its emphasised phrase word by word, each word its own
// inline-block with a translucent panel behind it. Per word rather than one
// panel across the phrase because the phrase wraps — a single panel would draw
// one rectangle across the line break and swallow the gap between lines.
function Quote({ quote, highlight }: { quote: string; highlight?: string }) {
  const at = highlight ? quote.indexOf(highlight) : -1;

  if (at === -1) return <>{quote}</>;

  return (
    <>
      {quote.slice(0, at)}
      <span className="relative inline">
        {highlight!.split(" ").map((word, i) => (
          <span key={`${word}-${i}`} className="relative inline-block">
            <span aria-hidden="true" className="absolute inset-0 bg-white/20" />
            <span className="relative z-[2] inline-block">{word}&nbsp;</span>
          </span>
        ))}
      </span>
      {quote.slice(at + highlight!.length)}
    </>
  );
}

function StoryCard({ study }: { study: CaseStudy }) {
  return (
    // No fill. The reference's card is white on a white section — only the
    // dotted rules above and below define it, so here it is the same card on
    // dark.
    //
    // Deliberately no `h-full`. The track is `items-stretch`, which already
    // gives every card the height of the tallest; `height: 100%` against a
    // parent with no resolved height computes to `auto` instead and cancels
    // the stretch, which is what left the meta rows at three different
    // heights.
    <article
      data-card
      className="flex w-[85vw] shrink-0 snap-start flex-col border-y border-dotted border-white/25 py-7 pr-6 sm:w-[440px] md:py-8 lg:w-[505px]"
    >
      {/* Logo at the head of the card. The fixed minimum is what makes the
          quotes below start on one line across the row — the client marks are
          different heights, and without it each quote would begin wherever its
          own logo happened to end. */}
      <div className="mb-3 flex min-h-[40px] flex-col justify-center md:mb-5 md:min-h-[60px]">
        {study.logo && (
          <Image
            src={study.logo}
            alt={study.company}
            width={182}
            height={47}
            // Flattened to white so a mixed set of client marks reads as one
            // family on the dark panel.
            className="max-h-[2rem] w-auto object-contain object-left brightness-0 invert md:max-h-[2.5rem]"
          />
        )}
      </div>

      {/* `flex-1` is the other half of the alignment: the quote absorbs the
          slack, so every card's meta row sits on the same line however long
          its copy runs. */}
      <blockquote className="mb-6 flex-1 font-heading text-xl font-light leading-normal text-white before:hidden after:hidden md:mb-8">
        <Quote quote={study.quote} highlight={study.highlight} />
      </blockquote>

      <div className="mt-auto flex flex-col pb-2">
        <span className="text-base font-medium text-white">{study.author}</span>
        <span className="text-base text-white/70">{study.role}</span>
      </div>
    </article>
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
      aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white opacity-60 transition-opacity duration-300 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-20"
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

interface ProductCustomerStoriesProps {
  stories?: CaseStudy[];
  /** Optional — most callers wrap this section with their own heading, so the
   *  arrows sit alone on the row when it is omitted. */
  heading?: string;
}

export default function ProductCustomerStories({
  stories = ALL_STORIES,
  heading,
}: ProductCustomerStoriesProps) {
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

  if (stories.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden bg-sognos-navy-darkest text-white">
      <ElegantDarkPattern />

      <div className="relative z-10 py-12 md:py-24 lg:py-32">
        <div className="mx-auto mb-8 flex max-w-7xl items-end justify-between gap-2 px-6 md:mb-12 md:items-center lg:mb-20">
          {heading ? (
            <h2 className="font-heading text-3xl font-normal tracking-tight text-white text-balance md:text-4xl">
              {heading}
            </h2>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-2">
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

        {/* Same container as the header row above — `max-w-7xl mx-auto px-6`
            — so the first card's left edge lines up with the heading and the
            track's right edge stops on the measure. Without it the track ran
            full-bleed and the cards sat off the grid. */}
        <div className="relative mx-auto max-w-7xl px-6">
          <div
            ref={scrollerRef}
            onScroll={updateArrows}
            className="scrollbar-hide flex snap-x snap-mandatory items-stretch gap-10 overflow-x-auto overscroll-x-contain scroll-smooth"
          >
            {stories.map((study) => (
              <StoryCard key={study.href} study={study} />
            ))}
          </div>

          {/* Sits inside the container's right padding, so it fades the last
              visible card rather than the page edge. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-6 hidden w-24 bg-gradient-to-l from-sognos-navy-darkest to-transparent xl:block"
          />
        </div>

        {/* Structured data — the reference ships one `Review` per testimonial,
            and this section is literally social proof, so it is worth the same
            treatment. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": stories.map((s) => ({
                "@type": "Review",
                reviewBody: s.quote,
                author: {
                  "@type": "Person",
                  name: s.author,
                  jobTitle: s.role,
                },
                itemReviewed: {
                  "@type": "SoftwareApplication",
                  name: "Sognos",
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}
