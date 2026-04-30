import type { Metadata } from "next";

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
    body: "Engaging with local communities is fundamental to who we are. We actively seek opportunities to support community development projects — through volunteering, resources, and expertise. By fostering strong relationships with the communities we serve, we create long-lasting positive impacts.",
  },
  {
    number: "02",
    title: "Environmental Sustainability",
    body: "We are dedicated to minimising our environmental impact and promoting sustainability throughout our operations. Sognos continuously seeks ways to operate more efficiently and responsibly — protecting the environment for future generations.",
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
      <section className="bg-seagrass-700/30 w-full border-b border-sognos-border-subtle">
        <div className="max-w-7xl w-full mx-auto px-6 py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted mb-4">
            Company
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-medium text-prussian-blue-800 tracking-tight max-w-3xl">
            Our commitment to community and planet.
          </h1>
          <p className="mt-6 text-lg text-sognos-text-body max-w-2xl leading-relaxed">
            At Sognos we understand that our impact extends far beyond the
            services we provide. Social responsibility is at the core of our
            values — we are committed to making a difference where we live,
            work, and do business.
          </p>
        </div>
      </section>

      {/* Mission statement */}
      <section className="w-full border-b border-sognos-border-subtle">
        <div className="max-w-7xl w-full mx-auto px-6 py-20">
          <p className="font-heading text-2xl md:text-3xl font-medium text-prussian-blue-800 tracking-tight max-w-3xl">
            &ldquo;It is our goal to benefit the communities in which we live and do
            business. We are committed to creating a healthier world.&rdquo;
          </p>
        </div>
      </section>

      {/* Pillars grid */}
      <section className="w-full border-b border-sognos-border-subtle bg-slate-50">
        <div className="max-w-7xl w-full mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="border-t border-r border-sognos-border-subtle p-8 last:border-r-0 [&:nth-child(3n)]:border-r-0"
              >
                <span className="text-xs font-mono text-sognos-text-muted">
                  {pillar.number}
                </span>
                <h2 className="mt-3 font-heading text-lg font-semibold text-prussian-blue-800 tracking-tight">
                  {pillar.title}
                </h2>
                <p className="mt-3 text-sm text-sognos-text-body leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="w-full">
        <div className="max-w-7xl w-full mx-auto px-6 py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-prussian-blue-800 tracking-tight">
              Want to know more?
            </h2>
            <p className="mt-3 text-sognos-text-body leading-relaxed">
              At Sognos we believe that by embracing environmental and social
              responsibility, we can create a better world for future
              generations. Get in touch to learn more about our initiatives.
            </p>
          </div>
          <a
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-prussian-blue-800 text-white text-sm font-semibold hover:bg-prussian-blue-700 transition-colors"
          >
            Contact us
          </a>
        </div>
      </section>

    </main>
  );
}
