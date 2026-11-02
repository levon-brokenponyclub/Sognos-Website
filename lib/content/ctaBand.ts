// Default copy for the site-wide CTA band (rendered inside the footer).
// Kept out of the component so CTABand stays copy-free.
export const CTA_BAND_DEFAULTS = {
  heading: "Transform the way you work",
  subheading:
    "Discover how one intelligent platform helps you simplify operations, empower your workforce, and make faster, data-driven decisions.",
  ctaLabel: "Book a Demo",
  secondary: { label: "Talk to Sales", href: "/contact" },
} as const;
