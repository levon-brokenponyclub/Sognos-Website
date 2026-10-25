import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { DEFAULT_LOGOS, LOGO_STRIP_TITLE } from "@/lib/content/logoStrip";
import { getLogoStripContent } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

// Local rather than the shared `LOGO_STRIP_LOGO_LIMIT`, which is still 6 and
// is also what CTASection slices its trust logos and drawer logos by. Changing
// the shared constant to cut this strip to five would have quietly cut those
// too.
const LOGO_LIMIT = 5;

type Logo = {
  alt: string;
  src?: string;
  image?: SanityImageSource;
};

function resolveLogoSrc(logo: Logo) {
  return logo.image
    ? urlFor(logo.image).width(220).auto("format").url()
    : logo.src;
}

// `hero` — the homepage variant (docs/mockups/home): title as a paragraph
// (the hero's product cards hold the h2s), a 5-cell row the width of the card
// grid, and an edge-faded marquee below `md`. `default` is the solutions page
// strip, unchanged.
export default async function LogoStrip({
  variant = "default",
}: {
  variant?: "default" | "hero";
}) {
  const content = await getLogoStripContent();
  const logos: Logo[] = (
    content?.logos?.length
      ? content.logos.map((logo) => ({ alt: logo.alt, image: logo.image }))
      : DEFAULT_LOGOS
  ).slice(0, LOGO_LIMIT);

  if (variant === "hero") {
    const cell = (logo: Logo, src: string) => (
      <Image
        src={src}
        alt={logo.alt}
        width={150}
        height={40}
        className="h-auto max-h-9 w-auto max-w-full object-contain brightness-0 invert"
      />
    );
    const resolved = logos
      .map((logo) => ({ logo, src: resolveLogoSrc(logo) }))
      .filter((l): l is { logo: Logo; src: string } => Boolean(l.src));

    return (
      <section aria-label="Trusted organisations" className="w-full">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-24">
          <p className="font-heading text-2xl font-normal leading-[1.25] tracking-[-0.01em] text-white md:text-[1.75rem]">
            {LOGO_STRIP_TITLE}
          </p>
          <ul className="mt-10 hidden grid-cols-5 md:grid">
            {resolved.map(({ logo, src }, index) => (
              <li
                key={logo.alt + index}
                className={`flex h-20 items-center justify-center px-6 lg:px-10${index > 0 ? " border-l border-white/10" : ""}`}
              >
                {cell(logo, src)}
              </li>
            ))}
          </ul>
          {/* Mobile: duplicated track on the shared 0 → -50% keyframe. */}
          <div className="relative -mx-6 mt-8 overflow-hidden md:hidden">
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-sognos-navy to-transparent" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-sognos-navy to-transparent" />
            <ul className="flex w-max animate-[trust-marquee-scroll_28s_linear_infinite] motion-reduce:animate-none">
              {[0, 1].map((copy) =>
                resolved.map(({ logo, src }, index) => (
                  <li
                    key={`${copy}-${logo.alt}-${index}`}
                    aria-hidden={copy === 1 || undefined}
                    className="flex h-16 w-40 shrink-0 items-center justify-center border-l border-white/10 px-6"
                  >
                    {cell(logo, src)}
                  </li>
                )),
              )}
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    // No background of its own — it renders inside the hero, which already
    // carries the navy and the blur artwork behind it. Its own `bg` would
    // cover those layers.
    <section aria-label="Trusted organisations" className="w-full">
      <div className="mx-auto max-w-5xl px-6 pt-16 pb-16 text-center md:pt-20 md:pb-20">
        <h3 className="mb-8 font-heading text-3xl tracking-tight text-white">
          {LOGO_STRIP_TITLE}
        </h3>
        <div className="mt-15 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 md:flex-nowrap md:justify-between md:gap-x-0">
          {logos.map((logo, index) => {
            const src = resolveLogoSrc(logo);
            if (!src) return null;
            return (
              <div
                key={logo.alt + index}
                className={`flex items-center justify-center md:flex-1 md:px-5 py-5${index > 0 ? " md:border-l md:border-white/25" : ""}`}
              >
                <Image
                  src={src}
                  alt={logo.alt}
                  width={150}
                  height={40}
                  className="h-10 w-auto object-contain md:h-11"
                  style={{ filter: "brightness(0) invert(1)", opacity: 1 }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
