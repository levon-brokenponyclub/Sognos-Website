import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getLegalPageBySlug } from "@/lib/sanity/queries";

const LEGAL_NAV = [
  { slug: "privacy-policy", label: "Privacy Policy" },
  {
    slug: "privacy-collection-notice",
    label: "Privacy Collection Notice",
  },
  { slug: "isms-policy", label: "ISMS Policy" },
] as const;

const BODY_TEXT = "text-base leading-relaxed text-sognos-body";
const H1 =
  "font-heading text-4xl font-medium leading-tight tracking-tight text-sognos-header lg:text-4xl";
const H2 =
  "mt-16 mb-2 font-heading text-3xl font-medium leading-snug tracking-tight text-sognos-heading lg:text-3xl";
const H3 =
  "mt-12 mb-2 font-heading text-2xl font-medium leading-snug tracking-tight text-sognos-heading lg:text-2xl";
const BULLET_LIST = "mb-6 space-y-2";
const NUMBER_LIST =
  "mb-6 list-decimal space-y-2 pl-6 marker:font-medium marker:text-sognos-heading";

const portableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className={`mb-5 ${BODY_TEXT}`}>{children}</p>,
    h1: ({ children }) => <h1 className={`mb-6 mt-0 ${H1}`}>{children}</h1>,
    h2: ({ children }) => <h2 className={H2}>{children}</h2>,
    h3: ({ children }) => <h3 className={H3}>{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className={BULLET_LIST}>{children}</ul>,
    number: ({ children }) => <ol className={NUMBER_LIST}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className={`flex items-start gap-3 ${BODY_TEXT}`}>
        <span
          aria-hidden="true"
          className="mt-2 size-1.5 shrink-0 bg-sognos-blue-accent"
        />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li className={`pl-1 ${BODY_TEXT}`}>{children}</li>,
  },
  marks: {
    em: ({ children }) => <em>{children}</em>,
    strong: ({ children }) => (
      <strong className="font-medium text-sognos-heading">{children}</strong>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={
          value?.href?.startsWith("http") ? "noopener noreferrer" : undefined
        }
        className="font-normal text-sognos-muted underline decoration-dotted underline-offset-4 transition-colors duration-150 hover:text-sognos-heading"
      >
        {children}
      </a>
    ),
  },
};

export async function LegalPageRenderer({ slug }: { slug: string }) {
  const page = await getLegalPageBySlug(slug);
  if (!page) notFound();
  const hideIntro = slug === "privacy-policy";

  return (
    <main className="relative z-[1] bg-white px-6 pt-32 pb-16 md:grid md:grid-cols-[250px_1fr] md:gap-12 lg:px-10 lg:pt-40 lg:pb-24 xl:grid-cols-[280px_1fr] xl:gap-16">
      <aside className="sticky top-32 hidden self-start md:block lg:top-40">
        <nav aria-label="Legal pages">
          <ul className="space-y-1">
            {LEGAL_NAV.map((item) => {
              const isActive = item.slug === slug;
              return (
                <li key={item.slug}>
                  <Link
                    href={`/company/${item.slug}`}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "block rounded-2xl px-6 py-4 text-sm font-medium transition-colors duration-150",
                      isActive
                        ? "bg-gray-100 text-sognos-heading"
                        : "text-sognos-muted hover:bg-gray-100 hover:text-sognos-heading",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <div className="md:grid md:grid-cols-9 md:gap-6">
        <div className="mx-auto max-w-[68rem] md:col-span-8 md:mx-0">
          {!hideIntro && page.badgeLabel && (
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
              {page.badgeLabel}
            </p>
          )}
          {!hideIntro && (
            <>
              <h1 className={`mb-6 mt-0 ${H1}`}>{page.heroHeading || page.title}</h1>
              {page.heroSubhead && (
                <p className="mb-8 max-w-3xl text-base leading-relaxed text-sognos-body">
                  {page.heroSubhead}
                </p>
              )}
            </>
          )}
          <PortableText value={page.body} components={portableComponents} />
          {page.footerNote && (
            <p className="mt-10 border-t border-sognos-line pt-6 text-base leading-relaxed text-sognos-body">
              {page.footerNote}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
