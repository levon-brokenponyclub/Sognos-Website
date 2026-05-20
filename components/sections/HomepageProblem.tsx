"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Eye,
  ClipboardText,
  ChartBar,
  Folders,
  ChartLine,
} from "@phosphor-icons/react";

const CARDS = [
  {
    type: "role" as const,
    role: "Operations & Service Managers",
    heading: "You need to know what's happening before anyone calls you.",
    body: "You run the day. Every change in schedule, every missed job, every compliance gap — it lands on you. Right now you're piecing it together across multiple systems.",
    features: [
      { label: "Workforce Scheduling", icon: CalendarCheck },
      { label: "Real-time Visibility", icon: Eye },
      { label: "Compliance Tracking", icon: ClipboardText },
    ],
  },
  {
    type: "role" as const,
    role: "Executive & Leadership",
    heading: "You need accurate data fast — not a report that takes two days.",
    body: "You make decisions based on what's in the system. When the system is three spreadsheets and a shared inbox, you make decisions on incomplete information.",
    features: [
      { label: "Reporting & Insights", icon: ChartBar },
      { label: "Audit Trails", icon: Folders },
      { label: "Operational Overview", icon: ChartLine },
    ],
  },
  {
    type: "proof" as const,
    stat: "25 min → 10 sec",
    customer: "Penrith City Council",
    body: "Coordinators managing team movements — a task that was refused before — now done in 3 clicks.",
  },
];

export default function HomepageProblem() {
  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full bg-wh-bg py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-wh-text-soft mb-4">
            The Problem
          </p>
          <h2 className="font-heading text-wh-text font-medium tracking-tight leading-[1.1] text-[clamp(1.75rem,4vw,2.75rem)] max-w-2xl">
            If you're juggling systems, things fall through the cracks
          </h2>
          <p className="mt-4 text-wh-text-muted text-base lg:text-lg leading-relaxed max-w-2xl">
            You plan work in one place. Schedule it in another. Track it somewhere else — if at all.
          </p>
        </div>

        {/* Desktop: 3-col grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-4">
          {CARDS.map((card, i) =>
            card.type === "role" ? (
              <RoleCard key={i} card={card} />
            ) : (
              <ProofCard key={i} card={card} />
            )
          )}
        </div>

        {/* Mobile: horizontal drag slider */}
        <motion.div
          ref={sliderRef}
          className="flex gap-4 lg:hidden cursor-grab active:cursor-grabbing select-none"
          drag="x"
          dragConstraints={{ right: 0, left: -560 }}
          dragElastic={0.04}
        >
          {CARDS.map((card, i) =>
            card.type === "role" ? (
              <div key={i} className="shrink-0 w-[80vw]">
                <RoleCard card={card} />
              </div>
            ) : (
              <div key={i} className="shrink-0 w-[80vw]">
                <ProofCard card={card} />
              </div>
            )
          )}
        </motion.div>

      </div>
    </section>
  );
}

type RoleCardData = Extract<(typeof CARDS)[number], { type: "role" }>;
type ProofCardData = Extract<(typeof CARDS)[number], { type: "proof" }>;

function RoleCard({ card }: { card: RoleCardData }) {
  return (
    <div className="flex flex-col rounded-wh-md border border-wh-border bg-wh-card overflow-hidden h-full">
      {/* Image slot */}
      <div className="w-full aspect-video bg-wh-bg flex items-center justify-center border-b border-wh-border">
        <span className="text-xs text-wh-text-soft">Illustration</span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-wh-text-soft">
          {card.role}
        </p>
        <h3 className="font-heading text-wh-text font-medium text-lg leading-snug">
          {card.heading}
        </h3>
        <p className="text-wh-text-muted text-sm leading-relaxed flex-1">
          {card.body}
        </p>

        {/* Feature pills */}
        <div className="flex flex-col gap-2 pt-2 border-t border-wh-border">
          {card.features.map(({ label, icon: Icon }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 text-sm text-wh-text"
            >
              <Icon size={14} weight="regular" className="text-wh-text-soft shrink-0" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProofCard({ card }: { card: ProofCardData }) {
  return (
    <div className="flex flex-col justify-between rounded-wh-md bg-wh-text p-6 lg:p-8 h-full min-h-[320px]">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40 mb-4">
          Real outcome
        </p>
        <p className="font-heading text-white font-medium tracking-tight leading-[1.0] text-[clamp(2rem,5vw,3rem)]">
          {card.stat}
        </p>
      </div>
      <div>
        <p className="text-white/80 text-sm leading-relaxed mb-3">{card.body}</p>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
          — {card.customer}
        </p>
      </div>
    </div>
  );
}
