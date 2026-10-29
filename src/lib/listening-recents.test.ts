import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { NowListening } from "@/lib/lanyard-status";
import {
  parseRecentListens,
  upsertRecentListen,
} from "@/lib/listening-recents";

const song = (track: string, artist = "Artist"): NowListening => ({
  album: "Album",
  artist,
  artistUrl: null,
  artworkUrl: null,
  track,
  trackUrl: null,
});

describe("upsertRecentListen", () => {
  it("moves a replay to the top instead of adding another row", () => {
    const first = upsertRecentListen([], song("One"), 1);
    const second = upsertRecentListen(first, song("Two"), 2);
    const replay = upsertRecentListen(second, song("One"), 3);

    assert.deepEqual(
      replay.map((item) => item.track),
      ["One", "Two"]
    );
    assert.equal(replay[0]?.listenedAt, 3);
  });

  it("keeps ten unique songs, newest first", () => {
    let recents = [] as ReturnType<typeof upsertRecentListen>;

    for (let index = 0; index < 12; index += 1) {
      recents = upsertRecentListen(recents, song(`Track ${index}`), index);
    }

    assert.equal(recents.length, 10);
    assert.equal(recents[0]?.track, "Track 11");
    assert.equal(
      recents.some((item) => item.track === "Track 0"),
      false
    );
    assert.equal(
      recents.some((item) => item.track === "Track 1"),
      false
    );
  });

  it("ignores duplicate identities already stored", () => {
    const raw = JSON.stringify([
      { ...song("One"), listenedAt: 2 },
      { ...song("One"), listenedAt: 1 },
      { artist: "Missing", listenedAt: 1, track: "" },
    ]);

    assert.deepEqual(
      parseRecentListens(raw).map((item) => item.listenedAt),
      [2]
    );
  });
});
