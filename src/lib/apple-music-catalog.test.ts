import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { matchCatalogSong } from "@/lib/apple-music-catalog";

describe("matchCatalogSong", () => {
  it("returns the song whose title and artist match", () => {
    const match = matchCatalogSong(
      [
        {
          attributes: {
            artistName: "Someone Else",
            genreNames: ["Pop"],
            name: "Myth",
          },
          id: "1",
        },
        {
          attributes: {
            artistName: "Beach House",
            genreNames: ["Alternative", "Music"],
            name: "Myth",
          },
          id: "1440857781",
        },
      ],
      "Myth",
      "Beach House"
    );

    assert.equal(match?.catalogId, "1440857781");
    assert.deepEqual(match?.genres, ["Alternative", "Music"]);
    assert.equal(match?.trackUrl, "https://music.apple.com/au/song/1440857781");
  });

  it("returns null when no catalogue song matches both names", () => {
    assert.equal(
      matchCatalogSong(
        [
          {
            attributes: { artistName: "Other", name: "Myth" },
            id: "1",
          },
        ],
        "Myth",
        "Beach House"
      ),
      null
    );
  });
});
