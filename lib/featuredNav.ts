import { urlFor } from "@/lib/sanity/image";
import type {
  CustomerStoryArchive,
  KnowledgePostArchive,
} from "@/lib/sanity/queries";
import { UPCOMING_EVENT } from "@/lib/upcomingEvent";

// Featured column of the nav dropdowns, keyed by nav group label. Built
// server-side in the marketing layout and passed into Navbar, which is a client
// component and cannot fetch. Groups with no entry fall back to the gradient
// panel, so adding a group here is all it takes to give it a featured column.
export type FeaturedNavItem = {
  label: string;
  title: string;
  href: string;
  image: string;
  /** Promo variant only — the supporting line under the title. */
  description?: string;
};

// "list" is the stacked thumbnail rows; "promo" is a single image-backed block
// with the title and an arrow over it.
export type FeaturedNavGroup = {
  variant: "list" | "promo";
  items: FeaturedNavItem[];
};

export type FeaturedNavMap = Record<string, FeaturedNavGroup>;

const THUMB_WIDTH = 400;

// Title is the page's own h1 copy so the menu and destination agree.
const SOCIAL_RESPONSIBILITY: FeaturedNavItem = {
  label: "Company",
  title: "Our commitment to community and planet",
  href: "/company/social-responsibility",
  image: "/images/about/social-responsibility-hero-img.webp",
  description: "Making a difference where we live, work, and do business.",
};

function storyItem(
  stories: CustomerStoryArchive[],
): FeaturedNavItem | null {
  // Archive is ordered date desc, so index 0 is the latest.
  const story = stories[0];
  if (!story?.heroImage) return null;
  return {
    label: "Customer Story",
    title: story.title,
    href: `/customer-stories/${story.slug}`,
    image: urlFor(story.heroImage).width(THUMB_WIDTH).auto("format").url(),
  };
}

export function buildFeaturedNav(
  posts: KnowledgePostArchive[],
  stories: CustomerStoryArchive[],
): FeaturedNavMap {
  const story = storyItem(stories);

  // ── Knowledge Hub — latest insight, latest story, upcoming event ──────────
  const knowledgeHub: FeaturedNavItem[] = [];
  const post = posts[0];
  if (post?.heroImage) {
    knowledgeHub.push({
      label: post.category || "Insight",
      title: post.title,
      href: `/knowledge-hub/${post.slug}`,
      image: urlFor(post.heroImage).width(THUMB_WIDTH).auto("format").url(),
    });
  }
  if (story) knowledgeHub.push(story);
  knowledgeHub.push({
    label: "Event",
    title: UPCOMING_EVENT.title,
    href: UPCOMING_EVENT.href,
    image: UPCOMING_EVENT.image,
  });

  return {
    "Knowledge Hub": { variant: "list", items: knowledgeHub },
    // Why Sognos is a single image-backed promo rather than a list — one
    // statement of what the company stands for, not a feed.
    "Why Sognos": { variant: "promo", items: [SOCIAL_RESPONSIBILITY] },
  };
}
