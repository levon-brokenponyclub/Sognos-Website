"use client";

import { useState } from "react";
import { registerForEvent } from "@/app/actions/event-registration";

interface EventRegistrationFormProps {
  onClose: () => void;
}

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-prussian-blue-800 placeholder:text-gray-400 focus:border-[#1D96FC] focus:outline-none focus:ring-2 focus:ring-[#1D96FC]/20 transition-colors";

const labelClass = "text-sm font-medium text-prussian-blue-800";

export default function EventRegistrationForm({
  onClose,
}: EventRegistrationFormProps) {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dietaryRequirements, setDietaryRequirements] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    const result = await registerForEvent({
      firstName,
      surname,
      companyName,
      jobTitle,
      email,
      phone,
      dietaryRequirements,
    });

    setSubmitting(false);

    if (!result.ok) {
      setErrorMsg(result.error);
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 px-6 py-12 lg:px-10">
        <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
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
            aria-hidden
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="font-heading text-2xl font-medium text-prussian-blue-800">
          You&rsquo;re registered.
        </h2>
        <p className="text-base text-sognos-text-body max-w-sm">
          We&rsquo;ll send a confirmation email shortly with the event details
          and arrival information.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 inline-flex items-center justify-center rounded-lg bg-prussian-blue-800 hover:bg-prussian-blue-800/90 text-white font-semibold py-2.5 px-5 text-sm transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 py-8 lg:px-10 space-y-5">
      <div>
        <h2 className="font-heading text-2xl lg:text-3xl font-medium text-prussian-blue-800 tracking-heading">
          Register to attend
        </h2>
        <p className="mt-1.5 text-sm text-sognos-text-body">
          NFP Real Care &middot; Thursday 17 September, North Sydney
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="firstName" className={labelClass}>
            First name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Jane"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="surname" className={labelClass}>
            Surname <span className="text-red-500">*</span>
          </label>
          <input
            id="surname"
            type="text"
            required
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Smith"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="companyName" className={labelClass}>
            Company name <span className="text-red-500">*</span>
          </label>
          <input
            id="companyName"
            type="text"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Acme Health"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="jobTitle" className={labelClass}>
            Job title <span className="text-red-500">*</span>
          </label>
          <input
            id="jobTitle"
            type="text"
            required
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Chief Operating Officer"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={labelClass}>
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@example.com"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className={labelClass}>
          Contact phone number
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="0412 345 678"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="dietaryRequirements" className={labelClass}>
          Dietary requirements
        </label>
        <textarea
          id="dietaryRequirements"
          rows={3}
          value={dietaryRequirements}
          onChange={(e) => setDietaryRequirements(e.target.value)}
          placeholder="Let us know about any allergies or dietary needs."
          className={`${inputClass} resize-none`}
        />
      </div>

      {errorMsg && (
        <p className="text-sm text-red-600 font-medium" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-prussian-blue-800 hover:bg-prussian-blue-800/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg text-sm transition-colors"
      >
        {submitting ? "Submitting…" : "Confirm registration"}
      </button>

      <p className="text-xs text-gray-500 text-center">
        This is a complimentary breakfast event for NFP leaders in health,
        social and community care.
        <br />
        Places are limited to 35 attendees.
      </p>
    </form>
  );
}
