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

/** Shift markdown headings so the page H1 stays the top of the outline. */
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

/** Headings outside footnote definitions, in document order. */
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

export const shiftedHeadings = (
  headings: readonly ArticleHeading[]
): ArticleHeading[] => {
  const shift = headingLevelShift(headings.map((heading) => heading.depth));
  return headings.map((heading) => ({
    ...heading,
    depth: shiftedHeadingDepth(heading.depth, shift),
  }));
};
