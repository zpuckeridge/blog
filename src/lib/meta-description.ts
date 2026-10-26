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

/**
 * Unique copy for the five published tags. Each one names what that tag
 * actually lists, and each one is already inside the 120–155 character window.
 */
const TAG_DESCRIPTIONS: Record<string, string> = {
  art: "Notes on A Goofy Movie, including its father-son story, and thoughts on BoJack Horseman, published on the zacchary.me timeline.",
  education:
    "Why learning how to think matters more than cramming information, and why approaching a problem well beats looking smart.",
  faith:
    "Baptist missionary Dr. Jim Dearmore survived a 1978 double ambush in Rhodesia, then shared his story with grace and forgiveness until he died in 2015.",
  politics:
    "Reflecting on work-life balance, and arguing that the usual complaints about it are overblown. A note by Zacchary Puckeridge.",
  technical:
    "Guides to resizing a Proxmox virtual machine, a React birthday age calculator, and monitoring Windows with Grafana and Prometheus.",
};

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

/**
 * A tag page description in range. Known tags use copy based on the posts
 * they list. Any other tag is described from its label and post titles.
 */
export const descriptionForTag = (
  slug: string,
  label: string,
  titles: readonly string[]
): string => {
  const known = TAG_DESCRIPTIONS[slug];
  if (known) {
    return known;
  }

  const listed = titles
    .map((title) => title.trim())
    .filter((title) => title.length > 0)
    .slice(0, 2);
  const subject = listed.length > 0 ? `${label}: ${listed.join("; ")}` : label;
  return fitMetaDescription(
    `Posts tagged ${subject} on the zacchary.me timeline, written by Zacchary Puckeridge in Brisbane.`
  );
};
