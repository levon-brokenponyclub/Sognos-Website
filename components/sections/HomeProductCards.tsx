"use client";

import Image from "next/image";
import Link from "next/link";

// FLAG: SognosGenogram has no dedicated bg image yet — using Care bg as placeholder.
// Swap /images/home/SognosGenogram-bg.* once available.
const PRODUCTS = [
  {
    name: "SognosCare",
    overview:
      "Care operations and compliance on one platform — intake to outcome.",
    accent: "#1d96fc",
    href: "/products/sognoscare",
    logo: "/logos/sognos-care-logo.svg",
    bgImage: "/images/home/SognosCare-bg.avif",
  },
  {
    name: "SognosRoster",
    overview:
      "Workforce scheduling and optimisation built for care providers.",
    accent: "#59bbf7",
    href: "/products/sognosroster",
    logo: "/logos/sognos-roster-logo.svg",
    bgImage: "/images/home/SognosRoster-bg.png",
  },
  {
    name: "Sognos Genogram",
    overview:
      "Relationship and family-context mapping for complex care.",
    accent: "#91278c",
    href: "/products/sognosgenogram",
    logo: "/logos/SognosGenogram-logo.svg",
    bgImage: "/images/home/SognosCare-bg.avif", // FLAG: placeholder — swap when Genogram bg image available
  },
] as const;

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
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
  );
}

function ProductCard({
  product,
}: {
  product: (typeof PRODUCTS)[number];
}) {
  return (
    // AngelList column: top hairline → title → image card → description → bottom hairline
    <Link
      href={product.href}
      className="group flex flex-col border-t border-b border-white/15 pt-4 pb-6 w-[82vw] shrink-0 snap-start md:w-auto md:min-w-0 md:shrink"
    >
      {/* Title above the image */}
      <h3 className="font-heading text-2xl font-medium tracking-tight text-white md:text-[1.75rem]">
        {product.name}
      </h3>

      {/* Image card */}
      <div className="relative mt-4 aspect-[3/4] overflow-hidden rounded-lg">
        <Image
          src={product.bgImage}
          alt=""
          fill
          className="object-cover opacity-20"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-sognos-navy-dark/75" />

        {/* Product logo — top-left */}
        <div className="absolute left-6 top-6">
          <Image
            src={product.logo}
            alt={product.name}
            width={140}
            height={32}
            className="h-8 w-auto object-contain brightness-0 invert"
          />
        </div>

        {/* Arrow button — bottom-right. Hover: accent fill slides up. Arrow stays white. */}
        <div className="absolute bottom-6 right-6">
          <div className="relative isolate flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/30">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-y-full scale-50 rounded-full transition-transform duration-300 group-hover:translate-y-0 group-hover:scale-100"
              style={{ backgroundColor: product.accent }}
            />
            <ArrowIcon className="relative h-5 w-5 text-white" />
          </div>
        </div>
      </div>

      {/* Description below the image — always visible */}
      <p className="mt-5 text-lg leading-snug text-white/70">
        {product.overview}
      </p>
    </Link>
  );
}

export default function HomeProductCards() {
  return (
    <section className="bg-sognos-navy-dark pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-start snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-6 scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible lg:gap-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.href} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
