# Ozzy's Excavation Services

Marketing website for Ozzy's Excavation — a septic, earthworks, and excavation company serving Alberta.

**Live**: [ozzysexcavation.ca](https://ozzysexcavation.ca)  
**Stack**: React 19 + TypeScript + Vite + Tailwind CSS 4  
**Hosting**: Cloudflare Pages  
**CRM**: ERPNext (Frappe) at `erp.ozzysexcavation.ca`

## Architecture

```
Browser                    Cloudflare Pages                External
───────                    ────────────────                ────────
Form submit ──POST──►  /api/intake (Function)
                              │
                              ├──► D1 (intake_submissions)   ← durable buffer
                              │    (erp_sync_attempts)        ← audit trail
                              │
                              └──► ERPNext API                ← CRM lead creation
```

### D1 — Submission Buffer

Every form submission (Quote Request or Septic Assessment) is written to Cloudflare D1 **first**, then forwarded to ERPNext. This ensures no lead is ever lost — if ERPNext is unreachable, the submission stays in D1 with status `received` and the sync failure is logged.

**Tables**:
- `intake_submissions` — lead data (contact info, form answers, timestamps, sync status)
- `erp_sync_attempts` — per-attempt audit log (status, HTTP response, error messages)

Schema: `migrations/0001_create_intake_and_sync_tables.sql`

### Chatbot

The floating chat widget connects to an ElevenLabs conversational AI agent branded as Ozzy. The API key is server-side only — proxied through `/api/elevenlabs/*` (Cloudflare Function in prod, Vite proxy in dev). Toggle with `VITE_ENABLE_CHAT=true` in `.env`.

### Feature Toggles

| Variable | Default | Controls |
|----------|---------|----------|
| `VITE_ENABLE_CHAT` | `false` | ElevenLabs chat widget |
| `VITE_ENABLE_INTAKE` | `false` | Form submissions to D1/ERPNext |

When `VITE_ENABLE_INTAKE=false`, forms show success locally without sending data — safe for development.

## Local Development

```bash
cp .env.example .env    # configure API keys + toggles
npm install
npm run dev -- --host
```

Opens at `http://localhost:5173`. The dev server proxies `/api/elevenlabs/*` to ElevenLabs. Form submissions skip `/api/intake` unless `VITE_ENABLE_INTAKE=true`.

```bash
npm run build    # tsc -b && vite build
npm run lint     # eslint
```
