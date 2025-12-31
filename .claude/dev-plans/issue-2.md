# Implementation Plan: Nuxt Project Setup

**Issue:** #2
**Branch:** `feat/issue-2-nuxt-setup`
**Complexity:** Medium
**Total Commits:** 5

## Overview

Initialize a Nuxt 3 project with Tailwind 4 (CSS-first configuration), SEO modules, and the three custom font families from the prototype. This establishes the foundation for Phase 0 - Static Landing Page.

## Prerequisites

- [x] Node.js and pnpm installed via mise
- [x] Git repository initialized
- [x] Prototype v6 available for reference (`prototype-v6.html`)
- [x] Design tokens documented in prototype

## Prototype Reference

- **Section:** Global styles (lines 12-63)
- **Lines:** 8-10 (fonts), 13-40 (color tokens), 42-66 (base styles)
- **Key patterns:**
  - CSS custom properties for color tokens
  - Font families: Anybody (headlines), DM Mono (mono), Instrument Sans (body)
  - Base font size: 18px (root)
  - Selection color: purple accent on white

## Atomic Commits

Each commit is a reviewable unit. Implementer completes one commit, returns diff for review, then proceeds to next.

### Commit 1: feat(init): initialize Nuxt 3 project

**Type:** feat
**Scope:** init
**Files:**
- `app.vue` - Create
- `nuxt.config.ts` - Create
- `package.json` - Create
- `.gitignore` - Modify (extend with Nuxt-specific ignores)
- `.nuxt/` - Generated (gitignored)
- `node_modules/` - Generated (gitignored)

**Changes:**
- Run `npx nuxi@latest init . --force` to initialize in existing directory
- Accept all defaults (Nuxt 3, TypeScript)
- Remove example pages/components if any
- Verify minimal app.vue exists

**Acceptance Criteria:**
- [ ] `pnpm dev` starts dev server successfully
- [ ] Localhost shows default Nuxt welcome page
- [ ] No TypeScript errors
- [ ] No lint errors
- [ ] `.gitignore` excludes `.nuxt/`, `node_modules/`, `.output/`

**Command:**
```bash
cd /Users/joeczarnecki/Code/rollercoaster.dev/landing
npx nuxi@latest init . --force
```

---

### Commit 2: feat(tailwind): install and configure Tailwind 4 via Vite plugin

**Type:** feat
**Scope:** tailwind
**Files:**
- `package.json` - Modify (add tailwind dependencies)
- `nuxt.config.ts` - Modify (add Vite plugin)
- `assets/css/main.css` - Create (basic Tailwind directives only)

**Changes:**
- Install Tailwind 4 beta: `pnpm add -D tailwindcss@next @tailwindcss/vite`
- Do NOT install `@nuxtjs/tailwindcss` module (incompatible with v4)
- Create `assets/css/main.css` with basic structure:
  ```css
  @import "tailwindcss";

  /* Design tokens will be added in next commit */
  ```
- Update `nuxt.config.ts`:
  ```typescript
  import tailwindcss from '@tailwindcss/vite'

  export default defineNuxtConfig({
    compatibilityDate: '2024-12-31',
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    vite: {
      plugins: [tailwindcss()],
    },
  })
  ```

**Acceptance Criteria:**
- [ ] `pnpm dev` starts without errors
- [ ] Tailwind classes work (test with basic utility)
- [ ] No `tailwind.config.js` file exists (CSS-first config)
- [ ] `pnpm build` completes successfully
- [ ] `pnpm type-check` passes

**Command:**
```bash
pnpm add -D tailwindcss@next @tailwindcss/vite
```

---

### Commit 3: style(tokens): add design tokens via CSS @theme directive

**Type:** style
**Scope:** tokens
**Files:**
- `assets/css/main.css` - Modify

**Changes:**
- Add all color tokens from prototype using `@theme` directive
- Add custom font families (font URLs added in next commit)
- Add base styles (html font-size, body defaults, selection color)
- Reference prototype lines 13-66 for exact values

**CSS Structure:**
```css
@import "tailwindcss";

@theme {
  /* Color Tokens */
  --color-climb-bg: #ffe50c;
  --color-climb-text: #0a0a0a;

  --color-drop-bg: #0a0a0a;
  --color-drop-bg-end: #1a1033;
  --color-drop-text: #fafafa;
  --color-drop-accent: #a78bfa;

  --color-stories-bg: #1a1033;
  --color-stories-text: #fafafa;
  --color-stories-accent-1: #00d4aa;
  --color-stories-accent-2: #ff6b35;
  --color-stories-accent-3: #a855f7;
  --color-stories-accent-4: #38bdf8;

  --color-relief-bg: #d4f4e7;
  --color-relief-text: #0a0a0a;
  --color-relief-accent: #059669;

  --color-white: #fafafa;
  --color-black: #0a0a0a;

  /* Font Families (will be loaded via Google Fonts module) */
  --font-headline: 'Anybody', sans-serif;
  --font-mono: 'DM Mono', monospace;
  --font-body: 'Instrument Sans', system-ui, sans-serif;
}

/* Base Styles */
html {
  font-size: 18px;
}

body {
  font-family: theme('--font-body');
  background: theme('--color-climb-bg');
  color: theme('--color-climb-text');
  overflow-x: hidden;
}

::selection {
  background: theme('--color-drop-accent');
  color: theme('--color-white');
}
```

**Acceptance Criteria:**
- [ ] All color tokens from prototype are defined
- [ ] Font family tokens defined (fonts loaded in next commit)
- [ ] Base styles match prototype
- [ ] `pnpm build` succeeds
- [ ] `pnpm lint` passes
- [ ] No CSS errors in console

---

### Commit 4: feat(seo): install and configure @nuxtjs/seo module

**Type:** feat
**Scope:** seo
**Files:**
- `package.json` - Modify
- `nuxt.config.ts` - Modify

**Changes:**
- Install SEO module: `npx nuxi module add @nuxtjs/seo`
- Configure basic site metadata in `nuxt.config.ts`:
  ```typescript
  export default defineNuxtConfig({
    // ... existing config

    site: {
      url: 'https://rollercoaster.dev',
      name: 'Rollercoaster.dev',
      description: 'Progress tracking for minds that don\'t move in straight lines',
      defaultLocale: 'en',
    },

    modules: ['@nuxtjs/seo'],
  })
  ```

**Acceptance Criteria:**
- [ ] `@nuxtjs/seo` appears in modules array
- [ ] Site metadata configured
- [ ] `pnpm build` succeeds
- [ ] `pnpm type-check` passes
- [ ] Meta tags visible in page source

**Command:**
```bash
npx nuxi module add @nuxtjs/seo
```

---

### Commit 5: feat(fonts): configure Google Fonts module with custom fonts

**Type:** feat
**Scope:** fonts
**Files:**
- `package.json` - Modify
- `nuxt.config.ts` - Modify

**Changes:**
- Install Google Fonts module: `npx nuxi module add @nuxtjs/google-fonts`
- Configure the three font families with exact weights from prototype:
  ```typescript
  export default defineNuxtConfig({
    // ... existing config

    modules: ['@nuxtjs/seo', '@nuxtjs/google-fonts'],

    googleFonts: {
      families: {
        Anybody: [400, 700, 900],
        'DM+Mono': [400, 500],
        'Instrument+Sans': [400, 500, 600, 700],
      },
      display: 'swap',
      preconnect: true,
      preload: true,
    },
  })
  ```

**Acceptance Criteria:**
- [ ] All three fonts load successfully
- [ ] Font weights match prototype (lines 8-10)
- [ ] `display: swap` prevents FOIT
- [ ] Preconnect to Google Fonts CDN
- [ ] `pnpm build` succeeds
- [ ] `pnpm type-check` passes
- [ ] Fonts visible in browser DevTools

**Command:**
```bash
npx nuxi module add @nuxtjs/google-fonts
```

---

## Testing Strategy

### After Each Commit
- `pnpm lint` - ESLint check
- `pnpm type-check` - TypeScript validation
- `pnpm build` - Production build succeeds

### Final Verification
- `pnpm dev` - Dev server runs without errors
- Visual inspection: Page renders with correct fonts and background color
- DevTools: Check computed styles for design tokens
- Network tab: Verify Google Fonts load
- Meta tags: SEO module injected correct metadata

## Verification Checklist

Before PR creation:
- [ ] All 5 commits completed and reviewed
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes
- [ ] `pnpm build` completes successfully
- [ ] `pnpm dev` runs without errors
- [ ] Fonts load correctly (inspect in DevTools)
- [ ] Design tokens accessible via `theme()` in CSS
- [ ] SEO meta tags present in HTML source
- [ ] No console errors or warnings
- [ ] `.gitignore` excludes build artifacts

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Tailwind 4 beta instability | Pin exact version, monitor for breaking changes |
| `@nuxtjs/tailwindcss` incompatibility | Do NOT install it; use `@tailwindcss/vite` directly |
| Font loading delays | Use `display: swap` and preconnect |
| CSS token syntax changes | Follow Tailwind 4 official docs for `@theme` directive |
| Build failures on initial setup | Run `pnpm install` after each dependency addition |

## Open Questions

None - research phase resolved all technical uncertainties.

## Post-Implementation

Once this is merged:
- Ready for issue #3: Hero Component Implementation
- Can reference design tokens via Tailwind's `theme()` function
- Can import fonts via CSS variables (e.g., `font-family: theme('--font-headline')`)
- SEO module configured for future page metadata

## Notes

- **Critical:** Do NOT use `@nuxtjs/tailwindcss` - it's incompatible with Tailwind v4
- **CSS-first config:** No `tailwind.config.js` needed - all tokens in `main.css`
- **Fonts:** Start with Google Fonts module; can self-host later if needed
- **Commit order matters:** Nuxt init → Tailwind → Tokens → SEO → Fonts
- **Each commit must build:** Never commit broken code
