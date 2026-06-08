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

type SectionHeader = {
  eyebrow?: string;
  heading: string;
  intro?: string;
};

interface SognoscareEditionsProps {
  header?: SectionHeader;
  editions?: readonly EditionCardItem[];
}

const DEFAULT_HEADER: SectionHeader = {
  eyebrow: "Editions",
  heading: "Choose the Right SognosCare Edition for Your Service",
  intro:
    "SognosCare offers four tailored editions - each pre-configured for its funding model, compliance framework, and operational workflows.",
};

export default function SognoscareEditions({
  header = DEFAULT_HEADER,
  editions,
}: SognoscareEditionsProps = {}) {
  const cards = editions && editions.length > 0 ? editions : SOGNOSCARE_EDITIONS;

  return (
    <section id="editions" className="bg-(--sognos-bg-sunken) py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 flex flex-col items-start lg:items-start gap-4">
          {header.eyebrow && (
            <div className="relative inline-flex w-fit items-center gap-2 rounded-full border pl-4 pr-5 py-1 text-sm border-[#052048]/50 text-prussian-blue-800 font-medium">
              <span
                aria-hidden
                className="animate-shine pointer-events-none absolute inset-0 rounded-full"
                style={
                  {
                    padding: "1px",
                    background:
                      "conic-gradient(from var(--shine-angle), transparent 0deg, rgba(9,18,42,0.75) 60deg, transparent 120deg, transparent 360deg)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    ["--shine-duration" as string]: "7s",
                  } as React.CSSProperties
                }
              />
              <span className="w-2 h-2 bg-[#1D96FC] rounded-full"></span>
              {header.eyebrow}
            </div>
          )}
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-prussian-blue-800 tracking-tight">
            {header.heading}
          </h2>
          {header.intro && (
            <p className="mt-2 text-lg text-sognos-text-body">{header.intro}</p>
          )}
        </div>

        {/* Slider */}
        <EditionCards
          editions={cards}
          showSliderButtons
          containerClassName="w-full"
        />
      </div>
    </section>
  );
}
