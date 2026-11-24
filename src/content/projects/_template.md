---
# ─────────────────────────────────────────────────────────────────────────────
# PROJECT TEMPLATE. Copy this file to src/content/projects/<slug>.md
# The filename becomes the URL: /projects/<slug>/ (lowercase, hyphens).
# Files starting with "_" are ignored by the site, so this one never publishes.
#
# Fields are in the order they appear on the project page.
# Optional fields you don't need: leave them commented out (a bare "role:" with
# no value fails validation). Unknown or misspelled fields fail the build.
# Public content rules: no phone, street address, subdomains, IPs, ports,
# software versions for self-hosted services, or client details.
# ─────────────────────────────────────────────────────────────────────────────

kind: project # project | business  (the label above the title)
title: Project Name
summary: One or two sentences, max 200 characters. Shown under the title, on cards, and as the meta description.
# role: Team Leader # your role, e.g. "Owner", "Team Leader", "Solo"
# started: 2026-01 # YYYY-MM
# ended: 2026-06 # YYYY-MM; leave out for "Present"
status: active # active | planned | completed | archived  (shown as a pill on cards)
links: # remove the "#" on the ones you have; fine to leave both commented
  # site: https://example.com
  # repo: https://github.com/Ethan-Matlack/repo-name
  # paper: https://… # e.g. a report hosted by a university library
tags: [Tag One, Tag Two, Tag Three, Tag Four] # first 4 show on cards; put the most relevant first
# cover: ../../assets/projects/<slug>-cover.jpg # optional image, path relative to this file
# coverCaption: What the image shows # shown under the image and used as its alt text
featured: false # true = also shown under "Featured work" on the home page
order: 100 # position on the Projects page; lower = earlier (businesses always come first)
draft: true # true = hidden from the live site; set to false to publish
---

<!--
  Keep it short. The summary is already the intro, so skip an "Overview" section.
  Delete any section that doesn't apply. Headings below are suggestions.
-->

## The problem

What it was for, or the problem it solves. One short paragraph.

## What I built

- **Part one.** What it is and why it was done this way.
- **Part two.** …

## My role

For team projects: what you personally owned. Delete for solo projects.

## Outcome

What works, what doesn't, and what you'd change. Be honest. Unfinished parts are fine to mention.

## Stack / Tools

Comma-separated list of the main tools, languages, and hardware.
