const CARDS = [
  {
    number: "01",
    eyebrow: "Our Mission",
    bg: "bg-sognos-blue-accent",
    statement:
      "Built to support the people delivering care, services and frontline operations every day - simplifying the complexity of healthcare through modern business applications designed for real-world service delivery.",
    zIndex: 10,
    top: 80,
  },
  {
    number: "02",
    eyebrow: "Our Vision",
    bg: "bg-sognos-navy",
    statement:
      "A future where healthcare and frontline teams are empowered by connected, intelligent systems that make work simpler and create better experiences for patients, clients and the communities they support.",
    zIndex: 20,
    top: 136,
  },
] as const;

export default function AboutValues() {
  return (
    <section className="bg-white">
      {/* Section title — scrolls away before cards pin */}
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10 lg:px-10 lg:pt-28 lg:pb-12">
        <h2 className="font-heading text-3xl font-medium tracking-tight text-sognos-heading md:text-4xl">
          Our Values
        </h2>
      </div>

      {/* Stacking sticky cards — full-bleed, top-rounded only, no scroll buffer */}
      {CARDS.map((card) => (
        <div
          key={card.eyebrow}
          style={{ top: card.top, zIndex: card.zIndex }}
          className={`sticky rounded-t-lg ${card.bg}`}
        >
          <div className="mx-auto flex min-h-[520px] max-w-7xl flex-col justify-between px-6 pt-6 pb-10 lg:min-h-[56vh] lg:px-10 lg:pt-8 lg:pb-16">
            {/* Top row: eyebrow left, number right */}
            <div className="flex items-start justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/70">
                <span className="mr-1.5 text-white/40">●</span>
                {card.eyebrow}
              </p>
              <span className="font-heading text-2xl font-medium text-white/20">
                {card.number}
              </span>
            </div>
            {/* Statement anchored to bottom */}
            <p className="max-w-4xl font-heading text-3xl font-medium leading-snug tracking-tight text-white md:text-4xl lg:text-5xl">
              {card.statement}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
