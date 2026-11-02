import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SolutionHeroDemoButton from "@/components/layout/sections/SolutionHeroDemoButton";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  LAYOUT,
  TYPE,
} from "@/components/layout/sections/sognoscare/typeScale";
import {
  FrontlineCapabilityVisual,
  FrontlineCapabilityVisuals,
  FrontlinePlatformVisual,
} from "@/components/layout/sections/solutions/FrontlineVisuals";
import {
  FRONTLINE_HERO_HEADING,
  platformCards,
  FRONTLINE_SLUG,
} from "@/components/layout/sections/solutions/frontline";
import SolutionProblem from "@/components/layout/sections/solutions/SolutionProblem";
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
  // docs/mockups/frontline/). The Frontline motion graphics stand in for the
  // other solutions until they get their own; the hero card stays Frontline's.
  const isFrontline = slug === FRONTLINE_SLUG;
  // Hero tagline: Frontline's own line, otherwise the solution description.
  const heroTagline = isFrontline ? FRONTLINE_HERO_HEADING : meta.description;

  const worksWith = [
    ...(content.worksWithRoster ? (["roster"] as const) : []),
    ...(content.worksWithCare ? (["care"] as const) : []),
  ];

  // The three curated related solutions (Related option A grid).
  const related: RelatedItem[] = content.relatedSlugs.flatMap((relSlug) => {
    const relMeta = SOLUTIONS.find((s) => s.slug === relSlug);
    const relContent = getSolutionContent(relSlug);
    if (!relMeta || !relContent) return [];
    return [
      {
        slug: relSlug,
        name: relMeta.name,
        body: relContent.hero.subtext,
        image: relContent.hero.image,
      },
    ];
  });

  return (
    <>
      {/* Hero — option C "Editorial" on white (header starts
          transparent over it): oversized headline (8) beside the solution's
          name, tagline and a capability index (4), then a wide photo band. */}
      <section className="bg-white pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col items-start gap-6 lg:col-span-8">
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
            <h1 className="font-heading text-5xl font-normal leading-[1.02] tracking-[-0.03em] text-balance text-sognos-heading md:text-6xl">
              {content.hero.headline}
            </h1>
            <p className={`${TYPE.heroSub} text-sognos-body`}>
              {content.hero.subtext}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <SolutionHeroDemoButton className="min-h-11 px-7 py-3.5 transition-colors hover:bg-sognos-heading hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sognos-blue-accent" />
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-base font-medium text-sognos-heading transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sognos-blue-accent"
              >
                Talk to Sales <span aria-hidden="true">&#8599;</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-end gap-4 lg:col-span-4">
            <p className="font-heading text-2xl text-sognos-heading">
              {meta.name}
            </p>
            <p className="text-sm text-sognos-muted">{heroTagline}</p>
            <ul className="border-t border-sognos-line">
              {content.capabilities.slice(0, 4).map((cap, i) => (
                <li key={cap.title}>
                  <Link
                    href="#capabilities"
                    className="group flex min-h-12 items-center justify-between gap-4 border-b border-sognos-line py-3 text-sognos-heading focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sognos-blue-accent"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xs tabular-nums text-sognos-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {cap.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-sognos-blue-accent transition-transform group-hover:translate-x-0.5"
                    >
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative mx-auto mt-16 max-w-7xl px-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg md:aspect-[21/8]">
            <Image
              src={content.hero.image}
              alt={`${meta.name} preview`}
              fill
              sizes="(min-width: 1280px) 1232px, 100vw"
              className="object-cover"
              priority
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, color-mix(in srgb, var(--sognos-navy-dark) 70%, transparent), transparent 60%)",
              }}
            />
            <p className="absolute bottom-6 left-6 max-w-sm font-heading text-2xl text-white md:bottom-10 md:left-10 md:text-3xl">
              {heroTagline}
            </p>
          </div>
        </div>
      </section>

      {/* The problem — option B: sticky header beside numbered rows on navy */}
      <SolutionProblem
        name={meta.name}
        intro={content.whatItSolves.intro}
        painPoints={content.whatItSolves.painPoints}
      />

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
                  className="flex flex-col gap-5 rounded-lg bg-white p-3"
                >
                  <FrontlineCapabilityVisual index={i} />
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

      {/* Platform — option C: translucent cards on navy, label in the rail.
          Frontline graphics stand in for the other solutions. */}
      <ScrollReveal>
        <section className={`bg-sognos-navy ${LAYOUT.section}`}>
          <div className="mx-auto max-w-7xl px-6">
            <div className={LAYOUT.rail}>
              <div className={LAYOUT.railLabel}>
                <SectionLabel tone="dark" sticky>
                  Platform
                </SectionLabel>
              </div>
              <div className={LAYOUT.content}>
                <div className={LAYOUT.head}>
                  <h2 className={`${TYPE.h2} text-white`}>
                    Built on {content.platform.label}
                  </h2>
                  <p className={`${TYPE.lede} text-white/75`}>
                    {content.platform.description}
                  </p>
                </div>
                <div
                  className={`${LAYOUT.gap} grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4`}
                >
                  {platformCards(slug, content.platform.label).map((card, i) => (
                    <article
                      key={card.title}
                      className="flex flex-col gap-5 rounded border border-white/10 bg-white/5 p-5"
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
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Works with — option A: white product cards in a grid on tint, label in the rail */}
      {worksWith.length > 0 && (
        <ScrollReveal>
          <SolutionWorksWith products={worksWith} />
        </ScrollReveal>
      )}

      {/* Related — option B: list rows on navy, label in the rail */}
      {related.length > 0 && (
        <ScrollReveal>
          <SolutionRelated items={related} />
        </ScrollReveal>
      )}
    </>
  );
}
