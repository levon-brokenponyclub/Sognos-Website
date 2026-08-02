"use client";

// Testimonial slider, ported from Middesk's testimonial section
// (middesk.com/solutions/use-cases/lending). One white card — image left,
// logo / quote / attribution right — sitting above a row of blocks that
// double as the slide indicator: one block per story, click to jump. The
// countdown ring is TimerCardDeck's, shared rather than reimplemented, and the
// per-element crossfade is the split-testimonial pattern
// (21st.dev/@jatin-yadav05/components/split-testimonial).
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ProgressButton } from "@/components/layout/sections/shared/TimerCardDeck";
import { BRAND_BG } from "@/lib/customerStoryBrand";

export type CaseStudy = {
  company: string;
  companySize: string;
  industry: string;
  logo: string;
  panelImage: string;
  panelVideo?: string;
  quote: string;
  author: string;
  role: string;
  href: string;
  brandColor?: string;
};

const AUTOPLAY_MS = 10000;

// The reference's curve for anything that travels — a hard ease-out that
// covers most of the distance early and settles. Same curve `AboutStats` rolls
// its numbers on.
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

// Hard cap. Callers pass whatever they have — Sanity, or an industry filter
// that can return one — but the indicator row is only legible at three blocks
// across, so anything past the third is dropped rather than shrunk.
const MAX_STORIES = 3;

export const ALL_STORIES: CaseStudy[] = [
  {
    company: "Flourish Australia",
    companySize: "1,100+",
    industry: "Health & Social Care",
    logo: "/logos/flourish-australia-logo.png",
    panelImage: "/images/customers/flourish-australia.avif",
    quote:
      "Congratulations and well done to everyone that has been a part of this magnificent success! You should all be very proud of the quality of work you produce. You make us very proud - Thank you!",
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
      className={`group inline-flex items-center gap-x-1 text-base font-medium text-sognos-heading ${className ?? ""}`}
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

// Reference's easing and duration for the slide-fill button. Written as a
// constant, not repeated inline — Tailwind scans this file's raw text for
// candidates, so the literal below is what gets emitted.
const SLIDE_FILL_MOTION =
  "duration-500 ease-[cubic-bezier(0.77,0.01,0.26,1.01)]";

// Outlined pill whose fill rises from below on hover while the label rolls up
// and is replaced by its own duplicate in the inverse colour — middesk.com's
// button. The duplicate is what makes it read as one label moving through the
// button rather than two crossfading, so it is `aria-hidden` and the visible
// label carries the text.
export function SlideFillLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      // 16px/4px padding and a 500ms border fade, per the reference. `border`
      // rather than its `outline` at a -0.5px offset: the fill covers the
      // padding box and leaves the border showing, which is the same result
      // with one less thing to reason about.
      className={`group relative inline-flex items-center overflow-hidden rounded-lg border border-sognos-line px-4 py-1 transition-colors ${SLIDE_FILL_MOTION} hover:border-sognos-blue-accent ${className ?? ""}`}
    >
      {/* Full-height panel parked directly below the button, driven by `top`
          rather than a transform so it cannot inherit the label's movement. */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-full h-full bg-sognos-blue-accent transition-[top] ${SLIDE_FILL_MOTION} group-hover:top-0`}
      />

      {/* Clips both labels to one line's height, so each leaves and arrives
          out of sight rather than overrunning the button. */}
      <span className="relative flex items-center justify-center overflow-hidden">
        <span
          className={`relative z-10 block py-1 text-base font-medium text-sognos-heading transition-transform ${SLIDE_FILL_MOTION} group-hover:-translate-y-full`}
        >
          {label}
        </span>
        <span
          aria-hidden="true"
          className={`absolute left-0 top-full z-10 py-1 text-base font-medium text-white transition-transform ${SLIDE_FILL_MOTION} group-hover:-translate-y-full`}
        >
          {label}
        </span>
      </span>
    </Link>
  );
}

// Double-prime mark above the quote, 10×9 at its authored size.
function QuoteMark() {
  return (
    <svg
      width="10"
      height="9"
      viewBox="0 0 10 9"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-sognos-heading"
    >
      <path
        d="M3.39344 0V1.69672C2.65574 1.9918 1.84426 2.58197 1.84426 4.46311H3.43033V8.11475H0V4.38935C0 1.9918 1.2541 0.442622 3.39344 0ZM8.96311 0V1.69672C8.22541 1.9918 7.41393 2.58197 7.41393 4.46311H9V8.11475H5.56967V4.38935C5.56967 1.9918 6.82377 0.442622 8.96311 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface ProductCustomerStoriesProps {
  stories?: CaseStudy[];
}

export default function ProductCustomerStories({
  stories = ALL_STORIES,
}: ProductCustomerStoriesProps) {
  const visible = stories.slice(0, MAX_STORIES);
  const total = visible.length;
  const showIndicator = total > 1;

  const prefersReducedMotion = useReducedMotion();
  const autoplay = showIndicator && !prefersReducedMotion;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  // Guards an index left past the end when a caller swaps to a shorter list.
  const activeIndex = Math.min(selectedIndex, total - 1);
  const active = visible[activeIndex];

  // Autoplay and the countdown ring share one rAF loop, the same clock
  // TimerCardDeck uses — two timers would let the ring drift against the story
  // it describes. The elapsed time resets on every selection, so clicking a
  // block restarts the full interval rather than inheriting a part-spent one.
  useEffect(() => {
    if (!autoplay || paused) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed >= AUTOPLAY_MS) {
        setProgress(0);
        setSelectedIndex((i) => (i + 1) % total);
        return;
      }
      setProgress(elapsed / AUTOPLAY_MS);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoplay, paused, selectedIndex, total]);

  const select = useCallback((i: number) => {
    setProgress(0);
    setSelectedIndex(i);
  }, []);

  // ── Mobile indicator track ────────────────────────────────────────────────
  // Below `md` the blocks are a real overflow-x track rather than a stack, the
  // same treatment `TimerCardDeck` gives its cards. All of this is inert from
  // `md` up, where the track is `overflow-visible` and `scrollTo` no-ops.
  const trackRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Set while we are scrolling the track ourselves. Without it the listener
  // below reads the mid-flight positions of our own smooth scroll as user
  // input and fights the advance it is reacting to.
  const programmaticScrollRef = useRef(false);
  const programmaticTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  // Mirrors the active index for the scroll listener, so it can compare against
  // the current value without resubscribing every time that changes.
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  // Keep the track on the active block as autoplay advances. Scrolls the track
  // itself rather than `scrollIntoView`, which would also move the page
  // vertically to bring the block into view.
  useEffect(() => {
    const track = trackRef.current;
    const block = blockRefs.current[activeIndex];
    if (!track || !block) return;
    // From `md` the track is not a scroller — nothing to bring into view.
    if (track.scrollWidth <= track.clientWidth) return;

    const left = block.offsetLeft - (track.clientWidth - block.offsetWidth) / 2;
    if (Math.abs(track.scrollLeft - left) < 1) return; // already there

    programmaticScrollRef.current = true;
    if (programmaticTimerRef.current) clearTimeout(programmaticTimerRef.current);
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
  }, [activeIndex, prefersReducedMotion]);

  // Sync the active story back from a swipe. Without it the ring keeps counting
  // down on a story the reader has already scrolled away from.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (programmaticScrollRef.current) return;
        const centre = track.scrollLeft + track.clientWidth / 2;
        let nearest = 0;
        let best = Infinity;
        blockRefs.current.forEach((el, i) => {
          if (!el) return;
          const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centre);
          if (d < best) {
            best = d;
            nearest = i;
          }
        });
        if (nearest !== activeRef.current) select(nearest);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [select]);

  useEffect(
    () => () => {
      if (programmaticTimerRef.current) {
        clearTimeout(programmaticTimerRef.current);
      }
    },
    [],
  );

  // A caller can hand over an empty list — a Sanity query that matched nothing.
  // Rendering an empty card is worse than rendering no section, and reading
  // `visible[0]` off it would throw. After the hooks, so the order is stable.
  if (total === 0) return null;

  return (
    <section id="stories" className="w-full bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-24">
        {/* Heading */}
        <div className="flex items-end justify-between gap-x-6 gap-y-6 pb-10 max-sm:flex-col max-sm:items-start">
          <h2 className="font-heading text-3xl font-normal tracking-tight text-balance text-sognos-heading md:text-4xl">
            Customer Stories
          </h2>
          <SeeMoreLink className="max-sm:hidden" />
        </div>

        {/* Card and indicator are one unit, separated by the reference's 8px.
            The ring is anchored here rather than inside a slide, so there is
            one countdown rather than one per story. */}
        <div className="relative flex flex-col gap-2">
          {autoplay && (
            <ProgressButton
              paused={paused}
              progress={progress}
              autoplayMs={AUTOPLAY_MS}
              onToggle={() => setPaused((p) => !p)}
            />
          )}

          {/* One card, its contents swapped in place — there is no track to
              slide. See the note on StoryCard. */}
          <StoryCard study={active} />

          {showIndicator && (
            // Below `md` this is the reference's mobile track — 75vw blocks on
            // a real overflow-x scroller, so a swipe works natively, matching
            // `HowSognosWorks`. From `md` the overflow goes away and the same
            // blocks lay out as equal columns.
            <div
              ref={trackRef}
              // `relative` so the blocks' `offsetLeft` is measured against the
              // track and not some ancestor — the scroll maths depends on it.
              className="scrollbar-hide relative flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain scroll-smooth md:snap-none md:overflow-x-visible"
            >
              {visible.map((study, i) => (
                <IndicatorBlock
                  key={study.href}
                  study={study}
                  index={i}
                  active={i === activeIndex}
                  onSelect={() => select(i)}
                  blockRef={(el) => {
                    blockRefs.current[i] = el;
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <SeeMoreLink className="mt-10 sm:hidden" />
      </div>
    </section>
  );
}

// The card is a fixed shell whose contents are swapped in place, each element
// on its own curve — the split-testimonial pattern
// (21st.dev/@jatin-yadav05/components/split-testimonial). Every `AnimatePresence`
// sits outside the element it animates and keys on the story, so a change of
// story runs an exit then an enter; `mode="wait"` keeps the two from
// overlapping. `min-h` holds the shell steady, since quote lengths differ and
// the card would otherwise resize under the transition.
function StoryCard({ study }: { study: CaseStudy }) {
  const prefersReducedMotion = useReducedMotion();

  // Reduced motion keeps the swap — just without the travel, blur or delay.
  const t = (seconds: number, delay = 0) =>
    prefersReducedMotion
      ? { duration: 0 }
      : { duration: seconds, delay, ease: EASE_OUT_EXPO };

  const shift = (y: number) => (prefersReducedMotion ? 0 : y);

  return (
    <div className="flex w-full flex-col items-start gap-4 overflow-hidden rounded-lg bg-white p-4 md:min-h-[360px] md:flex-row md:gap-12 md:p-6">
      {/* Media — a quarter of the card, matching the reference's 3/12, and
          stretched to the text column's height rather than a fixed ratio. */}
      <div className="relative aspect-[4/3] w-full flex-none overflow-hidden rounded-lg bg-gray-50 md:aspect-auto md:w-3/12 md:self-stretch">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={study.href}
            initial={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)", scale: 0.95 }}
            transition={t(0.6)}
            className="absolute inset-0"
          >
            {study.panelVideo ? (
              <video
                src={study.panelVideo}
                autoPlay
                muted
                playsInline
                loop
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : study.panelImage ? (
              <Image
                src={study.panelImage}
                alt=""
                fill
                sizes="(min-width: 768px) 25vw, 100vw"
                className="object-cover"
              />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Text — logo pinned top, quote group bottom. The right inset keeps the
          quote off the card edge at width, as the reference does; it steps up
          with the viewport instead of running to the full 204px, and clears
          the countdown ring sitting in the card's top-right corner. */}
      <div className="flex min-w-[200px] flex-1 flex-col justify-between gap-8 self-stretch max-md:w-full md:pr-6 lg:pr-12 xl:pr-24">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={study.href}
            initial={{ opacity: 0, y: shift(10) }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shift(-10) }}
            transition={t(0.3)}
            className="h-8"
          >
            {study.logo ? (
              <Image
                src={study.logo}
                alt={study.company}
                width={140}
                height={40}
                // Flattened to a black silhouette so a mixed set of client
                // marks reads as one family on white, the same treatment the
                // archive cards use inverted on dark.
                className="h-8 w-auto max-w-[160px] object-contain object-left brightness-0"
              />
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col items-start gap-4">
          <QuoteMark />

          {/* Clips the quote's travel so it rises into place rather than
              overrunning the attribution below it. */}
          <div className="relative w-full overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={study.href}
                initial={{ opacity: 0, y: shift(40) }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shift(-40) }}
                transition={t(0.5)}
                className="before:hidden after:hidden"
              >
                {/* `text-3xl` is 32px/1.1 — the reference's quote size exactly.
                    `leading-heading` restates it so the 24px mobile step keeps
                    the same 1.1 instead of the 1.3 that `text-2xl` carries. */}
                <p className="font-heading text-2xl font-normal leading-heading tracking-heading text-sognos-heading lg:text-3xl">
                  {study.quote}
                </p>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Attribution and its link fade only, and late — they settle after
              the quote has landed rather than competing with it. */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={study.href}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={t(0.3, 0.2)}
              className="flex flex-col items-start gap-4"
            >
              <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-xs text-sognos-heading">
                  {study.author}
                </span>
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 bg-sognos-blue-accent"
                />
                <span className="text-xs text-sognos-muted">{study.role}</span>
              </div>

              <SlideFillLink href={study.href} label="Read full story" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// One block per story, doubling as the slide indicator. The 8px square carries
// the client's brand colour, at full strength on the active block and faded on
// the rest; the countdown itself lives in the ring above.
function IndicatorBlock({
  study,
  index,
  active,
  onSelect,
  blockRef,
}: {
  study: CaseStudy;
  index: number;
  active: boolean;
  onSelect: () => void;
  blockRef: (el: HTMLButtonElement | null) => void;
}) {
  const brand = study.brandColor ?? BRAND_BG[study.company];

  return (
    <button
      ref={blockRef}
      type="button"
      onClick={onSelect}
      aria-label={`Show the ${study.company} story`}
      aria-current={active ? "true" : undefined}
      // 75vw and `shrink-0` make the track scrollable below `md`; from `md`
      // they give way to equal columns, as the reference does.
      className="group relative flex w-[75vw] shrink-0 snap-center flex-col gap-4 rounded-lg bg-white p-6 pr-12 text-left md:w-auto md:flex-1 md:shrink"
    >
      {/* Outline marking the active block. A shared `layoutId` means framer
          moves the single element between blocks rather than fading one out
          and another in — the reference's active-dot behaviour, at block
          scale. */}
      {active && (
        <motion.span
          layoutId="story-indicator"
          aria-hidden="true"
          transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
          className="pointer-events-none absolute inset-0 rounded-lg border border-sognos-blue-accent"
        />
      )}

      <span
        aria-hidden="true"
        className={`absolute right-6 top-6 h-2 w-2 transition-colors duration-300 ${
          active || brand ? "" : "bg-sognos-line"
        }`}
        style={
          active && brand
            ? { backgroundColor: brand }
            : brand
              ? { backgroundColor: brand, opacity: 0.25 }
              : undefined
        }
      />

      <span className="font-mono text-xs uppercase tracking-[0.06em] text-sognos-muted">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="flex flex-col gap-1">
        <span
          className={`font-heading text-xl font-normal leading-heading tracking-heading transition-colors duration-300 ${
            active
              ? "text-sognos-heading"
              : "text-sognos-muted group-hover:text-sognos-heading"
          }`}
        >
          {study.company}
        </span>
        <span className="text-xs text-sognos-muted">
          {study.industry}
        </span>
      </span>
    </button>
  );
}
