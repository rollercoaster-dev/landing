# Design Direction v2 — Neo-Brutalist + Personality

*Implemented: 2025-12-31*

**Approach:** Rainbow Unicorn voice + neo-brutalist visuals. Typography as weapon. Broken grids. Playful irreverence. Accessible mechanics, bold aesthetics.

---

## The Rules

1. **Typography does the work** — Size contrast is extreme. Massive next to tiny.
2. **Grids are suggestions** — Elements overlap, bleed, tilt, interrupt.
3. **Voice has personality** — Self-aware asides. Breaks fourth wall. Not every line, but moments.
4. **Scroll is normal** — No hijacking. Boldness is visual, not mechanical.
5. **Commit to contrast** — Dark is DARK. Light is a relief.
6. **Raw over polished** — Feels made by a person, not a template.

---

## Typography

| Use | Font | Size | Weight |
|-----|------|------|--------|
| Hero headline | Anybody | clamp(4rem, 20vw, 28rem) | 900 |
| Section headers | Anybody | clamp(4rem, 15vw, 12rem) | 900 |
| Story names (background) | Anybody | clamp(6rem, 20vw, 16rem) | 900, 15% opacity |
| Story titles | Anybody | clamp(1.5rem, 4vw, 2.5rem) | 700 |
| Questions | Anybody | clamp(2rem, 6vw, 4.5rem) | 900 |
| Body/story text | Instrument Sans | clamp(0.95rem, 1.8vw, 1.15rem) | 400 |
| Code/inputs | DM Mono | 1rem | 400-500 |
| Asides/voice moments | DM Mono | 0.7-0.85rem | 400 |

---

## Color Palette

### The Climb (Hero)
- **Background:** `#ffe50c` (Electric yellow)
- **Text:** `#0a0a0a` (Near black)

### The Drop
- **Background:** Gradient from `#0a0a0a` (black) → `#1a1033` (deep purple)
- **Text:** `#fafafa` (White)
- **Accent:** `#a78bfa` (Purple)

### The Stories
- **Background:** `#1a1033` (Deep purple)
- **Text:** `#fafafa` (White)
- **Accents per story:**
  - Lina: `#00d4aa` (Teal)
  - Eva: `#ff6b35` (Orange)
  - Malik: `#a855f7` (Purple)
  - Carmen/Kayla: `#38bdf8` (Sky blue)

### The Relief
- **Background:** `#d4f4e7` (Soft mint)
- **Text:** `#0a0a0a`
- **Accent:** `#059669` (Green)

### Footer
- **Background:** `#0a0a0a`
- **Text:** `#fafafa`, links dim until hover

---

## Section Structure

### 1. HERO — Electric Yellow
Giant stacked typography: "THE ROLLER COASTER IS THE PATH"
- Asymmetric indentation
- Tagline whispered at bottom: "progress tracking for minds that don't move in straight lines"
- `(scroll)` hint

### 2. THE DROP — Into the Void
Hard cut to black, gradual transition to deep purple.
- "Sometimes the fog rolls in." in purple accent
- Struck-through punish list: `× ~~Streak broken~~  × ~~Progress lost~~  × ~~Start over~~`
- "We know what that feels like."
- Aside: `(still here? good.)`

### 3. THE STORIES — Deep Space
Massive "WHO WE'RE BUILDING FOR" headline.
Four stories with:
- Giant faded name as background (LINA, EVA, MALIK, CARMEN)
- Colored story title matching accent
- Story text
- Interactive question that reveals input on scroll (Intersection Observer at 80%)
- Input saves to localStorage, shows "noted." confirmation

### 4. THE RELIEF — Soft Mint
Calm section: "WHAT WE'RE BUILDING"
- Value props as inline text: `Your pace · Your proof · Your data`
- Link to Open Badges

### 5. THE PAUSE — Interactive
"WHAT DID YOU DO TODAY THAT MATTERED?"
- Input saves to localStorage
- Shows badge preview

### 6. YOUR BADGES — Collection
Shows all answered questions as styled badge cards.
- Only appears if user has answered questions
- Cards colored to match their source story's accent

### 7. WHERE WE ARE — Honest
"Early. Honest. Making progress."
- Link to GitHub
- Aside: `(you're early too — that's good)`

### 8. FOOTER — Back to Black
"See you next ride."
"(or don't — we'll be here)"

---

## Interactive Features

### Question Inputs (Stories Section)
- Intersection Observer triggers at 80% visibility
- Desktop: Input slides in from side (alternating left/right)
- Mobile: Input slides up from bottom
- Debounced localStorage save (500ms)
- "noted." confirmation appears
- Per-question accent colors match story

### Badge Collection
- Renders from localStorage on page load
- Updates live when answers change (Storage prototype override)
- Cards show badge name, answer text, date
- Hidden when no badges exist

### localStorage Keys
- `rc-badge-quiet-victory`
- `rc-badge-thread-finder`
- `rc-badge-skill-builder`
- `rc-badge-knowledge-sharer`
- `rc-win` / `rc-date` (pause section)

---

## Voice Moments

Used sparingly (4-5 total):
- `(scroll)` — hero
- `(still here? good.)` — drop section
- `noted.` — after input save
- `(you're early too — that's good)` — where section
- `(or don't — we'll be here)` — footer

---

## What This IS

- Bold typography that takes up space
- Intentionally off-balance
- Human voice peeking through
- For the weirdos who get it
- Accessible despite being unconventional
- GDPR-friendly (localStorage only, no server)

---

## Files

- `prototype-v6.html` — Current working prototype
- `LANDING_COPY.md` — Story copy and questions
- `INTERACTIVE_BADGES_WORKSHOP.md` — Badge implementation options

---
