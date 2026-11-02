"""Frontline mockup with the products Inspector drawer + options gallery.
  python3 -I <this file> docs/mockups/sognoscare docs/mockups/frontline docs/mockups/products
Runs build_frontline.py (section variants, writes 01-07 + its own index) and
build_products.py (heroes, header / footer rows, tones, editor, inspector) as
libraries, then writes frontline/index.html (composed page + Inspector) and
frontline/options.html (every variant stacked, per-block controls).
"""
import json
import re
import runpy
import sys
from pathlib import Path

CARE, FL_DIR, PR_DIR = sys.argv[1], sys.argv[2], sys.argv[3]
HERE = Path(__file__).parent
sys.argv = [sys.argv[0], CARE, FL_DIR]
FL = runpy.run_path(str(HERE / "build_frontline.py"))
sys.argv = [sys.argv[0], CARE, PR_DIR]
BP = runpy.run_path(str(HERE / "build_products.py"))  # library mode: no files written
page, P, T = FL["page"], FL["P"], FL["T"]
RAIL = runpy.run_path(str(HERE / "rail.py"))
page.__globals__["OUT"] = Path(FL_DIR)

# ── Hero A / B / C from the product system, Frontline copy ───────────────────
p = dict(BP["PRODUCTS"]["roster"])  # roster carries every key the direction builders read
p.update(name="Frontline", logo="__FL__", wlogo="__FL__", photo="__FLPHOTO__", h1=FL["HERO_H1"], sub=FL["HERO_SUB"],
         tagline="Field service, connected", kicker="Solutions / Frontline",
         feats=[("Capability", t, b) for t, b, _ in FL["FRONTLINE_CAPS"]])


def crumb(dark):
    c = ("text-white/80", "text-white/60") if dark else ("text-heading", "text-muted")
    return (f'<p class="flex items-center gap-2.5 text-lg leading-[1.6] {c[0]}"><span aria-hidden="true" class="block size-[0.66em] bg-[var(--p-base)]"></span>'
            f'<a href="#" class="{c[1]} underline-offset-4 hover:underline">Solutions</a><span aria-hidden="true" class="{c[1]}">/</span>Frontline</p>')


# Split hero card: the Editorial right column (Frontline, tagline, capabilities 01-04) as a live list.
# A highlight + progress bar walks the list; the active item shows a one-line live status (illustrative data).
FH_STATUS = ["Job #4821 &rarr; J. Kelly &middot; ETA 22 min", "Response SLA 4h &middot; 3h 12m left", "12 crews live &middot; 3 jobs on site", "Visit completed &middot; photos + sign-off"]
FH_CARD = ('<div data-keep data-fh class="absolute inset-x-4 bottom-4 rounded-lg border border-line bg-white p-4 sm:inset-x-auto sm:left-5 sm:w-[22rem] lg:bottom-5 lg:p-5">'
           '<p class="text-xs text-muted">Frontline</p><p class="mt-1 font-heading text-lg text-heading">Field service, connected</p><ol class="mt-3">'
           + "".join(f'<li class="fh-item"{" data-on" if i == 0 else ""}><div class="grid grid-cols-[1.75rem_1fr_auto] items-baseline gap-2"><span class="text-xs tabular-nums text-muted">{i + 1:02d}</span>'
                     f'<span class="fh-t text-sm">{t}</span><span aria-hidden="true" class="fh-arrow text-sm text-[var(--p-base)]">&rarr;</span></div>'
                     f'<div class="fh-st"><div><p class="pl-[2.25rem] pt-1 text-xs text-muted">{s}</p></div></div><span aria-hidden="true" class="fh-bar"><span></span></span></li>'
                     for i, ((t, _, _), s) in enumerate(zip(FL["FRONTLINE_CAPS"][:4], FH_STATUS))) + "</ol></div>")
FH_CSS = """<style>
  .fh-item { border-top: 1px solid #e2e8f0; padding: .55rem 0 .45rem; } .fh-t { color: #68706f; transition: color .3s; } .fh-item[data-on] .fh-t { color: #0f1936; }
  .fh-arrow { opacity: 0; transition: opacity .3s; } .fh-item[data-on] .fh-arrow { opacity: 1; }
  .fh-st { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .35s ease; } .fh-st > div { overflow: hidden; } .fh-item[data-on] .fh-st { grid-template-rows: 1fr; }
  .fh-bar { display: block; height: 2px; margin-top: .45rem; overflow: hidden; background: transparent; } .fh-item[data-on] .fh-bar { background: #e2e8f0; }
  .fh-bar > span { display: block; height: 100%; width: 0; background: var(--p-base); } .fh-item[data-on] .fh-bar > span { animation: fh-prog 2.8s linear forwards; }
  [data-fh]:hover .fh-item[data-on] .fh-bar > span { animation-play-state: paused; }
  @keyframes fh-prog { to { width: 100%; } }
  @media (prefers-reduced-motion: reduce) { .fh-item[data-on] .fh-bar > span { animation: none; width: 100%; } .fh-st, .fh-t, .fh-arrow { transition: none; } }
</style>"""
FH_JS = """<script>
  document.querySelectorAll("[data-fh]").forEach((root) => {
    const items = [...root.querySelectorAll(".fh-item")]; let k = 0;
    root.addEventListener("animationend", (e) => { if (e.animationName !== "fh-prog") return; items[k].removeAttribute("data-on"); k = (k + 1) % items.length; items[k].setAttribute("data-on", ""); });
  });
</script>"""


def fl_hero(d):
    html = dict({"a": BP["dir_a"], "b": BP["dir_b"], "c": BP["dir_c"]}[d](p))["hero"]
    html = html.replace(f"{P}/__FLPHOTO__", FL["HERO_IMG"])
    rep = crumb(d == "b") if d != "c" else '<p class="font-heading text-2xl text-heading">Frontline</p>'
    html = re.sub(r'<img src="[^"]*/logos/__FL__"[^>]*/>', rep, html)
    if d == "a":  # live capability card inside the photo (replaces the static tagline card)
        html, n = re.subn(r'<div data-keep class="p-float absolute bottom-5.*?</span></div></div>', FH_CARD, html, count=1, flags=re.S)
        assert n == 1
    if d == "c":  # Editorial: flat soft surface, no orb
        html, n = re.subn(r'\s*<div aria-hidden="true" class="pointer-events-none absolute -right-24 -top-16 size-\[34rem\] rounded-full[^>]*></div>', "", html, count=1)
        assert n == 1
    return html


HEROES = [("a", "A · Split", fl_hero("a")), ("b", "B · Immersive", fl_hero("b")), ("c", "C · Editorial", fl_hero("c")),
          ("fa", "Frontline · Light split", FL["HERO_A"].replace(' id="hero"', "", 1)),
          ("fb", "Frontline · Dark motion", FL["FRONTLINE_HERO_A"].replace('<section class="relative overflow-hidden pt-24', '<section class="relative overflow-hidden pt-40', 1))]

# ── Native Frontline sections: their own variants + in-page bars, bars proxied into the Inspector ──
BARS = ['<div class="border-y border-line bg-white/95">', '<div class="sticky top-20 z-40 border-y border-line bg-white/95 backdrop-blur">',
        '<div class="border-b border-line bg-white/95">', '<details class="group fixed bottom-4 right-4']


def flbar(html):
    for b in BARS:
        html = html.replace(b, b.replace("<div ", "<div data-flbar ").replace("<details ", "<details data-flbar "))
    return html


NATIVE = [
    ("problem", "The problem", FL["switch_group"]("problem")),
    ("caps", "Capabilities", FL["_tag_cards"](FL["CAPS_BOTH"]) + FL["FL_PICKER"]),
    ("platform", "Platform", FL["platform_group"]()),
    ("works", "Works with", FL["works_group"]()),
    ("related", "Related", FL["switch_group"]("related")),
]
SECTIONS = [("hero", "Hero")] + [(k, n) for k, n, _ in NATIVE]
PROXY = [k for k, _, _ in NATIVE]
TOKENS = BP["TOKENS"]  # includes the Sognos brand ladder
THEMES = [("sognos", "Sognos brand"), ("roster", "Roster blue"), ("care", "SognosCare"), ("genogram", "Genogram"), ("digpacks", "DigPacks")]
THEME_CSS = "<style>\n" + "\n".join(
    f'  html[data-ptheme="{k}"] [data-product="frontline"] {{ ' + " ".join(f"--p-{n}: {v};" for n, v in TOKENS[k].items()) + " }" for k, _ in THEMES) + """
  [data-flbar] { display: none !important; }
  html[data-pprod="frontline"] [data-pp="frontline"], [data-pp="frontline"].opt { display: block; }
  """ + " ".join(f'html[data-s-hero="{k}"] [data-s="hero"][data-v="{k}"] {{ display: block; }}' for k in ("fa", "fb")) + "\n  " + " ".join(f'[data-s="{k}"][data-v="all"] {{ display: block; }}' for k in PROXY) + "\n</style>"

TN, CH = BP["TN"], BP["CH"]
TONE_CSS = "<style>\n" + "\n".join(TN["tone_css"](f"tone-{k}", f'[data-s="{k}"]') for k, _ in SECTIONS) + "\n" + "\n".join(
    TN["tone_css"](f"ftone-{rk}", f'[data-fr="{rk}"] > [data-frv]') for rk, _ in CH["FOOTER_ROWS"]) + "\n" + CH["HEADER_CSS"] + CH["FOOTER_CSS"] + "\n</style>"
HEADER = CH["HEADER"].replace('data-product="care"', 'data-product="frontline"', 1)
FOOTER = CH["FOOTER"].replace('data-product="care"', 'data-product="frontline"', 1)
FL_CSS = FH_CSS + (FL["CSS"] + FL["FLX_CSS"] + FL["WORKS_COUNT_CSS"] + FL["WORKS_A_CSS"] + FL["PLAT_CSS"] + FL["STACK_CSS"] + "<style>" + FL["ISO_CSS"] + FL["ISO3_CSS"] + "</style>" + FL["PD_CSS"])
FL_JS = FH_JS + FL["JS"] + FL["FLX_JS"] + FL["WORKS_COUNT_JS"] + FL["WORKS_A_JS"] + FL["PLAT_JS"] + FL["STACK_JS"] + FL["ISO_JS"] + FL["PD_JS"]
PREFIX = "sognos-frontline-v3-"
THEME_JS = """<script>
  (() => { const h = document.documentElement, k = "%stheme"; let v = "sognos"; try { v = localStorage.getItem(k) || v; } catch {}
    const _set = window.PCtl.set; window.PCtl.set = (a, val) => { _set(a, val); if (a === "ptheme") try { localStorage.setItem(k, val); } catch {} };
    window.PCtl.set("ptheme", v);
  })();
</script>""" % PREFIX


def strip_shared_footer(name):
    f = Path(FL_DIR) / name
    f.write_text(re.sub(r"<!-- footer:start -->.*?<!-- footer:end -->\n?", "", f.read_text(), flags=re.S))


# ── index.html: composed page + Inspector ────────────────────────────────────
HEROES = [(k, n, RAIL["prep"](h, "Frontline")) for k, n, h in HEROES]
NATIVE = [(k, n, RAIL["prep"](h, n)) for k, n, h in NATIVE]
RAIL_ON = [k for k, _, h in NATIVE if RAIL["native"](h)] + (["hero"] if any(RAIL["native"](h) for _, _, h in HEROES) else [])
body = (f'<div id="fl-hero" class="scroll-mt-24">' + "".join(f'<div data-s="hero" data-v="{k}">{h}</div>' for k, _, h in HEROES) + "</div>"
        + "".join(f'<div id="fl-{k}" class="scroll-mt-24"><div data-s="{k}" data-v="all">{flbar(h)}</div></div>' for k, _, h in NATIVE))
cfg = dict(
    ns="sognos-fl-v3-insp", products=[("frontline", "Frontline")], themes=THEMES, extraAttrs=["ptheme"], noSubnav=True,
    sections=SECTIONS, proxy=PROXY, footerRows=CH["FOOTER_ROWS"], footerStyles=CH["FOOTER_STYLES"],
    layouts=[(k, n) for k, n, _ in HEROES[:3]], sectionLayouts={"hero": [(k, n) for k, n, _ in HEROES]}, gallery={},
    tones=[(k, n, dict(TN["BG"]).get(k, "")) for k, n in TN["TONES"]],
    header=[(k, n, CH["HD_SWATCH"][k]) for k, n in CH["HD_STATES"]], subnav=[], palettes=BP["PAL_GROUPS"],
    directions=[("a", "A · Split"), ("b", "B · Immersive"), ("c", "C · Editorial")], closeLayouts=[],
    fc=[], fcToggles=[], fcCare={}, fcDefaults={}, snLayout=[], snDefaults={}, sn02b={},
)
ihtml, icss, ijs = BP["INSP"]["build"](cfg)
NOTE = """Frontline + Inspector, 2026-10-26. Hero: A Split / B Immersive / C Editorial (product-page system, Frontline copy + live Unsplash+ photo) plus the two Frontline heroes (light split, dark motion).
Problem / Capabilities / Platform / Works with / Related keep their Frontline variants; their option bars are hidden on the page and appear inside the Inspector (layout, background, stack, iso, product count, capability colours...).
Every area: tone swatches + Colours (Solid / Linear / Radial); header start / scroll states; footer rows (CTA band, Menu, Accreditations, Acknowledgement, Legals, Graphic). Colour theme: Roster blue / SognosCare / Genogram / DigPacks token ladders.
options.html shows every variant stacked with per-block controls."""
page("index.html", "Solutions / Frontline - Inspector", NOTE,
     FL_CSS + BP["TOKEN_CSS"] + THEME_CSS + TONE_CSS + RAIL["css"]([k for k, _ in SECTIONS]) + HEADER + f'<div data-pp="frontline" data-product="frontline">{body}</div>' + FOOTER
     + icss + ihtml + BP["js"]("frontline", secs=[k for k, _ in SECTIONS], prefix=PREFIX, rail_on=RAIL_ON) + FL_JS + CH["HEADER_JS"] + BP["ED"]["EDITOR_JS"] + ijs + THEME_JS)
strip_shared_footer("index.html")

# ── options.html: every variant stacked, each block with its own tone control ──
_pf = FL["PLAT_BAR"] + FL["STACK_BAR"] + FL["ISO_BAR"]
_wb = FL["WORKS_COUNT_BAR"] + FL["WORKS_A_BAR"]


def _bar(inner):
    return f'<div class="border-y border-line bg-white/95"><div class="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-3">{inner}</div></div>'


so = FL["SECTION_OPTS"]
BLOCKS = ([("hero", f"Hero · {n}", h) for _, n, h in HEROES]
          + [("problem", f"The problem · {v.upper()} · {n}", h) for v, n, h in so["problem"][1]]
          + [("caps", "Capabilities · A · Grid", FL["_tag_cards"](FL["CAPS_A"])), ("caps", "Capabilities · B · Sticky stack", FL["_tag_cards"](FL["CAPS_B"]))]
          + [("platform", "Platform · A · Layer stack", f'<div data-plat-bg="white" data-plat-stack-v="classic" data-iso-v="1" data-iso-style="base">{_bar(_pf)}{so["platform"][1][0][2]}</div>')]
          + [("platform", f"Platform · {v.upper()} · {n}", h) for v, n, h in so["platform"][1][1:]]
          + [("works", f"Works with · {v.upper()} · {n}", (_bar(_wb) if v == "a" else "") + h) for v, n, h in so["works"][1]]
          + [("related", f"Related · {v.upper()} · {n}", h) for v, n, h in so["related"][1]])
# Works variants share one root (product count / layout controls drive all three).
_blocks_html, _ids = [], []
TONE_SW = "".join(f'<button type="button" data-otone="{k}" title="{n}" aria-label="{n}" class="ot size-6 rounded-full border border-line" style="background:{dict(TN["BG"]).get(k, "conic-gradient(#e2e8f0 25%, #fff 0 50%, #e2e8f0 0 75%, #fff 0) 0 0 / 8px 8px")}"></button>' for k, n in TN["TONES"])
for i, (grp, lab, h) in enumerate(BLOCKS):
    bid = f"b{i}"; _ids.append(bid)
    strip = (f'<div class="sticky top-20 z-40 border-y border-line bg-white/95 backdrop-blur"><div class="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-2.5">'
             f'<p class="mr-auto text-sm font-medium text-heading">{lab}</p><span class="text-xs text-muted">Tone</span><div class="flex flex-wrap gap-1" data-ob-tones="{bid}">{TONE_SW}</div></div></div>')
    _blocks_html.append(f'<div id="opt-{bid}" data-group="{grp}" class="scroll-mt-20">{strip}<div data-ob="{bid}">{re.sub(r'(<section[^>]*?) id="', r'\1 data-id="', h)}</div></div>')
works_i = [i for i, (g, _, _) in enumerate(BLOCKS) if g == "works"]
_blocks_html[works_i[0]] = '<div data-works-root data-works-count="1" data-works-layout="stack" data-works-g="1" data-works-style="base">' + _blocks_html[works_i[0]]
_blocks_html[works_i[-1]] += "</div>"
GROUPS = [("hero", "Hero")] + [(k, n) for k, n, _ in NATIVE] + [("footer", "Footer")]
JUMP = ('<div class="border-b border-line bg-tint pt-28"><div class="mx-auto max-w-7xl px-6 pb-8"><p class="text-sm text-muted">Solutions / Frontline</p>'
        f'<h1 class="mt-2 font-heading text-4xl text-heading">Frontline · all sections &amp; options</h1>'
        f'<p class="mt-3 max-w-3xl text-body">Every layout of every section, stacked. Each block has its own tone; section option bars sit above their layouts. Compose the page and its colours in <a href="index.html" class="underline">index.html</a> (Inspector).</p>'
        f'<div class="mt-5 flex flex-wrap items-center gap-2"><span class="text-xs text-muted">Colour theme</span>' + "".join(f'<button type="button" data-theme="{k}" class="rounded-full border border-line px-3 py-1.5 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">{n}</button>' for k, n in THEMES)
        + '<span class="mx-2 h-5 w-px bg-line"></span>' + "".join(f'<a href="#opt-{_ids[[g for g, _, _ in BLOCKS].index(k)] if k != "footer" else "footer"}" class="rounded-full bg-white px-3 py-1.5 text-xs text-heading hover:bg-heading hover:text-white">{n}</a>' for k, n in GROUPS) + "</div></div></div>")
FOOT_CTL = ('<div id="opt-footer" class="scroll-mt-20 border-y border-line bg-white"><div class="mx-auto max-w-7xl space-y-2 px-6 py-4"><p class="text-sm font-medium text-heading">Footer rows</p>'
            + "".join(f'<div class="flex flex-wrap items-center gap-1.5"><span class="w-32 text-xs text-muted">{n}</span>' + "".join(f'<button type="button" data-frpick="{rk}:{st}" class="rounded-full border border-line px-2.5 py-1 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">{sn}</button>' for st, sn in CH["FOOTER_STYLES"] if st != "none" or rk == "graphic") + "</div>" for rk, n in CH["FOOTER_ROWS"])
            + "</div></div>")
OPT_TONE_CSS = "<style>\n" + "\n".join(TN["tone_css"](f"otone-{b}", f'[data-ob="{b}"]') for b in _ids) + "\n" + CH["HEADER_CSS"] + CH["FOOTER_CSS"] + """
  .ot[aria-pressed="true"] { outline: 2px solid #1e96fc; outline-offset: 2px; }
</style>"""
OPT_JS = """<script>
  (() => {
    const h = document.documentElement, st = { get: (k) => { try { return localStorage.getItem("%s" + k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem("%s" + k, v); } catch {} } };
    const set = (a, v) => { h.setAttribute("data-" + a, v); st.set(a, v);
      document.querySelectorAll(`[data-ob-tones="${a.slice(6)}"] [data-otone]`).forEach((b) => a.startsWith("otone-") && b.setAttribute("aria-pressed", String(b.dataset.otone === v)));
      if (a === "ptheme") document.querySelectorAll("[data-theme]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.theme === v)));
      if (a.startsWith("fr-")) document.querySelectorAll(`[data-frpick^="${a.slice(3)}:"]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.frpick === a.slice(3) + ":" + v))); };
    document.querySelectorAll("[data-ob-tones]").forEach((g) => { const id = g.dataset.obTones; g.addEventListener("click", (e) => { const b = e.target.closest("[data-otone]"); if (b) set("otone-" + id, b.dataset.otone); }); set("otone-" + id, st.get("otone-" + id) || "auto"); });
    document.querySelectorAll("[data-theme]").forEach((b) => b.addEventListener("click", () => set("ptheme", b.dataset.theme))); set("ptheme", st.get("theme") || "sognos");
    document.querySelectorAll("[data-frpick]").forEach((b) => b.addEventListener("click", () => { const [r, v] = b.dataset.frpick.split(":"); set("fr-" + r, v); }));
    %s.forEach((r) => set("fr-" + r, st.get("fr-" + r) || "a2"));
    h.setAttribute("data-hd-start", "white"); h.setAttribute("data-hd-scroll", "white");
  })();
</script>""" % ("sognos-frontline-opt-", "sognos-frontline-opt-", json.dumps([rk for rk, _ in CH["FOOTER_ROWS"]]))
page("options.html", "Solutions / Frontline - all sections and options", "Every Frontline section variant stacked (hero A/B/C + Frontline heroes, problem, capabilities, platform, works with, related, footer rows), each block with a tone control; section option bars kept on the page. Composition + colours: index.html (Inspector).",
     FL_CSS + BP["TOKEN_CSS"] + RAIL["css"]([]) + THEME_CSS.replace("[data-flbar] { display: none !important; }", "") + OPT_TONE_CSS + HEADER + JUMP
     + f'<div data-pp="frontline" data-product="frontline" class="opt">{"".join(_blocks_html)}</div>' + FL["FL_PICKER"] + FOOT_CTL + FOOTER + FL_JS + CH["HEADER_JS"] + OPT_JS)
strip_shared_footer("options.html")
print("wrote frontline/index.html + options.html")
