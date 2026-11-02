import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  LAYOUT,
  TYPE,
} from "@/components/layout/sections/sognoscare/typeScale";

// Related solutions — Solutions Inspector option B (2026-11-02): list rows on
// navy, label in the rail. Shows the page's three curated related solutions.
// On desktop the solution's hero image slides in beside the arrow on hover.

export type RelatedItem = {
  slug: string;
  name: string;
  body: string;
  image: string;
};

export default function SolutionRelated({ items }: { items: RelatedItem[] }) {
  return (
    <section className={`bg-sognos-navy ${LAYOUT.section}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={LAYOUT.rail}>
          <div className={LAYOUT.railLabel}>
            <SectionLabel tone="dark" sticky>
              Solutions
            </SectionLabel>
          </div>
          <div className={LAYOUT.content}>
            <div className={LAYOUT.head}>
              <h2 className={`${TYPE.h2} text-white`}>
                Extend your operation further
              </h2>
            </div>
            <ul className={`${LAYOUT.gap} border-t border-white/20`}>
              {items.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/solutions/${item.slug}`}
                    className="group relative grid grid-cols-1 items-center gap-3 border-b border-white/20 px-2 py-7 transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)_auto] md:gap-8 md:px-4"
                  >
                    <h3 className={`${TYPE.h3} text-white`}>{item.name}</h3>
                    <p className={`line-clamp-2 max-w-[52ch] ${TYPE.small} text-white/75`}>
                      {item.body}
                    </p>
                    <span className="flex items-center gap-6">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none relative hidden h-32 w-56 translate-x-3 overflow-hidden rounded opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none lg:block"
                      >
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="224px"
                          className="object-cover"
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors group-hover:border-sognos-blue-accent group-hover:bg-sognos-blue-accent"
                      >
                        &rarr;
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
