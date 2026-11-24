import { appleMusicArtistSearchUrl } from "@/lib/apple-music-track";
import { resolveSafeHref } from "@/lib/safe-href";

/** Artist link for listening rows; falls back to Apple Music search when KV has no URL. */
export const resolveListeningArtistUrl = (
  artist: string,
  artistUrl: string | null | undefined
): string | null => {
  const stored = artistUrl?.trim();
  if (stored && resolveSafeHref(stored)) {
    return stored;
  }

  const name = artist.trim();
  if (!name) {
    return null;
  }

  return appleMusicArtistSearchUrl(name);
};
