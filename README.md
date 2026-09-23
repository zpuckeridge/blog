# ✍️ Blog

[![React Doctor](https://www.react.doctor/share/badge?p=blog&s=100)](https://www.react.doctor/share?p=blog&s=100)

This personal blog and portfolio uses Astro, Vite, React islands, Directus, Tailwind, shadcn, Framer Motion, and Mux.

## 🚀 Install

Do these steps on your computer:

```bash
# Clone the repository
git clone https://github.com/zpuckeridge/blog

# Copy the env example. Then set the values.
cp .env.example .env.local

# Install the packages
npm install

# Start the development server
npm run dev
```

The development server is available at `https://blog.localhost` through
Portless. To run Astro directly on its normal port, use `PORTLESS=0 npm run dev`.

### Environment variables

Set these values in `.env.local`:

- **DIRECTUS_URL** - Directus instance URL (required for content)
- **DIRECTUS_TOKEN** - Optional static token for private content
- **PUBLIC_SITE_URL** - Canonical site URL (for example `https://zacchary.me`) for RSS, sitemap, and metadata
- **LOOPS_API_KEY** - Newsletter signup via Loops
- **PUBLIC_POSTHOG_KEY** - PostHog analytics
- **PUBLIC_POSTHOG_HOST** - PostHog host (optional)

- **GITHUB_TOKEN** - GitHub contributions graph
- **VIDEO_PASSWORD** - Password protection for videos
- **SPOTIFY\_\*** - Spotify tracking (optional)

## 🚩 Features

- **Directus CMS** - Posts, notes, videos, projects, books, movies, credits, uses
- **MDX content** - Side notes, inline definitions, footnotes, Tweet embeds
- **PostHog analytics**
- **Live activity feed** - Anonymous, city-level pageview stream retained for 24 hours
- **Discord status** - Lanyard integration
- **Status history heatmaps** - Work, home, and Discord online time (365-day graphs)
- **Newsletter** - Loops integration
- **Videos** - Mux player with optional password protection

- **Table of contents** - Per-article navigation
- **Copy link** - Share article links
- **Time to read** - Estimated reading time
- **RSS feed** - `/rss.xml`
- **Carbon rating** - Website Carbon badge
- **Theme toggle** - Light/dark mode

- **GitHub contributions** - Homepage graph

### Status history heatmaps

After deploy, a Cloudflare cron job samples Discord presence (Lanyard REST) and location (KV geofence snapshot) every **five minutes**. Data is stored in `LOCATION_KV` under `status:history:v1` and shown as three GitHub-style graphs on the homepage (at work, at home, Discord online).

- **Discord online** counts `online`, `idle`, and `dnd`; `offline` is not counted.
- **Work / home** minutes use the current geofence category when location is fresh (not stale). `transit` and `away` contribute to observed location time but not work or home totals.
- **Day boundaries** use `Australia/Brisbane`, matching the rest of the site.
- **Retention** is 365 days. Long gaps between samples are capped at 15 minutes so outages do not inflate history.
- **No backfill** — history begins when this feature is deployed; earlier time cannot be reconstructed.

## 📁 Structure

- `/` - Home (timeline preview, projects, Discord status)
- `/timeline` - All posts and notes
- `/activity` - Live anonymous visitor activity
- `/timeline/[slug]` - Individual post (MDX)
- `/videos` - Video index
- `/video/[slug]` - Individual video (Mux)
- `/projects` - Project list

- `/about` - About, books, movies, credits
- `/uses` - Tools, hardware, and services (Directus)
- `/cv` - Resume
- `/colophon` - Tech stack and credits
- `/imprint` - Legal

The activity feed stores only a sanitised page path, title, approximate city-level
location, and timestamp. It does not store IP addresses, visitor identifiers,
user agents, referrers, or query strings.

## 👀 Coming soon

- Tag page
- Article search
- Public statistics (for example Page Speed Insights)
- Improved syntax highlighting
- Setup/resources section (apps, typefaces via Directus)
- Spotify Now Playing widget

## Deploy (Cloudflare Workers)

The production build writes files to `dist/`. Deploy with Wrangler:

```bash
npm run build
npx wrangler deploy
```

Set secrets and vars in the Cloudflare dashboard. You can also use `wrangler secret put`.

`PUBLIC_POSTHOG_KEY` is a public project token. It must be available as a Worker var (see `wrangler.jsonc`) so the SSR layout can pass it into the client island. An empty build-time key used to tree-shake PostHog out of the bundle.
