"""Footer - three new layout/style options (mockup).
  python3 -I <this file> docs/mockups/sognoscare docs/mockups/footer
"""
import runpy
import sys
from pathlib import Path

CARE_OUT, OUT = sys.argv[1], Path(sys.argv[2])
sys.argv = [sys.argv[0], CARE_OUT]
ns = runpy.run_path(str(Path(__file__).with_name("build_mockups.py")))
OUT.mkdir(parents=True, exist_ok=True)
page = ns["page"]
page.__globals__["OUT"] = OUT
T, P, label = ns["T"], ns["P"], ns["label"]

# Live footer content (localhost:3002, 2026-10-26) + lib/content/ctaBand.ts + lib/constants PRODUCTS.
TAGLINE = "Field Service Innovations with Microsoft Dynamics"
CTA_H = "Transform the way you work"
CTA_S = "Discover how one intelligent platform helps you simplify operations, empower your workforce, and make faster, data-driven decisions."
PRODUCTS = [
    ("SognosCare", "/products/sognoscare", "Care operations &amp; compliance platform", "#3b6fe0", "sognos-care-logo.svg", "linear-gradient(120deg,#0f1936,#203e71,#3b6fe0)"),
    ("SognosRoster", "/products/sognosroster", "Workforce scheduling &amp; optimisation engine", "#59bbf7", "sognos-roster-logo.svg", "linear-gradient(120deg,#03112f,#104b90,#1d96fc)"),
    ("SognosGenogram", "/products/sognosgenogram", "Relationship &amp; family context platform", "#91278c", "SognosGenogram-logo.svg", "linear-gradient(120deg,#1a0224,#4a1670,#91278c)"),
    ("DigPacks", "/products/digpacks", "Partnership accelerator solutions", "#1d96fc", None, "linear-gradient(120deg,#0f1936,#152248,#1d96fc)"),
]
GROUPS = {
    "Solutions": ["Frontline", "Customer Relationship Management", "Customer Insights", "Customer Experience", "Customer Service", "Power Platform", "Quick Start", "Finance &amp; Operations"],
    "Industries": ["Health &amp; Social Care", "Facilities Management", "Local Government", "Industrial Services", "Energy &amp; Utilities"],
    "Resources": ["Knowledge Hub", "News", "Events", "Customer Stories"],
    "Company": ["About", "Social Responsibility", "Careers", "Contact"],
}
LEGAL = ["Privacy Policy", "Privacy Collection Notice", "ISMS Policy"]
# Trimmed copies (built-in whitespace removed) sized for equal optical area
# (~3,600px2): height = sqrt(area / aspect). ISO 1.15:1, NSW 3.88:1, AIDH 1.77:1, THT 3.02:1.
ACCRED = [
    ("iso-27001-stacked-trim.png", "ISO 27001 Information Security - certified by Compass Assurance Services", "h-13"),
    ("nsw-ict-services-trim.png", "NSW Government Approved Supplier - SCM0020 Prequalification Scheme: ICT Services", "h-7.5"),
    ("aidh-trim.png", "Australasian Institute of Digital Health - Organisational Member", "h-10.5"),
    ("talking-health-tech-trim.png", "Talking HealthTech partner", "h-8.5"),
]
ACK = "We respect and honour Aboriginal and Torres Strait Islander Elders past, present, and future.<br />We acknowledge the stories, traditions, and living cultures of Aboriginal and Torres Strait Islander peoples on the lands upon which we work and live, and commit to building a brighter future together."
COPY = "&copy; 2026 Sognos. All rights reserved"

FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
ARR = '<span aria-hidden="true">&#8599;</span>'


def links(items, cls, sep=""):
    return sep.join(f'<li><a href="#" class="{cls} {FOCUS}">{t}</a></li>' for t in items)


def accred(tile, cell="h-20 px-6"):
    return "".join(f'<li><a href="#" title="{a}" class="block {FOCUS}"><span class="flex {cell} items-center justify-center {tile}"><img src="{P}/logos/accreditations/{f}" alt="{a}" class="{h} w-auto max-w-none object-contain" /></span></a></li>' for f, a, h in ACCRED)


BOOK = lambda cls: f'<button type="button" class="min-h-11 rounded-full px-7 py-3 text-base font-medium transition-colors {cls} focus-visible:outline-2 focus-visible:outline-offset-4">Book a Demo</button>'
LOGO = f'<img src="{P}/logos/sognos-logo.svg" alt="Sognos" class="h-7 w-auto"/>'
LOGO_W = f'<img src="{P}/logos/sognos-logo.svg" alt="Sognos" class="h-7 w-auto brightness-0 invert"/>'

# ── A · Statement (white, editorial, oversized wordmark) ──────────────────
A = f"""<footer data-ft="a" class="border-t border-line bg-white text-body">
  <div class="mx-auto max-w-7xl px-6">
    <div class="grid grid-cols-1 items-end gap-8 py-16 md:py-24 lg:grid-cols-12 lg:gap-10">
      <h2 class="font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-heading text-balance md:text-6xl lg:col-span-7">{CTA_H}</h2>
      <div class="lg:col-span-5"><p class="{T["body"]} text-body">{CTA_S}</p>
        <div class="mt-6 flex flex-wrap items-center gap-4">{BOOK("bg-heading text-white hover:bg-accent focus-visible:outline-accent")}<a href="#" class="inline-flex min-h-11 items-center gap-1.5 px-2 text-base font-medium text-heading hover:opacity-80 {FOCUS}">Talk to Sales {ARR}</a></div></div>
    </div>
    <div class="grid grid-cols-1 gap-x-8 gap-y-10 border-t border-line py-14 sm:grid-cols-2 lg:grid-cols-12">
      <nav aria-label="Products" class="sm:col-span-2 lg:col-span-4">
        <p class="text-sm text-muted">Products</p>
        <ul class="mt-4 divide-y divide-line border-y border-line">{"".join(f'<li><a href="#" class="group flex min-h-14 items-center justify-between gap-4 py-3 {FOCUS}"><span class="flex items-center gap-3"><span class="size-2.5 rounded-full" style="background:{c}"></span><span class="font-heading text-xl text-heading">{n}</span></span><span class="hidden text-xs text-muted sm:block xl:hidden 2xl:block">{t}</span><span aria-hidden="true" class="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent">&rarr;</span></a></li>' for n, h, t, c, _, _ in PRODUCTS)}</ul>
      </nav>
      {"".join(f'<nav aria-label="{g}" class="lg:col-span-2"><p class="text-sm text-muted">{g}</p><ul class="mt-4 space-y-1">{links(items, "inline-flex min-h-9 items-center text-sm text-heading hover:text-accent")}</ul></nav>' for g, items in GROUPS.items())}
    </div>
    <div class="flex flex-col gap-6 border-t border-line py-8 lg:flex-row lg:items-center lg:justify-between">
      <ul class="flex flex-wrap gap-3 lg:gap-4">{accred("rounded border border-line bg-white")}</ul>
      <p class="max-w-xl text-xs leading-relaxed text-muted lg:text-right">{ACK}</p>
    </div>
    <div class="flex flex-col gap-3 border-t border-line py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
      <p>{COPY}</p><ul class="flex flex-wrap gap-x-6">{links(LEGAL, "inline-flex min-h-11 items-center text-body hover:text-accent")}</ul>
    </div>
  </div>
  <div aria-hidden="true" class="overflow-hidden px-6 pb-6"><img src="{P}/logos/sognos-logo.svg" alt="" class="mx-auto block w-full max-w-7xl opacity-[.06]" /></div>
</footer>"""

# ── B · Navy bento (tiles, product gradients) ─────────────────────────────
TILE = "rounded-lg border border-white/10 bg-white/[.04] p-6 lg:p-8"
B = f"""<footer data-fa="b" class="bg-[#060e28] text-white" hidden>
  <div class="mx-auto max-w-7xl px-6 py-16 md:py-20">
    <div class="grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12 lg:gap-4">
      <section class="relative overflow-hidden rounded-lg p-8 md:col-span-6 lg:col-span-7 lg:row-span-2 lg:p-12" style="background: radial-gradient(70% 80% at 15% 15%, rgba(59,111,224,.45), transparent 70%), radial-gradient(60% 70% at 95% 100%, rgba(29,150,252,.35), transparent 70%), #0f1936">
        <img src="{P}/images/cta-bg.svg" alt="" aria-hidden="true" class="pointer-events-none absolute inset-x-0 bottom-0 w-full mix-blend-luminosity" />
        <div class="relative flex h-full flex-col justify-between gap-12">
          {LOGO_W}
          <div><h2 class="font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-balance md:text-5xl">{CTA_H}</h2><p class="mt-4 max-w-lg {T["body"]} text-white/75">{CTA_S}</p>
            <div class="mt-8 flex flex-wrap items-center gap-4">{BOOK("bg-white text-heading hover:bg-accent hover:text-white focus-visible:outline-white")}<a href="#" class="inline-flex min-h-11 items-center gap-1.5 px-2 text-base font-medium text-white hover:opacity-80 {FOCUS}">Talk to Sales {ARR}</a></div></div>
        </div>
      </section>
      {"".join(f'''<a href="#" class="group relative flex min-h-36 flex-col justify-between overflow-hidden rounded-lg p-5 md:col-span-3 lg:col-span-{"5" if k == 0 else "5"} {FOCUS}" style="background:{g}">
        <span class="flex items-center justify-between">{f'<img src="{P}/logos/{logo}" alt="{n}" class="h-6 w-auto brightness-0 invert" />' if logo else f'<span class="font-heading text-xl">{n}</span>'}<span aria-hidden="true" class="flex size-9 items-center justify-center rounded-full border border-white/30 transition-colors group-hover:bg-white group-hover:text-heading">&rarr;</span></span>
        <span class="text-sm text-white/80">{t}</span>
      </a>''' for k, (n, h, t, c, logo, g) in enumerate(PRODUCTS[:2]))}
      {"".join(f'''<a href="#" class="group relative flex min-h-36 flex-col justify-between overflow-hidden rounded-lg p-5 md:col-span-3 lg:col-span-{"3" if n == "SognosGenogram" else "4"} {FOCUS}" style="background:{g}">
        <span class="flex items-center justify-between">{f'<img src="{P}/logos/{logo}" alt="{n}" class="h-6 w-auto brightness-0 invert" />' if logo else f'<span class="font-heading text-xl">{n}</span>'}<span aria-hidden="true" class="flex size-9 items-center justify-center rounded-full border border-white/30 transition-colors group-hover:bg-white group-hover:text-heading">&rarr;</span></span>
        <span class="text-sm text-white/80">{t}</span>
      </a>''' for n, h, t, c, logo, g in PRODUCTS[2:])}
      <nav aria-label="Solutions" class="{TILE} md:col-span-3 lg:col-span-5"><p class="text-sm text-white/60">Solutions</p><ul class="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-2">{links(GROUPS["Solutions"], "inline-flex min-h-10 items-center text-sm text-white/85 hover:text-white")}</ul></nav>
      <nav aria-label="Industries" class="{TILE} md:col-span-3 lg:col-span-4"><p class="text-sm text-white/60">Industries</p><ul class="mt-4">{links(GROUPS["Industries"], "inline-flex min-h-10 items-center text-sm text-white/85 hover:text-white")}</ul></nav>
      <div class="{TILE} grid grid-cols-2 gap-6 md:col-span-6 lg:col-span-8">{"".join(f'<nav aria-label="{g}"><p class="text-sm text-white/60">{g}</p><ul class="mt-4">{links(GROUPS[g], "inline-flex min-h-10 items-center text-sm text-white/85 hover:text-white")}</ul></nav>' for g in ("Resources", "Company"))}</div>
      <div class="{TILE} flex flex-col gap-5 md:col-span-6 lg:col-span-12 lg:flex-row lg:items-center lg:justify-between"><p class="text-sm text-white/60">Accreditations &amp; memberships</p><ul class="flex flex-wrap gap-3 lg:gap-4">{accred("rounded bg-white")}</ul></div>
    </div>
    <p class="mx-auto mt-12 max-w-4xl text-center text-xs leading-relaxed text-white/70">{ACK}</p>
    <div class="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between"><p>{COPY}</p><ul class="flex flex-wrap gap-x-6">{links(LEGAL, "inline-flex min-h-11 items-center hover:text-white")}</ul></div>
  </div>
</footer>"""

# ── C · Index rows (tint, CTA strip, label rail rows) ─────────────────────
def row(name, inner):
    return f'<div class="grid grid-cols-1 gap-3 border-t border-line py-6 md:grid-cols-12 md:gap-8"><div class="md:col-span-3">{label(name, sticky=False).replace("text-lg", "text-base")}</div><nav aria-label="{name}" class="md:col-span-9">{inner}</nav></div>'


inline = lambda items: f'<ul class="flex flex-wrap gap-x-6 gap-y-1">{links(items, "inline-flex min-h-10 items-center text-base text-heading underline-offset-4 hover:text-accent hover:underline")}</ul>'
C = f"""<footer data-fa="c" class="bg-tint text-body" hidden>
  <div class="border-y border-line bg-white">
    <div class="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
      <p class="flex items-center gap-3 font-heading text-xl text-heading md:text-2xl"><span aria-hidden="true" class="size-2.5 bg-accent"></span>{CTA_H}</p>
      <div class="flex flex-wrap items-center gap-3">{BOOK("bg-accent text-white hover:bg-heading focus-visible:outline-accent")}<a href="#" class="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-white px-5 text-base font-medium text-heading hover:border-heading {FOCUS}">Talk to Sales {ARR}</a></div>
    </div>
  </div>
  <div class="mx-auto max-w-7xl px-6 py-14 md:py-20">
    <div class="grid grid-cols-1 gap-8 pb-10 md:grid-cols-12 md:gap-8">
      <div class="md:col-span-3">{LOGO}<p class="mt-4 max-w-xs text-sm text-body">{TAGLINE}</p></div>
      <p class="max-w-2xl {T["body"]} text-body md:col-span-9">{CTA_S}</p>
    </div>
    {row("Products", '<ul class="flex flex-wrap gap-2">' + "".join(f'<li><a href="#" class="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm text-heading transition-colors hover:border-heading {FOCUS}"><span class="size-2 rounded-full" style="background:{c}"></span>{n}</a></li>' for n, h, t, c, _, _ in PRODUCTS) + "</ul>")}
    {"".join(row(g, inline(items)) for g, items in GROUPS.items())}
    <div class="grid grid-cols-1 gap-6 border-t border-line py-8 md:grid-cols-12 md:gap-8">
      <p class="text-sm text-muted md:col-span-3">Accreditations &amp; memberships</p>
      <ul class="flex flex-wrap gap-3 md:col-span-9 lg:gap-4">{accred("rounded border border-line bg-white")}</ul>
    </div>
    <p class="border-t border-line py-8 text-xs leading-relaxed text-body md:pl-[25%]">{ACK}</p>
    <div class="flex flex-col gap-3 border-t border-line pt-6 text-sm sm:flex-row sm:items-center sm:justify-between"><p>{COPY}</p><ul class="flex flex-wrap gap-x-6">{links(LEGAL, "inline-flex min-h-11 items-center hover:text-accent")}</ul></div>
  </div>
</footer>"""

STUB = f'<section class="bg-tint py-24"><div class="mx-auto max-w-7xl px-6"><p class="{T["h2"]} text-heading">Page content (stub)</p><p class="mt-2 text-sm text-muted">Scroll down - the footer options start below.</p></div></section>'
OPTS = [("a", "Statement"), ("b", "Navy bento"), ("c", "Index rows")]
SW = '<div class="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-care-dark/90 p-1 text-xs text-white backdrop-blur">' + "".join(
    f'<button type="button" data-pick="{k}" aria-pressed="{str(k == "a").lower()}" class="whitespace-nowrap rounded-full px-3.5 py-2 hover:bg-white/10 aria-pressed:bg-white aria-pressed:text-care-dark">{k.upper()} &middot; {n}</button>' for k, n in OPTS) + "</div>"
JS = """<script>
  (() => {
    const pick = (k) => { document.querySelectorAll("[data-ft]").forEach((f) => (f.hidden = f.dataset.ft !== k)); document.querySelectorAll("[data-pick]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.pick === k))); try { localStorage.setItem("sognos-footer-opt", k); } catch {} };
    document.querySelectorAll("[data-pick]").forEach((b) => b.addEventListener("click", () => pick(b.dataset.pick)));
    let s = null; try { s = localStorage.getItem("sognos-footer-opt"); } catch {} if (s) pick(s);
  })();
</script>"""
NOTE = """Footer - three new options, 2026-10-26. Live copy and links (current option B footer on localhost:3002 + lib/content/ctaBand.ts).
A Statement: white editorial. Large CTA headline split with the subheading and CTAs; product index rows (dot + name + tagline); four link columns; accreditations beside the acknowledgement; oversized faint wordmark at the foot.
B Navy bento: deepest navy. Rounded tiles - a large CTA tile (gradient + dot grid), product tiles on their own gradients, link tiles, accreditations strip.
C Index rows: tint. Slim white CTA strip on top; AngelList-style rows - square-marker label left, links inline right; products as pills with dots.
All: every live href (Products 4, Solutions 8, Industries 5, Resources 4, Company 4, Legal 3, 4 accreditations), "Book a Demo" + "Talk to Sales", no shadows. Switcher (bottom) is review-only."""
# Layout data + B / C markup only - build_footer_a.py writes the consolidated
# footer/index.html (A1-A3c + B + C) and home/footer.html.
