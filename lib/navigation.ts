export type NavItem = {
  name: string;
  href: string;
  description?: string;
  /** `suite` columns only — the mark shown in the item's tile. */
  image?: string;
  /** `suite` columns only — the tile background, a product dark token. */
  tileClass?: string;
};

export type MegaColumn = {
  heading: string;
  // feature = large icon+desc cards; simple = compact link list;
  // product = heading, tagline, "Learn more", rule, then the section links;
  // suite = eyebrow heading over tile + name + description rows.
  variant?: "feature" | "simple" | "product" | "suite";
  /** `product` only — the tagline under the heading. */
  description?: string;
  /** `product` only — where the heading and "Learn more" point. */
  href?: string;
  items: NavItem[];
};

export type ProductSubmenu = {
  col2?: { heading: string; items: NavItem[] };
  col3?: { heading: string; items: NavItem[] }; // shown when a col2 item named "Editions" is hovered
};

export type NavGroup = {
  label: string;
  href: string;
  items?: NavItem[]; // used on mobile for groups without megaMenu
  megaMenu?: [MegaColumn, MegaColumn, MegaColumn]; // always 3 cols; col3 empty → bg-slate-100
  submenu?: Record<string, ProductSubmenu>; // product-specific submenus (keyed by product name)
};

// ─── Shared lists ─────────────────────────────────────────────────────────────

// The three products as tile rows, for dropdowns that need to point at them
// without giving each one a column. Descriptions are the taglines from
// PRODUCTS in constants.ts, trimmed to one line.
//
// The marks are wordmarks, not square icons — no per-product icon set exists
// (only `icon-sognos-care.svg`, which is a one-off). They are inverted to white
// against the product's own dark token, the same treatment the customer-story
// logos get. Purpose-made square marks would sit better here.
const PRODUCT_SUITES: NavItem[] = [
  {
    name: "SognosCare",
    href: "/products/sognoscare",
    description: "Care operations & compliance",
    image: "/logos/sognos-care-logo.svg",
    tileClass: "bg-sognos-care-dark",
  },
  {
    name: "SognosRoster",
    href: "/products/sognosroster",
    description: "Workforce scheduling & optimisation",
    image: "/logos/sognos-roster-logo.svg",
    tileClass: "bg-sognos-roster-dark",
  },
  {
    name: "SognosGenogram",
    href: "/products/sognosgenogram",
    description: "Relationship & family context mapping",
    image: "/logos/SognosGenogram-logo.svg",
    tileClass: "bg-sognos-genogram-dark",
  },
];

const SOLUTIONS: NavItem[] = [
  { name: "Frontline", href: "/solutions/frontline" },
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
  { name: "Schedule a Call", href: "/contact" },
];

const SOGNOSCARE_EDITIONS: NavItem[] = [
  {
    name: "Disability & Mental Health",
    href: "/products/sognoscare/editions/disability-mental-health",
  },
  {
    name: "Allied Health",
    href: "/products/sognoscare/editions/allied-health",
  },
  {
    name: "Hospital in the Home",
    href: "/products/sognoscare/editions/hospital-in-the-home",
  },
  {
    name: "Support at Home",
    href: "/products/sognoscare/editions/support-at-home",
  },
  {
    name: "Residential Aged Care",
    href: "/products/sognoscare/editions/residential-aged-care",
  },
  {
    name: "Child & Family Services",
    href: "/products/sognoscare/editions/child-and-family-services",
  },
];

const SOGNOSROSTER_SECTIONS: NavItem[] = [
  { name: "What it solves", href: "/products/sognosroster#problems" },
  { name: "Features", href: "/products/sognosroster#features" },
  { name: "Key Advantages", href: "/products/sognosroster#advantages" },
  { name: "Customer Stories", href: "/products/sognosroster#stories" },
  { name: "Schedule a Call", href: "/contact" },
];

const SOGNOSGENOGRAM_SECTIONS: NavItem[] = [
  { name: "What it solves", href: "/products/sognosgenogram#problems" },
  { name: "Features", href: "/products/sognosgenogram#features" },
  { name: "Customer Stories", href: "/products/sognosgenogram#stories" },
  { name: "Schedule a Call", href: "/contact" },
];

// ─── Navigation ───────────────────────────────────────────────────────────────

export const nav: NavGroup[] = [
  {
    label: "Why Sognos",
    href: "#",
    megaMenu: [
      {
        heading: "Company",
        items: [
          { name: "About", href: "/company/about" },
          {
            name: "Social Responsibility",
            href: "/company/social-responsibility",
          },
          { name: "Customer Stories", href: "/customer-stories" },
          { name: "Careers", href: "/company/careers" },
          { name: "Contact", href: "/contact" },
        ],
      },
      // TEMP (menu-styling phase): Column 2 removed; restore after styling is complete.
      { heading: "", items: [] },
      // TEMP (menu-styling phase): Column 3 removed; restore after styling is complete.
      { heading: "", items: [] },
    ],
  },
  {
    label: "Products",
    href: "/products",
    items: [
      {
        name: "SognosCare",
        href: "/products/sognoscare",
        description: "Care operations & compliance",
      },
      {
        name: "SognosRoster",
        href: "/products/sognosroster",
        description: "Workforce scheduling & optimisation",
      },
      {
        name: "SognosGenogram",
        href: "/products/sognosgenogram",
        description: "Relationship & family context mapping",
      },
    ],
    // One column per product: name, tagline, "Learn more", a rule, then that
    // product's own section links — the lists the hover submenu used to show.
    megaMenu: [
      {
        heading: "SognosCare",
        variant: "product",
        description: "Care operations & compliance",
        href: "/products/sognoscare",
        items: SOGNOSCARE_SECTIONS,
      },
      {
        heading: "SognosRoster",
        variant: "product",
        description: "Workforce scheduling & optimisation",
        href: "/products/sognosroster",
        items: SOGNOSROSTER_SECTIONS,
      },
      {
        heading: "SognosGenogram",
        variant: "product",
        description: "Relationship & family context mapping",
        href: "/products/sognosgenogram",
        items: SOGNOSGENOGRAM_SECTIONS,
      },
    ],
    submenu: {
      SognosCare: {
        col2: { heading: "SognosCare", items: SOGNOSCARE_SECTIONS },
        col3: { heading: "Editions", items: SOGNOSCARE_EDITIONS },
      },
      SognosRoster: {
        col2: { heading: "SognosRoster", items: SOGNOSROSTER_SECTIONS },
      },
      SognosGenogram: {
        col2: { heading: "SognosGenogram", items: SOGNOSGENOGRAM_SECTIONS },
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
    // Sectors, then the products that serve them. Solutions cross-lists
    // Industries because a reader browsing capabilities often wants to know
    // whether their sector is served; the reverse is not true, and listing both
    // in both dropdowns made them mirror images of each other.
    megaMenu: [
      { heading: "Industries", items: INDUSTRIES },
      { heading: "Products", variant: "suite", items: PRODUCT_SUITES },
      { heading: "", items: [] },
    ],
  },
  {
    label: "Knowledge Hub",
    href: "/knowledge-hub",
    megaMenu: [
      // Column 2. Column 1 is the image block and column 3 the featured
      // posts, both supplied by lib/featuredNav.ts rather than declared here.
      // The anchors point at the archive's sections; the per-section listing
      // pages do not exist yet.
      {
        heading: "Knowledge Hub",
        items: [
          { name: "News", href: "/knowledge-hub#news" },
          { name: "Insights", href: "/knowledge-hub#insights" },
          { name: "Events & Webinars", href: "/knowledge-hub#events" },
          { name: "Milestones", href: "/knowledge-hub#milestones" },
        ],
      },
      // `megaMenu` is a fixed three-column tuple. Empty columns are filtered
      // out before render, so these cost nothing.
      { heading: "", items: [] },
      { heading: "", items: [] },
    ],
  },
];

export const navCTA = {
  secondary: { name: "Contact Sales", href: "/contact" },
  primary: { name: "Book a Demo", href: "/contact" },
};
