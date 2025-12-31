# Agent Architecture

This project uses an orchestrator-worker pattern. **Claude (main) is the orchestrator**, worker agents handle focused tasks.

## Key Insight

Subagents cannot stop mid-task and wait for approval. They complete their task and return.

Therefore: **Claude (main) handles the gates**, worker agents do focused work.

## Roles

- **Human**: Approves at each gate
- **Claude (Main)**: Orchestrates workflow, handles gates, spawns workers
- **Worker Agents**: Execute focused tasks (research, plan, implement, review)

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Human (You)                              │
│                    (approves at each gate)                       │
├─────────────────────────────────────────────────────────────────┤
│                     Claude (Main)                                │
│              THE ORCHESTRATOR - handles gates                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   /work-on-issue 2                                               │
│           │                                                      │
│           ▼                                                      │
│   ╔═══════════════════╗                                          │
│   ║  GATE 1: Issue    ║  ← Claude shows full issue               │
│   ║  (you review)     ║                                          │
│   ╚═════════╤═════════╝                                          │
│             ▼                                                    │
│   ┌──────────┐   ┌─────────┐                                     │
│   │researcher│ → │ planner │  (worker agents)                    │
│   └──────────┘   └────┬────┘                                     │
│                       ▼                                          │
│   ╔═══════════════════╗                                          │
│   ║  GATE 2: Plan     ║  ← Claude shows full plan                │
│   ║  (you review)     ║                                          │
│   ╚═════════╤═════════╝                                          │
│             ▼                                                    │
│   ┌────────────────────────────────────────┐                     │
│   │  For each atomic commit:               │                     │
│   │    ┌────────────┐                      │                     │
│   │    │implementer │ → diff               │                     │
│   │    └────────────┘                      │                     │
│   │           ▼                            │                     │
│   │   ╔═══════════════════╗                │                     │
│   │   ║  GATE 3: Commit   ║ ← You review   │                     │
│   │   ╚═══════════════════╝                │                     │
│   └────────────────────────────────────────┘                     │
│             ▼                                                    │
│   ┌─────────────────┐                                            │
│   │ design-reviewer │ → findings → PR                            │
│   └─────────────────┘                                            │
└─────────────────────────────────────────────────────────────────┘
```

## Triggering the Workflow

Use the slash command:

```
/work-on-issue 2
```

This expands to a prompt that guides Claude through the gated workflow.

## Worker Agents

### researcher
**Purpose:** Gathers context before planning.
- Analyzes prototype-v6.html for design patterns
- Checks existing codebase patterns
- Fetches library docs (Nuxt 3, Tailwind 4)
- Returns structured findings

### planner
**Purpose:** Creates atomic commit plans.
- Writes plan to `.claude/dev-plans/issue-{N}.md`
- Each commit: message, files, acceptance criteria
- Returns when plan file is written

### implementer
**Purpose:** Implements ONE commit.
- Works on single atomic commit from plan
- Does NOT commit - returns diff
- Matches prototype design exactly

### design-reviewer
**Purpose:** Validates design quality.
- Neo-brutalist style compliance
- Accessibility requirements
- Mobile responsiveness
- Prototype fidelity

## Plugins

| Plugin | When to Use |
| --- | --- |
| **pr-review-toolkit** | Before creating PRs (code quality) |
| **hookify** | Creating behavioral guardrails |
| **context7** | Looking up Nuxt/Tailwind docs |
| **frontend-design** | Generating new UI components |

## Direct Agent Use

You can use worker agents directly for focused tasks:

```
"Research how Tailwind 4 works"    → researcher
"Review my component styling"      → design-reviewer
```

## Why This Architecture?

Based on [Anthropic's research](https://www.anthropic.com/engineering/claude-code-best-practices):

1. **Subagents can't pause** - They complete tasks and return
2. **Gates need the main agent** - Only Claude (main) can show output and wait
3. **Workers should be focused** - One clear goal, input, output
4. **Context is preserved** - Main Claude sees everything, workers get summaries

## Agent Files

```
.claude/agents/
├── README.md              # This file
├── researcher.md          # Context gathering
├── planner.md             # Implementation planning
├── implementer.md         # Feature building (one commit)
├── design-reviewer.md     # Design/accessibility review

.claude/commands/
└── work-on-issue.md       # Slash command for gated workflow
```

---

**Version:** 2.0
**Last Updated:** December 2024
