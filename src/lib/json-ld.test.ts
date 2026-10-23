import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildJsonLdPayload } from "./json-ld.ts";

const typeOf = (payload: Record<string, unknown> | null): unknown => {
  if (!payload) {
    return null;
  }
  if (Array.isArray(payload["@graph"])) {
    return (payload["@graph"] as Record<string, unknown>[]).map(
      (node) => node["@type"]
    );
  }
  return payload["@type"];
};

describe("buildJsonLdPayload", () => {
  it("emits BlogPosting with image, publisher, and language", () => {
    const payload = buildJsonLdPayload({
      description: "A post.",
      imageUrls: ["https://zacchary.me/og-home.jpg"],
      pathname: "/timeline/grafana",
      title: "Grafana — Zacchary Puckeridge",
      type: "article",
      url: "https://zacchary.me/timeline/grafana",
    });
    assert.equal(payload?.["@type"], "BlogPosting");
    assert.equal(payload?.headline, "Grafana");
    assert.equal(payload?.inLanguage, "en-AU");
    assert.deepEqual(payload?.image, ["https://zacchary.me/og-home.jpg"]);
    assert.deepEqual(payload?.publisher, {
      "@type": "Person",
      name: "Zacchary Puckeridge",
      url: "https://zacchary.me/",
    });
  });

  it("emits ProfilePage on about and cv", () => {
    const payload = buildJsonLdPayload({ pathname: "/cv" });
    assert.deepEqual(typeOf(payload), ["Person", "ProfilePage"]);
  });

  it("emits a blog collection on the timeline", () => {
    const payload = buildJsonLdPayload({
      collectionItems: [
        {
          datePublished: "2024-01-01T00:00:00.000Z",
          headline: "Grafana",
          url: "https://zacchary.me/timeline/grafana",
        },
      ],
      pathname: "/timeline",
    });
    assert.deepEqual(payload?.["@type"], ["CollectionPage", "Blog"]);
    const posts = payload?.blogPost as Record<string, unknown>[];
    assert.equal(posts[0]?.["@type"], "BlogPosting");
    assert.equal(posts[0]?.headline, "Grafana");
  });
});
