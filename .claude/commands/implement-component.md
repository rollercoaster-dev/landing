# /implement-component $ARGUMENTS

Quick command to implement a Vue component from the prototype.

**Use this for rapid component development without the full gated workflow.**

---

## Usage

```
/implement-component Hero
/implement-component DropSection
/implement-component BadgeCollection
```

---

## Workflow

### Step 1: Locate Prototype Section

1. Read the prototype to find the relevant section:

   ```bash
   cat prototype-v6.html
   ```

2. Identify:
   - HTML structure for `$ARGUMENTS`
   - CSS classes and styles
   - JavaScript functionality
   - Accessibility features

3. Show the user what you found and confirm it's the right section.

---

### Step 2: Create Component

1. Create the component file:

   ```
   components/$ARGUMENTS.vue
   ```

2. Structure with:
   - `<script setup lang="ts">` - Props, composables, state
   - `<template>` - Semantic HTML from prototype
   - `<style scoped>` - Custom styles if needed

3. Follow these principles:
   - **Semantic HTML first** (section, article, nav, etc.)
   - **Accessibility** (aria-labels, focus states)
   - **Mobile first** (base styles, then breakpoints)
   - **Tailwind classes** (match prototype styling)

---

### Step 3: Validate

1. Check for TypeScript errors:

   ```bash
   pnpm type-check
   ```

2. Check for lint issues:

   ```bash
   pnpm lint
   ```

3. Fix any issues found.

---

### Step 4: Report

Show the user:
- Component file created
- Lines of code
- Key features implemented
- Any deviations from prototype

---

## Component Template

```vue
<script setup lang="ts">
// Props
defineProps<{
  // Component props
}>()

// Composables
// const { ... } = useComposable()

// State
// const state = ref()
</script>

<template>
  <section
    aria-labelledby="$ARGUMENTS-title"
    class="py-12 md:py-16 lg:py-24"
  >
    <div class="container mx-auto px-4">
      <!-- Content from prototype -->
    </div>
  </section>
</template>

<style scoped>
/* Custom styles if Tailwind isn't enough */
</style>
```

---

## Design Reference

Always check these before implementing:

- `prototype-v6.html` - Source of truth for design
- `docs/DESIGN_DIRECTION.md` - Style guide
- `docs/LANDING_COPY.md` - Content and messaging

---

## Accessibility Checklist

Before finishing, verify:

- [ ] Semantic HTML elements used
- [ ] Heading hierarchy is correct
- [ ] Focus states on interactive elements
- [ ] ARIA labels where visual context isn't enough
- [ ] Color contrast passes (4.5:1 for text)
- [ ] `motion-safe:` prefix on animations

---

## Notes

- This command does NOT create commits automatically
- Use `/work-on-issue` for the full gated workflow
- Use `/design-check` before creating a PR
