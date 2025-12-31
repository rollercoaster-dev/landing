# Project Concept: Rollercoaster.dev Landing Page

## Background

The current rollercoaster.dev site is running an old Nuxt build deployed to Fly.io in April 2025. The source was never pushed to GitHub. The `rd-landing` repo was created to replace it but became over-engineered (full backend, auth, i18n) before the badge platform was ready.

**Decision**: Start fresh with a simple landing page that evolves with monorepo progress.

## Philosophy

The landing page should match the development stage of the badge platform:

- **Don't build what you don't need yet**
- **Evolve incrementally** as features become available
- **Keep it simple** until complexity is justified

## Phased Roadmap

### Phase 0: Simple Static Landing Page (NOW)

**Trigger**: Need something deployed today

**What to build**:
- Static site explaining the vision
- Who it's for (neurodivergent individuals)
- What you're building (Open Badges platform)
- Current progress / roadmap
- Links to GitHub, contact

**What you DON'T need**:
- Backend / API
- User authentication
- Database
- i18n (English only is fine)
- Complex CI/CD

**Deployment**: Fly.io (replace current site)

---

### Phase 1: Badge Showcase

**Trigger**: Monorepo milestone `01 - OB3 Phase 1: Core Spec` complete

**What to add**:
- Embed `openbadges-ui` components to display sample badges
- Interactive badge viewer (show OB2 + OB3 badge structure)
- Link to API documentation
- "Try the API" section with examples

**Tech addition**: Import `@rollercoaster-dev/openbadges-ui` (Vue components)

---

### Phase 2: Badge Generator Demo

**Trigger**: Monorepo milestone `02 - Badge Generator` complete

**What to add**:
- Public badge generator (no auth required)
- Create badge → Preview → Download
- Bake badges into images
- Verify badges (paste URL or upload)
- Share badges on social media

**Tech addition**: Connect to `openbadges-modular-server` API

**Still don't need**: User accounts, data persistence

---

### Phase 3: Self-Signed Badge Creator

**Trigger**: Monorepo milestone `03 - Self-Signed Badges` complete

**What to add**:
- DID-based identity (no central account needed)
- Create verifiable credentials
- Sign badges with your own keys
- Local-first storage (browser)
- Export/backup credentials

**Tech addition**: DID libraries, local storage

**Optional**: GitHub login to sync across devices

---

### Phase 4: Badge Backpack (The Platform)

**Trigger**: Monorepo milestone `04 - Badge Backpack` complete

**What to add**:
- User accounts
- Personal badge collection
- Import badges from other issuers
- Public profile sharing
- Skill tree visualization

**Tech shift**: This is where a full platform makes sense

---

### Phase 5: Learning Platform

**Trigger**: Monorepo milestone `05 - Core Services` + community demand

**What to add**:
- Learning paths / courses
- Badge requirements / criteria
- Progress tracking
- Community features
- Federation with other badge systems

---

## Visual Timeline

```
NOW        Phase 1      Phase 2        Phase 3         Phase 4         Phase 5
 │           │            │              │               │               │
 ▼           ▼            ▼              ▼               ▼               ▼
┌─────┐   ┌─────┐     ┌───────┐     ┌─────────┐    ┌──────────┐   ┌──────────┐
│Static│   │Badge│     │Badge  │     │Self-    │    │Badge     │   │Learning  │
│Land- │──▶│Show-│────▶│Gener- │────▶│Signed   │───▶│Backpack  │──▶│Platform  │
│ing   │   │case │     │ator   │     │Creator  │    │(accounts)│   │(social)  │
└─────┘   └─────┘     └───────┘     └─────────┘    └──────────┘   └──────────┘
                                          │
   No auth needed ◀──────────────────────┘└──────────▶ Auth needed
```

## Content for Phase 0

### Pages Needed

1. **Homepage** - Hero, value proposition, what we're building
2. **About** - The vision, neurodivergent-first philosophy
3. **Roadmap** - Current progress, what's coming (link to GitHub project board)
4. **Contact** - Email, GitHub links

### Key Messages

1. **Built by and for neurodivergent minds**
2. **Open Badges standard** - portable, interoperable credentials
3. **Local-first** - you own your data
4. **Self-signed badges** - no central authority needed
5. **Work in progress** - transparent about development status

### Tone

- Welcoming and inclusive
- Clear and direct (neurodivergent-friendly)
- Avoid jargon unless explained
- Celebrate progress, not perfection

## Deployment

**Current setup**: Fly.io app `rd-monolith` at rollercoaster.dev

**To deploy**: Replace the old Nuxt build with new static site

## Related Monorepo Packages

All badge tools live in the [monorepo](https://github.com/rollercoaster-dev/monorepo):

| Package | Path | NPM | Use in Landing |
|---------|------|-----|----------------|
| openbadges-ui | `packages/openbadges-ui` | `@rollercoaster-dev/openbadges-ui` | Phase 1+ |
| openbadges-types | `packages/openbadges-types` | `@rollercoaster-dev/openbadges-types` | Phase 2+ |
| openbadges-modular-server | `apps/openbadges-modular-server` | Docker image | Phase 2+ |

## Checking Monorepo Progress

```bash
# View milestone status
gh api "repos/rollercoaster-dev/monorepo/milestones" \
  --jq '.[] | select(.state=="open") | "\(.title): \(.open_issues) open, \(.closed_issues) closed"'
```

## Archive Notes

- `rd-landing` repo should be archived (over-engineered)
- Original Nuxt source was never on GitHub (local build deployed to Fly)
