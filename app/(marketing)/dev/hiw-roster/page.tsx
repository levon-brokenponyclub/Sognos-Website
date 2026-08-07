import type { Metadata } from "next";
import HowSognosWorksRoster from "@/components/layout/sections/HowSognosWorksRoster";

// Throwaway preview route for the C2 (Coordinate Workforce) storyboard
// scaffold. Nothing links here and it is noindex'd. Delete this directory
// once the panel is signed off (or dropped) — it is not a page.
export const metadata: Metadata = {
  title: "HIW Roster panel — scaffold",
  robots: { index: false, follow: false },
};

export default function HIWRosterPreview() {
  return (
    <main className="min-h-screen bg-sognos-tint">
      <div className="mx-auto w-full max-w-7xl px-6 pt-32 pb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-sognos-muted">
          Preview &middot; not linked, not indexed
        </p>
        <h1 className="mt-3 font-heading text-3xl font-light tracking-tight text-sognos-heading">
          How Sognos Works &mdash; Coordinate Workforce (scaffold)
        </h1>
        <p className="mt-2 max-w-2xl text-base text-sognos-body">
          8s auto-loop. Three worker-to-visit matches cascade with an AI
          suggestion bubble (chat aesthetic through-line), rail-fill
          connector, travelling dot, and status pills. Coverage bar rolls
          up as matches complete. Reduced motion renders the final matched
          frame with no loop.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <HowSognosWorksRoster />
      </div>
    </main>
  );
}
