# Implementation Plan: Composables & Logic

**Issue:** #4
**Branch:** `feat/issue-4-composables-logic`
**Complexity:** Simple
**Total Commits:** 2

## Overview

Most composables and interactive logic are already implemented. This plan focuses on the ONE missing piece: the PauseSection component. This section sits between ReliefSection and BadgeCollection, asking "What did you do today that mattered?" with localStorage persistence, returning user detection, and badge preview.

## Prerequisites

- [x] `useBadges.ts` composable exists (already implemented)
- [x] `QuestionBlock.vue` with debounce pattern exists (reference for patterns)
- [x] `BadgeCollection.vue` for rendering (already implemented)
- [x] IntersectionObserver logic pattern (already in QuestionBlock)

## Prototype Reference

- **Section:** Pause Section (lines 971-984 in prototype-v6.html)
- **JavaScript:** Lines 1166-1207 in prototype-v6.html
- **CSS Styles:** Lines 478-569 in prototype-v6.html
- **Key patterns:**
  - Relief section colors (`--relief-bg`, `--relief-accent`)
  - Neo-brutalist input styling (3px solid borders, white background)
  - Debounced save with 400ms delay
  - Returning user message: "// you came back"
  - Badge preview shows after save with "// you showed up" label

## Atomic Commits

Each commit is a reviewable unit. Implementer completes one commit, returns diff for review, then proceeds to next.

### Commit 1: feat(pause): add PauseSection component

**Type:** feat
**Scope:** pause
**Files:**
- `app/components/PauseSection.vue` - Create

**Changes:**
- Create PauseSection.vue component
- Implement returning user detection (check for `rc-win` in localStorage)
- Display "// you came back" message if user has saved before
- Add question: "What did you do today that mattered?"
- Add input field with placeholder "even small things count..."
- Implement debounced save (400ms) to localStorage keys:
  - `rc-win` - user input text
  - `rc-date` - formatted date (e.g., "Dec 31, 2025")
- Pre-fill input with saved value on mount (if exists)
- Show badge preview after save with:
  - Label: "// you showed up"
  - User text from input
  - Formatted date
  - "noted." confirmation message
- Implement SSR safety (`if (!import.meta.client) return`)
- Apply neo-brutalist styling matching prototype
- Use CSS variables: `--color-relief-bg`, `--color-relief-accent`
- Support reduced motion preferences
- Add proper accessibility attributes

**Styling Details (from prototype):**
- Background: `var(--color-relief-bg)`
- Border top: 2px solid `var(--color-relief-accent)`
- Padding: 4rem 2rem 8rem
- Max-width: 600px centered
- Input: white background, 3px solid black border
- Input focus: border color changes to `--color-relief-accent`
- Badge preview: white background, 3px solid `--color-relief-accent` border
- Returning message: mono font, relief accent color
- Badge label: "// you showed up" in mono font, uppercase, small size

**Acceptance Criteria:**
- [ ] Component follows SSR-safe patterns (client-side only localStorage access)
- [ ] Debounce implementation matches QuestionBlock.vue pattern (400ms delay)
- [ ] localStorage keys `rc-win` and `rc-date` are used
- [ ] Returning user sees "// you came back" message
- [ ] Returning user sees pre-filled input
- [ ] Badge preview appears after save with correct styling
- [ ] Matches prototype visual design (lines 478-569)
- [ ] Input is accessible (proper labels, focus states)
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes

---

### Commit 2: feat(app): integrate PauseSection into page layout

**Type:** feat
**Scope:** app
**Files:**
- `app/app.vue` - Modify

**Changes:**
- Import `PauseSection` component
- Add `<PauseSection />` between `<ReliefSection />` and `<BadgeCollection />`
- Maintain ClientOnly wrapper for BadgeCollection
- No style changes needed (component is self-contained)

**Acceptance Criteria:**
- [ ] PauseSection appears in correct position in page flow
- [ ] Section renders on both SSR and client hydration
- [ ] Page flow matches prototype order: Relief → Pause → Badges → Footer
- [ ] No visual regressions in surrounding sections
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes
- [ ] `pnpm build` succeeds

---

## Testing Strategy

### Automated Tests
- **Lint:** `pnpm lint`
- **Type Check:** `pnpm type-check`
- **Build:** `pnpm build` (ensures SSR compatibility)

### Manual Verification

**First-time user flow:**
1. Clear localStorage (`localStorage.clear()` in console)
2. Scroll to PauseSection
3. Verify "// you came back" message is NOT visible
4. Type into input field
5. Wait 400ms
6. Verify badge preview appears with:
   - "// you showed up" label
   - Your typed text
   - Current date
   - "noted." message
7. Check localStorage in DevTools:
   - `rc-win` = your text
   - `rc-date` = formatted date

**Returning user flow:**
1. Refresh page (localStorage persists)
2. Scroll to PauseSection
3. Verify "// you came back" message IS visible
4. Verify input is pre-filled with previous value
5. Verify badge preview is visible with saved data
6. Modify text
7. Wait 400ms
8. Verify badge preview updates

**Edge cases:**
1. Empty input → badge preview disappears, localStorage cleared
2. Very long text → respects maxlength attribute
3. Rapid typing → debounce prevents save spam

### Accessibility Verification
- [ ] Input has proper `aria-label` or associated `<label>`
- [ ] Focus state visible on input
- [ ] Keyboard navigation works (tab to input, type, tab away)
- [ ] Screen reader announces input purpose
- [ ] Reduced motion preference respected (no animations)

### Visual Comparison
- [ ] Compare to prototype-v6.html lines 971-984 (HTML structure)
- [ ] Compare to prototype-v6.html lines 478-569 (CSS styling)
- [ ] Relief section colors match
- [ ] Typography matches (Anybody for question, DM Mono for input/badge)
- [ ] Spacing and padding match prototype
- [ ] Badge preview styling matches

---

## Verification Checklist

Before PR creation:
- [ ] Both commits completed and reviewed
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes
- [ ] `pnpm build` succeeds
- [ ] Matches prototype design (visual comparison)
- [ ] Accessible (keyboard navigation, screen readers, focus states)
- [ ] Mobile responsive (test at 375px, 768px, 1024px widths)
- [ ] localStorage persistence works (first-time and returning user flows)
- [ ] Debounce prevents save spam during rapid typing
- [ ] SSR-safe (no client-only code runs on server)

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| SSR hydration mismatch with localStorage | Use `if (!import.meta.client)` guards, load state in `onMounted()` |
| Date formatting inconsistency | Use same `toLocaleDateString()` format as prototype: `{ month: 'short', day: 'numeric', year: 'numeric' }` |
| Debounce timing conflicts | Clear timeout on unmount, clear on each input event |
| Badge preview not showing | Ensure visibility logic matches prototype (add `.visible` class on save) |

---

## Open Questions

None - all patterns are established in existing components.

---

## Implementation Notes

### localStorage Keys
- `rc-win` - String (user's "win" text)
- `rc-date` - String (formatted date like "Dec 31, 2025")

### Debounce Timing
- **400ms** (different from QuestionBlock's 500ms - matches prototype exactly)

### Date Format
```javascript
new Date().toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})
// Example: "Dec 31, 2025"
```

### Component Structure
```
PauseSection.vue
├── Script Setup
│   ├── Refs (input, badge preview visibility, returning user)
│   ├── onMounted (load from localStorage, SSR-safe)
│   ├── handleInput (debounced save)
│   └── onUnmounted (cleanup timeout)
└── Template
    ├── Returning message ("// you came back")
    ├── Question text
    ├── Input field
    └── Badge preview (conditionally visible)
```

### CSS Variable Reference
From `app/assets/css/tailwind.css`:
- `--color-relief-bg` - Mint background
- `--color-relief-accent` - Mint accent color
- `--font-headline` - Anybody font
- `--font-mono` - DM Mono font
- `--font-display` - Instrument Sans font

---

## Success Criteria

This issue is complete when:
1. PauseSection component exists and is integrated into app.vue
2. First-time users see the question and can save their "win"
3. Returning users see "// you came back" and their previous input
4. Badge preview appears after save with correct styling
5. All tests pass (lint, type-check, build)
6. Visual design matches prototype
7. Component is accessible and SSR-safe
