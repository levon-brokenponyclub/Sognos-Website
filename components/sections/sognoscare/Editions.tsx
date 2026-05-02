import { SOGNOSCARE_EDITIONS } from "@/lib/constants";
import EditionCards from "./EditionCards";

// ─── Section ──────────────────────────────────────────────────────────────────

export default function SognoscareEditions() {
  return (
    <section id="editions" className="bg-(--sognos-bg-sunken) py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 flex flex-col items-start lg:items-start gap-4">
          <div className="relative inline-flex w-fit items-center gap-2 rounded-full border pl-4 pr-5 py-1 text-sm border-prussian-blue-900/50 text-prussian-blue-800 font-medium">
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
            Editions
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-prussian-blue-800 tracking-tight">
            Choose the Right SognosCare Edition for Your Service
          </h2>
          <p className="mt-2 text-lg text-sognos-text-body">
            SognosCare offers four tailored editions — each pre-configured for
            its funding model, compliance framework, and operational workflows.
          </p>
          {/* <p className="mx-auto mt-4 max-w-xl text-sm text-sognos-text-muted">
            All editions share the same core platform. Editions determine which
            funding model workflows, compliance frameworks, and reporting
            templates are pre-configured for your organisation.
          </p> */}
        </div>

        {/* Slider */}
        <EditionCards
          editions={SOGNOSCARE_EDITIONS}
          showSliderButtons
          containerClassName="w-full"
        />
      </div>
    </section>
  );
}
