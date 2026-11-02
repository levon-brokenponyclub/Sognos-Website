import GenogramFeatureVisual, {
  GenogramVisualsProvider,
} from "@/components/layout/sections/sognosgenogram/FeatureVisuals";
import ProductFeaturesScroll, {
  type ScrollFeature,
} from "@/components/layout/sections/ProductFeaturesScroll";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    id: "genogram-builder",
    name: "Interactive genogram builder",
    description:
      "Create structured family and relationship maps directly within a case record using standard clinical genogram notation — without leaving the platform.",
  },
  {
    id: "support-network",
    name: "Support network mapping",
    description:
      "Identify formal and informal supports, map relationship nature (supportive, strained, absent), and flag who is actively involved in the client's life.",
  },
  {
    id: "risk-tagging",
    name: "Risk and protective factor tagging",
    description:
      "Tag relationships with clinical context — who provides stability, who presents risk, and which connections need monitoring or intervention.",
  },
  {
    id: "case-record",
    name: "Embedded in the case record",
    description:
      "Genograms are part of the case record, not a separate attachment. Every worker on the case sees the same relationship picture, in context, when they need it.",
  },
  {
    id: "historical-snapshots",
    name: "Historical snapshots",
    description:
      "Capture how a client's network changes over time. Compare relationship maps across different periods to understand how circumstances have evolved.",
  },
  {
    id: "copilot-narrative",
    name: "Copilot AI narrative",
    description:
      "Generate a plain-language summary of the family and support picture from the genogram data — ready to include in reports, referrals, or handover notes.",
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

// Products Inspector export: Features C cards with the eyebrow (tagline) off.
export default function GenogramFeatures() {
  const scrollFeatures: ScrollFeature[] = FEATURES.map((f, i) => ({
    id: f.id,
    name: f.name,
    description: f.description,
    visual: <GenogramFeatureVisual id={f.id} index={i} />,
  }));

  return (
    <GenogramVisualsProvider>
      <ProductFeaturesScroll
        header={{
          eyebrow: "Features",
          heading: "Everything you need to map relationships that matter",
        }}
        features={scrollFeatures}
        accentBorderClass="border-sognos-genogram-ink"
        accentTextClass="text-sognos-genogram-ink"
        enableVisuals
        variant="cards"
        alternate
        cardClass="bg-sognos-tint"
        markerClass="bg-sognos-genogram-base"
        stickyOffset="sectionBar"
      />
    </GenogramVisualsProvider>
  );
}
