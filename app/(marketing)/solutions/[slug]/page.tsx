import { notFound } from "next/navigation";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import { SOLUTIONS } from "@/lib/constants";
import { getSolutionContent, getSolutionMeta } from "@/lib/solutions-content";
import { PRODUCTS } from "@/lib/constants";

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getSolutionMeta(slug);
  if (!meta) return {};
  return {
    title: `${meta.name} — Solutions | Sognos`,
    description: meta.description,
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getSolutionContent(slug);
  const meta = getSolutionMeta(slug);
  if (!content || !meta) notFound();

  const showWorksWithCare = content.worksWithCare;
  const showWorksWithRoster = content.worksWithRoster;
  const showWorksWithPanel = showWorksWithCare || showWorksWithRoster;

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
              href="/solutions"
              className="text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white/80 transition-colors duration-200"
            >
              Solutions
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

      {/* What it solves */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sognos-text-muted">
                The problem
              </p>
              <h2 className="font-heading text-4xl font-normal text-sognos-text-heading">
                What {meta.name} solves
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-sognos-text-body lg:justify-self-end">
              {content.whatItSolves.intro}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {content.whatItSolves.painPoints.map((point, i) => (
              <div
                key={i}
                className="rounded-xl border border-(--sognos-card-border) bg-(--sognos-bg-sunken) p-8"
              >
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-prussian-blue-950 text-xs font-semibold text-white">
                  {i + 1}
                </div>
                <h3 className="mb-3 font-heading text-lg font-normal text-sognos-text-heading">
                  {point.title}
                </h3>
                <p className="text-sm leading-relaxed text-sognos-text-body">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-(--sognos-bg-sunken) py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sognos-text-muted">
              Capabilities
            </p>
            <h2 className="font-heading text-4xl font-normal text-sognos-text-heading">
              What you get with {meta.name}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {content.capabilities.map((cap, i) => (
              <div
                key={i}
                className="rounded-xl border border-(--sognos-card-border) bg-white p-8"
              >
                <h3 className="mb-3 font-heading text-lg font-normal text-sognos-text-heading">
                  {cap.title}
                </h3>
                <p className="text-sm leading-relaxed text-sognos-text-body">
                  {cap.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-2xl bg-prussian-blue-950 px-10 py-14 lg:px-14 lg:py-16">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              Platform
            </p>
            <h2 className="mb-5 max-w-2xl font-heading text-3xl font-normal text-white lg:text-4xl">
              Built on {content.platform.label}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-white/60">
              {content.platform.description}
            </p>
          </div>
        </div>
      </section>

      {/* Works with */}
      {showWorksWithPanel && (
        <section className="bg-(--sognos-bg-sunken) py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sognos-text-muted">
                Works with
              </p>
              <h2 className="font-heading text-4xl font-normal text-sognos-text-heading">
                Connects to the Sognos platform
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {showWorksWithCare && (
                <Link
                  href={PRODUCTS.care.href}
                  className="group flex items-center gap-4 rounded-2xl border border-(--sognos-card-border) bg-white px-6 py-5 transition-shadow duration-200 hover:shadow-md"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-(--sognos-edition-green)" />
                  <div>
                    <p className="text-sm font-semibold text-sognos-text-heading">
                      {PRODUCTS.care.name}
                    </p>
                    <p className="mt-0.5 text-xs text-sognos-text-muted">
                      {PRODUCTS.care.tagline}
                    </p>
                  </div>
                  <span className="ml-4 text-xs font-medium text-brand opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    View →
                  </span>
                </Link>
              )}
              {showWorksWithRoster && (
                <Link
                  href={PRODUCTS.roster.href}
                  className="group flex items-center gap-4 rounded-2xl border border-(--sognos-card-border) bg-white px-6 py-5 transition-shadow duration-200 hover:shadow-md"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-(--sognos-accent)" />
                  <div>
                    <p className="text-sm font-semibold text-sognos-text-heading">
                      {PRODUCTS.roster.name}
                    </p>
                    <p className="mt-0.5 text-xs text-sognos-text-muted">
                      {PRODUCTS.roster.tagline}
                    </p>
                  </div>
                  <span className="ml-4 text-xs font-medium text-brand opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    View →
                  </span>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      <CTASection
        headline={`Ready to explore ${meta.name}?`}
        subtext="Our team works with service providers across sectors. Book a call and we&apos;ll walk you through how this solution fits your operation."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Contact Sales", href: "/contact" }}
      />
    </>
  );
}
