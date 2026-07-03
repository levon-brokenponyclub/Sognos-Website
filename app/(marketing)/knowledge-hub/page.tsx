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
    publishedAt: p.date ?? null,
    readTime: p.readTime ?? null,
    author: p.author ?? null,
  }));

  return (
    <>
      {/* Hero — light, left-aligned, matches Solutions hero */}
      <section className="bg-white pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-heading text-5xl font-medium tracking-[-0.02em] text-sognos-heading md:text-6xl lg:text-7xl">
            Knowledge Hub
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#4B5563]">
            News, guides, case studies, and product updates - covering care
            operations, workforce scheduling, compliance, and the sectors we
            serve.
          </p>
        </div>
      </section>

      <KnowledgeHubArchive
        articles={articles}
        initialCategory={category ?? null}
      />
    </>
  );
}
