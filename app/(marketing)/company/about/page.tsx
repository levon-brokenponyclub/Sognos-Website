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

const PARTNERS = [
  {
    name: "Microsoft",
    logo: "/logos/partners/mslogo.webp",
    type: "Solutions Partner",
    logoBg: "bg-white",
    logoFilter: "",
    description:
      "As a Microsoft Solutions Partner, Sognos builds natively on Dynamics 365, Power Platform, and Azure - giving clients access to continuous innovation and enterprise-grade security.",
  },
  {
    name: "SoftwareOne",
    logo: "/logos/partners/One-Software-dark.png",
    type: "Software & Licensing",
    logoBg: "bg-black",
    logoFilter: "",
    description:
      "SoftwareOne helps organisations manage and optimise their Microsoft licensing. Our partnership ensures clients get the right entitlements, at the right cost, from day one.",
  },
  {
    name: "Ingram Micro",
    logo: "/logos/partners/ingram-micro.png",
    type: "Distribution & Services",
    logoBg: "bg-[#146FEE]",
    logoFilter: "",
    description:
      "Ingram Micro's global distribution network and services capabilities support Sognos clients with deployment, logistics, and lifecycle management.",
  },
  {
    name: "Resco",
    logo: "/logos/partners/resco-blue-bg.png",
    type: "Mobile Solutions",
    logoBg: "bg-[#0065CC]",
    description:
      "Resco extends Dynamics 365 Field Service with powerful offline-capable mobile applications, keeping frontline teams productive regardless of connectivity.",
  },
];

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
              <h1 className="mt-5 font-heading font-normal text-sognos-header text-5xl md:text-6xl lg:text-7xl tracking-tight text-balance">
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
            {/* Column 1 — eyebrow + title */}
            <div className="col-span-1">
              <AnimatedEyebrow textClassName="text-sognos-muted">
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

      {/* Partners - Sticky Scroll Layout */}
      <section className="w-full border-b border-sognos-line bg-white">
        <div className="max-w-7xl w-full mx-auto px-6 py-24 lg:py-32">
          <div className="grid grid-cols-1 gap-16 items-start lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            {/* Left column - Sticky */}
            <div className="lg:sticky lg:top-32">
              <AnimatedEyebrow
                className="mb-4"
                textClassName="text-sognos-muted"
              >
                Our Partners
              </AnimatedEyebrow>
              <h2 className="font-heading text-3xl md:text-4xl font-medium text-sognos-blue-accent lg:text-left tracking-tight mb-6">
                Let&apos;s build. Together.
              </h2>
              <p className="text-lg text-sognos-body leading-relaxed max-w-md">
                We&apos;ve partnered with some of the best innovators in the
                industry to bring you new and exciting possibilities - enhanced
                and integrated business solutions to your most complex problems.
              </p>
            </div>

            {/* Right column - Scrolling stack */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
              {PARTNERS.map((partner) => (
                <div
                  key={partner.name}
                  className="group flex min-h-[360px] flex-col overflow-hidden rounded-lg border border-sognos-line bg-slate-50 transition-all duration-300 hover:border-sognos-blue-accent/30"
                >
                  {/* Logo cell */}
                  <div
                    className={`flex min-h-44 w-full shrink-0 items-center justify-center border-b border-sognos-line p-8 ${partner.logoBg}`}
                  >
                    <div className="relative h-24 w-48 transition-transform duration-500 group-hover:scale-110">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className={`object-contain ${partner.logoFilter}`}
                      />
                    </div>
                  </div>
                  {/* Info cell */}
                  <div className="flex flex-1 flex-col p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-sognos-blue-accent mb-2">
                      {partner.type}
                    </p>
                    <h3 className="text-2xl font-medium text-sognos-body leading-tight text-balance transition-colors duration-200 mb-4">
                      {partner.name}
                    </h3>
                    <p className="text text-sognos-body leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SocialResponsibilitySection />

      {/* Careers overview */}
      <section className="w-full bg-[#173465]">
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
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#173465] text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                View open roles
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
