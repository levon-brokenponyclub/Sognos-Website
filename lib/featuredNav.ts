import { urlFor } from "@/lib/sanity/image";
import type { EventListing, KnowledgePostArchive } from "@/lib/sanity/queries";

// Featured column of the nav dropdowns, keyed by nav group label. Built
// server-side in the marketing layout and passed into Navbar, which is a client
// component and cannot fetch. Groups with no entry fall back to the gradient
// panel, so adding a group here is all it takes to give it a featured column.
export type FeaturedNavItem = {
  label: string;
  title: string;
  href: string;
  image: string;
  /** Promo and useCase variants only — the supporting line under the title. */
  description?: string;
  /** useCase variant only — the asset behind the second action. */
  downloadHref?: string;
};

// "list" is the stacked thumbnail rows; "promo" is a single image-backed block
// with the title and an arrow over it; "useCase" is a promo carrying two
// actions, so a downloadable asset is reachable from the menu itself.
export type FeaturedNavGroup = {
  variant: "list" | "promo" | "useCase";
  items: FeaturedNavItem[];
  /** Which side of the link columns the block sits on. Defaults to the end,
   *  which is where every group put it before Knowledge Hub needed it first. */
  position?: "start" | "end";
  /** A second block, always after the link columns. Knowledge Hub uses it for
   *  featured posts while its image block leads. */
  trailingItems?: FeaturedNavItem[];
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

// Featured on Solutions. Flourish is the only story with a downloadable asset,
// which is the whole reason it earns the slot — the PDF is the conversion
// event, and it is one click from the menu rather than buried on the story
// page. Worth revisiting the moment a second story gets one, since this is a
// Health & Social Care story standing in front of Solutions.
//
// Copy is lifted from ALL_STORIES in ProductCustomerStories so the menu and the
// story agree; the file is the static asset rather than Sanity's `downloadUrl`,
// which would mean fetching the story just to build a nav card.
const FLOURISH_USE_CASE: FeaturedNavItem = {
  label: "Featured use case",
  title: "Flourish Australia: transforming service operations",
  href: "/customer-stories/flourish-australia",
  image: "/images/customers/flourish-australia.avif",
  description:
    "Supporting people with lived experience of mental health issues to live fulfilling, independent lives.",
  downloadHref: "/customer-stories/Sognos_Flourish_Customer-Story.pdf",
};

// Three rows, as the column has always had.
const FEATURED_ROWS = 3;

export function buildFeaturedNav(
  posts: KnowledgePostArchive[],
  events: EventListing[],
): FeaturedNavMap {
  // ── Knowledge Hub — one image block, leading the dropdown ─────────────────
  // A single card for the section rather than a feed of three. The dropdown
  // already lists the four sections beside it, so repeating individual posts
  // here duplicated the menu rather than adding to it.
  //
  // The image is the newest post's hero: it keeps the card alive as content is
  // published, and there is no dedicated Knowledge Hub asset yet. A purpose-made
  // one would be better — this borrows a post's image to stand for the section.
  const post = posts[0];
  const knowledgeHub: FeaturedNavItem[] = [
    {
      label: "Knowledge Hub",
      title: "Knowledge Hub",
      href: "/knowledge-hub",
      description: "News, insights, events and milestones from Sognos.",
      image: post?.heroImage
        ? urlFor(post.heroImage).width(THUMB_WIDTH).auto("format").url()
        : "",
    },
  ];

  // ── Column 3 — the featured feed ──────────────────────────────────────────
  // A mix of what the hub actually holds, each row labelled with its type,
  // rather than a run of articles. Newest post first, then the next event, then
  // more posts to fill the three rows — so the column still fills when there is
  // nothing upcoming, the way the customer story used to drop out of it.
  //
  // Customer stories are deliberately absent: they were taken out of this
  // dropdown along with the Customer Stories link, and they have their own
  // archive. The event comes from Sanity rather than the hardcoded
  // `UPCOMING_EVENT` the column originally used.
  const postItems: FeaturedNavItem[] = posts
    .filter((p) => p.heroImage)
    .map((p) => ({
      label: p.category || "Article",
      title: p.title,
      href: `/knowledge-hub/${p.slug}`,
      image: urlFor(p.heroImage!).width(THUMB_WIDTH).auto("format").url(),
    }));

  const event = events.find((e) => e.heroImage);
  const featuredFeed: FeaturedNavItem[] = [];
  if (postItems[0]) featuredFeed.push(postItems[0]);
  if (event) {
    featuredFeed.push({
      // `format` is the event's own eyebrow — "Webinar", "Breakfast event" —
      // so the row says what it is rather than flattening everything to "Event".
      label: event.format,
      title: event.title,
      href: `/events/${event.slug}`,
      image: urlFor(event.heroImage!).width(THUMB_WIDTH).auto("format").url(),
    });
  }
  featuredFeed.push(...postItems.slice(1));

  return {
    "Knowledge Hub": {
      variant: "promo",
      items: knowledgeHub,
      position: "start",
      trailingItems: featuredFeed.slice(0, FEATURED_ROWS),
    },
    // Why Sognos is a single image-backed promo rather than a list — one
    // statement of what the company stands for, not a feed.
    "Why Sognos": { variant: "promo", items: [SOCIAL_RESPONSIBILITY] },
    // Solutions previously ended in the gradient placeholder. Industries does
    // not appear here: it ends in the product suite column instead.
    Solutions: { variant: "useCase", items: [FLOURISH_USE_CASE] },
  };
}
