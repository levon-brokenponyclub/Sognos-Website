# ── Platform D · rebuilt (2026-10-25) ───────────────────────────────────────
# Three layouts x three graphics x two image styles, the Works-with A pattern:
# gallery panels (white UI cards on a tint panel, .fv motion) in Base, or the
# Frontline hero photo under a wash with frosted cards + pill in Paraform.
# Copy is the live Platform copy; graphic data is illustrative.

def _ic(f, cls="size-4"):
    return f'<img src="{P}/logos/{f}" alt="" class="{cls} shrink-0 object-contain" />'


_PD_PANEL = ns["_panel"]

# G1 · Work order flow - one job runs through every layer.
PD_G1 = _PD_PANEL("#f9fafe", "run", f"""<div class="w-full max-w-md space-y-3 text-left">
                <div data-in="1" class="{_C} flex items-center justify-between gap-3 p-4"><div class="min-w-0"><p class="text-sm font-medium text-heading">Work order #4821</p><p class="text-xs text-muted">HVAC service &middot; Level 3, North Sydney</p></div><span class="shrink-0 rounded-full bg-tint px-2.5 py-1 text-[10px] font-medium text-heading">Priority P2</span></div>
                <div data-in="2" class="{_C} px-4 py-2">{_HP}<ul class="divide-y divide-line">{_steps([
                    f'<span class="flex items-center gap-2.5">{_ic("Dynamics365.svg")}Created in Dynamics 365</span>',
                    f'<span class="flex items-center gap-2.5">{_ic("copilot-logo.svg")}Copilot picks the slot &middot; 11:00</span>',
                    f'<span class="flex items-center gap-2.5">{_ic("platform/PowerAutomate_scalable.svg")}Customer notified</span>',
                    f'<span class="flex items-center gap-2.5">{_ic("icon-sognos-care.svg", "size-4 rounded-full bg-accent p-0.5 brightness-100")}Dispatched to Frontline</span>'])}</ul></div>
              </div>""")

# G2 · Copilot scheduling - the day board, then Copilot's suggestion types.
_BOARD = [("J. Kelly", [(4, 30, "bg-care-dark"), (40, 22, "bg-accent")]), ("P. Shah", [(10, 26, "bg-accent"), (52, 30, "bg-[#59bbf7]")]), ("E. Lane", [(0, 20, "bg-[#59bbf7]"), (30, 40, "bg-care-dark")])]
PD_G2 = _PD_PANEL("#f9fafe", "type", f"""<div class="w-full max-w-md space-y-3 text-left">
                <div data-in="1" class="{_C} p-4">
                  <div class="flex items-center justify-between"><p class="text-sm font-medium text-heading">Tuesday &middot; North Sydney crew</p><span class="text-[10px] text-muted">8:00 &ndash; 17:00</span></div>
                  <div class="mt-3 space-y-2">{"".join(f'<div class="flex items-center gap-3"><span class="w-14 shrink-0 text-[11px] text-muted">{n}</span><div class="relative h-5 flex-1 rounded bg-tint">{"".join(f"<span class=&quot;bar absolute inset-y-0 rounded {c}&quot; style=&quot;left:{l}%;width:{w}%;transition-delay:{k * 120}ms&quot;></span>".replace("&quot;", chr(34)) for k, (l, w, c) in enumerate(blocks))}</div></div>' for n, blocks in _BOARD)}</div>
                </div>
                <div data-in="2" class="rounded-lg border border-white/10 bg-care-dark p-4">
                  <p class="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent">{_ic("copilot-logo.svg")} Copilot suggestion</p>
                  <p class="mt-2 min-h-[3.25rem] font-mono text-[13px] leading-relaxed text-white/85"><span data-type="Move E. Lane's 2pm to 11am - same site as P. Shah, saves 38 min travel."></span><span aria-hidden="true" class="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-accent align-middle"></span></p>
                  <div class="mt-3 flex gap-2"><span class="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-heading">Apply</span><span class="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/80">Dismiss</span></div>
                </div>
              </div>""")

# G3 · Connected apps (enhanced) - four platform apps feed one live
# Frontline view: the active app lights, its line carries a pulse down, the
# sync row names it; KPIs count up, the trend draws.
_APPS = [("Dynamics365.svg", "Dynamics 365"), ("copilot-logo.svg", "Copilot"), ("platform/PowerAutomate_scalable.svg", "Automate"), ("platform/PowerBI_scalable.svg", "Power BI")]
_X = [37, 112, 188, 263]
PD_G3 = _PD_PANEL("#f9fafe", "count", f"""<div data-pd-cycle data-k="0" class="w-full max-w-md text-left">
                <div class="pd-chips grid grid-cols-4 gap-2">{"".join(f'<div data-in="{k + 1}" data-app="{k}" class="pd-chip {_C} flex flex-col items-center gap-1.5 px-2 py-3 transition-colors">{_ic(f, "size-6")}<span class="truncate text-[11px] font-medium text-heading">{n}</span></div>' for k, (f, n) in enumerate(_APPS))}</div>
                <svg viewBox="0 0 300 46" class="h-11 w-full" aria-hidden="true" fill="none">{"".join(f'<path data-app="{k}" class="pd-wire flow" d="M{x} 0 C{x} 26 150 20 150 46" stroke="#cbd5e1" stroke-width="2"/>' for k, x in enumerate(_X))}</svg>
                <div data-in="4" class="{_C} overflow-hidden">
                  <div class="flex items-center justify-between border-b border-line px-4 py-3"><p class="flex items-center gap-2 text-sm font-medium text-heading">{_ic("icon-sognos-care.svg", "size-5 rounded bg-accent p-0.5")}Frontline &middot; live</p><span class="flex items-center gap-1.5 text-[10px] text-muted"><span class="relative flex size-1.5"><span class="absolute inset-0 animate-ping rounded-full bg-emerald-500"></span><span class="relative size-1.5 rounded-full bg-emerald-500"></span></span>Synced</span></div>
                  <div class="grid grid-cols-3 gap-2 p-4 pb-2">{"".join(f'<div class="rounded bg-tint p-2.5"><p class="text-[10px] text-muted">{lab}</p><p class="mt-1 font-heading text-xl text-heading" data-count="{n}" data-suffix="{suf}">0{suf}</p></div>' for lab, n, suf in [("Jobs today", 128, ""), ("On time", 97, "%"), ("SLA met", 99, "%")])}</div>
                  <svg viewBox="0 0 300 50" class="h-12 w-full px-4" fill="none" aria-hidden="true"><path class="spark" d="M0 40 L30 36 L60 38 L90 28 L120 31 L150 22 L180 24 L210 15 L240 18 L270 9 L300 6" stroke="#1d96fc" stroke-width="2.5" stroke-linecap="round"/></svg>
                  <p class="flex items-center gap-2 border-t border-line px-4 py-2.5 text-xs text-muted"><span class="size-1.5 rounded-full bg-accent"></span>Last sync &middot; {"".join(f'<span data-app="{k}" class="pd-sync font-medium text-heading">{n}</span>' for k, (_, n) in enumerate(_APPS))} &middot; just now</p>
                </div>
              </div>""")

PD_GFX = [(PD_G1, "Work order dispatched &middot; 4 steps"), (PD_G2, "Copilot &middot; saves 38 min"), (PD_G3, "One data model &middot; live")]
PD_PART = [("Dynamics365.svg", "Dynamics 365 Field Service", "Built on Microsoft Dynamics 365 Field Service"), ("copilot-logo.svg", "Copilot AI", "Copilot AI for intelligent scheduling"), ("platform/PowerAutomate_scalable.svg", "Power Platform", "Power Platform for workflow automation and reporting")]


_PD_STRIP = f'<ul class="pd-strip absolute inset-x-0 top-5 z-10 hidden justify-center gap-1.5 px-4">{"".join(f"<li><span title=&quot;{a}&quot; class=&quot;flex size-10 items-center justify-center rounded-lg border border-line bg-white&quot;><img src=&quot;{P}/logos/{f}&quot; alt=&quot;{a}&quot; class=&quot;h-5 w-auto&quot; /></span></li>".replace("&quot;", chr(34)) for f, a in MS_LOGOS)}</ul>'


def _pd_graphic(k, panel, pill):
    return (f'<div data-g="{k}" class="pd-g relative">{_PD_STRIP}{panel}<p data-pill class="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/40 bg-care-dark/30 px-4 py-2 text-xs text-white backdrop-blur-md"><span class="size-1.5 rounded-full bg-[#59bbf7]"></span>{pill}</p></div>')


_PD_ALL = "".join(_pd_graphic(k, p, pl) for k, (p, pl) in enumerate(PD_GFX, 1))
_PD_LOGOS = f'<ul class="pd-copy-logos flex flex-wrap gap-2">{"".join(f"<li><span title=&quot;{a}&quot; class=&quot;flex size-12 items-center justify-center rounded-lg border border-line bg-white&quot;><img src=&quot;{P}/logos/{f}&quot; alt=&quot;{a}&quot; class=&quot;h-6 w-auto&quot; /></span></li>".replace("&quot;", chr(34)) for f, a in MS_LOGOS)}</ul>'
_PD_LABEL = label("Platform", sticky=False)
_PD_H2 = f'<h2 class="pd-h {T["h2"]} text-heading">Built on {PLATFORM_LABEL}</h2>'
_PD_DESC = f'<p class="pd-b {T["lede"]} text-body">{PLATFORM_DESC}</p>'
_PD_RULE = '<span aria-hidden="true" class="block h-1 w-10 rounded-full bg-accent"></span>'

# L1 · Split card - label pinned top; accent rule, heading, lede and logo
# tiles pinned bottom (Works-with A card rhythm); graphic right, 5 / 7.
PD_L1 = f"""<div data-pd-l="1" class="pd-frame grid grid-cols-1 items-stretch gap-3 rounded-lg border p-3 md:grid-cols-12 lg:gap-4">
          <div class="pd-copy flex flex-col justify-between gap-12 p-5 md:col-span-5 lg:p-8">{_PD_LABEL}<div class="flex flex-col gap-5">{_PD_RULE}{_PD_H2}{_PD_DESC}{_PD_LOGOS}</div></div>
          <div class="pd-gs md:col-span-7">{_PD_ALL}</div>
        </div>"""

# L2 · Centred - header centred, one wide graphic, logos beneath.
PD_L2 = f"""<div data-pd-l="2">
          <div class="pd-copy mx-auto flex max-w-3xl flex-col items-center gap-4 text-center [&_p]:mx-auto">{_PD_LABEL}{_PD_H2}{_PD_DESC}</div>
          <div class="pd-gs pd-frame pd-wide {GAP} rounded-lg border p-3">{_PD_ALL}</div>
          <div class="mt-8 flex justify-center">{_PD_LOGOS}</div>
        </div>"""

# L3 · Three-up - header row, then one card per platform part (graphics 1-3).
PD_L3 = f"""<div data-pd-l="3">
          <div class="pd-copy grid grid-cols-1 items-end gap-6 lg:grid-cols-2 lg:gap-8"><div class="flex flex-col gap-4">{_PD_LABEL}{_PD_H2}</div><div class="flex flex-col gap-6">{_PD_DESC}{_PD_LOGOS}</div></div>
          <div class="{GAP} grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4">
            {"".join(f'''<article class="pd-frame flex flex-col gap-5 rounded-lg border p-3"><div class="pd-gs pd-fixed">{_pd_graphic(k, p, pl)}</div><div class="pd-copy px-3 pb-3"><span class="flex items-center gap-2">{_ic(f, "size-5")}<span class="pd-h {T["h3sm"]} text-heading">{n}</span></span><p class="pd-b mt-2 {T["small"]} text-body">{d}.</p></div></article>''' for k, ((p, pl), (f, n, d)) in enumerate(zip(PD_GFX, PD_PART), 1))}
          </div>
        </div>"""

PLAT_D_SECTION = f"""<section id="platform" class="pd-sec {SECTION}">
  <div class="mx-auto max-w-7xl px-6">{PD_L1}{PD_L2}{PD_L3}</div>
</section>"""

PD_CSS = f"""<style>
  [data-pd-layout="1"] [data-pd-l]:not([data-pd-l="1"]), [data-pd-layout="2"] [data-pd-l]:not([data-pd-l="2"]), [data-pd-layout="3"] [data-pd-l]:not([data-pd-l="3"]) {{ display: none; }}
  [data-pd-g="1"] .pd-gs:not(.pd-fixed) .pd-g:not([data-g="1"]), [data-pd-g="2"] .pd-gs:not(.pd-fixed) .pd-g:not([data-g="2"]), [data-pd-g="3"] .pd-gs:not(.pd-fixed) .pd-g:not([data-g="3"]) {{ display: none; }}
  .pd-g, .pd-g > .fv {{ height: 100%; }}
  .pd-wide .pd-g > .fv {{ min-height: 440px; }}
  .pd-fixed .pd-g > .fv {{ min-height: 360px; padding: 1.25rem; }}
  [data-pd-style="base"] .pd-g > .fv {{ background: color-mix(in srgb, #1d96fc 8%, white) !important; }}
  [data-pd-style="base"] .pd-g [data-pill] {{ display: none; }}
  [data-pd-style="paraform"] .pd-g > .fv {{ background: linear-gradient(160deg, color-mix(in srgb, var(--pd-deep) 55%, transparent), color-mix(in srgb, var(--pd-mid) 32%, transparent)), var(--pd-img) center / cover !important; padding-bottom: 4.5rem !important; }}
  /* Paraform photo + wash - the Works-with A options plus Frontline */
  [data-pd-photo="frontline"] {{ --pd-img: url({P}/images/solutions/FrontlineHero.webp); --pd-deep: #0f1936; --pd-mid: #1d96fc; }}
  [data-pd-photo="roster"] {{ --pd-img: url({P}/product/RosterBg.avif); --pd-deep: #104b90; --pd-mid: #59bbf7; }}
  [data-pd-photo="care"] {{ --pd-img: url({P}/product/CareBg.avif); --pd-deep: #0f1936; --pd-mid: #3b6fe0; }}
  [data-pd-photo="geno"] {{ --pd-img: url({P}/product/GenoBg.avif); --pd-deep: #3a0f45; --pd-mid: #91278c; }}
  /* Logos inside the graphic */
  [data-pd-logos="inside"] .pd-copy-logos {{ display: none; }}
  [data-pd-logos="inside"] .pd-strip {{ display: flex; }}
  [data-pd-logos="inside"] .pd-g > .fv {{ padding-top: 5.5rem !important; }}
  [data-pd-logos="inside"] .pd-fixed .pd-strip {{ gap: .25rem; }} [data-pd-logos="inside"] .pd-fixed .pd-strip span {{ width: 2rem; height: 2rem; }}
  /* Section tone */
  .pd-sec {{ background: #fff; transition: background-color .5s; }}
  .pd-frame {{ background: #f9fafe; border-color: transparent; }}
  [data-pd-bg="tint"] .pd-sec {{ background: #f9fafe; }} [data-pd-bg="tint"] .pd-frame {{ background: #fff; border-color: #e2e8f0; }}
  [data-pd-bg="navy"] .pd-sec {{ background: #0f1936; }} [data-pd-bg="navy"] .pd-frame {{ background: rgb(255 255 255 / .04); border-color: rgb(255 255 255 / .1); }}
  [data-pd-bg="accent"] .pd-sec {{ background: #1d96fc; }} [data-pd-bg="accent"] .pd-frame {{ background: rgb(255 255 255 / .12); border-color: rgb(255 255 255 / .2); }}
  [data-pd-bg="navy"] .pd-copy .pd-h, [data-pd-bg="accent"] .pd-copy .pd-h, [data-pd-bg="navy"] .pd-copy p.text-heading, [data-pd-bg="accent"] .pd-copy p.text-heading {{ color: #fff; }}
  [data-pd-bg="navy"] .pd-copy .pd-b {{ color: rgb(255 255 255 / .75); }} [data-pd-bg="accent"] .pd-copy .pd-b {{ color: rgb(255 255 255 / .85); }}
  [data-pd-bg="accent"] .pd-copy .bg-accent {{ background: #fff; }}
  [data-pd-bg="navy"] .pd-copy-logos span, [data-pd-bg="accent"] .pd-copy-logos span {{ border-color: transparent; }}
  /* Connected apps: active app, its wire and the sync label */
  .pd-chip {{ transition: border-color .4s, transform .4s; }}
  .pd-sync {{ display: none; }}
  [data-pd-cycle][data-k="0"] [data-app="0"].pd-chip, [data-pd-cycle][data-k="1"] [data-app="1"].pd-chip, [data-pd-cycle][data-k="2"] [data-app="2"].pd-chip, [data-pd-cycle][data-k="3"] [data-app="3"].pd-chip {{ border-color: #1d96fc !important; transform: translateY(-3px); }}
  [data-pd-cycle][data-k="0"] [data-app="0"].pd-wire, [data-pd-cycle][data-k="1"] [data-app="1"].pd-wire, [data-pd-cycle][data-k="2"] [data-app="2"].pd-wire, [data-pd-cycle][data-k="3"] [data-app="3"].pd-wire {{ stroke: #1d96fc; stroke-width: 2.5; }}
  [data-pd-cycle][data-k="0"] [data-app="0"].pd-sync, [data-pd-cycle][data-k="1"] [data-app="1"].pd-sync, [data-pd-cycle][data-k="2"] [data-app="2"].pd-sync, [data-pd-cycle][data-k="3"] [data-app="3"].pd-sync {{ display: inline; }}
  [data-pd-logos="inside"] .pd-chips {{ display: none; }}
  [data-pd-style="paraform"] .pd-g .bg-white, [data-pd-style="paraform"] .pd-g .bg-tint {{ background: rgb(255 255 255 / .72) !important; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-color: rgb(255 255 255 / .6) !important; }}
  [data-pd-style="paraform"] .pd-g .divide-line > * {{ border-color: rgb(15 25 54 / .08); }}
</style>"""

_PDBTN = "rounded-full border border-line px-3 py-1.5 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white"
PD_BAR = f"""<div class="border-b border-line bg-white/95"><div class="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-3">
    <p class="mr-1 text-sm font-medium text-heading">D &middot; Layout</p>{"".join(f'<button type="button" data-pd="layout:{v}" aria-pressed="{str(v == "1").lower()}" class="{_PDBTN}">{n}</button>' for v, n in [("1", "Split card"), ("2", "Centred"), ("3", "Three-up")])}
    <p class="ml-2 mr-1 text-sm font-medium text-heading">Graphic</p>{"".join(f'<button type="button" data-pd="g:{v}" aria-pressed="{str(v == "1").lower()}" class="{_PDBTN}">{v} &middot; {n}</button>' for v, n in [("1", "Work order flow"), ("2", "Copilot scheduling"), ("3", "Connected apps")])}
    <p class="ml-2 mr-1 text-sm font-medium text-heading">Style</p>{"".join(f'<button type="button" data-pd="style:{v}" aria-pressed="{str(v == "base").lower()}" class="{_PDBTN}">{n}</button>' for v, n in [("base", "Base"), ("paraform", "Paraform")])}
    <p class="ml-2 mr-1 text-sm font-medium text-heading">Section</p>{"".join(f'<button type="button" data-pd="bg:{v}" aria-pressed="{str(v == "white").lower()}" class="{_PDBTN}">{n}</button>' for v, n in [("white", "White"), ("tint", "Tint"), ("navy", "Navy"), ("accent", "Accent")])}
    <p class="ml-2 mr-1 text-sm font-medium text-heading">Logos</p>{"".join(f'<button type="button" data-pd="logos:{v}" aria-pressed="{str(v == "copy").lower()}" class="{_PDBTN}">{n}</button>' for v, n in [("copy", "With copy"), ("inside", "Inside graphic")])}
    <p class="ml-2 mr-1 text-sm font-medium text-heading">Paraform photo</p>{"".join(f'<button type="button" data-pd="photo:{v}" aria-pressed="{str(v == "frontline").lower()}" class="{_PDBTN}">{n}</button>' for v, n in [("frontline", "Frontline"), ("roster", "Roster"), ("care", "Care"), ("geno", "Genogram")])}
    <p class="text-xs text-muted">Three-up shows graphics 1-3 together.</p>
  </div></div>"""

PD_JS = """<script>
  (() => {
    const root = document.querySelector("[data-pd-root]"); if (!root) return;
    const KEYS = { layout: "pdLayout", g: "pdG", style: "pdStyle", bg: "pdBg", logos: "pdLogos", photo: "pdPhoto" };
    const DEF = { layout: "1", g: "1", style: "base", bg: "white", logos: "copy", photo: "frontline" };
    const set = (k, v) => {
      root.dataset[KEYS[k]] = v;
      document.querySelectorAll(`[data-pd^="${k}:"]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.pd === `${k}:${v}`)));
      try { localStorage.setItem("sognos-frontline-pd-" + k, v); } catch {}
    };
    document.querySelectorAll("[data-pd]").forEach((b) => b.addEventListener("click", () => { const [k, v] = b.dataset.pd.split(":"); set(k, v); }));
    Object.keys(DEF).forEach((k) => { let v = DEF[k]; try { v = localStorage.getItem("sognos-frontline-pd-" + k) || v; } catch {} set(k, v); });
    // Connected apps: step the active app every 1.6s (static under reduced motion).
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      let k = 0; setInterval(() => { k = (k + 1) % 4; root.querySelectorAll("[data-pd-cycle]").forEach((c) => (c.dataset.k = k)); }, 1600);
    }
  })();
</script>"""
