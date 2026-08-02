"use client";

// Statement CTA: mark, line, a joined row of platform logos, then the CTA.
//
// The logos come from Sanity (`ctaSection.logos`, the same set CTASection
// renders as "Powered by Microsoft") and are handed in from the page.
import Image from "next/image";
import { useBookDemo } from "@/lib/BookDemoContext";

const DEFAULT_HEADLINE =
  "Stop managing complexity.\nStart delivering outcomes.";
const ICON_SRC = "/images/icons/icon-stack-cta.svg";

// ── Background, after 21st.dev's elegant-dark-pattern ────────────────────────
// The reference's cyan becomes the brand accent and its greys become the navy
// ramp; every mask below is copied from it verbatim.

// Five light streaks, all skewed 45° and fading downward. What stops them
// reading as evenly-spaced stripes is that each is masked by its own irregular
// gradient — so the stop lists are kept exactly as the reference has them.
const STREAK_MASKS = [
  "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 20%, rgba(0,0,0,0) 36%, rgb(0,0,0) 55%, rgba(0,0,0,0.13) 67%, rgb(0,0,0) 78%, rgba(0,0,0,0) 97%)",
  "linear-gradient(90deg, rgba(0,0,0,0) 11%, rgb(0,0,0) 25%, rgba(0,0,0,0.55) 41%, rgba(0,0,0,0.13) 67%, rgb(0,0,0) 78%, rgba(0,0,0,0) 97%)",
  "linear-gradient(90deg, rgba(0,0,0,0) 9%, rgb(0,0,0) 20%, rgba(0,0,0,0.55) 28%, rgba(0,0,0,0.424) 40%, rgb(0,0,0) 48%, rgba(0,0,0,0.267) 54%, rgba(0,0,0,0.13) 78%, rgb(0,0,0) 88%, rgba(0,0,0,0) 97%)",
  "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 17%, rgba(0,0,0,0.55) 26%, rgb(0,0,0) 35%, rgba(0,0,0,0) 47%, rgba(0,0,0,0.13) 69%, rgb(0,0,0) 79%, rgba(0,0,0,0) 97%)",
  "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgb(0,0,0) 20%, rgba(0,0,0,0.55) 27%, rgb(0,0,0) 42%, rgba(0,0,0,0) 48%, rgba(0,0,0,0.13) 67%, rgb(0,0,0) 74%, rgb(0,0,0) 82%, rgba(0,0,0,0.47) 88%, rgba(0,0,0,0) 97%)",
] as const;

const BASE_MASK =
  "radial-gradient(125% 100% at 0% 0%, rgb(0,0,0) 0%, rgba(0,0,0,0.224) 88.2883%, rgba(0,0,0,0) 100%)";

// `in oklab` so the fade runs accent → transparent without dipping through
// grey, which is what a default sRGB interpolation to `transparent` does.
const STREAK_FILL =
  "linear-gradient(in oklab, var(--sognos-blue-accent) 0%, transparent 100%)";

// The reference's grain is a PNG on someone else's Framer CDN. This is the same
// effect from `feTurbulence` as a data URI: no third-party request, no licence
// question, and nothing new in `public/`.
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23n)'/%3E%3C/svg%3E";

export type PlatformLogo = { src: string; alt: string };

export default function HeadlineCTA({
  platformLogos,
  headline = DEFAULT_HEADLINE,
  ctaLabel = "Book a Demo",
}: {
  /** From `getCtaSectionContent().logos` — Sanity, with the Microsoft set as
   *  its fallback. */
  platformLogos: readonly PlatformLogo[];
  /** Newlines are honoured — the line breaks deliberately. */
  headline?: string;
  ctaLabel?: string;
}) {
  const { openModal } = useBookDemo();

  return (
    <section className="relative w-full overflow-hidden bg-sognos-navy-darkest">
      {/* Background stack. Purely decorative, so the whole thing is hidden from
          assistive tech and sits behind the content's `z-10`. */}
      <div aria-hidden="true" className="absolute inset-0">
        {/* Base wash out of the top-left corner, itself masked so it falls away
            before it reaches the opposite corner. The streaks live inside it so
            they inherit that same falloff. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(100% 100% at 0% 0%, var(--sognos-navy) 0%, var(--sognos-navy-darkest) 100%)",
            maskImage: BASE_MASK,
            WebkitMaskImage: BASE_MASK,
          }}
        >
          {STREAK_MASKS.map((mask, i) => (
            <div
              key={i}
              className="absolute inset-0 opacity-20"
              style={{
                background: STREAK_FILL,
                maskImage: mask,
                WebkitMaskImage: mask,
                transform: "skewX(45deg)",
              }}
            />
          ))}
        </div>

        {/* Grain */}
        <div
          className="absolute inset-0 bg-repeat opacity-5"
          style={{
            backgroundImage: `url("${NOISE}")`,
            backgroundSize: "149.76px",
          }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Centre lift, so the copy is not sitting on the darkest part. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--sognos-navy) 20%, transparent) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center md:py-28">
        <div className="flex flex-col items-center gap-6">
          {/* The asset's dots are a fixed dark hex, so it is used as a mask and
              painted with the accent — the colour then comes from the token
              rather than from whatever the file happens to contain. */}
          <span
            aria-hidden="true"
            className="size-10 shrink-0 bg-sognos-blue-accent"
            style={{
              maskImage: `url(${ICON_SRC})`,
              WebkitMaskImage: `url(${ICON_SRC})`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          />

          <h2 className="font-heading text-3xl font-normal leading-tight tracking-tight whitespace-pre-line text-white md:text-5xl">
            {headline}
          </h2>
        </div>

        {platformLogos.length > 0 && (
          // Tiles butt together on a 2px gap so the row reads as one bar. The
          // reference sets a 4px inner radius against a 12px outer; `rounded-lg`
          // is the house ceiling, so the outer corners take that and the inner
          // ones drop to `rounded-sm` — same two-tier effect, nothing above lg.
          <div className="mt-14 flex max-w-2xl flex-wrap justify-center gap-0.5">
            {platformLogos.map((logo, i) => (
              <div
                key={`${logo.alt}-${i}`}
                className={`bg-white/5 p-6 ${
                  i === 0
                    ? "rounded-sm rounded-l-lg"
                    : i === platformLogos.length - 1
                      ? "rounded-sm rounded-r-lg"
                      : "rounded-sm"
                }`}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={32}
                  height={32}
                  className="m-auto size-8 object-contain"
                />
              </div>
            ))}
          </div>
        )}

        {/* Primary CTA — the Hero's button, verbatim. */}
        <div className="mt-10">
          <button
            type="button"
            onClick={() => openModal()}
            className="group/demo relative overflow-hidden rounded-sm bg-white px-7 py-3.5 text-base font-medium text-sognos-navy-dark transition-colors duration-300"
          >
            <span className="absolute bottom-0 left-0 h-40 w-full origin-bottom translate-y-full rounded-[50px] bg-sognos-blue-accent transition-transform duration-300 ease-out group-hover/demo:translate-y-12" />
            <span className="relative z-10 transition-colors duration-300 group-hover/demo:text-white">
              {ctaLabel}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
