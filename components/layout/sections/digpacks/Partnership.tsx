import Image from "next/image";

// Sits where the other product pages carry ProductTrustStrip: the proof here is
// the partnership itself, not Sognos's client logos.
const PARTNERS = [
  {
    name: "DigPacks",
    logo: "/images/digpacks/digpacks-logo-full.webp",
    width: 1470,
    height: 353,
    copy: "NHS and public-sector experience in Microsoft Power Platform, automation, Copilot and AI.",
  },
  {
    name: "Sognos",
    logo: "/logos/sognos-logo.svg",
    width: 110,
    height: 30,
    copy: "Local health and care expertise. Microsoft delivery, integration and change support.",
  },
];

export default function DigPacksPartnership() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 border-y border-sognos-line md:grid-cols-2 md:divide-x md:divide-sognos-line">
          {PARTNERS.map((p) => (
            <div key={p.name} className="flex flex-col gap-5 px-6 py-10 md:px-10">
              <Image
                src={p.logo}
                alt={p.name}
                width={p.width}
                height={p.height}
                className="h-8 w-auto self-start"
              />
              <p className="max-w-md text-base leading-relaxed text-sognos-body">
                {p.copy}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Image
            src="/logos/Microsoft-Solutions-Partner-Logo.webp"
            alt="Microsoft Solutions Partner"
            width={200}
            height={80}
            className="h-12 w-auto"
          />
          <p className="text-xs font-semibold uppercase tracking-widest text-sognos-muted">
            Both accredited Microsoft Solutions Partners
          </p>
        </div>
      </div>
    </section>
  );
}
