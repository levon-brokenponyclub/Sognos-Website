"""Home mockup extras (2026-10-26, round 2), used by build_home_insp.py:
  - mark(): data-x element hooks for the Hero / Product cards show-hide switches + glow layers
  - Solutions: B bento (products Features B), C Editorial cards (products Features C, full card options),
    D / E / F from Frontline Related (graphic cards / list rows / slider)
  - Industries: D-G from HSC Other industries (graphic tint cards / photo stat cards / bordered graphic cards / photo slider)
  - Customer Stories: D expanding columns (Industries Immersive pattern)
build(ctx) -> dict.
"""
import re


def build(c):
    P, T, FOCUS, ARW, eyebrow, photo, SEC, W = c["P"], c["T"], c["FOCUS"], c["ARW"], c["eyebrow"], c["photo"], c["SEC"], c["W"]
    out = {}

    # ── Show / hide hooks ──
    def mark(html, rules):
        for needle, x in rules:
            html = html.replace(needle, needle.replace(" ", f' data-x="{x}" ', 1))
        return html
    HERO_RULES = [("<h1 ", "headline"), ('<p class="flex items-center gap-2.5', "eyebrow"), ('<p class="inline-flex items-center gap-2.5', "eyebrow"),
                  ('<button type="button" class="min-h-11 rounded-full', "primary"), ('<a href="#" class="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2', "secondary"),
                  (f'<p class="{T["herosub"]}', "sub"), ('<p class="max-w-2xl text-lg', "sub"), ('<p class="h-rise mt-4', "sub"), ('<p class="h-rise text-lg', "sub"),
                  ('<div class="relative aspect-[4/5] max-h-[560px]', "visual"), ('<div data-keep class="absolute inset-x-4 bottom-4', "card"),
                  ('<div class="mt-14 grid grid-cols-1 gap-3 md:mt-20', "products"), ('<div class="flex flex-col justify-end gap-4 lg:col-span-4">', "products"),
                  (f'<div class="relative {W} mt-16">', "visual"), ('<div aria-hidden="true" class="p-glow', "glow"), ('<div aria-hidden="true" class="p-grid', "glow"),
                  ('<div aria-hidden="true" class="pointer-events-none absolute inset-0 isolate', "glow")]
    CARD_RULES = [(f'<h2 class="{T["h2"]}', "title"), ('<p class="flex items-center gap-2.5', "eyebrow"),  # section heading first (live cards use h2 for product names)
                  ('<div class="relative aspect-[4/3] overflow-hidden rounded">', "image"), ('<span data-keep class="absolute left-4 top-4', "logo"),
                  ('<span aria-hidden="true" class="block h-1 w-10 rounded-full"', "accent"), (f'<h3 class="{T["h3sm"]} text-heading">', "name"),
                  (f'<p class="{T["small"]} text-body">', "desc"), ('<span class="mt-auto inline-flex items-center gap-1.5 pt-2', "link"),
                  ('<div class="absolute inset-0" style="background:linear-gradient(180deg', "image"), ('<img src="' + P + '/logos/', "logo"),
                  ('<p class="mt-4 max-w-md', "desc"), ('<span class="mt-5 inline-flex', "link"),
                  ('<span class="font-heading text-4xl tabular-nums', "accent"), ('<span class="font-heading text-2xl text-heading', "name"), ('<span class="hidden size-11', "link"),
                  ('<div class="hc-panel', "image"), ('<span class="hc-tile', "logo"), ('<h2 class="font-heading', "name"), ('<p class="text-base leading-relaxed', "desc"),
                  ('<span aria-hidden="true" class="relative isolate flex size-11', "link"), ('<div aria-hidden="true" class="pointer-events-none absolute inset-0 isolate', "glow"), ('<div aria-hidden="true" class="p-glow', "glow")]
    out["mark_hero"] = lambda h: mark(h, HERO_RULES)
    out["mark_cards"] = lambda h: mark(h, CARD_RULES)
    # Soft glow for layouts that had none (section must be relative overflow-hidden; content above it).
    out["soft_glow"] = lambda pos="85% 15%": f'<div data-x="glow" aria-hidden="true" class="pointer-events-none absolute inset-0" style="background:radial-gradient(45% 55% at {pos}, color-mix(in srgb, var(--p-base) 16%, transparent), transparent 70%)"></div>'
    out["HERO_TOGGLES"] = [("hero-x-eyebrow", "Eyebrow"), ("hero-x-headline", "Headline"), ("hero-x-sub", "Sub copy"), ("hero-x-primary", "Primary button"), ("hero-x-secondary", "Secondary link"),
                           ("hero-x-visual", "Image / visual"), ("hero-x-card", "Floating card"), ("hero-x-products", "Product tiles / index"), ("hero-x-glow", "Glow effect")]
    out["CARD_TOGGLES"] = [("cards-x-eyebrow", "Section eyebrow"), ("cards-x-title", "Section title"), ("cards-x-image", "Image panel"), ("cards-x-logo", "Logo tile"), ("cards-x-accent", "Accent bar / numeral"), ("cards-x-name", "Product name"),
                           ("cards-x-desc", "Description"), ("cards-x-link", "Link / arrow"), ("cards-x-glow", "Glow effect")]

    # ── Solutions ──
    SOLS, small_vis, SOL_HEAD = c["SOLS"], c["small_vis"], c["SOL_HEAD"]
    def tile(n, t, d, v, big):
        v = v.replace('class="fv relative', 'class="fv absolute inset-0', 1).replace("min-h-[340px]", "min-h-0", 1).replace("md:min-h-[400px]", "md:min-h-0", 1)
        return (f'<a href="#" class="group flex min-h-0 flex-col gap-4 overflow-hidden rounded-lg border border-white/10 bg-white/[.04] p-3 {"md:col-span-2 lg:col-span-2 lg:row-span-2" if big else ""} {FOCUS}">'
                f'<div class="relative min-h-[240px] flex-1 overflow-hidden rounded lg:min-h-0">{v}</div>'
                f'<div class="shrink-0 px-2 pb-1"><p class="text-xs text-[var(--p-accent)]">{n}</p><h3 class="mt-1 {T["h3"] if big else T["h3sm"]}">{t}</h3><p class="mt-1 {"" if big else "line-clamp-2"} {T["small"]} text-white/70">{d}</p></div></a>')
    out["SOL_B"] = (f'<section class="bg-[var(--p-dark)] {SEC} text-white"><div class="{W}">{SOL_HEAD(True)}'
                    f'<div class="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[23rem] lg:gap-4">{"".join(tile(*s, k == 0) for k, s in enumerate(SOLS))}'
                    f'<a href="#" class="flex flex-col justify-between gap-6 rounded-lg bg-[var(--p-base)] p-6 text-white lg:p-8 {FOCUS}"><p class="{T["h3"]}">All solutions</p><p class="{T["small"]} text-white/85">Customer Service, Power Platform, Quick Start and Finance &amp; Operations extend the platform too.</p><span class="inline-flex items-center gap-1.5 text-sm font-medium">Explore all Solutions {ARW}</span></a></div></div></section>')
    n_ = len(SOLS)
    rows = "".join(f'''<article class="fc border-line">
      <div class="fc-txt"><div class="fc-head"><p class="fc-num text-xs tabular-nums text-muted">{i + 1:02d} / {n_:02d}</p><p class="fc-eb text-sm font-medium">{n}</p><h3 class="fc-title {T["h3"]} text-heading text-balance">{t}</h3></div>
        <div class="fc-foot"><p class="fc-copy max-w-[46ch] {T["body"]} text-body text-pretty">{d}</p><div class="fc-act"><a href="#" class="fc-link inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-heading transition-opacity hover:opacity-80 {FOCUS}">Explore {n} {ARW}</a><button type="button" class="fc-btn min-h-11 rounded-full bg-[var(--p-base)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 {FOCUS}">Book a Demo</button></div></div></div>
      <div class="fc-vis min-w-0">{v}</div></article>''' for i, (n, t, d, v) in enumerate(SOLS))
    out["SOL_C"] = f'<section class="bg-white {SEC}"><div class="{W}">{SOL_HEAD()}<div class="fc-list mt-12">{rows}</div></div></section>'
    EXPLORE = f'<span class="inline-flex items-center gap-1.5 text-sm font-medium text-heading group-hover:text-[var(--p-base)]">Explore {ARW}</span>'
    panel = lambda v, h: f'<div class="overflow-hidden rounded [&>.fv]:{h} [&>.fv]:min-h-0 [&>.fv]:p-5 [&>.fv>*]:scale-90">{v}</div>'
    out["SOL_D"] = (f'<section class="bg-[var(--p-soft)] {SEC}"><div class="{W}">{SOL_HEAD()}<div class="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">'
                    + "".join(f'<a href="#" class="group flex flex-col gap-5 rounded-lg border border-line bg-white p-3 transition-colors hover:border-heading {FOCUS}">{panel(v, "h-48")}<div class="flex flex-1 flex-col px-3 pb-3"><h3 class="{T["h3sm"]} text-heading">{n}</h3><p class="mt-2 line-clamp-3 {T["small"]} text-body">{d}</p><div class="mt-auto pt-6">{EXPLORE}</div></div></a>' for n, t, d, v in SOLS)
                    + "</div></div></section>")
    out["SOL_E"] = (f'<section class="bg-[var(--p-soft)] {SEC}"><div class="{W}">{SOL_HEAD()}<ul class="mt-12 border-t border-line">'
                    + "".join(f'<li><a href="#" class="group relative grid grid-cols-1 items-center gap-3 border-b border-line px-2 py-7 transition-colors hover:bg-white md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)_auto] md:gap-8 md:px-4 {FOCUS}"><h3 class="{T["h3"]} text-heading">{n}</h3><p class="line-clamp-2 max-w-[52ch] {T["small"]} text-body">{d}</p><span class="flex items-center gap-6"><span class="pointer-events-none hidden w-56 translate-x-3 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 lg:block">{panel(v, "h-32")}</span><span aria-hidden="true" class="flex size-11 items-center justify-center rounded-full border border-line text-heading transition-colors group-hover:border-[var(--p-base)] group-hover:bg-[var(--p-base)] group-hover:text-white">&rarr;</span></span></a></li>' for n, t, d, v in SOLS)
                    + "</ul></div></section>")
    nav = lambda dark=False: "".join(f'<button type="button" data-hsl-nav="{d}" aria-label="{"Previous" if d < 0 else "Next"}" class="flex size-11 items-center justify-center rounded-full border border-line bg-white text-heading transition-colors hover:border-heading {FOCUS}">{"&larr;" if d < 0 else "&rarr;"}</button>' for d in (-1, 1))
    out["SOL_F"] = (f'<section class="bg-[var(--p-soft)] {SEC}"><div class="{W}">{SOL_HEAD()}<div class="mt-8 hidden justify-end gap-2 md:flex">{nav()}</div>'
                    f'<div data-hsl-track class="mt-6 -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:gap-4">'
                    + "".join(f'<a href="#" class="group flex w-[85%] shrink-0 snap-start flex-col gap-5 rounded-lg bg-white p-3 sm:w-[420px] {FOCUS}">{panel(v, "h-56")}<div class="flex flex-1 flex-col px-3 pb-3"><span class="mb-3 h-1 w-10 rounded-full" style="background:{["#1d96fc", "#3b6fe0", "#59bbf7", "#152248"][k % 4]}"></span><h3 class="{T["h3sm"]} text-heading">{n}</h3><p class="mt-2 line-clamp-3 {T["small"]} text-body">{d}</p><div class="mt-auto pt-6">{EXPLORE}</div></div></a>' for k, (n, t, d, v) in enumerate(SOLS))
                    + "</div></div></section>")

    # ── Industries (HSC Other industries layouts, all five sectors) ──
    HS, INDS, IND_HEAD, SLUG = c["HS"], c["INDS"], c["IND_HEAD"], c["SLUG"]
    recolour, TINTS, HOME_IND, IND_STAT, IND_IMG, stat_block = HS["recolour"], HS["TINTS"], HS["HOME_IND"], HS["IND_STAT"], HS["IND_IMG"], HS["stat_block"]
    RULE = dict(HS["_SECTOR_RULE"], **{"health-social-care": "#c0508f"})
    items = [(n, SLUG[n], d) for n, d, _ in INDS]
    gfx = lambda n, s: recolour(HOME_IND[n.replace("&amp;", "&")], TINTS[s])
    def stat_photo(s, h="aspect-[4/3]"):
        lab, num, suf = IND_STAT[s]
        return (f'<div class="fv relative {h} overflow-hidden rounded" data-loop="count">{photo(IND_IMG[s], "transition-transform duration-700 group-hover:scale-105")}'
                f'<span aria-hidden="true" class="absolute inset-0 bg-gradient-to-b from-care-dark/40 via-transparent to-care-dark/30"></span><span aria-hidden="true" class="hp-frame absolute inset-[6%] rounded border border-white/60"></span>'
                f'{stat_block(lab, num, suf, cls="left-[10%] top-[10%]", size="text-5xl")}</div>')
    arrow = '<span aria-hidden="true" class="flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-heading transition-colors group-hover:border-[var(--p-base)] group-hover:bg-[var(--p-base)] group-hover:text-white">&rarr;</span>'
    grid = lambda inner, bg="bg-white": f'<section class="{bg} {SEC}"><div class="{W}">{IND_HEAD()}<div class="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">{inner}</div></div></section>'
    out["IND_D"] = grid("".join(f'<a href="#" class="group flex flex-col gap-5 rounded-lg bg-[var(--p-soft)] p-3 transition-colors {FOCUS}"><div class="[&>.fv]:min-h-[280px] [&>.fv]:p-6">{gfx(n, s)}</div><div class="flex items-end justify-between gap-6 px-3 pb-3"><div><h3 class="{T["h3sm"]} text-heading">{n}</h3><p class="mt-2 line-clamp-2 {T["small"]} text-body">{d}</p></div>{arrow}</div></a>' for n, s, d in items))
    out["IND_E"] = grid("".join(f'<a href="#" class="group flex flex-col gap-5 rounded-lg bg-[var(--p-soft)] p-3 {FOCUS}">{stat_photo(s)}<div class="flex items-end justify-between gap-6 px-3 pb-3"><div><h3 class="{T["h3sm"]} text-heading">{n}</h3><p class="mt-2 line-clamp-2 {T["small"]} text-body">{d}</p></div>{arrow}</div></a>' for n, s, d in items))
    out["IND_F"] = grid("".join(f'<a href="#" class="group flex flex-col gap-5 rounded-lg border border-line bg-white p-3 transition-colors hover:border-heading {FOCUS}">{panel(gfx(n, s), "h-56")}<div class="flex flex-1 flex-col px-3 pb-3"><h3 class="{T["h3sm"]} text-heading">{n}</h3><p class="mt-2 line-clamp-3 {T["small"]} text-body">{d}</p><div class="mt-auto pt-6">{EXPLORE}</div></div></a>' for n, s, d in items), "bg-[var(--p-soft)]")
    out["IND_G"] = (f'<section class="bg-[var(--p-soft)] {SEC}"><div class="{W}">{IND_HEAD()}<div class="mt-8 hidden justify-end gap-2 md:flex">{nav()}</div>'
                    f'<div data-hsl-track class="mt-6 -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:gap-4">'
                    + "".join(f'<a href="#" class="group flex w-[85%] shrink-0 snap-start flex-col gap-5 rounded-lg bg-white p-3 sm:w-[420px] {FOCUS}">{stat_photo(s, "h-60")}<div class="flex flex-1 flex-col px-3 pb-3"><span class="mb-3 h-1 w-10 rounded-full" style="background:{RULE[s]}"></span><h3 class="{T["h3sm"]} text-heading">{n}</h3><p class="mt-2 line-clamp-3 {T["small"]} text-body">{d}</p><div class="mt-auto pt-6">{EXPLORE}</div></div></a>' for n, s, d in items)
                    + "</div></div></section>")

    # ── Product cards · D · expanding columns (Industries Immersive pattern) ──
    PRODUCTS, PHOTO = c["PRODUCTS"], c["PHOTO"]
    out["CARDS_D"] = (f'<section class="relative overflow-hidden bg-[var(--p-deep)] {SEC} text-white"><div data-x="glow" aria-hidden="true" class="p-glow absolute inset-0"></div><div class="relative {W}">'
                      f'<div class="flex max-w-3xl flex-col gap-4">{eyebrow("Products", True)}<h2 class="{T["h2"]} text-white text-balance">Three products. One platform.</h2></div>'
                      f'<div class="pc-acc mt-12 flex flex-col gap-3 lg:h-[540px] lg:flex-row lg:gap-4">'
                      + "".join(f'<a href="#" data-keep class="pc-col group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-lg border border-white/10 {FOCUS}">'
                                f'<div data-x="image" class="absolute inset-0">{photo(PHOTO[p["name"]], "transition-transform duration-700 group-hover:scale-[1.04]")}<div class="absolute inset-0" style="background:linear-gradient(180deg, transparent 15%, color-mix(in srgb, {p["deep"]} 92%, transparent))"></div></div>'
                                f'<div class="relative flex flex-col gap-4 p-5 lg:p-7"><span data-x="accent" aria-hidden="true" class="block h-1 w-10 rounded-full" style="background:{p["acc"]}"></span>'
                                f'<img data-x="logo" src="{P}/logos/{p["logo"]}" alt="" class="h-7 w-auto self-start" /><h3 data-x="name" class="{T["h3sm"]} text-white">{p["name"]}</h3>'
                                f'<p data-x="desc" class="pc-more max-w-md text-base leading-relaxed text-white/80"><span class="text-white">{p["lead"]}</span>{p["rest"]}</p>'
                                f'<span data-x="link" class="pc-more inline-flex items-center gap-1.5 text-sm font-medium text-white">Explore {p["name"]} {ARW}</span></div></a>' for p in PRODUCTS)
                      + "</div></div></section>")

    # ── Customer Stories · D · expanding columns ──
    QUOTED, SPH, ST_HEAD = c["QUOTED"], c["SPH"], c["ST_HEAD"]
    out["STORY_D"] = (f'<section class="bg-[var(--p-deep)] {SEC} text-white"><div class="{W}">{ST_HEAD(True)}<div class="st-acc mt-12 flex flex-col gap-3 lg:h-[560px] lg:flex-row lg:gap-4">'
                      + "".join(f'<a href="#" data-keep class="st-col group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-lg border border-white/10 {FOCUS}">{photo(SPH(st), "transition-transform duration-700 group-hover:scale-[1.04]")}'
                                f'<div class="absolute inset-0 bg-gradient-to-t from-[var(--p-deep)] via-[color-mix(in_srgb,var(--p-deep)_45%,transparent)] to-transparent"></div>'
                                f'<div class="relative flex flex-col gap-4 p-5 lg:p-7"><span data-x="logo" class="self-start rounded bg-white px-3 py-2"><img src="{P}/logos/{st["logo"]}" alt="{st["company"]}" class="h-6 w-auto" /></span>'
                                f'<p data-x="company" class="{T["h3sm"]} text-white">{st["company"]}</p><blockquote data-x="quote" class="st-quote line-clamp-5 text-base leading-relaxed text-white/90">&ldquo;{st["quote"]}&rdquo;</blockquote>'
                                f'<p data-x="author" class="st-quote text-xs text-white/70">{st["author"]} &middot; {st["role"]}</p></div></a>' for st in QUOTED)
                      + "</div></div></section>")
    out["STORY_TOGGLES"] = [("stories-x-logo", "Logo"), ("stories-x-company", "Company name"), ("stories-x-quote", "Quote"), ("stories-x-author", "Author")]

    out["CSS"] = """<style>
  @media (min-width: 1024px) { .st-col { flex: 1 1 0; transition: flex-grow .6s cubic-bezier(.22,1,.36,1); } .st-acc:hover .st-col:hover, .st-acc:not(:hover) .st-col:first-child { flex-grow: 3; }
    .st-col .st-quote { opacity: 0; max-height: 0; transition: opacity .4s; } .st-acc:hover .st-col:hover .st-quote, .st-acc:not(:hover) .st-col:first-child .st-quote { opacity: 1; max-height: 20rem; } }
  @media (min-width: 1024px) { .pc-col { flex: 1 1 0; transition: flex-grow .6s cubic-bezier(.22,1,.36,1); } .pc-acc:hover .pc-col:hover, .pc-acc:not(:hover) .pc-col:first-child { flex-grow: 2.4; }
    .pc-col .pc-more { opacity: 0; max-height: 0; overflow: hidden; transition: opacity .4s; } .pc-acc:hover .pc-col:hover .pc-more, .pc-acc:not(:hover) .pc-col:first-child .pc-more { opacity: 1; max-height: 12rem; } }
  @media (prefers-reduced-motion: reduce) { .st-col, .pc-col { transition: none; } }
</style>"""
    out["JS"] = """<script>
  document.querySelectorAll("[data-hsl-nav]").forEach((b) => b.addEventListener("click", () => {
    const track = b.closest("section").querySelector("[data-hsl-track]"); const step = track.firstElementChild.getBoundingClientRect().width + 16;
    track.scrollBy({ left: step * +b.dataset.hslNav, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }));
</script>"""
    return out


def toggle_css(area, toggles):
    """html[data-<area>-x-<el>="off"] hides [data-x="<el>"] inside that area's variants."""
    return "<style>\n" + "\n".join(f'  html[data-{a}="off"] [data-s="{area}"] [data-x="{a.split("-x-")[1]}"] {{ display: none !important; }}' for a, _ in toggles) + "\n</style>"
