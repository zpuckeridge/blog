import type {
  Definition,
  FootnoteDefinition,
  ImageReference,
  Paragraph,
  Root,
  RootContent,
} from "mdast";
import type { ComponentType } from "react";
import { Fragment } from "react";
import type { RenderNode } from "safe-mdx";
import { mdastBfs } from "safe-mdx";

import FootnotesNavigation from "@/components/footnotes-navigation";

export interface MdastImgComponentProps {
  alt: string;
  src: string;
  title?: string;
}

const visitDepthFirst = (
  node: unknown,
  fn: (o: { type?: string; identifier?: string }) => void
): void => {
  if (!node || typeof node !== "object") {
    return;
  }
  const o = node as {
    type?: string;
    identifier?: string;
    children?: unknown[];
  };
  fn(o);
  if (Array.isArray(o.children)) {
    for (const c of o.children) {
      visitDepthFirst(c, fn);
    }
  }
};

const buildFootnoteOrder = (tree: Root): Map<string, number> => {
  const map = new Map<string, number>();
  let n = 1;
  visitDepthFirst(tree, (o) => {
    if (
      o.type === "footnoteReference" &&
      o.identifier &&
      !map.has(o.identifier)
    ) {
      map.set(o.identifier, n);
      n += 1;
    }
  });
  return map;
};

const sortFootnoteDefinitions = (
  defs: FootnoteDefinition[],
  order: Map<string, number>
): FootnoteDefinition[] =>
  [...defs].toSorted((a, b) => {
    const oa = order.get(a.identifier) ?? 9999;
    const ob = order.get(b.identifier) ?? 9999;
    return oa - ob;
  });

/** Prefer mdast positions (stable for a given document); avoids array index keys. */
const mdastNodeKey = (node: RootContent): string => {
  const p = node.position;
  const start = p?.start?.offset;
  const end = p?.end?.offset;
  if (typeof start === "number" && typeof end === "number") {
    return `${node.type}:${start}:${end}`;
  }
  if (node.type === "text" && "value" in node) {
    return `text:${node.value}`;
  }
  return node.type;
};

/**
 * safe-mdx already runs `remark-gfm` when parsing (see `safe-mdx/parse`).
 * It parses footnotes and reference links but returns [] for `footnoteReference`,
 * `footnoteDefinition`, and `imageReference`. This render hook restores GFM output
 * for those nodes (Worker-safe — no eval).
 */
export const createSafeMdxGfmRenderNode = (
  mdast: Root,
  Img: ComponentType<MdastImgComponentProps>
): RenderNode => {
  const footnoteOrder = buildFootnoteOrder(mdast);

  return function safeMdxGfmRenderNode(node, transform) {
    if (node.type === "footnoteReference") {
      const num = footnoteOrder.get(node.identifier) ?? "•";
      const href = `#user-content-fn-${node.identifier}`;
      return (
        <sup>
          <FootnotesNavigation
            aria-describedby={`user-content-fn-${node.identifier}`}
            data-footnote-ref=""
            href={href}
            id={`user-content-fnref-${node.identifier}`}
          >
            {num}
          </FootnotesNavigation>
        </sup>
      );
    }

    if (node.type === "imageReference") {
      const ref = node as ImageReference;
      let src = "";
      let title: string | undefined;
      mdastBfs(mdast, (child) => {
        if (child.type === "definition") {
          const d = child as Definition;
          if (d.identifier === ref.identifier) {
            src = d.url || "";
            title = d.title || undefined;
          }
        }
      });
      if (!src) {
        return [];
      }
      return <Img alt={ref.alt || ""} src={src} title={title} />;
    }

    if (node.type === "root") {
      const defs = node.children.filter(
        (c): c is FootnoteDefinition => c.type === "footnoteDefinition"
      );
      if (defs.length === 0) {
        return;
      }

      const main = node.children.filter((c) => c.type !== "footnoteDefinition");
      const sorted = sortFootnoteDefinitions(defs, footnoteOrder);

      return (
        <>
          {main.map((child) => (
            <Fragment key={mdastNodeKey(child)}>{transform(child)}</Fragment>
          ))}
          <section
            aria-label="Footnotes"
            className="footnotes gfm-footnotes"
            data-footnotes=""
          >
            <ol>
              {sorted.map((def) => {
                const backref = (
                  <FootnotesNavigation
                    data-footnote-backref=""
                    href={`#user-content-fnref-${def.identifier}`}
                  >
                    ↩
                  </FootnotesNavigation>
                );
                const blocks = def.children;
                if (blocks.length === 0) {
                  return (
                    <li
                      id={`user-content-fn-${def.identifier}`}
                      key={def.identifier}
                    >
                      {backref}
                    </li>
                  );
                }
                const lastBlock = blocks.at(-1) as RootContent;
                const prevBlocks = blocks.slice(0, -1);
                return (
                  <li
                    id={`user-content-fn-${def.identifier}`}
                    key={def.identifier}
                  >
                    {prevBlocks.map((child) => (
                      <Fragment key={mdastNodeKey(child as RootContent)}>
                        {transform(child as RootContent)}
                      </Fragment>
                    ))}
                    {lastBlock.type === "paragraph" ? (
                      <p>
                        {(lastBlock as Paragraph).children.map((inline) => (
                          <Fragment key={mdastNodeKey(inline as RootContent)}>
                            {transform(inline as RootContent)}
                          </Fragment>
                        ))}{" "}
                        {backref}
                      </p>
                    ) : (
                      <>
                        <Fragment key={mdastNodeKey(lastBlock)}>
                          {transform(lastBlock)}
                        </Fragment>{" "}
                        {backref}
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        </>
      );
    }
  };
};
