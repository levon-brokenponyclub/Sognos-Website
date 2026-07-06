// Accent-stripe pull-quote for mid-body emphasis. Renders inside the article
// prose column (inherits its max-width) — no width classes here.
export default function PullQuote({
  text,
  author,
  role,
}: {
  text?: string;
  author?: string;
  role?: string;
}) {
  if (!text) return null;
  return (
    <div className="my-10 border-l-2 border-sognos-blue-accent pl-6">
      <p className="font-heading text-xl font-medium leading-snug tracking-tight text-sognos-heading md:text-2xl">
        {text}
      </p>
      {(author || role) && (
        <div className="mt-5">
          {author && (
            <p className="text-sm font-semibold text-sognos-heading">{author}</p>
          )}
          {role && (
            <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-sognos-muted">
              {role}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
