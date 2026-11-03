"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { Avatar, FROST, StageBar, useStages } from "./parts";
import "./stack-graphics.css";

// SognosCare stack graphic, after Paraform's "Make exceptional hires, faster"
// (2026-11-03): clients move Referral → Assessment → Care plan on a white
// board while the bar's split-flap counts the clients, the board slides left,
// then a frosted client frame takes over and the bar turns to the outcome. ~6s
// once 35% in view; resets on leave so it replays; reduced motion shows the
// final frame. Data is illustrative.

const ACCENT = "var(--sognos-care-base)";

const STRIP = {
  blue: { label: "Assessing", cls: "bg-[#dbe7fb] text-sognos-care-ink" },
  red: { label: "Not eligible", cls: "bg-[#fde2e2] text-[#b42318]" },
  green: { label: "Plan accepted", cls: "bg-[#dcf5e6] text-[#15803d]" },
  sent: { label: "Plan sent", cls: "bg-[#dcf5e6] text-[#15803d]" },
} as const;

const PEOPLE = {
  EW: { name: "Emma Wilson", fund: "Home Care", from: "#f5c7a9", to: "#c9826b" },
  MT: { name: "Margaret Turner", fund: "NDIS", from: "#bcd3f7", to: "#3b6fe0" },
  RP: { name: "Ravi Patel", fund: "NDIS", from: "#c9e8d9", to: "#3d8f6a" },
  GL: { name: "Grace Lin", fund: "Home Care", from: "#e7d3f2", to: "#91278c" },
} as const;

type CardSpec = { who: keyof typeof PEOPLE; tone: keyof typeof STRIP; show: "1" | "2"; delay: number };

const COLUMNS: { title: string; counts: [number, number, number]; cards: CardSpec[] }[] = [
  {
    title: "Referral",
    counts: [0, 1, 1],
    cards: [
      { who: "EW", tone: "blue", show: "1", delay: 0.1 },
      { who: "EW", tone: "red", show: "2", delay: 0 },
    ],
  },
  {
    title: "Assessment",
    counts: [0, 3, 1],
    cards: [
      { who: "MT", tone: "blue", show: "1", delay: 0.2 },
      { who: "RP", tone: "blue", show: "1", delay: 0.3 },
      { who: "GL", tone: "blue", show: "1", delay: 0.4 },
      { who: "RP", tone: "red", show: "2", delay: 0 },
    ],
  },
  {
    title: "Care plan",
    counts: [0, 0, 2],
    cards: [
      { who: "MT", tone: "green", show: "2", delay: 0.15 },
      { who: "GL", tone: "sent", show: "2", delay: 0.3 },
    ],
  },
];

// Stage changes, in ms after the graphic comes into view.
const TIMELINE = [
  [400, 1],
  [2600, 2],
  [3800, 3],
  [6000, 4],
] as const;

function ClientCard({ who, tone, show, delay }: CardSpec) {
  const p = PEOPLE[who];
  const strip = STRIP[tone];
  return (
    <div
      className="hs-card overflow-hidden rounded-lg border border-sognos-line bg-[#f8fafc]"
      data-show={show}
      style={{ "--d": `${delay}s` } as CSSProperties}
    >
      <div className="flex items-center gap-2 px-2.5 py-2">
        <span className="block size-6 shrink-0 overflow-hidden rounded-lg">
          <Avatar id={`${who}${show}`} from={p.from} to={p.to} />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[11px] font-semibold text-sognos-heading">{p.name}</span>
          <span className="block text-[9px] text-[#64748b]">{p.fund}</span>
        </span>
      </div>
      <div className={`px-2.5 py-1 text-[9px] font-medium ${strip.cls}`}>{strip.label}</div>
    </div>
  );
}

export default function CareBoard() {
  const ref = useStages<HTMLDivElement>(TIMELINE);

  return (
    <div ref={ref} className="hs-seq hs-care absolute inset-0" data-s="0" data-ui aria-hidden="true">
      <div className="hs-board absolute top-[13%] left-[9%] flex h-[62%] w-[125%] rounded-lg border border-sognos-line bg-white">
        {COLUMNS.map((col, ci) => (
          <div
            key={col.title}
            className={`flex min-w-0 flex-1 flex-col ${ci < COLUMNS.length - 1 ? "border-r border-sognos-line" : ""}`}
          >
            <div className="px-3 pt-3 pb-2">
              <p className="text-[12px] font-semibold text-sognos-heading">{col.title}</p>
              <p className="relative mt-0.5 h-3 text-[9px] text-[#64748b]">
                {col.counts.map((c, i) => (
                  <span key={i} className="hs-n" data-at={i}>
                    {c} {c === 1 ? "client" : "clients"}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex flex-col gap-2 px-2">
              {col.cards.map((c) => (
                <ClientCard key={`${c.who}${c.show}`} {...c} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={`hs-frame absolute top-[7%] right-[17%] bottom-[30%] left-[17%] p-2 ${FROST}`}>
        <div className="relative size-full overflow-hidden rounded-lg">
          <Avatar id="MTF" from="#bcd3f7" to="#2a55c4" />
          <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-sognos-heading/70 to-transparent" />
          <span className="absolute bottom-3 left-3.5 text-white">
            <span className="block text-[15px] font-medium">Margaret Turner</span>
            <span className="block text-[11px] text-white/80">NDIS &middot; Personal care, 3&times; weekly</span>
          </span>
        </div>
      </div>

      <StageBar
        accent={ACCENT}
        icon={<Image src="/logos/icon-sognos-care.svg" alt="" width={24} height={24} className="size-6 brightness-0 invert" />}
        first={["Active clients", "Total this week"]}
        last={[
          "Care plan active",
          <>
            <b className="font-semibold text-sognos-heading">3 days</b> from referral
          </>,
        ]}
        vals="1:4"
        className="right-[5%] bottom-[7%] left-[5%] sm:right-[14%] sm:left-[14%]"
        countClassName="hs-count"
      />
    </div>
  );
}
