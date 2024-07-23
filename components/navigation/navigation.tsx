import { getAllPosts } from "@/lib/get-posts";
import prisma from "@/lib/prisma";
import NavigationClient from "./navigation-client";

export default async function Navigation() {
  const posts = getAllPosts();

  const videos = await prisma.video.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <>
      <NavigationClient posts={posts} videos={videos} />
    </>
  );
}
