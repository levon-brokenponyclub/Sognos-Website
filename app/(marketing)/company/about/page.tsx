import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import TeamSection from "@/components/layout/sections/TeamSection";
import SocialResponsibilitySection from "@/components/layout/sections/SocialResponsibilitySection";
import AboutValues from "@/components/layout/sections/AboutValues";
import AboutStats from "@/components/layout/sections/AboutStats";
import AboutHeroImage from "@/components/layout/sections/AboutHeroImage";
import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";

export const metadata: Metadata = {
  title: "About Sognos | Sognos",
  description:
    "Since 2016, Sognos has helped service organisations work smarter with Microsoft Dynamics 365. Meet our leadership team.",
};

// ─── Data ────────────────────────────────────────────────────────────────────

// `logoBg` / `logoFilter` are gone: the cards are a single navy surface now, so
// there is no per-logo cell to tint and the logos render as supplied.
const PARTNERS = [
  {
    name: "Microsoft",
    logo: "/logos/partners/mslogo.webp",
    type: "Solutions Partner",
    href: "https://www.microsoft.com",
    description:
      "As a Microsoft Solutions Partner, Sognos builds natively on Dynamics 365, Power Platform, and Azure - giving clients access to continuous innovation and enterprise-grade security.",
  },
  {
    name: "SoftwareOne",
    logo: "/logos/partners/One-Software-dark.png",
    type: "Software & Licensing",
    href: "https://www.softwareone.com",
    description:
      "SoftwareOne helps organisations manage and optimise their Microsoft licensing. Our partnership ensures clients get the right entitlements, at the right cost, from day one.",
  },
  {
    name: "Ingram Micro",
    logo: "/logos/partners/ingram-micro.png",
    type: "Distribution & Services",
    href: "https://www.ingrammicro.com",
    description:
      "Ingram Micro's global distribution network and services capabilities support Sognos clients with deployment, logistics, and lifecycle management.",
  },
  {
    name: "Resco",
    logo: "/logos/partners/resco-blue-bg.png",
    type: "Mobile Solutions",
    href: "https://www.resco.net",
    description:
      "Resco extends Dynamics 365 Field Service with powerful offline-capable mobile applications, keeping frontline teams productive regardless of connectivity.",
  },
];

// Inlined rather than imported from Navbar.tsx, where the same mark lives as a
// non-exported local inside a "use client" module.
function IconArrowUpRight() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="w-full bg-white">
      {/* ── Hero — white, eyebrow + heading + CTA (matches solutions/[slug]) ─── */}
      <section className="bg-white pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left — eyebrow + heading + intro */}
            <div className="lg:col-span-7">
              <AnimatedEyebrow textClassName="text-sognos-muted">
                About Sognos
              </AnimatedEyebrow>
              <h1 className="mt-5 font-heading font-normal text-sognos-heading text-5xl md:text-6xl lg:text-7xl tracking-tight text-balance">
                Smarter automation for modern teams
              </h1>
              <p className="mt-6 max-w-5xl text-lg leading-relaxed text-gray-600">
                Built to serve the organisations that serve others. Since 2016,
                Sognos has helped service organisations work smarter - replacing
                disconnected tools with a single intelligent platform built
                natively on Microsoft Dynamics 365.
              </p>
            </div>
            {/* Right — CTA, right-aligned, bottom-aligned with the intro copy */}
            <div className="flex lg:col-span-5 lg:justify-end">
              <Link
                href="/company/careers"
                className="inline-flex items-center justify-center rounded-full bg-sognos-navy px-7 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-sognos-blue-accent"
              >
                Explore Careers
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Scroll-shrink hero image */}
      <AboutHeroImage />

      {/* ── About Sognos — light, eyebrow + statement + 4 stats ───────────────── */}
      <section className="bg-white py-20 pt-0 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-3 gap-4 lg:grid-cols-3 lg:gap-10">
            {/* Column 1 — eyebrow + title. `mt-12` matches the lead paragraph's
                own `mt-12` in column 2, so the eyebrow starts level with the
                right column's first line instead of floating above it. Change
                one and change the other. */}
            <div className="col-span-1 mt-12">
              {/* `flex w-fit` rather than the component's default `inline-flex`:
                  as an inline box it sat in the column's 24px line box and
                  picked up 5px of leading above it, so the eyebrow hung below
                  the right column's first line. `w-fit` keeps it shrink-to-fit. */}
              <AnimatedEyebrow
                className="flex w-fit"
                textClassName="text-sognos-muted"
              >
                Our Story
              </AnimatedEyebrow>
              <h2 className="mt-4 max-w-5xl font-heading text-2xl font-medium leading-snug tracking-tight text-sognos-heading text-balance md:text-4xl">
                Healthcare First. Field Service Always. AI at the Centre.
              </h2>
            </div>
            {/* Column 2 — body paragraphs + stats */}
            <div className="col-span-2">
              {/* Body paragraphs */}
              <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-sognos-body">
                <p className="mt-12 text-2xl font-medium">
                  For over a decade, Sognos has been helping organisations
                  simplify complex frontline operations through connected,
                  intelligent business solutions built around real work.
                </p>
                <p>
                  Since 2016, we&apos;ve partnered with organisations across
                  healthcare, social care, government and essential services to
                  modernise the way teams deliver care, services and community
                  support every day. From frontline healthcare providers to
                  mobile operational teams, we help organisations stay
                  connected, responsive and ready for change.
                </p>
                <p>
                  Our clients rely on Sognos to deliver highly usable,
                  integrated systems that improve visibility, reduce
                  administrative burden and support better experiences for both
                  teams and the people they serve.
                </p>
                <p>
                  As a specialist Microsoft Dynamics 365 partner, we combine
                  deep operational understanding with modern business
                  applications to help organisations transform complex service
                  delivery into smarter, more connected operations.
                </p>
              </div>
              {/* 3-stat row with count-up animation (border-r dividers) */}
              <AboutStats />
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values — stacking sticky cards (Mission + Vision) ─────────────── */}
      <AboutValues />

      <TeamSection />

      {/* Partners — dark section with navy cards one step lighter than the
          surface. Borderless by design: the cards separate on that tonal step
          alone, which is a narrow 1.12:1, so do not lighten the section or
          darken the cards without re-checking that they still read. */}
      <section className="w-full bg-sognos-navy-dark">
        <div className="max-w-7xl w-full mx-auto px-6 py-24 lg:py-32">
          {/* Two-column split after mintlify.com/customers: statement on the
              left at a third of the width, card grid on the right. The left
              column is not sticky — it would slide against a static grid. */}
          {/* No horizontal padding on either column: the statement's left edge
              and the grid's right edge sit flush against the container, so the
              section lines up with everything else on the page. Separation
              between the two columns is the flex gap, which does not inset
              those outer edges the way padding did. */}
          <div className="flex flex-col lg:flex-row lg:gap-10">
            {/* Left column - statement */}
            <div className="flex flex-col justify-start py-7 lg:w-1/3 lg:shrink-0">
              <AnimatedEyebrow className="mb-4" textClassName="text-white/50">
                Our Partners
              </AnimatedEyebrow>
              <h2 className="mb-6 font-heading text-3xl font-medium tracking-tight text-white md:text-4xl lg:text-left">
                Let&apos;s build. Together.
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-white/70">
                We&apos;ve partnered with some of the best innovators in the
                industry to bring you new and exciting possibilities - enhanced
                and integrated business solutions to your most complex problems.
              </p>
            </div>

            {/* Right column - card grid.
                Resting state is the logo alone, centred. Detail crosses in on
                hover: the logo lifts and fades out while the type / name /
                description fade up behind it. Both layers are absolutely
                positioned in the same box, so neither reserves height and the
                card keeps its aspect ratio in either state.

                The reference's `rounded-[6px]` is `rounded-lg` here — the
                radius rule allows no arbitrary values. The card surface stays
                `bg-sognos-navy` rather than the reference's near-transparent
                tint. */}
            <div className="min-w-0 flex-1">
              <div className="grid grid-cols-2 gap-3 py-3 lg:gap-4">
                {PARTNERS.map((partner) => (
                  <a
                    key={partner.name}
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={partner.name}
                    className="group/partner relative isolate flex aspect-[163/104] items-center justify-center overflow-hidden rounded-lg bg-sognos-navy focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sognos-blue-accent lg:aspect-[160/155]"
                  >
                    {/* Resting layer — logo only */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 flex items-center justify-center p-8 transition-[translate,opacity] duration-500 ease-[cubic-bezier(0,0,0,1)] group-hover/partner:-translate-y-2 group-hover/partner:opacity-0 motion-reduce:transition-none"
                    >
                      <span className="relative h-10 w-36">
                        <Image
                          src={partner.logo}
                          alt=""
                          fill
                          sizes="144px"
                          className="object-contain"
                        />
                      </span>
                    </span>

                    {/* Hover layer — detail */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 flex translate-y-2 flex-col justify-end p-5 pr-12 opacity-0 transition-[translate,opacity] duration-500 ease-[cubic-bezier(0,0,0,1)] group-hover/partner:translate-y-0 group-hover/partner:opacity-100 motion-reduce:transition-none"
                    >
                      <span className="block text-xs font-semibold uppercase tracking-widest text-white/60">
                        {partner.type}
                      </span>
                      <span className="mt-1.5 block font-heading text-lg font-medium leading-snug text-white">
                        {partner.name}
                      </span>
                      <span className="mt-1.5 block text-sm leading-snug text-white/80">
                        {partner.description}
                      </span>
                    </span>

                    {/* Arrow — fades in with the detail */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-lg bg-white text-sognos-navy opacity-0 transition-opacity duration-150 ease-out group-hover/partner:opacity-100"
                    >
                      <IconArrowUpRight />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SocialResponsibilitySection />

      {/* Careers overview */}
      <section className="w-full bg-sognos-navy">
        <div className="max-w-7xl w-full mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <AnimatedEyebrow className="mb-4" textClassName="text-white/50">
                Careers
              </AnimatedEyebrow>
              <h2 className="font-heading text-3xl md:text-4xl font-medium text-white tracking-tight">
                Join Sognos to drive innovation together.
              </h2>
              <p className="mt-6 text-white/70 leading-relaxed">
                We&apos;re a community of passionate individuals committed to
                driving innovation and creating positive change. If you thrive
                in a collaborative, high-trust environment and want your work to
                matter, Sognos is built for you.
              </p>
              <Link
                href="/company/careers"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-sognos-navy transition-opacity hover:opacity-90"
              >
                View open roles
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
              {[
                {
                  label: "Collaborative culture",
                  body: "High-trust teams that share knowledge freely across disciplines.",
                },
                {
                  label: "Continuous learning",
                  body: "Grow your Microsoft Dynamics 365 expertise with real, complex engagements.",
                },
                {
                  label: "Work-life balance",
                  body: "Flexibility to do your best work while still making time for what matters.",
                },
                {
                  label: "Equal opportunity",
                  body: "We welcome people of all backgrounds, identities, and abilities.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-white/10 bg-white/5 p-6"
                >
                  <p className="font-heading text-sm font-semibold text-white">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
