const POPOVER_GAP = 6;
const VIEWPORT_PAD = 8;

export const CHART_POPOVER_CLASS =
  "pointer-events-none fixed z-50 hidden w-max max-w-[16rem] -translate-x-1/2 -translate-y-full rounded-md border border-border bg-popover px-3 py-2 text-left text-popover-foreground text-xs text-pretty shadow-md";

export const chartPopoverLabel = (mark: Element): string => {
  if (mark instanceof HTMLElement || mark instanceof SVGElement) {
    return mark.dataset.label ?? "";
  }
  return "";
};

const svgAnchorTop = (mark: SVGElement): number | null => {
  const raw = mark.dataset.tipY;
  if (!raw) {
    return null;
  }
  const y = Number(raw);
  if (!Number.isFinite(y)) {
    return null;
  }
  const svg = mark.ownerSVGElement;
  const matrix = svg?.getScreenCTM();
  if (!svg || !matrix) {
    return null;
  }
  const point = svg.createSVGPoint();
  point.y = y;
  return point.matrixTransform(matrix).y;
};

/** Box the popover should sit against: the bar or point, not the full hit column. */
export const chartPopoverRect = (mark: Element): DOMRect => {
  const box = mark.getBoundingClientRect();
  if (mark instanceof SVGElement) {
    const top = svgAnchorTop(mark);
    if (top !== null) {
      return new DOMRect(box.x, top, box.width, 0);
    }
  }

  const bar = mark.querySelector("[data-chart-bar]");
  if (bar instanceof Element) {
    const barBox = bar.getBoundingClientRect();
    if (barBox.height > 0) {
      return barBox;
    }
  }

  return box;
};

export const placeChartPopover = (
  tooltip: HTMLElement,
  rect: DOMRect
): void => {
  tooltip.classList.remove("hidden");
  const width = tooltip.offsetWidth || 128;
  const height = tooltip.offsetHeight || 32;
  const half = width / 2 + VIEWPORT_PAD;
  const center = rect.left + rect.width / 2;
  tooltip.style.left = `${Math.min(Math.max(center, half), window.innerWidth - half)}px`;

  const above = rect.top - POPOVER_GAP;
  if (above - height < VIEWPORT_PAD) {
    tooltip.classList.remove("-translate-y-full");
    tooltip.style.top = `${rect.bottom + POPOVER_GAP}px`;
    return;
  }

  tooltip.classList.add("-translate-y-full");
  tooltip.style.top = `${above}px`;
};
