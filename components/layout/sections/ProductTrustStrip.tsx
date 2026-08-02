import LogoMarquee, {
  type MarqueeLogo,
} from "@/components/layout/sections/shared/LogoMarquee";

interface ProductTrustStripProps {
  title?: string;
  logos?: readonly MarqueeLogo[];
  /** Tailwind bg utility for the section, e.g. "bg-sognos-care-dark". Doubles
   *  as the beam tile's inner panel, which has to match the section exactly. */
  className?: string;
  /** The same colour as a `from-*` utility, for the marquee's edge fades. Must
   *  be given whenever `className` is not the default. */
  fadeClass?: string;
  /** Set on a dark section so the tile borders and logos invert with it. */
  dark?: boolean;
}

const DEFAULT_TITLE = "Trusted by industry leaders and professionals worldwide";

const DEFAULT_LOGOS: readonly MarqueeLogo[] = [
  { src: "/logos/flourish-australia-logo.png", alt: "Flourish Australia" },
  { src: "/logos/auckland-airport-logo.png", alt: "Auckland Airport" },
  { src: "/logos/penrith-city-council-logo.png", alt: "Penrith City Council" },
  { src: "/logos/gentari-logo-rect.webp", alt: "Gentari" },
  { src: "/logos/nps-logo.webp", alt: "NPS" },
];

export default function ProductTrustStrip({
  title = DEFAULT_TITLE,
  logos = DEFAULT_LOGOS,
  className = "bg-white",
  fadeClass = "from-white",
  dark = false,
}: ProductTrustStripProps = {}) {
  return (
    <section
      aria-label="Trusted organisations"
      className={`w-full ${className}${dark ? " divider-on-dark" : ""}`}
    >
      {/* Narrower than the marquee below it, so the line wraps to a readable
          measure instead of running the full container width. */}
      <div className="mx-auto max-w-2xl px-6 pt-16 pb-12 text-center md:pt-20 md:pb-2">
        <p
          className={`font-heading text-3xl font-medium tracking-tight ${
            dark ? "text-white" : "text-sognos-heading"
          }`}
        >
          {title}
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-16 md:pb-20">
        <LogoMarquee
          logos={logos}
          panelClass={className}
          fadeClass={fadeClass}
          invertLogos={dark}
        />
      </div>
    </section>
  );
}
