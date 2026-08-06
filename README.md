# Luxury Enterprises — Website

A premium, SEO-focused Next.js website for **Luxury Enterprises**, a home & hotel furnishing store in Pokhara, Nepal. Content lives in a Postgres (Neon) database via Prisma, editable through a full authenticated admin dashboard at `/admin`.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (warm paper/ink/navy/gold design tokens — see `app/globals.css`)
- Framer Motion for animation
- **Neon (Postgres) + Prisma** for content storage — see `prisma/schema.prisma`
- Custom auth: `jose` (signed JWT session cookie) + Node's built-in `crypto.scrypt` for password hashing — no third-party auth library
- Resend for the contact form (optional — falls back to a "please email us" message if not configured)

## Local development

1. Copy `.env.example` to `.env.local` and fill in `DATABASE_URL` (a Neon connection string) and `AUTH_SECRET` (any random 32+ byte hex string — generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).
2. Push the schema to your database and generate the Prisma client:
   ```bash
   npm install
   npm run db:push
   ```
3. Seed initial content (and create your first admin login) — set `ADMIN_EMAIL` and `ADMIN_SEED_PASSWORD` as temporary env vars for this one command, then remove them:
   ```bash
   ADMIN_EMAIL=you@example.com ADMIN_SEED_PASSWORD=temp-password npm run db:seed
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) for the site, [http://localhost:3000/admin](http://localhost:3000/admin/login) to sign in.

## Editing content

Everything shown on the public site — site settings, products, services, gallery, reviews, FAQ, brand partners — is managed from `/admin` after signing in. Saving any change calls `revalidatePath("/")`, so the public homepage reflects it on the very next request — no redeploy needed.

`prisma/seed.ts` and `content/fallback/*.json` are only used for the initial seed and as an emergency fallback (see **Error handling** below) — they are not the source of truth once the database is live.

## Error handling & fallbacks

Every content read in `lib/content.ts` is wrapped in a try/catch: if the database is briefly unreachable, the function logs the error and falls back to the static snapshot in `content/fallback/*.json` instead of crashing the page. The public site stays up even during a database outage; only the admin dashboard (which needs live data to edit) will show an error until the connection recovers.

## Admin authentication

Single-admin, email + password login:

- Passwords are hashed with Node's built-in `crypto.scrypt` (see `lib/password.ts`) — never stored in plaintext.
- Sessions are a signed JWT (via `jose`) in an `httpOnly`, `secure`, `sameSite: lax` cookie (see `lib/session.ts`).
- `proxy.ts` does an optimistic redirect for any unauthenticated request to `/admin/**`; every Server Action under `lib/actions/` independently re-verifies the session before touching the database (see `lib/dal.ts`) — the proxy check is a first line of defense, not the only one.
- Admin routes are marked `robots: { index: false, follow: false }` so they're excluded from search engines.

To add or reset an admin user later, run the seed script again with new `ADMIN_EMAIL`/`ADMIN_SEED_PASSWORD` values, or write a one-off script using `hashPassword` from `lib/password.ts` and `prisma.adminUser.upsert(...)`.

## Contact form

The contact form posts to `/api/contact`, which sends an email via [Resend](https://resend.com):

1. Create a free Resend account and API key.
2. Add `RESEND_API_KEY` (and optionally `CONTACT_NOTIFY_EMAIL`) to your environment.

Without a key configured, the form still validates and submits, but visitors are shown a graceful fallback pointing them to your email address directly — nothing breaks.

## SEO

- Metadata, Open Graph/Twitter tags, and `FurnitureStore` JSON-LD structured data are generated from the database in `app/layout.tsx` and `app/(site)/layout.tsx`.
- `app/sitemap.ts` and `app/robots.ts` are generated automatically.
- Set `NEXT_PUBLIC_SITE_URL` in your environment to your production domain so metadata/canonical URLs and the sitemap resolve correctly.

## Deploying

1. Push this repo to GitHub, import it in [Vercel](https://vercel.com/new).
2. Set `DATABASE_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL` (and optionally `RESEND_API_KEY` / `CONTACT_NOTIFY_EMAIL`) as Vercel environment variables — see `.env.example`.
3. `npm run build` runs `prisma generate` automatically via the `postinstall` script, so no extra Vercel build configuration is needed.
4. The schema is already pushed to your Neon database from local development — no migration step needed on deploy. If you change `prisma/schema.prisma` later, run `npm run db:push` locally against production before deploying the code that depends on it.
