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
    body: "Every person - client, partner, or team member - is treated with dignity and care.",
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
      {/* Hero Bento */}
      <section className="w-full bg-gray-200/50 pt-40 lg:pt-44 pb-16 lg:pb-24">
        <div className="max-w-7xl w-full mx-auto px-6">
          {/* Heading */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 lg:mb-16 gap-4">
            <div className="relative inline-flex w-fit items-center gap-2 rounded-full border pl-3 pr-4 py-1 text-sm uppercase tracking-tight font-heading font-semibold bg-cornflower-ocean-200/50 text-[#173465]/80">
              <span
                aria-hidden
                className="animate-shine pointer-events-none absolute inset-0 rounded-full"
                style={
                  {
                    padding: "1px",
                    background:
                      "conic-gradient(from var(--shine-angle), transparent 0deg, rgba(9,18,42,0.75) 60deg, transparent 120deg, transparent 360deg)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    ["--shine-duration" as string]: "4s",
                  } as React.CSSProperties
                }
              />
              <span className="w-2 h-2 bg-sognos-blue-accent rounded-full"></span>
              About Sognos
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-4xl font-medium text-[#122E58] tracking-tight">
              Building smarter automation for modern teams
            </h1>
            <p className="text-base lg:text-lg text-sognos-body leading-relaxed">
              Built to serve the organisations that serve others. Since 2016,
              Sognos has helped service organisations work smarter - replacing
              disconnected tools with a single intelligent platform built
              natively on Microsoft Dynamics 365.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-5">
            {/* Left Column */}
            <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-4 lg:gap-5">
              {/* Stat 1 - Dark */}
              <div className="rounded-lg bg-[#203E71] text-white p-8 lg:p-10 flex flex-col justify-end h-[200px] md:h-[260px] lg:h-[310px] transition-all duration-500 hover:-translate-y-1">
                <p className="text-5xl text-white lg:text-5xl font-heading font-medium mb-3 tracking-tight">
                  2016
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-white">
                  Founded
                </p>
              </div>

              {/* Stat 2 - Video */}
              <div className="rounded-lg relative overflow-hidden bg-white h-[200px] md:h-[260px] lg:flex-1 p-8 lg:p-10 flex flex-col justify-end transition-all duration-500 hover:-translate-y-1 group">
                <div className="relative z-10 text-sognos-blue-accent">
                  <p className="text-5xl text-sognos-blue-accent lg:text-6xl font-heading font-medium mb-3 tracking-tight">
                    10+
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-sognos-blue-accent">
                    Years
                  </p>
                </div>
              </div>
            </div>

            {/* Center Column - portrait image */}
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
                {/* Stat 3 - Dark */}
                <div className="rounded-lg bg-sognos-blue-accent text-white p-6 lg:p-8 flex flex-col justify-end flex-1 min-h-[160px] transition-all duration-500 hover:-translate-y-1">
                  <p className="text-4xl text-white lg:text-5xl font-heading font-medium mb-3 tracking-tight">
                    3
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-white">
                    Countries served
                  </p>
                </div>

                {/* Stat 4 - Built on Microsoft */}
                <div className="rounded-lg bg-[#122E58] relative overflow-hidden flex-1 p-6 lg:p-8 flex flex-col justify-end min-h-[200px] transition-all duration-500 hover:-translate-y-1 group">
                  <div className="relative z-10 text-white">
                    <p className="text-2xl lg:text-3xl font-heading font-medium text-white tracking-tight">
                      Built on Microsoft
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-white/80">
                      Dynamics 365 Native
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="w-full bg-sognos-blue-accent">
        <div className="max-w-7xl w-full mx-auto px-6 py-24 lg:py-32 lg:pb-24">
          {/* Section Header */}
          <div className="mb-16 lg:mb-4">
            {/* <span className="inline-block px-3 py-1 rounded-full border border-gray-200 bg-white text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-6">
              Our Mission & Vision
            </span> */}
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-white text-center lg:text-left tracking-tight mb-6">
              Healthcare First. Field Service Always. AI at the Centre.
            </h2>
          </div>

          {/* About | Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden mb-3 lg:mb-3">
            {/* About Card */}
            <div className="bg-white p-10 lg:p-14 flex flex-col">
              <h3 className="text-2xl font-medium text-sognos-body leading-tight text-balance transition-colors duration-200 mb-8">
                About Sognos
              </h3>
              <div className="space-y-6 text-gray-600 leading-relaxed text-base">
                <p>
                  For over a decade, Sognos has been helping organisations
                  simplify complex frontline operations through connected,
                  intelligent business solutions built around real work.
                </p>
                <p>
                  Since 2016, we've partnered with organisations across
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
            </div>

            {/* Mission + Vision Card */}
            <div className="bg-white p-10 lg:p-14 flex flex-col">
              <h3 className="text-2xl font-medium text-sognos-body leading-tight text-balance transition-colors duration-200 mb-6">
                Mission
              </h3>
              <p className="text-gray-600 leading-relaxed text-base mb-12">
                Built to support the people delivering care, services and
                frontline operations every day - simplifying the complexity of
                healthcare through modern business applications designed for
                real-world service delivery.
              </p>

              <h3 className="text-2xl font-medium text-sognos-body leading-tight text-balance transition-colors duration-200 mb-6">
                Vision
              </h3>
              <p className="text-gray-600 leading-relaxed text-base mb-8">
                A future where healthcare and frontline teams are empowered by
                connected, intelligent systems that make work simpler and create
                better experiences for patients, clients and the communities
                they support.
              </p>

              <div className="mt-auto flex flex-wrap gap-2">
                {[
                  "Healthcare",
                  "Social Care",
                  "Community Care",
                  "Frontline Focused",
                  "Powered by AI",
                  "Field Ready",
                  "Connected Operations",
                  "Operational Excellence",
                  "Microsoft Native",
                  "Real World Design",
                  "Build for complexity",
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
          <div className="pt-10">
            {/* <p className="text-xs font-bold uppercase tracking-[0.14em] text-sognos-muted mb-10">
              Our Core Values
            </p> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {VALUES.map((v) => (
                <div key={v.title} className="group bg-white p-12 rounded-lg">
                  <div className="w-12 h-px bg-sognos-blue-accent mb-6 transition-all duration-500 group-hover:w-full" />
                  <h4 className="text-2xl font-medium text-sognos-body leading-tight text-balance duration-200 mb-4 transition-colors group-hover:text-sognos-blue-accent">
                    {v.title}
                  </h4>
                  <p className="text text-sognos-body leading-relaxed text-gray-600">
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
      <section className="w-full border-b border-sognos-line bg-white">
        <div className="max-w-7xl w-full mx-auto px-6 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left column - Sticky */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-muted mb-4">
                Partners
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-medium text-sognos-blue-accent lg:text-left tracking-tight mb-6">
                Our Partners
              </h2>
              <p className="text-lg text-sognos-body leading-relaxed max-w-md">
                We've partnered with some of the best innovators in the industry
                to bring you new and exciting possibilities - enhanced and
                integrated business solutions to your most complex problems.
              </p>
            </div>

            {/* Right column - Scrolling stack */}
            <div className="lg:col-span-7 space-y-4 lg:space-y-6">
              {PARTNERS.map((partner) => (
                <div
                  key={partner.name}
                  className="group bg-slate-50 border border-sognos-line rounded-lg overflow-hidden flex flex-col sm:flex-row transition-all duration-300 hover:border-sognos-blue-accent/30"
                >
                  {/* Logo cell */}
                  <div
                    className={`shrink-0 w-full sm:w-48 flex items-center justify-center p-8 ${partner.logoBg} border-b sm:border-b-0 sm:border-r border-sognos-line`}
                  >
                    <div className="relative w-48 h-28 transition-transform duration-500 group-hover:scale-110">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className={`object-contain ${partner.logoFilter}`}
                      />
                    </div>
                  </div>
                  {/* Info cell */}
                  <div className="flex-1 p-8 lg:p-10">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-sognos-blue-accent mb-2">
                      {partner.type}
                    </p>
                    <h3 className="text-2xl font-medium text-sognos-body leading-tight text-balance transition-colors duration-200 mb-4">
                      {partner.name}
                    </h3>
                    <p className="text text-sognos-body leading-relaxed ">
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
        {/* <div className="max-w-7xl w-full mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50 mb-4">
                Careers
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-medium text-white tracking-tight">
                Join Sognos to drive innovation together.
              </h2>
              <p className="mt-6 text-white/70 leading-relaxed">
                We're a community of passionate individuals committed to driving
                innovation and creating positive change. If you thrive in a
                collaborative, high-trust environment and want your work to
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
        </div> */}
      </section>
    </main>
  );
}
