"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
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

// ─── Card ─────────────────────────────────────────────────────────────────────

const GAP = 20;
const CARD_WIDTH = 310;

function SolutionCard({ solution }: { solution: (typeof SOLUTIONS)[number] }) {
  const Icon = ICONS[solution.id];
  return (
    <div
      className="group relative flex-shrink-0 rounded-lg border border-slate-400/30 bg-white overflow-hidden flex flex-col hover:bg-[#1D96FC] transition-colors cursor-pointer"
      style={{ width: CARD_WIDTH }}
    >
      <div className="h-34 flex items-center px-10">
        <div
          className="text-sognos-text-body bg-prussian-blue-900/5 group-hover:bg-white w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
          style={{
            transform: "scale(2.2)",
            transformOrigin: "center",
          }}
        >
          <Icon size={20} weight="duotone" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-0 flex flex-col flex-1">
        <h5 className="text-2xl font-medium text-prussian-blue-800 group-hover:text-white leading-snug text-balance transition-colors duration-200">
          {solution.title}
        </h5>
        <p className="mt-3 leading-normal text-prussian-blue-900/65 group-hover:text-white/80 line-clamp-4 flex-1 transition-colors duration-200">
          {solution.copy}
        </p>
      </div>

      {/* Animated bubble CTA — bottom right */}
      <Link
        href={solution.href}
        className="relative mx-6 mb-6 mt-4 flex items-center overflow-hidden rounded-full border border-slate-400/0 bg-transparent h-11 px-4 font-semibold text-sm text-prussian-blue-800 group-hover:text-white group-hover:border-white/20 transition-colors duration-300"
      >
        See {solution.label}
        <div className="absolute right-1 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-40px)] group-hover:rotate-45 text-prussian-blue-900/20 bg-prussian-blue-900/5 group-hover:bg-white group-hover:text-prussian-blue-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </div>
      </Link>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function SolutionsSection() {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(0);

  const getCardWidth = useCallback(() => CARD_WIDTH + GAP, []);

  useEffect(() => {
    const update = () => {
      if (!trackRef.current || !viewportRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const containerWidth = viewportRef.current.clientWidth;
      setMaxDrag(Math.min(0, -(trackWidth - containerWidth)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const step = (dir: 1 | -1) => {
    const next = x.get() - dir * getCardWidth();
    animate(x, Math.max(Math.min(next, 0), maxDrag), {
      type: "spring",
      damping: 30,
      stiffness: 300,
    });
  };

  return (
    <section className="w-full bg-prussian-blue-800 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl w-full mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end pt-24 pb-5">
          <div>
            <h2 className="font-heading text-white leading-snug text-2xl md:text-3xl lg:text-4xl">
              Built for how your operation works
            </h2>
          </div>
          {/* <p className="font-heading font-medium text-sognos-text-body leading-relaxed justify-self-end max-w-md">
            Sognos connects service demand, workforce scheduling, & compliance
            into a single operational loop. Powererd by Dynamics 365.
          </p> */}
        </div>
      </div>

      {/* Card track — no overflow-hidden so cards bleed past container right edge */}
      <div ref={viewportRef} className="max-w-7xl w-full mx-auto px-6 pb-2">
        <motion.div
          ref={trackRef}
          style={{ x, gap: GAP }}
          drag="x"
          dragConstraints={{ left: maxDrag, right: 0 }}
          dragElastic={0.05}
          className="flex cursor-grab active:cursor-grabbing"
        >
          {SOLUTIONS.map((s) => (
            <SolutionCard key={s.id} solution={s} />
          ))}
        </motion.div>
      </div>

      {/* Bottom nav — bottom right */}
      <div className="max-w-7xl w-full mx-auto px-6 pb-16">
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => step(-1)}
            aria-label="Previous"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-sognos-border text-sognos-text-muted hover:border-sognos-text-heading hover:text-sognos-text-heading transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => step(1)}
            aria-label="Next"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-brand text-white hover:opacity-85 transition-opacity cursor-pointer"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
