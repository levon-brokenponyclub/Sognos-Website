"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { cn } from "@/lib/utils";

type Story = {
  company: string;
  companySize: string;
  edition: string;
  logo: string;
  quote: string;
  author: string;
  role: string;
  href: string;
  panelClass: string;
  quoteClass: string;
  authorClass: string;
  roleClass: string;
  quoteIconColor: string;
  contentBorderClass: string;
  buttonBorderClass: string;
  buttonTextClass: string;
  buttonHoverClass: string;
  buttonIconBgClass: string;
};

const STORIES: Story[] = [
  {
    company: "Flourish Australia",
    companySize: "1,100+",
    edition: "Disability & Mental Health",
    logo: "/logos/flourish-australia-logo.png",
    quote:
      "Congratulations and well done to everyone that has been a part of this magnificent success! You should all be very proud of the quality of work you produce. You make us very proud — THANK YOU!",
    author: "Susan McCarthy",
    role: "Chief Operating Officer, Flourish Australia",
    href: "/customers/flourish-australia",
    panelClass: "bg-seagrass-700/40",
    quoteClass: "text-seagrass-900",
    authorClass: "text-seagrass-900",
    roleClass: "text-seagrass-900/85",
    quoteIconColor: "text-seagrass-900/50",
    contentBorderClass: "border-seagrass-800/35",
    buttonBorderClass: "border-seagrass-900",
    buttonTextClass: "text-seagrass-900",
    buttonHoverClass: "hover:bg-seagrass-900/8",
    buttonIconBgClass: "bg-seagrass-900",
  },
  {
    company: "Home Care Provider",
    companySize: "200+",
    edition: "Support at Home",
    logo: "/logos/sognos-logo.svg",
    quote:
      "We used to spend two days assembling compliance reports at the end of every quarter. Now it's a single export. The audit trail is there automatically — every note, every visit, every change of plan.",
    author: "Operations Director",
    role: "Support at Home Provider, NSW",
    href: "/customers",
    panelClass: "bg-(--color-grapefruit-pink-100)",
    quoteClass: "text-prussian-blue-800",
    authorClass: "text-prussian-blue-800",
    roleClass: "text-prussian-blue-800/60",
    quoteIconColor: "text-grapefruit-pink-300",
    contentBorderClass: "border-prussian-blue-800/12",
    buttonBorderClass: "border-prussian-blue-800/20",
    buttonTextClass: "text-prussian-blue-800",
    buttonHoverClass: "hover:bg-prussian-blue-800/8",
    buttonIconBgClass: "bg-prussian-blue-800",
  },
];

function QuoteIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 39 32"
      fill="none"
      className={`h-7 w-8 shrink-0 ${className}`}
      aria-hidden
    >
      <path
        d="m16.3 4-4.333-4C4.189 5.557.078 12.89.078 20.668v.445C.078 27.779 3.745 32 8.856 32c4.222 0 7.778-3.334 7.778-7.89 0-4.444-3.111-7.332-7.334-7.332a7.15 7.15 0 0 0-2.666.555C7.41 12.223 11.3 7.78 16.3 4.001Zm21.667 0-4.333-4c-7.778 5.556-11.89 12.89-11.89 20.667v.445c0 6.667 3.668 10.889 8.779 10.889 4.222 0 7.777-3.334 7.777-7.89 0-4.444-3.11-7.332-7.333-7.332a7.15 7.15 0 0 0-2.667.555c.778-5.111 4.667-9.555 9.667-13.333Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function SognoscareStories() {
  const [index, setIndex] = useState(0);
  const total = STORIES.length;
  const go = (next: number) => { if (next >= 0 && next < total) setIndex(next); };
  const story = STORIES[index];

  const buttonClassName = cn(
    story.buttonBorderClass,
    story.buttonTextClass,
    story.buttonHoverClass,
  );

  return (
    <section id="stories" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sognos-text-muted">
            Customers
          </p>
          <h2 className="font-heading text-4xl font-normal text-brand">
            Care providers who made the move
          </h2>
        </div>

        {/* Card */}
        <div className="grid min-h-96 overflow-hidden rounded-xl border border-slate-400/30 lg:grid-cols-[380px_1fr]">
          {/* Left — white */}
          <div className="flex flex-col border-b border-(--sognos-border) bg-white p-8 lg:border-b-0 lg:border-r">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`left-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex h-full flex-col"
              >
                <div className="mb-auto">
                  <Image
                    src={story.logo}
                    alt={story.company}
                    width={160}
                    height={48}
                    className="h-12 w-auto max-w-[160px] object-contain object-left"
                  />
                </div>
                <div className="mt-auto pt-6">
                  <hr className="mb-6 border-slate-400/30" />
                  <div className="space-y-4">
                    <div>
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-cornflower-ocean-800/50">
                        Organisation size
                      </p>
                      <p className="text-xl font-medium text-prussian-blue-800">
                        {story.companySize} staff
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-cornflower-ocean-800/50">
                        SognosCare edition
                      </p>
                      <p className="text-xl font-medium text-prussian-blue-800">
                        {story.edition}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — accent panel */}
          <div className={`flex flex-col p-10 transition-colors duration-300 ${story.panelClass}`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`right-${index}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="flex h-full flex-col"
              >
                <QuoteIcon className={story.quoteIconColor} />

                <blockquote className="mt-6 flex-1">
                  <p className={`font-heading text-2xl font-normal leading-snug tracking-tight lg:text-3xl ${story.quoteClass}`}>
                    {story.quote}
                  </p>
                </blockquote>

                <div className="mt-6">
                  <p className={`text-sm font-semibold ${story.authorClass}`}>
                    {story.author}
                  </p>
                  <p className={`mt-0.5 text-sm ${story.roleClass}`}>
                    {story.role}
                  </p>
                </div>

                <div className={cn("mt-8 flex justify-end border-t pt-6", story.contentBorderClass)}>
                  <AnimatedButton
                    href={story.href}
                    variant="transparent"
                    className={buttonClassName}
                    bubbleClassName={story.buttonIconBgClass}
                  >
                    Read case study
                  </AnimatedButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Nav row */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {STORIES.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="h-2 w-2 cursor-pointer rounded-full transition-all duration-200"
                style={{
                  background: i === index ? "var(--sognos-accent)" : "var(--sognos-border)",
                  transform: i === index ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label="Previous"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-(--sognos-border) text-sognos-text-muted transition-colors hover:border-sognos-text-heading hover:text-sognos-text-heading disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => go(index + 1)}
              disabled={index === total - 1}
              aria-label="Next"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-brand text-white transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
