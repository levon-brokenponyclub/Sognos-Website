type SectionHeader = {
  eyebrow?: string;
  heading: string;
  intro?: string;
};

interface SognoscareAdvantagesProps {
  header?: SectionHeader;
  advantages?: readonly string[];
}

const DEFAULT_HEADER: SectionHeader = { heading: "Key Advantages" };

const DEFAULT_ADVANTAGES = [
  "Purpose-built for Australian care compliance - not adapted from generic CRM",
  "Reduces documentation time with AI-assisted clinical notes",
  "Keeps you audit-ready with continuous compliance tracking",
  "Integrates with Microsoft 365, Teams, and Dynamics 365 out of the box",
  "Connects care management, workforce rostering, and billing in one system",
  "Scales from community care to residential aged care without re-implementation",
];

// 8-cell grid pattern: col 1 is a spanning header card, cols 2-4 hold content
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

export default function SognoscareAdvantages({
  header = DEFAULT_HEADER,
  advantages = DEFAULT_ADVANTAGES,
}: SognoscareAdvantagesProps = {}) {
  const items = advantages.length > 0 ? advantages : DEFAULT_ADVANTAGES;
  return (
    <section id="advantages" className="w-full bg-gray-200/90">
      <div className="max-w-7xl w-full mx-auto px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr_1fr_1fr] gap-3 lg:gap-4">
          {GRID.map((cell, i) => {
            if (cell.type === "header") {
              return (
                <div
                  key="header-card"
                  className="lg:row-span-2 rounded-lg lg:p-2 h-full bg-white text-prussian-blue-800"
                >
                  <div className="h-full shrink-0 bg-gray-100/70 rounded-lg p-6 flex flex-col justify-between">
                    <div>
                      {/* <div className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-1 text-sm text-prussian-blue-800 font-medium mb-6">
                        <span className="w-2 h-2 bg-[#1D96FC] rounded-full"></span>
                        Advantages
                      </div> */}
                      <h2 className="font-heading text-3xl md:text-4xl font-medium text-prussian-blue-800 tracking-tight">
                        {header.heading}
                      </h2>
                      {/* <p className="mt-4 max-w-sm font-heading font-normal leading-relaxed lg:text-lg transition-colors duration-500 text-sognos-text-body">
                        Hello
                      </p> */}
                    </div>
                  </div>
                </div>
              );
            }

            const text = items[cell.idx] ?? DEFAULT_ADVANTAGES[cell.idx];
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
                <p
                  className={`font-heading text-base lg:text-lg font-medium leading-snug ${isWhite ? "text-prussian-blue-800" : "text-white"}`}
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
