"use client";

import { useState } from "react";
import {
  getPublishedId,
  useDocumentOperation,
  useFormValue,
  type BooleanInputProps,
} from "sanity";
import { FutureOnlyToggle, isEventPast } from "./FutureOnlyToggle";

// "Registration open" toggle with the Register URL inside the same block.
// The URL is stored at `eventMeta.registerUrl` (prod reads it there), so it is
// written with a document patch rather than this input's own onChange. The
// nested field itself is hidden in the schema.
export function RegistrationOpenInput(props: BooleanInputProps) {
  const id = useFormValue(["_id"]) as string;
  const type = useFormValue(["_type"]) as string;
  const stored =
    (useFormValue(["eventMeta", "registerUrl"]) as string | undefined) ?? "";
  const past = isEventPast(useFormValue(["date"]), useFormValue(["endDate"]));
  const { patch } = useDocumentOperation(getPublishedId(id), type);

  // Local draft so typing doesn't patch on every keystroke; null = untouched.
  const [draft, setDraft] = useState<string | null>(null);
  const text = draft ?? stored;
  const invalid = text !== "" && !/^https?:\/\/\S+$/.test(text);

  const commit = () => {
    if (draft === null || draft === stored) return setDraft(null);
    patch.execute(
      draft
        ? [
            { setIfMissing: { eventMeta: {} } },
            { set: { "eventMeta.registerUrl": draft } },
          ]
        : [{ unset: ["eventMeta.registerUrl"] }],
    );
    setDraft(null);
  };

  const showUrl = props.value !== false && !past;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <FutureOnlyToggle {...props} />
      {showUrl && (
        <div style={{ display: "grid", gap: 6, paddingLeft: 2 }}>
          <label
            htmlFor={`${props.id}-register-url`}
            style={{ fontSize: 13, fontWeight: 600 }}
          >
            Register URL
          </label>
          <span style={{ fontSize: 12, opacity: 0.7 }}>
            Where the Register button sends people, e.g. the Dynamics event
            form.
          </span>
          <input
            id={`${props.id}-register-url`}
            type="url"
            value={text}
            readOnly={props.readOnly}
            placeholder="https://"
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => e.key === "Enter" && commit()}
            style={{
              padding: "8px 10px",
              borderRadius: 3,
              border: `1px solid ${invalid ? "#e5484d" : "var(--card-border-color, #ccc)"}`,
              background: "var(--card-bg-color, transparent)",
              color: "inherit",
              font: "inherit",
            }}
          />
          {invalid && (
            <span style={{ fontSize: 12, color: "#e5484d" }}>
              Enter a full URL starting with http:// or https://
            </span>
          )}
          {!text && !invalid && (
            <span style={{ fontSize: 12, color: "#d97706" }}>
              No URL yet — the Register button won&rsquo;t show until one is
              added.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
