import {
  DEFAULT_LOGOS,
  LOGO_STRIP_LOGO_LIMIT,
} from "@/lib/content/logoStrip";
import { MICROSOFT_PLATFORM_LOGOS } from "@/lib/constants";

export type CtaStatVariant = "light" | "dark" | "blue";

export type CtaSectionContent = {
  bookDemoHeading: string;
  bookDemoDescription: string;
  logoBlockHeading: string;
  logos: { src: string; alt: string }[];
  trustLogos: { src: string; alt: string }[];
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
  logos: [...MICROSOFT_PLATFORM_LOGOS],
  trustLogos: DEFAULT_LOGOS.slice(0, LOGO_STRIP_LOGO_LIMIT),
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
    bgClass: "bg-sognos-navy",
    textClass: "text-white",
    labelClass: "text-[#8E9EBB]",
  },
  blue: {
    bgClass: "bg-sognos-blue-accent",
    textClass: "text-white",
    labelClass: "text-blue-100",
  },
};
