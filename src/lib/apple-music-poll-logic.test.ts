import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  APPLE_MUSIC_POLL_WINDOW_MS,
  diffAppleMusicPoll,
  spreadAppleMusicListenTimes,
  trackIdsFromPoll,
} from "@/lib/apple-music-poll-logic";
import type { AppleMusicApiSong } from "@/lib/apple-music-track";

const song = (id: string, name = id): AppleMusicApiSong => ({
  attributes: { artistName: "Artist", name },
  id,
  type: "songs",
});

describe("diffAppleMusicPoll", () => {
  it("returns nothing on the first baseline poll", () => {
    const diff = diffAppleMusicPoll([], [song("a"), song("b")]);
    assert.equal(diff.length, 0);
  });

  it("picks up tracks that appear ahead of the previous head", () => {
    const diff = diffAppleMusicPoll(
      ["b", "c"],
      [song("a"), song("b"), song("c")]
    );

    assert.deepEqual(
      diff.map((entry) => entry.identity),
      ["a"]
    );
  });

  it("stops at the previous head even when older ids were missing", () => {
    const diff = diffAppleMusicPoll(["c"], [song("a"), song("b"), song("c")]);

    assert.deepEqual(
      diff.map((entry) => entry.identity),
      ["a", "b"]
    );
  });
});

describe("spreadAppleMusicListenTimes", () => {
  it("uses the scheduled time for a single new track", () => {
    assert.deepEqual(spreadAppleMusicListenTimes(1, 1_000_000), [1_000_000]);
  });

  it("spreads multiple new tracks across the poll window", () => {
    const scheduledTime = 1_000_000;
    const times = spreadAppleMusicListenTimes(2, scheduledTime);
    assert.equal(times.length, 2);
    assert.equal(times[0], scheduledTime);
    assert.equal(times[1], scheduledTime - APPLE_MUSIC_POLL_WINDOW_MS);
    assert.ok(times[1] < times[0]);
  });
});

describe("trackIdsFromPoll", () => {
  it("keeps api order", () => {
    assert.deepEqual(trackIdsFromPoll([song("x"), song("y")]), ["x", "y"]);
  });
});
