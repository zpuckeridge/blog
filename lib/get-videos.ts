import { Video } from "@/interfaces/video";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const videosDirectory = join(process.cwd(), "_videos");

export function getVideoSlugs() {
  return fs.readdirSync(videosDirectory);
}

export function getVideoBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(videosDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return { ...data, slug: realSlug } as Video;
}

export function getAllVideos(): Video[] {
  const slugs = getVideoSlugs();
  const videos = slugs
    .map((slug) => getVideoBySlug(slug))
    .sort((video1, video2) => (video1.date > video2.date ? -1 : 1));
  return videos;
}
