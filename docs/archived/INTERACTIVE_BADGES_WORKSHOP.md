# Interactive Badges Workshop

*Started: 2025-12-31*

**Goal:** Let visitors answer the questions throughout the landing page, then generate real OB2 badges from their responses.

---

## The Concept

As users scroll through the stories, each question can be answered:

1. **Lina's question:** "Do you have a quiet victory that deserves a mark?"
2. **Eva's question:** "What's one thread you could pull from something you started?"
3. **Malik's question:** "What skill have you been quietly building?"
4. **Carmen/Kayla's question:** "Who could you teach what you've learned?"

At the end, their answers become **real badges** — their first taste of what rollercoaster.dev does.

---

## Technical Options

### Option A: Client-Side Only (localStorage)

**How it works:**
- Answers stored in localStorage
- "Badges" are visual-only, styled to look like badges
- No server interaction
- No real OB2 credentials

**Pros:**
- Zero GDPR concerns
- No server infrastructure needed
- Works offline
- Fast to implement

**Cons:**
- Not real badges — just styled divs
- Can't be verified or shared
- Lost if browser cleared

---

### Option B: Anonymous Badge Generation via API

**How it works:**
- User answers questions
- At the end, answers sent to openbadges-modular-server
- Server generates real OB2 badges
- Badges returned and displayed
- User can download/share

**Server requirements:**
- Public endpoint for anonymous badge creation
- Rate limiting (prevent abuse)
- Content moderation before badge creation

**Pros:**
- REAL badges — verifiable, shareable
- First actual product experience
- Demonstrates the platform's value

**Cons:**
- Needs server infrastructure
- Content moderation required
- Some GDPR considerations (even anonymous data)

---

### Option C: Hybrid — localStorage + Optional Badge Generation

**How it works:**
- Answers stored in localStorage immediately
- Visual "preview badges" shown
- Optional: "Make these real" button
- If clicked → send to server → generate real OB2 badges
- Consent flow before server submission

**Pros:**
- Best of both worlds
- User chooses when/if data leaves device
- Clear consent moment
- Progressive engagement

**Cons:**
- More complex UX
- Two code paths to maintain

---

## Current Server Capabilities

**openbadges-modular-server (v1.0.2):**
- Published Docker image on GHCR
- Full OB2 "hosted" implementation
- OB3 endpoints exist but in development
- JWT authentication
- Swagger docs at `/docs`

### OB2 Badge Creation Flow

To issue a badge (assertion), we need three entities:

```
1. ISSUER (organization)     → POST /v2/issuers
2. BADGE CLASS (type)        → POST /v2/badge-classes
3. ASSERTION (awarded badge) → POST /v2/assertions
```

### Pre-Created Entities (Setup Once)

**Issuer:** rollercoaster.dev
```json
{
  "name": "Rollercoaster.dev",
  "url": "https://rollercoaster.dev",
  "email": "badges@rollercoaster.dev",
  "description": "Progress tracking for minds that don't move in straight lines"
}
```

**Badge Classes (4 total):**

| Badge | Name | Criteria |
|-------|------|----------|
| Lina's | "Quiet Victory" | "Recognized personal achievement" |
| Eva's | "Thread Finder" | "Identified value in unfinished work" |
| Malik's | "Skill Builder" | "Acknowledged ongoing learning" |
| Carmen's | "Knowledge Sharer" | "Recognized teaching potential" |

### Assertion Creation (Per Visitor)

For each answer, create an assertion:
```json
{
  "recipient": {
    "type": "email",
    "identity": "anonymous@rollercoaster.dev",  // or hashed if provided
    "hashed": false
  },
  "badgeClass": "https://api.rollercoaster.dev/v2/badge-classes/{id}",
  "verification": { "type": "hosted" },
  "issuedOn": "2025-12-31T00:00:00Z",
  "evidence": {
    "narrative": "[User's answer to the question]"
  }
}
```

### Authentication Question

The server uses JWT authentication. Options:

1. **Public endpoint for landing page** — Create a special rate-limited endpoint that doesn't require auth
2. **Embedded API key** — Landing page uses a restricted API key (only can create specific badge types)
3. **Proxy through backend** — Landing page calls our own API, which authenticates with badge server

### Open Questions

1. Does the current server support anonymous badge creation?
2. Can we add a public `/landing/badges` endpoint?
3. What rate limiting exists?

---

## Badge Structure for Landing Page

Each answer could become a badge like:

```json
{
  "name": "Quiet Victory",
  "description": "[User's answer]",
  "issuer": "rollercoaster.dev",
  "criteria": "Recognized something you did that mattered",
  "issuedOn": "2025-12-31",
  "recipient": "anonymous" // or hashed email if provided
}
```

**Badge types from questions:**

| Question | Badge Name | Criteria |
|----------|------------|----------|
| Lina's | "Quiet Victory" | Recognized personal achievement |
| Eva's | "Thread Finder" | Identified value in past work |
| Malik's | "Skill Builder" | Acknowledged ongoing learning |
| Carmen's | "Knowledge Sharer" | Recognized teaching potential |

---

## Content Moderation Options

### Level 1: Client-Side Blocklist
- Simple word filter
- Catches obvious profanity/slurs
- Fast, no network
- Some false positives possible

### Level 2: Server-Side Validation
- Check content before badge creation
- More comprehensive filtering
- Can use regex patterns, ML models
- Adds latency

### Level 3: AI Moderation API
- OpenAI Moderation API, Perspective API, etc.
- Most robust
- External dependency
- Cost per request
- Data leaves your system

**Recommendation for Phase 0:** Level 1 (client-side) + Level 2 (simple server validation). No AI API yet.

---

## GDPR Considerations

### If localStorage only:
- No personal data collected
- No GDPR obligations
- User's device, user's data

### If server submission:
- Need consent before submission
- Anonymize where possible
- Provide data deletion option
- Privacy policy update needed

### Minimal data approach:
- Don't collect email unless needed
- Hash any identifiers
- No analytics on badge content
- Clear retention policy

---

## UX Flow Options

### Flow A: Progressive Reveal
```
[Question appears]
     ↓
[Hover/click reveals input]
     ↓
[User types answer]
     ↓
[Visual confirmation: "noted."]
     ↓
[Continue scrolling]
     ↓
[End: See all badges together]
```

### Flow B: All at Once
```
[Scroll through stories]
     ↓
[Reach "Your Turn" section]
     ↓
[All 4 questions listed with inputs]
     ↓
[Fill in answers]
     ↓
[Generate badges button]
     ↓
[Badges displayed]
```

### Flow C: Current + Enhancement
```
[Keep existing interactive moment]
     ↓
[Add optional badge creation]
     ↓
["Turn this into a real badge?" prompt]
```

---

## Questions to Resolve

1. **Do we want REAL badges or just visual ones for now?**
   - Real = more impressive but more infrastructure
   - Visual = faster to ship

2. **What's the issuer identity?**
   - rollercoaster.dev as issuer?
   - Self-signed by user?
   - Anonymous/demo issuer?

3. **Should badges be downloadable?**
   - JSON file?
   - PNG with baked metadata?
   - Shareable link?

4. **How do we handle the "You showed up" badge in the current pause section?**
   - Keep as localStorage only?
   - Upgrade to real badge?
   - Combine with new badges?

5. **Mobile interaction model?**
   - Click to expand inputs
   - Inline visible inputs
   - Swipe to answer?

---

## Next Steps

1. Review openbadges-modular-server API for badge creation endpoints
2. Decide: localStorage-only vs server-generated
3. Design badge visual treatment
4. Implement input reveal UX
5. Build badge generation flow
6. Add content moderation
7. Test end-to-end

---

## Notes

*Add discussion notes here as we workshop...*


