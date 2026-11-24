import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import { backfillListeningBatch } from "@/lib/backfill-listening";
import type { ListenPlay } from "@/lib/listening-history";

const originalFetch = globalThis.fetch;

const play = (genres: string[] | null, catalogId = "111"): ListenPlay => ({
  album: null,
  artist: "Beach House",
  artistUrl: null,
  artworkUrl: null,
  catalogId,
  genres,
  listenedAt: 1,
  source: "lanyard",
  startedAt: 1,
  track: "Myth",
  trackUrl: null,
});

const requestUrl = (input: RequestInfo | URL): string => {
  if (typeof input === "string") {
    return input;
  }

  if (input instanceof URL) {
    return input.href;
  }

  return input.url;
};

describe("backfillListeningBatch", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("keeps catalogue genres and does not search", async () => {
    const urls: string[] = [];
    globalThis.fetch = (input) => {
      urls.push(requestUrl(input));
      return Promise.resolve(
        Response.json({
          data: [{ attributes: { genreNames: ["Dream Pop"] } }],
        })
      );
    };

    const result = await backfillListeningBatch(
      [play(["Music"])],
      0,
      "developer-token"
    );

    assert.equal(result.enriched, 1);
    assert.deepEqual(result.plays[0]?.genres, ["Dream Pop"]);
    assert.equal(result.plays[0]?.catalogId, "111");
    assert.equal(urls.length, 1);
    assert.equal(
      urls.some((url) => url.includes("/search")),
      false
    );
  });

  it("searches by title and artist when the catalogue fetch is empty", async () => {
    const urls: string[] = [];
    globalThis.fetch = (input) => {
      const url = requestUrl(input);
      urls.push(url);
      if (url.includes("/search")) {
        return Promise.resolve(
          Response.json({
            results: {
              songs: {
                data: [
                  {
                    attributes: {
                      artistName: "Beach House",
                      genreNames: ["Soul"],
                      name: "Myth",
                    },
                    id: "999",
                  },
                ],
              },
            },
          })
        );
      }

      return Promise.resolve(
        Response.json({
          data: [{ attributes: { genreNames: [] } }],
        })
      );
    };

    const result = await backfillListeningBatch(
      [play(null, "not-in-catalog")],
      0,
      "developer-token"
    );

    assert.equal(result.enriched, 1);
    assert.deepEqual(result.plays[0]?.genres, ["Soul"]);
    assert.equal(result.plays[0]?.catalogId, "999");
    assert.equal(
      result.plays[0]?.trackUrl,
      "https://music.apple.com/au/song/999"
    );
    assert.equal(
      urls.some((url) => url.includes("/songs/")),
      true
    );
    assert.equal(
      urls.some((url) => url.includes("/search")),
      true
    );
  });
});
