"""Inspector drawer for docs/mockups/products (replaces the old controls panel).

One accordion that mirrors the page (Header, Sub-nav, sections, footer rows):
collapsed rows show a summary; expanded rows hold layout, rail switch, tone
swatches, context-aware options and the inline colour editor (window.PEditor).
Plus: click-to-inspect, hover outlines, presets (browser + JSON import/export),
undo / redo (20 steps). Drives the page through window.PCtl.
build(config) -> (HTML, CSS, JS).
"""
import json

HTML = """<button type="button" data-insp-open class="fixed right-0 top-1/2 z-[69] -translate-y-1/2 rounded-l-lg bg-heading px-2 py-4 text-xs font-medium text-white [writing-mode:vertical-rl] hover:bg-accent focus-visible:outline-2 focus-visible:outline-accent" aria-controls="inspector" aria-expanded="false">Inspector</button>
<aside id="inspector" aria-label="Products inspector" class="fixed inset-y-0 right-0 z-[70] flex w-[min(100vw,26rem)] flex-col border-l border-line bg-white text-left">
  <div class="space-y-3 border-b border-line p-4">
    <div class="flex items-center justify-between gap-2">
      <p class="font-heading text-lg text-heading">Inspector</p>
      <div class="flex items-center gap-1">
        <button type="button" data-insp="inspect" aria-pressed="false" title="Click a section on the page to edit it (I)" class="ib aria-pressed:bg-heading aria-pressed:text-white">&#8982; Inspect</button>
        <button type="button" data-insp="undo" title="Undo (Ctrl/Cmd+Z)" aria-label="Undo" class="ib">&#8630;</button>
        <button type="button" data-insp="redo" title="Redo (Shift+Ctrl/Cmd+Z)" aria-label="Redo" class="ib">&#8631;</button>
        <button type="button" data-insp="close" aria-label="Close inspector" class="ib">&times;</button>
      </div>
    </div>
    <div data-insp-products class="flex flex-wrap gap-1"></div>
    <div class="flex flex-wrap items-center gap-1.5">
      <select data-insp-preset aria-label="Preset" class="min-w-0 flex-1 rounded border border-line bg-white px-2 py-1.5 text-xs text-heading"></select>
      <button type="button" data-insp="save" class="ib">Save as&hellip;</button>
      <button type="button" data-insp="delete" class="ib" hidden>Delete</button>
    </div>
    <div class="flex flex-wrap items-center gap-1.5">
      <button type="button" data-insp="export" class="ib">Export all</button>
      <label class="ib cursor-pointer">Import JSON<input type="file" accept="application/json,.json" data-insp-import class="sr-only"></label>
      <button type="button" data-insp="resetall" class="ib ml-auto">Reset all</button>
    </div>
  </div>
  <div data-insp-list class="min-h-0 flex-1 overflow-y-auto"></div>
  <p data-insp-status class="border-t border-line px-4 py-2 text-[11px] text-muted" aria-live="polite"></p>
</aside>
<div data-insp-outline aria-hidden="true" class="pointer-events-none fixed z-[65] hidden rounded border-2 border-accent"><span class="absolute -top-6 left-0 rounded bg-accent px-2 py-0.5 text-[11px] font-medium text-white"></span></div>"""

CSS = """<style>
  #inspector .ib, [data-insp-open] ~ #inspector .ib { display: inline-flex; align-items: center; gap: .25rem; border: 1px solid #e2e8f0; border-radius: 9999px; padding: .25rem .625rem; font-size: .75rem; color: #0f1936; background: #fff; }
  #inspector .ib:hover { border-color: #0f1936; } #inspector .ib:disabled { opacity: .4; }
  #inspector .seg { border: 1px solid #e2e8f0; border-radius: 9999px; padding: .25rem .625rem; font-size: .75rem; color: #0f1936; }
  #inspector .seg[aria-pressed="true"] { background: #0f1936; border-color: #0f1936; color: #fff; }
  #inspector .sw { width: 1.75rem; height: 1.75rem; border-radius: 9999px; border: 1px solid #e2e8f0; }
  #inspector .sw[aria-pressed="true"] { outline: 2px solid #1e96fc; outline-offset: 2px; }
  #inspector .sw[data-auto] { background: conic-gradient(#e2e8f0 25%, #fff 0 50%, #e2e8f0 0 75%, #fff 0) 0 0 / 10px 10px; }
  #inspector [role="switch"] { width: 2.25rem; height: 1.25rem; border-radius: 9999px; background: #e2e8f0; position: relative; transition: background .2s; }
  #inspector [role="switch"]::after { content: ""; position: absolute; top: 2px; left: 2px; width: 1rem; height: 1rem; border-radius: 9999px; background: #fff; transition: transform .2s; }
  #inspector [role="switch"][aria-checked="true"] { background: #1e96fc; } #inspector [role="switch"][aria-checked="true"]::after { transform: translateX(1rem); }
  #inspector { translate: 100% 0; transition: translate .3s cubic-bezier(.22,1,.36,1); visibility: hidden; } html.insp-open #inspector { translate: 0 0; visibility: visible; }
  @media (prefers-reduced-motion: reduce) { #inspector { transition: none; } } html.insp-open [data-insp-open] { display: none; }
  @media (min-width: 1280px) { html.insp-open body { padding-right: 26rem; } html.insp-open #ph-header { right: 26rem; } }
  html.insp-inspecting [data-s], html.insp-inspecting [data-fr], html.insp-inspecting div[data-subnav], html.insp-inspecting #ph-header { cursor: crosshair; }
</style>"""

JS = r"""<script>
  (() => {
    const C = __CONFIG__;
    const h = document.documentElement, ctl = window.PCtl, ed = window.PEditor;
    const $ = (q, el = document) => el.querySelector(q), $$ = (q, el = document) => [...el.querySelectorAll(q)];
    const drawer = $("#inspector"), list = $("[data-insp-list]"), status = $("[data-insp-status]"), outline = $("[data-insp-outline]");
    const get = (a) => h.getAttribute("data-" + a);
    const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
    const say = (t) => { status.textContent = t; };
    const store = { get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } }, set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} } };
    const name = (list, k) => (list.find((x) => x[0] === k) || [k, k])[1];

    // ── Areas ──────────────────────────────────────────────────────────────
    const NS = C.ns || "sognos-insp";
    const AREAS = [["header", "Header", "page"], ...(C.noSubnav ? [] : [["subnav", "Sub-nav", "page"]]), ...C.sections.map(([k, n]) => [k, n, "section"]), ...C.footerRows.map(([k, n]) => ["f-" + k, "Footer · " + n, "footer"])];
    const ATTRS = () => [...C.sections.flatMap(([k]) => ["s-" + k, "tone-" + k, "rail-" + k]), ...C.footerRows.flatMap(([k]) => ["fr-" + k, "ftone-" + k]), "hd-start", "hd-scroll", "subnav", "snpos", "pal", "pbg", "pvis", ...Object.keys(C.fcDefaults), ...Object.keys(C.snDefaults), ...(C.extraAttrs || []), ...Object.values(C.toggles || {}).flat().map(([a]) => a)];
    const layoutsFor = (p) => [...C.layouts, ...(C.gallery[p] || [])];
    const layoutsOf = (area, p) => C.sectionLayouts?.[area] ? C.sectionLayouts[area] : area === "hero" ? layoutsFor(p) : area === "close" ? [...C.layouts, ...C.closeLayouts] : C.layouts;

    // ── History (undo / redo) ─────────────────────────────────────────────
    const snap = () => ({ product: get("pprod"), attrs: Object.fromEntries(ATTRS().map((a) => [a, get(a)])), colours: ed.get(), custom: ctl.PAL.custom });
    const restore = (sn) => {
      if (!sn) return; if (sn.custom) ctl.PAL.custom = sn.custom;
      if (sn.product && sn.product !== get("pprod")) ctl.setP(sn.product);
      Object.entries(sn.attrs || {}).forEach(([a, v]) => v != null && ctl.set(a, v)); ed.set(sn.colours || {}); render();
    };
    let undo = [], redo = [], last = JSON.stringify(snap()), timer = 0, quiet = false;
    const histUi = () => { $('[data-insp="undo"]').disabled = !undo.length; $('[data-insp="redo"]').disabled = !redo.length; };
    const record = () => { if (quiet) return; clearTimeout(timer); timer = setTimeout(() => { const cur = JSON.stringify(snap()); if (cur === last) return; undo.push(last); if (undo.length > 20) undo.shift(); redo = []; last = cur; histUi(); }, 300); };
    const step = (from, to, label) => { if (!from.length) return; clearTimeout(timer); to.push(last); last = from.pop(); quiet = true; restore(JSON.parse(last)); quiet = false; histUi(); say(label); };
    const set = (a, v) => { ctl.set(a, v); record(); render(); };
    ed.onChange(() => { record(); summaries(); });

    // ── Controls ──────────────────────────────────────────────────────────
    const seg = (label, attr, opts) => `<div class="space-y-1.5"><p class="text-[11px] font-medium text-muted">${label}</p><div class="flex flex-wrap gap-1" role="group" aria-label="${esc(label)}">${opts.map(([k, n]) => `<button type="button" class="seg" data-set="${attr}:${k}" aria-pressed="${get(attr) === k}">${esc(n)}</button>`).join("")}</div></div>`;
    const swatches = (label, attr, opts) => `<div class="space-y-1.5"><p class="text-[11px] font-medium text-muted">${label} <span class="font-normal text-body">· ${esc(name(opts, get(attr)))}</span></p><div class="flex flex-wrap gap-1.5" role="group" aria-label="${esc(label)}">${opts.map(([k, n, bg]) => `<button type="button" class="sw" data-set="${attr}:${k}" aria-pressed="${get(attr) === k}" title="${esc(n)}" aria-label="${esc(n)}" ${bg ? `style="background:${bg}"` : "data-auto"}></button>`).join("")}</div></div>`;
    const sw = (label, attr) => `<div class="flex items-center justify-between"><p class="text-[11px] font-medium text-muted">${label}</p><button type="button" role="switch" data-switch="${attr}" aria-checked="${get(attr) === "on"}" aria-label="${esc(label)}"></button></div>`;
    const colours = (p, area) => { const n = ed.count(p, area); return `<details data-colours class="rounded border border-line"><summary class="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-xs font-medium text-heading [&::-webkit-details-marker]:hidden">Colours${n ? ` <span class="rounded-full bg-accent px-1.5 text-[10px] text-white">${n}</span>` : ""}<span aria-hidden="true">&#9662;</span></summary><div data-ed-box class="space-y-2 p-2"></div></details>`; };
    const actions = (area) => `<div class="flex flex-wrap gap-1.5 pt-1"><button type="button" class="ib" data-area-act="reset">Reset ${area.startsWith("f-") ? "row" : "section"}</button><button type="button" class="ib" data-area-act="copy">Copy colours to all products</button></div>`;
    const tones = C.tones.map(([k, n, bg]) => [k, n, bg]);

    const palSets = () => { const cur = get("pal") || "prod-auth"; const gk = cur === "custom" ? "custom" : cur.split("-")[0]; return { cur, gk }; };
    const panelColours = () => {
      const { cur, gk } = palSets(); const group = C.palettes.find((g) => g[1] === gk);
      return `<div class="space-y-1.5"><p class="text-[11px] font-medium text-muted">Graphic panel colours</p>
        <select data-palset aria-label="Palette set" class="w-full rounded border border-line bg-white px-2 py-1.5 text-xs text-heading">${C.palettes.map(([t, k]) => `<option value="${k}"${k === gk ? " selected" : ""}>${esc(t)}</option>`).join("")}<option value="custom"${gk === "custom" ? " selected" : ""}>Custom</option></select>
        ${gk === "custom" ? `<div class="flex items-center gap-2"><input type="color" data-cpal="0" value="${ctl.PAL.custom[0]}" aria-label="Custom panel colour 1" class="h-7 w-10 rounded border border-line"><input type="color" data-cpal="1" value="${ctl.PAL.custom[1]}" aria-label="Custom panel colour 2" class="h-7 w-10 rounded border border-line"></div>`
          : `<div class="flex flex-wrap gap-1.5">${Object.entries(group[2]).map(([k, cols]) => `<button type="button" class="sw" data-set="pal:${gk}-${k}" aria-pressed="${cur === gk + "-" + k}" title="${esc(group[3][k])}" aria-label="${esc(group[3][k])}" ${cols.length ? `style="background:linear-gradient(90deg, ${cols[0]} 50%, ${cols[1] || cols[0]} 50%)"` : "data-auto"}></button>`).join("")}</div>`}</div>`;
    };
    // Editorial (C) feature cards: arrangement, image side, columns, text position, surface, eyebrow colour, element toggles.
    const cards = () => `<div class="space-y-3 rounded border border-line p-3"><div class="flex items-center justify-between gap-2"><p class="text-xs font-medium text-heading">Editorial cards</p><button type="button" class="ib" data-fc-preset>Match SognosCare card</button></div>
      ${C.fc.map(([a, label, kind, opts]) => kind === "seg" ? seg(label, a, opts) : swatches(label, a, opts)).join("")}
      <div class="space-y-1.5"><p class="text-[11px] font-medium text-muted">Elements</p>${C.fcToggles.map(([a, label]) => sw(label, a)).join("")}</div></div>`;
    // Proxied controls: a section's own in-page option bars ([data-flbar], hidden on the page) rendered here; clicks forward to the originals.
    const proxyBtns = (area) => { const w = $(`[data-pp="${get("pprod")}"] [data-s="${area}"]`); return w ? $$("[data-flbar]", w).filter((bar) => !bar.parentElement.closest("[hidden]")).flatMap((bar) => $$("button", bar)) : []; };
    const proxyGroups = (area) => { const w = $(`[data-pp="${get("pprod")}"] [data-s="${area}"]`); if (!w) return []; const groups = []; let g = null; let i = 0;
      $$("[data-flbar]", w).filter((bar) => !bar.parentElement.closest("[hidden]")).forEach((bar) => $$("p, button", bar).forEach((el) => {
        if (el.tagName === "P") { const t = el.textContent.trim(); if (t && !el.hasAttribute("data-inote")) { g = { label: t, items: [] }; groups.push(g); } return; }
        if (!g) { g = { label: "Options", items: [] }; groups.push(g); } g.items.push([i++, el]); }));
      return groups.filter((gr) => gr.items.length); };
    const proxyControls = (area) => proxyGroups(area).map((gr) => `<div class="space-y-1.5"><p class="text-[11px] font-medium text-muted">${esc(gr.label)}</p><div class="flex flex-wrap gap-1" role="group" aria-label="${esc(gr.label)}">${gr.items.map(([i, b]) => `<button type="button" class="seg inline-flex items-center gap-1" data-proxy="${area}|${i}" aria-pressed="${b.getAttribute("aria-pressed") === "true"}"${b.title ? ` title="${esc(b.title)}"` : ""}>${b.innerHTML}</button>`).join("")}</div></div>`).join("");
    const body = (area, kind) => {
      const p = get("pprod");
      if (area === "header") return swatches("Start (top of page)", "hd-start", C.header) + swatches("On scroll", "hd-scroll", [["same", "Same as start", ""], ...C.header]);
      if (area === "subnav") return swatches("Style", "subnav", C.subnav) + seg("Position", "snpos", [["below", "Below hero"], ["above", "Above hero"]])
        + (get("subnav") === "bar" ? `<p class="text-[11px] text-muted">Layout options apply to the sticky sub-nav (not the header bar).</p>` : "")
        + `<div class="space-y-3 rounded border border-line p-3"><div class="flex items-center justify-between gap-2"><p class="text-xs font-medium text-heading">Layout</p><button type="button" class="ib" data-sn-preset>Match 02b sub-nav</button></div>${C.snLayout.map(([a, l, o]) => seg(l, a, o)).join("")}</div>`;
      if (kind === "footer") { const r = area.slice(2); return seg("Layout", "fr-" + r, C.footerStyles.filter(([k]) => k !== "none" || r === "graphic")) + swatches("Tone", "ftone-" + r, tones); }
      if ((C.proxy || []).includes(area)) return proxyControls(area) + ((C.noRail || []).includes(area) ? "" : sw("Rail (label in a left column)", "rail-" + area)) + swatches("Tone", "tone-" + area, tones);
      let out = seg("Layout", "s-" + area, layoutsOf(area, p)) + ((C.noRail || []).includes(area) ? "" : sw("Rail (label in a left column)", "rail-" + area)) + swatches("Tone", "tone-" + area, tones);
      if (area === "features") { out += seg("Graphic panel background", "pbg", [["colour", "Panel colour"], ["photo", "Product photo"], ["paraform", "Paraform"]]) + panelColours(); if (p === "digpacks") out += seg("DigPacks panels", "pvis", [["graphic", "Motion graphic"], ["screen", "Product screen"]]); if (get("s-features") === "c") out += cards(); }
      if (C.fcArea === area && get("s-" + area) === "c") out += cards();
      if (area === "close" && p === "digpacks" && (C.extraAttrs || []).includes("ab-graphic")) out += sw("Section graphic (booking motion graphic)", "ab-graphic");
      if (C.toggles?.[area]) out += `<div class="space-y-1.5"><p class="text-[11px] font-medium text-muted">Show / hide</p>${C.toggles[area].map(([a, l]) => sw(l, a)).join("")}</div>`;
      return out;
    };
    const summary = (area, kind) => {
      const p = get("pprod"), n = ed.count(p, area), c = n ? ` · ${n} colour${n > 1 ? "s" : ""}` : "";
      if (area === "header") return `${name(C.header, get("hd-start"))} → ${get("hd-scroll") === "same" ? "same" : name(C.header, get("hd-scroll"))}${c}`;
      if (area === "subnav") return `${name(C.subnav, get("subnav"))} · ${get("snpos") === "above" ? "above" : "below"} hero · ${get("sn-brand")} · menu ${get("sn-menu")}${c}`;
      if (kind === "footer") { const r = area.slice(2); return `${name(C.footerStyles, get("fr-" + r))} · ${name(tones, get("ftone-" + r))}${c}`; }
      if ((C.proxy || []).includes(area)) { const g = proxyGroups(area)[0]; const on = g ? g.items.find(([, b]) => b.getAttribute("aria-pressed") === "true") : null; return `${on ? on[1].textContent.trim() : "Section"} · ${name(tones, get("tone-" + area))}${get("rail-" + area) === "on" ? " · Rail" : ""}${c}`; }
      const fcs = area === "features" && get("s-features") === "c" ? ` · ${name(C.fc[0][3], get("fc-arr"))} ${name(C.fc[4][3], get("fc-card")).split(" ")[0].toLowerCase()}` : "";
      return `${name(layoutsOf(area, p), get("s-" + area))}${fcs} · ${name(tones, get("tone-" + area))}${get("rail-" + area) === "on" ? " · Rail" : ""}${c}`;
    };
    const present = (area) => { if (area === "header" || area === "subnav" || area.startsWith("f-")) return true; const el = $(`[data-pp="${get("pprod")}"] [data-s="${area}"]`); return !!el && !el.closest("[hidden]"); };

    // ── Render ────────────────────────────────────────────────────────────
    let open = store.get(NS + "-open", "hero");
    const render = () => {
      const p = get("pprod");
      $("[data-insp-products]").innerHTML = C.products.map(([k, n]) => `<button type="button" class="seg" data-product-pick="${k}" aria-pressed="${p === k}">${esc(n)}</button>`).join("")
        + (C.themes ? `<span class="basis-full pt-1 text-[11px] font-medium text-muted">Colour theme</span>` + C.themes.map(([k, n]) => `<button type="button" class="seg" data-theme-pick="${k}" aria-pressed="${get("ptheme") === k}">${esc(n)}</button>`).join("") : "");
      drawer.dataset.product = p;
      let group = "";
      list.innerHTML = AREAS.filter(([a]) => present(a)).map(([a, n, kind]) => {
        const head = kind !== group ? `<p class="bg-tint px-4 py-2 text-[10px] font-medium uppercase tracking-widest text-muted">${kind === "footer" ? "Footer" : kind === "page" ? "Page chrome" : "Sections"}</p>` : ""; group = kind;
        const isOpen = open === a;
        return head + `<section data-item="${a}" data-kind="${kind}" class="border-b border-line">
          <button type="button" data-toggle aria-expanded="${isOpen}" class="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-tint"><span class="min-w-0"><span class="block text-sm font-medium text-heading">${esc(n)}</span><span data-summary class="block truncate text-xs text-muted">${esc(summary(a, kind))}</span></span><span aria-hidden="true" class="text-muted transition-transform ${isOpen ? "rotate-180" : ""}">&#9662;</span></button>
          ${isOpen ? `<div class="space-y-4 px-4 pb-4">${body(a, kind)}${colours(p, a)}${actions(a)}</div>` : ""}</section>`;
      }).join("");
      histUi(); presetsUi();
      if (coloursOpen) { const d = $(`[data-item="${open}"] [data-colours]`, list); if (d) d.open = true; }
    };
    let coloursOpen = false;
    const summaries = () => $$("[data-item]", list).forEach((it) => { const s = $("[data-summary]", it); if (s) s.textContent = summary(it.dataset.item, it.dataset.kind); const b = $("[data-colours] summary", it); });
    const openArea = (a, reveal) => { open = a; store.set(NS + "-open", a); h.classList.add("insp-open"); $("[data-insp-open]").setAttribute("aria-expanded", "true"); render(); const it = $(`[data-item="${a}"]`, list); if (it && reveal) it.scrollIntoView({ block: "nearest" }); };

    // ── Events ────────────────────────────────────────────────────────────
    list.addEventListener("click", (e) => {
      const t = e.target.closest("button"); if (!t) return;
      const it = t.closest("[data-item]"), a = it?.dataset.item;
      if (t.matches("[data-toggle]")) { open = open === a ? "" : a; store.set(NS + "-open", open); render(); return; }
      if (t.dataset.set) { const [attr, ...v] = t.dataset.set.split(":"); set(attr, v.join(":")); say(`${it.querySelector(".text-heading").textContent}: ${t.getAttribute("aria-label") || t.textContent}`); return; }
      if (t.dataset.proxy) { const [ar, i] = t.dataset.proxy.split("|"); const b = proxyBtns(ar)[+i]; if (b) { b.click(); say(`${it.querySelector(".text-heading").textContent}: ${b.textContent.trim()}`); } setTimeout(render, 60); return; }
      if (t.matches("[data-sn-preset]")) { Object.entries(C.sn02b).forEach(([k, v]) => ctl.set(k, v)); record(); render(); say("Sub-nav: 02b layout"); return; }
      if (t.matches("[data-fc-preset]")) { Object.entries(C.fcCare).forEach(([k, v]) => ctl.set(k, v)); record(); render(); say("Editorial cards: SognosCare index card"); return; }
      if (t.dataset.switch) { set(t.dataset.switch, get(t.dataset.switch) === "on" ? "off" : "on"); return; }
      if (t.dataset.areaAct === "copy") { ed.copyToAll(get("pprod"), a); say("Colours copied to all products"); render(); return; }
      if (t.dataset.areaAct === "reset") {
        if (a === "header") { ctl.set("hd-start", "trans-dark"); ctl.set("hd-scroll", "white"); }
        else if (a === "subnav") { ctl.set("subnav", "white"); ctl.set("snpos", "below"); Object.entries(C.snDefaults).forEach(([k, v]) => ctl.set(k, v)); }
        else if (a.startsWith("f-")) { ctl.set("fr-" + a.slice(2), "a2"); ctl.set("ftone-" + a.slice(2), "auto"); }
        else { ctl.set("s-" + a, "a"); ctl.set("tone-" + a, "auto"); ctl.set("rail-" + a, "off"); if (a === "features") Object.entries(C.fcDefaults).forEach(([k, v]) => ctl.set(k, v)); }
        ed.clear(get("pprod"), a); record(); render(); say("Reset"); }
    });
    list.addEventListener("toggle", (e) => { const d = e.target; if (!d.matches?.("[data-colours]")) return; coloursOpen = d.open; if (!d.open) return; const a = d.closest("[data-item]").dataset.item; ed.mount($("[data-ed-box]", d), get("pprod"), a); }, true);
    list.addEventListener("change", (e) => {
      if (e.target.matches("[data-palset]")) { const gk = e.target.value; if (gk === "custom") set("pal", "custom"); else { const g = C.palettes.find((x) => x[1] === gk); set("pal", gk + "-" + Object.keys(g[2])[0]); } }
    });
    list.addEventListener("input", (e) => { if (e.target.matches("[data-cpal]")) { ctl.PAL.custom[+e.target.dataset.cpal] = e.target.value; ctl.set("pal", "custom"); record(); } });
    list.addEventListener("mouseover", (e) => { const it = e.target.closest("[data-item]"); if (it) outlineArea(it.dataset.item); });
    list.addEventListener("mouseleave", () => outline.classList.add("hidden"));
    $("[data-insp-products]").addEventListener("click", (e) => { const tb = e.target.closest("[data-theme-pick]"); if (tb) { ctl.set("ptheme", tb.dataset.themePick); record(); render(); say("Theme: " + tb.textContent); return; } const b = e.target.closest("[data-product-pick]"); if (b) { ctl.setP(b.dataset.productPick); record(); render(); } });
    document.addEventListener("products:product", () => render());

    // ── Outline + click-to-inspect ────────────────────────────────────────
    const areaOf = (el) => { if (!el || el.closest("#inspector, [data-insp-open]")) return null; if (el.closest("#ph-header")) return el.closest("[data-hdbar]") ? "subnav" : "header"; if (el.closest("div[data-subnav]")) return "subnav"; const fr = el.closest("[data-fr]"); if (fr) return "f-" + fr.dataset.fr; const s = el.closest("[data-s]"); return s ? s.dataset.s : null; };
    const elOf = (a) => { const p = get("pprod"); if (a === "header") return $("#ph-header header"); if (a === "subnav") return get("subnav") === "bar" ? $(`#ph-header [data-hdbar-p="${p}"]`) : $(`[data-pp="${p}"] [data-subnav]`); if (a.startsWith("f-")) return $(`[data-pfooter] [data-fr="${a.slice(2)}"]`); return $$(`[data-pp="${p}"] [data-s="${a}"]`).find((x) => getComputedStyle(x).display !== "none"); };
    let outlined = null;
    const place = () => { if (!outlined) return; const r = outlined.getBoundingClientRect(); Object.assign(outline.style, { top: Math.max(r.top, 0) + "px", left: r.left + "px", width: r.width + "px", height: Math.min(r.bottom, innerHeight) - Math.max(r.top, 0) + "px" }); };
    const outlineArea = (a) => { const el = a && elOf(a); if (!el) { outline.classList.add("hidden"); outlined = null; return; } outlined = el; $("span", outline).textContent = (AREAS.find((x) => x[0] === a) || [a, a])[1]; outline.classList.remove("hidden"); place(); };
    addEventListener("scroll", place, { passive: true }); addEventListener("resize", place);
    const inspecting = (on) => { h.classList.toggle("insp-inspecting", on); $('[data-insp="inspect"]').setAttribute("aria-pressed", String(on)); if (!on) outline.classList.add("hidden"); say(on ? "Inspect: click a section on the page" : ""); };
    document.addEventListener("mouseover", (e) => { if (h.classList.contains("insp-inspecting")) outlineArea(areaOf(e.target)); });
    document.addEventListener("click", (e) => { if (!h.classList.contains("insp-inspecting")) return; const a = areaOf(e.target); if (!a) return; e.preventDefault(); e.stopPropagation(); inspecting(false); openArea(a, true); outlineArea(a); }, true);

    // ── Presets / export / import ─────────────────────────────────────────
    const saved = () => store.get(NS + "-presets", {});
    const presetsUi = () => {
      const sel = $("[data-insp-preset]"), cur = sel.value; const s = saved();
      sel.innerHTML = `<option value="">Preset…</option><optgroup label="Directions">${C.directions.map(([k, n]) => `<option value="dir:${k}">${esc(n)}</option>`).join("")}</optgroup>` + (Object.keys(s).length ? `<optgroup label="Saved">${Object.keys(s).map((n) => `<option value="saved:${esc(n)}">${esc(n)}</option>`).join("")}</optgroup>` : "");
      sel.value = [...sel.options].some((o) => o.value === cur) ? cur : ""; $('[data-insp="delete"]').hidden = !sel.value.startsWith("saved:");
    };
    $("[data-insp-preset]").addEventListener("change", (e) => { const v = e.target.value; $('[data-insp="delete"]').hidden = !v.startsWith("saved:"); if (v.startsWith("dir:")) { ctl.setD(v.slice(4)); record(); render(); say("Applied direction"); } if (v.startsWith("saved:")) { restore(saved()[v.slice(6)]); record(); say("Applied preset"); } });
    const download = (obj, file) => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" })); a.download = file; a.click(); };
    drawer.addEventListener("click", (e) => {
      const b = e.target.closest("[data-insp]"); if (!b) return; const act = b.dataset.insp;
      if (act === "close") { h.classList.remove("insp-open"); $("[data-insp-open]").setAttribute("aria-expanded", "false"); inspecting(false); }
      if (act === "inspect") inspecting(!h.classList.contains("insp-inspecting"));
      if (act === "undo") step(undo, redo, "Undone");
      if (act === "redo") step(redo, undo, "Redone");
      if (act === "save") { const n = prompt("Preset name"); if (n) { const s = saved(); s[n] = snap(); store.set(NS + "-presets", s); presetsUi(); $("[data-insp-preset]").value = "saved:" + n; say(`Saved "${n}"`); } }
      if (act === "delete") { const v = $("[data-insp-preset]").value.slice(6); const s = saved(); delete s[v]; store.set(NS + "-presets", s); presetsUi(); say(`Deleted "${v}"`); }
      if (act === "export") { const out = { format: "sognos-products-inspector", version: 1, exported: new Date().toISOString(), snapshot: snap(), css: ed.css() }; download(out, "sognos-products-config.json"); navigator.clipboard?.writeText(JSON.stringify(out, null, 2)).catch(() => {}); say("Exported (downloaded + copied)"); }
      if (act === "resetall") { if (!confirm("Reset every layout, tone and colour?")) return; ctl.setD("a"); C.sections.forEach(([k]) => { ctl.set("tone-" + k, "auto"); ctl.set("rail-" + k, "off"); }); C.footerRows.forEach(([k]) => { ctl.set("fr-" + k, "a2"); ctl.set("ftone-" + k, "auto"); }); ["hd-start:trans-dark", "hd-scroll:white", "subnav:white", "snpos:below", "pal:prod-auth", "pbg:colour", "pvis:graphic"].forEach((x) => { const [a, v] = x.split(":"); ctl.set(a, v); }); Object.entries(C.fcDefaults).forEach(([k, v]) => ctl.set(k, v)); Object.entries(C.snDefaults).forEach(([k, v]) => ctl.set(k, v)); ed.clearAll(); record(); render(); say("Everything reset"); }
    });
    $("[data-insp-import]").addEventListener("change", async (e) => {
      const f = e.target.files[0]; if (!f) return;
      try { const j = JSON.parse(await f.text()); const sn = j.snapshot || (j.attrs ? j : { attrs: {}, colours: j }); restore(sn); record(); const s = saved(); const n = f.name.replace(/\.json$/i, ""); s[n] = snap(); store.set(NS + "-presets", s); presetsUi(); $("[data-insp-preset]").value = "saved:" + n; say(`Imported "${n}"`); }
      catch { say("Import failed - not a valid export file"); }
      e.target.value = "";
    });
    $("[data-insp-open]").addEventListener("click", () => openArea(open || "hero"));
    document.addEventListener("keydown", (e) => {
      if (e.target.matches?.("input, select, textarea")) return;
      if (e.key === "Escape" && h.classList.contains("insp-inspecting")) inspecting(false);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") { e.preventDefault(); e.shiftKey ? step(redo, undo, "Redone") : step(undo, redo, "Undone"); }
      if (e.key === "i" && !e.metaKey && !e.ctrlKey && h.classList.contains("insp-open")) inspecting(!h.classList.contains("insp-inspecting"));
    });
    render();
  })();
</script>"""


def build(config):
    return HTML, CSS, JS.replace("__CONFIG__", json.dumps(config))
