# UI/UX Playwright Reviewer — Persistent Memory

## Project Conventions

- **Font**: Outfit (Google Fonts) — used everywhere, no fallback display issues observed
- **Color palette**: Primary pink/magenta (~#E91E8C range), destructive red (~#E53E3E), secondary teal/cyan, black, white
- **Background**: Warm off-white cream (`bg-background` resolves to approx #F5F0E8)
- **Backdrop**: `bg-black/50 backdrop-blur-sm` — renders well, sufficient contrast against light pages
- **Border radius**: `rounded-xl` on modals — consistent with card components
- **Shadow**: `shadow-xl` on modals — visually appropriate elevation

## Modal Component (`components/ui/modal.tsx`) — v3 review (post-improvements applied)

### Confirmed Fixed Since v2 (v3)
- **Animations**: `@keyframes modal-in` (scale 0.96→1 + translateY 6px→0, 0.18s) and `@keyframes backdrop-in` (opacity 0→1, 0.15s) defined in globals.css and applied via Tailwind `animate-[]` — working
- **ghost Confirm**: now `data-variant="default"` (pink filled) — clear CTA hierarchy confirmed in DOM
- **link Confirm**: now `data-variant="default"` (pink filled) — clear CTA hierarchy
- **secondary Confirm**: now `data-variant="default"` (pink filled) — confirmed, Cancel is `ghost`
- **black Confirm**: now `data-variant="white"` (white filled button on black bg) — confirmed, clearly visible
- **destructive background**: `bg-destructive/15` — noticeably semi-opaque, softer than solid red
- **black Cancel**: `ghost` variant — white text on black, readable (improvement vs previous invisible state)
- **Return focus on close**: wired in modal.tsx via `trigger?.focus()` in scroll-lock effect cleanup
- **Close button padding**: increased to `p-3.5` — hits ~44px touch target (p-3.5 = 14px each side + 16px icon = 44px)

### Remaining Open Issues (v3)
1. **black — focus ring contrast**: `ring-foreground` (dark teal) on black bg still ~2.5:1, fails WCAG 1.4.11; `ring-white` override is in preview page but only for keyboard focus-visible state
2. **destructive — title text in red**: `text-destructive` on the title is red against light-red bg; body text is now foreground (fixed), but title color contract should be checked
3. **secondary — Cancel ghost barely visible**: ghost Cancel on teal bg has minimal affordance; slightly better than v2
4. **ModalTitle does not scale with size**: `text-lg` at all sizes; lg modal could use `text-xl`
5. **outline — no shadow**: still floats without elevation; low severity

### Variant Status (v3)
- **default**: production-ready
- **destructive**: `bg-destructive/15` bg, red title, foreground body text, red Confirm button — good
- **outline**: no shadow — acceptable but weak
- **secondary**: teal fill, pink Confirm — clear hierarchy; ghost Cancel is low-contrast on teal
- **ghost**: backdrop-blur bg, pink Confirm, outline Cancel — clear hierarchy; good
- **link**: border/shadow-sm bg, pink Confirm, ghost Cancel — good
- **black**: black bg, white Confirm, ghost Cancel (white text) — all elements readable
- **white**: shadow-2xl, black Confirm, ghost Cancel — good

### Close Button (v3)
- Padding increased to `p-3.5` — 44px touch target achieved
- `focus-visible:ring-foreground` with `focus-visible:ring-white` override for black variant in preview page
- Position: `top-2.5 right-2.5`

### Animation Implementation
- `modal-in`: `scale(0.96) translateY(6px)` → `scale(1) translateY(0)`, 0.18s ease-out
- `backdrop-in`: opacity 0→1, 0.15s ease-out
- Both respect `motion-reduce:animate-none`
- Defined in `app/globals.css` lines 183–197; referenced via Tailwind arbitrary `animate-[]` syntax

## Playwright Setup Note

- App root is `C:/Personal/MyGitHubRepos/ClaudeCodeRepo/IbuiltThisApp/` (NOT a subdirectory)
- Dev server at port 3000 may be a DIFFERENT app (MatchZero); always start IbuiltThis on port 3001 or 3002
- Start with: `cd "C:/Personal/MyGitHubRepos/ClaudeCodeRepo/IbuiltThisApp" && npm run dev -- --port 3002`
- **Stale .next cache**: Turbopack dev server can serve stale compiled chunks even after source edits — HMR does NOT always invalidate module-level constants. If `data-variant` in the DOM doesn't match the source, delete `.next/` and restart on a fresh port. Confirmed: `rm -rf .next` then new port resolves it.
- `focus-visible` CSS ONLY triggers on keyboard nav — use `keyboard.press('Tab')` to land focus-visible; programmatic `.focus()` does NOT trigger the pseudo-class in headless Chromium
- Chromium headless shell caches in local ms-playwright folder after first run

## Preview Page Layout

- Clean, minimal, well-structured sections with `border-b` dividers
- `max-w-3xl mx-auto` container — appropriate width
- Ghost/link buttons in Variants row are visually indistinguishable from plain text
- "white" button has faint border on cream background — hard to identify as a button
