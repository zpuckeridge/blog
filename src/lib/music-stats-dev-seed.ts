import { appleMusicArtistSearchUrl } from "@/lib/apple-music-track";
import { isoDateInBrisbane } from "@/lib/format-in-brisbane";
import {
  LISTENING_HISTORY_KV_KEY,
  listenPlayedAt,
  readListenHistory,
} from "@/lib/listening-history";
import type { ListenPlay } from "@/lib/listening-history";
import { listenMonthKey } from "@/lib/listening-month";
import {
  LISTENING_STATS_KV_KEY,
  LISTENING_STATS_TOP_LIMIT,
  parseListeningStats,
  rebuildListeningStats,
} from "@/lib/listening-stats";
import { addBrisbaneDays } from "@/lib/rhythms";

/** Marks dev-seeded plays so we can refresh after catalog changes. */
export const DEV_MUSIC_SEED_MARKER = "Dream Pop";

/** First calendar day of fake listening history (Brisbane dates). */
export const DEV_MUSIC_SEED_START = "2026-01-01";
const APPLE_SONG = "https://music.apple.com/au/song";

/** Stable placeholder art per album (always resolves in dev). */
const demoArtworkUrl = (artist: string, album: string): string =>
  `https://picsum.photos/seed/${encodeURIComponent(`${artist}-${album}`)}/128/128`;

interface DemoTrack {
  album: string;
  artist: string;
  artworkUrl: string;
  catalogId: string;
  genres: string[];
  track: string;
}

const DEMO_TRACKS: DemoTrack[] = [
  {
    album: "Bloom",
    artist: "Beach House",
    artworkUrl: demoArtworkUrl("Beach House", "Bloom"),
    catalogId: "1440857781",
    genres: [DEV_MUSIC_SEED_MARKER, "Indie Rock"],
    track: "Myth",
  },
  {
    album: "22, A Million",
    artist: "Bon Iver",
    artworkUrl: demoArtworkUrl("Bon Iver", "22, A Million"),
    catalogId: "1440842583",
    genres: ["Alternative", "Indie Folk"],
    track: "Holocene",
  },
  {
    album: "Blonde",
    artist: "Frank Ocean",
    artworkUrl: demoArtworkUrl("Frank Ocean", "Blonde"),
    catalogId: "1146195596",
    genres: ["R&B/Soul", "Hip-Hop/Rap"],
    track: "Nights",
  },
  {
    album: "In Rainbows",
    artist: "Radiohead",
    artworkUrl: demoArtworkUrl("Radiohead", "In Rainbows"),
    catalogId: "1109022274",
    genres: ["Alternative", "Rock"],
    track: "Jigsaw Falling into Place",
  },
  {
    album: "Channel Orange",
    artist: "Frank Ocean",
    artworkUrl: demoArtworkUrl("Frank Ocean", "Channel Orange"),
    catalogId: "1440650429",
    genres: ["R&B/Soul"],
    track: "Thinkin Bout You",
  },
  {
    album: "I Love You.",
    artist: "The 1975",
    artworkUrl: demoArtworkUrl("The 1975", "I Love You."),
    catalogId: "1440868253",
    genres: ["Pop", "Rock"],
    track: "Chocolate",
  },
  {
    album: "Teen Dream",
    artist: "Beach House",
    artworkUrl: demoArtworkUrl("Beach House", "Teen Dream"),
    catalogId: "1440853079",
    genres: [DEV_MUSIC_SEED_MARKER, "Indie Rock"],
    track: "Take Care",
  },
  {
    album: "good kid, m.A.A.d city",
    artist: "Kendrick Lamar",
    artworkUrl: demoArtworkUrl("Kendrick Lamar", "good kid, m.A.A.d city"),
    catalogId: "1440812961",
    genres: ["Hip-Hop/Rap"],
    track: "Swimming Pools (Drank)",
  },
  {
    album: "Punisher",
    artist: "Phoebe Bridgers",
    artworkUrl: demoArtworkUrl("Phoebe Bridgers", "Punisher"),
    catalogId: "1504376358",
    genres: ["Alternative", "Indie Rock"],
    track: "Kyoto",
  },
  {
    album: "The Land Is Inhospitable and So Are We",
    artist: "Mitski",
    artworkUrl: demoArtworkUrl(
      "Mitski",
      "The Land Is Inhospitable and So Are We"
    ),
    catalogId: "1690839749",
    genres: ["Alternative"],
    track: "My Love Mine All Mine",
  },
  {
    album: "SOS",
    artist: "SZA",
    artworkUrl: demoArtworkUrl("SZA", "SOS"),
    catalogId: "1657869377",
    genres: ["R&B/Soul", "Pop"],
    track: "Kill Bill",
  },
  {
    album: "Suddenly",
    artist: "Caribou",
    artworkUrl: demoArtworkUrl("Caribou", "Suddenly"),
    catalogId: "1544324067",
    genres: ["Electronic", "Alternative"],
    track: "Home",
  },
];

export const DEV_MUSIC_DEMO_TRACK_COUNT = DEMO_TRACKS.length;

const atBrisbane = (isoDate: string, hours: number, minutes: number): number =>
  Date.parse(
    `${isoDate}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00+10:00`
  );

const datesFromSeedStartToToday = (todayIso: string): string[] => {
  if (todayIso < DEV_MUSIC_SEED_START) {
    return [todayIso];
  }

  const dates: string[] = [];
  let cursor = DEV_MUSIC_SEED_START;
  while (cursor <= todayIso) {
    dates.push(cursor);
    cursor = addBrisbaneDays(cursor, 1);
  }

  return dates;
};

const toPlay = (demo: DemoTrack, listenedAt: number): ListenPlay => ({
  album: demo.album,
  artist: demo.artist,
  artistUrl: appleMusicArtistSearchUrl(demo.artist),
  artworkUrl: demo.artworkUrl,
  catalogId: demo.catalogId,
  genres: [...demo.genres],
  listenedAt,
  source: "apple",
  startedAt: listenedAt,
  track: demo.track,
  trackUrl: `${APPLE_SONG}/${demo.catalogId}`,
});

export const buildDevMusicListeningPlays = (
  todayIso = isoDateInBrisbane()
): ListenPlay[] => {
  const dates = datesFromSeedStartToToday(todayIso);
  const plays: ListenPlay[] = [];

  for (const [dayIndex, isoDate] of dates.entries()) {
    if (dayIndex % 11 === 0) {
      continue;
    }

    const playCount = 2 + (dayIndex % 5);
    for (let playIndex = 0; playIndex < playCount; playIndex += 1) {
      const bias = (dayIndex + playIndex * 3) % DEMO_TRACKS.length;
      let extra = 0;
      if (bias !== 0 && bias !== 6 && (dayIndex + playIndex) % 3 === 0) {
        extra = 1;
      }
      const demo =
        DEMO_TRACKS[(bias + extra) % DEMO_TRACKS.length] ?? DEMO_TRACKS[0];
      const listenedAt = atBrisbane(
        isoDate,
        7 + ((playIndex * 2) % 14),
        (dayIndex * 13 + playIndex * 7) % 55
      );
      plays.push(toPlay(demo, listenedAt));
    }
  }

  return plays.toReversed();
};

interface SeedKv {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string) => Promise<void>;
}

const isDevMusicSeedCurrent = (
  plays: readonly ListenPlay[],
  stats: ReturnType<typeof parseListeningStats>
): boolean => {
  const demo = plays.find(
    (play) =>
      play.source === "apple" &&
      play.genres?.includes(DEV_MUSIC_SEED_MARKER) === true
  );
  if (!demo?.artworkUrl?.includes("picsum.photos")) {
    return false;
  }

  const oldest = plays.at(-1);
  if (!oldest || listenMonthKey(listenPlayedAt(oldest)) !== "2026-01") {
    return false;
  }

  const january = stats.months["2026-01"];
  if (!january) {
    return false;
  }

  const rankedCounts = [
    Object.keys(january.tracks).length,
    Object.keys(january.artists).length,
    Object.keys(january.albums).length,
  ];
  return rankedCounts.every((count) => count >= LISTENING_STATS_TOP_LIMIT);
};

/** Local preview: rich listening history + monthly stats for /music. */
export const ensureDevMusicSeed = async (kv: SeedKv): Promise<void> => {
  if (!import.meta.env.DEV) {
    return;
  }

  const [listeningRaw, statsRaw] = await Promise.all([
    kv.get(LISTENING_HISTORY_KV_KEY),
    kv.get(LISTENING_STATS_KV_KEY),
  ]);
  const existing = readListenHistory(listeningRaw);
  const stats = parseListeningStats(statsRaw);

  if (isDevMusicSeedCurrent(existing, stats)) {
    return;
  }

  const plays = buildDevMusicListeningPlays();
  const statsStore = rebuildListeningStats(plays);

  await Promise.all([
    kv.put(LISTENING_HISTORY_KV_KEY, JSON.stringify(plays)),
    kv.put(LISTENING_STATS_KV_KEY, JSON.stringify(statsStore)),
  ]);
};

export const devMusicMonthKeys = (todayIso = isoDateInBrisbane()): string[] => {
  const months = new Set<string>();
  for (const play of buildDevMusicListeningPlays(todayIso)) {
    months.add(listenMonthKey(play.listenedAt));
  }
  return [...months].toSorted();
};
