import Link from "next/link";
import Image from "next/image";

// Cohere Home slot: "Your sovereign AI workplace" — full-bleed product card.
// Full width · bg image · 50/50 · Col 1: logo (top) / title + text + button (bottom) · Col 2: product image.
export default function SognosCareCard() {
  return (
    <section className="relative w-full overflow-hidden bg-prussian-blue-900">
      {/* Full-bleed product background */}
      <Image
        src="/images/home/SognosCare-bg.avif"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Product screenshot — bleeds off the right edge (desktop) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] items-start pt-28 lg:flex lg:pt-40">
        <Image
          src="/images/home/SognosCareImg.png"
          alt="SognosCare automations interface"
          width={720}
          height={708}
          className="w-full max-w-none translate-x-[6%] rounded-lg border border-white/10"
        />
      </div>

      {/* Col 1 — content */}
      <div className="relative flex min-h-[560px] flex-col justify-between gap-y-12 px-6 pt-28 pb-12 sm:px-10 lg:min-h-[720px] lg:w-1/2 lg:pt-40 lg:pb-16 lg:pl-16">
        <Image
          src="/logos/sognos-care-logo.svg"
          alt="SognosCare"
          width={160}
          height={56}
          className="h-14 w-auto self-start"
        />

        <div className="max-w-md">
          <h2 className="font-heading text-4xl font-normal leading-[1.05] tracking-tight text-white text-balance lg:text-5xl">
            Your sovereign care platform
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/85">
            From intake to outcome — case management, compliance, and service
            delivery in one structured system, built on Microsoft Dynamics 365.
          </p>
          <Link
            href="/products/sognoscare"
            className="mt-7 inline-flex w-fit items-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-medium text-prussian-blue-900 transition-opacity hover:opacity-90"
          >
            Explore SognosCare
            <svg className="size-3" viewBox="0 0 12 13" fill="none" aria-hidden="true">
              <path
                d="M0.75 6.46875H11.25M11.25 6.46875L6 11.7188M11.25 6.46875L6 1.21875"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Product screenshot — stacked (mobile) */}
      <div className="relative px-6 pb-12 sm:px-10 lg:hidden">
        <Image
          src="/images/home/SognosCareImg.png"
          alt="SognosCare automations interface"
          width={720}
          height={708}
          className="w-full rounded-lg border border-white/10"
        />
      </div>
    </section>
  );
}
