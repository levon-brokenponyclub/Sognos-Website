import Link from "next/link";
import { PRODUCTS } from "@/lib/constants";

export default function GenogramIntegration() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-2xl bg-prussian-blue-950 px-10 py-14 lg:px-14 lg:py-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
            Better together
          </p>
          <h2 className="mb-5 max-w-2xl font-heading text-3xl font-normal text-white lg:text-4xl">
            Context that lives inside the case, not beside it
          </h2>
          <p className="mb-12 max-w-xl text-base leading-relaxed text-white/60">
            Sognos Genogram is designed to work alongside SognosCare. Relationship
            maps sit directly inside case records — no separate system, no
            copy-pasting, no version mismatch.
          </p>

          {/* Flow */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0">
            {/* Genogram node */}
            <div className="flex flex-col gap-2 rounded-xl border border-[#92278d]/30 bg-[#92278d]/10 px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#92278d]">
                Sognos Genogram
              </p>
              <p className="text-sm text-white/60">
                Family map · support network · risk tags · historical snapshots
              </p>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center px-4 py-2 sm:py-0">
              <svg
                className="h-5 w-5 rotate-90 text-white/20 sm:rotate-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>

            {/* SognosCare node */}
            <div className="flex flex-col gap-2 rounded-xl border border-(--sognos-edition-green)/30 bg-(--sognos-edition-green)/10 px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-(--sognos-edition-green)">
                SognosCare
              </p>
              <p className="text-sm text-white/60">
                Case record · service plan · compliance · outcome reporting
              </p>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href={PRODUCTS.care.href}
              className="text-sm font-medium text-(--sognos-edition-green) transition-opacity duration-200 hover:opacity-80"
            >
              Explore SognosCare →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
