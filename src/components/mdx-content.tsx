import type { ComponentType } from "react";
import { SafeMdxRenderer } from "safe-mdx";
import { mdxParse } from "safe-mdx/parse";

import { createSafeMdxGfmRenderNode } from "@/lib/safe-mdx-gfm-render-node";
import type { MdastImgComponentProps } from "@/lib/safe-mdx-gfm-render-node";
import { components as mdxComponents } from "@/mdx-components";

/**
 * Renders CMS MDX without `new Function` / eval, so it works on Cloudflare Workers.
 * GFM is applied while parsing via `remark-gfm` inside `safe-mdx/parse`; we pass
 * `renderNode` so footnotes and image references render (safe-mdx omits them by default).
 */
export const MdxContent = ({ source }: { source: string }) => {
  const mdast = mdxParse(source);
  const renderNode = createSafeMdxGfmRenderNode(
    mdast,
    mdxComponents.img as ComponentType<MdastImgComponentProps>
  );

  return (
    <SafeMdxRenderer
      components={mdxComponents}
      markdown={source}
      mdast={mdast}
      renderNode={renderNode}
    />
  );
};
