import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Information Security Management System (ISMS) Policy | Sognos",
  description:
    "Sognos Solutions' commitment to protecting information assets and managing security risks.",
};

// ─── Shared styles ──────────────────────────────────────────────────────────

const H2 =
  "mt-12 mb-4 font-heading text-2xl font-medium text-prussian-blue-800 tracking-tight";
const P = "mb-4 text-base leading-relaxed text-sognos-text-body";
const UL =
  "mb-6 list-disc pl-6 space-y-2 text-base leading-relaxed text-sognos-text-body";

// ─── Page ───────────────────────────────────────────────────────────────────

export default function ISMSPolicyPage() {
  return (
    <main className="w-full bg-white">
      {/* Hero */}
      <section
        data-header-dark
        className="bg-gradient-hero w-full border-b border-sognos-border-subtle"
      >
        <div className="max-w-7xl w-full mx-auto px-6 pb-18 pt-40 flex flex-col items-center text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-white/30 text-white font-medium mb-6">
            <span className="w-2 h-2 bg-[#1D96FC] rounded-full" />
            ISMS Policy
          </div>
          <h1 className="mx-auto max-w-5xl font-heading text-3xl font-normal leading-heading tracking-heading text-white sm:text-4xl lg:text-4xl">
            Information Security Management System (ISMS) Policy
          </h1>
          <p className="mt-6 text-lg max-w-3xl leading-relaxed text-white/80">
            Sognos Solutions&apos; commitment to protecting information assets
            and managing security risks in compliance with ISO/IEC 27001:2022.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="w-full">
        <div className="max-w-5xl w-full mx-auto px-6 py-14">
          {/* ── Purpose & Scope ── */}
          <h2 className={H2}>Purpose &amp; Scope</h2>
          <p className={P}>
            This policy defines Sognos Solutions&apos; commitment to protecting
            information assets and managing security risks in compliance with
            ISO/IEC 27001:2022, the <em>Privacy Act 1988</em> (Australia), and
            the <em>Privacy Act 2020</em> (New Zealand). It applies to all
            employees, contractors, and third parties handling company
            information across Australia and New Zealand.
          </p>

          {/* ── Policy Statement ── */}
          <h2 className={H2}>Policy Statement</h2>
          <p className={P}>Sognos Solutions is committed to:</p>
          <ul className={UL}>
            <li>
              Safeguarding the confidentiality, integrity, and availability of
              information assets.
            </li>
            <li>
              Meeting all legal, regulatory, and contractual obligations,
              including Australian Privacy Principles and New Zealand Privacy
              Principles.
            </li>
            <li>
              Implementing a risk-based approach to prevent unauthorised access,
              disclosure, alteration, or destruction of information.
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

          {/* ── Objectives ── */}
          <h2 className={H2}>Objectives</h2>
          <ul className={UL}>
            <li>
              Ensure compliance with ISO/IEC 27001:2022 and ANZ regulatory
              requirements.
            </li>
            <li>Protect sensitive data from cyber threats and breaches.</li>
            <li>Promote security awareness across the organisation.</li>
          </ul>

          {/* ── Responsibilities ── */}
          <h2 className={H2}>Responsibilities</h2>
          <ul className={UL}>
            <li>
              <strong>Senior Management</strong> &mdash; Provide resources and
              oversight for ISMS implementation.
            </li>
            <li>
              <strong>All Staff</strong> &mdash; Comply with ISMS policies and
              report security incidents promptly.
            </li>
          </ul>

          {/* ── Review ── */}
          <h2 className={H2}>Review</h2>
          <p className={P}>
            This policy will be reviewed annually or upon significant changes in
            business, technology, or regulatory requirements.
          </p>

          {/* ── Contact ── */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className={P}>For any questions, please contact us at:</p>
            <address className="not-italic text-base leading-relaxed text-sognos-text-body">
              <strong>Sognos Solutions Pty Ltd</strong> (ABN 53 611 121 870)
              <br />
              Email:{" "}
              <a
                href="mailto:contact@sognos.com.au"
                className="text-brand hover:underline"
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
