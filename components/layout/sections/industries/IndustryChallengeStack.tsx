import SectionLabel from "@/components/ui/SectionLabel";
import { LAYOUT, TYPE } from "@/components/layout/sections/sognoscare/typeScale";

// The challenge — on navy, laid out like the DigPacks Outcomes section
// (2026-11-02): label, heading and lede, then the challenges in three columns,
// each under a faint 2px rule (white/15) with an accent numeral, title and
// body. Also the Finance & Operations solution's problem section (`label` +
// `heading` override the industry defaults).

type Challenge = { title: string; body: string };

export default function IndustryChallengeStack({
  challenges,
  industryName,
  description,
  label = "The challenge",
  heading = `What makes ${industryName} hard to run`,
}: {
  challenges: readonly Challenge[];
  industryName: string;
  description: string;
  label?: string;
  heading?: string;
}) {
  return (
    <section className={`bg-sognos-navy text-white ${LAYOUT.section}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex max-w-3xl flex-col gap-4">
          <SectionLabel tone="dark">{label}</SectionLabel>
          <h2 className={`${TYPE.h2} text-white`}>{heading}</h2>
          <p className={`${TYPE.lede} text-white/75`}>{description}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {challenges.map((challenge, i) => (
            <div key={challenge.title} className="border-t-2 border-white/15 pt-5">
              <p
                aria-hidden="true"
                className="font-heading text-4xl tabular-nums text-sognos-blue-accent md:text-5xl"
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className={`mt-4 ${TYPE.h3Small} text-white md:text-xl`}>
                {challenge.title}
              </h3>
              <p className={`mt-2 ${TYPE.small} text-white/75`}>
                {challenge.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
