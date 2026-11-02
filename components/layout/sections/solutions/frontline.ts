// Frontline-only content for the solution template (hero tagline +
// platform card copy). Server-safe: no client code, so page.tsx can branch on
// it. The matching motion graphics live in FrontlineVisuals.tsx (same order).

export const FRONTLINE_SLUG = "frontline";

// Hero tagline (Editorial hero right column + photo band).
export const FRONTLINE_HERO_HEADING = "Field service, connected";

export const FRONTLINE_PLATFORM_CARDS = [
  {
    logo: "/logos/Dynamics365.svg",
    title: "Dynamics 365 Field Service",
    body: "Built on Microsoft Dynamics 365 Field Service.",
  },
  {
    logo: "/logos/copilot-logo.svg",
    title: "Copilot AI",
    body: "Copilot AI for intelligent scheduling.",
  },
  {
    logo: "/logos/platform/PowerAutomate_scalable.svg",
    title: "Power Platform",
    body: "Power Platform for workflow automation and reporting.",
  },
] as const;

// Other solutions reuse the Frontline platform graphics as placeholders: the
// first card names the solution's own platform, the Copilot line is neutral.
export function platformCards(slug: string, label: string) {
  const [d365, copilot, power] = FRONTLINE_PLATFORM_CARDS;
  if (slug === FRONTLINE_SLUG) return [d365, copilot, power];
  return [
    { ...d365, title: label, body: `Built on Microsoft ${label}.` },
    { ...copilot, body: "Copilot AI built into everyday work." },
    power,
  ];
}
