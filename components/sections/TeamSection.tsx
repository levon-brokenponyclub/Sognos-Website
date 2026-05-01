"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
};

const TEAM: TeamMember[] = [
  {
    name: "Kunal Joshi",
    role: "Managing Director & Co-Founder",
    image: "/images/team/Kunal.webp",
    bio: "As the Managing Director & Co-Founder of Sognos, Kunal brings visionary leadership and a strategic mindset to drive the company forward. With a profound understanding of both business and technology, Kunal is dedicated to guiding Sognos towards achieving its goals and exceeding client expectations.\n\nWith a career spanning over 20 years in the technology sector, Kunal has a proven track record of driving growth and innovation. His leadership style emphasises collaboration, creativity, and a customer-centric approach, ensuring that Sognos remains at the forefront of the industry. Alongside his vision for Sognos's customers, Kunal also drives each member of the Sognos family to identify and pursue their individual career and personal growth.\n\nKunal holds a Master in Technology from Swinburne University and an Executive MBA from AGSM. He continuously explores new avenues for business expansion and product development.",
    linkedin: "https://www.linkedin.com/in/kunal-joshi/",
  },
  {
    name: "Rick Vosila",
    role: "Chief Commercial Officer & Co-Founder",
    image: "/images/team/Rick.webp",
    bio: "Rick is a co-founding director of Sognos Solutions. Together with co-founder Kunal Joshi, Rick recognised a gap in the Microsoft business applications partner ecosystem for a Field Service Management specialist integrator back in 2016 — the genesis of Sognos, and what places us today as the premier Field Service Management consultants in the Microsoft ecosystem in Australia.\n\nA 40-year veteran in the Australian tech sector, Rick has held C-suite roles in global multinational organisations across FMCG, Industrial Services, IT, and Higher Education. He holds both a Bachelor of Commerce and an MBA, bringing together training and experience to drive strategy and execution excellence.\n\nOutside of work, Rick is a proud Rotarian, working to serve communities and individuals in need through the reach, scale, and capacity of Rotary International.",
    linkedin: "https://www.linkedin.com/in/vosila/",
  },
  {
    name: "Miloni Mehta",
    role: "Microsoft D365 & Power Platform Practice Lead",
    image: "/images/team/Miloni.webp",
    bio: "As the Microsoft D365 & Power Platform Practice Lead for Sognos, Miloni has made a career of solving business problems by applying innovative solutions in the Microsoft technology suite. Her goal: delivering exceptional outcomes for our customers across Healthcare, Services, Utilities, and Facility Maintenance.\n\nMiloni's in-depth experience with Dynamics 365 Field Service and her ability to architect and design end-to-end, business requirement-oriented solutions is a real advantage for the businesses Sognos partners with. Her leadership extends beyond project delivery — she is dedicated to nurturing talent and fostering a culture of continuous learning.\n\nMiloni holds a Master's in Data Analytics from the University of Technology, Sydney. She is also an emerging runner who completed her first half marathon at the 2023 Sydney Marathon, raising money for children on the Autism Spectrum — with plans to run her first full marathon soon.",
    linkedin: "https://www.linkedin.com/in/miloni-mehta/",
  },
];

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function TeamSection() {
  const [active, setActive] = useState<TeamMember | null>(null);

  return (
    <>
      <section className="w-full bg-prussian-blue-800">
        <div className="max-w-7xl w-full mx-auto px-6 py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted mb-4">
            Leadership
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-white tracking-tight mb-16">
            Senior Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <button
                key={member.name}
                onClick={() => setActive(member)}
                className="flex flex-col text-left group bg-white p-2 rounded-lg transition-all duration-500 hover:-translate-y-1 cursor-pointer"
              >
                {/* Photo - Reduced height (aspect 4/5) */}
                <div className="relative w-full rounded-lg h-72 overflow-hidden bg-slate-50 mb-5 lg:mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                {/* Meta */}
                <div className="px-3 pb-4 flex flex-col items-start w-full">
                  <h3 className="font-heading text-[22px] font-medium text-prussian-blue-800 tracking-tight transition-colors group-hover:text-[#1D96FC]">
                    {member.name}
                  </h3>
                  <p className="font-heading text-base font-normal leading-relaxed text-sognos-text-body mt-1.5">
                    {member.role}
                  </p>

                  {/* Visual trigger */}
                  <div className="mt-6 inline-flex items-center gap-2.5 text-sm font-medium text-prussian-blue-800 hover:opacity-70 transition-opacity">
                    <span>Read profile</span>
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-prussian-blue-900 text-white shrink-0">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 7h8M7 3l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-prussian-blue-900/60 backdrop-blur-sm"
              onClick={() => setActive(null)}
            />

            {/* Bottom drawer */}
            <motion.div
              key="drawer"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle + close */}
              <div className="flex items-center justify-between px-6 pt-4 pb-3 shrink-0">
                <div className="w-10 h-1 rounded-full bg-slate-200 mx-auto absolute left-1/2 -translate-x-1/2" />
                <div />
                <button
                  onClick={() => setActive(null)}
                  className="w-9 h-9 rounded-full border border-sognos-border-subtle flex items-center justify-center text-prussian-blue-800/50 hover:text-prussian-blue-800 hover:border-prussian-blue-800/30 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 2l10 10M12 2L2 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Scrollable 2-col content */}
              <div className="overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] max-w-5xl mx-auto px-6 pb-10 gap-0">
                  {/* Col 1 — photo + identity + social */}
                  <div className="flex flex-col items-start py-6 md:pr-8 md:border-r border-sognos-border-subtle">
                    <div className="relative w-48 aspect-[3/4] rounded-lg overflow-hidden bg-slate-100 mb-6">
                      <Image
                        src={active.image}
                        alt={active.name}
                        fill
                        className="object-cover object-top"
                        sizes="260px"
                      />
                    </div>
                    <p className="font-heading text-lg font-semibold text-prussian-blue-800 leading-snug">
                      {active.name}
                    </p>
                    <p className="text-sm text-brand mt-1">{active.role}</p>
                    <a
                      href={active.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-prussian-blue-800/50 hover:text-prussian-blue-800 transition-colors text-sm"
                      aria-label={`${active.name} on LinkedIn`}
                    >
                      <LinkedInIcon />
                      <span className="font-medium">LinkedIn</span>
                    </a>
                  </div>

                  {/* Col 2 — bio */}
                  <div className="py-6 md:pl-8 border-t md:border-t-0 border-sognos-border-subtle">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sognos-text-muted mb-5">
                      Overview
                    </p>
                    <div className="space-y-4">
                      {active.bio.split("\n\n").map((para, i) => (
                        <p
                          key={i}
                          className="text-sognos-text-body leading-relaxed text-base"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
