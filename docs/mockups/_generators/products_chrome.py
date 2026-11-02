"""Header (SognosCare index structure) + header sub-nav bar + modular footer rows
for docs/mockups/products. build(ctx) -> dict of HTML / CSS / options.
ctx: P, T, PRODUCTS, SUBNAV_LABELS, footer (namespace of build_footer.py).
"""


def build(ctx):
    P, T, PRODUCTS, LABELS, f = ctx["P"], ctx["T"], ctx["PRODUCTS"], ctx["SUBNAV_LABELS"], ctx["footer"]
    FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hd-fg)]"
    chev = '<svg aria-hidden="true" class="h-3.5 w-3.5 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m19 9-7 7-7-7"/></svg>'

    # ── Header: SognosCare index structure, colours from --hd-* (start / scrolled states) ──
    nav = "".join(f'<li><button type="button" class="hd-item flex items-center gap-1.5 rounded-full px-4 py-2.5 text-base font-normal tracking-tight transition-colors duration-200 {FOCUS}">{n}{chev}</button></li>' for n in ["Why Sognos", "Products", "Solutions", "Industries", "Knowledge Hub"])
    bars = "".join(
        f'''<div data-hdbar-p="{k}" class="hd-bar relative w-full border-y border-dashed max-lg:hidden"><div class="mx-auto flex max-w-7xl items-center justify-between gap-x-12 px-6 py-3 {T["small"]}">
        <a href="#{k}-hero" class="font-medium">{PRODUCTS[k]["name"]}</a>
        <ul class="flex items-center gap-x-3 xl:gap-x-6">{"".join(f'<li><a href="#{k}-{key}" data-spy="{k}-{key}" class="hd-bar-link transition-colors duration-200">{t}</a></li>' for key, t in LABELS[k])}
          <li><a href="#" class="hd-bar-link transition-colors duration-200">Schedule a Call</a></li><li><a href="#" class="hd-bar-link inline-flex items-center gap-1.5 font-medium transition-colors duration-200">Download Datasheet <span aria-hidden="true">&darr;</span></a></li></ul>
      </div></div>''' for k in PRODUCTS)
    HEADER = f'''<div id="ph-header" data-scrolled="false" data-product="care" class="fixed inset-x-0 top-0 z-50">
  <header class="hd-shell border-b transition-[background-color,border-color] duration-300">
    <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
      <a href="#" class="justify-self-start"><img src="{P}/logos/sognos-logo.svg" alt="Sognos" class="hd-logo h-7 w-auto" /></a>
      <nav aria-label="Main" class="hd-pill hidden h-14 items-center gap-0.5 justify-self-center rounded-full p-2 lg:flex"><ul class="flex items-center gap-0.5">{nav}</ul></nav>
      <div class="flex items-center gap-x-2 justify-self-end">
        <a href="#" class="hd-cta hidden h-12 items-center justify-center rounded-sm px-4 text-base font-normal tracking-tight transition-colors duration-200 lg:inline-flex {FOCUS}">Book a Demo</a>
        <a href="#" class="hd-cta inline-flex h-11 items-center justify-center rounded-full px-4 text-sm font-medium lg:hidden">Book a Demo</a>
      </div>
    </div>
  </header>
  <div data-hdbar class="hd-shell transition-colors duration-300">{bars}</div>
</div>'''
    HD_STATES = [  # key, label, vars
        ("trans-light", "Transparent · white text", dict(bg="transparent", fg="#fff", border="transparent", pill="rgb(255 255 255 / .06)", hbg="#fff", hfg="#0f1936", cta="#fff", ctafg="#0f1936", logo="brightness(0) invert(1)", blur="none")),
        ("trans-dark", "Transparent · navy text", dict(bg="transparent", fg="#0f1936", border="transparent", pill="rgb(15 25 54 / .05)", hbg="#0f1936", hfg="#fff", cta="#0f1936", ctafg="#fff", logo="none", blur="none")),
        ("white", "White", dict(bg="#fff", fg="#0f1936", border="#e2e8f0", pill="#f3f4f6", hbg="#0f1936", hfg="#fff", cta="#0f1936", ctafg="#fff", logo="none", blur="none")),
        ("stint", "Sognos tint", dict(bg="#f9fafe", fg="#0f1936", border="#e2e8f0", pill="#fff", hbg="#0f1936", hfg="#fff", cta="#0f1936", ctafg="#fff", logo="none", blur="none")),
        ("glass", "Glass", dict(bg="rgb(255 255 255 / .75)", fg="#0f1936", border="rgb(15 25 54 / .08)", pill="rgb(15 25 54 / .05)", hbg="#0f1936", hfg="#fff", cta="#0f1936", ctafg="#fff", logo="none", blur="blur(14px)")),
        ("dark", "Dark (care-dark)", dict(bg="#0f1936", fg="#fff", border="#152248", pill="rgb(255 255 255 / .06)", hbg="#fff", hfg="#0f1936", cta="#fff", ctafg="#0f1936", logo="brightness(0) invert(1)", blur="none")),
        ("deep", "Product deep", dict(bg="var(--p-deep)", fg="#fff", border="rgb(255 255 255 / .1)", pill="rgb(255 255 255 / .06)", hbg="#fff", hfg="#0f1936", cta="#fff", ctafg="#0f1936", logo="brightness(0) invert(1)", blur="none")),
        ("grad", "Product gradient", dict(bg="var(--p-grad)", fg="#fff", border="rgb(255 255 255 / .12)", pill="rgb(255 255 255 / .1)", hbg="#fff", hfg="#0f1936", cta="#fff", ctafg="#0f1936", logo="brightness(0) invert(1)", blur="none")),
    ]
    vars_ = lambda v: f"--hd-bg: {v['bg']}; --hd-fg: {v['fg']}; --hd-border: {v['border']}; --hd-pill: {v['pill']}; --hd-hbg: {v['hbg']}; --hd-hfg: {v['hfg']}; --hd-cta: {v['cta']}; --hd-ctafg: {v['ctafg']}; --hd-logo: {v['logo']}; --hd-blur: {v['blur']};"
    HEADER_CSS = "\n".join(
        [f'  html[data-hd-start="{k}"] #ph-header[data-scrolled="false"] {{ {vars_(v)} }}' for k, _, v in HD_STATES]
        + [f'  html[data-hd-scroll="{k}"] #ph-header[data-scrolled="true"] {{ {vars_(v)} }}' for k, _, v in HD_STATES]
        + [f'  html[data-hd-scroll="same"][data-hd-start="{k}"] #ph-header[data-scrolled="true"] {{ {vars_(v)} }}' for k, _, v in HD_STATES]) + """
  #ph-header .hd-shell { background: var(--hd-bg); border-color: var(--hd-border); color: var(--hd-fg); backdrop-filter: var(--hd-blur); -webkit-backdrop-filter: var(--hd-blur); }
  #ph-header .hd-logo { filter: var(--hd-logo); }
  #ph-header .hd-pill { background: var(--hd-pill); }
  #ph-header .hd-item { color: var(--hd-fg); } #ph-header .hd-item:hover { background: var(--hd-hbg); color: var(--hd-hfg); }
  #ph-header .hd-cta { background: var(--hd-cta); color: var(--hd-ctafg); }
  #ph-header .hd-bar { border-color: color-mix(in srgb, var(--hd-fg) 14%, transparent); }
  #ph-header .hd-bar-link { color: color-mix(in srgb, var(--hd-fg) 75%, transparent); } #ph-header .hd-bar-link:hover, #ph-header .hd-bar-link[aria-current="true"] { color: var(--hd-fg); }
  #ph-header .hd-bar-link[aria-current="true"] { text-decoration: underline; text-decoration-color: var(--p-accent, #1e96fc); text-underline-offset: 6px; }
  [data-hdbar] { display: none; } html[data-subnav="bar"] [data-hdbar] { display: block; } html[data-subnav="bar"] [data-subnav] { display: none !important; }
  [data-hdbar-p] { display: none; } """ + " ".join(f'html[data-pprod="{k}"] [data-hdbar-p="{k}"] {{ display: block; }}' for k in PRODUCTS) + "\n"
    HEADER_JS = """<script>
  (() => { const hd = document.getElementById("ph-header"); const on = () => (hd.dataset.scrolled = String(scrollY > 8)); addEventListener("scroll", on, { passive: true }); on();
    document.addEventListener("products:product", (e) => { hd.dataset.product = e.detail; const ft = document.querySelector("[data-pfooter]"); if (ft) ft.dataset.product = e.detail; }); })();
</script>"""

    # ── Footer rows: each row in all 7 footer styles ─────────────────────────────
    links, accred, BOOK, ARR, F = f["links"], f["accred"], f["BOOK"], f["ARR"], f["FOCUS"]
    FP, GROUPS, LEGAL, ACK, COPY, CTA_H, CTA_S = f["PRODUCTS"], f["GROUPS"], f["LEGAL"], f["ACK"], f["COPY"], f["CTA_H"], f["CTA_S"]
    STY = {  # surface, dark?
        "a1": ("#fff", False), "a2": ("#f9fafe", False), "a3a": ("#0f1936", True),
        "a3b": ("radial-gradient(55% 40% at 0% 0%, rgba(59,111,224,.45), transparent 70%), radial-gradient(45% 35% at 100% 55%, rgba(29,150,252,.25), transparent 70%), #0f1936", True),
        "a3c": ("#060e28", True), "b": ("#060e28", True), "c": ("#f9fafe", False),
    }
    STY_NAMES = [("a1", "A1 · Editorial white"), ("a2", "A2 · Tint panel"), ("a3a", "A3a · Care dark"), ("a3b", "A3b · Glow"), ("a3c", "A3c · Midnight"), ("b", "B · Bento"), ("c", "C · Index rows")]

    def sec(st, inner, pad="py-14 md:py-16"):
        bg, dark = STY[st]
        return f'<section class="{"text-white" if dark else "text-body"} {pad}" style="background:{bg}"><div class="mx-auto max-w-7xl px-6">{inner}</div></section>'

    def statement(dark, stop, book):
        return (f'<div class="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10"><h2 class="font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-balance md:text-6xl lg:col-span-7 {"text-white" if dark else "text-heading"}">{CTA_H}{f"<span class={chr(34)}{stop}{chr(34)}>.</span>" if stop else ""}</h2>'
                f'<div class="lg:col-span-5"><p class="{T["body"]} {"text-white/75" if dark else "text-body"}">{CTA_S}</p><div class="mt-6 flex flex-wrap items-center gap-4">{BOOK(book)}<a href="#" class="inline-flex min-h-11 items-center gap-1.5 px-2 text-base font-medium {"text-white" if dark else "text-heading"} hover:opacity-80 {F}">Talk to Sales {ARR}</a></div></div></div>')

    LIGHT_BOOK = "bg-heading text-white hover:bg-accent focus-visible:outline-accent"
    DARK_BOOK = "bg-accent text-white hover:bg-white hover:text-heading focus-visible:outline-white"
    WHITE_BOOK = "bg-white text-heading hover:bg-accent hover:text-white focus-visible:outline-white"
    CTA = {
        "a1": sec("a1", statement(False, "", LIGHT_BOOK), "py-16 md:py-24"),
        "a2": sec("a2", f'<div class="relative isolate grid grid-cols-1 items-end gap-8 overflow-hidden rounded-lg p-8 md:p-12 lg:grid-cols-12 lg:gap-10 lg:p-16" style="background: radial-gradient(60% 90% at 10% 10%, rgba(59,111,224,.45), transparent 70%), radial-gradient(50% 80% at 100% 100%, rgba(29,150,252,.3), transparent 70%), #0f1936"><img src="{P}/images/cta-bg.svg" alt="" aria-hidden="true" class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 w-full mix-blend-luminosity" /><h2 class="font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-white text-balance md:text-6xl lg:col-span-7">{CTA_H}</h2><div class="lg:col-span-5"><p class="{T["body"]} text-white/75">{CTA_S}</p><div class="mt-6 flex flex-wrap items-center gap-4">{BOOK(WHITE_BOOK)}<a href="#" class="inline-flex min-h-11 items-center gap-1.5 px-2 text-base font-medium text-white hover:opacity-80 {F}">Talk to Sales {ARR}</a></div></div></div>', "pt-16 pb-6 md:pt-20"),
        "a3a": sec("a3a", statement(True, "text-accent", DARK_BOOK), "py-16 md:py-24"),
        "a3b": sec("a3b", statement(True, "text-[#59bbf7]", WHITE_BOOK), "py-16 md:py-24"),
        "a3c": sec("a3c", statement(True, "text-accent", DARK_BOOK), "py-16 md:py-24"),
        "b": sec("b", f'<div class="relative overflow-hidden rounded-lg p-8 lg:p-12" style="background: radial-gradient(70% 80% at 15% 15%, rgba(59,111,224,.45), transparent 70%), radial-gradient(60% 70% at 95% 100%, rgba(29,150,252,.35), transparent 70%), #0f1936"><img src="{P}/images/cta-bg.svg" alt="" aria-hidden="true" class="pointer-events-none absolute inset-x-0 bottom-0 w-full mix-blend-luminosity" /><div class="relative grid gap-10 lg:grid-cols-12 lg:items-end"><div class="lg:col-span-7"><img src="{P}/logos/sognos-logo.svg" alt="Sognos" class="h-7 w-auto brightness-0 invert" /><h2 class="mt-10 font-heading text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-white text-balance md:text-5xl">{CTA_H}</h2></div><div class="lg:col-span-5"><p class="{T["body"]} text-white/75">{CTA_S}</p><div class="mt-6 flex flex-wrap items-center gap-4">{BOOK(WHITE_BOOK)}<a href="#" class="inline-flex min-h-11 items-center gap-1.5 px-2 text-base font-medium text-white hover:opacity-80 {F}">Talk to Sales {ARR}</a></div></div></div></div>'),
        "c": f'<section class="border-y border-line bg-white py-6 text-body"><div class="mx-auto flex max-w-7xl flex-col gap-4 px-6 md:flex-row md:items-center md:justify-between"><p class="flex items-center gap-3 font-heading text-xl text-heading md:text-2xl"><span aria-hidden="true" class="block size-[0.66em] bg-accent"></span>{CTA_H}</p><div class="flex flex-wrap items-center gap-3">{BOOK("bg-accent text-white hover:bg-heading focus-visible:outline-accent")}<a href="#" class="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-white px-5 text-base font-medium text-heading hover:border-heading {F}">Talk to Sales {ARR}</a></div></div></section>',
    }

    def cols(dark):
        hc, lc = ("text-white/60", "text-white/85 hover:text-white") if dark else ("text-muted", "text-heading hover:text-accent")
        return "".join(f'<nav aria-label="{g}" class="lg:col-span-2"><p class="text-sm {hc}">{g}</p><ul class="mt-4 space-y-1">{links(items, "inline-flex min-h-9 items-center text-sm " + lc)}</ul></nav>' for g, items in GROUPS.items())

    def prod_rows(kind):
        if kind == "dots":
            return '<ul class="mt-4 divide-y divide-line border-y border-line">' + "".join(f'<li><a href="#" class="group flex min-h-14 items-center justify-between gap-4 py-3 {F}"><span class="flex items-center gap-3"><span class="size-2.5 rounded-full" style="background:{c}"></span><span class="font-heading text-xl text-heading">{n}</span></span><span aria-hidden="true" class="text-muted group-hover:text-accent">&rarr;</span></a></li>' for n, h, t, c, logo, g in FP) + "</ul>"
        if kind == "chips":
            return '<ul class="mt-4 space-y-2">' + "".join(f'<li><a href="#" class="group flex min-h-14 items-center justify-between gap-4 rounded-lg border border-line bg-white px-3 py-3 hover:border-heading {F}"><span class="flex items-center gap-3"><span class="size-8 rounded" style="background:{g}"></span><span class="font-heading text-lg text-heading">{n}</span></span><span aria-hidden="true" class="text-muted group-hover:text-accent">&rarr;</span></a></li>' for n, h, t, c, logo, g in FP) + "</ul>"
        mark = lambda n, logo: f'<img src="{P}/logos/{logo}" alt="{n}" class="h-6 w-auto brightness-0 invert" />' if logo else f'<span class="font-heading text-xl">{n}</span>'
        if kind == "glass":
            return '<ul class="mt-4 space-y-2">' + "".join(f'<li><a href="#" class="group flex min-h-14 items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 px-3 py-3 hover:border-white/30 {F}"><span class="flex items-center gap-3"><span class="size-8 rounded" style="background:{g}"></span><span class="font-heading text-lg text-white">{n}</span></span><span aria-hidden="true" class="text-white/60">&rarr;</span></a></li>' for n, h, t, c, logo, g in FP) + "</ul>"
        if kind == "bars":
            return '<ul class="mt-4 space-y-2">' + "".join(f'<li><a href="#" class="group flex min-h-16 items-center justify-between gap-4 rounded-r-lg border-l-[3px] bg-white/[.03] px-4 py-3 hover:bg-white/[.07] {F}" style="border-color:{c}">{mark(n, logo)}<span aria-hidden="true" class="text-white/60">&rarr;</span></a></li>' for n, h, t, c, logo, g in FP) + "</ul>"
        return '<ul class="mt-4 divide-y divide-white/10 border-y border-white/10">' + "".join(f'<li><a href="#" class="group flex min-h-16 items-center justify-between gap-4 py-3 {F}">{mark(n, logo)}<span class="flex items-center gap-3"><span class="size-2 rounded-full" style="background:{c}"></span><span aria-hidden="true" class="text-white/60">&rarr;</span></span></a></li>' for n, h, t, c, logo, g in FP) + "</ul>"

    def menu_a(st, kind):
        dark = STY[st][1]
        return sec(st, f'<div class="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-12"><nav aria-label="Products" class="sm:col-span-2 lg:col-span-4"><p class="text-sm {"text-white/60" if dark else "text-muted"}">Products</p>{prod_rows(kind)}</nav>{cols(dark)}</div>')

    TILE = "rounded-lg border border-white/10 bg-white/[.04] p-6 lg:p-8"
    tiles = "".join(f'<a href="#" class="group flex min-h-32 flex-col justify-between rounded-lg p-5 sm:col-span-1 lg:col-span-3 {F}" style="background:{g}"><span class="flex items-center justify-between">{(f"<img src={chr(34)}{P}/logos/{logo}{chr(34)} alt={chr(34)}{n}{chr(34)} class={chr(34)}h-6 w-auto brightness-0 invert{chr(34)} />" if logo else f"<span class={chr(34)}font-heading text-xl text-white{chr(34)}>{n}</span>")}<span aria-hidden="true" class="text-white/80">&rarr;</span></span><span class="text-sm text-white/80">{t}</span></a>' for n, h, t, c, logo, g in FP)
    rows_c = lambda name, inner: f'<div class="grid grid-cols-1 gap-3 border-t border-line py-6 md:grid-cols-12 md:gap-8"><p class="flex items-center gap-2.5 text-base text-heading md:col-span-3"><span aria-hidden="true" class="block size-[0.66em] bg-accent"></span>{name}</p><nav aria-label="{name}" class="md:col-span-9">{inner}</nav></div>'
    MENU = {
        "a1": menu_a("a1", "dots"), "a2": menu_a("a2", "chips"), "a3a": menu_a("a3a", "rows"), "a3b": menu_a("a3b", "glass"), "a3c": menu_a("a3c", "bars"),
        "b": sec("b", f'<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">{tiles}'
                 f'<nav aria-label="Solutions" class="{TILE} sm:col-span-2 lg:col-span-6"><p class="text-sm text-white/60">Solutions</p><ul class="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-2">{links(GROUPS["Solutions"], "inline-flex min-h-10 items-center text-sm text-white/85 hover:text-white")}</ul></nav>'
                 f'<nav aria-label="Industries" class="{TILE} lg:col-span-2"><p class="text-sm text-white/60">Industries</p><ul class="mt-4">{links(GROUPS["Industries"], "inline-flex min-h-10 items-center text-sm text-white/85 hover:text-white")}</ul></nav>'
                 + "".join(f'<nav aria-label="{g}" class="{TILE} lg:col-span-2"><p class="text-sm text-white/60">{g}</p><ul class="mt-4">{links(GROUPS[g], "inline-flex min-h-10 items-center text-sm text-white/85 hover:text-white")}</ul></nav>' for g in ("Resources", "Company")) + "</div>"),
        "c": sec("c", rows_c("Products", '<ul class="flex flex-wrap gap-2">' + "".join(f'<li><a href="#" class="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm text-heading hover:border-heading {F}"><span class="size-2 rounded-full" style="background:{c}"></span>{n}</a></li>' for n, h, t, c, logo, g in FP) + "</ul>")
                 + "".join(rows_c(g, f'<ul class="flex flex-wrap gap-x-6 gap-y-1">{links(items, "inline-flex min-h-10 items-center text-base text-heading underline-offset-4 hover:text-accent hover:underline")}</ul>') for g, items in GROUPS.items()), "py-10"),
    }

    def acc_card(st, card, label_cls):
        return sec(st, f'<div class="grid grid-cols-1 gap-6 rounded-lg border p-6 lg:grid-cols-12 lg:items-center lg:p-8 {card}"><p class="text-sm {label_cls} lg:col-span-3">Accreditations &amp; memberships</p><ul aria-label="Accreditations and memberships" class="flex flex-wrap gap-3 lg:col-span-9 lg:justify-end lg:gap-4">{accred("rounded bg-white" if STY[st][1] else "rounded bg-tint")}</ul></div>', "py-8")
    ACC = {
        "a1": sec("a1", f'<div class="flex flex-col gap-4 border-t border-line pt-8 lg:flex-row lg:items-center lg:justify-between"><p class="text-sm text-muted">Accreditations &amp; memberships</p><ul aria-label="Accreditations and memberships" class="flex flex-wrap gap-3 lg:gap-4">{accred("rounded border border-line bg-white")}</ul></div>', "pb-8"),
        "a2": acc_card("a2", "border-line bg-white", "text-muted"),
        "a3a": acc_card("a3a", "border-white/10 bg-white/5", "text-white/60"),
        "a3b": acc_card("a3b", "border-white/15 bg-white/[.06] backdrop-blur", "text-white/60"),
        "a3c": acc_card("a3c", "border-white/10 bg-[#0f1936]", "text-white/60"),
        "b": sec("b", f'<div class="{TILE} flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><p class="text-sm text-white/60">Accreditations &amp; memberships</p><ul aria-label="Accreditations and memberships" class="flex flex-wrap gap-3 lg:gap-4">{accred("rounded bg-white")}</ul></div>', "py-6"),
        "c": sec("c", f'<div class="grid grid-cols-1 gap-6 border-t border-line pt-8 md:grid-cols-12 md:gap-8"><p class="text-sm text-muted md:col-span-3">Accreditations &amp; memberships</p><ul aria-label="Accreditations and memberships" class="flex flex-wrap gap-3 md:col-span-9 lg:gap-4">{accred("rounded border border-line bg-white")}</ul></div>', "py-8"),
    }
    ACKR = {
        "a1": sec("a1", f'<p class="max-w-xl text-xs leading-relaxed text-muted">{ACK}</p>', "py-8"),
        "c": sec("c", f'<p class="border-t border-line pt-8 text-xs leading-relaxed text-body md:pl-[25%]">{ACK}</p>', "pb-8"),
    }
    for st in ("a2", "a3a", "a3b", "a3c", "b"):
        ACKR[st] = sec(st, f'<p class="mx-auto max-w-4xl text-center text-xs leading-relaxed {"text-white/70" if STY[st][1] else "text-body"}">{ACK}</p>', "py-10")
    LEG = {st: sec(st, f'<div class="flex flex-col gap-3 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between {"border-white/10 text-white/80" if STY[st][1] else "border-line text-body"}"><p>{COPY}</p><ul class="flex flex-wrap gap-x-6">{links(LEGAL, "inline-flex min-h-11 items-center " + ("hover:text-white" if STY[st][1] else "hover:text-accent"))}</ul></div>', "pb-8") for st in STY}

    def mark(st, fill):
        bg = STY[st][0] if st != "a3b" else "#0f1936"
        return (f'<section style="background:{bg}"><div aria-hidden="true" class="h-[9vw] max-h-32 overflow-hidden px-6"><div class="mx-auto aspect-[223/57] w-full max-w-[calc(80rem-3rem)] sg-wm" '
                f'style="background:{fill}"></div></div></section>')
    GFX = {"a1": mark("a1", "rgb(15 25 54 / .06)"), "a2": mark("a2", "#0f1936"), "a3a": mark("a3a", "rgb(255 255 255 / .1)"),
           "a3b": mark("a3b", "linear-gradient(90deg, #3b6fe0, #1d96fc, #59bbf7)"), "a3c": mark("a3c", "#152248"),
           "b": mark("b", "rgb(255 255 255 / .08)"), "c": mark("c", "var(--p-grad)"), "none": '<section class="hidden"></section>'}

    ROWS = [("cta", "CTA band", CTA), ("menu", "Menu", MENU), ("accred", "Accreditations", ACC), ("ack", "Acknowledgement", ACKR), ("legal", "Legals", LEG), ("graphic", "Footer graphic", GFX)]
    FOOTER = '<footer data-pfooter data-product="care">' + "".join(
        f'<div data-fr="{rk}">' + "".join(f'<div data-frv="{st}">{html}</div>' for st, html in variants.items()) + "</div>" for rk, _, variants in ROWS) + "</footer>"
    FOOTER_CSS = "  [data-frv] { display: none; }\n" + "\n".join(
        f'  html[data-fr-{rk}="{st}"] [data-fr="{rk}"] > [data-frv="{st}"] {{ display: block; }}' for rk, _, variants in ROWS for st in variants)
    # Row tones target the visible variant's <section>
    return dict(HEADER=HEADER, HEADER_CSS=HEADER_CSS, HEADER_JS=HEADER_JS, HD_STATES=[(k, n) for k, n, _ in HD_STATES], HD_SWATCH={k: (v["bg"] if v["bg"] != "transparent" else ("#0f1936" if v["fg"] == "#fff" else "#ffffff")) for k, _, v in HD_STATES},
                FOOTER=FOOTER, FOOTER_CSS=FOOTER_CSS, FOOTER_ROWS=[(rk, n) for rk, n, _ in ROWS],
                FOOTER_STYLES=STY_NAMES + [("none", "None")])
