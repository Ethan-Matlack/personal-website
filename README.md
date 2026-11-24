# ethanmatlack.com

Personal site for Ethan Matlack: about, resume, and projects. Built with
[Astro](https://astro.build) as a fully static site and served as **static assets on
Cloudflare Workers** (no Worker script, no SSR, zero client-side JS).

## Quick start

```sh
nvm use            # Node 26 (see .nvmrc)
npm install
npm run dev        # http://localhost:4321
```

| Script               | What it does                                                                |
| -------------------- | --------------------------------------------------------------------------- |
| `npm run dev`        | Astro dev server                                                            |
| `npm run build`      | Resume-PDF freshness check → `astro check` → `astro build` → `scan-dist`    |
| `npm run preview`    | Build, then serve `dist/` with `wrangler dev` (real headers + 404 handling) |
| `npm run resume:pdf` | Regenerate `public/ethan-matlack-resume.pdf` from `resume.yaml`             |
| `npm run deploy`     | Build and `wrangler deploy` manually (normally Workers Builds does this)    |
| `npm run format`     | Prettier                                                                    |

> npm 12 blocks dependency install scripts by default. `package.json#allowScripts` approves
> `esbuild` and `workerd` (both needed). If either is upgraded, re-approve it with
> `npm install-scripts approve esbuild workerd`.

## Editing content

| What                                      | Where                                                           |
| ----------------------------------------- | --------------------------------------------------------------- |
| Name, headline, email, socials, city      | `src/data/site.ts`: the only place these live                   |
| Resume (also feeds home-page credentials) | `src/data/resume.yaml`: validated by Zod in `src/lib/resume.ts` |
| Projects & businesses                     | `src/content/projects/*.md`: schema in `src/content.config.ts`  |
| Home-page About and "What I work on" copy | `src/pages/index.astro`                                         |
| Colors, type scale, spacing               | `src/styles/tokens.css`                                         |
| Print / PDF layout                        | `src/styles/print.css`                                          |

### Adding a project

Create `src/content/projects/<slug>.md`. The filename becomes the URL (`/projects/<slug>/`).

```yaml
---
title: My Project
kind: project # or: business
summary: One or two sentences, max 200 characters. Used on cards and as the meta description.
status: active # active | planned | archived (pill shown for planned/archived)
role: Optional role
tags: [Up to, Four shown, On cards]
started: 2025-01-01 # optional
ended: 2025-06-01 # optional
links:
  site: https://example.com
  repo: https://github.com/…
cover: ../../assets/my-cover.jpg # optional, processed by astro:assets
coverAlt: Describe the image # required when cover is set
featured: false # true = shown on the home page
order: 10 # lower = earlier
draft: false # true = excluded from production builds
---
Markdown body. Suggested headings: What I did, Stack / Tools, Outcome / Status. The `summary` already
serves as the intro, so skip an Overview section.
```

### Portrait

Drop `src/assets/portrait.jpg` (or `.png` / `.webp`) in and it appears in the home-page hero
automatically. Without it the hero is purely typographic.

### OG image

`public/og-default.png` (1200×630) is a typographic placeholder. Replace it with any 1200×630
PNG.

## Resume PDF

`src/data/resume.yaml` is the single source for both `/resume/` and
`/ethan-matlack-resume.pdf`.

1. Edit `src/data/resume.yaml`.
2. Run `npm run resume:pdf`. This builds the site, serves it, prints `/resume/` with Playwright
   Chromium (Letter), writes `public/ethan-matlack-resume.pdf`, and records the YAML's SHA-256 in
   `public/ethan-matlack-resume.pdf.sha256`.
3. Commit the YAML, the PDF, and the `.sha256` together.

`npm run build` runs `scripts/check-resume-pdf.mjs` first. If the YAML changed without a new
PDF, **the build fails**. Emergency bypass: `SKIP_RESUME_CHECK=1 npm run build`.

The PDF is generated locally only, so Cloudflare's build image never needs Chromium. The first time,
run `npx playwright install chromium`. The `.sha256` file is excluded from deployment via
`public/.assetsignore`.

## Privacy guardrails

The site publishes **email + city only**. No phone, street address, subdomains, internal
hostnames, IPs, ports, or self-hosted software versions (spec §9). After every build,
`scripts/scan-dist.mjs` greps `dist/` for phone numbers, `tel:` links, `*.ethanmatlack.com`
subdomains, IPv4 addresses, `host:port` strings, and street addresses, and fails the build on any
hit. It can't catch everything (e.g. version numbers in prose), so still review homelab copy
by hand.

## Deployment (Cloudflare Workers Builds)

`wrangler.jsonc` is assets-only (`./dist`, `not_found_handling: "404-page"`). Headers come from
`public/_headers`.

One-time dashboard setup:

1. Push this repo to GitHub (suggested name: `ethanmatlack.com`).
2. Cloudflare dashboard → **Workers & Pages → Create → Import a repository** → select the repo.
3. Build command: `npm run build`. Deploy command: `npx wrangler deploy`. Production branch:
   `main`. Enable **non-production branch preview builds**.
4. Worker → **Settings → Domains & Routes → Add → Custom Domain: `ethanmatlack.com`** (apex
   only).
5. Add the `www` redirect rule (below).

After that, every push to `main` deploys.

### DNS cutover checklist

Do this before step 4 above.

- [ ] In **DNS → Records** for `ethanmatlack.com`, check the **apex** (`@` / `ethanmatlack.com`)
      for existing A / AAAA / CNAME records (parking records). **If any exist, stop and decide
      deliberately.** Don't delete anything blindly. Attaching a Custom Domain needs the apex
      to be free of conflicting records.
- [ ] Note the existing subdomain records. Attaching the apex Custom Domain must **not** change
      any of them.
- [ ] Attach the Custom Domain (`ethanmatlack.com` only).
- [ ] **Never** add a wildcard route like `*.ethanmatlack.com/*`.
- [ ] After cutover, spot-check that at least one existing subdomain still resolves and serves
      as before (keep the name in your own notes, not in this repo).
- [ ] Visit `https://ethanmatlack.com/` and an unknown path (should be the custom 404 with
      status 404), and confirm the PDF downloads.

### `www` → apex redirect (manual)

Handled by a Cloudflare **Redirect Rule**, not the Worker:

- First, check **DNS** for an existing `www` record. **If `www` already points at one of your
  apps, don't touch it.** Skip this section and decide separately.
- Otherwise, add a proxied DNS record for `www` (e.g. `AAAA www 100::`, proxied) so the rule
  has something to match.
- **Rules → Redirect Rules → Create rule**
  - When incoming requests match: **Wildcard pattern**, request URL
    `https://www.ethanmatlack.com/*`
  - Then: **Dynamic redirect** to `https://ethanmatlack.com/${1}`, status **301**, preserve
    query string.

## Quality checks

- `npm run build` must pass with 0 `astro check` errors and a clean `scan-dist`.
- `npm run preview` serves through `wrangler dev`: unknown paths return the custom 404 with a
  404 status, and the `_headers` CSP (`script-src 'none'`) is active.
- Run Lighthouse (Chrome DevTools, mobile) on `/`, `/resume/`, and a project page. Target ≥ 95
  in all four categories.

## Project layout

```
src/
  content.config.ts        projects collection schema
  data/site.ts             identity + contact (single source)
  data/resume.yaml         resume (single source)
  lib/resume.ts            YAML → Zod-validated resume + date helpers
  lib/projects.ts          sorted, draft-filtered projects
  content/projects/*.md    project write-ups
  components/              header, footer, cards, credentials, etc.
  layouts/BaseLayout.astro meta, OG, canonical, fonts, skip link
  pages/                   /, /resume/, /projects/, /projects/[slug]/, 404
  styles/                  tokens.css, global.css, print.css
scripts/
  build-resume-pdf.mjs     YAML → PDF (local, Playwright)
  check-resume-pdf.mjs     prebuild freshness check
  scan-dist.mjs            postbuild privacy scan
public/                    _headers, robots.txt, favicon.svg, og-default.png, resume PDF
```
