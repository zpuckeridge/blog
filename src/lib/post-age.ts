import type { DateInput } from "@/lib/format-in-brisbane";

const NEW_POST_MAX_AGE_DAYS = 30;

export const NEW_POST_TAG = "New";

/** Two years is 730 × 24h rather than a calendar anniversary, which would shift on leap years. */
const OLD_POST_MIN_AGE_DAYS = 365 * 2;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const coerceTime = (value: DateInput): number =>
  value instanceof Date ? value.getTime() : new Date(value).getTime();

const elapsedMs = (dateCreated: DateInput, now: DateInput): number | null => {
  const published = coerceTime(dateCreated);
  const nowMs = coerceTime(now);
  if (Number.isNaN(published) || Number.isNaN(nowMs)) {
    return null;
  }

  return nowMs - published;
};

const OLD_POST_DISCLAIMER_EXEMPT_TAGS = new Set(["ai", "technical"]);

const hasExemptTag = (tags: string[] | undefined): boolean =>
  (tags ?? []).some((tag) =>
    OLD_POST_DISCLAIMER_EXEMPT_TAGS.has(tag.toLowerCase())
  );

export const isNewPost = (
  dateCreated: DateInput,
  now: DateInput = Date.now()
): boolean => {
  const ageMs = elapsedMs(dateCreated, now);
  return (
    ageMs !== null && ageMs >= 0 && ageMs < NEW_POST_MAX_AGE_DAYS * MS_PER_DAY
  );
};

const isOldPost = (
  dateCreated: DateInput,
  now: DateInput = Date.now()
): boolean => {
  const ageMs = elapsedMs(dateCreated, now);
  return ageMs !== null && ageMs >= OLD_POST_MIN_AGE_DAYS * MS_PER_DAY;
};

export const shouldShowOldPostDisclaimer = (post: {
  date_created: DateInput;
  tags?: string[];
}): boolean => isOldPost(post.date_created) && !hasExemptTag(post.tags);
