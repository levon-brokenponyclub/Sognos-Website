"use client";

import ProductFeaturesScroll, {
  type ScrollFeature,
} from "@/components/sections/ProductFeaturesScroll";

// ─── Feature visuals ──────────────────────────────────────────────────────────

function FeatureVisual({ id }: { id: string }) {
  const visuals: Record<string, React.ReactNode> = {
    "genogram-builder": (
      <div className="space-y-3">
        {/* Simple family tree mock */}
        <div className="flex justify-center gap-8 pb-2">
          {[
            { label: "G. Thompson", role: "Grandfather" },
            { label: "M. Thompson", role: "Grandmother" },
          ].map((p) => (
            <div key={p.label} className="flex flex-col items-center gap-1">
              <div className="h-10 w-10 rounded-full border-2 border-sognos-genogram-base/40 bg-sognos-genogram-base/10 flex items-center justify-center text-xs font-bold text-sognos-genogram-base">
                {p.label.charAt(0)}
              </div>
              <span className="text-[10px] text-gray-500 font-medium">
                {p.role}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <div className="h-6 w-px bg-gray-200" />
        </div>
        <div className="flex justify-center gap-12">
          {[
            { label: "J. Thompson", role: "Parent", shape: "square" },
            { label: "L. Morris", role: "Parent", shape: "circle" },
          ].map((p) => (
            <div key={p.label} className="flex flex-col items-center gap-1">
              <div
                className={`h-10 w-10 border-2 border-sognos-genogram-base/40 bg-sognos-genogram-base/10 flex items-center justify-center text-xs font-bold text-sognos-genogram-base ${
                  p.shape === "square" ? "rounded-sm" : "rounded-full"
                }`}
              >
                {p.label.charAt(0)}
              </div>
              <span className="text-[10px] text-gray-500 font-medium">
                {p.role}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <div className="h-6 w-px bg-gray-200" />
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-1">
            <div className="h-10 w-10 rounded-sm border-2 border-sognos-genogram-base bg-sognos-genogram-base/15 flex items-center justify-center text-xs font-bold text-sognos-genogram-base">
              A
            </div>
            <span className="text-[10px] text-gray-500 font-medium">
              Client
            </span>
          </div>
        </div>
      </div>
    ),
    "support-network": (
      <div className="space-y-2">
        {[
          { name: "James Thompson", relation: "Father", nature: "Supportive" },
          { name: "Karen Morris", relation: "Aunt", nature: "Supportive" },
          { name: "T. Nguyen", relation: "Case worker", nature: "Formal" },
          { name: "D. Thompson", relation: "Brother", nature: "Strained" },
        ].map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-3"
          >
            <div>
              <p className="text-xs font-semibold text-sognos-body">
                {item.name}
              </p>
              <p className="text-[10px] text-gray-400">{item.relation}</p>
            </div>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                item.nature === "Supportive"
                  ? "bg-emerald-50 text-emerald-700"
                  : item.nature === "Formal"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-amber-50 text-amber-700"
              }`}
            >
              {item.nature}
            </span>
          </div>
        ))}
      </div>
    ),
    "risk-tagging": (
      <div className="space-y-2">
        {[
          { label: "D. Thompson (Brother)", tag: "Monitor", color: "amber" },
          { label: "Karen Morris (Aunt)", tag: "Protective", color: "emerald" },
          { label: "R. Thompson (Ex-partner)", tag: "Risk", color: "rose" },
          { label: "James T. (Father)", tag: "Protective", color: "emerald" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-3"
          >
            <span className="text-xs font-medium text-sognos-body">
              {item.label}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                item.color === "emerald"
                  ? "bg-emerald-50 text-emerald-700"
                  : item.color === "amber"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-rose-50 text-rose-700"
              }`}
            >
              {item.tag}
            </span>
          </div>
        ))}
      </div>
    ),
    "case-record": (
      <div className="rounded-lg border border-gray-100 bg-white overflow-hidden">
        <div className="bg-sognos-genogram-base/8 px-4 py-3 border-b border-gray-100">
          <p className="text-xs font-semibold text-sognos-body">
            Alex Thompson — Case #0047
          </p>
          <p className="text-[10px] text-gray-400">Last updated 2 hours ago</p>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { label: "Goals", value: "3 active" },
            { label: "Services", value: "Support at Home" },
            { label: "Genogram", value: "Mapped — 8 relationships" },
            { label: "Next review", value: "14 Jul 2026" },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between px-4 py-2.5"
            >
              <span className="text-[11px] text-gray-400">{row.label}</span>
              <span
                className={`text-[11px] font-semibold ${
                  row.label === "Genogram"
                    ? "text-sognos-genogram-base"
                    : "text-sognos-body"
                }`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    "historical-snapshots": (
      <div className="space-y-3">
        {[
          {
            date: "Mar 2024",
            summary: "6 relationships. High-risk flag on ex-partner.",
          },
          {
            date: "Sep 2024",
            summary: "8 relationships. Aunt added as protective contact.",
          },
          {
            date: "Mar 2025",
            summary: "9 relationships. Ex-partner contact removed.",
          },
        ].map((snap, i) => (
          <div
            key={snap.date}
            className={`rounded-lg border px-4 py-3 ${
              i === 2
                ? "border-sognos-genogram-base/30 bg-sognos-genogram-base/5"
                : "border-gray-100 bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-sognos-body">
                {snap.date}
              </span>
              {i === 2 && (
                <span className="text-[10px] font-semibold text-sognos-genogram-base uppercase tracking-wider">
                  Current
                </span>
              )}
            </div>
            <p className="text-[11px] leading-relaxed text-gray-500">
              {snap.summary}
            </p>
          </div>
        ))}
      </div>
    ),
    "copilot-narrative": (
      <div className="rounded-lg border border-gray-100 bg-white p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-sognos-genogram-base/20 px-3 py-1 text-xs font-medium text-sognos-genogram-base">
            <span className="w-1.5 h-1.5 bg-sognos-genogram-base rounded-full" />
            Copilot summary
          </div>
        </div>
        <p className="text-sm font-medium leading-relaxed text-sognos-body">
          Alex has a moderately complex family network with 9 mapped
          relationships. Two protective contacts are actively involved. The
          previous high-risk connection has been resolved.
        </p>
        <div className="mt-4 flex gap-2">
          <button className="rounded-md bg-sognos-genogram-base px-4 py-1.5 text-xs font-bold text-white">
            Add to report
          </button>
          <button className="rounded-md border border-gray-200 px-4 py-1.5 text-xs font-bold text-gray-500">
            Edit
          </button>
        </div>
      </div>
    ),
  };

  return visuals[id] ?? null;
}

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
  const scrollFeatures: ScrollFeature[] = FEATURES.map((f) => ({
    id: f.id,
    name: f.name,
    tagline: f.tagline,
    description: f.description,
    visual: <FeatureVisual id={f.id} />,
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
    />
  );
}
