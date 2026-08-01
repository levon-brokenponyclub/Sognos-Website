import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SolutionUseCases from "@/components/layout/sections/SolutionUseCases";
import LogoStrip from "@/components/layout/sections/LogoStrip";
import SolutionHeroDemoButton from "@/components/layout/sections/SolutionHeroDemoButton";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PlatformLogoRow from "@/components/layout/sections/shared/PlatformLogoRow";
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
    title: `${meta.name} - Solutions | Sognos`,
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
      <section className="relative bg-white pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Link
                href="/solutions"
                className="inline-block text-xs font-semibold uppercase tracking-[0.08em] text-sognos-muted hover:text-sognos-blue-accent transition-colors duration-200"
              >
                {meta.name}
              </Link>
              <h1 className="mt-4 font-heading text-3xl font-normal leading-16 tracking-tight text-sognos-header text-balance lg:text-6xl">
                {content.hero.headline}
              </h1>
              <p className="mt-5 max-w-[600px] text-lg leading-relaxed text-sognos-body">
                {content.hero.subtext}
              </p>
              <div className="mt-10">
                <SolutionHeroDemoButton />
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-lg bg-gradient-to-br from-[#E9E2F7] via-[#EEE8F4] to-[#F2EAEF]">
                <Image
                  src={content.hero.image}
                  alt={`${meta.name} preview`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What it solves — 2x2 on dark band: copy cell + three numbered cards.
          All seven solutions define exactly three painPoints, so the grid is
          fixed rather than flowing; a fourth entry would wrap to a new row. */}
      <ScrollReveal>
        <section className="py-24 lg:py-32 bg-sognos-navy">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-3 lg:gap-4 md:grid-cols-2">
              {/* Cell 1 — section copy, no card surface */}
              <div className="flex flex-col justify-center p-2 md:p-6 lg:p-8">
                <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
                  The problem
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-medium tracking-[-0.02em] text-white text-balance">
                  What {meta.name} solves
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
                  {content.whatItSolves.intro}
                </p>
              </div>

              {/* Cells 2-4 — numbered pain points */}
              {content.whatItSolves.painPoints.map((point, i) => (
                <div
                  key={i}
                  className="flex min-h-[320px] flex-col justify-between rounded-lg bg-white/5 p-6 lg:min-h-[380px] lg:p-8"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-sm text-sognos-blue-accent"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl lg:text-2xl font-medium text-white">
                      {point.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-white/70">
                      {point.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Capabilities — tab switcher with visual (component, also on purple) */}
      {/* <ScrollReveal> */}
        <SolutionUseCases
          solutionName={meta.name}
          capabilities={content.capabilities}
        />
      {/* </ScrollReveal> */}

      {/* Platform */}
      <ScrollReveal>
        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-lg bg-gray-200/70 px-10 py-14 lg:px-14 lg:py-16">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
                <div className="lg:max-w-sm">
                  <h2 className="font-heading text-3xl md:text-4xl font-medium tracking-[-0.02em] text-sognos-heading">
                    Platform
                  </h2>
                </div>
                <div className="lg:max-w-xl">
                  {/* Per-solution: which part of the stack leads here. */}
                  <h3 className="font-heading text-xl md:text-2xl font-medium tracking-[-0.01em] text-sognos-heading">
                    Built on {content.platform.label}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-sognos-body">
                    {content.platform.description}
                  </p>
                </div>
              </div>

              {/* Generic: the full Microsoft foundation, identical everywhere. */}
              <div className="mt-12 border-t border-sognos-line pt-10">
                <PlatformLogoRow variant="light" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Trusted by logos */}
      <ScrollReveal>
        <LogoStrip />
      </ScrollReveal>

      {/* Works with */}
      {showWorksWithPanel && (
        <ScrollReveal>
          <section className="bg-white py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6">
              <div className="mb-10">
                <p
                  className="mb-4 text-xs font-semibold uppercase tracking-[0.08em]"
                  style={{ color: "#6B7280" }}
                >
                  Works with
                </p>
                <h2
                  className="font-heading text-3xl md:text-4xl font-medium tracking-[-0.02em]"
                  style={{ color: "#1A1A1A" }}
                >
                  Connects to the Sognos platform
                </h2>
              </div>
              <div className="flex flex-wrap gap-4">
                {showWorksWithCare && (
                  <Link
                    href={PRODUCTS.care.href}
                    className="group flex items-center gap-4 rounded-lg border border-(--sognos-line) bg-white px-6 py-5 transition-colors duration-200 hover:border-sognos-navy/30"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-(--sognos-edition-green)" />
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        {PRODUCTS.care.name}
                      </p>
                      <p className="mt-0.5 text-xs text-sognos-muted">
                        {PRODUCTS.care.tagline}
                      </p>
                    </div>
                    <span className="ml-4 text-xs font-medium text-sognos-blue-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      View &rarr;
                    </span>
                  </Link>
                )}
                {showWorksWithRoster && (
                  <Link
                    href={PRODUCTS.roster.href}
                    className="group flex items-center gap-4 rounded-lg border border-(--sognos-line) bg-white px-6 py-5 transition-colors duration-200 hover:border-sognos-navy/30"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-sognos-blue-accent" />
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        {PRODUCTS.roster.name}
                      </p>
                      <p className="mt-0.5 text-xs text-sognos-muted">
                        {PRODUCTS.roster.tagline}
                      </p>
                    </div>
                    <span className="ml-4 text-xs font-medium text-sognos-blue-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      View &rarr;
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* Related Solutions */}
      {content.relatedSlugs.length > 0 && (
        <ScrollReveal>
          <section className="bg-white py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6">
              <div className="mb-12">
                <p
                  className="mb-4 text-xs font-semibold uppercase tracking-[0.08em]"
                  style={{ color: "#6B7280" }}
                >
                  Solutions
                </p>
                <h2
                  className="font-heading text-3xl md:text-4xl font-medium tracking-[-0.02em]"
                  style={{ color: "#1A1A1A" }}
                >
                  Extend your operation further
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {content.relatedSlugs.map((relSlug) => {
                  const relMeta = SOLUTIONS.find((s) => s.slug === relSlug);
                  const relContent = getSolutionContent(relSlug);
                  if (!relMeta || !relContent) return null;
                  return (
                    <Link
                      key={relSlug}
                      href={`/solutions/${relSlug}`}
                      className="group rounded-lg border border-(--sognos-line) bg-white p-6 transition-colors duration-200 hover:border-sognos-navy/30"
                    >
                      <h3 className="mb-2 font-heading text-lg font-medium text-[#1A1A1A]">
                        {relMeta.name}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#4B5563" }}
                      >
                        {relContent.hero.subtext}
                      </p>
                      <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        Explore &rarr;
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </ScrollReveal>
      )}
    </>
  );
}
