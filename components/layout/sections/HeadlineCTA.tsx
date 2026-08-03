"use client";

// Statement CTA: mark, line, a joined row of platform logos, then the CTA.
//
// The logos come from Sanity (`ctaSection.logos`, the same set CTASection
// renders as "Powered by Microsoft") and are handed in from the page.
import Image from "next/image";
import { useBookDemo } from "@/lib/BookDemoContext";
import ElegantDarkPattern from "@/components/layout/sections/shared/ElegantDarkPattern";

const DEFAULT_HEADLINE =
  "Stop managing complexity.\nStart delivering outcomes.";
const ICON_SRC = "/images/icons/icon-stack-cta.svg";

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
      <ElegantDarkPattern />

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

          <h2 className="font-heading text-3xl font-medium leading-tight tracking-tight whitespace-pre-line text-white md:text-5xl">
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
