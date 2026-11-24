import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import { fetchAppleMusicRecentTracks } from "@/lib/apple-music-api";

const originalFetch = globalThis.fetch;

describe("fetchAppleMusicRecentTracks", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("requests songs and library-songs and keeps a mixed page", async () => {
    const urls: string[] = [];
    globalThis.fetch = (input) => {
      urls.push(String(input));
      return Promise.resolve(
        Response.json({
          data: [
            {
              attributes: {
                artistName: "Streamer",
                name: "Catalogue",
                playParams: { catalogId: "111", isLibrary: false },
              },
              id: "111",
              type: "songs",
            },
            {
              attributes: {
                artistName: "Phone",
                name: "Downloaded",
                playParams: { catalogId: "222", isLibrary: true },
              },
              id: "i.abc",
              type: "library-songs",
            },
          ],
        })
      );
    };

    const tracks = await fetchAppleMusicRecentTracks("dev-token", "user-token");
    const url = new URL(urls[0] ?? "");

    assert.equal(tracks?.length, 2);
    assert.deepEqual(
      tracks?.map((track) => track.type),
      ["songs", "library-songs"]
    );
    assert.equal(url.searchParams.get("extend"), "artistUrl");
    assert.equal(url.searchParams.get("limit"), "25");
    assert.equal(url.searchParams.get("types"), "songs,library-songs");
  });
});
