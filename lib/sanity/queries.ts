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
import {
  DEFAULT_SOGNOSCARE_PAGE_CONTENT,
  type SognoscarePageContent,
} from "@/lib/content/sognoscarePage";
import type { CaseStudy } from "@/components/sections/ProductCustomerStories";

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
  "datasheetUrl": datasheet.asset->url,
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
    companyLogo
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
};
type RawCta = Partial<SognoscarePageContent["cta"]>;
type RawSognoscarePage = {
  seo?: Partial<SognoscarePageContent["seo"]>;
  hero?: RawHero;
  productDrawer?: RawProductDrawer;
  subNav?: RawSubNav[];
  datasheetUrl?: string;
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
  panelClass: "bg-prussian-blue-800/10",
  quoteClass: "text-prussian-blue-800",
  authorClass: "text-prussian-blue-800",
  roleClass: "text-prussian-blue-800/75",
  quoteIconColor: "text-prussian-blue-800/40",
  contentBorderClass: "border-prussian-blue-800/20",
  buttonBorderClass: "border-prussian-blue-800",
  buttonTextClass: "text-prussian-blue-800",
  buttonHoverClass: "hover:bg-prussian-blue-800/8",
  buttonIconBgClass: "bg-prussian-blue-800",
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
  const result = await client
    .fetch<RawSognoscarePage | null>(
      SOGNOSCARE_PAGE_QUERY,
      {},
      { next: { revalidate: 60 } },
    )
    .catch(() => null);

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

  const DATASHEET_ENTRY = {
    label: "Download Datasheet",
    id: "datasheet",
    href: result.datasheetUrl ?? "/datasheets/SognosCare-datasheet.pdf",
    download: true as const,
  };

  const rawSubNav =
    result.subNav?.flatMap((s) =>
      s.label && s.id
        ? [{ label: s.label, id: s.id, href: s.href ?? undefined }]
        : [],
    ) ?? [];

  const scheduleIdx = rawSubNav.findIndex((s) => s.id === "calendar");
  const subNav =
    rawSubNav.length > 0
      ? [
          ...rawSubNav.slice(0, scheduleIdx >= 0 ? scheduleIdx : rawSubNav.length),
          DATASHEET_ENTRY,
          ...rawSubNav.slice(scheduleIdx >= 0 ? scheduleIdx : rawSubNav.length),
        ]
      : [];

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
  seo,
  hero{ headline, subtext, logo },
  "datasheetUrl": datasheet.asset->url,
  productDrawer{ peekTitle, peekDescription, drawerTitle, drawerDescription },
  subNav[]{ label, id, href },
  problemsHeader{ eyebrow, heading, intro },
  problems[]{ number, problem, problemDetail, solution, iconPath },
  featuresHeader{ eyebrow, heading, intro },
  features[]{ id, name, tagline, description, capabilities },
  advantagesHeader{ eyebrow, heading, intro },
  advantages,
  storiesHeader{ eyebrow, heading, intro },
  "featuredStories": featuredStories[]->{
    "slug": slug.current,
    company,
    quote,
    quoteAuthor,
    sidebar,
    heroImage,
    companyLogo
  },
  cta{ headline, subtext, primaryCTA{ label, href }, secondaryCTA{ label, href } }
}`;

export type RosterSectionHeader = {
  eyebrow?: string;
  heading?: string;
  intro?: string;
};

export type RosterProblem = {
  number: string;
  problem: string;
  problemDetail: string;
  solution: string;
  iconPath: string;
};

export type RosterFeature = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  capabilities: string[];
};

export type SognosrosterPageData = {
  seo: { title?: string; description?: string };
  hero: { headline?: string; subtext?: string; logoSrc?: string };
  datasheetUrl?: string;
  productDrawer: { peekTitle?: string; peekDescription?: string; drawerTitle?: string; drawerDescription?: string };
  subNav: { label: string; id: string; href?: string }[];
  problemsHeader: RosterSectionHeader;
  problems: RosterProblem[];
  featuresHeader: RosterSectionHeader;
  features: RosterFeature[];
  advantagesHeader: RosterSectionHeader;
  advantages: string[];
  storiesHeader: RosterSectionHeader;
  featuredStories: CaseStudy[];
  cta: { headline?: string; subtext?: string; primaryCTA?: { label: string; href: string }; secondaryCTA?: { label: string; href: string } };
};

type RawRosterProblem = { number?: string; problem?: string; problemDetail?: string; solution?: string; iconPath?: string };
type RawRosterFeature = { id?: string; name?: string; tagline?: string; description?: string; capabilities?: string[] };
type RawRosterSubNavItem = { label?: string; id?: string; href?: string };
type RawRosterPage = {
  seo?: { title?: string; description?: string };
  hero?: { headline?: string; subtext?: string; logo?: SanityImageSource };
  datasheetUrl?: string;
  productDrawer?: { peekTitle?: string; peekDescription?: string; drawerTitle?: string; drawerDescription?: string };
  subNav?: RawRosterSubNavItem[];
  problemsHeader?: { eyebrow?: string; heading?: string; intro?: string };
  problems?: RawRosterProblem[];
  featuresHeader?: { eyebrow?: string; heading?: string; intro?: string };
  features?: RawRosterFeature[];
  advantagesHeader?: { eyebrow?: string; heading?: string; intro?: string };
  advantages?: string[];
  storiesHeader?: { eyebrow?: string; heading?: string; intro?: string };
  featuredStories?: (RawStoryRef | null)[];
  cta?: { headline?: string; subtext?: string; primaryCTA?: { label?: string; href?: string }; secondaryCTA?: { label?: string; href?: string } };
};

export async function getSognosrosterPageContent(): Promise<SognosrosterPageData | null> {
  const raw = await client
    .fetch<RawRosterPage | null>(SOGNOSROSTER_PAGE_QUERY, {}, { next: { revalidate: 60 } })
    .catch(() => null);

  if (!raw) return null;

  const problems: RosterProblem[] = (raw.problems ?? []).flatMap((p) =>
    p.number && p.problem && p.problemDetail && p.solution && p.iconPath
      ? [{ number: p.number, problem: p.problem, problemDetail: p.problemDetail, solution: p.solution, iconPath: p.iconPath }]
      : [],
  );

  const features: RosterFeature[] = (raw.features ?? []).flatMap((f) =>
    f.id && f.name && f.tagline && f.description
      ? [{ id: f.id, name: f.name, tagline: f.tagline, description: f.description, capabilities: f.capabilities?.filter(Boolean) ?? [] }]
      : [],
  );

  const featuredStories: CaseStudy[] = (raw.featuredStories ?? []).flatMap((s) => {
    const mapped = mapStory(s);
    return mapped ? [mapped] : [];
  });

  return {
    seo: { title: raw.seo?.title, description: raw.seo?.description },
    hero: {
      headline: raw.hero?.headline,
      subtext: raw.hero?.subtext,
      logoSrc: raw.hero?.logo ? urlFor(raw.hero.logo).height(52).auto("format").url() : undefined,
    },
    datasheetUrl: raw.datasheetUrl,
    productDrawer: {
      peekTitle: raw.productDrawer?.peekTitle,
      peekDescription: raw.productDrawer?.peekDescription,
      drawerTitle: raw.productDrawer?.drawerTitle,
      drawerDescription: raw.productDrawer?.drawerDescription,
    },
    subNav: (raw.subNav ?? []).flatMap((s) =>
      s.label && s.id ? [{ label: s.label, id: s.id, href: s.href }] : [],
    ),
    problemsHeader: { eyebrow: raw.problemsHeader?.eyebrow, heading: raw.problemsHeader?.heading, intro: raw.problemsHeader?.intro },
    problems,
    featuresHeader: { eyebrow: raw.featuresHeader?.eyebrow, heading: raw.featuresHeader?.heading, intro: raw.featuresHeader?.intro },
    features,
    advantagesHeader: { eyebrow: raw.advantagesHeader?.eyebrow, heading: raw.advantagesHeader?.heading, intro: raw.advantagesHeader?.intro },
    advantages: raw.advantages?.filter(Boolean) ?? [],
    storiesHeader: { eyebrow: raw.storiesHeader?.eyebrow, heading: raw.storiesHeader?.heading, intro: raw.storiesHeader?.intro },
    featuredStories,
    cta: {
      headline: raw.cta?.headline,
      subtext: raw.cta?.subtext,
      primaryCTA: raw.cta?.primaryCTA?.label && raw.cta.primaryCTA.href ? { label: raw.cta.primaryCTA.label, href: raw.cta.primaryCTA.href } : undefined,
      secondaryCTA: raw.cta?.secondaryCTA?.label && raw.cta.secondaryCTA.href ? { label: raw.cta.secondaryCTA.label, href: raw.cta.secondaryCTA.href } : undefined,
    },
  };
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

// ─── Events ───────────────────────────────────────────────────────────────────

const ALL_EVENT_SLUGS_QUERY = `*[_type == "event" && defined(slug.current)]{
  "slug": slug.current
}`;

const EVENT_BY_SLUG_QUERY = `*[_type == "event" && slug.current == $slug][0]{
  title,
  excerpt,
  format,
  date,
  endDate,
  location,
  meta,
  registrationOpen,
  heroImage,
  seo,
  hero{ heading, subtitle, description },
  partners[]{ name, logo, label },
  eventMeta{ date, time, venueName, venueAddress, capacity, registerUrl, mapsEmbedUrl, mapsDirectionsUrl },
  challenge{ intro, callout, bullets[]{ icon, text }, closing },
  whyAttend{ heading, intro, items[]{ icon, title }, closing },
  speaker{ name, credentials, role, headshot, bio },
  agenda{ timeRange, items[]{ time, item } },
  whoShouldAttend{ heading, roles, description },
  directions{ heading, paragraphs },
  footerCta{ heading, description }
}`;

export type EventPartner = {
  name: string;
  logoUrl: string;
  label?: string;
};

export type EventBulletItem = { icon: string; text: string };
export type EventAttendReason = { icon: string; title: string };
export type EventAgendaItem = { time: string; item: string };

export type EventPageData = {
  title: string;
  excerpt?: string;
  format?: string;
  location?: string;
  meta?: string;
  registrationOpen: boolean;
  seo: { title?: string; description?: string };
  hero: {
    heading?: string;
    subtitle?: string;
    description?: string;
    imageUrl?: string;
  };
  partners: EventPartner[];
  eventMeta: {
    date?: string;
    time?: string;
    venueName?: string;
    venueAddress: string[];
    capacity?: string;
    registerUrl?: string;
    mapsEmbedUrl?: string;
    mapsDirectionsUrl?: string;
  };
  challenge: {
    intro?: string;
    callout?: string;
    bullets: EventBulletItem[];
    closing?: string;
  };
  whyAttend: {
    heading?: string;
    intro?: string;
    items: EventAttendReason[];
    closing?: string;
  };
  speaker: {
    name?: string;
    credentials?: string;
    role?: string;
    headshotUrl?: string;
    bio: string[];
  };
  agenda: {
    timeRange?: string;
    items: EventAgendaItem[];
  };
  whoShouldAttend: {
    heading?: string;
    roles: string[];
    description?: string;
  };
  directions: {
    heading?: string;
    paragraphs: string[];
  };
  footerCta: {
    heading?: string;
    description?: string;
  };
};

type RawEventPartner = {
  name?: string;
  logo?: SanityImageSource;
  label?: string;
};

type RawEventBullet = { icon?: string; text?: string };
type RawEventAttendItem = { icon?: string; title?: string };
type RawEventAgendaItem = { time?: string; item?: string };

type RawEvent = {
  title?: string;
  excerpt?: string;
  format?: string;
  date?: string;
  endDate?: string;
  location?: string;
  meta?: string;
  registrationOpen?: boolean;
  heroImage?: SanityImageSource;
  seo?: { title?: string; description?: string };
  hero?: {
    heading?: string;
    subtitle?: string;
    description?: string;
  };
  partners?: RawEventPartner[];
  eventMeta?: {
    date?: string;
    time?: string;
    venueName?: string;
    venueAddress?: string[];
    capacity?: string;
    registerUrl?: string;
    mapsEmbedUrl?: string;
    mapsDirectionsUrl?: string;
  };
  challenge?: {
    intro?: string;
    callout?: string;
    bullets?: RawEventBullet[];
    closing?: string;
  };
  whyAttend?: {
    heading?: string;
    intro?: string;
    items?: RawEventAttendItem[];
    closing?: string;
  };
  speaker?: {
    name?: string;
    credentials?: string;
    role?: string;
    headshot?: SanityImageSource;
    bio?: string[];
  };
  agenda?: {
    timeRange?: string;
    items?: RawEventAgendaItem[];
  };
  whoShouldAttend?: {
    heading?: string;
    roles?: string[];
    description?: string;
  };
  directions?: {
    heading?: string;
    paragraphs?: string[];
  };
  footerCta?: { heading?: string; description?: string };
};

const EVENT_ARCHIVE_QUERY = `*[_type == "event" && defined(slug.current)] | order(date desc){
  "slug": slug.current,
  title,
  excerpt,
  heroImage,
  date
}`;

type RawEventArchiveItem = {
  slug?: string;
  title?: string;
  excerpt?: string;
  heroImage?: SanityImageSource;
  date?: string;
};

export async function getEventArchive(): Promise<
  { slug: string; title: string; excerpt: string; imageUrl: string; date?: string }[]
> {
  const rows = await client
    .fetch<RawEventArchiveItem[]>(
      EVENT_ARCHIVE_QUERY,
      {},
      { next: { revalidate: 60 } },
    )
    .catch(() => [] as RawEventArchiveItem[]);

  return rows.flatMap((r) => {
    if (!r.slug || !r.title) return [];
    return [
      {
        slug: r.slug,
        title: r.title,
        excerpt: r.excerpt ?? "",
        imageUrl: r.heroImage
          ? urlFor(r.heroImage).width(720).auto("format").url()
          : "",
        date: r.date,
      },
    ];
  });
}

export async function getAllEventSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(ALL_EVENT_SLUGS_QUERY, {}, { next: { revalidate: 60 } });
}

export async function getEventBySlug(
  slug: string,
): Promise<EventPageData | null> {
  const raw = await client
    .fetch<RawEvent | null>(
      EVENT_BY_SLUG_QUERY,
      { slug },
      { next: { revalidate: 60 } },
    )
    .catch(() => null);

  if (!raw) return null;

  const partners: EventPartner[] = (raw.partners ?? []).flatMap((p) => {
    if (!p.name) return [];
    return [
      {
        name: p.name,
        logoUrl: p.logo ? urlFor(p.logo).width(320).auto("format").url() : "",
        label: p.label,
      },
    ];
  });

  const bullets: EventBulletItem[] = (raw.challenge?.bullets ?? []).flatMap(
    (b) => (b.text ? [{ icon: b.icon ?? "Users", text: b.text }] : []),
  );

  const whyAttendItems: EventAttendReason[] = (
    raw.whyAttend?.items ?? []
  ).flatMap((i) =>
    i.title ? [{ icon: i.icon ?? "Users", title: i.title }] : [],
  );

  const agendaItems: EventAgendaItem[] = (raw.agenda?.items ?? []).flatMap(
    (i) => (i.time && i.item ? [{ time: i.time, item: i.item }] : []),
  );

  const heroImageUrl = raw.heroImage
    ? urlFor(raw.heroImage).width(1280).auto("format").url()
    : undefined;

  return {
    title: raw.title ?? "",
    excerpt: raw.excerpt,
    format: raw.format,
    location: raw.location,
    meta: raw.meta,
    registrationOpen: raw.registrationOpen ?? true,
    seo: {
      title: raw.seo?.title,
      description: raw.seo?.description ?? raw.excerpt,
    },
    hero: {
      heading: raw.hero?.heading,
      subtitle: raw.hero?.subtitle,
      description: raw.hero?.description,
      imageUrl: heroImageUrl,
    },
    partners,
    eventMeta: {
      date: raw.eventMeta?.date,
      time: raw.eventMeta?.time,
      venueName: raw.eventMeta?.venueName,
      venueAddress: raw.eventMeta?.venueAddress ?? [],
      capacity: raw.eventMeta?.capacity,
      registerUrl: raw.eventMeta?.registerUrl,
      mapsEmbedUrl: raw.eventMeta?.mapsEmbedUrl,
      mapsDirectionsUrl: raw.eventMeta?.mapsDirectionsUrl,
    },
    challenge: {
      intro: raw.challenge?.intro,
      callout: raw.challenge?.callout,
      bullets,
      closing: raw.challenge?.closing,
    },
    whyAttend: {
      heading: raw.whyAttend?.heading,
      intro: raw.whyAttend?.intro,
      items: whyAttendItems,
      closing: raw.whyAttend?.closing,
    },
    speaker: {
      name: raw.speaker?.name,
      credentials: raw.speaker?.credentials,
      role: raw.speaker?.role,
      headshotUrl: raw.speaker?.headshot
        ? urlFor(raw.speaker.headshot).width(224).auto("format").url()
        : undefined,
      bio: raw.speaker?.bio?.filter(Boolean) ?? [],
    },
    agenda: {
      timeRange: raw.agenda?.timeRange,
      items: agendaItems,
    },
    whoShouldAttend: {
      heading: raw.whoShouldAttend?.heading,
      roles: raw.whoShouldAttend?.roles?.filter(Boolean) ?? [],
      description: raw.whoShouldAttend?.description,
    },
    directions: {
      heading: raw.directions?.heading,
      paragraphs: raw.directions?.paragraphs?.filter(Boolean) ?? [],
    },
    footerCta: {
      heading: raw.footerCta?.heading,
      description: raw.footerCta?.description,
    },
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

// ─── SognosGenogram ──────────────────────────────────────────────────────────

const SOGNOSGENOGRAM_PAGE_QUERY = `*[_type == "sognosgenogramPage"][0]{
  seo,
  hero{ headline, subtext, logo },
  "datasheetUrl": datasheet.asset->url,
  productDrawer{ peekTitle, peekDescription, drawerTitle, drawerDescription },
  subNav[]{ label, id, href },
  problemsHeader{ eyebrow, heading, intro },
  problems[]{ title, body },
  featuresHeader{ eyebrow, heading, intro },
  features[]{ title, body },
  storiesHeader{ eyebrow, heading, intro },
  "featuredStories": featuredStories[]->{
    "slug": slug.current,
    company,
    quote,
    quoteAuthor,
    sidebar,
    heroImage,
    companyLogo
  },
  cta{ headline, subtext, primaryCTA{ label, href }, secondaryCTA{ label, href } }
}`;

export type GenogramPainPoint = { title: string; body: string };
export type GenogramFeature = { title: string; body: string };

export type SognosgenogramPageData = {
  seo: { title?: string; description?: string };
  hero: { headline?: string; subtext?: string; logoSrc?: string };
  datasheetUrl?: string;
  productDrawer: { peekTitle?: string; peekDescription?: string; drawerTitle?: string; drawerDescription?: string };
  subNav: { label: string; id: string; href?: string }[];
  problemsHeader: { eyebrow?: string; heading?: string; intro?: string };
  problems: GenogramPainPoint[];
  featuresHeader: { eyebrow?: string; heading?: string; intro?: string };
  features: GenogramFeature[];
  storiesHeader: { eyebrow?: string; heading?: string; intro?: string };
  featuredStories: CaseStudy[];
  cta: { headline?: string; subtext?: string; primaryCTA?: { label: string; href: string }; secondaryCTA?: { label: string; href: string } };
};

type RawGenogramPage = {
  seo?: { title?: string; description?: string };
  hero?: { headline?: string; subtext?: string; logo?: SanityImageSource };
  datasheetUrl?: string;
  productDrawer?: { peekTitle?: string; peekDescription?: string; drawerTitle?: string; drawerDescription?: string };
  subNav?: { label?: string; id?: string; href?: string }[];
  problemsHeader?: { eyebrow?: string; heading?: string; intro?: string };
  problems?: { title?: string; body?: string }[];
  featuresHeader?: { eyebrow?: string; heading?: string; intro?: string };
  features?: { title?: string; body?: string }[];
  storiesHeader?: { eyebrow?: string; heading?: string; intro?: string };
  featuredStories?: (RawStoryRef | null)[];
  cta?: { headline?: string; subtext?: string; primaryCTA?: { label?: string; href?: string }; secondaryCTA?: { label?: string; href?: string } };
};

export async function getGenogramPageContent(): Promise<SognosgenogramPageData | null> {
  const raw = await client
    .fetch<RawGenogramPage | null>(SOGNOSGENOGRAM_PAGE_QUERY, {}, { next: { revalidate: 60 } })
    .catch(() => null);

  if (!raw) return null;

  return {
    seo: { title: raw.seo?.title, description: raw.seo?.description },
    hero: {
      headline: raw.hero?.headline,
      subtext: raw.hero?.subtext,
      logoSrc: raw.hero?.logo ? urlFor(raw.hero.logo).height(52).auto("format").url() : undefined,
    },
    datasheetUrl: raw.datasheetUrl,
    productDrawer: {
      peekTitle: raw.productDrawer?.peekTitle,
      peekDescription: raw.productDrawer?.peekDescription,
      drawerTitle: raw.productDrawer?.drawerTitle,
      drawerDescription: raw.productDrawer?.drawerDescription,
    },
    subNav: (raw.subNav ?? []).flatMap((s) =>
      s.label && s.id ? [{ label: s.label, id: s.id, href: s.href }] : [],
    ),
    problemsHeader: { eyebrow: raw.problemsHeader?.eyebrow, heading: raw.problemsHeader?.heading, intro: raw.problemsHeader?.intro },
    problems: (raw.problems ?? []).flatMap((p) =>
      p.title && p.body ? [{ title: p.title, body: p.body }] : [],
    ),
    featuresHeader: { eyebrow: raw.featuresHeader?.eyebrow, heading: raw.featuresHeader?.heading, intro: raw.featuresHeader?.intro },
    features: (raw.features ?? []).flatMap((f) =>
      f.title && f.body ? [{ title: f.title, body: f.body }] : [],
    ),
    storiesHeader: { eyebrow: raw.storiesHeader?.eyebrow, heading: raw.storiesHeader?.heading, intro: raw.storiesHeader?.intro },
    featuredStories: (raw.featuredStories ?? []).flatMap((s) => {
      const mapped = mapStory(s);
      return mapped ? [mapped] : [];
    }),
    cta: {
      headline: raw.cta?.headline,
      subtext: raw.cta?.subtext,
      primaryCTA: raw.cta?.primaryCTA?.label && raw.cta.primaryCTA.href ? { label: raw.cta.primaryCTA.label, href: raw.cta.primaryCTA.href } : undefined,
      secondaryCTA: raw.cta?.secondaryCTA?.label && raw.cta.secondaryCTA.href ? { label: raw.cta.secondaryCTA.label, href: raw.cta.secondaryCTA.href } : undefined,
    },
  };
}

export async function getGenogramDatasheetUrl(): Promise<string | null> {
  const data = await getGenogramPageContent();
  return data?.datasheetUrl ?? null;
}
