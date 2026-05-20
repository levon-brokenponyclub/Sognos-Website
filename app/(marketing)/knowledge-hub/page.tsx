import KnowledgeHubArchive from "@/components/sections/KnowledgeHubArchive";

export const metadata = {
  title: "Knowledge Hub — Sognos",
  description:
    "News, guides, case studies, and product updates from the Sognos team. Filter by category, industry, or use case.",
};

export default async function KnowledgeHubPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  return (
    <>
      {/* Hero */}
      <section
        data-header-dark
        className="relative overflow-hidden bg-prussian-blue-950 pb-20 pt-36"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, var(--color-prussian-blue-700) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-white/30 text-white font-medium mb-6">
                <span className="w-2 h-2 bg-[#1D96FC] rounded-full"></span>
                Knowledge Hub
              </div>
          </div>
          <div className="max-w-3xl">
            <h1 className="mb-6 font-heading text-5xl font-normal leading-[1.08] text-white lg:text-6xl">
              Insights for service operations professionals
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/60">
              News, guides, case studies, and product updates — covering care
              operations, workforce scheduling, compliance, and the sectors we
              serve.
            </p>
          </div>
        </div>
      </section>

      <KnowledgeHubArchive initialCategory={category ?? null} />
    </>
  );
}
