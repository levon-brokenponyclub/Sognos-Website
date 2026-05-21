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
        className="relative overflow-hidden bg-gradient-hero pb-18 pt-40"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-6 flex flex-col items-center text-center">
          <div className="">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-sm border-white/30 text-white font-medium mb-6">
              <span className="w-2 h-2 bg-[#1D96FC] rounded-full"></span>
              Knowledge Hub
            </div>
          </div>
          <div className="max-w-5xl text-center">
            <h1 className="mx-auto mb-6 max-w-5xl font-heading text-3xl font-normal leading-heading tracking-heading text-white sm:text-5xl lg:text-5xl">
              Insights for service operations professionals
            </h1>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/80">
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
