import type { DateInput } from "@/lib/format-in-brisbane";

/**
 * Elapsed-time cutoff for the article age disclaimer.
 * Two years is 2 × 365 days (730 × 24h), matching `isNewPost`'s day-count
 * approach rather than a calendar-date anniversary (which would shift on leap years).
 */
export const OLD_POST_MIN_AGE_DAYS = 365 * 2;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const coerceTime = (value: DateInput): number =>
  value instanceof Date ? value.getTime() : new Date(value).getTime();

const OLD_POST_DISCLAIMER_EXEMPT_TAGS = new Set(["ai", "technical"]);

const hasExemptTag = (tags: string[] | undefined): boolean =>
  (tags ?? []).some((tag) =>
    OLD_POST_DISCLAIMER_EXEMPT_TAGS.has(tag.toLowerCase())
  );

/**
 * True when `dateCreated` is at least `OLD_POST_MIN_AGE_DAYS` in the past.
 * Pass `now` in tests so the window stays deterministic.
 */
export const isOldPost = function isOldPost(
  dateCreated: DateInput,
  now: DateInput = Date.now()
): boolean {
  const published = coerceTime(dateCreated);
  const nowMs = coerceTime(now);

  if (Number.isNaN(published) || Number.isNaN(nowMs)) {
    return false;
  }

  const ageMs = nowMs - published;
  return ageMs >= OLD_POST_MIN_AGE_DAYS * MS_PER_DAY;
};

/** Old-post disclaimer is skipped for AI and Technical articles. */
export const shouldShowOldPostDisclaimer = (post: {
  date_created: DateInput;
  tags?: string[];
}): boolean => isOldPost(post.date_created) && !hasExemptTag(post.tags);
