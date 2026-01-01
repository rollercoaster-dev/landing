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
