// Shared Portable Text helpers for article-style pages (customer stories,
// knowledge hub). Server-safe — no client APIs.

export type PortableBlock = {
  _type?: string;
  style?: string;
  children?: { text?: string }[];
};

export type ArticleSection = { id: string; label: string };

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function blockPlainText(block: PortableBlock | undefined): string {
  if (!block || !Array.isArray(block.children)) return "";
  return block.children
    .map((c) => c?.text ?? "")
    .join("")
    .trim();
}

// Extract h2 headings from a Portable Text body → { id, label }[] for scroll-spy.
export function extractHeadings(body: unknown): ArticleSection[] {
  if (!Array.isArray(body)) return [];
  return (body as PortableBlock[])
    .filter((b) => b?._type === "block" && b?.style === "h2")
    .map((b) => {
      const label = blockPlainText(b);
      return { id: slugify(label), label };
    })
    .filter((h) => h.label && h.id);
}
