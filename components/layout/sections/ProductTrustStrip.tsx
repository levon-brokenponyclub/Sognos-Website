import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { getLogoStripContent } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

interface ProductTrustStripProps {
  title?: string;
  /** Set on a dark section so the heading, dividers and logos invert with it. */
  dark?: boolean;
  /** Tailwind bg utility for the section, e.g. "bg-sognos-care-dark". */
  className?: string;
}

const DEFAULT_TITLE = "Trusted by industry leaders and professionals worldwide";

// Named rather than sliced. The homepage strip takes `.slice(0, 5)` off the CMS
// list, so reordering in Sanity silently changes what it shows — and would also
// pull these two strips onto the same logos. Naming them keeps the sets
// distinct and stable, and a rename in the CMS fails visibly rather than
// quietly swapping a client.
const LOGO_NAMES = [
  "Deloitte",
  "Water NSW",
  "NECA",
  "Sandvik",
  "APM",
] as const;

type Logo = { alt: string; image: SanityImageSource };

export default async function ProductTrustStrip({
  title = DEFAULT_TITLE,
  dark = false,
  className = "bg-white",
}: ProductTrustStripProps = {}) {
  const content = await getLogoStripContent();
  const byAlt = new Map(
    (content?.logos ?? []).map((logo) => [logo.alt, logo as Logo]),
  );
  const logos = LOGO_NAMES.map((name) => byAlt.get(name)).filter(
    (logo): logo is Logo => Boolean(logo?.image),
  );

  if (logos.length === 0) return null;

  return (
    <section aria-label="Trusted organisations" className={`w-full ${className}`}>
      <div className="mx-auto max-w-5xl px-6 pt-16 pb-16 text-center md:pt-20 md:pb-20">
        <h3
          className={`mb-8 font-heading text-3xl tracking-tight ${
            dark ? "text-white" : "text-sognos-heading"
          }`}
        >
          {title}
        </h3>
        <div className="mt-15 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 md:flex-nowrap md:justify-between md:gap-x-0">
          {logos.map((logo, index) => (
            <div
              key={logo.alt + index}
              className={`flex items-center justify-center md:flex-1 md:px-5 py-5${
                index > 0
                  ? dark
                    ? " md:border-l md:border-white/25"
                    : " md:border-l md:border-sognos-line"
                  : ""
              }`}
            >
              <Image
                src={urlFor(logo.image).width(220).auto("format").url()}
                alt={logo.alt}
                width={150}
                height={40}
                className="h-10 w-auto object-contain md:h-11"
                // Flattened to white on dark, as the homepage strip does. On a
                // light section the marks are already dark on transparent, so
                // they render untouched.
                style={dark ? { filter: "brightness(0) invert(1)" } : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
