# Landing Page — Project Plan

*Created: 2025-12-31*

---

## Tech Stack

| Choice | Reason |
|--------|--------|
| **Nuxt 3** | Vue components, SSR, easy to extend |
| **Tailwind 4** | Utility CSS, latest version |
| **@nuxtjs/seo** | SEO meta + OG image generation |
| **Vercel** | Simple deployment |

---

## Project Structure

```
landing/
├── nuxt.config.ts
├── app.vue
├── pages/
│   └── index.vue
├── components/
│   ├── Hero.vue
│   ├── DropSection.vue
│   ├── StoryBlock.vue
│   ├── QuestionBlock.vue
│   ├── ReliefSection.vue
│   ├── BadgeCollection.vue
│   └── AppFooter.vue
├── composables/
│   └── useBadges.ts
├── public/
│   └── favicon.svg
└── docs/
    ├── PROJECT_CONCEPT.md
    ├── PROJECT_PLAN.md (this file)
    ├── DESIGN_DIRECTION.md
    ├── LANDING_COPY.md
    └── archived/
```

---

## Design Direction

**Source documents:**
- `docs/PROJECT_CONCEPT.md` — Phase 0 static landing page roadmap
- `docs/DESIGN_DIRECTION.md` — Neo-brutalist visual style guide
- `prototype-v6.html` — Working prototype

**Current design (v6):**
- Normal scrolling
- Neo-brutalist typography (Anybody, DM Mono, Instrument Sans)
- Color-coded sections (yellow climb, purple drop, mint relief)
- Interactive questions with localStorage badges
- Voice moments ("noted.", "still here? good.")

---

## Implementation Tasks

### 1. Nuxt Project Setup
- [ ] Initialize Nuxt 3 project
- [ ] Install Tailwind 4
- [ ] Install @nuxtjs/seo
- [ ] Configure nuxt.config.ts
- [ ] Set up fonts (Anybody, DM Mono, Instrument Sans)

### 2. Component Migration
- [ ] Hero.vue (from v6 hero section)
- [ ] DropSection.vue (fog/punish list)
- [ ] StoryBlock.vue + QuestionBlock.vue (stories)
- [ ] ReliefSection.vue (what we're building)
- [ ] BadgeCollection.vue (localStorage badges)
- [ ] AppFooter.vue

### 3. Composables & Logic
- [ ] useBadges.ts (localStorage read/write)
- [ ] Intersection Observer for question reveal
- [ ] Returning user detection

### 4. SEO & Branding
- [ ] useSeoMeta() configuration
- [ ] Design favicon (neo-brutalist style)
- [ ] Create OG image for social shares

### 5. Accessibility
- [ ] Skip-to-content link
- [ ] Heading hierarchy review
- [ ] Aria-labels on inputs
- [ ] Focus states
- [ ] Color contrast audit

### 6. Deployment
- [ ] Connect repo to Vercel
- [ ] Configure rollercoaster.dev domain
- [ ] Deploy to production

### 7. QA
- [ ] Mobile device testing
- [ ] Keyboard navigation
- [ ] Lighthouse audit
- [ ] Cross-browser testing

---

## Intentionally Skipped (Not Phase 0)

- Backend/API integration
- Real OB2 badge generation (server-side)
- User accounts/authentication

---

## Decisions Log

| Question | Answer |
|----------|--------|
| Tech stack | Nuxt 3 |
| CSS | Tailwind 4 |
| SEO/OG | @nuxtjs/seo |
| Deployment | Vercel |
| Design direction | v6 + DESIGN_DIRECTION.md |
| Timeline | No rush |
