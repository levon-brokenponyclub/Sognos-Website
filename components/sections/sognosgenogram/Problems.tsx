const PAIN_POINTS = [
  {
    title: "Missing relationship context",
    body: "Workers arrive with case facts but no understanding of who is in the client's life, who provides support, and who creates risk. That gap affects every decision they make.",
  },
  {
    title: "Disconnected family picture",
    body: "Information about family dynamics lives in handwritten notes, old files, and people's memory — not in the system where it can inform active service decisions.",
  },
  {
    title: "Context lost between workers",
    body: "When cases change hands, the relational picture doesn't transfer. New workers start from zero, ask the same questions, and miss things the previous worker knew.",
  },
];

export default function GenogramProblems() {
  return (
    <section id="problems" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sognos-text-muted">
              The problem
            </p>
            <h2 className="font-heading text-4xl font-normal text-sognos-text-heading">
              Case records have facts. They&apos;re missing people.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-sognos-text-body lg:justify-self-end">
            Standard case management captures what happened. Sognos Genogram
            captures who is involved — and what those relationships mean for
            service delivery.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {PAIN_POINTS.map((point, i) => (
            <div
              key={i}
              className="rounded-xl border border-(--sognos-card-border) bg-(--sognos-bg-sunken) p-8"
            >
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-prussian-blue-950 text-xs font-semibold text-white">
                {i + 1}
              </div>
              <h3 className="mb-3 font-heading text-lg font-normal text-sognos-text-heading">
                {point.title}
              </h3>
              <p className="text-sm leading-relaxed text-sognos-text-body">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
