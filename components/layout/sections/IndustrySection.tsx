"use client";

// Tab showcase, on middesk.com's Solutions section — its markup, converted to
// tokens. Six-and-six on a twelve column grid, the tab list left and one
// picture right, sized by ratio rather than by a minimum height. That ratio is
// what keeps the panel in proportion: `aspect-[676/496]` is theirs.
//
// Two departures, both deliberate:
//   · the "Explore" link is `SlideFillLink`, not their underline-sweep;
//   · the pictures are photographs rather than product mockups, so each tab
//     changes the image where theirs illustrates a feature.
//
// Before this it was an accordion after routable.com, before that a list of
// cards, and before that a sticky stack — each card pinned at the navbar's
// 80px while the next scrolled over it.
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SlideFillLink from "@/components/layout/sections/shared/SlideFillLink";
import { ProgressButton } from "@/components/layout/sections/shared/TimerCardDeck";
import { INDUSTRIES } from "@/lib/constants";

const CARD_IMAGES: Record<string, string> = {
  "health-social-care": "/images/home/industries/health-social-care.jpg",
  "facilities-management": "/images/home/industries/facilities-management.jpg",
  "local-government": "/images/home/industries/local-government.png",
  "industrial-services": "/images/home/industries/industrial-services.jpg",
  "energy-utilities": "/images/home/industries/energy-utilities.jpg",
};

// The reference's own interval — its pause button reads "Autoplay duration: 8s".
const AUTOPLAY_MS = 8000;

const EASE = [0.25, 0.1, 0.25, 1] as const;

type IndustrySectionProps = {
  heading?: string;
  excludeSlug?: string;
};

export default function IndustrySection({
  heading = "Purpose-built for service-intensive sectors",
  excludeSlug,
}: IndustrySectionProps) {
  const industries = excludeSlug
    ? INDUSTRIES.filter((ind) => ind.slug !== excludeSlug)
    : INDUSTRIES;

  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const item = industries[active];
  const autoplay = industries.length > 1 && !reduceMotion;

  // One rAF loop drives both the advance and the countdown ring, the same
  // clock TimerCardDeck and ProductCustomerStories use — two timers would let
  // the ring drift against the tab it describes. Elapsed time resets on every
  // selection, so clicking a tab restarts the full interval rather than
  // inheriting a part-spent one.
  useEffect(() => {
    if (!autoplay || paused) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed >= AUTOPLAY_MS) {
        setProgress(0);
        setActive((current) => (current + 1) % industries.length);
        return;
      }
      setProgress(elapsed / AUTOPLAY_MS);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoplay, paused, active, industries.length]);

  if (!item) return null;

  return (
    <section className="w-full bg-sognos-tint">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* Heading sits on the navy, outside the panel. */}
        <h2 className="mb-10 max-w-3xl font-heading text-3xl font-medium leading-tight tracking-tight text-white text-balance md:text-4xl">
          {heading}
        </h2>

        <div className="rounded-lg bg-white p-6">
          <div className="grid w-full grid-cols-4 gap-2 md:grid-cols-12">
            {/* Tab list — six of twelve */}
            <div
              role="tablist"
              aria-label="Industries"
              className="col-span-4 md:col-span-6"
            >
              {/* Rule above the list. The reference hangs a 72×8 notch off its
                  left end; that is left out here. */}
             {/*  <hr
                aria-hidden="true"
                className="m-0 w-full border-0 border-t border-sognos-line"
              /> */}

              {industries.map((ind, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={ind.slug}
                    id={ind.slug}
                    className="group/card relative scroll-m-28 border-b border-sognos-line pt-4 max-md:py-6 md:pe-5"
                  >
                    <button
                      type="button"
                      role="tab"
                      id={`industry-tab-${ind.slug}`}
                      aria-controls={`industry-panel-${ind.slug}`}
                      aria-selected={isActive}
                      aria-expanded={isActive}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActive(i)}
                      className="flex w-full items-center text-left md:mb-4"
                    >
                      <h3
                        className={`font-heading text-xl tracking-tight font-normal transition-colors duration-300 ${
                          isActive
                            ? "text-sognos-heading"
                            : "text-sognos-heading/70 group-hover/card:text-sognos-heading"
                        }`}
                      >
                        {ind.name}
                      </h3>
                    </button>

                    {/* Countdown ring on the active tab, as the reference has
                        it. `ProgressButton` is TimerCardDeck's, shared rather
                        than reimplemented; it positions itself `right-6 top-6`
                        against this card's `relative`. */}
                    {isActive && autoplay && (
                      <ProgressButton
                        paused={paused}
                        progress={progress}
                        autoplayMs={AUTOPLAY_MS}
                        onToggle={() => setPaused((p) => !p)}
                      />
                    )}

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          id={`industry-panel-${ind.slug}`}
                          role="tabpanel"
                          aria-labelledby={`industry-tab-${ind.slug}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.6,
                            ease: EASE,
                          }}
                          className="overflow-hidden"
                        >
                          {/* `md:pe-[20%]` and the 516px measure are the
                              reference's — the copy stops well short of the
                              column's edge rather than running its full width. */}
                          <div className="pb-4 max-md:pe-8 max-md:pt-4 md:pe-[20%]">
                            <p className="max-w-[516px] pb-4 text-base leading-relaxed text-sognos-body">
                              {ind.description}
                            </p>
                            <SlideFillLink
                              href={ind.href}
                              label={`Explore ${ind.name}`}
                            />
                          </div>

                          {/* Below `md` the picture rides inside the open
                              panel, since the column beside it is gone. */}
                          <div className="relative mt-4 aspect-[351/249] w-full overflow-hidden rounded-lg bg-gray-200 md:hidden">
                            <Image
                              src={CARD_IMAGES[ind.slug] ?? ind.image}
                              alt=""
                              fill
                              sizes="100vw"
                              className="object-cover"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Picture — the other six. Every image is mounted and stacked in
                one grid cell; the active one slides up into place while the
                rest sit translated out. That is the reference's transition,
                and it is why this is not an `AnimatePresence` swap: nothing
                unmounts, so there is no reflow between slides. */}
            <div className="col-span-4 hidden aspect-[676/496] w-full overflow-hidden rounded-lg bg-gray-200 md:col-span-6 md:grid">
              {industries.map((ind, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={ind.slug}
                    aria-hidden={!isActive}
                    className={`pointer-events-none relative col-start-1 row-start-1 transition-all duration-[1600ms] ease-in-out ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-full opacity-0"
                    }`}
                  >
                    <Image
                      src={CARD_IMAGES[ind.slug] ?? ind.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
