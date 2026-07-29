"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

export type KnowledgeHubSearchItem = {
  href: string;
  title: string;
  category: string;
  meta: string;
  image: string;
  keywords?: Array<string | null | undefined>;
};

export function KnowledgeHubSearchDialog({
  items,
  recentItems,
}: {
  items: KnowledgeHubSearchItem[];
  recentItems: KnowledgeHubSearchItem[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleItems = normalizedQuery
    ? items
        .filter((item) =>
          [item.title, item.category, item.meta, ...(item.keywords ?? [])]
            .filter(Boolean)
            .some((value) => value?.toLowerCase().includes(normalizedQuery)),
        )
        .slice(0, 8)
    : recentItems;

  function closeDialog() {
    setIsOpen(false);
    setQuery("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-sognos-line bg-gray-100 text-sognos-heading transition-colors hover:bg-sognos-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sognos-blue-accent"
        aria-label="Search the Knowledge Hub"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999] h-dvh w-screen overflow-y-auto bg-black/35 px-4 py-16 backdrop-blur-sm md:px-10 md:py-20"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeDialog();
            }}
          >
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={closeDialog}
              className="fixed top-4 right-4 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/90 text-sognos-heading shadow-sm transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:top-6 md:right-6 md:size-12"
              aria-label="Close search"
            >
              <X className="size-5" aria-hidden="true" />
            </motion.button>

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="knowledge-hub-search-title"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-lg bg-white text-left shadow-2xl"
            >
              <h2 id="knowledge-hub-search-title" className="sr-only">
                Search the Knowledge Hub
              </h2>

              <div className="relative border-b border-sognos-line">
                <Search
                  className="pointer-events-none absolute top-1/2 left-6 size-5 -translate-y-1/2 text-sognos-heading"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search articles, events and customer stories"
                  autoFocus
                  className="h-20 w-full bg-white pr-16 pl-16 text-base text-sognos-body outline-none placeholder:text-sognos-muted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sognos-blue-accent"
                  aria-label="Search the Knowledge Hub"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute top-1/2 right-5 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-sognos-muted hover:bg-gray-100 hover:text-sognos-heading"
                    aria-label="Clear search"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              <div className="max-h-[min(640px,calc(100dvh-12rem))] overflow-y-auto p-6">
                <p className="pb-4 text-sm font-medium text-sognos-heading">
                  {normalizedQuery ? "Search results" : "Recents"}
                </p>

                {visibleItems.length > 0 ? (
                  <ol className="border-t border-sognos-line">
                    {visibleItems.map((item) => (
                      <li key={`${item.category}-${item.href}`}>
                        <Link
                          href={item.href}
                          onClick={closeDialog}
                          className="group grid grid-cols-[96px_1fr] gap-4 border-b border-sognos-line py-4 sm:grid-cols-[180px_1fr] sm:gap-6 sm:py-5"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden rounded bg-gray-100 sm:aspect-[2/1]">
                            {item.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={item.image}
                                alt=""
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="h-full w-full bg-gray-100" />
                            )}
                          </div>

                          <div className="min-w-0 self-center">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded bg-gray-100 px-2 py-1 text-xs text-sognos-body">
                                {item.category}
                              </span>
                              <span className="text-xs font-medium tracking-wide text-sognos-muted uppercase">
                                {item.meta}
                              </span>
                            </div>
                            <h3 className="mt-2 font-heading text-base font-normal leading-snug text-sognos-heading transition-colors group-hover:text-sognos-blue-accent sm:text-lg">
                              {item.title}
                            </h3>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <div className="border-t border-sognos-line py-12 text-center">
                    <p className="font-heading text-lg text-sognos-heading">
                      No results found
                    </p>
                    <p className="mt-2 text-sm text-sognos-muted">
                      Try another title, topic, industry, or content type.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
