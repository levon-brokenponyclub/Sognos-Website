import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { INDUSTRIES, PRODUCTS } from "@/lib/constants";
import { getIndustryContent, getIndustryMeta } from "@/lib/industries-content";
import SolutionHeroDemoButton from "@/components/layout/sections/SolutionHeroDemoButton";
import IndustryChallengeStack from "@/components/layout/sections/industries/IndustryChallengeStack";
import IndustryHowTabs from "@/components/layout/sections/industries/IndustryHowTabs";
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

const PRODUCT_META: Record<
  string,
  { href: string; tagline: string; description: string; logo: string }
> = {
  SognosCare: {
    href: PRODUCTS.care.href,
    tagline: PRODUCTS.care.tagline,
    description: PRODUCTS.care.description,
    logo: "/logos/sognos-care-logo-color.svg",
  },
  SognosRoster: {
    href: PRODUCTS.roster.href,
    tagline: PRODUCTS.roster.tagline,
    description: PRODUCTS.roster.description,
    logo: "/logos/sognos-roster-logo-color.svg",
  },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-sognos-muted">
      <span className="mr-1.5 text-sognos-blue-accent">●</span>
      {children}
    </p>
  );
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
      {/* ── 1. Hero — matches Solutions detail hero (white, no image) ────────── */}
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
          </div>
        </div>
      </section>

      {/* ── 2. The Challenge — stacking sticky cards ─────────────────────────── */}
      <section className="bg-white pt-20 lg:pt-28">
        <div className="mx-auto max-w-7xl px-6">
          <Eyebrow>The Challenge</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
            What makes {meta.name} hard to run
          </h2>
        </div>
        <div className="mt-12 lg:mt-16">
          <IndustryChallengeStack challenges={content.challenges} />
        </div>
      </section>

      {/* ── 3. How Sognos helps — interactive tabs ───────────────────────────── */}
      <section className="bg-gray-200/70 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Eyebrow>How Sognos helps</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
            Purpose-built for {meta.name}
          </h2>
          {content.howSognosHelpsIntro && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-sognos-body">
              {content.howSognosHelpsIntro}
            </p>
          )}
          <div className="mt-10 lg:mt-12">
            <IndustryHowTabs items={content.howSognosHelps} />
          </div>
        </div>
      </section>

      {/* ── 4. What we deploy — product feature blocks ───────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Eyebrow>Products</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
            What Sognos deploys in {meta.name}
          </h2>
          <div className="mt-10 grid gap-3 lg:mt-12 lg:grid-cols-2 lg:gap-4">
            {meta.products.map((product) => {
              // Energy & Utilities — SognosCare slot becomes a Dynamics 365 card
              if (slug === "energy-utilities" && product === "SognosCare") {
                return (
                  <div
                    key="microsoft-dynamics-365"
                    className="flex flex-col rounded-lg border border-sognos-line bg-white p-8 lg:p-10"
                  >
                    <Image
                      src="/logos/Microsoft-icon-logo.svg"
                      alt="Microsoft Dynamics 365"
                      width={40}
                      height={40}
                      className="h-9 w-9 object-contain"
                    />
                    <h3 className="mt-6 font-heading text-2xl font-medium tracking-tight text-sognos-heading">
                      Microsoft Dynamics 365
                    </h3>
                    <p className="mt-2 text-sm text-sognos-muted">
                      Core platform for utility operations
                    </p>
                  </div>
                );
              }

              const p = PRODUCT_META[product];
              if (!p) return null;
              return (
                <Link
                  key={product}
                  href={p.href}
                  className="group flex flex-col rounded-lg border border-sognos-line bg-white p-8 transition-colors duration-200 hover:border-sognos-blue-accent/40 lg:p-10"
                >
                  <Image
                    src={p.logo}
                    alt={product}
                    width={180}
                    height={40}
                    className="h-9 w-auto object-contain"
                  />
                  <h3 className="mt-6 font-heading text-2xl font-medium tracking-tight text-sognos-heading">
                    {product}
                  </h3>
                  <p className="mt-2 text-sm text-sognos-muted">{p.tagline}</p>
                  <p className="mt-4 text-base leading-relaxed text-sognos-body">
                    {p.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sognos-blue-accent">
                    Explore {product}
                    <svg
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                      className="w-3 transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      <path
                        d="M3 7h8M7 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Customer stories from this industry (hidden if none) ──────────── */}
      <IndustryCustomerStories industryName={meta.name} />
    </>
  );
}
