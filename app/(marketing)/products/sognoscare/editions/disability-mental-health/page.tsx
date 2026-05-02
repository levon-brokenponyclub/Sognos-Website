import type { Metadata } from "next";
import EditionPageTemplate, {
  type EditionData,
} from "@/components/sections/sognoscare/EditionPageTemplate";

export const metadata: Metadata = {
  title: "SognosCare for Disability & Mental Health | Sognos",
  description:
    "Purpose-built for NDIS and psychosocial support providers. Smart systems to support participant goals, reduce admin, and stay NDIS-compliant.",
};

const data: EditionData = {
  name: "Disability & Mental Health",
  tagline: "Purpose-built for psychosocial providers.",
  description:
    "Smart systems to support participant goals, reduce admin, and stay NDIS-compliant — all built on Microsoft using the latest AI technology.",
  gradient: "/images/sognoscare/gradient-1.png",
  accentHex: "#009982",
  accentTextClass: "text-(--sognos-edition-green)",
  accentBgClass: "bg-(--sognos-edition-green)",
  accentBorderClass: "border-(--sognos-edition-green)",
  problems: [
    {
      label: "Endless admin and disconnected systems",
      description:
        "Teams juggle multiple platforms for referrals, notes, and compliance — creating errors and burning time.",
    },
    {
      label: "NDIS compliance headaches",
      description:
        "Keeping up with Quality & Safeguards requirements across every participant record is manual and error-prone.",
    },
    {
      label: "Missed or delayed support due to scheduling gaps",
      description:
        "Without real-time workforce visibility, participants fall through the cracks when workers are unavailable.",
    },
    {
      label: "No visibility of goals, outcomes or risk",
      description:
        "Managers lack a consolidated view of participant progress, risk flags, and outcome achievement.",
    },
    {
      label: "Limited support for mobile teams",
      description:
        "Outreach workers and support coordinators can't access or update records in the field.",
    },
    {
      label: "Billing and claims errors",
      description:
        "Manual NDIS claim processing leads to underclaiming, errors, and payment delays.",
    },
  ],
  features: [
    {
      title: "Core Features",
      description:
        "Everything a NDIS or psychosocial support provider needs — pre-configured, compliant, and ready to deploy.",
    },
    {
      title: "Intake & Onboarding",
      description:
        "Referrals, assessments, consent forms, and participant records from day one.",
    },
    {
      title: "Recovery Planning & Goal Tracking",
      description:
        "Personalised plans, goal progress notes, and outcome reporting built in.",
    },
    {
      title: "Rostering & Mobile Workforce",
      description:
        "Smart scheduling, NDIS-compliant shift matching, and mobile access for workers.",
    },
    {
      title: "Compliance & Reporting",
      description:
        "Auditing templates, mandatory reporting workflows, and quality indicator dashboards.",
    },
    {
      title: "Billing & Claims",
      description:
        "Plan management automation, NDIS price guide enforcement, and bulk claim submission.",
    },
    {
      title: "Secure Communication",
      description:
        "Encrypted messaging and document sharing between coordinators, workers, and participants.",
    },
  ],
  advantages: [
    "Built 100% on Microsoft Dynamics 365 and Power Platform",
    "Seamlessly integrates with Power Platform + AI Copilot",
    "Mobile-first design for outreach and clinic teams",
    "Reduces admin by up to 40%",
    "Keeps you audit-ready and person-centred at every step",
    "Pre-configured NDIS funding rules and Quality & Safeguards workflows",
    "Goal tracking and outcome reporting aligned to NDIS plans",
    "Restrictive practice authorisation workflows built in",
  ],
  aiTools: [
    "Copilot-style note automation",
    "AI triage and intake assistants",
    "Predictive alerts for risks and disengagement",
  ],
  proofQuotes: [
    {
      quote:
        "Admin time down 40%. Compliance up. And staff finally feel supported.",
      attribution: "Head of Service Delivery, Mental Health Provider",
    },
    {
      quote:
        "We used to rely on spreadsheets and gut feel. Now we've got clarity across every service and location.",
      attribution: "CEO, Disability Organisation",
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

export default function DisabilityMentalHealthPage() {
  return <EditionPageTemplate data={data} />;
}
