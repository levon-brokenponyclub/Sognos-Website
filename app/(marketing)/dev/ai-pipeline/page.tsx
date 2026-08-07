import type { Metadata } from "next";
import EnterpriseAIPipeline from "@/components/ui/ai-agent-pipeline";
import SognosPipeline from "@/components/ui/sognos-pipeline";

// Throwaway preview route for the AI pipeline components. Nothing links
// here and it is noindex'd. Delete this directory once a version is
// signed off (or dropped) — it is not a page.
export const metadata: Metadata = {
  title: "AI Agent Pipeline — preview",
  robots: { index: false, follow: false },
};

export default function AIPipelinePreview() {
  return (
    <main className="bg-white">
      {/* Preview header */}
      <div className="mx-auto w-full max-w-7xl px-6 pt-32 pb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-sognos-muted">
          Preview &middot; not linked, not indexed
        </p>
        <h1 className="mt-3 font-heading text-3xl font-light tracking-tight text-sognos-heading">
          AI Agent Pipeline &mdash; two versions
        </h1>
        <p className="mt-2 max-w-2xl text-base text-sognos-body">
          Original 21st.dev import above, Sognos-refined version below.
          Same mechanic; retokened palette, AngelList type, and a flow
          that maps the actual product architecture (Intake &rarr;
          Dynamics 365 &rarr; Copilot &rarr; Care / Roster / Genogram).
        </p>
      </div>

      {/* Section 1 — Original 21st.dev component (unchanged) */}
      <div className="mx-auto w-full max-w-7xl px-6 pt-10 pb-3">
        <p className="font-heading text-lg font-medium tracking-tight text-sognos-heading">
          &sect; 1 &nbsp;&mdash;&nbsp; Original (21st.dev import)
        </p>
        <p className="mt-1 max-w-2xl text-sm text-sognos-body">
          As imported from the marketplace. Generic AI agent pipeline
          with Claude &middot; Pinecone framing.
        </p>
      </div>
      <div className="flex min-h-[400px] w-full items-center justify-center bg-black px-6 py-16">
        <EnterpriseAIPipeline />
      </div>

      {/* Divider */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="border-t border-sognos-line" />
      </div>

      {/* Section 2 — Sognos-refined */}
      <div className="mx-auto w-full max-w-7xl px-6 pt-16 pb-3">
        <p className="font-heading text-lg font-medium tracking-tight text-sognos-heading">
          &sect; 2 &nbsp;&mdash;&nbsp; Sognos-refined
        </p>
        <p className="mt-1 max-w-2xl text-sm text-sognos-body">
          Sognos tokens throughout (navy-darkest surface, blue-accent
          connectors), AngelList type, three product outputs each in
          their own brand colour (Care blue &middot; Roster light-blue
          &middot; Genogram purple), realistic referral-flow message
          feed, referral counter rolling in real time.
        </p>
      </div>
      <div className="flex min-h-[400px] w-full items-center justify-center bg-sognos-navy-darkest px-6 py-16">
        <SognosPipeline />
      </div>
    </main>
  );
}
