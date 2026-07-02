import Link from "next/link";

export type NewsInsightArticle = {
  category: string;
  title: string;
  href: string;
  image: string;
  date?: string;
};

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 13"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0.75 6.46875H11.25M11.25 6.46875L6 11.7188M11.25 6.46875L6 1.21875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Cohere Home slot: "The latest news"
// Header: heading left + "See more on the blog" link right.
// Body: 3 callout cards — tinted panel, image on top (aspect 2/1), category, title,
// then date + Read more/arrow row. Hover: image zoom, panel lift, arrow nudge.
function SeeMoreLink({ className }: { className?: string }) {
  return (
    <Link
      href="/knowledge-hub"
      className={`group inline-flex items-center gap-x-1 text-base font-medium text-sognos-heading ${className ?? ""}`}
    >
      <span>See more on the blog</span>
      <span className="ml-1 inline-flex transition-all duration-300 ease-in-out group-hover:ml-2">
        <ArrowIcon className="w-3" />
      </span>
    </Link>
  );
}

function CalloutCard({ article }: { article: NewsInsightArticle }) {
  const date = formatDate(article.date);
  return (
    <Link
      href={article.href}
      className="callout-card group/card relative flex h-full w-full max-w-[617px] flex-col overflow-hidden rounded-lg"
    >
      {/* Top panel — image, category, title */}
      <div className="flex flex-1 flex-col rounded-t-lg bg-gray-200 p-4">
        {article.image && (
          <div className="relative mb-5 aspect-[2/1] w-full overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.image}
              alt={article.title}
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </div>
        )}

        {(article.category || date) && (
          <div className="mb-3 flex items-center justify-between gap-x-3 text-xs text-sognos-muted">
            {article.category ? (
              <span className="flex items-center gap-x-2">
                <span className="size-1.5 rounded-full bg-sognos-muted" />
                <span>{article.category}</span>
              </span>
            ) : (
              <span />
            )}
            {date && <time>{date}</time>}
          </div>
        )}

        <h3 className="font-heading text-lg font-medium leading-snug tracking-tight text-sognos-heading text-balance transition-colors duration-300 group-hover/card:text-black lg:text-xl">
          {article.title}
        </h3>
      </div>

      {/* Morphing footer notch (Cohere exact path) */}
      <svg
        className="callout-card__svg -mt-px h-[72px]"
        viewBox="0 0 670 111"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="#e5e7eb"
          d="M670 0H0V91C0 102.046 8.9543 111 20 111H518.641C526.216 111 533.14 106.721 536.529 99.9469L570.988 31.0531C574.377 24.2789 581.301 20 588.875 20H650C661.046 20 670 11.0457 670 0Z"
        />
      </svg>

      {/* Footer row — Read More text (left), arrow in notch (right) */}
      <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-4 md:bottom-4">
        <span className="text-sm font-medium text-sognos-heading transition-colors duration-300 group-hover/card:text-black">
          Read more
        </span>
        <span className="inline-flex text-sognos-heading transition-all duration-300 group-hover/card:translate-x-0.5 group-hover/card:text-black">
          <ArrowIcon className="w-4" />
        </span>
      </div>
    </Link>
  );
}

export default function NewsInsightSection({
  articles,
}: {
  articles: NewsInsightArticle[];
}) {
  if (articles.length === 0) return null;

  const cards = articles.slice(0, 3);

  return (
    <section className="w-full overflow-clip bg-background pt-10 pb-12 md:pt-24 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-10 flex items-end justify-between gap-x-6 gap-y-6 max-sm:flex-col max-sm:items-start lg:mb-[54px]">
          <h2 className="font-heading text-3xl font-normal tracking-tight text-sognos-heading text-balance md:text-4xl">
            The latest news
          </h2>
          <SeeMoreLink className="max-sm:hidden" />
        </div>

        <div className="flex flex-col items-center justify-center gap-6 lg:grid lg:grid-cols-3 lg:place-content-center">
          {cards.map((article, i) => (
            <CalloutCard key={`${article.href}-${i}`} article={article} />
          ))}
        </div>

        <SeeMoreLink className="mt-8 sm:hidden" />
      </div>
    </section>
  );
}
