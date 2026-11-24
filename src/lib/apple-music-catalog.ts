import { APPLE_MUSIC_STOREFRONT } from "@/lib/apple-music-track";

const CATALOG_SONG_PATH = `/v1/catalog/${APPLE_MUSIC_STOREFRONT}/songs`;

/** Parse a catalog song id from Apple Music web URLs. */
export const catalogIdFromTrackUrl = (
  trackUrl: string | null
): string | null => {
  const trimmed = trackUrl?.trim();
  if (!trimmed) {
    return null;
  }

  try {
    const url = new URL(trimmed);
    const songMatch = url.pathname.match(/\/song\/(?<songId>[^/]+)/iu);
    if (songMatch?.groups?.songId) {
      return decodeURIComponent(songMatch.groups.songId);
    }

    const songId = url.searchParams.get("i");
    if (songId && /^\d+$/u.test(songId)) {
      return songId;
    }
  } catch {
    return null;
  }

  return null;
};

interface CatalogSongResponse {
  data?: { attributes?: { genreNames?: string[] } }[];
}

export const fetchCatalogSongGenres = async (
  developerToken: string,
  catalogId: string
): Promise<string[] | null> => {
  const response = await fetch(
    `https://api.music.apple.com${CATALOG_SONG_PATH}/${encodeURIComponent(catalogId)}`,
    {
      headers: { Authorization: `Bearer ${developerToken}` },
    }
  );

  if (!response.ok) {
    return null;
  }

  const body = (await response.json()) as CatalogSongResponse;
  const names = body.data?.[0]?.attributes?.genreNames;
  if (!names?.length) {
    return null;
  }

  return names.map((genre) => genre.trim()).filter(Boolean);
};
