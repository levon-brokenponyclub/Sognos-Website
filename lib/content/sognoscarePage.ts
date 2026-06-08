export type SeoMeta = {
  title: string;
  description: string;
};

export type SubNavSection = {
  label: string;
  id: string;
  href?: string;
};

export type SectionHeader = {
  eyebrow?: string;
  heading: string;
  intro?: string;
};

export type ProblemEntry = {
  number: string;
  problem: string;
  problemDetail: string;
  solution: string;
  iconPath: string;
};

export type FeatureEntry = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  capabilities: string[];
  iconPath: string;
};

export type CtaButton = {
  label: string;
  href: string;
};

export type SognoscarePageContent = {
  seo: SeoMeta;
  hero: {
    logoSrc: string;
    headline: string;
    subtext: string;
  };
  productDrawer: {
    peekTitle: string;
    peekDescription: string;
    drawerTitle: string;
    drawerDescription: string;
  };
  subNav: SubNavSection[];
  problemsHeader: SectionHeader;
  problems: ProblemEntry[];
  featuresHeader: SectionHeader;
  features: FeatureEntry[];
  editionsHeader: SectionHeader;
  advantagesHeader: SectionHeader;
  advantages: string[];
  storiesHeader: SectionHeader;
  cta: {
    headline: string;
    subtext: string;
    primaryCTA: CtaButton;
    secondaryCTA: CtaButton;
  };
};

export const DEFAULT_SOGNOSCARE_PAGE_CONTENT: SognoscarePageContent = {
  seo: {
    title: "SognosCare - Care Operations & Compliance | Sognos",
    description:
      "Manage service delivery, maintain compliance, and report with confidence - all in one platform built for care providers.",
  },
  hero: {
    logoSrc: "/logos/sognos-care-logo.svg",
    headline: "One platform. From intake to outcome.",
    subtext:
      "Manage cases, track service delivery, meet compliance obligations, and report with confidence - in one platform built end-to-end for care.",
  },
  productDrawer: {
    peekTitle: "What SognosCare Solves",
    peekDescription:
      "Manage cases, track service delivery, meet compliance obligations, and report with confidence - end-to-end.",
    drawerTitle: "Other Products",
    drawerDescription: "Explore the full Sognos platform.",
  },
  subNav: [
    { label: "What it solves", id: "problems" },
    { label: "Features", id: "features" },
    { label: "Editions", id: "editions" },
    { label: "Key Advantages", id: "advantages" },
    { label: "Customer Stories", id: "stories" },
    { label: "Schedule a Call", id: "calendar", href: "/contact" },
  ],
  problemsHeader: {
    heading: "Care providers shouldn't operate like this",
    intro:
      "Fragmented systems, manual compliance, and disconnected data are the default for most care organisations. SognosCare fixes the root causes, not the symptoms.",
  },
  problems: [
    {
      number: "01",
      problem: "Referrals and records spread across disconnected tools",
      problemDetail:
        "Care plans, progress notes, incidents, and service agreements living in separate systems means staff spend more time finding information than delivering care.",
      solution:
        "One structured system for the full case lifecycle - intake, assessment, goal tracking, service agreements, progress notes, and reviews in a single workflow accessible to everyone who needs it.",
      iconPath:
        "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      number: "02",
      problem: "Compliance is documented after the fact, not built in",
      problemDetail:
        "NDIS audits, Aged Care Quality Standards, and the new Support at Home model require evidence at every step. Most systems can't produce it without manual assembly.",
      solution:
        "Automated audit trails, funding rule enforcement, and compliance reporting built into every workflow - not bolted on retrospectively. Audit-ready by default.",
      iconPath:
        "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    },
    {
      number: "03",
      problem: "Month-end reporting consumes staff time it shouldn't",
      problemDetail:
        "Funding-body reports shouldn't take two days and three people to assemble. That time belongs to the people you support, not to spreadsheets.",
      solution:
        "Real-time dashboards and automated reports across funding bodies, compliance frameworks, and operational metrics - generated, not assembled. Staff focus on care.",
      iconPath:
        "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    },
    {
      number: "04",
      problem: "Workforce and care management don't talk to each other",
      problemDetail:
        "When rostering runs in a separate system, visit records don't match care plans, coordinators reconcile discrepancies daily, and nothing is where it should be.",
      solution:
        "SognosCare and SognosRoster share the same data layer - visit records, care plans, and participant history stay in sync automatically, without manual reconciliation.",
      iconPath:
        "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
  ],
  featuresHeader: {
    eyebrow: "Features",
    heading: "Everything a care operation needs",
  },
  features: [
    {
      id: "case-management",
      name: "Case Management",
      tagline: "Full lifecycle, one place",
      description:
        "Manage every stage of a participant's journey - from initial referral and intake through assessment, goal setting, service delivery, review, and case closure. Every touchpoint recorded, every team member aligned.",
      capabilities: [
        "Intake forms and referral management",
        "Goal tracking linked to funding streams",
        "Progress notes with structured templates",
        "Multi-disciplinary team access",
      ],
      iconPath:
        "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      id: "service-delivery",
      name: "Service Delivery Tracking",
      tagline: "Real-time visibility",
      description:
        "Know exactly what services were scheduled, what was delivered, and what was missed - in real time. Field workers record visits on mobile, coordinators see variance instantly, and nothing falls through the gaps.",
      capabilities: [
        "Scheduled vs actual service comparison",
        "Mobile-first visit recording",
        "Participant-level service budget tracking",
        "Service variance reports",
      ],
      iconPath:
        "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    },
    {
      id: "compliance",
      name: "Compliance & Audit Trail",
      tagline: "Audit-ready by default",
      description:
        "Every action timestamped. Every document versioned. Every funding rule enforced at the point of care, not retrospectively. SognosCare treats compliance as infrastructure - not a reporting exercise.",
      capabilities: [
        "Immutable audit log across all case activity",
        "Support at Home rule enforcement",
        "Incident management reporting workflows",
        "Compliance gap detection",
      ],
      iconPath:
        "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
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
      iconPath:
        "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    },
    {
      id: "copilot",
      name: "Microsoft Copilot AI",
      tagline: "AI where staff already work",
      description:
        "AI-assisted documentation, anomaly detection, and operational insights - surfaced inside Dynamics 365, not in a separate tool. Staff don't change their workflow to access AI.",
      capabilities: [
        "Copilot-assisted progress note drafting",
        "Anomaly detection on service delivery",
        "Predictive alerts for at-risk participants",
        "Natural language queries",
      ],
      iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
    },
    {
      id: "automation",
      name: "Power Platform Automation",
      tagline: "Workflows your way",
      description:
        "Configurable low-code automation for approvals, escalations, and notifications - built to match your organisation's specific processes without requiring a developer.",
      capabilities: [
        "Approval workflows for care plan changes",
        "Automated notifications to staff",
        "Integration with Microsoft Teams",
        "Custom form logic",
      ],
      iconPath:
        "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    },
  ],
  editionsHeader: {
    eyebrow: "Editions",
    heading: "Choose the Right SognosCare Edition for Your Service",
    intro:
      "SognosCare offers four tailored editions - each pre-configured for its funding model, compliance framework, and operational workflows.",
  },
  advantagesHeader: {
    heading: "Key Advantages",
  },
  advantages: [
    "Purpose-built for Australian care compliance - not adapted from generic CRM",
    "Reduces documentation time with AI-assisted clinical notes",
    "Keeps you audit-ready with continuous compliance tracking",
    "Integrates with Microsoft 365, Teams, and Dynamics 365 out of the box",
    "Connects care management, workforce rostering, and billing in one system",
    "Scales from community care to residential aged care without re-implementation",
  ],
  storiesHeader: {
    eyebrow: "Customer Stories",
    heading: "Customer Stories",
  },
  cta: {
    headline: "Ready to see SognosCare in action?",
    subtext:
      "Book a personalised demo and see how SognosCare handles your specific service delivery, compliance, and reporting requirements.",
    primaryCTA: { label: "Book a Demo", href: "/contact" },
    secondaryCTA: { label: "Contact Sales", href: "/contact" },
  },
};
