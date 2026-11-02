"use client";

import Image from "next/image";
import Link from "next/link";
import { useBookDemo } from "@/lib/BookDemoContext";
import { TYPE } from "@/components/layout/sections/sognoscare/typeScale";

const HEADLINE = "Proven in UK healthcare. Shaped for Australia and New Zealand.";
const SUBTEXT =
  "Sognos is partnering with DigPacks to bring Microsoft-based applications, automation and AI capabilities from the NHS and public sector to health, social and community care organisations across Australia and New Zealand.";
const TAGLINE = "Apps, Automation, Data & AI";

// Hero index → the matching Solutions tile.
const INDEX = [
  { id: "risk-management", label: "Risk Management" },
  { id: "safety-lens", label: "Safety Lens" },
  { id: "people-hr", label: "People & HR Management" },
  { id: "vaccination-hub", label: "Vaccination Hub" },
];

// The mockup's 135° DigPacks gradient (base → dark); the shared token keeps
// its live stops until the product gradients are signed off.
const HERO_GRADIENT =
  "linear-gradient(135deg, var(--sognos-digpacks-base) 0%, #8a1a5e 50%, var(--sognos-digpacks-dark) 100%)";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

// Products Inspector · Hero C "Editorial", gradient tone: the DigPacks mark
// over an oversized headline (8) beside a solutions index (4), then a wide
// photo band. "Book a Demo" is white here: the mockup's magenta button disappears
// into the magenta gradient.
export default function DigPacksHero() {
  const { openModal } = useBookDemo();

  return (
    <section
      id="top"
      data-header-dark
      className="relative overflow-hidden pt-36 pb-20 text-white md:pt-44 md:pb-28"
      style={{ background: HERO_GRADIENT }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-24 size-[34rem] rounded-full opacity-[.12]"
        style={{ background: HERO_GRADIENT }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col items-start gap-6 lg:col-span-8">
          <Image
            src="/images/digpacks/digpacks-logo-white.webp"
            alt="DigPacks"
            width={1470}
            height={353}
            priority
            className="h-9 w-auto"
          />
          <h1 className="font-heading text-5xl font-normal leading-[1.02] tracking-[-0.03em] text-white text-balance md:text-6xl">
            {HEADLINE}
          </h1>
          <p className={`${TYPE.heroSub} text-white`}>{SUBTEXT}</p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => openModal("digpacks")}
              className={`min-h-11 rounded-full bg-white px-7 py-3.5 text-base font-medium text-sognos-heading transition-colors hover:bg-sognos-digpacks-deep hover:text-white ${FOCUS}`}
            >
              Book a Demo
            </button>
            <Link
              href="/contact"
              className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-base font-medium text-white transition-opacity hover:opacity-80 ${FOCUS}`}
            >
              Talk to Sales
              <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-end gap-4 lg:col-span-4">
          <p className="text-sm text-white">{TAGLINE}</p>
          <ul className="border-t border-white/20">
            {INDEX.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`group flex min-h-12 items-center justify-between gap-4 border-b border-white/20 py-3 text-white ${FOCUS}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs tabular-nums text-white/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    &rarr;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-7xl px-6">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg md:aspect-[21/8]">
          <Image
            src="/images/digpacks/nurse.png"
            alt="Healthcare worker using a tablet"
            fill
            priority
            sizes="(min-width: 1280px) 1232px, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in srgb, var(--sognos-digpacks-dark) 70%, transparent), transparent 60%)",
            }}
          />
          <p className="absolute bottom-6 left-6 max-w-sm font-heading text-2xl text-white md:bottom-10 md:left-10 md:text-3xl">
            {TAGLINE}
          </p>
        </div>
      </div>
    </section>
  );
}
