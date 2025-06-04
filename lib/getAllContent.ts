import type { MDXModule } from "@/_content";
import * as mdxIndex from "@/_content";
import { ContentItem } from "@/interfaces/content-item";

export async function getAllContent(): Promise<ContentItem[]> {
  const mdxModules = Object.entries(mdxIndex)
    .filter(([key]) => key.startsWith("_mdx_"))
    .map(([_, module]) => module as MDXModule)
    .filter((module) => {
      const type = module.frontmatter.type || "Post";
      return type === "Post" || type === "Note" || type === "Video";
    });

  return mdxModules.map(
    (module) =>
      ({
        ...module.frontmatter,
        content: module.content,
        slug: module.frontmatter.slug,
        type: module.frontmatter.type || "Post",
        url: `/${module.frontmatter.slug}`,
        body: {
          raw: module.content,
        },
      }) as ContentItem,
  );
}
