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

interface CaretBoundary {
  node: Node;
  offset: number;
}

interface TextSlice {
  from: number;
  node: Text;
  to: number;
}

interface LineSpan {
  slices: TextSlice[];
}

const boundaryInside = (
  source: HTMLElement | Range,
  boundary: CaretBoundary
): boolean => {
  if (source instanceof HTMLElement) {
    return source.contains(boundary.node);
  }

  try {
    const probe = document.createRange();
    probe.setStart(boundary.node, boundary.offset);
    probe.collapse(true);
    const beforeSource =
      source.compareBoundaryPoints(Range.START_TO_START, probe) > 0;
    const afterSource =
      source.compareBoundaryPoints(Range.END_TO_START, probe) < 0;
    return !(beforeSource || afterSource);
  } catch {
    return false;
  }
};

const boundaryAt = (x: number, y: number): CaretBoundary | null => {
  const point = document.caretPositionFromPoint(x, y);
  if (point) {
    return { node: point.offsetNode, offset: point.offset };
  }
  const range = document.caretRangeFromPoint(x, y);
  if (!range) {
    return null;
  }
  return { node: range.startContainer, offset: range.startOffset };
};

const textSlices = (start: CaretBoundary, end: CaretBoundary): TextSlice[] => {
  const range = document.createRange();
  try {
    range.setStart(start.node, start.offset);
    range.setEnd(end.node, end.offset);
  } catch {
    return [];
  }
  if (range.collapsed) {
    return [];
  }

  const root =
    range.commonAncestorContainer instanceof Text
      ? range.commonAncestorContainer.parentNode
      : range.commonAncestorContainer;
  if (!root) {
    return [];
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const slices: TextSlice[] = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!(node instanceof Text)) {
      continue;
    }
    let intersects = false;
    try {
      intersects = range.intersectsNode(node);
    } catch {
      continue;
    }
    if (!intersects) {
      continue;
    }
    const from = node === range.startContainer ? range.startOffset : 0;
    const to = node === range.endContainer ? range.endOffset : node.length;
    if (to > from) {
      slices.push({ from, node, to });
    }
  }
  return slices;
};

/** Map each visual line to text offsets once, so later scroll cannot retarget it. */
const lineSpans = (source: HTMLElement | Range): LineSpan[] => {
  const spans: LineSpan[] = [];
  for (const line of lineBoxes(source)) {
    const y = line.top + line.height / 2;
    const start = boundaryAt(line.left + 1, y);
    const end = boundaryAt(line.left + line.width - 1, y);
    if (
      !(start && end) ||
      !boundaryInside(source, start) ||
      !boundaryInside(source, end)
    ) {
      continue;
    }
    const slices = textSlices(start, end).filter((slice) =>
      boundaryInside(source, { node: slice.node, offset: slice.from })
    );
    if (slices.length > 0) {
      spans.push({ slices });
    }
  }
  return spans;
};

const rangeForProgress = (
  slices: TextSlice[],
  progress: number
): Range | null => {
  if (progress <= 0) {
    return null;
  }

  let total = 0;
  for (const slice of slices) {
    total += slice.to - slice.from;
  }
  if (total === 0) {
    return null;
  }

  let remaining = Math.min(total, Math.ceil(total * progress));
  const range = document.createRange();
  const [first] = slices;
  if (!first) {
    return null;
  }
  range.setStart(first.node, first.from);
  for (const slice of slices) {
    const length = slice.to - slice.from;
    if (remaining <= length) {
      range.setEnd(slice.node, slice.from + remaining);
      return range.collapsed ? null : range;
    }
    remaining -= length;
  }

  const last = slices.at(-1);
  if (!last) {
    return null;
  }
  range.setEnd(last.node, last.to);
  return range.collapsed ? null : range;
};

let highlightRun = 0;

/** Paint the reference selection, growing left to right across each line. */
export const highlightReference = (target: HTMLElement | Range): void => {
  const lines = lineSpans(target);
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
      const range = rangeForProgress(line.slices, progress);
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
