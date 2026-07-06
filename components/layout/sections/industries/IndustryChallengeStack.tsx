// Stacking sticky-scroll cards for the industry "Challenge" section. Pattern
// copied from AboutValues.tsx (sticky + per-index top/zIndex + rounded-t-lg) —
// inner card layout differs (number + big title + body), so it's a separate
// component rather than a shared extraction. Server Component (sticky is pure
// CSS, no JS). Handles any number of challenges (2–5).

type Challenge = { title: string; body: string };

// First card pins ~80px below the viewport top (clears the navbar); each
// subsequent card pins 56px lower, leaving a sliver of the one beneath it.
const BASE_TOP = 80;
const TOP_STEP = 56;

export default function IndustryChallengeStack({
  challenges,
}: {
  challenges: readonly Challenge[];
}) {
  return (
    <>
      {challenges.map((challenge, i) => (
        <div
          key={i}
          style={{ top: BASE_TOP + i * TOP_STEP, zIndex: (i + 1) * 10 }}
          className={`sticky rounded-t-lg ${
            i % 2 === 0 ? "bg-sognos-navy-dark" : "bg-sognos-navy"
          }`}
        >
          <div className="mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center px-6 pt-8 pb-10 lg:min-h-[56vh] lg:pt-10 lg:pb-16">
            <p className="font-heading text-xl font-normal text-white/30">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-6 max-w-4xl font-heading text-4xl font-normal leading-tight tracking-tight text-white lg:text-6xl">
              {challenge.title}
            </h3>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 lg:text-lg">
              {challenge.body}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
