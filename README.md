# مركز مرايا للفنون — Mryia Company Website

Next.js site for Mryia Art Centre with a full admin dashboard (Arabic, RTL).

## Structure

- `src/app/page.tsx` — public site; reads content from MongoDB, falls back to the built-in seed content (`src/lib/content.ts`) when no database is configured, so the site always works.
- `src/app/admin` + `src/components/admin/AdminApp.tsx` — the dashboard at `/admin`: edit, add, and delete everything the site shows (hero, about, stats, services, team, news, videos, contact, socials, footer) plus account settings (admin email + password change).
- `src/app/api/admin/*` — dashboard APIs (session auth via signed cookie).
- `src/app/api/files/[id]` — serves images uploaded from the dashboard (stored in MongoDB GridFS).

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | for the dashboard | MongoDB connection string (free Atlas M0 works) |
| `ADMIN_PASSWORD` | first deploy | Initial admin password; the admin account (`admin@mraya-konda.com`) is seeded into the DB on first boot and is managed from the dashboard afterwards |
| `MONGODB_DB_NAME` | optional | Defaults to `mryia` |
| `ADMIN_EMAIL` | optional | Overrides the seeded admin email |
| `SESSION_SECRET` | optional | Session signing secret (derived from `MONGODB_URI` when unset) |

Without `MONGODB_URI` the site runs normally on the seed content and `/admin` shows a "coming soon" state.

## Develop

```bash
npm install
npm run dev
npm run build
```
