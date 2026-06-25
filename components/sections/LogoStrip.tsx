import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { DEFAULT_LOGOS } from "@/lib/content/logoStrip";
import { getLogoStripContent } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

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
  const logos = content?.logos?.length
    ? content.logos.map((logo) => ({ alt: logo.alt, image: logo.image }))
    : DEFAULT_LOGOS;
  // Duplicated for seamless -50% marquee loop
  const track = [...logos, ...logos];

  return (
    <section
      aria-label="Trusted organisations"
      className="w-full bg-background py-8 md:py-10"
    >
      <div className="mx-auto max-w-[1250px] px-4">
        <div className="trust-marquee-wrap overflow-hidden">
          <div className="trust-marquee-track gap-3" aria-hidden="true">
            {track.map((logo, i) => {
              const src = resolveLogoSrc(logo);
              if (!src) return null;

              return (
                <div
                  key={i}
                  className="flex h-[88px] w-[180px] shrink-0 items-center justify-center rounded-xl bg-sognos-navy/5 p-5"
                >
                  <Image
                    src={src}
                    alt={logo.alt}
                    width={220}
                    height={72}
                    sizes="180px"
                    className="h-auto w-auto max-h-10 max-w-[140px] object-contain"
                    style={{ filter: "brightness(0)", opacity: 0.55 }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
