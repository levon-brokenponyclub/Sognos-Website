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
        description: "Care operations & compliance platform",
      },
      {
        name: "SognosRoster",
        href: "/products/sognosroster",
        description: "Workforce scheduling & optimisation engine",
      },
    ],
  },
  {
    label: "Platform",
    href: "/platform",
    items: [
      {
        name: "Dynamics 365",
        href: "/platform/dynamics-365",
        description: "Core infrastructure powering Sognos",
      },
      {
        name: "Copilot AI",
        href: "/platform/copilot-ai",
        description: "AI-assisted operations and insights",
      },
      {
        name: "Power Platform",
        href: "/platform/power-platform",
        description: "Automation and low-code extensibility",
      },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
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
      {
        name: "About",
        href: "/company/about",
      },
      {
        name: "Careers",
        href: "/company/careers",
      },
    ],
  },
];

export const navCTA = {
  secondary: { name: "Contact Sales", href: "/contact" },
  primary: { name: "Book Assessment", href: "/contact" },
};
