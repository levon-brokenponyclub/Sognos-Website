// Frontline-only content for the solution template (illustrative overlay +
// platform card copy). Server-safe: no client code, so page.tsx can branch on
// it. The matching motion graphics live in FrontlineVisuals.tsx (same order).

export const FRONTLINE_SLUG = "frontline";

export const FRONTLINE_HERO_OVERLAY = {
  title: "Job dispatched",
  ref: "#4821",
  meta: "J. Kelly · ETA 22 min",
  status: "SLA on track",
};

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

// Related solutions with a mini graphic (RelatedGraphic); others fall back to
// their hero image.
export const RELATED_GRAPHIC_SLUGS = new Set([
  "customer-relationship-management",
  "customer-service",
  "power-platform",
]);
