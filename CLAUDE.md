<do_not_act_before_instructions>
Do not jump into implementation or change files unless clearly instructed to make changes.
When the user's intent is ambiguous, default to:

1. Providing information
2. Doing research
3. Providing recommendations

Only proceed with edits, modifications, or implementations when the user explicitly requests them.
</do_not_act_before_instructions>

# Rollercoaster.dev Landing Page - Claude Code Context

This file provides context for Claude Code when working on the landing page.

## Project Overview

Landing page for [Rollercoaster.dev](https://rollercoaster.dev) - tools for neurodivergent minds.

**Current Phase**: Phase 0 - Static Landing Page

- **Tech Stack**: Nuxt 3, Tailwind 4, Vercel
- **Focus**: Design, accessibility, clear messaging
- **Not Yet**: Backend, auth, badge integration (those come in later phases)

See `docs/PROJECT_CONCEPT.md` for the full phased roadmap.

## Project Structure

```
landing/
├── app.vue
├── nuxt.config.ts
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
├── docs/
│   ├── PROJECT_CONCEPT.md
│   ├── PROJECT_PLAN.md
│   ├── DESIGN_DIRECTION.md
│   └── LANDING_COPY.md
├── prototype-v6.html          # Current working prototype
└── .claude/                   # Claude Code configuration
    ├── settings.json          # Team-shared settings
    ├── settings.local.json    # Personal settings (not committed)
    ├── WORKFLOW.md            # Development workflow
    ├── commands/              # Slash commands (/work-on-issue, etc.)
    ├── agents/                # Custom agents
    ├── rules/                 # Behavioral rules
    ├── skills/                # Skill definitions
    └── templates/             # Templates
```

## Design Direction

**Current prototype**: `prototype-v6.html`

**Visual Style**: Neo-brutalist
- **Fonts**: Anybody (headlines), DM Mono (mono), Instrument Sans (body)
- **Colors**: Yellow climb, purple drop, mint relief
- **Typography**: Bold, direct, expressive
- **Voice**: "noted.", "still here? good." - conversational moments

**Reference docs**:
- `docs/DESIGN_DIRECTION.md` - Visual style guide
- `docs/LANDING_COPY.md` - Content and messaging

## Development Workflow

### Slash Commands

| Command | Purpose |
| --- | --- |
| `/work-on-issue <number>` | Full 3-gate workflow for GitHub issues |
| `/implement-component <name>` | Quick component creation from prototype |
| `/design-check [file]` | Pre-PR design and accessibility review |

### Common Terminal Commands

```bash
# Development
pnpm dev               # Start dev server
pnpm build             # Build for production
pnpm generate          # Generate static site
pnpm preview           # Preview production build

# Code Quality
pnpm lint              # Lint code
pnpm lint:fix          # Fix lint issues
pnpm type-check        # TypeScript check

# Testing
pnpm test              # Run tests
```

### Working on Components

1. Use `/work-on-issue` for GitHub issues (full gated workflow)
2. Use `/implement-component` for quick prototyping
3. Reference `prototype-v6.html` for implementation details
4. Follow Tailwind 4 patterns
5. Use semantic HTML (accessibility first)
6. Run `/design-check` before creating PRs

## Key Design Principles

### Neurodivergent-First UX

1. **Clear visual hierarchy** - Know where to look
2. **Low cognitive load** - One thing at a time
3. **Forgiving interactions** - No penalties for exploration
4. **Consistent patterns** - Predictable behavior
5. **Generous whitespace** - Breathing room

### Accessibility Requirements

- Skip-to-content link
- Proper heading hierarchy (h1 > h2 > h3)
- Focus states on all interactive elements
- Aria-labels where needed
- Sufficient color contrast
- Reduced motion support

## Claude Code Configuration

### Agent Architecture

This project uses a **simplified agent setup** focused on design and frontend development.

| Agent | Purpose |
| --- | --- |
| **landing-developer** | Implements components from prototype |
| **design-reviewer** | Reviews design/UX decisions |

### Plugins Used

| Plugin | Purpose |
| --- | --- |
| **pr-review-toolkit** | Pre-PR code review |
| **hookify** | Create behavioral hooks |
| **context7** | Library documentation lookup |
| **frontend-design** | Production UI generation |

### Workflow

See `.claude/WORKFLOW.md` for the development workflow.

**Quick version**:
```
1. Check issue/task
2. Reference prototype-v6.html
3. Implement component
4. Validate (lint, type-check, accessibility)
5. Create PR
```

## Model-Specific Behavior (Opus 4.5)

### File Modification Rules

Before modifying ANY file, ask yourself:

1. Did the user explicitly request this change?
2. Has the relevant gate been passed (if in gated workflow)?
3. Have I read the existing code first?

If NO to any: **STOP and ask first.**

### Safe Operations (Always Allowed)

- Reading files
- Searching with Glob/Grep
- Running read-only commands (git status, pnpm lint, etc.)
- Analyzing code
- Providing recommendations

### Dangerous Operations (Require Explicit Permission)

- Creating new files (Write tool)
- Editing existing files (Edit tool)
- Git commits
- Git push
- Package installation

## Related Resources

- [Monorepo](https://github.com/rollercoaster-dev/monorepo) - Open Badges tools
- [Nuxt 3 Docs](https://nuxt.com/docs)
- [Tailwind 4 Docs](https://tailwindcss.com/docs)

## Development Tips

1. **Start with prototype**: Always reference `prototype-v6.html` when implementing
2. **Mobile first**: Design for mobile, enhance for desktop
3. **Accessibility first**: Semantic HTML, then style
4. **Keep it simple**: Phase 0 is static - don't over-engineer
5. **Neo-brutalist style**: Bold, direct, imperfect-on-purpose
