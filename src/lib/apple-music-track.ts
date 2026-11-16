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
  url?: string;
}

export interface AppleMusicApiSong {
  attributes?: AppleMusicApiSongAttributes;
  id?: string;
  type?: string;
}

const artworkUrlFromTemplate = (template: string): string =>
  template.replace("{w}", "300").replace("{h}", "300");

export const appleTrackIdentity = (track: AppleMusicApiSong): string | null => {
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

  return {
    album: track.attributes?.albumName?.trim() ?? null,
    appleId: track.id?.trim() ?? null,
    artist,
    artistUrl: null,
    artworkUrl,
    source: "apple",
    startedAt: null,
    track: name,
    trackUrl: track.attributes?.url?.trim() ?? null,
  };
};
