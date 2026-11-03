"use client";

import type { CSSProperties } from "react";
import { Network, Sparkles } from "lucide-react";
import { Avatar, StageBar, useStages } from "./parts";
import "./stack-graphics.css";

// SognosGenogram stack graphic (2026-11-03, mockup option D): the family map
// draws around the client (close and strained ties, neutral circles with
// relationship labels), formal supports appear around her, Copilot writes the
// summary, and the bar flips from people mapped to teams with access. ~6s once
// 35% in view; replays on re-entry; reduced motion shows the final frame.
// Data is illustrative.

const ACCENT = "var(--sognos-genogram-base)";
const TIMELINE = [
  [400, 1],
  [2000, 2],
  [3400, 3],
  [5600, 4],
] as const;

// x / y are % of the panel; the avatar sits ~1.6% above y (its label hangs below).
const FAMILY = [
  { id: "p1", x: 30, y: 10, label: "Mother", from: "#e7d3f2", to: "#91278c" },
  { id: "p2", x: 70, y: 10, label: "Father", from: "#d9e4f5", to: "#3a5a9a" },
  { id: "sb", x: 18, y: 33, label: "Brother", from: "#f5d9c7", to: "#c9826b" },
  { id: "pt", x: 80, y: 33, label: "Partner", from: "#d4efe4", to: "#3d8f6a" },
  { id: "dg", x: 65, y: 49, label: "Anne · daughter", from: "#f5e0ec", to: "#b8166e" },
];
// Parents, partner (double = close), brother (zigzag = strained), daughter.
const TIES = [
  { d: "M35 8.4 H65 M50 8.4 V27.6", stroke: "#fff" },
  { d: "M54.5 30.4 H76 M54.5 32.4 H76", stroke: "#fff" },
  { d: "M45.5 31.4 l-2.5 -2 l-2.5 4 l-2.5 -4 l-2.5 4 l-2.5 -2 h-8.5", stroke: "#ffd2a6" },
  { d: "M65.25 32.4 V43.6", stroke: "#fff" },
];
const SUPPORTS = [
  { label: "GP · Dr Lee", x: 14, y: 57 },
  { label: "Day centre", x: 38, y: 57 },
  { label: "Support worker", x: 84, y: 57 },
];

function Node({ id, x, y, label, from, to, className }: (typeof FAMILY)[number] & { className: string }) {
  return (
    <span
      className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 ${className}`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <span className="block size-9 overflow-hidden rounded-full border-2 border-white/80">
        <Avatar id={`G${id}`} from={from} to={to} />
      </span>
      <span className="rounded-lg bg-white/70 px-1.5 text-[9px] text-sognos-heading backdrop-blur">{label}</span>
    </span>
  );
}

export default function GenogramFrame() {
  const ref = useStages<HTMLDivElement>(TIMELINE);

  return (
    <div ref={ref} className="hs-seq hs-geno absolute inset-0" data-s="0" data-ui aria-hidden="true">
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
        {TIES.map((t, k) => (
          <path
            key={k}
            className="hs-gtie"
            d={t.d}
            stroke={t.stroke}
            strokeWidth=".8"
            pathLength="1"
            style={{ "--d": `${k * 0.15}s` } as CSSProperties}
          />
        ))}
        {SUPPORTS.map((s, k) => (
          <path
            key={s.label}
            className="hs-gsup"
            d={`M50 31.4 L${s.x} ${s.y}`}
            stroke="rgba(255,255,255,.7)"
            strokeWidth=".5"
            strokeDasharray="1.2 1.4"
            style={{ "--d": `${k * 0.15}s` } as CSSProperties}
          />
        ))}
      </svg>

      {FAMILY.map((n) => (
        <Node key={n.id} {...n} className="hs-gfam" />
      ))}
      <Node id="cl" x={50} y={33} label="Margaret" from="#d9a6d6" to="#3a0f45" className="" />

      {SUPPORTS.map((s, k) => (
        <span
          key={s.label}
          className="hs-gsup absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/60 bg-white/75 px-2 py-1 text-[10px] text-sognos-heading backdrop-blur"
          style={{ left: `${s.x}%`, top: `${s.y}%`, "--d": `${k * 0.15}s` } as CSSProperties}
        >
          {s.label}
        </span>
      ))}

      <div className="hs-gai absolute right-[10%] bottom-[22%] left-[10%] rounded-lg border border-white/60 bg-white/85 px-3 py-2 backdrop-blur-md">
        <p className="flex items-center gap-1 text-[10px] font-medium" style={{ color: ACCENT }}>
          <Sparkles className="size-3" /> Copilot summary
        </p>
        <p
          className="mt-0.5 min-h-[1.2em] text-[11px] leading-snug text-sognos-heading"
          data-type={"Anne (daughter) is Margaret’s main carer."}
        />
      </div>

      <StageBar
        accent={ACCENT}
        icon={<Network className="size-5" />}
        first={["Support network", "People mapped"]}
        last={["Context shared", "Teams with access"]}
        vals="1:6,4:3"
      />
    </div>
  );
}
