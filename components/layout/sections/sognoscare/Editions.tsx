import { SOGNOSCARE_EDITIONS } from "@/lib/constants";
import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";
import EditionCards from "./EditionCards";

type EditionCardItem = {
  name?: string;
  label?: string;
  href: string;
  accentColor: string;
  logo: string;
  description: string;
};

interface SognoscareEditionsProps {
  editions?: readonly EditionCardItem[];
}

export default function SognoscareEditions({
  editions,
}: SognoscareEditionsProps = {}) {
  const cards =
    editions && editions.length > 0 ? editions : SOGNOSCARE_EDITIONS;

  return (
    <section id="editions" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <AnimatedEyebrow className="justify-center">Editions</AnimatedEyebrow>
          <h2 className="mt-4 max-w-5xl text-balance font-heading text-3xl font-medium tracking-tight leading-tight text-sognos-navy md:text-4xl">
            Choose the Right SognosCare Edition for Your Service
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-sognos-body">
            SognosCare offers six tailored editions, each pre-configured for its
            funding model, compliance framework, and operational workflows.
          </p>
        </div>

        <EditionCards
          editions={cards}
          showSliderButtons
          containerClassName="w-full"
        />
      </div>
    </section>
  );
}
