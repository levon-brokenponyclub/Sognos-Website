// Sticky card stack after middesk.com. Each industry pins at the navbar's 80px
// and the next scrolls up over it — pure CSS, no scroll listener, so this needs
// no client state.
//
// Swapped with SolutionsSection: industries used to be the horizontal card
// slider and solutions the stack.
import Link from "next/link";
import Image from "next/image";
import { INDUSTRIES } from "@/lib/constants";

const CARD_IMAGES: Record<string, string> = {
  "health-social-care": "/images/home/industries/health-social-care.jpg",
  "facilities-management": "/images/home/industries/facilities-management.jpg",
  "local-government": "/images/home/industries/local-government.png",
  "industrial-services": "/images/home/industries/industrial-services.jpg",
  "energy-utilities": "/images/home/industries/energy-utilities.jpg",
};

type IndustrySectionProps = {
  heading?: string;
  excludeSlug?: string;
};

export default function IndustrySection({
  heading = "Purpose-built for service-intensive sectors",
  excludeSlug,
}: IndustrySectionProps) {
  const industries = excludeSlug
    ? INDUSTRIES.filter((ind) => ind.slug !== excludeSlug)
    : INDUSTRIES;

  return (
    <section className="w-full bg-background">
      <div className="max-w-7xl w-full mx-auto px-6 pt-24">
        <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-tight text-sognos-heading max-w-2xl">
          {heading}
        </h2>
      </div>

      {/* Two things make the stack work and will silently break it: each
          wrapper needs an opaque background, or the cards show through each
          other; and no ancestor may set a transform, filter or overflow clip,
          which would make the sticky element scroll with its container instead
          of pinning. `ScrollReveal` sets a transform — do not wrap this. */}
      {industries.map((ind, i) => (
        <div
          key={ind.slug}
          id={ind.slug}
          className="sticky top-20 bg-background"
        >
          <div className="max-w-7xl mx-auto px-6 pt-6 pb-18">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              {/* Text — left half */}
              <div className="flex w-full flex-col md:w-1/2 md:self-stretch">
                {/* Rule and notch belong to this column alone. The notch is
                    offset by its own 8px height so it rides on the border
                    rather than crossing it, and the `pt-6` above gives it room
                    to overhang without clipping. */}
                <div
                  aria-hidden="true"
                  className="relative border-t border-sognos-line"
                >
                  <svg
                    width="72"
                    height="8"
                    viewBox="0 0 72 8"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -top-2 left-0 fill-sognos-line"
                  >
                    <path d="M72 8L65.3171 2.03269C63.851 0.723577 61.9543 0 59.9888 0H2C0.895431 0 0 0.895431 0 2V8H72Z" />
                  </svg>
                </div>

                {/* Rule pinned to the top, copy centred in what is left. */}
                <div className="flex h-full flex-col justify-center py-6 md:py-0">
                  <span className="font-mono text-xs font-normal uppercase tracking-[0.06em] text-sognos-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 max-w-xl font-heading text-3xl font-normal tracking-tight text-sognos-body">
                    {ind.name}
                  </h3>
                  <p className="mt-4 max-w-105 text-base font-normal text-sognos-body">
                    {ind.description}
                  </p>
                  <Link
                    href={ind.href}
                    className="mt-6 inline-flex w-fit items-center gap-x-2 text-sm font-normal text-sognos-blue-accent transition-opacity hover:opacity-70"
                  >
                    Explore {ind.name}
                    <svg
                      className="size-3"
                      viewBox="0 0 12 13"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M0.75 6.46875H11.25M11.25 6.46875L6 11.7188M11.25 6.46875L6 1.21875"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Media — right half */}
              <div className="relative aspect-[680/467] w-full overflow-hidden rounded-lg bg-gray-200 md:w-1/2 md:shrink-0">
                <Image
                  src={CARD_IMAGES[ind.slug] ?? ind.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
