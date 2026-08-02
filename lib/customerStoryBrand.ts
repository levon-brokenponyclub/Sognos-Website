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

// Story videos, keyed by slug. Where one exists it takes the hero panel in
// place of the client logo; a story without one keeps the logo, so this can be
// filled in a client at a time. Same hand-kept shape as BRAND_BG above, and
// the same reason for living here rather than in a "use client" module.
export const STORY_VIDEO: Record<string, string> = {
  "natural-power-solutions": "/videos/NPS-Customer-Story.mp4",
};
