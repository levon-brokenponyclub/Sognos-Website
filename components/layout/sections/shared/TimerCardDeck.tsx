"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";

// Auto-advancing card deck after middesk.com's platform section.
//
// Desktop: a grid whose column fractions animate. The active card takes half
// the row and the rest share the other half, so widening one narrows the others
// in the same transition. Each card's content is translated down so only its
// title shows; the active card slides its content up and fades in the
// description.
//
// Numbers are taken from the reference, which runs a 10px root — its
// `23.5rem` / `0.8rem` / `2.4rem` are 235px / 8px / 24px, not 376/13/38.
const DECK_HEIGHT_PX = 235;
// Must stay equal to the cards' `p-6`. The padding itself is set in CSS; this
// mirrors it for the two things that cannot read it — the translate that parks
// inactive content, and the measured width the description is pinned to.
const CARD_PADDING_PX = 24;
const GAP_PX = 8;
const ACTIVE_FR = 0.5;
const AUTOPLAY_MS = 8000;
const GRID_MS = 800;
const CONTENT_MS = 900;
const FADE_MS = 800;

export type TimerCard = {
  number: string;
  title: string;
  description: string;
  /** Optional CTA, as the reference card carries. */
  href?: string;
  ctaLabel?: string;
};

export default function TimerCardDeck({
  cards,
  autoplayMs = AUTOPLAY_MS,
  active: controlledActive,
  onActiveChange,
}: {
  cards: readonly TimerCard[];
  autoplayMs?: number;
  /** Supply with onActiveChange to drive the deck from outside — e.g. when a
   *  stepper elsewhere on the page has to stay in step with it. */
  active?: number;
  onActiveChange?: (index: number) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [uncontrolledActive, setUncontrolledActive] = useState(0);
  const isControlled = controlledActive !== undefined;
  const active = isControlled ? controlledActive : uncontrolledActive;
  const setActive = useCallback(
    (next: number | ((prev: number) => number)) => {
      const resolve = (prev: number) =>
        typeof next === "function" ? (next as (p: number) => number)(prev) : next;
      if (isControlled) onActiveChange?.(resolve(controlledActive));
      else
        setUncontrolledActive((prev) => {
          const value = resolve(prev);
          onActiveChange?.(value);
          return value;
        });
    },
    [isControlled, controlledActive, onActiveChange],
  );
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Set while the deck is scrolling the mobile track itself. Without it the
  // scroll listener below would read the mid-flight positions of our own
  // smooth scroll as user input and fight the advance it was reacting to.
  const programmaticScrollRef = useRef(false);
  const programmaticTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  // Mirrors `active` for the scroll handler, so the listener can compare
  // against the current index without resubscribing every time it changes.
  const activeRef = useRef(0);
  // Width the active card's text gets. Measured rather than guessed: the
  // description is pinned to it so the copy does not re-wrap on every frame
  // while the columns animate. The reference does the same — its description
  // carries a min-width equal to the active column minus its padding.
  const [activeInnerPx, setActiveInnerPx] = useState(0);

  const count = cards.length;
  const inactiveFr = count > 1 ? ACTIVE_FR / (count - 1) : 1;

  useLayoutEffect(() => {
    const el = deckRef.current;
    if (!el) return;
    const measure = () => {
      const total = el.clientWidth - GAP_PX * (count - 1);
      setActiveInnerPx(Math.max(0, total * ACTIVE_FR - CARD_PADDING_PX * 2));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [count]);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const go = useCallback(
    (i: number) => {
      setActive(((i % count) + count) % count);
      setProgress(0);
    },
    [count, setActive],
  );

  // Autoplay. rAF rather than an interval so the progress ring and the advance
  // share one clock — a separate timer would drift against the ring.
  useEffect(() => {
    if (prefersReducedMotion || paused || count < 2) return;
    let raf = 0;
    let start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / autoplayMs;
      if (t >= 1) {
        start = now;
        setActive((a) => (a + 1) % count);
        setProgress(0);
      } else {
        setProgress(t);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, count, autoplayMs, prefersReducedMotion, active, setActive]);

  // Keep the mobile track on the active card as autoplay advances. Scrolls the
  // track itself rather than calling scrollIntoView, which would also move the
  // page vertically to bring the card into view.
  useEffect(() => {
    const track = mobileTrackRef.current;
    const card = mobileCardRefs.current[active];
    if (!track || !card) return;
    if (track.clientWidth === 0) return; // hidden at this breakpoint

    const left = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    if (Math.abs(track.scrollLeft - left) < 1) return; // already there

    programmaticScrollRef.current = true;
    if (programmaticTimerRef.current) {
      clearTimeout(programmaticTimerRef.current);
    }
    track.scrollTo({
      left,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    // Released on a timer rather than `scrollend`, which Safari only shipped
    // recently — this has to hold for the whole smooth scroll on every browser.
    programmaticTimerRef.current = setTimeout(
      () => {
        programmaticScrollRef.current = false;
      },
      prefersReducedMotion ? 0 : 700,
    );
  }, [active, prefersReducedMotion]);

  // Sync `active` back from a user swipe. Without this the ring keeps counting
  // down on a card the reader has already scrolled away from, and autoplay
  // resumes from wherever it was rather than from what is on screen.
  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!track) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (programmaticScrollRef.current) return;
        const centre = track.scrollLeft + track.clientWidth / 2;
        let nearest = 0;
        let best = Infinity;
        mobileCardRefs.current.forEach((el, i) => {
          if (!el) return;
          const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centre);
          if (d < best) {
            best = d;
            nearest = i;
          }
        });
        // Only on a real change — in controlled mode this would otherwise fire
        // onActiveChange on every frame of every scroll.
        if (nearest !== activeRef.current) go(nearest);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [go]);

  useEffect(() => {
    return () => {
      if (programmaticTimerRef.current) {
        clearTimeout(programmaticTimerRef.current);
      }
    };
  }, []);

  const gridTemplateColumns = cards
    .map((_, i) => `${i === active ? ACTIVE_FR : inactiveFr}fr`)
    .join(" ");

  return (
    <>
      {/* ── Desktop deck ── */}
      <div
        ref={deckRef}
        className="relative hidden md:grid"
        style={{
          height: DECK_HEIGHT_PX,
          gap: GAP_PX,
          gridTemplateColumns,
          transition: prefersReducedMotion
            ? undefined
            : `grid-template-columns ${GRID_MS}ms ease-in-out`,
        }}
      >
        {cards.map((card, i) => {
          const isActive = i === active;
          return (
            <div
              key={card.number}
              onClick={() => go(i)}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              className="relative flex h-full min-w-0 cursor-pointer select-none flex-col overflow-hidden rounded-lg bg-white p-6"
            >
              <span className="block shrink-0 pb-4 font-mono text-xs uppercase text-sognos-muted">
                {card.number}
              </span>

              {isActive && count > 1 && !prefersReducedMotion && (
                <ProgressButton
                  paused={paused}
                  progress={progress}
                  onToggle={(e) => {
                    e.stopPropagation();
                    setPaused((p) => !p);
                  }}
                  autoplayMs={autoplayMs}
                />
              )}

              {/* Inactive content is pushed down by its own height less the
                  card padding, which leaves exactly the title line showing at
                  the bottom edge. */}
              <div
                className="flex flex-1 flex-col"
                style={{
                  transform: isActive
                    ? "translateY(0)"
                    : `translateY(calc(100% - ${CARD_PADDING_PX}px))`,
                  transition: prefersReducedMotion
                    ? undefined
                    : `transform ${CONTENT_MS}ms ease-in-out`,
                }}
              >
                <p className="min-w-0 shrink-0 truncate font-heading text-xl font-normal text-sognos-body">
                  {card.title}
                </p>
                <div
                  className="pt-4"
                  style={{
                    opacity: isActive ? 1 : 0,
                    minWidth: activeInnerPx || undefined,
                    maxWidth: activeInnerPx || undefined,
                    transition: prefersReducedMotion
                      ? undefined
                      : `opacity ${FADE_MS}ms ease-in-out`,
                  }}
                >
                  <p className="line-clamp-3 text-base leading-[1.4] text-gray-600">
                    {card.description}
                  </p>
                  {card.href && (
                    <div className="pt-4">
                      <Link
                        href={card.href}
                        // Inactive cards are visually collapsed, so their link
                        // must leave the tab order too.
                        tabIndex={isActive ? undefined : -1}
                        onClick={(e) => e.stopPropagation()}
                        className="group inline-flex items-center gap-1.5 text-sm font-medium text-sognos-heading transition-colors hover:text-sognos-blue-accent"
                      >
                        {card.ctaLabel ?? "Learn more"}
                        <ArrowRight
                          aria-hidden="true"
                          className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Invisible prev/next regions, as the reference has. */}
        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous card"
              onClick={() => go(active - 1)}
              className="absolute bottom-0 left-0 top-0 z-10 w-1/6 cursor-pointer opacity-0"
            />
            <button
              type="button"
              aria-label="Next card"
              onClick={() => go(active + 1)}
              className="absolute bottom-0 right-0 top-0 z-10 w-1/6 cursor-pointer opacity-0"
            />
          </>
        )}
      </div>

      {/* ── Mobile deck — horizontal track, after the reference's md:hidden ──
          75vw cards on a real overflow-x track rather than the reference's
          translateX, so a swipe works natively; autoplay keeps the active card
          scrolled into view. Each card uses the reference's four-row grid:
          eyebrow, a spacer that collapses when active, title, then the body
          that expands into the space the spacer gave up — which is what slides
          the title down to the card's foot while it is inactive. */}
      <div
        ref={mobileTrackRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain scroll-smooth md:hidden"
      >
        {cards.map((card, i) => {
          const isActive = i === active;
          return (
            <div
              key={card.number}
              ref={(el) => {
                mobileCardRefs.current[i] = el;
              }}
              onClick={() => go(i)}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              className="relative grid min-h-[220px] w-[75vw] shrink-0 cursor-pointer select-none snap-center overflow-hidden rounded-lg bg-white p-6"
              style={{
                gridTemplateRows: isActive
                  ? "auto 0fr auto 1fr"
                  : "auto 1fr auto 0fr",
                transition: prefersReducedMotion
                  ? undefined
                  : `grid-template-rows ${FADE_MS}ms ease-in-out`,
              }}
            >
              <span className="block pb-4 font-mono text-xs uppercase text-sognos-muted">
                {card.number}
              </span>

              {isActive && count > 1 && !prefersReducedMotion && (
                <ProgressButton
                  paused={paused}
                  progress={progress}
                  onToggle={(e) => {
                    e.stopPropagation();
                    setPaused((p) => !p);
                  }}
                  autoplayMs={autoplayMs}
                />
              )}

              {/* Spacer row — holds the title down until this card is active. */}
              <div aria-hidden="true" className="min-h-0 overflow-hidden" />
              <p className="font-heading text-xl font-medium text-sognos-body">
                {card.title}
              </p>
              {/* Pinned to the card's inner width — 75vw less the 24px padding
                  either side — so the copy does not re-wrap while the row
                  heights animate. The reference does the same on mobile with a
                  hard `min-width`. */}
              <div
                className="flex min-h-0 min-w-[calc(75vw-48px)] flex-col overflow-hidden pt-4"
                style={{
                  opacity: isActive ? 1 : 0,
                  transition: prefersReducedMotion
                    ? undefined
                    : `opacity ${FADE_MS}ms ease-in-out`,
                }}
              >
                <p className="text-base leading-[1.4] text-gray-600">
                  {card.description}
                </p>
                {card.href && (
                  <Link
                    href={card.href}
                    tabIndex={isActive ? undefined : -1}
                    onClick={(e) => e.stopPropagation()}
                    className="group mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-sognos-heading transition-colors hover:text-sognos-blue-accent"
                  >
                    {card.ctaLabel ?? "Learn more"}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// Circular countdown ring. Two semicircle arcs drawn in sequence — the first
// covers the opening half of the interval, the second the closing half — each
// with pathLength 1 so the dash offset is just the remaining fraction.
function ProgressButton({
  paused,
  progress,
  onToggle,
  autoplayMs,
}: {
  paused: boolean;
  progress: number;
  onToggle: (e: React.MouseEvent) => void;
  autoplayMs: number;
}) {
  const clamp = (n: number) => Math.min(1, Math.max(0, n));
  const phase1 = 1 - clamp(progress * 2);
  const phase2 = 1 - clamp(progress * 2 - 1);

  return (
    <div className="absolute right-6 top-6 z-10">
      <button
        type="button"
        onClick={onToggle}
        aria-label={paused ? "Play carousel" : "Pause carousel"}
        title={`Autoplay duration: ${Math.round(autoplayMs / 1000)}s`}
        className="group relative flex size-10 cursor-pointer items-center justify-center rounded-full text-sognos-body transition-colors"
      >
        <svg
          className="pointer-events-none absolute inset-0"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <circle
            cx="16"
            cy="16"
            r="15"
            className="fill-none stroke-sognos-line"
            strokeWidth="1"
          />
          <path
            className="fill-none stroke-sognos-body"
            strokeWidth="1"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={phase1}
            strokeLinecap="round"
            d="M 16,1 A 15,15 0 0,0 16,31"
          />
          <path
            className="fill-none stroke-sognos-body"
            strokeWidth="1"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={phase2}
            strokeLinecap="round"
            d="M 16,31 A 15,15 0 0,0 16,1"
          />
        </svg>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          aria-hidden="true"
          className="relative z-10 size-3 fill-current"
        >
          {paused ? (
            <path d="M2 1l8 5-8 5z" />
          ) : (
            <>
              <rect x="2" y="1" width="3" height="11" />
              <rect x="7" y="1" width="3" height="11" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}
