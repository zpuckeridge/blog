import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  headingIdFromText,
  headingLevelShift,
  headingsFromTree,
  shiftedHeadingDepth,
} from "./heading-shift.ts";

describe("headingLevelShift", () => {
  it("lifts a document that starts at h3 so the first heading is h2", () => {
    assert.equal(headingLevelShift([3, 4]), -1);
    assert.equal(shiftedHeadingDepth(3, -1), 2);
    assert.equal(shiftedHeadingDepth(4, -1), 3);
  });

  it("leaves a document that already starts at h2", () => {
    assert.equal(headingLevelShift([2, 3]), 0);
  });

  it("pushes a markdown h1 down under the page title", () => {
    assert.equal(headingLevelShift([1, 2]), 1);
    assert.equal(shiftedHeadingDepth(1, 1), 2);
  });

  it("shifts an h4-only document up to h2", () => {
    assert.equal(headingLevelShift([4]), -2);
    assert.equal(shiftedHeadingDepth(4, -2), 2);
  });
});

describe("headingsFromTree", () => {
  it("skips headings inside footnotes and keeps ids stable", () => {
    const headings = headingsFromTree({
      children: [
        {
          children: [{ type: "text", value: "Monitor Windows" }],
          depth: 3,
          type: "heading",
        },
        {
          children: [
            {
              children: [{ type: "text", value: "Footnote heading" }],
              depth: 2,
              type: "heading",
            },
          ],
          type: "footnoteDefinition",
        },
      ],
      type: "root",
    });

    assert.deepEqual(headings, [
      {
        depth: 3,
        id: headingIdFromText("Monitor Windows"),
        text: "Monitor Windows",
      },
    ]);
    assert.equal(headings[0]?.id, "monitor-windows");
  });
});
