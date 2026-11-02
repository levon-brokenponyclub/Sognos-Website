import Image from "next/image";
import Link from "next/link";
import { LAYOUT, TYPE } from "@/components/layout/sections/sognoscare/typeScale";
import { formatDate } from "@/lib/formatDate";
import { FOCUS, type KhPost } from "./types";

// Milestones · option 1 "Rows": date and title, clamped excerpt, a thumbnail
// that slides in on hover and a round arrow button, between hairlines.

export default function KhMilestones({ posts }: { posts: KhPost[] }) {
  if (posts.length === 0) return null;
  return (
    <section data-kh-section="milestones" className={`${LAYOUT.anchor} bg-white ${LAYOUT.section}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className={`${TYPE.h2} text-sognos-heading`}>
            Milestones
            <span className="ml-3 align-middle text-base text-sognos-muted tabular-nums">{posts.length}</span>
          </h2>
          <Link
            href="/knowledge-hub/category/milestones"
            className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border border-sognos-line bg-white px-4 text-sm font-medium text-sognos-heading transition-colors hover:border-sognos-heading ${FOCUS}`}
          >
            View all posts <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <ul className={`${LAYOUT.gap} border-t border-sognos-line`}>
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={p.href}
                className={`group relative grid grid-cols-1 items-center gap-3 border-b border-sognos-line px-2 py-7 transition-colors hover:bg-sognos-tint md:grid-cols-[minmax(0,26rem)_minmax(0,1fr)_auto] md:gap-8 md:px-4 ${FOCUS}`}
              >
                <div>
                  {p.publishedAt && <p className="text-xs text-sognos-muted">{formatDate(p.publishedAt)}</p>}
                  <h3 className={`mt-1 ${TYPE.h3Small} text-balance text-sognos-heading md:text-xl`}>{p.title}</h3>
                </div>
                <p className={`line-clamp-2 max-w-[52ch] ${TYPE.small} text-sognos-body`}>{p.excerpt}</p>
                <span className="flex items-center gap-6">
                  <span className="pointer-events-none relative hidden aspect-[7/4] w-56 translate-x-3 overflow-hidden rounded opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none lg:block">
                    {p.image && <Image src={p.image} alt="" fill sizes="224px" className="object-cover" />}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex size-11 items-center justify-center rounded-full border border-sognos-line text-sognos-heading transition-colors group-hover:border-sognos-blue-accent group-hover:bg-sognos-blue-accent group-hover:text-white"
                  >
                    &rarr;
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
