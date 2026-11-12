const HIGHLIGHT_NAME = "reference";
const FADE_CLASS = "reference-highlight-fading";
const REST_COLOR = "--reference-highlight-rest";
const LINE_MS = 480;
const HOLD_MS = 1000;
const FADE_MS = 400;

interface LineBox {
  height: number;
  left: number;
  top: number;
  width: number;
}

let restElement: HTMLElement | null = null;

const sourceElement = (source: HTMLElement | Range): HTMLElement | null => {
  const node = source instanceof Range ? source.startContainer : source;
  if (node instanceof HTMLElement) {
    return node;
  }
  return node.parentElement;
};

const clearHighlights = (): void => {
  CSS.highlights?.delete(HIGHLIGHT_NAME);
  document.documentElement.classList.remove(FADE_CLASS);
  document.documentElement.style.removeProperty(REST_COLOR);
  restElement?.style.removeProperty(REST_COLOR);
  restElement = null;
};

const rememberRestColor = (source: HTMLElement | Range): void => {
  const element = sourceElement(source);
  const color = element ? getComputedStyle(element).color : "canvastext";
  document.documentElement.style.setProperty(REST_COLOR, color);
  element?.style.setProperty(REST_COLOR, color);
  restElement = element;
};

const rectsIn = (source: HTMLElement | Range): DOMRect[] => {
  if (source instanceof Range) {
    return [...source.getClientRects()];
  }

  const range = document.createRange();
  const walker = document.createTreeWalker(source, NodeFilter.SHOW_TEXT);
  const rects: DOMRect[] = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.textContent?.trim()) {
      continue;
    }
    range.selectNodeContents(node);
    rects.push(...range.getClientRects());
  }

  return rects;
};

const lineBoxes = (source: HTMLElement | Range): LineBox[] => {
  const rects = rectsIn(source);
  const lines: LineBox[] = [];
  for (const rect of rects) {
    if (rect.width < 1 || rect.height < 1) {
      continue;
    }
    const mid = rect.top + rect.height / 2;
    const line = lines.find(
      (item) => Math.abs(item.top + item.height / 2 - mid) < rect.height * 0.6
    );
    if (!line) {
      lines.push({
        height: rect.height,
        left: rect.left,
        top: rect.top,
        width: rect.width,
      });
      continue;
    }
    const right = Math.max(line.left + line.width, rect.right);
    const bottom = Math.max(line.top + line.height, rect.bottom);
    line.left = Math.min(line.left, rect.left);
    line.top = Math.min(line.top, rect.top);
    line.width = right - line.left;
    line.height = bottom - line.top;
  }

  lines.sort((a, b) => a.top - b.top || a.left - b.left);
  return lines;
};

const collapsedRangeAt = (x: number, y: number): Range | null => {
  const point = document.caretPositionFromPoint(x, y);
  if (point) {
    const range = document.createRange();
    range.setStart(point.offsetNode, point.offset);
    range.collapse(true);
    return range;
  }
  return document.caretRangeFromPoint(x, y);
};

const lineRange = (line: LineBox, progress: number): Range | null => {
  const y = line.top + line.height / 2;
  const start = collapsedRangeAt(line.left + 1, y);
  const end = collapsedRangeAt(
    Math.min(line.left + line.width * progress, line.left + line.width - 1),
    y
  );
  if (!(start && end)) {
    return null;
  }

  try {
    const range = document.createRange();
    range.setStart(start.startContainer, start.startOffset);
    range.setEnd(end.startContainer, end.startOffset);
    return range.collapsed ? null : range;
  } catch {
    return null;
  }
};

let highlightRun = 0;

/** Paint the reference selection, growing left to right across each line. */
export const highlightReference = (target: HTMLElement | Range): void => {
  const lines = lineBoxes(target);
  highlightRun += 1;
  const run = highlightRun;
  clearHighlights();
  if (lines.length === 0 || CSS.highlights === undefined) {
    return;
  }

  rememberRestColor(target);
  const painter = new Highlight();
  CSS.highlights.set(HIGHLIGHT_NAME, painter);
  const startedAt = performance.now();

  const paint = (now: number): void => {
    if (run !== highlightRun) {
      return;
    }

    painter.clear();
    const elapsed = now - startedAt;
    for (const [index, line] of lines.entries()) {
      const lineStart = index * LINE_MS;
      if (elapsed < lineStart) {
        break;
      }
      const progress = Math.min(1, (elapsed - lineStart) / LINE_MS);
      const range = lineRange(line, progress);
      if (range) {
        painter.add(range);
      }
    }

    if (elapsed < lines.length * LINE_MS) {
      requestAnimationFrame(paint);
      return;
    }

    window.setTimeout(() => {
      if (run !== highlightRun) {
        return;
      }
      document.documentElement.classList.add(FADE_CLASS);
      window.setTimeout(() => {
        if (run === highlightRun) {
          clearHighlights();
        }
      }, FADE_MS);
    }, HOLD_MS);
  };

  requestAnimationFrame(paint);
};
