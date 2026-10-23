"use client";

import { useEffect, useRef, useState } from "react";
import { set, useFormValue, type ObjectInputProps } from "sanity";

// Wraps the event's `eventMeta` object:
//   1. An address search (Photon / OpenStreetMap — free, no key) that fills
//      Venue address lines on select.
//   2. Google Maps embed + directions URLs generated from the address. They
//      follow the address only while empty or still auto-generated, so a
//      hand-edited URL is never overwritten.

type Meta = {
  venueAddress?: string[];
  mapsEmbedUrl?: string;
  mapsDirectionsUrl?: string;
};

type PhotonFeature = {
  properties: {
    name?: string;
    housenumber?: string;
    street?: string;
    city?: string;
    locality?: string;
    district?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
};

const PHOTON_URL = "https://photon.komoot.io/api/";
// Bias results towards Sydney — the audience is Australian.
const BIAS = { lat: "-33.87", lon: "151.21" };
const MIN_QUERY = 4;
const DEBOUNCE_MS = 350;

export const mapsEmbedUrl = (address: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
export const mapsDirectionsUrl = (address: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

function toLines(f: PhotonFeature): string[] {
  const p = f.properties;
  const street = [p.housenumber, p.street].filter(Boolean).join(" ");
  const line1 = [p.name && p.name !== p.street && !/^\d/.test(p.name) ? p.name : null, street]
    .filter(Boolean)
    .join(", ");
  const line2 = [
    p.city ?? p.locality ?? p.district,
    [p.state, p.postcode].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");
  return [line1, line2].filter(Boolean);
}

export function EventVenueInput(props: ObjectInputProps) {
  const { onChange, readOnly, renderDefault } = props;
  const value = (props.value ?? {}) as Meta;
  const mode = useFormValue(["mode"]);
  const format = useFormValue(["format"]);
  const online = mode === "online" || (!mode && format === "Webinar");

  const address = (value.venueAddress ?? []).filter(Boolean).join(", ");
  const prevAddress = useRef(address);

  // Keep the map URLs in step with the address.
  useEffect(() => {
    const previous = prevAddress.current;
    prevAddress.current = address;
    if (readOnly || online || !address || address === previous) return;
    if (!value.mapsEmbedUrl || value.mapsEmbedUrl === mapsEmbedUrl(previous)) {
      onChange(set(mapsEmbedUrl(address), ["mapsEmbedUrl"]));
    }
    if (
      !value.mapsDirectionsUrl ||
      value.mapsDirectionsUrl === mapsDirectionsUrl(previous)
    ) {
      onChange(set(mapsDirectionsUrl(address), ["mapsDirectionsUrl"]));
    }
  }, [
    address,
    online,
    readOnly,
    value.mapsEmbedUrl,
    value.mapsDirectionsUrl,
    onChange,
  ]);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PhotonFeature[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    if (query.trim().length < MIN_QUERY) return;
    const controller = new AbortController();
    const t = setTimeout(async () => {
      setStatus("loading");
      try {
        const url = `${PHOTON_URL}?${new URLSearchParams({
          q: query,
          limit: "5",
          lang: "en",
          ...BIAS,
        })}`;
        const res = await fetch(url, { signal: controller.signal });
        const json = (await res.json()) as { features?: PhotonFeature[] };
        setResults(json.features ?? []);
        setStatus("idle");
      } catch (e) {
        if ((e as Error).name !== "AbortError") setStatus("error");
      }
    }, DEBOUNCE_MS);
    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [query]);

  // Short queries show nothing rather than stale results.
  const visible = query.trim().length >= MIN_QUERY ? results : [];

  const choose = (f: PhotonFeature) => {
    onChange(set(toLines(f), ["venueAddress"]));
    setQuery("");
    setResults([]);
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {!online && !readOnly && (
        <div style={{ display: "grid", gap: 6, position: "relative" }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Find address</label>
          <span style={{ fontSize: 12, opacity: 0.7 }}>
            Search to fill Venue address lines — the Google Maps links fill in
            automatically.
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. 1 Denison Street, North Sydney"
            style={{
              padding: "8px 10px",
              borderRadius: 3,
              border: "1px solid var(--card-border-color, #ccc)",
              background: "var(--card-bg-color, transparent)",
              color: "inherit",
              font: "inherit",
            }}
          />
          {status === "loading" && (
            <span style={{ fontSize: 12, opacity: 0.6 }}>Searching…</span>
          )}
          {status === "error" && (
            <span style={{ fontSize: 12, color: "#e5484d" }}>
              Address search unavailable — type the lines below instead.
            </span>
          )}
          {visible.length > 0 && (
            <ul
              role="listbox"
              style={{
                listStyle: "none",
                margin: 0,
                padding: 4,
                border: "1px solid var(--card-border-color, #ccc)",
                borderRadius: 3,
                background: "var(--card-bg-color, #fff)",
              }}
            >
              {visible.map((f, i) => {
                const lines = toLines(f);
                return (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => choose(f)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "6px 8px",
                        background: "none",
                        border: 0,
                        color: "inherit",
                        cursor: "pointer",
                        font: "inherit",
                        fontSize: 13,
                      }}
                    >
                      {lines.join(", ") || f.properties.name}
                      {f.properties.country && (
                        <span style={{ opacity: 0.6 }}>
                          {" "}
                          · {f.properties.country}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
      {renderDefault(props)}
    </div>
  );
}
