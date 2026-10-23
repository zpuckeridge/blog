import type { APIRoute } from "astro";

import { getPosts } from "@/lib/directus-content";
import { getSiteUrl } from "@/lib/site-url";

const link = (label: string, url: string): string => `- [${label}](${url})`;

export const GET: APIRoute = async () => {
  const baseUrl = getSiteUrl().replace(/\/$/u, "");
  let posts: { slug: string; title: string }[] = [];

  try {
    const published = await getPosts();
    posts = published
      .toSorted(
        (left, right) =>
          new Date(right.date_created).getTime() -
          new Date(left.date_created).getTime()
      )
      .map((post) => ({ slug: post.slug, title: post.title }));
  } catch (error) {
    console.error("llms.txt: failed to list posts", error);
  }

  const pages = [
    link("Home", `${baseUrl}/`),
    link("About", `${baseUrl}/about`),
    link("Timeline", `${baseUrl}/timeline`),
    link("Activity", `${baseUrl}/activity`),
    link("Projects", `${baseUrl}/projects`),
    link("CV", `${baseUrl}/cv`),
    link("Uses", `${baseUrl}/uses`),
    link("Books", `${baseUrl}/about/books`),
    link("Movies", `${baseUrl}/about/movies`),
    link("Credits", `${baseUrl}/about/credits`),
    link("Colophon", `${baseUrl}/colophon`),
    link("Imprint", `${baseUrl}/imprint`),
    link("RSS", `${baseUrl}/rss.xml`),
  ];

  const postLinks = posts.map((post) =>
    link(post.title, `${baseUrl}/timeline/${post.slug}`)
  );

  const body = `# Zacchary Puckeridge

[${baseUrl}](${baseUrl}/) is the personal site of Zacchary Puckeridge, a web developer and writer in Brisbane, Australia. He is IT Operations Lead at Star Compass and Haddon Institute, and runs obambulo studio.

## Key pages

${pages.join("\n")}

## Posts

${postLinks.length > 0 ? postLinks.join("\n") : "- Posts are published on the timeline."}
`;

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
