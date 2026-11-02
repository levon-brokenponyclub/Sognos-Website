"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TYPE } from "@/components/layout/sections/sognoscare/typeScale";
import { formatDate } from "@/lib/formatDate";
import { FOCUS, KH_TABS, newsletterLinkProps, type KhPost, type KhTabId } from "./types";

// Category filter · option 2 "Tabs" (sticky under the navbar) + Posts ·
// option 2 "Mixed grid": the first post as a large overlaid card, then
// bordered cards. Twelve show until "Load more"; a search shows every match.

const VISIBLE = 12;

function meta(p: KhPost) {
  return [p.author ?? "Sognos Solutions", p.publishedAt ? formatDate(p.publishedAt) : null, p.readTime]
    .filter(Boolean)
    .join(" · ");
}

function BigCard({ post }: { post: KhPost }) {
  return (
    <Link
      href={post.href}
      {...newsletterLinkProps(post.category)}
      className={`group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-lg bg-sognos-care-dark md:col-span-2 md:row-span-2 ${FOCUS}`}
    >
      {post.imageLarge && (
        <Image
          src={post.imageLarge}
          alt=""
          fill
          sizes="(min-width: 768px) 66vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
        />
      )}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-sognos-care-dark/90 via-sognos-care-dark/30 to-transparent"
      />
      <div className="relative p-6 md:p-8">
        <p className={`${TYPE.small} text-white/75`}>{post.category}</p>
        <h3 className={`mt-2 ${TYPE.h3} text-balance text-white`}>{post.title}</h3>
        <p className="mt-3 text-xs text-white/75">{meta(post)}</p>
      </div>
    </Link>
  );
}

function Card({ post }: { post: KhPost }) {
  return (
    <Link
      href={post.href}
      {...newsletterLinkProps(post.category)}
      className={`group flex flex-col rounded-lg border border-sognos-line bg-white p-3 transition-colors hover:border-sognos-heading ${FOCUS}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded bg-sognos-tint">
        {post.image && (
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
        <p className="text-xs font-medium tracking-widest text-sognos-roster-ink uppercase">{post.category}</p>
        <h3 className={`mt-2 ${TYPE.h3Small} text-balance text-sognos-heading`}>{post.title}</h3>
        <p className="mt-auto pt-4 text-xs text-sognos-muted">{meta(post)}</p>
      </div>
    </Link>
  );
}

export default function KhPostGrid({
  posts,
  tab,
  onTab,
  searching,
}: {
  /** Already filtered by tab and search. */
  posts: KhPost[];
  tab: KhTabId;
  onTab: (t: KhTabId) => void;
  searching: boolean;
}) {
  const [open, setOpen] = useState(false);
  const shown = open || searching ? posts : posts.slice(0, VISIBLE);

  return (
    <>
      <div data-kh-band className="sticky top-20 z-20 border-b border-sognos-line bg-white/95 backdrop-blur">
        <div
          role="tablist"
          aria-label="Filter posts by category"
          className="scrollbar-hide mx-auto flex max-w-7xl gap-8 overflow-x-auto px-6"
        >
          {KH_TABS.map((t) => {
            const selected = t.id === tab;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => {
                  onTab(t.id);
                  setOpen(false);
                }}
                className={`relative min-h-11 shrink-0 py-4 text-sm transition-colors ${FOCUS} ${
                  selected
                    ? "text-sognos-heading after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-sognos-blue-accent"
                    : "text-sognos-muted hover:text-sognos-heading"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <section data-kh-section="posts" className="scroll-mt-36 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          {shown.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {shown.map((post, i) =>
                i === 0 ? <BigCard key={post.slug} post={post} /> : <Card key={post.slug} post={post} />,
              )}
            </div>
          ) : (
            <p className="py-16 text-center text-sognos-body">No articles match that search.</p>
          )}
          {!open && !searching && posts.length > VISIBLE && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className={`min-h-11 rounded-full border border-sognos-line px-6 text-sm font-medium text-sognos-heading transition-colors hover:border-sognos-heading ${FOCUS}`}
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
