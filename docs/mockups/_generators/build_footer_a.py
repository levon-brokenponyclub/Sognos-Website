"""Footer option A (Statement) - three design styles (mockup).
  python3 -I <this file> docs/mockups/sognoscare docs/mockups/footer
Reuses build_footer.py data + helpers (which also regenerates index.html).
"""
import runpy
import sys
from pathlib import Path

CARE_OUT, OUT = sys.argv[1], sys.argv[2]
f = runpy.run_path(str(Path(__file__).with_name("build_footer.py")))
page, T, P = f["page"], f["T"], f["P"]
PRODUCTS, GROUPS, LEGAL, ACK, COPY = f["PRODUCTS"], f["GROUPS"], f["LEGAL"], f["ACK"], f["COPY"]
CTA_H, CTA_S, FOCUS, ARR = f["CTA_H"], f["CTA_S"], f["FOCUS"], f["ARR"]
links, accred, BOOK = f["links"], f["accred"], f["BOOK"]
STUB, ACK_NOTE = f["STUB"], "Acknowledgement of Country"


def product_rows(row_cls, name_cls, tag_cls, arrow_cls, mark):
    return "".join(
        f'<li><a href="#" class="group flex min-h-14 items-center justify-between gap-4 py-3 {row_cls} {FOCUS}"><span class="flex items-center gap-3">{mark(n, c, logo, g)}<span class="{name_cls}">{n}</span></span><span class="hidden text-xs sm:block xl:hidden 2xl:block {tag_cls}">{t}</span><span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5 {arrow_cls}">&rarr;</span></a></li>'
        for n, h, t, c, logo, g in PRODUCTS
    )


def columns(head_cls, link_cls):
    return "".join(
        f'<nav aria-label="{g}" class="lg:col-span-2"><p class="{head_cls}">{g}</p><ul class="mt-4 space-y-1">{links(items, "inline-flex min-h-9 items-center text-sm " + link_cls)}</ul></nav>'
        for g, items in GROUPS.items()
    )


def bottom(cls, link_cls):
    return f'<div class="flex flex-col gap-3 border-t py-6 text-sm sm:flex-row sm:items-center sm:justify-between {cls}"><p>{COPY}</p><ul class="flex flex-wrap gap-x-6">{links(LEGAL, "inline-flex min-h-11 items-center " + link_cls)}</ul></div>'


dot = lambda n, c, logo, g: f'<span class="size-2.5 rounded-full" style="background:{c}"></span>'
chip = lambda n, c, logo, g: f'<span class="size-8 rounded" style="background:{g}"></span>'

# ── A1 · Editorial white: hairlines, faint oversized wordmark ─────────────
A1 = f"""<footer data-fa="1" class="border-t border-line bg-white text-body">
  <div class="mx-auto max-w-7xl px-6">
    <div class="grid grid-cols-1 items-end gap-8 py-16 md:py-24 lg:grid-cols-12 lg:gap-10">
      <h2 class="font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-heading text-balance md:text-6xl lg:col-span-7">{CTA_H}</h2>
      <div class="lg:col-span-5"><p class="{T["body"]}">{CTA_S}</p>
        <div class="mt-6 flex flex-wrap items-center gap-4">{BOOK("bg-heading text-white hover:bg-accent focus-visible:outline-accent")}<a href="#" class="inline-flex min-h-11 items-center gap-1.5 px-2 text-base font-medium text-heading hover:opacity-80 {FOCUS}">Talk to Sales {ARR}</a></div></div>
    </div>
    <div class="grid grid-cols-1 gap-x-8 gap-y-10 border-t border-line py-14 sm:grid-cols-2 lg:grid-cols-12">
      <nav aria-label="Products" class="sm:col-span-2 lg:col-span-4"><p class="text-sm text-muted">Products</p>
        <ul class="mt-4 divide-y divide-line border-y border-line">{product_rows("", "font-heading text-xl text-heading", "text-muted", "text-muted group-hover:text-accent", dot)}</ul></nav>
      {columns("text-sm text-muted", "text-heading hover:text-accent")}
    </div>
    <div class="flex flex-col gap-6 border-t border-line py-8 lg:flex-row lg:items-center lg:justify-between">
      <ul aria-label="Accreditations and memberships" class="flex flex-wrap gap-3 lg:gap-4">{accred("rounded border border-line bg-white")}</ul>
      <p class="max-w-xl text-xs leading-relaxed text-muted lg:text-right">{ACK}</p>
    </div>
    {bottom("border-line", "hover:text-accent")}
  </div>
  <div aria-hidden="true" class="overflow-hidden px-6 pb-6"><img src="{P}/logos/sognos-logo.svg" alt="" class="mx-auto block w-full max-w-7xl opacity-[.06]" /></div>
</footer>"""

# ── A2 · Tint + navy statement panel: cards, product gradient chips, cropped wordmark
A2 = f"""<footer data-fa="2" class="bg-tint text-body" hidden>
  <div class="mx-auto max-w-7xl px-6 pt-16 md:pt-20">
    <div class="relative isolate grid grid-cols-1 items-end gap-8 overflow-hidden rounded-lg p-8 md:p-12 lg:grid-cols-12 lg:gap-10 lg:p-16" style="background: radial-gradient(60% 90% at 10% 10%, rgba(59,111,224,.45), transparent 70%), radial-gradient(50% 80% at 100% 100%, rgba(29,150,252,.3), transparent 70%), #0f1936">
      <img src="{P}/images/cta-bg.svg" alt="" aria-hidden="true" class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 w-full mix-blend-luminosity" />
      <h2 class="font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-white text-balance md:text-6xl lg:col-span-7">{CTA_H}</h2>
      <div class="lg:col-span-5"><p class="{T["body"]} text-white/75">{CTA_S}</p>
        <div class="mt-6 flex flex-wrap items-center gap-4">{BOOK("bg-white text-heading hover:bg-accent hover:text-white focus-visible:outline-white")}<a href="#" class="inline-flex min-h-11 items-center gap-1.5 px-2 text-base font-medium text-white hover:opacity-80 {FOCUS}">Talk to Sales {ARR}</a></div></div>
    </div>
    <div class="grid grid-cols-1 gap-x-8 gap-y-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
      <nav aria-label="Products" class="sm:col-span-2 lg:col-span-4"><p class="text-sm text-muted">Products</p>
        <ul class="mt-4 space-y-2">{product_rows("rounded-lg border border-line bg-white px-3 transition-colors hover:border-heading", "font-heading text-lg text-heading", "text-muted", "text-muted group-hover:text-accent", chip)}</ul></nav>
      {columns("text-sm text-muted", "text-heading hover:text-accent")}
    </div>
    <div class="grid grid-cols-1 gap-6 rounded-lg border border-line bg-white p-6 lg:grid-cols-12 lg:items-center lg:p-8">
      <p class="text-sm text-muted lg:col-span-3">Accreditations &amp; memberships</p>
      <ul aria-label="Accreditations and memberships" class="flex flex-wrap gap-3 lg:col-span-9 lg:justify-end lg:gap-4">{accred("rounded bg-tint")}</ul>
    </div>
    <p class="mx-auto max-w-4xl py-10 text-center text-xs leading-relaxed text-body">{ACK}</p>
    {bottom("border-line", "hover:text-accent")}
  </div>
  <div aria-hidden="true" class="h-[9vw] max-h-32 overflow-hidden"><img src="{P}/logos/sognos-logo.svg" alt="" class="mx-auto block w-full max-w-7xl px-6" /></div>
</footer>"""

# ── A3 · Dark statement - three design styles. Lower rows follow A2:
# accreditations card (label left, logos right), centred acknowledgement,
# bottom bar, cropped wordmark at the foot.
def _wordmark(fill):
    # Cropped wordmark: masked block so it can take a gradient / tone fill.
    return (f'<div aria-hidden="true" class="h-[9vw] max-h-32 overflow-hidden px-6"><div class="mx-auto aspect-[223/57] w-full max-w-[calc(80rem-3rem)] sg-wm" '
            f'style="background:{fill}"></div></div>')


def _logo_mark(n, logo):
    return f'<img src="{P}/logos/{logo}" alt="{n}" class="h-6 w-auto brightness-0 invert" />' if logo else f'<span class="font-heading text-xl">{n}</span>'


def _products_dark(style):
    if style == "cards":  # gradient chips on translucent cards
        return '<ul class="mt-4 space-y-2">' + "".join(
            f'<li><a href="#" class="group flex min-h-14 items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 px-3 py-3 transition-colors hover:border-white/30 {FOCUS}"><span class="flex items-center gap-3"><span class="size-8 rounded" style="background:{g}"></span><span class="font-heading text-lg">{n}</span></span><span aria-hidden="true" class="text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:text-white">&rarr;</span></a></li>'
            for n, h, t, c, logo, g in PRODUCTS) + "</ul>"
    if style == "bars":  # product-colour edge + white logo
        return '<ul class="mt-4 space-y-2">' + "".join(
            f'<li><a href="#" class="group flex min-h-16 items-center justify-between gap-4 rounded-r-lg border-l-[3px] bg-white/[.03] px-4 py-3 transition-colors hover:bg-white/[.07] {FOCUS}" style="border-color:{c}">{_logo_mark(n, logo)}<span aria-hidden="true" class="text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:text-white">&rarr;</span></a></li>'
            for n, h, t, c, logo, g in PRODUCTS) + "</ul>"
    return '<ul class="mt-4 divide-y divide-white/10 border-y border-white/10">' + "".join(  # rows
        f'<li><a href="#" class="group flex min-h-16 items-center justify-between gap-4 py-3 {FOCUS}">{_logo_mark(n, logo)}<span class="flex items-center gap-3"><span class="size-2 rounded-full" style="background:{c}"></span><span aria-hidden="true" class="text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:text-white">&rarr;</span></span></a></li>'
        for n, h, t, c, logo, g in PRODUCTS) + "</ul>"


def a3(key, surface, products, card, wordmark, book, stop="text-accent"):
    return f"""<footer data-fa="{key}" class="text-white" style="background:{surface}" hidden>
  <div class="mx-auto max-w-7xl px-6">
    <div class="grid grid-cols-1 items-end gap-8 border-b border-white/10 py-16 md:py-24 lg:grid-cols-12 lg:gap-10">
      <h2 class="font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-balance md:text-6xl lg:col-span-7">{CTA_H}<span class="{stop}">.</span></h2>
      <div class="lg:col-span-5"><p class="{T["body"]} text-white/75">{CTA_S}</p>
        <div class="mt-6 flex flex-wrap items-center gap-4">{BOOK(book)}<a href="#" class="inline-flex min-h-11 items-center gap-1.5 px-2 text-base font-medium text-white hover:opacity-80 {FOCUS}">Talk to Sales {ARR}</a></div></div>
    </div>
    <div class="grid grid-cols-1 gap-x-8 gap-y-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
      <nav aria-label="Products" class="sm:col-span-2 lg:col-span-4"><p class="text-sm text-white/60">Products</p>{_products_dark(products)}</nav>
      {columns("text-sm text-white/60", "text-white/85 hover:text-white")}
    </div>
    <div class="grid grid-cols-1 gap-6 rounded-lg border p-6 lg:grid-cols-12 lg:items-center lg:p-8 {card}">
      <p class="text-sm text-white/60 lg:col-span-3">Accreditations &amp; memberships</p>
      <ul aria-label="Accreditations and memberships" class="flex flex-wrap gap-3 lg:col-span-9 lg:justify-end lg:gap-4">{accred("rounded bg-white")}</ul>
    </div>
    <p class="mx-auto max-w-4xl py-10 text-center text-xs leading-relaxed text-white/70">{ACK}</p>
    {bottom("border-white/10 text-white/80", "hover:text-white")}
  </div>
  {_wordmark(wordmark)}
</footer>"""


# A3a Care dark: care-dark, dot rows, translucent card, white/10 wordmark.
A3A = a3("3a", "#0f1936", "rows", "border-white/10 bg-white/5", "rgb(255 255 255 / .1)",
         "bg-accent text-white hover:bg-white hover:text-heading focus-visible:outline-white")
# A3b Glow: care-base / accent glows, gradient-chip cards, gradient wordmark.
A3B = a3("3b", "radial-gradient(55% 40% at 0% 0%, rgba(59,111,224,.45), transparent 70%), radial-gradient(45% 35% at 100% 55%, rgba(29,150,252,.25), transparent 70%), #0f1936",
         "cards", "border-white/15 bg-white/[.06] backdrop-blur", "linear-gradient(90deg, #3b6fe0, #1d96fc, #59bbf7)",
         "bg-white text-heading hover:bg-accent hover:text-white focus-visible:outline-white", stop="text-[#59bbf7]")
# A3c Midnight: deepest navy, product-colour edge bars, tone-on-tone navy wordmark.
A3C = a3("3c", "#060e28", "bars", "border-white/10 bg-[#0f1936]", "#152248",
         "bg-accent text-white hover:bg-white hover:text-heading focus-visible:outline-white")

OPTS = [("1", "A1", "Editorial white"), ("2", "A2", "Tint + navy panel"), ("3a", "A3a", "Care dark"), ("3b", "A3b", "Glow"), ("3c", "A3c", "Midnight"), ("b", "B", "Navy bento"), ("c", "C", "Index rows")]
FOOTER_SET = (A1, A2, A3A, A3B, A3C, f["B"], f["C"])
SW = '<div class="fixed bottom-5 left-1/2 z-[60] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-care-dark/90 p-1 text-xs text-white backdrop-blur">' + "".join(
    f'<button type="button" data-pick="{k}" aria-pressed="{str(k == "1").lower()}" class="whitespace-nowrap rounded-full px-3.5 py-2 hover:bg-white/10 aria-pressed:bg-white aria-pressed:text-care-dark">{t} &middot; {n}</button>' for k, t, n in OPTS) + "</div>"
JS = """<script>
  (() => {
    const pick = (k) => { document.querySelectorAll("[data-fa]").forEach((f) => (f.hidden = f.dataset.fa !== k)); document.querySelectorAll("[data-pick]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.pick === k))); try { localStorage.setItem("sognos-footer-a", k); } catch {} };
    document.querySelectorAll("[data-pick]").forEach((b) => b.addEventListener("click", () => pick(b.dataset.pick)));
    let s = null; try { s = localStorage.getItem("sognos-footer-a"); } catch {} if (s && document.querySelector(`[data-pick="${s}"]`)) pick(s);
  })();
</script>"""
NOTE = """Footer option A (Statement) - design styles, 2026-10-26. Same layout and hierarchy, different surface and treatment.
A1 Editorial white: white, hairline dividers, dot product rows, faint oversized wordmark.
A2 Tint + navy panel: tint surface, statement inside a navy gradient panel, product rows as white cards with gradient chips, accreditations card, solid wordmark cropped at the foot.
A3 Dark statement - three styles; the lower rows follow A2 (accreditations card, centred acknowledgement, bottom bar, cropped wordmark):
  A3a Care dark: care-dark, white product logos in dot rows, translucent card, white/10 wordmark.
  A3b Glow: care-base / accent glows, gradient-chip product cards, frosted card, care-to-roster gradient wordmark.
  A3c Midnight: deepest navy, product-colour edge bars, navy card, tone-on-tone navy wordmark.
Accreditations: stacked Compass ISO 27001 mark; all four logos trimmed (public/logos/accreditations/*-trim.png) and sized for equal optical area.
Live copy and every live footer href. Switcher (bottom) is review-only."""
NOTE += """
Layouts B and C (from the first round) are kept for comparison:
  B Navy bento: deepest navy, rounded tiles - gradient CTA tile, product tiles, link tiles, accreditations strip.
  C Index rows: tint, slim CTA strip, label-left / links-inline rows, product pills.
One source: footer/index.html, home/footer.html and the shared page fragment all render this set."""
page("index.html", "Footer - layout + design options", NOTE, STUB + "".join(FOOTER_SET) + SW + JS)
# Home section file (like 01-hero / 02-product-cards): same set, own folder.
_out = page.__globals__["OUT"]
page.__globals__["OUT"] = Path(_out).parent / "home"
page("footer.html", "Home - footer", NOTE, STUB + "".join(FOOTER_SET) + SW + JS)
page.__globals__["OUT"] = _out
print("wrote footer/index.html + home/footer.html")

# Shared fragment for every page-level mockup (index / archive): the three
# styles + a small bottom-left switcher keyed on <html data-foot>. Injected by
# inject_footer.py (and by build_mockups.page() on regeneration).
FRAG_SW = '<div data-foot-sw class="fixed bottom-4 left-4 max-sm:bottom-auto max-sm:left-auto max-sm:right-4 max-sm:top-36 z-[61] flex max-w-[calc(100vw-2rem)] items-center overflow-x-auto gap-1 rounded-full border border-white/15 bg-care-dark/90 p-1 text-xs text-white backdrop-blur"><span class="px-2 text-white/60">Footer</span>' + "".join(
    f'<button type="button" data-foot-pick="{k}" class="whitespace-nowrap rounded-full px-3 py-1.5 hover:bg-white/10 aria-pressed:bg-white aria-pressed:text-care-dark">{t}</button>' for k, t, _ in OPTS) + "</div>"
FRAG = (
    "<style>" + __import__("runpy").run_path(str(Path(__file__).with_name("logo_mask.py")))["WM_CSS"] + ", ".join(f'html[data-foot="{k}"] [data-fa]:not([data-fa="{k}"])' for k, _, _ in OPTS) + " { display: none !important; }</style>"
    + "".join(x.replace('" hidden>', '">', 1) for x in FOOTER_SET)
    + FRAG_SW
    + """<script>
  (() => {
    const set = (k) => { document.documentElement.dataset.foot = k; document.querySelectorAll("[data-foot-pick]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.footPick === k))); try { localStorage.setItem("sognos-mockup-footer", k); } catch {} };
    document.querySelectorAll("[data-foot-pick]").forEach((b) => b.addEventListener("click", () => set(b.dataset.footPick)));
    let k = "1"; try { k = localStorage.getItem("sognos-mockup-footer") || "1"; } catch {} if (!document.querySelector(`[data-foot-pick="${k}"]`)) k = "1"; set(k);
  })();
</script>"""
)
Path(__file__).with_name("footer_fragment.html").write_text(FRAG)
print("wrote footer_fragment.html")
