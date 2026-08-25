import type { DateInput } from "@/lib/format-in-brisbane";

/** Posts published within this window get a synthetic "New" tag. */
export const NEW_POST_MAX_AGE_DAYS = 30;

export const NEW_POST_TAG = "New";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const coerceTime = (value: DateInput): number =>
  value instanceof Date ? value.getTime() : new Date(value).getTime();

/**
 * True when `dateCreated` is in the past and younger than `NEW_POST_MAX_AGE_DAYS`.
 * Pass `now` in tests so the window stays deterministic.
 */
export const isNewPost = function isNewPost(
  dateCreated: DateInput,
  now: DateInput = Date.now()
): boolean {
  const published = coerceTime(dateCreated);
  const nowMs = coerceTime(now);

  if (Number.isNaN(published) || Number.isNaN(nowMs)) {
    return false;
  }

  const ageMs = nowMs - published;
  return ageMs >= 0 && ageMs < NEW_POST_MAX_AGE_DAYS * MS_PER_DAY;
};
