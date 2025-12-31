# GitHub Issues Skill

Use this skill when creating, listing, updating, or closing GitHub issues.

---

## Commands

### Create Issue
```bash
gh issue create \
  --title "Issue title" \
  --body "Issue description" \
  --label "label1,label2" \
  --assignee "@me" \
  --milestone "v0.1.0" \
  --project "Project Name"
```

**Flags:**
- `--title, -t` - Issue title (required)
- `--body, -b` - Issue body/description
- `--label, -l` - Labels (comma-separated)
- `--assignee, -a` - Assignees (@me for self)
- `--milestone, -m` - Milestone name
- `--project` - Project name or number
- `--web, -w` - Open in browser to fill out

### List Issues
```bash
# All open issues
gh issue list

# With filters
gh issue list --state open --label "bug" --assignee "@me"
gh issue list --milestone "v0.1.0"
gh issue list --search "auth"
```

**Flags:**
- `--state, -s` - open, closed, all
- `--label, -l` - Filter by label
- `--assignee, -a` - Filter by assignee
- `--milestone, -m` - Filter by milestone
- `--search, -S` - Search query
- `--json` - Output as JSON

### View Issue
```bash
gh issue view 123
gh issue view 123 --json title,body,labels,milestone
```

### Edit Issue
```bash
gh issue edit 123 \
  --title "New title" \
  --body "New body" \
  --add-label "priority:high" \
  --remove-label "needs-triage" \
  --milestone "v0.2.0"
```

### Close/Reopen
```bash
gh issue close 123 --reason "completed"  # or "not_planned"
gh issue reopen 123
```

### Comments
```bash
gh issue comment 123 --body "Comment text"
```

---

## Label Taxonomy for rollercoaster.dev

### Type Labels
- `type:feature` - New functionality
- `type:bug` - Something broken
- `type:docs` - Documentation
- `type:chore` - Maintenance tasks
- `type:research` - Investigation/exploration

### Priority Labels
- `priority:critical` - Blocking work
- `priority:high` - Important, do soon
- `priority:medium` - Normal priority
- `priority:low` - Nice to have

### Status Labels
- `status:blocked` - Waiting on something
- `status:in-progress` - Being worked on
- `status:needs-review` - Ready for review

### Area Labels
- `area:landing` - Landing page
- `area:api` - Badge server API
- `area:client` - Client libraries
- `area:infra` - Infrastructure

---

## Issue Templates

### Feature Request
```markdown
## Summary
Brief description of the feature.

## Motivation
Why is this needed? What problem does it solve?

## Proposed Solution
How should this work?

## Alternatives Considered
Other approaches and why they weren't chosen.

## Additional Context
Screenshots, links, etc.
```

### Bug Report
```markdown
## Description
What happened?

## Expected Behavior
What should have happened?

## Steps to Reproduce
1. Go to...
2. Click on...
3. See error

## Environment
- OS:
- Browser:
- Version:

## Screenshots
If applicable.
```

### Task
```markdown
## Description
What needs to be done?

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Notes
Additional context or constraints.
```

---

## Tips

- Use `--web` to open the issue form in browser for complex issues
- Use `gh issue list --json number,title,labels | jq` for scripting
- Use `@me` as shorthand for your username
- Labels are case-insensitive
