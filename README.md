# MedBallast

MedBallast is the public frontend for a federated national health supply chain platform. It gives suppliers, hospitals, and pharmacies a shared operating layer while restricting access to the organisations and entities a user belongs to.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- CSS tokens and component-level class names; no UI framework dependency
- Deliberate local font stacks: Iowan/Baskerville-style display type and Avenir/Segoe-style interface type

## Run locally

Requirements: Node.js 20.9 or newer.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Available checks:

```bash
npm run lint
npm run build
npm run start
```

## Environment variables

All configuration in `.env.example` uses server-only names and must be read from server components, route handlers, or other server-side code.

Copy `.env.example` to `.env.local` and replace the placeholder values for local development. Do not commit `.env.local` or real credentials.

Current server-only variables:

- `SUPABASE_URL` — the Supabase project URL.
- `SUPABASE_PUBLISHABLE_KEY` — the public Supabase key used for site operations. Row Level Security must protect every table, view, and function exposed through it.
- `MEDBALLAST_SITE_URL` — the site origin used for email confirmation redirects.
- `MEDBALLAST_API_URL` — URL for the MedBallast API.
- `MEDBALLAST_API_TOKEN` — optional server-to-server API token.

## Structure

```text
app/
  globals.css       Design tokens and responsive layout styles
  layout.tsx        Root metadata, fonts, and document shell
  page.tsx          Public MedBallast landing page
components/
  access-paths.tsx  Role selector for supplier, hospital, and pharmacy entry
  icons.tsx         Small, consistent inline SVG icon set
```

## Product context

- Registered users can log in.
- Users can access only the Supplier, Hospital, or Pharmacy entities they have been added to as members.
- Organisations can own multiple entities.
- Entity geolocation supports proximity-based supply routing and redistribution.

## Supabase health check

The first integration checkpoint is available at `/api/health`. It uses the Supabase publishable key to call the public Auth settings endpoint and returns a small, non-sensitive status payload. It returns HTTP `503` until both Supabase variables are configured, and HTTP `200` when the Auth API responds successfully.

```bash
curl http://localhost:3000/api/health
```

## Authentication

Supabase Auth is wired with cookie-backed SSR sessions using the publishable key. The available flows are:

- `/sign-in` — password sign-in with safe return-path handling.
- `/create-account` — account creation with server validation and email confirmation support.
- `/auth/confirm` — exchanges Supabase email confirmation tokens for a session.
- `/workspace` — protected user workspace route.
- Server-side sign out with a local-session scope.

For email confirmation, configure the Supabase Confirm signup template to link to:

```text
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email
```

Add the local and deployed site origins to Supabase Auth redirect URLs. The workspace UI is intentionally a reusable in-development component until organisation membership and entity data are connected.
