"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SHINE_BASE = {
  padding: "1px",
  maskImage: "linear-gradient(#fff, #fff), linear-gradient(#fff, #fff)",
  maskClip: "content-box, border-box",
  maskComposite: "exclude",
  WebkitMaskImage: "linear-gradient(#fff, #fff), linear-gradient(#fff, #fff)",
  WebkitMaskClip: "content-box, padding-box",
  WebkitMaskComposite: "xor",
  ["--shine-duration" as string]: "6s",
  ["--shine-angle" as string]: "0deg",
} as React.CSSProperties;

const ExpandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6" /><path d="m21 3-7 7" /><path d="m3 21 7-7" /><path d="M9 21H3v-6" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

type DrawerProduct = "care" | "roster" | null;

const DRAWER_CONTENT: Record<"care" | "roster", {
  logo: string;
  logoAlt: string;
  company: string;
  context: string;
  challenge: string;
  solution: string;
  quote: string;
  quoteAuthor: string;
  outcomes: string[];
  products: string[];
  productLink: string;
  productLabel: string;
  accentClass: string;
}> = {
  care: {
    logo: "/logos/sognos-care-logo.svg",
    logoAlt: "SognosCare",
    company: "Flourish Australia",
    context: "SognosCare · Mental Health · Not-for-profit",
    challenge:
      "Flourish Australia — a national not-for-profit supporting over 1,100 staff delivering mental health services — was running on a legacy Client Information Management System approaching end-of-life. Fragmented systems, manual data handling, and poor reporting visibility were creating unsustainable admin load and compliance risk.",
    solution:
      "Sognos deployed Flourish Connect — a unified platform built on Microsoft Dynamics 365 and Power Platform — covering Enquiry, Intake, Support Delivery, NDIS Billing & Claiming, and advanced Power BI reporting. Integrated with payroll, HR, and rostering systems to create a single source of truth across the network.",
    quote: "You make us very proud — THANK YOU!",
    quoteAuthor: "Susan McCarthy, Chief Operating Officer — Flourish Australia",
    outcomes: [
      "1,100+ users on a single platform",
      "Eliminated redundant manual processes",
      "Single source of truth for funder reporting",
      "Full NDIS claiming & billing automation",
    ],
    products: ["Dynamics 365", "Power Platform", "Power BI", "Power Pages", "Copilot AI", "Customer Insights"],
    productLink: "/products/sognoscare",
    productLabel: "Explore SognosCare",
    accentClass: "text-indigo-600 hover:text-indigo-800",
  },
  roster: {
    logo: "/logos/sognos-roster-logo.svg",
    logoAlt: "SognosRoster",
    company: "Asset Security Concepts",
    context: "SognosRoster · Security Services · Field Service",
    challenge:
      "Asset Security Concepts (ASC), a national security provider within the SECOM Group, was managing field scheduling across disconnected systems — Excel spreadsheets, physical whiteboards, and separate finance and inventory tools. The fragmentation created blind spots in job visibility, cost tracking, and technician coordination.",
    solution:
      "Sognos implemented an integrated Dynamics 365 Field Service and Business Central solution, unifying ERP and field service management on a single database. Automated smart workflows replaced paper-based processes and real-time dashboards gave management, customers, and technicians visibility across every job.",
    quote: "Real-time visibility across management, customers, employees, and technicians.",
    quoteAuthor: "Deployment outcome — Asset Security Concepts",
    outcomes: [
      "Eliminated paper-based scheduling entirely",
      "Real-time job tracking across the network",
      "Detailed job costing and profitability visibility",
      "Streamlined workflows with advanced reporting",
    ],
    products: ["Dynamics 365 Field Service", "Business Central", "Office 365", "Power BI"],
    productLink: "/products/sognosroster",
    productLabel: "Explore SognosRoster",
    accentClass: "text-teal-600 hover:text-teal-800",
  },
};

export default function ProductSection() {
  const [drawerProduct, setDrawerProduct] = useState<DrawerProduct>(null);
  const drawer = drawerProduct ? DRAWER_CONTENT[drawerProduct] : null;

  return (
    <section
      aria-label="Platform capabilities"
      className="flex overflow-hidden w-full p-0 relative items-center justify-center border-b border-sognos-border-subtle"
    >
      <div className="max-w-7xl w-full mx-auto px-6 py-24 border-x border-dashed border-sognos-border-subtle z-1">
        {/* Section heading */}
        <div className="mb-16 max-w-4xl">
          <h2 className="text-2xl md:text-4xl text-brand font-heading font-medium tracking-tight">
            Built for regulated operations.{" "}
            <span className="text-soft text-slate-500">
              For organisations that can&apos;t afford to get things wrong —
              from compliance and audit trails to real-time workforce
              optimisation.
            </span>
          </h2>
        </div>

        {/* 3-card grid */}
        <div className="relative grid grid-cols-3 lg:grid-cols-3 gap-6 p-1 rounded-3xl border border-sognos-border-subtle">

          {/* ── Card 1 — SognosCare ── */}
          <div className="flex flex-col group transition-all duration-700 ease-out w-full h-[600px] rounded-3xl relative overflow-hidden border border-card-border bg-gradient-hero">
            <div
              className="animate-shine pointer-events-none absolute inset-0 size-full rounded-[inherit]"
              style={{
                ...SHINE_BASE,
                backgroundImage:
                  "conic-gradient(from var(--shine-angle), transparent 75%, rgb(160, 124, 254), rgb(254, 143, 181), rgb(255, 190, 123), transparent)",
              }}
            />
            <div className="z-20 side-stack text-center card pt-10 pr-8 pb-0 pl-8 relative items-start justify-between h-full">
              {/* Logo */}
              <div className="mb-3">
                <img src="/logos/sognos-care-logo.svg" alt="SognosCare" className="h-8 object-contain" />
              </div>
              {/* Byline */}
              <p className="text-sm font-medium text-white/60 tracking-wide mb-5">
                From intake to outcome, on one platform
              </p>
              <p className="text-white tracking-tight text-sognos-text-body">
                Deliver safer, simpler care in the field. From mental health to
                aged care, we help providers reduce admin and stay
                service-ready—whatever changes come next.
              </p>
              <a href="/products/sognoscare" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white transition-colors">
                Explore SognosCare <ArrowIcon />
              </a>

              {/* White block */}
              <div className="cardSlide overflow-hidden absolute bottom-4 left-0 w-full p-4 px-4">
                <div className="cardSlideInner flex flex-col justify-between rounded-2xl bg-white gap-4 p-6 pb-2 border border-[#434EC1]">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">Flourish Australia</p>
                        <p className="text-xs text-neutral-400">Mental Health · Not-for-profit</p>
                      </div>
                      <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">1,100+ staff</span>
                    </div>
                    <blockquote className="text-sm leading-relaxed text-neutral-600 italic border-l-2 border-indigo-200 pl-3">
                      &ldquo;You make us very proud — THANK YOU!&rdquo;
                    </blockquote>
                    <p className="text-xs text-neutral-400 mt-1.5 pl-3">— Susan McCarthy, Chief Operating Officer</p>
                  </div>
                  <div className="border-t border-indigo-100 py-2 flex items-center justify-between">
                    <a className="py-3 text-sm font-heading font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer">
                      Read the full story →
                    </a>
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      onClick={() => setDrawerProduct("care")}
                      className="bg-blue-50 hover:bg-blue-100 p-2.5 rounded-xl text-blue-600 transition-all duration-300 group-hover:scale-110 flex items-center justify-center shadow-sm hover:shadow-md"
                    >
                      <ExpandIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="z-0 flex-1 overflow-hidden w-full h-full relative" />
          </div>

          {/* ── Card 2 — SognosRoster ── */}
          <div className="flex flex-col group transition-all duration-700 ease-out w-full h-[600px] rounded-3xl relative overflow-hidden border border-card-border bg-gradient-hero">
            <div
              className="animate-shine pointer-events-none absolute inset-0 size-full rounded-[inherit]"
              style={{
                ...SHINE_BASE,
                backgroundImage:
                  "conic-gradient(from var(--shine-angle), transparent 75%, rgb(20, 184, 166), rgb(6, 182, 212), rgb(99, 252, 241), transparent)",
              }}
            />
            <div className="z-20 side-stack text-center card pt-10 pr-8 pb-0 pl-8 relative items-start justify-between h-full">
              {/* Logo */}
              <div className="mb-3">
                <img src="/logos/sognos-roster-logo.svg" alt="SognosRoster" className="h-8 object-contain" />
              </div>
              {/* Byline */}
              <p className="text-sm font-medium text-white/60 tracking-wide mb-5">
                The right worker, for every job, in real time
              </p>
              <p className="text-white tracking-tight text-sognos-text-body">
                From scheduling to routing, SognosRoster puts the right worker
                on every shift — factoring skills, location, availability and
                compliance automatically.
              </p>
              <a href="/products/sognosroster" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white transition-colors">
                Explore SognosRoster <ArrowIcon />
              </a>

              {/* White block */}
              <div className="cardSlide overflow-hidden absolute bottom-4 left-0 w-full p-4 px-4">
                <div className="cardSlideInner flex flex-col justify-between rounded-2xl bg-white gap-4 p-6 pb-2 border border-teal-500">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">Asset Security Concepts</p>
                        <p className="text-xs text-neutral-400">Security Services · Field Service</p>
                      </div>
                      <span className="text-xs font-semibold bg-teal-50 text-teal-600 px-2.5 py-1 rounded-full">Paper-free ops</span>
                    </div>
                    <blockquote className="text-sm leading-relaxed text-neutral-600 italic border-l-2 border-teal-200 pl-3">
                      &ldquo;Real-time visibility across management, customers, employees, and technicians.&rdquo;
                    </blockquote>
                    <p className="text-xs text-neutral-400 mt-1.5 pl-3">— Deployment outcome, Asset Security Concepts</p>
                  </div>
                  <div className="border-t border-teal-100 py-2 flex items-center justify-between">
                    <a className="py-3 text-sm font-heading font-semibold text-teal-600 hover:text-teal-800 transition-colors cursor-pointer">
                      Read the full story →
                    </a>
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      onClick={() => setDrawerProduct("roster")}
                      className="bg-teal-50 hover:bg-teal-100 p-2.5 rounded-xl text-teal-600 transition-all duration-300 group-hover:scale-110 flex items-center justify-center shadow-sm hover:shadow-md"
                    >
                      <ExpandIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="z-0 flex-1 overflow-hidden w-full h-full relative" />
          </div>

          {/* ── Card 3 — Better Together ── */}
          <div className="flex flex-col group transition-all duration-700 ease-out w-full h-[600px] rounded-3xl relative overflow-hidden border border-card-border bg-gradient-hero">
            <div
              className="animate-shine pointer-events-none absolute inset-0 size-full rounded-[inherit]"
              style={{
                ...SHINE_BASE,
                backgroundImage:
                  "conic-gradient(from var(--shine-angle), transparent 75%, rgb(99, 102, 241), rgb(20, 184, 166), rgb(255, 190, 123), transparent)",
              }}
            />
            <div className="z-20 side-stack text-center card pt-10 pr-8 pb-0 pl-8 relative items-start justify-between h-full">
              {/* Both logos + plus */}
              <div className="flex items-center gap-2.5 mb-3">
                <img src="/logos/sognos-care-logo.svg" alt="SognosCare" className="h-6 object-contain opacity-90" />
                <span className="text-white/40 text-lg font-light">+</span>
                <img src="/logos/sognos-roster-logo.svg" alt="SognosRoster" className="h-6 object-contain opacity-90" />
              </div>

              {/* Byline */}
              <p className="text-sm font-medium text-white/60 tracking-wide mb-5">
                When care and workforce share one platform
              </p>

              <p className="text-white tracking-tight text-sognos-text-body">
                Every referral gets a worker. Every worker gets the right job.
                SognosCare and SognosRoster connect the full service lifecycle —
                from intake to delivery — without manual handoffs.
              </p>

              <a href="/products" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white transition-colors">
                See the full platform <ArrowIcon />
              </a>

              {/* White block — stat panel, no drawer */}
              <div className="cardSlide overflow-hidden absolute bottom-4 left-0 w-full p-4 px-4">
                <div className="cardSlideInner flex flex-col justify-between rounded-2xl bg-white gap-4 p-6 pb-2 border border-violet-300">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                      { value: "1,100+", label: "Staff on one platform" },
                      { value: "4 wks", label: "Average time to live" },
                      { value: "100%", label: "Compliance maintained" },
                    ].map(({ value, label }) => (
                      <div key={label}>
                        <p className="text-xl font-bold text-neutral-900 tabular-nums leading-none">{value}</p>
                        <p className="text-[10px] text-neutral-400 mt-1 leading-snug">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-violet-100 py-2 flex items-center justify-between">
                    <a href="/products" className="py-3 text-sm font-heading font-semibold text-violet-600 hover:text-violet-800 transition-colors">
                      Compare products →
                    </a>
                    <a
                      href="/contact"
                      className="bg-brand text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                    >
                      Book a Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="z-0 flex-1 overflow-hidden w-full h-full relative" />
          </div>

        </div>
      </div>

      {/* ── Shared bottom drawer ── */}
      <AnimatePresence>
        {drawerProduct && drawer && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col justify-end"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setDrawerProduct(null)}
              aria-hidden="true"
            />
            <motion.div
              className="relative z-10 bg-white rounded-t-2xl shadow-xl min-h-[80vh] max-w-7xl w-full mx-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <img src={drawer.logo} alt={drawer.logoAlt} className="h-7 object-contain" />
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 tracking-tight leading-none">{drawer.company}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{drawer.context}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerProduct(null)}
                  aria-label="Close"
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-8 grid grid-cols-3 gap-8 overflow-y-auto max-h-[60vh]">
                <div className="col-span-2 space-y-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">The challenge</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{drawer.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">The solution</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{drawer.solution}</p>
                  </div>
                  <blockquote className="border-l-2 border-slate-200 pl-4">
                    <p className="text-slate-700 text-base leading-relaxed italic">&ldquo;{drawer.quote}&rdquo;</p>
                    <footer className="text-xs text-slate-400 mt-2">{drawer.quoteAuthor}</footer>
                  </blockquote>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Outcomes</p>
                    <ul className="space-y-2.5">
                      {drawer.outcomes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-bold">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Products used</p>
                    <div className="flex flex-wrap gap-1.5">
                      {drawer.products.map((tag) => (
                        <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                <a href={drawer.productLink} className={`text-sm font-medium transition-colors ${drawer.accentClass}`}>
                  {drawer.productLabel} →
                </a>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setDrawerProduct(null)} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-900 transition-colors">
                    Close
                  </button>
                  <button type="button" className="px-4 py-2 text-sm bg-brand text-white rounded-lg hover:opacity-90 transition-opacity">
                    Book a Demo
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full absolute bottom-0 left-0 h-[220px] sm:h-[240px] md:h-[280px] lg:h-[400px] xl:h-[420px] 2xl:h-[650px] z-0 pointer-events-none">
        <div className="overflow-hidden flex flex-row h-full w-full">
          {[0, 40, 80, 120, 160, 200, 160, 120, 80, 40, 0, 40, 80, 120, 160, 200, 160, 120, 80, 40, 0, 40, 80, 120, 160, 200].map((y, i) => (
            <div
              key={i}
              className="bg-gradient-1-vertical-flipped-test"
              style={{ width: "56.0769px", height: "100%", transform: `translateY(${y}px) scaleY(-1)` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
