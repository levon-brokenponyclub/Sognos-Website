import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";

const CARDS = [
  {
    eyebrow: "Our Values",
    title: "Mission",
    bg: "bg-sognos-blue-accent",
    statement:
      "Built to support the people delivering care, services and frontline operations every day - simplifying the complexity of healthcare through modern business applications designed for real-world service delivery.",
    zIndex: 10,
    top: 80,
  },
  {
    eyebrow: "Our Values",
    title: "Vision",
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
      {/* Stacking sticky cards — full-bleed, top-rounded only, no scroll buffer */}
      {CARDS.map((card) => (
        <div
          key={card.title}
          style={{ top: card.top, zIndex: card.zIndex }}
          className={`sticky rounded-t-lg ${card.bg}`}
        >
          <div className="mx-auto flex min-h-[520px] max-w-7xl items-center px-6 pt-6 pb-10 lg:min-h-[56vh] lg:pt-8 lg:pb-16">
            {/* Equal-width 2-col — eyebrow + title left, statement right (About Sognos pattern) */}
            <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Column 1 — eyebrow + title */}
              <div>
                <AnimatedEyebrow
                  dotClassName="bg-white/70"
                  textClassName="text-white/70"
                >
                  {card.eyebrow}
                </AnimatedEyebrow>
                <h2 className="mt-6 font-heading text-3xl font-medium tracking-tight text-white md:text-4xl lg:text-5xl">
                  {card.title}
                </h2>
              </div>
              {/* Column 2 — statement */}
              <div>
                <p className="text-base leading-relaxed text-white/80">
                  {card.statement}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
