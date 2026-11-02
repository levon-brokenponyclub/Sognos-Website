import { notFound } from "next/navigation";
import { INDUSTRIES } from "@/lib/constants";
import { getIndustryContent, getIndustryMeta } from "@/lib/industries-content";
import SplitHero from "@/components/layout/sections/shared/SplitHero";
import HeroCapabilityCard from "@/components/layout/sections/shared/HeroCapabilityCard";
import IndustryChallengeStack from "@/components/layout/sections/industries/IndustryChallengeStack";
import IndustryHowTabs from "@/components/layout/sections/industries/IndustryHowTabs";
import IndustryOthersSlider from "@/components/layout/sections/industries/IndustryOthersSlider";
import IndustryPlatformSection from "@/components/layout/sections/industries/IndustryPlatformSection";

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
      {/* ── 1. Hero — option A "Split" (Frontline layout): photo with the
          live "How Sognos helps" index card. */}
      <SplitHero
        crumb={{ label: "Industries", href: "/industries" }}
        name={meta.name}
        headline={content.hero.headline}
        subtext={content.hero.subtext}
        image={meta.image}
        card={
          <HeroCapabilityCard
            name={meta.name}
            heading="How Sognos helps"
            items={content.howSognosHelps.slice(0, 4)}
          />
        }
      />

      {/* ── 2. The challenge — statement band on navy, rail ─────────────────── */}
      <IndustryChallengeStack
        challenges={content.challenges}
        industryName={meta.name}
        description={meta.description}
      />

      {/* ── 3. How Sognos helps — option A tabs on tint, rail ──────────────── */}
      <IndustryHowTabs
        items={content.howSognosHelps}
        industryName={meta.name}
        description={content.howSognosHelpsIntro ?? meta.description}
      />

      {/* ── 4. Other industries — option D slider on the accent ────────────── */}
      <IndustryOthersSlider excludeSlug={slug} />

      {/* ── 5. Customer stories — hidden for now (2026-11-02);
          IndustryCustomerStories returns when the section is designed. */}

      {/* ── 6. Platform — option B on navy-dark, Works-with product cards ─── */}
      <IndustryPlatformSection industryName={meta.name} />
    </>
  );
}
