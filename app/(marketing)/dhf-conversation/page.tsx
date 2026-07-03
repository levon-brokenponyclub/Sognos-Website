"use client";

import { useState } from "react";
import { dhfConversation } from "@/app/actions/dhf-conversation";

const PRODUCTS = [
  { id: "sognoscare", label: "SognosCare" },
  { id: "sognosroster", label: "SognosRoster" },
  { id: "sognosgenogram", label: "SognosGenogram" },
  { id: "other", label: "Other" },
];

export default function DhfConversationPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [improvement, setImprovement] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const toggleInterest = (id: string) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    const result = await dhfConversation({
      firstName,
      lastName,
      company,
      email,
      phone,
      interests,
      improvement,
    });

    setSubmitting(false);

    if (!result.ok) {
      setErrorMsg(result.error);
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero band */}
      <div className="bg-gradient-hero pt-28 pb-16 lg:pt-50 lg:pb-26 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-heading text-4xl lg:text-5xl font-normal leading-heading text-center tracking-heading text-white">
            Start the conversation
          </h1>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - context */}
          <div>
            <p className="text-lg text-sognos-body leading-relaxed mb-8">
              Sognos Solutions is your health, social, and community care
              partner, addressing challenges that others struggle to solve.
            </p>
            <p className="text-base text-sognos-body leading-relaxed mb-10">
              If you're exploring ways to improve service delivery, support
              mobile teams or connect systems across health and social care,
              we'd be happy to talk.
            </p>
            <p className="text-base text-sognos-body leading-relaxed mb-10">
              Our team works with organisations across Australia and New Zealand
              to solve complex operational challenges in health and social care.
            </p>

            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-sognos-body/50 mb-5">
                Organisations reach out when they need to
              </p>
              <ul className="space-y-4">
                {[
                  "Improve coordination across mobile and frontline teams",
                  "Bring fragmented systems together",
                  "Gain better visibility across services and operations",
                  "Support more complex care and field service delivery",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-sognos-blue-accent shrink-0" />
                    <span className="text-base text-sognos-body leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right - form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-start gap-4 py-12">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-600"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="font-heading text-2xl font-medium text-sognos-body">
                  Thanks - we'll be in touch.
                </h2>
                <p className="text-base text-sognos-body max-w-sm">
                  One of our team will reach out shortly to arrange a time to
                  talk.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-medium text-sognos-body"
                    >
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Jane"
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-sognos-body placeholder:text-gray-400 focus:border-sognos-blue-accent focus:outline-none focus:ring-2 focus:ring-sognos-blue-accent/20 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium text-sognos-body"
                    >
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Smith"
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-sognos-body placeholder:text-gray-400 focus:border-sognos-blue-accent focus:outline-none focus:ring-2 focus:ring-sognos-blue-accent/20 transition-colors"
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="company"
                    className="text-sm font-medium text-sognos-body"
                  >
                    Company name
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Health"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-sognos-body placeholder:text-gray-400 focus:border-sognos-blue-accent focus:outline-none focus:ring-2 focus:ring-sognos-blue-accent/20 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-sognos-body"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-sognos-body placeholder:text-gray-400 focus:border-sognos-blue-accent focus:outline-none focus:ring-2 focus:ring-sognos-blue-accent/20 transition-colors"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-sognos-body"
                  >
                    Contact phone number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="071 123 4567"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-sognos-body placeholder:text-gray-400 focus:border-sognos-blue-accent focus:outline-none focus:ring-2 focus:ring-sognos-blue-accent/20 transition-colors"
                  />
                </div>

                {/* Product interest */}
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium text-sognos-body">
                    Let us know what you are interested in hearing more about
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {PRODUCTS.map(({ id, label }) => {
                      const checked = interests.includes(id);
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => toggleInterest(id)}
                          className={`flex items-center gap-2.5 rounded-lg border px-4 py-3 text-sm font-medium text-left transition-colors ${
                            checked
                              ? "border-sognos-blue-accent bg-sognos-blue-accent/8 text-sognos-body"
                              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-sognos-body"
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-colors ${
                              checked
                                ? "bg-sognos-blue-accent border-sognos-blue-accent"
                                : "border-gray-300"
                            }`}
                          >
                            {checked && (
                              <svg
                                width="10"
                                height="8"
                                viewBox="0 0 10 8"
                                fill="none"
                                aria-hidden
                              >
                                <path
                                  d="M1 4l2.5 2.5L9 1"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Improvement */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="improvement"
                    className="text-sm font-medium text-sognos-body"
                  >
                    What are you looking to improve?
                  </label>
                  <textarea
                    id="improvement"
                    rows={4}
                    value={improvement}
                    onChange={(e) => setImprovement(e.target.value)}
                    placeholder="Tell us about your current challenges or goals…"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-sognos-body placeholder:text-gray-400 focus:border-sognos-blue-accent focus:outline-none focus:ring-2 focus:ring-sognos-blue-accent/20 transition-colors resize-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-sm text-red-600 font-medium">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-sognos-navy hover:bg-sognos-navy/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg text-sm transition-colors"
                >
                  {submitting ? "Sending…" : "Start a conversation"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
