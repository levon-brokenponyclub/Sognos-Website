const ADVANTAGES = [
  "Designed for complex, real-world rostering",
  "Reduces manual effort and admin burden",
  "Improves utilisation and coverage confidence",
  "Supports compliance without slowing teams",
  "Scales with organisational growth and complexity",
  "Real-time visibility across your entire workforce",
];

// 8-cell grid: col 1 empty, cols 2-4 hold the 6 content blocks
// Row 1: [empty] [accent] [dark] [dark]
// Row 2: [empty] [dark]   [dark] [accent]
type Cell = { type: "empty" } | { type: "accent" | "dark" | "white"; idx: number };
const GRID: Cell[] = [
  { type: "empty" },
  { type: "accent", idx: 0 },
  { type: "dark", idx: 1 },
  { type: "dark", idx: 2 },
  { type: "empty" },
  { type: "dark", idx: 3 },
  { type: "dark", idx: 4 },
  { type: "white", idx: 5 },
];

export default function SognoscareRosterAdvantages() {
  return (
    <section id="advantages" className="w-full bg-gray-200/70">
      <div className="max-w-7xl w-full mx-auto px-6 py-24 lg:py-32">
        <div className="mb-12 lg:mb-16 flex flex-col items-start gap-4">
          <div className="relative inline-flex w-fit items-center gap-2 rounded-full border pl-4 pr-5 py-1 text-sm border-prussian-blue-800/30 text-prussian-blue-800 font-medium">
            <span
              aria-hidden
              className="animate-shine pointer-events-none absolute inset-0 rounded-full"
              style={{
                padding: "1px",
                background:
                  "conic-gradient(from var(--shine-angle), transparent 0deg, rgba(9,18,42,0.75) 60deg, transparent 120deg, transparent 360deg)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                ["--shine-duration" as string]: "7s",
              } as React.CSSProperties}
            />
            <span className="w-2 h-2 bg-[#1D96FC] rounded-full"></span>
            Advantages
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-prussian-blue-800 tracking-tight">
            Key Advantages
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {GRID.map((cell, i) => {
            if (cell.type === "empty") {
              return <div key={`empty-${i}`} className="hidden lg:block" />;
            }
            const text = ADVANTAGES[cell.idx];
            const isAccent = cell.type === "accent";
            const isWhite = cell.type === "white";
            return (
              <div
                key={text}
                className={`rounded-lg p-6 lg:p-8 min-h-[180px] lg:min-h-[260px] flex ${
                  isWhite
                    ? "bg-white text-prussian-blue-800"
                    : isAccent
                      ? "text-white"
                      : "bg-prussian-blue-800 text-white"
                }`}
                style={isAccent ? { backgroundColor: "#1d96fc" } : undefined}
              >
                <p className={`font-heading text-base lg:text-lg font-medium leading-snug ${isWhite ? "text-prussian-blue-800" : "text-white"}`}>
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
