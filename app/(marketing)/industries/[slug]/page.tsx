import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { INDUSTRIES } from "@/lib/constants";
import { getIndustryContent, getIndustryMeta } from "@/lib/industries-content";
import SolutionHeroDemoButton from "@/components/layout/sections/SolutionHeroDemoButton";
import IndustryChallengeStack from "@/components/layout/sections/industries/IndustryChallengeStack";
import IndustryHowTabs from "@/components/layout/sections/industries/IndustryHowTabs";
import IndustrySection from "@/components/layout/sections/IndustrySection";
import IndustryPlatformSection from "@/components/layout/sections/industries/IndustryPlatformSection";
import IndustryCustomerStories from "@/components/layout/sections/industries/IndustryCustomerStories";

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
      {/* ── 1. Hero — matches Solutions detail hero ─────────────────────────── */}
      <section className="relative bg-white pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Link
                href="/industries"
                className="inline-block text-xs font-semibold uppercase tracking-[0.08em] text-sognos-muted transition-colors duration-200 hover:text-sognos-heading"
              >
                {meta.name}
              </Link>
              <h1 className="mt-5 font-heading font-normal text-sognos-heading text-5xl md:text-6xl lg:text-7xl tracking-tight text-balance">
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
                  src={meta.image}
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

      {/* ── 2. The Challenge — card grid ────────────────────────────────────── */}
      <section className="bg-sognos-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <IndustryChallengeStack
            challenges={content.challenges}
            heading={`What makes ${meta.name} hard to run`}
            description={meta.description}
          />
        </div>
      </section>

      {/* ── 3. How Sognos helps — interactive tabs ───────────────────────────── */}
      <section className="bg-sognos-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <IndustryHowTabs
            items={content.howSognosHelps}
            industryName={meta.name}
            description={content.howSognosHelpsIntro ?? meta.description}
          />
        </div>
      </section>

      {/* ── 4. Other industries — sticky card stack ─────────────────────────── */}
      {/* No subtext here — the homepage default explains what the industries
          layer is, which a reader already inside an industry page has had. */}
      <IndustrySection
        heading="Explore other industries"
        description=""
        excludeSlug={slug}
      />

      {/* ── 5. Customer stories from this industry (hidden if none) ──────────── */}
      <IndustryCustomerStories industryName={meta.name} />

      {/* ── 6. What we deploy — product and platform blocks ─────────────────── */}
      <section className="bg-sognos-navy-dark py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <IndustryPlatformSection industryName={meta.name} />
        </div>
      </section>
    </>
  );
}
