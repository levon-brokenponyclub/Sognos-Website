"use client";

import Lottie from "lottie-react";
import { useReducedMotion } from "framer-motion";
import ProductFeaturesScroll, {
  type ScrollFeature,
} from "@/components/sections/ProductFeaturesScroll";
import saasDataSourcesAnimation from "@/lib/lotties/saas-data-sources.json";

// ─── Feature visuals ──────────────────────────────────────────────────────────

function FeatureLottie({
  animationData,
  className = "",
}: {
  animationData: object;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className={`flex h-full w-full items-center justify-center ${className}`}>
      <div className="aspect-[1024/450] w-full max-w-[560px] overflow-hidden">
        <Lottie
          animationData={animationData}
          loop={!prefersReducedMotion}
          autoplay={!prefersReducedMotion}
          className="h-full w-full"
          rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
        />
      </div>
    </div>
  );
}

function FeatureVisual({ id }: { id: string }) {
  const visuals: Record<string, React.ReactNode> = {
    "case-management": (
      <div className="space-y-3">
        {["Referral", "Assessment", "Active", "Review", "Closed"].map(
          (stage, i) => (
            <div
              key={stage}
              className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white px-4 py-3.5"
            >
              <div
                className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                  i < 3
                    ? "bg-[#10B981]"
                    : i === 3
                      ? "bg-amber-400"
                      : "bg-gray-200"
                }`}
              />
              <span className="text-sm font-semibold text-sognos-body">
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
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold text-gray-400 uppercase tracking-widest pb-2 border-b border-gray-100">
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
            className="grid grid-cols-3 items-center gap-2 rounded-lg border border-gray-100 bg-white px-4 py-3.5 text-sm"
          >
            <span className="font-semibold text-sognos-body col-span-1 border-r border-gray-100 pr-2">
              {row.name}
            </span>
            <span className="text-center font-bold text-gray-700">
              {row.sched}
            </span>
            <span
              className={`text-center font-bold ${
                row.del < row.sched ? "text-amber-500" : "text-[#10B981]"
              }`}
            >
              {row.del < row.sched ? `${row.del}` : `${row.del} ✓`}
            </span>
          </div>
        ))}
      </div>
    ),
    compliance: (
      <div className="space-y-3">
        {[
          { label: "NDIS Quality & Safeguards", status: "Compliant" },
          { label: "Aged Care Quality Standards", status: "Compliant" },
          { label: "Support at Home Program", status: "Compliant" },
          { label: "Incident reporting SLA", status: "1 pending" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-3.5"
          >
            <span className="text-sm font-semibold text-sognos-body">
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
    reporting: (
      <div className="space-y-4">
        <div className="flex items-end gap-2 h-36 bg-white p-4 rounded-lg border border-gray-100">
          {[60, 80, 55, 90, 75, 95, 70].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end h-full">
              <div
                className="rounded-sm bg-sognos-blue-accent/80"
                style={{ height: `${h}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-3.5">
          <span className="text-sm font-semibold text-gray-500">
            Monthly NDIS report
          </span>
          <span className="text-xs font-bold text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full uppercase tracking-wider">
            Ready to export
          </span>
        </div>
      </div>
    ),
    copilot: (
      <div className="rounded-lg border border-gray-100 bg-white p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-sognos-navy/20 px-3 py-1 text-xs font-medium text-sognos-body">
            <span className="w-1.5 h-1.5 bg-sognos-blue-accent rounded-full" />
            Copilot draft
          </div>
        </div>
        <p className="text-sm font-medium leading-relaxed text-sognos-body">
          Participant attended support session on time. Goals reviewed —
          community access goal progressing well. Discussed transport support
          for upcoming medical appointment.
        </p>
        <div className="mt-4 flex gap-2">
          <button className="rounded-md bg-sognos-blue-accent px-4 py-1.5 text-xs font-bold text-white">
            Accept draft
          </button>
          <button className="rounded-md border border-gray-200 px-4 py-1.5 text-xs font-bold text-gray-500">
            Edit
          </button>
        </div>
      </div>
    ),
    automation: (
      <div className="space-y-3">
        {[
          {
            label: "Care plan change",
            trigger: "Approval required",
            dot: "bg-amber-400",
          },
          {
            label: "Budget threshold",
            trigger: "Manager notified",
            dot: "bg-blue-400",
          },
          {
            label: "Incident logged",
            trigger: "Escalation triggered",
            dot: "bg-rose-400",
          },
          {
            label: "Visit missed",
            trigger: "Coordinator alerted",
            dot: "bg-indigo-400",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white px-4 py-3.5"
          >
            <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${item.dot}`} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-sognos-body truncate">
                {item.label}
              </p>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-0.5">
                {item.trigger}
              </p>
            </div>
          </div>
        ))}
      </div>
    ),
  };

  return visuals[id] ?? null;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

type FeatureItem = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  capabilities: readonly string[];
};

type SectionHeader = { eyebrow?: string; heading: string };

interface SognoscareFeaturesProps {
  header?: SectionHeader;
  features?: readonly FeatureItem[];
}

const DEFAULT_HEADER: SectionHeader = {
  eyebrow: "Features",
  heading: "Everything a care operation needs",
};

const DEFAULT_FEATURES = [
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
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function SognoscareFeatures({
  header = DEFAULT_HEADER,
  features = DEFAULT_FEATURES,
}: SognoscareFeaturesProps = {}) {
  const scrollFeatures: ScrollFeature[] = features.map((f) => ({
    id: f.id,
    name: f.name,
    tagline: f.tagline,
    description: f.description,
    capabilities: [...f.capabilities],
    visual:
      f.id === "case-management" ? (
        <FeatureLottie animationData={saasDataSourcesAnimation} />
      ) : (
        <FeatureVisual id={f.id} />
      ),
  }));

  return (
    <ProductFeaturesScroll
      header={header}
      features={scrollFeatures}
      accentBorderClass="border-sognos-blue-accent"
      accentTextClass="text-sognos-blue-accent"
      enableVisuals
    />
  );
}
