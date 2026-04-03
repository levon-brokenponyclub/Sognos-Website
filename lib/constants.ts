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

export const INDUSTRIES = [
  { name: "Health & Social Care", slug: "health-social-care" },
  { name: "NDIS & Aged Care", slug: "ndis-aged-care" },
  { name: "Facilities Management", slug: "facilities" },
  { name: "Local Government", slug: "local-government" },
  { name: "Industrial Services", slug: "industrial" },
] as const;

export const PLATFORM = [
  {
    name: "Microsoft Dynamics 365",
    href: "/platform/dynamics-365",
    description: "The enterprise foundation Sognos is built on.",
  },
  {
    name: "Copilot AI",
    href: "/platform/copilot-ai",
    description: "Embedded AI across every workflow.",
  },
  {
    name: "Power Platform",
    href: "/platform/power-platform",
    description: "Automation, analytics, and extensibility.",
  },
] as const;
