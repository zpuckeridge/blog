export interface AppleMusicConnectSecretSource {
  APPLE_MUSIC_CONNECT_SECRET?: string;
  LOCATION_WEBHOOK_SECRET?: string;
  RHYTHMS_WEBHOOK_SECRET?: string;
}

/** Prefer a dedicated connect secret, then rhythms, then location webhook. */
export const resolveAppleMusicConnectSecret = (
  workers: AppleMusicConnectSecretSource,
  processEnv: NodeJS.ProcessEnv = process.env
): string | null =>
  workers.APPLE_MUSIC_CONNECT_SECRET ??
  processEnv.APPLE_MUSIC_CONNECT_SECRET ??
  workers.RHYTHMS_WEBHOOK_SECRET ??
  processEnv.RHYTHMS_WEBHOOK_SECRET ??
  workers.LOCATION_WEBHOOK_SECRET ??
  processEnv.LOCATION_WEBHOOK_SECRET ??
  null;
