# Implementation Plan: Deployment

**Issue:** #7
**Branch:** `chore/issue-7-deployment`
**Complexity:** Simple (Infrastructure)
**Total Commits:** 1

## Overview

Deploy the landing page to Vercel with custom domain configuration. This is primarily a manual infrastructure task using the Vercel dashboard, with one optional commit to add a deployment status badge to the README.

## Prerequisites

- [x] Application builds successfully (`pnpm build`)
- [x] SEO configured with production URL (https://rollercoaster.dev)
- [x] Repository is public/accessible to Vercel
- [ ] User has Vercel account with deployment permissions
- [ ] User has DNS access for rollercoaster.dev domain

## Prototype Reference

Not applicable - this is an infrastructure task.

## Implementation Steps

### Manual Step 1: Import Repository to Vercel

**Dashboard Actions:**
1. Go to https://vercel.com/new
2. Import Git Repository
3. Select repository: `rollercoaster-dev/landing`
4. Verify auto-detected settings:
   - **Framework Preset:** Nuxt.js
   - **Root Directory:** `./` (default)
   - **Build Command:** `pnpm build` (auto-detected)
   - **Output Directory:** `.output/public` (auto-detected)
   - **Install Command:** `pnpm install` (auto-detected)
5. Leave environment variables empty (none needed)
6. Click "Deploy"

**Expected Result:** First deployment completes, generates preview URL like `landing-xxx.vercel.app`

**Verification:**
- [ ] Deployment succeeds
- [ ] Preview URL loads correctly
- [ ] All sections render (Hero, Drop, Stories, Relief, Badges, Footer)
- [ ] Fonts load correctly (Anybody, DM Mono, Instrument Sans)
- [ ] SEO meta tags present (view source)

---

### Manual Step 2: Configure Custom Domain

**Dashboard Actions:**
1. Go to Project Settings > Domains
2. Click "Add Domain"
3. Enter: `rollercoaster.dev`
4. Choose "Add rollercoaster.dev and redirect www.rollercoaster.dev to it"
5. Vercel will provide DNS configuration instructions

**Expected DNS Records (from Vercel):**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Domain Registrar Actions:**
1. Log into domain registrar for rollercoaster.dev
2. Navigate to DNS settings
3. Add/update A record: `@` → `76.76.21.21`
4. Add/update CNAME: `www` → `cname.vercel-dns.com`
5. Save changes
6. Wait for DNS propagation (can take 1-48 hours, usually ~10 minutes)

**Verification:**
- [ ] Domain shows "Valid Configuration" in Vercel dashboard
- [ ] https://rollercoaster.dev loads the site
- [ ] https://www.rollercoaster.dev redirects to rollercoaster.dev
- [ ] HTTPS certificate issued automatically
- [ ] No mixed content warnings

---

### Manual Step 3: Verify Preview Deployments

**Dashboard Actions:**
1. Go to Project Settings > Git
2. Verify "Automatic Deployments" is enabled (default)
3. Check "Preview Deployments" is set to "All branches"

**Test Preview Deployment:**
1. Create a test branch locally: `git checkout -b test/preview-deployment`
2. Make a trivial change (add comment to README)
3. Push: `git push -u origin test/preview-deployment`
4. Open PR on GitHub
5. Verify Vercel bot comments with preview URL
6. Click preview URL, verify it works
7. Close PR and delete branch

**Verification:**
- [ ] Preview deployment triggers on PR creation
- [ ] Vercel bot comments on PR with preview link
- [ ] Preview URL loads correctly
- [ ] Preview URL differs from production

---

### Atomic Commit 1: Add Deployment Status Badge

**Type:** docs
**Scope:** readme
**Files:**
- `/Users/joeczarnecki/Code/rollercoaster.dev/landing/README.md` - Modify

**Changes:**
- Add Vercel deployment status badge after the status section
- Badge shows production deployment status
- Link to live site

**Implementation:**

Replace:
```markdown
## Status

🚧 **Starting Fresh** - See [PROJECT_CONCEPT.md](./PROJECT_CONCEPT.md) for the phased roadmap.
```

With:
```markdown
## Status

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rollercoaster-dev/landing)

**Phase 0:** Static landing page - [View Live](https://rollercoaster.dev)

See [PROJECT_CONCEPT.md](./PROJECT_CONCEPT.md) for the phased roadmap.
```

**Acceptance Criteria:**
- [ ] Badge displays correctly in README
- [ ] Badge links to deployment
- [ ] Live site link works
- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes

**Commit Message:**
```
docs(readme): add Vercel deployment badge and live site link

Update README to include Vercel "Deploy" button and link to production site.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

---

### Manual Step 4: Decommission Fly.io

**Only after verifying Vercel production works correctly.**

**Fly.io Actions:**
1. Log into Fly.io dashboard
2. Navigate to `rd-monolith` app
3. Delete the app (or suspend if you want to keep config)

**Verification:**
- [ ] Fly.io app no longer running
- [ ] Production traffic confirmed on Vercel (check Vercel Analytics)
- [ ] No broken links or references to Fly.io in codebase

---

## Testing Strategy

### Pre-Deployment Verification
```bash
# Verify build works
pnpm build

# Verify output directory exists
ls -la .output/public/

# Preview production build locally
pnpm preview
```

### Post-Deployment Verification

**Production Site (https://rollercoaster.dev):**
- [ ] Site loads without errors
- [ ] All sections render correctly
- [ ] Fonts load (Anybody, DM Mono, Instrument Sans)
- [ ] Neo-brutalist styling intact
- [ ] Mobile responsive (test on device or devtools)
- [ ] Accessibility features work (skip-to-content, focus states)
- [ ] Pause section localStorage persists across page loads
- [ ] SEO meta tags present (view source)
- [ ] Favicon displays

**Performance Check:**
- [ ] Run Lighthouse audit (target: 90+ Performance, 100 Accessibility)
- [ ] Check Vercel Analytics (after 24 hours of traffic)

**DNS Propagation:**
```bash
# Check DNS records
dig rollercoaster.dev
dig www.rollercoaster.dev

# Expected results:
# rollercoaster.dev → A record to Vercel IP
# www.rollercoaster.dev → CNAME to Vercel
```

---

## Verification Checklist

Before closing issue:
- [ ] Production site live at https://rollercoaster.dev
- [ ] www subdomain redirects correctly
- [ ] HTTPS certificate active
- [ ] Preview deployments work on PRs
- [ ] README badge added and functional
- [ ] Fly.io decommissioned
- [ ] DNS propagated globally (check multiple locations)
- [ ] No console errors on production
- [ ] All accessibility features working

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| DNS propagation delays | Use Vercel preview URL first, add custom domain after verifying deployment works |
| Build failures on Vercel | Tested locally with `pnpm build`, Vercel uses same command |
| Environment differences | No environment variables needed, static build is portable |
| Domain already in use | Check current DNS settings before making changes, have rollback plan |
| Broken links after migration | Search codebase for hardcoded Fly.io URLs before decommissioning |

---

## Open Questions

None - all configuration is auto-detected by Vercel. Proceeding with manual steps.

---

## Notes

**Why minimal code changes?**
- Nuxt + Vercel integration is zero-config
- Auto-detection handles all build settings
- No environment variables required
- `.vercelignore` and `vercel.json` are optional optimizations, not required

**When to add `.vercelignore` or `vercel.json`?**
- Only if build times become slow (Phase 1+)
- Only if custom redirects/headers needed (not in Phase 0)
- Current setup works out of the box

**Deployment Flow After This:**
- Push to `main` → Auto-deploy to production
- Open PR → Auto-deploy to preview URL
- Merge PR → Preview deployment promoted to production
