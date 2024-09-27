import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    description: { type: "string", required: true },
    tag: { type: "string", required: true },
    image: { type: "string", required: false },
    imageAlt: { type: "string", required: false },
    signature: { type: "boolean", required: false },
    lastModified: { type: "date", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/timeline/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "_posts",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
  },
});
