import type { Metadata } from "next";
import EditionPageTemplate, {
  type EditionData,
} from "@/components/sections/sognoscare/EditionPageTemplate";

export const metadata: Metadata = {
  title: "SognosCare for Hospital in the Home | Sognos",
  description:
    "Manage home-based treatment, mobile clinical teams, patient visits, and care documentation while maintaining visibility across Hospital in the Home delivery.",
};

const data: EditionData = {
  name: "Hospital in the Home",
  tagline: "Hospital-level care, delivered at home.",
  description:
    "Manage home-based treatment, mobile clinical teams, patient visits, and care documentation while maintaining visibility across Hospital in the Home delivery.",
  gradient: "/images/sognoscare/gradient-1.png",
  accentHex: "#BFD731",
  accentTextClass: "text-[#BFD731]",
  accentBgClass: "bg-[#BFD731]",
  accentBorderClass: "border-[#BFD731]",
  problems: [
    {
      label: "Manual clinical scheduling",
      description:
        "Coordinating nurses, clinicians, patient visits, travel, and availability is often managed across disconnected systems.",
    },
    {
      label: "Disconnected hospital-to-home care coordination",
      description:
        "Managing discharge pathways, home-based treatment plans, clinician schedules, and ongoing patient monitoring across teams creates operational gaps and delays.",
    },
    {
      label: "Fragmented patient communication",
      description:
        "Patients, carers, clinicians, and coordinators use different channels, making it difficult to maintain a unified care record.",
    },
    {
      label: "Limited visibility of patient care delivery",
      description:
        "Hospital and community teams lack real-time visibility of visit status, clinical updates, risks, and escalations.",
    },
    {
      label: "Paper-based clinical notes and reporting",
      description:
        "Clinicians complete notes in the field that may be entered later, creating delays, gaps, and incomplete records.",
    },
    {
      label: "Difficulty demonstrating safe care at home",
      description:
        "Proving care was delivered safely, on time, and in line with clinical governance requirements is difficult without structured records.",
    },
  ],
  features: [
    {
      title: "Core Features",
      description:
        "Everything a Hospital in the Home provider needs to coordinate home-based treatment, mobile clinicians, and patient care delivery.",
    },
    {
      title: "Hospital-to-Home Care Coordination",
      description:
        "Coordinate discharge pathways, home-based treatment plans, clinician schedules, and ongoing patient monitoring across hospital and community care teams from a single connected system.",
    },
    {
      title: "Clinical Scheduling & Rostering",
      description:
        "Match nurses and clinicians to patient visits based on availability, location, skills, and treatment requirements.",
    },
    {
      title: "Home-Based Clinical Care",
      description:
        "Track scheduled visits, treatments, observations, wound care, medication administration, and escalation activity delivered in the home.",
    },
    {
      title: "Mobile Clinical Documentation",
      description:
        "Mobile-first clinical notes for nurses and clinicians in the field, with structured records for reporting and review.",
    },
    {
      title: "Hospital in the Home Compliance",
      description:
        "Pre-configured workflows to support clinical governance, audit readiness, incident management, and reporting requirements.",
    },
    {
      title: "Care Team Communication",
      description:
        "Provide patients, carers, hospital teams, and community clinicians with shared visibility of schedules, updates, and care activity.",
    },
  ],
  advantages: [
    "Pre-configured for Hospital in the Home care delivery",
    "Tracks clinical visits, risks, and escalations in real time",
    "Mobile-first for clinicians delivering care in the field",
    "Automates reporting to reduce administrative burden",
    "Supports acute, post-acute, and virtual ward care models",
    "Demonstrates safe care delivery with structured records",
    "GPS-verified service delivery for transparent visit tracking",
    "Shared visibility across the hospital, clinician, and care teams",
  ],
  aiTools: [
    "AI-assisted visit preparation and clinical note drafting",
    "Smart clinician scheduling based on treatment needs and travel time",
    "Automated risk flagging for missed visits, escalations, and follow-up gaps",
  ],
  proofQuotes: [
    {
      quote:
        "We finally have one system for discharge coordination, clinician scheduling, and in-home documentation.",
      attribution: "Operations Lead, Hospital in the Home Provider",
    },
    {
      quote:
        "Our teams can see what has happened, what is scheduled next, and where risks are emerging without chasing updates across systems.",
      attribution: "Clinical Services Manager, Hospital in the Home Program",
    },
  ],
  caseStudy: {
    eyebrow: "Customer Story",
    title:
      "How Hospital in the Home teams improve coordination from discharge to home-based care",
    description:
      "See how a Hospital in the Home provider can unify care coordination, mobile documentation, and clinician scheduling in one connected operational platform.",
    href: "/contact",
    company: "Hospital in the Home Provider",
    companySize: "Multi-team",
    industry: "Health & Social Care",
    quote:
      "Structured records and real-time visibility make it much easier to demonstrate safe, governed care in the home.",
    author: "Program Director",
    role: "Hospital in the Home Service",
  },
};

export default function HospitalInTheHomePage() {
  return <EditionPageTemplate data={data} />;
}
