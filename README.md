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

- **Directus CMS** - Posts, notes, videos, projects, books, movies, credits
- **MDX content** - Side notes, inline definitions, footnotes, Tweet embeds
- **PostHog analytics**
- **Discord status** - Lanyard integration
- **Newsletter** - Loops integration
- **Videos** - Mux player with optional password protection

- **Table of contents** - Per-article navigation
- **Copy link** - Share article links
- **Time to read** - Estimated reading time
- **RSS feed** - `/rss.xml`
- **Carbon rating** - Website Carbon badge
- **Theme toggle** - Light/dark mode

- **GitHub contributions** - Homepage graph

## 📁 Structure

- `/` - Home (timeline preview, projects, Discord status)
- `/timeline` - All posts and notes
- `/timeline/[slug]` - Individual post (MDX)
- `/videos` - Video index
- `/video/[slug]` - Individual video (Mux)
- `/projects` - Project list

- `/about` - About, uses, books, movies, credits
- `/cv` - Resume
- `/colophon` - Tech stack and credits
- `/imprint` - Legal

## 👀 Coming soon

- Tag page
- Article search
- Public statistics (for example Page Speed Insights)
- Improved syntax highlighting
- Setup/resources section (uses, apps, typefaces via Directus)
- Spotify Now Playing widget

## Deploy (Cloudflare Workers)

The production build writes files to `dist/`. Deploy with Wrangler:

```bash
npm run build
npx wrangler deploy
```

Set secrets and vars in the Cloudflare dashboard. You can also use `wrangler secret put`.
