# Implementation Plan: BadgeCollection Refresh on Scroll

**Issue:** #23
**Branch:** `feat/issue-23-badge-refresh`
**Complexity:** Simple
**Total Commits:** 1

## Overview

Add IntersectionObserver to BadgeCollection component to refresh badges when the section scrolls into view. This ensures badges earned during the current session appear without requiring a page refresh.

## Prerequisites

- [ ] QuestionBlock.vue IntersectionObserver pattern exists (already in codebase)
- [ ] useBadges composable supports getAllBadges() (already exists)

## Prototype Reference

- Section: BadgeCollection (existing component)
- Pattern source: QuestionBlock.vue IntersectionObserver implementation (lines 50-84)
- Key patterns: IntersectionObserver setup, cleanup on unmount, client-only execution

## Atomic Commits

### Commit 1: feat(badges): refresh badges when section scrolls into view

**Type:** feat
**Scope:** badges

**Files:**
- `app/components/BadgeCollection.vue` - Modify

**Changes:**
1. Add template ref `badgeSection` to the `<section>` element
2. Add `isInView` reactive state (not currently used for styling, but follows QuestionBlock pattern)
3. Move badge loading logic into a `refreshBadges()` function
4. Call `refreshBadges()` on mount (maintains current behavior)
5. Set up IntersectionObserver in `onMounted`:
   - Wrap in `import.meta.client` check
   - Use 100ms setTimeout to ensure initial render completes
   - Configure observer with `threshold: 0` and `rootMargin: '-40% 0px -40% 0px'` (matches QuestionBlock)
   - On intersection, set `isInView.value = true` and call `refreshBadges()`
   - Handle scroll-past detection (set `isInView.value = false`)
   - Call `observer.disconnect()` in `onUnmounted()`

**Acceptance Criteria:**
- [ ] Template ref `badgeSection` added to `<section>` element
- [ ] IntersectionObserver triggers when section enters middle 20% of viewport
- [ ] Badges refresh when scrolled into view (can verify by adding badge, scrolling to section)
- [ ] Observer properly cleaned up on unmount
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes
- [ ] Follows exact pattern from QuestionBlock.vue (consistency)

**Implementation Notes:**

The logic flow should be:

```typescript
// 1. Add refs
const badgeSection = ref<HTMLElement | null>(null)
const isInView = ref(false)

// 2. Extract loading logic
function refreshBadges() {
  const { getAllBadges } = useBadges()
  badges.value = getAllBadges()
}

// 3. Update onMounted
onMounted(() => {
  // Initial load
  refreshBadges()

  // Setup observer
  if (import.meta.client) {
    if (badgeSection.value) {
      const element = badgeSection.value
      setTimeout(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                isInView.value = true
                refreshBadges() // <-- Key addition
              }
              else {
                const rect = entry.boundingClientRect
                if (rect.bottom < 0 || rect.top > window.innerHeight) {
                  isInView.value = false
                }
              }
            })
          },
          {
            threshold: 0,
            rootMargin: '-40% 0px -40% 0px',
          },
        )

        observer.observe(element)

        onUnmounted(() => {
          observer.disconnect()
        })
      }, 100)
    }
  }
})
```

## Testing Strategy

- Lint: `pnpm lint`
- Types: `pnpm type-check`
- Manual testing:
  1. Open page in dev mode
  2. Scroll to QuestionBlock sections and fill out answers
  3. Scroll to BadgeCollection section
  4. Verify badges appear without page refresh
  5. Scroll away and back - badges should refresh again
- Accessibility: No interactive elements added, section remains semantic
- Performance: Observer properly disconnects on unmount (no memory leaks)

## Verification Checklist

Before PR creation:
- [ ] Commit completed and reviewed
- [ ] Lint passes
- [ ] Type check passes
- [ ] Manual test confirms badges refresh on scroll
- [ ] Observer cleanup verified (no console errors on unmount)
- [ ] Code matches QuestionBlock pattern exactly

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Badges refresh too frequently | Use same rootMargin as QuestionBlock (-40%) to only trigger in middle viewport |
| Observer not cleaned up | Follow QuestionBlock pattern with onUnmounted() disconnect |
| Client/server mismatch | Wrap observer in `import.meta.client` check |

## Open Questions

None - this is a straightforward application of an existing pattern.
