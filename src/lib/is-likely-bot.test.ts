import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isLikelyBotUserAgent } from "./is-likely-bot.ts";

describe("isLikelyBotUserAgent", () => {
  it("flags crawlers and audit tools", () => {
    assert.equal(isLikelyBotUserAgent("Googlebot/2.1"), true);
    assert.equal(
      isLikelyBotUserAgent("Mozilla/5.0 (compatible; Pingdom)"),
      true
    );
  });

  it("allows a normal browser user agent", () => {
    assert.equal(
      isLikelyBotUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
      ),
      false
    );
  });
});
