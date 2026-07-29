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
  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 w-9 items-center justify-center rounded bg-white p-2 text-sognos-navy transition-colors hover:bg-sognos-navy/15"
        aria-label="Share on LinkedIn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 25 24"
          fill="none"
          className="h-4 w-4"
        >
          <path
            d="M7.44 5C7.44 5.81 6.95 6.55 6.19 6.85 5.44 7.16 4.57 6.98 4.01 6.39 3.44 5.81 3.28 4.94 3.61 4.19 3.94 3.45 4.69 2.98 5.5 3c1.08.03 1.94.92 1.94 2ZM7.5 8.48H3.5V21h4V8.48Zm6.32 0H9.84V21h3.82v-6.57c0-3.66 4.77-3.96 4.77 0V21H22.5v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z"
            fill="currentColor"
          />
        </svg>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${postUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 w-9 items-center justify-center rounded bg-white p-2 text-sognos-navy transition-colors hover:bg-sognos-navy/15"
        aria-label="Share on X"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 21 20"
          fill="none"
          className="h-4 w-4"
        >
          <path
            d="M15.67 1.875H18.43L12.4 8.758l7.09 9.367h-5.55L9.6 12.444l-4.97 5.681H1.87l6.44-7.363L1.51 1.875H7.2l3.93 5.192 4.54-5.192Zm-.97 15.6h1.53L6.37 3.438H4.73l10.97 14.037Z"
            fill="currentColor"
          />
        </svg>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 w-9 items-center justify-center rounded bg-white p-2 text-sognos-navy transition-colors hover:bg-sognos-navy/15"
        aria-label="Share on Facebook"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4"
        >
          <path
            d="M14 13.5h2.5l1-4H14V7.5c0-1.03 0-2 2-2H17.5V2.14C17.17 2.1 15.94 2 14.64 2 11.93 2 10 3.66 10 6.7V9.5H7v4h3V22h4v-8.5Z"
            fill="currentColor"
          />
        </svg>
      </a>
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
