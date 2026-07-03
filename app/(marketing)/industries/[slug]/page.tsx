import { notFound } from "next/navigation";
import Link from "next/link";
import { INDUSTRIES, PRODUCTS } from "@/lib/constants";
import { getIndustryContent, getIndustryMeta } from "@/lib/industries-content";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getIndustryMeta(slug);
  if (!meta) return {};
  return {
    title: `${meta.name} - Industries | Sognos`,
    description: meta.description,
  };
}

const PRODUCT_META = {
  SognosCare: {
    href: PRODUCTS.care.href,
    tagline: PRODUCTS.care.tagline,
    accentClass: "bg-(--sognos-edition-green)",
    borderClass: "border-(--sognos-edition-green)/30",
    bgClass: "bg-(--sognos-edition-green)/8",
  },
  SognosRoster: {
    href: PRODUCTS.roster.href,
    tagline: PRODUCTS.roster.tagline,
    accentClass: "bg-sognos-blue-accent",
    borderClass: "border-sognos-blue-accent/30",
    bgClass: "bg-sognos-blue-accent/8",
  },
} as const;

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getIndustryContent(slug);
  const meta = getIndustryMeta(slug);
  if (!content || !meta) notFound();

  return (
    <>
      {/* Hero */}
      <section
        data-header-dark
        className="relative overflow-hidden bg-gradient-hero pb-18 pt-40"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-6 flex flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
            <Link
              href="/industries"
              className="text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white/80 transition-colors duration-200"
            >
              Industries
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
              {meta.name}
            </span>
          </div>
          <div className="max-w-5xl text-center">
            <h1 className="mb-6 font-heading text-3xl font-normal leading-heading tracking-heading text-white sm:text-5xl lg:text-5xl">
              {content.hero.headline}
            </h1>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/80">
              {content.hero.subtext}
            </p>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-sognos-navy/30 text-sognos-body font-medium mb-6">
                <span className="w-2 h-2 bg-sognos-blue-accent rounded-full"></span>
                The challenge
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-medium text-sognos-heading tracking-tight mb-6">
                What makes {meta.name} hard to run
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-sognos-body lg:justify-self-end">
              {meta.description}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {content.challenges.map((challenge, i) => (
              <div
                key={i}
                className="rounded-xl border border-(--sognos-line) bg-(--sognos-bg-sunken) p-8"
              >
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-sognos-navy-dark text-xs font-semibold text-white">
                  {i + 1}
                </div>
                <h2 className="mb-3 font-heading text-lg font-normal text-sognos-heading">
                  {challenge.title}
                </h2>
                <p className="text-sm leading-relaxed text-sognos-body">
                  {challenge.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Sognos helps */}
      <section className="bg-(--sognos-bg-sunken) py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className={`mb-12 grid gap-8 ${
              content.howSognosHelpsIntro ? "lg:grid-cols-2 lg:items-end" : ""
            }`}
          >
            <div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-sognos-navy/30 text-sognos-body font-medium mb-6">
                <span className="w-2 h-2 bg-sognos-blue-accent rounded-full"></span>
                How Sognos helps
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-medium text-sognos-blue-accent tracking-tight">
                Purpose-built for {meta.name}
              </h2>
            </div>
            {content.howSognosHelpsIntro && (
              <p className="max-w-md text-base leading-relaxed text-sognos-body lg:justify-self-end">
                {content.howSognosHelpsIntro}
              </p>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {content.howSognosHelps.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-(--sognos-line) bg-white p-8"
              >
                <h2 className="mb-3 font-heading text-lg font-normal text-sognos-heading">
                  {item.title}
                </h2>
                <p className="text-sm leading-relaxed text-sognos-body">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products used */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-sognos-navy/30 text-sognos-body font-medium mb-6">
              <span className="w-2 h-2 bg-sognos-blue-accent rounded-full"></span>
              Products
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-sognos-heading tracking-tight mb-6">
              What Sognos deploys in {meta.name}
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            {meta.products.map((product) => {
              if (slug === "energy-utilities" && product === "SognosCare") {
                return (
                  <div
                    key="Microsoft Dynamics 365"
                    className="flex items-center gap-4 rounded-2xl border border-sognos-navy/10 bg-sognos-navy/[0.03] px-6 py-5"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-sognos-navy/70" />
                    <div>
                      <p className="text-sm font-semibold text-sognos-heading">
                        Microsoft Dynamics 365
                      </p>
                      <p className="mt-0.5 text-xs text-sognos-muted">
                        Core platform for utility operations.
                      </p>
                    </div>
                  </div>
                );
              }

              const p = PRODUCT_META[product as keyof typeof PRODUCT_META];
              if (!p) return null;
              return (
                <Link
                  key={product}
                  href={p.href}
                  className={`group flex items-center gap-4 rounded-2xl border px-6 py-5 transition-shadow duration-200 hover:shadow-md ${p.borderClass} ${p.bgClass}`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${p.accentClass}`}
                  />
                  <div>
                    <p className="text-sm font-semibold text-sognos-heading">
                      {product}
                    </p>
                    <p className="mt-0.5 text-xs text-sognos-muted">
                      {p.tagline}
                    </p>
                  </div>
                  <span className="ml-4 text-xs font-medium text-sognos-blue-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Explore →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}
