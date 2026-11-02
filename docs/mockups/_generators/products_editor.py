"""Colour editor for docs/mockups/products.

Targets (per product): Header, Sub-nav, every page section, every footer row.
Each role takes a solid colour or a custom gradient (two colours + angle);
gradients on text roles render as gradient text, on borders fall back to the
first colour. Overrides win over tones/palettes (":root body" prefix), save in
the browser, copy to all products, reset, Export (JSON + CSS).
"""
import json

SECTIONS = [("header", "Header"), ("subnav", "Sub-nav"), ("hero", "Hero"), ("problem", "Problem"), ("features", "Features"), ("extra", "Editions / Why"), ("adv", "Advantages"), ("close", "Stories / CTA"),
            ("f-cta", "Footer · CTA band"), ("f-menu", "Footer · Menu"), ("f-accred", "Footer · Accreditations"), ("f-ack", "Footer · Acknowledgement"), ("f-legal", "Footer · Legals"), ("f-graphic", "Footer · Graphic")]

CARDS = ':is(article, figure, ul.rounded-lg, div.rounded-lg.border, div.rounded-lg.bg-white, div.rounded-lg.bg-tint, a.rounded-lg):not(.fv, .fv *, [data-keep], [data-keep] *)'
OUTSIDE = ":not(.fv *, [data-keep] *, article *, figure *, ul.rounded-lg *, div.rounded-lg.border *, div.rounded-lg.bg-white *, div.rounded-lg.bg-tint *, a.rounded-lg *)"
ROLES = [
    ("sec_bg", "Background", "{S} section:not(section section), {S}:is(section) {{ background: {v} !important; }}"),
    ("heading", "Headings", "{S} :is(h1, h2, h3, .text-heading)" + OUTSIDE + " {{ color: {v} !important; }}"),
    ("body", "Body text", "{S} :is(p, li, .text-body)" + OUTSIDE.replace(":not(", ":not(button, ") + " {{ color: {v} !important; }}"),
    ("muted", "Muted / labels", "{S} :is(.text-muted, [class*='text-white/6']):not(.fv *) {{ color: {v} !important; }}"),
    ("links", "Links", "{S} a:not(.rounded-full, .rounded-lg, .rounded, .fv *) {{ color: {v} !important; }}"),
    ("mark", "Eyebrow marker", "{S} span[class*='size-[0.66em]'] {{ background: {v} !important; }}"),
    ("lines", "Hairlines", "{S} :is(.border-line, .divide-line > *, [class*='border-white/'], [class*='divide-white/'] > *):not(.fv *) {{ border-color: {v} !important; }}"),
    ("card_bg", "Card background", "{S} " + CARDS + " {{ background: {v} !important; }}"),
    ("card_border", "Card border", "{S} " + CARDS + " {{ border: 1px solid {v} !important; }}"),
    ("card_h", "Card headings", "{S} " + CARDS + " :is(h3, h4, .font-heading):not(.fv *) {{ color: {v} !important; }}"),
    ("card_body", "Card text", "{S} " + CARDS + " :is(p, li, blockquote, figcaption, span):not(.fv *) {{ color: {v} !important; }}"),
    ("panel_bg", "Graphic panel background", "{S} .fv {{ background: {v} !important; }}"),
    ("panel_card", "Graphic cards", "{S} .fv :is(.bg-white, [class*='bg-white/']) {{ background: {v} !important; }}"),
    ("panel_accent", "Graphic accent", "{S} .fv {{ --color-accent: {v}; --p-base: {v}; }}"),
    ("btn_bg", "Button background", "{S} :is(button, a.rounded-full[class*='bg-']):not(.fv *) {{ background: {v} !important; }}"),
    ("btn_fg", "Button text", "{S} :is(button, a.rounded-full[class*='bg-']):not(.fv *) {{ color: {v} !important; }}"),
    ("tile_bg", "Logo tiles", "{S} [aria-label='Accreditations and memberships'] span[class*='rounded'] {{ background: {v} !important; }}"),
]
SUBNAV_ROLES = [
    ("sn_bg", "Background", "{S} {{ --sn-bg: {v} !important; }}"),
    ("sn_muted", "Link text", "{S} {{ --sn-muted: {v} !important; }}"),
    ("sn_fg", "Active / hover text", "{S} {{ --sn-fg: {v} !important; }}"),
    ("sn_mark", "Active underline", "{S} {{ --sn-mark: {v} !important; }}"),
    ("sn_border", "Border", "{S} {{ --sn-border: {v} !important; }}"),
    ("sn_cta_bg", "Button background", "{S} {{ --sn-cta-bg: {v} !important; }}"),
    ("sn_cta_fg", "Button text", "{S} {{ --sn-cta-fg: {v} !important; }}"),
]
HEADER_ROLES = [
    ("hd_start_bg", "Start · background", '{S}[data-scrolled="false"] {{ --hd-bg: {v} !important; }}'),
    ("hd_start_fg", "Start · text", '{S}[data-scrolled="false"] {{ --hd-fg: {v} !important; }}'),
    ("hd_scroll_bg", "Scrolled · background", '{S}[data-scrolled="true"] {{ --hd-bg: {v} !important; }}'),
    ("hd_scroll_fg", "Scrolled · text", '{S}[data-scrolled="true"] {{ --hd-fg: {v} !important; }}'),
    ("hd_border", "Border", "{S} {{ --hd-border: {v} !important; }}"),
    ("hd_pill", "Nav pill background", "{S} {{ --hd-pill: {v} !important; }}"),
    ("hd_hbg", "Nav hover background", "{S} {{ --hd-hbg: {v} !important; }}"),
    ("hd_hfg", "Nav hover text", "{S} {{ --hd-hfg: {v} !important; }}"),
    ("hd_cta", "Button background", "{S} {{ --hd-cta: {v} !important; }}"),
    ("hd_ctafg", "Button text", "{S} {{ --hd-ctafg: {v} !important; }}"),
]
PRODS = [("care", "SognosCare"), ("roster", "SognosRoster"), ("genogram", "SognosGenogram"), ("digpacks", "DigPacks")]

SEL = "w-full rounded border border-line bg-white px-2 py-1.5 text-xs text-heading"
BTN = "rounded-full border border-line px-2.5 py-1 text-xs text-heading hover:border-heading"

EDITOR_HTML = ""  # editor UI is mounted inline by the Inspector (products_inspector.py)

EDITOR_JS = """<script>
  (() => {
    const ROLES = __ROLES__, SUBNAV = __SUBNAV__, HEADER = __HEADER__;
    const KEY = "sognos-products-custom";
    const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; } };
    const write = (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} };
    let state = read();
    const styleEl = document.createElement("style"); styleEl.id = "custom-colours"; document.body.appendChild(styleEl);
    const scope = (p, s) => {
      if (s === "header") return `:root body #ph-header[data-product="${p}"]`;
      if (s === "subnav") return `:root body [data-pp="${p}"] [data-subnav], :root body #ph-header[data-product="${p}"] [data-hdbar]`;
      if (s.startsWith("f-")) return `:root body [data-pfooter][data-product="${p}"] [data-fr="${s.slice(2)}"] > [data-frv]`;
      return `:root body [data-pp="${p}"] [data-s="${s}"]`;
    };
    const rolesFor = (s) => (s === "subnav" ? SUBNAV : s === "header" ? HEADER : ROLES);
    const isGrad = (v) => typeof v === "string" && /^(linear|radial)-gradient/.test(v);
    const first = (v) => (isGrad(v) ? (v.match(/#[0-9a-f]{6}/i) || ["#000000"])[0] : v);
    const ruleFor = (tpl, sc, v) => {
      let out = sc.split(", ").map((one) => tpl.replaceAll("{S}", one)).join("\\n").replaceAll("{{", "{").replaceAll("}}", "}");
      if (isGrad(v) && /[^-]color: \\{v\\}/.test(" " + tpl) && !/background/.test(tpl)) out = out.replaceAll("color: {v} !important;", `background: ${v} !important; -webkit-background-clip: text !important; background-clip: text !important; color: transparent !important;`);
      if (isGrad(v) && /(border|--sn-fg|--sn-muted|--sn-mark|--hd-fg|--hd-hfg|--hd-ctafg|--sn-cta-fg|--hd-border|--sn-border)/.test(tpl)) out = out.replaceAll("{v}", first(v));
      return out.replaceAll("{v}", v);
    };
    const css = () => Object.entries(state).flatMap(([p, secs]) => Object.entries(secs).flatMap(([s, roles]) => Object.entries(roles).map(([r, v]) => { const def = rolesFor(s).find((x) => x[0] === r); return def ? ruleFor(def[2], scope(p, s), v) : ""; }))).join("\\n");
    const apply = () => { styleEl.textContent = css(); write(state); };
    const toHex = (c) => { const m = c && c.match(/\\d+(\\.\\d+)?/g); if (!m || m.length < 3) return "#ffffff"; return "#" + m.slice(0, 3).map((x) => Math.round(+x).toString(16).padStart(2, "0")).join(""); };
    const probe = (p, s, r) => {
      const root = document.querySelector(scope(p, s).split(", ")[0].replace(":root body ", "")); if (!root) return "#ffffff";
      const vis = (s === "subnav" || s === "header" || s.startsWith("f-")) ? ([...document.querySelectorAll(scope(p, s).split(", ")[0].replace(":root body ", ""))].find((el) => getComputedStyle(el).display !== "none") || root) : ([...root.parentElement.querySelectorAll(`[data-s="${s}"]`)].find((el) => getComputedStyle(el).display !== "none") || root);
      const pick = (q, prop) => { const el = vis.querySelector(q); return el ? toHex(getComputedStyle(el)[prop]) : "#ffffff"; };
      if (s === "header" || s === "subnav") return toHex(getComputedStyle(vis).getPropertyValue("--" + r.replace(/^(hd|sn)_/, (m) => m.replace("_", "-")).replaceAll("_", "-")).trim() || "#ffffff");
      return ({ sec_bg: () => toHex(getComputedStyle(vis.querySelector("section") || vis).backgroundColor), heading: () => pick("h1, h2, p.font-heading", "color"), body: () => pick("p", "color"), muted: () => pick(".text-muted", "color"), links: () => pick("a", "color"),
        mark: () => pick("span[class*='size-[0.66em]']", "backgroundColor"), lines: () => pick(".border-line, [class*='border-white/']", "borderTopColor"), card_bg: () => pick("article, figure, a.rounded-lg", "backgroundColor"), card_border: () => pick("article, figure", "borderTopColor"),
        card_h: () => pick("article h3", "color"), card_body: () => pick("article p", "color"), panel_bg: () => pick(".fv", "backgroundColor"), panel_card: () => pick(".fv .bg-white", "backgroundColor"), panel_accent: () => "#1e96fc",
        btn_bg: () => pick("button, a.rounded-full", "backgroundColor"), btn_fg: () => pick("button, a.rounded-full", "color"), tile_bg: () => "#ffffff" }[r] || (() => "#ffffff"))();
    };
    const D = { b: "#1e96fc", deg: 135, x: 20, y: 30, size: 70 };
    const BRAND = [["sognos-navy-darkest", "#060e28"], ["sognos-navy", "#152248"], ["sognos-blue-accent", "#1d96fc"], ["sognos-tint", "#f9fafe"], ["sognos-heading", "#0f1936"], ["white", "#ffffff"]];
    const parse = (v, fallback) => {
      if (typeof v === "string" && v.startsWith("radial-gradient")) { const m = v.match(/radial-gradient\\((\\d+)% (\\d+)% at (\\d+)% (\\d+)%,\\s*(#[0-9a-f]{6}),\\s*(#[0-9a-f]{6})\\)/i); return m ? { ...D, mode: "radial", size: m[1], x: m[3], y: m[4], a: m[5], b: m[6] } : { ...D, mode: "radial", a: fallback }; }
      if (isGrad(v)) { const m = v.match(/linear-gradient\\((\\d+)deg,\\s*(#[0-9a-f]{6}),\\s*(#[0-9a-f]{6})\\)/i); return m ? { ...D, mode: "grad", a: m[2], b: m[3], deg: m[1] } : { ...D, mode: "grad", a: fallback }; }
      return { ...D, mode: "solid", a: v || fallback }; };
    const build = (v) => v.mode === "grad" ? `linear-gradient(${v.deg}deg, ${v.a}, ${v.b})` : v.mode === "radial" ? `radial-gradient(${v.size}% ${v.size}% at ${v.x}% ${v.y}%, ${v.a}, ${v.b})` : v.a;
    const listeners = new Set(); const changed = () => listeners.forEach((fn) => fn());
    const rowsHtml = (p, s) => { const cur = (state[p] || {})[s] || {};
      return rolesFor(s).map(([r, label]) => { const seed = probe(p, s, r), v = parse(cur[r], seed);
        return `<div data-row="${r}" class="space-y-1 rounded border border-line p-2"><div class="flex items-center justify-between gap-2"><span class="text-xs ${cur[r] ? "font-medium text-heading" : "text-body"}">${label}</span>
          <span class="flex items-center gap-1"><select data-mode aria-label="${label} fill type" class="rounded border border-line px-1 py-0.5 text-[11px]">${[["solid", "Solid"], ["grad", "Linear"], ["radial", "Radial"]].map(([k, n]) => `<option value="${k}"${v.mode === k ? " selected" : ""}>${n}</option>`).join("")}</select>
          <button type="button" data-ed-clear="${r}" class="px-1 text-xs text-muted hover:text-heading ${cur[r] ? "" : "invisible"}" aria-label="Clear ${label}">&times;</button></span></div>
          <div class="flex items-center gap-1.5"><input type="color" data-c="a" value="${v.a}" aria-label="${label} colour" class="h-7 w-10 cursor-pointer rounded border border-line">
          <span class="${v.mode !== "solid" ? "flex" : "hidden"} items-center gap-1.5" data-gradui><span class="text-[10px] text-muted">to</span><input type="color" data-c="b" value="${v.b}" aria-label="${label} gradient end" class="h-7 w-10 cursor-pointer rounded border border-line"></span>
          <span data-swatch class="ml-auto h-5 w-12 rounded border border-line" style="background:${build(v)}"></span></div>
          <div class="flex items-center gap-1"><span class="mr-1 text-[10px] text-muted">Brand</span>${BRAND.map(([n, c]) => `<button type="button" data-brand="${c}" title="${n} ${c}" aria-label="${n}" class="size-5 rounded-full border border-line" style="background:${c}"></button>`).join("")}</div>
          <div data-linui class="${v.mode === "grad" ? "flex" : "hidden"} items-center gap-2"><span class="w-10 text-[10px] text-muted">Angle</span><input type="range" data-deg min="0" max="360" step="1" value="${v.deg}" aria-label="${label} angle" class="flex-1"><input type="number" data-deg-n min="0" max="360" value="${v.deg}" aria-label="${label} angle value" class="w-14 rounded border border-line px-1 py-0.5 text-xs"><span class="text-[10px] text-muted">deg</span></div>
          <div data-radui class="${v.mode === "radial" ? "grid" : "hidden"} grid-cols-[2.5rem_1fr_2.5rem] items-center gap-x-2 gap-y-1">${[["x", "X"], ["y", "Y"], ["size", "Size"]].map(([k, n]) => `<span class="text-[10px] text-muted">${n}</span><input type="range" data-r="${k}" min="0" max="${k === "size" ? 150 : 100}" value="${v[k]}" aria-label="${label} ${n}" class="w-full"><span data-rv="${k}" class="text-[10px] tabular-nums text-muted">${v[k]}%</span>`).join("")}</div></div>`; }).join(""); };
    const commit = (box, row, src) => {
      const r = row.dataset.row, p = box.dataset.edP, s = box.dataset.edS, q = (sel) => row.querySelector(sel);
      if (src && src.matches("[data-deg-n]")) q("[data-deg]").value = src.value; if (src && src.matches("[data-deg]")) q("[data-deg-n]").value = src.value;
      const v = { mode: q("[data-mode]").value, a: q('[data-c="a"]').value, b: q('[data-c="b"]').value, deg: q("[data-deg]").value, x: q('[data-r="x"]').value, y: q('[data-r="y"]').value, size: q('[data-r="size"]').value };
      ((state[p] ||= {})[s] ||= {})[r] = build(v); apply();
      q("[data-gradui]").className = (v.mode !== "solid" ? "flex" : "hidden") + " items-center gap-1.5";
      q("[data-linui]").className = (v.mode === "grad" ? "flex" : "hidden") + " items-center gap-2";
      q("[data-radui]").className = (v.mode === "radial" ? "grid" : "hidden") + " grid-cols-[2.5rem_1fr_2.5rem] items-center gap-x-2 gap-y-1";
      row.querySelectorAll("[data-rv]").forEach((el) => (el.textContent = v[el.dataset.rv] + "%"));
      q("[data-swatch]").style.background = state[p][s][r]; q("[data-ed-clear]").classList.remove("invisible"); changed(); };
    // Mount the role rows for (product, area) into a container; re-mount to refresh.
    const mount = (box, p, s) => {
      box.dataset.edP = p; box.dataset.edS = s; box.innerHTML = rowsHtml(p, s);
      if (box._bound) return; box._bound = true;
      box.addEventListener("input", (e) => { const row = e.target.closest("[data-row]"); if (row) commit(box, row, e.target); });
      box.addEventListener("change", (e) => { const row = e.target.closest("[data-row]"); if (row && e.target.matches("[data-mode]")) commit(box, row, e.target); });
      box.addEventListener("click", (e) => { const bc = e.target.dataset.brand; if (bc) { const row = e.target.closest("[data-row]"); row.querySelector('[data-c="a"]').value = bc; commit(box, row); return; } const r = e.target.dataset.edClear; if (!r) return; const { edP: p, edS: s } = box.dataset; if (state[p]?.[s]) delete state[p][s][r]; apply(); box.innerHTML = rowsHtml(p, s); changed(); });
    };
    window.PEditor = {
      mount, css, onChange: (fn) => listeners.add(fn),
      get: () => JSON.parse(JSON.stringify(state)), set: (st) => { state = JSON.parse(JSON.stringify(st || {})); apply(); },
      count: (p, s) => Object.keys((state[p] || {})[s] || {}).length,
      clear: (p, s) => { if (state[p]) delete state[p][s]; apply(); changed(); },
      copyToAll: (p, s) => { const src = (state[p] || {})[s] || {}; ["care", "roster", "genogram", "digpacks"].forEach((k) => ((state[k] ||= {})[s] = { ...src })); apply(); changed(); },
      clearAll: () => { state = {}; apply(); changed(); },
    };
    apply();
  })();
</script>""".replace("__ROLES__", json.dumps(ROLES)).replace("__SUBNAV__", json.dumps(SUBNAV_ROLES)).replace("__HEADER__", json.dumps(HEADER_ROLES))
