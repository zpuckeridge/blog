import type { ObservedListen } from "@/lib/lanyard-status";
import type { ListenSource } from "@/lib/listen-source";

export interface AppleMusicApiArtwork {
  url?: string;
}

export interface AppleMusicApiSongAttributes {
  albumName?: string;
  artistName?: string;
  /** Present when the recent-played request uses `extend=artistUrl`. */
  artistUrl?: string;
  artwork?: AppleMusicApiArtwork;
  genreNames?: string[];
  name?: string;
  playParams?: {
    catalogId?: string;
    isLibrary?: boolean;
  };
  url?: string;
}

export interface AppleMusicApiSong {
  attributes?: AppleMusicApiSongAttributes;
  id?: string;
  type?: string;
}

export const APPLE_MUSIC_STOREFRONT = "au";
const APPLE_MUSIC_SONG_URL = `https://music.apple.com/${APPLE_MUSIC_STOREFRONT}/song`;

export const appleMusicSongUrl = (catalogId: string): string =>
  `${APPLE_MUSIC_SONG_URL}/${encodeURIComponent(catalogId)}`;

export const appleMusicArtistSearchUrl = (artist: string): string => {
  const name = artist.trim();
  return `https://music.apple.com/${APPLE_MUSIC_STOREFRONT}/search?term=${encodeURIComponent(name)}`;
};

export const appleMusicAlbumSearchUrl = (
  album: string,
  artist: string
): string => {
  const term = `${album.trim()} ${artist.trim()}`.trim();
  return `https://music.apple.com/${APPLE_MUSIC_STOREFRONT}/search?term=${encodeURIComponent(term)}`;
};

const artworkUrlFromTemplate = (template: string): string =>
  template.replace("{w}", "300").replace("{h}", "300");

const catalogIdFromTrack = (track: AppleMusicApiSong): string | null => {
  const catalogId = track.attributes?.playParams?.catalogId?.trim();
  return catalogId || null;
};

export const appleTrackIdentity = (track: AppleMusicApiSong): string | null => {
  const catalogId = catalogIdFromTrack(track);
  if (catalogId) {
    return catalogId;
  }

  const id = track.id?.trim();
  if (id) {
    return id;
  }

  const name = track.attributes?.name?.trim();
  const artist = track.attributes?.artistName?.trim();
  if (!name || !artist) {
    return null;
  }

  return `${name.toLowerCase()}::${artist.toLowerCase()}`;
};

const mappedArtistUrl = (track: AppleMusicApiSong, artist: string): string =>
  track.attributes?.artistUrl?.trim() || appleMusicArtistSearchUrl(artist);

const mappedTrackUrl = (catalogId: string | null): string | null =>
  catalogId ? appleMusicSongUrl(catalogId) : null;

const genreNamesFromTrack = (track: AppleMusicApiSong): string[] | null => {
  const genres = track.attributes?.genreNames
    ?.map((genre) => genre.trim())
    .filter(Boolean);
  return genres?.length ? genres : null;
};

export const mapAppleMusicSong = (
  track: AppleMusicApiSong
):
  | (ObservedListen & { appleId: string | null; source: ListenSource })
  | null => {
  const name = track.attributes?.name?.trim() ?? "";
  const artist = track.attributes?.artistName?.trim() ?? "";
  if (!name || !artist) {
    return null;
  }

  const artworkTemplate = track.attributes?.artwork?.url;
  const artworkUrl = artworkTemplate
    ? artworkUrlFromTemplate(artworkTemplate)
    : null;
  const catalogId = catalogIdFromTrack(track);
  const genres = genreNamesFromTrack(track);

  return {
    album: track.attributes?.albumName?.trim() ?? null,
    appleId: track.id?.trim() ?? null,
    artist,
    artistUrl: mappedArtistUrl(track, artist),
    artworkUrl,
    catalogId,
    genres,
    source: "apple",
    startedAt: null,
    track: name,
    trackUrl: mappedTrackUrl(catalogId),
  };
};
