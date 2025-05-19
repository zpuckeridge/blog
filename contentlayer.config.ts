import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import remarkGfm from "remark-gfm";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
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
      resolve: (post) => {
        const path = post._raw.flattenedPath;
        return `/${path.replace("posts/", "")}`;
      },
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
    tag: { type: "string", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (note) => {
        const path = note._raw.flattenedPath;
        return `/${path.replace("notes/", "")}`;
      },
    },
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
  filePathPattern: `videos/**/*.mdx`,
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
      resolve: (video) => {
        const path = video._raw.flattenedPath;
        return `/${path.replace("videos/", "")}`;
      },
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
