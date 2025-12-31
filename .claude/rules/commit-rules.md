# Commit Rules

**Applies to:** All git commits

## Commit Message Format

```
<type>(<scope>): <description>

[optional body]
```

### Types

| Type | Use For |
| --- | --- |
| `feat` | New features, components |
| `fix` | Bug fixes |
| `style` | CSS, styling changes |
| `refactor` | Code restructuring (no behavior change) |
| `docs` | Documentation only |
| `chore` | Build, config, tooling |
| `test` | Adding or updating tests |

### Scopes (Landing Page)

| Scope | Area |
| --- | --- |
| `hero` | Hero section |
| `drop` | Drop/fog section |
| `story` | Story blocks |
| `relief` | Relief section |
| `badges` | Badge collection |
| `footer` | Footer component |
| `layout` | Overall layout |
| `fonts` | Typography |
| `a11y` | Accessibility |
| `mobile` | Mobile-specific |
| `seo` | SEO configuration |

### Examples

```
feat(hero): add animated headline with typewriter effect
fix(mobile): correct badge grid on small screens
style(fonts): implement neo-brutalist typography stack
refactor(layout): extract section wrapper component
docs(readme): add development setup instructions
chore(deps): update to Tailwind 4.1
```

## Atomic Commits

Each commit should be:

1. **Self-contained**: Works on its own
2. **Single purpose**: One logical change
3. **Buildable**: Code compiles/passes lint
4. **Testable**: Related tests included (when applicable)

### Good vs Bad

**GOOD** (single purpose):
```
feat(hero): add hero section structure
style(hero): implement neo-brutalist styling
feat(hero): add scroll animation
```

**BAD** (mixed concerns):
```
feat(hero): add hero with styling and animation
wip: work in progress
```

## Pre-Commit Validation

Before committing, run:

```bash
pnpm lint        # Linting
pnpm type-check  # TypeScript
```

Both must pass before committing.
