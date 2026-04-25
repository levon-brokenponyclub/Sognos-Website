import Link from "next/link";
import { PRODUCTS } from "@/lib/constants";

export const metadata = {
  title: "Contact — Sognos",
  description:
    "Book a demo, contact our sales team, or ask a question. We work with care and service providers across sectors.",
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

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section
        data-header-dark
        className="relative overflow-hidden bg-prussian-blue-950 pb-20 pt-36"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, var(--color-prussian-blue-700) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <h1 className="mx-auto mb-4 max-w-2xl font-heading text-5xl font-normal leading-[1.08] text-white lg:text-6xl">
            Let&apos;s talk
          </h1>
          <p className="mx-auto max-w-md text-lg leading-relaxed text-white/60">
            Book a demo, speak to sales, or ask us anything. We&apos;ll get back
            to you within one business day.
          </p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="bg-(--sognos-bg-sunken) py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_360px]">

            {/* Form */}
            <div className="rounded-2xl border border-(--sognos-card-border) bg-white p-8 lg:p-10">
              <h2 className="mb-8 font-heading text-2xl font-normal text-sognos-text-heading">
                Send us a message
              </h2>

              <form className="space-y-6">
                {/* Name row */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="mb-1.5 block text-sm font-medium text-sognos-text-heading"
                    >
                      First name
                    </label>
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      autoComplete="given-name"
                      required
                      className="w-full rounded-lg border border-(--sognos-card-border) bg-(--sognos-bg-sunken) px-4 py-3 text-sm text-sognos-text-heading placeholder:text-sognos-text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="mb-1.5 block text-sm font-medium text-sognos-text-heading"
                    >
                      Last name
                    </label>
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      autoComplete="family-name"
                      required
                      className="w-full rounded-lg border border-(--sognos-card-border) bg-(--sognos-bg-sunken) px-4 py-3 text-sm text-sognos-text-heading placeholder:text-sognos-text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                {/* Work email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-sognos-text-heading"
                  >
                    Work email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full rounded-lg border border-(--sognos-card-border) bg-(--sognos-bg-sunken) px-4 py-3 text-sm text-sognos-text-heading placeholder:text-sognos-text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                    placeholder="you@organisation.com"
                  />
                </div>

                {/* Organisation */}
                <div>
                  <label
                    htmlFor="organisation"
                    className="mb-1.5 block text-sm font-medium text-sognos-text-heading"
                  >
                    Organisation
                  </label>
                  <input
                    id="organisation"
                    name="organisation"
                    type="text"
                    autoComplete="organization"
                    className="w-full rounded-lg border border-(--sognos-card-border) bg-(--sognos-bg-sunken) px-4 py-3 text-sm text-sognos-text-heading placeholder:text-sognos-text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                    placeholder="Your organisation"
                  />
                </div>

                {/* Reason */}
                <div>
                  <label
                    htmlFor="reason"
                    className="mb-1.5 block text-sm font-medium text-sognos-text-heading"
                  >
                    How can we help?
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    className="w-full rounded-lg border border-(--sognos-card-border) bg-(--sognos-bg-sunken) px-4 py-3 text-sm text-sognos-text-heading focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  >
                    <option value="">Select a reason</option>
                    {REASONS.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Product interest */}
                <div>
                  <label
                    htmlFor="product"
                    className="mb-1.5 block text-sm font-medium text-sognos-text-heading"
                  >
                    Product interest
                  </label>
                  <select
                    id="product"
                    name="product"
                    className="w-full rounded-lg border border-(--sognos-card-border) bg-(--sognos-bg-sunken) px-4 py-3 text-sm text-sognos-text-heading focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  >
                    <option value="">Select a product</option>
                    {PRODUCTS_LIST.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-sognos-text-heading"
                  >
                    Message{" "}
                    <span className="font-normal text-sognos-text-muted">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full resize-none rounded-lg border border-(--sognos-card-border) bg-(--sognos-bg-sunken) px-4 py-3 text-sm text-sognos-text-heading placeholder:text-sognos-text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                    placeholder="Tell us about your organisation and what you&apos;re looking to achieve"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-prussian-blue-950 px-6 py-3.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
                >
                  Send message
                </button>

                <p className="text-xs leading-relaxed text-sognos-text-muted">
                  By submitting this form you agree to our{" "}
                  <Link href="/privacy" className="underline hover:text-sognos-text-body">
                    Privacy Policy
                  </Link>
                  . We&apos;ll never share your information with third parties.
                </p>
              </form>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Response time */}
              <div className="rounded-2xl border border-(--sognos-card-border) bg-white p-8">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-sognos-text-muted">
                  Response time
                </p>
                <p className="font-heading text-2xl font-normal text-sognos-text-heading">
                  Within 1 business day
                </p>
                <p className="mt-2 text-sm leading-relaxed text-sognos-text-body">
                  Our team is based in Australia. We respond to all enquiries
                  promptly during business hours.
                </p>
              </div>

              {/* Products */}
              <div className="rounded-2xl border border-(--sognos-card-border) bg-white p-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-sognos-text-muted">
                  Our products
                </p>
                <div className="space-y-4">
                  <Link
                    href={PRODUCTS.care.href}
                    className="group flex items-start gap-3"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--sognos-edition-green)" />
                    <div>
                      <p className="text-sm font-semibold text-sognos-text-heading group-hover:text-brand transition-colors duration-200">
                        {PRODUCTS.care.name}
                      </p>
                      <p className="text-xs text-sognos-text-muted">
                        {PRODUCTS.care.tagline}
                      </p>
                    </div>
                  </Link>
                  <Link
                    href={PRODUCTS.roster.href}
                    className="group flex items-start gap-3"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--sognos-accent)" />
                    <div>
                      <p className="text-sm font-semibold text-sognos-text-heading group-hover:text-brand transition-colors duration-200">
                        {PRODUCTS.roster.name}
                      </p>
                      <p className="text-xs text-sognos-text-muted">
                        {PRODUCTS.roster.tagline}
                      </p>
                    </div>
                  </Link>
                  <Link
                    href={PRODUCTS.genogram.href}
                    className="group flex items-start gap-3"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#92278d]" />
                    <div>
                      <p className="text-sm font-semibold text-sognos-text-heading group-hover:text-brand transition-colors duration-200">
                        {PRODUCTS.genogram.name}
                      </p>
                      <p className="text-xs text-sognos-text-muted">
                        {PRODUCTS.genogram.tagline}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Not ready */}
              <div className="rounded-2xl border border-(--sognos-card-border) bg-white p-8">
                <p className="mb-2 text-sm font-semibold text-sognos-text-heading">
                  Not ready to talk yet?
                </p>
                <p className="mb-4 text-sm leading-relaxed text-sognos-text-body">
                  Explore our products to understand what Sognos does before
                  reaching out.
                </p>
                <Link
                  href="/products"
                  className="text-sm font-medium text-brand transition-opacity duration-200 hover:opacity-80"
                >
                  View all products →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
