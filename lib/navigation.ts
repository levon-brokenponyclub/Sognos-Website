export type NavItem = {
  name: string;
  href: string;
  description?: string;
};

export type MegaColumn = {
  heading: string;
  variant?: "feature" | "simple"; // feature = large icon+desc cards; simple = compact link list
  items: NavItem[];
};

export type NavGroup = {
  label: string;
  href: string;
  items?: NavItem[];                               // used on mobile accordion
  megaMenu?: [MegaColumn, MegaColumn, MegaColumn]; // always 3 cols; col3 empty → bg-slate-100
};

// ─── Shared lists ─────────────────────────────────────────────────────────────

const SOLUTIONS: NavItem[] = [
  { name: "Field Service", href: "/solutions/field-service" },
  { name: "CRM", href: "/solutions/customer-relationship-management" },
  { name: "Customer Insights", href: "/solutions/customer-insights" },
  { name: "Customer Experience", href: "/solutions/customer-experience" },
  { name: "Customer Service", href: "/solutions/customer-service" },
  { name: "Power Platform", href: "/solutions/power-platform" },
  { name: "Quick Start", href: "/solutions/quick-start" },
];

const INDUSTRIES: NavItem[] = [
  { name: "Health & Social Care", href: "/industries/health-social-care" },
  { name: "Facilities Management", href: "/industries/facilities-management" },
  { name: "Local Government", href: "/industries/local-government" },
  { name: "Industrial Services", href: "/industries/industrial-services" },
  { name: "Energy & Utilities", href: "/industries/energy-utilities" },
];

// ─── Navigation ───────────────────────────────────────────────────────────────

export const nav: NavGroup[] = [
  {
    label: "Products",
    href: "/products",
    items: [
      { name: "SognosCare", href: "/products/sognoscare", description: "Care operations & compliance" },
      { name: "SognosRoster", href: "/products/sognosroster", description: "Workforce scheduling & optimisation" },
    ],
    megaMenu: [
      {
        heading: "Products",
        variant: "feature",
        items: [
          { name: "SognosCare", href: "/products/sognoscare", description: "Care operations & compliance" },
          { name: "SognosRoster", href: "/products/sognosroster", description: "Workforce scheduling & optimisation" },
        ],
      },
      {
        heading: "Solutions",
        items: SOLUTIONS,
      },
      {
        heading: "Industries",
        items: INDUSTRIES,
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    items: SOLUTIONS,
    megaMenu: [
      { heading: "Solutions", items: SOLUTIONS },
      { heading: "Industries", items: INDUSTRIES },
      { heading: "", items: [] },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    items: INDUSTRIES,
    megaMenu: [
      { heading: "Industries", items: INDUSTRIES },
      { heading: "Solutions", items: SOLUTIONS },
      { heading: "", items: [] },
    ],
  },
  {
    label: "Customers",
    href: "/customers",
  },
  {
    label: "Resources",
    href: "/resources",
  },
  {
    label: "Company",
    href: "/company/about",
    items: [
      { name: "About", href: "/company/about" },
      { name: "Careers", href: "/company/careers" },
    ],
  },
];

export const navCTA = {
  secondary: { name: "Contact Sales", href: "/contact" },
  primary: { name: "Book a Demo", href: "/contact" },
};
