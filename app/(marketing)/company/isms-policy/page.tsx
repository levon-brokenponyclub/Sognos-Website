import type { Metadata } from "next";
import { LegalPageRenderer } from "@/components/sections/LegalPageRenderer";
import { getLegalPageBySlug } from "@/lib/sanity/queries";

const SLUG = "isms-policy";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPageBySlug(SLUG);
  if (!page) return {};
  return {
    title: `${page.title} | Sognos`,
    description: page.metaDescription,
  };
}

export default async function ISMSPolicyPage() {
  return <LegalPageRenderer slug={SLUG} />;
}
