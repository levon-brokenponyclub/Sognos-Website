import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/constants";
import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";

type PlatformProduct = {
  name: string;
  href?: string;
  byline: string;
  description: string;
  logo: string;
  bgImage: string;
  accent: string;
  /** Literal class — Tailwind's scanner cannot see dynamically built names. */
  hoverBgClass: string;
};

// Card copy and per-product styling, kept at the top of the file so the text
// is easy to find and edit without reading through the table below.
const BYLINES = {
  care: "One platform. From intake to outcome.",
  roster: "The right worker for every job, in real time.",
  genogram: "Family context. Built into every record.",
} as const;

// Hover-reveal copy.
const DESCRIPTIONS = {
  care: "Manage cases, track service delivery, meet compliance obligations, and report with confidence - in one platform built end-to-end for care.",
  roster:
    "Allocate the right people, at the right time, to the right services - automatically. Putting real-time optimisation in the hands of your operations team.",
  genogram:
    "Map family structures, understand kinship networks, track relationship changes, and make better informed care decisions — in one connected view built for frontline practice.",
} as const;

// Logo-block hover colour, per product. Literal class strings — Tailwind's
// scanner cannot see names built by interpolation.
const HOVER_BG = {
  care: "group-hover:bg-sognos-care-base",
  roster: "group-hover:bg-sognos-roster-base",
  genogram: "group-hover:bg-sognos-genogram-base",
} as const;

// The three products, rendered on every industry. Previously this was two
// parallel tables (PRODUCTS_DEPLOYED + a PRODUCT_META override keyed by
// industry meta.products) merged at render. They had drifted apart on byline,
// description, and hover colour, so the same card read differently depending
// on which industry you were on. Collapsed to one table — the merge only ever
// swapped copy, never filtered, so nothing rendered changes.
const PLATFORM_PRODUCTS: PlatformProduct[] = [
  {
    name: PRODUCTS.care.name,
    href: PRODUCTS.care.href,
    byline: BYLINES.care,
    hoverBgClass: HOVER_BG.care,
    description: DESCRIPTIONS.care,
    logo: "/logos/sognos-care-logo.svg",
    bgImage:
      "https://plus.unsplash.com/premium_photo-1663089870095-c231a534ac31?q=80&w=1702&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    accent: "#1d96fc",
  },
  {
    name: PRODUCTS.roster.name,
    href: PRODUCTS.roster.href,
    byline: BYLINES.roster,
    hoverBgClass: HOVER_BG.roster,
    description: DESCRIPTIONS.roster,
    logo: "/logos/sognos-roster-logo.svg",
    bgImage: "/images/home/industries/industrial-services.jpg",
    accent: "#59bbf7",
  },
  {
    name: PRODUCTS.genogram.name,
    href: PRODUCTS.genogram.href,
    byline: BYLINES.genogram,
    hoverBgClass: HOVER_BG.genogram,
    description: DESCRIPTIONS.genogram,
    logo: "/logos/SognosGenogram-logo.svg",
    bgImage:
      "https://images.unsplash.com/photo-1674629358478-bff878ed9727?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    accent: "#91278c",
  },
];

function ProductCard({ product }: { product: PlatformProduct }) {
  const card = (
    <div className="relative isolate h-full min-h-[430px] overflow-hidden rounded-lg bg-sognos-navy">
      <div className="relative z-10 flex h-full min-h-[430px] flex-col p-3 md:p-6">
        <div
          className={`flex flex-col items-center max-w-sm bg-sognos-navy-dark rounded-lg p-4 py-14 transition-colors duration-300 ${product.hoverBgClass}`}
        >
          <Image
            src={product.logo}
            // Decorative: the product name is now visible text directly below,
            // so alt text here would make screen readers announce it twice.
            alt=""
            width={180}
            height={44}
            className="h-9 w-auto max-w-[200px] object-contain brightness-0 invert"
          />
        </div>
        {/* Description sits in the slot the name used to occupy, revealed on
            hover. Fades via opacity rather than mounting, so it keeps its space
            at rest and the card height never shifts between states. */}
        <p className="mt-5 max-w-xl text-base leading-normal tracking-tight text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          {product.description}
        </p>

        {/* Name and arrow share a bottom row so they centre against each other.
            The arrow is in normal flow rather than absolutely positioned —
            that is what makes items-center line them up. */}
        <div className="mt-auto flex items-center justify-between gap-4 pb-3">
          <p className="max-w-xl font-heading text-xl font-medium leading-tight tracking-tight text-white lg:text-2xl">
            {product.name}
          </p>

          <div className="shrink-0">
            <div className="relative isolate flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/30">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-y-full scale-50 rounded-full transition-transform duration-300 group-hover:translate-y-0 group-hover:scale-100"
                style={{ backgroundColor: product.accent }}
              />
              <svg
                width="16"
                height="16"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                className="relative text-white"
              >
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!product.href) return card;

  return (
    <Link href={product.href} className="group block h-full">
      {card}
    </Link>
  );
}

export default function IndustryPlatformSection({
  industryName,
}: {
  industryName: string;
}) {
  const cards = PLATFORM_PRODUCTS;

  return (
    <div className="flex flex-col">
      <div className="mx-auto mb-16 max-w-4xl text-center md:mb-8">

        <div className="flex flex-col items-center pb-4 text-center">
          <AnimatedEyebrow className="justify-center">
            Platform
          </AnimatedEyebrow>
          <h2 className="mt-4 max-w-6xl text-balance font-heading text-3xl font-normal tracking-tight text-white md:text-5xl">
            <span className="text-white">One platform to run {industryName}</span>{" "}
            end-to-end
          </h2>

        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}

        <div className="col-span-full flex flex-col items-center justify-center gap-3 rounded-lg bg-sognos-navy/90 p-6 text-center md:flex-row md:gap-4">
          <h3 className="shrink-0 font-heading text-2xl font-medium leading-tight tracking-tight text-white">
            Manage demand - Coordinate workforce - Track outcomes
          </h3>
        </div>

        <div className="col-span-full flex flex-col rounded-lg gap-8 bg-sognos-navy p-6 lg:p-6">
          <div className="flex flex-col items-center justify-center gap-3 text-center md:flex-row md:gap-4">
            <h3 className="shrink-0 font-heading text-2xl font-medium leading-tight tracking-tight text-white">
              Powered by
            </h3>

            <div className="flex justify-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full px-4 py-3 sm:gap-5 sm:px-6">
                <Image
                  src="/logos/Dynamics365.svg"
                  alt="Microsoft Dynamics 365"
                  width={96}
                  height={96}
                  className="h-8 w-auto"
                />
                <div
                  aria-hidden="true"
                  className="h-8 w-px bg-sognos-navy/30"
                />
                <Image
                  src="/logos/Sognos-Solutions-Solutions-Partner.webp"
                  alt="Microsoft Solutions Partner"
                  width={480}
                  height={113}
                  className="h-8 w-auto"
                />
                <div
                  aria-hidden="true"
                  className="h-8 w-px bg-sognos-navy/30"
                />
                <Image
                  src="/logos/copilot-logo.svg"
                  alt="Microsoft Copilot"
                  width={128}
                  height={128}
                  className="h-11 w-auto"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
