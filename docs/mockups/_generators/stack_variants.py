# Layer-stack designs for Platform A (review control "Stack"). All four share
# the tone tokens and the layer cycle in PLAT_JS (data-slab 0 = Dynamics ...
# 3 = Frontline; data-on marks the lit layer, data-k on the stack the step).
_BOTTOM_UP = list(reversed(_SLABS))  # Dynamics, Copilot, Power Platform, Frontline


def _logo_img(cls, logo, size="h-6"):
    if not logo:
        return f'<img src="{P}/logos/icon-sognos-care.svg" alt="" class="size-6 brightness-0 invert" />'
    return f'<img src="{P}/logos/{logo}" alt="" class="{size} w-auto {"brightness-0 invert" if cls == "slab-base" else ""}" />'


_DRIFT = '<span aria-hidden="true" class="m-drift absolute inset-0" style="background-image: linear-gradient(120deg, #1d96fc, #3b6fe0, #59bbf7, #1d96fc)"></span>'

# 1 · Isometric - plates stacked in 3D, breathing apart and together; labels
# right with the lit layer's row marked.
STACK_ISO = f"""<div class="plat-panel relative h-[440px] overflow-hidden rounded-lg border">
          <div class="iso-stage absolute left-[7%] top-[56%] aspect-square w-[44%] max-w-[260px]">
            {"".join(f'''<div class="iso-layer" style="--i:{i}"><div data-slab="{i}" class="iso-plate {cls}">{_DRIFT if cls == "slab-top" else ""}<span class="relative">{_logo_img(cls, logo, "h-8")}</span></div></div>''' for i, (n, d, cls, logo) in enumerate(_BOTTOM_UP))}
          </div>
          <ul class="absolute right-[5%] top-1/2 w-[42%] -translate-y-1/2 space-y-2">
            {"".join(f'''<li data-slab="{3 - k}" class="iso-label flx-rise flx-d{k + 1} flex items-center gap-3 rounded-lg border p-3"><span class="iso-tick size-2 shrink-0 rounded-full"></span><div class="min-w-0"><p class="text-sm font-medium">{n}</p><p class="text-xs opacity-75">{d}</p></div></li>''' for k, (n, d, cls, logo) in enumerate(_SLABS))}
          </ul>
        </div>"""


# 2 · Nested - each layer contains the next; Frontline is the core, a ripple
# runs outward from it and the lit layer is outlined.
def _nest(i):
    n, d, cls, logo = _BOTTOM_UP[i]
    head = f'<div class="relative flex items-center gap-3"><span class="flex size-9 shrink-0 items-center justify-center rounded {"bg-white/15" if cls != "slab-mid" else "bg-tint"}">{_logo_img(cls, logo, "h-5")}</span><div class="min-w-0"><p class="text-sm font-medium">{n}</p><p class="text-xs opacity-75">{d}</p></div></div>'
    if i == 3:
        return f'''<div data-slab="3" class="nest slab-top flx-rise flx-d4 relative mt-4 overflow-hidden rounded-lg p-5">{_DRIFT}<span aria-hidden="true" class="nest-ripple"></span><span aria-hidden="true" class="nest-ripple" style="animation-delay:1.2s"></span>{head}</div>'''
    tone = {0: "slab-base", 1: "slab-mid", 2: "nest-tint"}[i]
    return f'''<div data-slab="{i}" class="nest {tone} flx-rise flx-d{i + 1} relative rounded-lg border p-4 sm:p-5 {"mt-4" if i else ""}">{head}{_nest(i + 1)}</div>'''


STACK_NEST = f"""<div class="plat-panel rounded-lg border p-5 sm:p-8">{_nest(0)}</div>"""

# 3 · Flow - the layers side by side as a pipeline; a job travels through and
# each layer leaves its result behind.
_FLOW_RES = ["Work order created", "Best slot &middot; 11:00", "Approval sent", "Dispatched &middot; P. Shah"]
STACK_FLOW = f"""<div class="plat-panel rounded-lg border p-5 sm:p-8">
          <div data-flow class="relative">
            <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {"".join(f'''<div data-slab="{i}" data-col="{i}" class="flow-col {cls} flx-rise flx-d{i + 1} relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-lg border p-4">
                {_DRIFT if cls == "slab-top" else ""}
                <div class="relative"><span class="flex size-9 items-center justify-center rounded {"bg-white/15" if cls != "slab-mid" else "bg-tint"}">{_logo_img(cls, logo, "h-5")}</span><p class="mt-3 text-sm font-medium leading-snug">{n}</p></div>
                <p class="flow-res relative flex items-center gap-1.5 text-xs"><span class="text-emerald-500">&#10003;</span>{r}</p>
              </div>''' for i, ((n, d, cls, logo), r) in enumerate(zip(_BOTTOM_UP, _FLOW_RES)))}
            </div>
            <div class="relative mt-5 hidden h-10 sm:block">
              <span class="flow-track absolute inset-x-[12.5%] top-1/2 border-t-2 border-dashed"></span>
              <span class="flow-packet absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-care-dark px-3 py-1.5 text-xs font-medium text-white"><span class="size-1.5 rounded-full bg-accent"></span>Job #4821</span>
            </div>
          </div>
        </div>"""

STACK_OPTS = [("classic", "Classic"), ("iso", "Isometric"), ("nest", "Nested"), ("flow", "Flow")]

STACK_CSS = """<style>
  [data-plat-stack-v="classic"] [data-stack-v]:not([data-stack-v="classic"]), [data-plat-stack-v="iso"] [data-stack-v]:not([data-stack-v="iso"]),
  [data-plat-stack-v="nest"] [data-stack-v]:not([data-stack-v="nest"]), [data-plat-stack-v="flow"] [data-stack-v]:not([data-stack-v="flow"]) { display: none; }
  .plat-a .nest-tint { background: var(--s-panel-alt, #f9fafe); color: #0f1936; border-color: #e2e8f0; }
  [data-plat-bg="tint"] .plat-a { --s-panel-alt: #eef3fd; }
  /* Isometric */
  .plat-a .iso-layer { position: absolute; inset: 0; opacity: 0; transform: translateY(calc(var(--i) * -34px)); }
  .plat-a .fv.is-in .iso-layer { opacity: 1; animation: iso-drop .9s cubic-bezier(.22,1,.36,1) both, iso-sep 5s ease-in-out infinite; animation-delay: calc(var(--i) * .15s), calc(1.4s + var(--i) * .1s); }
  @keyframes iso-drop { from { opacity: 0; transform: translateY(calc(var(--i) * -34px - 140px)); } to { opacity: 1; transform: translateY(calc(var(--i) * -34px)); } }
  @keyframes iso-sep { 0%, 100% { transform: translateY(calc(var(--i) * -34px)); } 50% { transform: translateY(calc(var(--i) * -52px)); } }
  .plat-a .iso-plate { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 18px; border: 1px solid transparent; transform: rotateX(58deg) rotateZ(-45deg); transition: outline-color .4s; outline: 2px solid transparent; outline-offset: 4px; }
  .plat-a .iso-plate.slab-mid { border-color: #e2e8f0; }
  .plat-a .iso-plate[data-on="true"] { outline-color: var(--s-sig); }
  .plat-a .iso-label { background: var(--s-mid); color: var(--s-mid-t); border-color: #e2e8f0; transition: border-color .4s, transform .4s; }
  .plat-a .iso-tick { background: #cbd5e1; transition: background-color .4s; }
  .plat-a .iso-label[data-on="true"] { border-color: var(--s-sig); transform: translateX(-6px); }
  .plat-a .iso-label[data-on="true"] .iso-tick { background: #34d399; }
  /* Nested */
  .plat-a .nest { outline: 2px solid transparent; outline-offset: 3px; transition: outline-color .4s; }
  .plat-a .nest[data-on="true"] { outline-color: var(--s-sig); }
  @keyframes nest-ripple { from { transform: translate(-50%, -50%) scale(.2); opacity: .6; } to { transform: translate(-50%, -50%) scale(3.2); opacity: 0; } }
  .plat-a .nest-ripple { position: absolute; left: 50%; top: 50%; width: 120px; height: 120px; border-radius: 9999px; border: 2px solid rgb(255 255 255 / .6); pointer-events: none; }
  .plat-a .fv.is-in .nest-ripple { animation: nest-ripple 2.4s ease-out infinite; }
  /* Flow */
  .plat-a .flow-col { outline: 2px solid transparent; outline-offset: 3px; transition: outline-color .4s; }
  .plat-a .flow-col[data-on="true"] { outline-color: var(--s-sig); }
  .plat-a .flow-res { opacity: 0; transform: translateY(6px); transition: opacity .4s, transform .4s; }
  .plat-a .flow-track { border-color: var(--s-conn); }
  .plat-a .flow-packet { left: 12.5%; transition: left .9s cubic-bezier(.65,0,.35,1); }
  [data-k="1"] .flow-packet { left: 37.5%; } [data-k="2"] .flow-packet { left: 62.5%; } [data-k="3"] .flow-packet, [data-k="4"] .flow-packet, [data-k="5"] .flow-packet { left: 87.5%; }
""" + "\n".join(
    f'  [data-k="{k}"] [data-col="{i}"] .flow-res {{ opacity: 1; transform: none; }}' for k in range(6) for i in range(min(k, 3) + 1)
) + """
  @media (prefers-reduced-motion: reduce) {
    .plat-a .iso-layer { opacity: 1 !important; animation: none !important; }
    .plat-a .nest-ripple { animation: none !important; display: none; }
    .plat-a .flow-res { opacity: 1; transform: none; }
    .plat-a .flow-packet { left: 87.5%; transition: none; }
  }
</style>"""

STACK_BAR = '<p class="ml-2 mr-1 text-sm font-medium text-heading">Stack</p>' + "".join(
    f'<button type="button" data-plat-stackpick="{v}" aria-pressed="{str(v == "classic").lower()}" class="rounded-full border border-line px-3 py-1.5 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">{n}</button>'
    for v, n in STACK_OPTS
)

STACK_JS = """<script>
  (() => {
    const root = document.querySelector("[data-plat-bg]"); if (!root) return;
    const set = (v) => {
      root.dataset.platStackV = v;
      document.querySelectorAll("[data-plat-stackpick]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.platStackpick === v)));
      try { localStorage.setItem("sognos-frontline-plat-stack", v); } catch {}
    };
    document.querySelectorAll("[data-plat-stackpick]").forEach((b) => b.addEventListener("click", () => set(b.dataset.platStackpick)));
    let v = "classic"; try { v = localStorage.getItem("sognos-frontline-plat-stack") || v; } catch {} set(v);
  })();
</script>"""


