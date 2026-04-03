import Link from "next/link";

type Industry = {
  name: string;
  slug: string;
  description: string;
  products: string[];
};

const industries: Industry[] = [
  {
    name: "Health & Social Care",
    slug: "health-social-care",
    description:
      "Coordinate complex care packages, manage multi-disciplinary teams, and maintain the compliance records that commissioners and regulators require.",
    products: ["SognosCare", "SognosRoster"],
  },
  {
    name: "NDIS & Aged Care",
    slug: "ndis-aged-care",
    description:
      "Manage participant plans, track support delivery against funding, and schedule your workforce to meet rostering obligations — all within a single compliant system.",
    products: ["SognosCare", "SognosRoster"],
  },
  {
    name: "Facilities Management",
    slug: "facilities",
    description:
      "Dispatch field technicians efficiently, track job completion, and manage SLAs across multiple clients and sites in real time.",
    products: ["SognosRoster"],
  },
  {
    name: "Local Government",
    slug: "local-government",
    description:
      "Deliver community services at scale — managing cases, scheduling frontline workers, and generating the audit trails that public accountability demands.",
    products: ["SognosCare", "SognosRoster"],
  },
  {
    name: "Industrial Services",
    slug: "industrial",
    description:
      "Coordinate skilled trades across sites, enforce compliance credentials in scheduling, and track service delivery against contractual obligations.",
    products: ["SognosRoster"],
  },
];

type IndustrySectionProps = {
  showAll?: boolean;
};

export default function IndustrySection({ showAll = false }: IndustrySectionProps) {
  const displayed = showAll ? industries : industries;

  return (
    <section aria-label="Industries">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <header>
          <h2>Built for complex service environments</h2>
          <p>
            Sognos is designed for organisations that manage high-volume, compliance-heavy service
            delivery — where the cost of scheduling errors and reporting gaps is significant.
          </p>
        </header>

        <ul role="list" aria-label="Supported industries">
          {displayed.map((industry) => (
            <li key={industry.slug}>
              <Link href={`/industries/${industry.slug}`}>
                <article>
                  <h3>{industry.name}</h3>
                  <p>{industry.description}</p>
                  <footer>
                    <ul role="list" aria-label="Products used">
                      {industry.products.map((product) => (
                        <li key={product}>{product}</li>
                      ))}
                    </ul>
                    <span aria-hidden="true">Explore {industry.name} →</span>
                  </footer>
                </article>
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/industries">View all industries</Link>
      </div>
    </section>
  );
}
