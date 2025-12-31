# GitHub Issue Dependencies Skill

Use this skill when working with sub-issues, parent-child relationships, and issue dependencies (blocked-by).

---

## Sub-Issues (Parent-Child)

Sub-issues create hierarchical relationships where a parent issue contains child issues.

### Add Sub-Issue
```bash
gh api graphql \
  -H "GraphQL-Features: sub_issues" \
  -f query='
    mutation($parentId: ID!, $childId: ID!) {
      addSubIssue(input: {
        issueId: $parentId
        subIssueId: $childId
      }) {
        issue {
          id
          title
        }
        subIssue {
          id
          title
        }
      }
    }
  ' \
  -f parentId="PARENT_NODE_ID" \
  -f childId="CHILD_NODE_ID"
```

### Remove Sub-Issue
```bash
gh api graphql \
  -H "GraphQL-Features: sub_issues" \
  -f query='
    mutation($parentId: ID!, $childId: ID!) {
      removeSubIssue(input: {
        issueId: $parentId
        subIssueId: $childId
      }) {
        issue {
          id
          title
        }
        subIssue {
          id
          title
        }
      }
    }
  ' \
  -f parentId="PARENT_NODE_ID" \
  -f childId="CHILD_NODE_ID"
```

### Get Issue Node ID
To use sub-issue mutations, you need the node ID:
```bash
# Get node ID for issue #123
gh api repos/{owner}/{repo}/issues/123 --jq '.node_id'

# Or via GraphQL
gh api graphql -f query='
  query($owner: String!, $repo: String!, $number: Int!) {
    repository(owner: $owner, name: $repo) {
      issue(number: $number) {
        id
        title
      }
    }
  }
' -f owner="owner" -f repo="repo" -F number=123
```

### Query Sub-Issues
```bash
gh api graphql \
  -H "GraphQL-Features: sub_issues" \
  -f query='
    query($id: ID!) {
      node(id: $id) {
        ... on Issue {
          title
          subIssues(first: 20) {
            nodes {
              id
              number
              title
              state
            }
          }
        }
      }
    }
  ' \
  -f id="PARENT_NODE_ID"
```

---

## Issue Dependencies (Blocked-By)

Dependencies indicate that one issue blocks another.

### Add Dependency
Issue A is blocked by Issue B (B must be done before A):
```bash
gh api repos/{owner}/{repo}/issues/{A}/dependencies/blocked_by \
  -f dependent_issue_number={B} \
  -X POST
```

### Remove Dependency
```bash
gh api repos/{owner}/{repo}/issues/{A}/dependencies/blocked_by/{B} \
  -X DELETE
```

### Query Blocked-By Dependencies
```bash
# What blocks issue #123?
gh api repos/{owner}/{repo}/issues/123/dependencies/blocked_by \
  --jq '.[] | "#\(.number): \(.title)"'

# What does issue #123 block?
gh api repos/{owner}/{repo}/issues/123/dependencies/blocking \
  --jq '.[] | "#\(.number): \(.title)"'
```

---

## Common Patterns

### Epic Breakdown Pattern
For large features, create a hierarchy:
```
Epic (parent issue)
├── Story 1 (sub-issue)
│   ├── Task 1a (sub-issue of Story 1)
│   └── Task 1b (sub-issue of Story 1)
├── Story 2 (sub-issue)
└── Story 3 (sub-issue)
```

### Sequential Dependency Chain
When tasks must be done in order:
```
#1 Design API schema
  ↓ blocks
#2 Implement API endpoints
  ↓ blocks
#3 Write API tests
  ↓ blocks
#4 Deploy to staging
```

Create this chain:
```bash
# #2 is blocked by #1
gh api repos/{owner}/{repo}/issues/2/dependencies/blocked_by \
  -f dependent_issue_number=1 -X POST

# #3 is blocked by #2
gh api repos/{owner}/{repo}/issues/3/dependencies/blocked_by \
  -f dependent_issue_number=2 -X POST

# #4 is blocked by #3
gh api repos/{owner}/{repo}/issues/4/dependencies/blocked_by \
  -f dependent_issue_number=3 -X POST
```

### Check If Issue Is Blocked
```bash
blocked_by=$(gh api repos/{owner}/{repo}/issues/123/dependencies/blocked_by --jq 'length')
if [ "$blocked_by" -gt 0 ]; then
  echo "Issue #123 is blocked by $blocked_by issues"
fi
```

### Full Dependency Graph
```bash
# For each open issue, show its blockers
gh issue list --json number,title --jq '.[].number' | while read num; do
  blockers=$(gh api repos/{owner}/{repo}/issues/$num/dependencies/blocked_by --jq '.[].number' 2>/dev/null | tr '\n' ',' | sed 's/,$//')
  if [ -n "$blockers" ]; then
    echo "#$num blocked by: $blockers"
  fi
done
```

---

## Sub-Issues vs Dependencies

| Feature | Sub-Issues | Dependencies |
|---------|------------|--------------|
| Relationship | Parent-child hierarchy | Blocking relationship |
| Use case | Breaking down work | Sequencing work |
| Visualization | Nested under parent | Dependency graph |
| API | GraphQL (preview) | REST |
| Closure | Parent can stay open | Blockers must close first |

### When to Use Each

**Sub-Issues:**
- Epic → Stories → Tasks breakdown
- Feature with multiple components
- Parent tracks overall progress

**Dependencies:**
- Task B can't start until Task A is done
- PR depends on design approval
- Deployment depends on testing

**Combined:**
- Epic with sub-issues where some sub-issues block others
- Story A must complete before Story B can start

---

## Tips

- Sub-issues API requires the `GraphQL-Features: sub_issues` header (preview feature)
- Node IDs look like `I_kwDOABC123` - always fetch fresh
- Dependencies only work within the same repository
- Closing a blocking issue doesn't auto-close blocked issues
- Use labels like `status:blocked` alongside dependencies for visibility
