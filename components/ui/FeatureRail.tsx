// SCAFFOLD (2026-08-07 rebuild) — direct copy of Routable's "Scale your
// payment operations" swiper section. Reference:
// routable.com main product page mass-payouts section (see docs/CHANGELOG.md).
//
// Hardcoded values from the reference (tokenize in Refine):
// - Card width: 288px mobile (max-w-72), 628px desktop (arbitrary)
// - Card gap: 24px (gap-6)
// - Panel aspect: 628 / 420
// - Label → panel spacing: 16px mobile, 20px desktop (mt-4 lg:mt-5)
// - Panel → body spacing: 16px mobile, 28px desktop (mt-4 lg:mt-7)
// - Body → link spacing: 12px mobile, 20px desktop (space-y-3 lg:space-y-5)
// - Body/link font: 16px (text-base)
// - Body opacity: 80%
// - Link: dark text (not accent), arrow translate-x on hover
// - Panel padding: p-8 lg:p-12 (ADDED — Routable's rive canvases fill exactly;
//   our placeholder SVGs need breathing room. Remove in Refine when real
//   mocks land.)
"use client";

import type { ReactNode } from "react";
import Link from "next/link";

export type FeatureRailCard = {
  eyebrow: string; // label above panel
  body: string;
  href: string;
  ctaLabel?: string;
  media: ReactNode;
  tint: string;
};

export type FeatureRailProps = {
  cards: FeatureRailCard[];
};

export default function FeatureRail({ cards }: FeatureRailProps) {
  return (
    <div className="w-full overflow-visible">
      <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {cards.map((card, i) => {
          const label = card.ctaLabel ?? `Explore ${card.eyebrow}`;
          return (
            <div
              key={`${card.eyebrow}-${i}`}
              className="w-72 shrink-0 snap-start md:w-[628px]"
            >
              <div className="lg:pb-8">
                {/* Label */}
                <div className="text-base font-medium text-sognos-heading">
                  {card.eyebrow}
                </div>

                {/* Tinted panel with UI mock */}
                <div
                  className={`relative mt-4 overflow-hidden rounded lg:mt-5 ${card.tint}`}
                >
                  <div className="relative z-10 flex aspect-[628/420] w-full items-center justify-center p-8 lg:p-12">
                    {card.media}
                  </div>
                </div>

                {/* Body + explore link */}
                <div className="mt-4 space-y-3 lg:mt-7 lg:space-y-5">
                  <div className="text-base leading-relaxed text-sognos-body opacity-80">
                    {card.body}
                  </div>
                  <Link href={card.href} className="inline-block">
                    <div className="group inline-flex items-center gap-x-2 text-base text-sognos-heading">
                      <div>{label}</div>
                      <div className="transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
