import { sanityFetch } from "./client";
import { urlFor } from "./image";
import type { SanityImageSource } from "@sanity/image-url";
import {
  DEFAULT_CTA_CONTENT,
  type CtaSectionContent,
  type CtaStatVariant,
} from "@/lib/content/ctaSection";
import {
  DEFAULT_LOGOS,
  LOGO_STRIP_LOGO_LIMIT,
} from "@/lib/content/logoStrip";
import {
  COMPANY_FOOTER_LINKS,
  DEFAULT_FOOTER_CONTENT,
  type FooterContent,
} from "@/lib/content/footer";
import {
  DEFAULT_SOGNOSCARE_PAGE_CONTENT,
  type SognoscarePageContent,
} from "@/lib/content/sognoscarePage";
import type { CaseStudy } from "@/components/layout/sections/ProductCustomerStories";

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
  return sanityFetch(LOGO_STRIP_QUERY, {}, { next: { revalidate: 60 } });
}

// ─── SognosCare ───────────────────────────────────────────────────────────────

export type EditionCardItem = {
  name: string;
  label: string;
  href: string;
  accentColor: string;
  logo: string;
  description: string;
};

export type SognoscarePageRendered = Omit<
  SognoscarePageContent,
  "hero" | "editionsHeader" | "storiesHeader"
> & {
  hero: {
    logoSrc: string;
    headline: string;
    subtext: string;
  };
  editionsHeader: SognoscarePageContent["editionsHeader"];
  editions: EditionCardItem[];
  storiesHeader: SognoscarePageContent["storiesHeader"];
  featuredStories: CaseStudy[] | null;
};

const SOGNOSCARE_PAGE_QUERY = `*[_type == "sognoscarePage"][0]{
  seo,
  hero,
  productDrawer,
  subNav[]{ label, id, href },
  problemsHeader,
  problems[]{ number, problem, problemDetail, solution, iconPath },
  featuresHeader,
  features[]{ id, name, tagline, description, capabilities, iconPath },
  editionsHeader,
  "editions": editions[]->{
    "slug": slug.current,
    name,
    accentHex,
    cardLogo,
    cardTagline,
    cardDescription
  },
  advantagesHeader,
  advantages,
  storiesHeader,
  "featuredStories": featuredStories[]->{
    "slug": slug.current,
    company,
    quote,
    quoteAuthor,
    sidebar,
    heroImage,
    companyLogo,
    "brandColor": brandColor.hex
  },
  cta
}`;

type RawSanityImage = SanityImageSource;
type RawSubNav = { label?: string; id?: string; href?: string };
type RawHero = { logo?: RawSanityImage; headline?: string; subtext?: string };
type RawProductDrawer = Partial<SognoscarePageContent["productDrawer"]>;
type RawSectionHeader = Partial<SognoscarePageContent["problemsHeader"]>;
type RawProblem = Partial<SognoscarePageContent["problems"][number]>;
type RawFeature = Partial<SognoscarePageContent["features"][number]> & {
  capabilities?: string[];
};
type RawEditionRef = {
  slug?: string;
  name?: string;
  accentHex?: string;
  cardLogo?: RawSanityImage;
  cardTagline?: string;
  cardDescription?: string;
};
type RawSidebarRow = { label?: string; value?: string };
type RawStoryRef = {
  slug?: string;
  company?: string;
  quote?: string;
  quoteAuthor?: string;
  sidebar?: RawSidebarRow[];
  heroImage?: RawSanityImage;
  companyLogo?: RawSanityImage;
  brandColor?: string;
};
type RawCta = Partial<SognoscarePageContent["cta"]>;
type RawSognoscarePage = {
  seo?: Partial<SognoscarePageContent["seo"]>;
  hero?: RawHero;
  productDrawer?: RawProductDrawer;
  subNav?: RawSubNav[];
  problemsHeader?: RawSectionHeader;
  problems?: RawProblem[];
  featuresHeader?: RawSectionHeader;
  features?: RawFeature[];
  editionsHeader?: RawSectionHeader;
  editions?: (RawEditionRef | null)[];
  advantagesHeader?: RawSectionHeader;
  advantages?: string[];
  storiesHeader?: RawSectionHeader;
  featuredStories?: (RawStoryRef | null)[];
  cta?: RawCta;
};

const STORY_THEME_CLASSES = {
  panelClass: "bg-sognos-navy/10",
  quoteClass: "text-sognos-body",
  authorClass: "text-sognos-body",
  roleClass: "text-sognos-body/75",
  quoteIconColor: "text-sognos-body/40",
  contentBorderClass: "border-sognos-navy/20",
  buttonBorderClass: "border-sognos-navy",
  buttonTextClass: "text-sognos-body",
  buttonHoverClass: "hover:bg-sognos-navy/8",
  buttonIconBgClass: "bg-sognos-navy",
} as const;

function parseQuoteAuthor(raw?: string): { author: string; role: string } {
  if (!raw) return { author: "", role: "" };
  const m = raw.match(/^(.*?),\s*(.*)$/);
  return m ? { author: m[1].trim(), role: m[2].trim() } : { author: raw.trim(), role: "" };
}

function sidebarValue(rows: RawSidebarRow[] | undefined, key: string): string {
  const row = rows?.find(
    (r) => r.label?.toLowerCase().trim() === key.toLowerCase().trim(),
  );
  return row?.value ?? "";
}

function mapStory(raw: RawStoryRef | null | undefined): CaseStudy | null {
  if (!raw || !raw.slug || !raw.company) return null;
  const { author, role } = parseQuoteAuthor(raw.quoteAuthor);
  return {
    company: raw.company,
    companySize: sidebarValue(raw.sidebar, "Size") || sidebarValue(raw.sidebar, "Company Size"),
    industry: sidebarValue(raw.sidebar, "Industry"),
    logo: raw.companyLogo
      ? urlFor(raw.companyLogo).width(280).auto("format").url()
      : "",
    panelImage: raw.heroImage
      ? urlFor(raw.heroImage).width(1200).auto("format").url()
      : "",
    quote: raw.quote ?? "",
    author,
    role,
    href: `/customer-stories/${raw.slug}`,
    brandColor: raw.brandColor,
    ...STORY_THEME_CLASSES,
  };
}

function mapEdition(raw: RawEditionRef | null | undefined): EditionCardItem | null {
  if (!raw || !raw.slug || !raw.name) return null;
  return {
    name: raw.name,
    label: raw.name,
    href: `/products/sognoscare/editions/${raw.slug}`,
    accentColor: raw.accentHex ?? "#1D96FC",
    logo: raw.cardLogo
      ? urlFor(raw.cardLogo).width(320).auto("format").url()
      : "",
    description: raw.cardDescription ?? raw.cardTagline ?? "",
  };
}

function mergeHeader(
  raw: RawSectionHeader | undefined,
  fallback: SognoscarePageContent["problemsHeader"],
): SognoscarePageContent["problemsHeader"] {
  return {
    eyebrow: raw?.eyebrow ?? fallback.eyebrow,
    heading: raw?.heading ?? fallback.heading,
    intro: raw?.intro ?? fallback.intro,
  };
}

export async function getSognoscarePageContent(): Promise<SognoscarePageRendered> {
  const result = await sanityFetch<RawSognoscarePage>(
    SOGNOSCARE_PAGE_QUERY,
    {},
    { next: { revalidate: 60 } },
  );

  const d = DEFAULT_SOGNOSCARE_PAGE_CONTENT;

  if (!result) {
    return {
      ...d,
      hero: {
        logoSrc: d.hero.logoSrc,
        headline: d.hero.headline,
        subtext: d.hero.subtext,
      },
      editions: [],
      featuredStories: null,
    };
  }

  const heroLogoSrc = result.hero?.logo
    ? urlFor(result.hero.logo).auto("format").url()
    : d.hero.logoSrc;

  const subNav =
    result.subNav?.flatMap((s) =>
      s.label && s.id
        ? [{ label: s.label, id: s.id, href: s.href ?? undefined }]
        : [],
    ) ?? [];

  const editions =
    result.editions?.flatMap((e) => {
      const mapped = mapEdition(e);
      return mapped ? [mapped] : [];
    }) ?? [];

  const featuredStories =
    result.featuredStories
      ?.flatMap((s) => {
        const mapped = mapStory(s);
        return mapped ? [mapped] : [];
      }) ?? [];

  const problems =
    result.problems?.flatMap((p) =>
      p.number && p.problem && p.problemDetail && p.solution && p.iconPath
        ? [
            {
              number: p.number,
              problem: p.problem,
              problemDetail: p.problemDetail,
              solution: p.solution,
              iconPath: p.iconPath,
            },
          ]
        : [],
    ) ?? [];

  const features =
    result.features?.flatMap((f) =>
      f.id && f.name && f.tagline && f.description && f.iconPath
        ? [
            {
              id: f.id,
              name: f.name,
              tagline: f.tagline,
              description: f.description,
              capabilities: f.capabilities ?? [],
              iconPath: f.iconPath,
            },
          ]
        : [],
    ) ?? [];

  const advantages =
    result.advantages?.filter((a): a is string => typeof a === "string" && a.length > 0) ?? [];

  return {
    seo: {
      title: result.seo?.title ?? d.seo.title,
      description: result.seo?.description ?? d.seo.description,
    },
    hero: {
      logoSrc: heroLogoSrc,
      headline: result.hero?.headline ?? d.hero.headline,
      subtext: result.hero?.subtext ?? d.hero.subtext,
    },
    productDrawer: {
      peekTitle: result.productDrawer?.peekTitle ?? d.productDrawer.peekTitle,
      peekDescription:
        result.productDrawer?.peekDescription ?? d.productDrawer.peekDescription,
      drawerTitle: result.productDrawer?.drawerTitle ?? d.productDrawer.drawerTitle,
      drawerDescription:
        result.productDrawer?.drawerDescription ?? d.productDrawer.drawerDescription,
    },
    subNav: subNav.length > 0 ? subNav : d.subNav,
    problemsHeader: mergeHeader(result.problemsHeader, d.problemsHeader),
    problems: problems.length > 0 ? problems : d.problems,
    featuresHeader: mergeHeader(result.featuresHeader, d.featuresHeader),
    features: features.length > 0 ? features : d.features,
    editionsHeader: mergeHeader(result.editionsHeader, d.editionsHeader),
    editions,
    advantagesHeader: mergeHeader(result.advantagesHeader, d.advantagesHeader),
    advantages: advantages.length > 0 ? advantages : d.advantages,
    storiesHeader: mergeHeader(result.storiesHeader, d.storiesHeader),
    featuredStories: featuredStories.length > 0 ? featuredStories : null,
    cta: {
      headline: result.cta?.headline ?? d.cta.headline,
      subtext: result.cta?.subtext ?? d.cta.subtext,
      primaryCTA: {
        label: result.cta?.primaryCTA?.label ?? d.cta.primaryCTA.label,
        href: result.cta?.primaryCTA?.href ?? d.cta.primaryCTA.href,
      },
      secondaryCTA: {
        label: result.cta?.secondaryCTA?.label ?? d.cta.secondaryCTA.label,
        href: result.cta?.secondaryCTA?.href ?? d.cta.secondaryCTA.href,
      },
    },
  };
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
  return sanityFetch(SOGNOSROSTER_PAGE_QUERY, {}, { next: { revalidate: 60 } });
}

// ─── Customer Stories ─────────────────────────────────────────────────────────

const ALL_STORY_SLUGS_QUERY = `*[_type == "customerStory" && defined(slug.current)]{
  "slug": slug.current
}`;

const STORY_NAV_QUERY = `*[_type == "customerStory"] | order(order asc){
  "slug": slug.current,
  company
}`;

const STORY_ARCHIVE_QUERY = `*[_type == "customerStory"] | order(date desc){
  "slug": slug.current,
  company,
  title,
  description,
  heroImage,
  date,
  readTime
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
  "brandColor": brandColor.hex,
  body
}`;

export async function getAllCustomerStorySlugs(): Promise<{ slug: string }[]> {
  return (
    (await sanityFetch<{ slug: string }[]>(
      ALL_STORY_SLUGS_QUERY,
      {},
      { next: { revalidate: 60 } },
    )) ?? []
  );
}

export async function getCustomerStoryNav(): Promise<
  { slug: string; company: string }[]
> {
  return (
    (await sanityFetch<{ slug: string; company: string }[]>(
      STORY_NAV_QUERY,
      {},
      { next: { revalidate: 60 } },
    )) ?? []
  );
}

export type CustomerStoryArchive = {
  slug: string;
  company: string;
  title: string;
  description: string;
  heroImage?: SanityImageSource;
  date: string;
  readTime?: string | null;
};

export async function getCustomerStoryArchive(): Promise<
  CustomerStoryArchive[]
> {
  return (
    (await sanityFetch<CustomerStoryArchive[]>(
      STORY_ARCHIVE_QUERY,
      {},
      { next: { revalidate: 60 } },
    )) ?? []
  );
}

export async function getCustomerStoryBySlug(slug: string) {
  return sanityFetch(
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
  date,
  readTime,
  author
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
  readTime?: string | null;
  author?: string | null;
};

export async function getAllKnowledgePostSlugs(): Promise<{ slug: string }[]> {
  return (
    (await sanityFetch<{ slug: string }[]>(
      ALL_KNOWLEDGE_POST_SLUGS_QUERY,
      {},
      { next: { revalidate: 60 } },
    )) ?? []
  );
}

export async function getKnowledgePostArchive(): Promise<KnowledgePostArchive[]> {
  return (
    (await sanityFetch<KnowledgePostArchive[]>(
      KNOWLEDGE_POST_ARCHIVE_QUERY,
      {},
      { next: { revalidate: 60 } },
    )) ?? []
  );
}

export async function getKnowledgePostBySlug(slug: string) {
  return sanityFetch(
    KNOWLEDGE_POST_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 60 } },
  );
}

export async function getKnowledgePostNav(): Promise<
  { slug: string; title: string }[]
> {
  return (
    (await sanityFetch<{ slug: string; title: string }[]>(
      KNOWLEDGE_POST_NAV_QUERY,
      {},
      { next: { revalidate: 60 } },
    )) ?? []
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
  const result = await sanityFetch<Partial<SiteSettings>>(
    SITE_SETTINGS_QUERY,
    {},
    { next: { revalidate: 60 } },
  );
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
  const [result, logoStripContent] = await Promise.all([
    sanityFetch<RawCtaSection>(
      CTA_SECTION_QUERY,
      {},
      { next: { revalidate: 60 } },
    ),
    getLogoStripContent(),
  ]);

  const trustLogos = (
    logoStripContent?.logos?.length
      ? logoStripContent.logos.flatMap((logo) =>
          logo.image && logo.alt
            ? [
                {
                  src: urlFor(logo.image).width(220).auto("format").url(),
                  alt: logo.alt,
                },
              ]
            : [],
        )
      : DEFAULT_LOGOS
  ).slice(0, LOGO_STRIP_LOGO_LIMIT);

  if (!result) return { ...DEFAULT_CTA_CONTENT, trustLogos };

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
    trustLogos,
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

function normalizeFooterLabel(label: string): string {
  return label === "Sognos Genogram" ? "SognosGenogram" : label;
}

function normalizeFooterColumns(columns: FooterContent["columns"]): FooterContent["columns"] {
  return columns.map((column) => {
    if (column.title === "Company") {
      return {
        title: column.title,
        links: COMPANY_FOOTER_LINKS,
      };
    }

    return {
      ...column,
      links: column.links.map((link) => ({
        ...link,
        label: normalizeFooterLabel(link.label),
      })),
    };
  });
}

export async function getFooterContent(): Promise<FooterContent> {
  const result = await sanityFetch<RawFooter>(
    FOOTER_QUERY,
    {},
    { next: { revalidate: 60 } },
  );

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
    columns: normalizeFooterColumns(
      columns.length > 0 ? columns : DEFAULT_FOOTER_CONTENT.columns,
    ),
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
  return (
    (await sanityFetch<{ slug: string }[]>(
      ALL_LEGAL_PAGE_SLUGS_QUERY,
      {},
      { next: { revalidate: 60 } },
    )) ?? []
  );
}

export async function getLegalPageBySlug(slug: string) {
  return sanityFetch(
    LEGAL_PAGE_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 60 } },
  );
}
