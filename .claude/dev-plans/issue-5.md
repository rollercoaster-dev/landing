# Implementation Plan: SEO & Branding

**Issue:** #5
**Branch:** `feat/issue-5-seo-branding`
**Complexity:** Medium
**Total Commits:** 4

## Overview

Configure comprehensive SEO meta tags using `useSeoMeta()` in app.vue and enhance branding assets (favicon, OG image, apple-touch-icon). This improves social sharing, search engine visibility, and brand consistency across platforms using the neo-brutalist yellow/black color scheme.

## Prerequisites

- [x] @nuxtjs/seo module already installed (v3.3.0)
- [x] Basic site config exists in nuxt.config.ts
- [x] Brand colors defined in design direction (#ffe50c yellow, #0a0a0a black)

## Prototype Reference

- Section: N/A (SEO/meta implementation)
- Key patterns: Neo-brutalist yellow (#ffe50c) and black (#0a0a0a) color scheme
- Voice: "Ride Yours" tagline, conversational asides

## Atomic Commits

Each commit is a reviewable unit. Implementer completes one commit, returns diff for review, then proceeds to next.

### Commit 1: Configure useSeoMeta in app.vue

**Type:** feat
**Scope:** seo
**Files:**
- `app/app.vue` - Modify

**Changes:**
- Add `useSeoMeta()` composable in `<script setup>` section
- Configure title: "Rollercoaster.dev — Ride Yours"
- Configure description: "Progress tracking for minds that don't move in straight lines"
- Add Open Graph meta tags:
  - `ogTitle`: "Rollercoaster.dev — Ride Yours"
  - `ogDescription`: "Progress tracking for minds that don't move in straight lines"
  - `ogUrl`: "https://rollercoaster.dev"
  - `ogType`: "website"
  - `ogImage`: "https://rollercoaster.dev/og-image.png"
  - `ogImageAlt`: "Rollercoaster.dev - Progress tracking for minds that don't move in straight lines"
- Add Twitter Card meta tags:
  - `twitterCard`: "summary_large_image"
  - `twitterTitle`: "Rollercoaster.dev — Ride Yours"
  - `twitterDescription`: "Progress tracking for minds that don't move in straight lines"
  - `twitterImage`: "https://rollercoaster.dev/og-image.png"
  - `twitterImageAlt`: "Rollercoaster.dev - Progress tracking for minds that don't move in straight lines"
- Add theme color: `themeColor`: "#ffe50c" (the climb yellow)

**Acceptance Criteria:**
- [ ] `useSeoMeta()` called in app.vue `<script setup>` section
- [ ] All meta tags defined as specified above
- [ ] Theme color matches brand yellow (#ffe50c)
- [ ] No TypeScript errors
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes

**Implementation Notes:**
- Place `useSeoMeta()` call after the existing imports in `<script setup>`
- Reference: https://nuxt.com/modules/seo#useseometa-composable

---

### Commit 2: Add HTML lang attribute in nuxt.config

**Type:** feat
**Scope:** seo
**Files:**
- `nuxt.config.ts` - Modify

**Changes:**
- Add `app.head.htmlAttrs.lang` configuration set to 'en'
- This ensures proper language declaration for accessibility and SEO

**Acceptance Criteria:**
- [ ] `app.head.htmlAttrs.lang: 'en'` added to nuxt.config.ts
- [ ] Config structure follows Nuxt 3 conventions
- [ ] No TypeScript errors
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes

**Implementation Notes:**
- Add within the `defineNuxtConfig()` object
- Structure:
  ```ts
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  }
  ```

---

### Commit 3: Add favicon and apple-touch-icon link tags

**Type:** feat
**Scope:** seo
**Files:**
- `nuxt.config.ts` - Modify

**Changes:**
- Add `app.head.link` array with icon link tags:
  - `{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }`
  - `{ rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }`

**Acceptance Criteria:**
- [ ] Link tags added to `app.head.link` array
- [ ] Favicon references existing `/favicon.ico`
- [ ] Apple touch icon references `/apple-touch-icon.png` (to be created in next commit)
- [ ] No TypeScript errors
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes

**Implementation Notes:**
- Extends the `app.head` object from Commit 2
- These link tags work alongside @nuxtjs/seo module

---

### Commit 4: Add placeholder asset specifications

**Type:** docs
**Scope:** seo
**Files:**
- `public/ASSETS_NEEDED.md` - Create

**Changes:**
- Create documentation file specifying required assets:
  - `apple-touch-icon.png` (180x180)
  - `og-image.png` (1200x630)
- Include design specifications for each:
  - Neo-brutalist style
  - Primary color: #ffe50c (yellow)
  - Text color: #0a0a0a (near black)
  - Typography: Anybody (display font)
- Note that `favicon.ico` already exists at 32x32

**Acceptance Criteria:**
- [ ] Documentation file created in `public/` directory
- [ ] Specifications include exact dimensions
- [ ] Design direction clearly references neo-brutalist style
- [ ] Colors specified with hex codes
- [ ] Font family noted (Anybody for display text)
- [ ] File notes that favicon.ico already exists
- [ ] `pnpm lint` passes

**Implementation Notes:**
- This is a documentation-only commit
- Actual asset creation will happen in a separate design task
- Implementer should NOT create actual image files
- Format as markdown for clarity

**Asset Specifications to Include:**

```markdown
# Brand Assets Needed

This file documents brand assets that need to be created for Rollercoaster.dev.

## Existing Assets

- `favicon.ico` (32x32) - Already exists

## Assets to Create

### Apple Touch Icon
- **Filename:** `apple-touch-icon.png`
- **Dimensions:** 180x180 pixels
- **Format:** PNG with transparency
- **Design:**
  - Neo-brutalist style
  - Background: #ffe50c (The Climb yellow)
  - Text/icon: #0a0a0a (near black)
  - Typography: Anybody font (if text is used)
  - Should work at small sizes (appears on iOS home screen)

### Open Graph Image
- **Filename:** `og-image.png`
- **Dimensions:** 1200x630 pixels
- **Format:** PNG
- **Design:**
  - Neo-brutalist style
  - Background: #ffe50c (The Climb yellow)
  - Text: #0a0a0a (near black)
  - Typography: Anybody font family (900 weight)
  - Content suggestions:
    - "ROLLERCOASTER.DEV" in bold display type
    - "Ride Yours" tagline
    - "Progress tracking for minds that don't move in straight lines"
  - Should be bold, high-contrast, and readable when shown as thumbnail

## Design References

- See `docs/DESIGN_DIRECTION.md` for complete brand guidelines
- Prototype: `prototype-v6.html` for typography examples
- Voice: Direct, conversational, neo-brutalist aesthetic
```

---

## Testing Strategy

**Per Commit:**
- Lint: `pnpm lint`
- Types: `pnpm type-check`
- Build: `pnpm build` (ensure no errors)

**After All Commits:**
- Visual inspection: View page source to verify meta tags render
- Social share preview: Use https://www.opengraph.xyz/ to test OG image URL
- Accessibility: HTML lang attribute present in rendered output
- Mobile: Verify apple-touch-icon reference (will show placeholder until asset created)

## Verification Checklist

Before PR creation:
- [ ] All 4 commits completed and reviewed
- [ ] Lint passes
- [ ] Type check passes
- [ ] Build succeeds without errors
- [ ] Meta tags visible in page source
- [ ] HTML lang='en' attribute present
- [ ] Icon link tags present in head
- [ ] Asset documentation is clear and actionable
- [ ] No actual image files created (only documentation)

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| OG image path referenced but file doesn't exist yet | Documented in ASSETS_NEEDED.md; separate design task will create it; 404 on OG image is acceptable until then |
| Apple touch icon path referenced but file doesn't exist | Same as above; iOS will gracefully fall back to default |
| useSeoMeta() might conflict with existing site config | @nuxtjs/seo module designed to work with both; site config provides defaults, useSeoMeta provides page-specific overrides |
| Theme color might not match exact brand color | Using exact hex from DESIGN_DIRECTION.md (#ffe50c) |

## Open Questions

None - all decisions made based on existing brand guidelines and research findings.

## Post-Implementation Notes

After this PR merges:
- Create follow-up issue for actual asset design (apple-touch-icon.png and og-image.png)
- Designer/implementer should reference `public/ASSETS_NEEDED.md` for specifications
- Test social share previews once OG image is created
