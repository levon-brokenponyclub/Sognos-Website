"use client";

import { useState } from "react";
import { createPreviewSecret } from "@sanity/preview-url-secret/create-secret";
import {
  useClient,
  useCurrentUser,
  type DocumentActionComponent,
} from "sanity";

// "Preview" next to Publish on events. Opens /events/<slug> in a new tab
// with Next.js draft mode on, so the unpublished draft renders. The secret is
// short-lived and checked server-side by /api/draft-mode/enable.
export const PreviewAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion: "2024-01-01" });
  const user = useCurrentUser();
  const [busy, setBusy] = useState(false);
  const doc = (props.draft ?? props.published) as {
    slug?: { current?: string };
  } | null;
  const slug = doc?.slug?.current;

  return {
    label: busy ? "Opening preview…" : "Preview",
    title: slug ? undefined : "Add a slug to preview this event",
    disabled: !slug || busy,
    onHandle: async () => {
      if (!slug) return;
      // Open synchronously so pop-up blockers allow it, then point it at the
      // signed URL once the secret exists.
      const tab = window.open("", "_blank");
      setBusy(true);
      try {
        const origin = window.location.origin;
        const { secret } = await createPreviewSecret(
          client,
          "sognos-studio-preview-action",
          `${origin}/studio`,
          user?.id,
        );
        const url = new URL("/api/draft-mode/enable", origin);
        url.searchParams.set("sanity-preview-secret", secret);
        url.searchParams.set("sanity-preview-pathname", `/events/${slug}`);
        if (tab) tab.location.href = url.toString();
        else window.open(url.toString(), "_blank");
      } catch {
        tab?.close();
        window.alert("Could not start preview. Try again in a moment.");
      } finally {
        setBusy(false);
        props.onComplete();
      }
    },
  };
};
