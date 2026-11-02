import ProductProblemSplit, {
  type ProblemItem,
} from "@/components/layout/sections/product/ProductProblemSplit";

const PROBLEMS: readonly ProblemItem[] = [
  {
    number: "01",
    title: "Manual rostering",
    description:
      "Workforce managers spend weeks each month juggling spreadsheets, phone calls, availability and last-minute changes.",
  },
  {
    number: "02",
    title: "Compliance risk",
    description:
      "Skills, qualifications, certifications and client-specific requirements are checked manually at scale.",
  },
  {
    number: "03",
    title: "Disconnected workforce data",
    description:
      "Rostering runs separately from care management, forcing coordinators to reconcile visits, plans and records by hand.",
  },
];

export default function SognoscareRosterProblems() {
  return (
    <ProductProblemSplit
      product="roster"
      statement="Workforce scheduling shouldn't work like this."
      detail="Manual rostering, compliance risks, real-time disruptions and disconnected data are still the default for most service operations."
      items={PROBLEMS}
    />
  );
}
