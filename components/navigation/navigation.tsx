import { getAllVideos } from "@/lib/get-videos";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import NavigationClient from "./navigation-client";

export default async function Navigation() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  const videos = getAllVideos();

  return (
    <>
      <NavigationClient posts={posts} videos={videos} />
    </>
  );
}
