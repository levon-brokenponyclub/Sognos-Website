import ProductProblemSplit, {
  type ProblemItem,
} from "@/components/layout/sections/product/ProductProblemSplit";

const CAPABILITIES: readonly ProblemItem[] = [
  {
    number: "01",
    title: "Unified Care Records",
    description:
      "Referrals, assessments, care plans, incidents, service agreements and progress notes in one system.",
  },
  {
    number: "02",
    title: "Built-In Compliance",
    description:
      "Audit trails, funding controls and evidence captured automatically as work happens.",
  },
  {
    number: "03",
    title: "Connected Workforce",
    description:
      "SognosCare and SognosRoster share the same data layer across visits, plans and participant history.",
  },
  {
    number: "04",
    title: "Real-Time Reporting",
    description:
      "Operational, workforce, compliance and funding reports generated continuously, not manually assembled.",
  },
];

export default function SognoscareProblems() {
  return (
    <ProductProblemSplit
      product="care"
      statement="Care providers shouldn't operate like this."
      detail="Fragmented systems, manual compliance, disconnected workforce data, and spreadsheet-driven reporting have become accepted as normal. Every disconnected workflow creates more administration, more risk, and less time for delivering care."
      solutionStatement="Sognos unifies demand, workforce and outcomes on a single operational platform."
      items={CAPABILITIES}
    />
  );
}
