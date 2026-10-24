"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { bookDemo, type BookDemoInput } from "@/app/actions/book-demo";

type ProductKey =
  | "sognoscare"
  | "sognosroster"
  | "sognosgenogram"
  | "digpacks"
  | "not-sure";

const PRODUCTS: { key: ProductKey; label: string }[] = [
  { key: "sognoscare", label: "SognosCare" },
  { key: "sognosroster", label: "SognosRoster" },
  { key: "sognosgenogram", label: "SognosGenogram" },
  { key: "digpacks", label: "DigPacks" },
  { key: "not-sure", label: "Not sure yet" },
];

const INPUT =
  "w-full rounded border border-sognos-line bg-white px-4 py-3 text-base text-sognos-heading placeholder:text-sognos-muted transition-[border-color] duration-200 hover:border-sognos-navy/25 focus:border-sognos-blue-accent focus:outline-none";

const PROOF_POINTS = [
  { stat: "10+", label: "Years in field service" },
  { stat: "25+", label: "Enterprise deployments" },
  { stat: "5,000+", label: "Users across ANZ" },
];

const TRUST_LOGOS = [
  { src: "/logos/flourish-australia-logo.png", alt: "Flourish Australia", w: 120 },
  { src: "/logos/auckland-airport-logo.png", alt: "Auckland Airport", w: 120 },
  { src: "/logos/penrith-city-council-logo.png", alt: "Penrith City Council", w: 100 },
];

export default function BookADemoPage() {
  const [product, setProduct] = useState<ProductKey>("not-sure");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = new FormData(e.currentTarget);
    const input: BookDemoInput = {
      fullName: (form.get("fullName") as string) ?? "",
      email: (form.get("email") as string) ?? "",
      company: (form.get("company") as string) ?? "",
      product,
      date: null,
      month: null,
      year: null,
      time: null,
    };

    const result = await bookDemo(input);
    if (result.ok) {
      setStatus("sent");
    } else {
      setErrorMsg(result.error);
      setStatus("error");
    }
  }

  return (
    <main className="flex min-h-screen w-full">
      {/* Left — brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-sognos-navy p-12 lg:flex xl:p-16">
        <div className="relative z-10">
          <Link href="/" className="inline-block">
            <Image
              src="/logos/sognos-logo-light.svg"
              alt="Sognos"
              width={140}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="font-heading text-3xl font-medium leading-snug tracking-tight text-white xl:text-4xl">
            See how Sognos transforms frontline operations
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            Get a personalised walkthrough of the platform. We&apos;ll show you
            how teams like yours use Dynamics 365 to simplify care, scheduling,
            and compliance — in under 30 minutes.
          </p>

          {/* Proof points */}
          <div className="mt-10 flex gap-8">
            {PROOF_POINTS.map((p) => (
              <div key={p.label} className="flex flex-col">
                <span className="font-heading text-2xl font-medium tracking-tight text-white">
                  {p.stat}
                </span>
                <span className="mt-1 text-sm text-white/40">{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust logos */}
        <div className="relative z-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
            Trusted by
          </p>
          <div className="flex items-center gap-6">
            {TRUST_LOGOS.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={logo.w}
                height={40}
                className="h-6 w-auto brightness-0 invert opacity-40"
              />
            ))}
          </div>
        </div>

        {/* Subtle grid pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Right — form panel */}
      <div className="flex w-full flex-col justify-center px-6 py-20 lg:w-1/2 lg:px-16 xl:px-24">
        {/* Mobile logo */}
        <div className="mb-10 lg:hidden">
          <Link href="/">
            <Image
              src="/logos/sognos-logo.svg"
              alt="Sognos"
              width={120}
              height={28}
              className="h-7 w-auto"
            />
          </Link>
        </div>

        <div className="mx-auto w-full max-w-md">
          {status === "sent" ? (
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mt-6 font-heading text-2xl font-medium tracking-tight text-sognos-heading">
                We&apos;ll be in touch
              </h2>
              <p className="mt-3 text-base leading-relaxed text-sognos-body">
                Thanks for your interest. A member of our team will reach out
                within one business day to schedule your demo.
              </p>
              <Link
                href="/"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sognos-heading transition-colors hover:text-sognos-blue-accent"
              >
                &larr; Back to home
              </Link>
            </div>
          ) : (
            <>
              <h2 className="font-heading text-2xl font-medium tracking-tight text-sognos-heading md:text-3xl">
                Book a Demo
              </h2>
              <p className="mt-2 text-base text-sognos-body">
                Fill in your details and we&apos;ll set up a personalised walkthrough.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                <div>
                  <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-sognos-heading">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className={INPUT}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-sognos-heading">
                    Work Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    className={INPUT}
                  />
                </div>

                <div>
                  <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-sognos-heading">
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    placeholder="Acme Corp"
                    className={INPUT}
                  />
                </div>

                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-sognos-heading">
                    Product of interest
                  </legend>
                  <div className="grid grid-cols-2 gap-2">
                    {PRODUCTS.map((p) => {
                      const active = product === p.key;
                      return (
                        <button
                          key={p.key}
                          type="button"
                          onClick={() => setProduct(p.key)}
                          className={`rounded border px-3 py-2.5 text-sm transition-colors duration-150 ${
                            active
                              ? "border-sognos-blue-accent bg-sognos-blue-accent/5 font-medium text-sognos-heading"
                              : "border-sognos-line text-sognos-muted hover:border-sognos-navy/25 hover:text-sognos-heading"
                          }`}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {status === "error" && errorMsg && (
                  <p className="text-sm text-red-600">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 w-full rounded-full bg-sognos-navy py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-sognos-blue-accent disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Book a Demo"}
                </button>
              </form>

              <p className="mt-6 text-center text-xs text-sognos-muted">
                By submitting, you agree to our{" "}
                <Link href="/company/privacy-policy" className="underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
