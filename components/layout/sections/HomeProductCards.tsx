"use client";

import Image from "next/image";
import Link from "next/link";

// FLAG: SognosGenogram has no dedicated bg image yet — using Care bg as placeholder.
// Swap /images/home/SognosGenogram-bg.* once available.
const PRODUCTS = [
  {
    name: "One platform. From intake to outcome.",
    lead: "Deliver safer, simpler care in the field",
    rest: " with intake, plans, compliance and outcomes connected in one workflow.",
    accent: "#1d96fc",
    href: "/products/sognoscare",
    logo: "/logos/sognos-care-logo-color.svg",
    bgImage:
      "https://plus.unsplash.com/premium_photo-1663089870095-c231a534ac31?q=80&w=1702&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "The right worker for every job, in real time.",
    lead: "Put the right worker on every shift",
    rest: " with skills, location, availability and compliance factored in automatically.",
    accent: "#59bbf7",
    href: "/products/sognosroster",
    logo: "/logos/sognos-roster-logo-color.svg",
    bgImage: "/images/home/industries/industrial-services.jpg",
  },
  {
    name: "Family context. Built into every record.",
    lead: "Map relationships, histories and support networks",
    rest: " so every worker has the context they need to deliver better outcomes.",
    accent: "#91278c",
    href: "/products/sognosgenogram",
    logo: "/logos/sognos-genogram-logo-color.svg",
    bgImage:
      "https://images.unsplash.com/photo-1674629358478-bff878ed9727?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // FLAG: placeholder — swap when Genogram bg image available
  },
] as const;

function ProductCard({ product }: { product: (typeof PRODUCTS)[number] }) {
  return (
    // AngelList column: image card → description → bottom hairline.
    // The top hairline and the title above it are commented out, not deleted.
    <Link
      href={product.href}
      className="group flex flex-col border-b border-sognos-line pt-4 pb-10 w-[82vw] shrink-0 snap-start md:w-auto md:min-w-0 md:shrink"
    >
      {/* Title above the image */}
      {/* <h3 className="font-heading text-2xl font-normal tracking-tight text-white md:text-lg">
        {product.name}
      </h3> */}

      {/* Image card. `aspect-[334/354]` is SolutionsSection's ratio, and the
          track below now uses its `gap-2`, so the two card rows share one
          proportion and one rhythm. The `max-h` cap is gone — it was there to
          stop the 4/5 ratio running away, which 334/354 does not. */}
      {/* Light re-skin 2026-08-07 (moved onto the tint section): white panel
          + hairline + color logo. Navy overlay + white-invert logo variant is
          in git history if the dark treatment returns. */}
      <div className="relative mt-4 aspect-[334/354] overflow-hidden rounded-lg border border-sognos-line bg-white">
        {/* Background image — commented out, not deleted. `bgImage` stays on
            each PRODUCTS entry, so uncommenting restores it as it was. */}
        {/* <Image
          src={product.bgImage}
          alt=""
          fill
          className="scale-105 object-cover object-center opacity-80 transition-[scale,filter] duration-800 motion-safe:group-hover:scale-100 group-hover/solutions:brightness-[0.60] group-hover:brightness-100!"
        /> */}

        {/* Product logo — centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={product.logo}
            alt={product.name}
            width={140}
            height={32}
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Arrow button — bottom-right. Hover: accent fill slides up. Arrow stays white. */}
        <div className="absolute bottom-6 right-6">
          <div className="relative isolate flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-sognos-line">
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
              className="relative text-sognos-heading transition-colors duration-300 group-hover:text-white"
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

      {/* Description below the image — always visible */}
      <p className="mt-5 text-base tracking-tight leading-normal text-sognos-body">
        <span className="text-sognos-heading">{product.lead}</span>
        {product.rest}
      </p>
    </Link>
  );
}

export default function HomeProductCards() {
  return (
    // No background/padding of its own — renders inside HowSognosWorks
    // (2026-08-07 merge), which supplies the tint section, container, and
    // vertical rhythm.
    <div className="mx-auto max-w-6xl">
      <div className="group/cards flex items-start snap-x snap-mandatory gap-2 overflow-x-auto scroll-px-6 scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.href} product={product} />
        ))}
      </div>
    </div>
  );
}
