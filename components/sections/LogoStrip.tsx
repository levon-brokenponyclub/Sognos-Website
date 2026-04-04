type Logo = { src: string; alt: string };

const LOGO_GROUPS: { id: string; one: Logo; two: Logo }[] = [
  {
    id: "g1",
    one: {
      src: "https://cms.chroniclehq.com/wp-content/uploads/2026/02/OpenAI-1.svg",
      alt: "OpenAI",
    },
    two: {
      src: "https://cms.chroniclehq.com/wp-content/uploads/2026/02/Ramp-1.svg",
      alt: "Ramp",
    },
  },
  {
    id: "g2",
    one: {
      src: "https://cms.chroniclehq.com/wp-content/uploads/2026/02/Sephora-1.svg",
      alt: "Sephora",
    },
    two: {
      src: "https://cms.chroniclehq.com/wp-content/uploads/2026/02/Apple-1.svg",
      alt: "Apple",
    },
  },
  {
    id: "g3",
    one: {
      src: "https://cms.chroniclehq.com/wp-content/uploads/2026/02/Adobe-1.svg",
      alt: "Adobe",
    },
    two: {
      src: "https://cms.chroniclehq.com/wp-content/uploads/2026/02/Vercel-1.svg",
      alt: "Vercel",
    },
  },
  {
    id: "g4",
    one: {
      src: "https://cms.chroniclehq.com/wp-content/uploads/2026/02/Figma-1.svg",
      alt: "Figma",
    },
    two: {
      src: "https://cms.chroniclehq.com/wp-content/uploads/2026/02/Descript-1.svg",
      alt: "Descript",
    },
  },
  {
    id: "g5",
    one: {
      src: "https://cms.chroniclehq.com/wp-content/uploads/2026/02/Hubspot-1.svg",
      alt: "Hubspot",
    },
    two: {
      src: "https://cms.chroniclehq.com/wp-content/uploads/2026/02/Meta-1.svg",
      alt: "Meta",
    },
  },
  {
    id: "g6",
    one: {
      src: "https://cms.chroniclehq.com/wp-content/uploads/2026/02/Atlassian-1.svg",
      alt: "Atlassian",
    },
    two: {
      src: "https://cms.chroniclehq.com/wp-content/uploads/2026/02/TikTok.svg",
      alt: "TikTok",
    },
  },
];

export default function LogoStrip() {
  return (
    <section aria-label="Trusted organisations" className="w-full bg-white p-0">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center border-x border-dashed border-sognos-border-subtle text-center p-0">
        {/*  <p className="text-sm font-semibold uppercase text-body">
          Trusted by leading organisations
        </p> */}

        {/* Logo grid */}
        <div className="flex w-full items-center justify-between gap-8">
          {LOGO_GROUPS.map((group) => (
            <div
              key={group.id}
              className="trust-strip-group relative flex flex-1 items-center justify-center border-r border-dashed border-sognos-border-subtle"
              style={{ height: 130 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="trust-strip-item absolute inset-0 flex items-center justify-center one">
                <img
                  src={group.one.src}
                  alt={group.one.alt}
                  className="h-full w-auto max-h-full max-w-full object-cover"
                />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="trust-strip-item absolute inset-0 flex items-center justify-center two">
                <img
                  src={group.two.src}
                  alt={group.two.alt}
                  className="h-full w-auto max-h-full max-w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
