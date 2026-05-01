import Link from "next/link";

export const metadata = {
  title: "Contact Us | Sognos",
  description:
    "Get in touch with Sognos. Contact us to discuss how we can assist your organisation and foster a valuable partnership.",
};

const REASONS = [
  { label: "Book a Demo", value: "demo" },
  { label: "Contact Sales", value: "sales" },
  { label: "Implementation enquiry", value: "implementation" },
  { label: "Support", value: "support" },
  { label: "Partnership", value: "partnership" },
  { label: "Other", value: "other" },
];

const PRODUCTS_LIST = [
  { label: "SognosCare", value: "sognoscare" },
  { label: "SognosRoster", value: "sognosroster" },
  { label: "Sognos Genogram", value: "sognosgenogram" },
  { label: "Not sure yet", value: "unsure" },
];

const OFFICES = [
  {
    region: "Australia",
    label: "Head Office",
    entity: "Sognos Solutions Pty Ltd",
    address: ["Level 17, 1 Denison Street", "North Sydney NSW 2060, Australia"],
    phone: "+61 2 8527 3608",
    email: "contact@sognos.com.au",
  },
  {
    region: "New Zealand",
    label: "Office",
    entity: "Sognos Solutions NZ Limited",
    address: ["Ground Level, 155 Fanshawe Street", "Auckland 1010, New Zealand"],
    phone: "+64 9 802 0402",
    email: "contact@sognos.co.nz",
  },
  {
    region: "India",
    label: "Offshore Delivery Centre",
    entity: "Sognos Solutions India Limited",
    address: ["713, Silver Radiance, 2 Science City Rd", "Ahmedabad 380060, India"],
    phone: "+91 93160 908408",
    email: "contact@sognos.in",
  },
];

const INPUT =
  "w-full rounded-lg border border-sognos-border-subtle bg-slate-50 px-4 py-3 text-sm text-prussian-blue-800 placeholder:text-sognos-text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

const LABEL = "mb-1.5 block text-sm font-medium text-prussian-blue-800";

export default function ContactPage() {
  return (
    <main className="w-full bg-white">

      {/* Hero */}
      <section className="bg-prussian-blue-800 w-full">
        <div className="max-w-7xl w-full mx-auto px-6 py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50 mb-4">
            Contact
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-medium text-white tracking-tight max-w-2xl">
            Get in touch.
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed">
            Contact us to discuss how we can assist your organisation and foster
            a valuable partnership. We respond within one business day.
          </p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="w-full bg-slate-50 border-b border-sognos-border-subtle">
        <div className="max-w-7xl w-full mx-auto px-6 py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

            {/* Form */}
            <div className="rounded-2xl border border-sognos-border-subtle bg-white p-8 lg:p-10">
              <h2 className="mb-8 font-heading text-2xl font-medium text-prussian-blue-800 tracking-tight">
                Send us a message
              </h2>

              <form className="space-y-6">
                {/* Name row */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className={LABEL}>First name</label>
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      autoComplete="given-name"
                      required
                      className={INPUT}
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className={LABEL}>Last name</label>
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      autoComplete="family-name"
                      required
                      className={INPUT}
                      placeholder="Last name"
                    />
                  </div>
                </div>

                {/* Email + Phone row */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className={LABEL}>Work email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className={INPUT}
                      placeholder="you@organisation.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={LABEL}>Phone number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      className={INPUT}
                      placeholder="+61 2 0000 0000"
                    />
                  </div>
                </div>

                {/* Organisation */}
                <div>
                  <label htmlFor="organisation" className={LABEL}>Organisation</label>
                  <input
                    id="organisation"
                    name="organisation"
                    type="text"
                    autoComplete="organization"
                    className={INPUT}
                    placeholder="Your organisation"
                  />
                </div>

                {/* Reason + Product row */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="reason" className={LABEL}>How can we help?</label>
                    <select id="reason" name="reason" className={INPUT}>
                      <option value="">Select a reason</option>
                      {REASONS.map((r) => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="product" className={LABEL}>Product interest</label>
                    <select id="product" name="product" className={INPUT}>
                      <option value="">Select a product</option>
                      {PRODUCTS_LIST.map((p) => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={LABEL}>
                    Message{" "}
                    <span className="font-normal text-sognos-text-muted">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={`${INPUT} resize-none`}
                    placeholder="Tell us about your organisation and what you're looking to achieve"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-prussian-blue-800 px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Send message
                </button>

                <p className="text-xs leading-relaxed text-sognos-text-muted">
                  By submitting this form you agree to our{" "}
                  <Link href="/privacy" className="underline hover:text-prussian-blue-800 transition-colors">
                    Privacy Policy
                  </Link>
                  . We&apos;ll never share your information with third parties.
                </p>
              </form>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">

              {/* Response time */}
              <div className="rounded-2xl border border-sognos-border-subtle bg-white p-8">
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted">
                  Response time
                </p>
                <p className="font-heading text-2xl font-medium text-prussian-blue-800">
                  Within 1 business day
                </p>
                <p className="mt-2 text-sm leading-relaxed text-sognos-text-body">
                  Our team is based in Australia. We respond to all enquiries
                  promptly during business hours.
                </p>
              </div>

              {/* Office locations */}
              <div className="rounded-2xl border border-sognos-border-subtle bg-white overflow-hidden">
                {OFFICES.map((office, i) => (
                  <div
                    key={office.region}
                    className={`p-8 ${i > 0 ? "border-t border-sognos-border-subtle" : ""}`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted">
                        {office.region}
                      </p>
                      <span className="text-xs text-sognos-text-muted/50">—</span>
                      <p className="text-xs text-sognos-text-muted">{office.label}</p>
                    </div>
                    <p className="text-sm font-semibold text-prussian-blue-800 mb-2">
                      {office.entity}
                    </p>
                    <address className="not-italic text-sm text-sognos-text-body leading-relaxed mb-3">
                      {office.address.map((line) => (
                        <span key={line} className="block">{line}</span>
                      ))}
                    </address>
                    <div className="space-y-1">
                      <a
                        href={`tel:${office.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-2 text-sm text-prussian-blue-800 hover:opacity-70 transition-opacity"
                      >
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M2 2.5C2 8.299 5.701 12 11.5 12l.5-.5v-2l-.5-.5-2-.5-.5.5-.75.75C7.25 9 5 6.75 4.25 5.75L5 5l.5-.5L5 3 4.5 1 4 .5H2L1.5 1C1.5 1 2 2 2 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {office.phone}
                      </a>
                      <a
                        href={`mailto:${office.email}`}
                        className="flex items-center gap-2 text-sm text-prussian-blue-800 hover:opacity-70 transition-opacity"
                      >
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                          <path d="M1 4l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                        </svg>
                        {office.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* ABN + LinkedIn */}
              <div className="rounded-2xl border border-sognos-border-subtle bg-white p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted mb-4">
                  Company info
                </p>
                <dl className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <dt className="text-sognos-text-muted shrink-0">ABN</dt>
                    <dd className="text-prussian-blue-800 font-medium">53 611 121 870</dd>
                  </div>
                </dl>
                <a
                  href="https://www.linkedin.com/company/sognos-solutions-pty-ltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-prussian-blue-800/60 hover:text-prussian-blue-800 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Sognos on LinkedIn
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
