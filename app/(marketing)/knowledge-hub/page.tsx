import KnowledgeHubArchive, {
  type Article,
} from "@/components/sections/KnowledgeHubArchive";
import { getKnowledgePostArchive } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export const metadata = {
  title: "Knowledge Hub - Sognos",
  description:
    "News, guides, case studies, and product updates from the Sognos team. Filter by category, industry, or use case.",
};

export const revalidate = 60;

export default async function KnowledgeHubPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const posts = await getKnowledgePostArchive();
  const articles: Article[] = posts.map((p) => ({
    slug: p.slug,
    category: p.category,
    title: p.title,
    excerpt: p.excerpt,
    href: `/knowledge-hub/${p.slug}`,
    image: p.heroImage
      ? urlFor(p.heroImage).width(720).auto("format").url()
      : "",
    industry: p.industry ?? null,
    useCase: p.useCase ?? null,
  }));

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
              News, guides, case studies, and product updates - covering care
              operations, workforce scheduling, compliance, and the sectors we
              serve.
            </p>
          </div>
        </div>
      </section>

      <KnowledgeHubArchive
        articles={articles}
        initialCategory={category ?? null}
      />
    </>
  );
}
