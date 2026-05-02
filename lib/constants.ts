export const SITE = {
  name: "Sognos",
  tagline: "AI-powered service operations platform",
  url: "https://sognos.com.au",
} as const;

export const PRODUCTS = {
  care: {
    name: "SognosCare",
    slug: "sognoscare",
    href: "/products/sognoscare",
    tagline: "Care operations & compliance platform",
    description:
      "Manage service delivery, maintain compliance, and report with confidence — all in one platform.",
  },
  roster: {
    name: "SognosRoster",
    slug: "sognosroster",
    href: "/products/sognosroster",
    tagline: "Workforce scheduling & optimisation engine",
    description:
      "Allocate the right people, at the right time, to the right services — automatically.",
  },
  genogram: {
    name: "Sognos Genogram",
    slug: "sognosgenogram",
    href: "/products/sognosgenogram",
    tagline: "Relationship & family context platform",
    description:
      "Map family structures, support networks, and relationship histories directly into case records — so every worker has the context they need.",
  },
} as const;

export const SOLUTIONS = [
  {
    name: "Field Service",
    slug: "field-service",
    href: "/solutions/field-service",
    description:
      "Manage field technician dispatch, job tracking, and SLA compliance at scale.",
  },
  {
    name: "Customer Relationship Management",
    slug: "customer-relationship-management",
    href: "/solutions/customer-relationship-management",
    description:
      "Centralise client records, interactions, and service history in one system.",
  },
  {
    name: "Customer Insights",
    slug: "customer-insights",
    href: "/solutions/customer-insights",
    description:
      "Surface patterns in service demand, outcomes, and client behaviour.",
  },
  {
    name: "Customer Experience",
    slug: "customer-experience",
    href: "/solutions/customer-experience",
    description:
      "Deliver consistent, high-quality service interactions across every touchpoint.",
  },
  {
    name: "Customer Service",
    slug: "customer-service",
    href: "/solutions/customer-service",
    description:
      "Resolve issues faster with unified case management and response tracking.",
  },
  {
    name: "Power Platform",
    slug: "power-platform",
    href: "/solutions/power-platform",
    description:
      "Extend and automate your operations with low-code tools built into the platform.",
  },
  {
    name: "Quick Start",
    slug: "quick-start",
    href: "/solutions/quick-start",
    description: "Get up and running with Sognos in weeks — not months.",
  },
] as const;

export const INDUSTRIES = [
  {
    name: "Health & Social Care",
    slug: "health-social-care",
    href: "/industries/health-social-care",
    description:
      "Coordinate complex care delivery, multidisciplinary teams, and compliance-heavy service operations.",
    products: ["SognosCare", "SognosRoster"],
    image: "/images/industries/health-social-care.webp",
    features: [
      "Real-time care delivery tracking across multidisciplinary teams",
      "Automated compliance reporting and full audit trail management",
      "Skill-matched rostering for care workers across service types",
      "Case management linked directly to service delivery outcomes",
    ],
  },
  {
    name: "Facilities Management",
    slug: "facilities-management",
    href: "/industries/facilities-management",
    description:
      "Dispatch field teams efficiently, manage SLAs, and maintain visibility across sites and clients.",
    products: ["SognosRoster"],
    image: "/images/industries/facilities-management.webp",
    features: [
      "Real-time field technician dispatch and job progress tracking",
      "SLA monitoring with automated escalation and client alerts",
      "Multi-site workforce visibility in a single operational view",
      "Asset-linked work order management with full service history",
    ],
  },
  {
    name: "Local Government",
    slug: "local-government",
    href: "/industries/local-government",
    description:
      "Support frontline service delivery with clear case management, workforce coordination, and audit trails.",
    products: ["SognosCare", "SognosRoster"],
    image: "/images/industries/local-government.webp",
    features: [
      "Case management with full audit trail for public accountability",
      "Workforce coordination across departments and field teams",
      "Automated reporting for council performance and compliance metrics",
      "Compliant service delivery documentation built into every workflow",
    ],
  },
  {
    name: "Industrial Services",
    slug: "industrial-services",
    href: "/industries/industrial-services",
    description:
      "Coordinate large-scale field operations, asset-linked work, and complex workforce logistics.",
    products: ["SognosRoster"],
    image: "/images/industries/industrial-services.webp",
    features: [
      "Large-scale field crew scheduling and dispatch across remote sites",
      "Asset-linked work orders with integrated safety compliance tracking",
      "Real-time job progress visibility across distributed operations",
      "Contractor and subcontractor workforce management in one system",
    ],
  },
  {
    name: "Energy & Utilities",
    slug: "energy-utilities",
    href: "/industries/energy-utilities",
    description:
      "Manage asset-intensive service delivery, compliance, and workforce execution across critical networks.",
    products: ["SognosCare", "SognosRoster"],
    image: "/images/industries/energy-utilities.webp",
    features: [
      "Planned maintenance scheduling integrated with live field operations",
      "Regulatory compliance tracking across critical infrastructure assets",
      "Emergency response coordination with dynamic workforce reallocation",
      "Network fault response with SLA tracking and full audit trails",
    ],
  },
] as const;

export const SOGNOSCARE_EDITIONS = [
  {
    label: "Disability & Mental Health",
    logo: "/logos/sognoscare-edition-dmh.svg",
    href: "/products/sognoscare/editions/disability-mental-health",
    accentColor: "#00A98F",
    tagline: "NDIS, psychosocial support, and participant outcome tracking",
    description:
      "Plan around participant goals, manage incidents, and streamline progress notes — with NDIS funding rules and Quality & Safeguards requirements enforced at every step.",
  },
  {
    label: "Allied Health",
    logo: "/logos/sognoscare-edition-ahc.svg",
    href: "/products/sognoscare/editions/allied-health",
    accentColor: "#FE9C48",
    tagline:
      "Mobile therapy , referral management, and multi-disciplinary records",
    description:
      "Manage referrals, coordinate therapy schedules, and record multi-disciplinary notes in one place — with mobile-first access designed for practitioners who work across multiple sites.",
  },
  {
    label: "Support at Home",
    logo: "/logos/sognoscare-edition-sah.svg",
    href: "/products/sognoscare/editions/support-at-home",
    accentColor: "#FF7276",
    tagline: "Support at Home reform, and client independence",
    description:
      "Manage client services, budgets, and care workers while staying ahead of the new Support at Home program — with funding model changes tracked and compliance obligations pre-configured.",
  },
  {
    label: "Residential Aged Care",
    logo: "/logos/sognoscare-edition-rac.svg",
    href: "/products/sognoscare/editions/residential-aged-care",
    accentColor: "#BE8FFF",
    tagline: "Care planning, clinical documentation, and compliance",
    description:
      "From care planning and progress documentation to staff coordination and resident reporting — built for residential providers who need to demonstrate quality against the Aged Care Quality Standards.",
  },
] as const;
