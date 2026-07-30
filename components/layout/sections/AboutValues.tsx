import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";

const BELIEFS = [
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
] as const;

export default function AboutValues() {
  return (
    <section className="bg-sognos-navy py-20 lg:py-0">
      <div className="mx-auto max-w-7xl px-6">
        <div className="divide-y divide-white/20 border-b border-white/20">
          <div className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-12 lg:gap-16 lg:py-14">
            <div className="lg:col-span-2">
              <AnimatedEyebrow textClassName="text-white/80">
                Our Mission
              </AnimatedEyebrow>
            </div>
            <div className="min-w-0 lg:col-[3/-1]">
              <p className="max-w-3xl font-heading text-2xl font-medium leading-snug tracking-tight text-white text-balance md:text-2xl">
                Built to support the people delivering care, services and
                frontline operations every day - simplifying the complexity of
                healthcare through modern business applications designed for
                real-world service delivery.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-12 lg:gap-16 lg:py-14">
            <div className="lg:col-span-2">
              <AnimatedEyebrow textClassName="text-white/80">
                Our Vision
              </AnimatedEyebrow>
            </div>
            <div className="min-w-0 lg:col-[3/-1]">
              <p className="max-w-4xl font-heading text-2xl font-medium leading-snug tracking-tight text-white text-balance md:text-2xl">
                A future where healthcare and frontline teams are empowered by
                connected, intelligent systems that make work simpler and create
                better experiences for patients, clients and the communities
                they support.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 py-10 lg:grid-cols-12 lg:gap-16 lg:py-14">
            <div className="lg:col-span-2">
              <AnimatedEyebrow textClassName="text-white/80">
                Our Beliefs
              </AnimatedEyebrow>
            </div>
            <div className="max-w-5xl lg:col-[3/-1]">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
                {BELIEFS.map((belief) => (
                  <article
                    key={belief.title}
                    className="flex min-h-30 flex-col justify-between border-r border-white/20 bg-white/0 px-8 last:border-r-0 first:pl-0"
                  >
                    <h3 className="max-w-md font-heading text-sm font-normal leading-snug tracking-tight text-white md:text-base">
                      {belief.title}
                    </h3>
                    <p className="mt-8 text-lg leading-relaxed text-white">
                      {belief.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
