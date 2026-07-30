"use client";

import { Check, Forward, LinkIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  company?: string;
  description?: string;
  customer?: string;
  industry?: string;
  state?: string;
  size?: string;
  product?: string;
  downloadUrl?: string;
};

// ─── Share icons ──────────────────────────────────────────────────────────────

export function ShareIcons({ postUrl }: { postUrl: string }) {
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!shareOpen) return;

    function onPointerDown(event: PointerEvent) {
      if (
        shareRef.current &&
        !shareRef.current.contains(event.target as Node)
      ) {
        setShareOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setShareOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [shareOpen]);

  const showCopiedState = () => {
    setCopied(true);

    if (copiedTimeoutRef.current) {
      clearTimeout(copiedTimeoutRef.current);
    }

    copiedTimeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 1800);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      showCopiedState();
      setShareOpen(false);
    } catch {
      window.prompt("Copy link", postUrl);
    }
  };

  const encodedPostUrl = encodeURIComponent(postUrl);
  const buttonBase =
    "inline-flex size-10 cursor-pointer items-center justify-center rounded-sm text-sognos-navy transition-colors duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sognos-blue-accent";
  const buttonIdle = "bg-gray-100 hover:bg-gray-200";
  const buttonActive = "bg-[#c8c2ff] hover:bg-[#b9b1ff]";

  const shareLinks = [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedPostUrl}`,
      icon: (
        <svg viewBox="0 0 21 20" fill="none" className="size-5">
          <path
            d="M15.67 1.875H18.43L12.4 8.758l7.09 9.367h-5.55L9.6 12.444l-4.97 5.681H1.87l6.44-7.363L1.51 1.875H7.2l3.93 5.192 4.54-5.192Zm-.97 15.6h1.53L6.37 3.438H4.73l10.97 14.037Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedPostUrl}`,
      icon: (
        <svg viewBox="0 0 25 24" fill="none" className="size-5">
          <path
            d="M7.44 5C7.44 5.81 6.95 6.55 6.19 6.85 5.44 7.16 4.57 6.98 4.01 6.39 3.44 5.81 3.28 4.94 3.61 4.19 3.94 3.45 4.69 2.98 5.5 3c1.08.03 1.94.92 1.94 2ZM7.5 8.48H3.5V21h4V8.48Zm6.32 0H9.84V21h3.82v-6.57c0-3.66 4.77-3.96 4.77 0V21H22.5v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedPostUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="size-5">
          <path
            d="M14 13.5h2.5l1-4H14V7.5c0-1.03 0-2 2-2H17.5V2.14C17.17 2.1 15.94 2 14.64 2 11.93 2 10 3.66 10 6.7V9.5H7v4h3V22h4v-8.5Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex items-start gap-2">
      <div className="relative">
        <button
          type="button"
          onClick={copyLink}
          className={`${buttonBase} ${copied ? buttonActive : buttonIdle}`}
          aria-label="Copy link"
        >
          <LinkIcon aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </button>
        <div
          className={`absolute left-0 top-full z-30 mt-2 w-max transition-all duration-150 ${
            copied
              ? "translate-x-0 opacity-100"
              : "pointer-events-none -translate-x-2 opacity-0"
          }`}
          aria-live="polite"
        >
          <div className="rounded-sm bg-[#e7e4ff] px-3 py-2 text-sognos-blue-accent shadow-sm">
            <div className="flex items-center gap-2">
              <Check
                aria-hidden="true"
                className="size-3.5"
                strokeWidth={1.75}
              />
              <span className="text-sm font-medium">Copied link</span>
            </div>
          </div>
        </div>
      </div>
      <div ref={shareRef} className="relative">
        <button
          type="button"
          onClick={() => setShareOpen((open) => !open)}
          className={`${buttonBase} ${shareOpen ? buttonActive : buttonIdle}`}
          aria-label="Share this article"
          aria-haspopup="true"
          aria-expanded={shareOpen}
        >
          <Forward aria-hidden="true" className="size-5" strokeWidth={1.75} />
        </button>
        <div
          className={`absolute left-0 top-full z-30 mt-4 w-64 rounded-lg border border-sognos-line bg-white p-3 shadow-xl shadow-sognos-navy/10 transition-all duration-150 sm:left-auto sm:right-0 ${
            shareOpen
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1">
            {shareLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShareOpen(false)}
                className="flex items-center gap-5 rounded px-4 py-3 text-lg font-medium text-sognos-navy transition-colors duration-150 hover:bg-gray-50 active:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sognos-blue-accent"
              >
                <span className="flex size-6 items-center justify-center">
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sticky content rail ───────────────────────────────────────────────────────

export default function StoryMetaRail({
  company,
  description,
  customer,
  industry,
  state,
  size,
  product,
  downloadUrl,
}: Props) {
  const meta = [
    { label: "Customer", value: customer },
    { label: "Industry", value: industry },
    { label: "State", value: state },
    { label: "Size", value: size },
    { label: "Product", value: product },
  ].filter((m) => m.value);

  return (
    <aside className="mb-12 lg:sticky lg:top-[104px] lg:mb-0 lg:self-start">
      {(company || description) && (
        <>
          {company && (
            <h3 className="font-heading text-lg font-medium leading-snug text-sognos-heading">
              {company}
            </h3>
          )}
          {description && (
            <p className="mt-3 text-sm leading-relaxed text-sognos-body/60">
              {description}
            </p>
          )}
          <div className="my-6 h-px bg-sognos-line" />
        </>
      )}

      <div className="flex flex-col gap-6">
        {meta.map((m) => (
          <div key={m.label}>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-sognos-muted">
              {m.label}
            </p>
            <p className="text-sm font-medium text-sognos-body">{m.value}</p>
          </div>
        ))}
      </div>

      {downloadUrl && (
        <>
          <div className="my-6 h-px bg-sognos-line" />
          <a
            href={downloadUrl}
            download
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-sognos-navy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sognos-navy-dark"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 shrink-0"
            >
              <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
              <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
            </svg>
            Download Customer Story
          </a>
        </>
      )}
    </aside>
  );
}
