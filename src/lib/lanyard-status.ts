export const APPLE_MUSIC_APPLICATION_ID = "1239490006054207550";
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

export type DiscordStatus = "online" | "idle" | "dnd" | "offline";

export const DISCORD_STATUS_STYLES: Record<
  DiscordStatus,
  { color: string; text: string }
> = {
  idle: { color: "bg-yellow-300", text: "Idle" },
  online: { color: "bg-green-500", text: "Online" },
  dnd: { color: "bg-red-500", text: "Do Not Disturb" },
  offline: { color: "bg-gray-400", text: "Offline" },
};

export const HIGHLIGHTED_LINK_CLASS =
  "group inline px-1 leading-[inherit] bg-muted hover:bg-muted/80";

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

export const resolveArtworkZoomUrl = (artworkUrl: string | null): string | null => {
  if (!artworkUrl) {
    return null;
  }

  return artworkUrl.replace(/\/(\d+)x(\d+)bb(\.[a-z]+)$/i, "/1000x1000bb$3");
};

export const parseAppleMusicActivity = (
  activities: LanyardActivity[] | undefined
): NowListening | null => {
  const activity = activities?.find(
    (item) => item.application_id === APPLE_MUSIC_APPLICATION_ID
  );

  if (!activity?.details?.trim()) {
    return null;
  }

  const track = activity.details.trim();
  const artist =
    activity.assets?.small_text?.trim() ||
    extractArtistFromState(activity.state);

  if (!artist) {
    return null;
  }

  return {
    track,
    artist,
    album:
      activity.assets?.large_text?.trim() ||
      extractAlbumFromState(activity.state) ||
      null,
    artworkUrl: resolveDiscordAssetImage(activity.assets?.large_image),
    trackUrl: activity.details_url ?? activity.assets?.large_url ?? null,
    artistUrl: activity.state_url ?? activity.assets?.small_url ?? null,
  };
};

export const getDiscordStatusStyle = (
  discordStatus: string | undefined
): { color: string; text: string } =>
  DISCORD_STATUS_STYLES[
    (discordStatus as DiscordStatus | undefined) ?? "offline"
  ] ?? DISCORD_STATUS_STYLES.offline;
