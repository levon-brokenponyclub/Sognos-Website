import { SOGNOSCARE_EDITIONS } from "@/lib/constants";
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
    <section id="editions" className="bg-gray-200/70 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-2">
          <h2 className="font-heading text-3xl md:text-4xl font-medium tracking-tight text-sognos-heading">
            Choose the Right SognosCare Edition for Your Service
          </h2>
          <p className="mt-2 text-lg text-sognos-muted">
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
