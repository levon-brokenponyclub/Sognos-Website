"use client";

import ProductCustomerStories, {
  ALL_STORIES,
} from "@/components/layout/sections/ProductCustomerStories";

// Renders the Shape-3 customer-story carousel filtered to one industry.
// Client wrapper so `ALL_STORIES` (a value exported from the "use client"
// ProductCustomerStories module) resolves correctly — importing it into the
// Server page directly would yield a client reference. Hides when nothing
// matches (no empty state).
export default function IndustryCustomerStories({
  industryName,
}: {
  industryName: string;
}) {
  const stories = ALL_STORIES.filter((s) => s.industry === industryName);
  if (stories.length === 0) return null;
  return <ProductCustomerStories stories={stories} />;
}
