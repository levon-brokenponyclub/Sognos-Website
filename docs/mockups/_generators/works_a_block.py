# Works with A - product cards. Three review controls (A only): card layout
# (stacked / alternating / 3-up grid), graphic (1 / 2 / 3 per product) and
# image style (Base: tint panel + white cards, as the gallery; Paraform:
# product photo under a colour wash, frosted cards, a blurred pill beneath).
# Graphic data is illustrative.

def _gp(body, loop=None):
    return ns["_panel"]("#f9fafe", loop, body)


# Genogram 2 - support network: client centre, six contacts round it.
_NET = [("Daughter", 150, 22), ("GP", 262, 62), ("Support worker", 262, 150), ("OT", 150, 190), ("Pharmacist", 38, 150), ("Neighbour", 38, 62)]
GENO_NETWORK = _gp(f"""<div data-in="1" class="{_C} w-full max-w-md p-4 text-left">
                <p class="text-sm font-medium text-heading">Support network &middot; M. Turner</p>
                <svg viewBox="0 0 300 212" class="mt-2 h-auto w-full" aria-hidden="true">
                  {"".join(f'<path class="flow" d="M150 106 L{x} {y}" stroke="#c084c9" stroke-width="1.5" fill="none"/>' for _, x, y in _NET)}
                  <circle cx="150" cy="106" r="22" fill="#91278c"/><text x="150" y="110" text-anchor="middle" font-size="11" fill="#fff" font-family="sans-serif">MT</text>
                  {"".join(f'<g class="flx-rise flx-d{min(k + 1, 4)}"><circle cx="{x}" cy="{y}" r="9" fill="#fff" stroke="#91278c" stroke-width="2"/><text x="{x}" y="{y + 22 if y > 106 else y - 14}" text-anchor="middle" font-size="9" fill="#68706f" font-family="sans-serif">{n}</text></g>' for k, (n, x, y) in enumerate(_NET))}
                </svg>
              </div>""")

# Genogram 3 - relationship history: dated events land in the record.
GENO_HISTORY = _gp(f"""<div class="w-full max-w-md space-y-3 text-left">
                <div data-in="1" class="{_C} overflow-hidden">
                  <div class="flex items-center justify-between border-b border-line px-4 py-3"><p class="text-sm font-medium text-heading">Relationship history</p><span class="text-[10px] uppercase tracking-widest text-muted">M. Turner</span></div>
                  <ol class="px-4 py-2">{"".join(f'<li class="flx-rise flx-d{min(k + 1, 4)} grid grid-cols-[3rem_1fr] gap-3 border-b border-line py-2.5 last:border-b-0"><span class="text-xs tabular-nums text-muted">{yr}</span><span class="text-sm text-heading">{ev}</span></li>' for k, (yr, ev) in enumerate([("2019", "Moved in with daughter, S. Turner"), ("2022", "S. Turner recorded as primary carer"), ("2025", "Bereavement - spouse"), ("2026", "Neighbour added as local contact")]))}</ol>
                </div>
                <p data-in="2" class="flex items-center gap-2 text-xs text-muted"><span class="size-1.5 rounded-full bg-[#91278c]"></span>Updated from a Frontline visit &middot; today</p>
              </div>""")

GFX = {
    "SognosRoster": [(R_SCHED, "Auto-roster &middot; 142 shifts filled"), (ns["R_MATCH"], "98% match &middot; P. Shah"), (ns["R_ROUTE"], "&minus;38 min travel today")],
    "SognosCare": [(ns["FV_CASE"], "Next review &middot; 12 Dec"), (ns["FV_COMPLIANCE"], "Audit-ready &middot; 0 gaps"), (ns["FV_COPILOT"], "Copilot draft ready to sign")],
    "SognosGenogram": [(GENO_PANEL, "2 family contacts linked"), (GENO_NETWORK, "Support network &middot; 6 people"), (GENO_HISTORY, "History updated from a visit")],
}
# Base panel tint + Paraform photo / wash per product.
PSTYLE = {
    "SognosRoster": (_mx("#59bbf7", 14), "RosterBg.avif", "#104b90", "#59bbf7"),
    "SognosCare": (_mx("#3b6fe0", 10), "CareBg.avif", "#0f1936", "#3b6fe0"),
    "SognosGenogram": (_mx("#91278c", 8), "GenoBg.avif", "#3a0f45", "#91278c"),
}


def _gfx(p):
    base, photo, deep, mid = PSTYLE[p["name"]]
    out = []
    for g, (panel, pill) in enumerate(GFX[p["name"]], 1):
        pill_html = f'<p data-pill class="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/40 bg-care-dark/30 px-4 py-2 text-xs text-white backdrop-blur-md"><span class="size-1.5 rounded-full" style="background:{mid}"></span>{pill}</p>'
        out.append(f'<div data-g="{g}" class="w-graphic relative" style="--pb:{base};--pimg:url({P}/product/{photo});--pdeep:{deep};--pmid:{mid}">{panel}{pill_html}</div>')
    return "".join(out)


WORKS_A = _works(f"""<div data-works-list class="works-a-list {GAP} space-y-3 lg:space-y-4">
          {"".join(f'''<div data-prod-i="{i}" class="w-card grid grid-cols-1 items-stretch gap-3 rounded-lg bg-tint p-3 md:grid-cols-2 lg:gap-4">
            <div class="w-copy flex flex-col justify-between gap-10 p-5 lg:p-8">
              <img src="{P}/logos/{p["logo"]}" alt="{p["name"]}" class="h-8 w-auto self-start" />
              <div><span aria-hidden="true" class="mb-5 block h-1 w-10 rounded-full" style="background:{PSTYLE[p["name"]][3]}"></span><p class="w-tag {T["h3"]} text-heading">{p["tag"]}</p><div class="mt-6">{_rlink(p)}</div></div>
            </div>
            <div class="w-graphics">{_gfx(p)}</div>
          </div>''' for i, p in enumerate(PRODUCTS3))}
        </div>""")

WORKS_A_CSS = """<style>
  /* Graphic 1 / 2 / 3 */
  [data-works-g="1"] .w-graphic:not([data-g="1"]), [data-works-g="2"] .w-graphic:not([data-g="2"]), [data-works-g="3"] .w-graphic:not([data-g="3"]) { display: none; }
  .w-graphic, .w-graphic > .fv { height: 100%; }
  /* Base style: product tint panel, white cards, no pill */
  [data-works-style="base"] .w-graphic > .fv { background: var(--pb) !important; }
  [data-works-style="base"] [data-pill] { display: none; }
  /* Paraform style: product photo under a colour wash, frosted cards, pill */
  [data-works-style="paraform"] .w-graphic > .fv {
    background: linear-gradient(160deg, color-mix(in srgb, var(--pdeep) 55%, transparent), color-mix(in srgb, var(--pmid) 35%, transparent)), var(--pimg) center / cover !important;
    padding-bottom: 4.5rem !important;
  }
  [data-works-style="paraform"] .w-graphic .bg-white { background: rgb(255 255 255 / .72) !important; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-color: rgb(255 255 255 / .6) !important; }
  [data-works-style="paraform"] .w-graphic .border-line { border-color: rgb(255 255 255 / .55); }
  [data-works-style="paraform"] .w-graphic .divide-line > * { border-color: rgb(15 25 54 / .08); }
  [data-works-style="paraform"] .w-graphic [data-in="2"].text-muted, [data-works-style="paraform"] .w-graphic > .fv > div > p.text-muted { color: rgb(255 255 255 / .85); }
  /* Layout: alternating - graphic leads on every second card */
  @media (min-width: 768px) {
    [data-works-layout="alt"] .w-card:nth-child(even) .w-graphics { order: -1; }
    /* Layout: 3-up grid - graphic on top, copy below, cards side by side */
    [data-works-layout="grid"] .works-a-list { display: grid; gap: 1rem; }
    [data-works-layout="grid"] .works-a-list > * + * { margin-top: 0; }
    [data-works-layout="grid"][data-works-count="2"] .works-a-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    [data-works-layout="grid"][data-works-count="3"] .works-a-list { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    [data-works-layout="grid"] .w-card { grid-template-columns: minmax(0, 1fr); align-content: start; }
    [data-works-layout="grid"] .w-graphics { order: -1; }
    [data-works-layout="grid"] .w-copy { gap: 1.5rem; padding: 1.25rem; }
    [data-works-layout="grid"]:not([data-works-count="1"]) .w-tag { font-size: 1.25rem; }
    [data-works-layout="grid"]:not([data-works-count="1"]) .w-graphic > .fv { min-height: 360px; padding: 1.25rem; }
  }
</style>"""

_PILLBTN = "rounded-full border border-line px-3 py-1.5 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white"
WORKS_A_BAR = (
    '<span class="mx-2 hidden h-5 w-px bg-line sm:block"></span><p class="mr-1 text-sm font-medium text-heading">A &middot; Layout</p>'
    + "".join(f'<button type="button" data-wa="layout:{v}" aria-pressed="{str(v == "stack").lower()}" class="{_PILLBTN}">{n}</button>' for v, n in [("stack", "Stacked"), ("alt", "Alternating"), ("grid", "Grid")])
    + '<p class="ml-2 mr-1 text-sm font-medium text-heading">Graphic</p>'
    + "".join(f'<button type="button" data-wa="g:{v}" aria-pressed="{str(v == "1").lower()}" class="{_PILLBTN}">{v}</button>' for v in "123")
    + '<p class="ml-2 mr-1 text-sm font-medium text-heading">Style</p>'
    + "".join(f'<button type="button" data-wa="style:{v}" aria-pressed="{str(v == "base").lower()}" class="{_PILLBTN}">{n}</button>' for v, n in [("base", "Base"), ("paraform", "Paraform")])
)

WORKS_A_JS = """<script>
  (() => {
    const root = document.querySelector("[data-works-root]"); if (!root) return;
    const KEYS = { layout: "worksLayout", g: "worksG", style: "worksStyle" };
    const set = (k, v) => {
      root.dataset[KEYS[k]] = v;
      document.querySelectorAll(`[data-wa^="${k}:"]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.wa === `${k}:${v}`)));
      try { localStorage.setItem("sognos-frontline-wa-" + k, v); } catch {}
    };
    document.querySelectorAll("[data-wa]").forEach((b) => b.addEventListener("click", () => { const [k, v] = b.dataset.wa.split(":"); set(k, v); }));
    const DEF = { layout: "stack", g: "1", style: "base" };
    Object.keys(DEF).forEach((k) => { let v = DEF[k]; try { v = localStorage.getItem("sognos-frontline-wa-" + k) || v; } catch {} set(k, v); });
  })();
</script>"""
