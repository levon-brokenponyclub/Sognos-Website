"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PRODUCT_CARDS, type ProductCardData } from "./ProductCard";

const EYEBROWS: Record<string, string> = {
  SognosCare: "Care delivery",
  SognosRoster: "Workforce coordination",
  "SognosGenogram": "Family context",
};

const CUSTOMER_STAT = {
  logo: "/images/logos/clients/flourish.webp",
  logoAlt: "Flourish Australia",
  testimonial:
    "With Dynamics 365 and Power Platform at its core, Flourish Australia now has a unified digital foundation to support innovation, continuous improvement, and sustainable growth - ensuring technology keeps pace with its mission to support mental health recovery across Australia.",
  stat: "1,100",
  caption: "Users across the Flourish Australia network",
} as const;

function ArrowGlyph({ className }: { className?: string }) {
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

function ReadMoreLink({
  href,
  label = "Read more",
}: {
  href: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-x-3 text-sm font-medium text-sognos-heading"
    >
      <span>{label}</span>
      <span className="relative flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sognos-heading text-white">
        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-[150%]">
          <ArrowGlyph className="w-[9px]" />
        </span>
        <span className="absolute inset-0 flex -translate-x-[150%] items-center justify-center transition-transform duration-300 group-hover:translate-x-0">
          <ArrowGlyph className="w-[9px]" />
        </span>
      </span>
    </Link>
  );
}


function TabPanel({ data }: { data: ProductCardData }) {
  const eyebrow = EYEBROWS[data.logoAlt] ?? "Product";
  return (
    <div className="flex w-full gap-x-5 gap-y-2.5 max-md:flex-col max-md:rounded-2xl max-md:bg-sognos-navy/[0.04] max-md:p-2.5 max-md:pt-8">
      {/* Col 1: text + customer-context image (Paraform inner two-col) */}
      <div className="flex flex-1 justify-between gap-y-10 rounded-2xl bg-sognos-navy/[0.04] max-sm:flex-col md:gap-y-8 md:px-2 md:py-2.5">
        <div className="flex flex-1 flex-col justify-between gap-y-6 md:gap-y-8 md:px-6 md:pt-6 md:pb-2">
          <div className="space-y-3 max-md:px-3 md:space-y-4 lg:max-w-[260px]">
            <Image
              src={data.logo}
              alt={data.logoAlt}
              width={200}
              height={32}
              className="h-7 w-auto object-contain"
            />
            <p className="text-sm text-sognos-muted">{eyebrow}</p>
            <h2 className="whitespace-pre-line font-heading text-2xl font-normal leading-tight tracking-tight text-sognos-heading text-balance lg:text-3xl">
              {data.byline}
            </h2>
            <div className="max-md:hidden">
              <ReadMoreLink href={data.ctaLink} />
            </div>
          </div>
          <p className="text-lg leading-relaxed text-sognos-body max-md:px-3 max-md:text-balance lg:max-w-[280px]">
            {data.description}
          </p>
          <div className="md:hidden max-md:px-3 max-md:pt-2.5">
            <ReadMoreLink href={data.ctaLink} />
          </div>
        </div>
        <div className="relative aspect-[325/396] w-full shrink-0 overflow-hidden rounded-2xl sm:max-w-[50%] md:aspect-[393/480] xl:max-w-[393px]">
          <Image
            src={CUSTOMER_STAT.logo}
            alt={CUSTOMER_STAT.logoAlt}
            fill
            sizes="(min-width: 1280px) 393px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Col 2: customer stat card (dark) */}
      <div className="relative isolate flex w-full shrink-0 flex-col justify-between gap-y-10 overflow-hidden rounded-2xl bg-sognos-navy-dark px-6 py-8 text-white md:gap-y-12 md:p-8 lg:max-w-[400px]">
        <div className="flex flex-col items-start gap-y-6">
          <Image
            src={CUSTOMER_STAT.logo}
            alt={CUSTOMER_STAT.logoAlt}
            width={300}
            height={80}
            className="h-7 w-auto object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="font-heading text-lg leading-relaxed text-white/80 text-balance">
            {CUSTOMER_STAT.testimonial}
          </p>
        </div>
        <div className="flex items-end justify-between gap-x-2">
          <div className="space-y-1.5">
            <div className="font-heading text-5xl font-light leading-[1.1] tracking-tight lg:text-6xl">
              {CUSTOMER_STAT.stat}
            </div>
            <p className="text-base text-white/65 text-balance">
              {CUSTOMER_STAT.caption}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductSection() {
  const [active, setActive] = useState(0);

  const total = PRODUCT_CARDS.length;
  const current = PRODUCT_CARDS[active];

  return (
    <section className="w-full overflow-clip bg-background pt-12 pb-10 md:pt-[120px] md:pb-20">
        <div className="mx-auto max-w-7xl space-y-10 px-4 md:space-y-12">
          {/* Section header */}
          <div className="flex w-full flex-col gap-y-5 max-lg:items-center max-lg:text-center">
            <h2 className="font-heading text-3xl font-normal tracking-tight text-sognos-heading text-balance md:text-4xl">
              The platform powering modern service delivery
            </h2>
            <p className="max-w-[612px] text-lg leading-relaxed text-sognos-body text-balance">
              SognosCare, SognosRoster, and SognosGenogram work together as one
              platform — purpose-built for service organisations running on
              Microsoft Dynamics 365 and Copilot-powered workflows.
            </p>
          </div>

          {/* Tab nav + progress */}
          <div className="relative space-y-12">
            <div className="flex items-center justify-between gap-x-5 max-xs:flex-col">
              <div className="max-md:w-full">
                {/* Mobile select */}
                <div className="relative w-full md:hidden">
                  <select
                    value={active}
                    onChange={(e) => setActive(Number(e.target.value))}
                    aria-label="Select product"
                    className="h-10 w-full cursor-pointer appearance-none rounded-full bg-sognos-heading/10 pl-4 pr-10 text-sm text-sognos-body focus:outline-hidden"
                  >
                    {PRODUCT_CARDS.map((p, i) => (
                      <option key={p.ctaLink} value={i}>
                        {p.logoAlt}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 pl-2 text-sognos-heading">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="w-5"
                      aria-hidden="true"
                    >
                      <path
                        d="M15 7.5L10 12.5L5 7.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Desktop pill tabs */}
                <div className="hidden md:flex md:gap-x-3">
                  {PRODUCT_CARDS.map((p, i) => {
                    const isActive = active === i;
                    return (
                      <button
                        key={p.ctaLink}
                        type="button"
                        onClick={() => setActive(i)}
                        aria-label={p.logoAlt}
                        aria-selected={isActive}
                        role="tab"
                        className="relative isolate py-1 cursor-pointer"
                      >
                        {isActive && (
                          <motion.span
                            layoutId="product-tab-pill"
                            className="absolute inset-0 -z-10 rounded-full bg-sognos-heading"
                            transition={{
                              type: "spring",
                              damping: 30,
                              stiffness: 320,
                            }}
                          />
                        )}
                        <span
                          className={`relative px-3 text-sm font-medium transition-colors duration-200 delay-150 ${
                            isActive ? "text-white" : "text-sognos-heading"
                          }`}
                        >
                          {p.logoAlt}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Progress + counter */}
              <div className="hidden items-center gap-x-4 md:flex">
                <div className="h-1 w-16 overflow-hidden rounded-full bg-sognos-heading/10">
                  <motion.div
                    className="h-full rounded-full bg-sognos-heading"
                    animate={{ width: `${((active + 1) / total) * 100}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
                <p className="text-sm text-sognos-body/80">
                  {active + 1} / {total}
                </p>
              </div>
            </div>

            {/* Panels (cross-fade) */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.ctaLink}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              >
                <TabPanel data={current} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
    </section>
  );
}
