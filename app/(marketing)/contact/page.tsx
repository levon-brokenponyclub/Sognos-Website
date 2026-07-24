import Image from "next/image";
import { getCtaSectionContent } from "@/lib/sanity/queries";
import ContactForm from "./ContactForm";

const CONTACT_BENEFITS = [
  "Unify care, workforce and field service operations",
  "See where Dynamics 365, Power Platform and AI fit",
  "Map your current process to a practical rollout path",
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
        className="min-h-screen w-full bg-sognos-navy pt-32 lg:pt-40"
      >
        <div className="mx-auto max-w-7xl px-6 pb-12 lg:pb-16">
          <div className="grid min-h-[calc(100vh-10rem)] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(560px,1fr)] lg:gap-0">
            {/* Left — contact intro */}
            <div className="flex min-h-[520px] flex-col justify-between px-2 py-8 text-white lg:min-h-0 lg:px-10 lg:py-0">
              <div>
                <h1 className="max-w-lg font-heading text-5xl font-normal leading-[1.06] tracking-tight text-white text-balance lg:text-6xl">
                  Get in touch
                </h1>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">
                  Contact us to discuss how we can assist your organisation and
                  foster a valuable partnership. We respond within one business
                  day.
                </p>

                <ul className="mt-8 space-y-4">
                  {CONTACT_BENEFITS.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-center gap-4 text-base text-white/70"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-sognos-navy">
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
              </div>

              <div className="mt-12">
                <p className="text-base font-medium text-white">
                  Trusted by industry leaders and professionals worldwide
                </p>
                <div className="mt-6 grid max-w-xl grid-cols-3 border border-white/10">
                  {trustLogos.map((logo, i) => (
                    <div
                      key={`${logo.alt}-${i}`}
                      className={`flex h-20 items-center justify-center border-white/10 px-5 ${
                        i % 3 !== 2 ? "border-r" : ""
                      } ${i < 3 ? "border-b" : ""}`}
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={120}
                        height={36}
                        className="max-h-8 w-auto max-w-32 object-contain brightness-0 invert opacity-55"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — contact form */}
            <div className="flex w-full flex-col rounded-t-lg bg-white px-6 pt-6 pb-0 shadow-2xl shadow-black/25 lg:min-h-[78vh] lg:px-8 lg:pt-8 lg:pb-0">
              <h2 className="font-heading text-3xl font-medium tracking-tight text-sognos-heading text-balance md:text-2xl">
                Get in touch.
              </h2>
              <p className="mt-3 border-b border-gray-100 pb-5 text-base leading-relaxed text-gray-600">
                Send us a message and we&apos;ll route your enquiry to the right
                team.
              </p>
              <div className="min-h-0 flex-1 overflow-y-auto pt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
