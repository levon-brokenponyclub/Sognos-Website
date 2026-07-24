const PAIN_POINTS = [
  {
    title: "Missing relationship context",
    body: "Workers arrive with case facts but no understanding of who is in the client's life, who provides support, and who creates risk. That gap affects every decision they make.",
  },
  {
    title: "Disconnected family picture",
    body: "Information about family dynamics lives in handwritten notes, old files, and people's memory - not in the system where it can inform active service decisions.",
  },
  {
    title: "Context lost between workers",
    body: "When cases change hands, the relational picture doesn't transfer. New workers start from zero, ask the same questions, and miss things the previous worker knew.",
  },
];

export default function GenogramProblems() {
  return (
    <section id="problems" className="bg-sognos-genogram-dark pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-white tracking-tight">
            Case records have facts. They're missing people.
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-white/60">
            Standard case management captures what happened. SognosGenogram
            captures who is involved — and what those relationships mean for
            service delivery.
          </p>
        </div>

        <div className="grid gap-3 lg:gap-4 md:grid-cols-3">
          {PAIN_POINTS.map((point, i) => (
            <div
              key={i}
              className="rounded-lg border border-white/10 bg-white/5 p-8"
            >
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-sognos-genogram-base/30 text-xs font-semibold text-sognos-genogram-base">
                {i + 1}
              </div>
              <h3 className="mb-3 font-heading text-lg font-medium text-white">
                {point.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
