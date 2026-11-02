import Link from "next/link";
import { PRODUCTS } from "@/lib/constants";
import SolutionHeroDemoButton from "@/components/layout/sections/SolutionHeroDemoButton";
import {
  ParaformPanel,
  type WorksProduct,
} from "@/components/layout/sections/shared/ProductWorksCard";

// Home · Product stack — docs/mockups/home/hero-stack.html, after angellist.com
// (2026-11-02). Each product is a full-width card with a rounded top that
// overlaps the one before it on the hero's navy field; the covered card
// drifts at half speed as the next rises (`.home-stack-card` in globals.css).
// Cards alternate white / tint. Left: dot label, name, lede, CTAs and three
// feature links. Right: the "Works with" Paraform panel at square size.
// Copy is placeholder pending sign-off.

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sognos-blue-accent";

const CARDS: {
  product: WorksProduct;
  label: string;
  dot: string;
  lead: string;
  rest: string;
  links: string[];
}[] = [
  {
    product: "care",
    label: "Care operations & compliance",
    dot: "#3b6fe0",
    lead: "This is the platform behind care providers who run intake, plans, compliance and outcomes in one workflow.",
    rest: " The same record from referral to review, audit-ready by default.",
    links: ["Case management", "Compliance & audit trail", "Reporting & analytics"],
  },
  {
    product: "roster",
    label: "Workforce scheduling & optimisation",
    dot: "#1d96fc",
    lead: "This is the engine that puts the right worker on every shift, with skills, location and availability matched automatically.",
    rest: " Real-time changes, re-optimised in minutes.",
    links: ["Intelligent scheduling", "Skills & compliance matching", "Route optimisation"],
  },
  {
    product: "genogram",
    label: "Relationship & family context",
    dot: "#91278c",
    lead: "This is the map of who matters around every client, built into the case record.",
    rest: " Support networks, histories and risk, carried across every handover.",
    links: ["Genogram builder", "Support network mapping", "Copilot AI narrative"],
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
              className={`home-stack-card w-full rounded-t-3xl border-t border-sognos-line md:rounded-t-[40px] ${
                i % 2 === 0 ? "bg-white" : "bg-sognos-tint"
              }`}
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
                      {card.lead}
                      <span className="text-sognos-muted">{card.rest}</span>
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      <Link
                        href={p.href}
                        className={`inline-flex h-12 items-center rounded-full bg-sognos-heading px-5 text-base text-white transition-colors hover:bg-sognos-blue-accent ${FOCUS}`}
                      >
                        Explore {p.name}
                      </Link>
                      <SolutionHeroDemoButton
                        className={`h-12 border border-sognos-line bg-white px-5 py-0 font-normal text-sognos-heading transition-colors hover:border-sognos-heading hover:opacity-100 ${FOCUS}`}
                      />
                    </div>
                    <ul className="mt-10 border-b border-sognos-line">
                      {card.links.map((label) => (
                        <li key={label}>
                          <Link
                            href={p.href}
                            className={`group flex min-h-12 items-center justify-between gap-4 border-t border-sognos-line py-3 text-sognos-heading ${FOCUS}`}
                          >
                            <span>{label}</span>
                            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                              &rarr;
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-span-full md:col-[8/-1]">
                  <ParaformPanel
                    product={card.product}
                    name={p.name}
                    className="isolate aspect-square rounded-xl px-6 pt-10"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
