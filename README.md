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

The project intentionally has no `NEXT_PUBLIC_*` variables. All configuration in `.env.example` uses server-only names and must be read from server components, route handlers, or other server-side code.

Copy `.env.example` to `.env.local` and replace the placeholder values for local development. Do not commit `.env.local` or real credentials.

Current server-only variables:

- `MEDBALLAST_API_URL` — URL for the MedBallast API.
- `MEDBALLAST_API_TOKEN` — optional server-to-server API token.
- `MEDBALLAST_SESSION_SECRET` — secret used for session signing when authentication is connected.

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
