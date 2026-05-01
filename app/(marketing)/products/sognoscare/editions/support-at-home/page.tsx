import type { Metadata } from "next";
import EditionPageTemplate, { type EditionData } from "@/components/sections/sognoscare/EditionPageTemplate";

export const metadata: Metadata = {
  title: "SognosCare for Support at Home | Sognos",
  description:
    "Manage client services, budgets, and care workers while staying ahead of the new Support at Home program — with funding model changes tracked and compliance pre-configured.",
};

const data: EditionData = {
  name: "Support at Home",
  tagline: "Home care packages, Support at Home reform, and client independence.",
  description:
    "Manage client services, budgets, and care workers while staying ahead of the new Support at Home program — with funding model changes tracked and compliance obligations pre-configured.",
  gradient: "/images/sognoscare/gradient-3.png",
  accentHex: "#ff666b",
  accentTextClass: "text-(--sognos-edition-coral)",
  accentBgClass: "bg-(--sognos-edition-coral)",
  accentBorderClass: "border-(--sognos-edition-coral)",
  problems: [
    {
      label: "Manual care worker scheduling",
      description:
        "Coordinating care worker rosters against client schedules is done manually, creating gaps and missed visits.",
    },
    {
      label: "Complex Support at Home compliance",
      description:
        "Adapting to the new Support at Home program while maintaining current operations stretches every team.",
    },
    {
      label: "Fragmented client communication",
      description:
        "Clients, families, and care managers use different channels, making it impossible to maintain a unified record.",
    },
    {
      label: "No real-time visibility of service budgets",
      description:
        "Budget tracking is done in spreadsheets, leading to overspend, underspend, and funding disputes.",
    },
    {
      label: "Paper-based progress notes and reporting",
      description:
        "Care workers complete paper notes in the field that are entered manually — late, lost, or incomplete.",
    },
    {
      label: "Difficulty demonstrating consumer-directed care",
      description:
        "Proving that care plans genuinely reflect client goals and preferences is difficult without structured records.",
    },
  ],
  features: [
    {
      title: "Core Features",
      description:
        "Everything a home care provider needs to manage packages, schedule workers, and stay compliant.",
    },
    {
      title: "Client & Package Management",
      description:
        "Manage Home Care Packages, Support at Home registrations, and client profiles from a single record.",
    },
    {
      title: "Care Worker Scheduling & Rostering",
      description:
        "Match care workers to client visits based on skills, location, availability, and compliance status.",
    },
    {
      title: "Budget Tracking & Funding Management",
      description:
        "Track funding balances in real time against approved budgets, with alerts before overspend occurs.",
    },
    {
      title: "Progress Notes & Reporting",
      description:
        "Mobile-first progress notes for care workers in the field, with automated compliance reporting.",
    },
    {
      title: "Support at Home Compliance",
      description:
        "Pre-configured workflows for the new Support at Home program, including classification and contribution management.",
    },
    {
      title: "Client & Family Portal",
      description:
        "Give clients and families visibility of their care plan, scheduled visits, and funding usage.",
    },
  ],
  advantages: [
    "Pre-configured for the new Support at Home program requirements",
    "Tracks funding budgets in real time with overspend alerts",
    "Mobile-first for care workers completing visits in the field",
    "Automates compliance reporting to reduce month-end burden",
    "Supports both self-directed and provider-managed care models",
    "Demonstrates person-centred care with structured goal records",
  ],
  aiTools: [
    "AI-assisted care plan generation from client assessments",
    "Predictive budget alerts before funding is exhausted",
    "Automated progress note generation from voice or structured input",
  ],
  proofQuotes: [
    {
      quote:
        "We transitioned to Support at Home with zero compliance issues. The pre-configured workflows did the heavy lifting.",
      attribution: "General Manager, Home Care Provider",
    },
    {
      quote:
        "Our care workers love the mobile app. They spend less time on admin and more time with clients.",
      attribution: "Operations Manager, In-Home Support Organisation",
    },
  ],
  caseStudy: {
    eyebrow: "Customer Story",
    title: "How a Home Care Provider Prepared for Support at Home Reform with SognosCare",
    description:
      "Discover how a leading home care provider transitioned to the new Support at Home program without service disruption — using SognosCare to manage the change from day one.",
    href: "/customers",
  },
};

export default function SupportAtHomePage() {
  return <EditionPageTemplate data={data} />;
}
