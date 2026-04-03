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
} as const;

// Alignment note: This file is the shared taxonomy source of truth used by reusable
// navigation/content surfaces. Standalone Platform routes were intentionally removed.
export const SOLUTIONS = [
  { name: "Field Service", slug: "field-service", href: "/solutions/field-service" },
  {
    name: "Customer Relationship Management",
    slug: "customer-relationship-management",
    href: "/solutions/customer-relationship-management",
  },
  { name: "Customer Insights", slug: "customer-insights", href: "/solutions/customer-insights" },
  {
    name: "Customer Experience",
    slug: "customer-experience",
    href: "/solutions/customer-experience",
  },
  { name: "Customer Service", slug: "customer-service", href: "/solutions/customer-service" },
  { name: "Power Platform", slug: "power-platform", href: "/solutions/power-platform" },
  { name: "Quick Start", slug: "quick-start", href: "/solutions/quick-start" },
] as const;

export const INDUSTRIES = [
  {
    name: "Health & Social Care",
    slug: "health-social-care",
    href: "/industries/health-social-care",
    description:
      "Coordinate complex care delivery, multidisciplinary teams, and compliance-heavy service operations.",
    products: ["SognosCare", "SognosRoster"],
  },
  {
    name: "Facilities Management",
    slug: "facilities-management",
    href: "/industries/facilities-management",
    description:
      "Dispatch field teams efficiently, manage SLAs, and maintain visibility across sites and clients.",
    products: ["SognosRoster"],
  },
  {
    name: "Local Government",
    slug: "local-government",
    href: "/industries/local-government",
    description:
      "Support frontline service delivery with clear case management, workforce coordination, and audit trails.",
    products: ["SognosCare", "SognosRoster"],
  },
  {
    name: "Industrial Services",
    slug: "industrial-services",
    href: "/industries/industrial-services",
    description:
      "Coordinate large-scale field operations, asset-linked work, and complex workforce logistics.",
    products: ["SognosRoster"],
  },
  {
    name: "Energy & Utilities",
    slug: "energy-utilities",
    href: "/industries/energy-utilities",
    description:
      "Manage asset-intensive service delivery, compliance, and workforce execution across critical networks.",
    products: ["SognosCare", "SognosRoster"],
  },
] as const;
