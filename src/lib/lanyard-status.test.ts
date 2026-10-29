import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { parseAppleMusicActivity } from "@/lib/lanyard-status";

describe("parseAppleMusicActivity", () => {
  it("parses Discord desktop Apple Music rich presence", () => {
    const listening = parseAppleMusicActivity([
      {
        application_id: "773825528921849856",
        assets: {
          large_image:
            "mp:external/tkH5h_zAeFUw64dB3Hr9Gfw82-4rvDOELpkcWbXtGT4/https/is1-ssl.mzstatic.com/image/thumb/Music221/v4/7e/93/92/7e93925b-2ce7-e543-c783-6b23e02fbaa6/810129812459.jpg/100x100bb.jpg",
          large_text: "Flowers",
          large_url:
            "https://music.apple.com/jp/album/everybody-knows/1851356151?i=1851356410&uo=4",
        },
        details: "Everybody Knows",
        details_url:
          "https://music.apple.com/jp/album/everybody-knows/1851356151?i=1851356410&uo=4",
        name: "Apple Music",
        state: "The Devil Wears Prada",
        state_url:
          "https://music.apple.com/jp/artist/the-devil-wears-prada/189224243?uo=4",
        type: 2,
      },
    ]);

    assert.deepEqual(listening, {
      album: "Flowers",
      artist: "The Devil Wears Prada",
      artistUrl:
        "https://music.apple.com/jp/artist/the-devil-wears-prada/189224243?uo=4",
      artworkUrl:
        "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/7e/93/92/7e93925b-2ce7-e543-c783-6b23e02fbaa6/810129812459.jpg/100x100bb.jpg",
      startedAt: null,
      track: "Everybody Knows",
      trackUrl:
        "https://music.apple.com/jp/album/everybody-knows/1851356151?i=1851356410&uo=4",
    });
  });

  it("keeps the Discord start time that identifies one continuous play", () => {
    const startedAt = Date.UTC(2026, 9, 29, 5, 42);
    const listening = parseAppleMusicActivity([
      {
        details: "Everybody Knows",
        name: "Apple Music",
        state: "The Devil Wears Prada",
        timestamps: { start: startedAt },
        type: 2,
      },
    ]);

    assert.equal(listening?.startedAt, startedAt);
  });

  it("accepts a Discord start time sent as Unix seconds", () => {
    const listening = parseAppleMusicActivity([
      {
        details: "Everybody Knows",
        name: "Apple Music",
        state: "The Devil Wears Prada",
        timestamps: { start: 1_761_717_720 },
        type: 2,
      },
    ]);

    assert.equal(listening?.startedAt, 1_761_717_720_000);
  });
});
