import ProductAdvantagesIndex from "@/components/layout/sections/product/ProductAdvantagesIndex";

const HEADER = {
  heading: "Why operations teams choose SognosRoster",
  intro:
    "Built for the scheduling complexity of real-world service operations — not adapted from a generic workforce tool.",
};

const ADVANTAGES = [
  "Demand-driven rostering that matches workers to services automatically",
  "Skills, certifications, and compliance requirements checked at every allocation",
  "Real-time reoptimisation when disruptions hit — not after the fact",
  "Connects directly to SognosCare so care and workforce data share one layer",
  "Scales from small teams to enterprise-wide multi-site operations",
  "Mobile-first worker app with instant schedule updates and job details",
];

export default function SognoscareRosterAdvantages() {
  return (
    <ProductAdvantagesIndex product="roster" header={HEADER} advantages={ADVANTAGES} />
  );
}
