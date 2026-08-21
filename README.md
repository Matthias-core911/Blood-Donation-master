# Lifeline - Blood Donation Network

The real Lifeline design (built in Lovable - TanStack Start, TypeScript,
Tailwind) now backed by a real database, real password hashing, and a
real M-Pesa integration. Nothing about the design changed; everything
about how it stores and moves data did.

## What's real here

- **Database**: SQLite, via Drizzle ORM (`src/db/schema.ts`,
  `src/db/client.ts`). Created automatically on first run in `data/`
  (gitignored - the schema is version-controlled, the data isn't).
- **Auth**: passwords are hashed with bcrypt before they ever touch disk.
  Registration checks for duplicate phone numbers against the database,
  not a mock array.
- **Server functions** (`src/rpc/`): registration, sign-in, publishing
  requests, pledging to donate, scheduling, network stats, and the M-Pesa
  payment call all run server-side via TanStack Start's server functions -
  the browser never talks to the M-Pesa endpoint or the database directly.
- **Everything else** - every page, component, and pixel - is the actual
  Lovable-generated output. No screenshots were used as a reference; this
  is the real source.

## Getting started

```bash
npm install
npm run dev       # local dev server - the database file is created
                   # automatically the first time you register a donor
npm run build     # production build (Node.js server target)
npm run preview   # preview the production build locally
```

No environment variables or external services are required to run this
locally - the database is a file, and the M-Pesa endpoint is the same
public one the original app used.

## Deployment note

This builds to a standard Node.js server (`node-server` nitro preset),
not an edge/Workers target - SQLite via `better-sqlite3` is a native Node
addon and can't run in edge runtimes like Cloudflare Workers (no
filesystem, no native bindings there). If you later want to deploy to an
edge platform, swap the database for something edge-compatible (e.g.
Turso/libSQL or a hosted Postgres) rather than changing the nitro preset
back.

## Data model

| Table | Purpose |
|---|---|
| `donors` | Registered donors - name, hashed password, blood type, county/area, availability |
| `blood_requests` | Published requests - patient alias, blood type, units needed/pledged, urgency |
| `payments` | M-Pesa payment records - amount, phone, reference, status |
| `schedules` | Booked donation appointments - centre, date, time, fee |

`src/lib/blood.ts` is the client-facing API surface every route imports -
it calls the server functions in `src/rpc/` under the hood. Client-side
session state (who's using this browser right now) is a lightweight
`localStorage` marker with no password in it - real credential checks
always happen server-side against the database.

## Notes

- Still a single-server prototype: no user roles, no rate limiting, no
  session tokens/cookies (the client just remembers a name + phone after
  a successful sign-in, same UX as the original app, but the actual
  verification is now real).
- The M-Pesa integration calls the same third-party demo endpoint the
  original Blood-Donation-master app used
  (`matthiashiggs.alwaysdata.net`) - swap this for real Safaricom Daraja
  API credentials before handling real payments.
