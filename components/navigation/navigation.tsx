import { getAllPosts } from "@/lib/get-posts";
import NavigationClient from "./navigation-client";

export default function Navigation() {
  const posts = getAllPosts();

  return (
    <>
      <NavigationClient posts={posts} />
    </>
  );
}
