# AGENTS.md — Ozzy's Excavation

AI coding agent quick-start. Read this first, then code.

## Project

Marketing site for Ozzy's Excavation Services — septic, earthworks, excavation, Alberta.  
**Live**: ozzysexcavation.ca | **CRM**: ERPNext at erp.ozzysexcavation.ca  
**Stack**: React 19 + TypeScript (strict) + Vite 8 + Tailwind CSS 4 + React Router v7  
**Hosting**: Cloudflare Pages | **DB**: Cloudflare D1

## Commands

```bash
npm run dev -- --host     # http://localhost:5173
npm run build             # tsc -b && vite build
npm run lint              # eslint
```

## File Structure

```
src/
├── App.tsx                     # BrowserRouter + Routes + ErrorBoundary + NavBridge + ScrollToTop
├── types.ts                    # Service, IntakeData, Window.__ozzysNavigate
├── data/
│   ├── images.ts               # Image path constants
│   ├── services.ts             # 8 services, city lists, associationLogos, serviceRoutes
│   └── intake.ts               # IntakeData defaults + step labels
├── utils/
│   ├── navigation.ts           # scrollTo(), chatNavigateTo(), setupChatNavigationHelpers()
│   └── seo-helpers.ts          # setMeta(), setCanonical()
├── components/                 # 16 components (Navbar, Hero, About, Services, ServicePage, Quote,
│                               #   ServiceAreas, Footer, Field, SepticAssessmentPage,
│                               #   ElevenLabsChatBubble, ChatWidget, PageMetadata, SeoJsonLd,
│                               #   ScrollToTop, ErrorBoundary)
└── pages/                      # HomePage, TermsOfServicePage, PrivacyCompliancePage,
                                #   BlogPage (lazy-loaded), NotFound
```

## Routing (React Router v7)

`BrowserRouter` in `main.tsx`. `App.tsx` defines routes:

| Route | Component |
|-------|-----------|
| `/` | HomePage |
| `/septic-assessment-form` | SepticAssessmentPage |
| `/terms-of-service` | TermsOfServicePage |
| `/privacy-compliance` | PrivacyCompliancePage |
| `/blog`, `/blog/winter-reclamation-story` | BlogPage (lazy) |
| `/services/:slug` | ServicePage (uses useParams) |
| `*` | NotFound (404) |

**Always use `<Link to="...">` for internal navigation**, never `<a href>`. Hash links like `<Link to="/#quote">` work — ScrollToTop skips scroll when hash is present, HomePage's hash effect handles the section scroll.

## Cross-Page Navigation from non-React code

`window.__ozzysNavigate(path)` is injected by `NavBridge` in App.tsx. Use it from utility functions (navigation.ts, Quote.tsx) for SPA transitions. Falls back to `window.location.href` if the bridge isn't available.

## D1 — Form Submission Buffer

```
Form submit → /api/intake (Cloudflare Function)
                  ├── D1: intake_submissions   ← buffer (never lose a lead)
                  └── ERPNext API              ← CRM lead creation
```

Schema: `migrations/0001_create_intake_and_sync_tables.sql`. `/api/intake` only works on Cloudflare — locally, forms show success without sending data.

## Feature Toggles (.env)

| Variable | Controls |
|----------|----------|
| `VITE_ENABLE_CHAT` | ElevenLabs chat widget (default false) |
| `VITE_ENABLE_INTAKE` | Form POST to `/api/intake` (default false) |

When `VITE_ENABLE_INTAKE=false`, Quote and SepticAssessment forms skip the fetch and show immediate success — safe for local dev. Vite caches `.env` at startup; restart dev server after changes.

## Key Patterns

- **Desktop/mobile split**: Desktop components use `hidden md:block`, mobile use `md:hidden`. Never alter shared classes — isolate changes behind breakpoint classes.
- **scrollTo(id)**: Finds `#id` element, scrolls to it. If element not found and not on `/`, navigates to `/#id` via `__ozzysNavigate`.
- **Service type**: `{ title, slug, image, cardImagePosition?, pageImagePosition?, pageImageClassName?, summary, features[], detail, seoKeywords? }` — defined in `types.ts`, data in `data/services.ts`.
- **Phone numbers**: Real E.164 numbers in source. The Hermes terminal masks them in grep/cat output — verify with `xxd` if checking.
- **Strict TypeScript**: `strict: true` in tsconfig.app.json. Zero-implicit-any, strict null checks enforced.
- **Error boundary**: `ErrorBoundary` wraps all routes — catches render crashes, shows branded fallback with reload button.
- **Blog lazy-loaded**: `React.lazy(() => import("./pages/BlogPage"))` — separate 8.3KB chunk, Suspense fallback is a dark background div.

## Gotchas

- Don't use `window.location.href` for internal navigation — breaks SPA.
- Don't touch desktop classes when fixing mobile — use responsive prefixes.
- Don't push to GitHub unless explicitly asked.
- `npm run build` runs `tsc -b` (type-check) before `vite build`. Both must pass.
- Empty React imports (`import { } from 'react'`) will fail lint — trim to only used hooks.
