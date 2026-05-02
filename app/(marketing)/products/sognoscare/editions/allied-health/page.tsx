import type { Metadata } from "next";
import EditionPageTemplate, {
  type EditionData,
} from "@/components/sections/sognoscare/EditionPageTemplate";

export const metadata: Metadata = {
  title: "SognosCare for Allied Health | Sognos",
  description:
    "Manage referrals, coordinate therapy schedules, and record multi-disciplinary notes in one place — with mobile-first access for allied health practitioners.",
};

const data: EditionData = {
  name: "Allied Health",
  tagline:
    "Mobile therapy teams, referral management, and multi-disciplinary records.",
  description:
    "Manage referrals, coordinate therapy schedules, and record multi-disciplinary notes in one place — with mobile-first access designed for practitioners who work across multiple sites.",
  gradient: "/images/sognoscare/gradient-2.png",
  accentHex: "#ff9233",
  accentTextClass: "text-(--sognos-edition-orange)",
  accentBgClass: "bg-(--sognos-edition-orange)",
  accentBorderClass: "border-(--sognos-edition-orange)",
  problems: [
    {
      label: "Fragmented referral management",
      description:
        "Referrals arrive through multiple channels and are tracked manually, leading to delays and missed appointments.",
    },
    {
      label: "Manual scheduling for multi-site practitioners",
      description:
        "Coordinating practitioner rosters across sites and disciplines is time-consuming and prone to gaps.",
    },
    {
      label: "Inconsistent clinical documentation",
      description:
        "Different practitioners use different formats, making it impossible to maintain a single view of the client.",
    },
    {
      label: "No visibility of caseload and capacity",
      description:
        "Practice managers can't see real-time capacity across disciplines, leading to over- or under-utilisation.",
    },
    {
      label: "Poor integration between clinical and billing",
      description:
        "Clinical records and billing systems are disconnected, causing claim errors and revenue leakage.",
    },
    {
      label: "Limited mobile access for field practitioners",
      description:
        "Practitioners can't access or update records between appointments or at community sites.",
    },
  ],
  features: [
    {
      title: "Core Features",
      description:
        "Everything an allied health practice needs — from referral intake to outcome measurement.",
    },
    {
      title: "Referral & Intake Management",
      description:
        "Centralise referrals from all sources, triage by priority, and assign to the right practitioner automatically.",
    },
    {
      title: "Multi-disciplinary Care Records",
      description:
        "Shared client records accessible by all treating practitioners — with discipline-specific note templates.",
    },
    {
      title: "Practitioner Scheduling & Rostering",
      description:
        "Coordinate schedules across disciplines and sites, with skills-based matching and conflict detection.",
    },
    {
      title: "Clinical Documentation & Notes",
      description:
        "Structured note templates for each discipline, with AI-assisted documentation and outcome tracking.",
    },
    {
      title: "Billing & Medicare Claims",
      description:
        "Automated Medicare, health fund, and NDIS claim generation with bulk submission and reconciliation.",
    },
    {
      title: "Outcomes Measurement",
      description:
        "Track clinical outcomes against validated measures and generate reports for funders and accreditors.",
    },
  ],
  advantages: [
    "Purpose-built for allied health practice workflows",
    "Integrates with Medicare, NDIS, and health fund billing",
    "Mobile-first for practitioners working across multiple sites",
    "Reduces time-to-treatment from referral",
    "Structured documentation that keeps you audit-ready",
    "Shared records visible to all disciplines in the care team",
    "Outcome measurement built in for evidence-based practice",
    "Group session and program management out of the box",
  ],
  aiTools: [
    "Copilot-style clinical note automation",
    "AI-assisted intake triage and priority scoring",
    "Smart scheduling and capacity recommendations",
  ],
  proofQuotes: [
    {
      quote:
        "Our referral wait time dropped by 35% in the first quarter after going live.",
      attribution: "Practice Manager, Allied Health Group",
    },
    {
      quote:
        "Finally a system that understands how we work — not the other way around.",
      attribution: "Director of Services, Allied Health Provider",
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

export default function AlliedHealthPage() {
  return <EditionPageTemplate data={data} />;
}
