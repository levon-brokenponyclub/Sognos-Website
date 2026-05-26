import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Information Security Management System (ISMS) Policy | Sognos",
  description:
    "Sognos Solutions' commitment to protecting information assets and managing security risks.",
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ISMSPolicyPage() {
  return (
    <main className="w-full bg-white">
      {/* Hero */}
      <section className="bg-gradient-hero w-full border-b border-sognos-border-subtle">
        <div className="max-w-7xl w-full mx-auto px-6 pb-18 pt-40 flex flex-col items-center text-center">
          <div className="">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-white/30 text-white font-medium mb-6">
              <span className="w-2 h-2 bg-[#1D96FC] rounded-full"></span>
              ISMS Policy
            </div>
          </div>
          <h1 className="mx-auto max-w-5xl font-heading text-3xl font-normal leading-heading tracking-heading text-white sm:text-4xl lg:text-4xl">
            Information Security Management System (ISMS) Policy
          </h1>
          <p className="mt-6 text-lg max-w-3xl leading-relaxed text-white/80">
            Sognos Solutions' commitment to protecting information assets and
            managing security risks in compliance with ISO/IEC 27001:2022.
          </p>
        </div>
      </section>

      {/* ISMS Policy Content */}
      <section className="w-full">
        <div className="max-w-7xl w-full mx-auto px-6 py-24">
          <div className="prose prose-sognos lg:prose-xl mx-auto">
            <h2 className="mb-1 text-xl font-semibold leading-snug text-prussian-blue-800">
              Purpose & Scope
            </h2>
            <p className="mb-4">
              This policy defines Sognos Solutions’ commitment to protecting
              information assets and managing security risks in compliance with
              ISO/IEC 27001:2022, the Privacy Act 1988 (Australia), and the
              Privacy Act 2020 (New Zealand). It applies to all employees,
              contractors, and third parties handling company information across
              Australia and New Zealand.
            </p>

            <h2 className="mb-1 text-xl font-semibold leading-snug text-prussian-blue-800">
              Policy Statement
            </h2>
            <p>Sognos Solutions is committed to:</p>
            <ul className="mb-4 mt-2 list-disc list-inside space-y-2">
              <li>
                Safeguarding the confidentiality, integrity, and availability of
                information assets.
              </li>
              <li>
                Meeting all legal, regulatory, and contractual obligations,
                including Australian Privacy Principles, and New Zealand Privacy
                Principles.
              </li>
              <li>
                Implementing a risk-based approach to prevent unauthorised
                access, disclosure, alteration, or destruction of information.
              </li>
              <li>
                Maintaining business continuity through tested plans and
                resilience measures.
              </li>
              <li>
                Continually improving the ISMS through monitoring, audits, and
                management reviews.
              </li>
            </ul>

            <h2 className="mb-1 text-xl font-semibold leading-snug text-prussian-blue-800">
              Objectives
            </h2>
            <p className="mb-0">
              Ensure compliance with ISO/IEC 27001:2022 and ANZ regulatory
              requirements.
            </p>
            <p>Protect sensitive data from cyber threats and breaches.</p>
            <p className="mb-4">
              Promote security awareness across the organisation.
            </p>

            <h2 className="mb-1 text-xl font-semibold leading-snug text-prussian-blue-800">
              Responsibilities
            </h2>
            <p>
              <strong>Senior Management:</strong> Provide resources and
              oversight for ISMS implementation.
            </p>
            <p className="mb-4">
              <strong>All Staff:</strong> Comply with ISMS policies and report
              security incidents promptly.
            </p>

            <h2 className="mb-1 text-xl font-semibold leading-snug text-prussian-blue-800">
              Review
            </h2>
            <p className="mb-4">
              This policy will be reviewed annually or upon significant changes
              in business, technology, or regulatory requirements.
            </p>

            <p className="mt-8">For any questions please contact us at:</p>
            <address className="mt-4">
              Sognos Solutions Pty Ltd (ABN 53 611 121 870)
              <br />
              Email:{" "}
              <a
                href="mailto:contact@sognos.com.au"
                className="underline hover:text-prussian-blue-800 transition-colors"
              >
                contact@sognos.com.au
              </a>
            </address>
          </div>
        </div>
      </section>
    </main>
  );
}
