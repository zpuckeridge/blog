import type { ComponentType } from "react";
import { SafeMdxRenderer } from "safe-mdx";

import {
  HeadingShiftContext,
  ImageMetaContext,
} from "@/components/mdx-render-context";
import type { ContentImageMeta } from "@/lib/content-image";
import { headingLevelShift, headingsFromTree } from "@/lib/heading-shift";
import { parseTimelineMdxSource } from "@/lib/mdx-source";
import { createSafeMdxGfmRenderNode } from "@/lib/safe-mdx-gfm-render-node";
import type { MdastImgComponentProps } from "@/lib/safe-mdx-gfm-render-node";
import { components as mdxComponents } from "@/mdx-components";

const emptyImageMeta: Readonly<Record<string, ContentImageMeta>> = {};

/**
 * Renders CMS MDX without `new Function` / eval, so it works on Cloudflare Workers.
 * GFM is applied while parsing via `remark-gfm` inside `safe-mdx/parse`; we pass
 * `renderNode` so footnotes and image references render (safe-mdx omits them by default).
 */
export const MdxContent = ({
  contentSlug,
  imageMeta = emptyImageMeta,
  source,
}: {
  contentSlug?: string;
  imageMeta?: Readonly<Record<string, ContentImageMeta>>;
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

  const shift = headingLevelShift(
    headingsFromTree(parsed.mdast).map((heading) => heading.depth)
  );

  return (
    <ImageMetaContext.Provider value={imageMeta}>
      <HeadingShiftContext.Provider value={shift}>
        <SafeMdxRenderer
          components={mdxComponents}
          markdown={parsed.markdown}
          mdast={parsed.mdast}
          renderNode={renderNode}
        />
      </HeadingShiftContext.Provider>
    </ImageMetaContext.Provider>
  );
};
