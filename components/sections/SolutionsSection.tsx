"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  MapPin,
  UsersThree,
  ChartBar,
  Gauge,
  ChatCircleText,
  FlowArrow,
  Lightning,
} from "@phosphor-icons/react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SOLUTIONS = [
  {
    id: "field-service",
    label: "Field Service",
    href: "/solutions/field-service",
    title: "End-to-end field service management",
    copy: "Dispatch technicians, track jobs in real time, and close every work order with a complete audit trail — all from a single platform.",
    accentBg: "#cdedfe",
  },
  {
    id: "crm",
    label: "CRM",
    href: "/solutions/customer-relationship-management",
    title: "A complete client relationship record",
    copy: "Centralise every client interaction, service history, and communication in one place — giving every team member the context they need.",
    accentBg: "#eaeefb",
  },
  {
    id: "customer-insights",
    label: "Customer Insights",
    href: "/solutions/customer-insights",
    title: "Turn service data into operational intelligence",
    copy: "Unified data from care records, rostering, and field operations — surfaced as live dashboards that show what's working and where to act.",
    accentBg: "#e6f3ff",
  },
  {
    id: "customer-experience",
    label: "Customer Experience",
    href: "/solutions/customer-experience",
    title: "Consistent service quality at every touchpoint",
    copy: "From first contact through ongoing delivery, every interaction is tracked, measured, and optimised for consistent service quality.",
    accentBg: "#e5fffb",
  },
  {
    id: "customer-service",
    label: "Customer Service",
    href: "/solutions/customer-service",
    title: "Faster resolution, clearer accountability",
    copy: "Unified case management, escalation workflows, and response tracking — so every issue is owned, actioned, and closed on time.",
    accentBg: "#fff1e5",
  },
  {
    id: "power-platform",
    label: "Power Platform",
    href: "/solutions/power-platform",
    title: "Extend and automate without engineering overhead",
    copy: "Power Apps, Power Automate, and Power Pages built into the Sognos platform so your team can customise workflows without writing code.",
    accentBg: "#f0e5ff",
  },
  {
    id: "quick-start",
    label: "Quick Start",
    href: "/solutions/quick-start",
    title: "Live in weeks, not months",
    copy: "Sognos Quick Start delivers a production-ready deployment in four weeks — pre-built configuration, training, and go-live support included.",
    accentBg: "#ffe5e6",
  },
] as const;

// Doubled for seamless infinite loop
const LOOPED = [...SOLUTIONS, ...SOLUTIONS];

type SolutionId = (typeof SOLUTIONS)[number]["id"];

// ─── Icons ────────────────────────────────────────────────────────────────────

const ICONS: Record<
  SolutionId,
  React.ComponentType<
    React.ComponentProps<"svg"> & {
      size?: number;
      weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
    }
  >
> = {
  "field-service": MapPin,
  crm: UsersThree,
  "customer-insights": ChartBar,
  "customer-experience": Gauge,
  "customer-service": ChatCircleText,
  "power-platform": FlowArrow,
  "quick-start": Lightning,
};

// ─── Illustrations ─────────────────────────────────────────────────────────────

function CardIllustration({ id }: { id: SolutionId }) {
  const base =
    "transition-opacity duration-300 opacity-[0.15] group-hover:opacity-30";

  if (id === "field-service")
    return (
      <svg
        viewBox="0 0 280 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={base}
        aria-hidden="true"
      >
        <line x1="0" y1="90" x2="280" y2="90" />
        <path d="M10 90 Q35 55 60 70 Q75 78 88 90" strokeDasharray="5 4" />
        <circle cx="60" cy="42" r="10" />
        <line x1="60" y1="52" x2="60" y2="68" />
        <rect x="100" y="48" width="148" height="42" rx="5" />
        <rect x="100" y="58" width="52" height="32" rx="3" />
        <rect x="108" y="64" width="36" height="20" rx="2" />
        <circle cx="128" cy="92" r="9" />
        <circle cx="218" cy="92" r="9" />
        <line x1="152" y1="55" x2="248" y2="55" />
        <line x1="248" y1="55" x2="248" y2="90" />
      </svg>
    );

  if (id === "crm")
    return (
      <svg
        viewBox="0 0 280 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={base}
        aria-hidden="true"
      >
        <circle cx="90" cy="32" r="18" />
        <path d="M52 95 Q52 66 90 66 Q128 66 128 95" />
        <circle cx="148" cy="32" r="18" />
        <path d="M110 95 Q110 66 148 66 Q186 66 186 95" />
        <circle cx="206" cy="32" r="18" />
        <path d="M168 95 Q168 66 206 66 Q244 66 244 95" />
        <line x1="108" y1="32" x2="130" y2="32" strokeDasharray="3 3" />
        <line x1="166" y1="32" x2="188" y2="32" strokeDasharray="3 3" />
      </svg>
    );

  if (id === "customer-insights")
    return (
      <svg
        viewBox="0 0 280 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={base}
        aria-hidden="true"
      >
        <line x1="35" y1="8" x2="35" y2="88" />
        <line x1="35" y1="88" x2="265" y2="88" />
        <rect x="50" y="50" width="28" height="38" />
        <rect x="100" y="28" width="28" height="60" />
        <rect x="150" y="40" width="28" height="48" />
        <rect x="200" y="14" width="28" height="74" />
        <polyline points="64,50 114,28 164,40 214,14" />
        <circle cx="64" cy="50" r="3.5" fill="currentColor" stroke="none" />
        <circle cx="114" cy="28" r="3.5" fill="currentColor" stroke="none" />
        <circle cx="164" cy="40" r="3.5" fill="currentColor" stroke="none" />
        <circle cx="214" cy="14" r="3.5" fill="currentColor" stroke="none" />
      </svg>
    );

  if (id === "customer-experience")
    return (
      <svg
        viewBox="0 0 280 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={base}
        aria-hidden="true"
      >
        <path d="M50 95 A90 90 0 0 1 230 95" />
        <line x1="55" y1="92" x2="48" y2="80" />
        <line x1="74" y1="62" x2="64" y2="55" />
        <line x1="105" y1="37" x2="100" y2="26" />
        <line x1="140" y1="28" x2="140" y2="16" />
        <line x1="175" y1="37" x2="180" y2="26" />
        <line x1="206" y1="62" x2="216" y2="55" />
        <line x1="225" y1="92" x2="232" y2="80" />
        <line x1="140" y1="95" x2="188" y2="48" strokeWidth="2" />
        <circle cx="140" cy="95" r="6" fill="currentColor" stroke="none" />
        <path d="M100 95 A40 40 0 0 1 180 95" strokeDasharray="4 3" />
      </svg>
    );

  if (id === "customer-service")
    return (
      <svg
        viewBox="0 0 280 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={base}
        aria-hidden="true"
      >
        <rect x="15" y="5" width="165" height="52" rx="12" />
        <path d="M35 57 L24 78 L58 57" />
        <circle cx="55" cy="31" r="4" fill="currentColor" stroke="none" />
        <circle cx="97" cy="31" r="4" fill="currentColor" stroke="none" />
        <circle cx="139" cy="31" r="4" fill="currentColor" stroke="none" />
        <rect x="100" y="62" width="165" height="38" rx="12" />
        <path d="M245 62 L256 42 L225 62" />
        <circle cx="130" cy="81" r="3" fill="currentColor" stroke="none" />
        <circle cx="155" cy="81" r="3" fill="currentColor" stroke="none" />
        <circle cx="180" cy="81" r="3" fill="currentColor" stroke="none" />
        <circle cx="205" cy="81" r="3" fill="currentColor" stroke="none" />
      </svg>
    );

  if (id === "power-platform")
    return (
      <svg
        viewBox="0 0 280 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={base}
        aria-hidden="true"
      >
        <circle cx="140" cy="50" r="20" />
        <circle cx="40" cy="18" r="13" />
        <circle cx="240" cy="18" r="13" />
        <circle cx="40" cy="82" r="13" />
        <circle cx="240" cy="82" r="13" />
        <circle cx="140" cy="5" r="10" />
        <line x1="120" y1="38" x2="53" y2="24" />
        <line x1="160" y1="38" x2="227" y2="24" />
        <line x1="120" y1="62" x2="53" y2="76" />
        <line x1="160" y1="62" x2="227" y2="76" />
        <line x1="140" y1="30" x2="140" y2="15" />
        <line x1="128" y1="38" x2="134" y2="32" />
        <line x1="152" y1="38" x2="146" y2="32" />
      </svg>
    );

  // quick-start
  return (
    <svg
      viewBox="0 0 280 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={base}
      aria-hidden="true"
    >
      <path d="M140 8 C162 8 176 28 176 55 L140 72 L104 55 C104 28 118 8 140 8 Z" />
      <circle cx="140" cy="40" r="11" />
      <path d="M104 55 L84 80 L116 67" />
      <path d="M176 55 L196 80 L164 67" />
      <path d="M118 72 Q126 95 140 84 Q154 95 162 72" />
      <circle cx="48" cy="22" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="228" cy="35" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="65" cy="52" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="248" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="32" cy="70" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

const GAP = 20;

function SolutionCard({
  solution,
  width,
}: {
  solution: (typeof SOLUTIONS)[number];
  width: number;
}) {
  const Icon = ICONS[solution.id];
  return (
    <div
      className="group relative flex-shrink-0 rounded-lg bg-white overflow-hidden flex flex-col hover:bg-white transition-colors cursor-pointer items-start"
      style={{ width: width > 0 ? width : undefined, minWidth: 260 }}
    >
      {/* Icon and Content */}
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-start">
          <Icon size={40} weight="duotone" className="text-[#1D96FC] mt-6" />
        </div>

        <div className="flex flex-col flex-1">
          <h5 className="text-2xl font-medium text-prussian-blue-800 leading-snug text-balance transition-colors duration-200">
            {solution.label}
          </h5>
          <p className="mt-3 leading-normal text-prussian-blue-900/65 line-clamp-4 flex-1 transition-colors duration-200">
            {solution.copy}
          </p>
        </div>
      </div>

      {/* CTA */}
      <Link
        href={solution.href}
        className="mx-6 mb-4 mt-2 inline-flex items-center px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 bg-brand text-white hover:bg-brand-dark"
      >
        See {solution.label}
      </Link>

      {/* Decorative illustration - removed but keeping space */}
      <div className="hidden lg:flex px-0 w-full h-[120px] items-end">
        {/* CardIllustration id={solution.id} / - removed */}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function SolutionsSection() {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const maxDragRef = useRef(0);
  const cardWidthRef = useRef(310);
  const periodRef = useRef(0); // width of one full set = SOLUTIONS.length * (cardWidth + GAP)
  const [maxDrag, setMaxDrag] = useState(0);
  const [cardWidth, setCardWidth] = useState(310);

  // Autoplay refs
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Seamless infinite loop: teleport x when it crosses set boundaries
  useMotionValueEvent(x, "change", (latest) => {
    const p = periodRef.current;
    if (!p) return;
    if (latest <= -p) x.set(latest + p);
    else if (latest > 0) x.set(latest - p);
  });

  const stepFn = useCallback(
    (dir: 1 | -1) => {
      const next = x.get() - dir * (cardWidthRef.current + GAP);
      animate(x, next, { type: "spring", damping: 30, stiffness: 300 });
    },
    [x],
  );

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (resumeRef.current) {
      clearTimeout(resumeRef.current);
      resumeRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    intervalRef.current = setInterval(() => stepFn(1), 10500);
  }, [stopAutoplay, stepFn]);

  const pauseAndResume = useCallback(() => {
    stopAutoplay();
    resumeRef.current = setTimeout(startAutoplay, 50000);
  }, [stopAutoplay, startAutoplay]);

  const handleStep = useCallback(
    (dir: 1 | -1) => {
      stepFn(dir);
      pauseAndResume();
    },
    [stepFn, pauseAndResume],
  );

  useEffect(() => {
    const update = () => {
      if (!trackRef.current || !viewportRef.current) return;
      const containerWidth = viewportRef.current.clientWidth;
      const cw = (containerWidth - GAP * 2) / 3;
      cardWidthRef.current = cw;
      setCardWidth(cw);
      // Period = one full set (7 cards)
      periodRef.current = SOLUTIONS.length * (cw + GAP);
      // maxDrag based on doubled array
      const trackWidth = trackRef.current.scrollWidth;
      const md = Math.min(0, -(trackWidth - containerWidth));
      maxDragRef.current = md;
      setMaxDrag(md);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Autoplay disabled per requirements
  // useEffect(() => {
  //   startAutoplay();
  //   return stopAutoplay;
  // }, [startAutoplay, stopAutoplay]);

  return (
    <section className="w-full bg-gray-200/70 overflow-hidden">
      {/* Header — h2 left, arrows right */}
      <div className="max-w-7xl w-full mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pt-16 lg:pt-24 pb-6 lg:pb-8">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-prussian-blue-800/30 text-prussian-blue-800 font-medium">
              <span className="w-2 h-2 bg-[#1D96FC] rounded-full"></span>
              Solutions for every workflow
            </div>
            <h2 className="text-3xl md:text-4xl text-prussian-blue-800 text-center lg:text-left font-heading font-medium tracking-tight">
              Built for how your operation works
            </h2>
          </div>
          <div className="hidden lg:flex items-center gap-3 shrink-0 ml-8">
            <button
              onClick={() => handleStep(-1)}
              aria-label="Previous"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-dashed border-prussian-blue-800/30 text-prussian-blue-800 hover:border-prussian-blue-800 hover:text-prussian-blue-900 transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => handleStep(1)}
              aria-label="Next"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-dashed border-prussian-blue-800/30 text-prussian-blue-800 hover:border-prussian-blue-800 hover:text-prussian-blue-900 transition-colors cursor-pointer"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Card track */}
      <div className="max-w-7xl w-full mx-auto px-6 pb-12 lg:pb-24">
        {/* Viewport: measured without padding so cardWidth fills exactly */}
        <div ref={viewportRef} className="overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x, gap: GAP }}
            drag="x"
            dragConstraints={{ left: maxDrag, right: 0 }}
            dragElastic={0.05}
            onDragStart={pauseAndResume}
            className="flex cursor-grab active:cursor-grabbing"
          >
            {LOOPED.map((s, i) => (
              <SolutionCard
                key={`${s.id}-${i}`}
                solution={s}
                width={cardWidth}
              />
            ))}
          </motion.div>
        </div>

        {/* Mobile arrows — below cards, right-aligned */}
        <div className="flex lg:hidden items-center justify-end gap-3 mt-6">
          <button
            onClick={() => handleStep(-1)}
            aria-label="Previous"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-dashed border-prussian-blue-800/30 text-prussian-blue-800 hover:border-prussian-blue-800 hover:text-prussian-blue-900 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => handleStep(1)}
            aria-label="Next"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-dashed border-prussian-blue-800/30 text-prussian-blue-800 hover:border-prussian-blue-800 hover:text-prussian-blue-900 transition-colors cursor-pointer"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
