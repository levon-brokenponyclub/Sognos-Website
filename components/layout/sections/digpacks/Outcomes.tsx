// Same frame as the product "What it solves" sections: statement, then a
// divided row of points, each underlined in the partner accent.
const STATS = [
  { value: "10,000+", label: "hours saved annually" },
  { value: "20,000+", label: "referrals & applications processed each year" },
  { value: "Up to 85%", label: "reduction in manual processing time" },
  {
    value: "4,500",
    label: "staff supported at Berkshire Healthcare NHS Foundation Trust",
  },
];

export default function DigPacksOutcomes() {
  return (
    <section id="outcomes" className="overflow-clip bg-sognos-digpacks-dark pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60">
            Real outcomes in the UK
          </p>
          <h2 className="mt-4 font-heading text-4xl font-medium tracking-tight text-white text-balance md:text-5xl">
            Start faster, adapt easily and integrate with what you already have
            through DigPacks accelerator solutions.
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {STATS.map((s) => (
            <div key={s.value} className="relative flex flex-col px-6 py-8 pb-12">
              <span className="font-heading text-4xl font-medium tracking-tight text-white lg:text-5xl">
                {s.value}
              </span>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                {s.label}
              </p>
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-6 right-6 h-[2px] bg-sognos-digpacks-base"
              />
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-white/40">
          Outcomes achieved by DigPacks across NHS and public-sector engagements.
        </p>
      </div>
    </section>
  );
}
