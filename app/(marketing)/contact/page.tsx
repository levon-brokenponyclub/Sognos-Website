import Image from "next/image";
import { getCtaSectionContent } from "@/lib/sanity/queries";
import ContactForm from "./ContactForm";

const CONTACT_BENEFITS = [
  "Unify care, workforce and field service operations",
  "See where Dynamics 365, Power Platform and AI fit",
  "Leave with clear next steps for your team",
];

export const revalidate = 60;

export default async function ContactPage() {
  const ctaContent = await getCtaSectionContent();
  const trustLogos = ctaContent.trustLogos.slice(0, 6);

  return (
    <main className="w-full bg-sognos-navy">
      <section
        data-header-dark
        className="min-h-screen w-full bg-sognos-navy pt-32 lg:pt-36"
      >
        <div className="mx-auto max-w-7xl px-6 pb-12 lg:pb-16">
          <div className="grid min-h-[calc(100vh-10rem)] grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(560px,1fr)] lg:gap-22">
            {/* Left — contact intro */}
            <div className="flex min-h-[520px] flex-col px-2 py-8 text-white lg:min-h-0 lg:self-start lg:px-0 lg:py-0">
              <div>
                <h1 className="max-w-lg font-heading text-5xl font-normal leading-snug tracking-tight text-white text-balance lg:text-5xl">
                  Get in touch
                </h1>
                <p className="mt-3 max-w-xl text-xl text-white">
                  Contact us to discuss how we can assist your organisation and
                  foster a valuable partnership.
                </p>

                <ul className="mt-8 space-y-4">
                  {CONTACT_BENEFITS.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-center gap-4 text-base text-white/80"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sognos-blue-accent text-white">
                        <svg
                          viewBox="0 0 14 14"
                          fill="none"
                          className="h-3 w-3"
                          aria-hidden="true"
                        >
                          <path
                            d="m3 7 2.5 2.5L11 4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="mt-22">
                  <p className="font-heading text-xl font-medium text-white">
                    Trusted by industry leaders and professionals worldwide
                  </p>
                  <div className="mt-5 grid max-w-xl grid-cols-3 border border-white/10">
                    {trustLogos.map((logo, i) => (
                      <div
                        key={`${logo.alt}-${i}`}
                        className={`relative flex items-center justify-center border-white/10 p-3 sm:p-6 ${
                          i % 3 !== 2 ? "border-r" : ""
                        } ${i < 3 ? "border-b" : ""}`}
                      >
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={128}
                          height={64}
                          className="h-12 w-full max-w-32 object-contain brightness-0 invert opacity-70"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right — contact form */}
            <div className="flex w-full flex-col rounded-lg bg-white p-6 shadow-2xl shadow-black/25 lg:px-8 lg:py-8">
              {/* <h2 className="font-heading text-3xl font-medium tracking-tight text-sognos-heading text-balance md:text-2xl">
                Get in touch.
              </h2>
              <p className="mt-3 border-b border-gray-100 pb-5 text-base leading-relaxed text-gray-600">
                Send us a message and we&apos;ll route your enquiry to the right
                team.
              </p> */}
              <div className="flex-1">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
