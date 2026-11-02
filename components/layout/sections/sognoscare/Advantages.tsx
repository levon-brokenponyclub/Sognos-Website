import ProductAdvantagesIndex, {
  type AdvantagesHeader,
} from "@/components/layout/sections/product/ProductAdvantagesIndex";

interface SognoscareAdvantagesProps {
  header?: AdvantagesHeader;
  advantages?: readonly string[];
}

const DEFAULT_HEADER: AdvantagesHeader = {
  heading: "Why care providers choose SognosCare",
  intro:
    "Built for the regulatory reality of Australian care — not adapted from a generic CRM.",
};

const DEFAULT_ADVANTAGES = [
  "Purpose-built for Australian care compliance - not adapted from generic CRM",
  "Reduces documentation time with AI-assisted clinical notes",
  "Keeps you audit-ready with continuous compliance tracking",
  "Integrates with Microsoft 365, Teams, and Dynamics 365 out of the box",
  "Connects care management, workforce rostering, and billing in one system",
  "Scales from community care to residential aged care without re-implementation",
];

export default function SognoscareAdvantages({
  header = DEFAULT_HEADER,
  advantages = DEFAULT_ADVANTAGES,
}: SognoscareAdvantagesProps = {}) {
  return (
    <ProductAdvantagesIndex
      product="care"
      header={header}
      advantages={advantages.length > 0 ? advantages : DEFAULT_ADVANTAGES}
    />
  );
}
