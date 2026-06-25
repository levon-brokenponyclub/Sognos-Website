const ADVANTAGES = [
  "Designed for complex, real-world rostering",
  "Reduces manual effort and admin burden",
  "Improves utilisation and coverage confidence",
  "Supports compliance without slowing teams",
  "Scales with organisational growth and complexity",
  "Real-time visibility across your entire workforce",
];

// 7-cell grid: col 1 is a spanning header card, cols 2-4 hold content
type Cell =
  | { type: "header" }
  | { type: "accent" | "dark" | "white"; idx: number };
const GRID: Cell[] = [
  { type: "header" },
  { type: "accent", idx: 0 },
  { type: "dark", idx: 1 },
  { type: "dark", idx: 2 },
  { type: "dark", idx: 3 },
  { type: "dark", idx: 4 },
  { type: "white", idx: 5 },
];

export default function SognoscareRosterAdvantages() {
  return (
    <section id="advantages" className="w-full bg-gray-200/90">
      <div className="max-w-7xl w-full mx-auto px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr_1fr_1fr] gap-3 lg:gap-4">
          {GRID.map((cell) => {
            if (cell.type === "header") {
              return (
                <div
                  key="header-card"
                  className="lg:row-span-2 rounded-lg lg:p-2 h-full bg-white text-sognos-body"
                >
                  <div className="h-full shrink-0 bg-gray-100/70 rounded-lg p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="font-heading text-3xl md:text-4xl font-medium text-sognos-body tracking-tight">
                        Key Advantages
                      </h2>
                    </div>
                  </div>
                </div>
              );
            }

            const text = ADVANTAGES[cell.idx];
            const isAccent = cell.type === "accent";
            const isWhite = cell.type === "white";
            return (
              <div
                key={text}
                className={`rounded-lg p-6 lg:p-8 min-h-[180px] lg:min-h-[260px] flex ${
                  isWhite
                    ? "bg-white text-sognos-body"
                    : isAccent
                      ? "text-white"
                      : "bg-sognos-navy text-white"
                }`}
                style={isAccent ? { backgroundColor: "var(--sognos-roster-base)" } : undefined}
              >
                <p
                  className={`font-heading text-base lg:text-lg font-medium leading-snug ${isWhite ? "text-sognos-body" : "text-white"}`}
                >
                  {text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
