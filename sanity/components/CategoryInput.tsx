"use client";

import type { StringInputProps } from "sanity";

// "Newsletter" stays in the schema's options.list so Sanity's built-in list
// validation accepts it on newsletters, but it is hidden from the radio so
// regular Knowledge Hub posts cannot select it.
export function CategoryInput(props: StringInputProps) {
  const options = props.schemaType.options;
  const list = (options?.list ?? []).filter(
    (item) => (typeof item === "string" ? item : item.value) !== "Newsletter",
  );
  return props.renderDefault({
    ...props,
    schemaType: { ...props.schemaType, options: { ...options, list } },
  });
}
