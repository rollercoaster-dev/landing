# /work-on-issue $ARGUMENTS

Execute the gated workflow for issue #$ARGUMENTS.

**YOU are the orchestrator. Do not delegate gate handling to agents.**

---

## Workflow Overview

```
GATE 1: Issue Review    → STOP, show full issue, wait for "proceed"
GATE 2: Implementation  → Implement with landing-developer, show diff
GATE 3: Pre-PR Review   → Design review, show findings, wait for approval
```

This is a simplified 3-gate workflow for the landing page project.

---

## GATE 1: Show Issue

**STOP** - This is a hard gate.

1. Fetch the issue:

   ```bash
   gh issue view $ARGUMENTS --json number,title,body,labels,milestone,assignees
   ```

2. Check for blockers:

   ```bash
   gh issue view $ARGUMENTS --json body | grep -iE "blocked by|depends on"
   ```

3. Reference the prototype:

   ```bash
   cat prototype-v6.html
   ```

4. Show the **COMPLETE** issue to the user:
   - Full title and number
   - Full body (verbatim - do NOT summarize)
   - Labels and milestone
   - Relevant prototype section (if applicable)

5. **STOP HERE** and wait for user to say one of:
   - "proceed"
   - "yes"
   - "go ahead"
   - "approved"

**Do NOT continue until you receive explicit approval.**

---

## After Gate 1 Approval: Setup & Implement

6. Create feature branch:

   ```bash
   git checkout -b feat/issue-$ARGUMENTS-{short-description}
   ```

7. Create a development plan at `.claude/dev-plans/issue-$ARGUMENTS.md` using the template

8. Implement the changes:
   - Reference `prototype-v6.html` for design
   - Follow `docs/DESIGN_DIRECTION.md` for style
   - Use semantic HTML and accessibility patterns
   - Apply Tailwind 4 classes

9. Run validation after each change:

   ```bash
   pnpm lint && pnpm type-check
   ```

---

## GATE 2: Implementation Review

**STOP** - This is a hard gate.

10. Show the diff:

    ```bash
    git diff
    ```

11. Explain what changed and why

12. Reference the prototype section that was implemented

13. **STOP HERE** and wait for approval

14. Only after approval, commit:

    ```bash
    git add . && git commit -m "<type>(<scope>): <description>"
    ```

**Do NOT commit without explicit approval.**

---

## After Gate 2 Approval: Pre-PR Review

15. Run full validation:

    ```bash
    pnpm lint && pnpm type-check
    ```

16. Spawn design-reviewer agent to check:
    - Neo-brutalist style compliance
    - Accessibility requirements
    - Mobile responsiveness
    - Semantic HTML

17. Run pr-review-toolkit agents:
    - pr-review-toolkit:code-reviewer

---

## GATE 3: Pre-PR Review Results

**STOP** - This is a hard gate.

18. Present findings grouped by severity:
    - **Critical (must fix)**: Accessibility blockers, broken layout
    - **High (should fix)**: Design inconsistencies, missing focus states
    - **Medium (consider)**: Minor style deviations

19. **STOP HERE** and wait for approval to create PR.

**Do NOT create PR until Critical issues are resolved and user approves.**

---

## After Gate 3 Approval: Create PR

20. Push branch:

    ```bash
    git push -u origin HEAD
    ```

21. Create PR:

    ```bash
    gh pr create --title "<type>(<scope>): <description>" --body "$(cat <<'EOF'
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

22. Report PR URL

---

## Critical Rules

1. **YOU are the orchestrator** - Worker agents return to you, you handle gates
2. **STOP means STOP** - Literally halt and wait for user input
3. **One gate at a time** - No batching, no previewing future gates
4. **Show, don't summarize** - Full content at every gate
5. **Explicit approval only** - "proceed", "yes", "approved" (not silence)
6. **Reference the prototype** - Always check `prototype-v6.html` first

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
