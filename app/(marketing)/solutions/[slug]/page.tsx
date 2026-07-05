import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SolutionUseCases from "@/components/layout/sections/SolutionUseCases";
import LogoStrip from "@/components/layout/sections/LogoStrip";
import SolutionHeroDemoButton from "@/components/layout/sections/SolutionHeroDemoButton";
import ScrollReveal from "@/components/ui/ScrollReveal";
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

// Shared placeholder images (same across all solutions for now).
const HERO_IMAGE = "/solutions/SolutionsHero.avif";
const PROBLEM_ICON = "/solutions/Inon.avif";

// Shared dark purple band behind "What it solves" + Capabilities.
const SECTION_BG = "#152248";

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
                className="inline-block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280] hover:text-[#1A1A1A] transition-colors duration-200"
              >
                {meta.name}
              </Link>
              <h1 className="mt-5 font-heading font-normal text-sognos-header text-5xl md:text-6xl lg:text-7xl tracking-tight text-balance">
                {content.hero.headline}
              </h1>
              <p className="mt-6 max-w-[600px] text-lg leading-relaxed text-gray-600">
                {content.hero.subtext}
              </p>
              <div className="mt-9">
                <SolutionHeroDemoButton />
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-lg bg-gradient-to-br from-[#E9E2F7] via-[#EEE8F4] to-[#F2EAEF]">
                <Image
                  src={HERO_IMAGE}
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

      {/* Trusted by logos */}
      <ScrollReveal>
        <LogoStrip />
      </ScrollReveal>

      {/* What it solves — borderless columns on dark purple band */}
      <ScrollReveal>
        <section className="py-24 lg:py-32 bg-sognos-navy">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-14 flex flex-col items-center text-center">
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-[0.08em]"
                style={{ color: "#B7A9D9" }}
              >
                The problem
              </p>
              <h2
                className="font-heading text-3xl md:text-4xl font-medium tracking-[-0.02em]"
                style={{ color: "#FFFFFF" }}
              >
                What {meta.name} solves
              </h2>
              <p
                className="mt-6 max-w-2xl text-base leading-relaxed"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                {content.whatItSolves.intro}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
              {content.whatItSolves.painPoints.map((point, i) => (
                <div key={i}>
                  <div className="relative mb-5 h-12 w-12">
                    <Image
                      src={PROBLEM_ICON}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-contain"
                    />
                  </div>
                  <h3 className="mb-3 font-heading text-xl font-medium text-white">
                    {point.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.72)" }}
                  >
                    {point.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Capabilities — tab switcher with visual (component, also on purple) */}
      <ScrollReveal>
        <SolutionUseCases
          solutionName={meta.name}
          capabilities={content.capabilities}
        />
      </ScrollReveal>

      {/* Platform */}
      <ScrollReveal>
        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-lg bg-[#F7F8FA] px-10 py-14 lg:px-14 lg:py-16">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
                <div className="lg:max-w-sm">
                  <h2
                    className="font-heading text-3xl md:text-4xl font-medium tracking-[-0.02em]"
                    style={{ color: "#1A1A1A" }}
                  >
                    Platform
                  </h2>
                </div>
                <div className="lg:max-w-xl">
                  <h3
                    className="font-heading text-xl md:text-2xl font-medium tracking-[-0.01em]"
                    style={{ color: "#1A1A1A" }}
                  >
                    Built on {content.platform.label}
                  </h3>
                  <p
                    className="mt-4 text-base leading-relaxed"
                    style={{ color: "#4B5563" }}
                  >
                    {content.platform.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
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
