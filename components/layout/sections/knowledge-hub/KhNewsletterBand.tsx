import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import { LAYOUT, TYPE } from "@/components/layout/sections/sognoscare/typeScale";
import { formatDate } from "@/lib/formatDate";
import type { KhPost } from "./types";

// Newsletter band · option 1 "Dark band": heading and the latest edition's
// excerpt, then a frosted card with that edition and an email field.
//
// No sign-up backend exists yet. The form does not submit anywhere and does
// not claim a subscription — wire it to the chosen provider before launch.

const HEADING = "Get The Sognos Pulse";

export default function KhNewsletterBand({ latest }: { latest?: KhPost }) {
  if (!latest) return null;
  return (
    <section className={`relative overflow-hidden bg-sognos-care-dark text-white ${LAYOUT.section}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 70% at 85% 30%, rgba(29,150,252,.28), transparent 70%), radial-gradient(45% 60% at 10% 90%, rgba(59,111,224,.3), transparent 70%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <SectionLabel tone="dark">Newsletter</SectionLabel>
          <h2 className={`mt-4 ${TYPE.h2} text-white`}>{HEADING}</h2>
          <p className={`mt-4 ${TYPE.lede} text-white/75`}>{latest.excerpt}</p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur">
            <a
              href={latest.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[7rem_1fr] items-center gap-4 rounded bg-white/5 p-2 pr-4 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
            >
              <span className="relative block aspect-[14/9] overflow-hidden rounded bg-white/10">
                {latest.image && <Image src={latest.image} alt="" fill sizes="112px" className="object-cover" />}
              </span>
              <span className="min-w-0">
                <span className="block text-xs tracking-widest text-white/60 uppercase">
                  Latest edition{latest.publishedAt && <> &middot; {formatDate(latest.publishedAt)}</>}
                </span>
                <span className="mt-1 block truncate text-base text-white group-hover:text-sognos-blue-accent">
                  {latest.title}
                </span>
              </span>
            </a>
            <div className="p-3 pt-5">
              {/* A div, not a form, until there is somewhere to submit to. */}
              <div className="flex flex-col gap-2 sm:flex-row">
                <label className="flex-1">
                  <span className="sr-only">Email address</span>
                  <input
                    type="email"
                    placeholder="Work email"
                    className="h-12 w-full rounded-full border border-white/25 bg-white/10 px-5 text-sm text-white outline-none placeholder:text-white/60 focus:border-white/60"
                  />
                </label>
                <button
                  type="button"
                  className="h-12 shrink-0 rounded-full bg-white px-6 text-sm font-medium text-sognos-heading transition-colors hover:bg-sognos-blue-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Subscribe
                </button>
              </div>
              <p className="mt-3 text-xs text-white/60">One email per edition. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
