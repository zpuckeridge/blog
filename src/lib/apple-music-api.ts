import type { AppleMusicApiSong } from "@/lib/apple-music-track";

const RECENT_PLAYED_URL =
  "https://api.music.apple.com/v1/me/recent/played/tracks";
const MAX_TRACKS = 50;
const PAGE_LIMIT = 25;
const RECENT_PLAYED_TYPES = "songs,library-songs";

interface AppleMusicRecentResponse {
  data?: AppleMusicApiSong[];
  next?: string;
}

const resolveNextUrl = (next: string): string =>
  next.startsWith("http") ? next : `https://api.music.apple.com${next}`;

const fetchRecentPage = async (
  url: string,
  developerToken: string,
  musicUserToken: string
): Promise<AppleMusicRecentResponse | null> => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${developerToken}`,
      "Music-User-Token": musicUserToken,
    },
  });

  if (response.status === 401 || response.status === 403) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Apple Music API returned ${response.status}`);
  }

  return (await response.json()) as AppleMusicRecentResponse;
};

const fetchRecentPages = async (
  url: string,
  developerToken: string,
  musicUserToken: string,
  songs: AppleMusicApiSong[]
): Promise<AppleMusicApiSong[] | null> => {
  if (songs.length >= MAX_TRACKS) {
    return songs.slice(0, MAX_TRACKS);
  }

  const body = await fetchRecentPage(url, developerToken, musicUserToken);
  if (body === null) {
    return null;
  }

  const nextSongs = [...songs, ...(body.data ?? [])];
  if (nextSongs.length >= MAX_TRACKS || !body.next) {
    return nextSongs.slice(0, MAX_TRACKS);
  }

  return fetchRecentPages(
    resolveNextUrl(body.next),
    developerToken,
    musicUserToken,
    nextSongs
  );
};

export const fetchAppleMusicRecentTracks = (
  developerToken: string,
  musicUserToken: string
): Promise<AppleMusicApiSong[] | null> =>
  fetchRecentPages(
    `${RECENT_PLAYED_URL}?limit=${PAGE_LIMIT}&types=${RECENT_PLAYED_TYPES}`,
    developerToken,
    musicUserToken,
    []
  );
