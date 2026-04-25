import KnowledgeHubArchive from "@/components/sections/KnowledgeHubArchive";

export const metadata = {
  title: "Knowledge Hub — Sognos",
  description:
    "News, guides, case studies, and product updates from the Sognos team. Filter by category, industry, or use case.",
};

export default function KnowledgeHubPage() {
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
            <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
              Knowledge Hub
            </span>
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

      <KnowledgeHubArchive />
    </>
  );
}
