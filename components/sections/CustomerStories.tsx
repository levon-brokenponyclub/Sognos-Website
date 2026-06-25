"use client";

import ProductCustomerStories, {
  ALL_STORIES,
} from "./ProductCustomerStories";

export default function CustomerStories() {
  return <ProductCustomerStories stories={ALL_STORIES} />;
}
