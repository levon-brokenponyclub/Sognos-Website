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
import StoryArticleNav, {
  type ArticleSection,
} from "@/components/layout/sections/customer-stories/StoryArticleNav";
import HeroScrollFade from "@/components/layout/sections/customer-stories/HeroScrollFade";
import { SeeMoreLink } from "@/components/layout/sections/ProductCustomerStories";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BRAND_BG } from "@/lib/customerStoryBrand";

export const revalidate = 60;

// ─── Shared styles ──────────────────────────────────────────────────────────

const H2 =
  "mt-10 mb-4 font-heading text-2xl font-medium leading-snug tracking-tight text-sognos-heading scroll-mt-28 md:scroll-mt-32";
const PROSE =
  "max-w-none text-base leading-relaxed text-sognos-body [&_p]:mb-5 [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-base [&_li]:leading-relaxed";

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

// ─── Article-heading extraction (server pre-pass over Portable Text) ──────────

type PortableBlock = {
  _type?: string;
  style?: string;
  children?: { text?: string }[];
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function blockPlainText(block: PortableBlock | undefined): string {
  if (!block || !Array.isArray(block.children)) return "";
  return block.children
    .map((c) => c?.text ?? "")
    .join("")
    .trim();
}

function extractHeadings(body: unknown): ArticleSection[] {
  if (!Array.isArray(body)) return [];
  return (body as PortableBlock[])
    .filter((b) => b?._type === "block" && b?.style === "h2")
    .map((b) => {
      const label = blockPlainText(b);
      return { id: slugify(label), label };
    })
    .filter((h) => h.label && h.id);
}

function sidebarValue(
  sidebar: { label: string; value: string }[] | undefined,
  label: string,
): string | undefined {
  return sidebar?.find((f) => f.label.toLowerCase() === label.toLowerCase())
    ?.value;
}

const QUOTE_CARD_BG: Record<string, string> = {
  sognoscare: "bg-sognos-care-dark",
  sognosroster: "bg-sognos-roster-dark",
  sognosgenogram: "bg-sognos-genogram-dark",
};

function quoteCardBg(product: string | undefined): string {
  const key = product?.toLowerCase().replace(/\s+/g, "");
  return (key && QUOTE_CARD_BG[key]) || "bg-sognos-navy-dark";
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
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc space-y-2 pl-6">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
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
  const { author: quoteAuthor, role: quoteRole } = parseQuoteAuthor(
    story.quoteAuthor,
  );
  const industryValue = sidebarValue(story.sidebar, "Industry");
  const stateValue = sidebarValue(story.sidebar, "State");
  const sizeValue = sidebarValue(story.sidebar, "Size");
  const productValue = sidebarValue(story.sidebar, "Product");
  const brandBg = story.brandColor ?? BRAND_BG[story.company];
  const category = "Customer Stories";
  const sections = extractHeadings(story.body);

  const stats = [
    { label: "Industry", value: industryValue },
    { label: "State", value: stateValue },
    { label: "Size", value: sizeValue },
  ].filter((s) => s.value);

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
      {/* ── Dark hero (scroll parallax + fade) — layout matches Diffblue ref ── */}
      <HeroScrollFade className="relative overflow-hidden bg-sognos-navy pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Back link */}
          <Link
            href="/customer-stories"
            className="group inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-white"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Back to Customer Stories
          </Link>

          {/* Category — simplified label, no filled pill */}
          <p className="mt-10 text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
            {category}
          </p>

          {/* Title — same size as before */}
          <h1 className="mt-4 max-w-4xl font-heading text-3xl font-normal leading-tight tracking-tight text-white lg:text-5xl">
            {story.title}
          </h1>

          {/* 3-col grid: meta col-1 (description top + stats bottom), image col-2 */}
          <div className="mt-12 lg:mt-16 lg:grid lg:grid-cols-3 lg:gap-16 xl:gap-20">
            {/* Image col — right, col-span-2 */}
            {story.heroImage && (
              <div className="lg:col-span-2">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded bg-white/5">
                  <Image
                    src={urlFor(story.heroImage)
                      .width(1440)
                      .auto("format")
                      .url()}
                    alt={story.company}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}
            {/* Meta col — description top, Industry/State/Size bottom */}
            <div className="mb-10 flex flex-col lg:col-span-1 lg:mb-0">
              {story.description && (
                <p className="text-xl leading-normal text-white">
                  {story.description}
                </p>
              )}

              {stats.length > 0 && (
                <dl className="mt-10 flex flex-col lg:mt-auto lg:pt-16">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="border-t border-white/10 py-4"
                    >
                      <dt className="text-xs font-semibold uppercase tracking-widest text-white/80">
                        {stat.label}
                      </dt>
                      <dd className="mt-2 text-sm font-medium text-white">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
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
                  <StoryArticleNav sections={sections} />
                  <div className="my-6 h-px bg-sognos-line" />
                </div>
              )}
              <StoryMetaRail
                customer={story.company}
                industry={industryValue}
                state={stateValue}
                size={sizeValue}
                downloadUrl={story.downloadUrl}
                postUrl={postUrl}
              />
            </div>

            <ScrollReveal y={24} className="min-w-0 md:col-span-2">
              {/* Body prose */}
              <div className={`${PROSE} max-w-[46rem]`}>
                <PortableText
                  value={story.body}
                  components={portableComponents}
                />
              </div>

              {/* Quote card — end of content (matches ProductCustomerStories card body, no logo) */}
              {story.quote && (
                <div
                  className={`mt-12 rounded-lg p-6 lg:mt-16 lg:p-10 ${brandBg ? "" : quoteCardBg(productValue)}`}
                  style={brandBg ? { backgroundColor: brandBg } : undefined}
                >
                  <blockquote>
                    <p className="font-angellist text-xl md:text-2xl lg:text-3xl font-normal leading-tight tracking-tight text-white">
                      {story.quote}
                    </p>
                  </blockquote>
                  {(quoteAuthor || quoteRole) && (
                    <div className="mt-6 lg:mt-8">
                      {quoteAuthor && (
                        <p className="text-base font-bold text-white">
                          {quoteAuthor}
                        </p>
                      )}
                      {quoteRole && (
                        <p className="mt-0.5 text-base text-white">
                          {quoteRole}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
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
