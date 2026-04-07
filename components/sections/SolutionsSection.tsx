"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SOLUTIONS = [
  {
    id: "field-service",
    label: "Field Service",
    href: "/solutions/field-service",
    title: "End-to-end field service management",
    copy: "Dispatch technicians, track jobs in real time, and close every work order with a complete audit trail — all from a single platform built on Dynamics 365 Field Service.",
    features: [
      {
        title: "Smart dispatch & scheduling",
        body: "Auto-assign the right technician based on skill, location, and availability — minimising travel time and missed SLAs.",
      },
      {
        title: "Live job tracking",
        body: "Field workers update job status from mobile. Coordinators see every job, every site, in real time.",
      },
      {
        title: "SLA & compliance management",
        body: "Priority rules, escalation workflows, and compliance checkpoints built in — so nothing falls through the cracks.",
      },
      {
        title: "Asset & inventory visibility",
        body: "Link work orders to asset records, track parts used, and maintain full service history per asset.",
      },
    ],
    stat: { value: "35%", label: "reduction in travel time" },
    bestFor: "Facilities management, utilities, industrial services",
    badge: "SognosRoster",
    badgeHref: "/products/sognosroster",
  },
  {
    id: "crm",
    label: "CRM",
    href: "/solutions/customer-relationship-management",
    title: "A complete client relationship record",
    copy: "Centralise every client interaction, service history, and communication in one place — giving every team member the context they need before they arrive.",
    features: [
      {
        title: "360° client profiles",
        body: "Contact details, service history, notes, and compliance status — all in a single structured record.",
      },
      {
        title: "Interaction tracking",
        body: "Log calls, visits, emails, and tasks against the client record automatically — no manual entry required.",
      },
      {
        title: "Pipeline & referral management",
        body: "Track new referrals from enquiry to enrolled, with handoff workflows that keep every team aligned.",
      },
      {
        title: "Alerts & follow-up automation",
        body: "Set review reminders, trigger follow-up tasks, and flag at-risk clients before issues escalate.",
      },
    ],
    stat: { value: "100%", label: "client record completeness" },
    bestFor: "Health & social care, local government, community services",
    badge: "SognosCare",
    badgeHref: "/products/sognoscare",
  },
  {
    id: "customer-insights",
    label: "Customer Insights",
    href: "/solutions/customer-insights",
    title: "Turn service data into operational intelligence",
    copy: "Unified data from care records, rostering, and field operations — surfaced as live dashboards that show what's working, what's at risk, and where to act.",
    features: [
      {
        title: "Unified data model",
        body: "Pull together data from SognosCare, SognosRoster, and external systems into a single, clean operational picture.",
      },
      {
        title: "Live dashboards",
        body: "Track utilisation, outcomes, compliance rates, and workforce costs — updated in real time, not next morning.",
      },
      {
        title: "Outcome & KPI reporting",
        body: "Pre-built reports for NDIS, aged care, and government funding submissions — ready to export or share.",
      },
      {
        title: "Predictive alerts",
        body: "AI surfaces patterns — rising cancellations, compliance gaps, workforce shortfalls — before they become problems.",
      },
    ],
    stat: { value: "AI-powered", label: "operational intelligence" },
    bestFor: "Operations leaders, compliance teams, funding managers",
    badge: "Both products",
    badgeHref: "/products",
  },
  {
    id: "customer-experience",
    label: "Customer Experience",
    href: "/solutions/customer-experience",
    title: "Consistent service quality at every touchpoint",
    copy: "From first contact through ongoing delivery, every interaction is tracked, measured, and optimised — so clients receive the same high standard regardless of who they speak to.",
    features: [
      {
        title: "Omnichannel intake",
        body: "Capture referrals and enquiries from phone, email, portal, or direct entry — routed automatically to the right team.",
      },
      {
        title: "Client communication log",
        body: "Every message, visit note, and update recorded against the client record — full history available instantly.",
      },
      {
        title: "Service quality tracking",
        body: "Set satisfaction benchmarks, log delivery outcomes, and flag service failures for immediate follow-up.",
      },
      {
        title: "Feedback & improvement loops",
        body: "Collect client feedback, route to the responsible team, and close the loop with documented actions.",
      },
    ],
    stat: { value: "4.8★", label: "average service satisfaction" },
    bestFor: "Client-facing teams, service coordinators, quality managers",
    badge: "SognosCare",
    badgeHref: "/products/sognoscare",
  },
  {
    id: "customer-service",
    label: "Customer Service",
    href: "/solutions/customer-service",
    title: "Faster resolution, clearer accountability",
    copy: "Unified case management, escalation workflows, and response tracking — built on Dynamics 365 Customer Service so every issue is owned, actioned, and closed.",
    features: [
      {
        title: "Case creation & routing",
        body: "New issues logged automatically or manually — assigned to the right team with priority rules built in.",
      },
      {
        title: "Escalation management",
        body: "Define SLA targets, trigger escalations automatically, and ensure nothing stays unresolved past its deadline.",
      },
      {
        title: "Knowledge base integration",
        body: "Surface relevant articles and past resolutions alongside open cases — reducing handle time and repeat contacts.",
      },
      {
        title: "Full audit trail",
        body: "Every action, update, and resolution recorded — ready for compliance review, reporting, or dispute resolution.",
      },
    ],
    stat: { value: "40%", label: "faster average resolution time" },
    bestFor: "Support teams, complaints handlers, client services",
    badge: "SognosCare",
    badgeHref: "/products/sognoscare",
  },
  {
    id: "power-platform",
    label: "Power Platform",
    href: "/solutions/power-platform",
    title: "Extend and automate without engineering overhead",
    copy: "Power Apps, Power Automate, and Power Pages — built into the Sognos platform so your team can customise workflows, build tools, and automate processes without writing code.",
    features: [
      {
        title: "Custom low-code apps",
        body: "Build internal tools and client-facing portals with Power Apps — connected directly to your Dynamics 365 data.",
      },
      {
        title: "Workflow automation",
        body: "Automate repetitive processes — approvals, notifications, data sync — using Power Automate flows triggered by real events.",
      },
      {
        title: "External portals",
        body: "Give clients, carers, or field workers secure self-service access via Power Pages — no custom development required.",
      },
      {
        title: "Microsoft Copilot integration",
        body: "AI assistance built into every workflow — from drafting care notes to summarising case histories and flagging compliance risks.",
      },
    ],
    stat: { value: "3×", label: "faster process automation" },
    bestFor: "Operations teams building internal tools and automations",
    badge: "Both products",
    badgeHref: "/products",
  },
  {
    id: "quick-start",
    label: "Quick Start",
    href: "/solutions/quick-start",
    title: "Live in weeks, not months",
    copy: "Sognos Quick Start delivers a production-ready deployment of SognosCare or SognosRoster in four weeks — with pre-built configuration, training, and go-live support included.",
    features: [
      {
        title: "Pre-built configuration",
        body: "Industry-specific data models, workflows, and compliance settings — already configured for your sector before week one.",
      },
      {
        title: "Guided onboarding",
        body: "Structured four-week programme: configuration, data migration, user training, and go-live — delivered by the Sognos team.",
      },
      {
        title: "Fixed scope, fixed price",
        body: "No open-ended engagements. Quick Start is a defined package with a clear deliverable and a guaranteed go-live date.",
      },
      {
        title: "Upgrade path built in",
        body: "Quick Start deploys on the same platform as a full implementation — scale up features and capacity without starting again.",
      },
    ],
    stat: { value: "4 weeks", label: "to go live" },
    bestFor:
      "Organisations that need results fast without a long project cycle",
    badge: "Both products",
    badgeHref: "/products",
  },
] as const;

type SolutionId = (typeof SOLUTIONS)[number]["id"];

const N = SOLUTIONS.length;

// ─── Icons ────────────────────────────────────────────────────────────────────

const ICONS: Record<SolutionId, () => React.ReactNode> = {
  "field-service": () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M10 2C6.69 2 4 4.69 4 8c0 4.38 6 10 6 10s6-5.62 6-10c0-3.31-2.69-6-6-6z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
  crm: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="7.5" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M2 17c0-3.31 2.46-5.5 5.5-5.5S13 13.69 13 17"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M14 11.5a3 3 0 000-5M17 17c0-2.21-1.34-4-3-4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  "customer-insights": () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="12"
        width="3"
        height="6"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="8.5"
        y="8"
        width="3"
        height="10"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="15"
        y="4"
        width="3"
        height="14"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  ),
  "customer-experience": () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 2l2.09 4.26L17 7.27l-3.5 3.41.83 4.82L10 13.27l-4.33 2.23.83-4.82L3 7.27l4.91-.71L10 2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "customer-service": () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 6a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2H6l-3 3V6z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M7 9h6M7 12h4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  "power-platform": () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 2v8M10 10l4-4M10 10l-4-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 14h12M6 17h8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  "quick-start": () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 2l1.5 5h5l-4 3 1.5 5L10 12l-4 3 1.5-5-4-3h5L10 2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded border border-sognos-border-subtle bg-white p-5">
      <p className="text-sm font-semibold text-neutral-900 leading-snug">
        {title}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{body}</p>
    </div>
  );
}

function LeftColumn({ solution }: { solution: (typeof SOLUTIONS)[number] }) {
  return (
    <div className="flex flex-col justify-center py-10 pr-10">
      <h3 className="font-heading font-medium tracking-tight text-neutral-900 text-xl leading-snug">
        {solution.title}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-neutral-500">
        {solution.copy}
      </p>
      <Link
        href={solution.href}
        className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand hover:text-brand/80 transition-colors"
      >
        Learn more
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 7h8M7 3l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}

function RightColumn({ solution }: { solution: (typeof SOLUTIONS)[number] }) {
  return (
    <div className="py-10 pl-10 border-l border-sognos-border-subtle">
      <div className="grid grid-cols-2 gap-3">
        {solution.features.map((f) => (
          <FeatureCard key={f.title} title={f.title} body={f.body} />
        ))}
      </div>

      <div className="mt-5 flex items-center gap-4 flex-wrap">
        {/* Stat */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold tracking-tight text-neutral-900 font-heading">
            {solution.stat.value}
          </span>
          <span className="text-sm text-neutral-400">
            {solution.stat.label}
          </span>
        </div>

        <span className="text-neutral-200">|</span>

        {/* Best for */}
        <p className="text-xs text-neutral-400">
          <span className="font-medium text-neutral-600">Best for:</span>{" "}
          {solution.bestFor}
        </p>

        <span className="text-neutral-200">|</span>

        {/* Product badge */}
        <Link
          href={solution.badgeHref}
          className="inline-flex items-center gap-1 rounded-full border border-sognos-border-subtle bg-white px-3 py-1 text-xs font-medium text-neutral-600 hover:border-brand/30 hover:text-brand transition-colors"
        >
          {solution.badge}
        </Link>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function SolutionsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const track = rect.height - window.innerHeight;
      if (track <= 0) return;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / track));
      setActiveIndex(Math.min(Math.floor(progress * N), N - 1));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeSolution = SOLUTIONS[activeIndex];

  return (
    // Outer scroll track — tall enough to give each tab ~50vh of scroll
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${N * 50 + 100}vh` }}
    >
      {/* Heading — scrolls normally, not sticky */}
      <div className="max-w-7xl w-full mx-auto px-6 border-x border-dashed border-sognos-border-subtle">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end pt-12 pb-6">
          <h2 className="text-2xl md:text-4xl text-brand font-heading font-medium tracking-tight">
            Solutions
            <br />
            Built for how your operation works
          </h2>
          <p className="font-heading font-medium leading-tigher section-header-description justify-self-end">
            Sognos connects service demand, workforce scheduling, and compliance
            into a single operational loop. Powered by AI, Microsoft Dynamics
            365.
          </p>
        </div>
      </div>

      {/* Sticky panel — only tabs + content lock to viewport */}
      <div className="sticky top-[70px] h-[calc(100vh-70px)] flex flex-col border-b border-sognos-border-subtle overflow-hidden">
        <div className="max-w-7xl w-full h-full mx-auto px-6 flex flex-col border-x border-dashed border-sognos-border-subtle">
          {/* Tab nav */}
          <nav
            className="flex overflow-x-auto border-b justify-evenly border-sognos-border-subtle gap-0 -mb-px flex-shrink-0"
            aria-label="Solutions"
          >
            {SOLUTIONS.map((s, i) => {
              const Icon = ICONS[s.id];
              const isActive = activeIndex === i;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveIndex(i)}
                  className={`relative flex items-center gap-2 whitespace-nowrap px-4 py-5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-neutral-900"
                      : "text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  <span
                    className={`transition-colors ${
                      isActive ? "text-brand" : "text-neutral-300"
                    }`}
                  >
                    <Icon />
                  </span>
                  {s.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Content */}
          <div className="flex-1 min-h-0 rounded-b-lg border border-t-0 border-sognos-border-subtle overflow-hidden bg-neutral-50/40">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSolution.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="grid grid-cols-[1fr_2fr] h-full"
              >
                <LeftColumn solution={activeSolution} />
                <RightColumn solution={activeSolution} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
