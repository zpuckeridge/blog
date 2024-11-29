import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import remarkGfm from "remark-gfm";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `timeline/**/*.mdx`,
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
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
  },
}));

export const Note = defineDocumentType(() => ({
  name: "Note",
  filePathPattern: `notes/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
  },
}));

export const Link = defineDocumentType(() => ({
  name: "Link",
  filePathPattern: `links/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    url: { type: "string", required: true },
  },
}));

export const Video = defineDocumentType(() => ({
  name: "Video",
  filePathPattern: `video/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tag: { type: "string", required: true },
    description: { type: "string", required: false },
    videoUrl: { type: "string", required: true },
    duration: { type: "number", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (video) => `/${video._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "_content",
  documentTypes: [Post, Video, Note, Link],
  mdx: {
    remarkPlugins: [remarkGfm],
  },
});
