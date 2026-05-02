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

export type ProductSubmenu = {
  col2?: { heading: string; items: NavItem[] };
  col3?: { heading: string; items: NavItem[] }; // shown when a col2 item named "Editions" is hovered
};

export type NavGroup = {
  label: string;
  href: string;
  items?: NavItem[];                               // used on mobile for groups without megaMenu
  megaMenu?: [MegaColumn, MegaColumn, MegaColumn]; // always 3 cols; col3 empty → bg-slate-100
  submenu?: Record<string, ProductSubmenu>;        // product-specific submenus (keyed by product name)
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

const SOGNOSCARE_SECTIONS: NavItem[] = [
  { name: "What it solves", href: "/products/sognoscare#problems" },
  { name: "Features", href: "/products/sognoscare#features" },
  { name: "Editions", href: "/products/sognoscare#editions" },
  { name: "Key Advantages", href: "/products/sognoscare#advantages" },
  { name: "Customer Stories", href: "/products/sognoscare#stories" },
];

const SOGNOSCARE_EDITIONS: NavItem[] = [
  { name: "Disability & Mental Health", href: "/products/sognoscare/editions/disability-mental-health" },
  { name: "Allied Health", href: "/products/sognoscare/editions/allied-health" },
  { name: "Support at Home", href: "/products/sognoscare/editions/support-at-home" },
  { name: "Residential Aged Care", href: "/products/sognoscare/editions/residential-aged-care" },
];

const SOGNOSROSTER_SECTIONS: NavItem[] = [
  { name: "What it solves", href: "/products/sognosroster#problems" },
  { name: "Features", href: "/products/sognosroster#features" },
  { name: "Key Advantages", href: "/products/sognosroster#advantages" },
  { name: "Customer Stories", href: "/products/sognosroster#stories" },
];

const SOGNOSGENOGRAM_SECTIONS: NavItem[] = [
  { name: "What it solves", href: "/products/sognosgenogram#problems" },
  { name: "Features", href: "/products/sognosgenogram#features" },
  { name: "Integration", href: "/products/sognosgenogram#integration" },
];

// ─── Navigation ───────────────────────────────────────────────────────────────

export const nav: NavGroup[] = [
  {
    label: "Why Sognos",
    href: "#",
    megaMenu: [
      {
        heading: "Why Choose Us",
        items: [
          { name: "Built for complexity", href: "#" },
          { name: "Microsoft-first platform", href: "#" },
          { name: "Designed for frontline", href: "#" },
        ],
      },
      {
        heading: "Explore",
        items: [
          { name: "Customer Stories", href: "/customers" },
          { name: "Partners", href: "#" },
        ],
      },
      { heading: "", items: [] },
    ],
  },
  {
    label: "Products",
    href: "/products",
    items: [
      { name: "SognosCare", href: "/products/sognoscare", description: "Care operations & compliance" },
      { name: "SognosRoster", href: "/products/sognosroster", description: "Workforce scheduling & optimisation" },
      { name: "Sognos Genogram", href: "/products/sognosgenogram", description: "Relationship & family context mapping" },
    ],
    megaMenu: [
      {
        heading: "Products",
        variant: "feature",
        items: [
          { name: "SognosCare", href: "/products/sognoscare", description: "Care operations & compliance" },
          { name: "SognosRoster", href: "/products/sognosroster", description: "Workforce scheduling & optimisation" },
          { name: "Sognos Genogram", href: "/products/sognosgenogram", description: "Relationship & family context mapping" },
        ],
      },
      { heading: "", items: [] },
      { heading: "", items: [] },
    ],
    submenu: {
      "SognosCare": {
        col2: { heading: "SognosCare", items: SOGNOSCARE_SECTIONS },
        col3: { heading: "Editions", items: SOGNOSCARE_EDITIONS },
      },
      "SognosRoster": {
        col2: { heading: "SognosRoster", items: SOGNOSROSTER_SECTIONS },
      },
      "Sognos Genogram": {
        col2: { heading: "Sognos Genogram", items: SOGNOSGENOGRAM_SECTIONS },
      },
    },
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
    label: "Knowledge Hub",
    href: "/knowledge-hub",
    megaMenu: [
      {
        heading: "Knowledge Hub",
        items: [
          { name: "Blog", href: "/knowledge-hub" },
          { name: "News", href: "/knowledge-hub" },
          { name: "Customer Stories", href: "/customers" },
        ],
      },
      {
        heading: "Company",
        items: [
          { name: "About", href: "/company/about" },
          { name: "Social Responsibility", href: "/company/social-responsibility" },
          { name: "Careers", href: "/company/careers" },
        ],
      },
      { heading: "", items: [] },
    ],
  },
];

export const navCTA = {
  secondary: { name: "Contact Sales", href: "/contact" },
  primary: { name: "Book a Demo", href: "/contact" },
};
