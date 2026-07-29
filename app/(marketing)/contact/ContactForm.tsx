"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { submitContact } from "@/app/actions/contact";

const REASONS = [
  {
    label: "Book a Demo",
    value: "demo",
    description: "See how the Sognos platform works for your organisation",
  },
  {
    label: "Contact Sales",
    value: "sales",
    description: "Discuss products, pricing, and the right path forward",
  },
  {
    label: "Implementation enquiry",
    value: "implementation",
    description: "Plan a Dynamics 365 or Power Platform implementation",
  },
  {
    label: "Support",
    value: "support",
    description: "Get help with an existing Sognos product or service",
  },
  {
    label: "Partnership",
    value: "partnership",
    description: "Explore a technology or delivery partnership with Sognos",
  },
  {
    label: "Other",
    value: "other",
    description: "Tell us about another enquiry or opportunity",
  },
];

const PRODUCTS_LIST = [
  {
    label: "SognosCare",
    value: "sognoscare",
    description: "Connect care operations from intake through to outcomes",
  },
  {
    label: "SognosRoster",
    value: "sognosroster",
    description: "Coordinate workforce scheduling, matching, and delivery",
  },
  {
    label: "SognosGenogram",
    value: "sognosgenogram",
    description: "Bring family and relationship context into every record",
  },
  {
    label: "Not sure yet",
    value: "unsure",
    description: "Let our team help identify the right product or solution",
  },
];

const INPUT =
  "w-full min-h-16 rounded-lg border border-sognos-line bg-white px-5 py-4 text-base text-sognos-body placeholder:text-sognos-muted transition-[border-color,box-shadow] duration-200 hover:border-sognos-navy/25 focus:border-sognos-blue-accent focus:outline-none focus:ring-2 focus:ring-sognos-blue-accent/15";

const LABEL = "mb-2 block text-sm font-medium text-sognos-body";

const FORM_STEPS = [
  "Details",
  "What are you interested in?",
  "Product interest",
] as const;

type RadioOption = {
  label: string;
  value: string;
  description: string;
};

function RadioRows({
  legend,
  helper,
  name,
  options,
}: {
  legend: string;
  helper: string;
  name: string;
  options: readonly RadioOption[];
}) {
  return (
    <fieldset>
      <legend className="text-xl font-medium tracking-tight text-sognos-heading">
        {legend}
      </legend>
      <p className="mt-2 text-sm leading-relaxed text-sognos-muted">{helper}</p>

      <div className="mt-5 overflow-hidden rounded-lg border border-sognos-line">
        {options.map((option, index) => (
          <label
            key={option.value}
            className={[
              "flex cursor-pointer items-center justify-between gap-6 bg-white px-5 py-5 transition-colors duration-200 hover:bg-slate-50 has-[:checked]:bg-sognos-blue-accent/[0.055]",
              index > 0 ? "border-t border-sognos-line" : "",
            ].join(" ")}
          >
            <span className="min-w-0">
              <span className="block text-base font-medium text-sognos-heading">
                {option.label}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-sognos-muted">
                {option.description}
              </span>
            </span>
            <input
              type="radio"
              name={name}
              value={option.value}
              required
              className="size-7 shrink-0 cursor-pointer appearance-none rounded-full border border-sognos-muted/60 bg-white transition-[border-color,box-shadow] duration-200 checked:border-[7px] checked:border-sognos-blue-accent focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-sognos-blue-accent"
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (currentStep < FORM_STEPS.length) {
      goToNextStep();
      return;
    }

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

  function validateStep(step: number) {
    const section = formRef.current?.querySelector<HTMLElement>(
      `[data-form-step="${step}"]`,
    );
    if (!section) return false;

    const controls = Array.from(
      section.querySelectorAll<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >("input, select, textarea"),
    );

    for (const control of controls) {
      if (!control.checkValidity()) {
        control.reportValidity();
        return false;
      }
    }

    return true;
  }

  function scrollToFormStart() {
    window.requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function goToNextStep() {
    if (!validateStep(currentStep)) return;
    setCurrentStep((step) => Math.min(step + 1, FORM_STEPS.length));
    scrollToFormStart();
  }

  function goToPreviousStep() {
    setCurrentStep((step) => Math.max(step - 1, 1));
    setError(null);
    scrollToFormStart();
  }

  if (success) {
    return (
      <div className="rounded-xl bg-green-50 border border-green-200 px-6 py-8 text-center">
        <p className="text-lg font-medium text-sognos-body">
          Message sent!
        </p>
        <p className="mt-2 text-sm text-sognos-body">
          Thanks for reaching out. We&apos;ll be in touch within one business
          day.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className="space-y-8 scroll-mt-28"
      onSubmit={handleSubmit}
      onKeyDown={(event) => {
        if (
          event.key === "Enter" &&
          currentStep < FORM_STEPS.length &&
          event.target instanceof HTMLInputElement
        ) {
          event.preventDefault();
          goToNextStep();
        }
      }}
    >
      <nav aria-label="Contact form progress">
        <ol className="grid grid-cols-3">
          {FORM_STEPS.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = currentStep === stepNumber;
            const isComplete = currentStep > stepNumber;

            return (
              <li
                key={label}
                className={[
                  "relative flex flex-col items-center px-1 text-center",
                  index > 0
                    ? "before:absolute before:top-4 before:right-1/2 before:h-px before:w-full before:bg-sognos-line"
                    : "",
                ].join(" ")}
              >
                <span
                  className={[
                    "relative z-10 flex size-8 items-center justify-center rounded-full border bg-white text-xs font-semibold transition-colors duration-200",
                    isActive
                      ? "border-sognos-blue-accent bg-sognos-blue-accent text-white"
                      : isComplete
                        ? "border-sognos-blue-accent text-sognos-blue-accent"
                        : "border-sognos-line text-sognos-muted",
                  ].join(" ")}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isComplete ? (
                    <Check className="size-4" aria-hidden="true" />
                  ) : (
                    stepNumber
                  )}
                </span>
                <span
                  className={[
                    "mt-3 text-xs font-medium leading-snug sm:text-sm",
                    isActive ? "text-sognos-heading" : "text-sognos-muted",
                  ].join(" ")}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>

      <div
        data-form-step="1"
        className={
          currentStep === 1
            ? "space-y-7 animate-in fade-in duration-200"
            : "hidden"
        }
      >
        <div>
          <h3 className="text-xl font-medium tracking-tight text-sognos-heading">
            Your details
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-sognos-muted">
            Tell us how to reach you.
          </p>
        </div>

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

        <button
          type="button"
          onClick={goToNextStep}
          className="inline-flex w-full items-center justify-center gap-2 rounded bg-sognos-blue-accent px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-sognos-navy"
        >
          Continue
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div
        data-form-step="2"
        className={
          currentStep === 2
            ? "space-y-7 animate-in fade-in duration-200"
            : "hidden"
        }
      >
        <RadioRows
          legend="What are you interested in?"
          helper="Select the option that best matches your enquiry."
          name="reason"
          options={REASONS}
        />

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={goToPreviousStep}
            className="inline-flex items-center justify-center gap-2 rounded border border-sognos-line bg-white px-5 py-3 text-base font-medium text-sognos-heading transition-colors duration-200 hover:border-sognos-navy/30 hover:bg-slate-50"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </button>
          <button
            type="button"
            onClick={goToNextStep}
            className="inline-flex items-center justify-center gap-2 rounded bg-sognos-blue-accent px-5 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-sognos-navy"
          >
            Continue
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        data-form-step="3"
        className={
          currentStep === 3
            ? "space-y-7 animate-in fade-in duration-200"
            : "hidden"
        }
      >
        <RadioRows
          legend="Product interest"
          helper="Select the product or capability you would like to discuss."
          name="product"
          options={PRODUCTS_LIST}
        />

        <div>
          <label htmlFor="message" className={LABEL}>
            Message{" "}
            <span className="font-normal text-sognos-muted">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className={`${INPUT} min-h-36 resize-y`}
            placeholder="Tell us about your organisation and what you're looking to achieve"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={goToPreviousStep}
            className="inline-flex items-center justify-center gap-2 rounded border border-sognos-line bg-white px-5 py-3 text-base font-medium text-sognos-heading transition-colors duration-200 hover:border-sognos-navy/30 hover:bg-slate-50"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </button>
          <button
            type="submit"
            disabled={pending}
            className="rounded bg-sognos-blue-accent px-5 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-sognos-navy disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "Sending…" : "Send message"}
          </button>
        </div>

        <p className="text-center text-xs leading-relaxed text-sognos-body">
          By submitting this form you agree to our{" "}
          <Link
            href="/company/privacy-policy"
            className="underline transition-colors hover:text-sognos-body"
          >
            Privacy Policy
          </Link>
          . We&apos;ll never share your information with third parties.
        </p>
      </div>
    </form>
  );
}
