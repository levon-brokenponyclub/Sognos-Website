import type { Metadata } from "next";
import BentoGrid from "@/components/layout/sections/BentoGrid";
import { getHomeFeed } from "@/lib/sanity/queries";

// Throwaway preview route for reviewing the bento grid before anything is
// wired into the homepage. Nothing links here and it is noindex'd. Delete this
// directory once the layout is signed off — it is not a page.
export const metadata: Metadata = {
  title: "Bento grid preview",
  robots: { index: false, follow: false },
};

// No caching: this exists to be looked at while the layout is being changed,
// and a cached route payload just serves the previous version of the grid.
export const dynamic = "force-dynamic";

export default async function BentoPreviewPage() {
  const feed = await getHomeFeed();
  const events = feed.filter((i) => i.kind === "event");

  return (
    <main className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 pt-32 pb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-sognos-muted">
          Preview · not linked, not indexed
        </p>
        <h1 className="mt-3 font-heading text-3xl font-light tracking-tight text-sognos-heading">
          Bento grid
        </h1>
        <p className="mt-2 text-base text-sognos-body">
          {feed.length} items from Sanity — {events.length} upcoming{" "}
          {events.length === 1 ? "event" : "events"}, then stories and posts
          newest first. All real data.
        </p>
      </div>
      <BentoGrid items={feed} />
    </main>
  );
}
