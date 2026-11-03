"use client";

import type { CSSProperties } from "react";
import { Check, Clock, Search } from "lucide-react";
import { Avatar, StageBar, useStages } from "./parts";
import "./stack-graphics.css";

// SognosRoster stack graphic (2026-11-03, mockup option D): an unfilled shift on
// the day's schedule, matching across the team, three ranked workers, the best
// one assigned, then the day's route draws and the bar flips from shifts filled
// to minutes saved. ~5s once 35% in view; replays on re-entry; reduced motion
// shows the final frame. Data is illustrative.

const ACCENT = "var(--sognos-roster-base)";
const HOURS = ["8", "9", "10", "11", "12", "1", "2"];
const TIMELINE = [
  [400, 1],
  [1800, 2],
  [3600, 3],
  [5200, 4],
] as const;

const WORKERS = [
  { id: "JK", name: "Jess Kelly", skills: ["Manual handling", "First aid"], dist: "4.2 km", fit: 98, from: "#59bbf7", to: "#104b90" },
  { id: "TN", name: "Tom Nguyen", skills: ["Manual handling"], dist: "7.8 km", fit: 91, from: "#c9e8d9", to: "#3d8f6a" },
  { id: "PS", name: "Priya Shah", skills: ["First aid"], dist: "11 km", fit: 84, from: "#f5c7a9", to: "#c9826b" },
];
const STOPS = [
  [14, 46],
  [106, 26],
  [186, 30],
] as const;

export default function RosterMatch() {
  const ref = useStages<HTMLDivElement>(TIMELINE);

  return (
    <div ref={ref} className="hs-seq hs-roster absolute inset-0" data-s="0" data-ui aria-hidden="true">
      <div className="absolute top-[7%] right-[8%] left-[8%] rounded-lg border border-sognos-line bg-white p-3">
        <div className="flex items-baseline justify-between">
          <p className="text-[12px] font-semibold text-sognos-heading">Today &middot; Penrith team</p>
          <p className="text-[9px] text-[#64748b]">Tue 4 Nov</p>
        </div>
        <div className="mt-2 flex text-[9px] text-[#64748b]">
          {HOURS.map((h) => (
            <span key={h} className="flex-1 border-l border-sognos-line pl-1 first:border-l-0">
              {h}
            </span>
          ))}
        </div>
        <div className="relative mt-1.5 h-9 rounded-lg bg-[#f8fafc]">
          <span className="absolute top-1 bottom-1 left-[2%] w-[14%] rounded-lg bg-sognos-roster-soft" />
          <span className="absolute top-1 bottom-1 left-[52%] w-[20%] rounded-lg bg-sognos-roster-soft" />
          <span className="hs-rshift absolute top-1 bottom-1 left-[17%] w-[32%] rounded-lg border px-1.5 text-[9px] leading-[1.15]">
            <span className="hs-run block pt-0.5">
              Personal care
              <br />
              9:00 &middot; Unfilled
            </span>
            <span className="hs-ras block pt-0.5">
              Assigned <Check className="inline size-2.5" strokeWidth={3} />
              <br />
              Jess Kelly
            </span>
          </span>
        </div>
      </div>

      <div className="hs-rmatch absolute top-[32%] right-[8%] left-[8%] flex items-center gap-2 rounded-lg border border-white/60 bg-white/80 px-3 py-2 text-[11px] text-sognos-heading backdrop-blur-md">
        <Search className="size-3 text-[#64748b]" />
        Matching across <b className="font-semibold">120 workers</b>
        <span className="ml-auto h-1 w-16 overflow-hidden rounded-lg bg-sognos-line">
          <span className="hs-rprogress block h-full rounded-lg" style={{ background: ACCENT }} />
        </span>
      </div>

      <div className="absolute top-[42%] right-[8%] left-[8%] flex flex-col gap-1.5">
        {WORKERS.map((w, k) => (
          <div
            key={w.id}
            className={`hs-rrow flex items-center gap-2 rounded-lg border bg-white px-2.5 py-1.5 ${k === 0 ? "hs-rtop" : ""}`}
            style={{ "--d": `${k * 0.12}s` } as CSSProperties}
          >
            <span className="block size-6 shrink-0 overflow-hidden rounded-lg">
              <Avatar id={`R${w.id}`} from={w.from} to={w.to} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-semibold text-sognos-heading">{w.name}</span>
              <span className="flex gap-1">
                {w.skills.map((s) => (
                  <span key={s} className="flex items-center gap-0.5 rounded-lg bg-sognos-roster-soft px-1.5 text-[9px] text-sognos-roster-ink">
                    {s} <Check className="size-2.5" strokeWidth={3} />
                  </span>
                ))}
              </span>
            </span>
            <span className="text-right">
              <span className="block text-[11px] font-semibold tabular-nums text-sognos-heading">{w.fit}% fit</span>
              <span className="block text-[9px] text-[#64748b]">{w.dist}</span>
            </span>
          </div>
        ))}
      </div>

      <svg
        className="hs-rroute absolute top-[44%] right-[8%] left-[8%] h-[30%] w-[84%]"
        viewBox="0 0 200 60"
        fill="none"
      >
        <path
          className="hs-rpath"
          d="M14 46 C 50 10, 80 52, 106 26 S 160 8, 186 30"
          stroke={ACCENT}
          strokeWidth="3"
          strokeLinecap="round"
          pathLength="1"
        />
        {STOPS.map(([x, y], k) => (
          <g key={k} className="hs-rpin" style={{ "--d": `${k * 0.25}s` } as CSSProperties}>
            <circle cx={x} cy={y} r="7" fill="#fff" stroke={ACCENT} strokeWidth="3" />
            <text x={x} y={y + 3.5} textAnchor="middle" fontSize="8" fill="var(--sognos-heading)">
              {k + 1}
            </text>
          </g>
        ))}
      </svg>

      <StageBar
        accent={ACCENT}
        icon={<Clock className="size-5" />}
        first={["Shifts filled", "Today · Penrith team"]}
        last={["Route optimised", "Minutes saved today"]}
        vals="1:24,4:38"
      />
    </div>
  );
}
