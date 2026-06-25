"use client";

import ProductFeaturesScroll, {
  type ScrollFeature,
} from "@/components/sections/ProductFeaturesScroll";

// ─── Feature visuals ──────────────────────────────────────────────────────────

function FeatureVisual({ id }: { id: string }) {
  const visuals: Record<string, React.ReactNode> = {
    scheduling: (
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
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-sognos-roster-base">
              {row.worker.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-sognos-body">
                {row.worker}
              </p>
              <p className="truncate text-[11px] text-gray-400">{row.service}</p>
            </div>
            <span className="shrink-0 text-xs text-gray-400">{row.time}</span>
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
            className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-3"
          >
            <span className="text-xs font-medium text-sognos-body">
              {item.label}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400">{item.expiry}</span>
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
      <div className="rounded-lg border border-gray-100 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Today's routes
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
            className="flex items-center gap-3 border-t border-gray-100 py-2.5 first:border-0"
          >
            <span className="w-20 text-xs font-medium text-sognos-body truncate">
              {row.worker}
            </span>
            <span className="text-xs text-gray-400">{row.stops} stops</span>
            <span className="ml-auto text-xs text-gray-400">{row.travel}</span>
            <span className="text-xs font-semibold text-emerald-600">
              −{row.saved}
            </span>
          </div>
        ))}
      </div>
    ),
    "real-time-adjustments": (
      <div className="space-y-2">
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-xs font-semibold text-amber-800">
            Disruption detected
          </p>
          <p className="mt-0.5 text-[11px] text-amber-700">
            Sarah K. — sick leave. 3 services affected.
          </p>
        </div>
        {[
          { worker: "Emma R.", match: "98%", travel: "+12 min" },
          { worker: "Priya M.", match: "91%", travel: "+18 min" },
          { worker: "James O.", match: "84%", travel: "+25 min" },
        ].map((row) => (
          <div
            key={row.worker}
            className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white px-4 py-3"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-sognos-roster-base">
              {row.worker.charAt(0)}
            </div>
            <span className="flex-1 text-xs font-medium text-sognos-body">
              {row.worker}
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              {row.match}
            </span>
            <span className="text-[11px] text-gray-400">{row.travel}</span>
            <button className="rounded-md bg-sognos-roster-base px-2.5 py-1 text-[10px] font-semibold text-white">
              Assign
            </button>
          </div>
        ))}
      </div>
    ),
    "mobile-app": (
      <div className="mx-auto w-52 overflow-hidden rounded-lg border border-gray-100 bg-white">
        <div className="bg-sognos-roster-base px-4 py-3">
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
              <span className="shrink-0 text-[10px] font-medium text-gray-400">
                {v.time}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-sognos-body">
                  {v.name}
                </p>
                <p className="text-[10px] text-gray-400">{v.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    copilot: (
      <div className="rounded-lg border border-gray-100 bg-white p-4">
        <p className="mb-2 text-xs font-semibold text-gray-400">
          Copilot insight — Thursday roster
        </p>
        <p className="text-sm leading-relaxed text-sognos-body">
          3 workers are scheduled within 500m of each other between 10am–12pm.
          Reassigning one visit could save 45 minutes of total drive time.
        </p>
        <div className="mt-3 flex gap-2">
          <button className="rounded-md bg-sognos-roster-base px-3 py-1 text-xs font-semibold text-white">
            Apply suggestion
          </button>
          <button className="rounded-md border border-gray-100 px-3 py-1 text-xs font-semibold text-gray-400">
            Dismiss
          </button>
        </div>
      </div>
    ),
  };

  return visuals[id] ?? null;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

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

// ─── Component ────────────────────────────────────────────────────────────────

export default function SognoscareRosterFeatures() {
  const scrollFeatures: ScrollFeature[] = FEATURES.map((f) => ({
    id: f.id,
    name: f.name,
    tagline: f.tagline,
    description: f.description,
    capabilities: [...f.capabilities],
    visual: <FeatureVisual id={f.id} />,
  }));

  return (
    <ProductFeaturesScroll
      header={{
        eyebrow: "Features",
        heading: "Built for the full scheduling lifecycle",
      }}
      features={scrollFeatures}
      accentBorderClass="border-sognos-roster-base"
      accentTextClass="text-sognos-roster-base"
    />
  );
}
