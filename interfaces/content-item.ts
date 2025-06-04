export interface ContentItem {
  title: string;
  date: string;
  description?: string;
  tag: string;
  image?: string;
  imageAlt?: string;
  signature?: boolean;
  lastModified?: string;
  content: string;
  slug: string;
  type: string;
  url: string;
  videoUrl: string;
  duration: number;
  body: {
    raw: string;
  };
}
