type LogoStripProps = {
  heading?: string;
  logos?: { name: string; id: string }[];
};

const defaultLogos = [
  { id: "microsoft", name: "Microsoft" },
  { id: "client-1", name: "Client 1" },
  { id: "client-2", name: "Client 2" },
  { id: "client-3", name: "Client 3" },
  { id: "client-4", name: "Client 4" },
];

export default function LogoStrip({
  heading = "Trusted by leading organisations",
  logos = defaultLogos,
}: LogoStripProps) {
  return (
    <section aria-label="Trusted organisations">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p>{heading}</p>
        <div role="list" aria-label="Organisation logos">
          {logos.map((logo) => (
            <div key={logo.id} role="listitem" aria-label={logo.name}>
              {/* Logo image slot — replace with <Image /> in Phase 5 */}
              <span>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
