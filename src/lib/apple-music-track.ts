import type { ObservedListen } from "@/lib/lanyard-status";
import type { ListenSource } from "@/lib/listen-source";

export interface AppleMusicApiArtwork {
  url?: string;
}

export interface AppleMusicApiSongAttributes {
  albumName?: string;
  artistName?: string;
  artwork?: AppleMusicApiArtwork;
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

const APPLE_MUSIC_SONG_URL = "https://music.apple.com/au/song";

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

  return {
    album: track.attributes?.albumName?.trim() ?? null,
    appleId: track.id?.trim() ?? null,
    artist,
    artistUrl: null,
    artworkUrl,
    source: "apple",
    startedAt: null,
    track: name,
    trackUrl: catalogId
      ? `${APPLE_MUSIC_SONG_URL}/${encodeURIComponent(catalogId)}`
      : null,
  };
};
