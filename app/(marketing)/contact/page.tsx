import { getSiteSettings } from "@/lib/sanity/queries";
import ContactForm from "./ContactForm";

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const offices = settings.offices ?? [];

  return (
    <main className="w-full bg-white">
      {/* Hero */}
      <section className="bg-gradient-hero w-full">
        <div className="max-w-7xl w-full mx-auto text-center px-6 py-28 pb-18 pt-40">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-white/30 text-white font-medium mb-6">
            <span className="w-2 h-2 bg-sognos-blue-accent rounded-full"></span>
            Contact
          </div>
          <h1 className="mx-auto mb-6 max-w-5xl font-heading text-3xl font-normal leading-heading tracking-heading text-white sm:text-5xl lg:text-5xl">
            Get in touch.
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            Contact us to discuss how we can assist your organisation and foster
            a valuable partnership. We respond within one business day.
          </p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="w-full bg-slate-50 border-b border-sognos-line">
        <div className="max-w-7xl w-full mx-auto px-6 py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            {/* Form */}
            <div className="rounded-2xl border border-sognos-line bg-white p-8 lg:p-10">
              <h2 className="mb-8 font-heading text-2xl font-medium text-sognos-body tracking-tight">
                Send us a message
              </h2>
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Response time */}
              {(settings.responseTimeHeading || settings.responseTimeBody) && (
                <div className="rounded-2xl border border-sognos-line bg-white p-8">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-sognos-navy/30 text-sognos-body font-medium mb-6">
                    <span className="w-2 h-2 bg-sognos-blue-accent rounded-full"></span>
                    Response time
                  </div>
                  {settings.responseTimeHeading && (
                    <p className="font-heading text-2xl font-medium text-sognos-body">
                      {settings.responseTimeHeading}
                    </p>
                  )}
                  {settings.responseTimeBody && (
                    <p className="mt-2 text-sm leading-relaxed text-sognos-body">
                      {settings.responseTimeBody}
                    </p>
                  )}
                </div>
              )}

              {/* Office locations */}
              {offices.length > 0 && (
                <div className="rounded-2xl border border-sognos-line bg-white overflow-hidden">
                  {offices.map((office, i) => (
                    <div
                      key={office.region}
                      className={`p-8 ${i > 0 ? "border-t border-sognos-line" : ""}`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-muted">
                          {office.region}
                        </p>
                        {office.label && (
                          <>
                            <span className="text-xs text-sognos-muted/50">
                              -
                            </span>
                            <p className="text-xs text-sognos-muted">
                              {office.label}
                            </p>
                          </>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-sognos-body mb-2">
                        {office.entity}
                      </p>
                      <address className="not-italic text-sm text-sognos-body leading-relaxed mb-3">
                        {office.address.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                      <div className="space-y-1">
                        {office.phone && (
                          <a
                            href={`tel:${office.phone.replace(/\s/g, "")}`}
                            className="flex items-center gap-2 text-sm text-sognos-body hover:opacity-70 transition-opacity"
                          >
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 14 14"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M2 2.5C2 8.299 5.701 12 11.5 12l.5-.5v-2l-.5-.5-2-.5-.5.5-.75.75C7.25 9 5 6.75 4.25 5.75L5 5l.5-.5L5 3 4.5 1 4 .5H2L1.5 1C1.5 1 2 2 2 2.5Z"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {office.phone}
                          </a>
                        )}
                        {office.email && (
                          <a
                            href={`mailto:${office.email}`}
                            className="flex items-center gap-2 text-sm text-sognos-body hover:opacity-70 transition-opacity"
                          >
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 14 14"
                              fill="none"
                              aria-hidden="true"
                            >
                              <rect
                                x="1"
                                y="3"
                                width="12"
                                height="8"
                                rx="1.5"
                                stroke="currentColor"
                                strokeWidth="1.3"
                              />
                              <path
                                d="M1 4l6 4 6-4"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                              />
                            </svg>
                            {office.email}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ABN + LinkedIn */}
              {(settings.abn || settings.linkedinUrl) && (
                <div className="rounded-2xl border border-sognos-line bg-white p-8">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-sognos-navy/30 text-sognos-body font-medium mb-6">
                    <span className="w-2 h-2 bg-sognos-blue-accent rounded-full"></span>
                    Company info
                  </div>
                  {settings.abn && (
                    <dl className="space-y-2 text-sm">
                      <div className="flex gap-2">
                        <dt className="text-sognos-muted shrink-0">ABN</dt>
                        <dd className="text-sognos-body font-medium">
                          {settings.abn}
                        </dd>
                      </div>
                    </dl>
                  )}
                  {settings.linkedinUrl && (
                    <a
                      href={settings.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-sognos-body/60 hover:text-sognos-body transition-colors"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      Sognos on LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
