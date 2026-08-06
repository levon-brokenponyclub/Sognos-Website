# Match / Adjust

Reusable prompt for refactoring any component layout or structure against a
reference. Two modes:

- **Match** — make the component structurally identical to the reference
- **Adjust** — bring specific properties closer to the reference (caller
  specifies which ones)

Both modes follow the same discipline: read → review → discuss each element
→ get confirmation → then and only then edit.

---

## How to invoke

```
Match [component name or file path] to [reference URL / screenshot / code]
--- or ---
Adjust [component name or file path]
Change: [list specific properties — layout, spacing, gap, image crop, etc.]
Reference: [URL / screenshot / code]
```

---

# MATCH

### Step 1 — Read the current component
Find and read the target component file in full. Note every element, its
current class names, layout structure, and rendered order. Do not edit yet.

### Step 2 — Review the reference
- **If a URL was supplied:** open it in Dia. Inspect the live DOM. Pull real
  computed values — actual px measurements and class names from the rendered
  page, not guesses. If a CSS transform is distorting `getBoundingClientRect`,
  flag it and fall back to class-name inspection.
- **If a screenshot or code was supplied:** read it fully. Extract every
  structural detail visible — layout, spacing, element order, proportions.
- **If nothing was supplied:** stop and ask —
  > "Do you have a reference for this — a URL, screenshot, or code snippet?
  > It'll help me match more accurately. Or describe what you're going for
  > and I'll work from that."

### Step 3 — Build the comparison table
Map every structural element side by side:

| Element | Current | Reference (real value) | Closest token | Proposed change |
|---|---|---|---|---|
| Outer wrapper layout | | | | |
| Column structure | | | | |
| Column width proportions | | | | |
| Outer padding | | | | |
| Inner padding | | | | |
| Gap between elements | | | | |
| Element order (top→bottom, left→right) | | | | |
| Image sizing / crop | | | | |
| Image position | | | | |
| Heading size | | | | |
| Heading weight | | | | |
| Body text size | | | | |
| Label / eyebrow size | | | | |
| Muted / secondary colour | | | | |
| Border style | | | | |
| Border colour | | | | |
| Border radius | | | | |
| Background colour | | | | |
| Shadow | | | | |

Rules for filling the table:
- **Current** = exactly what is in the file right now
- **Reference (real value)** = measured from the reference — show the actual
  px or class name. Never fill this with a guess or memory. If it cannot be
  reliably measured, write "unmeasurable — [reason]" and flag it.
- **Closest token** = the nearest project design-system token
  (e.g. `text-xl`, `p-6`, `gap-4`). Never introduce arbitrary values.
  If nothing maps cleanly, write "no close token — needs a call".
- **Proposed change** = the specific edit recommended, or "no change" /
  "flag — needs decision"

### Step 4 — Go through the table element by element with the user
Present the full table. Then go through each row that has a proposed change,
one at a time:

> "[Element]: currently [current value]. Reference shows [real value].
> I'd propose [proposed change] — maps to [token].
> [Honest opinion: is this a good idea, a bad idea, or does it depend?
> Be direct. If it will look wrong or break consistency, say so and explain
> why. Suggest an alternative if you have one.]
> What do you want to do?"

Wait for a response on each item before moving to the next. The user can:
- Confirm → apply as proposed
- Skip → leave as is, note it
- Modify → apply their value instead, note it
- Ask a question → answer it, then re-ask

Do not batch-apply. Do not move ahead. Do not assume silence is a yes.

### Step 5 — Apply confirmed changes only
Once every item has been decided:
- Apply only the confirmed changes
- Do not touch anything not explicitly confirmed
- Run `npx tsc --noEmit` — must pass clean
- Report every applied change in a final summary

### Step 6 — Done
List what changed, what was skipped, and anything flagged as unmappable.
Do not run a full build. Notify and stop.

---

# ADJUST

Targeted version of Match. Caller specifies which elements to look at.
Everything else is left completely alone. Same step discipline applies.

### Step 1 — Read the current component
Find and read the target component file. Focus on the elements listed in
the ADJUST call. Do not edit yet.

### Step 2 — Review the reference
Same as Match Step 2 — open URL in Dia, read screenshot/code, or ask if
nothing was supplied.

### Step 3 — Build a focused comparison table
Only compare the elements explicitly listed in the ADJUST call:

| Element | Current | Reference (real value) | Closest token | Proposed change |
|---|---|---|---|---|
| [element 1] | | | | |
| [element 2] | | | | |
| … | | | | |

Same rules as Match — real values only, no guesses, no arbitrary tokens.

### Step 4 — Go through each element with the user
Same as Match Step 4 — one element at a time, honest opinion included,
wait for response before moving to the next.

### Step 5 — Apply confirmed changes only
Same as Match Step 5.

### Step 6 — Done
Same as Match Step 6.

---

## Standing rules (both modes)

**Never guess a reference value.**
Always open the reference and measure. If it cannot be reliably measured,
say so — do not substitute a guess or a remembered value.

**Never self-approve.**
Every proposed change must be presented to the user and confirmed before
applying. Even if a change looks obviously correct, it does not get applied
until the user says so.

**Have an honest opinion on every item.**
Do not just present options neutrally. If a proposed change will look wrong,
break consistency, or create a problem, say so clearly and explain why.
Suggest an alternative. Be direct but constructive — the goal is the right
outcome, not agreement.

**Map to tokens, never copy raw values.**
Reference uses `24px`? Find the closest token (`text-xl`, `p-6`).
If nothing maps cleanly, flag it and ask — do not write `text-[24px]`.

**Layout and structure only by default.**
Do not change font sizes or colours unless the caller explicitly includes
them in the ADJUST list or confirms it during the element-by-element review.

**No automatic builds.**
`npx tsc --noEmit` only. Full build only if explicitly requested.

**No screenshots.**
Verify via DOM/rendered HTML only.

**Never ask the user to open dev tools.**
Use what is accessible directly. Flag uncertainty and confirm after applying.
