import Image from "next/image";

type Logo = { src: string; alt: string };

interface ProductTrustStripProps {
  title?: string;
  logos?: readonly Logo[];
  /** Tailwind bg utility for the section, e.g. "bg-sognos-care-dark" */
  className?: string;
}

const DEFAULT_TITLE = "Trusted by industry leaders and professionals worldwide";

const DEFAULT_LOGOS: readonly Logo[] = [
  { src: "/logos/flourish-australia-logo.png", alt: "Flourish Australia" },
  { src: "/logos/auckland-airport-logo.png", alt: "Auckland Airport" },
  { src: "/logos/penrith-city-council-logo.png", alt: "Penrith City Council" },
  { src: "/logos/gentari-logo-rect.webp", alt: "Gentari" },
  { src: "/logos/nps-logo.webp", alt: "NPS" },
];

export default function ProductTrustStrip({
  title = DEFAULT_TITLE,
  logos = DEFAULT_LOGOS,
  className = "",
}: ProductTrustStripProps = {}) {
  return (
    <section aria-label="Trusted organisations" className={`w-full bg-white`}>
      <div className="mx-auto max-w-5xl px-6 pt-16 pb-20 text-center md:pt-20 md:pb-28 lg:px-10">
        <p className="mb-3 font-heading text-lg tracking-tight font-medium text-black/70">
          {title}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:flex-nowrap md:justify-between md:gap-x-0">
          {logos.map((logo, index) => (
            <div
              key={logo.alt}
              className={`flex items-center justify-center md:flex-1 md:px-10${index > 0 ? " md:border-l md:border-gray-200" : ""}`}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={150}
                height={40}
                className="h-7 w-auto object-contain grayscale opacity-70 md:h-8"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
