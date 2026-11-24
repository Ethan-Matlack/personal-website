---
kind: project
title: lifeatthenest.com
summary: Rebuilt a family blog and recipe site, moving it off WordPress onto EmDash (an Astro-based CMS) running entirely on Cloudflare Workers, with D1, R2, and a custom newsletter API.
role: Web Developer
started: 2026-10
# ended:
status: active
links:
  site: https://lifeatthenest.com
  repo: https://github.com/Ethan-Matlack/lifeatthenest-website
  # paper:
tags: [Astro, EmDash, CF Workers, D1, R2, TypeScript]
# cover:
# coverCaption:
featured: false
order: 7
draft: false
---

## What it does

A blog, scalable and printable recipes, seasonal roundup pages, and an affiliate shop. The owner writes and publishes everything from a CMS admin, with no code or rebuilds involved.

## How it's built

- **Serverless CMS.** EmDash runs on Cloudflare Workers and renders every page on request, so new content is live as soon as it's published. Content lives in D1 (SQLite), and photos live in R2.
- **Fast images without the Worker.** Cloudflare's CDN resizes photos and converts them to WebP on the fly, then caches the results, so image requests never run the Worker. Originals stay untouched in R2.
- **Newsletter API.** A small endpoint checks each signup against a honeypot field and Cloudflare Turnstile, then adds the subscriber to Kit with double opt-in. No subscriber data is stored on the site.
- **Recipes done properly.** Ingredients and steps are stored as structured fields, so each recipe can scale its amounts, print as a clean card, and publish schema.org data for search. I wrote custom CMS plugins for a faster recipe editor, including pasting in a whole ingredient list, and for embedding recipe cards in posts.
- **Safe deploys.** Merging to `main` builds the site, runs database migrations, deploys, and then verifies the result. Migrations run on the build machine rather than inside the Worker, a lesson from the first deploy, when a migration got stuck partway through. Bad deploys roll back to an earlier Worker version, and bad data can be restored to any point in time.

## Stack / Tools

Cloudflare EmDash CMS (Astro), TypeScript, Cloudflare Workers, D1, R2, Cloudflare Images, Turnstile, Kit, and Workers Builds for CI/CD.