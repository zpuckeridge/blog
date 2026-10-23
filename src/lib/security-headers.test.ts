import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { HTML_CONTENT_SECURITY_POLICY } from "./security-headers.ts";

describe("HTML_CONTENT_SECURITY_POLICY", () => {
  it("allows the Cloudflare Web Analytics beacon and challenge scripts", () => {
    assert.match(
      HTML_CONTENT_SECURITY_POLICY,
      /script-src[^;]*https:\/\/static\.cloudflareinsights\.com/u
    );
    assert.match(
      HTML_CONTENT_SECURITY_POLICY,
      /script-src[^;]*https:\/\/challenges\.cloudflare\.com/u
    );
    assert.match(
      HTML_CONTENT_SECURITY_POLICY,
      /connect-src[^;]*https:\/\/cloudflareinsights\.com/u
    );
  });
});
