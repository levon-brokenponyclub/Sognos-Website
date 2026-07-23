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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Left — title + intro */}
          <div className="flex min-h-[255px] flex-col justify-start rounded-lg p-2 text-white sm:min-h-[300px] lg:min-h-[340px] lg:p-0">
            <h2 className="max-w-sm font-heading text-5xl font-normal leading-[1.05] tracking-tight text-white text-balance lg:text-6xl">
              Our beliefs
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-white/60 md:text-lg">
              The convictions that guide how we build, partner, and serve.
            </p>
          </div>

          {/* Right — three values */}
          {VALUES.map((v, index) => (
            <div
              key={v.title}
              className="flex min-h-[255px] flex-col rounded-lg bg-white/[0.055] p-8 text-white sm:min-h-[300px] lg:min-h-[340px]"
            >
              <p className="font-mono text-base leading-relaxed tracking-tight text-sognos-blue-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div className="mt-auto max-w-md">
                <h3 className="font-heading text-xl font-medium leading-tight tracking-tight text-white lg:text-2xl">
                  {v.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-white/65 md:text-lg">
                  {v.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
