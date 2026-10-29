import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import {
  LISTENING_HISTORY_KV_KEY,
  parseListenHistory,
} from "@/lib/listening-history";
import {
  LISTENING_RECENTS_KV_KEY,
  parseRecentListens,
} from "@/lib/listening-recents";
import { recordListeningRecent } from "@/lib/record-listening-recent";

const originalFetch = globalThis.fetch;
const originalNow = Date.now;

let now = Date.UTC(2026, 9, 29, 5, 0);

const activity = (
  track: string,
  startedAt: number | null,
  artist = "Artist"
) => ({
  assets: { large_text: `${track} Album` },
  details: track,
  details_url: `https://music.apple.com/au/album/${track}/1?i=2`,
  name: "Apple Music",
  state: `${artist} · ${track} Album`,
  state_url: "https://music.apple.com/au/artist/example/3",
  timestamps: startedAt === null ? undefined : { start: startedAt },
  type: 2,
});

const mockPresence = (activities: unknown[]) => {
  globalThis.fetch = () =>
    Promise.resolve(
      Response.json({
        data: { activities },
        success: true,
      })
    );
};

const createKv = () => {
  const store = new Map<string, string>();
  const writes: string[] = [];

  return {
    kv: {
      get: (key: string) => Promise.resolve(store.get(key) ?? null),
      put: (key: string, value: string) => {
        writes.push(key);
        store.set(key, value);
        return Promise.resolve();
      },
    },
    store,
    writes,
  };
};

describe("recordListeningRecent", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
    Date.now = originalNow;
    now = Date.UTC(2026, 9, 29, 5, 0);
  });

  it("stores a play once across polls and still refreshes the ten recents", async () => {
    Date.now = () => now;
    mockPresence([activity("Song", 100)]);
    const bucket = createKv();

    const first = await recordListeningRecent(bucket.kv);
    now += 60_000;
    const second = await recordListeningRecent(bucket.kv);

    assert.equal(first.historyRecorded, true);
    assert.equal(second.historyRecorded, false);
    assert.equal(second.recorded, true);
    assert.equal(
      parseListenHistory(bucket.store.get(LISTENING_HISTORY_KV_KEY) ?? null)
        .length,
      1
    );
    assert.equal(
      bucket.writes.filter((key) => key === LISTENING_HISTORY_KV_KEY).length,
      1
    );

    const recents = parseRecentListens(
      bucket.store.get(LISTENING_RECENTS_KV_KEY) ?? null
    );
    assert.equal(recents.length, 1);
    assert.equal(recents[0]?.listenedAt, now);
    assert.equal(Object.hasOwn(recents[0] ?? {}, "startedAt"), false);
  });

  it("keeps a replay in history while the recents list still has one row", async () => {
    Date.now = () => now;
    const bucket = createKv();

    mockPresence([activity("Song", 100)]);
    await recordListeningRecent(bucket.kv);
    now += 60_000;
    mockPresence([activity("Other", 200)]);
    await recordListeningRecent(bucket.kv);
    now += 60_000;
    mockPresence([activity("Song", 300)]);
    const replay = await recordListeningRecent(bucket.kv);

    const history = parseListenHistory(
      bucket.store.get(LISTENING_HISTORY_KV_KEY) ?? null
    );
    const recents = parseRecentListens(
      bucket.store.get(LISTENING_RECENTS_KV_KEY) ?? null
    );

    assert.equal(replay.historyRecorded, true);
    assert.deepEqual(
      history.map((item) => item.track),
      ["Song", "Other", "Song"]
    );
    assert.deepEqual(
      recents.map((item) => item.track),
      ["Song", "Other"]
    );
    assert.equal(recents[0]?.listenedAt, now);
  });

  it("caps recents at ten unique songs and history at every play", async () => {
    Date.now = () => now;
    const bucket = createKv();

    for (let index = 0; index < 11; index += 1) {
      mockPresence([activity(`Track ${index}`, 1000 + index)]);
      now += 1000;
      // Each play has to be stored before the next one is recorded.
      // oxlint-disable-next-line no-await-in-loop
      await recordListeningRecent(bucket.kv);
    }

    const history = parseListenHistory(
      bucket.store.get(LISTENING_HISTORY_KV_KEY) ?? null
    );
    const recents = parseRecentListens(
      bucket.store.get(LISTENING_RECENTS_KV_KEY) ?? null
    );

    assert.equal(history.length, 11);
    assert.equal(history[0]?.track, "Track 10");
    assert.equal(
      history.some((item) => item.track === "Track 0"),
      true
    );
    assert.equal(recents.length, 10);
    assert.equal(
      recents.some((item) => item.track === "Track 0"),
      false
    );
  });

  it("does not write when nothing is playing or Lanyard fails", async () => {
    const bucket = createKv();

    mockPresence([]);
    const quiet = await recordListeningRecent(bucket.kv);
    globalThis.fetch = () => Promise.reject(new Error("offline"));
    const failed = await recordListeningRecent(bucket.kv);

    assert.equal(quiet.recorded, false);
    assert.equal(failed.recorded, false);
    assert.deepEqual(bucket.writes, []);
  });
});
