export interface RhythmsWebhookSecretSource {
  RHYTHMS_WEBHOOK_SECRET?: string;
  LOCATION_WEBHOOK_SECRET?: string;
}

/** Prefer `RHYTHMS_WEBHOOK_SECRET`; fall back to `LOCATION_WEBHOOK_SECRET` when unset. */
export const resolveRhythmsWebhookSecret = (
  workers: RhythmsWebhookSecretSource,
  processEnv: NodeJS.ProcessEnv = process.env
): string | null =>
  workers.RHYTHMS_WEBHOOK_SECRET ??
  processEnv.RHYTHMS_WEBHOOK_SECRET ??
  workers.LOCATION_WEBHOOK_SECRET ??
  processEnv.LOCATION_WEBHOOK_SECRET ??
  null;
