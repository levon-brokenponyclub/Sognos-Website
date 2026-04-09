"use client";

import { useState, useEffect } from "react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import Link from "next/link";

// ─── Palette data ─────────────────────────────────────────────────────────────

const PRUSSIAN_BLUE = [
  { stop: 50,  hex: "#eaeefb" }, { stop: 100, hex: "#d5def6" },
  { stop: 200, hex: "#abbded" }, { stop: 300, hex: "#819be4" },
  { stop: 400, hex: "#577adb" }, { stop: 500, hex: "#2d59d2" },
  { stop: 600, hex: "#2447a8" }, { stop: 700, hex: "#1b357e" },
  { stop: 800, hex: "#122454" }, { stop: 900, hex: "#09122a" },
  { stop: 950, hex: "#060c1d" },
];

const CORNFLOWER_OCEAN = [
  { stop: 50,  hex: "#e6f6fe" }, { stop: 100, hex: "#cdedfe" },
  { stop: 200, hex: "#9bdbfd" }, { stop: 300, hex: "#69c9fc" },
  { stop: 400, hex: "#37b6fb" }, { stop: 500, hex: "#05a4fa" },
  { stop: 600, hex: "#0483c8" }, { stop: 700, hex: "#036396" },
  { stop: 800, hex: "#024264" }, { stop: 900, hex: "#012132" },
  { stop: 950, hex: "#011723" },
];

const DODGER_BLUE = [
  { stop: 50,  hex: "#e6f3ff" }, { stop: 100, hex: "#cde7fe" },
  { stop: 200, hex: "#9bcffd" }, { stop: 300, hex: "#68b7fd" },
  { stop: 400, hex: "#36a0fc" }, { stop: 500, hex: "#0488fb" },
  { stop: 600, hex: "#036dc9" }, { stop: 700, hex: "#025197" },
  { stop: 800, hex: "#023664" }, { stop: 900, hex: "#011b32" },
  { stop: 950, hex: "#011323" },
];

const SLATE_BG = [
  { stop: 0,   hex: "#ffffff", label: "white" },
  { stop: 50,  hex: "#f8fafc", label: "50" },
  { stop: 100, hex: "#f1f5f9", label: "100" },
  { stop: 200, hex: "#e2e8f0", label: "200" },
  { stop: 300, hex: "#cbd5e1", label: "300" },
];

const HEADING_STOPS = PRUSSIAN_BLUE;

const BODY_STOPS = [
  { stop: 500, hex: "#64748b", label: "slate-500" },
  { stop: 600, hex: "#475569", label: "slate-600" },
  { stop: 700, hex: "#334155", label: "slate-700" },
  { stop: 800, hex: "#1e293b", label: "slate-800" },
];

// Background stops — whites, slates, brand tints, accent tints
const BG_STOPS = [
  { stop: 0,   hex: "#ffffff",  label: "white" },
  { stop: 50,  hex: "#f8fafc",  label: "sl-50" },
  { stop: 100, hex: "#f1f5f9",  label: "sl-100" },
  { stop: 200, hex: "#e2e8f0",  label: "sl-200" },
  { stop: 300, hex: "#cbd5e1",  label: "sl-300" },
  { stop: 400, hex: "#94a3b8",  label: "sl-400" },
  { stop: 10,  hex: "#eaeefb",  label: "br-50" },
  { stop: 11,  hex: "#d5def6",  label: "br-100" },
  { stop: 12,  hex: "#abbded",  label: "br-200" },
  { stop: 20,  hex: "#e6f6fe",  label: "ac-50" },
  { stop: 21,  hex: "#cdedfe",  label: "ac-100" },
  { stop: 22,  hex: "#9bdbfd",  label: "ac-200" },
];

// Border stops — grays, brand tints, accent tints
const BORDER_STOPS = [
  { stop: 0,   hex: "#f3f4f6",  label: "gr-100" },
  { stop: 1,   hex: "#e5e7eb",  label: "gr-200" },
  { stop: 2,   hex: "#d1d5db",  label: "gr-300" },
  { stop: 3,   hex: "#9ca3af",  label: "gr-400" },
  { stop: 4,   hex: "#6b7280",  label: "gr-500" },
  { stop: 10,  hex: "#eaeefb",  label: "br-50" },
  { stop: 11,  hex: "#d5def6",  label: "br-100" },
  { stop: 12,  hex: "#abbded",  label: "br-200" },
  { stop: 13,  hex: "#819be4",  label: "br-300" },
  { stop: 14,  hex: "#577adb",  label: "br-400" },
  { stop: 20,  hex: "#e6f6fe",  label: "ac-50" },
  { stop: 21,  hex: "#cdedfe",  label: "ac-100" },
  { stop: 22,  hex: "#9bdbfd",  label: "ac-200" },
  { stop: 23,  hex: "#37b6fb",  label: "ac-400" },
];

// Edition palettes
const SEAGRASS = [
  { stop: 50,  hex: "#e5fffb" }, { stop: 100, hex: "#ccfff7" },
  { stop: 200, hex: "#99fff0" }, { stop: 300, hex: "#66ffe8" },
  { stop: 400, hex: "#33ffe0" }, { stop: 500, hex: "#00ffd9" },
  { stop: 600, hex: "#00ccad" }, { stop: 700, hex: "#009982" },
  { stop: 800, hex: "#006657" }, { stop: 900, hex: "#00332b" },
  { stop: 950, hex: "#00241e" },
];

const GRAPEFRUIT_PINK = [
  { stop: 50,  hex: "#ffe5e6" }, { stop: 100, hex: "#ffccce" },
  { stop: 200, hex: "#ff999c" }, { stop: 300, hex: "#ff666b" },
  { stop: 400, hex: "#ff333a" }, { stop: 500, hex: "#ff0008" },
  { stop: 600, hex: "#cc0007" }, { stop: 700, hex: "#990005" },
  { stop: 800, hex: "#660003" }, { stop: 900, hex: "#330002" },
  { stop: 950, hex: "#240001" },
];

const SANDY_BROWN = [
  { stop: 50,  hex: "#fff1e5" }, { stop: 100, hex: "#ffe4cc" },
  { stop: 200, hex: "#ffc999" }, { stop: 300, hex: "#ffad66" },
  { stop: 400, hex: "#ff9233" }, { stop: 500, hex: "#ff7700" },
  { stop: 600, hex: "#cc5f00" }, { stop: 700, hex: "#994700" },
  { stop: 800, hex: "#663000" }, { stop: 900, hex: "#331800" },
  { stop: 950, hex: "#241100" },
];

const BRIGHT_LAVENDER = [
  { stop: 50,  hex: "#f0e5ff" }, { stop: 100, hex: "#e1ccff" },
  { stop: 200, hex: "#c399ff" }, { stop: 300, hex: "#a666ff" },
  { stop: 400, hex: "#8833ff" }, { stop: 500, hex: "#6a00ff" },
  { stop: 600, hex: "#5500cc" }, { stop: 700, hex: "#400099" },
  { stop: 800, hex: "#2a0066" }, { stop: 900, hex: "#150033" },
  { stop: 950, hex: "#0f0024" },
];

// ─── Token Configurator ───────────────────────────────────────────────────────

type TokenRow = {
  label: string;
  tag: string;          // short name shown on swatch label prefix e.g. "brand", "green"
  cssVar: string;
  stops: { stop: number; hex: string; label?: string }[];
  defaultHex: string;
};

const CORE_TOKEN_ROWS: TokenRow[] = [
  { label: "Brand",        tag: "brand",     cssVar: "--sognos-brand",        stops: PRUSSIAN_BLUE,                      defaultHex: "#122454" },
  { label: "Accent",       tag: "accent",    cssVar: "--sognos-accent",       stops: CORNFLOWER_OCEAN,                   defaultHex: "#05a4fa" },
  { label: "Highlight",    tag: "highlight", cssVar: "--sognos-highlight",    stops: DODGER_BLUE,                        defaultHex: "#36a0fc" },
  { label: "Text Heading", tag: "heading",   cssVar: "--sognos-text-heading", stops: HEADING_STOPS,                      defaultHex: "#060c1d" },
  { label: "Text Body",    tag: "body",      cssVar: "--sognos-text-body",    stops: BODY_STOPS.map((s) => ({ ...s })), defaultHex: "#475569" },
];

const BG_TOKEN_ROWS: TokenRow[] = [
  { label: "Page",    tag: "bg-page",    cssVar: "--sognos-bg-page",    stops: BG_STOPS, defaultHex: "#f8fafc" },
  { label: "Section", tag: "bg-section", cssVar: "--sognos-bg-surface", stops: BG_STOPS, defaultHex: "#f1f5f9" },
  { label: "Card",    tag: "bg-card",    cssVar: "--sognos-card-bg",    stops: BG_STOPS, defaultHex: "#ffffff" },
  { label: "Subcard", tag: "bg-subcard", cssVar: "--sognos-subcard-bg", stops: BG_STOPS, defaultHex: "#f6f9fc" },
  { label: "Elevated",tag: "bg-elev",    cssVar: "--sognos-bg-elevated",stops: BG_STOPS, defaultHex: "#e2e8f0" },
  { label: "Sunken",  tag: "bg-sunken",  cssVar: "--sognos-bg-sunken",  stops: BG_STOPS, defaultHex: "#e9eef5" },
];

const BORDER_TOKEN_ROWS: TokenRow[] = [
  { label: "Default",   tag: "border",       cssVar: "--sognos-border",           stops: BORDER_STOPS, defaultHex: "#d8dbe1" },
  { label: "Subtle",    tag: "border-subtle",cssVar: "--sognos-border-subtle",    stops: BORDER_STOPS, defaultHex: "#dcdfe6" },
  { label: "Card",      tag: "border-card",  cssVar: "--sognos-card-border",      stops: BORDER_STOPS, defaultHex: "#e5edf5" },
  { label: "Card Soft", tag: "border-soft",  cssVar: "--sognos-card-border-soft", stops: BORDER_STOPS, defaultHex: "#e7ecf1" },
];

const EDITION_TOKEN_ROWS: TokenRow[] = [
  { label: "Green",  tag: "green",  cssVar: "--sognos-edition-green",  stops: SEAGRASS,        defaultHex: "#009982" },
  { label: "Coral",  tag: "coral",  cssVar: "--sognos-edition-coral",  stops: GRAPEFRUIT_PINK, defaultHex: "#ff666b" },
  { label: "Orange", tag: "orange", cssVar: "--sognos-edition-orange", stops: SANDY_BROWN,     defaultHex: "#ff9233" },
  { label: "Purple", tag: "purple", cssVar: "--sognos-edition-purple", stops: BRIGHT_LAVENDER, defaultHex: "#a666ff" },
];

const TOKEN_ROWS = [...CORE_TOKEN_ROWS, ...BG_TOKEN_ROWS, ...BORDER_TOKEN_ROWS, ...EDITION_TOKEN_ROWS];

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

function TokenConfigurator() {
  const [selections, setSelections] = useState<Record<string, string>>(
    Object.fromEntries(TOKEN_ROWS.map((r) => [r.cssVar, r.defaultHex]))
  );

  const set = (cssVar: string, hex: string) => {
    document.documentElement.style.setProperty(cssVar, hex);

    // Keep dependent semantic tokens in sync
    if (cssVar === "--sognos-brand") {
      document.documentElement.style.setProperty("--sognos-text-link", hex);
      document.documentElement.style.setProperty("--sognos-border-focus", hex);
    }
    if (cssVar === "--sognos-accent") {
      document.documentElement.style.setProperty("--sognos-border-strong", hex);
      document.documentElement.style.setProperty(
        "--sognos-accent-subtle",
        `color-mix(in srgb, ${hex} 12%, transparent)`
      );
    }
    if (cssVar === "--sognos-bg-page") {
      document.documentElement.style.setProperty("--color-background", hex);
    }

    setSelections((prev) => ({ ...prev, [cssVar]: hex }));
  };

  const reset = () => {
    TOKEN_ROWS.forEach((r) => {
      document.documentElement.style.removeProperty(r.cssVar);
    });
    document.documentElement.style.removeProperty("--sognos-text-link");
    document.documentElement.style.removeProperty("--sognos-border-strong");
    document.documentElement.style.removeProperty("--sognos-accent-subtle");
    document.documentElement.style.removeProperty("--color-background");
    document.documentElement.style.removeProperty("--sognos-border-focus");
    setSelections(
      Object.fromEntries(TOKEN_ROWS.map((r) => [r.cssVar, r.defaultHex]))
    );
  };

  const brand       = selections["--sognos-brand"];
  const accent      = selections["--sognos-accent"];
  const textHeading = selections["--sognos-text-heading"];
  const textBody    = selections["--sognos-text-body"];
  const bgPage      = selections["--sognos-bg-page"];
  const bgSection   = selections["--sognos-bg-surface"];
  const bgCard      = selections["--sognos-card-bg"];
  const bgSubcard   = selections["--sognos-subcard-bg"];
  const borderDef   = selections["--sognos-border"];
  const borderCard  = selections["--sognos-card-border"];
  const borderSoft  = selections["--sognos-card-border-soft"];
  const edGreen     = selections["--sognos-edition-green"];
  const edCoral     = selections["--sognos-edition-coral"];
  const edOrange    = selections["--sognos-edition-orange"];
  const edPurple    = selections["--sognos-edition-purple"];

  const editions = [
    { label: "Green",  hex: edGreen,  sector: "Disability & Mental Health" },
    { label: "Coral",  hex: edCoral,  sector: "Support at Home" },
    { label: "Orange", hex: edOrange, sector: "Allied Health" },
    { label: "Purple", hex: edPurple, sector: "Aged Care" },
  ];

  function SwatchRow({ rows }: { rows: TokenRow[] }) {
    return (
      <div className="space-y-5">
        {rows.map((row) => {
          const current = selections[row.cssVar];
          const currentStop = row.stops.find((s) => s.hex === current);
          const stopLabel = currentStop?.label ?? (currentStop ? String(currentStop.stop) : "—");
          return (
            <div key={row.cssVar} className="flex items-start gap-4">
              <div className="w-36 shrink-0 pt-1">
                <p className="text-xs font-semibold text-[--sognos-text-heading]">{row.label}</p>
                <p className="text-[10px] font-mono text-[--sognos-text-muted] mt-0.5">
                  -{row.tag}/{stopLabel}
                </p>
                <p className="text-[10px] font-mono text-[--sognos-text-muted] opacity-60">{current}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {row.stops.map((s) => {
                  const selected = current === s.hex;
                  const stopDisplay = s.label ?? String(s.stop);
                  return (
                    <button
                      key={s.hex}
                      onClick={() => set(row.cssVar, s.hex)}
                      title={`-${row.tag}/${stopDisplay}`}
                      className="flex flex-col items-center gap-1 cursor-pointer"
                    >
                      <div
                        className="w-8 h-8 rounded-md border transition-all"
                        style={{
                          background: s.hex,
                          borderColor: selected ? "#000" : "rgba(0,0,0,0.12)",
                          outline: selected ? "2px solid #000" : "none",
                          outlineOffset: "2px",
                          transform: selected ? "scale(1.1)" : "scale(1)",
                        }}
                      />
                      <p
                        className="text-[9px] font-mono"
                        style={{ color: selected ? "var(--sognos-text-heading)" : "var(--sognos-text-muted)" }}
                      >
                        {stopDisplay}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* ── Preview: Hero + edition strip ────────────────────────────────── */}
      <div className="rounded-xl overflow-hidden border" style={{ borderColor: borderDef }}>
        {/* Navbar */}
        <div className="px-6 py-4 flex items-center justify-between" style={{ background: brand }}>
          <div className="flex items-center gap-6">
            <div className="h-4 w-16 rounded" style={{ background: "rgba(255,255,255,0.85)" }} />
            <div className="flex gap-4">
              {["Products", "Solutions", "Industries"].map((l) => (
                <span key={l} className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{l}</span>
              ))}
            </div>
          </div>
          <div className="rounded-full px-4 py-1.5 text-xs font-semibold" style={{ background: accent, color: isLight(accent) ? "#060c1d" : "#ffffff" }}>
            Book a Demo
          </div>
        </div>

        {/* Hero body */}
        <div className="px-6 py-6 border-b" style={{ background: bgPage, borderColor: borderDef }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-2" style={{ color: accent }}>Platform</p>
          <p className="font-heading text-2xl font-normal tracking-tight mb-2" style={{ color: textHeading, lineHeight: 1.05 }}>
            Run your entire service operation on one intelligent platform.
          </p>
          <p className="text-sm leading-relaxed mb-4 max-w-md" style={{ color: textBody }}>
            Sognos helps service organisations unify demand, workforce, and delivery on Microsoft Dynamics 365.
          </p>
          <div className="flex gap-3">
            <div className="rounded-full px-4 py-1.5 text-xs font-semibold" style={{ background: brand, color: "#fff" }}>Get started</div>
            <div className="rounded-full px-4 py-1.5 text-xs font-semibold border" style={{ borderColor: accent, color: accent }}>Talk to us</div>
          </div>
        </div>

        {/* Edition strip */}
        <div className="grid grid-cols-4">
          {editions.map((e) => (
            <div key={e.label} className="px-4 py-4 border-r last:border-r-0" style={{ background: bgPage, borderColor: borderDef }}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: e.hex }} />
                <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: e.hex }}>{e.label}</p>
              </div>
              <p className="text-[10px] leading-snug" style={{ color: textBody }}>{e.sector}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Preview: Section + Card + Subcard ────────────────────────────── */}
      <div className="rounded-xl overflow-hidden border" style={{ borderColor: borderDef }}>
        <div className="px-6 py-6" style={{ background: bgSection, borderBottom: `1px solid ${borderDef}` }}>
          <p className="text-[10px] font-mono mb-3" style={{ color: textBody }}>bg-section · border-default</p>
          <div className="grid grid-cols-2 gap-4">
            {/* Standard card */}
            <div className="rounded-xl p-4 border" style={{ background: bgCard, borderColor: borderCard }}>
              <p className="text-[10px] font-mono mb-2" style={{ color: textBody }}>bg-card · border-card</p>
              <p className="text-xs font-semibold mb-1" style={{ color: textHeading }}>Card title</p>
              <p className="text-[11px] leading-snug mb-3" style={{ color: textBody }}>Standard card — flat, border, rounded-xl.</p>
              {/* Subcard inside */}
              <div className="rounded-lg p-3 border" style={{ background: bgSubcard, borderColor: borderSoft }}>
                <p className="text-[10px] font-mono mb-1" style={{ color: textBody }}>bg-subcard · border-soft</p>
                <p className="text-[11px]" style={{ color: textBody }}>Nested subcard content goes here.</p>
              </div>
            </div>

            {/* Feature card */}
            <div className="rounded-lg p-4 border" style={{ background: bgCard, borderColor: borderSoft }}>
              <p className="text-[10px] font-mono mb-2" style={{ color: textBody }}>bg-card · border-soft</p>
              <p className="text-xs font-semibold mb-1" style={{ color: textHeading }}>Smart dispatch & scheduling</p>
              <p className="text-[11px] leading-snug" style={{ color: textBody }}>
                Auto-assign the right technician based on skill, location, and availability.
              </p>
              <div className="mt-3 flex gap-2">
                <div className="rounded-full px-3 py-1 text-[10px] font-semibold border" style={{ background: bgSubcard, borderColor: borderSoft, color: textBody }}>
                  Component pill
                </div>
                <div className="rounded-full px-3 py-1 text-[10px] font-semibold border" style={{ borderColor: accent, color: accent }}>
                  Accent pill
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Core tokens ──────────────────────────────────────────────────── */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[--sognos-text-muted] mb-5">Core</p>
        <SwatchRow rows={CORE_TOKEN_ROWS} />
      </div>

      {/* ── Background tokens ────────────────────────────────────────────── */}
      <div className="pt-6 border-t border-[--sognos-border]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[--sognos-text-muted] mb-5">Backgrounds</p>
        <SwatchRow rows={BG_TOKEN_ROWS} />
      </div>

      {/* ── Border tokens ────────────────────────────────────────────────── */}
      <div className="pt-6 border-t border-[--sognos-border]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[--sognos-text-muted] mb-5">Borders</p>
        <SwatchRow rows={BORDER_TOKEN_ROWS} />
      </div>

      {/* ── Edition tokens ───────────────────────────────────────────────── */}
      <div className="pt-6 border-t border-[--sognos-border]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[--sognos-text-muted] mb-5">Edition Tokens — SognosCare Sectors</p>
        <SwatchRow rows={EDITION_TOKEN_ROWS} />
      </div>

      <div className="flex items-center gap-4 pt-2 border-t border-[--sognos-border]">
        <button onClick={reset} className="text-xs font-medium text-[--sognos-text-muted] hover:text-[--sognos-text-heading] transition-colors cursor-pointer">
          ↺ Reset to defaults
        </button>
        <p className="text-[11px] text-[--sognos-text-muted]">Changes apply live across the whole page.</p>
      </div>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-14 border-b border-[--sognos-border]">
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[--sognos-text-muted] mb-6">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-start gap-4">{children}</div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 text-[11px] text-[--sognos-text-muted] font-mono">
      {children}
    </p>
  );
}

// ─── Colour swatch ────────────────────────────────────────────────────────────

function Swatch({
  bg,
  label,
  token,
}: {
  bg: string;
  label: string;
  token: string;
}) {
  return (
    <div className="flex flex-col gap-1 w-20">
      <div
        className="h-12 w-full rounded-md border border-black/8"
        style={{ background: bg }}
      />
      <p className="text-[11px] font-medium text-[--sognos-text-heading] leading-tight">
        {label}
      </p>
      <p className="text-[10px] text-[--sognos-text-muted] font-mono leading-tight">
        {token}
      </p>
    </div>
  );
}

// ─── Radius swatch ────────────────────────────────────────────────────────────

function RadiusSwatch({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`h-14 w-14 bg-[--sognos-accent-subtle] border border-[--sognos-border-strong] ${className}`}
      />
      <p className="text-[11px] text-[--sognos-text-muted] text-center font-mono">
        {label}
        <br />
        {value}
      </p>
    </div>
  );
}

// ─── Shadow swatch ────────────────────────────────────────────────────────────

function ShadowSwatch({ label, className }: { label: string; className: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`h-16 w-24 bg-white rounded-lg ${className}`} />
      <p className="text-[11px] text-[--sognos-text-muted] font-mono">{label}</p>
    </div>
  );
}

// ─── Nav sidebar ─────────────────────────────────────────────────────────────

const NAV = [
  { id: "token-configurator", label: "Token Configurator" },
  { id: "typography", label: "Typography" },
  { id: "colour", label: "Colour" },
  { id: "spacing", label: "Spacing & Layout" },
  { id: "radius", label: "Radius" },
  { id: "shadows", label: "Shadows" },
  { id: "buttons", label: "Buttons" },
  { id: "badges", label: "Badges" },
  { id: "cards", label: "Cards" },
  { id: "status", label: "Status" },
  { id: "motion", label: "Motion" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StyleGuidePage() {
  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-52 shrink-0 border-r border-[--sognos-border] py-8 px-5 sticky top-0 h-screen overflow-y-auto">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[--sognos-text-heading] mb-6">
          Sognos Design System
        </p>
        <nav className="flex flex-col gap-0.5">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm text-[--sognos-text-muted] hover:text-[--sognos-text-heading] py-1.5 px-2 rounded hover:bg-[--sognos-bg-sunken] transition-colors no-underline"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto pt-8">
          <Link
            href="/"
            className="text-xs text-[--sognos-text-muted] hover:text-[--sognos-text-heading] no-underline"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 px-8 py-10 max-w-4xl">
        <header className="mb-12">
          <h1
            className="font-heading text-4xl font-normal tracking-[-0.02em] text-[--sognos-text-heading]"
            style={{ lineHeight: 1.05 }}
          >
            Style Guide
          </h1>
          <p className="mt-3 text-base text-[--sognos-text-muted]">
            Living reference for the Sognos design system — tokens, components,
            and patterns.
          </p>
        </header>

        {/* ── Token Configurator ───────────────────────────────────────────── */}
        <Section id="token-configurator" title="Token Configurator — Live">
          <TokenConfigurator />
        </Section>

        {/* ── Typography ───────────────────────────────────────────────────── */}
        <Section id="typography" title="Typography">
          <div className="space-y-8">
            {/* Heading scale */}
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[--sognos-text-muted]">
                Heading Scale — Inter Tight, weight 400
              </p>
              <div
                className="font-heading font-normal tracking-[-0.02em] text-[--sognos-text-heading]"
                style={{ lineHeight: 1.05 }}
              >
                <div>
                  <span style={{ fontSize: 46 }}>H1 — 46px</span>
                  <Label>--sognos-font-size-h1: 46px</Label>
                </div>
              </div>
              <div
                className="font-heading font-normal tracking-[-0.02em] text-[--sognos-text-heading]"
                style={{ lineHeight: 1.05 }}
              >
                <span style={{ fontSize: 40 }}>H2 — 40px</span>
                <Label>--sognos-font-size-h2: 40px (also: `h2` global = 32px via override)</Label>
              </div>
              <div
                className="font-heading font-normal tracking-[-0.02em] text-[--sognos-text-heading]"
                style={{ lineHeight: 1.05 }}
              >
                <span style={{ fontSize: 32 }}>H3 — 32px</span>
                <Label>--sognos-font-size-h3: 32px</Label>
              </div>
              <div
                className="font-heading font-normal tracking-[-0.02em] text-[--sognos-text-heading]"
                style={{ lineHeight: 1.05 }}
              >
                <span style={{ fontSize: 28 }}>H4 — 28px</span>
                <Label>--sognos-font-size-h4: 28px</Label>
              </div>
            </div>

            {/* Body scale */}
            <div className="space-y-3 pt-4 border-t border-[--sognos-border]">
              <p className="text-xs font-semibold uppercase tracking-widest text-[--sognos-text-muted]">
                Body — Inter
              </p>
              <p className="text-lg text-[--sognos-text-body]">
                text-lg — 18px body intro
              </p>
              <p className="text-base text-[--sognos-text-body]">
                text-base — 16px standard body copy. Used for most paragraph
                text across the site.
              </p>
              <p className="text-sm text-[--sognos-text-body]">
                text-sm — 14px secondary body. Card descriptions, feature copy.
              </p>
              <p className="text-xs text-[--sognos-text-muted]">
                text-xs — 12px. Labels, badges, metadata.
              </p>
            </div>

            {/* Special text styles */}
            <div className="space-y-3 pt-4 border-t border-[--sognos-border]">
              <p className="text-xs font-semibold uppercase tracking-widest text-[--sognos-text-muted]">
                Special Styles
              </p>
              <p
                className="font-heading font-medium"
                style={{ fontSize: 18, lineHeight: 1.4 }}
              >
                section-header-description — 18px Inter Tight, used for section
                subheads
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[--sognos-text-muted]">
                LABEL — xs, uppercase, tracking-[0.14em]
              </p>
              <p
                className="font-heading font-semibold tracking-tight text-[--sognos-text-heading]"
                style={{ fontSize: 30 }}
              >
                1,100+ stat callout — bold heading font
              </p>
            </div>

            {/* Callout h2 */}
            <div className="pt-4 border-t border-[--sognos-border]">
              <p className="text-xs font-semibold uppercase tracking-widest text-[--sognos-text-muted] mb-3">
                h2.callout — 38px / lh 42px
              </p>
              <h2
                className="font-heading font-normal tracking-[-0.02em] text-[--sognos-text-heading] callout"
                style={{ fontSize: 38, lineHeight: "42px" }}
              >
                Ready to transform your service operations?
              </h2>
            </div>
          </div>
        </Section>

        {/* ── Colour ───────────────────────────────────────────────────────── */}
        <Section id="colour" title="Colour">
          <div className="space-y-8">
            {/* Brand */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[--sognos-text-muted] mb-4">
                Brand
              </p>
              <Row>
                <Swatch bg="var(--sognos-brand)" label="Brand" token="--sognos-brand" />
                <Swatch bg="var(--sognos-brand-dark)" label="Brand Dark" token="--sognos-brand-dark" />
                <Swatch bg="var(--sognos-brand-light)" label="Brand Light" token="--sognos-brand-light" />
                <Swatch bg="var(--sognos-brand-subtle)" label="Brand Subtle" token="--sognos-brand-subtle" />
                <Swatch bg="var(--sognos-accent)" label="Accent" token="--sognos-accent" />
                <Swatch bg="var(--sognos-highlight)" label="Highlight" token="--sognos-highlight" />
              </Row>
            </div>

            {/* Edition colours */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[--sognos-text-muted] mb-4">
                Edition Colours
              </p>
              <Row>
                <Swatch bg="var(--sognos-edition-teal)" label="Teal" token="--sognos-edition-teal" />
                <Swatch bg="var(--sognos-edition-orange)" label="Orange" token="--sognos-edition-orange" />
                <Swatch bg="var(--sognos-edition-coral)" label="Coral" token="--sognos-edition-coral" />
                <Swatch bg="var(--sognos-edition-purple)" label="Purple" token="--sognos-edition-purple" />
                <Swatch bg="var(--sognos-brand-subtle-300)" label="Subtle 300" token="--sognos-brand-subtle-300" />
                <Swatch bg="var(--sognos-brand-subtle-700)" label="Subtle 700" token="--sognos-brand-subtle-700" />
              </Row>
            </div>

            {/* Neutrals */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[--sognos-text-muted] mb-4">
                Neutrals
              </p>
              <Row>
                <Swatch bg="var(--sognos-neutral-50)" label="50" token="neutral-50" />
                <Swatch bg="var(--sognos-neutral-100)" label="100" token="neutral-100" />
                <Swatch bg="var(--sognos-neutral-200)" label="200" token="neutral-200" />
                <Swatch bg="var(--sognos-neutral-300)" label="300" token="neutral-300" />
                <Swatch bg="var(--sognos-neutral-400)" label="400" token="neutral-400" />
                <Swatch bg="var(--sognos-neutral-500)" label="500" token="neutral-500" />
                <Swatch bg="var(--sognos-neutral-600)" label="600" token="neutral-600" />
                <Swatch bg="var(--sognos-neutral-700)" label="700" token="neutral-700" />
                <Swatch bg="var(--sognos-neutral-800)" label="800" token="neutral-800" />
                <Swatch bg="var(--sognos-neutral-900)" label="900" token="neutral-900" />
              </Row>
            </div>

            {/* Text & surfaces */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[--sognos-text-muted] mb-4">
                Text Colours
              </p>
              <Row>
                <Swatch bg="var(--sognos-text-heading)" label="Heading" token="text-heading" />
                <Swatch bg="var(--sognos-text-body)" label="Body" token="text-body" />
                <Swatch bg="var(--sognos-text-muted)" label="Muted" token="text-muted" />
                <Swatch bg="var(--sognos-text-soft)" label="Soft" token="text-soft" />
                <Swatch bg="var(--sognos-text-link)" label="Link" token="text-link" />
              </Row>
            </div>

            {/* Edition colours */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[--sognos-text-muted] mb-4">
                Edition Colours — SognosCare Sectors
              </p>
              <div className="flex flex-wrap gap-6">
                {[
                  { label: "Green", sub: "Disability & Mental Health", token: "--sognos-edition-green", bg: "var(--sognos-edition-green)" },
                  { label: "Orange", sub: "Allied Health", token: "--sognos-edition-orange", bg: "var(--sognos-edition-orange)" },
                  { label: "Coral", sub: "Support at Home", token: "--sognos-edition-coral", bg: "var(--sognos-edition-coral)" },
                  { label: "Purple", sub: "Aged Care", token: "--sognos-edition-purple", bg: "var(--sognos-edition-purple)" },
                ].map((e) => (
                  <div key={e.label} className="flex flex-col gap-1.5 w-28">
                    <div className="h-12 w-full rounded-md border border-black/8" style={{ background: e.bg }} />
                    <p className="text-[11px] font-semibold text-[--sognos-text-heading]">{e.label}</p>
                    <p className="text-[10px] text-[--sognos-text-muted] leading-tight">{e.sub}</p>
                    <p className="text-[10px] font-mono text-[--sognos-text-muted] break-all">{e.token}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Palette families */}
            {[
              { name: "Prussian Blue", key: "prussian-blue", role: "Brand" },
              { name: "Cornflower Ocean", key: "cornflower-ocean", role: "Accent / CTA" },
              { name: "Dodger Blue", key: "dodger-blue", role: "Highlight" },
              { name: "Seagrass", key: "seagrass", role: "Edition: Green" },
              { name: "Grapefruit Pink", key: "grapefruit-pink", role: "Edition: Coral" },
              { name: "Sandy Brown", key: "sandy-brown", role: "Edition: Orange" },
              { name: "Bright Lavender", key: "bright-lavender", role: "Edition: Purple" },
            ].map((family) => (
              <div key={family.key}>
                <div className="flex items-baseline gap-2 mb-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[--sognos-text-muted]">
                    {family.name}
                  </p>
                  <p className="text-[10px] text-[--sognos-text-muted]">— {family.role}</p>
                </div>
                <Row>
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((n) => (
                    <Swatch
                      key={n}
                      bg={`var(--color-${family.key}-${n})`}
                      label={String(n)}
                      token={`${family.key}-${n}`}
                    />
                  ))}
                </Row>
              </div>
            ))}

            {/* Gradients */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[--sognos-text-muted] mb-4">
                Gradients
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { label: "Hero", token: "--sognos-gradient-hero" },
                  { label: "Brand", token: "--sognos-gradient-brand" },
                  { label: "Accent", token: "--sognos-gradient-accent" },
                  { label: "Highlight", token: "--sognos-gradient-highlight" },
                  { label: "Surface", token: "--sognos-gradient-surface" },
                ].map((g) => (
                  <div key={g.label} className="flex flex-col gap-1 w-32">
                    <div
                      className="h-16 w-full rounded-md border border-black/8"
                      style={{ backgroundImage: `var(${g.token})` }}
                    />
                    <p className="text-[11px] font-medium text-[--sognos-text-heading]">
                      {g.label}
                    </p>
                    <p className="text-[10px] text-[--sognos-text-muted] font-mono break-all">
                      {g.token}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── Spacing & Layout ─────────────────────────────────────────────── */}
        <Section id="spacing" title="Spacing & Layout">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { token: "--sognos-container-width", value: "1360px", note: "max-w-7xl override" },
                { token: "--sognos-section-padding", value: "88px", note: "py-22 equivalent" },
                { token: "--sognos-card-padding", value: "24px", note: "p-6 equivalent" },
              ].map((row) => (
                <div
                  key={row.token}
                  className="rounded-lg border border-[--sognos-border] p-4"
                >
                  <p className="text-[11px] font-mono text-[--sognos-text-muted]">
                    {row.token}
                  </p>
                  <p className="mt-1 text-xl font-semibold font-mono text-[--sognos-text-heading]">
                    {row.value}
                  </p>
                  <p className="mt-0.5 text-xs text-[--sognos-text-muted]">
                    {row.note}
                  </p>
                </div>
              ))}
            </div>

            {/* Visual spacing scale */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[--sognos-text-muted] mb-4">
                Tailwind Spacing Reference
              </p>
              <div className="flex items-end gap-2">
                {[1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24].map((n) => (
                  <div key={n} className="flex flex-col items-center gap-1">
                    <div
                      className="w-4 bg-[--sognos-accent]"
                      style={{ height: n * 4 }}
                    />
                    <p className="text-[10px] text-[--sognos-text-muted] font-mono">
                      {n}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-[--sognos-text-muted]">
                Each unit = 4px. Space-{"{n}"} = {"{n}"}×4px
              </p>
            </div>
          </div>
        </Section>

        {/* ── Radius ───────────────────────────────────────────────────────── */}
        <Section id="radius" title="Radius">
          <Row>
            <RadiusSwatch label="sm" value="4px" className="rounded-sm" />
            <RadiusSwatch label="md" value="4px" className="rounded-md" />
            <RadiusSwatch label="lg" value="12px" className="rounded-lg" />
            <RadiusSwatch label="xl" value="16px" className="rounded-xl" />
            <RadiusSwatch label="2xl" value="20px" className="rounded-2xl" />
            <RadiusSwatch label="full" value="9999px" className="rounded-full" />
          </Row>
          <p className="mt-4 text-xs text-[--sognos-text-muted]">
            Note: sm and md both resolve to 4px per token definition.
          </p>
        </Section>

        {/* ── Shadows ──────────────────────────────────────────────────────── */}
        <Section id="shadows" title="Shadows">
          <Row>
            <ShadowSwatch label="shadow-sm" className="shadow-sm" />
            <ShadowSwatch label="shadow-md" className="shadow-md" />
            <ShadowSwatch label="shadow-lg" className="shadow-lg" />
            <ShadowSwatch label="shadow-xl" className="shadow-xl" />
          </Row>
        </Section>

        {/* ── Buttons ──────────────────────────────────────────────────────── */}
        <Section id="buttons" title="Buttons">
          <div className="space-y-8">
            {/* AnimatedButton */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[--sognos-text-muted] mb-4">
                AnimatedButton (primary interaction)
              </p>
              <Row>
                <div>
                  <AnimatedButton href="#" variant="brand">
                    Book a Demo
                  </AnimatedButton>
                  <Label>variant="brand" — dark bg, white icon bubble</Label>
                </div>
                <div className="bg-[--sognos-brand] p-4 rounded-xl">
                  <AnimatedButton href="#" variant="white">
                    Book a Demo
                  </AnimatedButton>
                  <Label>variant="white" — white bg, brand icon bubble</Label>
                </div>
              </Row>
            </div>

            {/* Plain links styled as buttons */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[--sognos-text-muted] mb-4">
                Plain Button Styles
              </p>
              <Row>
                <div>
                  <button className="inline-flex items-center rounded-lg bg-[--sognos-brand] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                    Primary
                  </button>
                  <Label>bg-brand, rounded-lg, text-white</Label>
                </div>
                <div>
                  <button className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 border border-[--sognos-border] transition-opacity hover:opacity-90">
                    Secondary
                  </button>
                  <Label>bg-white, border, text-neutral-900</Label>
                </div>
                <div>
                  <button className="inline-flex items-center rounded-lg border border-neutral-700 bg-neutral-900 px-5 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white">
                    Dark outline
                  </button>
                  <Label>Used in CTASection on dark bg</Label>
                </div>
                <div>
                  <button className="inline-flex items-center rounded-full border border-white/0 px-8 py-3 font-medium text-[--sognos-brand] transition-colors hover:bg-[--sognos-accent] hover:text-white">
                    Ghost
                  </button>
                  <Label>Hero secondary CTA — ghost on dark</Label>
                </div>
              </Row>
            </div>

            {/* CTA pill (navbar) */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[--sognos-text-muted] mb-4">
                Navbar CTA pill
              </p>
              <Row>
                <div>
                  <button className="inline-flex items-center px-5 py-2 text-sm font-semibold rounded-full bg-[--sognos-brand] text-white hover:opacity-90 transition-all duration-300">
                    Book a Demo
                  </button>
                  <Label>rounded-full, px-5 py-2</Label>
                </div>
              </Row>
            </div>
          </div>
        </Section>

        {/* ── Badges ───────────────────────────────────────────────────────── */}
        <Section id="badges" title="Badges">
          <div className="space-y-6">
            <Row>
              <div>
                <span className="inline-flex items-center gap-1 rounded-full border border-[--sognos-border-subtle] bg-white px-3 py-1 text-xs font-medium text-neutral-600">
                  SognosCare
                </span>
                <Label>Product badge — Solutions section</Label>
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[--sognos-accent-subtle] px-3 py-1 text-xs font-medium text-[--sognos-accent]">
                  AI-powered
                </span>
                <Label>Accent tint badge</Label>
              </div>
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[--sognos-success-light] px-3 py-1 text-xs font-medium text-[--sognos-success]">
                  Live
                </span>
                <Label>Status — success</Label>
              </div>
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[--sognos-warning-light] px-3 py-1 text-xs font-medium text-[--sognos-warning]">
                  Beta
                </span>
                <Label>Status — warning</Label>
              </div>
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[--sognos-error-light] px-3 py-1 text-xs font-medium text-[--sognos-error]">
                  Deprecated
                </span>
                <Label>Status — error</Label>
              </div>
            </Row>

            <Row>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[--sognos-text-muted]">
                  GET STARTED
                </span>
                <Label>Eyebrow label — CTASection</Label>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[--sognos-accent]">
                  SognosCare
                </span>
                <Label>Product eyebrow — accent colour</Label>
              </div>
            </Row>
          </div>
        </Section>

        {/* ── Cards ────────────────────────────────────────────────────────── */}
        <Section id="cards" title="Cards">
          <div className="space-y-8">
            {/* Standard card */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[--sognos-text-muted] mb-4">
                card-standard
              </p>
              <div className="card-standard max-w-sm">
                <p className="text-sm font-semibold text-[--sognos-text-heading]">
                  Card title
                </p>
                <p className="mt-2 text-sm text-[--sognos-text-body]">
                  Standard card — flat, no gradient. bg-white, border, rounded-xl,
                  shadow-md, p-6.
                </p>
              </div>
              <Label>`.card-standard` — use @apply or replicate: bg-sognos-card-bg border border-sognos-card-border rounded-xl shadow-md p-6</Label>
            </div>

            {/* Subcard */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[--sognos-text-muted] mb-4">
                card-subcard
              </p>
              <div className="card-subcard max-w-sm">
                <p className="text-sm font-semibold text-[--sognos-text-heading]">
                  Subcard
                </p>
                <p className="mt-1 text-sm text-[--sognos-text-body]">
                  Nested inside a parent card. Slightly off-white background.
                </p>
              </div>
              <Label>`.card-subcard` — bg-sognos-subcard-bg border border-sognos-card-border-soft rounded-lg shadow-sm p-4</Label>
            </div>

            {/* Feature card (Solutions section) */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[--sognos-text-muted] mb-4">
                Feature Card — Solutions section
              </p>
              <div className="rounded border border-[--sognos-border-subtle] bg-white p-5 max-w-xs">
                <p className="text-sm font-semibold text-neutral-900 leading-snug">
                  Smart dispatch & scheduling
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                  Auto-assign the right technician based on skill, location, and
                  availability.
                </p>
              </div>
              <Label>rounded, border-subtle, bg-white, p-5</Label>
            </div>

            {/* Dark product card */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[--sognos-text-muted] mb-4">
                Product Card — dark (ProductSection)
              </p>
              <div className="rounded-2xl bg-biscay-950 text-white p-8 max-w-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                  SognosCare
                </p>
                <h3 className="mt-3 font-heading text-2xl font-medium leading-tight tracking-tight text-[--sognos-edition-teal]">
                  The right worker, for every job
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  Dark navy card using bg-biscay-950. Heading uses edition-teal.
                </p>
              </div>
              <Label>bg-biscay-950, rounded-2xl, p-8 lg:p-10</Label>
            </div>

            {/* CTA card */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[--sognos-text-muted] mb-4">
                CTA Card — dark (CTASection)
              </p>
              <div className="rounded-2xl border border-[--sognos-border-subtle] bg-neutral-900 px-10 py-10 text-center max-w-lg">
                <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
                  Get started
                </p>
                <h2
                  className="mt-3 font-heading font-medium tracking-tight text-white"
                  style={{ fontSize: 32, lineHeight: "36px" }}
                >
                  Ready to transform your service operations?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  See how Sognos can unify your care management and workforce
                  scheduling.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 hover:opacity-90">
                    Book a Demo
                  </button>
                  <button className="inline-flex items-center rounded-lg border border-neutral-700 px-5 py-2.5 text-sm font-medium text-neutral-300 hover:border-neutral-500 hover:text-white">
                    Contact Sales
                  </button>
                </div>
              </div>
              <Label>bg-neutral-900, rounded-2xl, border-subtle, px-10 py-16</Label>
            </div>
          </div>
        </Section>

        {/* ── Status ───────────────────────────────────────────────────────── */}
        <Section id="status" title="Status">
          <div className="space-y-4">
            {[
              { label: "Success", bg: "var(--sognos-success)", light: "var(--sognos-success-light)", token: "--sognos-success: #10b981" },
              { label: "Warning", bg: "var(--sognos-warning)", light: "var(--sognos-warning-light)", token: "--sognos-warning: #f59e0b" },
              { label: "Error", bg: "var(--sognos-error)", light: "var(--sognos-error-light)", token: "--sognos-error: #ef4444" },
              { label: "Info", bg: "var(--sognos-info)", light: "var(--sognos-info-light)", token: "--sognos-info: #3b82f6" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-4">
                <div className="h-8 w-8 rounded" style={{ background: s.bg }} />
                <div className="h-8 w-24 rounded" style={{ background: s.light }} />
                <div>
                  <p className="text-sm font-semibold text-[--sognos-text-heading]">
                    {s.label}
                  </p>
                  <p className="text-[11px] font-mono text-[--sognos-text-muted]">
                    {s.token}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Motion ───────────────────────────────────────────────────────── */}
        <Section id="motion" title="Motion">
          <div className="space-y-6 text-sm text-[--sognos-text-body]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  label: "Standard transition",
                  value: "duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  note: "UI state changes — tab active, hover, expand",
                },
                {
                  label: "Slow transition",
                  value: "duration-500",
                  note: "AnimatedButton pill slide",
                },
                {
                  label: "Mega panel in",
                  value: "180ms cubic-bezier(0.4,0,0.2,1)",
                  note: ".mega-panel — opacity + translateY(-6px→0)",
                },
                {
                  label: "Framer drawer spring",
                  value: "damping: 30, stiffness: 300",
                  note: "ProductSection drawer — y: 100%→0",
                },
                {
                  label: "Framer content swap",
                  value: "duration: 0.2s, ease: easeInOut",
                  note: "SolutionsSection AnimatePresence — opacity + y:8",
                },
                {
                  label: "Navbar pill transition",
                  value: "duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  note: "bg, border, radius, shadow, backdrop-filter",
                },
                {
                  label: "Trust marquee",
                  value: "20s linear infinite",
                  note: ".trust-marquee-track — translateX(-50%)",
                },
                {
                  label: "SFD dash flow",
                  value: "1.4s linear infinite",
                  note: ".sfd-path-animated — stroke-dashoffset",
                },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-[--sognos-border] p-4"
                >
                  <p className="text-xs font-semibold text-[--sognos-text-heading]">
                    {m.label}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-[--sognos-accent]">
                    {m.value}
                  </p>
                  <p className="mt-1 text-xs text-[--sognos-text-muted]">
                    {m.note}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[--sognos-text-muted]">
              All animations respect{" "}
              <code className="font-mono">prefers-reduced-motion</code> — check
              globals.css for `@media (prefers-reduced-motion: reduce)` blocks.
            </p>
          </div>
        </Section>

        <footer className="py-10 text-xs text-[--sognos-text-muted]">
          Sognos Design System — living reference. Tokens in{" "}
          <code className="font-mono">app/tokens.css</code>, mapped in{" "}
          <code className="font-mono">app/globals.css</code>.
        </footer>
      </main>
    </div>
  );
}
