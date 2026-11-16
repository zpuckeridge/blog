import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  resolveAppleMusicConnectSecret,
  verifyAppleMusicConnectBearer,
} from "@/lib/apple-music-connect-secret";

describe("resolveAppleMusicConnectSecret", () => {
  it("returns APPLE_MUSIC_CONNECT_SECRET when set", () => {
    assert.equal(
      resolveAppleMusicConnectSecret({
        APPLE_MUSIC_CONNECT_SECRET: "apple-connect",
      }),
      "apple-connect"
    );
  });

  it("does not fall back to rhythms or location webhook secrets", () => {
    assert.equal(
      resolveAppleMusicConnectSecret({
        LOCATION_WEBHOOK_SECRET: "location",
        RHYTHMS_WEBHOOK_SECRET: "rhythms",
      } as unknown as Parameters<typeof resolveAppleMusicConnectSecret>[0]),
      null
    );
  });

  it("trims whitespace from the connect secret", () => {
    assert.equal(
      resolveAppleMusicConnectSecret({
        APPLE_MUSIC_CONNECT_SECRET: "  trimmed  ",
      }),
      "trimmed"
    );
  });
});

describe("verifyAppleMusicConnectBearer", () => {
  it("accepts a matching bearer token", () => {
    assert.equal(
      verifyAppleMusicConnectBearer("Bearer secret-value", "secret-value"),
      true
    );
  });

  it("rejects missing or wrong authorization", () => {
    assert.equal(verifyAppleMusicConnectBearer(null, "secret-value"), false);
    assert.equal(
      verifyAppleMusicConnectBearer("Bearer wrong", "secret-value"),
      false
    );
    assert.equal(
      verifyAppleMusicConnectBearer("Bearer secret-value", "other"),
      false
    );
  });
});
