# Pass — Full Instructions

## Purpose
Normalize the page against global design tokens and make it actually look right.
This is the site without the paint — bones and proportions must be correct
before Refine goes on.

Pass is a collaborative, section-by-section design conversation — not a
one-shot audit dump.

---

## Step 0 — Read first
- `docs/ROLLOUT_PROCESS.md` — Global Layout Defaults (authoritative, extracted
  from live codebase — do not use remembered or assumed values)

---

## Step 1 — Establish scope
Tell the user which sections exist on the page and in what order. Confirm
you'll work through them one at a time, starting from the top.

Example:
> "About page has four sections: AboutHero, AboutMission, AboutValues,
> TeamSection. Starting with AboutHero — I'll fix tokens, share what I found,
> then we'll talk about what you want for this section."

---

## Step 2 — Section loop (repeat for every section)

### 2a — Audit and fix tokens
Read the section component. Check against Global Layout Defaults from
`docs/ROLLOUT_PROCESS.md`. Categories:

| Category | What to check |
|---|---|
| Layout | Section padding (`py-20 md:py-28`), container (`mx-auto max-w-7xl px-6`), gap |
| Typography | H1 (hero only), H2 (`font-medium` not `font-normal`), eyebrow (`font-semibold`), body measure |
| Surfaces | Light: `bg-sognos-tint` or `bg-white`. Dark: `bg-sognos-navy`. No gradients on cards. |
| Cards | `rounded-lg` only, never `rounded-xl`/`2xl`/`3xl`. No `shadow-*`. Correct internal padding. |
| Components | Server vs client, CTA label = "Book a Demo" |
| Eye test | Does it actually look right? Weighting, hierarchy, SaaS feel |

Apply mechanical token fixes immediately (e.g. `rounded-xl` → `rounded-lg`,
`bg-gray-50` → `bg-sognos-tint`, missing `tracking-tight`). If a fix is
ambiguous or has visible design impact beyond a simple swap, flag it before
applying and discuss.

### 2b — Report what was found and fixed

```
SECTION: [name]
FIXED:   [old value] → [new value] · [old] → [new] …
FLAGGED: [anything ambiguous or visually significant — describe, don't fix yet]
OPINION: [Claude's honest read — even if it technically passes]
```

### 2c — Open the floor
After the report, ask:

> "What are you thinking for this section? Any references you want to use here?"

Wait. Do not move to the next section.

### 2d — Respond to references or direction
If a link or screenshot is supplied:
- Open it directly, inspect real values (font size, weight, spacing, layout)
- Map onto Sognos tokens — never copy raw values verbatim
- Report: source value → Sognos token
- If a requested value would break consistency or read poorly, push back with
  a reason and suggest an alternative. Don't just refuse — make a counter-proposal.
- If it's an improvement, say that too and apply it.

Make a call together. Apply what's confirmed.

### 2e — Move on
Once the user is happy with the section:

> "Great, moving to [next section name]."

---

## Step 3 — End of page
When all sections are done:
- Summarise every change made across the page
- Note anything deferred or flagged for Refine
- Append to `docs/CHANGELOG.md`
- Update `docs/PROJECT_STATE.md` marking Pass complete for this page
- Update the status table in `docs/ROLLOUT_PROCESS.md`
- Notify the user — do not run a build

---

## Known open conflicts (flag if encountered during Pass, do not resolve unilaterally)

- **Industries H2 `font-normal`** — three components use it; conflicts with
  the global `font-medium` standard. Needs a call from the user before closing.
- ~~**AnimatedEyebrow defaults to `font-normal`**~~ — RESOLVED 2026-08-06:
  the component now defaults to `font-semibold`, matching the global standard.
- **Homepage "Book a Demo" button uses `rounded-sm`** — off-token on the
  site's primary CTA at Hero.tsx and HeadlineCTA.tsx. Flag if encountered.
- **Industries "Book a Demo" CTA** — no local CTA in scanned files; may be
  covered by global Navbar/CTABand. Flag if the page being Passed has no
  visible local CTA.

---

## Standing rules during Pass

- **Have an opinion.** If something looks off even though it passes the token
  check, say so. The goal is a page that looks right, not one that just
  checks out mechanically.
- **Push back constructively.** If the user wants a value that will break
  consistency or read poorly, explain why and suggest an alternative.
  Always make a call together.
- **No automatic builds.** Notify when done, stop. `npx tsc --noEmit` is
  fine for type-checking only.
- **No screenshots.** Verify via DOM/rendered HTML.
- **References are for mapping.** Any link or image supplied is reference
  only — inspect, extract real values, map to Sognos tokens.
- **Never ask the user to open dev tools.** Use whatever is visible; flag
  uncertainty; confirm after applying.
