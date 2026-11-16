import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { resolveAppleMusicConnectSecret } from "@/lib/apple-music-connect-secret";

describe("resolveAppleMusicConnectSecret", () => {
  it("prefers APPLE_MUSIC_CONNECT_SECRET", () => {
    assert.equal(
      resolveAppleMusicConnectSecret({
        APPLE_MUSIC_CONNECT_SECRET: "apple",
        LOCATION_WEBHOOK_SECRET: "location",
        RHYTHMS_WEBHOOK_SECRET: "rhythms",
      }),
      "apple"
    );
  });

  it("falls back to rhythms then location secrets", () => {
    assert.equal(
      resolveAppleMusicConnectSecret({
        LOCATION_WEBHOOK_SECRET: "location",
        RHYTHMS_WEBHOOK_SECRET: "rhythms",
      }),
      "rhythms"
    );
    assert.equal(
      resolveAppleMusicConnectSecret({
        LOCATION_WEBHOOK_SECRET: "location",
      }),
      "location"
    );
  });
});