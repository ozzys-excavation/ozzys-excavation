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

## Architecture & Data Flow

### Form Submissions → D1 → ERPNext

```
Browser POST /api/intake
        │
        ▼
  Cloudflare Pages Function (functions/api/intake.ts)
        │
        ├──► D1: intake_submissions   ← durable buffer, never lose a lead
        │    D1: erp_sync_attempts    ← audit trail per sync
        │
        └──► ERPNext REST API         ← CRM at erp.ozzysexcavation.ca
             (Frappe doctype creation)
```

**Why D1**: every form submission (Quote or Septic Assessment) is written to D1 **before** the ERPNext sync is attempted. If ERPNext is down, the lead is still saved in D1 with status `received` and the failed sync is logged in `erp_sync_attempts` for retry.

**Tables**:
- `intake_submissions` — contact info, form answers, timestamps, sync status (`received` | `synced`)
- `erp_sync_attempts` — per-attempt log (HTTP status, response body, error message, `pending` | `success` | `failed`)

**Schema**: `migrations/0001_create_intake_and_sync_tables.sql`

**Local dev caveat**: `/api/intake` only works on Cloudflare (requires D1 + ERPNext bindings). Form submissions locally will fail with a user-visible error — this is expected and safe.

### ElevenLabs Chatbot

Chat widget connects via WebSocket to an ElevenLabs conversational AI agent. The API key is server-side only — proxied through `/api/elevenlabs/*` (Cloudflare Function in prod, Vite proxy config in dev). Can be disabled by commenting out the `<ElevenLabsChatBubble />` in `App.tsx`.

### Source Structure (refactored)

```
src/
├── App.tsx                    Thin router (pathname → page)
├── types.ts                   Service, IntakeData
├── data/
│   ├── images.ts              Image path constants
│   ├── services.ts            Service data, cities, logos, routes
│   └── intake.ts              Intake defaults + steps
├── utils/
│   ├── navigation.ts          scrollTo, chatNavigate, helpers
│   └── seo-helpers.ts         setMeta, setCanonical
├── components/                13 component files
└── pages/                     4 page files
```

## Current State

Branch: `main`

Recent work completed:
- Full component refactor: monolithic App.tsx split into 26 files across data/utils/components/pages
- React Router v7 migration with client-side routing, `<Link>`, `ScrollToTop`
- TypeScript `strict: true` enabled
- Error boundary wrapping all routes
- Blog page lazy-loaded (8.3KB separate chunk)
- Feature toggles: `VITE_ENABLE_CHAT` / `VITE_ENABLE_INTAKE` in `.env`
- Form UX: inline error banners, no `window.alert()`, input preserved on error
- Dead code removed: old pages/components, `scripts/build-content.ts`, `content/site.json`
- All 6 mobile/responsive phases completed (see checklist below)
- 404 catch-all page with branded design
- Chatbot navigation bridged into React Router via `window.__ozzysNavigate`
- Phone numbers corrected in source (Navbar, Footer), terminal output masks them

Validation:
- `npm run build` passes (50 modules, ~299KB main + 8.3KB blog chunk)
- `npm run lint` passes (0 errors)
- All 14 routes return 200
- No horizontal overflow at mobile widths

## Completed / Stable Features

- Phone links use E.164 `tel:+1...` format in source
- Assessment form uses `VITE_ENABLE_INTAKE` toggle, no real email/webhooks without Cloudflare
- Septic assessment submit flow shows completion state
- Required form gating exists across assessment steps
- GitHub `main` is the production/stable branch
- React Router client-side navigation throughout
- 404 page for unknown routes
- Feature toggles for chat and intake

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

Status: COMPLETE

Tasks:
- [x] Create this shared project plan file.
- [x] Update plan with completed Phase 1 mobile/responsive work.
- [x] Commit mobile branch when Darren approves.
- [x] Push branch and merge to `main` when Darren approves.

### Phase 1 — Safe Mobile/Desktop Component Split

Status: COMPLETE

Goal:
- Separate risky mobile changes from stable desktop rendering.

Tasks:
- [x] Extract current working `Navbar` into `DesktopNavbar` without visual changes.
- [x] Add minimal `MobileNavbar` rendered only on mobile.
- [x] Extract current hero into `DesktopHero` without visual changes.
- [x] Add minimal `MobileHero` rendered only on mobile.
- [x] Fix mobile quote form overflow with full-width/min-width guards and smaller mobile padding.
- [x] Add local quote submission confirmation and automatic reset behavior.
- [x] Preserve septic scope redirect to `/septic-assessment-form`.
- [x] Run `npm run build`.
- [x] Verify 390px viewport has no horizontal overflow.
- [x] Commit after approval.

Acceptance:
- [x] Desktop navbar and hero look unchanged structurally by preserving desktop-only markup.
- [x] Mobile has isolated mobile-only navbar/hero.
- [x] No horizontal wandering at 390px viewport verification.

### Phase 2 — Mobile Hero Only

Status: COMPLETE

Tasks:
- [x] Hide large white desktop logo box in `MobileHero` only (already absent from MobileHero).
- [x] Use smaller mobile headline (`text-3xl` + `text-xl` subheads).
- [x] Stack mobile CTA buttons full width (already full-width, `grid gap-3`).
- [x] Tightened mobile padding (`py-16` → `py-12`).
- [x] Preserved desktop hero exactly.
- [x] Build and human checkpoint.

### Phase 3 — Mobile Navbar Only

Status: COMPLETE

Tasks:
- [x] Kept mobile header compact (2 buttons: Call + Quote).
- [x] Included tappable Call button (`px-4 py-3 text-sm`, 44px+ touch target).
- [x] Included Quote button (filled orange, full-width stacking).
- [x] Decided: no hamburger menu, CTA buttons only.
- [x] Removed Blog button from mobile navbar.
- [x] Preserved desktop navbar exactly.
- [x] Build and human checkpoint.

### Phase 4 — Mobile Quote Form

Status: COMPLETE

Tasks:
- [x] Fields are full-width and readable on phones (already `text-base`, responsive grid).
- [x] Submit button full-width on mobile (`w-full sm:w-auto`).
- [x] Septic redirect uses React Router navigate bridge (no full page reload).
- [x] Form still does not send real email/webhook (gated by `VITE_ENABLE_INTAKE`).
- [x] Build and human checkpoint.

### Phase 5 — Mobile Septic Assessment Form

Status: COMPLETE

Tasks:
- [x] Improved assessment step buttons for mobile (3-column grid on mobile vs 6).
- [x] Back/Continue buttons full-width stacked on mobile (`flex-col sm:flex-row`).
- [x] Form padding tightened for mobile (`p-5` → `p-4`).
- [x] Required gating still works.
- [x] Verify & Submit still shows completed message.
- [x] Assessment still does not send real email/webhook (gated by `VITE_ENABLE_INTAKE`).
- [x] Replaced `window.alert()` with inline error banner.
- [x] Build and human checkpoint.

### Phase 6 — Mobile Section / Footer / Widget Polish

Status: COMPLETE

Tasks:
- [x] About section: responsive image height (`h-72 sm:h-96 lg:h-[560px]`), reduced padding.
- [x] Services cards: stack single-column on mobile, fine.
- [x] Service Areas section: fine.
- [x] Footer: fine.
- [x] Chat widget toggleable via `VITE_ENABLE_CHAT`, off by default on mobile dev.
- [x] Build and human checkpoint.

## Known Pitfalls

- Previous mobile attempts changed shared navbar/hero classes and broke desktop: logo took too much screen and menu items were pushed together.
- Do not apply broad global CSS containment without checking desktop. It may affect desktop rendering.
- Avoid changing desktop classes unless explicitly required.
- Phone numbers in source are real; the terminal masks them in output — verify with `xxd` if unsure.

## Verification Commands

```bash
git branch --show-current
git status --short
npm run build
npm run lint
npm run dev -- --host 0.0.0.0 --port 5173
curl -sI http://127.0.0.1:5173 | head -n 1
```
