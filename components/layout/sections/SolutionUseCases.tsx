import Image from "next/image";

type Capability = {
  title: string;
  body: string;
};

type Props = {
  solutionName: string;
  capabilities: Capability[];
};

const CAPABILITY_IMAGES = [
  "/solutions/solutionTab-Image.avif",
  "/solutions/solutionTab-Image-2.avif",
  "/solutions/solutionTab-Image-3.avif",
];

// Each card sticks at this offset from the top of the viewport.
// STACK_REVEAL controls how many px of the previous card remain visible —
// should loosely match the header-strip height so the full title stays readable.
const TOP_BASE = 80; // clears the fixed navbar
const STACK_REVEAL = 80;

export default function SolutionUseCases({ solutionName, capabilities }: Props) {
  if (!capabilities.length) return null;

  return (
    <section className="bg-white">
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-20 lg:pt-28">
        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
          Capabilities
        </p>
        <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-sognos-heading max-w-2xl">
          What you get with {solutionName}
        </h2>
      </div>

      {/* Stacking card runway */}
      <div className="mx-auto max-w-7xl px-6">
        {capabilities.map((cap, i) => (
          <article
            key={i}
            className="sticky overflow-hidden rounded-t-lg border-t border-sognos-line grid grid-cols-1 lg:grid-cols-2"
            style={{ top: TOP_BASE + i * STACK_REVEAL, zIndex: i + 1 }}
          >
            {/* Left — white, dark text */}
            <div className="bg-white">
              {/* Header strip: height ~= STACK_REVEAL so the title stays readable when stacked */}
              <div className="flex items-center gap-5 border-b border-sognos-line px-8 py-6 lg:px-12">
                <span className="shrink-0 tabular-nums text-xs font-semibold uppercase tracking-widest text-sognos-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-xl font-medium tracking-tight text-sognos-heading">
                  {cap.title}
                </h3>
              </div>
              {/* Body — covered by the next stacking card; only visible on the bottommost card */}
              <div className="min-h-[280px] px-8 py-10 lg:min-h-[420px] lg:px-12 lg:py-14">
                <p className="max-w-md text-base leading-relaxed text-sognos-body">
                  {cap.body}
                </p>
              </div>
            </div>

            {/* Right — dark visual */}
            <div
              className="relative aspect-video bg-sognos-navy-dark lg:aspect-auto"
              aria-hidden="true"
            >
              <Image
                src={CAPABILITY_IMAGES[i % CAPABILITY_IMAGES.length]}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          </article>
        ))}

        {/* Tail: holds the fully-stacked state briefly before the section ends */}
        <div
          aria-hidden="true"
          style={{ height: (capabilities.length - 1) * STACK_REVEAL + 200 }}
        />
      </div>
    </section>
  );
}
