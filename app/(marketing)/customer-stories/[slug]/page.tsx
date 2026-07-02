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
import { ArticleCard, type Article } from "@/components/sections/KnowledgeHubArchive";
import StoryMetaRail from "@/components/sections/customer-stories/StoryMetaRail";
import HeroScrollFade from "@/components/sections/customer-stories/HeroScrollFade";

export const revalidate = 60;

// ─── Shared styles ──────────────────────────────────────────────────────────

const H2 =
  "mt-10 mb-4 font-heading text-2xl font-medium leading-snug tracking-tight text-sognos-heading";
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

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const day = d.getDate();
  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
          ? "rd"
          : "th";
  return `${day}${suffix} ${d.toLocaleDateString("en-AU", { month: "long" })} ${d.getFullYear()}`;
}

function parseQuoteAuthor(raw?: string): { author: string; role: string } {
  if (!raw) return { author: "", role: "" };
  const m = raw.match(/^(.*?),\s*(.*)$/);
  return m ? { author: m[1].trim(), role: m[2].trim() } : { author: raw.trim(), role: "" };
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

// ─── Share icons (dark — for the navy hero rail) ──────────────────────────────

function HeroShareIcons({ postUrl }: { postUrl: string }) {
  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 w-9 items-center justify-center rounded bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="Share on LinkedIn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 24" fill="none" className="h-4 w-4">
          <path
            d="M7.44 5C7.44 5.81 6.95 6.55 6.19 6.85 5.44 7.16 4.57 6.98 4.01 6.39 3.44 5.81 3.28 4.94 3.61 4.19 3.94 3.45 4.69 2.98 5.5 3c1.08.03 1.94.92 1.94 2ZM7.5 8.48H3.5V21h4V8.48Zm6.32 0H9.84V21h3.82v-6.57c0-3.66 4.77-3.96 4.77 0V21H22.5v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z"
            fill="currentColor"
          />
        </svg>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${postUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 w-9 items-center justify-center rounded bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="Share on X"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 20" fill="none" className="h-4 w-4">
          <path
            d="M15.67 1.875H18.43L12.4 8.758l7.09 9.367h-5.55L9.6 12.444l-4.97 5.681H1.87l6.44-7.363L1.51 1.875H7.2l3.93 5.192 4.54-5.192Zm-.97 15.6h1.53L6.37 3.438H4.73l10.97 14.037Z"
            fill="currentColor"
          />
        </svg>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 w-9 items-center justify-center rounded bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="Share on Facebook"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M14 13.5h2.5l1-4H14V7.5c0-1.03 0-2 2-2H17.5V2.14C17.17 2.1 15.94 2 14.64 2 11.93 2 10 3.66 10 6.7V9.5H7v4h3V22h4v-8.5Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
}

// ─── PortableText components ──────────────────────────────────────────────────

const portableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-5">{children}</p>,
    h2: ({ children }) => <h2 className={H2}>{children}</h2>,
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
  const companyLogoUrl = story.companyLogo
    ? urlFor(story.companyLogo).width(520).auto("format").url()
    : null;
  const { author: quoteAuthor, role: quoteRole } = parseQuoteAuthor(
    story.quoteAuthor,
  );
  const industryValue = sidebarValue(story.sidebar, "Industry");
  const stateValue = sidebarValue(story.sidebar, "State");
  const sizeValue = sidebarValue(story.sidebar, "Size");
  const productValue = sidebarValue(story.sidebar, "Product");
  const category = "Case Study";

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
      {/* ── Dark hero (scroll parallax + fade, matches SognosCare) ── */}
      <HeroScrollFade className="relative overflow-hidden bg-sognos-navy pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-16 xl:grid-cols-[220px_1fr] xl:gap-20">
            {/* Left rail — back-link + meta */}
            <aside className="mb-12 lg:mb-0">
              <Link
                href="/customer-stories"
                className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                <ArrowLeft
                  size={14}
                  className="transition-transform duration-200 group-hover:-translate-x-0.5"
                />
                Back to Customer Stories
              </Link>

              <div className="flex flex-col gap-7">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/40">
                    Category
                  </p>
                  <span className="inline-flex items-center rounded-lg border border-white/20 bg-white/10 px-2 py-1 text-xs font-medium text-white">
                    {category}
                  </span>
                </div>
                {productValue && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/40">
                      Product
                    </p>
                    <p className="text-sm font-medium text-white">
                      {productValue}
                    </p>
                  </div>
                )}

                {story.downloadUrl && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/40">
                      Download
                    </p>
                    <a
                      href={story.downloadUrl}
                      download
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-sognos-navy-dark transition-colors hover:bg-white/90"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4 shrink-0"
                      >
                        <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                        <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                      </svg>
                      Download Customer Story
                    </a>
                  </div>
                )}

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/40">
                    Share
                  </p>
                  <HeroShareIcons postUrl={postUrl} />
                </div>
              </div>
            </aside>

            {/* Main column — logo, title, date, stat row anchored bottom */}
            <div className="flex flex-col lg:min-h-[440px]">
              <div>
                {companyLogoUrl ? (
                  <Image
                    src={companyLogoUrl}
                    alt={story.company}
                    width={160}
                    height={40}
                    className="h-8 w-auto max-w-[180px] object-contain brightness-0 invert"
                  />
                ) : (
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                    {story.company}
                  </p>
                )}
                <h1 className="mt-6 max-w-4xl font-heading text-3xl font-medium leading-tight tracking-tight text-white lg:text-5xl">
                  {story.title}
                </h1>
                <p className="mt-6 text-xs font-medium tracking-wide text-white/40 uppercase">
                  {formatDate(story.date)}
                  {story.readTime ? ` — ${story.readTime}` : ""}
                </p>
              </div>

              {stats.length > 0 && (
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8 lg:mt-auto lg:pt-20">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                        {stat.label}
                      </p>
                      <p className="mt-2 text-lg font-medium text-white">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </HeroScrollFade>

      {/* ── Body: sticky rail + content (quote card + prose) ── */}
      <section className="bg-white pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-16 xl:grid-cols-[220px_1fr] xl:gap-20">
            <StoryMetaRail
              company={story.company}
              description={story.description}
              industry={industryValue}
              state={stateValue}
              size={sizeValue}
              product={productValue}
              downloadUrl={story.downloadUrl}
              postUrl={postUrl}
            />

            <div className="min-w-0">
              {/* Quote card (matches ProductCustomerStories card body, no image column) */}
              {story.quote && (
                <div
                  className={`${quoteCardBg(productValue)} mb-12 rounded-lg p-6 lg:mb-16 lg:p-10`}
                >
                  <blockquote>
                    <p className="font-angellist text-xl md:text-2xl lg:text-3xl font-normal leading-tight tracking-tight text-white">
                      {story.quote}
                    </p>
                  </blockquote>
                  <div className="mt-6 lg:mt-8 flex items-end justify-between gap-6">
                    <div>
                      {quoteAuthor && (
                        <p className="text-base font-bold text-white">
                          {quoteAuthor}
                        </p>
                      )}
                      {quoteRole && (
                        <p className="mt-0.5 text-base text-white">{quoteRole}</p>
                      )}
                    </div>
                    {companyLogoUrl && (
                      <Image
                        src={companyLogoUrl}
                        alt={story.company}
                        width={140}
                        height={40}
                        className="h-13 w-auto max-w-[160px] shrink-0 object-contain brightness-0 invert"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Body prose */}
              <div className={`${PROSE} max-w-[46rem]`}>
                <PortableText value={story.body} components={portableComponents} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Customer Stories 3-up ── */}
      {latest.length > 0 && (
        <section className="border-t border-gray-200 bg-gray-200/70">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
            <p className="mb-8 text-sm font-semibold text-sognos-heading">
              <span className="mr-1.5 text-sognos-blue-accent">●</span>Customer Stories
            </p>
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
