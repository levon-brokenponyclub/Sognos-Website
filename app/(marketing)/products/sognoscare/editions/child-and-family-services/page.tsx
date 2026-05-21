import type { Metadata } from "next";
import EditionPageTemplate, {
  type EditionData,
} from "@/components/sections/sognoscare/EditionPageTemplate";

export const metadata: Metadata = {
  title: "SognosCare for Child & Family Services | Sognos",
  description:
    "Manage casework, family relationships, referrals, safety planning, and frontline service delivery with a connected platform built for child and family services.",
};

const data: EditionData = {
  name: "Child & Family Services",
  tagline: "Connected care for vulnerable children and families.",
  description:
    "Manage casework, family relationships, referrals, safety planning, and frontline service delivery with a connected platform built for child and family services.",
  gradient: "/images/sognoscare/gradient-1.png",
  accentHex: "#F59E3B",
  accentTextClass: "text-[#F59E3B]",
  accentBgClass: "bg-[#F59E3B]",
  accentBorderClass: "border-[#F59E3B]",
  problems: [
    {
      label: "Disconnected family and case records",
      description:
        "Child, family, placement, and case information is often spread across multiple systems, documents, and teams.",
    },
    {
      label: "Limited visibility of family relationships and risks",
      description:
        "Understanding complex family structures, relationships, risks, and support networks is difficult without connected relationship mapping.",
    },
    {
      label: "Manual case management processes",
      description:
        "Case notes, referrals, assessments, and approvals are often managed manually, creating delays and administrative burden.",
    },
    {
      label: "Fragmented communication across services",
      description:
        "Case workers, carers, families, and partner agencies use disconnected channels, making coordinated service delivery difficult.",
    },
    {
      label: "Paper-based field documentation",
      description:
        "Frontline workers complete notes and assessments in the field that may be delayed, incomplete, or duplicated later.",
    },
    {
      label: "Difficulty demonstrating compliance and outcomes",
      description:
        "Tracking interventions, safety plans, visits, and case activity across long-running family engagements is difficult without structured records.",
    },
  ],
  features: [
    {
      title: "Core Features",
      description:
        "Everything child and family service providers need to manage cases, family relationships, frontline teams, and compliance obligations.",
    },
    {
      title: "Family Relationship Mapping",
      description:
        "Built around SognosGenogram, visualise complex family structures, kinship relationships, carers, guardians, and support networks from a connected family record.",
    },
    {
      title: "Case Management & Service Coordination",
      description:
        "Manage referrals, assessments, case plans, interventions, appointments, visits, and ongoing family support activities within a single system.",
    },
    {
      title: "Mobile Frontline Workflows",
      description:
        "Enable case workers and frontline teams to securely access case records, complete notes, update assessments, and manage visits from the field.",
    },
    {
      title: "Safety Plans & Risk Tracking",
      description:
        "Track safety concerns, incidents, wellbeing risks, case escalations, and intervention activities with structured workflows and visibility across teams.",
    },
    {
      title: "Compliance & Reporting",
      description:
        "Support audit readiness with configurable workflows, activity tracking, digital records, approvals, and reporting across child and family programs.",
    },
    {
      title: "Connected Communication & Collaboration",
      description:
        "Provide shared visibility across case workers, carers, families, and partner organisations to improve coordination and continuity of care.",
    },
  ],
  advantages: [
    "Built around SognosGenogram for connected family visibility",
    "Maps complex family, kinship, and care relationships visually",
    "Mobile-first for frontline workers managing cases in the field",
    "Tracks safety plans, risks, and interventions in real time",
    "Reduces administrative burden across long-running casework",
    "Supports connected service delivery across teams and agencies",
    "Structured case records improve compliance and reporting",
    "Shared visibility across families, carers, and frontline teams",
  ],
  aiTools: [
    "AI-assisted case note drafting and assessment summaries",
    "Smart risk flagging across safety plans and escalation activity",
    "Automated reporting across child and family program outcomes",
  ],
  proofQuotes: [
    {
      quote:
        "We finally have one system for case management, family relationships, and frontline documentation.",
      attribution: "Operations Lead, Child & Family Services Provider",
    },
    {
      quote:
        "Our teams can see the full family picture — relationships, risks, and case history — without chasing records across systems.",
      attribution: "Service Manager, Child & Family Services Program",
    },
  ],
  caseStudy: {
    eyebrow: "Customer Story",
    title:
      "How child and family service providers improve case coordination and family visibility",
    description:
      "See how a child and family services provider can unify case management, family relationship mapping, and frontline documentation in one connected operational platform.",
    href: "/contact",
    company: "Child & Family Services Provider",
    companySize: "Multi-team",
    industry: "Health & Social Care",
    quote:
      "Connected family records and structured case tracking make it much easier to coordinate care and demonstrate compliance across long-running engagements.",
    author: "Program Director",
    role: "Child & Family Services",
  },
};

export default function ChildAndFamilyServicesPage() {
  return <EditionPageTemplate data={data} />;
}
