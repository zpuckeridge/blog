import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import SiteImage from "../components/site-image.tsx";

const heroSrc = "/img/file?format=webp&quality=80&width=640";

describe("SiteImage priority", () => {
  it("fetches a priority image immediately and does not defer decoding", () => {
    const html = renderToStaticMarkup(
      createElement(SiteImage, {
        alt: "Hero",
        priority: true,
        src: heroSrc,
      })
    );

    assert.match(html, /fetchpriority="high"/iu);
    assert.match(html, /loading="eager"/u);
    assert.match(html, /decoding="sync"/u);
    assert.doesNotMatch(html, /loading="lazy"/u);
    assert.doesNotMatch(html, /decoding="async"/u);
  });

  it("still lazy-loads images that are not the priority", () => {
    const html = renderToStaticMarkup(
      createElement(SiteImage, { alt: "Later", src: heroSrc })
    );

    assert.match(html, /loading="lazy"/u);
    assert.match(html, /decoding="async"/u);
    assert.doesNotMatch(html, /fetchpriority=/iu);
  });
});
