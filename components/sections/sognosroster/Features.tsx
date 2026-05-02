"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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
            className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white px-4 py-3"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-[#1D96FC]">
              {row.worker.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-prussian-blue-800">{row.worker}</p>
              <p className="truncate text-[11px] text-gray-400">{row.service}</p>
            </div>
            <span className="shrink-0 text-xs text-gray-400">{row.time}</span>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${row.status === "Confirmed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-600"}`}>
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
          <div key={item.label} className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-3">
            <span className="text-xs font-medium text-prussian-blue-800">{item.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400">{item.expiry}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${item.status === "Valid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    ),
    "route-optimisation": (
      <div className="space-y-3">
        <div className="rounded-lg border border-gray-100 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Today&apos;s routes</p>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">Optimised</span>
          </div>
          {[
            { worker: "Sarah K.", stops: 4, travel: "38 min", saved: "22 min" },
            { worker: "Marcus T.", stops: 3, travel: "25 min", saved: "14 min" },
            { worker: "James O.", stops: 5, travel: "52 min", saved: "31 min" },
          ].map((row) => (
            <div key={row.worker} className="flex items-center gap-3 border-t border-gray-100 py-2.5 first:border-0">
              <span className="w-20 text-xs font-medium text-prussian-blue-800 truncate">{row.worker}</span>
              <span className="text-xs text-gray-400">{row.stops} stops</span>
              <span className="ml-auto text-xs text-gray-400">{row.travel}</span>
              <span className="text-xs font-semibold text-emerald-600">−{row.saved}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    "real-time-adjustments": (
      <div className="space-y-2">
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-xs font-semibold text-amber-800">Disruption detected</p>
          <p className="mt-0.5 text-[11px] text-amber-700">Sarah K. — sick leave. 3 services affected.</p>
        </div>
        {[
          { worker: "Emma R.", match: "98%", travel: "+12 min", action: "Assign" },
          { worker: "Priya M.", match: "91%", travel: "+18 min", action: "Assign" },
          { worker: "James O.", match: "84%", travel: "+25 min", action: "Assign" },
        ].map((row) => (
          <div key={row.worker} className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white px-4 py-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-[#1D96FC]">
              {row.worker.charAt(0)}
            </div>
            <span className="flex-1 text-xs font-medium text-prussian-blue-800">{row.worker}</span>
            <span className="text-xs font-semibold text-emerald-600">{row.match}</span>
            <span className="text-[11px] text-gray-400">{row.travel}</span>
            <button className="rounded-md bg-[#1D96FC] px-2.5 py-1 text-[10px] font-semibold text-white">{row.action}</button>
          </div>
        ))}
      </div>
    ),
    "mobile-app": (
      <div className="mx-auto w-48 overflow-hidden rounded-lg border border-gray-100 bg-white">
        <div className="bg-[#1D96FC] px-4 py-3">
          <p className="text-xs font-semibold text-white">Today — 4 visits</p>
          <p className="text-[10px] text-white/60">Sarah K.</p>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { time: "08:00", name: "R. Thompson", type: "Support" },
            { time: "10:30", name: "M. Chen", type: "Transport" },
            { time: "13:00", name: "P. Davis", type: "Community" },
            { time: "15:30", name: "A. Wilson", type: "Support" },
          ].map((v) => (
            <div key={v.time} className="flex items-center gap-3 px-3 py-2.5">
              <span className="shrink-0 text-[10px] font-medium text-gray-400">{v.time}</span>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-prussian-blue-800">{v.name}</p>
                <p className="text-[10px] text-gray-400">{v.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    "copilot": (
      <div className="space-y-3">
        <div className="rounded-lg border border-gray-100 bg-white p-4">
          <p className="mb-2 text-xs font-semibold text-gray-400">Copilot insight — Thursday roster</p>
          <p className="text-sm leading-relaxed text-prussian-blue-800">
            3 workers are scheduled within 500m of each other between 10am–12pm. Reassigning one visit could save 45 minutes of total drive time.
          </p>
          <div className="mt-3 flex gap-2">
            <button className="rounded-md bg-[#1D96FC] px-3 py-1 text-xs font-semibold text-white">Apply suggestion</button>
            <button className="rounded-md border border-gray-100 px-3 py-1 text-xs font-semibold text-gray-400">Dismiss</button>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="w-full h-full flex flex-col justify-center">
      {visuals[id] ?? null}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SognoscareRosterFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = FEATURES[activeIndex];

  return (
    <section id="features" className="w-full bg-[#1D96FC] bg-gradient-hero border-b border-sognos-border-subtle overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6 py-16 lg:py-24">
        {/* Header */}
        <div className="grid grid-cols-1 gap-2 lg:gap-5 items-end pb-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-white/30 text-white font-medium">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Full scheduling lifecycle
          </div>
          <h2 className="text-3xl md:text-4xl text-white font-heading font-medium tracking-tight">
            Built for the full scheduling lifecycle
          </h2>
        </div>

        {/* Mobile — stacked cards */}
        <div className="lg:hidden mt-10">
          {FEATURES.map((feat) => (
            <div key={feat.id} className="mb-3 last:mb-0 bg-white rounded-lg p-2 flex flex-col gap-3">
              <div className="bg-gray-200 rounded-lg p-5 flex flex-col gap-4">
                <h3 className="font-heading text-[22px] font-medium text-prussian-blue-800 tracking-tight">{feat.name}</h3>
                <p className="font-heading text-base font-normal leading-relaxed text-sognos-text-body">{feat.description}</p>
                <ul className="space-y-2 mt-1">
                  {feat.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2.5 text-sm text-sognos-text-body">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-prussian-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden bg-gray-200/50 p-4 min-h-[200px] flex items-center justify-center">
                <FeatureVisual id={feat.id} />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop — vertical tabs | animated panel */}
        <div className="hidden lg:flex gap-4 h-[460px] mt-10">
          {/* Left column — vertical tab list */}
          <div className="w-[360px] shrink-0 flex flex-col justify-center">
            {FEATURES.map((feat, i) => (
              <button
                key={feat.id}
                onClick={() => setActiveIndex(i)}
                className={`w-full text-left py-3 px-5 font-heading text-xl font-medium tracking-tight transition-colors cursor-pointer ${
                  i === activeIndex
                    ? "text-white border-l-3 border-l-[#1D96FC]"
                    : "text-white/70 border-l-3 border-l-prussian-blue-900 hover:text-white"
                }`}
              >
                {feat.name}
              </button>
            ))}
          </div>

          {/* Center + right — animated panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-4 flex-1 min-w-0 bg-white rounded-lg p-2"
            >
              {/* Left — grey info panel */}
              <div className="shrink-0 w-[45%] bg-gray-200 rounded-lg p-7 flex flex-col justify-between">
                <div className="flex flex-col">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-prussian-blue-800/50 mb-3">{active.tagline}</p>
                  <h3 className="mt-1 mb-5 font-heading text-[22px] font-medium text-prussian-blue-800 tracking-tight">{active.name}</h3>
                  <p className="font-heading text-base font-normal leading-relaxed text-sognos-text-body">{active.description}</p>
                  <ul className="mt-6 space-y-2.5">
                    {active.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2.5 text-sm text-sognos-text-body">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-prussian-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-2.5 text-sm font-medium text-prussian-blue-800 hover:opacity-70 transition-opacity"
                >
                  Book a Demo
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-prussian-blue-900 text-white shrink-0">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </div>

              {/* Right — visual */}
              <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-200/40 flex items-center justify-center p-8">
                <div className="w-full max-w-sm">
                  <FeatureVisual id={active.id} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
