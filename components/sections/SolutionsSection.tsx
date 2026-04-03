import Link from "next/link";

type SolutionCard = {
  title: string;
  description: string;
  slug: string;
};

const solutions: SolutionCard[] = [
  {
    title: "Field Service",
    description: "Manage field technician dispatch, job tracking, and SLA compliance at scale.",
    slug: "field-service",
  },
  {
    title: "Customer Relationship Management",
    description: "Centralise client records, interactions, and service history in one system.",
    slug: "customer-relationship-management",
  },
  {
    title: "Customer Insights",
    description: "Surface patterns in service demand, outcomes, and client behaviour.",
    slug: "customer-insights",
  },
  {
    title: "Customer Experience",
    description: "Deliver consistent, high-quality service interactions across every touchpoint.",
    slug: "customer-experience",
  },
  {
    title: "Customer Service",
    description: "Resolve issues faster with unified case management and response tracking.",
    slug: "customer-service",
  },
  {
    title: "Power Platform",
    description: "Extend and automate your operations with low-code tools built into the platform.",
    slug: "power-platform",
  },
  {
    title: "Quick Start",
    description: "Get up and running with Sognos in weeks — not months.",
    slug: "quick-start",
  },
];

export default function SolutionsSection() {
  return (
    <section aria-label="Solutions">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <header>
          <h2>Solutions across every part of your operation</h2>
          <p>
            Sognos products power a range of operational solutions — each built on the same platform
            and designed to work together.
          </p>
        </header>

        <ul role="list" aria-label="Available solutions">
          {solutions.map((solution) => (
            <li key={solution.slug}>
              <Link href={`/solutions/${solution.slug}`}>
                <article>
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
