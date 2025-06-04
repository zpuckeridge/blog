import { getAllContent } from "@/lib/getAllContent";
import { compareDesc } from "date-fns";
import NavigationClient from "./navigation-client";

export default async function Navigation() {
  const allContent = await getAllContent();
  const posts = allContent
    .filter((item) => item.type === "Post")
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  const videos = allContent
    .filter((item) => item.type === "Video")
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <>
      <NavigationClient posts={posts} videos={videos} />
    </>
  );
}
