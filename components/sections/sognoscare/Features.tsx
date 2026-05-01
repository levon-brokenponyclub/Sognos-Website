"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const FEATURES = [
  {
    id: "case-management",
    name: "Case Management",
    tagline: "Full lifecycle, one place",
    description:
      "Manage every stage of a participant's journey — from initial referral and intake through assessment, goal setting, service delivery, review, and case closure. Every touchpoint recorded, every team member aligned.",
    capabilities: [
      "Intake forms and referral management",
      "Goal tracking linked to funding streams",
      "Progress notes with structured templates",
      "Multi-disciplinary team access",
    ],
    iconPath:
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    id: "service-delivery",
    name: "Service Delivery Tracking",
    tagline: "Real-time visibility",
    description:
      "Know exactly what services were scheduled, what was delivered, and what was missed — in real time. Field workers record visits on mobile, coordinators see variance instantly, and nothing falls through the gaps.",
    capabilities: [
      "Scheduled vs actual service comparison",
      "Mobile-first visit recording",
      "Participant-level service budget tracking",
      "Service variance reports",
    ],
    iconPath:
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    id: "compliance",
    name: "Compliance & Audit Trail",
    tagline: "Audit-ready by default",
    description:
      "Every action timestamped. Every document versioned. Every funding rule enforced at the point of care, not retrospectively. SognosCare treats compliance as infrastructure — not a reporting exercise.",
    capabilities: [
      "Immutable audit log across all case activity",
      "Support at Home rule enforcement",
      "Incident management reporting workflows",
      "Compliance gap detection",
    ],
    iconPath:
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    id: "reporting",
    name: "Reporting & Analytics",
    tagline: "Generated, not assembled",
    description:
      "Funding-body reports, operational dashboards, and participant outcome summaries generated automatically from live data. No more month-end spreadsheet marathons.",
    capabilities: [
      "Pre-built report templates",
      "Operational dashboards for managers",
      "Participant outcome reporting",
      "Scheduled automated report delivery",
    ],
    iconPath:
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    id: "copilot",
    name: "Microsoft Copilot AI",
    tagline: "AI where staff already work",
    description:
      "AI-assisted documentation, anomaly detection, and operational insights — surfaced inside Dynamics 365, not in a separate tool. Staff don't change their workflow to access AI.",
    capabilities: [
      "Copilot-assisted progress note drafting",
      "Anomaly detection on service delivery",
      "Predictive alerts for at-risk participants",
      "Natural language queries",
    ],
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    id: "automation",
    name: "Power Platform Automation",
    tagline: "Workflows your way",
    description:
      "Configurable low-code automation for approvals, escalations, and notifications — built to match your organisation's specific processes without requiring a developer.",
    capabilities: [
      "Approval workflows for care plan changes",
      "Automated notifications to staff",
      "Integration with Microsoft Teams",
      "Custom form logic",
    ],
    iconPath:
      "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
] as const;

// ─── Visual mock for active feature ──────────────────────────────────────────

function FeatureVisual({ id }: { id: string }) {
  const visuals: Record<string, React.ReactNode> = {
    "case-management": (
      <div className="space-y-4">
        {["Referral", "Assessment", "Active", "Review", "Closed"].map(
          (stage, i) => (
            <div
              key={stage}
              className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white px-4 py-4 shadow-sm"
            >
              <div
                className={`h-2.5 w-2.5 rounded-full ${
                  i < 3
                    ? "bg-[#10B981]"
                    : i === 3
                      ? "bg-amber-400"
                      : "bg-gray-200"
                }`}
              />
              <span className="text-sm font-semibold text-prussian-blue-800">
                {stage}
              </span>
              {i < 3 && (
                <span className="ml-auto text-xs font-bold text-[#10B981]">
                  Complete
                </span>
              )}
              {i === 3 && (
                <span className="ml-auto text-xs font-bold text-amber-500">
                  In progress
                </span>
              )}
            </div>
          ),
        )}
      </div>
    ),
    "service-delivery": (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold text-gray-500 uppercase tracking-widest pb-2 border-b border-gray-200">
          <span className="text-left">Service</span>
          <span>Scheduled</span>
          <span>Delivered</span>
        </div>
        {[
          { name: "Support visits", sched: 24, del: 23 },
          { name: "Allied health", sched: 8, del: 8 },
          { name: "Transport", sched: 12, del: 11 },
          { name: "Community access", sched: 6, del: 6 },
        ].map((row) => (
          <div
            key={row.name}
            className="grid grid-cols-3 items-center gap-2 rounded-lg border border-gray-100 bg-white px-4 py-4 text-sm shadow-sm"
          >
            <span className="font-semibold text-prussian-blue-800 col-span-1 border-r border-gray-100 pr-2">
              {row.name}
            </span>
            <span className="text-center font-bold text-gray-700">{row.sched}</span>
            <span
              className={`text-center font-bold ${
                row.del < row.sched
                  ? "text-amber-500"
                  : "text-[#10B981]"
              }`}
            >
              {row.del < row.sched ? `${row.del}` : `${row.del} ✓`}
            </span>
          </div>
        ))}
      </div>
    ),
    "compliance": (
      <div className="space-y-3">
        {[
          { label: "NDIS Quality & Safeguards", status: "Compliant" },
          { label: "Aged Care Quality Standards", status: "Compliant" },
          { label: "Support at Home Program", status: "Compliant" },
          { label: "Incident reporting SLA", status: "1 pending" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-4 shadow-sm"
          >
            <span className="text-sm font-semibold text-prussian-blue-800">
              {item.label}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                item.status === "Compliant"
                  ? "bg-[#10B981]/10 text-[#10B981]"
                  : "bg-amber-500/10 text-amber-600"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    ),
    "reporting": (
      <div className="space-y-4">
        <div className="flex items-end gap-2 h-36 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          {[60, 80, 55, 90, 75, 95, 70].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end gap-1 h-full">
              <div
                className="rounded-sm bg-[#1D96FC] hover:bg-prussian-blue-800 transition-colors cursor-pointer"
                style={{ height: `${h}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-4 shadow-sm">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
            Monthly NDIS report
          </span>
          <span className="text-xs font-bold text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full uppercase tracking-wider">
            Ready to export
          </span>
        </div>
      </div>
    ),
    "copilot": (
      <div className="space-y-3">
        <div className="rounded-xl border border-[#1D96FC]/20 bg-gradient-to-br from-[#F0F9FF] to-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-[#1D96FC]" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <p className="text-xs font-bold uppercase tracking-widest text-[#1D96FC]">
              Copilot draft
            </p>
          </div>
          <p className="text-[15px] font-medium leading-relaxed text-prussian-blue-800">
            Participant attended support session on time. Goals reviewed — community
            access goal progressing well. Discussed transport support for upcoming
            medical appointment.
          </p>
          <div className="mt-5 flex gap-3">
            <button className="rounded-md bg-[#1D96FC] px-4 py-2 text-xs font-bold text-white hover:bg-prussian-blue-800 transition-colors">
              Accept draft
            </button>
            <button className="rounded-md border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-600 hover:text-prussian-blue-800 transition-colors">
              Edit
            </button>
          </div>
        </div>
      </div>
    ),
    "automation": (
      <div className="space-y-3">
        {[
          { label: "Care plan change", trigger: "Approval required", status: "bg-amber-400" },
          { label: "Budget threshold", trigger: "Manager notified", status: "bg-blue-400" },
          { label: "Incident logged", trigger: "Escalation triggered", status: "bg-rose-400" },
          { label: "Visit missed", trigger: "Coordinator alerted", status: "bg-indigo-400" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white px-4 py-4 shadow-sm"
          >
            <div className={`h-3 w-3 rounded-full shrink-0 ${item.status} shadow-sm`} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-prussian-blue-800 truncate">
                {item.label}
              </p>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1">{item.trigger}</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gray-300">
              <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ))}
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

export default function SognoscareFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = FEATURES[activeIndex];

  return (
    <section id="features" className="w-full bg-[#1D96FC] bg-gradient-hero border-b border-sognos-border-subtle overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-6 py-24">
        {/* Header */}
        <div className="grid grid-cols-1 gap-2 lg:gap-5 items-end pb-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-white/30 text-white font-medium">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Everything a care operation needs
          </div>
          <h2 className="text-3xl md:text-5xl text-white font-heading font-semibold tracking-tight my-2">
            Features built for <span className="text-[#84C8FF]">care</span>.
          </h2>
          <p className="text-lg text-white/80 max-w-2xl">
            SognosCare brings the full operational stack into one platform — case
            management, compliance, reporting, and AI assistance.
          </p>
        </div>

        {/* Mobile — stacked cards */}
        <div className="lg:hidden mt-10 flex flex-col gap-6">
          {FEATURES.map((feat) => (
            <div
              key={feat.id}
              className="bg-white rounded-2xl p-2 flex flex-col gap-3 shadow-xl"
            >
              <div className="bg-[#F8FAFC] rounded-xl p-6 min-h-[220px] flex items-center justify-center border border-gray-100">
                <FeatureVisual id={feat.id} />
              </div>
              <div className="p-5 flex flex-col gap-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1D96FC]">
                  {feat.tagline}
                </p>
                <h3 className="font-heading text-2xl font-bold text-prussian-blue-800 tracking-tight">
                  {feat.name}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {feat.description}
                </p>
                <ul className="space-y-3 mt-2 border-t border-gray-100 pt-5">
                  {feat.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">
                        {cap}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop — vertical tabs | animated panel */}
        <div className="hidden lg:flex gap-4 min-h-[560px] mt-10">
          {/* Left column — vertical tab list */}
          <div className="w-[360px] shrink-0 flex flex-col justify-center">
            {FEATURES.map((feat, i) => (
              <button
                key={feat.id}
                onClick={() => setActiveIndex(i)}
                className={`w-full text-left py-4 px-5 font-heading text-[22px] font-medium tracking-tight transition-all cursor-pointer group flex items-center gap-4 ${
                  i === activeIndex
                    ? "text-white border-l-4 border-l-white bg-white/10"
                    : "text-white/60 border-l-4 border-l-transparent hover:text-white hover:bg-white/5"
                }`}
              >
                <span className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors ${
                  i === activeIndex ? 'bg-white text-[#1D96FC]' : 'bg-white/10 text-white group-hover:bg-white/20'
                }`}>
                  {i + 1}
                </span>
                {feat.name}
              </button>
            ))}
          </div>

          {/* Right — animated panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex gap-4 flex-1 min-w-0 bg-white rounded-2xl p-2 shadow-2xl"
            >
              {/* Left column — grey info panel */}
              <div className="w-1/2 bg-[#F1F5F9] rounded-xl p-10 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1D96FC] mb-4">
                    {active.tagline}
                  </p>
                  <h3 className="font-heading text-3xl font-bold text-prussian-blue-800 tracking-tight leading-tight mb-5">
                    {active.name}
                  </h3>
                  <p className="text-[15px] font-medium text-gray-600 leading-relaxed">
                    {active.description}
                  </p>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-200/60">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Key Capabilities</p>
                  <ul className="space-y-4">
                    {active.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-3">
                        <svg
                          className="mt-[3px] h-4 w-4 shrink-0 text-[#1D96FC]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-semibold text-prussian-blue-800">
                          {cap}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right column — visual mock */}
              <div className="w-1/2 rounded-xl border border-gray-100 bg-[#F8FAFC] flex items-center justify-center p-12 overflow-hidden shadow-inner">
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
