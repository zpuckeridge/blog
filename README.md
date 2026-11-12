# ✍️ Blog

![React Doctor](https://www.react.doctor/share/badge?p=blog&s=100)

Personal site and portfolio. **Astro 7** on **Cloudflare Workers** (SSR), **React 19** islands, **Directus**, **Tailwind CSS 4**, **Base UI**, **safe-mdx**, **Mux**, and **Lanyard**.

## 🚀 Install

```bash
git clone https://github.com/zpuckeridge/blog
cd blog
cp .env.example .env.local
bun install
bun run dev
```

Development opens at `https://blog.localhost` via [Portless](https://github.com/Portless-AI/portless). For Astro’s default port, use `PORTLESS=0 bun run dev`.

Local preview after a production build:

```bash
bun run preview
```

### Environment variables

Set these in `.env.local` (and matching Worker secrets in production):

| Variable                    | Purpose                                                                   |
| --------------------------- | ------------------------------------------------------------------------- |
| **DIRECTUS_URL**            | Directus instance URL (required for content)                              |
| **DIRECTUS_TOKEN**          | Read-only static token (required; public collection read is disabled)     |
| **PUBLIC_SITE_URL**         | Canonical URL (e.g. `https://zacchary.me`) for RSS, sitemap, and metadata |
| **LOOPS_API_KEY**           | Newsletter signups via [Loops](https://loops.so)                          |
| **GITHUB_TOKEN**            | GitHub contributions graph                                                |
| **VIDEO_PASSWORD**          | Password gate for `/videos` and `/video/`*                                |
| **LOCATION_WEBHOOK_SECRET** | Authenticates iOS Shortcuts location webhooks (`/api/location`)           |

For `astro dev` / `wrangler dev`, put **VIDEO_PASSWORD** and **LOCATION_WEBHOOK_SECRET** in `.dev.vars` as well (gitignored).

## 🚩 Features

### Content

- **Directus CMS** — Posts, notes, videos, projects, books, movies, credits, uses
- **Timeline** — Posts and short notes in one list; filter notes, search titles, filter by tag
- **Tag pages** — `/timeline/tag/[tag]`
- **MDX (safe-mdx)** — Side notes, inline definitions, GFM footnotes, Tweet embeds, YouTube facade
- **Related posts** — Links at the bottom of each article
- **Newsletter** — Loops integration on posts

### Media

- **Videos** — Mux player with optional site-wide password protection
- **Images** — Directus assets via `/img/`* with Cloudflare Images resizing
- **Image zoom** — Click-to-zoom on content images (navigation)

### Presence and listening

- **Location status** — iOS Shortcuts webhook + KV geofence; shown on the homepage
- **Discord status** — Lanyard (REST + WebSocket on the client)
- **Apple Music** — Now playing from Discord activity via Lanyard; recent tracks on the homepage
- **Music history** — `/music` lists the last 1,000 plays (KV), fed by a Worker cron poll
- **Status history heatmaps** — Work, home, and Discord online time (365 days) on `/activity`

### Activity

- **Live activity feed** — Anonymous visitor stream (paths, titles, coarse client label, city-level location); 24-hour retention in a **Durable Object** (`ActivityFeedStore`)
- **Listening in the feed** — Site listens (track clicks) appear as `listened` events alongside page views

### Article UX

- **Table of contents** — Per-article navigation
- **Copy link** — Share article URLs
- **Time to read** — Estimated reading time

### Site

- **RSS** — `/rss.xml`
- **Sitemap & robots** — Generated routes
- **llms.txt** — `/llms.txt` for crawlers and LLMs
- **Carbon rating** — Website Carbon badge (colophon)
- **Theme toggle** — Light/dark on the homepage; `m` opens the nav menu (desktop menu / mobile drawer)
- **GitHub contributions** — Homepage graph
- **Security headers** — CSP and related headers on HTML responses

### Status history heatmaps

A Cloudflare cron runs **every minute**. Each run may poll Lanyard for Discord + Apple Music listening and, on a **five-minute sample bucket**, record location and Discord presence into `LOCATION_KV` under `status:history:v1`. Graphs live on `/activity` (not the homepage).

- **Discord online** counts `online`, `idle`, and `dnd`; `offline` is not counted.
- **Work / home** use the current geofence category when location is fresh (not stale). `transit` and `away` count toward observed location time but not work or home totals.
- **Day boundaries** use `Australia/Brisbane`.
- **Retention** is 365 days. Gaps between samples are capped at 15 minutes so outages do not inflate history.
- **No backfill** — history starts when this feature is deployed.

## 📁 Structure

| Route                                                       | Description                                                                    |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `/`                                                         | Home — projects, recent articles, GitHub graph, location, Discord, now playing |
| `/timeline`                                                 | All posts and notes (search and tag filters)                                   |
| `/timeline/[slug]`                                          | Post (MDX)                                                                     |
| `/timeline/tag/[tag]`                                       | Posts for one tag                                                              |
| `/activity`                                                 | Status heatmaps + live visitor activity                                        |
| `/music`                                                    | Apple Music listen history                                                     |
| `/videos`, `/video/[slug]`                                  | Video index and player (password gate)                                         |
| `/projects`                                                 | Project list                                                                   |
| `/about`, `/about/books`, `/about/movies`, `/about/credits` | About and lists                                                                |
| `/uses`                                                     | Tools and gear (Directus)                                                      |
| `/cv`                                                       | Résumé                                                                         |
| `/colophon`                                                 | Stack, type, and credits                                                       |
| `/imprint`                                                  | Legal                                                                          |
| `/rss.xml`, `/sitemap.xml`, `/llms.txt`                     | Feeds and discovery                                                            |

`/blog` redirects to `/timeline`.

The activity feed stores a sanitised path, title, approximate city-level location, timestamp, coarse browser/OS label, and optional listening metadata. Rows are keyed by a hashed cookie id plus User-Agent. It does not store raw IPs, full user agents, referrers, or query strings.

## Deploy (Cloudflare Workers)

```bash
bun run deploy
```

`predeploy` runs Ultracite, React Doctor, TypeScript, and knip. The build writes to `dist/`; **Wrangler** serves assets and runs `src/worker.ts` (scheduled polls, Durable Objects, KV).

Configure **KV** (`LOCATION_KV`), **Durable Objects** (`ActivityFeedStore`), **Images**, cron triggers, and secrets in the Cloudflare dashboard or with `wrangler secret put`.
