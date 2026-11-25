import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { fitImageFrame } from "./image-zoom-frame.ts";

describe("fitImageFrame", () => {
  it("fits a landscape image to the width and centers it vertically", () => {
    assert.deepEqual(fitImageFrame(2, { height: 800, width: 1000 }, 0), {
      height: 500,
      left: 0,
      top: 150,
      width: 1000,
    });
  });

  it("fits a portrait image to the height and centers it horizontally", () => {
    assert.deepEqual(fitImageFrame(0.5, { height: 800, width: 1000 }, 0), {
      height: 800,
      left: 300,
      top: 0,
      width: 400,
    });
  });

  it("keeps the image inside the margin", () => {
    assert.deepEqual(fitImageFrame(1, { height: 800, width: 1000 }, 50), {
      height: 700,
      left: 150,
      top: 50,
      width: 700,
    });
  });

  it("fits a 4:3 photo inside the viewport instead of covering it", () => {
    const frame = fitImageFrame(4 / 3, { height: 1188, width: 2112 }, 24);

    assert.equal(Math.round(frame.width), 1520);
    assert.equal(Math.round(frame.height), 1140);
    assert.equal(Math.round(frame.left), 296);
    assert.equal(frame.top, 24);
    assert.ok(frame.width < 2112 - 48);
  });

  it("treats a missing aspect ratio as square", () => {
    assert.deepEqual(
      fitImageFrame(Number.NaN, { height: 400, width: 400 }, 0),
      {
        height: 400,
        left: 0,
        top: 0,
        width: 400,
      }
    );
  });
});
