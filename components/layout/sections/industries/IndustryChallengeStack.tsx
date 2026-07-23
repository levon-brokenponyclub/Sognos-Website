import type { ReactNode } from "react";

type Challenge = { title: string; body: string };

export default function IndustryChallengeStack({
  challenges,
  heading,
  description,
}: {
  challenges: readonly Challenge[];
  heading: ReactNode;
  description: string;
}) {
  return (
    <div>
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-normal uppercase tracking-[0.08em] text-sognos-blue-accent">
          The Challenge
        </p>
        <h2 className="mt-6 font-heading text-4xl font-normal leading-tight tracking-tight text-white text-balance lg:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
          {description}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:mt-24 lg:grid-cols-3">
        {challenges.map((challenge, i) => (
          <div
            key={i}
            className="flex min-h-[255px] flex-col rounded-lg bg-white/[0.055] p-8 sm:min-h-[300px] lg:min-h-[340px]"
          >
            <p className="font-mono text-base leading-relaxed text-sognos-blue-accent">
              {String(i + 1).padStart(2, "0")}
            </p>
            <div className="mt-auto">
              <h3 className="font-heading text-xl font-medium leading-tight tracking-tight text-white lg:text-2xl">
                {challenge.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/70 lg:text-lg">
                {challenge.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
