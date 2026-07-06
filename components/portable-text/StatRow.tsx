// 2–4 stats side-by-side. Renders inside the article prose column (inherits its
// max-width) — no width classes here. Column count is data-driven via a static
// class map (Tailwind can't compile `md:grid-cols-${n}` dynamically).

type Stat = { number?: string; label?: string };

const COLS: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export default function StatRow({ stats }: { stats?: Stat[] }) {
  const items = (stats ?? []).filter((s) => s?.number && s?.label);
  if (items.length === 0) return null;
  const cols = COLS[items.length] ?? "md:grid-cols-3";

  return (
    <div className="my-10 border-t border-sognos-line pt-8">
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 ${cols}`}>
        {items.map((s, i) => (
          <div key={i}>
            <span
              aria-hidden="true"
              className="mb-4 block size-2 bg-sognos-blue-accent"
            />
            <p className="font-heading text-4xl font-medium leading-none tracking-tight text-sognos-heading lg:text-5xl">
              {s.number}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-sognos-body">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
