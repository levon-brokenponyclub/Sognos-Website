type Logo = { src: string; alt: string };

const LOGO_GROUPS: { id: string; one: Logo; two: Logo }[] = [
  {
    id: "g1",
    one: { src: "/logos/aceternity-ui.png", alt: "Aceternity UI" },
    two: { src: "/logos/aceternity-ui.png", alt: "Aceternity UI" },
  },
  {
    id: "g2",
    one: { src: "/logos/asteroid-kit.png", alt: "Asteroid Kit" },
    two: { src: "/logos/asteroid-kit.png", alt: "Asteroid Kit" },
  },
  {
    id: "g3",
    one: { src: "/logos/gamity.png", alt: "Gamity" },
    two: { src: "/logos/gamity.png", alt: "Gamity" },
  },
  {
    id: "g4",
    one: { src: "/logos/hostit.png", alt: "Host IT" },
    two: { src: "/logos/hostit.png", alt: "Host IT" },
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
                  className="max-h-12 w-auto max-w-full object-contain"
                />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="trust-strip-item absolute inset-0 flex items-center justify-center two">
                <img
                  src={group.two.src}
                  alt={group.two.alt}
                  className="max-h-12 w-auto max-w-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
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
                  className="max-h-12 w-auto max-w-full object-contain"
                />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div className="trust-strip-item absolute inset-0 flex items-center justify-center two">
                <img
                  src={group.two.src}
                  alt={group.two.alt}
                  className="max-h-12 w-auto max-w-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
