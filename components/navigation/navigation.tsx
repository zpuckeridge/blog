import { getAllPosts } from "@/lib/get-posts";
import { getAllVideos } from "@/lib/get-videos";
import NavigationClient from "./navigation-client";

export default async function Navigation() {
  const posts = getAllPosts();

  const videos = getAllVideos();

  return (
    <>
      <NavigationClient posts={posts} videos={videos} />
    </>
  );
}
