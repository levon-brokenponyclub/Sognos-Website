"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { bookDemo } from "@/app/actions/book-demo";

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp: number | null = null;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, isInView]);

  return <span ref={ref}>{count.toLocaleString("en-US")}</span>;
}

// ─── Types ─────────────────────────────────────────────────────────────────

type ProductKey = "sognoscare" | "sognosroster" | "sognosgenogram";

type CTASectionProps = {
  headline?: string;
  subtext?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  defaultProduct?: ProductKey;
};

// ─── Proof stats ────────────────────────────────────────────────────────────

const TEAM_TILE_IMAGE = "/images/team/sognos-team.png";

const STATS = [
  {
    imageSrc: TEAM_TILE_IMAGE,
    imageAlt: "Sognos team group photo",
  },
  {
    numericValue: 40,
    suffix: "%",
    label: "Reduction in Scheduling Time",
    bgClass: "bg-prussian-blue-800",
    textClass: "text-white",
    labelClass: "text-[#8E9EBB]",
  },
  {
    numericValue: 3,
    suffix: "×",
    label: "Faster Compliance Reporting",
    bgClass: "bg-[#1D96FC]",
    textClass: "text-white",
    labelClass: "text-blue-100",
  },
  {
    numericValue: 99,
    suffix: "%",
    label: "Quality Standard Compliance",
    bgClass: "bg-white",
    textClass: "text-[#0A1629]",
    labelClass: "text-neutral-500",
    pattern: true,
  },
];

// ─── Section ────────────────────────────────────────────────────────────────

export default function CTASection({ defaultProduct }: CTASectionProps = {}) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<number | null>(22);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [product, setProduct] = useState<string>(defaultProduct ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const times = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "11:30 AM",
    "01:00 PM",
    "02:30 PM",
    "04:00 PM",
  ];

  return (
    <section id="book-demo" className="w-full bg-gray-200/70 scroll-mt-[140px]">
      <div className="max-w-7xl w-full mx-auto px-6 py-16 lg:py-24">
        <div className="rounded-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left — Calendar / Book a Demo */}
            <div className="bg-white p-5 lg:p-6 rounded-md shadow-sm border border-gray-200 flex flex-col w-full">
              <div className="w-full h-[420px] flex flex-col">
                <div className="flex-shrink-0 pb-3 mb-3 border-b border-gray-100">
                  <h3 className="text-lg lg:text-xl font-heading font-semibold mb-1 text-gray-900 tracking-tight">
                    Book a Demo
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                    Schedule a 45-minute call to see how Sognos can unify your
                    operations and boost efficiency.
                  </p>
                </div>

                <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
                  <div className="h-full flex flex-col space-y-3">
                    <div className="flex-shrink-0">
                      <h3 className="text-[15px] font-semibold text-gray-900">
                        {step === 1 && "Choose a date"}
                        {step === 2 && "Choose a time"}
                        {step === 3 && "Add your details"}
                        {step === 4 && "All set!"}
                      </h3>
                    </div>

                    {step === 1 && (
                      <div className="flex-1 min-h-0 border border-gray-200 rounded-md p-4 lg:p-5 flex flex-col animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between mb-5 flex-shrink-0">
                          <button
                            type="button"
                            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1D96FC]/50"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="m15 18-6-6 6-6"></path>
                            </svg>
                          </button>
                          <h4 className="text-sm font-semibold text-gray-900">
                            May 2026
                          </h4>
                          <button
                            type="button"
                            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1D96FC]/50"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="m9 18 6-6-6-6"></path>
                            </svg>
                          </button>
                        </div>

                        <div className="flex-1 min-h-0 flex flex-col">
                          <div className="grid grid-cols-7 gap-1 mb-3 flex-shrink-0">
                            {["S", "M", "T", "W", "T", "F", "S"].map(
                              (day, i) => (
                                <div
                                  key={i}
                                  className="h-7 flex items-center justify-center text-xs font-semibold text-gray-400 tracking-wide"
                                >
                                  {day}
                                </div>
                              ),
                            )}
                          </div>

                          <div className="grid grid-cols-7 gap-y-2 gap-x-1 flex-1 content-start justify-items-center">
                            {/* Empty offsets */}
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={`empty-${i}`}
                                className="h-8 w-8 lg:w-9 lg:h-9"
                              ></div>
                            ))}
                            {/* Days */}
                            {Array.from({ length: 31 }).map((_, i) => {
                              const day = i + 1;
                              const isSelected = day === selectedDate;
                              return (
                                <button
                                  key={day}
                                  type="button"
                                  onClick={() => {
                                    setSelectedDate(day);
                                    setStep(2);
                                  }}
                                  className={`h-8 w-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#1D96FC] ${
                                    isSelected
                                      ? "bg-[#1D96FC] text-white shadow-md ring-2 ring-[#1D96FC] ring-offset-1"
                                      : "text-gray-700 hover:bg-[#1D96FC]/10 hover:text-[#1D96FC]"
                                  }`}
                                >
                                  {day}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="flex-1 min-h-0 border border-gray-200 rounded-md p-4 lg:p-5 flex flex-col animate-in slide-in-from-right-8 duration-300">
                        <div className="flex items-center mb-5 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-600 mr-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="m15 18-6-6 6-6"></path>
                            </svg>
                          </button>
                          <h4 className="text-sm font-semibold text-gray-900">
                            May {selectedDate}, 2026
                          </h4>
                        </div>
                        <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-2 gap-3 content-start pb-2">
                          {times.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => {
                                setSelectedTime(t);
                                setStep(3);
                              }}
                              className="py-2.5 px-3 border border-[#1D96FC]/30 text-[#1D96FC] hover:bg-[#1D96FC] hover:text-white rounded-md text-sm font-medium transition-colors text-center focus:outline-none focus:ring-2 focus:ring-[#1D96FC]/50"
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="flex-1 min-h-0 border border-gray-200 rounded-md p-4 lg:p-5 flex flex-col animate-in slide-in-from-right-8 duration-300">
                        <div className="flex items-center mb-5 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-600 mr-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="m15 18-6-6 6-6"></path>
                            </svg>
                          </button>
                          <div>
                            <p className="text-[10px] sm:text-xs font-semibold text-[#1D96FC] uppercase tracking-wider">
                              Demo length: 45 min
                            </p>
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-900">
                              May {selectedDate}, {selectedTime}
                            </h4>
                          </div>
                        </div>
                        <form
                          className="flex-1 overflow-y-auto flex flex-col space-y-4 pr-1 pb-2"
                          onSubmit={async (e) => {
                            e.preventDefault();
                            if (submitting) return;
                            setSubmitting(true);
                            setErrorMsg(null);
                            const result = await bookDemo({
                              fullName,
                              email,
                              company,
                              product,
                              date: selectedDate,
                              time: selectedTime,
                            });
                            setSubmitting(false);
                            if (!result.ok) {
                              setErrorMsg(result.error);
                              return;
                            }
                            setStep(4);
                          }}
                        >
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                              Full Name *
                            </label>
                            <input
                              required
                              type="text"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#1D96FC] focus:border-[#1D96FC] outline-none transition-shadow"
                              placeholder="Jane Doe"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                              Work Email *
                            </label>
                            <input
                              required
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#1D96FC] focus:border-[#1D96FC] outline-none transition-shadow"
                              placeholder="jane@company.com"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                              Company *
                            </label>
                            <input
                              required
                              type="text"
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#1D96FC] focus:border-[#1D96FC] outline-none transition-shadow"
                              placeholder="Acme Health Group"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                              Product of interest *
                            </label>
                            <select
                              required
                              value={product}
                              onChange={(e) => setProduct(e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-[#1D96FC] focus:border-[#1D96FC] outline-none transition-shadow"
                            >
                              <option value="" disabled>
                                Select a product
                              </option>
                              <option value="sognoscare">SognosCare</option>
                              <option value="sognosroster">SognosRoster</option>
                              <option value="sognosgenogram">
                                Sognos Genogram
                              </option>
                              <option value="not-sure">Not sure yet</option>
                            </select>
                          </div>
                          {errorMsg && (
                            <p
                              role="alert"
                              className="text-xs text-red-600 leading-relaxed"
                            >
                              {errorMsg}
                            </p>
                          )}
                          <div className="pt-2 mt-auto">
                            <button
                              type="submit"
                              disabled={submitting}
                              className="w-full bg-[#1D96FC] hover:bg-[#1582e0] disabled:bg-[#1D96FC]/60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-md text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1D96FC] focus:ring-offset-1"
                            >
                              {submitting ? "Sending…" : "Confirm Demo"}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {step === 4 && (
                      <div className="flex-1 min-h-0 border border-gray-200 bg-gray-50 rounded-md p-6 lg:p-8 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
                        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center mb-5 shadow-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-emerald-600"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          You're booked!
                        </h4>
                        <p className="text-sm text-gray-600 max-w-[250px] mx-auto">
                          A calendar invitation has been sent to your email for{" "}
                          <strong>
                            May {selectedDate} at {selectedTime}
                          </strong>
                          .
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setStep(1);
                            setSelectedTime(null);
                          }}
                          className="mt-8 text-sm font-medium text-[#1D96FC] hover:underline focus:outline-none"
                        >
                          Book another demo
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Stats 2×2 */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label ?? stat.imageSrc ?? i}
                  className={
                    stat.imageSrc
                      ? "relative min-h-[220px] overflow-hidden rounded-md shadow-sm"
                      : `relative flex h-full flex-col justify-between rounded-md overflow-hidden p-6 shadow-sm lg:p-8 ${stat.bgClass}`
                  }
                >
                  {stat.imageSrc ? (
                    <Image
                      src={stat.imageSrc}
                      alt={stat.imageAlt ?? ""}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <>
                      <div className="relative z-10 text-left">
                        <p
                          className={`font-heading text-4xl lg:text-5xl font-medium tracking-tight leading-none ${stat.textClass}`}
                        >
                          <AnimatedCounter value={stat.numericValue} />
                          {stat.suffix}
                        </p>
                      </div>
                      <div className="relative z-10 mt-8 text-left lg:mt-10">
                        <p
                          className={`text-xs font-semibold uppercase tracking-widest ${stat.labelClass}`}
                        >
                          {stat.label}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
