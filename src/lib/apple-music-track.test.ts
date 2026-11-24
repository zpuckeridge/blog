import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { AppleMusicApiSong } from "@/lib/apple-music-track";
import { appleTrackIdentity, mapAppleMusicSong } from "@/lib/apple-music-track";

const librarySong = (catalogId?: string): AppleMusicApiSong => ({
  attributes: {
    artistName: "Phone",
    name: "Downloaded",
    playParams: { catalogId, isLibrary: true },
  },
  id: "i.abc",
  type: "library-songs",
});

describe("appleTrackIdentity", () => {
  it("prefers catalogId so a library play matches the catalogue song", () => {
    assert.equal(appleTrackIdentity(librarySong("123")), "123");
    assert.equal(
      appleTrackIdentity({
        attributes: {
          artistName: "Streamer",
          name: "Catalogue",
          playParams: { catalogId: "123", isLibrary: false },
        },
        id: "123",
        type: "songs",
      }),
      "123"
    );
  });

  it("keeps the library id when the song has no catalogId", () => {
    const track = librarySong();
    assert.equal(appleTrackIdentity(track), "i.abc");
    assert.equal(mapAppleMusicSong(track)?.trackUrl, null);
  });
});

describe("mapAppleMusicSong", () => {
  it("builds an Australian song url from catalogId when Apple sends no url", () => {
    const mapped = mapAppleMusicSong(librarySong("123"));
    assert.equal(mapped?.trackUrl, "https://music.apple.com/au/song/123");
    assert.equal(
      mapped?.artistUrl,
      "https://music.apple.com/au/search?term=Phone"
    );
  });

  it("prefers Apple's artistUrl when the API extends it", () => {
    const mapped = mapAppleMusicSong({
      attributes: {
        artistName: "Streamer",
        artistUrl: "https://music.apple.com/au/artist/streamer/99",
        name: "Catalogue",
        playParams: { catalogId: "123", isLibrary: false },
      },
      id: "123",
      type: "songs",
    });

    assert.equal(
      mapped?.artistUrl,
      "https://music.apple.com/au/artist/streamer/99"
    );
  });
});
