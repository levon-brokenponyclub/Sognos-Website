import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
import ArticleProseFooter from "@/components/layout/sections/shared/ArticleProseFooter";
import {
  type PortableBlock,
  slugify,
  blockPlainText,
  extractHeadings,
} from "@/lib/portableText";
import { ARTICLE_PROSE_MAX_W } from "@/lib/articleLayout";
import PullQuote from "@/components/portable-text/PullQuote";
import QuoteCallout from "@/components/portable-text/QuoteCallout";
import StatRow from "@/components/portable-text/StatRow";
import HeroScrollFade from "@/components/layout/sections/customer-stories/HeroScrollFade";
import { SeeMoreLink } from "@/components/layout/sections/ProductCustomerStories";
import ScrollReveal from "@/components/ui/ScrollReveal";
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
    bullet: ({ children }) => <ul className="mb-6 space-y-2 border-t border-sognos-line">{children}</ul>,
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
      <HeroScrollFade className="relative overflow-hidden bg-sognos-navy pt-32 lg:pt-40 lg:pb-0">
        <div className="mx-auto max-w-7xl px-6">
          {/* Back link */}
          <Link
            href="/customer-stories"
            className="group inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-sognos-blue-accent"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-200 group-hover:text-sognos-blue-accent group-hover:-translate-x-0.5"
            />
            Back to Customer Stories
          </Link>

          {/* Two-up: left meta rail (line + Case Study + Industry) / right title + pull-quote */}
          <div className="mt-10 lg:mt-14 lg:grid lg:grid-cols-[24rem_1fr] lg:gap-16 xl:gap-20">
            {/* Left rail — hero-only vertical line, does NOT extend into the body */}
            <div className="mb-10 space-y-4 border-l border-white/20 pl-6 lg:mb-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Customer Story
              </p>
              {industryValue && (
                <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
                  {industryValue}
                </p>
              )}
            </div>

            {/* Right — title + pull-quote */}
            <div>
              {companyLogoUrl && (
                <Image
                  src={companyLogoUrl}
                  alt={story.company}
                  width={160}
                  height={48}
                  className="mb-8 h-10 w-auto max-w-[150px] shrink-0 object-contain brightness-0 invert"
                />
              )}

              <h1 className="max-w-3xl font-heading text-3xl font-normal leading-tight tracking-tight text-white lg:text-8xl">
                {story.title}
              </h1>

              {story.quote && (
                <figure className="mt-10 lg:mt-24 pb-20">
                  <blockquote
                    className={`${ARTICLE_PROSE_MAX_W} max-w-lg font-heading text-xl font-normal leading-snug tracking-tight text-white md:text-xl`}
                  >
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>
                  {(quoteAuthor || quoteRole) && (
                    <figcaption
                      className={`mt-12 flex items-center gap-8 ${ARTICLE_PROSE_MAX_W}`}
                    >
                      <div>
                        {quoteAuthor && (
                          <p className="text-base font-semibold text-white">
                            {quoteAuthor}
                          </p>
                        )}
                        {quoteRole && (
                          <p className="mt-0.5 text-sm text-white/70">
                            {quoteRole}
                          </p>
                        )}
                      </div>
                    </figcaption>
                  )}
                </figure>
              )}
            </div>
          </div>
        </div>
      </HeroScrollFade>

      {/* ── Body: sticky rail + content (quote card + prose) ── */}
      <section className="bg-white pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="lg:grid lg:grid-cols-3 lg:gap-16 xl:grid-cols-3 xl:gap-20">
            {/* Column 1 — article scroll-spy nav (sticky) stacked above meta rail */}
            <div className="lg:col-span-1 lg:sticky lg:top-[100px] lg:self-start">
              {sections.length > 0 && (
                <div className="hidden lg:block">
                  <ArticleScrollNav sections={sections} />
                  <div className="my-6 h-px bg-sognos-line" />
                </div>
              )}
              <StoryMetaRail
                state={stateValue}
                size={sizeValue}
                product={productValue}
                downloadUrl={story.downloadUrl}
              />
            </div>

            <ScrollReveal y={24} className="min-w-0 md:col-span-2">
              {/* Body prose */}
              <div className={`${PROSE} ${ARTICLE_PROSE_MAX_W}`}>
                <PortableText
                  value={story.body}
                  components={portableComponents}
                />
              </div>
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
