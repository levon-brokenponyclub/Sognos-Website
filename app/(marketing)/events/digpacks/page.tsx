import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import SolutionsGrid from "./SolutionsGrid";

export const metadata = {
  title:
    "DigPacks × Sognos — Proven in UK Healthcare, Shaped for Australia and New Zealand",
  description:
    "Sognos is partnering with DigPacks to bring Microsoft-based applications, automation and AI capabilities from the NHS and public sector to health, social and community care organisations across Australia and New Zealand.",
};

const stats = [
  { value: "10,000+", label: "hours saved annually" },
  { value: "20,000+", label: "referrals & applications processed each year" },
  { value: "Up to 85%", label: "reduction in manual processing time" },
  {
    value: "4,500 staff",
    label: "supported at Berkshire Healthcare NHS Foundation Trust",
  },
];

const whyReasons = [
  "NHS and healthcare experience you can build on",
  "Solutions built on Microsoft Power Platform, with Copilot and AI",
  "Localisation for Australian and New Zealand regulation, workflows and privacy",
  "Integration with your existing Microsoft and third-party systems",
  "Adoption, training and ongoing improvement",
];

const localisationPoints = [
  "Australian & NZ regulatory requirements",
  "Privacy, security & governance",
  "Hosting & data residency",
  "Integration with your systems",
  "Roles, approvals & escalation",
  "Adoption & measurable outcomes",
];

export default function DigPacksPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="bg-gradient-hero pt-28 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Partner logos bar */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <div className="inline-flex items-center rounded-lg bg-white px-4 py-2">
              <Image
                src="/images/events/digpacks/digpacks-logo-full.png"
                alt="DigPacks"
                width={140}
                height={32}
                className="h-6 w-auto"
              />
            </div>
            <span className="text-xs text-white/50 uppercase tracking-widest">
              in partnership with
            </span>
            <div className="inline-flex items-center rounded-lg bg-white/10 border border-white/20 px-4 py-2">
              <Image
                src="/logos/sognos-logo.svg"
                alt="Sognos"
                width={90}
                height={24}
                className="brightness-0 invert h-5 w-auto"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-12 items-start">
            {/* Headline + body + CTAs */}
            <div>
              <h1 className="font-heading text-4xl lg:text-5xl font-normal leading-heading tracking-heading text-white max-w-2xl">
                Proven in UK healthcare.{" "}
                <br className="hidden lg:block" />
                Shaped for Australia and New Zealand.
              </h1>
              <p className="mt-6 text-base lg:text-lg text-white/80 leading-relaxed max-w-xl">
                Sognos is partnering with DigPacks to bring Microsoft-based
                applications, automation and AI capabilities from the NHS and
                public sector to health, social and community care organisations
                across Australia and New Zealand.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#b6065a] hover:bg-[#95044a] text-white font-semibold text-sm px-5 py-3 transition-colors"
                >
                  Book an obligation-free discussion
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <a
                  href="#solutions"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 text-white hover:bg-white/10 font-semibold text-sm px-5 py-3 transition-colors"
                >
                  Explore the solutions
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Stats card */}
            <div className="rounded-lg bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-prussian-blue-800 mb-5">
                Real outcomes in the UK*
              </p>
              <ul className="space-y-4">
                {stats.map((s) => (
                  <li key={s.value} className="flex items-start gap-3">
                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#1D96FC]/10 flex items-center justify-center">
                      <span
                        className="w-2 h-2 rounded-full bg-[#1D96FC]"
                        aria-hidden
                      />
                    </span>
                    <div>
                      <p className="font-heading text-lg font-medium text-prussian-blue-800 tracking-tight leading-none">
                        {s.value}
                      </p>
                      <p className="mt-0.5 text-xs text-sognos-text-body leading-snug">
                        {s.label}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-sognos-text-muted leading-snug">
                *Outcomes achieved by DigPacks across NHS and public-sector
                engagements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP */}
      <section className="py-14 lg:py-16 border-b border-sognos-border-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-center">
            {/* DigPacks */}
            <div className="flex items-start gap-4">
              <div className="shrink-0 h-14 flex items-center">
                <Image
                  src="/images/events/digpacks/digpacks-logo-full.png"
                  alt="DigPacks"
                  width={160}
                  height={36}
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-sm text-sognos-text-body leading-relaxed">
                NHS and public-sector experience in Microsoft Power Platform,
                automation, Copilot and AI.
              </p>
            </div>

            {/* Divider */}
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-sognos-text-muted">
                in partnership with
              </p>
            </div>

            {/* Sognos */}
            <div className="flex items-start gap-4">
              <div className="shrink-0 h-14 flex items-center">
                <Image
                  src="/logos/sognos-logo.svg"
                  alt="Sognos"
                  width={110}
                  height={30}
                  className="h-7 w-auto"
                />
              </div>
              <p className="text-sm text-sognos-text-body leading-relaxed">
                Local health and care expertise. Microsoft delivery, integration
                and change support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="solutions" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl lg:text-3xl font-medium text-prussian-blue-800 tracking-heading">
              Solutions for today&rsquo;s operational pressure
            </h2>
            <p className="mt-3 text-sm lg:text-base text-sognos-text-body max-w-2xl mx-auto leading-relaxed">
              Practical Microsoft-based solutions that reduce administration,
              improve oversight and help teams focus on what matters most.
            </p>
          </div>
          <SolutionsGrid />
        </div>
      </section>

      {/* WHY + LOCALISATION */}
      <section className="py-16 lg:py-24 border-t border-sognos-border-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
            {/* Why DigPacks and Sognos */}
            <div className="rounded-lg bg-gray-200/70 p-8 lg:p-10">
              <h2 className="font-heading text-xl lg:text-2xl font-medium text-prussian-blue-800 tracking-heading mb-6">
                Why DigPacks and Sognos?
              </h2>
              <ul className="space-y-4">
                {whyReasons.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-[#1D96FC] shrink-0 mt-0.5"
                      aria-hidden
                    />
                    <span className="text-sm text-sognos-text-body leading-snug">
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Centre panel — placeholder for partnership photo */}
            <div className="rounded-lg bg-gray-200/70 overflow-hidden min-h-64 flex items-center justify-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-sognos-text-muted px-6 text-center">
                Partnership in action
              </p>
            </div>

            {/* Localisation */}
            <div className="rounded-lg bg-prussian-blue-800 p-8 lg:p-10">
              <h2 className="font-heading text-xl lg:text-2xl font-medium text-white tracking-heading mb-2">
                Localisation is more than changing terminology.
              </h2>
              <p className="text-sm text-[#8E9EBB] leading-relaxed mb-6">
                We work with you to ensure each solution is configured for:
              </p>
              <ul className="space-y-3">
                {localisationPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <CheckCircle2
                      size={16}
                      className="text-[#1D96FC] shrink-0 mt-0.5"
                      aria-hidden
                    />
                    <span className="text-sm text-white/80 leading-snug">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-lg bg-prussian-blue-800 p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h2 className="font-heading text-2xl lg:text-3xl font-medium text-white tracking-heading">
                Ready to explore what&rsquo;s possible?
              </h2>
              <p className="mt-2 text-sm text-[#8E9EBB] max-w-xl leading-relaxed">
                Book an obligation-free discussion with the Sognos team to
                understand how DigPacks solutions can be localised for your
                organisation.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-[#1D96FC] hover:bg-[#1a85e0] text-white font-semibold text-sm px-6 py-3.5 transition-colors"
            >
              Book a discussion
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 7h10M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
