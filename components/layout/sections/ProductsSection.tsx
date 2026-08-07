// SCAFFOLD — mirrors Routable "case study" grid pattern (per user reference
// image #60): heading row + 3-column card grid + static logo strip. Cards are
// the exact PartnerCard component reused verbatim so the two sections stay
// visually locked. Section surface + card treatment stay LIGHT (bg-sognos-tint)
// per user direction 2026-08-07 ("keep light unless instructed").
//
// This is the SCAFFOLD stage — structure, sizing, spacing only. Brand-style
// pass and design-system refine happen in follow-up stages.
import Image from "next/image";
import PartnerCard, { type PartnerCardData } from "@/components/ui/PartnerCard";

const PRODUCTS: PartnerCardData[] = [
  {
    name: "SognosCare",
    logo: "/logos/sognos-care-logo-color.svg",
    type: "Care operations, compliance, and outcomes in one system",
    href: "/products/sognoscare",
    description:
      "Case management, service delivery, and compliance reporting for care and community services — with the audit trail built in.",
  },
  {
    name: "SognosRoster",
    logo: "/logos/sognos-roster-logo-color.svg",
    type: "Workforce scheduling that matches skill to need",
    href: "/products/sognosroster",
    description:
      "Rostering, dispatch and route optimisation for service delivery — real-time visibility across every team, site, and appointment.",
  },
  {
    name: "SognosGenogram",
    logo: "/logos/sognos-genogram-logo-color.svg",
    type: "Relationship context, right inside every case record",
    href: "/products/sognosgenogram",
    description:
      "Map family structures, support networks, and relational histories directly into cases — so every worker has the picture behind the facts.",
  },
];

export default function ProductsSection({
  heading = "Three products, one platform",
  description = "Sognos ships as three focused products — SognosCare, SognosRoster, SognosGenogram. Each stands alone or works together on one data model, one operational picture.",
}: {
  heading?: string;
  description?: string;
}) {
  return (
    <section
      id="products"
      className="w-full overflow-hidden bg-sognos-tint pt-12 md:pt-24 lg:pt-32 pb-14 md:pb-24 lg:pb-36"
    >
      <div className="mx-auto w-full max-w-7xl space-y-11 px-6 md:space-y-24">
        {/* Header row — heading + body left, right slot reserved for badges
            (e.g. Microsoft partner) later. Mirrors Routable /product/payouts
            header shape. */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end">
          <div className="flex-1">
            <h2 className="max-w-lg font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
              {heading}
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-sognos-body">
              {description}
            </p>
          </div>
          <div className="flex shrink-0 gap-4 md:gap-7" aria-hidden="true" />
        </div>

        {/* Card grid — reuses PartnerCard verbatim. `basis-*` on the card
            handles 1/2/3-up sizing; parent supplies the gap. */}
        <div className="flex flex-wrap gap-3 lg:gap-4">
          {PRODUCTS.map((product) => (
            <PartnerCard
              key={product.name}
              partner={product}
              pillLabels={{ resting: "Learn more", hover: `Explore ${product.name}` }}
            />
          ))}
        </div>

        {/* Static logo strip — dashed-border boxes matching Routable marquee
            dimensions (h-[70px] w-[150px] mobile, md:h-[112px] md:w-[256px]).
            Non-animated per user direction. */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
          {PRODUCTS.map((product) => (
            <div
              key={product.name}
              className="relative flex h-[70px] w-[150px] items-center justify-center border border-dashed border-sognos-line px-6 py-4 md:h-[112px] md:w-[256px]"
            >
              <Image
                src={product.logo}
                alt={product.name}
                width={160}
                height={44}
                className="max-h-[70%] max-w-[85%] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
