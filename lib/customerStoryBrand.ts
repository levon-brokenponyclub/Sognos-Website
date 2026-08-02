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
