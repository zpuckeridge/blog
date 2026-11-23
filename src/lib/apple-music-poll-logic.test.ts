import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  APPLE_MUSIC_POLL_WINDOW_MS,
  diffAppleMusicPoll,
  spreadAppleMusicListenTimes,
  trackIdsFromPoll,
} from "@/lib/apple-music-poll-logic";
import type { AppleMusicApiSong } from "@/lib/apple-music-track";
import { appleTrackIdentity } from "@/lib/apple-music-track";

const song = (id: string, name = id): AppleMusicApiSong => ({
  attributes: { artistName: "Artist", name },
  id,
  type: "songs",
});

const librarySong = (
  libraryId: string,
  catalogId: string | undefined,
  name = catalogId ?? libraryId
): AppleMusicApiSong => ({
  attributes: {
    artistName: "Artist",
    name,
    playParams: { catalogId, isLibrary: true },
  },
  id: libraryId,
  type: "library-songs",
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

  it("counts a replay when a deep previous id moves to the top", () => {
    const previous = ["head", "mid", "tail", "deep"];
    const diff = diffAppleMusicPoll(previous, [
      song("deep"),
      song("head"),
      song("mid"),
      song("tail"),
    ]);

    assert.deepEqual(
      diff.map((entry) => entry.identity),
      ["deep"]
    );
  });

  it("yields nothing when the list order is unchanged", () => {
    const tracks = [song("a"), song("b"), song("c")];
    const diff = diffAppleMusicPoll(["a", "b", "c"], tracks);

    assert.equal(diff.length, 0);
  });

  it("yields nothing when the previous head is replayed in place", () => {
    const diff = diffAppleMusicPoll(
      ["a", "b", "c"],
      [song("a"), song("b"), song("c")]
    );

    assert.equal(diff.length, 0);
  });

  it("anchors a catalogue id on the same song played from the library", () => {
    const previous = ["cat-1", "cat-2"];
    const diff = diffAppleMusicPoll(previous, [
      song("fresh"),
      librarySong("i.same", "cat-1"),
      song("cat-2"),
    ]);

    assert.equal(appleTrackIdentity(librarySong("i.same", "cat-1")), "cat-1");
    assert.deepEqual(
      diff.map((entry) => entry.identity),
      ["fresh"]
    );
  });

  it("falls back to set membership when the anchor sequence is missing", () => {
    const previous = ["a", "b", "c", "d"];
    const diff = diffAppleMusicPoll(previous, [
      song("new"),
      song("c"),
      song("d"),
      song("a"),
    ]);

    assert.deepEqual(
      diff.map((entry) => entry.identity),
      ["new"]
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

  it("stores a library play under its catalogue id", () => {
    assert.deepEqual(
      trackIdsFromPoll([
        librarySong("i.downloaded", "cat-9", "Downloaded"),
        song("cat-1"),
      ]),
      ["cat-9", "cat-1"]
    );
  });
});
