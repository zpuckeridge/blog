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

  it("allows Video.js to play Mux HLS and report Mux Data", () => {
    assert.match(
      HTML_CONTENT_SECURITY_POLICY,
      /connect-src[^;]*https:\/\/\*\.mux\.com/u
    );
    assert.match(
      HTML_CONTENT_SECURITY_POLICY,
      /connect-src[^;]*https:\/\/\*\.litix\.io/u
    );
    assert.match(HTML_CONTENT_SECURITY_POLICY, /media-src[^;]*blob:/u);
    assert.match(HTML_CONTENT_SECURITY_POLICY, /worker-src[^;]*blob:/u);
    assert.match(
      HTML_CONTENT_SECURITY_POLICY,
      /style-src[^;]*'unsafe-inline'/u
    );
    assert.match(HTML_CONTENT_SECURITY_POLICY, /img-src[^;]*https:/u);
  });

  it("allows react-tweet syndication API fetches", () => {
    assert.match(
      HTML_CONTENT_SECURITY_POLICY,
      /connect-src[^;]*https:\/\/react-tweet\.vercel\.app/u
    );
  });
});
