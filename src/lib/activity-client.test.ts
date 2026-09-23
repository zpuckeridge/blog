import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  formatActivityClientLabel,
  hashActivityVisitorKey,
} from "./activity-client.ts";

describe("formatActivityClientLabel", () => {
  it("describes common desktop browsers", () => {
    assert.equal(
      formatActivityClientLabel(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15"
      ),
      "Safari on macOS"
    );
    assert.equal(
      formatActivityClientLabel(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      ),
      "Chrome on Windows"
    );
  });

  it("returns null for empty user agents", () => {
    assert.equal(formatActivityClientLabel(""), null);
    assert.equal(formatActivityClientLabel(null), null);
  });
});

describe("hashActivityVisitorKey", () => {
  it("changes when the user agent changes", async () => {
    const visitorId = "visitor-123";
    const desktop = await hashActivityVisitorKey(
      visitorId,
      "Mozilla/5.0 (Macintosh; Intel Mac OS X) Safari/605.1.15"
    );
    const mobile = await hashActivityVisitorKey(
      visitorId,
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Safari/604.1"
    );

    assert.ok(desktop);
    assert.ok(mobile);
    assert.notEqual(desktop, mobile);
  });
});
