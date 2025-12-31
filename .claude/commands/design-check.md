# /design-check $ARGUMENTS

Run a design and accessibility review before creating a PR.

**Use this to validate components match the style guide and are accessible.**

---

## Usage

```
/design-check                    # Review all changed files
/design-check Hero.vue           # Review specific component
/design-check components/        # Review all components
```

---

## Workflow

### Step 1: Identify What to Review

If `$ARGUMENTS` is provided:
- Review the specified file(s)

If no arguments:
- Check `git diff --name-only` for changed files
- Filter to `.vue` files

---

### Step 2: Load Design References

Read the design guidelines:

1. Style guide:
   ```
   docs/DESIGN_DIRECTION.md
   ```

2. Prototype for comparison:
   ```
   prototype-v6.html
   ```

---

### Step 3: Run Reviews

Spawn the `design-reviewer` agent to check each file for:

#### Neo-Brutalist Style
- [ ] Typography: Anybody (headlines), DM Mono (mono), Instrument Sans (body)
- [ ] Colors: Yellow climb, purple drop, mint relief
- [ ] Bold, expressive headlines
- [ ] Intentional imperfection

#### Accessibility (WCAG 2.1 AA)
- [ ] Semantic HTML (`<section>`, `<article>`, `<nav>`)
- [ ] Heading hierarchy (h1 > h2 > h3)
- [ ] Focus states visible on all interactive elements
- [ ] ARIA labels where needed
- [ ] Color contrast (4.5:1 for text, 3:1 for large text)
- [ ] Reduced motion support (`motion-safe:`)

#### Responsive Design
- [ ] Mobile first approach
- [ ] Breakpoints: md, lg, xl
- [ ] Touch targets: min 44x44px
- [ ] No horizontal scroll

#### Component Quality
- [ ] Props are typed with TypeScript
- [ ] Styles are scoped
- [ ] Patterns match other components

---

### Step 4: Report Findings

Present findings grouped by severity:

```
## Design Check: [file(s)]

### Critical (must fix before PR)
- [Issue]: [Location] → [Fix]

### High (should fix)
- [Issue]: [Location] → [Fix]

### Medium (consider)
- [Issue]: [Location] → [Suggestion]

### Passed
- [What's done well]

### Verdict
[ ] Ready for PR
[ ] Needs fixes (see Critical/High)
```

---

## Common Issues

### Typography

```vue
<!-- WRONG -->
<h1 class="font-sans">Title</h1>

<!-- RIGHT -->
<h1 class="font-anybody font-bold">Title</h1>
```

### Focus States

```vue
<!-- WRONG -->
<button class="bg-yellow-400">Click</button>

<!-- RIGHT -->
<button class="bg-yellow-400 focus:ring-2 focus:ring-offset-2 focus:ring-black focus:outline-none">
  Click
</button>
```

### Reduced Motion

```vue
<!-- WRONG -->
<div class="animate-bounce">...</div>

<!-- RIGHT -->
<div class="motion-safe:animate-bounce">...</div>
```

### Semantic HTML

```vue
<!-- WRONG -->
<div class="hero">
  <div class="title">...</div>
</div>

<!-- RIGHT -->
<section aria-labelledby="hero-title">
  <h1 id="hero-title">...</h1>
</section>
```

---

## Integration

This command is automatically run as part of:
- `/work-on-issue` (Gate 3: Pre-PR Review)

You can also run it standalone before any PR.

---

## Notes

- This is a read-only check - no files are modified
- For automated fixes, address issues manually after review
- Run `pnpm lint` and `pnpm type-check` separately for code quality
