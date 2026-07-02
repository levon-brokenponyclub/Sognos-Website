import FeaturePlaceholderImage from "@/components/sections/FeaturePlaceholderImage";
import ProductFeaturesScroll, {
  type ScrollFeature,
} from "@/components/sections/ProductFeaturesScroll";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    id: "genogram-builder",
    name: "Interactive genogram builder",
    tagline: "Clinical notation, built in",
    description:
      "Create structured family and relationship maps directly within a case record using standard clinical genogram notation — without leaving the platform.",
  },
  {
    id: "support-network",
    name: "Support network mapping",
    tagline: "See the full picture",
    description:
      "Identify formal and informal supports, map relationship nature (supportive, strained, absent), and flag who is actively involved in the client's life.",
  },
  {
    id: "risk-tagging",
    name: "Risk and protective factor tagging",
    tagline: "Context where it's needed",
    description:
      "Tag relationships with clinical context — who provides stability, who presents risk, and which connections need monitoring or intervention.",
  },
  {
    id: "case-record",
    name: "Embedded in the case record",
    tagline: "No separate attachment",
    description:
      "Genograms are part of the case record, not a separate attachment. Every worker on the case sees the same relationship picture, in context, when they need it.",
  },
  {
    id: "historical-snapshots",
    name: "Historical snapshots",
    tagline: "Track change over time",
    description:
      "Capture how a client's network changes over time. Compare relationship maps across different periods to understand how circumstances have evolved.",
  },
  {
    id: "copilot-narrative",
    name: "Copilot AI narrative",
    tagline: "Plain language from structured data",
    description:
      "Generate a plain-language summary of the family and support picture from the genogram data — ready to include in reports, referrals, or handover notes.",
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function GenogramFeatures() {
  const scrollFeatures: ScrollFeature[] = FEATURES.map((f, i) => ({
    id: f.id,
    name: f.name,
    tagline: f.tagline,
    description: f.description,
    visual: <FeaturePlaceholderImage index={i} />,
  }));

  return (
    <ProductFeaturesScroll
      header={{
        eyebrow: "Features",
        heading: "Everything you need to map relationships that matter",
      }}
      features={scrollFeatures}
      accentBorderClass="border-sognos-genogram-base"
      accentTextClass="text-sognos-genogram-base"
      enableVisuals
    />
  );
}
