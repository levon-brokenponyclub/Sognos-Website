import type { SanityImageSource } from "@sanity/image-url";
import {
  DEFAULT_LOGOS,
  LOGO_STRIP_LOGO_LIMIT,
  LOGO_STRIP_TITLE,
} from "@/lib/content/logoStrip";
import { getLogoStripContent } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import LogoMarquee, {
  type MarqueeLogo,
} from "@/components/layout/sections/shared/LogoMarquee";

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

export default async function LogoStrip() {
  const content = await getLogoStripContent();
  const logos: Logo[] = (
    content?.logos?.length
      ? content.logos.map((logo) => ({ alt: logo.alt, image: logo.image }))
      : DEFAULT_LOGOS
  ).slice(0, LOGO_STRIP_LOGO_LIMIT);

  const marqueeLogos: MarqueeLogo[] = logos.flatMap((logo) => {
    const src = resolveLogoSrc(logo);
    return src ? [{ src, alt: logo.alt }] : [];
  });

  return (
    <section
      aria-label="Trusted organisations"
      // `divider-on-dark` retunes the tile border and the beam's base colour
      // for navy; the travelling arcs stay the brand accent.
      className="divider-on-dark w-full bg-sognos-navy"
    >
      <div className="mx-auto max-w-2xl px-6 pt-16 pb-16 text-center md:pt-20 md:pb-2">
        <h3 className="mb-12 font-heading text-3xl tracking-tight text-white">
          {LOGO_STRIP_TITLE}
        </h3>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-16 md:pb-20">
        <LogoMarquee
          logos={marqueeLogos}
          panelClass="bg-sognos-navy"
          fadeClass="from-sognos-navy"
          invertLogos
        />
      </div>
    </section>
  );
}
