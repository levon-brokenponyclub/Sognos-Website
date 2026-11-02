"""Health & Social Care mockup with the products Inspector drawer + options gallery.
  python3 -I <this file> docs/mockups/sognoscare docs/mockups/frontline docs/mockups/health-social-care docs/mockups/products
Runs build_hsc.py (section variants; writes its section files + own index) and
build_products.py (heroes, header / footer rows, tones, editor, inspector) as
libraries, then writes health-social-care/index.html (composed page + Inspector)
and health-social-care/options.html (every variant stacked, per-block controls).
Same pattern as build_frontline_insp.py; HSC has no per-section bars, so every
section's variants are plain Inspector layouts.
"""
import json
import re
import runpy
import sys
from pathlib import Path

CARE, FL_DIR, OUT_DIR, PR_DIR = sys.argv[1:5]
HERE = Path(__file__).parent
sys.argv = [sys.argv[0], CARE, FL_DIR, OUT_DIR]
HS = runpy.run_path(str(HERE / "build_hsc.py"))
sys.argv = [sys.argv[0], CARE, PR_DIR]
BP = runpy.run_path(str(HERE / "build_products.py"))  # library mode: no files written
page, P = HS["page"], HS["P"]
page.__globals__["OUT"] = Path(OUT_DIR)
NAME = HS["NAME"]
RAIL = runpy.run_path(str(HERE / "rail.py"))

# ── Hero A / B / C from the product system, HSC copy ─────────────────────────
p = dict(BP["PRODUCTS"]["care"])
p.update(name=NAME, logo="__IND__", wlogo="__IND__", photo="images/industries/health-social-care.webp", h1=HS["H1"], sub=HS["SUB"],
         tagline=HS["TAGLINE"].replace(" - ", " &middot; "), kicker=f"Industries / {NAME}", feats=[("How Sognos helps", t, b) for t, b in HS["HELPS"]])


def crumb(dark):
    c = ("text-white/80", "text-white/60") if dark else ("text-heading", "text-muted")
    return (f'<p class="flex items-center gap-2.5 text-lg leading-[1.6] {c[0]}"><span aria-hidden="true" class="block size-[0.66em] bg-[var(--p-base)]"></span>'
            f'<a href="#" class="{c[1]} underline-offset-4 hover:underline">Industries</a><span aria-hidden="true" class="{c[1]}">/</span>{NAME}</p>')


def sys_hero(d):
    html = dict({"a": BP["dir_a"], "b": BP["dir_b"], "c": BP["dir_c"]}[d](p))["hero"]
    rep = crumb(d == "b") if d != "c" else f'<p class="font-heading text-2xl text-heading">{NAME}</p>'
    return re.sub(r'<img src="[^"]*/logos/__IND__"[^>]*/>', rep, html)


def noid(html):  # variants share one page: drop section ids (wrappers carry the anchors)
    return re.sub(r'(<section[^>]*?) id="', r'\1 data-id="', html, count=1)


SECTIONS = [  # key, name, [(variant, label, html)]
    ("hero", "Hero", [("a", "A · Split", sys_hero("a")), ("b", "B · Immersive", sys_hero("b")), ("c", "C · Editorial", sys_hero("c")),
                      ("ia", "HSC · Light split", HS["hero"]("a")), ("ib", "HSC · Floating card", HS["hero"]("b")),
                      ("p1", "HSC · Paraform split", HS["HERO_P1"]), ("p2", "HSC · Photo-led", HS["HERO_P2"]), ("p3", "HSC · Centred editorial", HS["HERO_P3"])]),
    ("challenge", "The challenge", [("a", "Statement band", HS["CHALLENGE"])]),
    ("how", "How Sognos helps", [("a", "A · Tabs", HS["HOW_A"]), ("b", "B · Cards", HS["HOW_B"])]),
    ("oth", "Other industries", [("a", "A · Graphic", HS["OTHERS"]), ("b", "B · Photo", HS["OTHERS_PHOTO"]), ("c", "C · Cards", HS["OTHERS_CARDS"]), ("d", "D · Slider", HS["OTHERS_SLIDER"])]),
    ("stories", "Customer stories", [("a", "Shared component", HS["STORIES"])]),
    ("plat", "Platform", [("a", "A · Works-with cards", HS["PLATFORM_A"]), ("b", "B · Current cards", HS["PLATFORM_B"])]),
]
SECTIONS = [(k, n, [(v, l, RAIL["prep"](h, n)) for v, l, h in vs]) for k, n, vs in SECTIONS]
RAIL_ON = [k for k, _, vs in SECTIONS if any(RAIL["native"](h) for _, _, h in vs)]
THEMES = [("care", "SognosCare"), ("roster", "Roster blue"), ("genogram", "Genogram"), ("digpacks", "DigPacks")]
THEME_CSS = "<style>\n" + "\n".join(
    f'  html[data-ptheme="{k}"] [data-product="hsc"] {{ ' + " ".join(f"--p-{n}: {v};" for n, v in BP["TOKENS"][k].items()) + " }" for k, _ in THEMES) + """
  html[data-pprod="hsc"] [data-pp="hsc"], [data-pp="hsc"].opt { display: block; }
  """ + "\n  ".join(f'html[data-s-{k}="{v}"] [data-s="{k}"][data-v="{v}"] {{ display: block; }}' for k, _, vs in SECTIONS for v, _, _ in vs) + "\n</style>"

TN, CH = BP["TN"], BP["CH"]
TONE_CSS = "<style>\n" + "\n".join(TN["tone_css"](f"tone-{k}", f'[data-s="{k}"]') for k, _, _ in SECTIONS) + "\n" + "\n".join(
    TN["tone_css"](f"ftone-{rk}", f'[data-fr="{rk}"] > [data-frv]') for rk, _ in CH["FOOTER_ROWS"]) + "\n" + CH["HEADER_CSS"] + CH["FOOTER_CSS"] + "\n</style>"
HEADER = CH["HEADER"].replace('data-product="care"', 'data-product="hsc"', 1)
FOOTER = CH["FOOTER"].replace('data-product="care"', 'data-product="hsc"', 1)
HS_CSS = HS["PARA_CSS"] + HS["CSS"]
HS_JS = HS["JS"] + HS["HOW_JS"] + HS["OTH_JS"]
PREFIX = "sognos-hsc-v3-"
THEME_JS = """<script>
  (() => { const k = "%sptheme"; let v = "care"; try { v = localStorage.getItem(k) || v; } catch {}
    const _set = window.PCtl.set; window.PCtl.set = (a, val) => { _set(a, val); if (a === "ptheme") try { localStorage.setItem(k, val); } catch {} };
    window.PCtl.set("ptheme", v);
    // Direction presets only switch sections that have that layout.
    const V = %s; window.PCtl.setD = (d) => Object.entries(V).forEach(([s, vs]) => vs.includes(d) && window.PCtl.set("s-" + s, d));
  })();
</script>""" % (PREFIX, json.dumps({k: [v for v, _, _ in vs] for k, _, vs in SECTIONS}))


def strip_shared_footer(name):
    f = Path(OUT_DIR) / name
    f.write_text(re.sub(r"<!-- footer:start -->.*?<!-- footer:end -->\n?", "", f.read_text(), flags=re.S))


# ── index.html: composed page + Inspector ────────────────────────────────────
body = "".join(f'<div id="hsc-{k}" class="scroll-mt-24">' + "".join(f'<div data-s="{k}" data-v="{v}">{noid(h)}</div>' for v, _, h in vs) + "</div>" for k, _, vs in SECTIONS)
cfg = dict(
    ns="sognos-hsc-v3-insp", products=[("hsc", NAME)], themes=THEMES, extraAttrs=["ptheme"], noSubnav=True,
    sections=[(k, n) for k, n, _ in SECTIONS], footerRows=CH["FOOTER_ROWS"], footerStyles=CH["FOOTER_STYLES"],
    layouts=[("a", "A"), ("b", "B")], sectionLayouts={k: [(v, n) for v, n, _ in vs] for k, _, vs in SECTIONS}, gallery={},
    tones=[(k, n, dict(TN["BG"]).get(k, "")) for k, n in TN["TONES"]],
    header=[(k, n, CH["HD_SWATCH"][k]) for k, n in CH["HD_STATES"]], subnav=[], palettes=BP["PAL_GROUPS"],
    directions=[("a", "A · Split"), ("b", "B · Immersive"), ("c", "C · Editorial")], closeLayouts=[],
    fc=[], fcToggles=[], fcCare={}, fcDefaults={}, snLayout=[], snDefaults={}, sn02b={},
)
ihtml, icss, ijs = BP["INSP"]["build"](cfg)
NOTE = f"""{NAME} + Inspector, 2026-10-26. Hero: A Split / B Immersive / C Editorial (product-page system, HSC copy + industry photo) plus the five HSC heroes (light split, floating card, Paraform P1-P3).
Sections keep their HSC variants as Inspector layouts: Challenge, How Sognos helps (tabs / cards), Other industries (graphic / photo / cards / slider), Customer stories (shared component placeholder), Platform (Works-with cards / current cards).
Every area: tone swatches + Colours (Solid / Linear / Radial); header start / scroll states; footer rows. Colour theme: SognosCare (default) / Roster blue / Genogram / DigPacks.
Presets "Split / Immersive / Editorial" set every section to that letter where it exists. options.html shows every variant stacked with per-block controls."""
page("index.html", f"Industries / {NAME} - Inspector", NOTE,
     HS_CSS + BP["TOKEN_CSS"] + THEME_CSS + TONE_CSS + RAIL["css"]([k for k, _, _ in SECTIONS]) + HEADER + f'<div data-pp="hsc" data-product="hsc">{body}</div>' + FOOTER
     + icss + ihtml + BP["js"]("hsc", secs=[k for k, _, _ in SECTIONS], prefix=PREFIX, rail_on=RAIL_ON) + HS_JS + CH["HEADER_JS"] + BP["ED"]["EDITOR_JS"] + ijs + THEME_JS)
strip_shared_footer("index.html")

# ── options.html: every variant stacked, each block with its own tone control ──
TONE_SW = "".join(f'<button type="button" data-otone="{k}" title="{n}" aria-label="{n}" class="ot size-6 rounded-full border border-line" style="background:{dict(TN["BG"]).get(k, "conic-gradient(#e2e8f0 25%, #fff 0 50%, #e2e8f0 0 75%, #fff 0) 0 0 / 8px 8px")}"></button>' for k, n in TN["TONES"])
blocks, ids, first = [], [], {}
for k, n, vs in SECTIONS:
    for v, lab, h in vs:
        bid = f"b{len(ids)}"; ids.append(bid); first.setdefault(k, bid)
        strip = (f'<div class="sticky top-20 z-40 border-y border-line bg-white/95 backdrop-blur"><div class="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-2.5">'
                 f'<p class="mr-auto text-sm font-medium text-heading">{n} &middot; {lab}</p><span class="text-xs text-muted">Tone</span><div class="flex flex-wrap gap-1" data-ob-tones="{bid}">{TONE_SW}</div></div></div>')
        blocks.append(f'<div id="opt-{bid}" class="scroll-mt-20">{strip}<div data-ob="{bid}">{noid(h)}</div></div>')
JUMP = ('<div class="border-b border-line bg-tint pt-28"><div class="mx-auto max-w-7xl px-6 pb-8"><p class="text-sm text-muted">Industries / ' + NAME + "</p>"
        f'<h1 class="mt-2 font-heading text-4xl text-heading">{NAME} &middot; all sections &amp; options</h1>'
        '<p class="mt-3 max-w-3xl text-body">Every layout of every section, stacked, each with its own tone. Compose the page and its colours in <a href="index.html" class="underline">index.html</a> (Inspector).</p>'
        '<div class="mt-5 flex flex-wrap items-center gap-2"><span class="text-xs text-muted">Colour theme</span>' + "".join(f'<button type="button" data-theme="{k}" class="rounded-full border border-line px-3 py-1.5 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">{n}</button>' for k, n in THEMES)
        + '<span class="mx-2 h-5 w-px bg-line"></span>' + "".join(f'<a href="#opt-{first[k]}" class="rounded-full bg-white px-3 py-1.5 text-xs text-heading hover:bg-heading hover:text-white">{n}</a>' for k, n, _ in SECTIONS)
        + '<a href="#opt-footer" class="rounded-full bg-white px-3 py-1.5 text-xs text-heading hover:bg-heading hover:text-white">Footer</a></div></div></div>')
FOOT_CTL = ('<div id="opt-footer" class="scroll-mt-20 border-y border-line bg-white"><div class="mx-auto max-w-7xl space-y-2 px-6 py-4"><p class="text-sm font-medium text-heading">Footer rows</p>'
            + "".join(f'<div class="flex flex-wrap items-center gap-1.5"><span class="w-32 text-xs text-muted">{n}</span>' + "".join(f'<button type="button" data-frpick="{rk}:{st}" class="rounded-full border border-line px-2.5 py-1 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">{sn}</button>' for st, sn in CH["FOOTER_STYLES"] if st != "none" or rk == "graphic") + "</div>" for rk, n in CH["FOOTER_ROWS"])
            + "</div></div>")
OPT_TONE_CSS = "<style>\n" + "\n".join(TN["tone_css"](f"otone-{b}", f'[data-ob="{b}"]') for b in ids) + "\n" + CH["HEADER_CSS"] + CH["FOOTER_CSS"] + """
  .ot[aria-pressed="true"] { outline: 2px solid #1e96fc; outline-offset: 2px; }
</style>"""
OPT_JS = """<script>
  (() => {
    const h = document.documentElement, st = { get: (k) => { try { return localStorage.getItem("%s" + k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem("%s" + k, v); } catch {} } };
    const set = (a, v) => { h.setAttribute("data-" + a, v); st.set(a, v);
      if (a.startsWith("otone-")) document.querySelectorAll(`[data-ob-tones="${a.slice(6)}"] [data-otone]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.otone === v)));
      if (a === "ptheme") document.querySelectorAll("[data-theme]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.theme === v)));
      if (a.startsWith("fr-")) document.querySelectorAll(`[data-frpick^="${a.slice(3)}:"]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.frpick === a.slice(3) + ":" + v))); };
    document.querySelectorAll("[data-ob-tones]").forEach((g) => { const id = g.dataset.obTones; g.addEventListener("click", (e) => { const b = e.target.closest("[data-otone]"); if (b) set("otone-" + id, b.dataset.otone); }); set("otone-" + id, st.get("otone-" + id) || "auto"); });
    document.querySelectorAll("[data-theme]").forEach((b) => b.addEventListener("click", () => set("ptheme", b.dataset.theme))); set("ptheme", st.get("ptheme") || "care");
    document.querySelectorAll("[data-frpick]").forEach((b) => b.addEventListener("click", () => { const [r, v] = b.dataset.frpick.split(":"); set("fr-" + r, v); }));
    %s.forEach((r) => set("fr-" + r, st.get("fr-" + r) || "a2"));
    h.setAttribute("data-hd-start", "white"); h.setAttribute("data-hd-scroll", "white");
  })();
</script>""" % ("sognos-hsc-opt-", "sognos-hsc-opt-", json.dumps([rk for rk, _ in CH["FOOTER_ROWS"]]))
page("options.html", f"Industries / {NAME} - all sections and options", "Every HSC section variant stacked (hero A/B/C + HSC heroes, challenge, how, other industries, stories, platform, footer rows), each block with a tone control. Composition + colours: index.html (Inspector).",
     HS_CSS + BP["TOKEN_CSS"] + RAIL["css"]([]) + THEME_CSS + OPT_TONE_CSS + HEADER + JUMP + f'<div data-pp="hsc" data-product="hsc" class="opt">{"".join(blocks)}</div>' + FOOT_CTL + FOOTER + HS_JS + CH["HEADER_JS"] + OPT_JS)
strip_shared_footer("options.html")
print(f"wrote health-social-care/index.html + options.html ({len(ids)} blocks)")
