import { describe, expect, it } from "bun:test";

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

    expect(listening).toEqual({
      album: "Flowers",
      artist: "The Devil Wears Prada",
      artistUrl:
        "https://music.apple.com/jp/artist/the-devil-wears-prada/189224243?uo=4",
      artworkUrl:
        "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/7e/93/92/7e93925b-2ce7-e543-c783-6b23e02fbaa6/810129812459.jpg/100x100bb.jpg",
      track: "Everybody Knows",
      trackUrl:
        "https://music.apple.com/jp/album/everybody-knows/1851356151?i=1851356410&uo=4",
    });
  });
});
