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

export default function AboutBeliefs() {
  return (
    <section className="bg-sognos-navy-dark py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-sognos-blue-accent">
            Our Beliefs
          </p>
          <h2 className="mt-8 max-w-4xl font-heading text-5xl font-normal leading-[1.05] tracking-tight text-white text-balance md:text-6xl lg:text-7xl">
            The convictions that guide how we build, partner, and serve.
          </h2>
        </div>

        <div className="mt-16 border-t border-white/15 pt-10 lg:mt-20 lg:pt-14">
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-12 lg:gap-x-24">
            {VALUES.map((v) => (
              <div key={v.title} className="max-w-md text-white">
                <h3 className="font-heading text-2xl font-medium leading-tight tracking-tight text-white md:text-xl lg:text-2xl">
                  {v.title}
                  <span className="ml-2 text-sognos-blue-accent">+</span>
                </h3>
                <p className="mt-6 text-lg leading-relaxed text-white/65 md:text-base lg:text-lg">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
