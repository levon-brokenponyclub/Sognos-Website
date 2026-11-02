
# ── 01m-hero-a: three polished options (after helloaria.eu + /saas) ────────
# Aria's top-left "LoadableComponent" is a Rive canvas: a block of slanted
# bars, solid at the bottom-right and dissolving into thin slashes toward the
# top-left, coloured on a lilac → mint diagonal, with the dissolve edge
# rippling. STRIPES reproduces it on <canvas> (2D, DPR-aware): a 9 x 12 grid
# of right-leaning parallelograms whose fill width follows a diagonal ramp plus
# a travelling sine wave; bars build in from the bottom-right on load. Pauses
# off-screen; reduced motion draws one static frame. Colours per option.

STRIPES_JS = """<script>
  (() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelectorAll("canvas[data-stripes]").forEach((cv) => {
      const ctx = cv.getContext("2d");
      const stops = cv.dataset.stripes.split(",");
      const flip = cv.dataset.flip === "true";
      const COLS = 9, ROWS = 12, LEAN = 0.55;
      let W = 0, H = 0, t0 = 0, raf = 0, visible = true;
      const size = () => {
        const r = cv.getBoundingClientRect(), d = devicePixelRatio || 1;
        W = r.width; H = r.height; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
      };
      const ease = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
      const draw = (t) => {
        ctx.clearRect(0, 0, W, H);
        const g = ctx.createLinearGradient(0, 0, W, H);
        stops.forEach((c, i) => g.addColorStop(i / (stops.length - 1), c));
        ctx.fillStyle = g;
        const cw = W / COLS, ch = H / ROWS, gap = Math.max(1.5, ch * 0.18), skew = ch * LEAN;
        const intro = reduce ? 1 : ease(t / 1600);
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            const u = flip ? 1 - c / (COLS - 1) : c / (COLS - 1), v = flip ? 1 - r / (ROWS - 1) : r / (ROWS - 1);
            const ramp = (u * 0.62 + v * 0.62) - 0.28 + 1.3 * (1 - intro) * -1;
            const wave = reduce ? 0 : 0.16 * Math.sin(t / 900 - u * 5.5 - v * 4.2);
            const f = Math.min(1, Math.max(0, ramp + wave));
            if (f < 0.04) continue;
            const w = cw * f, x = c * cw + (cw - w), y = r * ch;
            ctx.beginPath();
            ctx.moveTo(x + skew, y); ctx.lineTo(x + w + skew, y);
            ctx.lineTo(x + w, y + ch - gap); ctx.lineTo(x, y + ch - gap);
            ctx.closePath(); ctx.fill();
          }
        }
      };
      const loop = (now) => { t0 ||= now; draw(now - t0); if (!reduce && visible) raf = requestAnimationFrame(loop); };
      size(); addEventListener("resize", () => { size(); if (reduce) draw(0); });
      if (reduce) { draw(0); return; }
      new IntersectionObserver(([e]) => {
        visible = e.isIntersecting; cancelAnimationFrame(raf); if (visible) raf = requestAnimationFrame(loop);
      }).observe(cv);
    });
  })();
</script>"""

# Option palettes for the stripe block (top-left → bottom-right).
STRIPE_CARE = "#c4b5fd,#59bbf7,#3b6fe0"   # lilac → Roster sky → Care base
STRIPE_MINT = "#a5b4fc,#59bbf7,#7ee8c4"   # closest to Aria (lilac → sky → mint)
STRIPE_DEEP = "#59bbf7,#3b6fe0,#203e71"   # all Care blues


def stripes(colors, pos="left-0 top-0 sm:left-[2%]", width="w-[34%] sm:w-[26.25%]", flip=False, speed="-0.6"):
    return f"""<div aria-hidden="true" data-speed="{speed}" class="absolute {pos} z-0 aspect-[336/290] {width}">
        <div class="m-rise size-full" style="animation-delay:.1s"><canvas data-stripes="{colors}"{' data-flip="true"' if flip else ''} class="block size-full"></canvas></div>
      </div>"""


def opt_photo(top="top-[9%]"):
    return f"""<div class="absolute inset-x-0 {top} z-10 flex justify-center">
        <div class="m-rise aspect-[1062/672] w-full max-w-[78%] overflow-hidden rounded-lg bg-white/5" style="animation-delay:.2s">
          <img src="{P}/product/sognos-care-hero-img.png" alt="An older couple sharing a laugh at home" class="size-full object-cover" />
        </div>
      </div>"""


# Option 1 card: Aria invoice-card anatomy (title, ruled rows, dark pill CTA)
# — the pill runs a sign-off loop: idle → signing (fill sweeps) → signed ✓.
SIGN_CARD = """<div data-speed="0.5" class="absolute right-0 top-[2%] z-20 hidden w-[300px] sm:block lg:w-[22.75%] lg:min-w-[300px]">
        <div class="m-rise" style="animation-delay:.5s"><div class="m-float rounded-lg border border-line bg-white p-5 text-left">
          <div class="flex items-center justify-between">
            <p class="font-heading text-lg text-heading">Visit</p>
            <span class="flex items-center gap-1.5 text-xs text-muted"><span class="relative flex size-2"><span class="m-pulse absolute inset-0 rounded-full bg-emerald-500"></span><span class="relative size-2 rounded-full bg-emerald-500"></span></span>Live</span>
          </div>
          <dl class="mt-3 divide-y divide-line text-sm">
            <div class="flex justify-between py-3"><dt class="text-muted">Service</dt><dd class="text-heading">Personal care</dd></div>
            <div class="flex justify-between py-3"><dt class="text-muted">Checked in</dt><dd class="text-heading">9:02 am &middot; GPS</dd></div>
            <div class="flex justify-between py-3"><dt class="text-muted">Funding</dt><dd class="font-medium text-heading">Support at Home L3</dd></div>
          </dl>
          <p data-sign class="relative mt-3 flex h-12 items-center justify-center overflow-hidden rounded-full bg-care-dark text-sm font-medium text-white">
            <span data-sign-fill class="absolute inset-y-0 left-0 w-0 bg-accent/40"></span>
            <span data-sign-label class="relative">Sign progress note</span>
          </p>
        </div></div>
      </div>"""

COPILOT_CARD_2 = COPILOT_CARD.replace('w-[300px] sm:w-[340px] lg:w-[380px]', 'w-[300px] sm:w-[340px] lg:w-[29.7%] lg:min-w-[360px]').replace("bottom-[5%] left-0", "bottom-[2%] left-0")

# Option 2: Aria /saas + invoice-financing flow — centre product tile, four
# nodes on dotted connectors with diamond ends; a highlight walks the nodes
# and the connector dash flows toward the active node.
FLOW_NODES = [
    # (id, icon path, title, sub, position classes, connector path in 1000x560 space)
    ("intake", "M4 4h16v16H4z M8 9h8 M8 13h5", "Referral received", "Intake &middot; M. Turner", "left-[1%] top-[10%]", "M330 115 H420 V230 H470"),
    ("roster", "M4 6h16 M4 12h16 M4 18h10", "Worker matched", "SognosRoster &middot; P. Shah", "right-[1%] top-[10%]", "M670 115 H580 V230 H530"),
    ("funding", "M3 7h18v10H3z M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0", "Claim submitted", "Support at Home &middot; $184.20", "left-[6%] bottom-[8%]", "M350 455 H420 V330 H470"),
    ("family", "M8 8m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M16 8m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M3 20c0-3 3-5 5-5s5 2 5 5 M11 20c0-3 3-5 5-5s5 2 5 5", "Family notified", "SognosGenogram &middot; 2 contacts", "right-[6%] bottom-[8%]", "M650 455 H580 V330 H530"),
]


def flow_node(i, nid, icon, title, sub, pos):
    return f"""<div data-node="{i}" class="group/n absolute {pos} z-20 w-[44%] sm:w-[31%]">
          <div class="m-rise" style="animation-delay:{.4 + i * .12:.2f}s"><div class="rounded-lg border border-line bg-white text-left transition-colors duration-500 group-data-[on=true]/n:border-accent">
            <div class="flex items-center gap-3 p-3 sm:p-4">
              <span class="flex size-9 shrink-0 items-center justify-center rounded bg-care-dark sm:size-11"><svg viewBox="0 0 24 24" class="size-5 text-accent" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{icon}"/></svg></span>
              <p class="text-sm text-heading sm:text-base">{title}</p>
              <span class="ml-auto hidden size-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white group-data-[on=true]/n:flex">&#10003;</span>
            </div>
            <p class="hidden border-t border-line px-4 py-2.5 text-xs text-muted sm:block">{sub}</p>
          </div></div>
        </div>"""


FLOW_STAGE = f"""<div class="absolute inset-0 rounded-lg" style="background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02))"></div>
      <svg aria-hidden="true" viewBox="0 0 1000 560" preserveAspectRatio="none" class="absolute inset-0 z-10 size-full" fill="none">
        {"".join(f'<path data-wire="{i}" d="{n[5]}" stroke="rgba(255,255,255,.35)" stroke-width="1.5" stroke-dasharray="3 5" vector-effect="non-scaling-stroke" class="transition-[stroke] duration-500"/>' for i, n in enumerate(FLOW_NODES))}
      </svg>
      <div class="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div class="m-rise" style="animation-delay:.25s"><div class="rounded-2xl p-[2px]" style="background: linear-gradient(135deg, #c4b5fd, #59bbf7, #7ee8c4)"><div class="rounded-[14px] bg-care-dark p-2.5">
          <div class="m-drift flex size-24 items-center justify-center rounded-xl sm:size-32" style="background-image: linear-gradient(135deg, #59bbf7, #3b6fe0, #a5b4fc, #59bbf7)">
            <img src="{P}/logos/icon-sognos-care.svg" alt="" class="size-12 brightness-0 invert sm:size-16" />
          </div>
        </div></div></div>
      </div>
      {"".join(flow_node(i, *n[:5]) for i, n in enumerate(FLOW_NODES))}"""

FLOW_JS = """<script>
  (() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = [...document.querySelectorAll("[data-node]")], wires = [...document.querySelectorAll("[data-wire]")];
    if (!nodes.length) return;
    const set = (k) => nodes.forEach((n, i) => {
      n.dataset.on = String(i <= k);
      wires[i].setAttribute("stroke", i === k ? "#59bbf7" : i < k ? "rgba(89,187,247,.6)" : "rgba(255,255,255,.35)");
      wires[i].classList.toggle("flow", i === k);
    });
    if (reduce) { set(nodes.length - 1); return; }
    let k = -1; setInterval(() => { k = (k + 1) % (nodes.length + 1); set(k === nodes.length ? -1 : k); }, 1500);
  })();
</script>"""

# Option 3: budget card (count-up + bar) top-right, notification stack
# bottom-left (newest slides in, stack compresses), stripes in two corners.
BUDGET_CARD = """<div data-speed="0.5" class="absolute right-0 top-[3%] z-20 hidden w-[300px] sm:block lg:w-[24%] lg:min-w-[300px]">
        <div class="m-rise" style="animation-delay:.5s"><div class="m-float rounded-lg border border-line bg-white p-5 text-left">
          <p class="font-heading text-lg text-heading">Support at Home</p>
          <p class="text-xs text-muted">M. Turner &middot; Level 3 &middot; this quarter</p>
          <p class="mt-4 font-heading text-3xl tabular-nums text-heading">$<span data-count="8412">0</span><span class="text-base text-muted"> / $12,000</span></p>
          <div class="mt-3 h-2 overflow-hidden rounded-full bg-tint"><span data-bar class="block h-full w-0 rounded-full bg-accent transition-[width] duration-[1600ms] ease-out" style="--to:70%"></span></div>
          <dl class="mt-4 divide-y divide-line text-sm">
            <div class="flex justify-between py-2.5"><dt class="text-muted">Visits delivered</dt><dd class="text-heading">46</dd></div>
            <div class="flex justify-between py-2.5"><dt class="text-muted">Claims</dt><dd class="font-medium text-emerald-700">&#10003; All lodged</dd></div>
          </dl>
        </div></div>
      </div>"""

TOASTS = [["Visit completed", "Personal care &middot; R. Okafor", "bg-emerald-500"], ["Claim lodged", "Support at Home &middot; $184.20", "bg-accent"], ["Progress note signed", "Copilot draft approved", "bg-[#a5b4fc]"], ["Incident closed", "Coordinator review &middot; 10:40", "bg-[#ffad6e]"]]
TOAST_STACK = f"""<div data-speed="0.9" class="absolute bottom-[3%] left-0 z-20 w-[290px] sm:w-[340px]">
        <div class="m-rise" style="animation-delay:.7s"><ul id="toast-stack" data-pool='{_json.dumps(TOASTS)}' class="relative h-[168px]">
          {"".join(f'<li class="toast absolute inset-x-0 flex items-center gap-3 rounded-lg border border-line bg-white p-3.5 text-left transition-all duration-700" style="bottom:{k * 14}px;transform:scale({1 - k * .05});opacity:{1 - k * .3};z-index:{3 - k}"><span class="size-2.5 shrink-0 rounded-full {c}"></span><div class="min-w-0"><p class="text-sm font-medium text-heading">{a}</p><p class="truncate text-xs text-muted">{b}</p></div><span class="ml-auto text-xs text-muted">now</span></li>' for k, (a, b, c) in enumerate(TOASTS[:3]))}
        </ul></div>
      </div>"""

OPT3_JS = """<script>
  (() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const card = document.querySelector("[data-count]"), bar = document.querySelector("[data-bar]");
    if (card) {
      const to = +card.dataset.count;
      if (reduce) { card.textContent = to.toLocaleString(); bar.style.width = bar.style.getPropertyValue("--to"); }
      else setTimeout(() => {
        bar.style.width = bar.style.getPropertyValue("--to"); let t0;
        const step = (t) => { t0 ??= t; const p = Math.min(1, (t - t0) / 1600); card.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString(); if (p < 1) requestAnimationFrame(step); };
        requestAnimationFrame(step);
      }, 900);
    }
    const stack = document.getElementById("toast-stack");
    if (stack && !reduce) {
      const pool = JSON.parse(stack.dataset.pool); let n = 3;
      const lay = () => [...stack.children].forEach((li, k) => { li.style.bottom = k * 14 + "px"; li.style.transform = `scale(${1 - k * .05})`; li.style.opacity = k > 2 ? 0 : 1 - k * .3; li.style.zIndex = 3 - k; });
      setInterval(() => {
        const [a, b, c] = pool[n++ % pool.length];
        const li = stack.firstElementChild.cloneNode(true);
        li.querySelector("span").className = "size-2.5 shrink-0 rounded-full " + c;
        li.querySelector("p").innerHTML = a; li.querySelectorAll("p")[1].innerHTML = b;
        li.style.transform = "translateY(24px) scale(1)"; li.style.opacity = 0;
        stack.prepend(li); requestAnimationFrame(() => requestAnimationFrame(lay));
        setTimeout(() => { if (stack.children.length > 4) stack.lastElementChild.remove(); }, 800);
      }, 2600);
    }
    // Option 1 sign-off pill: idle → signing sweep → signed.
    const pill = document.querySelector("[data-sign]");
    if (pill) {
      const fill = pill.querySelector("[data-sign-fill]"), lab = pill.querySelector("[data-sign-label]");
      const done = () => { fill.style.transition = "none"; fill.style.width = "100%"; pill.classList.add("bg-emerald-600"); lab.innerHTML = "Progress note signed &#10003;"; };
      if (reduce) { done(); return; }
      const run = () => {
        pill.classList.remove("bg-emerald-600"); lab.textContent = "Signing…"; fill.style.transition = "none"; fill.style.width = "0";
        requestAnimationFrame(() => { fill.style.transition = "width 1.4s cubic-bezier(.22,1,.36,1)"; fill.style.width = "100%"; });
        setTimeout(done, 1500); setTimeout(() => { lab.textContent = "Sign progress note"; fill.style.transition = "none"; fill.style.width = "0"; pill.classList.remove("bg-emerald-600"); }, 4200);
      };
      setTimeout(run, 1200); setInterval(run, 5200);
    }
  })();
</script>"""

# Hero copy per option. Option 1 = live copy. 2 and 3 are copy SUGGESTIONS
# (need approval before they ship).
HERO_OPTS = {
    "1": dict(
        name="Visit verified", note="Live copy. Photo + Aria-style Visit card (sign-off pill loop) + typing Copilot note; stripe block lilac → sky → Care.",
        h1='<span class="block">One platform.</span><span class="block">From intake to outcome.</span>', sub=SUB,
        stage=lambda: stripes(STRIPE_CARE) + "\n      " + opt_photo() + "\n      " + SIGN_CARD + "\n      " + COPILOT_CARD_2,
        aspect="aspect-[1280/1284] sm:aspect-[1280/760]"),
    "2": dict(
        name="Care network", note="Copy suggestion. Aria /saas flow: SognosCare tile centre, four connected outcomes light up in turn (dash flows to the active node); stripe block lilac → sky → mint (closest to Aria).",
        h1='<span class="block">Every service,</span><span class="block">connected.</span>',
        sub="Referrals, rostering, funding and families meet in one SognosCare record on Dynamics 365 - so coordinators see the whole picture and act on it.",
        stage=lambda: stripes(STRIPE_MINT, pos="left-0 -top-[4%]", width="w-[30%] sm:w-[22%]") + "\n      " + FLOW_STAGE,
        aspect="aspect-[1000/900] sm:aspect-[1000/560]"),
    "3": dict(
        name="Day in motion", note="Copy suggestion. Photo + Support at Home budget card (count-up + bar) + notification stack that cycles; stripe blocks top-left and mirrored bottom-right, all Care blues.",
        h1='<span class="block">Care delivered.</span><span class="block">Compliance proven.</span>',
        sub="Every visit, note and claim is captured as it happens - so your funding reporting is ready before anyone asks for it.",
        stage=lambda: stripes(STRIPE_DEEP) + "\n      " + stripes(STRIPE_DEEP, pos="bottom-[6%] right-0 sm:right-[2%]", width="w-[24%] sm:w-[16%]", flip=True, speed="0.4") + "\n      " + opt_photo() + "\n      " + BUDGET_CARD + "\n      " + TOAST_STACK,
        aspect="aspect-[1280/1284] sm:aspect-[1280/760]"),
}


def hero_option(key):
    o = HERO_OPTS[key]
    base = hero_a()
    start = base.index('    <div class="mx-auto max-w-[1112px]">')
    end = base.index("    <div>\n      <ul aria-label=\"Trusted by\"")
    stage = f"""    <div class="hero-stage relative mx-auto w-full max-w-[1280px] {o["aspect"]}">
      {o["stage"]()}
    </div>

"""
    h1_old = '<span class="block">One platform.</span><span class="block">From intake to outcome.</span>'
    html = (base[:start] + stage + base[end:]).replace(h1_old, o["h1"]).replace(SUB, o["sub"])
    return f'<div data-hero-opt="{key}"{" hidden" if key != "1" else ""}>{html}</div>'


OPT_SWITCH = """<div class="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-care-dark/90 p-1 text-xs text-white backdrop-blur">
  """ + "".join(f'<button type="button" data-opt-pick="{k}" aria-pressed="{str(k == "1").lower()}" class="rounded-full px-3.5 py-2 transition-colors hover:bg-white/10 aria-pressed:bg-white aria-pressed:text-care-dark">{k} &middot; {o["name"]}</button>' for k, o in HERO_OPTS.items()) + """
</div>
<script>
  (() => {
    const pick = (k) => {
      document.querySelectorAll("[data-hero-opt]").forEach((el) => (el.hidden = el.dataset.heroOpt !== k));
      document.querySelectorAll("[data-opt-pick]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.optPick === k)));
      dispatchEvent(new Event("resize")); try { localStorage.setItem("care-hero-opt", k); } catch {}
    };
    document.querySelectorAll("[data-opt-pick]").forEach((b) => b.addEventListener("click", () => pick(b.dataset.optPick)));
    let s = null; try { s = localStorage.getItem("care-hero-opt"); } catch {}
    if (s) pick(s);
  })();
</script>"""

HERO_OPTS_NOTE = "\n".join(f"OPTION {k} · {o['name']}: {o['note']}" for k, o in HERO_OPTS.items()) + """
Stripe block = Aria's top-left Rive canvas rebuilt on <canvas>: 9x12 slanted bars, diagonal ramp + travelling wave, builds in from the bottom-right; pauses off-screen; static under reduced motion.
Switcher (bottom centre) is review-only. Card data is illustrative demo content - not real clients.
Maps to: sognoscare/Hero.tsx (stripe block -> small client <canvas> component; cards -> Framer Motion as 01m)."""
