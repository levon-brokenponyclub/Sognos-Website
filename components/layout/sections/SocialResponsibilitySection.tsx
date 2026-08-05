import Link from "next/link";
import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";

// The six pillars, kept in step with the dedicated
// /company/social-responsibility page's own PILLARS array. Full bodies here;
// the card clamps them and links through for the rest.
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
    <section className="w-full bg-sognos-navy py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Centred header — eyebrow over title over description. */}
        <div className="mx-auto max-w-3xl text-center">
          <AnimatedEyebrow className="mb-5" textClassName="text-white/50">
            Social Responsibility
          </AnimatedEyebrow>
          <h2 className="font-heading text-3xl font-medium tracking-tight text-white text-balance md:text-4xl">
            Our commitment to community and planet.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            Social responsibility is at the core of our values - we are committed
            to making a difference where we live, work, and do business.
          </p>
        </div>

        {/* Six pillars, three across / two down. Card after
            routable.com/about's "featured" grid: title, dashed rule, clamped
            description, Read more. The whole card links to the full page. */}
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-14">
          {PILLARS.map((pillar) => (
            <Link
              key={pillar.title}
              href="/company/social-responsibility"
              className="group flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sognos-blue-accent"
            >
              <h3 className="font-heading text-xl font-medium leading-snug tracking-tight text-white lg:text-2xl">
                {pillar.title}
              </h3>
              <div className="my-5 border-t border-dashed border-white/20" />
              <p className="text-base leading-relaxed text-white/65 line-clamp-3">
                {pillar.body}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors group-hover:text-sognos-blue-accent">
                Read more
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  &rarr;
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
