import Link from "next/link";
import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";

// The six pillars, kept in step with the dedicated
// /company/social-responsibility page's own PILLARS array. Full bodies here;
// the list clamps them and one link goes through to the full page.
const PILLARS = [
  {
    title: "Community Engagement",
    body: "Engaging with local communities is fundamental to who we are. We actively seek opportunities to support community development projects - through volunteering, resources, and expertise. By fostering strong relationships with the communities we serve, we create long-lasting positive impacts.",
  },
  {
    title: "Environmental Sustainability",
    body: "We are dedicated to minimising our environmental impact and promoting sustainability throughout our operations. Sognos continuously seeks ways to operate more efficiently and responsibly - protecting the environment for future generations.",
  },
  {
    title: "Ethical Business Practices",
    body: "Integrity and ethics are the cornerstones of our business philosophy. We conduct our operations with honesty, transparency, and fairness, adhering to the highest standards of ethical conduct. We believe in doing the right thing, even when it's challenging.",
  },
  {
    title: "Employee Welfare",
    body: "Our employees are our most valuable asset. We are committed to creating a safe and inclusive work environment where everyone feels valued and respected. Through ongoing training and development, we empower our team to reach their full potential.",
  },
  {
    title: "Continuous Improvement",
    body: "Our journey toward social responsibility is ongoing and ever evolving. We are committed to continuously assessing and improving our practices. Through regular evaluation and feedback, we strive to be a responsible corporate citizen and a force for good.",
  },
  {
    title: "Partnerships for Impact",
    body: "Collaboration is key to driving meaningful change. We actively seek partnerships with like-minded organisations who share our commitment to social responsibility. Together, we leverage collective resources to address pressing social and environmental challenges.",
  },
];

export default function SocialResponsibilitySection() {
  return (
    <section className="w-full bg-sognos-navy py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Left label rail + heading, the same frame as AboutValues and
            TeamSection so the page reads as one left-aligned rhythm. */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-2">
            <AnimatedEyebrow textClassName="text-white/80">
              Social Responsibility
            </AnimatedEyebrow>
          </div>

          <div className="min-w-0 lg:col-[3/-1]">
            <h2 className="max-w-3xl font-heading text-3xl font-medium tracking-tight text-white text-balance md:text-4xl">
              Our commitment to community and planet.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              Social responsibility is at the core of our values - we are
              committed to making a difference where we live, work, and do
              business.
            </p>

            {/* Six pillars, type-first — numeral marker + title + clamped
                body over a hairline, no cards (the AboutValues beliefs
                pattern). One link to the full page below, rather than six
                identical "Read more" destinations. */}
            <ol className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-y-12">
              {PILLARS.map((pillar, i) => (
                <li
                  key={pillar.title}
                  className="flex flex-col border-t border-white/20 pt-6"
                >
                  <span
                    aria-hidden="true"
                    className="font-heading text-3xl font-light leading-none tabular-nums text-white/25"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-heading text-xl font-medium leading-snug tracking-tight text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-white/75 line-clamp-3">
                    {pillar.body}
                  </p>
                </li>
              ))}
            </ol>

            <Link
              href="/company/social-responsibility"
              className="group mt-12 inline-flex items-center gap-2 text-base font-medium text-white transition-colors hover:text-sognos-blue-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sognos-blue-accent"
            >
              Read our commitment
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
