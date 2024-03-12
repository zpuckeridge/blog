import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/get-posts";
import { ClockIcon, ReaderIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Zacchary's personal corner of the internet. Here you'll find posts about faith, technology, and life.",
};

export default async function Posts() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-7xl py-32 px-4">
      <div className="flex flex-wrap gap-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Welcome to my personal corner of the internet. Here you&apos;ll find
            posts about faith, technology, and life.
          </p>
        </div>

        <div className="w-full space-y-4">
          <h2 className="flex gap-2 underline underline-offset-4 font-semibold">
            <ClockIcon className="my-auto" /> Latest Posts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            {posts.slice(0, 2).map((post: any) => (
              <Link
                key={post.id}
                href={`/blog/${encodeURIComponent(post.slug)}`}
                prefetch={false}
                aria-label={post.title}
                className="relative p-4 border-2 hover:bg-neutral-900 duration-300 transition rounded-lg h-[200px] w-full"
              >
                <Badge
                  variant="secondary"
                  className="absolute bottom-4 left-4 font-mono"
                >
                  {post.tag}
                </Badge>
                <div className="space-y-2">
                  <p className="font-semibold">{post.title}</p>

                  <Badge variant="secondary" className="font-mono">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Badge>

                  <p className="text-sm text-muted-foreground">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full space-y-4">
          <h2 className="flex gap-2 underline underline-offset-4 font-semibold">
            <ReaderIcon className="my-auto" /> Read More
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.slice(2).map((post: any) => (
              <Link
                key={post.id}
                href={`/blog/${encodeURIComponent(post.slug)}`}
                prefetch={false}
                aria-label={post.title}
                className="relative p-4 border-2 hover:bg-neutral-900 duration-300 transition rounded-lg h-[200px]"
              >
                <Badge
                  variant="secondary"
                  className="absolute bottom-4 right-4 font-mono"
                >
                  {post.views} views
                </Badge>
                <Badge
                  variant="secondary"
                  className="absolute bottom-4 left-4 font-mono"
                >
                  {post.tag}
                </Badge>
                <div className="space-y-2">
                  <p className="font-semibold">{post.title}</p>

                  <Badge variant="secondary" className="font-mono">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Badge>

                  <p className="text-sm text-muted-foreground">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
