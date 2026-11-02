import ProductAdvantagesIndex from "@/components/layout/sections/product/ProductAdvantagesIndex";

// From the Products Inspector mockup (2026-10-26): derived from the live
// page's problems, features and integration copy. The heading is a
// suggestion; the intro is the live Integration heading.
const HEADER = {
  heading: "Why practitioners choose SognosGenogram",
  intro: "Context that lives inside the case, not beside it.",
};

const ADVANTAGES = [
  "Relationship maps sit inside the case record - no separate system, attachment or version mismatch",
  "Standard clinical genogram notation, built directly in the platform",
  "Formal and informal supports mapped, including the nature of each relationship",
  "Risk and protective factors tagged where workers make decisions",
  "The relationship picture carries over when cases change hands - no starting from zero",
  "Copilot AI turns the genogram into plain-language summaries for reports, referrals and handovers",
];

export default function GenogramAdvantages() {
  return (
    <ProductAdvantagesIndex product="genogram" header={HEADER} advantages={ADVANTAGES} />
  );
}
