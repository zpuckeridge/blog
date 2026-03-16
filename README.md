# ✍️ Blog

[![React Doctor](https://www.react.doctor/share/badge?p=blog&s=100)](https://www.react.doctor/share?p=blog&s=100)

Personal blog and portfolio built with Next.js, Directus, Tailwind, shadcn, Framer Motion, and Mux.

## 🚀 Install

To get started locally:

```bash
# Clone the repository
git clone https://github.com/zpuckeridge/blog

# Copy the env example and configure
cp .env.example .env.local

# Install packages
bun install

# Run the dev server
bun run dev
```

### Environment variables

Configure `.env.local` with:

- **DIRECTUS_URL** – Directus instance URL (required for content)
- **DIRECTUS_TOKEN** – Optional static token for private content
- **LOOPS_API_KEY** – Newsletter signup via Loops
- **NEXT_PUBLIC_POSTHOG_KEY** – PostHog analytics
- **NEXT_PUBLIC_POSTHOG_HOST** – PostHog host (optional)
- **GITHUB_TOKEN** – GitHub contributions graph
- **VIDEO_PASSWORD** – Password protection for videos
- **SPOTIFY\_\*** – Spotify tracking (optional)

## 🚩 Features

- **Directus CMS** – Posts, notes, videos, projects, books, movies, credits
- **MDX content** – Side notes, inline definitions, footnotes, Tweet embeds
- **PostHog analytics**
- **Discord status** – Lanyard integration
- **Newsletter** – Loops integration
- **Videos** – Mux player with optional password protection
- **Table of contents** – Per-article navigation
- **Copy link** – Share article links
- **Time to read** – Estimated reading time
- **RSS feed** – `/rss.xml`
- **Carbon rating** – Website Carbon badge
- **Theme toggle** – Light/dark mode
- **GitHub contributions** – Homepage graph

## 📁 Structure

- `/` – Home (timeline preview, projects, Discord status)
- `/timeline` – All posts and notes
- `/timeline/[slug]` – Individual post (MDX)
- `/videos` – Video index
- `/video/[slug]` – Individual video (Mux)
- `/projects` – Project list
- `/about` – About, uses, books, movies, credits
- `/cv` – Resume
- `/colophon` – Tech stack and credits
- `/imprint` – Legal

## 👀 Coming soon

- Tag page
- Article search
- Public statistics (e.g. Page Speed Insights)
- Improved syntax highlighting
- Setup/resources section (uses, apps, typefaces via Directus)
- Spotify Now Playing widget
