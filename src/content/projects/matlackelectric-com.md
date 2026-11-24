---
kind: project
title: matlackelectric.com
summary: Migrated the Matlack Electric website off WordPress on WP Engine, rebuilding it from scratch as a fast, static Astro site on Cloudflare Workers with a data-driven project portfolio.
# role:
started: 2026-08
# ended:
status: active
links:
  site: https://matlackelectric.com
  repo: https://github.com/Ethan-Matlack/matlackelectric-website
  # paper:
tags: [Astro, CF Workers, GitHub Actions, three.js]
# cover:
# coverAlt:
featured: false
order: 6
draft: false
---

## What I did

I originally built the site on WordPress, hosted on WP Engine. Rather than port it over as-is, I rebuilt it from scratch and moved it to Cloudflare.

- **Static and fast.** Every page is pre-rendered at build time and served from Cloudflare, and every push to `main` deploys automatically.
- **Data-driven portfolio.** Each job is a data entry rather than a hand-written page: an ordered list of text, photo, and testimonial blocks, with photos picked up automatically from a folder. Adding a project never means writing a new page.
- **Performance tracked.** Lighthouse runs on every pull request and posts a full report, and the live site's scores update after each deploy.
- **A 3D experiment.** I built an interactive kitchen scene in React Three Fiber, including a working replica of a Lutron keypad that dims the lights in the scene. It's paused until I can make it load faster on phones.

## Stack / Tools

Astro, Cloudflare Workers, GitHub Actions, Lighthouse CI, React Three Fiber and three.js.