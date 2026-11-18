import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";
import { afterEach, describe, it } from "node:test";

import {
  APPLE_MUSIC_POLL_STATE_KV_KEY,
  APPLE_MUSIC_USER_TOKEN_KV_KEY,
  parseAppleMusicPollState,
} from "@/lib/apple-music-kv";
import { recordAppleMusicRecent } from "@/lib/record-apple-music-recent";

const originalFetch = globalThis.fetch;

const { privateKey } = generateKeyPairSync("ec", { namedCurve: "prime256v1" });
const testPrivateKeyPem = privateKey.export({
  format: "pem",
  type: "pkcs8",
}) as string;

const signingEnv = {
  APPLE_MUSIC_KEY_ID: "TESTKEY",
  APPLE_MUSIC_PRIVATE_KEY: testPrivateKeyPem,
  APPLE_MUSIC_TEAM_ID: "TEAMTEST",
  APPLE_MUSIC_USER_TOKEN: "test-user-token",
};

const song = (id: string) => ({
  attributes: { artistName: "Artist", name: `Track ${id}` },
  id,
  type: "songs",
});

const createKv = (seed?: Record<string, string>) => {
  const store = new Map<string, string>(Object.entries(seed ?? {}));

  return {
    kv: {
      get: (key: string) => Promise.resolve(store.get(key) ?? null),
      put: (key: string, value: string) => {
        store.set(key, value);
        return Promise.resolve();
      },
    },
    store,
  };
};

describe("recordAppleMusicRecent", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("keeps the poll baseline when Apple returns an empty track list", async () => {
    globalThis.fetch = () =>
      Promise.resolve(
        Response.json({
          data: [],
        })
      );

    const pollState = JSON.stringify({
      trackIds: ["keep-me"],
      updatedAt: 1,
    });
    const bucket = createKv({
      [APPLE_MUSIC_POLL_STATE_KV_KEY]: pollState,
      [APPLE_MUSIC_USER_TOKEN_KV_KEY]: "kv-user-token",
    });

    const result = await recordAppleMusicRecent(
      bucket.kv,
      signingEnv,
      2_000_000
    );

    assert.equal(result.skippedEmptyPoll, true);
    assert.equal(result.ingested, 0);
    assert.deepEqual(
      parseAppleMusicPollState(
        bucket.store.get(APPLE_MUSIC_POLL_STATE_KV_KEY) ?? null
      )?.trackIds,
      ["keep-me"]
    );
  });

  it("ingests a new track on the poll after the baseline", async () => {
    let call = 0;
    globalThis.fetch = () => {
      call += 1;
      if (call === 1) {
        return Promise.resolve(
          Response.json({
            data: [song("baseline")],
          })
        );
      }

      return Promise.resolve(
        Response.json({
          data: [song("fresh"), song("baseline")],
        })
      );
    };

    const bucket = createKv({
      [APPLE_MUSIC_USER_TOKEN_KV_KEY]: "kv-user-token",
    });

    const baseline = await recordAppleMusicRecent(
      bucket.kv,
      signingEnv,
      1_000_000
    );
    assert.equal(baseline.baselineOnly, true);

    const second = await recordAppleMusicRecent(
      bucket.kv,
      signingEnv,
      1_030_000
    );

    assert.equal(second.ingested, 1);
    assert.equal(second.recents[0]?.track, "Track fresh");
    assert.equal(second.recents[0]?.source, "apple");
  });
});
