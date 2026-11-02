"""Shared builder for archive-style mockups (Knowledge Hub, Customer Stories) with the
products Inspector: every section ("slot") picks its own layout, like the product pages.

The legacy generators build each archive as whole-page options (one root per option).
split() cuts an option into its top-level sections; build() lays every slot variant into
ONE filter root (so the page's search / category JS spans whichever variants are shown),
wires the Inspector (per-slot layout, tone, Colours, header, footer rows, colour theme,
presets that set every slot at once) and writes index-style + options.html pages.
"""
import json
import re
from pathlib import Path


def bar_to_section(html, start, end):
    """Sticky filter bar <div> -> <section> so it can be a slot itself (it must stay a
    direct child of the long root, or sticky stops working)."""
    i = html.index(start); j = html.index(end, i) + len(end)
    seg = html[i:j].replace("<div ", "<section ", 1)
    return html[:i] + seg[: -len("</div>")] + "</section>" + html[j:]


def split(opt_html, starts, strip=()):
    """Top-level sections of one option root, keyed: {key: html}. starts = [(key, opening-tag prefix)] in page order."""
    inner = re.sub(r"^\s*<div data-[a-z-]+-opt=\"[^\"]+\"( hidden)?>", "", opt_html.strip(), count=1)
    inner = inner[: inner.rindex("</div>")]
    for s in strip:
        inner = inner.replace(s, "")
    pos = [(k, inner.index(s)) for k, s in starts]
    return {k: inner[p: (pos[n + 1][1] if n + 1 < len(pos) else len(inner))] for n, (k, p) in enumerate(pos)}


def _slot_html(key, v, html):
    h = html.strip()
    if h.startswith("<section") and "sticky top-20" in h[:200]:  # a sticky bar is its own slot element
        return h.replace("<section ", f'<section data-s="{key}" data-v="{v}" ', 1)
    return f'<div data-s="{key}" data-v="{v}">{h}</div>'


def build(*, page, BP, out_dir, index_name="index.html", theme_default="care", sognos_theme=False, toggles=None, fc_area=None, pkey, name, slots, presets, base_css, page_js, root_attr, empty, prefix, note, opt_note, crumb):
    """slots = [(key, label, [(variant, label, html)], allow_off)]; presets = [(id, label, {slot: variant})]."""
    TN, CH = BP["TN"], BP["CH"]
    RAIL = __import__("runpy").run_path(str(Path(__file__).with_name("rail.py")))
    slots = [(k, n, [(v, l, RAIL["prep"](h, n)) for v, l, h in vs], off) for k, n, vs, off in slots]
    rail_on = [k for k, _, vs, _ in slots if any(RAIL["native"](h) for _, _, h in vs)]
    THEMES = ([("sognos", "Sognos brand")] if sognos_theme else []) + [("care", "SognosCare"), ("roster", "Roster blue"), ("genogram", "Genogram"), ("digpacks", "DigPacks")]
    S = [(k, n, vs + ([("off", "Off", "")] if off else [])) for k, n, vs, off in slots]
    KEYS = [k for k, _, _ in S]
    BG = dict(TN["BG"])
    css = "<style>\n" + "\n".join(
        f'  html[data-ptheme="{k}"] [data-product="{pkey}"] {{ ' + " ".join(f"--p-{n}: {v};" for n, v in BP["TOKENS"][k].items()) + " }" for k, _ in THEMES) + f"""
  html[data-pprod="{pkey}"] [data-pp="{pkey}"], [data-pp="{pkey}"].opt {{ display: block; }}
  .opt [data-s] {{ display: block; }}
  .ot[aria-pressed="true"] {{ outline: 2px solid #1e96fc; outline-offset: 2px; }}
  """ + "\n  ".join(f'html[data-s-{k}="{v}"] [data-s="{k}"][data-v="{v}"] {{ display: block; }}' for k, _, vs in S for v, _, _ in vs) + "\n</style>"
    footer_tone = "\n".join(TN["tone_css"](f"ftone-{rk}", f'[data-fr="{rk}"] > [data-frv]') for rk, _ in CH["FOOTER_ROWS"])
    header = CH["HEADER"].replace('data-product="care"', f'data-product="{pkey}"', 1)
    footer = CH["FOOTER"].replace('data-product="care"', f'data-product="{pkey}"', 1)
    empty_box = f'<div class="mx-auto max-w-7xl px-6">{empty}</div>'

    def strip_shared_footer(fname):
        f = Path(out_dir) / fname
        f.write_text(re.sub(r"<!-- footer:start -->.*?<!-- footer:end -->\n?", "", f.read_text(), flags=re.S))

    # ── index.html ──
    body = "".join(_slot_html(k, v, h) for k, _, vs in S for v, _, h in vs if h)
    preset_map = {pid: m for pid, _, m in presets}
    insp_js = """<script>
  (() => { const ctl = window.PCtl, P = "%s", M = %s, K = %s;
    const _set = ctl.set; ctl.set = (a, v) => { _set(a, v); if (a === "ptheme") try { localStorage.setItem(P + a, v); } catch {} };
    ctl.setD = (d) => Object.entries(M[d] || {}).forEach(([s, v]) => ctl.set(K.includes(s) ? "s-" + s : s, v));  // non-slot keys (fr-*, hd-*) set as-is
    // Show / hide switches start on (until changed).
    %s.forEach((a) => { let v = null; try { v = localStorage.getItem(P + a); } catch {} ctl.set(a, v || "on"); });
    let t = "%s"; try { t = localStorage.getItem(P + "ptheme") || t; } catch {} _set("ptheme", t);
  })();
</script>""" % (prefix, json.dumps(preset_map), json.dumps(KEYS), json.dumps([a for v in (toggles or {}).values() for a, _ in v]), theme_default)
    cfg = dict(
        ns=prefix + "insp", products=[(pkey, name)], themes=THEMES, extraAttrs=["ptheme"], noSubnav=True,
        sections=[(k, n) for k, n, _ in S], footerRows=CH["FOOTER_ROWS"], footerStyles=CH["FOOTER_STYLES"],
        layouts=[], sectionLayouts={k: [(v, n) for v, n, _ in vs] for k, _, vs in S}, gallery={},
        tones=[(k, n, BG.get(k, "")) for k, n in TN["TONES"]],
        header=[(k, n, CH["HD_SWATCH"][k]) for k, n in CH["HD_STATES"]], subnav=[], palettes=BP["PAL_GROUPS"],
        directions=[(pid, n) for pid, n, _ in presets], closeLayouts=[],
        fc=[], fcToggles=[], fcCare={}, fcDefaults={}, snLayout=[], snDefaults={}, sn02b={}, toggles=toggles or {},
    )
    if fc_area:  # products Editorial (C) card options on this area
        C_ = BP["CARDS"]; cfg.update(fcArea=fc_area, fc=C_["FC"], fcToggles=C_["FC_TOGGLES"], fcCare=C_["FC_CARE"], fcDefaults=C_["FC_DEFAULTS"])
    ihtml, icss, ijs = BP["INSP"]["build"](cfg)
    tone = "<style>\n" + "\n".join(TN["tone_css"](f"tone-{k}", f'[data-s="{k}"]') for k in KEYS) + "\n" + footer_tone + "\n" + CH["HEADER_CSS"] + CH["FOOTER_CSS"] + "\n</style>"
    page(index_name, f"{crumb} - Inspector", note,
         base_css + BP["TOKEN_CSS"] + css + tone + RAIL["css"](KEYS) + header + f'<div data-pp="{pkey}" data-product="{pkey}"><div {root_attr}="all">{body}{empty_box}</div></div>' + footer
         + icss + ihtml + BP["js"](pkey, secs=KEYS, prefix=prefix, rail_on=rail_on) + page_js + CH["HEADER_JS"] + BP["ED"]["EDITOR_JS"] + ijs + insp_js)
    strip_shared_footer(index_name)

    # ── options.html: every slot variant stacked, each with its own tone ──
    sw = "".join(f'<button type="button" data-otone="{k}" title="{n}" aria-label="{n}" class="ot size-6 rounded-full border border-line" style="background:{BG.get(k, "conic-gradient(#e2e8f0 25%, #fff 0 50%, #e2e8f0 0 75%, #fff 0) 0 0 / 8px 8px")}"></button>' for k, n in TN["TONES"])
    blocks, ids, first = [], [], {}
    for k, n, vs in S:
        for v, lab, h in vs:
            if not h:
                continue
            bid = f"b{len(ids)}"; ids.append(bid); first.setdefault(k, bid)
            strip = (f'<div class="border-y border-line bg-white/95"><div class="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-2.5">'
                     f'<p class="mr-auto text-sm font-medium text-heading">{n} &middot; {lab}</p><span class="text-xs text-muted">Tone</span><div class="flex flex-wrap gap-1" data-ob-tones="{bid}">{sw}</div></div></div>')
            blocks.append(f'<div id="opt-{bid}" class="scroll-mt-20">{strip}<div data-ob="{bid}">{_slot_html(k, v, h)}</div></div>')
    pill = "rounded-full bg-white px-3 py-1.5 text-xs text-heading hover:bg-heading hover:text-white"
    jump = (f'<div class="border-b border-line bg-tint pt-28"><div class="mx-auto max-w-7xl px-6 pb-8"><p class="text-sm text-muted">{crumb}</p>'
            f'<h1 class="mt-2 font-heading text-4xl text-heading">{name} &middot; all sections &amp; options</h1>'
            f'<p class="mt-3 max-w-3xl text-body">Every layout of every section, stacked, each with its own tone. Search and filters work across the page. Compose the page and its colours in <a href="{index_name}" class="underline">{index_name}</a> (Inspector).</p>'
            '<div class="mt-5 flex flex-wrap items-center gap-2"><span class="text-xs text-muted">Colour theme</span>' + "".join(f'<button type="button" data-theme="{k}" class="rounded-full border border-line px-3 py-1.5 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">{n}</button>' for k, n in THEMES)
            + '<span class="mx-2 h-5 w-px bg-line"></span>' + "".join(f'<a href="#opt-{first[k]}" class="{pill}">{n}</a>' for k, n, _ in S if k in first)
            + f'<a href="#opt-footer" class="{pill}">Footer</a></div></div></div>')
    foot_ctl = ('<div id="opt-footer" class="scroll-mt-20 border-y border-line bg-white"><div class="mx-auto max-w-7xl space-y-2 px-6 py-4"><p class="text-sm font-medium text-heading">Footer rows</p>'
                + "".join(f'<div class="flex flex-wrap items-center gap-1.5"><span class="w-32 text-xs text-muted">{n}</span>' + "".join(f'<button type="button" data-frpick="{rk}:{st}" class="rounded-full border border-line px-2.5 py-1 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">{sn}</button>' for st, sn in CH["FOOTER_STYLES"] if st != "none" or rk == "graphic") + "</div>" for rk, n in CH["FOOTER_ROWS"])
                + "</div></div>")
    opt_tone = "<style>\n" + "\n".join(TN["tone_css"](f"otone-{b}", f'[data-ob="{b}"]') for b in ids) + "\n" + CH["HEADER_CSS"] + CH["FOOTER_CSS"] + "\n</style>"
    opt_js = """<script>
  (() => {
    const h = document.documentElement, P = "%sopt-", st = { get: (k) => { try { return localStorage.getItem(P + k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem(P + k, v); } catch {} } };
    const set = (a, v) => { h.setAttribute("data-" + a, v); st.set(a, v);
      if (a.startsWith("otone-")) document.querySelectorAll(`[data-ob-tones="${a.slice(6)}"] [data-otone]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.otone === v)));
      if (a === "ptheme") document.querySelectorAll("[data-theme]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.theme === v)));
      if (a.startsWith("fr-")) document.querySelectorAll(`[data-frpick^="${a.slice(3)}:"]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.frpick === a.slice(3) + ":" + v))); };
    document.querySelectorAll("[data-ob-tones]").forEach((g) => { const id = g.dataset.obTones; g.addEventListener("click", (e) => { const b = e.target.closest("[data-otone]"); if (b) set("otone-" + id, b.dataset.otone); }); set("otone-" + id, st.get("otone-" + id) || "auto"); });
    document.querySelectorAll("[data-theme]").forEach((b) => b.addEventListener("click", () => set("ptheme", b.dataset.theme))); set("ptheme", st.get("ptheme") || "__THEME__");
    document.querySelectorAll("[data-frpick]").forEach((b) => b.addEventListener("click", () => { const [r, v] = b.dataset.frpick.split(":"); set("fr-" + r, v); }));
    %s.forEach((r) => set("fr-" + r, st.get("fr-" + r) || "a2"));
    h.setAttribute("data-hd-start", "white"); h.setAttribute("data-hd-scroll", "white");
  })();
</script>""".replace("__THEME__", theme_default) % (prefix, json.dumps([rk for rk, _ in CH["FOOTER_ROWS"]]))
    page("options.html", f"{crumb} - all sections and options", opt_note,
         base_css + BP["TOKEN_CSS"] + css + opt_tone + RAIL["css"]([]) + header + jump + f'<div data-pp="{pkey}" data-product="{pkey}" class="opt"><div {root_attr}="all">{"".join(blocks)}{empty_box}</div></div>' + foot_ctl + footer + page_js + CH["HEADER_JS"] + opt_js)
    strip_shared_footer("options.html")
    return len(ids)
