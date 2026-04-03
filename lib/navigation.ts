export type NavItem = {
  name: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  href: string;
  items?: NavItem[];
};

export const nav: NavGroup[] = [
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
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    items: [
      { name: "Field Service", href: "/solutions/field-service" },
      { name: "Customer Relationship Management", href: "/solutions/customer-relationship-management" },
      { name: "Customer Insights", href: "/solutions/customer-insights" },
      { name: "Customer Experience", href: "/solutions/customer-experience" },
      { name: "Customer Service", href: "/solutions/customer-service" },
      { name: "Power Platform", href: "/solutions/power-platform" },
      { name: "Quick Start", href: "/solutions/quick-start" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    items: [
      { name: "Health & Social Care", href: "/industries/health-social-care" },
      { name: "Facilities Management", href: "/industries/facilities-management" },
      { name: "Local Government", href: "/industries/local-government" },
      { name: "Industrial Services", href: "/industries/industrial-services" },
      { name: "Energy & Utilities", href: "/industries/energy-utilities" },
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
