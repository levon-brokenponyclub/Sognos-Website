"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let startTime: number;
    const duration = 2000; // 2 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

const STATS = [
  {
    numericValue: 99,
    suffix: "%",
    label: "Compliance audit pass rate",
    context: "Across SognosCare regulated deployments",
  },
  {
    numericValue: 75,
    suffix: "%",
    label: "Reduction in funding-body report time",
    context: "Compared to manual assembly processes",
  },
  {
    numericValue: 60,
    suffix: "%",
    label: "Reduction in admin time per care worker",
    context: "Across active SognosCare deployments",
  },
  {
    numericValue: 12000,
    suffix: "+",
    label: "Participants managed on platform",
    context: "Across active SognosCare deployments",
  },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "Sognos gave us one system for everything — care management, rostering, compliance. We went from three disconnected tools to one platform that actually reflects how we operate.",
    role: "Operations Director",
    organisation: "Health & Social Care Provider",
  },
  {
    quote:
      "Our compliance auditors used to dread reporting periods. Now every document, every progress note, every incident is timestamped and in one place. We passed our last three audits without a single finding.",
    role: "Quality & Compliance Manager",
    organisation: "NDIS Service Organisation",
  },
] as const;

// ─── Stat tile ────────────────────────────────────────────────────────────────

function StatTile({ stat }: { stat: (typeof STATS)[number] }) {
  return (
    <div className="flex h-full min-h-[220px] flex-col justify-end rounded-[2rem] bg-[#0F172A] p-8 lg:p-10 shadow-sm transform transition hover:-translate-y-1 hover:shadow-xl duration-500">
      <div className="mb-4 text-white">
        <p className="font-heading text-5xl lg:text-6xl font-semibold mb-3 tracking-tight">
          <AnimatedCounter value={stat.numericValue} />{stat.suffix}
        </p>
        <p className="text-sm font-medium text-gray-300">
          {stat.label}
        </p>
      </div>
      <p className="text-xs text-white/50 leading-relaxed border-t border-white/10 pt-4 mt-auto">
        {stat.context}
      </p>
    </div>
  );
}

// ─── Testimonial tile ─────────────────────────────────────────────────────────

function TestimonialTile({
  testimonial,
  dark = false,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
  dark?: boolean;
}) {
  return (
    <div
      className={`flex h-full min-h-[220px] flex-col justify-between rounded-[2rem] p-8 lg:p-10 shadow-sm transform transition hover:-translate-y-1 hover:shadow-xl duration-500 ${
        dark
          ? "bg-prussian-blue-800 text-white"
          : "bg-white border border-gray-100"
      }`}
    >
      <svg
        width="28"
        height="22"
        viewBox="0 0 28 22"
        fill="none"
        aria-hidden
        className={`mb-6 ${dark ? "text-white/20" : "text-prussian-blue-800/15"}`}
      >
        <path
          d="M0 22V13.6C0 5.87 4.1 1.4 12.3 0l1.4 2.4C9.8 3.47 7.77 5.6 7.1 9H12V22H0zm16 0V13.6C16 5.87 20.1 1.4 28.3 0l1.4 2.4C25.8 3.47 23.77 5.6 23.1 9H28V22H16z"
          fill="currentColor"
        />
      </svg>
      <blockquote className="flex-1">
        <p
          className={`text-lg lg:text-xl font-medium leading-relaxed font-heading ${
            dark ? "text-white" : "text-prussian-blue-800"
          }`}
        >
          {testimonial.quote}
        </p>
      </blockquote>
      <footer className="mt-8 border-t border-gray-200/20 pt-6">
        <p
          className={`text-sm font-bold uppercase tracking-wide ${
            dark ? "text-white" : "text-prussian-blue-800"
          }`}
        >
          {testimonial.role}
        </p>
        <p
          className={`mt-1 text-sm ${
            dark ? "text-white/70" : "text-gray-500"
          }`}
        >
          {testimonial.organisation}
        </p>
      </footer>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function SognoscareProof() {
  return (
    <section id="proof" className="bg-[#FAFAFA] py-24 lg:py-32 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <span className="inline-block px-3 py-1 rounded-full border border-gray-200 bg-white text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-6">
              Results
            </span>
            <h2 className="font-heading text-4xl lg:text-5xl font-semibold text-prussian-blue-800 tracking-tight leading-tight">
              Numbers care providers <br className="hidden lg:block"/> can point to
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-gray-600 lg:justify-self-end">
            SognosCare is built for providers who must demonstrate outcomes — to
            funding bodies, auditors, and boards. These are results from active
            deployments.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <StatTile stat={STATS[0]} />
          </div>
          <div className="md:col-span-1 lg:col-span-2">
            <TestimonialTile testimonial={TESTIMONIALS[0]} />
          </div>
          <div>
            <StatTile stat={STATS[1]} />
          </div>
          <div>
            <StatTile stat={STATS[2]} />
          </div>
          <div>
            <StatTile stat={STATS[3]} />
          </div>
          <div className="md:col-span-2">
            <TestimonialTile testimonial={TESTIMONIALS[1]} dark />
          </div>
        </div>
      </div>
    </section>
  );
}
