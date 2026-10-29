/** Legacy Apple Music rich presence app id (still seen on some clients). */
export const APPLE_MUSIC_APPLICATION_ID = "1239490006054207550";

/** Current Discord desktop Apple Music integration app id. */
export const APPLE_MUSIC_DESKTOP_APPLICATION_ID = "773825528921849856";

const APPLE_MUSIC_APPLICATION_IDS = new Set([
  APPLE_MUSIC_APPLICATION_ID,
  APPLE_MUSIC_DESKTOP_APPLICATION_ID,
]);

export const LANYARD_USER_ID = "181324210876973056";

export interface LanyardActivityAssets {
  large_image?: string;
  large_text?: string;
  large_url?: string;
  small_image?: string;
  small_text?: string;
  small_url?: string;
}

export interface LanyardActivity {
  name: string;
  application_id?: string;
  type?: number;
  state?: string;
  details?: string;
  details_url?: string;
  state_url?: string;
  assets?: LanyardActivityAssets;
  /** Discord rich presence clock. `start` changes when a track starts again. */
  timestamps?: {
    end?: number;
    start?: number;
  };
}

export interface LanyardPresence {
  discord_status?: string;
  activities?: LanyardActivity[];
}

export interface NowListening {
  track: string;
  artist: string;
  album: string | null;
  artworkUrl: string | null;
  trackUrl: string | null;
  artistUrl: string | null;
}

/** A play observed from Apple Music rich presence, including its start clock. */
export interface ObservedListen extends NowListening {
  /** Discord `timestamps.start` in milliseconds, or null when Apple Music omits it. */
  startedAt: number | null;
}

export type DiscordStatus = "online" | "idle" | "dnd" | "offline";

export const DISCORD_STATUS_STYLES: Record<
  DiscordStatus,
  { color: string; text: string }
> = {
  dnd: { color: "bg-red-500", text: "Do Not Disturb" },
  idle: { color: "bg-yellow-300", text: "Idle" },
  offline: { color: "bg-gray-400", text: "Offline" },
  online: { color: "bg-green-500", text: "Online" },
};

const extractArtistFromState = (state: string | undefined): string => {
  if (!state?.trim()) {
    return "";
  }

  const [artistPart] = state.split(" · ");
  return artistPart?.trim() ?? "";
};

const extractAlbumFromState = (state: string | undefined): string => {
  if (!state?.trim()) {
    return "";
  }

  const parts = state.split(" · ");
  return parts.length > 1 ? (parts.at(-1)?.trim() ?? "") : "";
};

export const resolveDiscordAssetImage = (
  asset: string | undefined,
  applicationId: string = APPLE_MUSIC_APPLICATION_ID
): string | null => {
  if (!asset?.trim()) {
    return null;
  }

  if (asset.startsWith("mp:external/")) {
    const parts = asset.split("/");
    const httpsIndex = parts.indexOf("https");

    if (httpsIndex !== -1) {
      return `https://${parts.slice(httpsIndex + 1).join("/")}`;
    }
  }

  return `https://cdn.discordapp.com/app-assets/${applicationId}/${asset}.png`;
};

export const resolveArtworkZoomUrl = (
  artworkUrl: string | null
): string | null => {
  if (!artworkUrl) {
    return null;
  }

  return artworkUrl.replace(
    /\/(?<width>\d+)x(?<height>\d+)bb(?<ext>\.[a-z]+)$/iu,
    "/1000x1000bb$<ext>"
  );
};

/** Discord sends milliseconds. Some payloads still use Unix seconds. */
const unixMilliseconds = (value: unknown): number | null => {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return null;
  }

  const milliseconds = value < 1_000_000_000_000 ? value * 1000 : value;
  return Math.trunc(milliseconds);
};

const isAppleMusicActivity = (activity: LanyardActivity): boolean => {
  if (
    activity.application_id &&
    APPLE_MUSIC_APPLICATION_IDS.has(activity.application_id)
  ) {
    return true;
  }

  return activity.name === "Apple Music" && activity.type === 2;
};

const artistFromActivity = (activity: LanyardActivity): string =>
  activity.assets?.small_text?.trim() || extractArtistFromState(activity.state);

const albumFromActivity = (activity: LanyardActivity): string | null =>
  activity.assets?.large_text?.trim() ||
  extractAlbumFromState(activity.state) ||
  null;

const observedFromActivity = (
  activity: LanyardActivity
): ObservedListen | null => {
  const track = activity.details?.trim() ?? "";
  const artist = artistFromActivity(activity);

  if (!track || !artist) {
    return null;
  }

  const applicationId =
    activity.application_id ?? APPLE_MUSIC_DESKTOP_APPLICATION_ID;

  return {
    album: albumFromActivity(activity),
    artist,
    artistUrl: activity.state_url ?? activity.assets?.small_url ?? null,
    artworkUrl: resolveDiscordAssetImage(
      activity.assets?.large_image,
      applicationId
    ),
    startedAt: unixMilliseconds(activity.timestamps?.start),
    track,
    trackUrl: activity.details_url ?? activity.assets?.large_url ?? null,
  };
};

export const parseAppleMusicActivity = (
  activities: LanyardActivity[] | undefined
): ObservedListen | null => {
  const activity = activities?.find(isAppleMusicActivity);
  if (!activity) {
    return null;
  }

  return observedFromActivity(activity);
};

export const getDiscordStatusStyle = (
  discordStatus: string | undefined
): { color: string; text: string } =>
  DISCORD_STATUS_STYLES[
    (discordStatus as DiscordStatus | undefined) ?? "offline"
  ] ?? DISCORD_STATUS_STYLES.offline;
