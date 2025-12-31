# Development Plan Template

Use this template when planning component implementation.

---

## Component: [NAME]

**File**: `components/[Name].vue`
**Branch**: `feat/[description]`
**Prototype Section**: [Reference to prototype-v6.html section]

---

## Context

### What We're Building

[1-2 sentences describing the component]

### Prototype Reference

```
Lines XXX-YYY of prototype-v6.html
```

Key elements to implement:
- [ ] Element 1
- [ ] Element 2
- [ ] Element 3

---

## Implementation Steps

### Step 1: Component Structure

**Commit**: `feat([scope]): add [component] structure`

**Changes**:
- Create basic component file
- Set up semantic HTML structure
- Define props interface

**Validation**:
```bash
pnpm type-check
```

---

### Step 2: Styling

**Commit**: `style([scope]): add [component] styling`

**Changes**:
- Apply Tailwind classes
- Add responsive breakpoints
- Implement focus states

**Validation**:
```bash
pnpm lint
```

---

### Step 3: Functionality (if needed)

**Commit**: `feat([scope]): add [component] functionality`

**Changes**:
- Add event handlers
- Implement composable logic
- Wire up state

**Validation**:
```bash
pnpm lint && pnpm type-check
```

---

## Accessibility Checklist

- [ ] Semantic HTML elements used
- [ ] Heading hierarchy correct
- [ ] Focus states visible
- [ ] ARIA labels where needed
- [ ] Color contrast passes
- [ ] Reduced motion respected

---

## Responsive Checklist

- [ ] Mobile (320px - 640px)
- [ ] Tablet (641px - 1024px)
- [ ] Desktop (1025px+)
- [ ] Works at 200% zoom

---

## Final Validation

Before creating PR:

```bash
pnpm lint
pnpm type-check
```

---

## Notes

[Any decisions, edge cases, or deviations from prototype]
