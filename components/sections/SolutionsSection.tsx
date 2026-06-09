"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  UsersThree,
  ChartBar,
  Gauge,
  ChatCircleText,
  FlowArrow,
  Lightning,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";

type Solution = {
  id: string;
  label: string;
  href: string;
  title: string;
  copy: string;
  accent: string;
  Icon: PhosphorIcon;
  rows: { name: string; value: string }[];
  badge: string;
};

const SOLUTIONS: Solution[] = [
  {
    id: "frontline",
    label: "Frontline",
    href: "/solutions/frontline",
    title: "End-to-end field service management",
    copy: "Coordinate mobile teams, manage visits and appointments, and keep every service connected from the field to the office.",
    accent: "#cdedfe",
    Icon: MapPin,
    rows: [
      { name: "Morning round", value: "On track" },
      { name: "Site visit · Unit 4", value: "11:30" },
      { name: "Job #2841", value: "Assigned" },
    ],
    badge: "Live",
  },
  {
    id: "crm",
    label: "CRM",
    href: "/solutions/customer-relationship-management",
    title: "A complete client relationship record",
    copy: "Centralise every client interaction, service history, and communication in one place — giving every team member the context they need.",
    accent: "#eaeefb",
    Icon: UsersThree,
    rows: [
      { name: "Alex Mercer", value: "Active" },
      { name: "Priya Nair", value: "Review" },
      { name: "Tom Webb", value: "New" },
    ],
    badge: "1,240 clients",
  },
  {
    id: "customer-insights",
    label: "Customer Insights",
    href: "/solutions/customer-insights",
    title: "Turn service data into operational intelligence",
    copy: "Unified data from care records, rostering, and field operations — surfaced as live dashboards that show what's working and where to act.",
    accent: "#e6f3ff",
    Icon: ChartBar,
    rows: [
      { name: "Utilisation", value: "94%" },
      { name: "SLA met", value: "98.2%" },
      { name: "Open cases", value: "27" },
    ],
    badge: "Updated now",
  },
  {
    id: "customer-experience",
    label: "Customer Experience",
    href: "/solutions/customer-experience",
    title: "Consistent service quality at every touchpoint",
    copy: "From first contact through ongoing delivery, every interaction is tracked, measured, and optimised for consistent service quality.",
    accent: "#e5fffb",
    Icon: Gauge,
    rows: [
      { name: "CSAT", value: "4.8 / 5" },
      { name: "First response", value: "2m 10s" },
      { name: "Resolved", value: "92%" },
    ],
    badge: "This week",
  },
  {
    id: "customer-service",
    label: "Customer Service",
    href: "/solutions/customer-service",
    title: "Faster resolution, clearer accountability",
    copy: "Unified case management, escalation workflows, and response tracking — so every issue is owned, actioned, and closed on time.",
    accent: "#fff1e5",
    Icon: ChatCircleText,
    rows: [
      { name: "Ticket #5512", value: "Escalated" },
      { name: "Ticket #5510", value: "In progress" },
      { name: "Ticket #5499", value: "Closed" },
    ],
    badge: "12 open",
  },
  {
    id: "power-platform",
    label: "Power Platform",
    href: "/solutions/power-platform",
    title: "Extend and automate without engineering overhead",
    copy: "Power Apps, Power Automate, and Power Pages built into the Sognos platform so your team can customise workflows without writing code.",
    accent: "#f0e5ff",
    Icon: FlowArrow,
    rows: [
      { name: "Approval flow", value: "Running" },
      { name: "Intake form", value: "Published" },
      { name: "Auto-assign", value: "On" },
    ],
    badge: "6 flows",
  },
  {
    id: "quick-start",
    label: "Quick Start",
    href: "/solutions/quick-start",
    title: "Live in weeks, not months",
    copy: "Sognos Quick Start delivers a production-ready deployment in four weeks — pre-built configuration, training, and go-live support included.",
    accent: "#ffe5e6",
    Icon: Lightning,
    rows: [
      { name: "Configuration", value: "Done" },
      { name: "Training", value: "Week 3" },
      { name: "Go-live", value: "Week 4" },
    ],
    badge: "4 weeks",
  },
];

const AUTOPLAY_MS = 5000;

function SolutionVisual({ solution }: { solution: Solution }) {
  const { Icon, accent, rows, badge, label } = solution;

  return (
    <div className="relative h-full w-full">
      {/* Main panel */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-[8%] w-[78%] overflow-hidden rounded-lg border border-white/10 bg-prussian-blue-800/80 p-5 backdrop-blur-sm"
      >
        <div className="flex items-center gap-x-3">
          <span
            className="flex size-9 flex-none items-center justify-center rounded-lg"
            style={{ backgroundColor: accent }}
          >
            <Icon size={20} weight="duotone" className="text-prussian-blue-900" />
          </span>
          <span className="text-sm font-medium text-white">{label}</span>
        </div>
        <div className="mt-4 space-y-2.5">
          {rows.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.35 }}
              className="flex items-center justify-between gap-x-3 rounded-lg bg-white/[0.04] px-3 py-2.5"
            >
              <span className="flex items-center gap-x-2.5">
                <span
                  className="size-5 flex-none rounded-full"
                  style={{ backgroundColor: accent, opacity: 0.85 }}
                />
                <span className="text-xs text-white/75">{r.name}</span>
              </span>
              <span className="text-xs font-medium text-white/90">{r.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating accent card (idle bob) */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ delay: 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-[6%] right-0 w-[44%]"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="overflow-hidden rounded-lg border border-white/10 p-4"
          style={{ backgroundColor: accent }}
        >
          <Icon size={26} weight="duotone" className="text-prussian-blue-900" />
          <div className="mt-3 font-heading text-2xl font-medium leading-none tracking-tight text-prussian-blue-900">
            {badge}
          </div>
          <div className="mt-2 flex gap-x-1.5">
            <span className="h-1.5 w-8 rounded-full bg-prussian-blue-900/70" />
            <span className="h-1.5 w-4 rounded-full bg-prussian-blue-900/30" />
            <span className="h-1.5 w-2 rounded-full bg-prussian-blue-900/30" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function SolutionsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = SOLUTIONS.length;
  const current = SOLUTIONS[active];
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % total), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, paused, total]);

  const select = (i: number) => {
    setActive(i);
    setPaused(true);
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setPaused(false), AUTOPLAY_MS * 2);
  };

  return (
    <section className="w-full overflow-clip bg-prussian-blue-900 py-16 text-white md:py-[120px]">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="flex flex-col gap-y-3">
          <span className="text-sm text-white/55">Solutions</span>
          <h2 className="max-w-[760px] font-heading text-3xl font-normal leading-tight tracking-tight text-white text-balance md:text-4xl">
            One intelligent platform for demand, workforce, and outcomes
          </h2>
        </div>

        {/* Three-zone overview */}
        <div className="mt-12 grid grid-cols-1 gap-y-8 lg:mt-16 lg:grid-cols-[230px_1fr_300px] lg:gap-x-12">
          {/* Left rail */}
          <nav
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-y lg:border-white/10 lg:py-1"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {SOLUTIONS.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => select(i)}
                  aria-selected={isActive}
                  className="group flex flex-none items-center gap-x-2.5 rounded-full px-3 py-2.5 text-left lg:rounded-none lg:px-1"
                >
                  <span className="relative flex size-2 flex-none items-center justify-center">
                    {isActive && (
                      <motion.span
                        layoutId="solution-bullet"
                        className="absolute inset-0 rounded-full bg-white"
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                      />
                    )}
                    {!isActive && (
                      <span className="size-1.5 rounded-full bg-white/20 transition-colors group-hover:bg-white/40" />
                    )}
                  </span>
                  <span
                    className={`whitespace-nowrap text-sm transition-colors duration-300 ${
                      isActive ? "font-medium text-white" : "text-white/55 group-hover:text-white/80"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Center visual */}
          <div className="relative order-first aspect-[5/4] w-full lg:order-none lg:aspect-auto lg:min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div key={current.id} className="absolute inset-0">
                <SolutionVisual solution={current} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right copy */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <h3 className="font-heading text-2xl font-normal leading-tight tracking-tight text-white text-balance lg:text-3xl">
                  {current.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  {current.copy}
                </p>
                <Link
                  href={current.href}
                  className="mt-6 inline-flex items-center gap-x-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
                >
                  See details
                  <svg className="size-3" viewBox="0 0 12 13" fill="none" aria-hidden="true">
                    <path
                      d="M0.75 6.46875H11.25M11.25 6.46875L6 11.7188M11.25 6.46875L6 1.21875"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
