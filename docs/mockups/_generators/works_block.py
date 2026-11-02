# ── 06 Works with (1-3 products) ────────────────────────────────────────────
# Roster, Care, Genogram in that order; a "Products 1 / 2 / 3" control on the
# switcher bar sets how many show (data-count on each variant). Live names +
# taglines (lib/constants PRODUCTS). Graphic data is illustrative.
_WHEAD = f"""<h2 class="{T["h2"]} text-heading">Connects to the Sognos platform</h2>"""

# Genogram panel: two-generation family + support network, nodes rise in.
_GENO_SVG = """<svg viewBox="0 0 300 170" class="h-auto w-full" aria-hidden="true">
              <path d="M70 40 H140 M105 40 V80 M60 80 H150 M60 80 V110 M150 80 V110 M195 40 H250" stroke="#91278c" stroke-width="2" fill="none"/>
              <path class="flow" d="M150 125 C190 125 200 70 222 55" stroke="#c084c9" stroke-width="1.5" fill="none"/>
              <rect class="flx-rise flx-d1" x="55" y="27" width="26" height="26" rx="3" fill="#fff" stroke="#91278c" stroke-width="2"/>
              <circle class="flx-rise flx-d1" cx="140" cy="40" r="13" fill="#fff" stroke="#91278c" stroke-width="2"/>
              <rect class="flx-rise flx-d2" x="47" y="110" width="26" height="26" rx="3" fill="#fff" stroke="#91278c" stroke-width="2"/>
              <circle class="flx-rise flx-d2" cx="150" cy="123" r="13" fill="#91278c"/>
              <rect class="flx-rise flx-d3" x="182" y="27" width="26" height="26" rx="3" fill="#fff" stroke="#c084c9" stroke-width="2" stroke-dasharray="3 3"/>
              <circle class="flx-rise flx-d3" cx="250" cy="40" r="13" fill="#fff" stroke="#c084c9" stroke-width="2" stroke-dasharray="3 3"/>
              <text x="150" y="160" text-anchor="middle" font-size="10" fill="#68706f" font-family="sans-serif">Client</text>
              <text x="222" y="78" text-anchor="middle" font-size="10" fill="#68706f" font-family="sans-serif">Support network</text>
            </svg>"""
GENO_PANEL = f"""<div class="fv relative flex min-h-[340px] w-full items-center justify-center overflow-hidden rounded px-5 py-8 sm:p-8 md:min-h-[400px] lg:p-10" style="background:{_mx("#91278c", 8)}">
              <div class="w-full max-w-md space-y-3 text-left">
                <div data-in="1" class="{_C} p-4"><p class="text-sm font-medium text-heading">M. Turner &middot; family context</p>{_GENO_SVG}</div>
                <div data-in="2" class="{_C} flex items-center justify-between p-3 text-sm"><span class="text-body">Emergency contact</span><span class="font-medium text-heading">Daughter &middot; S. Turner</span></div>
              </div>
            </div>"""

PRODUCTS3 = [
    # name, tagline, colour logo, white logo, graphic panel, band gradient, accent, pairing (job, result-title, result-sub, status labels)
    dict(name="SognosRoster", tag="Workforce scheduling &amp; optimisation engine", logo="sognos-roster-logo-color.svg", wlogo="sognos-roster-logo.svg",
         panel=R_SCHED, band="linear-gradient(120deg, #03112f, #104b90, #1d96fc, #104b90, #03112f)", acc="#59bbf7",
         job=("Job #4821 &middot; HVAC service", "Level 3, North Sydney &middot; needs HVAC ticket"), res=(_avatar("PS", "size-10"), "P. Shah &middot; 4.2 km", "HVAC ticket &middot; available 11:00"),
         steps=("Job created", "Sent to SognosRoster", "Matching skills + distance&hellip;", "Worker assigned &#10003;")),
    dict(name="SognosCare", tag="Care operations &amp; compliance platform", logo="sognos-care-logo-color.svg", wlogo="sognos-care-logo.svg",
         panel=ns["FV_CASE"].replace('style="background:#f4f8f9"', f'style="background:{_mx("#3b6fe0", 8)}"', 1), band="linear-gradient(120deg, #0f1936, #203e71, #3b6fe0, #203e71, #0f1936)", acc="#8ea8f0",
         job=("Visit #2207 &middot; Personal care", "M. Turner &middot; checked out 10:02"), res=('<span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-care-dark text-xs font-medium text-white">MT</span>', "Care record &middot; M. Turner", "Progress note + service logged"),
         steps=("Visit completed", "Sent to SognosCare", "Checking funding rules&hellip;", "Care record updated &#10003;")),
    dict(name="SognosGenogram", tag="Relationship &amp; family context platform", logo="sognos-genogram-logo-color.svg", wlogo="SognosGenogram-logo.svg",
         panel=GENO_PANEL, band="linear-gradient(120deg, #1a0224, #4a1670, #91278c, #4a1670, #1a0224)", acc="#d9a6d6",
         job=("Site visit &middot; family home", "M. Turner &middot; new contact recorded"), res=('<span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#91278c] text-xs font-medium text-white">ST</span>', "Support network &middot; M. Turner", "2 family contacts linked"),
         steps=("Contact recorded", "Sent to SognosGenogram", "Mapping relationships&hellip;", "Network updated &#10003;")),
]


def _rlink(p):
    return f'<a href="#" class="inline-flex min-h-11 items-center gap-1.5 text-base font-medium text-heading transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">Explore {p["name"]} <span aria-hidden="true">&rarr;</span></a>'


def _works(body):
    return f"""<section id="works-with" class="bg-white {SECTION}">
  <div class="mx-auto max-w-7xl px-6">
    <div class="{RAIL}">
      <div class="lg:col-span-2">{label("Works with")}</div>
      <div class="{CONTENT}">
        <div class="{HEAD}">{_WHEAD}</div>
        {body}
      </div>
    </div>
  </div>
</section>"""


WORKS_A = _works(f"""<div data-works-list class="{GAP} space-y-3 lg:space-y-4">
          {"".join(f'''<div data-prod-i="{i}" class="grid grid-cols-1 items-stretch gap-3 rounded-lg bg-tint p-3 md:grid-cols-2 lg:gap-4">
            <div class="flex flex-col justify-between gap-10 p-5 lg:p-8">
              <img src="{P}/logos/{p["logo"]}" alt="{p["name"]}" class="h-8 w-auto self-start" />
              <div><p class="{T["h3"]} text-heading">{p["tag"]}</p><div class="mt-6">{_rlink(p)}</div></div>
            </div>
            {p["panel"]}
          </div>''' for i, p in enumerate(PRODUCTS3))}
        </div>""")

WORKS_B = _works(f"""<div data-works-list class="{GAP} space-y-3 lg:space-y-4">
          {"".join(f'''<div data-prod-i="{i}" data-pair="0" class="rounded-lg bg-tint p-5 sm:p-8">
            <div class="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_minmax(8rem,1fr)_1fr]">
              <div class="{_C} p-4 text-left">
                <p class="text-[10px] uppercase tracking-widest text-muted">Frontline</p>
                <p class="mt-1 text-sm font-medium text-heading">{p["job"][0]}</p>
                <p class="text-xs text-muted">{p["job"][1]}</p>
              </div>
              <div class="relative mx-auto h-3 w-full max-w-xs">
                <span class="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-accent/40"></span>
                <span class="pair-dot absolute top-0 size-3 rounded-full bg-care-dark"></span>
                <p class="absolute inset-x-0 top-5 text-center text-xs text-muted">{"".join(f'<span data-ps="{k}">{t}</span>' for k, t in enumerate(p["steps"]))}</p>
              </div>
              <div class="pair-worker {_C} flex items-center gap-3 p-4 text-left transition-colors">
                {p["res"][0]}
                <div class="min-w-0 flex-1"><p class="text-[10px] uppercase tracking-widest text-muted">{p["name"]}</p><p class="mt-1 text-sm font-medium text-heading">{p["res"][1]}</p><p class="text-xs text-muted">{p["res"][2]}</p></div>
                <span class="pair-tick flex size-6 items-center justify-center rounded-full bg-emerald-600 text-[11px] text-white opacity-0 transition-opacity">&#10003;</span>
              </div>
            </div>
            <div class="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5"><span class="flex items-center gap-4"><img src="{P}/logos/{p["logo"]}" alt="{p["name"]}" class="h-6 w-auto" /><span class="hidden {T["small"]} text-muted sm:inline">{p["tag"]}</span></span>{_rlink(p)}</div>
          </div>''' for i, p in enumerate(PRODUCTS3))}
        </div>""")

WORKS_C = _works(f"""<div data-works-list class="works-c-grid {GAP} grid grid-cols-1 gap-3 lg:gap-4">
          {"".join(f'''<a href="#" data-prod-i="{i}" class="group relative block overflow-hidden rounded-lg p-8 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:p-10">
            <span aria-hidden="true" class="m-drift absolute inset-0" style="background-image: {p["band"]}"></span>
            <span aria-hidden="true" class="works-c-slots absolute inset-y-6 right-6 hidden w-[42%] grid-cols-5 grid-rows-4 gap-1.5">{"".join(f'<span class="flx-slot rounded-sm bg-white" style="animation-delay:{(k * 37 % 23) / 10:.1f}s"></span>' for k in range(20))}</span>
            <span class="relative flex max-w-md flex-col gap-6">
              <img src="{P}/logos/{p["wlogo"]}" alt="{p["name"]}" class="h-8 w-auto self-start brightness-0 invert" />
              <span class="{T["h3"]} text-white">{p["tag"]}</span>
              <span class="inline-flex min-h-11 items-center gap-1.5 self-start rounded-full bg-white px-6 text-base font-medium text-heading transition-colors group-hover:bg-accent group-hover:text-white">Explore {p["name"]} <span aria-hidden="true">&rarr;</span></span>
            </span>
          </a>''' for i, p in enumerate(PRODUCTS3))}
        </div>""")

# Product-count control (Works with only). Hides items past the count; the
# band layout goes to 2 / 3 columns and drops its slot grid when shared.
WORKS_COUNT_CSS = """<style>
  [data-works-count="1"] [data-prod-i="1"], [data-works-count="1"] [data-prod-i="2"], [data-works-count="2"] [data-prod-i="2"] { display: none; }
  @media (min-width: 768px) {
    [data-works-count="1"] .works-c-slots { display: grid; }
    [data-works-count="2"] .works-c-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    [data-works-count="3"] .works-c-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    [data-works-count="3"] .works-c-grid .flex-col { gap: 1.25rem; }
  }
</style>"""

WORKS_COUNT_BAR = """<span class="mx-2 hidden h-5 w-px bg-line sm:block"></span><p class="mr-1 text-sm font-medium text-heading">Products</p>""" + "".join(
    f'<button type="button" data-works-n="{n}" aria-pressed="{str(n == 1).lower()}" class="rounded-full border border-line px-3 py-1.5 text-xs text-heading aria-pressed:border-heading aria-pressed:bg-heading aria-pressed:text-white">{n}</button>'
    for n in (1, 2, 3)
)

WORKS_COUNT_JS = """<script>
  (() => {
    const root = document.querySelector("[data-works-root]"); if (!root) return;
    const set = (n) => {
      root.dataset.worksCount = n;
      document.querySelectorAll("[data-works-n]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.worksN === n)));
      try { localStorage.setItem("sognos-frontline-works-n", n); } catch {}
    };
    document.querySelectorAll("[data-works-n]").forEach((b) => b.addEventListener("click", () => set(b.dataset.worksN)));
    let n = "1"; try { n = localStorage.getItem("sognos-frontline-works-n") || "1"; } catch {}
    set(n);
  })();
</script>"""

