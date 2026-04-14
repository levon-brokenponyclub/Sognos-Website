import { notFound } from "next/navigation";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
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
    title: `${meta.name} — Industries | Sognos`,
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
    accentClass: "bg-(--sognos-accent)",
    borderClass: "border-(--sognos-accent)/30",
    bgClass: "bg-(--sognos-accent)/8",
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
        className="relative overflow-hidden bg-prussian-blue-950 pb-24 pt-36"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, var(--color-prussian-blue-700) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
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
          <div className="max-w-3xl">
            <h1 className="mb-6 font-heading text-5xl font-normal leading-[1.08] text-white lg:text-6xl">
              {content.hero.headline}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/60">
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
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sognos-text-muted">
                The challenge
              </p>
              <h2 className="font-heading text-4xl font-normal text-sognos-text-heading">
                What makes {meta.name} hard to run
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-sognos-text-body lg:justify-self-end">
              {meta.description}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {content.challenges.map((challenge, i) => (
              <div
                key={i}
                className="rounded-xl border border-(--sognos-card-border) bg-(--sognos-bg-sunken) p-8"
              >
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-prussian-blue-950 text-xs font-semibold text-white">
                  {i + 1}
                </div>
                <h3 className="mb-3 font-heading text-lg font-normal text-sognos-text-heading">
                  {challenge.title}
                </h3>
                <p className="text-sm leading-relaxed text-sognos-text-body">
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
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sognos-text-muted">
              How Sognos helps
            </p>
            <h2 className="font-heading text-4xl font-normal text-brand">
              Purpose-built for {meta.name}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {content.howSognosHelps.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-(--sognos-card-border) bg-white p-8"
              >
                <h3 className="mb-3 font-heading text-lg font-normal text-sognos-text-heading">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-sognos-text-body">
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
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sognos-text-muted">
              Products
            </p>
            <h2 className="font-heading text-4xl font-normal text-sognos-text-heading">
              What Sognos deploys in {meta.name}
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            {meta.products.map((product) => {
              const p = PRODUCT_META[product as keyof typeof PRODUCT_META];
              if (!p) return null;
              return (
                <Link
                  key={product}
                  href={p.href}
                  className={`group flex items-center gap-4 rounded-2xl border px-6 py-5 transition-shadow duration-200 hover:shadow-md ${p.borderClass} ${p.bgClass}`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${p.accentClass}`} />
                  <div>
                    <p className="text-sm font-semibold text-sognos-text-heading">
                      {product}
                    </p>
                    <p className="mt-0.5 text-xs text-sognos-text-muted">
                      {p.tagline}
                    </p>
                  </div>
                  <span className="ml-4 text-xs font-medium text-brand opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Explore →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        headline={`Ready to see Sognos for ${meta.name}?`}
        subtext="Our team has hands-on experience in your sector. Book a call and we&apos;ll show you exactly how the platform fits your operation."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Contact Sales", href: "/contact" }}
      />
    </>
  );
}
