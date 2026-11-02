import ProductProblemSplit, {
  type ProblemItem,
} from "@/components/layout/sections/product/ProductProblemSplit";

const PAIN_POINTS: readonly ProblemItem[] = [
  {
    number: "01",
    title: "Missing relationship context",
    description:
      "Workers arrive with case facts but no understanding of who is in the client's life, who provides support, and who creates risk. That gap affects every decision they make.",
  },
  {
    number: "02",
    title: "Disconnected family picture",
    description:
      "Information about family dynamics lives in handwritten notes, old files, and people's memory - not in the system where it can inform active service decisions.",
  },
  {
    number: "03",
    title: "Context lost between workers",
    description:
      "When cases change hands, the relational picture doesn't transfer. New workers start from zero, ask the same questions, and miss things the previous worker knew.",
  },
];

export default function GenogramProblems() {
  return (
    <ProductProblemSplit
      product="genogram"
      statement="Case records have facts. They're missing people."
      detail="Standard case management captures what happened. SognosGenogram captures who is involved — and what those relationships mean for service delivery."
      items={PAIN_POINTS}
    />
  );
}
