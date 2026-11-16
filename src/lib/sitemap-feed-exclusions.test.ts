import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { Post } from "@/interfaces/content-item";

import {
  filterPostsForPublicSite,
  removedTimelinePaths,
  tagSlugsForPublicSite,
} from "./removed-timeline.ts";
import { timelinePostPath, timelineTagPath } from "./site.ts";
import { escapeXml } from "./xml-escape.ts";

const stubPost = (slug: string, tags: string[] = []): Post =>
  ({
    content: "",
    date_created: new Date("2024-01-01"),
    date_updated: new Date("2024-01-01"),
    description: "",
    id: 1,
    image: "",
    image_alt: "",
    signature: false,
    slug,
    status: "published",
    tags,
    title: slug,
  }) as Post;

const buildSitemapLocs = (posts: readonly Post[]): string[] => {
  const visible = filterPostsForPublicSite(posts);
  const locs = visible.map((post) => timelinePostPath(post.slug));
  for (const tag of tagSlugsForPublicSite(visible)) {
    locs.push(timelineTagPath(tag));
  }
  return locs;
};

describe("sitemap and feed exclusions", () => {
  it("omits removed paths from generated loc lists", () => {
    const posts = [
      stubPost("monitor-windows-with-grafana-and-prometheus"),
      stubPost("ive-been-inspired-by-a-goofy-movie", ["art"]),
    ];
    const locs = buildSitemapLocs(posts);
    for (const path of removedTimelinePaths()) {
      assert.equal(locs.includes(path), false, path);
    }
    assert.equal(
      locs.includes(timelinePostPath("ive-been-inspired-by-a-goofy-movie")),
      true
    );
  });

  it("keeps XML escaping for slugs that remain", () => {
    assert.equal(
      escapeXml(timelinePostPath("ive-been-inspired-by-a-goofy-movie")),
      "/timeline/ive-been-inspired-by-a-goofy-movie"
    );
  });
});
