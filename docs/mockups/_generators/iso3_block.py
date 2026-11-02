# Isometric scenes 4-6 - true 3D (CSS preserve-3d) on one tilted plane,
# 280 x 280 plane units. Cubes have top / south / east faces shaded from one
# light; the plane sits left, numbered layer labels right (shared cycle:
# data-slab 0 Dynamics ... 3 Frontline). Data is illustrative.

def _cube(x, y, w, d, h, kind, top="", slab=None, extra_cls="", style=""):
    s = f' data-slab="{slab}"' if slab is not None else ""
    return (f'<div class="c3 {extra_cls}"{s} style="left:{x}px;top:{y}px;width:{w}px;height:{d}px;--h:{h}px;{style}">'
            f'<div class="c3-s {kind}"></div><div class="c3-e {kind}"></div><div class="c3-top {kind}">{top}</div></div>')


def _top_logo(f, size=26, invert=False):
    return f'<img src="{P}/logos/{f}" alt="" class="c3-logo" style="width:{size}px;height:{size}px{";filter:brightness(0) invert(1)" if invert else ""}" />'


def _labels(rows):
    return "".join(
        f'''<li data-slab="{slab}" class="iso-label flx-rise flx-d{k + 1} flex items-center gap-3 rounded-lg border px-3 py-2.5"><span class="iso-num flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] tabular-nums">{4 - k}</span><div class="min-w-0"><p class="text-sm font-medium">{n}</p><p class="text-xs opacity-75">{d}</p></div><span class="iso-tick ml-auto size-2 shrink-0 rounded-full"></span></li>'''
        for k, (slab, n, d) in enumerate(rows)
    )


def _scene(opt, plane, rows):
    return f'''<div data-iso="{opt}" class="iso-opt relative h-full">
            <div class="iso3-wrap absolute left-[29%] top-1/2"><div class="iso3">{plane}</div></div>
            <ul class="absolute right-[4%] top-1/2 w-[40%] max-w-[17rem] -translate-y-1/2 space-y-2">{_labels(rows)}</ul>
          </div>'''


# 4 · Ops board - Dynamics is the floor; a Frontline van drives the job loop,
# Copilot's route draws itself, Power Automate and job pins sit on the board.
_PINS = [(212, 52), (212, 212), (52, 212)]
SCENE_OPS = _scene("4", f"""
              <div data-slab="0" class="iso3-floor k-floor"><svg viewBox="0 0 280 280" class="absolute inset-0 size-full" aria-hidden="true">
                <path d="M60 60 H220 V220 H60 Z" fill="none" stroke="rgb(255 255 255 / .16)" stroke-width="16" stroke-linejoin="round"/>
                <path data-slab="1" class="ops-route" d="M60 60 H220 V220 H60 Z" fill="none" stroke="#59bbf7" stroke-width="3" stroke-dasharray="8 8" stroke-linejoin="round"/>
              </svg><img src="{P}/logos/Dynamics365.svg" alt="" class="absolute bottom-4 right-4 h-6 w-auto opacity-60 brightness-0 invert" /></div>
              {"".join(f'<span class="ops-ping" style="left:{x - 14}px;top:{y - 14}px;animation-delay:{k * .8}s"></span>' for k, (x, y) in enumerate(_PINS))}
              {"".join(_cube(x - 7, y - 7, 14, 14, 18 + k * 6, "k-white") for k, (x, y) in enumerate(_PINS))}
              {_cube(110, 110, 60, 60, 34, "k-white", _top_logo("copilot-logo.svg", 30), slab=1)}
              {_cube(30, 150, 44, 44, 22, "k-white", _top_logo("platform/PowerAutomate_scalable.svg", 24), slab=2)}
              {_cube(26, 26, 64, 64, 54, "k-accent", _top_logo("icon-sognos-care.svg", 28, True), slab=3)}
              {_cube(0, 0, 26, 16, 14, "k-van", "", extra_cls="ops-van")}
""", [(3, "Frontline", "Depot + van on the job loop"), (2, "Power Platform", "Automates the follow-ups"), (1, "Copilot AI", "Draws the best route"), (0, "Dynamics 365 Field Service", "The board everything runs on")])

# 5 · Modules - Dynamics is the core block; data packets run out along tracks
# to Copilot, Power Platform and Frontline, each lighting as packets land.
_CORE = (140, 140)
_MODS = [((37, 37), 1), ((233, 47), 2), ((220, 228), 3)]
SCENE_MODS = _scene("5", f"""
              <div class="iso3-floor k-grid"></div>
              <svg viewBox="0 0 280 280" class="absolute inset-0 size-full" aria-hidden="true">{"".join(f'<path d="M{_CORE[0]} {_CORE[1]} L{x} {y}" stroke="var(--s-conn)" stroke-width="4" stroke-linecap="round"/>' for (x, y), _ in _MODS)}</svg>
              {_cube(100, 100, 80, 80, 36, "k-navy", _top_logo("Dynamics365.svg", 34, True), slab=0)}
              {_cube(10, 10, 54, 54, 52, "k-white", _top_logo("copilot-logo.svg", 28), slab=1)}
              {_cube(206, 20, 54, 54, 40, "k-white", _top_logo("platform/PowerAutomate_scalable.svg", 26), slab=2)}
              {_cube(190, 198, 60, 60, 70, "k-accent", _top_logo("icon-sognos-care.svg", 28, True), slab=3)}
              {"".join(_cube(_CORE[0] - 5, _CORE[1] - 5, 10, 10, 10, "k-packet", extra_cls=f"mod-pk mod-pk{t}", style=f"animation-delay:{d}s") for t in (1, 2, 3) for d in (0, 1.1))}
""", [(3, "Frontline", "Field teams + mobile app"), (2, "Power Platform", "Workflows and reporting"), (1, "Copilot AI", "Scheduling intelligence"), (0, "Dynamics 365 Field Service", "Core data + work orders")])

# 6 · Device - the Frontline app on an isometric tablet; Dynamics, Copilot and
# Power Platform cards lift off the screen in turn and hover above it.
_ROWS = [("Job #4821 &middot; HVAC", "#34d399"), ("Job #4822 &middot; Electrical", "#1d96fc"), ("Job #4823 &middot; Plumbing", "#cbd5e1")]
_SCREEN = f"""<div class="dev-screen"><p class="dev-app">Frontline &middot; Today</p>{"".join(f'<p class="dev-row"><span style="background:{c}"></span>{t}</p>' for t, c in _ROWS)}</div>"""
_CARDS = [
    (0, 54, "k-navy", "Dynamics365.svg", True, "Work order #4821", "Created &middot; 08:42"),
    (1, 98, "k-white", "copilot-logo.svg", False, "Best slot &middot; 11:00", "P. Shah &middot; 4.2 km"),
    (2, 142, "k-white", "platform/PowerAutomate_scalable.svg", False, "Customer notified", "SMS + email sent"),
]
SCENE_DEVICE = _scene("6", f"""
              <div class="iso3-floor k-grid"></div>
              {_cube(40, 40, 200, 200, 12, "k-bezel", _SCREEN, slab=3)}
              {"".join(f'''<div data-slab="{s}" class="dev-card {kind}" style="--z:{z}px;--d:{s * .25}s"><span class="dev-ic">{_top_logo(logo, 22, inv)}</span><div><p class="dev-t">{t}</p><p class="dev-s">{sub}</p></div></div>''' for s, z, kind, logo, inv, t, sub in _CARDS)}
""", [(2, "Power Platform", "Automates the follow-up"), (1, "Copilot AI", "Suggests the slot"), (0, "Dynamics 365 Field Service", "Creates the work order"), (3, "Frontline", "The app in the field")])

ISO3_CSS = """
  /* 3D plane + cubes */
  .plat-a .iso3-wrap { width: 0; height: 0; }
  .plat-a .iso3 { position: absolute; left: -140px; top: -140px; width: 280px; height: 280px; transform: rotateX(58deg) rotateZ(-45deg); transform-style: preserve-3d; }
  .plat-a .iso3 > * { transform-style: preserve-3d; }
  .plat-a .iso3-floor { position: absolute; inset: 0; border-radius: 18px; }
  .plat-a .k-floor { background: var(--s-base); outline: 2px solid transparent; outline-offset: 6px; transition: outline-color .4s; }
  .plat-a .k-floor[data-on="true"] { outline-color: var(--s-sig); }
  .plat-a .k-grid { background-image: linear-gradient(var(--s-conn) 1px, transparent 1px), linear-gradient(90deg, var(--s-conn) 1px, transparent 1px); background-size: 28px 28px; opacity: .55; }
  .plat-a .c3 { position: absolute; transform-style: preserve-3d; transition: transform .6s cubic-bezier(.22,1,.36,1); }
  .plat-a .c3 > div { position: absolute; backface-visibility: hidden; }
  .plat-a .c3-top { inset: 0; transform: translateZ(var(--h)); display: flex; align-items: center; justify-content: center; border-radius: 4px; overflow: hidden; }
  .plat-a .c3-s { left: 0; top: 100%; width: 100%; height: var(--h); transform-origin: top; transform: rotateX(-90deg); }
  .plat-a .c3-e { left: 100%; top: 0; width: var(--h); height: 100%; transform-origin: left; transform: rotateY(90deg); }
  .plat-a .c3[data-on="true"] { transform: translateZ(14px); }
  .plat-a .c3[data-on="true"] > .c3-top { outline: 2px solid var(--s-sig); outline-offset: -2px; }
  .plat-a .c3-logo { transform: rotateZ(45deg) scaleY(1.85); object-fit: contain; }
  /* shading: top light, south mid, east dark */
  .plat-a .c3-top.k-white { background: #fff; } .plat-a .c3-s.k-white { background: #e3ebf9; } .plat-a .c3-e.k-white { background: #c6d6f2; }
  .plat-a .c3-top.k-navy, .plat-a .c3-top.k-bezel { background: #1b2a55; } .plat-a .c3-s.k-navy, .plat-a .c3-s.k-bezel { background: #0f1936; } .plat-a .c3-e.k-navy, .plat-a .c3-e.k-bezel { background: #08102a; }
  .plat-a .c3-top.k-accent { background: linear-gradient(135deg, #59bbf7, #1d96fc 60%, #3b6fe0); } .plat-a .c3-s.k-accent { background: #1679d8; } .plat-a .c3-e.k-accent { background: #0f5fb4; }
  .plat-a .c3-top.k-van { background: #fff; border-top: 5px solid #1d96fc; } .plat-a .c3-s.k-van { background: #dbe6f8; } .plat-a .c3-e.k-van { background: #b7cbef; }
  .plat-a .c3-top.k-packet { background: #59bbf7; } .plat-a .c3-s.k-packet { background: #1d96fc; } .plat-a .c3-e.k-packet { background: #1279d6; }
  [data-plat-bg="accent"] .plat-a .c3-top.k-accent { background: linear-gradient(135deg, #3b6fe0, #203e71); } [data-plat-bg="accent"] .plat-a .c3-s.k-accent { background: #182f63; } [data-plat-bg="accent"] .plat-a .c3-e.k-accent { background: #0f1f45; }
  [data-plat-bg="navy"] .plat-a .k-floor { box-sizing: border-box; border: 1px solid rgb(255 255 255 / .2); }
  /* 4 · ops board */
  @keyframes ops-van { 0% { left: 47px; top: 52px; } 25% { left: 207px; top: 52px; } 50% { left: 207px; top: 212px; } 75% { left: 47px; top: 212px; } 100% { left: 47px; top: 52px; } }
  .plat-a .fv.is-in .ops-van { animation: ops-van 9s linear infinite; }
  .plat-a .ops-van { left: 47px; top: 52px; margin: -8px 0 0 -13px; }
  @keyframes ops-dash { to { stroke-dashoffset: -32; } }
  .plat-a .fv.is-in .ops-route { animation: ops-dash 1s linear infinite; }
  @keyframes ops-ping { from { transform: scale(.4); opacity: .8; } to { transform: scale(2.2); opacity: 0; } }
  .plat-a .ops-ping { position: absolute; width: 28px; height: 28px; border-radius: 9999px; border: 2px solid #59bbf7; opacity: 0; }
  .plat-a .fv.is-in .ops-ping { animation: ops-ping 2.4s ease-out infinite; }
  /* 5 · modules: packets out along each track */
  @keyframes pk1 { from { left: 135px; top: 135px; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } to { left: 32px; top: 32px; opacity: 0; } }
  @keyframes pk2 { from { left: 135px; top: 135px; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } to { left: 228px; top: 42px; opacity: 0; } }
  @keyframes pk3 { from { left: 135px; top: 135px; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } to { left: 215px; top: 223px; opacity: 0; } }
  .plat-a .mod-pk { opacity: 0; }
  .plat-a .fv.is-in .mod-pk1 { animation: pk1 2.2s ease-in-out infinite; } .plat-a .fv.is-in .mod-pk2 { animation: pk2 2.2s ease-in-out infinite; } .plat-a .fv.is-in .mod-pk3 { animation: pk3 2.2s ease-in-out infinite; }
  /* 6 · device */
  .plat-a .dev-screen { position: absolute; inset: 10px; border-radius: 6px; background: #f9fafe; padding: 14px; display: flex; flex-direction: column; gap: 8px; font-size: 12px; color: #0f1936; }
  .plat-a .dev-app { font-weight: 600; font-size: 13px; }
  .plat-a .dev-row { display: flex; align-items: center; gap: 8px; border-radius: 6px; background: #fff; border: 1px solid #e2e8f0; padding: 8px 10px; }
  .plat-a .dev-row span { width: 8px; height: 8px; border-radius: 9999px; flex: none; }
  .plat-a .dev-card { position: absolute; left: 64px; top: 70px; width: 152px; height: 92px; display: flex; gap: 10px; align-items: center; padding: 12px; border-radius: 10px; font-size: 12px; opacity: 0; transform: translateZ(12px); transition: outline-color .4s; outline: 2px solid transparent; outline-offset: 2px; }
  .plat-a .dev-card.k-white { background: rgb(255 255 255 / .96); color: #0f1936; border: 1px solid #e2e8f0; }
  .plat-a .dev-card.k-navy { background: #1b2a55; color: #fff; }
  .plat-a .dev-t { font-weight: 600; } .plat-a .dev-s { opacity: .7; margin-top: 2px; }
  .plat-a .dev-ic { flex: none; display: flex; }
  .plat-a .dev-ic .c3-logo { transform: none; }
  @keyframes dev-lift { from { opacity: 0; transform: translateZ(12px); } to { opacity: 1; transform: translateZ(var(--z)); } }
  @keyframes dev-bob { 0%, 100% { transform: translateZ(var(--z)); } 50% { transform: translateZ(calc(var(--z) + 8px)); } }
  .plat-a .fv.is-in .dev-card { opacity: 1; animation: dev-lift 1s cubic-bezier(.22,1,.36,1) backwards, dev-bob 4s ease-in-out infinite; animation-delay: var(--d), calc(1.2s + var(--d)); transform: translateZ(var(--z)); }
  .plat-a .dev-card[data-on="true"] { outline-color: var(--s-sig); }
  /* Paraform: frost the light surfaces */
  [data-iso-style="paraform"] .plat-a .c3-top.k-white, [data-iso-style="paraform"] .plat-a .dev-card.k-white { background: rgb(255 255 255 / .72); }
  [data-iso-style="paraform"] .plat-a .k-grid { opacity: .35; }
  @media (prefers-reduced-motion: reduce) {
    .plat-a .ops-van, .plat-a .ops-route, .plat-a .ops-ping, .plat-a .mod-pk { animation: none !important; }
    .plat-a .mod-pk, .plat-a .ops-ping { display: none; }
    .plat-a .dev-card { animation: none !important; opacity: 1; transform: translateZ(var(--z)); }
  }
"""
