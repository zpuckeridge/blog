export type Post = {
  id: number;
  status: string;
  date_created: Date;
  date_updated: Date;
  title: string;
  slug: string;
  image: string;
  image_alt: string;
  description: string;
  tags: string[];
  content: string;
  signature: boolean;
};

export type Note = {
  id: number;
  status: string;
  date_created: Date;
  date_updated: Date;
  content: string;
  tags: string[];
};

export interface TimelineItem extends Omit<Post, "id"> {
  id: string;
  type: "Post" | "Note";
}

export type Video = {
  id: number;
  status: string;
  date_created: Date;
  date_updated: Date;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  duration: number;
  playback_id: string;
};

export type Book = {
  id: number;
  status: string;
  date_created: Date;
  date_updated: Date;
  title: string;
  isbn: number;
  rating: number;
  image: string;
  published: Date;
  author: string;
};

export type Movie = {
  id: number;
  status: string;
  date_created: Date;
  date_updated: Date;
  title: string;
  rating: number;
  setting: string;
  image: string;
  with: string[];
};

export type Credit = {
  id: number;
  status: string;
  date_created: Date;
  date_updated: Date;
  title: string;
  release_date: Date;
  description: string;
  image: string;
  link: string;
  director: string;
  tags: string[];
};

export type Project = {
  id: number;
  status: string;
  date_created: Date;
  date_updated: Date;
  name: string;
  description: string;
  image: string;
  video: string;
  link: string;
  year_completed: number;
  tags: string[];
};
