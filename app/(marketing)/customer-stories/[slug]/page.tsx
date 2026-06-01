import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import {
  getAllCustomerStorySlugs,
  getCustomerStoryBySlug,
  getCustomerStoryNav,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export const revalidate = 60;

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

// ─── PortableText components ──────────────────────────────────────────────────

const portableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 font-heading text-2xl font-medium leading-snug tracking-tight text-prussian-blue-800">
        {children}
      </h2>
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
  const [story, nav] = await Promise.all([
    getCustomerStoryBySlug(slug),
    getCustomerStoryNav(),
  ]);

  if (!story) notFound();

  const postUrl = `https://sognos.com.au/customer-stories/${slug}`;

  const currentIdx = nav.findIndex((n) => n.slug === slug);
  const prev = currentIdx > 0 ? nav[currentIdx - 1] : null;
  const next =
    currentIdx >= 0 && currentIdx < nav.length - 1 ? nav[currentIdx + 1] : null;

  const heroUrl = story.heroImage
    ? urlFor(story.heroImage).width(1400).auto("format").url()
    : null;
  const companyLogoUrl = story.companyLogo
    ? urlFor(story.companyLogo).width(520).auto("format").url()
    : null;

  return (
    <main className="bg-white">
      {/* ── Hero ── */}
      <section className="bg-gray-200/70 pb-12 pt-36 md:pb-18 md:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-20 lg:flex-row lg:items-center lg:justify-between lg:gap-40">
            <div className="lg:w-1/2 lg:max-w-[32.5rem]">
              <Link
                href="/customer-stories"
                className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-prussian-blue-800/60 transition-colors hover:text-prussian-blue-800"
              >
                <ArrowLeft
                  size={14}
                  className="transition-transform duration-200 group-hover:-translate-x-0.5"
                />
                Back to Customer Stories
              </Link>

              <h1 className="font-heading text-2xl font-medium leading-tight tracking-tight text-prussian-blue-800 lg:text-4xl xl:text-4xl">
                {story.title}
              </h1>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 lg:mt-14">
                <div className="mb-5 flex items-center gap-3">
                  <span className="text-sm text-prussian-blue-800/60">
                    {formatDate(story.date)}
                  </span>
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

            <div className="overflow-hidden rounded-lg h-64 lg:h-100 lg:max-h-100 w-full lg:w-1/2 lg:shrink-0 relative flex flex-col">
              {heroUrl && (
                <Image
                  src={heroUrl}
                  alt={story.company}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              )}
              {companyLogoUrl && (
                <div className="absolute inset-0 z-10 flex items-center justify-center px-8">
                  <Image
                    src={companyLogoUrl}
                    alt={story.company}
                    width={260}
                    height={64}
                    className="h-10 lg:h-16 w-auto max-w-[200px] lg:max-w-[260px] object-contain brightness-0 invert"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Pull quote ── */}
      {story.quote && (
        <section className="bg-brand py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-6">
            <blockquote>
              <p className="font-heading text-lg lg:text-[26px] font-normal leading-snug tracking-tight text-white">
                &ldquo;{story.quote}&rdquo;
              </p>
              {story.quoteAuthor && (
                <footer className="mt-6 text-sm font-semibold text-white/80">
                  {story.quoteAuthor}
                </footer>
              )}
            </blockquote>
          </div>
        </section>
      )}

      {/* ── Body ── */}
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-12 lg:pb-32 lg:pt-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[360px_1fr] lg:gap-12">
          <aside className="lg:sticky lg:top-25 lg:self-start w-full lg:max-w-90 lg:w-90">
            <div>
              <h3 className="font-heading text-xl lg:text-xl font-medium text-prussian-blue-800">
                {story.company}
              </h3>
              <p className="mt-3 text-md leading-relaxed text-sognos-body">
                {story.description}
              </p>

              <div className="my-6 h-px bg-neutral-200" />

              <div className="space-y-5">
                {story.sidebar?.map(
                  (field: { label: string; value: string }) => (
                    <div
                      key={field.label}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <span className="shrink-0 text-sm text-prussian-blue-800">
                        {field.label}
                      </span>
                      <span className="text-right text-sm text-sognos-body">
                        {field.value}
                      </span>
                    </div>
                  ),
                )}
              </div>

              {story.downloadUrl && (
                <>
                  <div className="my-6 h-px bg-neutral-200" />
                  <a
                    href={story.downloadUrl}
                    download
                    className="flex w-full items-center justify-center gap-2 rounded bg-prussian-blue-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-prussian-blue-700"
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
                </>
              )}
            </div>
          </aside>

          <div className="flex-1 max-w-none text-base leading-relaxed text-sognos-text-body">
            <PortableText value={story.body} components={portableComponents} />
          </div>
        </div>
      </div>

      {/* ── Prev / Next ── */}
      {(prev || next) && (
        <section className="border-t border-gray-200 bg-gray-200/70">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/customer-stories/${prev.slug}`}
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
                      {prev.company}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/customer-stories/${next.slug}`}
                  className="group flex items-center justify-end gap-4 rounded-lg bg-white p-5 transition-colors hover:bg-gray-50 text-right"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                      Next
                    </p>
                    <p className="text-sm font-medium text-prussian-blue-800 line-clamp-1 group-hover:text-brand transition-colors duration-200">
                      {next.company}
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
