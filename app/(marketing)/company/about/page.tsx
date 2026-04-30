import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Sognos | Sognos",
  description:
    "Since 2016, Sognos has helped service organisations work smarter with Microsoft Dynamics 365. Meet our leadership team.",
};

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "2016", label: "Founded" },
  { value: "9+", label: "Years in field service" },
  { value: "3", label: "Countries served" },
  { value: "1,100+", label: "Users on platform" },
];

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

const TEAM = [
  {
    name: "Kunal Joshi",
    role: "Managing Director & Co-Founder",
    bio: "With over 20 years in the technology sector, Kunal brings visionary leadership and a strategic mindset to drive Sognos forward. He holds a Master of Technology from Swinburne University and an Executive MBA from AGSM. His leadership emphasises collaboration, creativity, and a customer-centric approach.",
  },
  {
    name: "Rick Vosila",
    role: "Chief Commercial Officer & Co-Founder",
    bio: "A 40-year veteran of the Australian tech sector, Rick co-founded Sognos in 2016 after identifying a gap in the Microsoft ecosystem for a specialist Field Service Management integrator. He holds a Bachelor of Commerce and an MBA, and serves his community as a proud Rotarian.",
  },
  {
    name: "Miloni Mehta",
    role: "Microsoft D365 & Power Platform Practice Lead",
    bio: "Miloni has built a career solving business problems with Microsoft technology across healthcare, utilities, and facilities maintenance. She holds a Master's in Data Analytics from UTS and is a recognised expert in Dynamics 365 Field Service architecture and end-to-end solution design.",
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

const SR_PILLARS = [
  { title: "Community Engagement", body: "We actively seek opportunities to support community development — through volunteering, resources, and expertise." },
  { title: "Environmental Sustainability", body: "We minimise our environmental impact and continuously seek ways to operate more efficiently and responsibly." },
  { title: "Ethical Business Practices", body: "Integrity and transparency are cornerstones of how we operate — we believe in doing the right thing, always." },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="w-full bg-white">

      {/* Hero */}
      <section className="bg-prussian-blue-800 w-full">
        <div className="max-w-7xl w-full mx-auto px-6 py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50 mb-4">
            Company
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-medium text-white tracking-tight max-w-3xl">
            Built to serve the organisations that serve others.
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed">
            Since 2016, Sognos has helped service organisations work smarter —
            replacing disconnected tools with a single intelligent platform built
            natively on Microsoft Dynamics 365.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full border-b border-sognos-border-subtle">
        <div className="max-w-7xl w-full mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-heading text-4xl font-medium text-prussian-blue-800 tracking-tight">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-sognos-text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="w-full border-b border-sognos-border-subtle">
        <div className="max-w-7xl w-full mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted mb-4">
              Mission
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-prussian-blue-800 tracking-tight">
              We help service organisations work smarter.
            </h2>
            <p className="mt-6 text-sognos-text-body leading-relaxed">
              By leveraging modern business applications — centred on Microsoft
              Dynamics 365 — we simplify processes, solve operational challenges,
              and deliver measurable value for the organisations that keep
              communities running.
            </p>
            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted mb-2">
                Vision
              </p>
              <p className="font-heading text-xl font-medium text-prussian-blue-800">
                To be first in field service.
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted mb-6">
              Our Values
            </p>
            <ul className="space-y-6">
              {VALUES.map((v) => (
                <li key={v.title} className="border-t border-sognos-border-subtle pt-6">
                  <p className="font-heading text-base font-semibold text-prussian-blue-800">
                    {v.title}
                  </p>
                  <p className="mt-1 text-sm text-sognos-text-body leading-relaxed">
                    {v.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="w-full border-b border-sognos-border-subtle bg-slate-50">
        <div className="max-w-7xl w-full mx-auto px-6 py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted mb-4">
            Leadership
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-prussian-blue-800 tracking-tight mb-16">
            Senior Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {TEAM.map((member) => (
              <div key={member.name} className="flex flex-col">
                {/* Avatar placeholder — replace with next/image when photo assets available */}
                <div className="w-16 h-16 rounded-full bg-prussian-blue-800/10 mb-6 flex items-center justify-center">
                  <span className="text-prussian-blue-800/40 text-xl font-semibold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <p className="font-heading text-lg font-semibold text-prussian-blue-800">
                  {member.name}
                </p>
                <p className="text-sm text-brand mt-0.5 mb-4">{member.role}</p>
                <p className="text-sm text-sognos-text-body leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="w-full border-b border-sognos-border-subtle">
        <div className="max-w-7xl w-full mx-auto px-6 py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted mb-4">
            Partners
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-prussian-blue-800 tracking-tight mb-4">
            Our Partners
          </h2>
          <p className="text-sognos-text-body max-w-2xl mb-16 leading-relaxed">
            We&apos;ve partnered with some of the best innovators in the industry to
            bring you new and exciting possibilities — enhanced and integrated
            business solutions to your most complex problems.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="flex gap-0 border-t border-sognos-border-subtle [&:nth-child(odd)]:border-r"
              >
                {/* Logo cell */}
                <div className="shrink-0 w-40 flex items-center justify-center p-8 border-r border-sognos-border-subtle">
                  <div className={`relative w-24 h-12 rounded overflow-hidden${partner.name === "Ingram Micro" ? " rounded-md" : ""}`}>
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                {/* Info cell */}
                <div className="flex-1 p-8 bg-slate-50">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sognos-text-muted mb-2">
                    {partner.type}
                  </p>
                  <p className="font-heading text-base font-semibold text-prussian-blue-800 mb-3">
                    {partner.name}
                  </p>
                  <p className="text-sm text-sognos-text-body leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Responsibility overview */}
      <section className="w-full border-b border-sognos-border-subtle">
        <div className="max-w-7xl w-full mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted mb-4">
                Social Responsibility
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-medium text-prussian-blue-800 tracking-tight">
                Our commitment to community and planet.
              </h2>
              <p className="mt-6 text-sognos-text-body leading-relaxed">
                At Sognos, our impact extends far beyond the services we
                provide. Social responsibility is at the core of our values —
                we are committed to making a difference where we live, work,
                and do business.
              </p>
              <Link
                href="/company/social-responsibility"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-prussian-blue-800 hover:opacity-70 transition-opacity"
              >
                Read our full commitment
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-prussian-blue-900 text-white shrink-0">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>
            <ul className="space-y-0">
              {SR_PILLARS.map((p) => (
                <li key={p.title} className="border-t border-sognos-border-subtle py-6">
                  <p className="font-heading text-base font-semibold text-prussian-blue-800">
                    {p.title}
                  </p>
                  <p className="mt-1 text-sm text-sognos-text-body leading-relaxed">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

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
                in a collaborative, high-trust environment and want your work
                to matter, Sognos is built for you.
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
                { label: "Collaborative culture", body: "High-trust teams that share knowledge freely across disciplines." },
                { label: "Continuous learning", body: "Grow your Microsoft Dynamics 365 expertise with real, complex engagements." },
                { label: "Work-life balance", body: "Flexibility to do your best work while still making time for what matters." },
                { label: "Equal opportunity", body: "We welcome people of all backgrounds, identities, and abilities." },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-white/10 bg-white/5 p-6">
                  <p className="font-heading text-sm font-semibold text-white">{item.label}</p>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
