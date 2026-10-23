export const META_DESCRIPTION_MIN = 120;
export const META_DESCRIPTION_MAX = 155;

const SHORT_POST_DESCRIPTIONS: Record<string, string> = {
  "ive-been-inspired-by-a-goofy-movie":
    "Why A Goofy Movie still lands in adulthood: a note on a bored Wednesday, a Sideways video, and what the film stirred up.",
  "react-based-age-calculator":
    "Calculate an age from a birthdate in this small React calculator, a short build note by Zacchary Puckeridge in Brisbane.",
};

const FALLBACK =
  "Notes on faith, technology, and life in Brisbane, written by Zacchary Puckeridge on zacchary.me.";

const PAD = " A note by Zacchary Puckeridge in Brisbane.";

export const collapseWhitespace = (value: string): string =>
  value.replaceAll(/\s+/gu, " ").trim();

const stripTrailingPunctuation = (value: string): string =>
  value.replace(/[.,;:!?—–-]+$/u, "").trim();

const trimToMax = (text: string): string => {
  const slice = text.slice(0, META_DESCRIPTION_MAX + 1);
  const cut = slice.lastIndexOf(" ");
  let trimmed = (
    cut >= META_DESCRIPTION_MIN
      ? slice.slice(0, cut)
      : text.slice(0, META_DESCRIPTION_MAX)
  ).trim();
  trimmed = stripTrailingPunctuation(trimmed);
  if (trimmed.length < META_DESCRIPTION_MIN) {
    trimmed = text.slice(0, META_DESCRIPTION_MAX).trim();
  }
  if (trimmed.length > META_DESCRIPTION_MAX) {
    return trimmed.slice(0, META_DESCRIPTION_MAX).trim();
  }
  return trimmed;
};

/** Collapse, trim, or pad copy so meta descriptions land between 120 and 155 characters. */
export const fitMetaDescription = (raw: string): string => {
  const text = collapseWhitespace(raw);
  if (
    text.length >= META_DESCRIPTION_MIN &&
    text.length <= META_DESCRIPTION_MAX
  ) {
    return text;
  }

  if (text.length > META_DESCRIPTION_MAX) {
    return trimToMax(text);
  }

  if (!text) {
    return FALLBACK;
  }

  const sentence = /[.!?]$/u.test(text) ? text : `${text}.`;
  const padded = `${sentence}${PAD}`;
  if (
    padded.length >= META_DESCRIPTION_MIN &&
    padded.length <= META_DESCRIPTION_MAX
  ) {
    return padded;
  }

  if (padded.length > META_DESCRIPTION_MAX) {
    return trimToMax(padded);
  }

  const extended = `${padded} Read more on zacchary.me.`;
  if (
    extended.length >= META_DESCRIPTION_MIN &&
    extended.length <= META_DESCRIPTION_MAX
  ) {
    return extended;
  }

  return extended.length > META_DESCRIPTION_MAX
    ? trimToMax(extended)
    : FALLBACK;
};

/**
 * Prefer a CMS description that is already in range.
 * Slug overrides cover the two short posts until Directus is updated.
 */
export const descriptionForPost = (slug: string, raw: string): string => {
  const collapsed = collapseWhitespace(raw);
  if (
    collapsed.length >= META_DESCRIPTION_MIN &&
    collapsed.length <= META_DESCRIPTION_MAX
  ) {
    return collapsed;
  }

  const override = SHORT_POST_DESCRIPTIONS[slug];
  if (override) {
    return override;
  }

  return fitMetaDescription(collapsed);
};
