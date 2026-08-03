export type CtaStatVariant = "light" | "dark" | "blue";

export type CtaSectionContent = {
  bookDemoHeading: string;
  bookDemoDescription: string;
  logoBlockHeading: string;
  logos: { src: string; alt: string }[];
  stats: {
    numericValue: number;
    suffix: string;
    label: string;
    variant: CtaStatVariant;
  }[];
};

export const DEFAULT_CTA_CONTENT: CtaSectionContent = {
  bookDemoHeading: "Book a Demo",
  bookDemoDescription:
    "Schedule a 45-minute call to see how Sognos can unify your operations and boost efficiency.",
  logoBlockHeading: "Powered by Microsoft",
  logos: [
    { src: "/logos/Dynamics365.svg", alt: "Dynamics 365" },
    { src: "/logos/copilot-logo.svg", alt: "Microsoft Copilot" },
    { src: "/logos/platform/PowerBI_scalable.svg", alt: "Power BI" },
    { src: "/logos/platform/PowerAutomate_scalable.svg", alt: "Power Automate" },
    { src: "/logos/platform/PowerApps_scalable.svg", alt: "Power Apps" },
    { src: "/logos/platform/PowerPages_scalable.svg", alt: "Power Pages" },
    { src: "/logos/platform/Dataverse_scalable.svg", alt: "Dataverse" },
  ],
  stats: [
    {
      numericValue: 3,
      suffix: "×",
      label: "Faster Compliance Reporting",
      variant: "light",
    },
    {
      numericValue: 99,
      suffix: "%",
      label: "Quality Standard Compliance",
      variant: "dark",
    },
  ],
};

export const CTA_VARIANT_STYLES: Record<
  CtaStatVariant,
  { bgClass: string; textClass: string; labelClass: string }
> = {
  light: {
    bgClass: "bg-white",
    textClass: "text-[#0A1629]",
    labelClass: "text-neutral-500",
  },
  dark: {
    bgClass: "bg-prussian-blue-800",
    textClass: "text-white",
    labelClass: "text-[#8E9EBB]",
  },
  blue: {
    bgClass: "bg-[#1D96FC]",
    textClass: "text-white",
    labelClass: "text-blue-100",
  },
};
