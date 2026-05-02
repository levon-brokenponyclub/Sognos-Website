import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import TeamSection from "@/components/sections/TeamSection";
import SocialResponsibilitySection from "@/components/sections/SocialResponsibilitySection";

export const metadata: Metadata = {
  title: "About Sognos | Sognos",
  description:
    "Since 2016, Sognos has helped service organisations work smarter with Microsoft Dynamics 365. Meet our leadership team.",
};

// ─── Data ────────────────────────────────────────────────────────────────────

const VALUES = [
  {
    title: "Respect for the individual",
    body: "Every person — client, partner, or team member — is treated with dignity and care.",
  },
  {
    title: "Value to our customers",
    body: "Outcomes over activity. We measure success by the impact we deliver, not the hours we bill.",
  },
  {
    title: "Excellence in all that we do",
    body: "We hold ourselves to the highest standards of delivery, ethics, and continuous improvement.",
  },
];

const PARTNERS = [
  {
    name: "Microsoft",
    logo: "/logos/partners/mslogo.webp",
    type: "Solutions Partner",
    description:
      "As a Microsoft Solutions Partner, Sognos builds natively on Dynamics 365, Power Platform, and Azure — giving clients access to continuous innovation and enterprise-grade security.",
  },
  {
    name: "rhipe — A Crayon Company",
    logo: "/logos/partners/Crayon.webp",
    type: "Software & Licensing",
    description:
      "rhipe, a Crayon company, helps organisations manage and optimise their Microsoft licensing. Our partnership ensures clients get the right entitlements, at the right cost, from day one.",
  },
  {
    name: "Resco",
    logo: "/logos/partners/Resco.webp",
    type: "Mobile Solutions",
    description:
      "Resco extends Dynamics 365 Field Service with powerful offline-capable mobile applications, keeping frontline teams productive regardless of connectivity.",
  },
  {
    name: "Ingram Micro",
    logo: "/logos/partners/ingram-micro.png",
    type: "Distribution & Services",
    description:
      "Ingram Micro's global distribution network and services capabilities support Sognos clients with deployment, logistics, and lifecycle management.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="w-full bg-white">
      {/* Hero Bento */}
      <section className="w-full bg-gray-100 pt-24 lg:pt-44 pb-16 lg:pb-24 border-b border-gray-100">
        <div className="max-w-7xl w-full mx-auto px-6">
          {/* Heading */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 lg:mb-16 gap-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-prussian-blue-800/30 text-prussian-blue-800 font-medium">
              <span className="w-2 h-2 bg-[#1D96FC] rounded-full" />
              About Sognos
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-prussian-blue-800 tracking-tight">
              Company
            </h1>
            <p className="text-base lg:text-lg text-sognos-text-body leading-relaxed">
              Built to serve the organisations that serve others. Since 2016,
              Sognos has helped service organisations work smarter — replacing
              disconnected tools with a single intelligent platform built
              natively on Microsoft Dynamics 365.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-5">
            {/* Left Column */}
            <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-4 lg:gap-5">
              {/* Stat 1 — Dark */}
              <div className="rounded-lg bg-prussian-blue-800 text-white p-8 lg:p-10 flex flex-col justify-end h-[200px] md:h-[260px] lg:h-[310px] transition-all duration-500 hover:-translate-y-1">
                <p className="text-5xl text-white lg:text-6xl font-heading font-medium mb-3 tracking-tight">
                  2016
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-white">
                  Founded
                </p>
              </div>

              {/* Stat 2 — Video */}
              <div className="rounded-lg relative overflow-hidden h-[200px] md:h-[260px] lg:flex-1 p-8 lg:p-10 flex flex-col justify-end transition-all duration-500 hover:-translate-y-1 group">
                <video
                  src="https://www.shutterstock.com/shutterstock/videos/3849131045/preview/stock-footage-industrial-engineer-wearing-protective-safety-equipment-gesturing-and-instructing-near-machinery.webm"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-prussian-blue-900/90 via-prussian-blue-900/30 to-transparent" />
                <div className="relative z-10 text-white">
                  <p className="text-5xl text-white lg:text-6xl font-heading font-medium mb-3 tracking-tight">
                    9+
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-white">
                    Years in field service
                  </p>
                </div>
              </div>
            </div>

            {/* Center Column — portrait image */}
            <div className="md:col-span-2 lg:col-span-5 relative rounded-lg overflow-hidden h-[300px] md:h-auto md:min-h-[500px] lg:min-h-0 transition-all duration-500 hover:-translate-y-1 group">
              <Image
                src="/images/industries/health-social-care.webp"
                alt="Working together"
                fill
                className="object-cover transition duration-1000 group-hover:scale-105"
              />
            </div>

            {/* Right Column */}
            <div className="md:col-span-4 lg:col-span-4 flex flex-col gap-4 lg:gap-5">
              {/* Wide Image */}
              <div className="relative rounded-lg overflow-hidden h-[200px] md:h-[260px] lg:h-[310px] transition-all duration-500 hover:-translate-y-1 group">
                <Image
                  src="/images/industries/energy-utilities.webp"
                  alt="Office meeting"
                  fill
                  className="object-cover transition duration-1000 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 lg:gap-5 flex-1">
                {/* Stat 3 — Dark */}
                <div className="rounded-lg bg-[#1D96FC] text-white p-6 lg:p-8 flex flex-col justify-end flex-1 min-h-[160px] transition-all duration-500 hover:-translate-y-1">
                  <p className="text-4xl text-white lg:text-5xl font-heading font-medium mb-3 tracking-tight">
                    3
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-white">
                    Countries served
                  </p>
                </div>

                {/* Stat 4 — Image */}
                <div className="rounded-lg bg-white relative overflow-hidden flex-1 p-6 lg:p-8 flex flex-col justify-end min-h-[200px] transition-all duration-500 hover:-translate-y-1 group">
                  <div className="relative z-10 text-white">
                    <p className="text-4xl lg:text-5xl font-heading font-medium mb-3 tracking-tight">
                      1,100+
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-prussian-blue-800">
                      Users on platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="w-full bg-gray-200/70 border-b border-sognos-border-subtle">
        <div className="max-w-7xl w-full mx-auto px-6 py-24 lg:py-32">
          {/* Section Header */}
          <div className="mb-16 lg:mb-20">
            <span className="inline-block px-3 py-1 rounded-full border border-gray-200 bg-white text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-6">
              Our Mission & Vision
            </span>
            <h2 className="font-heading text-4xl lg:text-6xl font-semibold text-prussian-blue-800 tracking-tight leading-[1.1]">
              First in field service: <br />
              <span className="text-gray-400">our vision & mission</span>{" "}
              explained
            </h2>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden mb-24 lg:mb-32">
            {/* Mission Card */}
            <div className="bg-white p-10 lg:p-14 flex flex-col">
              <h3 className="font-heading text-3xl font-semibold text-prussian-blue-800 mb-8">
                Mission
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg mb-10">
                By leveraging modern business applications — centred on
                Microsoft Dynamics 365 — we simplify processes, solve
                operational challenges, and deliver measurable value for the
                organisations that keep communities running.
              </p>
              <div className="mt-auto p-8 rounded-lg bg-[#F8FAFC] border border-gray-100">
                <p className="italic text-gray-500 text-sm leading-relaxed mb-4">
                  We simplify processes, solve operational challenges, and
                  deliver measurable value for those who serve others.
                </p>
                <p className="text-xs font-bold text-prussian-blue-800 uppercase tracking-wide">
                  — Our Commitment
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-10 lg:p-14 flex flex-col">
              <h3 className="font-heading text-3xl font-semibold text-prussian-blue-800 mb-8">
                Vision
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg mb-10">
                To be first in field service. We aim to set the global standard
                for operational excellence in service-led organisations through
                innovation and native cloud technology.
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                {[
                  "Innovation",
                  "Operational Excellence",
                  "Cloud Native",
                  "Field Service",
                  "D365 Expertise",
                  "Direct Impact",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-100 text-[11px] font-semibold text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="border-t border-gray-200 pt-20">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-sognos-text-muted mb-10">
              Our Core Values
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {VALUES.map((v) => (
                <div key={v.title} className="group">
                  <div className="w-12 h-px bg-[#1D96FC] mb-6 transition-all duration-500 group-hover:w-full" />
                  <h4 className="font-heading text-xl font-semibold text-prussian-blue-800 mb-4 transition-colors group-hover:text-[#1D96FC]">
                    {v.title}
                  </h4>
                  <p className="text-sm text-sognos-text-body leading-relaxed text-gray-600">
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TeamSection />

      {/* Partners - Sticky Scroll Layout */}
      <section className="w-full border-b border-sognos-border-subtle bg-white">
        <div className="max-w-7xl w-full mx-auto px-6 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left column - Sticky */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted mb-4">
                Partners
              </p>
              <h2 className="font-heading text-4xl lg:text-5xl font-medium text-prussian-blue-800 tracking-tight mb-6">
                Our Partners
              </h2>
              <p className="text-lg text-sognos-text-body leading-relaxed max-w-md">
                We&apos;ve partnered with some of the best innovators in the
                industry to bring you new and exciting possibilities — enhanced
                and integrated business solutions to your most complex problems.
              </p>
            </div>

            {/* Right column - Scrolling stack */}
            <div className="lg:col-span-7 space-y-4 lg:space-y-6">
              {PARTNERS.map((partner) => (
                <div
                  key={partner.name}
                  className="group bg-gray-200/70 border border-sognos-border-subtle rounded-lg overflow-hidden flex flex-col sm:flex-row transition-all duration-300 hover:border-[#1D96FC]/30"
                >
                  {/* Logo cell */}
                  <div className="shrink-0 w-full sm:w-48 flex items-center justify-center p-8 bg-white border-b sm:border-b-0 sm:border-r border-sognos-border-subtle">
                    <div className="relative w-28 h-14 transition-transform duration-500 group-hover:scale-110">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  {/* Info cell */}
                  <div className="flex-1 p-8 lg:p-10">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1D96FC] mb-2">
                      {partner.type}
                    </p>
                    <h3 className="font-heading text-xl font-semibold text-prussian-blue-800 mb-4">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-sognos-text-body leading-relaxed ">
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
      <section className="w-full bg-prussian-blue-800">
        <div className="max-w-7xl w-full mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50 mb-4">
                Careers
              </p>
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
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-prussian-blue-800 text-sm font-semibold hover:opacity-90 transition-opacity"
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
