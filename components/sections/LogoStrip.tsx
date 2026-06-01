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

// Duplicate for seamless infinite loop (-50% = one full set)
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
  const track = [...logos, ...logos];

  return (
    <section
      aria-label="Trusted organisations"
      className="w-full overflow-hidden bg-white py-10 border-b border-dashed border-sognos-border-subtle"
    >
      {/*  <h4 className="font-heading text-lg text-center my-1 font-semibold text-[#052048]">
        Trusted by Leading Companies
      </h4> */}
      <div className="trust-marquee-wrap">
        <div className="trust-marquee-track" aria-hidden="true">
          {track.map((logo, i) => {
            const src = resolveLogoSrc(logo);
            if (!src) return null;

            return (
            <div
              key={i}
              className="flex items-center justify-center px-1 lg:px-2 min-w-[150px] lg:min-w-[260px]"
            >
              <Image
                src={src}
                alt={logo.alt}
                width={220}
                height={72}
                className="max-h-10 lg:max-h-14 w-auto max-w-[110px] lg:max-w-[190px] object-contain"
                style={{ filter: "brightness(0) opacity(0.8)" }}
                sizes="(min-width: 1024px) 190px, 110px"
              />
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
