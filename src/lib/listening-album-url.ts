import {
  appleMusicAlbumSearchUrl,
  appleMusicArtistSearchUrl,
} from "@/lib/apple-music-track";

export const resolveListeningAlbumUrl = (
  album: string | null | undefined,
  artist: string
): string | null => {
  const name = album?.trim();
  if (!name) {
    return null;
  }

  const artistName = artist.trim();
  if (!artistName) {
    return appleMusicArtistSearchUrl(name);
  }

  return appleMusicAlbumSearchUrl(name, artistName);
};
