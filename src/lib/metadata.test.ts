import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { Post } from "@/interfaces/content-item";

import {
  buildMetadataUrl,
  buildTimelinePostMetadata,
  createPageMetadata,
  formatPageTitle,
} from "./metadata.ts";

describe("formatPageTitle", () => {
  it("always adds the site suffix, including titles over 60 characters", () => {
    assert.equal(
      formatPageTitle("Work-life balance complaints are overblown"),
      "Work-life balance complaints are overblown — Zacchary Puckeridge"
    );
  });

  it("does not double the suffix or the homepage title", () => {
    assert.equal(
      formatPageTitle("Timeline — Zacchary Puckeridge"),
      "Timeline — Zacchary Puckeridge"
    );
    assert.equal(
      formatPageTitle(
        "Zacchary Puckeridge — Web developer and writer, Brisbane"
      ),
      "Zacchary Puckeridge — Web developer and writer, Brisbane"
    );
  });
});

describe("createPageMetadata", () => {
  it("uses the 1200 by 630 homepage card", () => {
    const meta = createPageMetadata({
      description:
        "Web developer and writer in Brisbane. IT Operations Lead at Star Compass and Haddon Institute; also runs obambulo studio.",
      path: "/",
      title: "Zacchary Puckeridge — Web developer and writer, Brisbane",
    });
    const image = Array.isArray(meta.openGraph?.images)
      ? meta.openGraph.images[0]
      : meta.openGraph?.images;
    assert.equal(image?.url, "https://zacchary.me/og-home.jpg");
    assert.equal(image?.width, 1200);
    assert.equal(image?.height, 630);
    assert.equal(image?.alt, "Portrait of Zacchary Puckeridge");
    assert.equal(buildMetadataUrl("/"), "https://zacchary.me/");
  });
});

describe("buildTimelinePostMetadata", () => {
  it("falls back to the homepage card when a post has no image", () => {
    const post = {
      content: "",
      date_created: new Date("2024-01-01"),
      date_updated: new Date("2024-01-02"),
      description: "Calculate age from a birthdate.",
      id: 1,
      image: "",
      image_alt: "",
      signature: false,
      slug: "react-based-age-calculator",
      status: "published",
      tags: [],
      title: "React based Birthday Age Calculator",
    } satisfies Post;
    const meta = buildTimelinePostMetadata(post, post.slug);
    assert.equal(meta.title, `${post.title} — Zacchary Puckeridge`);
    const image = Array.isArray(meta.openGraph?.images)
      ? meta.openGraph.images[0]
      : meta.openGraph?.images;
    assert.equal(image?.width, 1200);
    assert.equal(image?.height, 630);
    assert.match(meta.description ?? "", /birthdate/u);
  });

  it("points og:image at a 1200px JPEG instead of the original file", () => {
    const post = {
      content: "",
      date_created: new Date("2021-10-02"),
      date_updated: new Date("2021-10-02"),
      description: "Thoughts on the show.",
      id: 2,
      image: "4bba8f13-73d9-4493-99c7-faefed685761",
      image_alt: "BoJack",
      signature: false,
      slug: "thoughts-on-bojack-horseman",
      status: "published",
      tags: ["Art"],
      title: "Thoughts on BoJack Horseman",
    } satisfies Post;
    const meta = buildTimelinePostMetadata(post, post.slug);
    const image = Array.isArray(meta.openGraph?.images)
      ? meta.openGraph.images[0]
      : meta.openGraph?.images;
    assert.equal(
      image?.url,
      "https://zacchary.me/img/4bba8f13-73d9-4493-99c7-faefed685761?format=jpeg&width=1200"
    );
    assert.equal(image?.width, 1200);
    assert.equal(image?.height, undefined);
  });
});
