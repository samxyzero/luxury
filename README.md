# Luxury Enterprises — Website

A premium, SEO-focused Next.js website for **Luxury Enterprises**, a home & hotel furnishing store in Pokhara, Nepal. No database — all content lives in versioned JSON files and is editable through a visual editor at `/admin`.

## Stack

- Next.js 16 (App Router) + TypeScript, fully statically generated
- Tailwind CSS v4 (royal blue + gold design tokens, frosted-glass utilities — see `app/globals.css`)
- Framer Motion for animation
- [Decap CMS](https://decapcms.org) at `/admin` for content editing, backed by GitHub (no database, no SaaS account required)
- Resend for the contact form (optional — falls back to a "please email us" message if not configured)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

All editable content lives in `/content/*.json`:

| File | Powers |
|---|---|
| `site.json` | Business info, hero, about, contact details, hours, stats |
| `products.json` | Featured Products grid |
| `services.json` | Services section |
| `gallery.json` | Gallery section |
| `reviews.json` | Customer Reviews carousel |
| `faq.json` | FAQ accordion |
| `partners.json` | Brand partners strip |

Images referenced in these files can be either an external URL (the placeholder content uses Unsplash) or a path like `/uploads/my-photo.jpg`, once uploaded via the CMS.

You can either:
1. **Edit the JSON files directly** in your code editor and push/redeploy, or
2. **Use the visual editor** at `yourdomain.com/admin` (see setup below) — no code required, safe for a non-technical owner.

### Setting up the content editor (`/admin`)

The CMS commits changes directly to your GitHub repo, which triggers a new Vercel deployment automatically. One-time setup, after you've pushed this project to a GitHub repo and deployed it to Vercel:

1. **Update `public/admin/config.yml`** — replace `YOUR_GITHUB_USERNAME/YOUR_REPO_NAME` in the `backend.repo` field with your actual repo, e.g. `acme/luxury-enterprises`.
2. **Create a GitHub OAuth App**: GitHub → Settings → Developer settings → OAuth Apps → New OAuth App.
   - Homepage URL: `https://yourdomain.com`
   - Authorization callback URL: `https://yourdomain.com/api/callback`
   - Save the generated **Client ID** and **Client Secret**.
3. **Add environment variables in Vercel** (Project Settings → Environment Variables):
   - `GITHUB_OAUTH_ID` = the Client ID
   - `GITHUB_OAUTH_SECRET` = the Client Secret
   - Redeploy.
4. Visit `https://yourdomain.com/admin`, click **Login with GitHub**, authorize the app, and start editing. Only GitHub accounts with write access to the repo can log in.

Optional: for local CMS testing without GitHub auth, run `npx decap-server` in a second terminal and uncomment `local_backend: true` in `public/admin/config.yml`.

## Contact form

The contact form posts to `/api/contact`, which sends an email via [Resend](https://resend.com):

1. Create a free Resend account and API key.
2. Add `RESEND_API_KEY` (and optionally `CONTACT_NOTIFY_EMAIL`) to your Vercel environment variables.

Without a key configured, the form still validates and submits, but visitors are shown a graceful fallback pointing them to your email address directly — nothing breaks.

## SEO

- Metadata, Open Graph/Twitter tags, and `FurnitureStore` JSON-LD structured data are generated from `content/site.json` in `app/layout.tsx`.
- `app/sitemap.ts` and `app/robots.ts` are generated automatically.
- Set `NEXT_PUBLIC_SITE_URL` in your environment to your production domain so metadata/canonical URLs and the sitemap resolve correctly.

## Deploying

1. Push this repo to GitHub.
2. Import it in [Vercel](https://vercel.com/new) — no build configuration needed.
3. Set the environment variables described above (`.env.example` lists them all).
4. Point your domain at Vercel and update `NEXT_PUBLIC_SITE_URL`.
