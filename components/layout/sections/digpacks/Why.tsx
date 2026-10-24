"use client";

import { motion } from "framer-motion";

// Mirrors the product Advantages section (label column, heading, striped
// checklist), followed by the two supporting lists from the live page.
const WHY = [
  "NHS and healthcare experience you can build on",
  "Solutions built on Microsoft Power Platform, with Copilot and AI",
  "Localisation for Australian and New Zealand regulation, workflows and privacy",
  "Integration with your existing Microsoft and third-party systems",
  "Adoption, training and ongoing improvement",
];

const LISTS = [
  {
    heading: "Who should start the conversation?",
    intro: null,
    items: [
      "Health services & hospitals",
      "Aged care & support at home",
      "Disability & community services",
      "Mental health & wellbeing teams",
      "Government & not-for-profits",
      "IT, Digital, Risk, Quality, People leaders",
    ],
  },
  {
    heading: "Localisation is more than changing terminology.",
    intro: "We work with you to ensure each solution is configured for:",
    items: [
      "Australian & NZ regulatory requirements",
      "Privacy, security & governance",
      "Hosting & data residency",
      "Integration with your systems",
      "Roles, approvals & escalation",
      "Adoption & measurable outcomes",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-1 shrink-0 text-white"
      aria-hidden="true"
    >
      <path d="M18 4 7 16l-5-5" />
    </svg>
  );
}

export default function DigPacksWhy() {
  return (
    <section id="why" className="w-full bg-sognos-digpacks-base text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-2 lg:sticky lg:top-[100px] lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/50">
              Why DigPacks
            </p>
          </div>

          <div className="lg:col-[3/-1]">
            <h2 className="mb-10 font-heading text-3xl font-medium tracking-tight text-white md:text-4xl">
              Why DigPacks and Sognos?
            </h2>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
              className="divide-y divide-white/10 rounded-lg overflow-hidden"
            >
              {WHY.map((reason, i) => (
                <motion.li
                  key={reason}
                  variants={itemVariants}
                  className={`flex items-start gap-4 px-6 py-5 ${i % 2 === 0 ? "bg-white/10" : ""}`}
                >
                  <CheckIcon />
                  <span className="text-base leading-relaxed text-white">
                    {reason}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="mt-16 grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
              {LISTS.map((list) => (
                <div key={list.heading} className="rounded-lg bg-white/10 p-8">
                  <h3 className="font-heading text-xl font-medium tracking-tight text-white">
                    {list.heading}
                  </h3>
                  {list.intro && (
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {list.intro}
                    </p>
                  )}
                  <ul className="mt-6 space-y-3">
                    {list.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-base leading-relaxed text-white/90">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
