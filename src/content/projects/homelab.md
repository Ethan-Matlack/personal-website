---
kind: project
title: Homelab & Self-Hosting
summary: An Unraid server running a containerized media and networking stack (Plex, the *arr apps, a book library, and self-hosted DNS and remote access), plus some custom self-hosted tools.
# role:
# started:
# ended:
status: active
# links:
#   site:
#   repo:
#   paper:
tags: [Unraid, Docker, Linux, Cloudflare, Plex, UniFi, Python]
# cover:
# coverCaption:
featured: true
order: 4
draft: false
---

## What it does

Everything runs as Docker containers on an Unraid server, with a custom dashboard that shows live array, network, and container stats alongside every service.

- **Watching and reading.** Plex for movies, TV, and music; Audiobookshelf for audiobooks and podcasts; Kavita for ebooks, comics, and manga.
- **Requests.** Family members request movies and shows through Seerr, and books and audiobooks through Shelfmark. Once requested, things show up without anyone doing anything by hand.
- **The \*arr stack.** Radarr, Sonarr (separate instances for standard TV and anime), and Lidarr track what's wanted, upgrade quality over time, and rename and file everything consistently. Calibre-Web Automated does the same for the book library.
- **Keeping it tidy.** Profilarr keeps quality profiles in sync across the \*arr apps, and Cleanuparr clears out stalled and unwanted items automatically.
- **Isolated downloads.** Download tasks run in their own VPN-isolated container, kept separate from everything else.
- **Networking and remote access.** Nginx Proxy Manager is the reverse proxy, Technitium provides internal DNS, and a Cloudflare Tunnel makes services reachable away from home without opening ports on the home network.
- **Off-site backups.** Appdata and other important data is backed up automatically to Blackblaze using Backrest (restic.)

## Side projects

- **Red DiscordBot cog for media requests.** A plugin that lets people request media using seerr from a Discord server. It even links dicord and seerr accounts to ping users when downloads are ready. This might eventually get a public repo when I get the time to make it fully-featured and truly bug test it.
- **[media-audit](/projects/media-audit/).** An open-source tool that scans a media library and reports storage use, codecs, HDR, and file problems.

## Stack / Tools

Unraid, Docker, Plex, the \*arr apps, Nginx Proxy Manager, Technitium DNS, Cloudflare Tunnel, UniFi networking, getHomepage, Netdata, Glances, qBittorrent, Wireguard, Backrest, and assorted scripts.

## Status

Ongoing. The core infrastructure is mostly untouched day-to-day and is remarkably stable. Backups, updates, and reporting are all automated. I enjoy tinkering, but I still want a stable environment.
