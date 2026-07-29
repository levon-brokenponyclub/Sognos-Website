import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import {
  getAllKnowledgePostSlugs,
  getKnowledgePostArchive,
  getKnowledgePostBySlug,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import {
  ArticleCard,
  type Article,
} from "@/components/layout/sections/KnowledgeHubArchive";
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
import { SeeMoreLink } from "@/components/layout/sections/ProductCustomerStories";
import SolutionHeroDemoButton from "@/components/layout/sections/SolutionHeroDemoButton";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export const revalidate = 60;

// ─── Shared styles ──────────────────────────────────────────────────────────

const H2 =
  "mt-0 mb-4 font-heading text-2xl font-medium leading-snug tracking-tight text-sognos-heading scroll-mt-28 md:scroll-mt-32";
const PROSE =
  "text-base leading-relaxed text-sognos-body [&_p]:mb-5 [&_ul]:mb-6 [&_ul]:space-y-2 [&_li]:text-base [&_li]:leading-relaxed";
const HERO_EXCERPT_PLACEHOLDER =
  "A practical perspective on replacing disconnected systems with a connected platform that gives teams clearer context, safer workflows, and better outcomes.";

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllKnowledgePostSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getKnowledgePostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Amigo-style inline meta date, e.g. "March 10, 2026" (uppercased by CSS).
function formatMetaDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

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
    bullet: ({ children }) => <ul className="mb-6 space-y-2">{children}</ul>,
    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-base leading-relaxed">
        <span
          aria-hidden="true"
          className="mt-2 size-1.5 shrink-0 bg-sognos-blue-accent"
        />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-base leading-relaxed">{children}</li>
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
    pullQuote: ({ value }) => <PullQuote {...value} />,
    quoteCallout: ({ value }) => <QuoteCallout {...value} />,
    statRow: ({ value }) => <StatRow {...value} />,
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function KnowledgeHubPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, archive] = await Promise.all([
    getKnowledgePostBySlug(slug),
    getKnowledgePostArchive(),
  ]);

  if (!post) notFound();

  const postUrl = `https://sognos.com.au/knowledge-hub/${slug}`;
  const heroUrl = post.heroImage
    ? urlFor(post.heroImage).width(1400).auto("format").url()
    : null;
  const sections = extractHeadings(post.body);

  const latest: Article[] = archive
    .filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      category: p.category,
      title: p.title,
      excerpt: p.excerpt,
      href: `/knowledge-hub/${p.slug}`,
      image: p.heroImage
        ? urlFor(p.heroImage).width(720).auto("format").url()
        : "",
      industry: p.industry ?? null,
      useCase: p.useCase ?? null,
      publishedAt: p.date ?? null,
      readTime: p.readTime ?? null,
      author: p.author ?? null,
    }));

  return (
    <main className="bg-white">
      <ScrollProgress />

      {/* ── Hero — back link, then meta+title with featured image below ── */}
      <section className="overflow-hidden bg-white pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          {/* Back link — above the rail line */}
          <Link
            href="/knowledge-hub"
            className="group inline-flex items-center gap-2 text-sm font-medium text-sognos-body/60 transition-colors hover:text-sognos-body"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Back to Knowledge Hub
          </Link>

          <div className="mt-10 border-l border-sognos-line pl-6 lg:grid lg:grid-cols-4 lg:gap-x-16 xl:gap-x-20">
            {/* Left — border-line starts at the meta row, then title */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                <span>{post.category}</span>
                <span aria-hidden="true" className="text-sognos-line">
                  |
                </span>
                <span>{formatMetaDate(post.date)}</span>
                {post.readTime && (
                  <>
                    <span aria-hidden="true" className="text-sognos-line">
                      |
                    </span>
                    <span>{post.readTime}</span>
                  </>
                )}
              </div>
              <h1 className="mt-6 font-heading text-3xl font-medium leading-tight tracking-tight text-sognos-heading lg:text-8xl">
                {post.title}
              </h1>
            </div>

            {/* Excerpt rail — placeholder copy until article excerpts are approved */}
            <div className="mt-10 lg:col-span-2 lg:col-start-3 lg:row-start-1 lg:mt-60 lg:self-end">
              <div className="relative border-l border-sognos-line pl-6 lg:min-h-[210px] lg:pl-10">
                <span
                  aria-hidden="true"
                  className="absolute -left-px top-0 hidden h-6 w-1 bg-sognos-blue-accent lg:block"
                />
                <p className="max-w-md font-heading text-xl font-normal leading-snug tracking-tight text-sognos-heading md:text-xl">
                  {HERO_EXCERPT_PLACEHOLDER}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body — sticky scroll-spy nav + prose ── */}
      <section className="bg-white pt-0 pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-16 lg:gap-y-16 xl:gap-x-20">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-sognos-line lg:block"
            />

            {/* Featured image — aligned to the prose/content column below */}
            {heroUrl && (
              <div
                id="article-featured-image"
                className={`mb-12 w-full lg:col-span-2 lg:col-start-2 lg:row-start-1 lg:mb-0 lg:ml-0 ${ARTICLE_PROSE_MAX_W}`}
              >
                <div className="relative aspect-[16/8] w-full overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroUrl}
                    alt={post.title}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            )}

            {/* Col 1 — sticky scroll-spy nav */}
            <div className="lg:col-span-1 lg:row-start-2 lg:self-stretch">
              {sections.length > 0 && (
                <div className="hidden lg:sticky lg:top-[100px] lg:block">
                  <ArticleScrollNav sections={sections} showTrack={false} />
                </div>
              )}
            </div>

            {/* Col 2 — prose */}
            <div className="min-w-0 md:col-span-2 lg:col-start-2 lg:row-start-2">
              <div className={`${PROSE} ${ARTICLE_PROSE_MAX_W}`}>
                <PortableText
                  value={post.body}
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
                backHref="/knowledge-hub"
                backLabel="Knowledge Hub"
                postUrl={postUrl}
                className={ARTICLE_PROSE_MAX_W}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Latest articles ── */}
      {latest.length > 0 && (
        <section className="border-t border-gray-50 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
            <div className="mb-10 flex items-end justify-between gap-x-6 gap-y-6 max-sm:flex-col max-sm:items-start lg:mb-12">
              <h2 className="font-heading text-3xl font-normal tracking-tight text-sognos-heading text-balance md:text-4xl">
                The latest news
              </h2>
              <SeeMoreLink
                className="max-sm:hidden"
                href="/knowledge-hub"
                label="See more on the blog"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
