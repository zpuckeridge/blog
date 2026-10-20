import type { ComponentType } from "react";
import { SafeMdxRenderer } from "safe-mdx";

import { parseTimelineMdxSource } from "@/lib/mdx-source";
import { createSafeMdxGfmRenderNode } from "@/lib/safe-mdx-gfm-render-node";
import type { MdastImgComponentProps } from "@/lib/safe-mdx-gfm-render-node";
import { components as mdxComponents } from "@/mdx-components";

/**
 * Renders CMS MDX without `new Function` / eval, so it works on Cloudflare Workers.
 * GFM is applied while parsing via `remark-gfm` inside `safe-mdx/parse`; we pass
 * `renderNode` so footnotes and image references render (safe-mdx omits them by default).
 */
export const MdxContent = ({
  contentSlug,
  source,
}: {
  contentSlug?: string;
  source: string;
}) => {
  const parsed = parseTimelineMdxSource(source, contentSlug);

  if (parsed.error || !parsed.mdast) {
    return (
      <p className="text-muted-foreground text-sm">
        This article could not be rendered. Its formatting may need a small fix
        in the CMS.
      </p>
    );
  }

  const renderNode = createSafeMdxGfmRenderNode(
    parsed.mdast,
    mdxComponents.img as ComponentType<MdastImgComponentProps>
  );

  return (
    <SafeMdxRenderer
      components={mdxComponents}
      markdown={parsed.markdown}
      mdast={parsed.mdast}
      renderNode={renderNode}
    />
  );
};
