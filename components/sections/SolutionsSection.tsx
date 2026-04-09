"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
    iconColor: "#05a4fa",
  },
  {
    id: "crm",
    label: "CRM",
    href: "/solutions/customer-relationship-management",
    title: "A complete client relationship record",
    copy: "Centralise every client interaction, service history, and communication in one place — giving every team member the context they need.",
    accentBg: "#eaeefb",
    iconColor: "#2d59d2",
  },
  {
    id: "customer-insights",
    label: "Customer Insights",
    href: "/solutions/customer-insights",
    title: "Turn service data into operational intelligence",
    copy: "Unified data from care records, rostering, and field operations — surfaced as live dashboards that show what's working and where to act.",
    accentBg: "#e6f3ff",
    iconColor: "#0488fb",
  },
  {
    id: "customer-experience",
    label: "Customer Experience",
    href: "/solutions/customer-experience",
    title: "Consistent service quality at every touchpoint",
    copy: "From first contact through ongoing delivery, every interaction is tracked, measured, and optimised for consistent service quality.",
    accentBg: "#e5fffb",
    iconColor: "#009982",
  },
  {
    id: "customer-service",
    label: "Customer Service",
    href: "/solutions/customer-service",
    title: "Faster resolution, clearer accountability",
    copy: "Unified case management, escalation workflows, and response tracking — so every issue is owned, actioned, and closed on time.",
    accentBg: "#fff1e5",
    iconColor: "#ff9233",
  },
  {
    id: "power-platform",
    label: "Power Platform",
    href: "/solutions/power-platform",
    title: "Extend and automate without engineering overhead",
    copy: "Power Apps, Power Automate, and Power Pages built into the Sognos platform so your team can customise workflows without writing code.",
    accentBg: "#f0e5ff",
    iconColor: "#a666ff",
  },
  {
    id: "quick-start",
    label: "Quick Start",
    href: "/solutions/quick-start",
    title: "Live in weeks, not months",
    copy: "Sognos Quick Start delivers a production-ready deployment in four weeks — pre-built configuration, training, and go-live support included.",
    accentBg: "#ffe5e6",
    iconColor: "#ff666b",
  },
] as const;

type SolutionId = (typeof SOLUTIONS)[number]["id"];

// ─── Icons ────────────────────────────────────────────────────────────────────

const ICONS: Record<SolutionId, () => React.ReactNode> = {
  "field-service": () => (
    <svg width="32" height="32" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 2C6.69 2 4 4.69 4 8c0 4.38 6 10 6 10s6-5.62 6-10c0-3.31-2.69-6-6-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
  crm: () => (
    <svg width="32" height="32" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 17c0-3.31 2.46-5.5 5.5-5.5S13 13.69 13 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14 11.5a3 3 0 000-5M17 17c0-2.21-1.34-4-3-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  "customer-insights": () => (
    <svg width="32" height="32" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="12" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="8.5" y="8" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="15" y="4" width="3" height="14" rx="1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  "customer-experience": () => (
    <svg width="32" height="32" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2l2.09 4.26L17 7.27l-3.5 3.41.83 4.82L10 13.27l-4.33 2.23.83-4.82L3 7.27l4.91-.71L10 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
  "customer-service": () => (
    <svg width="32" height="32" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 6a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2H6l-3 3V6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7 9h6M7 12h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  "power-platform": () => (
    <svg width="32" height="32" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2v8M10 10l4-4M10 10l-4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 14h12M6 17h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  "quick-start": () => (
    <svg width="32" height="32" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2l1.5 5h5l-4 3 1.5 5L10 12l-4 3 1.5-5-4-3h5L10 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
};

// ─── Card ─────────────────────────────────────────────────────────────────────

const GAP = 20;
const CARD_WIDTH = 290;

function SolutionCard({ solution }: { solution: (typeof SOLUTIONS)[number] }) {
  const Icon = ICONS[solution.id];
  return (
    <div
      className="flex-shrink-0 rounded-xl border border-[--sognos-border] bg-white overflow-hidden flex flex-col"
      style={{ width: CARD_WIDTH }}
    >
      {/* Image area */}
      <div
        className="h-[180px] flex items-center justify-center"
        style={{ background: solution.accentBg }}
      >
        <div
          style={{
            color: solution.iconColor,
            transform: "scale(2.2)",
            transformOrigin: "center",
          }}
        >
          <Icon />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h5 className="text-sm font-semibold text-[--sognos-text-heading] leading-snug">
          {solution.title}
        </h5>
        <p className="mt-2 text-sm leading-relaxed text-[--sognos-text-body] line-clamp-3 flex-1">
          {solution.copy}
        </p>
        <Link
          href={solution.href}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[--sognos-brand] hover:gap-2 transition-all duration-200"
        >
          See {solution.label}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              fill="currentColor"
              d="M1.9877 7.23745H12.1877L8.4877 3.53745C8.1877 3.23745 8.1877 2.78745 8.4877 2.48745C8.7877 2.18745 9.2377 2.18745 9.5377 2.48745L14.5377 7.48745C14.8377 7.78745 14.8377 8.23745 14.5377 8.53745L9.5377 13.5375C9.3877 13.6875 9.1877 13.7375 8.9877 13.7375C8.7877 13.7375 8.5877 13.6875 8.4377 13.5375C8.13769 13.2375 8.13769 12.7875 8.4377 12.4875L12.1377 8.78745H1.9877C1.5877 8.78745 1.2377 8.43745 1.2377 8.03745C1.2377 7.63745 1.5877 7.23745 1.9877 7.23745Z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function SolutionsSection() {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(0);

  const getCardWidth = useCallback(
    () => CARD_WIDTH + GAP,
    []
  );

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
    <section className="w-full border-b border-[--sognos-border-subtle] overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl w-full mx-auto px-6 border-x border-dashed border-[--sognos-border-subtle]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end pt-24 pb-10">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[--sognos-text-muted]">
              Solutions
            </p>
            <h2 className="font-heading text-2xl font-medium tracking-tight text-brand md:text-4xl">
              Built for how your operation works
            </h2>
          </div>
          <p className="font-heading font-medium text-[--sognos-text-body] leading-relaxed justify-self-end max-w-md">
            Sognos connects service demand, workforce scheduling, and compliance
            into a single operational loop — powered by AI and Microsoft Dynamics 365.
          </p>
        </div>
      </div>

      {/* Card track — no overflow-hidden so cards bleed past container right edge */}
      <div
        ref={viewportRef}
        className="max-w-7xl w-full mx-auto px-6 border-x border-dashed border-[--sognos-border-subtle] pb-2"
      >
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
      <div className="max-w-7xl w-full mx-auto px-6 pb-16 border-x border-dashed border-[--sognos-border-subtle]">
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => step(-1)}
            aria-label="Previous"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[--sognos-border] text-[--sognos-text-muted] hover:border-[--sognos-text-heading] hover:text-[--sognos-text-heading] transition-colors cursor-pointer"
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
