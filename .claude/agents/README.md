# Claude Code Agents

Custom agents for the Rollercoaster.dev landing page project.

## Architecture: Orchestrator-Worker Pattern

**Claude (main) is the orchestrator.** Worker agents handle focused tasks.

Subagents complete their task and return results - they don't stop mid-task for approval. Gates are handled by Claude (main).

### Roles

- **Human**: Approves at each gate
- **Claude (Main)**: Orchestrates workflow, handles gates, spawns workers
- **Worker Agents**: Execute focused tasks and return results

## Agent Inventory

```
PLUGINS (Official)                    CUSTOM AGENTS (3 total)
------------------                    ----------------------
pr-review-toolkit (pre-PR review)     DEVELOPMENT:
hookify (behavioral hooks)              landing-developer
context7 (library docs)                 design-reviewer
frontend-design (UI generation)
                                      MANAGEMENT:
                                        issue-manager
```

## Development Agents

### landing-developer.md

Implements Vue components from the prototype reference.

**Use for**:
- Creating new components
- Converting prototype sections to Vue
- Setting up Tailwind styling

**Trigger phrases**:
- "implement the Hero component"
- "create the DropSection"
- "convert section X from prototype"

### design-reviewer.md

Reviews components for design consistency and accessibility.

**Use for**:
- Pre-PR design review
- Accessibility audits
- Style guide compliance checks

**Trigger phrases**:
- "review design of Hero.vue"
- "check accessibility"
- "design review before PR"

## Management Agents

### issue-manager.md

Plans and manages GitHub issues.

**Use for**:
- Breaking down features into issues
- Setting up issue hierarchies
- Milestone planning

**Trigger phrases**:
- "break down feature X into issues"
- "set up issues for launch"
- "what's blocking the milestone?"

## Plugin Usage

| Plugin | When to Use |
| --- | --- |
| **pr-review-toolkit** | Before creating PRs (code quality) |
| **hookify** | Creating behavioral guardrails |
| **context7** | Looking up Nuxt/Tailwind docs |
| **frontend-design** | Generating new UI components |

## Workflow Integration

```
Task
  │
  ▼
╔═══════════════════╗
║  GATE 1: Review   ║ ← Claude shows task details
╚═════════╤═════════╝
          ▼
[landing-developer] → implements component
          │
          ▼
[design-reviewer] → reviews implementation
          │
          ▼
╔═══════════════════╗
║  GATE 2: Pre-PR   ║ ← Claude shows review results
╚═════════╤═════════╝
          ▼
    Create PR
```

## Tips

1. **Reference the prototype** - Always read `prototype-v6.html` first
2. **Mobile first** - Start with mobile styles
3. **Accessibility first** - Semantic HTML before CSS
4. **Small changes** - One component per PR
5. **Neo-brutalist style** - Bold, imperfect, expressive
