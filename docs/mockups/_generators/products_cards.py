"""Direction C (Editorial) feature-card variations + Customer Stories layout D (Story stage)
for docs/mockups/products. Imported by build_products.py via runpy (needs P, T, FOCUS, ARR,
eyebrow, STORIES passed to stage())."""

# ── Editorial feature cards ──────────────────────────────────────────────────
# (attr, label, kind, options, default). Options: (key, name[, swatch bg]).
FC = [
    ("fc-arr", "Arrangement", "seg", [("stack", "Stacked"), ("alt", "Alternate")], "alt"),
    ("fc-side", "Image position", "seg", [("left", "Left"), ("right", "Right")], "left"),
    ("fc-split", "Columns · text : image", "seg", [("half", "1 : 1"), ("tn", "5 : 7"), ("tw", "7 : 5")], "half"),
    ("fc-pos", "Text position", "seg", [("top", "Top"), ("center", "Centre"), ("split", "Split · copy at bottom")], "center"),
    ("fc-card", "Card surface", "swatch", [("rows", "Rows · divider", ""), ("stint", "Sognos tint #f9fafe", "#f9fafe"), ("gray", "Gray #f3f4f6", "#f3f4f6"),
                                          ("soft", "Product tint", "var(--p-soft)"), ("white", "White · bordered", "#fff"), ("deep", "Deep", "var(--p-deep)")], "rows"),
    ("fc-eb", "Eyebrow + border colour", "swatch", [("ink", "Product ink", "var(--p-ink)"), ("base", "Product", "var(--p-base)"), ("accent", "Accent #1e96fc", "#1e96fc"), ("muted", "Muted", "#68706f")], "ink"),
]
FC_TOGGLES = [("fc-num", "Counter · 01 / 06", "on"), ("fc-eyebrow", "Eyebrow", "on"), ("fc-title", "Title", "on"), ("fc-copy", "Copy", "on"),
              ("fc-rule", "Copy accent border", "off"), ("fc-link", "Link", "off"), ("fc-btn", "Button", "off")]
# The SognosCare index features card (docs/mockups/sognoscare/index.html).
FC_CARE = {"fc-arr": "stack", "fc-side": "right", "fc-split": "half", "fc-pos": "split", "fc-card": "stint", "fc-eb": "accent",
           "fc-num": "off", "fc-eyebrow": "on", "fc-title": "on", "fc-copy": "on", "fc-rule": "on", "fc-link": "off", "fc-btn": "off"}
FC_DEFAULTS = {a: d for a, _, _, _, d in FC} | {a: d for a, _, d in FC_TOGGLES}

_LIGHT_TONES = ("accent", "product", "dark", "grad", "glow")
_VIS_LEFT = ('html[data-fc-side="left"][data-fc-arr="stack"] .fc, html[data-fc-side="left"][data-fc-arr="alt"] .fc:nth-child(odd), '
             'html[data-fc-side="right"][data-fc-arr="alt"] .fc:nth-child(even)')
_SURF = {"stint": "#f9fafe", "gray": "#f3f4f6", "soft": "var(--p-soft)", "white": "#fff", "deep": "var(--p-deep)"}
_EB = {"ink": "var(--p-ink)", "base": "var(--p-base)", "accent": "#1e96fc", "muted": "#68706f"}

FC_CSS = "<style>\n" + "\n".join([
    "  .fc { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.5rem; align-items: center; --fc-eb: var(--p-ink); }",
    "  .fc-txt { display: flex; flex-direction: column; gap: 1.25rem; min-width: 0; }",
    "  .fc-head { display: flex; flex-direction: column; gap: .5rem; } .fc-num { margin-bottom: .75rem; }",
    "  .fc-foot { display: flex; flex-direction: column; gap: 1.25rem; } .fc-act { display: flex; flex-wrap: wrap; align-items: center; gap: .5rem 1.25rem; }",
    "  .fc-eb { color: var(--fc-eb); }",
    '  html[data-fc-rule="on"] .fc-copy { border-left: 2px solid var(--fc-eb); padding-left: 1rem; }',
    '  html[data-fc-pos="top"] .fc-txt { align-self: start; }',
    '  html[data-fc-pos="split"] .fc-txt { align-self: stretch; justify-content: space-between; gap: 2rem; }',
    "  @media (min-width: 768px) {",
    "    .fc { grid-template-columns: var(--fc-t, 1fr) var(--fc-v, 1fr); gap: 3rem; }",
    '    html[data-fc-split="tn"] .fc { --fc-t: 5fr; --fc-v: 7fr; } html[data-fc-split="tw"] .fc { --fc-t: 7fr; --fc-v: 5fr; }',
    f"    {_VIS_LEFT} {{ grid-template-columns: var(--fc-v, 1fr) var(--fc-t, 1fr); }}",
    "    " + ", ".join(s + " > .fc-vis" for s in _VIS_LEFT.split(", ")) + " { order: -1; }",
    "  }",
    # Rows: divider list (original Editorial). Cards: padded rounded surfaces with a gap.
    '  html[data-fc-card="rows"] .fc { border-top-width: 1px; padding: 2.5rem 0; }',
    '  @media (min-width: 1024px) { html[data-fc-card="rows"] .fc { padding: 3.5rem 0; } }',
    '  html:not([data-fc-card="rows"]) .fc-list { display: flex; flex-direction: column; gap: 1rem; }',
    '  html:not([data-fc-card="rows"]) .fc { border-radius: .5rem; padding: 1.5rem; }',
    '  @media (min-width: 768px) { html:not([data-fc-card="rows"]) .fc { padding: 2rem; } }',
    '  @media (min-width: 1024px) { html:not([data-fc-card="rows"]) .fc-list { gap: 1.5rem; } html:not([data-fc-card="rows"]) .fc { padding: 2.5rem; } }',
    *[f'  html[data-fc-card="{k}"] .fc {{ background: {v}; }}' for k, v in _SURF.items()],
    '  html[data-fc-card="white"] .fc { border-width: 1px; }',
    *[f'  html[data-fc-eb="{k}"] .fc {{ --fc-eb: {v}; }}' for k, v in _EB.items()],
    # Card text keeps its own colours whatever the section tone (beats tone_css by specificity).
    '  html:not([data-fc-card="rows"]) .fc.fc .fc-txt :is(.text-heading, h3) { color: var(--color-heading) !important; opacity: 1; }',
    '  html:not([data-fc-card="rows"]) .fc.fc .fc-txt .text-body { color: var(--color-body) !important; opacity: 1; }',
    '  html:not([data-fc-card="rows"]) .fc.fc .fc-txt .text-muted { color: var(--color-muted) !important; opacity: 1; }',
    '  html:not([data-fc-card="rows"]) .fc.fc .fc-btn { background: var(--p-base) !important; color: #fff !important; }',
    '  html[data-fc-card="deep"] .fc.fc .fc-txt :is(.text-heading, h3) { color: #fff !important; }',
    '  html[data-fc-card="deep"] .fc.fc .fc-txt .text-body { color: rgb(255 255 255 / .8) !important; }',
    '  html[data-fc-card="deep"] .fc.fc .fc-txt .text-muted { color: rgb(255 255 255 / .6) !important; }',
    '  html[data-fc-card="deep"][data-fc-eb="ink"] .fc { --fc-eb: var(--p-accent); }',
    '  html[data-fc-card="deep"][data-fc-eb="muted"] .fc { --fc-eb: rgb(255 255 255 / .6); }',
    "  " + ", ".join(f'html[data-fc-card="rows"][data-tone-features="{t}"] .fc' for t in _LIGHT_TONES) + " { --fc-eb: rgb(255 255 255 / .85); }",
    # Element visibility
    *[f'  html[data-{a}="off"] .{a} {{ display: none; }}' for a in ("fc-num", "fc-title", "fc-copy", "fc-link", "fc-btn")],
    '  html[data-fc-eyebrow="off"] .fc-eb { display: none; }',
    '  html[data-fc-link="off"][data-fc-btn="off"] .fc-act { display: none; }',
]) + "\n</style>"


# ── Customer Stories · D · Story stage ───────────────────────────────────────
STORY_STAGE = {  # logo -> (photo, sector)
    "flourish-australia-logo.png": ("images/customers/flourish-australia.avif", "Mental health &amp; disability"),
    "auckland-airport-logo.png": ("images/customers/auckland-airport.webp", "Aviation &middot; Field service"),
    "penrith-city-council-logo.png": ("images/customers/penrith-city-council.png", "Local government"),
}


def stage(P, T, FOCUS, ARR, eyebrow, stories):
    """Photo-led stage + oversized quote, driven by a tabbed customer index with progress
    timers (auto-advance, pauses on hover / focus; static under reduced motion)."""
    org = lambda r: r.split(", ")[-1]
    slides = "".join(
        f'<div class="st-slide absolute inset-0{" is-on" if i == 0 else ""}" data-st="{i}"><img src="{P}/{STORY_STAGE[l][0]}" alt="" class="absolute inset-0 size-full object-cover" />'
        f'<div class="absolute inset-0" style="background:linear-gradient(180deg, transparent 35%, color-mix(in srgb, var(--p-deep) 85%, transparent))"></div>'
        f'<div class="absolute inset-x-6 bottom-6 flex flex-col items-start gap-4 lg:inset-x-10 lg:bottom-10"><img src="{P}/logos/{l}" alt="" class="h-8 w-auto brightness-0 invert" />'
        f'<p class="rounded-full border border-white/25 px-3 py-1 text-xs text-white/85">{STORY_STAGE[l][1]}</p><p class="font-heading text-3xl leading-tight text-white md:text-4xl">{org(r)}</p></div></div>'
        for i, (q, n, r, l) in enumerate(stories))
    quotes = "".join(
        f'<figure class="st-q flex flex-col justify-between gap-10{" is-on" if i == 0 else ""}" data-st="{i}"><blockquote class="font-heading text-xl leading-snug text-heading text-pretty md:text-2xl">{q}</blockquote>'
        f'<figcaption class="flex flex-wrap items-end justify-between gap-4 border-t border-line pt-5"><span class="text-sm"><span class="text-heading">{n}</span><br/><span class="text-muted">{r}</span></span>'
        f'<a href="#" class="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-heading transition-opacity hover:opacity-80 {FOCUS}">Read the story {ARR}</a></figcaption></figure>'
        for i, (q, n, r, l) in enumerate(stories))
    tabs = "".join(
        f'<button type="button" role="tab" data-st-tab="{i}" aria-selected="{str(i == 0).lower()}" class="st-tab flex min-h-11 flex-col gap-4 rounded-lg border border-line p-4 text-left transition-colors hover:border-heading aria-selected:border-heading lg:p-5 {FOCUS}">'
        f'<span class="flex items-center justify-between gap-3"><img src="{P}/logos/{l}" alt="" class="h-6 w-auto max-w-[60%] object-contain object-left" /><span class="text-xs tabular-nums text-muted max-sm:hidden">{i + 1:02d}</span></span>'
        f'<span class="hidden text-sm text-heading sm:block">{org(r)}</span><span aria-hidden="true" class="st-bar block h-0.5 w-full overflow-hidden bg-line"><span></span></span></button>'
        for i, (q, n, r, l) in enumerate(stories))
    step = lambda d, lab, arrow: f'<button type="button" data-st-step="{d}" aria-label="{lab}" class="flex size-11 items-center justify-center rounded-full border border-line text-heading transition-colors hover:border-heading {FOCUS}">{arrow}</button>'
    return f'''<section class="bg-white py-20 md:py-28"><div class="mx-auto max-w-7xl px-6" data-stage>
  <div class="flex flex-wrap items-end justify-between gap-6"><div class="flex max-w-3xl flex-col gap-4">{eyebrow("Customer Stories")}<h2 class="{T["h2"]} text-heading">Proof from the people who run it</h2></div>
    <div class="flex items-center gap-3"><p class="mr-1 text-sm tabular-nums text-muted"><span data-st-n>01</span> / {len(stories):02d}</p>{step(-1, "Previous story", "&larr;")}{step(1, "Next story", "&rarr;")}</div></div>
  <div class="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-4">
    <div data-keep class="relative min-h-[340px] overflow-hidden rounded-lg bg-[var(--p-deep)] sm:min-h-[420px] lg:col-span-7 lg:min-h-[560px]">{slides}</div>
    <div class="flex flex-col rounded-lg bg-tint p-6 md:p-8 lg:col-span-5 lg:p-10" style="background:var(--p-soft)"><span aria-hidden="true" class="block font-heading text-7xl leading-[.6] text-[var(--p-base)]">&ldquo;</span><div class="mt-8 grid flex-1" aria-live="polite">{quotes}</div></div>
  </div>
  <div role="tablist" aria-label="Customer stories" class="mt-3 grid grid-cols-3 gap-3 lg:mt-4 lg:gap-4">{tabs}</div>
</div></section>'''


STAGE_CSS = """<style>
  .st-slide { opacity: 0; transition: opacity .6s ease; } .st-slide.is-on { opacity: 1; }
  .st-q { grid-area: 1 / 1; opacity: 0; visibility: hidden; transition: opacity .4s ease, visibility .4s; } .st-q.is-on { opacity: 1; visibility: visible; }
  .st-bar > span { display: block; height: 100%; width: 0; background: var(--p-base); }
  .st-tab[aria-selected="true"] .st-bar > span { animation: st-prog 7s linear forwards; }
  [data-stage]:is(:hover, :focus-within) .st-tab[aria-selected="true"] .st-bar > span { animation-play-state: paused; }
  @keyframes st-prog { to { width: 100%; } }
  @media (prefers-reduced-motion: reduce) { .st-tab[aria-selected="true"] .st-bar > span { animation: none; width: 100%; } .st-slide, .st-q { transition: none; } }
</style>"""

STAGE_JS = """<script>
  document.querySelectorAll("[data-stage]").forEach((root) => {
    const tabs = [...root.querySelectorAll("[data-st-tab]")], n = tabs.length; let cur = 0;
    const go = (i) => { cur = (i + n) % n;
      root.querySelectorAll("[data-st]").forEach((el) => el.classList.toggle("is-on", +el.dataset.st === cur));
      tabs.forEach((t, k) => t.setAttribute("aria-selected", String(k === cur)));
      root.querySelector("[data-st-n]").textContent = String(cur + 1).padStart(2, "0"); };
    tabs.forEach((t, k) => t.addEventListener("click", () => go(k)));
    root.querySelectorAll("[data-st-step]").forEach((b) => b.addEventListener("click", () => go(cur + +b.dataset.stStep)));
    root.addEventListener("animationend", (e) => { if (e.animationName === "st-prog") go(cur + 1); });
  });
</script>"""
