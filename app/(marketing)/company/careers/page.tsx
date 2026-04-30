import type { Metadata } from "next";
import LifeAtSognos from "@/components/sections/LifeAtSognos";
import OpenRoles from "@/components/sections/OpenRoles";

export const metadata: Metadata = {
  title: "Careers | Sognos",
  description:
    "Join a community of passionate individuals driving innovation in service operations. Explore opportunities at Sognos.",
};

// ─── Data ────────────────────────────────────────────────────────────────────

// Row 1, col 1 = section title. Cols 2-3 + row 2 = 5 benefit items.
const BENEFITS = [
  {
    title: "Engage with empathy",
    body: "Have empathy and a deep understanding for your peers and our customers. No ego — actively listen to each other.",
  },
  {
    title: "Volunteer assistance",
    body: "Helping others is always a priority, even when it isn't immediately related to our own goals. We foster inclusiveness.",
  },
  {
    title: "Expect authenticity",
    body: "We do not compromise our values when it comes to our team and our customers. Be yourself.",
  },
  {
    title: "Own it",
    body: "We're all company owners and we act like it. We jump at the opportunity to be accountable and take action.",
  },
  {
    title: "Build with purpose",
    body: "We're collectively building the platform and company we're proud of. We always strive to improve and sweat the details.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CareersPage() {
  return (
    <main className="w-full bg-white">

      {/* Hero */}
      <section className="bg-prussian-blue-800 w-full">
        <div className="max-w-7xl w-full mx-auto px-6 py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50 mb-4">
            Careers
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-medium text-white tracking-tight max-w-3xl">
            Join Sognos to drive innovation together.
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed">
            We&apos;re not just a company — we&apos;re a community of passionate
            individuals committed to driving innovation and creating positive
            change.
          </p>
        </div>
      </section>

      {/* Our People — Our Planet: 3×2 grid, title in row-1 col-1 */}
      <section className="w-full border-b border-sognos-border-subtle bg-slate-50">
        <div className="max-w-7xl w-full mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3">

            {/* Row 1, Col 1 — section title */}
            <div className="border-t border-dashed border-sognos-border-subtle md:border-r p-8 flex items-start">
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-prussian-blue-800 tracking-tight leading-snug">
                Our People —{" "}
                <span className="text-sognos-text-muted">Our Planet</span>
              </h2>
            </div>

            {/* Row 1, Cols 2–3 */}
            {BENEFITS.slice(0, 2).map((b, i) => (
              <div
                key={b.title}
                className={`border-t border-dashed border-sognos-border-subtle p-8 ${
                  i === 0 ? "md:border-r" : ""
                }`}
              >
                <p className="font-heading text-base font-semibold text-prussian-blue-800">
                  {b.title}
                </p>
                <p className="mt-2 text-sm text-sognos-text-body leading-relaxed">
                  {b.body}
                </p>
              </div>
            ))}

            {/* Row 2, Cols 1–3 */}
            {BENEFITS.slice(2).map((b, i) => (
              <div
                key={b.title}
                className={`border-t border-dashed border-sognos-border-subtle p-8 ${
                  i < 2 ? "md:border-r" : ""
                }`}
              >
                <p className="font-heading text-base font-semibold text-prussian-blue-800">
                  {b.title}
                </p>
                <p className="mt-2 text-sm text-sognos-text-body leading-relaxed">
                  {b.body}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Life at Sognos — tabs | image | quote */}
      <LifeAtSognos />

      {/* Open roles */}
      <OpenRoles />

      {/* Equal opportunity */}
      <section className="w-full">
        <div className="max-w-7xl w-full mx-auto px-6 py-16">
          <p className="text-sm text-sognos-text-muted max-w-2xl leading-relaxed">
            At Sognos we strive to create an environment of equal opportunity
            regardless of race, gender, sexual orientation, gender identity or
            expression, lifestyle, age, religion, or physical ability.
          </p>
        </div>
      </section>

    </main>
  );
}
