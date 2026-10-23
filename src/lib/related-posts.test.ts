import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { Post } from "@/interfaces/content-item";

import { postsForTag, relatedPostLinks, tagSlug } from "./related-posts.ts";

const post = (overrides: Partial<Post>): Post => ({
  content: "",
  date_created: new Date("2024-01-01"),
  date_updated: new Date("2024-01-01"),
  description: "",
  id: 1,
  image: "",
  image_alt: "",
  signature: false,
  slug: "one",
  status: "published",
  tags: [],
  title: "One",
  ...overrides,
});

describe("tagSlug", () => {
  it("slugifies tags for archive URLs", () => {
    assert.equal(tagSlug("Worldview & Faith"), "worldview-faith");
  });
});

describe("relatedPostLinks", () => {
  const posts = [
    post({
      date_created: new Date("2024-03-01"),
      id: 1,
      slug: "grafana",
      tags: ["Observability"],
      title: "Grafana",
    }),
    post({
      date_created: new Date("2024-02-01"),
      id: 2,
      slug: "metrics",
      tags: ["observability", "Notes"],
      title: "Metrics",
    }),
    post({
      date_created: new Date("2024-01-01"),
      id: 3,
      slug: "faith",
      tags: ["Faith"],
      title: "Faith",
    }),
    post({
      date_created: new Date("2024-04-01"),
      id: 4,
      slug: "dashboards",
      tags: ["Observability"],
      title: "Dashboards",
    }),
  ];

  it("returns up to three newer posts that share a tag, excluding the current post", () => {
    const related = relatedPostLinks(posts[0], posts);
    assert.deepEqual(
      related.map((item) => item.slug),
      ["dashboards", "metrics"]
    );
  });

  it("lists posts for a tag slug", () => {
    assert.deepEqual(
      postsForTag(posts, "observability").map((item) => item.slug),
      ["dashboards", "grafana", "metrics"]
    );
  });
});
