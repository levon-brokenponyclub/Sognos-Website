// Per-client brand background colours (keyed by company name), shared by the
// ProductCustomerStories slider (client) and the customer-story detail page
// (server). Kept in a plain module — importing a value from a "use client"
// file into a Server Component yields a client reference, not the object.
// Companies not listed fall back to their default treatment.
export const BRAND_BG: Record<string, string> = {
  "Flourish Australia": "#0096a9",
  "Auckland Airport": "#151c6b",
  "Penrith City Council": "#f26522",
  "Gentari Solar Australia": "#60269e",
};

// House accent, for a client with neither a Sanity `brandColor` nor an entry
// above — an unlisted client still gets a deliberate panel rather than a flat
// block.
export const BRAND_FALLBACK = "#1d96fc";

// The brand panel's fill: a hot spot up and left in the client's colour,
// falling to navy at the far corner. Used by the customer-story detail hero
// and by the slider on the homepage and product pages, so the two cannot
// drift — it was previously the same literal written out in both.
export function brandPanelGradient(brandColor: string) {
  return `radial-gradient(circle at 25% 20%, color-mix(in oklab, ${brandColor} 65%, white) 0%, ${brandColor} 40%, var(--sognos-navy-dark) 100%)`;
}

// Story videos, keyed by slug. Where one exists it takes the hero panel in
// place of the client logo; a story without one keeps the logo, so this can be
// filled in a client at a time. Same hand-kept shape as BRAND_BG above, and
// the same reason for living here rather than in a "use client" module.
export const STORY_VIDEO: Record<string, string> = {
  "natural-power-solutions": "/videos/NPS-Customer-Story.mp4",
};

export type StoryStat = { value: string; label: string };

// Closing stats, keyed by slug. Sanity carries no stat data for these stories,
// so they live here until it does — delete a slug's entry the moment the CMS
// can supply it and the block falls back to nothing rather than to stale copy.
//
// Every figure below is taken from the published story or its sidebar; none is
// derived from a claim the source doesn't make. Where a client has no outcome
// figure the cells carry verified scale instead, which is honest about what it
// is — the alternative was inventing savings, and a fabricated percentage in
// front of a client is worse than a modest true one.
export const STORY_STATS: Record<string, StoryStat[]> = {
  "flourish-australia": [
    { value: "1,100+", label: "Users on a single platform" },
    { value: "7", label: "Dynamics 365 applications deployed" },
  ],
  "auckland-airport": [
    { value: "100%", label: "User adoption at go-live" },
    { value: "On time", label: "Delivered on time and on budget" },
  ],
  gentari: [
    { value: "10,000", label: "Assets under management" },
    { value: "1", label: "Platform across the asset base" },
  ],
  neca: [
    { value: "6,000", label: "Member businesses supported" },
    { value: "1", label: "Single source of truth" },
  ],
};

// A story with no entry renders no stat block at all. That is the Decent case
// from the reference set: the section closes up rather than degrading, so an
// empty row never reaches the page.
export function storyStats(slug: string): StoryStat[] {
  return STORY_STATS[slug] ?? [];
}
