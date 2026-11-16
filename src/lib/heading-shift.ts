export interface ArticleHeading {
  depth: number;
  id: string;
  text: string;
}

interface MdNode {
  children?: MdNode[];
  depth?: number;
  type: string;
  value?: string;
}

export const headingIdFromText = (text: string): string =>
  text
    .toLowerCase()
    .replaceAll(/[^\w\s-]/gu, "")
    .replaceAll(/\s+/gu, "-");

/**
 * Shift a single markdown heading depth so the first in-article heading is h2 under
 * the page title. Only headings at or below the first heading depth move; shallower
 * headings that appear later (e.g. `##` after introductory `###`) stay put.
 */
export const headingShiftForDepth = (
  depth: number,
  firstHeadingDepth: number
): number => {
  if (firstHeadingDepth === 0) {
    return 0;
  }
  if (firstHeadingDepth <= 1) {
    return 1;
  }
  if (firstHeadingDepth === 2) {
    return 0;
  }
  const lift = 2 - firstHeadingDepth;
  return depth >= firstHeadingDepth ? lift : 0;
};

/** @deprecated Prefer `headingShiftForDepth` with the first heading depth. */
export const headingLevelShift = (depths: readonly number[]): number => {
  if (depths.length === 0) {
    return 0;
  }

  const min = Math.min(...depths);
  if (min <= 1) {
    return 1;
  }
  if (min > 2) {
    return 2 - min;
  }
  return 0;
};

export const shiftedHeadingDepth = (depth: number, shift: number): number =>
  Math.min(6, Math.max(1, depth + shift));

const textOf = (node: MdNode): string => {
  if (typeof node.value === "string") {
    return node.value;
  }
  return (node.children ?? []).map((child) => textOf(child)).join("");
};

export const headingsFromTree = (tree: MdNode): ArticleHeading[] => {
  const headings: ArticleHeading[] = [];

  const walk = (node: MdNode, inFootnote: boolean): void => {
    if (node.type === "footnoteDefinition") {
      for (const child of node.children ?? []) {
        walk(child, true);
      }
      return;
    }

    if (!inFootnote && node.type === "heading" && node.depth) {
      const text = textOf(node).replaceAll(/\s+/gu, " ").trim();
      headings.push({
        depth: node.depth,
        id: headingIdFromText(text),
        text,
      });
    }

    if (!inFootnote) {
      for (const child of node.children ?? []) {
        walk(child, false);
      }
    }
  };

  walk(tree, false);
  return headings;
};

const shiftedHeadings = (
  headings: readonly ArticleHeading[]
): ArticleHeading[] => {
  const firstDepth = headings[0]?.depth ?? 0;
  return headings.map((heading) => ({
    ...heading,
    depth: shiftedHeadingDepth(
      heading.depth,
      headingShiftForDepth(heading.depth, firstDepth)
    ),
  }));
};

export const articleHeadingOutline = (
  tree: MdNode
): { firstHeadingDepth: number; headings: ArticleHeading[] } => {
  const headings = headingsFromTree(tree);
  const firstHeadingDepth = headings[0]?.depth ?? 0;
  return { firstHeadingDepth, headings: shiftedHeadings(headings) };
};
