import Link from "next/link";
import { PRODUCTS } from "@/lib/constants";

type ProductCardProps = {
  name: string;
  tagline: string;
  description: string;
  href: string;
  features: string[];
  ctaLabel: string;
  relatedProduct: { name: string; href: string };
};

function ProductCard({
  name,
  tagline,
  description,
  href,
  features,
  ctaLabel,
  relatedProduct,
}: ProductCardProps) {
  return (
    <article aria-label={name}>
      <header>
        <h3>{name}</h3>
        <p>{tagline}</p>
      </header>
      <p>{description}</p>
      <ul role="list" aria-label={`${name} capabilities`}>
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <footer>
        <Link href={href}>{ctaLabel}</Link>
        <p>
          Works with{" "}
          <Link href={relatedProduct.href}>{relatedProduct.name}</Link>
        </p>
      </footer>
    </article>
  );
}

export default function ProductSection() {
  return (
    <section aria-label="Products">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <header>
          <h2>Built around your products</h2>
          <p>
            SognosCare and SognosRoster are purpose-built products — designed to work independently
            or together as a unified service operations platform.
          </p>
        </header>

        <div>
          <ProductCard
            name={PRODUCTS.care.name}
            tagline={PRODUCTS.care.tagline}
            description="SognosCare gives service organisations the structure to manage cases, track service delivery, and demonstrate compliance — without the spreadsheets and manual reporting."
            href={PRODUCTS.care.href}
            features={[
              "Case management and service tracking",
              "Compliance documentation and audit trails",
              "Outcome recording and reporting",
              "Funding and budget management",
              "Client and participant records",
            ]}
            ctaLabel="Explore SognosCare"
            relatedProduct={{ name: PRODUCTS.roster.name, href: PRODUCTS.roster.href }}
          />

          <ProductCard
            name={PRODUCTS.roster.name}
            tagline={PRODUCTS.roster.tagline}
            description="SognosRoster eliminates the complexity of workforce scheduling — matching the right staff to the right services, automatically, in real time."
            href={PRODUCTS.roster.href}
            features={[
              "Intelligent staff allocation and rostering",
              "Real-time schedule optimisation",
              "Travel and route planning",
              "Availability and compliance matching",
              "Shift conflict detection and resolution",
            ]}
            ctaLabel="Explore SognosRoster"
            relatedProduct={{ name: PRODUCTS.care.name, href: PRODUCTS.care.href }}
          />
        </div>

        <aside aria-label="Product relationship">
          <p>
            <strong>{PRODUCTS.care.name}</strong> manages the services.{" "}
            <strong>{PRODUCTS.roster.name}</strong> coordinates the workforce that delivers them.
            Together, they give you end-to-end control of your service operation.
          </p>
        </aside>
      </div>
    </section>
  );
}
