import { getAllPosts } from "@/lib/get-posts";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "Welcome to my personal corner of the internet. Here you'll find posts about my faith, technology I'm interested in, random notes, code snippets and other things happening in my life.",
};

export default async function Posts() {
  const posts = getAllPosts();

  return (
    <div className="max-w-md lg:mx-auto">
      <div className="text-sm flex flex-col gap-20 pb-20">
        <div className="space-y-2">
          <p className="font-serif text-2xl italic ">Timeline</p>

          <p>
            Welcome to my personal corner of the internet. Here you'll find
            posts about my faith, technology I'm interested in, random notes,
            code snippets and other things happening in my life.
          </p>

          <p className="text-xs text-muted-foreground">
            Posts from September 2019 to present.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {posts.map((post: any) => (
            <div
              key={post.slug}
              className="flex gap-12 w-full border-b border-muted pb-6"
            >
              <div className="w-1/6 space-y-2 text-muted-foreground">
                <p className="text-muted-foreground text-nowrap">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <p className="text-muted-foreground text-xs">{post.tag}</p>
              </div>

              <div className="w-5/6 space-y-2">
                <Link
                  href={`/timeline/${post.slug}`}
                  aria-label={post.title}
                  className="underline hover:text-violet-400 hover:no-underline decoration-dotted underline-offset-2"
                >
                  {post.title}
                </Link>

                <p className="text-xs text-muted-foreground">
                  {post.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/"
          className="text-xs text-muted-foreground hover:text-violet-400"
        >
          <ArrowLeftIcon className="inline-flex" /> /
        </Link>
      </div>
    </div>
  );
}
