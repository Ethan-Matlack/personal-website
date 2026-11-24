---
kind: project
title: media-audit
summary: A self-hosted, read-only tool that scans a media library and reports what's in it, including storage use, codecs, HDR, and file problems, through its own web UI. Open source, in Python.
# role:
started: 2026-11
# ended:
status: active
links:
  # site:
  repo: https://github.com/Ethan-Matlack/media-audit
  # paper:
tags: [Python, Docker, Unraid, SQLite, GitHub Actions]
# cover:
# coverAlt:
featured: false
order: 5
draft: false
---

## What it does

media-audit grew out of my [homelab](/projects/homelab/). Hard drive prices skyrocketed and suddenly I was scrutinizing storage capacity in a way that I hadn't needed to before. All of the existing tools at my disposal didn't really answer my questions, so I built my own. This tool is designed to provide both high-level and extremely granular details about your media library. 

- **Where the space goes.** Storage per library, title, and season, broken down by resolution, HDR, codec, and audio, and tracked over time.
- **What's wrong.** About twenty checks for problems like duplicates, truncated episodes, and stray files, each showing the space you'd get back.
- **Safe by design.** It never touches your media. Cleanup is a script you review and run yourself.
- **Low maintenance.** It rescans on a schedule and only reads files that changed.

See the [GitHub repo](https://github.com/Ethan-Matlack/media-audit) for the full feature list.

## How it's built

- **Backend:** a Python app on Starlette, with server-rendered templates and no front-end build step or CDN. SQLite with versioned migrations stores the data. Analysis rules are pure functions over stored MediaInfo output, so changing a rule re-derives results without reading any media again.
- **Testing:** the rules are tested against MediaInfo captures from a real library, covering Dolby Vision, HDR10+, Atmos, DTS:X, remuxes, and anime. CI runs the full test suite with linting and type checking on every push.
- **Releases:** every merge publishes a Docker image automatically. The app runs from an Unraid template, as a standalone Docker container, or as plain Python.

## Stack / Tools

Python, Starlette, Jinja, pydantic, SQLite, MediaInfo, uv, pytest, Ruff, mypy, Docker, GitHub Actions, and GitHub Container Registry.

## Status

In development: working, but not yet feature-complete. Open source under the GPL-3.0 license.
