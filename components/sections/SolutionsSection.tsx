import Link from "next/link";
import { SOLUTIONS } from "@/lib/constants";

export default function SolutionsSection() {
  return (
    <section aria-label="Solutions">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <header>
          <h2>Solutions across every part of your operation</h2>
          <p>
            Sognos products power a range of operational solutions — each built
            on the same platform and designed to work together.
          </p>
        </header>

        <ul role="list" aria-label="Available solutions">
          {SOLUTIONS.map((solution) => (
            <li key={solution.slug}>
              <Link href={`/solutions/${solution.slug}`}>
                <article>
                  <h3>{solution.name}</h3>
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
