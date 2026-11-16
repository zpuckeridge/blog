import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { Post } from "@/interfaces/content-item";

import {
  filterPostsForPublicSite,
  isGoneTimelinePath,
  isRemovedTimelinePostSlug,
  isRemovedTimelineTagSlug,
  removedTimelinePaths,
  tagSlugsForPublicSite,
  timelinePermanentRedirect,
} from "./removed-timeline.ts";

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

describe("removed timeline", () => {
  it("marks the OSL-11 slugs and tag as removed", () => {
    assert.equal(
      isRemovedTimelinePostSlug("monitor-windows-with-grafana-and-prometheus"),
      true
    );
    assert.equal(isRemovedTimelinePostSlug("react-based-age-calculator"), true);
    assert.equal(
      isRemovedTimelinePostSlug("resize-a-proxmox-virtual-machine"),
      true
    );
    assert.equal(isRemovedTimelineTagSlug("technical"), true);
    assert.equal(
      isRemovedTimelinePostSlug("ive-been-inspired-by-a-goofy-movie"),
      false
    );
  });

  it("classifies gone paths", () => {
    assert.equal(
      isGoneTimelinePath(
        "/timeline/monitor-windows-with-grafana-and-prometheus"
      ),
      true
    );
    assert.equal(isGoneTimelinePath("/timeline/tag/technical"), true);
    assert.equal(isGoneTimelinePath("/timeline/unknown-post"), false);
    assert.equal(isGoneTimelinePath("/timeline/tag/art"), false);
  });

  it("defines no permanent redirects yet", () => {
    assert.equal(
      timelinePermanentRedirect(
        "/timeline/monitor-windows-with-grafana-and-prometheus"
      ),
      undefined
    );
    assert.equal(removedTimelinePaths().length, 4);
  });

  it("filters removed posts and tag pages from public listings", () => {
    const posts = [
      stubPost("react-based-age-calculator", ["technical"]),
      stubPost("ive-been-inspired-by-a-goofy-movie", ["art"]),
      stubPost("resize-a-proxmox-virtual-machine", ["technical"]),
    ];
    const visible = filterPostsForPublicSite(posts);
    assert.deepEqual(
      visible.map((post) => post.slug),
      ["ive-been-inspired-by-a-goofy-movie"]
    );
    const tags = tagSlugsForPublicSite(posts);
    assert.equal(tags.includes("technical"), false);
    assert.equal(tags.includes("art"), true);
  });
});
