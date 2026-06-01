"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { bookDemo } from "@/app/actions/book-demo";
import { useCtaContent } from "@/lib/CtaContentContext";
import { CTA_VARIANT_STYLES } from "@/lib/content/ctaSection";

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

type ProductKey = "sognoscare" | "sognosroster" | "sognosgenogram" | "not-sure";

type CTASectionProps = {
  headline?: string;
  subtext?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  defaultProduct?: ProductKey;
  hideStats?: boolean;
  bare?: boolean;
};

// ─── Form styles (matches contact page) ────────────────────────────────────

const INPUT =
  "w-full rounded-lg border border-sognos-border-subtle bg-slate-50 px-4 py-3 text-sm text-prussian-blue-800 placeholder:text-sognos-text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";
const LABEL = "mb-1.5 block text-sm font-medium text-prussian-blue-800";

// ─── Section ────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CTASection({
  defaultProduct,
  hideStats,
  bare,
}: CTASectionProps = {}) {
  const cta = useCtaContent();

  const melbourneNow = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Australia/Melbourne" }),
  );
  const todayDate = melbourneNow.getDate();
  const todayMonth = melbourneNow.getMonth();
  const todayYear = melbourneNow.getFullYear();

  const [step, setStep] = useState(1);
  const [calMonth, setCalMonth] = useState(todayMonth);
  const [calYear, setCalYear] = useState(todayYear);
  const [selectedDate, setSelectedDate] = useState<number | null>(todayDate);
  const [selectedMonth, setSelectedMonth] = useState(todayMonth);
  const [selectedYear, setSelectedYear] = useState(todayYear);
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

  // Calendar helpers
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();
  const isCurrentMonth = calMonth === todayMonth && calYear === todayYear;
  const isPastMonth =
    calYear < todayYear || (calYear === todayYear && calMonth < todayMonth);

  const prevMonth = () => {
    if (isPastMonth || isCurrentMonth) return;
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(calYear - 1);
    } else setCalMonth(calMonth - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(calYear + 1);
    } else setCalMonth(calMonth + 1);
  };

  const isToday =
    selectedDate === todayDate &&
    selectedMonth === todayMonth &&
    selectedYear === todayYear;

  const selectedDateLabel = `${MONTH_NAMES[selectedMonth]} ${selectedDate}, ${selectedYear}`;

  function isTimePast(t: string): boolean {
    if (!isToday) return false;
    const [timePart, meridiem] = t.split(" ");
    let [h, m] = timePart.split(":").map(Number);
    if (meridiem === "PM" && h !== 12) h += 12;
    if (meridiem === "AM" && h === 12) h = 0;
    const slotMinutes = h * 60 + m;
    const nowMinutes = melbourneNow.getHours() * 60 + melbourneNow.getMinutes();
    return slotMinutes <= nowMinutes;
  }

  const inner = (
    <div className={bare ? "" : "rounded-md overflow-hidden"}>
      <div
        className={`grid gap-4 ${hideStats ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-[3fr_2fr]"}`}
      >
        {/* Left - Calendar / Book a Demo */}
        <div className="bg-white p-5 lg:p-6 rounded-md shadow-sm flex flex-col w-full">
          <div className="w-full flex flex-col">
            <div className="flex-shrink-0 pb-3 mb-3 border-b border-gray-100">
              <h3 className="mb-2 font-heading text-2xl font-medium text-prussian-blue-800 tracking-tight">
                {cta.bookDemoHeading}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base mb-1 balanced">
                {cta.bookDemoDescription}
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
                        onClick={prevMonth}
                        disabled={isPastMonth || isCurrentMonth}
                        className={`p-1.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#1D96FC]/50 ${
                          isPastMonth || isCurrentMonth
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
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
                        {MONTH_NAMES[calMonth]} {calYear}
                      </h4>
                      <button
                        type="button"
                        onClick={nextMonth}
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
                        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                          <div
                            key={i}
                            className="h-7 flex items-center justify-center text-xs font-semibold text-gray-400 tracking-wide"
                          >
                            {day}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-y-2 gap-x-1 flex-1 content-start justify-items-center">
                        {/* Empty offsets for first day of month */}
                        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                          <div
                            key={`empty-${i}`}
                            className="h-8 w-8 lg:w-9 lg:h-9"
                          ></div>
                        ))}
                        {/* Days */}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const day = i + 1;
                          const isSelected =
                            day === selectedDate &&
                            calMonth === selectedMonth &&
                            calYear === selectedYear;
                          const isDayPast = isCurrentMonth && day < todayDate;
                          return (
                            <button
                              key={day}
                              type="button"
                              disabled={isDayPast}
                              onClick={() => {
                                if (isDayPast) return;
                                setSelectedDate(day);
                                setSelectedMonth(calMonth);
                                setSelectedYear(calYear);
                                setStep(2);
                              }}
                              className={`h-8 w-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#1D96FC] ${
                                isDayPast
                                  ? "text-gray-300 cursor-not-allowed"
                                  : isSelected
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
                        {selectedDateLabel}
                      </h4>
                    </div>
                    <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-2 gap-3 content-start pb-2">
                      {times.map((t) => {
                        const past = isTimePast(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            disabled={past}
                            onClick={() => {
                              setSelectedTime(t);
                              setStep(3);
                            }}
                            className={`py-2.5 px-3 border rounded-md text-sm font-medium transition-colors text-center focus:outline-none focus:ring-2 focus:ring-[#1D96FC]/50 ${
                              past
                                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                                : "border-[#1D96FC]/30 text-[#1D96FC] hover:bg-[#1D96FC] hover:text-white"
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
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
                          {selectedDateLabel}, {selectedTime}
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
                          month: selectedMonth,
                          year: selectedYear,
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
                        <label className={LABEL}>Full Name *</label>
                        <input
                          required
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className={INPUT}
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div>
                        <label className={LABEL}>Work Email *</label>
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={INPUT}
                          placeholder="jane@company.com"
                        />
                      </div>
                      <div>
                        <label className={LABEL}>Company *</label>
                        <input
                          required
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className={INPUT}
                          placeholder="Acme Health Group"
                        />
                      </div>
                      <div>
                        <label className={LABEL}>Product of interest *</label>
                        <select
                          required
                          value={product}
                          onChange={(e) => setProduct(e.target.value)}
                          className={INPUT}
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
                          className="w-full rounded-full bg-prussian-blue-800 px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
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
                      We have received your booking request for{" "}
                      <strong>
                        {selectedDateLabel} at {selectedTime}
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

        {/* Right - Logo slider + Stats */}
        {!hideStats && (
          <div className="flex flex-col gap-3 lg:gap-4">
            {/* Logo slider */}
            <div className="rounded-md bg-white p-5 lg:p-6 border border-gray-200 max-w-xl overflow-hidden">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">
                {cta.logoBlockHeading}
              </p>
              <div className="cta-logo-wrap overflow-hidden">
                <div className="cta-logo-track" aria-hidden="true">
                  {[...cta.logos, ...cta.logos].map((logo, i) => (
                    <div
                      key={`${logo.alt}-${i}`}
                      className="flex shrink-0 items-center justify-center"
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4 flex-1">
              {cta.stats.map((stat) => {
                const v = CTA_VARIANT_STYLES[stat.variant];
                return (
                  <div
                    key={stat.label}
                    className={`relative flex h-full flex-col justify-between rounded-md overflow-hidden p-6 lg:p-8 ${v.bgClass}`}
                  >
                    <div className="relative z-10 text-left">
                      <p
                        className={`font-heading text-4xl lg:text-5xl font-medium tracking-tight leading-none ${v.textClass}`}
                      >
                        <AnimatedCounter value={stat.numericValue} />
                        {stat.suffix}
                      </p>
                    </div>
                    <div className="relative z-10 mt-8 text-left lg:mt-10">
                      <p
                        className={`text-xs font-semibold uppercase tracking-widest ${v.labelClass}`}
                      >
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (bare) return inner;

  return (
    <section id="book-demo" className="w-full bg-[#1D96FC] scroll-mt-[140px]">
      <div className="max-w-7xl w-full mx-auto px-6 py-16 lg:py-24">
        {inner}
      </div>
    </section>
  );
}
