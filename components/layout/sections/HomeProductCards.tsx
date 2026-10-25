"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

// Paraform image set (docs/mockups/home, cards A): the product photo under a
// wash of the product's deep → mid colour, with the white logo on a frosted
// tile. Photos and washes are the Frontline "Works with" set.
const PRODUCTS = [
  {
    name: "SognosCare",
    lead: "Deliver safer, simpler care in the field",
    rest: " with intake, plans, compliance and outcomes connected in one workflow.",
    accent: "#1d96fc",
    href: "/products/sognoscare",
    logo: "/logos/sognos-care-logo.svg",
    photo: "/product/CareBg.avif",
    wash: { deep: "#0f1936", mid: "#3b6fe0" },
  },
  {
    name: "SognosRoster",
    lead: "Put the right worker on every shift",
    rest: " with skills, location, availability and compliance factored in automatically.",
    accent: "#59bbf7",
    href: "/products/sognosroster",
    logo: "/logos/sognos-roster-logo.svg",
    photo: "/product/RosterBg.avif",
    wash: { deep: "#104b90", mid: "#59bbf7" },
  },
  {
    name: "SognosGenogram",
    lead: "Map relationships, histories and support networks",
    rest: " so every worker has the context they need to deliver better outcomes.",
    accent: "#91278c",
    href: "/products/sognosgenogram",
    logo: "/logos/SognosGenogram-logo.svg",
    photo: "/product/GenoBg.avif",
    wash: { deep: "#3a0f45", mid: "#91278c" },
  },
] as const;

function ProductCard({ product }: { product: (typeof PRODUCTS)[number] }) {
  return (
    <Link
      href={product.href}
      className="group flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.04] p-3 transition-colors hover:border-white/30 active:scale-[.99] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded">
        <Image
          src={product.photo}
          alt=""
          fill
          sizes="(min-width: 1024px) 400px, 82vw"
          className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: `linear-gradient(160deg, color-mix(in srgb, ${product.wash.deep} 55%, transparent), color-mix(in srgb, ${product.wash.mid} 35%, transparent))`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex items-center justify-center rounded border border-white/30 bg-white/10 px-6 py-4 backdrop-blur-md">
            {/* Decorative: the product name is the card heading. */}
            <Image
              src={product.logo}
              alt=""
              width={140}
              height={32}
              className="h-8 w-auto brightness-0 invert md:h-9"
            />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5">
        <span
          aria-hidden="true"
          className="block h-1 w-10 rounded-full"
          style={{ backgroundColor: product.accent }}
        />
        <h2 className="font-heading text-xl font-normal leading-snug tracking-[-0.01em] text-white">
          {product.name}
        </h2>
        <div className="mt-auto flex items-end justify-between gap-6">
          <p className="text-base leading-relaxed text-white/70">
            <span className="text-white">{product.lead}</span>
            {product.rest}
          </p>
          {/* Arrow — accent fill slides up on hover. */}
          <span
            aria-hidden="true"
            className="relative isolate flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/30 text-white"
          >
            <span
              className="absolute inset-0 translate-y-full scale-50 rounded-full transition-transform duration-300 group-hover:translate-y-0 group-hover:scale-100"
              style={{ backgroundColor: product.accent }}
            />
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="relative">
              <path
                d="M3 7h8M7 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function HomeProductCards() {
  const prefersReducedMotion = useReducedMotion();

  return (
    // Renders inside the hero (navy + glow artwork behind it), so no
    // background of its own. Snap rail below `lg`, 3-up grid from `lg`.
    <div className="mx-auto mt-14 max-w-7xl px-6 md:mt-20">
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-6 pb-2 scrollbar-hide lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:pb-0">
        {PRODUCTS.map((product, i) => (
          // Joins the hero's entrance stagger, after the CTAs.
          <motion.div
            key={product.href}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-[82vw] max-w-[380px] shrink-0 snap-start lg:w-auto lg:max-w-none"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
