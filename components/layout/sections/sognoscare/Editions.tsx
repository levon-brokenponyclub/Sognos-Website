import { SOGNOSCARE_EDITIONS } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import EditionCards from "./EditionCards";
import { LAYOUT, TYPE } from "./typeScale";

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

// Products Inspector · Editions C, rail on: label in the left rail, white
// dot cards in a snap slider on the brand tint. Slider arrows ride up into
// the header row from md (bottom-aligned with the lede).
export default function SognoscareEditions({
  editions,
}: SognoscareEditionsProps = {}) {
  const cards =
    editions && editions.length > 0 ? editions : SOGNOSCARE_EDITIONS;

  return (
    <section
      id="editions"
      className={`overflow-clip bg-sognos-tint ${LAYOUT.section} ${LAYOUT.anchor}`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className={LAYOUT.rail}>
          <div className={LAYOUT.railLabel}>
            <SectionLabel sticky markerClassName="bg-sognos-care-base">
              Editions
            </SectionLabel>
          </div>

          <div className={`relative ${LAYOUT.content}`}>
            <div className={`${LAYOUT.head} md:pr-32`}>
              <h2 className={`${TYPE.h2} text-sognos-heading`}>
                Choose the Right SognosCare Edition for Your Service
              </h2>
              <p className={`${TYPE.lede} text-sognos-body`}>
                SognosCare offers six tailored editions, each pre-configured for
                its funding model, compliance framework, and operational
                workflows.
              </p>
            </div>

            <EditionCards
              editions={cards}
              variant="dot"
              showSliderButtons
              containerClassName={`w-full ${LAYOUT.gap}`}
              controlsClassName="mb-5 flex justify-end gap-2 md:absolute md:right-0 md:bottom-full md:mb-16 xl:mb-20"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
