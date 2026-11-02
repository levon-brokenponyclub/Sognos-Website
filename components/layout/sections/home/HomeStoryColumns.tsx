"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { LAYOUT, TYPE } from "@/components/layout/sections/sognoscare/typeScale";
import { ALL_STORIES } from "@/components/layout/sections/ProductCustomerStories";

// Home · Customer Stories — Inspector option D "Expanding stories"
// (2026-11-02): story photos as columns on navy. On desktop the active
// column (first by default, then whichever is hovered or focused) widens and
// reveals its quote and author. Stacked and fully open below lg.

const STORIES = ALL_STORIES.filter((s) => s.quote).slice(0, 4);

export default function HomeStoryColumns() {
  const [active, setActive] = useState(0);

  return (
    <section className={`bg-sognos-navy text-white ${LAYOUT.section}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-3xl flex-col gap-4">
            <SectionLabel tone="dark">Customer Stories</SectionLabel>
            <h2 className={`${TYPE.h2} text-white`}>Proof from the people who run it</h2>
          </div>
          <Link
            href="/customer-stories"
            className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            See more customer stories
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        </div>
        <div
          className="mt-12 flex flex-col gap-3 lg:h-[480px] lg:flex-row lg:gap-4"
          onMouseLeave={() => setActive(0)}
        >
          {STORIES.map((st, i) => {
            const open = i === active;
            return (
              <Link
                key={st.company}
                href={st.href}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-lg border border-white/10 transition-[flex-grow] duration-600 ease-[cubic-bezier(.22,1,.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none lg:min-h-0 lg:flex-1"
                style={{ flexGrow: open ? 3 : 1 }}
              >
                <Image
                  src={st.panelImage}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-sognos-navy via-sognos-navy/45 to-transparent"
                />
                <div className="relative flex flex-col gap-4 p-5 lg:p-7">
                  <p className={`${TYPE.h3Small} text-white`}>{st.company}</p>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-400 motion-reduce:transition-none ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0"
                    }`}
                  >
                    <div className="flex flex-col gap-4 overflow-hidden">
                      <blockquote className="line-clamp-5 text-base leading-relaxed text-white/90">
                        &ldquo;{st.quote}&rdquo;
                      </blockquote>
                      <p className="text-xs text-white/75">
                        {st.author} &middot; {st.role}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
