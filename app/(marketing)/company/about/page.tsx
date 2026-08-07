import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import TeamSection from "@/components/layout/sections/TeamSection";
import SocialResponsibilitySection from "@/components/layout/sections/SocialResponsibilitySection";
import AboutValues from "@/components/layout/sections/AboutValues";
import AboutStoryTimeline from "@/components/layout/sections/AboutStoryTimeline";
import AboutHeroImage from "@/components/layout/sections/AboutHeroImage";
import AboutPartnersSlider from "@/components/layout/sections/AboutPartnersSlider";
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
    // Black-on-transparent variant, for the light card. The `-dark` file is
    // white-on-black and only worked on the old navy surface.
    logo: "/logos/partners/One-Software.png",
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

// Government prequalification and industry memberships — the same three assets
// the footer carries. Intrinsic sizes are the artwork's own; height is capped
// in the markup, so these only set the aspect ratio Next needs. (Kept in step
// with `ACCREDITATIONS` in components/layout/Footer.tsx by hand for now.)
const ACCREDITATIONS = [
  {
    alt: "NSW Government Approved Supplier - SCM0020 Prequalification Scheme: ICT Services",
    src: "/logos/accreditations/nsw-ict-services.png",
    width: 1024,
    height: 299,
  },
  {
    alt: "Australasian Institute of Digital Health - Organisational Member",
    src: "/logos/accreditations/aidh.png",
    width: 200,
    height: 100,
  },
  {
    alt: "Talking HealthTech partner",
    src: "/logos/accreditations/talking-health-tech.png",
    width: 200,
    height: 200,
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="w-full bg-white">
      {/* ── Hero — white, eyebrow + heading + CTA (matches solutions/[slug]) ─── */}
      <section className="bg-white pt-32 pb-20 md:pb-28 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left — eyebrow + heading + intro */}
            <div className="lg:col-span-7">
              <AnimatedEyebrow textClassName="text-sognos-muted">
                About Sognos
              </AnimatedEyebrow>
              <h1 className="mt-5 font-heading font-normal text-sognos-heading text-5xl tracking-tight text-balance lg:text-6xl">
                Smarter automation for modern teams
              </h1>
              <p className="mt-6 max-w-5xl text-lg leading-relaxed text-sognos-body">
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

      {/* ── Our Story — four-waypoint editorial timeline closing on the
          AboutStats tally. Replaces the previous four-paragraph copy
          column (2026-08-06). Content is placeholder pending real dates
          and events from Kunal / Rick. */}
      <AboutStoryTimeline />

      {/* ── Our Values — Mission / Vision / Beliefs on navy ───────────────────── */}
      <AboutValues />

      <TeamSection />

      {/* Partners — light section. A 3-up drag+arrows slider (revealing the
          fourth card) sits above an accreditations & memberships sub-band. The
          old dark two-column layout, and the interim static 4-col grid, are in
          git history if either needs to come back. */}
      <section className="w-full bg-white">
        <div className="max-w-7xl w-full mx-auto px-6 py-20 md:py-28">
          <AboutPartnersSlider partners={PARTNERS} />

          {/* Accreditations & memberships — a lighter sub-band under the
              partners. Logos are greyscale until hover, each on a bordered
              white plate, since the artwork already assumes a white field.
              Not links: these are credentials, not destinations. */}
          <div className="mt-16 border-t border-sognos-line pt-12 lg:mt-24 lg:pt-16">
            <AnimatedEyebrow className="mb-8" textClassName="text-sognos-muted">
              Accreditations &amp; Memberships
            </AnimatedEyebrow>
            <ul className="flex flex-wrap gap-3 lg:gap-4">
              {ACCREDITATIONS.map((item) => (
                <li
                  key={item.src}
                  className="group flex h-24 w-44 items-center justify-center rounded-lg border border-sognos-line bg-white p-5"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    className="max-h-12 w-auto max-w-full object-contain opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SocialResponsibilitySection />

      {/* Careers — light copy-only band after routable.com/about. A rounded
          tint panel sits inset on white: copy + CTA left, the benefit titles
          as a stacked list right. */}
      <section className="w-full bg-white">
        <div className="max-w-7xl w-full mx-auto px-6 py-20 md:py-28">
          <div className="rounded-lg bg-sognos-tint p-8 lg:p-14">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <AnimatedEyebrow className="mb-4" textClassName="text-sognos-muted">
                  Careers
                </AnimatedEyebrow>
                <h2 className="font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
                  Join Sognos to drive innovation together.
                </h2>
                <p className="mt-6 leading-relaxed text-sognos-body">
                  We&apos;re a community of passionate individuals committed to
                  driving innovation and creating positive change. If you thrive
                  in a collaborative, high-trust environment and want your work
                  to matter, Sognos is built for you.
                </p>
                <Link
                  href="/company/careers"
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sognos-heading transition-colors hover:text-sognos-blue-accent"
                >
                  View open roles
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    &rarr;
                  </span>
                </Link>
              </div>

              {/* Benefit titles only, stacked. Square marker is the brand's
                  recurring motif. */}
              <ul className="flex flex-col gap-4">
                {[
                  "Collaborative culture",
                  "Continuous learning",
                  "Work-life balance",
                  "Equal opportunity",
                ].map((label) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 border-b border-sognos-line pb-4 last:border-b-0 last:pb-0"
                  >
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 bg-sognos-blue-accent"
                    />
                    <span className="font-heading text-lg font-medium tracking-tight text-sognos-heading">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
