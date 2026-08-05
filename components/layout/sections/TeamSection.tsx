"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { AnimatedEyebrow } from "@/components/ui/AnimatedEyebrow";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
  location: string;
};

const TEAM: TeamMember[] = [
  {
    name: "Kunal Joshi",
    role: "Managing Director & Co-Founder",
    image: "/images/team/Kunal.webp",
    bio: "As the Managing Director & Co-Founder of Sognos, Kunal brings visionary leadership and a strategic mindset to drive the company forward. With a profound understanding of both business and technology, Kunal is dedicated to guiding Sognos towards achieving its goals and exceeding client expectations.\n\nWith a career spanning over 20 years in the technology sector, Kunal has a proven track record of driving growth and innovation. His leadership style emphasises collaboration, creativity, and a customer-centric approach, ensuring that Sognos remains at the forefront of the industry. Alongside his vision for Sognos's customers, Kunal also drives each member of the Sognos family to identify and pursue their individual career and personal growth.\n\nKunal holds a Master in Technology from Swinburne University and an Executive MBA from AGSM. He continuously explores new avenues for business expansion and product development.",
    linkedin: "https://www.linkedin.com/in/kunal-joshi/",
    location: "Australia",
  },
  {
    name: "Rick Vosila",
    role: "Chief Commercial Officer & Co-Founder",
    image: "/images/team/Rick.webp",
    bio: "Rick is a co-founding director of Sognos Solutions. Together with co-founder Kunal Joshi, Rick recognised a gap in the Microsoft business applications partner ecosystem for a Field Service Management specialist integrator back in 2016 - the genesis of Sognos, and what places us today as the premier Field Service Management consultants in the Microsoft ecosystem in Australia.\n\nA 40-year veteran in the Australian tech sector, Rick has held C-suite roles in global multinational organisations across FMCG, Industrial Services, IT, and Higher Education. He holds both a Bachelor of Commerce and an MBA, bringing together training and experience to drive strategy and execution excellence.\n\nOutside of work, Rick is a proud Rotarian, working to serve communities and individuals in need through the reach, scale, and capacity of Rotary International.",
    linkedin: "https://www.linkedin.com/in/vosila/",
    location: "Australia",
  },
  {
    name: "Miloni Mehta",
    role: "Microsoft D365 & Power Platform Practice Lead",
    image: "/images/team/Miloni.webp",
    bio: "As the Microsoft D365 & Power Platform Practice Lead for Sognos, Miloni has made a career of solving business problems by applying innovative solutions in the Microsoft technology suite. Her goal: delivering exceptional outcomes for our customers across Healthcare, Services, Utilities, and Facility Maintenance.\n\nMiloni's in-depth experience with Dynamics 365 Field Service and her ability to architect and design end-to-end, business requirement-oriented solutions is a real advantage for the businesses Sognos partners with. Her leadership extends beyond project delivery - she is dedicated to nurturing talent and fostering a culture of continuous learning.\n\nMiloni holds a Master's in Data Analytics from the University of Technology, Sydney. She is also an emerging runner who completed her first half marathon at the 2023 Sydney Marathon, raising money for children on the Autism Spectrum - with plans to run her first full marathon soon.",
    linkedin: "https://www.linkedin.com/in/miloni-mehta/",
    location: "Australia",
  },
];

const TRANSITION = {
  type: "spring",
  stiffness: 220,
  damping: 28,
  mass: 0.9,
} as const;

const FADE_TRANSITION = {
  duration: 0.22,
  ease: [0.25, 0.1, 0.25, 1],
} as const;

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

function TeamCard({
  member,
  index,
  onOpen,
}: {
  member: TeamMember;
  index: number;
  onOpen: (member: TeamMember) => void;
}) {
  return (
    <article className="group flex flex-col">
      {/* Portrait opens the profile too — the whole image is the primary
          target, after the reference. */}
      <button
        type="button"
        onClick={() => onOpen(member)}
        aria-label={`Read ${member.name}'s bio`}
        className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sognos-blue-accent"
      >
        <div className="relative aspect-[0.82] w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.035]"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={index < 3}
          />
        </div>
      </button>

      <div className="mt-6">
        <h3 className="font-heading text-2xl font-medium tracking-tight text-sognos-heading lg:text-3xl">
          {member.name}
        </h3>
        <p className="mt-2 text-base leading-tight text-sognos-muted">
          {member.role}
        </p>
      </div>

      {/* Action row bounded by dashed rules, after the reference: Read Bio
          (opens the profile) left, LinkedIn right. */}
      <div className="mt-5 flex items-center justify-between gap-4 border-y border-dashed border-sognos-line py-3">
        <button
          type="button"
          onClick={() => onOpen(member)}
          className="group/bio inline-flex items-center gap-2 text-sm font-medium text-sognos-heading transition-colors hover:text-sognos-blue-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sognos-blue-accent"
        >
          Read Bio
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/bio:translate-x-0.5"
          >
            &rarr;
          </span>
        </button>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="flex size-8 items-center justify-center rounded bg-gray-200 text-sognos-heading transition-colors hover:bg-sognos-navy-dark hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sognos-blue-accent"
        >
          <LinkedInIcon />
        </a>
      </div>
    </article>
  );
}

function ExpandedProfile({
  member,
  onClose,
}: {
  member: TeamMember;
  onClose: () => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-100 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <motion.button
        type="button"
        aria-label="Close profile"
        className="absolute inset-0 bg-sognos-navy-dark/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={FADE_TRANSITION}
      />

      {/* Right slide-in panel, after routable.com/about. */}
      <motion.aside
        className="relative ml-auto flex h-full w-full max-w-md flex-col overflow-y-auto bg-white"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={TRANSITION}
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-end">
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close profile"
              className="flex size-9 items-center justify-center rounded-full bg-gray-100 text-sognos-heading transition-colors hover:bg-sognos-navy-dark hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sognos-blue-accent"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative mt-2 aspect-[0.92] w-full overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 28rem"
              priority
            />
          </div>

          {/* Name left, LinkedIn right on one row — the reference's header. */}
          <div className="mt-6 flex items-start justify-between gap-4">
            <div>
              <h3
                id={titleId}
                className="font-heading text-3xl font-medium leading-snug tracking-tight text-sognos-heading"
              >
                {member.name}
              </h3>
              <p className="mt-2 text-base text-sognos-muted">{member.role}</p>
            </div>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="mt-1 flex size-9 shrink-0 items-center justify-center rounded bg-gray-100 text-sognos-heading transition-colors hover:bg-sognos-navy-dark hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sognos-blue-accent"
            >
              <LinkedInIcon />
            </a>
          </div>

          <div className="my-6 border-t border-dashed border-sognos-line" />

          <div className="space-y-5 text-base leading-relaxed text-sognos-body">
            {member.bio.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </motion.aside>
    </motion.div>
  );
}

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section className="w-full bg-gray-100 py-20 lg:py-28">
      <div>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-2 lg:sticky lg:top-[100px] lg:self-start">
              <AnimatedEyebrow
                textClassName="text-sognos-muted"
              >
                Leadership
              </AnimatedEyebrow>
            </div>

            <div className="min-w-0 lg:col-[3/-1]">
              <h2 className="max-w-5xl font-heading text-2xl font-medium leading-snug tracking-tight text-sognos-heading text-balance md:text-4xl">
                Meet our senior leadership team
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-3">
                {TEAM.map((member, index) => (
                  <TeamCard
                    key={member.name}
                    member={member}
                    index={index}
                    onOpen={setSelectedMember}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {selectedMember ? (
            <ExpandedProfile
              key={selectedMember.name}
              member={selectedMember}
              onClose={() => setSelectedMember(null)}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
