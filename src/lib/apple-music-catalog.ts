import {
  APPLE_MUSIC_STOREFRONT,
  appleMusicSongUrl,
} from "@/lib/apple-music-track";

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

export interface CatalogSongMatch {
  catalogId: string;
  genres: string[];
  trackUrl: string;
}

interface CatalogSearchSong {
  attributes?: {
    artistName?: string;
    genreNames?: string[];
    name?: string;
  };
  id?: string;
}

interface CatalogSearchResponse {
  results?: {
    songs?: {
      data?: CatalogSearchSong[];
    };
  };
}

const sameCatalogName = (left: string, right: string): boolean =>
  left.trim().toLocaleLowerCase() === right.trim().toLocaleLowerCase();

/** Pick the catalogue song whose title and artist match the play exactly. */
export const matchCatalogSong = (
  songs: readonly CatalogSearchSong[],
  track: string,
  artist: string
): CatalogSongMatch | null => {
  const hit = songs.find((song) => {
    const name = song.attributes?.name;
    const artistName = song.attributes?.artistName;
    const catalogId = song.id?.trim();
    return (
      catalogId &&
      name &&
      artistName &&
      sameCatalogName(name, track) &&
      sameCatalogName(artistName, artist)
    );
  });

  const catalogId = hit?.id?.trim();
  if (!catalogId) {
    return null;
  }

  const genres =
    hit?.attributes?.genreNames?.map((genre) => genre.trim()).filter(Boolean) ??
    [];

  return {
    catalogId,
    genres,
    trackUrl: appleMusicSongUrl(catalogId),
  };
};

export const searchCatalogSong = async (
  developerToken: string,
  track: string,
  artist: string
): Promise<CatalogSongMatch | null> => {
  const term = `${track.trim()} ${artist.trim()}`.trim();
  if (!term) {
    return null;
  }

  const url = new URL(
    `https://api.music.apple.com/v1/catalog/${APPLE_MUSIC_STOREFRONT}/search`
  );
  url.searchParams.set("limit", "10");
  url.searchParams.set("term", term);
  url.searchParams.set("types", "songs");

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${developerToken}` },
  });
  if (!response.ok) {
    return null;
  }

  const body = (await response.json()) as CatalogSearchResponse;
  return matchCatalogSong(body.results?.songs?.data ?? [], track, artist);
};
