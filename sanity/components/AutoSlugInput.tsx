"use client";

import { useEffect, useRef, useState } from "react";
import { set, useFormValue, type SlugInputProps } from "sanity";

const MAX_LENGTH = 96;

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_LENGTH)
    .replace(/-+$/g, "");
}

// Slug that follows the title until someone edits it by hand.
//   Locked (default): shows the URL, auto-updates from the title while the
//   slug still matches the title — so new events never need "Generate".
//   Edit: the standard slug input, for a custom slug. Reset: back to the title.
export function AutoSlugInput(props: SlugInputProps) {
  const { value, onChange, readOnly, renderDefault } = props;
  const title = (useFormValue(["title"]) as string | undefined) ?? "";
  const current = value?.current ?? "";
  const [editing, setEditing] = useState(false);
  const prevTitle = useRef(title);

  useEffect(() => {
    const previous = prevTitle.current;
    prevTitle.current = title;
    if (editing || readOnly || !title) return;
    const next = slugify(title);
    // Follow the title only while the slug is empty or still title-derived.
    if (next !== current && (!current || current === slugify(previous))) {
      onChange(set({ _type: "slug", current: next }));
    }
  }, [title, current, editing, readOnly, onChange]);

  if (editing) {
    return (
      <div style={{ display: "grid", gap: 8 }}>
        {renderDefault(props)}
        <div>
          <button
            type="button"
            onClick={() => setEditing(false)}
            style={linkButton}
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <code style={{ fontSize: 13, opacity: current ? 1 : 0.6 }}>
          /events/{current || "…"}
        </code>
        {!readOnly && (
          <>
            <button
              type="button"
              onClick={() => setEditing(true)}
              style={linkButton}
            >
              Edit
            </button>
            {title && current !== slugify(title) && (
              <button
                type="button"
                onClick={() =>
                  onChange(set({ _type: "slug", current: slugify(title) }))
                }
                style={linkButton}
              >
                Reset to title
              </button>
            )}
          </>
        )}
      </div>
      <span style={{ fontSize: 12, opacity: 0.7 }}>
        Changing the slug of a published event changes its live URL.
      </span>
    </div>
  );
}

const linkButton: React.CSSProperties = {
  background: "none",
  border: 0,
  padding: 0,
  color: "var(--card-link-color, #2276fc)",
  cursor: "pointer",
  fontSize: 13,
};
