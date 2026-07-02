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
} from "@/components/sections/KnowledgeHubArchive";

export const revalidate = 60;

// ─── Badge styles ─────────────────────────────────────────────────────────────

const BADGE_STYLES: Record<string, string> = {
  Milestone: "bg-indigo-50 text-indigo-700 border-indigo-100",
  News: "bg-blue-50 text-blue-700 border-blue-100",
  Events: "bg-amber-50 text-amber-700 border-amber-100",
  Webinar: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Insights: "bg-violet-50 text-violet-700 border-violet-100",
};

// ─── Shared styles ──────────────────────────────────────────────────────────

const H2 =
  "mt-10 mb-4 font-heading text-2xl font-medium leading-snug tracking-tight text-sognos-heading";
const PROSE =
  "max-w-none text-base leading-relaxed text-sognos-body [&_p]:mb-5 [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-base [&_li]:leading-relaxed";

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
    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-base leading-relaxed">{children}</li>
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
  },
};

// ─── Share icons ──────────────────────────────────────────────────────────────

function ShareIcons({ postUrl }: { postUrl: string }) {
  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 w-9 items-center justify-center rounded bg-sognos-navy/5 p-2 transition-colors hover:bg-sognos-navy/20"
        aria-label="Share on LinkedIn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 25 24"
          fill="none"
          className="h-4 w-4"
        >
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
        className="inline-flex h-9 w-9 items-center justify-center rounded bg-sognos-navy/5 p-2 transition-colors hover:bg-sognos-navy/20"
        aria-label="Share on X"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 21 20"
          fill="none"
          className="h-4 w-4"
        >
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
        className="inline-flex h-9 w-9 items-center justify-center rounded bg-sognos-navy/5 p-2 transition-colors hover:bg-sognos-navy/20"
        aria-label="Share on Facebook"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4"
        >
          <path
            d="M14 13.5h2.5l1-4H14V7.5c0-1.03 0-2 2-2H17.5V2.14C17.17 2.1 15.94 2 14.64 2 11.93 2 10 3.66 10 6.7V9.5H7v4h3V22h4v-8.5Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
}

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

  const heroUrl = post.heroImage
    ? urlFor(post.heroImage).width(1400).auto("format").url()
    : null;
  const author = post.author ?? "Sognos Solutions";
  const badge =
    BADGE_STYLES[post.category] ??
    "bg-neutral-50 text-neutral-600 border-neutral-100";
  const postUrl = `https://sognos.com.au/knowledge-hub/${slug}`;

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
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-16 xl:grid-cols-[220px_1fr] xl:gap-20">
          {/* ── Sticky left rail ── */}
          <aside className="mb-12 lg:sticky lg:top-[104px] lg:mb-0 lg:self-start">
            <Link
              href="/knowledge-hub"
              className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-sognos-body/60 transition-colors hover:text-sognos-body"
            >
              <ArrowLeft
                size={14}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              Back to Knowledge Hub
            </Link>

            <div className="flex flex-col gap-7">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-sognos-body/40">
                  Category
                </p>
                <span
                  className={`inline-flex items-center rounded border px-2 py-1 text-xs font-medium ${badge}`}
                >
                  {post.category}
                </span>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-sognos-body/40">
                  Written by
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sognos-navy/10">
                    <span className="text-xs font-semibold text-sognos-body">
                      {author.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm font-medium leading-tight text-sognos-body">
                    {author}
                  </span>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-sognos-body/40">
                  Share
                </p>
                <ShareIcons postUrl={postUrl} />
              </div>
            </div>
          </aside>

          {/* ── Main prose column ── */}
          <div className="mx-auto w-full max-w-[46rem]">
            <h1 className="font-heading text-3xl font-medium leading-tight tracking-tight text-sognos-heading lg:text-5xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-5 text-lg leading-relaxed text-sognos-body/70">
                {post.excerpt}
              </p>
            )}

            <p className="mt-6 text-xs font-medium tracking-wide text-sognos-body/50 uppercase">
              {formatDate(post.date)}
              {post.readTime ? ` — ${post.readTime}` : ""}
            </p>

            {heroUrl && (
              <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-lg">
                <Image
                  src={heroUrl}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 46rem, 100vw"
                />
              </div>
            )}

            <div className={`${PROSE} mt-10`}>
              <PortableText value={post.body} components={portableComponents} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Latest articles ── */}
      {latest.length > 0 && (
        <section className="border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
            <p className="mb-8 text-sm font-semibold text-sognos-heading">
              <span className="mr-1.5 text-sognos-blue-accent">●</span>Latest
              articles
            </p>
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
