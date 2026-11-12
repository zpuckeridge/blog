import { highlightReference } from "@/lib/reference-highlight";

const SAME_HEADING_GAP_MS = 450;
const SCROLL_WAIT_MS = 1600;
const ANCHOR_SLOP_PX = 28;

let generation = 0;
let lastId = "";
let lastPaintedAt = 0;
let scrollTimer = 0;
let onScrollEnd: (() => void) | null = null;

const hashId = (): string => {
  const raw = window.location.hash.replace(/^#/u, "");
  if (!raw) {
    return "";
  }
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};

const headingLink = (
  id: string
): { heading: HTMLElement; link: HTMLElement } | null => {
  const heading = document.querySelector(`#${CSS.escape(id)}`);
  const link = heading?.querySelector(":scope > a.heading-link");
  if (!(heading instanceof HTMLElement) || !(link instanceof HTMLElement)) {
    return null;
  }
  return { heading, link };
};

const lengthPx = (value: string): number =>
  Number(value.replace(/px$/u, "")) || 0;

/** Scroll-padding and scroll-margin can stack, so the resting top is either. */
const atAnchor = (heading: HTMLElement): boolean => {
  const { top } = heading.getBoundingClientRect();
  const padding = lengthPx(
    getComputedStyle(document.documentElement).scrollPaddingTop
  );
  const margin = lengthPx(getComputedStyle(heading).scrollMarginTop);
  return [padding, margin, padding + margin].some(
    (target) => Math.abs(top - target) <= ANCHOR_SLOP_PX
  );
};

const cancelScrollWait = (): void => {
  window.clearTimeout(scrollTimer);
  if (onScrollEnd) {
    window.removeEventListener("scrollend", onScrollEnd);
    onScrollEnd = null;
  }
};

const paint = (link: HTMLElement, id: string, token: number): void => {
  if (token !== generation) {
    return;
  }

  const now = performance.now();
  if (id === lastId && now - lastPaintedAt < SAME_HEADING_GAP_MS) {
    return;
  }

  lastId = id;
  lastPaintedAt = now;
  cancelScrollWait();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  highlightReference(link);
};

/** Sweep a highlight across the heading a visitor just arrived at. */
export const highlightArrivedHeading = (id: string): void => {
  const found = headingLink(id);
  if (!found) {
    return;
  }

  generation += 1;
  const token = generation;
  cancelScrollWait();

  const run = (): void => {
    paint(found.link, id, token);
  };

  if (atAnchor(found.heading)) {
    run();
    return;
  }

  onScrollEnd = () => {
    onScrollEnd = null;
    run();
  };
  window.addEventListener("scrollend", onScrollEnd, { once: true });
  scrollTimer = window.setTimeout(() => {
    if (onScrollEnd) {
      window.removeEventListener("scrollend", onScrollEnd);
      onScrollEnd = null;
    }
    run();
  }, SCROLL_WAIT_MS);
};

let watching = false;

/** Highlight the heading in the URL, including the first load. */
export const watchHeadingArrival = (): void => {
  highlightArrivedHeading(hashId());
  if (watching) {
    return;
  }
  watching = true;
  window.addEventListener("hashchange", () => {
    highlightArrivedHeading(hashId());
  });
};
