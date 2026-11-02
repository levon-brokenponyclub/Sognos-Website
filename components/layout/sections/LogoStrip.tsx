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

// Stat that leads the hero trust row. Placeholder copy from the mockup —
// confirm the figure and its source before launch.
const HERO_STAT = { value: "4.9", label: "Rated by operations leaders" };

// `hero` — the homepage variant (docs/mockups/home/hero-stack.html): a stat
// cell then the logos, six cells split by hairlines from `lg`. `default` is
// the solutions page strip, unchanged.
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
    const resolved = logos
      .map((logo) => ({ logo, src: resolveLogoSrc(logo) }))
      .filter((l): l is { logo: Logo; src: string } => Boolean(l.src));

    return (
      <section aria-label="Trusted organisations" className="w-full">
        <ul className="mx-auto mt-20 grid max-w-6xl grid-cols-2 items-center gap-y-8 px-6 sm:grid-cols-3 md:mt-28 lg:grid-cols-6">
          <li className="flex flex-col items-center justify-center px-4 text-center">
            <span className="font-heading text-4xl text-white/85">{HERO_STAT.value}</span>
            <span className="mt-1 text-sm text-white/60">{HERO_STAT.label}</span>
          </li>
          {resolved.map(({ logo, src }, index) => (
            <li
              key={logo.alt + index}
              className="flex h-20 items-center justify-center border-white/20 px-6 lg:border-l"
            >
              <Image
                src={src}
                alt={logo.alt}
                width={150}
                height={40}
                className="h-auto max-h-10 w-auto max-w-full object-contain opacity-70 brightness-0 invert"
              />
            </li>
          ))}
        </ul>
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
