"use client";

import Image from "next/image";
import Link from "next/link";

// FLAG: SognosGenogram has no dedicated bg image yet — using Care bg as placeholder.
// Swap /images/home/SognosGenogram-bg.* once available.
const PRODUCTS = [
  {
    name: "One platform. From intake to outcome.",
    lead: "Deliver safer, simpler care in the field.",
    rest: " From mental health to aged care, we help providers reduce admin and stay service-ready - whatever changes come next.",
    accent: "#1d96fc",
    href: "/products/sognoscare",
    logo: "/logos/sognos-care-logo.svg",
    bgImage:
      "https://plus.unsplash.com/premium_photo-1663089870095-c231a534ac31?q=80&w=1702&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "The right worker for every job, in real time.",
    lead: "From scheduling to routing, SognosRoster puts the right worker on every shift",
    rest: " - factoring skills, location, availability and compliance automatically.",
    accent: "#59bbf7",
    href: "/products/sognosroster",
    logo: "/logos/sognos-roster-logo.svg",
    bgImage: "/images/home/industries/industrial-services.jpg",
  },
  {
    name: "Family context. Built into every record.",
    lead: "Sognos Genogram maps the relationships, histories, and support networks that shape service delivery",
    rest: " - giving your team the context they need to deliver better outcomes.",
    accent: "#91278c",
    href: "/products/sognosgenogram",
    logo: "/logos/SognosGenogram-logo.svg",
    bgImage:
      "https://images.unsplash.com/photo-1674629358478-bff878ed9727?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // FLAG: placeholder — swap when Genogram bg image available
  },
] as const;

function ProductCard({ product }: { product: (typeof PRODUCTS)[number] }) {
  return (
    // AngelList column: top hairline → title → image card → description → bottom hairline
    <Link
      href={product.href}
      className="group flex flex-col border-t border-b border-white/10 pt-4 pb-10 w-[82vw] shrink-0 snap-start md:w-auto md:min-w-0 md:shrink"
    >
      {/* Title above the image */}
      <h3 className="font-heading text-2xl font-normal tracking-tight text-white md:text-lg">
        {product.name}
      </h3>

      {/* Image card */}
      <div className="relative mt-4 aspect-[4/5] max-h-[430px] overflow-hidden rounded-lg">
        <Image
          src={product.bgImage}
          alt=""
          fill
          className="scale-105 object-cover object-center opacity-80 transition-[scale,filter] duration-800 motion-safe:group-hover:scale-100 group-hover/solutions:brightness-[0.60] group-hover:brightness-100!"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-sognos-navy-dark/45 transition-colors duration-500 group-hover/cards:bg-sognos-navy-dark/70 group-hover:!bg-sognos-navy-dark/25" />

        {/* Product logo — centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={product.logo}
            alt={product.name}
            width={140}
            height={32}
            className="h-10 w-auto object-contain brightness-0 invert"
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

      {/* Description below the image — always visible */}
      <p className="mt-5 text-base tracking-tight leading-normal text-white/70">
        <span className="text-white">{product.lead}</span>
        {product.rest}
      </p>
    </Link>
  );
}

export default function HomeProductCards() {
  return (
    <section className="bg-sognos-navy-dark pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="group/cards flex items-start snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-6 scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible lg:gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.href} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
