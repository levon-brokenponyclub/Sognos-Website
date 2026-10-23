"use client";

import { useEffect } from "react";
import { set, useFormValue, type BooleanInputProps } from "sanity";

/** True once the event's end (or start, when there is no end) has passed. */
export function isEventPast(date?: unknown, endDate?: unknown): boolean {
  const end = typeof endDate === "string" ? endDate : date;
  return typeof end === "string" && Date.parse(end) < Date.now();
}

// Toggle that can only be on while the event is in the future. On a past event
// it is read-only and, if still on, switches itself off when the document is
// opened (the change is published with the editor's next publish).
export function FutureOnlyToggle(props: BooleanInputProps) {
  const { value, onChange, readOnly, renderDefault } = props;
  const past = isEventPast(useFormValue(["date"]), useFormValue(["endDate"]));

  useEffect(() => {
    if (past && value === true && !readOnly) onChange(set(false));
  }, [past, value, readOnly, onChange]);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {renderDefault({ ...props, readOnly: readOnly || past })}
      {past && (
        <span style={{ fontSize: 12, opacity: 0.7 }}>
          This event has ended — it can only be switched on for a future date.
        </span>
      )}
    </div>
  );
}
