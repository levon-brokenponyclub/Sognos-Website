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
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-sognos-text-heading tracking-tight">
            Case records have facts. They&apos;re missing people.
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-sognos-text-body">
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
              <h2 className="mb-3 font-heading text-lg font-normal text-sognos-text-heading">
                {point.title}
              </h2>
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
