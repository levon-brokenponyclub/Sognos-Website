import type { Metadata } from "next";
import Link from "next/link";
import AboutHeroImage from "@/components/layout/sections/AboutHeroImage";

export const metadata: Metadata = {
  title: "Social Responsibility | Sognos",
  description:
    "Our commitment to community engagement, environmental sustainability, ethical business practices, and employee welfare.",
};

// ─── Data ────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    number: "01",
    title: "Community Engagement",
    body: "Engaging with local communities is fundamental to who we are. We actively seek opportunities to support community development projects - through volunteering, resources, and expertise. By fostering strong relationships with the communities we serve, we create long-lasting positive impacts.",
  },
  {
    number: "02",
    title: "Environmental Sustainability",
    body: "We are dedicated to minimising our environmental impact and promoting sustainability throughout our operations. Sognos continuously seeks ways to operate more efficiently and responsibly - protecting the environment for future generations.",
  },
  {
    number: "03",
    title: "Ethical Business Practices",
    body: "Integrity and ethics are the cornerstones of our business philosophy. We conduct our operations with honesty, transparency, and fairness, adhering to the highest standards of ethical conduct. We believe in doing the right thing, even when it's challenging.",
  },
  {
    number: "04",
    title: "Employee Welfare",
    body: "Our employees are our most valuable asset. We are committed to creating a safe and inclusive work environment where everyone feels valued and respected. Through ongoing training and development, we empower our team to reach their full potential.",
  },
  {
    number: "05",
    title: "Continuous Improvement",
    body: "Our journey toward social responsibility is ongoing and ever evolving. We are committed to continuously assessing and improving our practices. Through regular evaluation and feedback, we strive to be a responsible corporate citizen and a force for good.",
  },
  {
    number: "06",
    title: "Partnerships for Impact",
    body: "Collaboration is key to driving meaningful change. We actively seek partnerships with like-minded organisations who share our commitment to social responsibility. Together, we leverage collective resources to address pressing social and environmental challenges.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SocialResponsibilityPage() {
  return (
    <main className="w-full bg-white">
      {/* Hero */}
      <section className="bg-white pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <p className="inline-block text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                Social Responsibility
              </p>
              <h1 className="mt-5 font-heading font-normal text-sognos-heading text-5xl md:text-6xl lg:text-7xl tracking-tight text-balance">
                Our commitment to community and planet.
              </h1>
              <p className="mt-6 max-w-5xl text-lg leading-relaxed text-gray-600">
                At Sognos we understand that our impact extends far beyond the
                services we provide. Social responsibility is at the core of our
                values - we are committed to making a difference where we live,
                work, and do business.
              </p>
            </div>
            <div className="flex lg:col-span-5 lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-sognos-navy px-7 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-sognos-blue-accent"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-16 lg:mt-20">
          <AboutHeroImage src="/images/about/social-responsibility-hero-img.webp" />
        </div>
      </section>

      {/* Mission statement */}
      <section className="w-full border-b border-sognos-line">
        <div className="max-w-7xl w-full mx-auto px-6 py-20">
          <p className="font-heading text-2xl md:text-3xl font-medium text-sognos-body tracking-tight max-w-5xl">
            &ldquo;It is our goal to benefit the communities in which we live
            and do business. We are committed to creating a healthier
            world.&rdquo;
          </p>
        </div>
      </section>

      {/* Pillars grid */}
      <section className="w-full bg-sognos-navy py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-normal uppercase tracking-[0.08em] text-sognos-blue-accent">
              Our Pillars
            </p>
            <h2 className="mt-6 font-heading text-4xl font-normal leading-tight tracking-tight text-white text-balance lg:text-4xl">
              Practical commitments that guide how we show up.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
              Social responsibility is part of how we operate, from community
              partnerships and ethical conduct to sustainable practice and
              employee wellbeing.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:mt-24 lg:grid-cols-3">
            {PILLARS.map((pillar, index) => (
              <div
                key={pillar.number}
                className="flex min-h-[255px] flex-col rounded-lg bg-white/[0.055] p-8 sm:min-h-[300px] lg:min-h-[340px]"
              >
                <p className="font-mono text-base leading-relaxed text-sognos-blue-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="mt-auto">
                  <h3 className="font-heading text-xl font-medium leading-tight tracking-tight text-white lg:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-white/70 lg:text-lg">
                    {pillar.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="w-full">
        <div className="max-w-7xl w-full mx-auto px-6 py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-sognos-body tracking-tight mb-6">
              Want to know more?
            </h2>
            <p className="mt-3 text-sognos-body leading-relaxed">
              At Sognos we believe that by embracing environmental and social
              responsibility, we can create a better world for future
              generations. Get in touch to learn more about our initiatives.
            </p>
          </div>
          <a
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sognos-navy text-white text-sm font-semibold hover:bg-prussian-blue-700 transition-colors"
          >
            Contact us
          </a>
        </div>
      </section>
    </main>
  );
}
