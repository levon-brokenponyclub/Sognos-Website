import { client } from "./client";
import { urlFor } from "./image";
import type { SanityImageSource } from "@sanity/image-url";
import {
  DEFAULT_CTA_CONTENT,
  type CtaSectionContent,
  type CtaStatVariant,
} from "@/lib/content/ctaSection";
import {
  DEFAULT_FOOTER_CONTENT,
  type FooterContent,
} from "@/lib/content/footer";

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
  linkedinUrl,
  googleAnalyticsId,
  linkedinPartnerId
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
  googleAnalyticsId?: string;
  linkedinPartnerId?: string;
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

// ─── CTA Section ──────────────────────────────────────────────────────────────

const CTA_SECTION_QUERY = `*[_type == "ctaSection"][0]{
  bookDemoHeading,
  bookDemoDescription,
  logoBlockHeading,
  logos[]{
    alt,
    image
  },
  stats[]{
    numericValue,
    suffix,
    label,
    variant
  }
}`;

type RawCtaLogo = { alt?: string; image?: SanityImageSource };
type RawCtaStat = {
  numericValue?: number;
  suffix?: string;
  label?: string;
  variant?: CtaStatVariant;
};
type RawCtaSection = {
  bookDemoHeading?: string;
  bookDemoDescription?: string;
  logoBlockHeading?: string;
  logos?: RawCtaLogo[];
  stats?: RawCtaStat[];
};

export async function getCtaSectionContent(): Promise<CtaSectionContent> {
  const result = await client
    .fetch<RawCtaSection | null>(
      CTA_SECTION_QUERY,
      {},
      { next: { revalidate: 60 } },
    )
    .catch(() => null);

  if (!result) return DEFAULT_CTA_CONTENT;

  const logos =
    result.logos?.flatMap((l) =>
      l.image && l.alt
        ? [
            {
              src: urlFor(l.image).width(120).auto("format").url(),
              alt: l.alt,
            },
          ]
        : [],
    ) ?? [];

  const stats =
    result.stats?.flatMap((s) =>
      typeof s.numericValue === "number" && s.label
        ? [
            {
              numericValue: s.numericValue,
              suffix: s.suffix ?? "",
              label: s.label,
              variant: s.variant ?? "light",
            },
          ]
        : [],
    ) ?? [];

  return {
    bookDemoHeading:
      result.bookDemoHeading || DEFAULT_CTA_CONTENT.bookDemoHeading,
    bookDemoDescription:
      result.bookDemoDescription || DEFAULT_CTA_CONTENT.bookDemoDescription,
    logoBlockHeading:
      result.logoBlockHeading || DEFAULT_CTA_CONTENT.logoBlockHeading,
    logos: logos.length > 0 ? logos : DEFAULT_CTA_CONTENT.logos,
    stats: stats.length > 0 ? stats : DEFAULT_CTA_CONTENT.stats,
  };
}

// ─── Footer ───────────────────────────────────────────────────────────────────

const FOOTER_QUERY = `*[_type == "footer"][0]{
  brandLogo,
  tagline,
  platformLogos[]{ alt, image },
  columns[]{ title, links[]{ label, href } },
  acknowledgement,
  copyrightSuffix,
  legalLinks[]{ label, href }
}`;

type RawFooterLink = { label?: string; href?: string };
type RawFooterColumn = { title?: string; links?: RawFooterLink[] };
type RawFooter = {
  brandLogo?: SanityImageSource;
  tagline?: string;
  platformLogos?: { alt?: string; image?: SanityImageSource }[];
  columns?: RawFooterColumn[];
  acknowledgement?: string;
  copyrightSuffix?: string;
  legalLinks?: RawFooterLink[];
};

export async function getFooterContent(): Promise<FooterContent> {
  const result = await client
    .fetch<RawFooter | null>(
      FOOTER_QUERY,
      {},
      { next: { revalidate: 60 } },
    )
    .catch(() => null);

  if (!result) return DEFAULT_FOOTER_CONTENT;

  const platformLogos =
    result.platformLogos?.flatMap((l) =>
      l.image && l.alt
        ? [{ src: urlFor(l.image).width(80).auto("format").url(), alt: l.alt }]
        : [],
    ) ?? [];

  const columns =
    result.columns?.flatMap((c) => {
      if (!c.title) return [];
      const links =
        c.links?.flatMap((l) =>
          l.label && l.href ? [{ label: l.label, href: l.href }] : [],
        ) ?? [];
      return links.length > 0 ? [{ title: c.title, links }] : [];
    }) ?? [];

  const legalLinks =
    result.legalLinks?.flatMap((l) =>
      l.label && l.href ? [{ label: l.label, href: l.href }] : [],
    ) ?? [];

  return {
    brandLogo: result.brandLogo
      ? urlFor(result.brandLogo).width(280).auto("format").url()
      : DEFAULT_FOOTER_CONTENT.brandLogo,
    brandLogoAlt: DEFAULT_FOOTER_CONTENT.brandLogoAlt,
    tagline: result.tagline || DEFAULT_FOOTER_CONTENT.tagline,
    platformLogos:
      platformLogos.length > 0
        ? platformLogos
        : DEFAULT_FOOTER_CONTENT.platformLogos,
    columns: columns.length > 0 ? columns : DEFAULT_FOOTER_CONTENT.columns,
    acknowledgement:
      result.acknowledgement || DEFAULT_FOOTER_CONTENT.acknowledgement,
    copyrightSuffix:
      result.copyrightSuffix || DEFAULT_FOOTER_CONTENT.copyrightSuffix,
    legalLinks:
      legalLinks.length > 0 ? legalLinks : DEFAULT_FOOTER_CONTENT.legalLinks,
  };
}

// ─── Legal Pages ──────────────────────────────────────────────────────────────

const ALL_LEGAL_PAGE_SLUGS_QUERY = `*[_type == "legalPage" && defined(slug.current)]{
  "slug": slug.current
}`;

const LEGAL_PAGE_BY_SLUG_QUERY = `*[_type == "legalPage" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  metaDescription,
  badgeLabel,
  heroHeading,
  heroSubhead,
  body,
  footerNote
}`;

export async function getAllLegalPageSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    ALL_LEGAL_PAGE_SLUGS_QUERY,
    {},
    { next: { revalidate: 60 } },
  );
}

export async function getLegalPageBySlug(slug: string) {
  return client.fetch(
    LEGAL_PAGE_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 60 } },
  );
}
