type Logo = { src: string; alt: string };

const LOGOS: Logo[] = [
  { src: "/logos/clients/client-01.png", alt: "Sognos client" },
  { src: "/logos/clients/asc-secom.png", alt: "ASC Secom" },
  { src: "/logos/clients/client-03.webp", alt: "Sognos client" },
  { src: "/logos/clients/nci.webp", alt: "NCI" },
  { src: "/logos/clients/countplus.png", alt: "CountPlus" },
  { src: "/logos/clients/water-nsw.webp", alt: "Water NSW" },
  { src: "/logos/clients/sa.webp", alt: "Sognos client" },
  { src: "/logos/clients/mcs.webp", alt: "MCS" },
  { src: "/logos/clients/neca.webp", alt: "NECA" },
  { src: "/logos/clients/nps.webp", alt: "NPS" },
  { src: "/logos/clients/deloitte.webp", alt: "Deloitte" },
  { src: "/logos/clients/apm.webp", alt: "APM" },
];

// Duplicate for seamless infinite loop (-50% = one full set)
const TRACK = [...LOGOS, ...LOGOS];

export default function LogoStrip() {
  return (
    <section
      aria-label="Trusted organisations"
      className="w-full overflow-hidden bg-white py-10 border-b border-dashed border-sognos-border-subtle"
    >
      {/*  <h4 className="font-heading text-lg text-center my-1 font-semibold text-brand">
        Trusted by Leading Companies
      </h4> */}
      <div className="trust-marquee-wrap">
        <div className="trust-marquee-track" aria-hidden="true">
          {TRACK.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center px-2"
              style={{ minWidth: 260 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-14 w-auto max-w-[190px] object-contain"
                style={{ filter: "brightness(0) opacity(0.8)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
