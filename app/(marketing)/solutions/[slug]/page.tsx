import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SolutionHeroDemoButton from "@/components/layout/sections/SolutionHeroDemoButton";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import PlatformLogoRow from "@/components/layout/sections/shared/PlatformLogoRow";
import {
  LAYOUT,
  TYPE,
} from "@/components/layout/sections/sognoscare/typeScale";
import {
  FrontlineCapabilityVisual,
  FrontlineCapabilityVisuals,
  FrontlinePlatformVisual,
  FrontlineSymptom,
} from "@/components/layout/sections/solutions/FrontlineVisuals";
import {
  FRONTLINE_HERO_OVERLAY,
  FRONTLINE_PLATFORM_CARDS,
  FRONTLINE_SLUG,
  RELATED_GRAPHIC_SLUGS,
} from "@/components/layout/sections/solutions/frontline";
import SolutionWorksWith from "@/components/layout/sections/solutions/SolutionWorksWith";
import SolutionRelated, {
  type RelatedItem,
} from "@/components/layout/sections/solutions/SolutionRelated";
import { SOLUTIONS } from "@/lib/constants";
import { getSolutionContent, getSolutionMeta } from "@/lib/solutions-content";

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

  // Layout is shared by every solution (approved Frontline mockup,
  // docs/mockups/frontline/); the motion graphics and illustrative copy are
  // Frontline's own until the other solutions get theirs.
  const isFrontline = slug === FRONTLINE_SLUG;

  const worksWith = [
    ...(content.worksWithRoster ? (["roster"] as const) : []),
    ...(content.worksWithCare ? (["care"] as const) : []),
  ];

  // Every other solution, the curated relatedSlugs first.
  const relatedOrder = [
    ...content.relatedSlugs,
    ...SOLUTIONS.map((s) => s.slug).filter(
      (s) => s !== slug && !content.relatedSlugs.includes(s),
    ),
  ];
  const related: RelatedItem[] = relatedOrder.flatMap((relSlug) => {
    const relMeta = SOLUTIONS.find((s) => s.slug === relSlug);
    const relContent = getSolutionContent(relSlug);
    if (!relMeta || !relContent) return [];
    return [
      {
        slug: relSlug,
        name: relMeta.name,
        body: relContent.hero.subtext,
        image: relContent.hero.image,
        hasGraphic: RELATED_GRAPHIC_SLUGS.has(relSlug),
      },
    ];
  });

  return (
    <>
      {/* Hero — light split, 7 / 5 */}
      <section className="bg-white pt-32 pb-20 md:pb-28 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="flex flex-col items-start gap-4 lg:col-span-7">
              <SectionLabel>
                <Link
                  href="/solutions"
                  className="text-sognos-muted underline-offset-4 transition-colors hover:text-sognos-blue-accent hover:underline"
                >
                  Solutions
                </Link>
                <span aria-hidden="true" className="text-sognos-muted">
                  /
                </span>
                {meta.name}
              </SectionLabel>
              <h1 className="font-heading text-5xl font-normal leading-[1.05] tracking-[-0.02em] text-balance text-sognos-heading">
                {content.hero.headline}
              </h1>
              <p className={`${TYPE.heroSub} text-sognos-body`}>
                {content.hero.subtext}
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <SolutionHeroDemoButton className="min-h-11 px-7 py-3.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sognos-blue-accent" />
                <Link
                  href="#capabilities"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-base font-medium text-sognos-heading transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sognos-blue-accent"
                >
                  Explore capabilities <span aria-hidden="true">&#8599;</span>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] max-h-[480px] w-full overflow-hidden rounded-lg bg-sognos-tint lg:aspect-auto lg:h-[480px]">
                <Image
                  src={content.hero.image}
                  alt={`${meta.name} preview`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  priority
                />
                {isFrontline && (
                  // Illustrative status card (approved with the mockup).
                  <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-sognos-line bg-white p-4 sm:right-auto sm:w-72">
                    <div className="flex items-center justify-between">
                      <p className="font-heading text-base text-sognos-heading">
                        {FRONTLINE_HERO_OVERLAY.title}
                      </p>
                      <span className="text-xs text-sognos-muted">
                        {FRONTLINE_HERO_OVERLAY.ref}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-sognos-muted">
                      {FRONTLINE_HERO_OVERLAY.meta} &middot;{" "}
                      <span className="text-emerald-700">
                        {FRONTLINE_HERO_OVERLAY.status}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The problem — option A: centred header + symptom tiles on navy */}
      <ScrollReveal>
        <section className={`bg-sognos-navy ${LAYOUT.section}`}>
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
              <SectionLabel tone="dark">The problem</SectionLabel>
              <h2 className={`${TYPE.h2} text-white`}>
                What {meta.name} solves
              </h2>
              <p className={`${TYPE.lede} mx-auto text-white/75`}>
                {content.whatItSolves.intro}
              </p>
            </div>
            <div className={`${LAYOUT.gap} grid gap-3 md:grid-cols-3 lg:gap-4`}>
              {content.whatItSolves.painPoints.map((point, i) => (
                <article
                  key={point.title}
                  className="flex flex-col gap-8 rounded-lg bg-white/5 p-6 lg:p-8"
                >
                  {isFrontline && (
                    <div
                      aria-hidden="true"
                      className="flex min-h-28 items-center"
                    >
                      <FrontlineSymptom index={i} />
                    </div>
                  )}
                  <div className={isFrontline ? undefined : "mt-auto"}>
                    <span
                      aria-hidden="true"
                      className="font-heading text-4xl font-light tabular-nums text-white/25"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={`mt-3 ${TYPE.h3Small} text-white md:text-xl`}
                    >
                      {point.title}
                    </h3>
                    <p className={`mt-3 ${TYPE.body} text-white/75`}>
                      {point.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Capabilities — option A: 3-column grid, Accent Blues panels */}
      <section
        id="capabilities"
        className={`bg-sognos-tint ${LAYOUT.section} ${LAYOUT.anchor}`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className={LAYOUT.head}>
            <SectionLabel>Capabilities</SectionLabel>
            <h2 className={`${TYPE.h2} text-sognos-heading`}>
              What you get with {meta.name}
            </h2>
          </div>
          <FrontlineCapabilityVisuals>
            <div
              className={`${LAYOUT.gap} grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4`}
            >
              {content.capabilities.map((cap, i) => (
                <article
                  key={cap.title}
                  className={`flex flex-col gap-5 rounded-lg bg-white ${isFrontline ? "p-3" : "p-3 pt-6"}`}
                >
                  {isFrontline && <FrontlineCapabilityVisual index={i} />}
                  <div className="px-3 pb-3">
                    <h3 className={`${TYPE.h3Small} text-sognos-heading`}>
                      {cap.title}
                    </h3>
                    <p className={`mt-2 ${TYPE.small} text-sognos-body`}>
                      {cap.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </FrontlineCapabilityVisuals>
        </div>
      </section>

      {/* Platform — option C: navy band, centred header; Frontline adds three cards */}
      <ScrollReveal>
        <section className={`bg-sognos-care-dark ${LAYOUT.section}`}>
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
              <SectionLabel tone="dark">Platform</SectionLabel>
              <h2 className={`${TYPE.h2} text-white`}>
                Built on {content.platform.label}
              </h2>
              <p className={`${TYPE.lede} mx-auto text-white/75`}>
                {content.platform.description}
              </p>
            </div>
            {isFrontline ? (
              <div
                className={`${LAYOUT.gap} mx-auto grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4`}
              >
                {FRONTLINE_PLATFORM_CARDS.map((card, i) => (
                  <article
                    key={card.title}
                    className="flex flex-col gap-5 rounded-lg border border-white/10 bg-white/5 p-5"
                  >
                    <div aria-hidden="true">
                      <FrontlinePlatformVisual index={i} />
                    </div>
                    <div>
                      <Image
                        src={card.logo}
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-auto"
                      />
                      <h3 className={`mt-4 ${TYPE.h3Small} text-white`}>
                        {card.title}
                      </h3>
                      <p className={`mt-1 ${TYPE.small} text-white/75`}>
                        {card.body}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div
                className={`${LAYOUT.gap} flex justify-center border-t border-white/10 pt-10`}
              >
                <PlatformLogoRow variant="dark" />
              </div>
            )}
          </div>
        </section>
      </ScrollReveal>

      {/* Works with — option A: product cards, alternating, Paraform */}
      {worksWith.length > 0 && (
        <ScrollReveal>
          <SolutionWorksWith products={worksWith} />
        </ScrollReveal>
      )}

      {/* Related — option C: slider */}
      {related.length > 0 && (
        <ScrollReveal>
          <SolutionRelated items={related} />
        </ScrollReveal>
      )}
    </>
  );
}
