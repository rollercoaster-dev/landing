# Claude Code Workflow

Development workflow for the Rollercoaster.dev landing page.

## Overview

```
Task → Research → Implement → Validate → PR
```

This is a simpler project than the monorepo - we use a streamlined 2-gate workflow.

## Tools

| Type | Name | Purpose | Invoke |
| --- | --- | --- | --- |
| Skill | gh-issues | Issue management | Auto (ask about issues) |
| Skill | gh-milestones | Milestone tracking | Auto (ask about milestones) |
| Agent | landing-developer | Implement components | "implement component X" |
| Agent | design-reviewer | Review design/UX | "review design of X" |

## Workflow Gates

### Gate 1: Task Review

Before starting any implementation:

1. Understand the task/issue
2. Reference `prototype-v6.html` for design
3. Check `docs/DESIGN_DIRECTION.md` for style guidance
4. **STOP** - Confirm understanding with user

### Gate 2: Pre-PR Review

Before creating a PR:

1. Run validation: `pnpm lint && pnpm type-check`
2. Check accessibility (semantic HTML, focus states)
3. Review mobile responsiveness
4. **STOP** - Show changes and get approval

## Common Commands

```bash
# Status
"what's the current task?"
"show me the prototype section for X"

# Implementation
"implement the Hero component"
"add the DropSection from prototype"

# Review
"review the design of Hero.vue"
"check accessibility of components"

# PR
"create pr for the hero section"
```

## Branch Naming

```
<type>/issue-<number>-<short-description>
```

Examples:
- `feat/issue-1-hero-component`
- `fix/issue-5-mobile-layout`
- `style/issue-8-typography`

## Commit Message Format

```
<type>(<scope>): <description>

[optional body]
```

Types: `feat`, `fix`, `style`, `refactor`, `docs`, `chore`

Examples:
- `feat(hero): add hero section with animations`
- `style(typography): implement neo-brutalist fonts`
- `fix(mobile): correct layout on small screens`

## File Locations

```
.claude/
├── agents/                  # Agent definitions
│   ├── landing-developer.md
│   └── design-reviewer.md
├── skills/                  # Skill definitions
│   ├── gh-issues/
│   ├── gh-milestones/
│   └── gh-dependencies/
├── rules/                   # Behavioral rules
│   ├── file-modification.md
│   └── commit-rules.md
├── templates/               # Templates
│   └── dev-plan.md
├── dev-plans/               # Development plans
│   └── issue-<number>.md
├── settings.json            # Team settings
├── settings.local.json      # Personal settings (not committed)
└── WORKFLOW.md              # This file
```

## Tips

1. **Reference the prototype** - `prototype-v6.html` is the source of truth
2. **Mobile first** - Always check mobile layout
3. **Accessibility** - Semantic HTML before CSS
4. **Small PRs** - One component or feature per PR
5. **Neo-brutalist style** - Bold, imperfect, expressive
