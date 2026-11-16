export const APPLE_MUSIC_USER_TOKEN_KV_KEY = "apple-music:user-token";
export const APPLE_MUSIC_POLL_STATE_KV_KEY = "apple-music:poll-state";

export interface AppleMusicPollState {
  /** Apple Music song ids in API order (most recent first). */
  trackIds: string[];
  updatedAt: number;
}

export const parseAppleMusicPollState = (
  raw: string | null
): AppleMusicPollState | null => {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== "object" || parsed === null) {
      return null;
    }

    const record = parsed as Record<string, unknown>;
    if (!Array.isArray(record.trackIds)) {
      return null;
    }

    const trackIds = record.trackIds.filter(
      (id): id is string => typeof id === "string" && id.trim().length > 0
    );

    const updatedAt =
      typeof record.updatedAt === "number" &&
      Number.isFinite(record.updatedAt) &&
      record.updatedAt > 0
        ? Math.trunc(record.updatedAt)
        : Date.now();

    return { trackIds, updatedAt };
  } catch {
    return null;
  }
};
