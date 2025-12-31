# GitHub Milestones Skill

Use this skill when creating, managing, or querying milestones for GitHub issues.

---

## Commands

### List Milestones
```bash
# List all open milestones
gh api repos/{owner}/{repo}/milestones --jq '.[] | "\(.number): \(.title) (\(.open_issues) open, \(.closed_issues) closed)"'

# Include closed milestones
gh api repos/{owner}/{repo}/milestones?state=all

# JSON output
gh api repos/{owner}/{repo}/milestones
```

### Create Milestone
```bash
gh api repos/{owner}/{repo}/milestones \
  -f title="v0.1.0" \
  -f description="First public release" \
  -f due_on="2025-02-01T00:00:00Z" \
  -f state="open"
```

**Fields:**
- `title` (required) - Milestone name
- `description` - What this milestone represents
- `due_on` - ISO 8601 date (YYYY-MM-DDTHH:MM:SSZ)
- `state` - "open" or "closed"

### Update Milestone
```bash
gh api repos/{owner}/{repo}/milestones/{number} \
  -X PATCH \
  -f title="v0.1.0 - Beta" \
  -f due_on="2025-03-01T00:00:00Z"
```

### Close Milestone
```bash
gh api repos/{owner}/{repo}/milestones/{number} \
  -X PATCH \
  -f state="closed"
```

### Delete Milestone
```bash
gh api repos/{owner}/{repo}/milestones/{number} -X DELETE
```

### Assign Issue to Milestone
```bash
# Using gh issue edit (easiest)
gh issue edit 123 --milestone "v0.1.0"

# Using API
gh api repos/{owner}/{repo}/issues/123 \
  -X PATCH \
  -f milestone={milestone_number}
```

### View Milestone Progress
```bash
# Get milestone details with issue counts
gh api repos/{owner}/{repo}/milestones/{number} \
  --jq '"\(.title): \(.closed_issues)/\((.open_issues + .closed_issues)) complete (\((.closed_issues * 100) / ((.open_issues + .closed_issues) | if . == 0 then 1 else . end) | floor)%)"'

# List issues in milestone
gh issue list --milestone "v0.1.0"
```

---

## Milestone Naming Conventions

### Semantic Versioning
For releases following semver:
- `v0.1.0` - First minor release
- `v0.2.0` - Second minor release
- `v1.0.0` - First major (stable) release

### Time-Based
For sprint/cycle planning:
- `2025-Q1` - Quarterly milestone
- `Sprint 1` - Sprint-based milestone
- `January 2025` - Monthly milestone

### Feature-Based
For large features spanning multiple issues:
- `Authentication System` - Feature milestone
- `Landing Page Launch` - Project milestone

---

## Common Patterns

### Create Milestone and Assign Issues
```bash
# Create the milestone
gh api repos/{owner}/{repo}/milestones \
  -f title="v0.1.0" \
  -f description="MVP release"

# Assign multiple issues
for issue in 1 2 3 4 5; do
  gh issue edit $issue --milestone "v0.1.0"
done
```

### Milestone Progress Report
```bash
gh api repos/{owner}/{repo}/milestones \
  --jq '.[] | select(.state == "open") | "\(.title): \(.closed_issues)/\(.open_issues + .closed_issues) issues closed"'
```

### Find Issues Without Milestone
```bash
gh issue list --search "no:milestone is:open" --json number,title
```

---

## Tips

- Milestones are identified by number in the API, but by title in `gh issue edit`
- Due dates help with timeline visibility but aren't enforced
- Closing a milestone doesn't close its issues
- Use `--jq` for formatted output from API calls
