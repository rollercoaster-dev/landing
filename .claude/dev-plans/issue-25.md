# Implementation Plan: Research target audience and define brand language

**Issue:** #25
**Branch:** `feat/issue-25-brand-language`
**Complexity:** Simple
**Total Commits:** 1

## Overview

Create a comprehensive brand language guide that codifies the existing neo-brutalist voice used throughout the landing page. This guide will serve as the reference for all future content creation, translations, and UI copy decisions. The document validates and systematizes current voice patterns rather than inventing new ones.

## Prerequisites

- [x] Current landing page is live with established voice
- [x] English and German translations exist (`locales/en.json`, `locales/de.json`)
- [x] Voice patterns documented in `DESIGN_DIRECTION.md` and `LANDING_COPY.md`
- [x] Prototype (`prototype-v6.html`) contains voice examples

## Prototype Reference

**Not applicable** - This is a documentation task that references the existing landing page implementation.

**Voice examples from current implementation:**
- Parenthetical asides: `(still here? good.)`, `(or don't — we'll be here)`
- Comment-style: `// you came back`, `// you showed up`
- Single-word confirmations: `noted.`
- Metaphors: "Sometimes the fog rolls in"
- Strike-through rejections: `~~Streak broken~~` (in prototype)

## Document Purpose

This guide will:

1. **Validate current voice** - Confirm the neo-brutalist approach resonates with neurodivergent users
2. **Define patterns** - Codify the voice characteristics already in use
3. **Provide examples** - Show how to apply voice in different contexts
4. **Guide translations** - Ensure voice carries across languages
5. **Support growth** - Enable consistent voice as the platform expands

## Atomic Commits

### Commit 1: Create brand language guide

**Type:** docs
**Scope:** brand
**Files:**
- `/Users/joeczarnecki/Code/rollercoaster.dev/landing/docs/BRAND_LANGUAGE.md` - Create

**Changes:**
- Create comprehensive brand language guide
- Document target audience (neurodivergent individuals, 15-20% of population)
- Define core voice principles (direct, supportive, non-judgmental, honest)
- List voice characteristics (what we ARE and ARE NOT)
- Document language dos and don'ts (neurodivergent-affirming vs. ableist terms)
- Catalog voice patterns with examples (parenthetical asides, comment-style, confirmations, metaphors)
- Provide example phrases by context (marketing, UI, errors, help, empty states)
- Define translation guidelines (voice vs. tone, transcreation approach)
- Document story voice principles (agency, self-validation)
- List anti-patterns to avoid (gamification punishments)
- Include accessibility considerations (sentence structure, plain language)

**Document Structure:**

```markdown
# Brand Language Guide

## Introduction: Why This Matters
- Target audience: neurodivergent individuals (ADHD, autism, learning differences, etc.)
- 15-20% of the population is neurodivergent
- Need for tools that work WITH neurodivergent minds, not against them
- Language shapes experience - must be affirming, not othering

## Core Voice Principles
- **Direct**: Say what you mean without fluff
- **Supportive**: Acknowledge struggle without patronizing
- **Non-judgmental**: No shame for gaps, pauses, or non-linear paths
- **Honest about limitations**: Don't overpromise, especially early
- **Self-aware**: We know we're talking to you

## Voice Characteristics

### We ARE:
- **Direct** - "Sometimes the fog rolls in" not "You may occasionally experience difficulty"
- **Casual** - "still here? good." not "We appreciate your continued presence"
- **Self-aware** - "(or don't — we'll be here)" acknowledges reader choice
- **Empathetic** - "We know what that feels like" validates experience
- **Honest** - "Early. Honest. Making progress." admits where we are

### We ARE NOT:
- **Corporate** - No "leverage synergies" or "solutions for success"
- **Unprofessional** - Casual doesn't mean sloppy or unprepared
- **Self-indulgent** - Voice moments are intentional, not everywhere
- **Patronizing** - No "special," "differently-abled," or "everyone is unique"
- **Pessimistic** - We acknowledge chaos without dwelling in it

## Language Dos & Don'ts

### Neurodivergent-Affirming Language

**USE:**
- Neurodivergent / neurotypical
- ADHD, autism, dyslexia (identity-first is often preferred)
- Non-linear, variable, intermittent
- Executive function challenges
- Sensory sensitivities
- Processing differences

**AVOID:**
- "Special needs" (vague, othering)
- "Differently abled" (euphemistic)
- "High/low functioning" (reductive, harmful)
- "Normal" when you mean "neurotypical"
- "Suffers from" (assumes suffering)
- "Disorder" over-emphasis (focus on difference, not deficit)

**Why it matters:**
Language reflects whether you see neurodivergence as a deficit to fix or a difference to accommodate. We choose the latter.

## Voice Patterns

### 1. Parenthetical Asides
**Usage:** Acknowledge reader presence, validate choice to continue
**Tone:** Friendly checkpoint, not pushy

Examples:
- `(still here? good.)`
- `(or don't — we'll be here)`
- `(you're early too — that's good)`

**When to use:** Sparingly. 3-5 moments across the entire page. Too many breaks immersion.

### 2. Comment-Style Acknowledgments
**Usage:** Mark moments of return or showing up
**Tone:** Understated recognition

Examples:
- `// you came back`
- `// you showed up`

**When to use:** Pause section, returning user states

### 3. Single-Word Confirmations
**Usage:** Input acknowledgment, no ceremony
**Tone:** Matter-of-fact, respectful

Examples:
- `noted.`

**When to use:** After user saves an answer, makes a badge, records something personal

**Why effective:** No "Great job!" or "Awesome!" — just acknowledgment. Respects that the user knows the value without external validation.

### 4. Metaphor Usage
**Usage:** Make abstract concepts concrete
**Tone:** Shared experience, not poetic

Examples:
- "Sometimes the fog rolls in" (depression, executive dysfunction)
- "The rollercoaster is the path" (non-linear progress is valid)

**Guidelines:**
- Grounded in neurodivergent experience
- Not overwrought or precious
- Used to clarify, not obscure

### 5. Strike-Through Rejections
**Usage:** Show what we DON'T do
**Tone:** Defiant, protective

Examples:
- `~~Streak broken~~`
- `~~Progress lost~~`
- `~~Start over~~`

**When to use:** Drop section - contrasting punishing tools with our approach

## Example Phrases by Context

### Marketing Headlines
- "The rollercoaster is the path. Ride yours."
- "Progress tracking for minds that don't move in straight lines"
- "You decide what counts"

### UI Confirmations
- `noted.` (answer saved)
- `// you showed up` (logged something)
- `(still here? good.)` (scroll checkpoint)

### Error Messages
**NOT YET IMPLEMENTED - Guidelines for future:**

- **When something breaks:** "That didn't work. [Clear reason]. [Clear fix or workaround]."
  - Example: "Connection lost. Your work is saved locally. Reconnect to sync."

- **When user makes a mistake:** No blame. State what happened, offer fix.
  - Example: "Badge name can't be empty. Add a title to save."

- **When we make a mistake:** Own it.
  - Example: "Our server hiccupped. Try again in a moment."

**Principles:**
- No exclamation points (not exciting to hit an error)
- No passive voice ("An error occurred" → "Connection lost")
- No jargon (no error codes unless actionable)
- Offer a path forward

### Help Text
**NOT YET IMPLEMENTED - Guidelines for future:**

- Short, action-oriented
- Example: "Badge names are private by default. Share them if you want."
- Example: "Evidence can be text, images, or links — whatever proves it to you."

### Empty States
**NOT YET IMPLEMENTED - Guidelines for future:**

- No pressure, no FOMO
- Example: "No badges yet. Make one when you're ready."
- Example: "Nothing here. That's fine."

**Avoid:**
- "You haven't created any badges yet!" (judgmental tone)
- "Get started now!" (pressure)

## Translation Guidelines

### Voice vs. Tone

- **Voice** is WHO we are (direct, supportive, self-aware) - **stays constant**
- **Tone** is HOW we sound in a moment (urgent, calm, playful) - **adapts to context**

Voice must translate. Tone may shift slightly based on language/culture.

### Translation Approach: Transcreation

**Not word-for-word translation. Translate the INTENT.**

Example:
- EN: `(still here? good.)`
- DE: `(noch da? gut.)`
  - Direct translation works because the intent is universal
- EN: `noted.`
- DE: `notiert.`
  - Same brevity, same matter-of-fact tone

**Bad translation example:**
- EN: `noted.`
- DE: `Das haben wir notiert, vielen Dank!`
  - Too wordy, too formal, loses the tone

### Documenting Emotional Intent

When handing off copy for translation, include intent:

```json
{
  "pause.badgeResponse": {
    "text": "noted.",
    "intent": "Matter-of-fact acknowledgment. No praise, no ceremony. Just confirming receipt."
  }
}
```

### Cultural Adaptation Zones

Some voice patterns may need adjustment:

- **Parenthetical asides** - Work in Germanic languages, may feel strange in formal languages like Japanese
- **Comment-style** (`//`) - Assumes coding familiarity, may confuse non-tech audiences
- **Brevity** - German inherently wordier than English, can't always match character count

**Rule:** Preserve the emotional intent. Adapt the execution if needed.

### Translation Quality Checklist

For each translated string, ask:

- [ ] Does it sound like a real person said it?
- [ ] Is it as direct as the English version?
- [ ] Does it maintain the same emotional tone?
- [ ] Would a neurodivergent native speaker recognize the voice?
- [ ] Are technical terms (like "Open Badges") preserved?

## Story Voice

### Principles

Stories are about **agency** and **self-validation**, not external approval.

- **Show decisions:** "When she finished, she made a badge for herself"
- **Show choice:** "she chose because she knew it mattered"
- **Avoid saviorism:** Not "we helped her," but "she did the thing"

### What Stories Are NOT

- Success porn ("and then she got a job at Google!")
- Tragedy narratives ("despite her disability, she succeeded")
- Simple before/after transformations

### What Stories ARE

- Composite experiences from real neurodivergent patterns
- Focused on a MOMENT, not a life arc
- Showing tool use in context
- Normalizing non-linear paths

### Story Ending Pattern

Each story ends with a question that invites reflection:

- "Do you have a quiet victory that deserves a mark?"
- "What's one thread you could pull from something you started?"

**NOT:**
- "Sign up now!" (pressure)
- "You could do this too!" (comparison)

## Anti-Patterns to Avoid

### Gamification Punishments

**Never:**
- Break streaks
- Lock features after gaps
- Show "days since last login"
- Compare users to each other

**Why:** These patterns punish ADHD/depression/chaos. We don't.

### Toxic Positivity

**Avoid:**
- "You got this!" (empty, performative)
- "Every day is a fresh start!" (dismisses cumulative struggle)
- "Just believe in yourself!" (not actionable)

**Instead:**
- Acknowledge reality: "Sometimes the fog rolls in"
- Offer grounding: "We'll be here"

### Condescension

**Never:**
- "Even you can do this!"
- "It's so easy, anyone can..."
- Over-explanation of basic concepts to adult users

**Instead:**
- Assume competence
- Offer context when needed, without talking down

## Accessibility Considerations

### Sentence & Paragraph Structure

- **Short sentences:** Easier to parse, especially for dyslexia, ADHD, or processing differences
- **One idea per sentence:** Reduces cognitive load
- **Generous whitespace:** Visual breathing room between paragraphs
- **Avoid walls of text:** Break up with headings, lists, spacing

### Plain Language Guidelines

- **Active voice:** "You create badges" not "Badges are created by you"
- **Common words:** "Use" not "utilize," "help" not "facilitate"
- **Concrete over abstract:** "Save your answers" not "Preserve your inputs"

### When to Break Rules

Voice patterns like `(still here? good.)` are grammatically informal. That's intentional. The familiarity and directness outweigh perfect grammar.

**Accessibility hierarchy:**
1. Clarity (can the user understand?)
2. Tone (does it feel safe/affirming?)
3. Grammar (is it correct?)

If grammar conflicts with clarity or tone, choose clarity/tone.

## Examples in Context

### Landing Page (Current Implementation)

**Hero:**
- Headline: "The rollercoaster is the path. Ride yours."
  - Metaphor, declarative, ownership
- Tagline: "progress tracking for minds that don't move in straight lines"
  - Direct acknowledgment of neurodivergent experience

**Drop Section:**
- "Sometimes the fog rolls in."
  - Metaphor for depression/executive dysfunction, shared knowledge
- "We know what that feels like."
  - Empathy without pity

**Question Inputs:**
- Placeholder: "type here..."
  - Lowercase, minimal, low pressure
- Confirmation: "noted."
  - No fanfare, just acknowledgment

**Footer:**
- "(or don't — we'll be here)"
  - Removes pressure, affirms user autonomy

## Future Contexts (Not Yet Implemented)

### Dashboard Welcome
- "Back again." (not "Welcome back!")
- "Pick up where you left off. Or start something new." (choice)

### Badge Creation Flow
- "What did you do?" (not "What amazing thing did you accomplish?")
- "Add evidence if you want." (not "Prove it!")

### Verification Requests
- "Carmen verified this." (simple statement)
- "Waiting for approval from 2 others." (status, no pressure)

## Revision History

**Version 1.0** - 2025-01-01
- Initial brand language guide
- Documents existing voice from landing page
- Provides translation and future context guidelines

---

**References:**
- Current landing page: https://rollercoaster.dev
- English translations: `/locales/en.json`
- German translations: `/locales/de.json`
- Design direction: `/docs/DESIGN_DIRECTION.md`
- Landing copy: `/docs/LANDING_COPY.md`
```

**Acceptance Criteria:**
- [ ] Guide created in `/docs/BRAND_LANGUAGE.md`
- [ ] All major sections included (voice principles, patterns, examples, translations, anti-patterns)
- [ ] Examples drawn from current implementation
- [ ] Translation guidelines reflect German implementation learnings
- [ ] Future contexts addressed (errors, help, empty states)
- [ ] Neurodivergent-affirming language documented
- [ ] Anti-patterns clearly stated
- [ ] Accessibility considerations included
- [ ] Document is readable and scannable (headings, lists, examples)
- [ ] `pnpm lint` passes (markdown file shouldn't affect)
- [ ] `pnpm type-check` passes (markdown file shouldn't affect)

**Commit Message:**
```
docs(brand): create brand language guide

Document neo-brutalist voice principles, patterns, and guidelines.
Includes translation approach and neurodivergent-affirming language standards.

Addresses #25

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

---

## Testing Strategy

**Not applicable** - This is a documentation deliverable.

**Validation approach:**
- Review guide for completeness against issue requirements
- Verify all examples match current implementation
- Check that translation guidelines align with existing `locales/` structure
- Ensure neurodivergent-affirming language is accurate and respectful

---

## Verification Checklist

Before PR creation:
- [ ] Guide is complete and well-structured
- [ ] All required sections present (from issue deliverables)
- [ ] Examples match current landing page implementation
- [ ] Voice patterns accurately documented
- [ ] Translation guidelines reflect German implementation
- [ ] Neurodivergent-affirming language is accurate
- [ ] Anti-patterns clearly stated
- [ ] Accessibility considerations included
- [ ] Document is scannable (headings, lists, whitespace)
- [ ] No typos or grammatical errors (that break clarity)
- [ ] References to other docs are accurate

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Guide becomes outdated as voice evolves | Add revision history section, date versions |
| Too prescriptive, stifles creativity | Frame as guidelines, not strict rules |
| Translation section too abstract | Use concrete examples from EN/DE translation |
| Neurodivergent language section incomplete | Reference community resources, acknowledge it's not exhaustive |
| Guide too long to be useful | Heavy use of headings/lists for scannability, table of contents |

---

## Open Questions

**None** - This is a documentation task based on existing implementation. No decisions required before proceeding.

---

## Implementation Notes

### Why One Commit?

This is a single documentation deliverable. Breaking it into multiple commits would fragment the guide and make it harder to review as a cohesive whole.

### Content Sources

All examples and patterns are drawn from:
1. Current landing page (`app.vue`, components)
2. Translation files (`locales/en.json`, `locales/de.json`)
3. Design direction (`docs/DESIGN_DIRECTION.md`)
4. Landing copy (`docs/LANDING_COPY.md`)
5. Archived prototype (`docs/archived/prototype-v6.html`)

This is validation and systematization, not invention.

### Future Extensions

This guide supports:
- Onboarding new content writers
- Translation handoffs to external translators
- UI copy decisions as platform expands (error messages, help text, etc.)
- Maintaining consistent voice across team members
- Evaluating third-party copy (marketing, support, etc.)

### Neurodivergent-Affirming Language Note

The language guidelines section draws from:
- Autistic Self Advocacy Network (ASAN) language preferences
- ADHD community preferences (identity-first language often preferred)
- Lived experience from neurodivergent contributors

This is not exhaustive. Language preferences vary. The guide reflects common patterns while acknowledging individual variation.
