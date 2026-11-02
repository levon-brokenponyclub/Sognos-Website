"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { LAYOUT, TYPE } from "@/components/layout/sections/sognoscare/typeScale";

// Home · Product cards — Inspector option D "Expanding columns" (2026-11-02):
// the three products as photo columns on navy-deep. On desktop the active
// column (first by default, then whichever is hovered or focused) widens and
// reveals its description and link. Stacked and fully open below lg.

const PRODUCTS = [
  {
    name: "SognosCare",
    href: "/products/sognoscare",
    logo: "/logos/sognos-care-logo.svg",
    photo: "/product/CareBg.avif",
    deep: "#0f1936",
    accent: "#1d96fc",
    lead: "Deliver safer, simpler care in the field",
    rest: " with intake, plans, compliance and outcomes connected in one workflow.",
  },
  {
    name: "SognosRoster",
    href: "/products/sognosroster",
    logo: "/logos/sognos-roster-logo.svg",
    photo: "/product/RosterBg.avif",
    deep: "#104b90",
    accent: "#59bbf7",
    lead: "Put the right worker on every shift",
    rest: " with skills, location, availability and compliance factored in automatically.",
  },
  {
    name: "SognosGenogram",
    href: "/products/sognosgenogram",
    logo: "/logos/SognosGenogram-logo.svg",
    photo: "/product/GenoBg.avif",
    deep: "#3a0f45",
    accent: "#91278c",
    lead: "Map relationships, histories and support networks",
    rest: " so every worker has the context they need to deliver better outcomes.",
  },
] as const;

const GLOW =
  "radial-gradient(55% 60% at 15% 10%, color-mix(in srgb, var(--sognos-blue-accent) 40%, transparent), transparent 70%), radial-gradient(45% 50% at 95% 90%, color-mix(in srgb, var(--sognos-roster-accent) 30%, transparent), transparent 70%)";

export default function HomeProductColumns() {
  const [active, setActive] = useState(0);

  return (
    <section className={`relative overflow-hidden bg-sognos-navy-darkest text-white ${LAYOUT.section}`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: GLOW }} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex max-w-3xl flex-col gap-4">
          <SectionLabel tone="dark">Products</SectionLabel>
          <h2 className={`${TYPE.h2} text-white`}>Three products. One platform.</h2>
        </div>
        <div
          className="mt-12 flex flex-col gap-3 lg:h-[540px] lg:flex-row lg:gap-4"
          onMouseLeave={() => setActive(0)}
        >
          {PRODUCTS.map((p, i) => {
            const open = i === active;
            return (
              <Link
                key={p.name}
                href={p.href}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-lg border border-white/10 transition-[flex-grow] duration-600 ease-[cubic-bezier(.22,1,.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none lg:min-h-0 lg:flex-1"
                style={{ flexGrow: open ? 2.4 : 1 }}
              >
                <Image
                  src={p.photo}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 15%, color-mix(in srgb, ${p.deep} 92%, transparent))`,
                  }}
                />
                <div className="relative flex flex-col gap-4 p-5 lg:p-7">
                  <span aria-hidden="true" className="block h-1 w-10 rounded-full" style={{ background: p.accent }} />
                  <Image src={p.logo} alt="" width={160} height={28} className="h-7 w-auto self-start" />
                  <h3 className={`${TYPE.h3Small} text-white`}>{p.name}</h3>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-400 motion-reduce:transition-none ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0"
                    }`}
                  >
                    <div className="flex flex-col gap-4 overflow-hidden">
                      <p className="max-w-md text-base leading-relaxed text-white/80">
                        <span className="text-white">{p.lead}</span>
                        {p.rest}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white">
                        Explore {p.name}
                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                          &rarr;
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
