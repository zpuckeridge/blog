import { timingSafeEqual } from "node:crypto";

export interface AppleMusicConnectSecretSource {
  APPLE_MUSIC_CONNECT_SECRET?: string;
}

const encoder = new TextEncoder();

/** Resolves the dedicated Apple Music connect bearer secret, if configured. */
export const resolveAppleMusicConnectSecret = (
  workers: AppleMusicConnectSecretSource,
  processEnv: NodeJS.ProcessEnv = process.env
): string | null =>
  workers.APPLE_MUSIC_CONNECT_SECRET?.trim() ||
  processEnv.APPLE_MUSIC_CONNECT_SECRET?.trim() ||
  null;

/** Constant-time comparison for `Authorization: Bearer <secret>`. */
export const verifyAppleMusicConnectBearer = (
  authorization: string | null,
  secret: string
): boolean => {
  if (!authorization) {
    return false;
  }

  const expected = `Bearer ${secret}`;
  const provided = encoder.encode(authorization);
  const wanted = encoder.encode(expected);
  if (provided.length !== wanted.length) {
    return false;
  }

  return timingSafeEqual(provided, wanted);
};
