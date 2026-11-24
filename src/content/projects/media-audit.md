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
tags: [Python, Docker, Unraid, SQLite]
# cover:
# coverAlt:
featured: false
order: 5
draft: false
---

## What it does

media-audit grew out of my [homelab](/projects/homelab/). It answers the questions a media server doesn't: where the space is going, what's actually inside each file, and what's broken or out of place. It's strictly read-only and never modifies, moves, or renames media.

- **Storage breakdowns.** Space per library, title, and season, tracked over time, and split by resolution, HDR and Dolby Vision, codec, audio format, and language.
- **Every file's details.** The video, audio, and subtitle tracks of every file, with filters, grouping, charts, and CSV export.
- **Issue checks.** Around twenty checks for unreadable files, duplicates, truncated episodes, mislabeled resolutions, gaps in episode numbering, stray files, and empty folders, each showing the space you'd get back.
- **Safe cleanup.** For leftovers that need no judgment, it writes a cleanup script you review and run yourself. The script is a dry run by default, and files go to a quarantine folder instead of being deleted.
- **Incremental scans.** It rescans on a schedule but only reads new or changed files, so after the first full scan, a rescan of a large library takes about a minute.

## Stack / Tools

Python, MediaInfo for reading file headers, SQLite for storage, and a built-in web UI with a matching command line. It runs as an Unraid template, a Docker container, or plain Python.

## Status

In development: working, but not yet feature-complete. Open source under the GPL-3.0 license.
