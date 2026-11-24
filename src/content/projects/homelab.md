---
title: Homelab & Self-Hosting
kind: project
summary: A self-hosted home server platform for media, books, and backups, plus the open-source side projects that grew out of running it.
tags: [Unraid, Docker, Linux, Cloudflare, UniFi, Python]
featured: true
order: 2
---

## What it does

- **Media server with request automation.** Family members ask for something, and it shows up without anyone doing anything by hand.
- **Ebook and audiobook library.** A pipeline that collects, organizes, and serves the library to e-readers and phones.
- **Secure remote access through Cloudflare.** Services are reachable away from home without exposing the home network directly.
- **Isolated download containers.** Download tasks run in VPN-isolated containers, kept separate from everything else.
- **Off-site backups.** Important data is backed up automatically to object storage.

## Side projects

- **Red DiscordBot cog for media requests.** A plugin that lets people request media from a Discord server. TODO (Ethan): add a repo link when it's public.
- **[media-audit](/projects/media-audit/).** An open-source tool that scans a media library and reports storage use, codecs, HDR, and file problems.

## Stack / Tools

Unraid, Docker, Linux, UniFi networking, Cloudflare, and Python for the glue.

## Status

Ongoing. It changes often, and that's the point.
