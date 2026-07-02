import FeaturePlaceholderImage from "@/components/sections/FeaturePlaceholderImage";
import ProductFeaturesScroll, {
  type ScrollFeature,
} from "@/components/sections/ProductFeaturesScroll";

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
  const scrollFeatures: ScrollFeature[] = features.map((f, i) => ({
    id: f.id,
    name: f.name,
    tagline: f.tagline,
    description: f.description,
    capabilities: [...f.capabilities],
    visual: <FeaturePlaceholderImage index={i} />,
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
