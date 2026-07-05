import KnowledgeHubArchive, {
  type Article,
} from "@/components/layout/sections/KnowledgeHubArchive";
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
    <KnowledgeHubArchive
      articles={articles}
      initialCategory={category ?? null}
      title="Knowledge Hub"
      description="News, guides, case studies, and product updates - covering care operations, workforce scheduling, compliance, and the sectors we serve."
    />
  );
}
