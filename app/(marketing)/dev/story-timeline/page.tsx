import type { Metadata } from "next";
import AboutStoryTimeline from "@/components/layout/sections/AboutStoryTimeline";
import AboutLeadershipEditorial from "@/components/layout/sections/AboutLeadershipEditorial";

// Throwaway preview route for reviewing About-page section scaffolds before
// they are wired into /company/about. Nothing links here and it is
// noindex'd. Delete this directory once each scaffold is signed off (or
// dropped) — it is not a page.
export const metadata: Metadata = {
  title: "About page scaffolds",
  robots: { index: false, follow: false },
};

export default function AboutScaffoldsPreview() {
  return (
    <main className="bg-white">
      {/* Preview header */}
      <div className="mx-auto w-full max-w-7xl px-6 pt-32 pb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-sognos-muted">
          Preview &middot; not linked, not indexed
        </p>
        <h1 className="mt-3 font-heading text-3xl font-light tracking-tight text-sognos-heading">
          About page &mdash; section scaffolds
        </h1>
        <p className="mt-2 max-w-2xl text-base text-sognos-body">
          Two production candidates for review. Content is mocked &mdash;
          confirm real copy with Kunal / Rick before Pass.
        </p>
      </div>

      {/* Scaffold 1 — Story timeline */}
      <div className="mx-auto w-full max-w-7xl px-6 pt-10 pb-2">
        <p className="font-heading text-lg font-medium tracking-tight text-sognos-heading">
          &sect; 1 &nbsp;&mdash;&nbsp; Our Story timeline
        </p>
        <p className="mt-1 max-w-2xl text-sm text-sognos-body">
          Four editorial waypoints, per-item rail-fill on scroll, soft
          beacon pulse on the &ldquo;today&rdquo; entry.
        </p>
      </div>
      <AboutStoryTimeline />

      {/* Divider between scaffolds — hairline, no chrome */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="border-t border-sognos-line" />
      </div>

      {/* Scaffold 2 — Leadership editorial */}
      <div className="mx-auto w-full max-w-7xl px-6 pt-16 pb-2">
        <p className="font-heading text-lg font-medium tracking-tight text-sognos-heading">
          &sect; 2 &nbsp;&mdash;&nbsp; Leadership (editorial spread)
        </p>
        <p className="mt-1 max-w-2xl text-sm text-sognos-body">
          Magazine-style alternating rows, huge muted index numeral per
          leader, display-face signature line hung off a blue accent bar,
          meta chips, existing action-row language.
        </p>
      </div>
      <AboutLeadershipEditorial />
    </main>
  );
}
