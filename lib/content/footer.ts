import { INDUSTRIES, PRODUCTS, SITE, SOLUTIONS } from "@/lib/constants";

export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };
export type FooterPlatformLogo = { src: string; alt: string };

export type FooterContent = {
  brandLogo: string;
  brandLogoAlt: string;
  tagline: string;
  platformLogos: FooterPlatformLogo[];
  columns: FooterColumn[];
  acknowledgement: string;
  copyrightSuffix: string;
  legalLinks: FooterLink[];
};

export const COMPANY_FOOTER_LINKS: FooterLink[] = [
  { label: "About", href: "/company/about" },
  { label: "Social Responsibility", href: "/company/social-responsibility" },
  { label: "Knowledge Hub", href: "/knowledge-hub" },
  { label: "News", href: "/news" },
  { label: "Events", href: "/events/nfp-real-care" },
  { label: "Customer Stories", href: "/customer-stories" },
  { label: "Careers", href: "/company/careers" },
  { label: "Contact", href: "/contact" },
];

export const DEFAULT_FOOTER_CONTENT: FooterContent = {
  brandLogo: "/logos/sognos-logo.svg",
  brandLogoAlt: SITE.name,
  tagline: SITE.tagline,
  platformLogos: [
    { src: "/logos/Microsoft-icon-logo.svg", alt: "Microsoft" },
    { src: "/logos/Dynamics365.svg", alt: "Dynamics 365" },
    { src: "/logos/copilot-logo.svg", alt: "Microsoft Copilot" },
  ],
  columns: [
    {
      title: "Products",
      links: [
        { label: PRODUCTS.care.name, href: PRODUCTS.care.href },
        { label: PRODUCTS.roster.name, href: PRODUCTS.roster.href },
        { label: PRODUCTS.genogram.name, href: PRODUCTS.genogram.href },
      ],
    },
    {
      title: "Solutions",
      links: SOLUTIONS.map((s) => ({ label: s.name, href: s.href })),
    },
    {
      title: "Industries",
      links: INDUSTRIES.map((i) => ({ label: i.name, href: i.href })),
    },
    {
      title: "Company",
      links: COMPANY_FOOTER_LINKS,
    },
  ],
  acknowledgement:
    "We respect and honour Aboriginal and Torres Strait Islander Elders past, present, and future. We acknowledge the stories, traditions, and living cultures of Aboriginal and Torres Strait Islander peoples on the lands upon which we work and live, and commit to building a brighter future together.",
  copyrightSuffix: "All rights reserved",
  legalLinks: [
    { label: "Privacy Policy", href: "/company/privacy-policy" },
    {
      label: "Privacy Collection Notice",
      href: "/company/privacy-collection-notice",
    },
    { label: "ISMS Policy", href: "/company/isms-policy" },
  ],
};
