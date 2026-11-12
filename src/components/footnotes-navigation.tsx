import { useCallback } from "react";

import { highlightReference } from "@/lib/reference-highlight";
import { trimLinkChildren } from "@/lib/trim-link-children";

type FootnotesNavigationProps = React.ComponentPropsWithoutRef<"a"> & {
  href: string;
  children: React.ReactNode;
  "data-footnote-backref"?: string;
};

const SENTENCE_CHAR = /[.!?]/u;
const WHITESPACE_CHAR = /\s/u;

const isSentenceEnd = (char: string | undefined) =>
  char !== undefined && SENTENCE_CHAR.test(char);

const sentenceBounds = (prose: string, referenceAt: number) => {
  let cursor = referenceAt;
  while (cursor > 0 && WHITESPACE_CHAR.test(prose[cursor - 1] ?? "")) {
    cursor -= 1;
  }

  let end = prose.length;
  let searchFrom = referenceAt;
  if (isSentenceEnd(prose[cursor - 1])) {
    end = cursor;
    searchFrom = cursor - 1;
  } else {
    for (let index = referenceAt; index < prose.length; index += 1) {
      if (isSentenceEnd(prose[index])) {
        end = index + 1;
        break;
      }
    }
  }

  let start = 0;
  for (let index = searchFrom - 1; index >= 0; index -= 1) {
    if (isSentenceEnd(prose[index])) {
      start = index + 1;
      break;
    }
  }
  while (WHITESPACE_CHAR.test(prose[start] ?? "")) {
    start += 1;
  }

  return { end, start };
};

const pointAt = (
  nodes: { end: number; node: Text; start: number }[],
  offset: number
) => {
  for (const item of nodes) {
    if (offset <= item.end) {
      return { node: item.node, offset: Math.max(0, offset - item.start) };
    }
  }
  const last = nodes.at(-1);
  if (!last) {
    return null;
  }
  return { node: last.node, offset: last.end - last.start };
};

const sentenceRange = (anchor: HTMLElement): Range | null => {
  const block = anchor.closest("p, li, blockquote");
  if (!block) {
    return null;
  }

  const nodes: { end: number; node: Text; start: number }[] = [];
  const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
  let prose = "";
  let referenceAt = 0;

  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!(node instanceof Text) || node.parentElement?.closest("sup")) {
      continue;
    }
    const precedesReference =
      node.compareDocumentPosition(anchor) === Node.DOCUMENT_POSITION_FOLLOWING;
    const start = prose.length;
    prose += node.textContent ?? "";
    nodes.push({ end: prose.length, node, start });
    if (precedesReference) {
      referenceAt = prose.length;
    }
  }

  const bounds = sentenceBounds(prose, referenceAt);
  const startPoint = pointAt(nodes, bounds.start);
  const endPoint = pointAt(nodes, bounds.end);
  if (!startPoint || !endPoint || bounds.start >= bounds.end) {
    return null;
  }

  const range = document.createRange();
  range.setStart(startPoint.node, startPoint.offset);
  range.setEnd(endPoint.node, endPoint.offset);
  return range;
};

const FootnotesNavigation = ({
  href,
  children,
  "data-footnote-backref": backref,
  ...props
}: FootnotesNavigationProps) => {
  const scrollToFootnote = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const targetId = href.replace(/^#/u, "");
      if (!targetId) {
        return;
      }
      const targetElement = document.querySelector<HTMLElement>(
        `#${CSS.escape(targetId)}`
      );
      if (!targetElement) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const { top, bottom } = targetElement.getBoundingClientRect();
      const inView = top >= 0 && bottom <= window.innerHeight;

      const highlightTarget =
        backref === undefined
          ? targetElement
          : (sentenceRange(targetElement) ?? targetElement);

      const reveal = () => {
        history.replaceState(history.state, "", href);
        if (!reduceMotion) {
          highlightReference(highlightTarget);
        }
      };

      if (reduceMotion || inView) {
        if (!inView) {
          targetElement.scrollIntoView({ behavior: "auto", block: "center" });
        }
        reveal();
        return;
      }

      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      let revealed = false;
      let fallback = 0;
      const finish = () => {
        if (revealed) {
          return;
        }
        revealed = true;
        window.clearTimeout(fallback);
        reveal();
      };
      fallback = window.setTimeout(finish, 1600);
      window.addEventListener("scrollend", finish, { once: true });
    },
    [backref, href]
  );

  return (
    <a
      href={href}
      {...props}
      className="text-muted-foreground"
      data-footnote-backref={backref}
      onClick={scrollToFootnote}
    >
      {trimLinkChildren(children)}
    </a>
  );
};

export default FootnotesNavigation;
