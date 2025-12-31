# Implementation Plan: Component Migration from Prototype

**Issue:** #3
**Branch:** `feat/issue-3-component-migration`
**Complexity:** Complex
**Total Commits:** 10

## Overview

Migrate the fully-functional landing page from `prototype-v6.html` to Vue 3 components using Nuxt 3 and Tailwind 4. This creates a production-ready, maintainable component architecture while preserving the exact design, interactions, and neo-brutalist aesthetic from the prototype.

## Prerequisites

- [x] Nuxt 3 configured with Tailwind 4
- [x] All fonts self-hosted in `/public/fonts/`
- [x] Design tokens in `app/assets/css/main.css`
- [x] Prototype available at `prototype-v6.html`

## Prototype Reference

**File:** `prototype-v6.html`

**Sections:**
- **Hero:** Lines 71-130 (Electric yellow, Anybody 900, full viewport)
- **Drop:** Lines 134-205 (Gradient bg, purple accent, punish list)
- **Stories:** Lines 209-283 (Deep purple bg, giant faded names, 4 accent colors)
- **Questions:** Lines 285-405 (IntersectionObserver, localStorage, slide-in inputs)
- **Relief:** Lines 418-473 (Mint bg, centered content, values list)
- **Pause:** Lines 478-559 (Interactive input, "noted." feedback)
- **Badges:** Lines 574-664 (Grid layout, reads localStorage)
- **Footer:** Lines 718-771 (Black bg, flex layout, voice moment)

**Key Patterns:**
- `clamp()` for responsive typography
- CSS custom properties via `var(--color-*)`
- IntersectionObserver for scroll-triggered animations
- localStorage for persistence (client-only)
- Semantic HTML structure

## Atomic Commits

Each commit is a reviewable unit. Implementer completes one commit, returns diff for review, then proceeds to next.

---

### Commit 1: Create centralized content data file

**Type:** feat
**Scope:** data
**Files:**
- `app/data/content.ts` - Create

**Changes:**
- Export `stories` array with 4 story objects (Lina, Eva, Malik, Carmen & Kayla)
- Each story includes: `name`, `title`, `text`, `accentColor` (1-4), `marginLeft` (CSS value)
- Export `questions` array with 4 question objects
- Each question includes: `text`, `badgeKey`, `accentColor`, `slideFrom` ('left' | 'right'), `marginLeft`
- Export `BADGE_NAMES` map: `Record<string, string>` for badge key -> display name
- Use exact copy from prototype lines 871-945

**Example structure:**
```typescript
export const stories = [
  {
    name: 'Lina',
    title: 'The quiet victory',
    text: 'She reorganized the library...',
    accentColor: 1, // maps to --color-stories-accent-1
    marginLeft: '0'
  },
  // ... 3 more stories
]

export const questions = [
  {
    text: 'Do you have a quiet victory that deserves a mark?',
    badgeKey: 'quiet-victory',
    accentColor: 1,
    slideFrom: 'left' as const,
    marginLeft: '0'
  },
  // ... 3 more questions
]

export const BADGE_NAMES: Record<string, string> = {
  'quiet-victory': 'Quiet Victory',
  'thread-finder': 'Thread Finder',
  'skill-builder': 'Skill Builder',
  'knowledge-sharer': 'Knowledge Sharer'
}
```

**Acceptance Criteria:**
- [x] TypeScript file with proper exports
- [x] All 4 stories with exact copy from prototype
- [x] All 4 questions with exact copy from prototype
- [x] BADGE_NAMES map includes all 4 badges
- [x] `pnpm type-check` passes

---

### Commit 2: Create AppFooter component

**Type:** feat
**Scope:** footer
**Files:**
- `app/components/AppFooter.vue` - Create

**Changes:**
- Simple static footer, no props or state
- Black background (`bg-black`)
- Flexbox layout with `justify-between`, wraps on mobile
- Left: Links (GitHub, Contact) with hover effect
- Right: "See you next ride." with aside text
- Match prototype lines 718-771 exactly
- Use semantic `<footer>` tag
- DM Mono for links, Anybody for main text

**Implementation notes:**
- Use `font-mono`, `font-headline` from Tailwind config
- Links: `opacity-50 hover:text-[var(--color-climb-bg)]`
- Mobile: `flex-col items-start` on small screens
- Preserve voice moment: "(or don't — we'll be here)"

**Acceptance Criteria:**
- [x] Matches prototype footer design exactly
- [x] Semantic HTML (`<footer>`)
- [x] Responsive (flex wraps on mobile)
- [x] Accessible (proper link semantics)
- [x] `pnpm lint` passes
- [x] `pnpm type-check` passes

---

### Commit 3: Create Hero component

**Type:** feat
**Scope:** hero
**Files:**
- `app/components/Hero.vue` - Create

**Changes:**
- Full viewport height (`min-h-screen`)
- Yellow background (`bg-[var(--color-climb-bg)]`)
- Giant headline with Anybody 900, ultra-compressed line-height
- Five lines: "The" / "Roller" (indent) / "Coaster" (mega-indent) / "Is The" / "Path" (bleed-right)
- Tagline (bottom-right, absolute) in DM Mono
- Scroll hint (bottom-left, absolute) in DM Mono
- Match prototype lines 71-130 exactly

**Typography:**
- h1: `text-[clamp(4rem,20vw,28rem)] font-[900] leading-[0.8] -tracking-[0.06em] uppercase`
- `.indent`: `ml-[10vw]`
- `.mega-indent`: `ml-[25vw]`
- `.bleed-right`: `mr-[-15vw] text-right`

**Mobile responsive:**
- Remove indents on small screens
- Stack tagline below headline (relative positioning)
- Reduce font size clamp: `clamp(3rem,18vw,10rem)`

**Acceptance Criteria:**
- [x] Matches prototype hero exactly
- [x] Full viewport height on all screens
- [x] Typography scales with clamp()
- [x] Tagline and scroll hint positioned correctly
- [x] Mobile: indents removed, tagline stacked
- [x] `pnpm lint` passes
- [x] `pnpm type-check` passes

---

### Commit 4: Create DropSection component

**Type:** feat
**Scope:** drop
**Files:**
- `app/components/DropSection.vue` - Create

**Changes:**
- Gradient background from black to deep purple
- Purple accent headline: "Sometimes the fog rolls in."
- Body copy about losing momentum
- Punish list with strikethrough items (× Streak broken, × Progress lost, × Start over)
- "We know what that feels like." emphasis
- Voice moment aside: "(still here? good.)"
- Match prototype lines 134-205 exactly

**Styling:**
- Background: `bg-gradient-to-b from-[var(--color-drop-bg)] via-[var(--color-drop-bg)] to-[var(--color-drop-bg-end)]`
- h2: Anybody 700, purple accent color, `clamp(2.5rem,8vw,6rem)`
- Punish list: DM Mono, each item has purple `×` + strikethrough text
- Content container: `max-w-[800px] ml-[10%]` (remove on mobile)

**Accessibility:**
- Proper heading hierarchy (h2)
- Sufficient color contrast for purple on dark bg
- Semantic `<section>` tag

**Acceptance Criteria:**
- [x] Matches prototype drop section exactly
- [x] Gradient background renders correctly
- [x] Punish list styled with strikethrough
- [x] Voice moment "(still here? good.)" present
- [x] Mobile: remove left margin on content
- [x] `pnpm lint` passes
- [x] `pnpm type-check` passes

---

### Commit 5: Create ReliefSection component

**Type:** feat
**Scope:** relief
**Files:**
- `app/components/ReliefSection.vue` - Create

**Changes:**
- Mint green background (`bg-[var(--color-relief-bg)]`)
- Centered content (`max-w-[650px] mx-auto`)
- Headline: "What we're building"
- Body copy explaining the platform
- Inline values list (DM Mono): "Your pace · Your proof · Your data"
- Link to Open Badges with green underline
- Match prototype lines 418-473 exactly

**Styling:**
- h2: Anybody 900, `clamp(2.5rem,7vw,5rem)`, uppercase, tight tracking
- Body: Instrument Sans, comfortable line-height
- Values: DM Mono, green accent, inline with `·` separators
- Link: green underline (`decoration-[var(--color-relief-accent)]`), thick

**Implementation notes:**
- Values use `::after` pseudo-element for separators
- Last value removes separator (`:last-child::after { content: '' }`)
- External link should open in new tab with `rel="noopener"`

**Acceptance Criteria:**
- [x] Matches prototype relief section exactly
- [x] Mint background with centered content
- [x] Values list inline with separators
- [x] Open Badges link styled correctly
- [x] External link opens in new tab securely
- [x] `pnpm lint` passes
- [x] `pnpm type-check` passes

---

### Commit 6: Create StoryBlock component

**Type:** feat
**Scope:** story
**Files:**
- `app/components/StoryBlock.vue` - Create

**Changes:**
- Reusable component for individual stories
- Props: `name` (string), `title` (string), `text` (string), `accentColor` (1-4), `marginLeft` (string)
- Giant faded name background (absolute positioned)
- Story content overlay (relative z-index)
- Story title in accent color (uppercase, Anybody 700)
- Story text with `<strong>` tags rendered
- Match prototype lines 227-283 pattern

**Props interface:**
```typescript
interface Props {
  name: string
  title: string
  text: string
  accentColor: 1 | 2 | 3 | 4
  marginLeft?: string
}
```

**Styling:**
- Container: `relative mb-8 py-16` with dynamic `margin-left`
- Background name: `absolute top-0 left-[-5%] text-[clamp(6rem,20vw,16rem)] font-[900] opacity-15`
- Accent color computed: `--color-stories-accent-{accentColor}`
- Content: `relative z-10 max-w-[550px]`
- Title: Anybody 700, `clamp(1.5rem,4vw,2.5rem)`, uppercase
- Text: Instrument Sans, comfortable line-height, `<strong>` in white

**Implementation notes:**
- Use computed property for accent color CSS variable
- Render `text` with v-html to preserve `<strong>` tags (sanitize if needed)
- Mobile: remove margin-left override

**Acceptance Criteria:**
- [x] Reusable component with proper TypeScript props
- [x] Giant faded name background positioned correctly
- [x] Accent color applies to both name and title
- [x] Strong tags in text render as white/bold
- [x] Mobile: left margin removed
- [x] `pnpm lint` passes
- [x] `pnpm type-check` passes

---

### Commit 7: Create QuestionBlock component with IntersectionObserver

**Type:** feat
**Scope:** question
**Files:**
- `app/components/QuestionBlock.vue` - Create

**Changes:**
- Interactive question with scroll-triggered input reveal
- Props: `text` (string), `badgeKey` (string), `accentColor` (1-4), `slideFrom` ('left' | 'right'), `marginLeft` (string)
- IntersectionObserver detects when 80% visible
- Input slides in from left or right on desktop
- Input slides up from bottom on mobile
- Saves to localStorage with debounce (500ms)
- Shows "noted." confirmation when saved
- Match prototype lines 285-405 exactly

**Props interface:**
```typescript
interface Props {
  text: string
  badgeKey: string
  accentColor: 1 | 2 | 3 | 4
  slideFrom: 'left' | 'right'
  marginLeft?: string
}
```

**Behavior:**
- Load saved answer from localStorage on mount
- IntersectionObserver threshold: 0.8 (80% visible)
- Add `.in-view` class when visible
- Question text transitions to accent color when in view
- Input wrapper fades in and slides (opacity + transform)
- Input handler debounces 500ms before saving
- Show "noted." text 300ms after save

**Client-only:**
- Wrap localStorage access in `<ClientOnly>` or `onMounted()`
- No SSR for this component (browser-only features)

**Styling:**
- Question text: Anybody 900, `clamp(2rem,6vw,4.5rem)`, white -> accent color transition
- Input wrapper: absolute positioned on desktop, relative on mobile
- Input: DM Mono, semi-transparent bg, accent border, focus state
- Saved text: DM Mono, small, accent color, fade in

**Accessibility:**
- Proper label association (aria-label on input)
- Focus states clearly visible
- Reduced motion: disable transitions

**Acceptance Criteria:**
- [x] IntersectionObserver triggers at 80% visibility
- [x] Input slides from correct direction on desktop
- [x] Input slides up on mobile
- [x] localStorage saves/loads correctly
- [x] Debounce works (500ms delay)
- [x] "noted." confirmation shows after save
- [x] Reduced motion support
- [x] `pnpm lint` passes
- [x] `pnpm type-check` passes

---

### Commit 8: Create useBadges composable

**Type:** feat
**Scope:** composables
**Files:**
- `app/composables/useBadges.ts` - Create

**Changes:**
- Centralized localStorage management for badges
- Storage key prefix: `'rc-badge-'`
- Functions: `saveBadge()`, `loadBadge()`, `getAllBadges()`, `removeBadge()`
- Client-only (check `import.meta.client`)
- TypeScript typed returns

**API:**
```typescript
export function useBadges() {
  const STORAGE_PREFIX = 'rc-badge-'

  const saveBadge = (key: string, value: string) => {
    if (!import.meta.client) return
    localStorage.setItem(STORAGE_PREFIX + key, value)
  }

  const loadBadge = (key: string): string | null => {
    if (!import.meta.client) return null
    return localStorage.getItem(STORAGE_PREFIX + key)
  }

  const getAllBadges = (): Record<string, string> => {
    if (!import.meta.client) return {}
    const badges: Record<string, string> = {}
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        const badgeKey = key.replace(STORAGE_PREFIX, '')
        const value = localStorage.getItem(key)
        if (value) badges[badgeKey] = value
      }
    })
    return badges
  }

  const removeBadge = (key: string) => {
    if (!import.meta.client) return
    localStorage.removeItem(STORAGE_PREFIX + key)
  }

  return { saveBadge, loadBadge, getAllBadges, removeBadge }
}
```

**Acceptance Criteria:**
- [x] TypeScript types for all functions
- [x] Client-only guard on all localStorage access
- [x] Proper storage key prefix
- [x] `getAllBadges()` filters by prefix correctly
- [x] `pnpm type-check` passes

---

### Commit 9: Create BadgeCollection component

**Type:** feat
**Scope:** badges
**Files:**
- `app/components/BadgeCollection.vue` - Create

**Changes:**
- Displays grid of saved badges from localStorage
- Only renders if badges exist (conditional section)
- Grid layout: auto-fit, min 280px columns
- Each badge card: semi-transparent bg, colored left border, badge name, answer, date
- Border color matches story accent (1-4)
- Match prototype lines 574-664 exactly

**Behavior:**
- On mount: load all badges from `useBadges()`
- If no badges: hide entire section (or show empty state)
- If badges exist: render grid
- Current date for all badges (placeholder for now)
- Reactive: updates when localStorage changes

**Styling:**
- Section bg: `bg-[var(--color-stories-bg)]` (deep purple)
- Grid: `grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6`
- Card: `bg-white/5 border-2 border-white/15 p-6`
- Left border: `before:absolute before:left-0 before:top-0 before:w-1 before:h-full`
- Border colors:
  - `quiet-victory`: accent-1 (teal)
  - `thread-finder`: accent-2 (orange)
  - `skill-builder`: accent-3 (purple)
  - `knowledge-sharer`: accent-4 (sky)

**Card structure:**
- Badge name: Anybody 700, small, uppercase, accent color
- Answer: Instrument Sans, larger, white
- Date: DM Mono, tiny, dim white

**ClientOnly:**
- Wrap component in `<ClientOnly>` tag when used
- Or use `onMounted()` for data loading

**Acceptance Criteria:**
- [x] Only renders if badges exist
- [x] Grid layout responsive
- [x] Left border color matches badge type
- [x] Reads from localStorage via `useBadges()`
- [x] Updates reactively when badges change
- [x] Date placeholder shown for now
- [x] `pnpm lint` passes
- [x] `pnpm type-check` passes

---

### Commit 10: Update app.vue to compose all sections

**Type:** feat
**Scope:** layout
**Files:**
- `app/app.vue` - Modify

**Changes:**
- Replace `<NuxtWelcome />` with full landing page
- Import all components
- Import `stories` and `questions` from `app/data/content.ts`
- Render sections in correct order:
  1. Hero
  2. DropSection
  3. Stories section (header + loop StoryBlock/QuestionBlock)
  4. ReliefSection
  5. BadgeCollection (wrapped in ClientOnly)
  6. AppFooter
- Add skip-to-content link for a11y
- Stories section needs custom header and wrapper

**Template structure:**
```vue
<template>
  <div>
    <NuxtRouteAnnouncer />
    <a href="#main" class="skip-link">Skip to content</a>

    <Hero />
    <DropSection />

    <section id="main" class="stories">
      <p class="stories-header">Who we're building for</p>

      <template v-for="(story, i) in stories" :key="story.name">
        <StoryBlock v-bind="story" />
        <QuestionBlock v-bind="questions[i]" />
      </template>

      <p class="stories-note">Composite stories drawn from neurodivergent experiences.</p>
    </section>

    <ReliefSection />

    <ClientOnly>
      <BadgeCollection />
    </ClientOnly>

    <AppFooter />
  </div>
</template>
```

**Styling:**
- Stories section wrapper: deep purple bg, padding
- Stories header: giant Anybody 900 text
- Stories note: small DM Mono, dim, left margin
- Skip link: visually hidden until focus (a11y pattern)

**Skip link styles:**
```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-climb-bg);
  color: var(--color-climb-text);
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

**Acceptance Criteria:**
- [x] All components imported and rendered
- [x] Stories loop correctly (4 stories + 4 questions)
- [x] Skip-to-content link works (keyboard accessible)
- [x] ClientOnly wraps BadgeCollection
- [x] Page matches prototype layout exactly
- [x] NuxtRouteAnnouncer preserved for a11y
- [x] `pnpm lint` passes
- [x] `pnpm type-check` passes
- [x] Visual comparison to prototype shows match

---

## Testing Strategy

**Per Commit:**
- Lint: `pnpm lint`
- Types: `pnpm type-check`
- Dev server: `pnpm dev` (visual check)

**Final Verification:**
- Lint: `pnpm lint`
- Types: `pnpm type-check`
- Build: `pnpm build` (ensure production build works)
- Visual comparison: Side-by-side with `prototype-v6.html`
- Accessibility:
  - Keyboard navigation (Tab through all interactive elements)
  - Skip-to-content link
  - Heading hierarchy (h1 > h2 > h3)
  - Focus states visible
  - Screen reader test (VoiceOver)
- Responsive:
  - Mobile (375px)
  - Tablet (768px)
  - Desktop (1440px)
- Interactions:
  - Question inputs trigger on scroll
  - localStorage saves/loads
  - Badge collection updates
  - "noted." confirmations appear

## Verification Checklist

Before PR creation:
- [ ] All 10 commits completed and reviewed
- [ ] Lint passes (`pnpm lint`)
- [ ] Type check passes (`pnpm type-check`)
- [ ] Production build succeeds (`pnpm build`)
- [ ] Matches prototype design (visual comparison)
- [ ] Accessible:
  - [ ] Skip-to-content link works
  - [ ] Heading hierarchy correct (h1 > h2)
  - [ ] All interactive elements keyboard accessible
  - [ ] Focus states visible
  - [ ] Screen reader announces correctly
- [ ] Mobile responsive (375px, 768px, 1440px tested)
- [ ] Interactions work:
  - [ ] IntersectionObserver triggers questions
  - [ ] localStorage saves badge answers
  - [ ] Badge collection renders saved badges
  - [ ] "noted." confirmations appear

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| IntersectionObserver SSR issues | Wrap in `onMounted()`, check `import.meta.client` |
| localStorage hydration mismatch | Use `<ClientOnly>` for BadgeCollection, load in `onMounted()` |
| CSS custom properties not recognized | Use `var(--color-*)` syntax, ensure Tailwind 4 config correct |
| Component import auto-registration fails | Verify `components/` directory in `app/`, Nuxt auto-imports |
| Typography clamp() not responsive | Test on real devices, adjust min/max values if needed |
| Strong tags in story text XSS risk | Use `v-html` carefully, content is trusted (hardcoded), but note for future dynamic content |

## Open Questions

- **Pause section:** The prototype includes a "What did you do today that mattered?" section (lines 478-559). Should this be included in this migration, or saved for a future enhancement?
  - **Recommendation:** Defer to future PR. It's interactive but not critical for MVP.

- **"Where we are" section:** Prototype has an informational section (lines 668-713). Include now or later?
  - **Recommendation:** Include if simple static content, defer if requires dynamic GitHub API integration.

- **Animation polish:** Prototype has subtle transitions. Should we match these exactly or simplify?
  - **Recommendation:** Match exactly using CSS transitions. They're part of the design language.

- **Badge date logic:** Currently using "today's date" placeholder. Should badges store actual creation date?
  - **Recommendation:** For now, use current date. Future enhancement can track actual creation timestamp in localStorage.
