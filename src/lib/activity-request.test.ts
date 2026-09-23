import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getSameOriginActivityReferer } from "./activity-request.ts";

const requestUrl = "https://blog.example/api/activity/capture";
const sameOriginReferer = "https://blog.example/about?from=home";

const createRequest = (headers: Record<string, string>): Request =>
  new Request(requestUrl, {
    headers,
    method: "POST",
  });

describe("activity request validation", () => {
  it("accepts a same-origin beacon without an Origin header", () => {
    const referer = getSameOriginActivityReferer(
      createRequest({
        Referer: sameOriginReferer,
        "Sec-Fetch-Site": "same-origin",
      })
    );

    assert.equal(referer?.href, sameOriginReferer);
  });

  it("accepts a same-origin beacon with a same-origin Origin", () => {
    const referer = getSameOriginActivityReferer(
      createRequest({
        Origin: "https://blog.example",
        Referer: sameOriginReferer,
        "Sec-Fetch-Site": "same-origin",
      })
    );

    assert.equal(referer?.href, sameOriginReferer);
  });

  it("rejects a forged Referer without browser Fetch Metadata", () => {
    assert.equal(
      getSameOriginActivityReferer(
        createRequest({ Referer: sameOriginReferer })
      ),
      null
    );
  });

  it("rejects cross-site Fetch Metadata", () => {
    assert.equal(
      getSameOriginActivityReferer(
        createRequest({
          Referer: sameOriginReferer,
          "Sec-Fetch-Site": "cross-site",
        })
      ),
      null
    );
  });

  it("rejects a cross-origin Origin", () => {
    assert.equal(
      getSameOriginActivityReferer(
        createRequest({
          Origin: "https://attacker.example",
          Referer: sameOriginReferer,
          "Sec-Fetch-Site": "same-origin",
        })
      ),
      null
    );
  });

  it("rejects a cross-origin Referer", () => {
    assert.equal(
      getSameOriginActivityReferer(
        createRequest({
          Referer: "https://attacker.example/page",
          "Sec-Fetch-Site": "same-origin",
        })
      ),
      null
    );
  });
});
