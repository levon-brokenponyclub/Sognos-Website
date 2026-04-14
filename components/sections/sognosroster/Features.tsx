"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FEATURES = [
  {
    id: "scheduling",
    name: "Intelligent Scheduling",
    tagline: "Demand-driven, automatically",
    description:
      "Demand-driven roster generation that works from confirmed service demand — matching workers to shifts based on skills, certifications, availability, and location in a single automated pass.",
    capabilities: [
      "Automated roster generation from confirmed service requests",
      "Configurable scheduling rules per service type and client requirement",
      "Bulk schedule preview before publishing to workers",
      "Override controls for manual adjustments without breaking automation",
    ],
    iconPath:
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    id: "skills-matching",
    name: "Skills & Compliance Matching",
    tagline: "Qualified, every time",
    description:
      "Every worker allocation is validated against qualification requirements, active certifications, and client-specific preferences before confirmation. Compliance isn't a post-hoc check — it's a scheduling precondition.",
    capabilities: [
      "Multi-dimensional matching: skills, certs, client preferences, gender requirements",
      "Real-time certification expiry tracking with automated alerts",
      "Automatic ineligibility flags when compliance requirements aren't met",
      "Compliance audit trail per shift allocation",
    ],
    iconPath:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    id: "route-optimisation",
    name: "Route Optimisation",
    tagline: "Less travel, more service",
    description:
      "Geography and travel time are factored into every scheduling decision — reducing drive time, fuel cost, and lateness across field-based service environments.",
    capabilities: [
      "Real-time distance and travel time factored into scheduling",
      "Geographic clustering to minimise cross-city dispatching",
      "Travel time reporting for cost transparency and worker pay",
      "Worker travel allowance calculations automated per award conditions",
    ],
    iconPath:
      "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  },
  {
    id: "real-time-adjustments",
    name: "Real-Time Adjustments",
    tagline: "Respond in minutes, not hours",
    description:
      "When plans change — sick leave, service additions, cancellations — SognosRoster reoptimises the affected day in minutes and notifies the right workers automatically. No phone cascade.",
    capabilities: [
      "One-click replacement worker suggestions ranked by proximity and skills",
      "Automated worker and client notifications on schedule changes",
      "Disruption impact summary showing affected services and coverage gaps",
      "Day-of adjustment audit log for compliance and dispute resolution",
    ],
    iconPath:
      "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: "mobile-app",
    name: "Mobile Worker App",
    tagline: "Field-ready, offline-capable",
    description:
      "Field workers see their schedule, accept shifts, check in on arrival, record service notes, and capture signatures — entirely from their phone. No paper, no manual entry, no separate login.",
    capabilities: [
      "Shift acceptance and full schedule view for workers",
      "GPS-verified check-in and check-out per service visit",
      "In-app progress notes and incident capture",
      "Offline mode for areas with poor connectivity",
    ],
    iconPath:
      "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    id: "copilot",
    name: "Copilot AI Optimisation",
    tagline: "AI where operations happen",
    description:
      "AI surfaces scheduling inefficiencies, predicts demand gaps, and recommends workforce actions — embedded directly in the Dynamics 365 environment. No new tool to log into.",
    capabilities: [
      "Demand gap prediction based on historical service patterns",
      "AI-suggested scheduling improvements surfaced in the roster view",
      "Natural language queries across workforce and schedule data",
      "Anomaly detection for coverage risks and compliance gaps",
    ],
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
  },
] as const;

// ─── Feature visuals ──────────────────────────────────────────────────────────

function FeatureVisual({ id }: { id: string }) {
  const visuals: Record<string, React.ReactNode> = {
    "scheduling": (
      <div className="space-y-2">
        {[
          { worker: "Sarah K.", service: "Support visit", time: "08:00", status: "Confirmed" },
          { worker: "Marcus T.", service: "Allied health", time: "09:30", status: "Confirmed" },
          { worker: "Priya M.", service: "Transport", time: "10:15", status: "Confirmed" },
          { worker: "James O.", service: "Community access", time: "13:00", status: "Pending" },
          { worker: "Emma R.", service: "Support visit", time: "14:30", status: "Confirmed" },
        ].map((row) => (
          <div
            key={row.worker}
            className="flex items-center gap-3 rounded-lg border border-(--sognos-card-border) bg-white px-4 py-3"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-(--color-cornflower-ocean-100) text-xs font-semibold text-brand">
              {row.worker.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-sognos-text-heading">
                {row.worker}
              </p>
              <p className="truncate text-[11px] text-sognos-text-muted">{row.service}</p>
            </div>
            <span className="shrink-0 text-xs text-sognos-text-muted">{row.time}</span>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                row.status === "Confirmed"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>
    ),
    "skills-matching": (
      <div className="space-y-2">
        {[
          { label: "First Aid Certificate", status: "Valid", expiry: "Jun 2026" },
          { label: "NDIS Worker Screening", status: "Valid", expiry: "Mar 2027" },
          { label: "Manual Handling", status: "Valid", expiry: "Dec 2025" },
          { label: "Medication Administration", status: "Expiring", expiry: "May 2025" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg border border-(--sognos-card-border) bg-white px-4 py-3"
          >
            <span className="text-xs font-medium text-sognos-text-heading">{item.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-sognos-text-muted">{item.expiry}</span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                  item.status === "Valid"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    ),
    "route-optimisation": (
      <div className="space-y-3">
        <div className="rounded-xl border border-(--sognos-card-border) bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold text-sognos-text-muted uppercase tracking-widest">
              Today&apos;s routes
            </p>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
              Optimised
            </span>
          </div>
          {[
            { worker: "Sarah K.", stops: 4, travel: "38 min", saved: "22 min" },
            { worker: "Marcus T.", stops: 3, travel: "25 min", saved: "14 min" },
            { worker: "James O.", stops: 5, travel: "52 min", saved: "31 min" },
          ].map((row) => (
            <div
              key={row.worker}
              className="flex items-center gap-3 border-t border-(--sognos-card-border) py-2.5 first:border-0"
            >
              <span className="w-20 text-xs font-medium text-sognos-text-heading truncate">
                {row.worker}
              </span>
              <span className="text-xs text-sognos-text-muted">{row.stops} stops</span>
              <span className="ml-auto text-xs text-sognos-text-muted">{row.travel}</span>
              <span className="text-xs font-semibold text-emerald-600">−{row.saved}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    "real-time-adjustments": (
      <div className="space-y-2">
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-xs font-semibold text-amber-800">Disruption detected</p>
          <p className="mt-0.5 text-[11px] text-amber-700">
            Sarah K. — sick leave. 3 services affected.
          </p>
        </div>
        {[
          { worker: "Emma R.", match: "98%", travel: "+12 min", action: "Assign" },
          { worker: "Priya M.", match: "91%", travel: "+18 min", action: "Assign" },
          { worker: "James O.", match: "84%", travel: "+25 min", action: "Assign" },
        ].map((row) => (
          <div
            key={row.worker}
            className="flex items-center gap-3 rounded-lg border border-(--sognos-card-border) bg-white px-4 py-3"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-(--color-cornflower-ocean-100) text-xs font-semibold text-brand">
              {row.worker.charAt(0)}
            </div>
            <span className="flex-1 text-xs font-medium text-sognos-text-heading">
              {row.worker}
            </span>
            <span className="text-xs font-semibold text-(--sognos-edition-green)">
              {row.match}
            </span>
            <span className="text-[11px] text-sognos-text-muted">{row.travel}</span>
            <button className="rounded-md bg-brand px-2.5 py-1 text-[10px] font-semibold text-white">
              {row.action}
            </button>
          </div>
        ))}
      </div>
    ),
    "mobile-app": (
      <div className="mx-auto w-48 overflow-hidden rounded-2xl border border-(--sognos-card-border) bg-white shadow-sm">
        <div className="bg-brand px-4 py-3">
          <p className="text-xs font-semibold text-white">Today — 4 visits</p>
          <p className="text-[10px] text-white/60">Sarah K.</p>
        </div>
        <div className="divide-y divide-(--sognos-card-border)">
          {[
            { time: "08:00", name: "R. Thompson", type: "Support" },
            { time: "10:30", name: "M. Chen", type: "Transport" },
            { time: "13:00", name: "P. Davis", type: "Community" },
            { time: "15:30", name: "A. Wilson", type: "Support" },
          ].map((v) => (
            <div key={v.time} className="flex items-center gap-3 px-3 py-2.5">
              <span className="shrink-0 text-[10px] font-medium text-sognos-text-muted">
                {v.time}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-sognos-text-heading">
                  {v.name}
                </p>
                <p className="text-[10px] text-sognos-text-muted">{v.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    "copilot": (
      <div className="space-y-3">
        <div className="rounded-xl border border-(--sognos-card-border) bg-white p-4">
          <p className="mb-2 text-xs font-semibold text-sognos-text-muted">
            Copilot insight — Thursday roster
          </p>
          <p className="text-sm leading-relaxed text-sognos-text-body">
            3 workers are scheduled within 500m of each other between 10am–12pm.
            Reassigning one visit to reduce travel overlap could save 45 minutes
            of total drive time.
          </p>
          <div className="mt-3 flex gap-2">
            <button className="rounded-md bg-brand px-3 py-1 text-xs font-semibold text-white">
              Apply suggestion
            </button>
            <button className="rounded-md border border-(--sognos-card-border) px-3 py-1 text-xs font-semibold text-sognos-text-muted">
              Dismiss
            </button>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="rounded-2xl border border-(--sognos-card-border) bg-(--sognos-bg-sunken) p-6">
      {visuals[id] ?? null}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SognoscareRosterFeatures() {
  const [activeId, setActiveId] = useState<string>(FEATURES[0].id);
  const active = FEATURES.find((f) => f.id === activeId) ?? FEATURES[0];

  return (
    <section id="features" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <h2 className="mb-4 font-heading text-4xl font-normal text-sognos-text-heading">
            Built for the full scheduling lifecycle
          </h2>
          <p className="text-lg text-sognos-text-body">
            From initial roster generation through to real-time disruptions and
            field execution — SognosRoster handles the full operational loop.
          </p>
        </div>

        {/* Mobile: horizontal tab scroll */}
        <div className="mb-8 -mx-6 flex gap-1 overflow-x-auto px-6 pb-2 lg:hidden">
          {FEATURES.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveId(f.id)}
              className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                activeId === f.id
                  ? "bg-brand text-white"
                  : "bg-(--sognos-bg-sunken) text-sognos-text-body hover:text-sognos-text-heading"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        {/* Desktop: sticky nav + content */}
        <div className="flex gap-16">
          {/* Left nav — sticky */}
          <nav className="hidden lg:flex lg:w-56 lg:shrink-0 lg:flex-col lg:gap-1 self-start sticky top-[160px]">
            {FEATURES.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveId(f.id)}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                  activeId === f.id
                    ? "bg-(--sognos-bg-sunken) font-semibold text-brand"
                    : "font-medium text-sognos-text-body hover:bg-(--sognos-bg-sunken) hover:text-sognos-text-heading"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200 ${
                    activeId === f.id ? "bg-brand" : "bg-(--sognos-card-border)"
                  }`}
                />
                {f.name}
              </button>
            ))}
          </nav>

          {/* Right content */}
          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
                  {/* Detail */}
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand">
                      {active.tagline}
                    </p>
                    <h3 className="mb-4 font-heading text-3xl font-normal text-sognos-text-heading">
                      {active.name}
                    </h3>
                    <p className="mb-8 text-base leading-relaxed text-sognos-text-body">
                      {active.description}
                    </p>

                    <ul className="space-y-3">
                      {active.capabilities.map((cap) => (
                        <li key={cap} className="flex items-start gap-3">
                          <svg
                            className="mt-0.5 h-4 w-4 shrink-0 text-(--sognos-edition-green)"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-sm leading-relaxed text-sognos-text-body">
                            {cap}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual mock */}
                  <div className="hidden lg:block">
                    <FeatureVisual id={active.id} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
