# Implementation Plan: Internationalization and German Translations

**Issue:** #22
**Branch:** `feat/issue-22-i18n-german`
**Complexity:** Medium
**Total Commits:** 6

## Overview

Add internationalization (i18n) support to the landing page using `nuxt-i18n-micro` module with German as the first additional language. English remains the default language at `/`, with German accessible at `/de`. The implementation maintains the neo-brutalist voice in both languages while ensuring SEO optimization through automatic meta tag handling.

## Prerequisites

- [x] All content is currently hardcoded in components
- [x] SEO meta configured with production URL
- [x] Content structure defined in `app/data/content.ts`
- [ ] German translations reviewed and approved (will be provided in translation file)

## Prototype Reference

Not applicable - this is a feature addition that doesn't change visual design. All existing components from `prototype-v6.html` sections remain visually identical.

## i18n Strategy

### Module Choice: nuxt-i18n-micro

**Why this module:**
- Lightweight (~5KB) - perfect for bilingual sites
- Built-in SEO support (automatic meta tags, hreflang)
- Browser language detection
- URL-based locale switching (`/` for en, `/de` for German)
- TypeScript support
- Works seamlessly with Nuxt 3 SSG

**URL Strategy:** `prefix_except_default`
- English (default): `https://rollercoaster.dev/`
- German: `https://rollercoaster.dev/de`

### Translation File Structure

```json
// locales/en.json
{
  "meta": {
    "title": "Rollercoaster.dev — Ride Yours",
    "description": "..."
  },
  "hero": {
    "lines": ["The", "Roller", "Coaster", "Is The", "Path"],
    "tagline": "..."
  },
  "drop": { ... },
  "stories": [ ... ],
  ...
}
```

## Atomic Commits

### Commit 1: Install and configure nuxt-i18n-micro

**Type:** chore
**Scope:** i18n
**Files:**
- `/Users/joeczarnecki/Code/rollercoaster.dev/landing/package.json` - Modify (dependency)
- `/Users/joeczarnecki/Code/rollercoaster.dev/landing/nuxt.config.ts` - Modify

**Changes:**
- Install `nuxt-i18n-micro` package
- Add i18n module to `nuxt.config.ts`
- Configure locales: `en` (default), `de`
- Set URL strategy: `prefix_except_default`
- Enable SEO auto-generation
- Enable browser language detection
- Set fallback locale to `en`

**Nuxt Config Addition:**
```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/seo', 'nuxt-i18n-micro'],

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'de', iso: 'de-DE', name: 'Deutsch' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: false,
      fallbackLocale: 'en'
    },
    meta: true, // Auto-generate SEO meta tags
    translationDir: 'locales',
    autoImportTranslationFunctions: true
  },

  // Update htmlAttrs to be dynamic (handled by i18n module)
  app: {
    head: {
      htmlAttrs: {
        // lang: 'en', // REMOVE - handled by i18n module
      },
      // ... rest unchanged
    }
  }
})
```

**Acceptance Criteria:**
- [ ] `nuxt-i18n-micro` installed successfully
- [ ] Module configured in `nuxt.config.ts`
- [ ] Dev server starts without errors
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes

**Commit Message:**
```
chore(i18n): install and configure nuxt-i18n-micro

Add i18n support with English (default) and German locales.
Configure URL strategy (prefix_except_default) and SEO automation.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

---

### Commit 2: Create English translation file (extract existing content)

**Type:** feat
**Scope:** i18n
**Files:**
- `/Users/joeczarnecki/Code/rollercoaster.dev/landing/locales/en.json` - Create

**Changes:**
- Create `locales/` directory
- Extract all hardcoded English strings from components
- Structure by section (meta, hero, drop, stories, questions, relief, pause, badges, footer, ui)
- Include story/question data from `app/data/content.ts`
- Preserve HTML tags in story text (use as raw HTML with i18n)

**Translation File Structure:**
```json
{
  "meta": {
    "title": "Rollercoaster.dev — Ride Yours",
    "description": "Progress tracking for minds that don't move in straight lines",
    "ogImageAlt": "Rollercoaster.dev — Progress tracking for minds that don't move in straight lines"
  },
  "skipLink": "Skip to content",
  "hero": {
    "lines": ["The", "Roller", "Coaster", "Is The", "Path"],
    "tagline": "progress tracking for minds that don't move in straight lines",
    "logoAlt": "Rollercoaster.dev logo"
  },
  "drop": {
    "headline": "The fog, the drift, the freefall — all of it — is part of your path.",
    "paragraphs": [
      "...",
      "...",
      "..."
    ],
    "punishList": [
      "...",
      "...",
      "..."
    ],
    "aside": "still here? good."
  },
  "stories": {
    "header": "Who we're building for",
    "note": "Composite stories drawn from neurodivergent experiences.",
    "list": [
      {
        "name": "Lina",
        "title": "The quiet victory",
        "text": "She reorganized the library's entire local history section while volunteering — months of quiet work she chose because she knew it mattered. When she finished, she made a badge for herself: <strong>\"Local History Archivist.\"</strong> No approval queue. No external validation. Just a private way to honor something only she understood the weight of."
      },
      // ... 3 more stories
    ]
  },
  "questions": {
    "placeholder": "Type your thought...",
    "noted": "noted.",
    "list": [
      "Do you have a quiet victory that deserves a mark?",
      "What's one thread you could pull from something you started?",
      "What skill have you been quietly building?",
      "Who could you teach what you've learned?"
    ]
  },
  "relief": {
    "headline": "What we're building",
    "paragraphs": [
      "...",
      "...",
      "..."
    ],
    "values": [
      {
        "label": "Neutral ground",
        "description": "..."
      },
      // ... 2 more values
    ],
    "linkText": "See the monorepo",
    "linkAria": "Visit the Rollercoaster.dev monorepo on GitHub"
  },
  "pause": {
    "returningMessage": "You've been here before",
    "question": "What's worth marking today?",
    "placeholder": "Start typing...",
    "badgesHeading": "Badges you might make"
  },
  "badges": {
    "heading": "Collect Yours",
    "intro": "Each interaction adds a badge to your collection. Come back anytime — they'll be here.",
    "names": {
      "quiet-victory": "Quiet Victory",
      "thread-finder": "Thread Finder",
      "skill-builder": "Skill Builder",
      "knowledge-sharer": "Knowledge Sharer"
    }
  },
  "footer": {
    "links": {
      "monorepo": "Monorepo",
      "openBadges": "Open Badges",
      "contact": "Contact"
    },
    "signOff": "Built for neurodivergent minds.",
    "aside": "Yours too."
  }
}
```

**Acceptance Criteria:**
- [ ] All English content extracted to `locales/en.json`
- [ ] JSON is valid and properly formatted
- [ ] HTML preserved in story text fields
- [ ] File structure mirrors component usage
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes

**Commit Message:**
```
feat(i18n): create English translation file

Extract all English content from components into centralized translation file.
Preserves existing content structure and neo-brutalist voice.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

---

### Commit 3: Create German translation file

**Type:** feat
**Scope:** i18n
**Files:**
- `/Users/joeczarnecki/Code/rollercoaster.dev/landing/locales/de.json` - Create

**Changes:**
- Create German translation file with same structure as `en.json`
- Translate all content while maintaining neo-brutalist voice in German
- Preserve HTML tags in story text
- Keep badge keys consistent (not translated)
- Translate meta tags for German SEO

**Key Translation Notes:**
- "noted." → "notiert." (maintains brevity)
- "still here? good." → "noch da? gut." (preserves tone)
- Neo-brutalist voice: direct, conversational, slightly irreverent in German
- Story names remain English (Lina, Eva, Malik, Carmen)
- Technical terms: "Open Badges" remains English (industry term)

**Acceptance Criteria:**
- [ ] German translations complete and accurate
- [ ] Neo-brutalist voice preserved in German
- [ ] HTML tags preserved in story text
- [ ] JSON valid and properly formatted
- [ ] Badge keys consistent with English version
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes

**Commit Message:**
```
feat(i18n): create German translation file

Add complete German translations maintaining neo-brutalist voice.
Preserves technical terms and HTML structure.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

---

### Commit 4: Update components to use i18n functions

**Type:** feat
**Scope:** i18n
**Files:**
- `/Users/joeczarnecki/Code/rollercoaster.dev/landing/app/app.vue` - Modify
- `/Users/joeczarnecki/Code/rollercoaster.dev/landing/app/components/HeroSection.vue` - Modify
- `/Users/joeczarnecki/Code/rollercoaster.dev/landing/app/components/DropSection.vue` - Modify
- `/Users/joeczarnecki/Code/rollercoaster.dev/landing/app/components/ReliefSection.vue` - Modify
- `/Users/joeczarnecki/Code/rollercoaster.dev/landing/app/components/PauseSection.vue` - Modify
- `/Users/joeczarnecki/Code/rollercoaster.dev/landing/app/components/BadgeCollection.vue` - Modify
- `/Users/joeczarnecki/Code/rollercoaster.dev/landing/app/components/AppFooter.vue` - Modify

**Changes:**
- Replace hardcoded strings with `$t()` translation function
- Update SEO meta in `app.vue` to use `useSeoMeta` with i18n
- Use `v-html` for story text containing HTML tags
- Ensure reactive locale switching works

**Example Changes:**

**app.vue:**
```vue
<script setup lang="ts">
import { stories, questions } from '~/data/content'
const { t } = useI18n()

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  ogTitle: () => t('meta.title'),
  ogDescription: () => t('meta.description'),
  // ... etc
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />

    <a href="#main" class="skip-link">{{ $t('skipLink') }}</a>

    <!-- ... -->

    <section id="main" class="stories">
      <h2 class="stories-header">{{ $t('stories.header') }}</h2>
      <!-- ... -->
      <p class="stories-note">{{ $t('stories.note') }}</p>
    </section>
  </div>
</template>
```

**HeroSection.vue:**
```vue
<script setup lang="ts">
const { t } = useI18n()
const lines = computed(() => t('hero.lines', { returnObjects: true }))
const { containerRef, lineRefs, fontSizes } = useFitText(lines.value, 20)
// ... rest unchanged
</script>

<template>
  <section ref="containerRef" class="hero ...">
    <img
      src="~/assets/RibbonRoller.svg"
      :alt="$t('hero.logoAlt')"
      class="..."
    />
    <h1 class="...">
      <span
        v-for="(line, index) in lines"
        :key="line"
        :ref="(el) => setLineRef(el, index)"
        class="..."
      >
        {{ line }}
      </span>
    </h1>
    <p class="tagline ...">
      {{ $t('hero.tagline') }}
    </p>
  </section>
</template>
```

**StoryBlock.vue and QuestionBlock.vue:**
- These receive content via props from data file
- Data file will be updated in next commit
- No changes needed in these components (they already accept props)

**Acceptance Criteria:**
- [ ] All components use `$t()` or `t()` functions
- [ ] No hardcoded English/German strings remain
- [ ] SEO meta tags are reactive to locale
- [ ] HTML in stories renders correctly with `v-html`
- [ ] Dev server runs without errors
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes

**Commit Message:**
```
feat(i18n): integrate translation functions in components

Replace hardcoded strings with i18n translation functions.
Update SEO meta to be reactive to locale changes.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

---

### Commit 5: Update content data file to use i18n

**Type:** feat
**Scope:** i18n
**Files:**
- `/Users/joeczarnecki/Code/rollercoaster.dev/landing/app/data/content.ts` - Modify

**Changes:**
- Convert static data exports to composables that use i18n
- Create `useStories()` and `useQuestions()` composables
- Return reactive computed arrays based on current locale
- Preserve TypeScript interfaces
- Keep badge keys language-agnostic

**Implementation:**
```typescript
/**
 * Centralized content data for landing page
 * Now using i18n for translations
 */

export interface Story {
  name: string
  title: string
  text: string
  accentColor: 1 | 2 | 3 | 4
}

export interface Question {
  text: string
  badgeKey: string
  accentColor: 1 | 2 | 3 | 4
}

/**
 * Get translated stories
 */
export function useStories() {
  const { t } = useI18n()

  return computed<Story[]>(() =>
    (t('stories.list', { returnObjects: true }) as any[]).map((story, i) => ({
      ...story,
      accentColor: (i % 4 + 1) as 1 | 2 | 3 | 4
    }))
  )
}

/**
 * Get translated questions
 */
export function useQuestions() {
  const { t } = useI18n()

  const questionTexts = computed(() =>
    t('questions.list', { returnObjects: true }) as string[]
  )

  const badgeKeys = ['quiet-victory', 'thread-finder', 'skill-builder', 'knowledge-sharer']

  return computed<Question[]>(() =>
    questionTexts.value.map((text, i) => ({
      text,
      badgeKey: badgeKeys[i],
      accentColor: (i % 4 + 1) as 1 | 2 | 3 | 4
    }))
  )
}

/**
 * Badge names (language-agnostic keys)
 */
export const BADGE_KEYS = {
  quietVictory: 'quiet-victory',
  threadFinder: 'thread-finder',
  skillBuilder: 'skill-builder',
  knowledgeSharer: 'knowledge-sharer',
} as const

/**
 * Get translated badge names
 */
export function useBadgeNames() {
  const { t } = useI18n()

  return computed(() => ({
    [BADGE_KEYS.quietVictory]: t('badges.names.quiet-victory'),
    [BADGE_KEYS.threadFinder]: t('badges.names.thread-finder'),
    [BADGE_KEYS.skillBuilder]: t('badges.names.skill-builder'),
    [BADGE_KEYS.knowledgeSharer]: t('badges.names.knowledge-sharer'),
  }))
}
```

**Update app.vue:**
```vue
<script setup lang="ts">
const stories = useStories()
const questions = useQuestions()
// ...
</script>
```

**Acceptance Criteria:**
- [ ] Data functions return reactive translated content
- [ ] TypeScript types preserved
- [ ] Badge keys remain language-agnostic
- [ ] Content updates when locale changes
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes

**Commit Message:**
```
feat(i18n): convert content data to reactive composables

Replace static exports with i18n-aware composables.
Enables reactive content updates on locale change.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

---

### Commit 6: Add language switcher component

**Type:** feat
**Scope:** i18n
**Files:**
- `/Users/joeczarnecki/Code/rollercoaster.dev/landing/app/components/LanguageSwitcher.vue` - Create
- `/Users/joeczarnecki/Code/rollercoaster.dev/landing/app/components/AppFooter.vue` - Modify

**Changes:**
- Create `LanguageSwitcher.vue` component
- Add to footer (bottom-right position)
- Neo-brutalist styling: simple toggle, bold borders
- Accessible: proper labels, keyboard navigation
- Shows current language, switches to other

**Component Implementation:**
```vue
<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() =>
  locales.value.filter(l => l.code !== locale.value)
)

function switchLocale(code: string) {
  setLocale(code)
}
</script>

<template>
  <nav
    class="language-switcher"
    aria-label="Language switcher"
  >
    <button
      v-for="loc in availableLocales"
      :key="loc.code"
      class="lang-button"
      :aria-label="`Switch to ${loc.name}`"
      @click="switchLocale(loc.code)"
    >
      {{ loc.code.toUpperCase() }}
    </button>
  </nav>
</template>

<style scoped>
.language-switcher {
  display: flex;
  gap: 0.5rem;
}

.lang-button {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 2px solid currentColor;
  color: var(--color-white);
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.2s;
}

.lang-button:hover,
.lang-button:focus {
  background: var(--color-white);
  color: var(--color-relief-bg);
  outline: 2px solid var(--color-white);
  outline-offset: 2px;
}

.lang-button:active {
  transform: translateY(2px);
}
</style>
```

**Update AppFooter.vue:**
Add language switcher next to footer links (top-right area):
```vue
<template>
  <footer class="footer">
    <div class="footer-content">
      <nav class="footer-nav">
        <!-- existing links -->
      </nav>
      <LanguageSwitcher />
    </div>
    <!-- rest unchanged -->
  </footer>
</template>
```

**Acceptance Criteria:**
- [ ] Language switcher renders in footer
- [ ] Clicking switches locale immediately
- [ ] Content updates reactively
- [ ] URL changes to `/de` or `/` based on locale
- [ ] Keyboard accessible (tab + enter)
- [ ] Focus states visible
- [ ] Neo-brutalist styling consistent with site
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes

**Commit Message:**
```
feat(i18n): add language switcher to footer

Add neo-brutalist language toggle component.
Enables switching between English and German.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

---

## Testing Strategy

### Development Testing
```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Test both locales:
# - http://localhost:3000 (English)
# - http://localhost:3000/de (German)
```

### Code Quality
```bash
# Lint
pnpm lint

# Type check
pnpm type-check
```

### Build Testing
```bash
# Build for production
pnpm build

# Preview production build
pnpm preview

# Verify both locale routes exist in .output/public/
ls -la .output/public/de/
```

### Manual Testing Checklist

**English (`/`):**
- [ ] All sections display English content
- [ ] Meta tags in English (view source)
- [ ] Stories render with HTML formatting
- [ ] Question placeholders in English
- [ ] "noted." confirmation appears
- [ ] Badge names in English
- [ ] Footer links in English

**German (`/de`):**
- [ ] All sections display German content
- [ ] Meta tags in German (view source)
- [ ] Stories render with HTML formatting
- [ ] Question placeholders in German
- [ ] "notiert." confirmation appears
- [ ] Badge names in German
- [ ] Footer links in German

**Language Switching:**
- [ ] Switcher visible in footer
- [ ] Clicking EN/DE switches immediately
- [ ] URL changes to match locale
- [ ] All content updates (no page refresh)
- [ ] Browser back button works correctly
- [ ] Locale persists in cookie

**SEO Verification:**
- [ ] `<html lang="en">` on English pages
- [ ] `<html lang="de">` on German pages
- [ ] `hreflang` tags present (view source)
- [ ] Meta descriptions translated
- [ ] OG tags translated

**Accessibility:**
- [ ] Language switcher keyboard accessible
- [ ] Focus states visible
- [ ] Screen reader announces locale
- [ ] Skip link still works
- [ ] All aria-labels translated

**LocalStorage:**
- [ ] Pause section localStorage keys remain language-agnostic
- [ ] Data persists across locale switches
- [ ] Badge collection persists across locale switches

---

## Verification Checklist

Before PR creation:
- [ ] All 6 commits completed and reviewed
- [ ] Lint passes for all commits
- [ ] Type check passes for all commits
- [ ] English content unchanged from original
- [ ] German translations reviewed and approved
- [ ] Both locales build successfully
- [ ] Language switcher works in both directions
- [ ] SEO meta tags generated correctly
- [ ] URLs follow strategy (`/` for en, `/de` for de)
- [ ] Accessible (keyboard navigation, screen readers)
- [ ] Neo-brutalist voice preserved in both languages
- [ ] Mobile responsive (switcher works on mobile)
- [ ] localStorage remains language-agnostic

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Breaking changes to content structure | Extract to translations incrementally, test each component |
| German voice loses neo-brutalist tone | Review translations carefully, maintain directness and brevity |
| SEO regression on existing `/` routes | Use `prefix_except_default` strategy - English stays at `/` |
| Build size increase | `nuxt-i18n-micro` is lightweight (~5KB), minimal impact |
| LocalStorage keys conflict across locales | Keep badge keys language-agnostic, don't translate technical IDs |
| HTML in translations breaks rendering | Use `v-html` for story text, test rendering in both locales |
| Browser detection redirects unexpectedly | Set `alwaysRedirect: false` - only redirect first visit |
| TypeScript errors with i18n functions | Use proper return types and `returnObjects: true` for arrays/objects |

---

## Open Questions

**For user to confirm before implementation:**

1. **German translations:** Should we have the German content professionally reviewed, or is initial implementation acceptable with refinement later?

2. **Language switcher placement:** Footer bottom-right is proposed. Alternative: header top-right near logo?

3. **Browser detection behavior:** Currently configured to detect browser language on first visit only (no redirect on subsequent visits). Is this the preferred UX?

4. **Additional languages:** Plan to add more languages after German? If so, should switcher design accommodate 3+ languages now?

5. **Translatable URLs:** Should we translate slugs (e.g., `/de/uber-uns` vs `/de/about`)? Currently Phase 0 has no additional pages, but plan ahead?

---

## Notes

### Why nuxt-i18n-micro over @nuxtjs/i18n?

- **Size:** 5KB vs ~50KB - significant for static landing page
- **Complexity:** Simpler API, easier to maintain
- **Features:** Has everything we need (SEO, routing, detection)
- **Performance:** Faster build times, smaller bundle

### German Translation Guidelines

**Neo-brutalist voice in German:**
- **Direct:** "Die Achterbahn ist der Weg" (not "Die Achterbahn könnte der Weg sein")
- **Conversational:** "noch da? gut." maintains the casual checkpoint vibe
- **Slightly irreverent:** Keep the edge, avoid corporate polish

**Technical terms to keep in English:**
- "Open Badges" (industry standard)
- Badge names in badge keys (technical IDs)

**HTML preservation:**
- `<strong>` tags stay in German story text
- Test rendering with `v-html` in both locales

### Future Extensions

This implementation supports:
- Adding more languages (just add locale file + config)
- Per-page translations (when Phase 1 adds routes)
- Translation management tools (if needed at scale)
- Automatic locale detection refinement

---

## Implementation Order Rationale

1. **Config first** - Sets up infrastructure
2. **English extraction** - Establishes structure, zero functional change
3. **German translation** - Adds new content using established structure
4. **Component integration** - Makes translations active
5. **Data composables** - Enables reactive content
6. **Language switcher** - User-facing control

Each commit is independently testable and leaves the app in a working state.
