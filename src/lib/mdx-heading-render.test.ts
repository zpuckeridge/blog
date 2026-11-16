import assert from "node:assert/strict";
import { describe, it } from "node:test";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { MdxContent } from "@/components/mdx-content.tsx";

describe("MdxContent heading order", () => {
  it("renders h3 markdown as h2 when the post leads with h3", () => {
    const html = renderToStaticMarkup(
      React.createElement(MdxContent, {
        contentSlug: "work-life-balance",
        source: "### Balance\n\nCopy\n\n#### Detail\n\nMore\n",
      })
    );

    const tags = [
      ...html.matchAll(/<h(?<level>[1-6])[^>]*data-md-depth="(?<depth>\d+)"/gu),
    ].map((match) => ({
      depthAttr: Number(match.groups?.depth),
      tag: `h${match.groups?.level}`,
    }));

    assert.deepEqual(tags, [
      { tag: "h2", depthAttr: 3 },
      { tag: "h3", depthAttr: 4 },
    ]);
  });

  it("keeps later markdown h2 at h2 when the post leads with h3", () => {
    const html = renderToStaticMarkup(
      React.createElement(MdxContent, {
        contentSlug: "mixed",
        source: "### Intro\n\nx\n\n## Later\n\ny\n",
      })
    );

    assert.match(html, /<h2[^>]*data-md-depth="3"[^>]*>[\s\S]*Intro/u);
    assert.match(html, /<h2(?![^>]*data-md-depth)[^>]*>[\s\S]*Later/u);
  });
});
