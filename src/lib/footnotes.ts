const FOOTNOTE_ID_PREFIX = "user-content-fn";
const FOOTNOTE_REF_PREFIX = "user-content-fnref";

export const footnoteId = (identifier: string): string =>
  `${FOOTNOTE_ID_PREFIX}-${identifier}`;

export const footnoteHref = (identifier: string): string =>
  `#${footnoteId(identifier)}`;

export const footnoteRefId = (identifier: string): string =>
  `${FOOTNOTE_REF_PREFIX}-${identifier}`;

export const footnoteRefHref = (identifier: string): string =>
  `#${footnoteRefId(identifier)}`;

export const isFootnoteHref = (href: string): boolean =>
  href.startsWith(`#${FOOTNOTE_ID_PREFIX}`);
