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

// ─── Knowledge Posts ──────────────────────────────────────────────────────────

const ALL_KNOWLEDGE_POST_SLUGS_QUERY = `*[_type == "knowledgePost" && defined(slug.current)]{
  "slug": slug.current
}`;

const KNOWLEDGE_POST_ARCHIVE_QUERY = `*[_type == "knowledgePost"] | order(date desc){
  "slug": slug.current,
  category,
  title,
  excerpt,
  heroImage,
  industry,
  useCase,
  date
}`;

const KNOWLEDGE_POST_BY_SLUG_QUERY = `*[_type == "knowledgePost" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  category,
  date,
  readTime,
  author,
  excerpt,
  heroImage,
  industry,
  useCase,
  body
}`;

const KNOWLEDGE_POST_NAV_QUERY = `*[_type == "knowledgePost"] | order(date desc){
  "slug": slug.current,
  title
}`;

export type KnowledgePostArchive = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  heroImage?: SanityImageSource;
  industry?: string | null;
  useCase?: string | null;
  date: string;
};

export async function getAllKnowledgePostSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    ALL_KNOWLEDGE_POST_SLUGS_QUERY,
    {},
    { next: { revalidate: 60 } },
  );
}

export async function getKnowledgePostArchive(): Promise<KnowledgePostArchive[]> {
  return client.fetch(
    KNOWLEDGE_POST_ARCHIVE_QUERY,
    {},
    { next: { revalidate: 60 } },
  );
}

export async function getKnowledgePostBySlug(slug: string) {
  return client.fetch(
    KNOWLEDGE_POST_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 60 } },
  );
}

export async function getKnowledgePostNav(): Promise<
  { slug: string; title: string }[]
> {
  return client.fetch(
    KNOWLEDGE_POST_NAV_QUERY,
    {},
    { next: { revalidate: 60 } },
  );
}

// ─── Site Settings ────────────────────────────────────────────────────────────

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteTitle,
  metaDescription,
  responseTimeHeading,
  responseTimeBody,
  offices[]{
    region,
    label,
    entity,
    address,
    phone,
    email
  },
  abn,
  linkedinUrl
}`;

export type SiteOffice = {
  region: string;
  label?: string;
  entity: string;
  address: string[];
  phone?: string;
  email?: string;
};

export type SiteSettings = {
  siteTitle: string;
  metaDescription: string;
  responseTimeHeading?: string;
  responseTimeBody?: string;
  offices?: SiteOffice[];
  abn?: string;
  linkedinUrl?: string;
};

const FALLBACK_SITE_SETTINGS: SiteSettings = {
  siteTitle: "Sognos — Field Service Innovations with Microsoft Dynamics",
  metaDescription:
    "Sognos combines care management and workforce scheduling on Microsoft Dynamics 365.",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const result = await client
    .fetch<Partial<SiteSettings> | null>(
      SITE_SETTINGS_QUERY,
      {},
      { next: { revalidate: 60 } },
    )
    .catch(() => null);
  return { ...FALLBACK_SITE_SETTINGS, ...(result ?? {}) };
}
