import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getLegalPageBySlug } from "@/lib/sanity/queries";

const H1_PREAMBLE =
  "mb-6 font-heading text-2xl font-medium text-sognos-body tracking-tight";
const H2 =
  "mt-12 mb-4 font-heading text-2xl font-medium text-sognos-body tracking-tight";
const H3 =
  "mt-8 mb-3 font-heading text-xl font-medium text-sognos-body tracking-tight";
const UL =
  "mb-6 list-disc pl-6 space-y-2 text-base leading-relaxed text-sognos-body";
const OL =
  "mb-6 list-decimal pl-6 space-y-2 text-base leading-relaxed text-sognos-body";

const portableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-relaxed text-sognos-body">
        {children}
      </p>
    ),
    h1: ({ children }) => <h1 className={H1_PREAMBLE}>{children}</h1>,
    h2: ({ children }) => <h2 className={H2}>{children}</h2>,
    h3: ({ children }) => <h3 className={H3}>{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className={UL}>{children}</ul>,
    number: ({ children }) => <ol className={OL}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    em: ({ children }) => <em>{children}</em>,
    strong: ({ children }) => <strong>{children}</strong>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={
          value?.href?.startsWith("http") ? "noopener noreferrer" : undefined
        }
        className="text-sognos-blue-accent hover:underline"
      >
        {children}
      </a>
    ),
  },
};

export async function LegalPageRenderer({ slug }: { slug: string }) {
  const page = await getLegalPageBySlug(slug);
  if (!page) notFound();

  return (
    <main className="w-full bg-white">
      {/* Hero */}
      <section
        data-header-dark
        className="bg-gradient-hero w-full border-b border-sognos-line"
      >
        <div className="max-w-7xl w-full mx-auto px-6 pb-18 pt-40 flex flex-col items-center text-center">
          {page.badgeLabel && (
            <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-white/30 text-white font-medium mb-6">
              <span className="w-2 h-2 bg-sognos-blue-accent rounded-full" />
              {page.badgeLabel}
            </div>
          )}
          <h1 className="mx-auto max-w-5xl font-heading text-3xl font-normal leading-heading tracking-heading text-white sm:text-4xl lg:text-4xl">
            {page.heroHeading}
          </h1>
          {page.heroSubhead && (
            <p className="mt-6 text-lg max-w-3xl leading-relaxed text-white/80">
              {page.heroSubhead}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="w-full">
        <div className="max-w-5xl w-full mx-auto px-6 py-14">
          <PortableText value={page.body} components={portableComponents} />
          {page.footerNote && (
            <p className="mt-6 text-sm text-gray-400">{page.footerNote}</p>
          )}
        </div>
      </section>
    </main>
  );
}
