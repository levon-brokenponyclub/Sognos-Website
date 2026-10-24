// Neutral stand-in for product-feature visuals until real SognosCare /
// SognosRoster / SognosGenogram screens exist. (The previous
// /product/feature-0X.webp files were another company's product UI and were
// removed 2026-10-24.) Alternates surface so stacked cards stay distinct.
export default function FeaturePlaceholderImage({ index }: { index: number }) {
  return (
    <div
      aria-hidden="true"
      className={`h-full min-h-[280px] w-full rounded border border-sognos-line ${
        index % 2 === 0 ? "bg-white" : "bg-sognos-tint"
      }`}
    />
  );
}
