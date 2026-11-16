import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  articleHeadingOutline,
  headingIdFromText,
  headingLevelShift,
  headingShiftForDepth,
  headingsFromTree,
  shiftedHeadingDepth,
} from "./heading-shift.ts";

describe("headingShiftForDepth", () => {
  it("lifts h3-first posts even when a later h2 exists in markdown", () => {
    assert.equal(headingShiftForDepth(3, 3), -1);
    assert.equal(headingShiftForDepth(2, 3), 0);
    assert.equal(shiftedHeadingDepth(3, -1), 2);
    assert.equal(shiftedHeadingDepth(2, 0), 2);
  });

  it("lifts an h3-only document so every section is under h2", () => {
    assert.equal(headingShiftForDepth(3, 3), -1);
    assert.equal(headingShiftForDepth(4, 3), -1);
    assert.equal(shiftedHeadingDepth(3, -1), 2);
    assert.equal(shiftedHeadingDepth(4, -1), 3);
  });

  it("leaves a document that already starts at h2", () => {
    assert.equal(headingShiftForDepth(2, 2), 0);
    assert.equal(headingShiftForDepth(3, 2), 0);
  });

  it("pushes a markdown h1 down under the page title", () => {
    assert.equal(headingShiftForDepth(1, 1), 1);
    assert.equal(headingShiftForDepth(2, 1), 1);
    assert.equal(shiftedHeadingDepth(1, 1), 2);
  });

  it("shifts an h4-only document up to h2", () => {
    assert.equal(headingShiftForDepth(4, 4), -2);
    assert.equal(shiftedHeadingDepth(4, -2), 2);
  });
});

describe("headingLevelShift (legacy min-depth)", () => {
  it("matches the old behaviour when no shallow headings trail deeper ones", () => {
    assert.equal(headingLevelShift([3, 4]), -1);
    assert.equal(headingLevelShift([2, 3]), 0);
    assert.equal(headingLevelShift([1, 2]), 1);
    assert.equal(headingLevelShift([4]), -2);
  });
});

describe("articleHeadingOutline", () => {
  it("outlines h3-first posts with the first heading at h2", () => {
    const { headings } = articleHeadingOutline({
      children: [
        {
          children: [{ type: "text", value: "Intro" }],
          depth: 3,
          type: "heading",
        },
        {
          children: [{ type: "text", value: "Wrap-up" }],
          depth: 2,
          type: "heading",
        },
      ],
      type: "root",
    });

    assert.deepEqual(
      headings.map((heading) => [heading.text, heading.depth]),
      [
        ["Intro", 2],
        ["Wrap-up", 2],
      ]
    );
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
