# Ozzy's Excavation Project Plan

This file is the shared project checklist for AI/human agents working on this repo. Keep it updated as work is completed, deferred, blocked, or changed.

## Agent Rules

- Repo path: `/Users/darren_dean/ozzys-excavation`
- Current safe baseline on `main`: `b574d32 fix: complete septic assessment submit flow`
- Active working branch for mobile/responsive experiments: `mobile/responsive-optimization`
- Do not push to GitHub unless Darren explicitly asks.
- Do not access Cloudflare or Wrangler. GitHub push triggers deployment when Darren approves.
- Before changing source, run:
  - `git branch --show-current`
  - `git status --short`
- Edit React/TypeScript source files with targeted patches only. Do not use broad Python regex rewrites on `.tsx` / `.ts` source.
- After any change, run `npm run build`.
- Keep the local dev server available for physical phone testing when requested:
  - `npm run dev -- --host 0.0.0.0 --port 5173`
  - Tailscale URL used this session: `http://100.105.36.33:5173`
- If a mobile change risks desktop layout, isolate it behind mobile-only components/classes instead of altering shared desktop markup.
- Desktop must remain visually unchanged unless Darren explicitly approves desktop changes.

## Current State

Branch: `mobile/responsive-optimization`

Recent state notes:
- Desktop was restored after failed mobile Phase 1/2 experiments were reverted.
- The active branch contains revert commits for the attempted mobile viewport/header/hero changes.
- Assessment form acknowledgement copy has been changed locally but not committed yet.
- Local modified file currently expected before next commit:
  - `src/App.tsx`

Uncommitted copy change:
- Septic assessment final acknowledgement checkbox text should read:
  - `By checking this ticbox, you acknowledge that the information supplied on this form is correct to the best of your knowledge. You further acknowledge and understand that your system design will be based on the information supplied.`

Validation already run after the copy change:
- `npm run build` passed.
- Text presence check passed.

## Completed / Stable Features

- Phone links should use E.164 `tel:+1...` format.
- Assessment form must not send real email/webhooks yet.
- Septic assessment submit flow shows completion state and uses local/console-only draft behavior.
- Required form gating exists across assessment steps.
- GitHub `main` is the production/stable branch.

## Mobile Work Strategy

Use same repo, separate branch.

Do not create a new repo.

Use this safer approach after failed shared-layout edits:
- Keep current desktop navbar/hero intact.
- Create separate mobile-only components for risky areas.
- Render mobile components with `md:hidden` or `lg:hidden`.
- Render desktop components with `hidden md:block` or `hidden lg:block`.
- Do not refactor desktop markup and mobile markup at the same time.
- Each phase requires human checkpoint before continuing.

## Phase Checklist

### Phase 0 — Project Plan / Agent Handoff

Status: IN PROGRESS

Tasks:
- [x] Create this shared project plan file.
- [ ] Commit the assessment acknowledgement copy change plus this plan file when Darren approves.
- [ ] Optionally push branch only if Darren explicitly asks.

### Phase 1 — Safe Mobile/Desktop Component Split

Status: NOT STARTED

Goal:
- Separate risky mobile changes from stable desktop rendering.

Tasks:
- [ ] Extract current working `Navbar` into `DesktopNavbar` without visual changes.
- [ ] Add minimal `MobileNavbar` rendered only on mobile.
- [ ] Extract current hero into `DesktopHero` without visual changes.
- [ ] Add minimal `MobileHero` rendered only on mobile.
- [ ] Run `npm run build`.
- [ ] Start/confirm dev server on `0.0.0.0:5173`.
- [ ] Human test desktop first.
- [ ] Human test iPhone 14 and Pixel 7.
- [ ] Commit only after approval.

Acceptance:
- Desktop navbar and hero look unchanged.
- Mobile has isolated mobile-only navbar/hero.
- No horizontal wandering on iPhone 14 / Pixel 7.

### Phase 2 — Mobile Hero Only

Status: NOT STARTED

Tasks:
- [ ] Hide large white desktop logo box in `MobileHero` only.
- [ ] Use smaller mobile headline.
- [ ] Stack mobile CTA buttons full width.
- [ ] Preserve desktop hero exactly.
- [ ] Build and human checkpoint.

### Phase 3 — Mobile Navbar Only

Status: NOT STARTED

Tasks:
- [ ] Keep mobile header compact.
- [ ] Include tappable Call button.
- [ ] Include Quote / Form path.
- [ ] Decide with Darren whether mobile needs hamburger menu or just CTA buttons.
- [ ] Preserve desktop navbar exactly.
- [ ] Build and human checkpoint.

### Phase 4 — Mobile Quote Form

Status: NOT STARTED

Tasks:
- [ ] Ensure fields are full-width and readable on phones.
- [ ] Ensure buttons are full-width/tappable on phones.
- [ ] Ensure form still does not send real email/webhook unless explicitly approved later.
- [ ] Build and human checkpoint.

### Phase 5 — Mobile Septic Assessment Form

Status: NOT STARTED

Tasks:
- [ ] Improve assessment step buttons for mobile.
- [ ] Consider mobile progress indicator instead of six cramped step pills.
- [ ] Ensure required gating still works.
- [ ] Ensure Verify & Submit still shows completed message.
- [ ] Ensure assessment still does not send real email/webhook.
- [ ] Build and human checkpoint.

### Phase 6 — Mobile Section / Footer / Widget Polish

Status: NOT STARTED

Tasks:
- [ ] Check About section image/text layout.
- [ ] Check Services cards.
- [ ] Check Service Areas section.
- [ ] Check footer.
- [ ] Check ElevenLabs widget does not cover important mobile CTAs.
- [ ] Build and human checkpoint.

## Known Pitfalls

- Previous mobile attempts changed shared navbar/hero classes and broke desktop: logo took too much screen and menu items were pushed together.
- Do not apply broad global CSS containment without checking desktop. It may affect desktop rendering.
- Avoid changing desktop classes unless explicitly required.
- `npm run build` regenerates `src/data/content.ts`; include it in commits only if it changes.

## Verification Commands

```bash
git branch --show-current
git status --short
npm run build
npm run dev -- --host 0.0.0.0 --port 5173
curl -sI http://127.0.0.1:5173 | head -n 1
```

## Commit Guidance

Suggested next commit after approval:

```bash
git add AGENTS_PROJECT_PLAN.md src/App.tsx src/data/content.ts
git commit -m "docs: add shared project plan and update assessment acknowledgement"
```

Do not push unless Darren explicitly says to push.
