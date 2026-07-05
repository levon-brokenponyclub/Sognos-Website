import FeaturePlaceholderImage from "@/components/layout/sections/FeaturePlaceholderImage";
import ProductFeaturesScroll, {
  type ScrollFeature,
} from "@/components/layout/sections/ProductFeaturesScroll";

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
  const scrollFeatures: ScrollFeature[] = FEATURES.map((f, i) => ({
    id: f.id,
    name: f.name,
    tagline: f.tagline,
    description: f.description,
    capabilities: [...f.capabilities],
    visual: <FeaturePlaceholderImage index={i} />,
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
      enableVisuals
    />
  );
}
