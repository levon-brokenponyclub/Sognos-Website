"use client";

import { useEffect, useRef, useState } from "react";
import type React from "react";
import Link from "next/link";
import { OrbitingCircles } from "@/components/ui/OrbitingCircles";

// ─── Platform & integration icons ────────────────────────────────────────────

const Icons = {
  microsoft: () => (
    <svg
      viewBox="0 0 23 23"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect x="1" y="1" width="10" height="10" fill="#f25022" />
      <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
      <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
      <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
    </svg>
  ),
  azure: () => (
    <svg
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <defs>
        <linearGradient
          id="az-a"
          x1="-.87"
          y1="64.01"
          x2="48.37"
          y2="-4.03"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#114a8b" />
          <stop offset="1" stopColor="#0669bc" />
        </linearGradient>
        <linearGradient
          id="az-b"
          x1="47.47"
          y1="34.95"
          x2="36.54"
          y2="38.53"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopOpacity=".3" />
          <stop offset=".07" stopOpacity=".2" />
          <stop offset=".32" stopOpacity=".1" />
          <stop offset=".62" stopOpacity=".05" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="az-c"
          x1="33.98"
          y1="-1.28"
          x2="79.38"
          y2="64.36"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#3ccbf4" />
          <stop offset="1" stopColor="#2892df" />
        </linearGradient>
      </defs>
      <path
        d="M33.34 6.54h26.04L33.78 90.1a4.15 4.15 0 01-3.93 2.81H8.12a4.15 4.15 0 01-3.92-5.49L29.41 9.35a4.15 4.15 0 013.93-2.81z"
        fill="url(#az-a)"
      />
      <path
        d="M71.4 61.06H29.47a1.91 1.91 0 00-1.3 3.31l27.1 25.27a4.17 4.17 0 002.85 1.27h23.87z"
        fill="url(#az-c)"
      />
      <path
        d="M33.34 6.54a4.12 4.12 0 00-3.94 2.86L4.23 87.37a4.15 4.15 0 003.89 5.54h22.21a4.46 4.46 0 003.36-2.87l5.35-15.76 19.12 17.83a4.24 4.24 0 002.67.97h23.3l-10.22-29.02-29.8.01 18.17-57.53z"
        fill="url(#az-b)"
      />
      <path
        d="M66.59 9.35a4.15 4.15 0 00-3.93-2.81H33.65a4.15 4.15 0 013.93 2.81l25.22 78.07a4.15 4.15 0 01-3.93 5.49h29.01a4.15 4.15 0 003.93-5.49z"
        fill="url(#az-c)"
      />
    </svg>
  ),
  dynamics: () => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="#0078d4"
        strokeWidth="1.5"
      />
      <path
        d="M8 12a4 4 0 008 0"
        fill="none"
        stroke="#0078d4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="8" r="1.5" fill="#0078d4" />
    </svg>
  ),
  care: () => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <path
        d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.518 3.391 1 6.195 1 8.397 1 9.995 2.136 11 3.546 12.005 2.136 13.603 1 15.805 1 18.609 1 21 3.518 21 7.191c0 4.105-5.37 8.863-11 14.402z"
        fill="#ec4899"
      />
    </svg>
  ),
  ai: () => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <path
        d="M12 2a10 10 0 110 20A10 10 0 0112 2zm0 2a8 8 0 100 16A8 8 0 0012 4zm0 3a5 5 0 110 10A5 5 0 0112 7zm0 2a3 3 0 100 6 3 3 0 000-6z"
        fill="#8b5cf6"
      />
    </svg>
  ),
  roster: () => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        fill="none"
        stroke="#22c55e"
        strokeWidth="1.5"
      />
      <line x1="3" y1="9" x2="21" y2="9" stroke="#22c55e" strokeWidth="1.5" />
      <line
        x1="8"
        y1="2"
        x2="8"
        y2="6"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="2"
        x2="16"
        y2="6"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="7"
        y1="14"
        x2="17"
        y2="14"
        stroke="#22c55e"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="7"
        y1="18"
        x2="13"
        y2="18"
        stroke="#22c55e"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  ),
  compliance: () => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <path
        d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z"
        fill="none"
        stroke="#f97316"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <polyline
        points="9,12 11,14 15,10"
        fill="none"
        stroke="#f97316"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  teams: () => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <path
        d="M20 2H8a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2z"
        fill="none"
        stroke="#5b5ea6"
        strokeWidth="1.5"
      />
      <path
        d="M4 6H2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-2"
        fill="none"
        stroke="#5b5ea6"
        strokeWidth="1.5"
      />
    </svg>
  ),
  field: () => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <circle
        cx="12"
        cy="10"
        r="3"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1.5"
      />
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1.5"
      />
    </svg>
  ),
};

// ─── Icon bubble ──────────────────────────────────────────────────────────────

function IconBubble({
  children,
  bg = "bg-white/90",
  size = "md",
}: {
  children: React.ReactNode;
  bg?: string;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-8 w-8 p-1.5" : "h-10 w-10 p-2";
  return (
    <div
      className={`${dim} ${bg} flex items-center justify-center rounded-full shadow-md`}
    >
      {children}
    </div>
  );
}

// ─── Platform orbit ───────────────────────────────────────────────────────────

function PlatformOrbit() {
  return (
    <div className="relative flex h-[340px] w-full items-center justify-center overflow-hidden">
      <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg">
        <span className="font-heading text-lg font-semibold text-brand tracking-tight">
          S
        </span>
      </div>
      <div
        className="absolute rounded-full border border-white/20"
        style={{ width: 280, height: 280 }}
        aria-hidden="true"
      />
      <div
        className="absolute rounded-full border border-white/20"
        style={{ width: 180, height: 180 }}
        aria-hidden="true"
      />
      <OrbitingCircles iconSize={40} radius={140} duration={30} speed={1}>
        <IconBubble bg="bg-white/90">
          <Icons.care />
        </IconBubble>
        <IconBubble bg="bg-white/90">
          <Icons.roster />
        </IconBubble>
        <IconBubble bg="bg-white/90">
          <Icons.field />
        </IconBubble>
        <IconBubble bg="bg-white/90">
          <Icons.compliance />
        </IconBubble>
        <IconBubble bg="bg-white/90">
          <Icons.ai />
        </IconBubble>
      </OrbitingCircles>
      <OrbitingCircles
        iconSize={30}
        radius={90}
        duration={20}
        reverse
        speed={2}
      >
        <IconBubble size="sm" bg="bg-white/90">
          <Icons.microsoft />
        </IconBubble>
        <IconBubble size="sm" bg="bg-white/90">
          <Icons.azure />
        </IconBubble>
        <IconBubble size="sm" bg="bg-white/90">
          <Icons.dynamics />
        </IconBubble>
        <IconBubble size="sm" bg="bg-white/90">
          <Icons.teams />
        </IconBubble>
      </OrbitingCircles>
    </div>
  );
}

// ─── Feature data ─────────────────────────────────────────────────────────────

const FEATURES = [
  {
    id: "care",
    title: "Care Operations",
    bullets: [
      "Capture referrals, assessments, and care plans into a structured record for every service.",
      "Orchestrate the full service lifecycle — from intake to delivery — with automated case workflows.",
      "Compliance checkpoints and outcome records captured at point of delivery, ready for audit and funding claims.",
    ],
    barFrom: "#fce7f3",
    barTo: "#fb7185",
  },
  {
    id: "scheduling",
    title: "Workforce Scheduling",
    bullets: [
      "Auto-match qualified, available staff to services based on skills, location, and compliance status.",
      "Real-time schedule updates push directly to field workers' mobile devices.",
      "Every visit, task, and interaction recorded as a live picture of operational delivery.",
    ],
    barFrom: "#dbeafe",
    barTo: "#60a5fa",
  },
  {
    id: "ai",
    title: "AI-Powered Intelligence",
    bullets: [
      "AI surfaces workforce inefficiencies, compliance gaps, and utilisation patterns before they become problems.",
      "Full audit trails and outcome records feed directly into regulatory reporting and funding submissions.",
      "Microsoft Copilot AI embedded across every workflow — built natively on Dynamics 365.",
    ],
    barFrom: "#e0e7ff",
    barTo: "#818cf8",
  },
];

// ─── Gradient bars ────────────────────────────────────────────────────────────

function GradientBars({ barFrom, barTo }: { barFrom: string; barTo: string }) {
  return (
    <div className="h-full overflow-hidden flex flex-row">
      {Array.from({ length: 10 }, (_, i) => {
        const start = 15 + i * 7;
        const end = start + 10;
        return (
          <div
            key={i}
            style={{
              flex: 1,
              height: "100%",
              background: `linear-gradient(${barFrom} 0%, ${barTo} ${start}%, ${barTo} ${end}%, ${barFrom} 100%)`,
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Right panel visuals ──────────────────────────────────────────────────────

function FeatureVisual({ idx }: { idx: number }) {
  if (idx === 2) {
    return <PlatformOrbit />;
  }

  if (idx === 0) {
    return (
      <div className="flex flex-col items-center gap-8">
        <div className="w-24 h-24 rounded-2xl bg-white/80 shadow-xl flex items-center justify-center">
          <div className="w-12 h-12">
            <Icons.care />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="w-14 h-14 rounded-xl bg-white/70 shadow-md flex items-center justify-center">
            <div className="w-7 h-7">
              <Icons.compliance />
            </div>
          </div>
          <div className="w-14 h-14 rounded-xl bg-white/70 shadow-md flex items-center justify-center">
            <div className="w-7 h-7">
              <Icons.teams />
            </div>
          </div>
          <div className="w-14 h-14 rounded-xl bg-white/70 shadow-md flex items-center justify-center">
            <div className="w-7 h-7">
              <Icons.dynamics />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // idx === 1 (scheduling)
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="w-24 h-24 rounded-2xl bg-white/80 shadow-xl flex items-center justify-center">
        <div className="w-12 h-12">
          <Icons.roster />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="w-14 h-14 rounded-xl bg-white/70 shadow-md flex items-center justify-center">
          <div className="w-7 h-7">
            <Icons.field />
          </div>
        </div>
        <div className="w-14 h-14 rounded-xl bg-white/70 shadow-md flex items-center justify-center">
          <div className="w-7 h-7">
            <Icons.microsoft />
          </div>
        </div>
        <div className="w-14 h-14 rounded-xl bg-white/70 shadow-md flex items-center justify-center">
          <div className="w-7 h-7">
            <Icons.teams />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ProofSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setActiveIdx(idx);
          }
        });
      },
      { threshold: 0.5 },
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-label="Platform capabilities"
      className="border-b border-sognos-border-subtle"
    >
      {/* Heading row */}
      <div className="border-b border-sognos-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-dashed border-sognos-border-subtle px-5 pt-24 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end justify-items-between">
            <h2 className="text-2xl md:text-4xl text-brand font-heading font-medium tracking-tight">
              One platform.
              <br />
              Every part of your operation.
            </h2>
            <p className="font-heading font-medium leading-tigher section-header-description justify-self-end">
              Sognos connects service demand, workforce scheduling, and
              compliance into a single operational loop. Powered by AI,
              Microsoft Dynamics 365.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl border-x border-dashed border-sognos-border-subtle">
        <div className="grid grid-cols-1 xl:grid-cols-[41%_59%] w-full relative">
          {/* ── Left column — scrollable cards ── */}
          <div>
            {FEATURES.map((feature, i) => (
              <div
                key={feature.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                data-index={i}
                className={`flex xl:h-[500px] flex-col px-8 py-10 gap-6 transition-all duration-500 ease-in-out border-b border-[#EAEAEA] ${
                  i === activeIdx
                    ? "bg-slate-50 border-l-[3px] border-l-brand"
                    : "bg-white border-l-[3px] border-l-transparent"
                }`}
              >
                <div className="flex flex-col gap-4 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 font-heading tracking-tight">
                    {feature.title}
                  </h3>

                  <ul className="flex flex-col gap-3 mt-1">
                    {feature.bullets.map((bullet, bi) => (
                      <li key={bi} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                            i === activeIdx ? "bg-brand" : "bg-gray-200"
                          }`}
                        >
                          {i === activeIdx && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </span>
                        <span
                          className={`text-sm leading-relaxed transition-colors duration-300 ${
                            i === activeIdx ? "text-gray-700" : "text-gray-400"
                          }`}
                        >
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA — visible always on mobile, fades on desktop when inactive */}
                <div
                  className={`w-fit transition-all duration-500 ease-in-out ${
                    i === activeIdx
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-100 pointer-events-auto xl:opacity-0 xl:pointer-events-none"
                  }`}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-brand hover:bg-brand-dark rounded transition-colors duration-200"
                  >
                    Book a Demo
                  </Link>
                </div>

                {/* Mobile inline visual */}
                <div className="h-[300px] relative w-full block xl:hidden mt-2 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center p-6 z-10">
                    <FeatureVisual idx={i} />
                  </div>
                  <GradientBars
                    barFrom={feature.barFrom}
                    barTo={feature.barTo}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ── Right column — sticky visual ── */}
          <div className="hidden xl:block sticky top-[68px] h-[500px] self-start overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
              <div
                key={activeIdx}
                className="proof-visual-enter w-full h-full flex items-center justify-center"
              >
                <FeatureVisual idx={activeIdx} />
              </div>
            </div>
            <GradientBars
              barFrom={FEATURES[activeIdx].barFrom}
              barTo={FEATURES[activeIdx].barTo}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
