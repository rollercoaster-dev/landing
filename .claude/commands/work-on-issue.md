# /work-on-issue $ARGUMENTS

Execute the gated workflow for issue #$ARGUMENTS.

**YOU are the orchestrator. Worker agents do focused tasks and return to you. You handle all gates.**

---

## Workflow Overview

```
GATE 1: Issue Review    → Show full issue, wait for "proceed"
        ↓
RESEARCH                → Spawn researcher agent
        ↓
PLANNING                → Spawn planner agent → writes plan
        ↓
GATE 2: Plan Review     → Show full plan, wait for "proceed"
        ↓
IMPLEMENTATION          → For each commit:
        ↓                   Spawn implementer → returns diff
GATE 3: Commit Review   →   Show diff, wait for approval
        ↓                   Commit (you do this, not agent)
        ↓                   Repeat for each commit
FINALIZATION            → Design review, PR creation
```

---

## GATE 1: Show Issue

**STOP** - This is a hard gate.

1. Fetch the issue:
   ```bash
   gh issue view $ARGUMENTS --json number,title,body,labels,milestone,assignees
   ```

2. Show the **COMPLETE** issue to the user:
   - Full title and number
   - Full body (verbatim - do NOT summarize)
   - Labels and milestone

3. **STOP HERE** and wait for user to say one of:
   - "proceed"
   - "yes"
   - "go ahead"
   - "approved"

**Do NOT continue until you receive explicit approval.**

---

## After Gate 1 Approval: Research & Plan

4. Create feature branch:
   ```bash
   git checkout -b feat/issue-$ARGUMENTS-{short-description}
   ```

5. **Spawn `researcher` agent** with task:
   ```
   Research issue #$ARGUMENTS for the landing page.
   - Read the issue requirements
   - Analyze prototype-v6.html for relevant sections
   - Check existing codebase patterns
   - Fetch library docs if needed (Nuxt 3, Tailwind 4)
   - Return structured findings
   ```

6. **Spawn `planner` agent** with research findings:
   ```
   Create implementation plan for issue #$ARGUMENTS.
   Research findings: {paste researcher output}
   Write plan to: .claude/dev-plans/issue-$ARGUMENTS.md
   ```

---

## GATE 2: Show Plan

**STOP** - This is a hard gate.

7. Read the plan file:
   ```bash
   Read: .claude/dev-plans/issue-$ARGUMENTS.md
   ```

8. Show the **COMPLETE** plan to the user (every line, do not summarize)

9. **STOP HERE** and wait for approval

**Do NOT proceed to implementation until plan is approved.**

---

## After Gate 2 Approval: Implementation

10. For EACH atomic commit in the plan:

    a. **Spawn `implementer` agent** with task:
       ```
       Implement Commit {N} of {Total} for issue #$ARGUMENTS.
       Plan location: .claude/dev-plans/issue-$ARGUMENTS.md
       Commit number: {N}

       Return diff when ready. DO NOT COMMIT.
       ```

    b. **GATE 3: Show diff** (per commit)
       ```bash
       git diff
       ```
       Show what changed and why.
       **STOP and wait for approval.**

    c. Only after approval, YOU commit:
       ```bash
       git add . && git commit -m "{commit message from plan}"
       ```

    d. Repeat for each commit in plan.

---

## After All Commits: Finalization

11. Run full validation:
    ```bash
    pnpm lint && pnpm type-check
    ```

12. Spawn `design-reviewer` agent to check:
    - Neo-brutalist style compliance
    - Accessibility requirements
    - Mobile responsiveness
    - Prototype fidelity

13. Present review findings grouped by severity:
    - **Critical (must fix)**: Accessibility blockers, broken layout
    - **High (should fix)**: Design inconsistencies
    - **Medium (consider)**: Minor deviations

14. **STOP** and wait for approval to create PR.

---

## After Finalization Approval: Create PR

15. Push branch:
    ```bash
    git push -u origin HEAD
    ```

16. Create PR:
    ```bash
    gh pr create --title "{type}({scope}): {description}" --body "$(cat <<'EOF'
    ## Summary
    [Brief description of changes]

    ## Changes
    - [Change 1]
    - [Change 2]

    ## Prototype Reference
    Based on `prototype-v6.html` section: [section name]

    ## Checklist
    - [ ] Semantic HTML
    - [ ] Accessible (focus states, aria labels)
    - [ ] Mobile responsive
    - [ ] Matches design direction

    Closes #$ARGUMENTS
    EOF
    )"
    ```

17. Report PR URL

---

## Critical Rules

1. **YOU are the orchestrator** - Agents return to you, you handle gates
2. **STOP means STOP** - Literally halt and wait for user input
3. **One gate at a time** - No batching, no previewing future gates
4. **Show, don't summarize** - Full content at every gate
5. **Explicit approval only** - "proceed", "yes", "approved" (not silence)
6. **Agents return to you** - They complete their task and return findings
7. **YOU commit** - Implementer returns diff, you commit after approval

---

## Error Handling

### Issue Not Found
```
Error: Issue #X not found. Please check the issue number.
```

### No Approval Given
If user says something ambiguous, ask for clarification:
```
I need explicit approval to proceed. Please say "proceed" to continue or "stop" to halt.
```

### Skipped Gate Recovery
If you realize you skipped a gate:
1. STOP immediately
2. Acknowledge: "I skipped a gate. Let me go back."
3. Return to missed gate
4. Do not continue until gate passed

### Agent Fails
If an agent returns an error:
1. Report the error to the user
2. Ask how to proceed
3. Do not continue without guidance
