# Claude Code Workflow

Development workflow for the Rollercoaster.dev landing page.

## Overview

```
Issue → Implement → Review → PR
```

This is a simpler project than the monorepo - we use a streamlined 3-gate workflow.

## Slash Commands

| Command | Purpose | When to Use |
| --- | --- | --- |
| `/work-on-issue <number>` | Full gated workflow | Working on GitHub issues |
| `/implement-component <name>` | Quick component creation | Rapid prototyping |
| `/design-check [file]` | Design/accessibility review | Before creating PRs |

## Tools

| Type | Name | Purpose | Invoke |
| --- | --- | --- | --- |
| Command | work-on-issue | Gated issue workflow | `/work-on-issue 123` |
| Command | implement-component | Quick component build | `/implement-component Hero` |
| Command | design-check | Pre-PR review | `/design-check` |
| Skill | gh-issues | Issue management | Auto (ask about issues) |
| Skill | gh-milestones | Milestone tracking | Auto (ask about milestones) |
| Agent | landing-developer | Implement components | Via commands |
| Agent | design-reviewer | Review design/UX | Via `/design-check` |

## Workflow Gates (3-Gate System)

### Gate 1: Issue Review

Before starting any implementation:

1. Fetch and show the full issue
2. Reference `prototype-v6.html` for design
3. Check `docs/DESIGN_DIRECTION.md` for style guidance
4. **STOP** - Wait for explicit "proceed" approval

### Gate 2: Implementation Review

Before committing changes:

1. Show the diff of all changes
2. Explain what changed and why
3. Reference the prototype section implemented
4. **STOP** - Wait for explicit approval to commit

### Gate 3: Pre-PR Review

Before creating a PR:

1. Run validation: `pnpm lint && pnpm type-check`
2. Run design-reviewer for accessibility/style check
3. Run pr-review-toolkit:code-reviewer
4. **STOP** - Show findings and wait for approval

## Quick Reference

### Using /work-on-issue

```
/work-on-issue 5

→ GATE 1: Shows issue #5, waits for "proceed"
→ Creates branch, implements changes
→ GATE 2: Shows diff, waits for approval to commit
→ Runs design review
→ GATE 3: Shows review findings, waits for approval
→ Creates PR
```

### Using /implement-component

```
/implement-component Hero

→ Reads prototype-v6.html
→ Creates components/Hero.vue
→ Validates with pnpm lint && pnpm type-check
→ Reports completion (no commit)
```

### Using /design-check

```
/design-check Hero.vue

→ Reads design guidelines
→ Checks style compliance
→ Checks accessibility
→ Reports findings by severity
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
├── commands/                # Slash commands
│   ├── work-on-issue.md
│   ├── implement-component.md
│   └── design-check.md
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

1. **Use /work-on-issue** for GitHub issues - ensures proper gating
2. **Use /implement-component** for quick prototyping - no commits
3. **Use /design-check** before any PR - catches accessibility issues
4. **Reference the prototype** - `prototype-v6.html` is the source of truth
5. **Mobile first** - Always check mobile layout
6. **Neo-brutalist style** - Bold, imperfect, expressive
