# Experience Concept — Rollercoaster.dev Landing Page

*Workshopped: 2025-12-30*

**Core idea:** The page *is* the rollercoaster. Not a static page — an emotional experience that mirrors what neurodivergent users actually feel.

---

## The Emotional Truth

The site should communicate: **"We've been on this ride. We know. Here's something that finally gets it."**

The through-line is **relief** — not excitement, not "wow look at this tech." Relief that something exists that doesn't punish you for being inconsistent.

---

## Design Principles

| Instead of... | We do... |
|---------------|----------|
| Interactions for interactions' sake | Interactions that reveal meaning |
| "Look what we can do" | "Look, we understand" |
| Performance-heavy, slow | Smooth, doesn't fight you |
| Makes you feel impressed | Makes you feel *something personal* |
| Clever | Kind |

---

## The Journey Structure

### 1. THE CLIMB / THE UP — Anticipation & Energy
**Scroll: 0-20%**

**Visual:** Brutalist, BIG fonts, cramped text but still breathing room, high contrast black on white

- Hero fades in slowly. You're being pulled up.
- "The rollercoaster is the path. Ride yours."
- *Progress tracking for minds that don't move in straight lines.*
- The kind of momentum you feel when an idea hits at midnight. Alive. Not manic, but present.

**Feeling:** Curiosity, recognition, "this is different"

### 2. THE DROP / THE DOWN — The Fog
**Scroll: 20-50%**

**Visual:** Gradients into darkness, tired italic fonts, purple accents, slower pace

- Scroll triggers a visual "drop" — the page shifts
- The crash. The fog. The projects that scatter.
- Most tools punish this — we acknowledge it.
- "We know what that feels like."

**Feeling:** "Someone understands this part too"

### 3. THE DISORIENTATION — Off-Kilter
**Scroll: 50-70%**

**Visual:** Deep purple-black, elements tilted slightly, floating fragments ("where was i", "too much", "maybe later"), nothing quite lines up

- Stories appear: Lina, Eva, Marcus
- Each story has its own emotional texture
- The way everything feels when your brain won't cooperate
- Not broken, just... tilted. Unsettling but honest.

| Story | Visual treatment | Feeling |
|-------|------------------|---------|
| **Lina** | Quiet, still, muted — fades in gently | Private victory, soft |
| **Eva** | Starts chaotic (scattered), resolves to focused | From overwhelm to clarity |
| **Marcus** | Fragmented at first, pieces come together | Finding the whole in chaos |

**Feeling:** Recognition of the chaos, but also safety — this is intentional, not accidental

### 4. THE LOOP — Understanding
**Scroll: 70-80%**

- "What we're building" — the explanation
- Visual calm after the stories
- Breathing room

**Feeling:** "This could actually help" — hope without hype

### 5. THE PAUSE AT THE TOP — Interaction
**Scroll: 80-90%**

- A moment where YOU do something
- Options:
  - "What did you do today that mattered?" + text input
  - Pick an emoji that represents something you finished
  - A small badge appears with today's date: "You showed up"
- Saved to localStorage

**Feeling:** Agency, a taste of the product

### 6. THE RELIEF / THE GENTLE END — Landing
**Scroll: 90-100%**

**Visual:** Warm cream background, settled typography, readable, calm

- "Where we are" — honest, human
- "Early. Honest. Making progress."
- Footer: GitHub, Contact
- "See you next ride."
- The exhale. "Oh, I'm okay." Someone finally built something that doesn't punish you for being inconsistent.

**Feeling:** "I want to come back" — curiosity, anticipation

---

## Visual Rhythm

```
Scroll position:
0%   ████████████████████░░░░░░░░░░░░░░░░░░░░░  HIGH — Hero (climbing)
20%  ░░░░░░░░████████████████████░░░░░░░░░░░░░  DROP — Into darkness
40%  ░░░░░░░░░░░░░░░░████████████████░░░░░░░░░  LOW — Deep in stories
60%  ░░░░░░░░░░░░░░░░░░░░████████████████████░  DISORIENTED — Off-kilter
80%  ████████████████████████████░░░░░░░░░░░░░  PEAK — Interactive pause
100% ░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████████░  GENTLE DOWN — Relief
```

---

## Visual Direction (v4)

### Color Palette
```
THE UP:           White (#f8f8f8) + Black (#0c0c0c)
THE DOWN:         Black with Purple accent (#9d8cff)
DISORIENTATION:   Deep purple-muted (#2d2640) + Purple accent
THE RELIEF:       Warm cream (#e8dfd0) + Purple-dark (#6b5fad) accents
```

### Typography
- **Brutalist moments:** Space Grotesk (bold, uppercase, massive)
- **Tired/relief moments:** Crimson Pro (italic, light weight, human)

### Key Visual Principles
- Simple palette, complex emotion
- Chaos in the *feeling*, not in visual noise
- Each section has a distinct emotional texture
- The disorientation is subtle — slight rotations, floating fragments, not screaming chaos

---

## Experience Features

### Scroll reveals at your pace
- No auto-advancing, no rushed animations
- You control the speed of the ride
- Elements reveal as you scroll but wait for you

### The rollercoaster is literal
- Page has actual vertical rhythm — sections rise and fall
- Subtle track/path element that undulates with scroll
- Scroll progress feels like movement along a track

### Stories breathe differently
- Each story has unique visual treatment matching its emotional arc
- Design *shows* the feeling, not just tells it

### Interactive moment
- At the peak — the pause before the final descent
- Something simple that gives a taste of the product
- Saved locally — your mark on the page

### Page remembers you
- Return visit: "Welcome back. Still building."
- Their badge/note from last time is still visible
- Subtle, not performative

---

## What This ISN'T

| Avoid | Why |
|-------|-----|
| Therapist's website | Too soft, too clinical, no personality |
| 90s drug PSA | Too aggressive, trying too hard to be edgy |
| Design studio portfolio | Showing off skills instead of serving the message |
| Generic SaaS | Forgettable, corporate, soulless |

### The Balance
- Daring but not aggressive
- Warm but not soft
- Artsy but approachable
- Has personality without screaming
- Weird in a welcoming way, not alienating

---

## Tone Balance

**Wow but not overwhelming:**
- Animations are smooth, not flashy
- Nothing auto-plays sound or video
- No scroll-jacking (you stay in control)
- Effects enhance meaning, not distract

**Artsy but approachable:**
- Hand-drawn or textured elements mixed with clean type
- Warm colors, not cold tech
- Copy is conversational, not clever

---

## Content Sections

### Hero (THE UP)
```
THE ROLLERCOASTER IS THE PATH
Ride Yours.

Progress tracking for minds that don't move in straight lines.
```

### The Fog (THE DOWN)
```
Sometimes the fog rolls in.

The projects scatter. The momentum disappears.
You stop for a day, then a week, then you lose count.

Most tools punish this. Streak broken. Progress lost. Start over.

We know what that feels like.
```

### Stories (DISORIENTATION)
Lina, Eva, Marcus — each slightly tilted, each with floating fragments of thought

### What We're Building (RELIEF)
Calm, readable explanation of the product

### Interactive Moment
"What did you do today that mattered?" — saves to localStorage, returns on next visit

---

## Technical Notes

- Respects `prefers-reduced-motion`
- Mobile responsive
- localStorage for returning visitor experience
- No scroll-jacking — user controls the pace
- Simple HTML/CSS, no framework dependencies yet

---

## Status

**Current prototype:** `prototype-v4.html`
- Good starting point for the emotional journey
- Needs iteration on details
- Ready for next round of refinement
