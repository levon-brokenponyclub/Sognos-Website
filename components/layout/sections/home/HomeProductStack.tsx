import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/constants";
import MeshBackdrop from "@/components/layout/sections/home/stack/MeshBackdrop";
import CareBoard from "@/components/layout/sections/home/stack/CareBoard";
import RosterMatch from "@/components/layout/sections/home/stack/RosterMatch";
import GenogramFrame from "@/components/layout/sections/home/stack/GenogramFrame";

// Home · Product stack — docs/mockups/home/hero-stack.html, after angellist.com
// (2026-11-02). Each product is a full-width card with a rounded top that
// overlaps the one before it on the hero's navy field; the covered card
// drifts at half speed as the next rises (`.home-stack-card` in globals.css).
// Each card fills from white to its product colour as it scrolls into view
// (`--stack-fill`, `.home-stack-card` in globals.css). Left: dot label, name,
// description and Explore. Right: a square panel on an animated mesh in the
// product's colours (MeshBackdrop) with the product's timed graphic — Care
// board, Roster match and route, Genogram family map (home/stack/, mockup
// option D, 2026-11-03). Card copy 2026-11-03 (client).

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sognos-blue-accent";

type Mesh = readonly [string, string, string, string];

const CARDS: {
  product: "care" | "roster" | "genogram";
  label: string;
  dot: string;
  /** Full scroll-fill colour (from white). */
  fill: string;
  description: string;
  /** Mesh palette: deep → base → accent → soft (product ladder in tokens.css). */
  mesh: Mesh;
  graphic: ReactNode;
}[] = [
  {
    product: "care",
    label: "Care operations & compliance",
    dot: "#3b6fe0",
    fill: "color-mix(in srgb, var(--sognos-care-base) 8%, white)",
    description:
      "Deliver safer, simpler care in the field. From mental health to aged care, we help providers reduce admin and stay service-ready - whatever changes come next.",
    mesh: ["#0b1430", "#3b6fe0", "#8ea8f0", "#eef3fd"],
    graphic: <CareBoard />,
  },
  {
    product: "roster",
    label: "Workforce scheduling & optimisation",
    dot: "#1d96fc",
    fill: "color-mix(in srgb, var(--sognos-roster-accent) 12%, white)",
    description:
      "From scheduling to routing, SognosRoster puts the right worker on every shift - factoring skills, location, availability and compliance automatically.",
    mesh: ["#03112f", "#1d96fc", "#59bbf7", "#eef8fe"],
    graphic: <RosterMatch />,
  },
  {
    product: "genogram",
    label: "Relationship & family context",
    dot: "#91278c",
    fill: "var(--sognos-genogram-soft)",
    description:
      "SognosGenogram maps the relationships, histories, and support networks that shape service delivery - giving your team the context they need to deliver better outcomes.",
    mesh: ["#1a0224", "#91278c", "#d9a6d6", "#f8eef8"],
    graphic: <GenogramFrame />,
  },
];

export default function HomeProductStack() {
  return (
    <section aria-label="Products" className="relative flex w-full flex-col overflow-clip bg-sognos-navy">
      {CARDS.map((card, i) => {
        const p = PRODUCTS[card.product];
        return (
          <div
            key={card.product}
            className={`relative w-full${i === 0 ? "" : " -mt-6 md:-mt-10"}`}
            style={{ zIndex: i }}
          >
            <div
              className="home-stack-card w-full rounded-t-3xl border-t border-sognos-line md:rounded-t-[40px]"
              style={{ "--stack-fill": card.fill } as CSSProperties}
            >
              <div className="mx-auto grid max-w-7xl gap-8 px-6 pt-8 pb-12 md:grid-cols-12 md:pt-12 md:pb-18 lg:pt-16 lg:pb-24">
                <div className="col-span-full flex flex-col items-start gap-6 md:col-span-6">
                  <p className="flex items-center gap-2 text-lg text-sognos-heading">
                    <span aria-hidden="true" className="size-3 rounded-full" style={{ background: card.dot }} />
                    {card.label}
                  </p>
                  <div>
                    <h2 className="font-heading text-3xl font-normal leading-[1.2] tracking-[-0.01em] text-sognos-heading md:text-4xl">
                      {p.name}
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-sognos-heading">
                      {card.description}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      <Link
                        href={p.href}
                        className={`inline-flex h-12 items-center rounded-full bg-sognos-heading px-5 text-base text-white transition-[background-color,scale] duration-150 ease-out hover:bg-sognos-blue-accent active:scale-[0.97] ${FOCUS}`}
                      >
                        Explore {p.name}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="relative isolate col-span-full aspect-square overflow-hidden rounded-xl md:col-[8/-1]">
                  <MeshBackdrop colors={card.mesh} />
                  {card.graphic}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
