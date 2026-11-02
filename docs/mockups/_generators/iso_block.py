# 1 · Isometric - three polished compositions (review control "Iso 1/2/3")
# in two image styles ("Base": tone panel, solid plates; "Paraform": the
# Frontline hero photo under a colour wash, frosted plates and labels, a
# blurred status pill). Plates have a thickness edge, a logo on every face,
# and lift when lit (shared layer cycle). Data is illustrative.
_ISO_GEOM = {
    # option: [(size px, x px, y px) bottom -> top], label side
    "1": [(230, 0, 96), (230, 0, 28), (230, 0, -40), (230, 0, -108)],      # exploded column
    "2": [(190, -96, 92), (190, -32, 32), (190, 32, -28), (190, 96, -88)],  # staircase
    "3": [(300, 0, 70), (236, 0, 18), (172, 0, -34), (108, 0, -86)],       # pyramid
}


def _iso_plate(i, n, d, cls, logo, size, x, y):
    face = f'<div class="iso-face {cls}">{_DRIFT if cls == "slab-top" else ""}<span class="iso-logo relative flex items-center justify-center rounded-full">{_logo_img(cls, logo, "h-7")}</span></div>'
    return f'''<div data-slab="{i}" class="iso-l" style="--s:{size}px;--x:{x}px;--y:{y}px;--i:{i}"><div class="iso-edge {cls}"></div>{face}</div>'''


def _iso_option(opt):
    geom = _ISO_GEOM[opt]
    plates = "".join(_iso_plate(i, *_BOTTOM_UP[i], *geom[i]) for i in range(4))
    if opt == "3":
        # pyramid: a pulse ring rises through the layers
        plates += '<div aria-hidden="true" class="iso-pulse"></div>'
    labels = "".join(
        f'''<li data-slab="{3 - k}" class="iso-label flx-rise flx-d{k + 1} flex items-center gap-3 rounded-lg border px-3 py-2.5"><span class="iso-num flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] tabular-nums">{4 - k}</span><div class="min-w-0"><p class="text-sm font-medium">{n}</p><p class="text-xs opacity-75">{d}</p></div><span class="iso-tick ml-auto size-2 shrink-0 rounded-full"></span></li>'''
        for k, (n, d, cls, logo) in enumerate(_SLABS)
    )
    return f'''<div data-iso="{opt}" class="iso-opt relative h-full">
            <div class="iso-stage absolute left-[30%] top-1/2 sm:left-[29%]">{plates}</div>
            <ul class="absolute right-[4%] top-1/2 w-[40%] max-w-[17rem] -translate-y-1/2 space-y-2">{labels}</ul>
          </div>'''


STACK_ISO = f"""<div class="plat-panel iso-panel relative h-[480px] overflow-hidden rounded-lg border">
          <span aria-hidden="true" class="iso-photo absolute inset-0"></span>
          {"".join(_iso_option(o) for o in "123")}
          <p class="iso-pill absolute bottom-5 left-[30%] z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/40 bg-care-dark/30 px-4 py-2 text-xs text-white backdrop-blur-md"><span class="size-1.5 rounded-full bg-emerald-400"></span>Live on Dynamics 365 &middot; 4 layers</p>
        </div>"""

ISO_CSS = f"""
  /* Isometric: option + style */
  [data-iso-v="1"] .iso-opt:not([data-iso="1"]), [data-iso-v="2"] .iso-opt:not([data-iso="2"]), [data-iso-v="3"] .iso-opt:not([data-iso="3"]) {{ display: none; }}
  .plat-a .iso-photo, .plat-a .iso-pill {{ display: none; }}
  .plat-a .iso-stage {{ width: 0; height: 0; }}
  .plat-a .iso-l {{ position: absolute; left: 0; top: 0; width: var(--s); height: var(--s); margin: calc(var(--s) / -2) 0 0 calc(var(--s) / -2); opacity: 0; transform: translate(var(--x), var(--y)); transition: transform .6s cubic-bezier(.22,1,.36,1); }}
  .plat-a .fv.is-in .iso-l {{ opacity: 1; animation: iso2-in .9s cubic-bezier(.22,1,.36,1) both; animation-delay: calc(var(--i) * .16s); }}
  @keyframes iso2-in {{ from {{ opacity: 0; transform: translate(var(--x), calc(var(--y) - 120px)); }} to {{ opacity: 1; transform: translate(var(--x), var(--y)); }} }}
  .plat-a .iso-l[data-on="true"] {{ transform: translate(var(--x), calc(var(--y) - 16px)); }}
  .plat-a .iso-face, .plat-a .iso-edge {{ position: absolute; inset: 0; border-radius: 22px; transform: rotateX(58deg) rotateZ(-45deg); }}
  .plat-a .iso-edge {{ transform: translateY(10px) rotateX(58deg) rotateZ(-45deg); }}
  .plat-a .iso-face {{ display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid transparent; transition: border-color .4s, background-color .4s; }}
  .plat-a .iso-logo {{ size: 0; width: 52px; height: 52px; background: rgb(255 255 255 / .14); transform: rotateZ(45deg) scaleY(1.6); }}
  .plat-a .iso-face.slab-mid .iso-logo {{ background: #fff; border: 1px solid #e2e8f0; }}
  /* Base plate colours (follow the section tone) */
  .plat-a .iso-face.slab-base {{ background: var(--s-base); }} .plat-a .iso-edge.slab-base {{ background: #060e28; }}
  .plat-a .iso-face.slab-mid {{ background: #eef4fe; border-color: #b9cdf3; }} .plat-a .iso-edge.slab-mid {{ background: #b9cdf3; }}
  .plat-a .iso-face.slab-top {{ border-color: rgb(255 255 255 / .35); }} .plat-a .iso-edge.slab-top {{ background: #1b5fd0; }}
  .plat-a .iso-l[data-on="true"] .iso-face {{ border-color: var(--s-sig); }}
  [data-plat-bg="navy"] .plat-a .iso-face.slab-base {{ border-color: rgb(255 255 255 / .25); }}
  /* option 3 - pulse ring rising through the pyramid */
  .plat-a .iso-pulse {{ position: absolute; left: -60px; top: -60px; width: 120px; height: 120px; border: 2px solid var(--s-sig); border-radius: 22px; opacity: 0; transform: translateY(80px) rotateX(58deg) rotateZ(-45deg); }}
  .plat-a .fv.is-in .iso-pulse {{ animation: iso-rise 2.8s ease-in infinite 1s; }}
  @keyframes iso-rise {{ 0% {{ opacity: 0; transform: translateY(90px) rotateX(58deg) rotateZ(-45deg) scale(1.9); }} 20% {{ opacity: .9; }} 100% {{ opacity: 0; transform: translateY(-110px) rotateX(58deg) rotateZ(-45deg) scale(.5); }} }}
  /* labels */
  .plat-a .iso-label {{ background: var(--s-mid); color: var(--s-mid-t); border-color: #e2e8f0; transition: border-color .4s, transform .4s; }}
  .plat-a .iso-num {{ background: #f1f5f9; color: #0f1936; transition: background-color .4s, color .4s; }}
  .plat-a .iso-tick {{ background: transparent; transition: background-color .4s; }}
  .plat-a .iso-label[data-on="true"] {{ border-color: var(--s-sig); transform: translateX(-6px); }}
  .plat-a .iso-label[data-on="true"] .iso-num {{ background: #1d96fc; color: #fff; }}
  .plat-a .iso-label[data-on="true"] .iso-tick {{ background: #34d399; }}
  /* Paraform style */
  [data-iso-style="paraform"] .plat-a .iso-panel {{ border-color: transparent; }}
  [data-iso-style="paraform"] .plat-a .iso-photo {{ display: block; background: linear-gradient(160deg, rgb(15 25 54 / .55), rgb(29 150 252 / .28)), url({P}/images/solutions/FrontlineHero.webp) center / cover; }}
  [data-iso-style="paraform"] .plat-a .iso-pill {{ display: flex; }}
  [data-iso-style="paraform"] .plat-a .iso-face.slab-mid {{ background: rgb(255 255 255 / .6); border-color: rgb(255 255 255 / .75); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }}
  [data-iso-style="paraform"] .plat-a .iso-edge.slab-mid {{ background: rgb(255 255 255 / .35); }}
  [data-iso-style="paraform"] .plat-a .iso-face.slab-base {{ background: rgb(15 25 54 / .78); border-color: rgb(255 255 255 / .3); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }}
  [data-iso-style="paraform"] .plat-a .iso-edge.slab-base {{ background: rgb(6 14 40 / .7); }}
  [data-iso-style="paraform"] .plat-a .iso-label {{ background: rgb(255 255 255 / .72); border-color: rgb(255 255 255 / .6); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }}
  @media (prefers-reduced-motion: reduce) {{
    .plat-a .iso-l {{ opacity: 1 !important; animation: none !important; }}
    .plat-a .iso-l[data-on="true"] {{ transform: translate(var(--x), var(--y)); }}
    .plat-a .iso-pulse {{ display: none; }}
  }}
"""

ISO_BAR = '<p class="ml-2 mr-1 text-sm font-medium text-heading">Iso</p>' + "".join(
    f'<button type="button" data-isopick="v:{v}" aria-pressed="{str(v == "1").lower()}" class="rounded-full border border-line px-3 py-1.5 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">{v} &middot; {n}</button>'
    for v, n in [("1", "Exploded"), ("2", "Staircase"), ("3", "Pyramid")]
) + '<p class="ml-2 mr-1 text-sm font-medium text-heading">Iso style</p>' + "".join(
    f'<button type="button" data-isopick="style:{v}" aria-pressed="{str(v == "base").lower()}" class="rounded-full border border-line px-3 py-1.5 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">{n}</button>'
    for v, n in [("base", "Base"), ("paraform", "Paraform")]
)

ISO_JS = """<script>
  (() => {
    const root = document.querySelector("[data-plat-bg]"); if (!root) return;
    const KEYS = { v: "isoV", style: "isoStyle" }, DEF = { v: "1", style: "base" };
    const set = (k, v) => {
      root.dataset[KEYS[k]] = v;
      document.querySelectorAll(`[data-isopick^="${k}:"]`).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.isopick === `${k}:${v}`)));
      try { localStorage.setItem("sognos-frontline-iso-" + k, v); } catch {}
    };
    document.querySelectorAll("[data-isopick]").forEach((b) => b.addEventListener("click", () => { const [k, v] = b.dataset.isopick.split(":"); set(k, v); }));
    Object.keys(DEF).forEach((k) => { let v = DEF[k]; try { v = localStorage.getItem("sognos-frontline-iso-" + k) || v; } catch {} set(k, v); });
  })();
</script>"""
