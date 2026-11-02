"""Rail (label in a left column) support for the Inspector mockups (Frontline, HSC,
Knowledge Hub, Customer Stories). The page JS (build_products.js railify) moves a
section's eyebrow into a left rail; this module prepares the HTML for it:
  prep(html, fallback) - marks sections already built with a rail grid (data-nrail; rail
    off collapses them in CSS) and injects a rail label into sections that have no eyebrow
    (shown only while railed).
  css(keys) - the CSS for both.
  native(html) - whether a variant already has a rail (its area defaults to Rail on).
"""
import re

RAIL = 'class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8"'
DARK = re.compile(r"bg-navy|bg-care-dark|bg-\[var\(--p-(deep|dark)\)\]|text-white")


def _label(text, dark):
    c = "text-white/80" if dark else "text-heading"
    return (f'<p data-rail-label class="items-center gap-2.5 text-lg leading-[1.6] {c}"><span aria-hidden="true" class="block size-[0.66em] shrink-0 bg-[var(--p-base)]"></span>{text}</p>')


def _text(chunk, fallback):
    m = re.search(r"<h[12][^>]*>(.*?)</h[12]>", chunk, re.S)
    t = re.sub(r"<span[^>]*tabular-nums[^>]*>.*?</span>", "", m.group(1), flags=re.S) if m else ""
    t = re.sub(r"<br\s*/?>", " ", t); t = re.sub(r"<[^>]+>", "", t).strip()
    return t if t and len(t) <= 40 else fallback


def prep(html, fallback):
    html = html.replace(RAIL, "data-nrail " + RAIL)
    starts = [m.start() for m in re.finditer(r"<section\b", html)]
    out, last = [], 0
    for n, s in enumerate(starts):
        end = starts[n + 1] if n + 1 < len(starts) else len(html)
        chunk = html[s:end]
        box = re.search(r'<div[^>]*class="[^"]*\bmax-w-7xl\b[^"]*"[^>]*>', chunk)
        if box and "data-nrail" not in chunk and "size-[0.66em]" not in chunk[: chunk.find("data-item") if "data-item" in chunk else len(chunk)]:
            head = chunk[: chunk.index(">") + 1]
            chunk = chunk[: box.end()] + _label(_text(chunk, fallback), bool(DARK.search(head))) + chunk[box.end():]
        out.append(html[last:s] + chunk); last = end
    return "".join(out) + html[last:] if starts else html


def native(html):
    return RAIL in html or "data-nrail" in html


def css(keys):
    return "<style>\n  [data-rail-label] { display: none; } [data-railgrid] [data-rail-label] { display: flex; }\n" + "\n".join(
        f'  html[data-rail-{k}="off"] [data-s="{k}"] [data-nrail] {{ display: block; }} html[data-rail-{k}="off"] [data-s="{k}"] [data-nrail] > * + * {{ margin-top: 1.5rem; }} html[data-rail-{k}="off"] [data-s="{k}"] [data-nrail] .lg\\:sticky {{ position: static; }}'
        for k in keys) + "\n</style>"
