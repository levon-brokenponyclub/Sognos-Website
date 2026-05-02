# Phase 6: Design System Consistency — Slate Palette Implementation

## Overview
Standardizing all section backgrounds across Sognos website to use a consistent `bg-slate-*` color palette, replacing inconsistent `bg-gray-*`, custom hex values (`bg-[#EDEEF1]`), and neutral shades (`bg-emerald-*`).

**Goal:** Product-led SaaS design coherence. One neutral palette. No custom grays or off-brand colors in section backgrounds.

---

## Established Slate Palette

### Light Neutral (Whitest)
- **Token:** `bg-slate-50`
- **Usage:** Hero overlays, premium white sections, max contrast backgrounds
- **Applied to:** ProofSection (already had this)

### Subtle Neutral (Light Gray)
- **Token:** `bg-slate-100`
- **Usage:** Interactive elements, hover states, card backgrounds
- **Replaces:** `bg-gray-100`, `bg-emerald-50/50`, `bg-[#EDEEF1]`
- **Text pairings:** `text-slate-600`, `text-slate-700`

### Soft Neutral (Very Light Gray w/ Opacity)
- **Token:** `bg-slate-200/70`
- **Usage:** Section backgrounds, subtle dividers
- **Replaces:** `bg-gray-200/70`, `bg-gray-200`
- **Applied to:** SolutionsSection, IndustrySection

### Darker Accents
- **Token:** `bg-slate-200`, `bg-slate-300`
- **Usage:** Divider handles, pill badges, secondary buttons
- **Replaces:** `bg-gray-300`, `bg-emerald-100`

### Branded Blue (Retained)
- **Token:** `bg-[#1D96FC]` (Sognos blue)
- **Usage:** Primary CTAs, product badges, branded highlights
- **Status:** No changes — this is the brand color

---

## Homepage Sections — Changes Applied

### 1. **ProductSection.tsx**
- ✅ `bg-[#EDEEF1]` → `bg-slate-100` (drawer background)
- ✅ `bg-gray-300` → `bg-slate-300` (drag handle divider)

### 2. **CTASection.tsx**
- ✅ `bg-gray-200` → `bg-slate-200/70` (section background)
- ✅ `bg-gray-100` → `bg-slate-100` (button hover states — 6 instances)
- ✅ `text-gray-600` → `text-slate-600` (text color — 3 instances)
- ✅ `text-gray-700` → `text-slate-700` (text color — 1 instance)
- ✅ `border-emerald-100 bg-emerald-50/50` → `border-slate-200 bg-slate-50` (stat card)
- ✅ `bg-emerald-100` → `bg-slate-200` (stat card icon background)

### 3. **SolutionsSection.tsx**
- ✅ `bg-gray-200/70` → `bg-slate-200/70` (section background)

### 4. **IndustrySection.tsx**
- ✅ `bg-gray-200` → `bg-slate-200` (card backgrounds — 2 instances)

### 5. **Hero.tsx**
- ✅ No changes needed (already brand-focused, no conflicting grays)

### 6. **LogoStrip.tsx**
- ✅ No changes needed (already clean)

### 7. **HowItWorks.tsx**
- ✅ No changes needed (already clean)

### 8. **HowSognosWorksPreview.tsx**
- ✅ No changes needed (already clean)

### 9. **ProofSection.tsx**
- ✅ No changes needed (already uses `bg-slate-50`)

---

## Pattern for Future Pages

When updating **product pages, solution pages, industry pages, and other sections:**

1. **Identify section background type:**
   - **Premium/hero** → `bg-white` or `bg-slate-50`
   - **Subtle separator** → `bg-slate-200/70`
   - **Interactive/hover** → `bg-slate-100`
   - **Accents/dividers** → `bg-slate-200` or `bg-slate-300`

2. **Remove:**
   - ❌ `bg-gray-*` (all variants)
   - ❌ `bg-[#FAFAFA]`, `bg-[#EDEEF1]` (custom hex grays)
   - ❌ `bg-emerald-*` (off-brand neutrals)
   - ❌ `text-gray-*` (replace with `text-slate-*`)

3. **Search & Replace Commands:**
   ```bash
   # Bulk replace in file(s)
   sed -i '' 's/bg-gray-200\/70/bg-slate-200\/70/g' filename.tsx
   sed -i '' 's/bg-gray-/bg-slate-/g' filename.tsx
   sed -i '' 's/text-gray-/text-slate-/g' filename.tsx
   sed -i '' 's/border-emerald-100 bg-emerald-50\/50/border-slate-200 bg-slate-50/g' filename.tsx
   sed -i '' 's/bg-emerald-100/bg-slate-200/g' filename.tsx
   ```

---

## CSS Syntax Fix

**Fixed in `app/globals.css` line 564:**
- ❌ `flex-wrap: wrapc` (incomplete)
- ✅ `flex-wrap: wrap;` (corrected)

---

## Design System Consistency Checklist

- ✅ Homepage sections slate-ified
- ⬜ Product pages (`/products/sognoscare`, `/products/sognosroster`, `/products/sognosgenogram`)
- ⬜ Edition pages (`/products/sognoscare/editions/*`)
- ⬜ Solution pages (`/solutions/*`)
- ⬜ Industry pages (`/industries/*`)
- ⬜ Customer stories pages
- ⬜ Knowledge hub pages
- ⬜ Company pages (about, careers, social responsibility)
- ⬜ Contact page

---

## Next Steps

1. Apply slate palette to product pages
2. Apply to solution & industry pages
3. Apply to remaining marketing pages
4. Verify design consistency across site
5. Phase 7: UI polish & micro-interactions

---

## Reference

- **Tailwind Slate:** https://tailwindcss.com/docs/customizing-colors#color-palette
- **Sognos Brand Blue:** `#1D96FC` (retained for CTAs & badges)
- **Design System:** `components/ui/` (future component library)
