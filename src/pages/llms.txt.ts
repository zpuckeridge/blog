import type { APIRoute } from "astro";

import { getPosts } from "@/lib/directus-content";
import { pagesWhere } from "@/lib/public-pages";
import { comparePostsByNewest } from "@/lib/related-posts";
import { personName, timelinePostPath } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

const link = (label: string, url: string): string => `- [${label}](${url})`;

export const GET: APIRoute = async () => {
  const baseUrl = getSiteUrl();
  let posts: { slug: string; title: string }[] = [];

  try {
    const published = await getPosts();
    posts = published
      .toSorted(comparePostsByNewest)
      .map((post) => ({ slug: post.slug, title: post.title }));
  } catch (error) {
    console.error("llms.txt: failed to list posts", error);
  }

  const pages = pagesWhere("llms").map((page) =>
    link(page.label, `${baseUrl}${page.href}`)
  );

  const postLinks = posts.map((post) =>
    link(post.title, `${baseUrl}${timelinePostPath(post.slug)}`)
  );

  const body = `# ${personName}

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
