"use client";

import { useCallback, type ChangeEvent } from "react";
import { set, unset, type TextInputProps } from "sanity";

// Text input that also accepts an uploaded .html file. Both paths write to the
// same string value, so pasting and uploading are interchangeable.
export function HtmlFileInput(props: TextInputProps) {
  const { onChange, renderDefault, readOnly } = props;

  const handleFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file) return;
      const html = await file.text();
      onChange(html.trim() ? set(html) : unset());
    },
    [onChange],
  );

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <label style={{ fontSize: 13 }}>
        Upload .html file{" "}
        <input
          type="file"
          accept=".html,.htm,text/html"
          disabled={readOnly}
          onChange={handleFile}
        />
      </label>
      {renderDefault(props)}
    </div>
  );
}
