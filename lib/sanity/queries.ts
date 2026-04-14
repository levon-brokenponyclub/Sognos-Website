import { client } from "./client";

// ─── SognosCare ───────────────────────────────────────────────────────────────

const SOGNOSCARE_PAGE_QUERY = `*[_type == "sognoscarePage"][0]{
  hero,
  problems,
  features,
  editions,
  advantages,
  stats,
  testimonials,
  stories
}`;

export async function getSognoscarePageContent() {
  return client.fetch(SOGNOSCARE_PAGE_QUERY, {}, { next: { revalidate: 60 } });
}

// ─── SognosRoster ─────────────────────────────────────────────────────────────

const SOGNOSROSTER_PAGE_QUERY = `*[_type == "sognosrosterPage"][0]{
  hero,
  problems,
  features,
  stats,
  testimonials,
  stories
}`;

export async function getSognosrosterPageContent() {
  return client.fetch(SOGNOSROSTER_PAGE_QUERY, {}, { next: { revalidate: 60 } });
}
