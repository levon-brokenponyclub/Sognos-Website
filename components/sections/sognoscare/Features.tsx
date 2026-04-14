"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FEATURES = [
  {
    id: "case-management",
    name: "Case Management",
    tagline: "Full lifecycle, one place",
    description:
      "Manage every stage of a participant's journey — from initial referral and intake through assessment, goal setting, service delivery, review, and case closure. Every touchpoint recorded, every team member aligned.",
    capabilities: [
      "Intake forms and referral management with configurable fields per edition",
      "Goal tracking linked to funding streams and care plans",
      "Progress notes with structured templates and mandatory fields",
      "Multi-disciplinary team access with role-based visibility controls",
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
      "Scheduled vs actual service comparison with automated alerts",
      "Mobile-first visit recording for field workers",
      "Participant-level service budget tracking per funding stream",
      "Service variance reports for quality and compliance review",
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
      "Immutable audit log across all case activity and document changes",
      "NDIS, Aged Care Quality Standards, and Support at Home rule enforcement",
      "Incident management with mandatory reporting workflows",
      "Compliance gap detection with automated escalation",
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
      "Pre-built report templates for NDIS, Aged Care, and Home Care funding bodies",
      "Operational dashboards for coordinators, managers, and executives",
      "Participant outcome reporting linked to goal progress",
      "Scheduled automated report delivery to internal and external stakeholders",
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
      "Copilot-assisted progress note drafting from structured prompts",
      "Anomaly detection on service delivery patterns and compliance gaps",
      "Predictive alerts for at-risk participants based on care history",
      "Natural language queries across case records and reports",
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
      "Approval workflows for care plan changes, incident escalations, and budget overruns",
      "Automated notifications to staff, participants, and guardians",
      "Integration with Microsoft Teams for in-platform coordination",
      "Custom form logic and conditional field validation",
    ],
    iconPath:
      "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
] as const;

// ─── Visual mock for active feature ──────────────────────────────────────────

function FeatureVisual({ id }: { id: string }) {
  const visuals: Record<string, React.ReactNode> = {
    "case-management": (
      <div className="space-y-2">
        {["Referral", "Assessment", "Active", "Review", "Closed"].map(
          (stage, i) => (
            <div
              key={stage}
              className="flex items-center gap-3 rounded-lg border border-(--sognos-card-border) bg-white px-4 py-3"
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  i < 3
                    ? "bg-(--sognos-edition-green)"
                    : i === 3
                      ? "bg-amber-400"
                      : "bg-(--sognos-card-border)"
                }`}
              />
              <span className="text-sm font-medium text-sognos-text-heading">
                {stage}
              </span>
              {i < 3 && (
                <span className="ml-auto text-xs text-sognos-text-muted">
                  Complete
                </span>
              )}
              {i === 3 && (
                <span className="ml-auto text-xs font-semibold text-amber-500">
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
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold text-sognos-text-muted">
          <span>Scheduled</span>
          <span>Delivered</span>
          <span>Variance</span>
        </div>
        {[
          { name: "Support visits", sched: 24, del: 23 },
          { name: "Allied health", sched: 8, del: 8 },
          { name: "Transport", sched: 12, del: 11 },
          { name: "Community access", sched: 6, del: 6 },
        ].map((row) => (
          <div
            key={row.name}
            className="grid grid-cols-3 items-center gap-2 rounded-lg border border-(--sognos-card-border) bg-white px-4 py-3 text-sm"
          >
            <span className="font-medium text-sognos-text-heading col-span-1 truncate text-xs">
              {row.name}
            </span>
            <span className="text-center text-sognos-text-body">{row.sched}</span>
            <span
              className={`text-center font-semibold ${
                row.del < row.sched
                  ? "text-amber-500"
                  : "text-(--sognos-edition-green)"
              }`}
            >
              {row.del < row.sched ? `−${row.sched - row.del}` : "✓"}
            </span>
          </div>
        ))}
      </div>
    ),
    "compliance": (
      <div className="space-y-2">
        {[
          { label: "NDIS Quality & Safeguards", status: "Compliant" },
          { label: "Aged Care Quality Standards", status: "Compliant" },
          { label: "Support at Home Program", status: "Compliant" },
          { label: "Incident reporting SLA", status: "1 pending" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg border border-(--sognos-card-border) bg-white px-4 py-3"
          >
            <span className="text-xs font-medium text-sognos-text-heading">
              {item.label}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                item.status === "Compliant"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    ),
    "reporting": (
      <div className="space-y-3">
        <div className="flex items-end gap-2 h-28">
          {[60, 80, 55, 90, 75, 95, 70].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end gap-1">
              <div
                className="rounded-sm bg-brand/20"
                style={{ height: `${h}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-lg border border-(--sognos-card-border) bg-white px-4 py-3">
          <span className="text-xs font-medium text-sognos-text-muted">
            Monthly NDIS report
          </span>
          <span className="text-xs font-semibold text-(--sognos-edition-green)">
            Ready to export
          </span>
        </div>
      </div>
    ),
    "copilot": (
      <div className="space-y-3">
        <div className="rounded-xl border border-(--sognos-card-border) bg-white p-4">
          <p className="mb-2 text-xs font-semibold text-sognos-text-muted">
            Copilot draft — progress note
          </p>
          <p className="text-sm leading-relaxed text-sognos-text-body">
            Participant attended support session on time. Goals reviewed — community
            access goal progressing well. Discussed transport support for upcoming
            medical appointment…
          </p>
          <div className="mt-3 flex gap-2">
            <button className="rounded-md bg-brand px-3 py-1 text-xs font-semibold text-white">
              Accept
            </button>
            <button className="rounded-md border border-(--sognos-card-border) px-3 py-1 text-xs font-semibold text-sognos-text-muted">
              Edit
            </button>
          </div>
        </div>
      </div>
    ),
    "automation": (
      <div className="space-y-2">
        {[
          { label: "Care plan change", trigger: "Approval required", status: "bg-amber-400" },
          { label: "Budget threshold", trigger: "Manager notified", status: "bg-blue-400" },
          { label: "Incident logged", trigger: "Escalation triggered", status: "bg-rose-400" },
          { label: "Visit missed", trigger: "Coordinator alerted", status: "bg-violet-400" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-lg border border-(--sognos-card-border) bg-white px-4 py-3"
          >
            <div className={`h-2 w-2 rounded-full shrink-0 ${item.status}`} />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-sognos-text-heading truncate">
                {item.label}
              </p>
              <p className="text-[11px] text-sognos-text-muted">{item.trigger}</p>
            </div>
          </div>
        ))}
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

export default function SognoscareFeatures() {
  const [activeId, setActiveId] = useState<string>(FEATURES[0].id);
  const active = FEATURES.find((f) => f.id === activeId) ?? FEATURES[0];

  return (
    <section id="features" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <h2 className="mb-4 font-heading text-4xl font-normal text-sognos-text-heading">
            Everything a care operation needs
          </h2>
          <p className="text-lg text-sognos-text-body">
            SognosCare brings the full operational stack into one platform — case
            management, compliance, reporting, and AI assistance.
          </p>
        </div>

        {/* Mobile: horizontal tab scroll */}
        <div className="mb-8 -mx-6 flex gap-1 overflow-x-auto px-6 pb-2 lg:hidden">
          {FEATURES.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveId(f.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
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
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
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
