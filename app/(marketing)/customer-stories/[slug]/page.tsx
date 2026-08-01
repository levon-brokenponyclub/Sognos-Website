import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import {
  getAllCustomerStorySlugs,
  getCustomerStoryArchive,
  getCustomerStoryBySlug,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import {
  ArticleCard,
  type Article,
} from "@/components/layout/sections/KnowledgeHubArchive";
import StoryMetaRail from "@/components/layout/sections/customer-stories/StoryMetaRail";
import ArticleScrollNav from "@/components/layout/sections/shared/ArticleScrollNav";
import ArticleProgressLine from "@/components/layout/sections/shared/ArticleProgressLine";
import ArticleProseFooter from "@/components/layout/sections/shared/ArticleProseFooter";
import {
  type PortableBlock,
  slugify,
  blockPlainText,
  extractHeadings,
} from "@/lib/portableText";
import { ARTICLE_PROSE_MAX_W } from "@/lib/articleLayout";
import { BRAND_BG } from "@/lib/customerStoryBrand";
import PullQuote from "@/components/portable-text/PullQuote";
import QuoteCallout from "@/components/portable-text/QuoteCallout";
import StatRow from "@/components/portable-text/StatRow";
import HeroScrollFade from "@/components/layout/sections/customer-stories/HeroScrollFade";
import { SeeMoreLink } from "@/components/layout/sections/ProductCustomerStories";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SolutionHeroDemoButton from "@/components/layout/sections/SolutionHeroDemoButton";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export const revalidate = 60;

// ─── Shared styles ──────────────────────────────────────────────────────────

const H2 =
  "mt-10 mb-4 font-heading text-2xl font-medium leading-snug tracking-tight text-sognos-heading scroll-mt-28 md:scroll-mt-32";
const PROSE =
  "text-base leading-relaxed text-sognos-body [&_p]:mb-5 [&_ul]:mb-6 [&_ul]:space-y-2 [&_li]:text-base [&_li]:leading-relaxed";

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllCustomerStorySlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = await getCustomerStoryBySlug(slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.description,
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseQuoteAuthor(raw?: string): { author: string; role: string } {
  if (!raw) return { author: "", role: "" };
  const m = raw.match(/^(.*?),\s*(.*)$/);
  return m
    ? { author: m[1].trim(), role: m[2].trim() }
    : { author: raw.trim(), role: "" };
}

function sidebarValue(
  sidebar: { label: string; value: string }[] | undefined,
  label: string,
): string | undefined {
  return sidebar?.find((f) => f.label.toLowerCase() === label.toLowerCase())
    ?.value;
}

// Colored callout-block backgrounds. Null / unmapped → brand blue accent.
const CALLOUT_BG: Record<string, string> = {
  orange: "bg-orange-600",
  teal: "bg-teal-600",
  blue: "bg-sognos-blue-accent",
  purple: "bg-purple-600",
  coral: "bg-rose-500",
};

// ─── PortableText components ──────────────────────────────────────────────────

const portableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-5">{children}</p>,
    h2: ({ children, value }) => (
      <h2 id={slugify(blockPlainText(value as PortableBlock))} className={H2}>
        {children}
      </h2>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-2 border-sognos-blue-accent pl-6">
        <p className="font-heading text-xl font-medium leading-snug tracking-tight text-sognos-blue-accent lg:text-2xl">
          {children}
        </p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 space-y-2 border-t border-sognos-line">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-base leading-relaxed mb-0  py-3 border-b border-sognos-line">
        <span
          aria-hidden="true"
          className="mt-2 size-1.5 shrink-0 bg-sognos-blue-accent"
        />
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    em: ({ children }) => <em>{children}</em>,
    strong: ({ children }) => <strong>{children}</strong>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sognos-blue-accent hover:underline"
      >
        {children}
      </a>
    ),
  },
  types: {
    inlineImage: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlFor(value).width(1400).auto("format").url();
      return (
        <Image
          src={url}
          alt={value.alt ?? ""}
          width={1400}
          height={787}
          className="my-8 w-full rounded-lg object-cover"
        />
      );
    },
    calloutBlock: ({ value }) => {
      if (!value?.text) return null;
      const bg =
        (value.color && CALLOUT_BG[value.color as string]) ||
        "bg-sognos-blue-accent";
      return (
        <div className={`my-10 w-full rounded-lg p-8 lg:p-10 ${bg}`}>
          <p className="font-heading text-xl font-normal leading-snug text-white lg:text-2xl">
            {value.text}
          </p>
        </div>
      );
    },
    pullQuote: ({ value }) => <PullQuote {...value} />,
    quoteCallout: ({ value }) => <QuoteCallout {...value} />,
    statRow: ({ value }) => <StatRow {...value} />,
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CustomerStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [story, archive] = await Promise.all([
    getCustomerStoryBySlug(slug),
    getCustomerStoryArchive(),
  ]);

  if (!story) notFound();

  const postUrl = `https://sognos.com.au/customer-stories/${slug}`;
  const companyLogoUrl = story.companyLogo
    ? urlFor(story.companyLogo).width(400).auto("format").url()
    : null;
  // Drives the hero brand panel. Same precedence the customer-story slider
  // uses: Sanity field first, then the hand-kept map, then the house accent so
  // an unlisted client still gets a deliberate panel rather than a flat block.
  const brandColor =
    story.brandColor ?? BRAND_BG[story.company] ?? "#1d96fc";
  const { author: quoteAuthor, role: quoteRole } = parseQuoteAuthor(
    story.quoteAuthor,
  );
  const industryValue = sidebarValue(story.sidebar, "Industry");
  const stateValue = sidebarValue(story.sidebar, "State");
  const sizeValue = sidebarValue(story.sidebar, "Size");
  const productValue = sidebarValue(story.sidebar, "Product");
  const sections = extractHeadings(story.body);

  const latest: Article[] = archive
    .filter((s) => s.slug !== slug)
    .slice(0, 3)
    .map((s) => ({
      slug: s.slug,
      category: "Case Study",
      title: s.title,
      excerpt: s.description,
      href: `/customer-stories/${s.slug}`,
      image: s.heroImage
        ? urlFor(s.heroImage).width(720).auto("format").url()
        : "",
      industry: null,
      useCase: null,
      publishedAt: s.date ?? null,
      readTime: s.readTime ?? null,
      author: null,
    }));

  return (
    <main className="bg-white">
      <ScrollProgress />

      {/* ── Dark hero (scroll parallax + fade) — layout matches Diffblue ref ── */}
      <HeroScrollFade className="relative overflow-hidden bg-sognos-navy pt-32 lg:pt-40 lg:pb-10">
        <div className="mx-auto max-w-7xl px-6">
          {/* Single centred column — breadcrumb, title, brand panel, pull-quote. */}
          <div className="mx-auto max-w-4xl text-center">
            {/* Breadcrumb replaces the old back link, so the route back to the
                index survives the link's removal. */}
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center justify-center text-xs font-semibold uppercase tracking-widest text-white/60">
                <li>
                  <Link
                    href="/customer-stories"
                    className="transition-colors duration-200 hover:text-white"
                  >
                    Customer Stories
                  </Link>
                </li>
                <li aria-hidden="true" className="px-2 text-white/30">
                  /
                </li>
                <li aria-current="page" className="text-white/80">
                  {story.company}
                </li>
              </ol>
            </nav>

            <h1 className="mt-5 font-heading text-3xl font-normal leading-tight tracking-tight text-white text-balance lg:text-5xl">
              {story.title}
            </h1>
          </div>

          {/* Brand panel — replaces the hero image. Radial bloom in the client's
              own colour, dropping to navy at the edges so the white logo always
              sits on a dark field whatever hue the client brings. */}
          <div className="mx-auto mt-12 max-w-4xl lg:mt-16">
            <div
              className="flex aspect-2/1 items-center justify-center rounded-lg p-8"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 20%, color-mix(in oklab, ${brandColor} 65%, white) 0%, ${brandColor} 40%, var(--sognos-navy-dark) 100%)`,
              }}
            >
              {companyLogoUrl ? (
                <Image
                  src={companyLogoUrl}
                  alt={story.company}
                  width={480}
                  height={144}
                  priority
                  className="h-20 w-auto max-w-[55%] object-contain brightness-0 invert"
                />
              ) : (
                <p className="font-heading text-2xl font-medium tracking-tight text-white lg:text-4xl">
                  {story.company}
                </p>
              )}
            </div>
          </div>

          {story.quote && (
            <figure className="mx-auto mt-14 max-w-2xl pb-20 text-center lg:mt-20">
              <blockquote className="font-heading text-2xl font-normal leading-snug tracking-tight text-white lg:text-3xl">
                <span aria-hidden="true" className="text-sognos-blue-accent">
                  &ldquo;
                </span>
                {story.quote}
                <span aria-hidden="true" className="text-sognos-blue-accent">
                  &rdquo;
                </span>
              </blockquote>

              {(quoteAuthor || quoteRole) && (
                <figcaption className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                  {quoteAuthor && (
                    <span className="text-base font-medium text-white">
                      {quoteAuthor}
                    </span>
                  )}
                  {quoteAuthor && quoteRole && (
                    <span aria-hidden="true" className="text-white/30">
                      /
                    </span>
                  )}
                  {quoteRole && (
                    <span className="text-xs font-medium uppercase tracking-widest text-white/60">
                      {quoteRole}
                    </span>
                  )}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </HeroScrollFade>

      {/* ── Body: sticky rail + content (quote card + prose) ── */}
      <section className="bg-white pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* 3-col from lg: [rail 300px] [progress line 48px] [prose 1fr].
              Same track definition as the knowledge-hub template, so both
              article families share one body layout. */}
          <div className="lg:grid lg:grid-cols-[300px_48px_1fr] lg:gap-x-10">
            {/* Column 1 — article scroll-spy nav (sticky) stacked above meta rail.
                `contents` below lg so this wrapper creates no box: the nav's own
                sticky mobile dropdown is then bounded by the full-height body
                grid rather than this self-sized column, so it tracks the whole
                article. From lg it becomes a normal sticky grid item. */}
            <div className="contents lg:block lg:sticky lg:top-36 lg:self-start">
              {sections.length > 0 && (
                <>
                  <ArticleScrollNav sections={sections} showTrack={false} />
                  <div className="my-6 hidden h-px bg-sognos-line lg:block" />
                </>
              )}
              <StoryMetaRail
                industry={industryValue}
                state={stateValue}
                size={sizeValue}
                product={productValue}
                downloadUrl={story.downloadUrl}
              />
            </div>

            {/* Column 2 — read-progress line, stretches to prose height via grid */}
            <div className="hidden lg:block">
              <ArticleProgressLine />
            </div>

            <ScrollReveal y={24} className="min-w-0">
              {/* Body prose */}
              <div className={`${PROSE} ${ARTICLE_PROSE_MAX_W}`}>
                <PortableText
                  value={story.body}
                  components={portableComponents}
                />
              </div>
              <aside
                className={`mt-16 bg-sognos-blue-accent p-6 text-white md:px-8 rounded md:py-8 ${ARTICLE_PROSE_MAX_W}`}
              >
                <h2 className="font-heading text-3xl font-medium tracking-tight text-white text-balance md:text-3xl">
                  Book a demo today
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90">
                  Discover how one intelligent platform helps you simplify
                  operations, empower your workforce, and make faster,
                  data-driven decisions.
                </p>
                <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <SolutionHeroDemoButton
                    label="Book a demo"
                    className="rounded bg-white text-sognos-navy"
                  />
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-base font-medium text-white transition-opacity hover:opacity-70"
                  >
                    Talk to Sales
                    <span aria-hidden="true">&#8599;</span>
                  </Link>
                </div>
              </aside>
              <ArticleProseFooter
                backHref="/customer-stories"
                backLabel="All customer stories"
                postUrl={postUrl}
                className={ARTICLE_PROSE_MAX_W}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── "What to read next" 3-up ── */}
      {latest.length > 0 && (
        <section className="bg-gray-50">
          <div className="mx-auto w-full max-w-7xl px-6 pt-16 pb-14 lg:pt-24">
            <div className="flex items-end justify-between gap-x-6 gap-y-6 max-sm:flex-col max-sm:items-start">
              <h2 className="font-heading text-3xl font-normal tracking-tight text-sognos-heading text-balance md:text-4xl">
                What to read next
              </h2>
              <SeeMoreLink className="max-sm:hidden" />
            </div>
          </div>
          <div className="mx-auto w-full max-w-7xl px-6 pb-16 lg:pb-24">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
              {latest.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
