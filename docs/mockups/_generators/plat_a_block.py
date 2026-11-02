_SLABS = [
    ("Frontline", "Sognos solution", "slab-top", None),
    ("Power Platform", "Workflow automation and reporting", "slab-mid", "platform/PowerAutomate_scalable.svg"),
    ("Copilot AI", "Intelligent scheduling", "slab-mid", "copilot-logo.svg"),
    ("Dynamics 365 Field Service", "Microsoft Dynamics 365", "slab-base", "Dynamics365.svg"),
]
# Layer stack, no rail: label + heading + lede + logo tiles left, the stack
# right. Motion: copy and logo tiles rise in, slabs build bottom-up, a
# signal runs up the connectors and lights each layer in turn (Dynamics ->
# Frontline), the Frontline slab's gradient drifts. Background tone is a
# review control (white / tint / navy / accent) on the Platform bar.
_CONNECTOR = '<div aria-hidden="true" class="plat-conn relative mx-auto h-7 w-px"><span class="plat-dot absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full"></span></div>'
PLAT_A = f"""<section id="platform" class="plat-a {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
      <div class="fv flex flex-col gap-4 lg:col-span-5">
        <div class="flx-rise"><p class="plat-label flex items-center gap-2.5 text-lg leading-[1.6]"><span aria-hidden="true" class="plat-mark block size-[0.66em] shrink-0"></span>Platform</p></div>
        <h2 class="flx-rise flx-d1 plat-h {T["h2"]}">Built on {PLATFORM_LABEL}</h2>
        <p class="flx-rise flx-d2 plat-b {T["lede"]}">{PLATFORM_DESC}</p>
        <ul class="plat-line mt-6 flex flex-wrap gap-2 border-t pt-8">
          {"".join(f'<li class="flx-rise" style="transition-delay:{.3 + k * .06:.2f}s"><span title="{a}" class="plat-tile flex size-12 items-center justify-center rounded-lg border"><img src="{P}/logos/{f}" alt="{a}" class="h-6 w-auto" /></span></li>' for k, (f, a) in enumerate(MS_LOGOS))}
        </ul>
      </div>
      <div class="fv lg:col-span-7">
        <div data-plat-stack class="plat-panel rounded-lg border p-6 sm:p-10">
          {_CONNECTOR.join(f'''<div data-slab="{3 - k}" class="flx-slab {cls} relative flex items-center gap-4 overflow-hidden rounded-lg border p-4 transition-[box-shadow,transform,border-color] duration-500 sm:p-5" style="transition-delay:{(3 - k) * .18 + .1:.2f}s;margin-inline:{k * 4}%">
            {"" if cls != "slab-top" else '<span aria-hidden="true" class="m-drift absolute inset-0" style="background-image: linear-gradient(120deg, #1d96fc, #3b6fe0, #59bbf7, #1d96fc)"></span>'}
            <span class="relative flex size-10 shrink-0 items-center justify-center rounded {"bg-white/15" if cls != "slab-mid" else "bg-tint"}">{f'<img src="{P}/logos/{logo}" alt="" class="h-6 w-auto {"brightness-0 invert" if cls == "slab-base" else ""}" />' if logo else f'<img src="{P}/logos/icon-sognos-care.svg" alt="" class="size-6 brightness-0 invert" />'}</span>
            <div class="relative min-w-0 flex-1"><p class="text-base font-medium">{n}</p><p class="text-sm opacity-75">{d}</p></div>
            <span aria-hidden="true" class="slab-live relative flex size-2.5 shrink-0"><span class="absolute inset-0 animate-ping rounded-full bg-emerald-400"></span><span class="relative size-2.5 rounded-full bg-emerald-400"></span></span>
          </div>''' for k, (n, d, cls, logo) in enumerate(_SLABS))}
        </div>
      </div>
    </div>
  </div>
</section>"""

PLAT_TONES = [("white", "White"), ("tint", "Tint"), ("navy", "Navy"), ("accent", "Accent")]
PLAT_CSS = """<style>
  /* Tone tokens per background option (Platform A). */
  [data-plat-bg] .plat-a { --s-bg:#fff; --s-h:#0f1936; --s-b:#152248; --s-mark:#1d96fc; --s-line:#e2e8f0; --s-tile:#fff; --s-panel:#f9fafe; --s-panel-b:transparent; --s-mid:#fff; --s-mid-t:#0f1936; --s-base:#0f1936; --s-top-t:#fff; --s-conn:#cbd5e1; --s-sig:#1d96fc; transition: background-color .5s; background: var(--s-bg); }
  [data-plat-bg="tint"] .plat-a { --s-bg:#f9fafe; --s-panel:#fff; --s-panel-b:#e2e8f0; --s-mid:#f9fafe; }
  [data-plat-bg="navy"] .plat-a { --s-bg:#0f1936; --s-h:#fff; --s-b:rgb(255 255 255 / .75); --s-line:rgb(255 255 255 / .12); --s-tile:#fff; --s-panel:rgb(255 255 255 / .04); --s-panel-b:rgb(255 255 255 / .1); --s-mid:#fff; --s-base:#152248; --s-conn:rgb(255 255 255 / .25); --s-sig:#59bbf7; }
  [data-plat-bg="accent"] .plat-a { --s-bg:#1d96fc; --s-h:#fff; --s-b:rgb(255 255 255 / .85); --s-mark:#fff; --s-line:rgb(255 255 255 / .25); --s-tile:#fff; --s-panel:rgb(255 255 255 / .12); --s-panel-b:rgb(255 255 255 / .2); --s-mid:#fff; --s-base:#0f1936; --s-conn:rgb(255 255 255 / .45); --s-sig:#fff; }
  .plat-a .plat-h { color: var(--s-h); } .plat-a .plat-b, .plat-a .plat-label { color: var(--s-b); } .plat-a .plat-label { color: var(--s-h); }
  .plat-a .plat-mark { background: var(--s-mark); } .plat-a .plat-line { border-color: var(--s-line); }
  .plat-a .plat-tile { background: var(--s-tile); border-color: var(--s-line); transition: transform .3s; } .plat-a .plat-tile:hover { transform: translateY(-2px); }
  .plat-a .plat-panel { background: var(--s-panel); border-color: var(--s-panel-b); }
  .plat-a .slab-mid { background: var(--s-mid); color: var(--s-mid-t); border-color: #e2e8f0; }
  .plat-a .slab-base { background: var(--s-base); color: #fff; border-color: transparent; }
  .plat-a .slab-top { color: var(--s-top-t); border-color: transparent; }
  [data-plat-bg="accent"] .plat-a .slab-top > .m-drift { background-image: linear-gradient(120deg, #0f1936, #203e71, #3b6fe0, #0f1936) !important; }
  .plat-a .plat-conn { background: var(--s-conn); }
  /* Signal: a dot climbs each connector; the layer it reaches lights up. */
  @keyframes plat-climb { from { top: 100%; opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } to { top: 0; opacity: 0; } }
  .plat-a .fv.is-in .plat-dot { background: var(--s-sig); animation: plat-climb 1.4s ease-in-out infinite; }
  .plat-a .slab-live { opacity: 0; transition: opacity .4s; }
  .plat-a [data-slab][data-on="true"] { transform: translateX(6px); border-color: var(--s-sig); }
  .plat-a [data-slab][data-on="true"] .slab-live { opacity: 1; }
  @media (prefers-reduced-motion: reduce) {
    .plat-a .plat-dot { animation: none !important; opacity: 0; }
    .plat-a [data-slab][data-on="true"] { transform: none; }
    .plat-a .slab-live .animate-ping { animation: none; }
  }
</style>"""

PLAT_BAR = '<span class="mx-2 hidden h-5 w-px bg-line sm:block"></span><p class="mr-1 text-sm font-medium text-heading">A &middot; Background</p>' + "".join(
    f'<button type="button" data-plat-tone="{v}" aria-pressed="{str(v == "white").lower()}" class="rounded-full border border-line px-3 py-1.5 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">{n}</button>'
    for v, n in PLAT_TONES
)

PLAT_JS = """<script>
  (() => {
    const root = document.querySelector("[data-plat-bg]"); if (!root) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const set = (v) => {
      root.dataset.platBg = v;
      document.querySelectorAll("[data-plat-tone]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.platTone === v)));
      try { localStorage.setItem("sognos-frontline-plat-bg", v); } catch {}
    };
    document.querySelectorAll("[data-plat-tone]").forEach((b) => b.addEventListener("click", () => set(b.dataset.platTone)));
    let v = "white"; try { v = localStorage.getItem("sognos-frontline-plat-bg") || v; } catch {} set(v);
    // Light the layers bottom-up (Dynamics 0 -> Frontline 3), hold, restart.
    const slabs = [...root.querySelectorAll("[data-slab]")];
    if (!slabs.length) return;
    if (reduce) { slabs.forEach((s) => (s.dataset.on = String(s.dataset.slab === "3"))); return; }
    let k = -1;
    setInterval(() => { k = (k + 1) % 6; slabs.forEach((s) => (s.dataset.on = String(+s.dataset.slab === k))); }, 1400);
  })();
</script>"""


def platform_group():
    """Platform switcher + the A background-tone control."""
    html = switch_group("platform")
    bar_end = html.index("</div>\n</div>")
    html = html[:bar_end] + PLAT_BAR + "\n  " + html[bar_end:]
    return f'<div data-plat-bg="white">{html}</div>'


