import type { Metadata } from "next";
import EditionPageTemplate, {
  type EditionData,
} from "@/components/sections/sognoscare/EditionPageTemplate";

export const metadata: Metadata = {
  title: "SognosCare for Residential Aged Care | Sognos",
  description:
    "From care planning and progress documentation to staff coordination and resident outcome reporting — built for residential providers who need to demonstrate quality against the Aged Care Quality Standards.",
};

const data: EditionData = {
  name: "Residential Aged Care",
  tagline: "Planning, documentation, and compliance.",
  description:
    "From care planning and progress documentation to staff coordination and resident outcome reporting — built for providers.",
  gradient: "/images/sognoscare/gradient-4.png",
  accentHex: "#a666ff",
  accentTextClass: "text-(--sognos-edition-purple)",
  accentBgClass: "bg-(--sognos-edition-purple)",
  accentBorderClass: "border-(--sognos-edition-purple)",
  problems: [
    {
      label: "Complex resident care planning",
      description:
        "Care plans are updated infrequently, stored across systems, and rarely reflect current resident needs.",
    },
    {
      label: "Manual clinical documentation burden",
      description:
        "Nursing staff spend excessive time on progress notes instead of resident-facing care.",
    },
    {
      label: "Aged Care Quality Standards compliance gaps",
      description:
        "Preparing for and responding to accreditation audits takes weeks of manual evidence gathering.",
    },
    {
      label: "Staff coordination across shifts",
      description:
        "Handovers are verbal or paper-based, leading to information loss and inconsistent care delivery.",
    },
    {
      label: "Poor reporting for AN-ACC funding",
      description:
        "Acuity data is not captured consistently, resulting in underclaiming and lost revenue.",
    },
    {
      label: "Limited family and resident visibility",
      description:
        "Families have no visibility of resident care, raising concerns and increasing administrative burden on staff.",
    },
  ],
  features: [
    {
      title: "Core Features",
      description:
        "Everything a residential aged care provider needs to manage residents, staff, and compliance.",
    },
    {
      title: "Resident Care Planning",
      description:
        "Structured, person-centred care plans linked to goals, preferences, and health history.",
    },
    {
      title: "Clinical Documentation & Progress Notes",
      description:
        "Discipline-specific note templates with AI assistance to reduce time-on-documentation for nursing staff.",
    },
    {
      title: "Staff Scheduling & Rostering",
      description:
        "Shift-based rostering with skills matching, ratio compliance, and real-time gap alerts.",
    },
    {
      title: "AN-ACC & Funding Management",
      description:
        "Capture acuity data consistently to support AN-ACC classification and maximise funding accuracy.",
    },
    {
      title: "Quality Standards Compliance",
      description:
        "Pre-built evidence frameworks mapped to all eight Aged Care Quality Standards for audit-ready reporting.",
    },
    {
      title: "Family & Resident Communication",
      description:
        "Secure portal for families to view care updates, scheduled activities, and resident wellbeing records.",
    },
  ],
  advantages: [
    "Pre-configured against all eight Aged Care Quality Standards",
    "Tracks AN-ACC acuity data to maximise funding accuracy",
    "Reduces documentation burden on nursing staff by up to 40%",
    "Real-time compliance dashboards for continuous quality monitoring",
    "Supports continuous improvement cycles with structured evidence capture",
    "Structured handover records to eliminate information loss across shifts",
    "Family and representative communication tools embedded",
    "Resident lifestyle and preference tracking for person-centred care",
  ],
  aiTools: [
    "Copilot-style clinical documentation and progress notes",
    "Predictive risk alerts for resident deterioration",
    "Automated quality indicator reporting for accreditation",
  ],
  proofQuotes: [
    {
      quote:
        "Our audit results have never been better — and we spend half the time preparing for them.",
      attribution: "Director of Nursing, Residential Aged Care Facility",
    },
    {
      quote:
        "We finally have a complete picture of every resident's care journey across every shift.",
      attribution: "Operations Director, Residential Aged Care Provider",
    },
  ],
  caseStudy: {
    eyebrow: "Customer Story",
    title:
      "How a Home Care Provider Prepared for Support at Home Reform with SognosCare",
    description:
      "Discover how a leading home care provider transitioned to the new Support at Home program without service disruption — using SognosCare to manage the change from day one.",
    href: "/customers",
    company: "Penrith City Council",
    companySize: "300+",
    industry: "Local Government",
    logo: "/logos/penrith-city-council-logo.png",
    panelImage: "",
    panelVideo:
      "https://www.shutterstock.com/shutterstock/videos/3849131045/preview/stock-footage-industrial-engineer-wearing-protective-safety-equipment-gesturing-and-instructing-near-machinery.webm",
    quote:
      "We've moved from reactive to proactive compliance. Every inspection now, the auditors comment on how thorough our records are. That wasn't possible before Sognos.",
    author: "Claire Donovan",
    role: "Service Delivery Manager, Penrith City Council",
  },
};

export default function ResidentialAgedCarePage() {
  return <EditionPageTemplate data={data} />;
}
