import { compareDesc } from "date-fns";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import NavigationClient from "./navigation-client";

interface Post {
  title: string;
  date: string;
  tag: string;
  type: string;
  url: string;
}

async function getAllContent(): Promise<Post[]> {
  const contentDir = path.join(process.cwd(), "_content");
  const postsDir = path.join(contentDir, "posts");
  const videosDir = path.join(contentDir, "videos");

  const getAllFiles = (dir: string): Post[] => {
    if (!fs.existsSync(dir)) {
      return [];
    }
    const files = fs.readdirSync(dir);
    return files.map((file) => {
      const filePath = path.join(dir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);
      const type = dir.split("/").pop() || "";
      const slug = file.replace(".mdx", "");
      return {
        ...data,
        type,
        url: `/${type}/${slug}`,
      } as Post;
    });
  };

  const posts = getAllFiles(postsDir);
  const videos = getAllFiles(videosDir);

  return [...posts, ...videos];
}

export default async function Navigation() {
  const allContent = await getAllContent();
  const posts = allContent
    .filter((item) => item.type === "posts")
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  const videos = allContent
    .filter((item) => item.type === "videos")
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <>
      <NavigationClient posts={posts} videos={videos} />
    </>
  );
}
