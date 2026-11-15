import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { resolveRhythmsWebhookSecret } from "./rhythms-webhook-secret.ts";

describe("resolveRhythmsWebhookSecret", () => {
  it("prefers RHYTHMS_WEBHOOK_SECRET over LOCATION_WEBHOOK_SECRET", () => {
    const secret = resolveRhythmsWebhookSecret(
      {
        LOCATION_WEBHOOK_SECRET: "location-only",
        RHYTHMS_WEBHOOK_SECRET: "rhythms-dedicated",
      },
      {}
    );
    assert.equal(secret, "rhythms-dedicated");
  });

  it("falls back to LOCATION_WEBHOOK_SECRET when rhythms secret is unset", () => {
    const secret = resolveRhythmsWebhookSecret(
      { LOCATION_WEBHOOK_SECRET: "location-only" },
      {}
    );
    assert.equal(secret, "location-only");
  });

  it("reads process env when Worker bindings are unset", () => {
    const secret = resolveRhythmsWebhookSecret(
      {},
      {
        RHYTHMS_WEBHOOK_SECRET: "from-process",
      }
    );
    assert.equal(secret, "from-process");
  });

  it("returns null when no secret is configured", () => {
    assert.equal(resolveRhythmsWebhookSecret({}, {}), null);
  });
});
