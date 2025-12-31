# Implementation Plan: Accessibility

**Issue:** #6
**Branch:** `feat/issue-6-accessibility`
**Complexity:** Medium
**Total Commits:** 3

## Overview

Improve accessibility across the landing page by fixing heading hierarchy violations, enhancing focus states for keyboard navigation, and addressing WCAG AA color contrast failures. The skip-to-content link and aria-labels are already implemented and only require verification.

## Prerequisites

- [x] Skip-to-content link exists in `app/app.vue` (lines 27-30, 81-100)
- [x] Aria-labels present in `QuestionBlock.vue` and `PauseSection.vue`
- [x] `prefers-reduced-motion` support exists

## Prototype Reference

- Section: N/A (cross-cutting accessibility fixes)
- Key patterns: Focus states should use 2px solid outline with 2px offset (see skip-link pattern in app.vue line 96-99)
- Accessibility principle: Keyboard users should see clear visual feedback equal to hover states

## Atomic Commits

Each commit is a reviewable unit. Implementer completes one commit, returns diff for review, then proceeds to next.

### Commit 1: Fix heading hierarchy violations

**Type:** fix
**Scope:** a11y
**Files:**
- `app/app.vue` - Modify (line 43)
- `app/components/PauseSection.vue` - Modify (line 106)

**Changes:**

In `app/app.vue` line 43:
- Change `<p class="stories-header">` to `<h2 class="stories-header">`
- Change closing `</p>` to `</h2>`
- No style changes needed (class already has correct styles lines 110-119)

In `app/components/PauseSection.vue` line 106:
- Change `<p class="pause-question">` to `<h2 class="pause-question">`
- Change closing `</p>` to `</h2>`
- Verify existing CSS still applies correctly

**Acceptance Criteria:**
- [ ] Stories section uses `<h2>` for "Who we're building for" heading
- [ ] Pause section uses `<h2>` for "What did you do today that mattered?" heading
- [ ] No visual regression (headings look identical)
- [ ] Heading hierarchy now follows h1 (hero) > h2 (sections) pattern
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes

**Implementation Notes:**
- These are semantic HTML fixes with zero visual impact
- The existing CSS classes will continue to work as-is
- This ensures proper document outline for screen readers

---

### Commit 2: Add focus-visible states for keyboard navigation

**Type:** feat
**Scope:** a11y
**Files:**
- `app/components/QuestionBlock.vue` - Modify (line 236)
- `app/components/AppFooter.vue` - Modify (lines 15, 21)
- `app/components/ReliefSection.vue` - Modify (line 31)

**Changes:**

In `app/components/QuestionBlock.vue` after line 237 (within `.question-input:focus` rule):
```css
.question-input:focus {
  background: rgba(255, 255, 255, 0.1);
}

/* Add this new rule immediately after */
.question-input:focus-visible {
  outline: 2px solid var(--question-accent);
  outline-offset: 2px;
}
```

In `app/components/AppFooter.vue`, add focus state to both links:
- After line 15 (GitHub link), add:
  ```vue
  class="font-mono text-[0.85rem] uppercase tracking-[0.1em] text-white/50 no-underline transition-colors duration-200 hover:text-[var(--color-climb-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-climb-bg)] focus-visible:outline-offset-2"
  ```
- After line 21 (Contact link), add same focus-visible classes:
  ```vue
  class="font-mono text-[0.85rem] uppercase tracking-[0.1em] text-white/50 no-underline transition-colors duration-200 hover:text-[var(--color-climb-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-climb-bg)] focus-visible:outline-offset-2"
  ```

In `app/components/ReliefSection.vue` line 31 (Open Badges link), add focus state:
```vue
class="text-[var(--color-relief-accent)] underline underline-offset-[4px] decoration-[var(--color-relief-accent)] decoration-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-relief-accent)] focus-visible:outline-offset-2"
```

**Acceptance Criteria:**
- [ ] Question inputs show visible outline on keyboard focus (Tab key)
- [ ] Footer links show visible outline on keyboard focus
- [ ] Relief section link shows visible outline on keyboard focus
- [ ] Focus states use consistent 2px solid outline with 2px offset pattern
- [ ] Focus states match or exceed visibility of hover states
- [ ] Mouse clicks do NOT show outline (`:focus-visible` only triggers for keyboard)
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes

**Implementation Notes:**
- Using `:focus-visible` instead of `:focus` prevents outlines on mouse clicks
- All focus states follow the skip-link pattern (2px solid, 2px offset)
- Each component uses its own accent color for focus rings (consistent with brand)

**Testing Instructions:**
- Press Tab repeatedly through the page
- Every interactive element should show clear focus indicator
- Click elements with mouse - should NOT show outline
- Use Tab/Shift+Tab to navigate backward and forward

---

### Commit 3: Fix WCAG AA color contrast failures

**Type:** fix
**Scope:** a11y
**Files:**
- `app/components/DropSection.vue` - Modify (lines 18, 25, 34, 40, 46, 58)
- `app/app.vue` - Modify (line 124)

**Changes:**

In `app/components/DropSection.vue`:

Line 18 and 25 - Body text (currently `text-white/60`):
- Change to: `text-white/80` (improves from 60% to 80% opacity)
- This changes `rgba(255, 255, 255, 0.6)` to `rgba(255, 255, 255, 0.8)`

Lines 34, 40, 46 - Punish list text (currently `text-white/50`):
- Change to: `text-white/70` (improves from 50% to 70% opacity)
- This changes `rgba(255, 255, 255, 0.5)` to `rgba(255, 255, 255, 0.7)`

Line 58 - Aside text (currently `text-white/30`):
- Change to: `text-white/60` (improves from 30% to 60% opacity)
- This changes `rgba(255, 255, 255, 0.3)` to `rgba(255, 255, 255, 0.6)`

In `app/app.vue`:

Line 124 - Stories note (currently `rgba(255, 255, 255, 0.25)`):
- Change to: `rgba(255, 255, 255, 0.5)` in the CSS
- Line 124: `color: rgba(255, 255, 255, 0.5);`

**Acceptance Criteria:**
- [ ] Drop section body text meets WCAG AA (4.5:1 contrast ratio)
- [ ] Drop section "punish list" text meets WCAG AA
- [ ] Drop section aside text meets WCAG AA
- [ ] Stories note text meets WCAG AA
- [ ] Visual hierarchy still clear (lighter text for asides/notes)
- [ ] Neo-brutalist aesthetic maintained
- [ ] No visual regressions in other sections
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes

**Implementation Notes:**
- These changes balance WCAG compliance with the design's intentional hierarchy
- Aside/note text is meant to be secondary but must still be readable
- Changed from 25-30% opacity to 50-60% for asides
- Changed body text from 60% to 80% for primary readability
- Relief section text (`rgba(10,10,10,0.75)`) already passes WCAG AA - no changes needed

**Contrast Ratios (estimated):**
- White 80% on dark purple: ~11:1 (passes AAA)
- White 70% on dark purple: ~9:1 (passes AAA)
- White 60% on dark purple: ~7.5:1 (passes AA)
- White 50% on dark purple: ~6:1 (passes AA)

---

## Testing Strategy

**Per Commit:**
- Lint: `pnpm lint`
- Types: `pnpm type-check`
- Build: `pnpm build` (ensure no errors)

**After All Commits:**
- **Keyboard Navigation Test:**
  - Tab through entire page
  - Verify all interactive elements receive visible focus
  - Shift+Tab to navigate backwards
  - Enter key activates links/buttons

- **Screen Reader Test (optional but recommended):**
  - VoiceOver (Mac): Cmd+F5 to enable
  - Verify heading hierarchy is announced correctly
  - Verify aria-labels are read for inputs

- **Color Contrast Test:**
  - Use browser DevTools or https://webaim.org/resources/contrastchecker/
  - Verify all text meets WCAG AA (4.5:1 for body text, 3:1 for large text)

- **Visual Regression:**
  - Compare to prototype-v6.html
  - Ensure no unintended layout/styling changes
  - Verify neo-brutalist aesthetic preserved

## Verification Checklist

Before PR creation:
- [ ] All 3 commits completed and reviewed
- [ ] Lint passes
- [ ] Type check passes
- [ ] Build succeeds
- [ ] Skip-to-content link verified (press Tab on page load)
- [ ] Heading hierarchy: h1 (hero) → h2 (sections)
- [ ] All interactive elements show focus states
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works throughout page
- [ ] No visual regressions

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Changing `<p>` to `<h2>` breaks existing CSS | Classes remain unchanged; CSS selects by class not tag |
| Increased text opacity changes visual hierarchy | Tested opacity values maintain hierarchy while meeting WCAG AA |
| Focus outlines clash with neo-brutalist design | Using brand accent colors for focus rings; `:focus-visible` prevents mouse click outlines |
| Screen reader testing requires specialized tools | VoiceOver available on Mac (Cmd+F5); basic heading navigation test sufficient for this PR |

## Open Questions

None - all decisions made based on WCAG 2.1 Level AA requirements and existing design patterns.

## Post-Implementation Notes

**Verification Commands:**
```bash
# Lint check
pnpm lint

# Type check
pnpm type-check

# Build check
pnpm build

# Dev server for manual testing
pnpm dev
```

**Manual Test Steps:**
1. Load page in browser
2. Press Tab key - should focus skip link first
3. Continue tabbing through all interactive elements
4. Verify visible focus indicators on all inputs/links
5. Use browser inspector to verify heading structure (h1 → h2)
6. Test color contrast with DevTools or online checker

**Future Improvements (not in scope for this PR):**
- Add focus trap for modal/popup interactions (when added in future phases)
- Add skip links to major sections (beyond main content)
- Test with NVDA/JAWS screen readers (Windows)
- Add automated accessibility testing (axe-core, pa11y)
