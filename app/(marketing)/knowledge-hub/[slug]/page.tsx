import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import {
  getAllKnowledgePostSlugs,
  getKnowledgePostBySlug,
  getKnowledgePostNav,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

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
  "mt-10 mb-4 font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800";
const PROSE =
  "max-w-none text-base leading-relaxed text-sognos-text-body [&_p]:mb-4 [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-base [&_li]:leading-relaxed";

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
    normal: ({ children }) => <p className="mb-4">{children}</p>,
    h2: ({ children }) => <h2 className={H2}>{children}</h2>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-prussian-blue-800/20 pl-4 italic text-prussian-blue-800/80">
        {children}
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
        className="text-brand hover:underline"
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

export default async function KnowledgeHubPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, nav] = await Promise.all([
    getKnowledgePostBySlug(slug),
    getKnowledgePostNav(),
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

  const currentIdx = nav.findIndex((n) => n.slug === slug);
  const prev = currentIdx > 0 ? nav[currentIdx - 1] : null;
  const next =
    currentIdx >= 0 && currentIdx < nav.length - 1
      ? nav[currentIdx + 1]
      : null;

  return (
    <main className="bg-white">
      {/* ── Hero ── */}
      <section className="bg-gray-100 pb-12 pt-36 md:pb-18 md:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            {/* Left */}
            <div className="lg:w-1/2 lg:max-w-[32.5rem]">
              <Link
                href="/knowledge-hub"
                className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-prussian-blue-800/60 transition-colors hover:text-prussian-blue-800"
              >
                <ArrowLeft
                  size={14}
                  className="transition-transform duration-200 group-hover:-translate-x-0.5"
                />
                Back to Knowledge Hub
              </Link>

              <div className="mb-5 flex items-center gap-3">
                <span
                  className={`inline-flex items-center rounded border px-2 py-1 text-xs font-medium ${badge}`}
                >
                  {post.category}
                </span>
                <span className="text-sm text-prussian-blue-800/60">
                  {formatDate(post.date)}
                </span>
              </div>

              <h1 className="font-heading text-2xl font-medium leading-tight tracking-tight text-prussian-blue-800 lg:text-4xl xl:text-4xl">
                {post.title}
              </h1>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 lg:mt-14">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-prussian-blue-800/10">
                    <span className="text-xs font-semibold text-prussian-blue-800">
                      {author.charAt(0)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-prussian-blue-800/60">
                      Written by
                    </span>
                    <span className="text-sm font-medium leading-none text-prussian-blue-800">
                      {author}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-prussian-blue-800/60">
                    Share
                  </span>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded bg-prussian-blue-800/5 p-2 transition-colors hover:bg-prussian-blue-800/20"
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
                    className="inline-flex h-10 w-10 items-center justify-center rounded bg-prussian-blue-800/5 p-2 transition-colors hover:bg-prussian-blue-800/20"
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
                    className="inline-flex h-10 w-10 items-center justify-center rounded bg-prussian-blue-800/5 p-2 transition-colors hover:bg-prussian-blue-800/20"
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
              </div>

              <div className="mt-5 border-t border-dashed border-prussian-blue-800/20" />
            </div>

            {/* Right - image */}
            <div className="overflow-hidden rounded-lg h-80 max-h-80 lg:w-1/2 lg:max-w-[41rem] lg:min-h-[380px] lg:max-h-[380px] relative">
              {heroUrl && (
                <Image
                  src={heroUrl}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <div className={PROSE}>
          <PortableText value={post.body} components={portableComponents} />
        </div>
      </div>

      {/* ── Prev / Next ── */}
      {(prev || next) && (
        <section className="border-t border-gray-200 bg-gray-200/70">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/knowledge-hub/${prev.slug}`}
                  className="group flex items-center gap-4 rounded-lg bg-white p-5 transition-colors hover:bg-gray-50"
                >
                  <ArrowLeft
                    size={16}
                    className="shrink-0 text-gray-400 transition-transform duration-200 group-hover:-translate-x-0.5"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                      Previous
                    </p>
                    <p className="text-sm font-medium text-prussian-blue-800 line-clamp-1 group-hover:text-brand transition-colors duration-200">
                      {prev.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/knowledge-hub/${next.slug}`}
                  className="group flex items-center justify-end gap-4 rounded-lg bg-white p-5 transition-colors hover:bg-gray-50 text-right"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                      Next
                    </p>
                    <p className="text-sm font-medium text-prussian-blue-800 line-clamp-1 group-hover:text-brand transition-colors duration-200">
                      {next.title}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="shrink-0 text-gray-400 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
