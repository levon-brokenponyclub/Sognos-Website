import { client } from "./client";
import type { SanityImageSource } from "@sanity/image-url";

// ─── Logo Strip ───────────────────────────────────────────────────────────────

const LOGO_STRIP_QUERY = `*[_type == "logoStrip"][0]{
  logos[]{
    alt,
    image
  }
}`;

export type LogoStripLogo = {
  alt: string;
  image?: SanityImageSource;
};

export async function getLogoStripContent(): Promise<
  { logos?: LogoStripLogo[] } | null
> {
  return client.fetch(LOGO_STRIP_QUERY, {}, { next: { revalidate: 60 } });
}

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

// ─── Customer Stories ─────────────────────────────────────────────────────────

const ALL_STORY_SLUGS_QUERY = `*[_type == "customerStory" && defined(slug.current)]{
  "slug": slug.current
}`;

const STORY_NAV_QUERY = `*[_type == "customerStory"] | order(order asc){
  "slug": slug.current,
  company
}`;

const STORY_BY_SLUG_QUERY = `*[_type == "customerStory" && slug.current == $slug][0]{
  company,
  title,
  description,
  date,
  readTime,
  order,
  heroImage,
  companyLogo,
  productLogo,
  quote,
  quoteAuthor,
  sidebar,
  "downloadUrl": downloadFile.asset->url,
  body
}`;

export async function getAllCustomerStorySlugs(): Promise<{ slug: string }[]> {
  return client.fetch(ALL_STORY_SLUGS_QUERY, {}, { next: { revalidate: 60 } });
}

export async function getCustomerStoryNav(): Promise<
  { slug: string; company: string }[]
> {
  return client.fetch(STORY_NAV_QUERY, {}, { next: { revalidate: 60 } });
}

export async function getCustomerStoryBySlug(slug: string) {
  return client.fetch(
    STORY_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 60 } },
  );
}
