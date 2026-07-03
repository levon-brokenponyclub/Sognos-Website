"use client";

import Link from "next/link";
import { useState } from "react";
import { submitContact } from "@/app/actions/contact";

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
  { label: "SognosGenogram", value: "sognosgenogram" },
  { label: "Not sure yet", value: "unsure" },
];

const INPUT =
  "w-full rounded-lg border border-sognos-border-subtle bg-slate-50 px-4 py-3 text-sm text-prussian-blue-800 placeholder:text-sognos-text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

const LABEL = "mb-1.5 block text-sm font-medium text-prussian-blue-800";

export default function ContactForm() {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const result = await submitContact({
      firstName: fd.get("first-name") as string,
      lastName: fd.get("last-name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      organisation: fd.get("organisation") as string,
      reason: fd.get("reason") as string,
      product: fd.get("product") as string,
      message: fd.get("message") as string,
    });

    setPending(false);
    if (result.ok) {
      setSuccess(true);
    } else {
      setError(result.error);
    }
  }

  if (success) {
    return (
      <div className="rounded-xl bg-green-50 border border-green-200 px-6 py-8 text-center">
        <p className="text-lg font-medium text-prussian-blue-800">
          Message sent!
        </p>
        <p className="mt-2 text-sm text-sognos-text-body">
          Thanks for reaching out. We&apos;ll be in touch within one business
          day.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {/* Name row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="first-name" className={LABEL}>
            First name
          </label>
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
          <label htmlFor="last-name" className={LABEL}>
            Last name
          </label>
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
          <label htmlFor="email" className={LABEL}>
            Work email
          </label>
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
          <label htmlFor="phone" className={LABEL}>
            Phone number
          </label>
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
        <label htmlFor="organisation" className={LABEL}>
          Organisation
        </label>
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
          <label htmlFor="reason" className={LABEL}>
            How can we help?
          </label>
          <select id="reason" name="reason" className={INPUT}>
            <option value="">Select a reason</option>
            {REASONS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="product" className={LABEL}>
            Product interest
          </label>
          <select id="product" name="product" className={INPUT}>
            <option value="">Select a product</option>
            {PRODUCTS_LIST.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
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

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-prussian-blue-800 px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send message"}
      </button>

      <p className="text-xs leading-relaxed text-sognos-text-muted">
        By submitting this form you agree to our{" "}
        <Link
          href="/company/privacy-policy"
          className="underline hover:text-prussian-blue-800 transition-colors"
        >
          Privacy Policy
        </Link>
        . We&apos;ll never share your information with third parties.
      </p>
    </form>
  );
}
