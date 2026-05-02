import { SOGNOSCARE_EDITIONS } from "@/lib/constants";
import EditionCards from "./EditionCards";

// ─── Section ──────────────────────────────────────────────────────────────────

export default function SognoscareEditions() {
  return (
    <section id="editions" className="bg-(--sognos-bg-sunken) py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="font-heading text-3xl font-medium text-prussian-blue-800">
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
