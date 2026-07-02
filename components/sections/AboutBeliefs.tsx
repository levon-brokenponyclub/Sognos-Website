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
    <section className="bg-sognos-navy py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="rounded-lg border border-white/10 bg-white/5 p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left — title + intro */}
            <div>
              <h2 className="font-heading text-3xl font-medium tracking-tight text-white lg:text-4xl">
                Our Beliefs
              </h2>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-white/60">
                The convictions that guide how we build, partner, and serve.
              </p>
            </div>
            {/* Right — three values */}
            <div className="space-y-8 lg:border-l lg:border-white/15 lg:pl-16">
              {VALUES.map((v) => (
                <div key={v.title}>
                  <h3 className="font-heading text-base font-medium text-white">
                    {v.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
