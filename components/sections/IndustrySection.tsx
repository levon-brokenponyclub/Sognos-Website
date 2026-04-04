import Link from "next/link";
import { INDUSTRIES } from "@/lib/constants";

type IndustrySectionProps = {
  showAll?: boolean;
};

export default function IndustrySection({
  showAll = false,
}: IndustrySectionProps) {
  // Alignment note: Industry cards now read from shared constants so taxonomy and slugs
  // stay consistent with docs, footer, and future routing work.
  const displayed = showAll ? INDUSTRIES : INDUSTRIES;

  return (
    <section aria-label="Industries">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <header>
          <h2>Built for complex service environments</h2>
          <p>
            Sognos is designed for organisations that manage high-volume,
            compliance-heavy service delivery — where the cost of scheduling
            errors and reporting gaps is significant.
          </p>
        </header>

        <ul role="list" aria-label="Supported industries">
          {displayed.map((industry) => (
            <li key={industry.slug}>
              <Link href={industry.href}>
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
