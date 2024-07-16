import { getAllPosts } from "@/lib/get-posts";
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
    <div className="max-w-md lg:mx-auto">
      <div className="text-sm flex flex-col gap-20">
        <div className="space-y-4">
          <p>
            Welcome to my personal corner of the internet. Here you'll find
            posts about my faith, technology I'm interested in, and things
            happening in my life.
          </p>

          <p className="text-xs text-muted-foreground">
            Posts from September 2019 to present.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {posts.map((post: any) => (
            <Link
              key={post.slug}
              href={`/timeline/${encodeURIComponent(post.slug)}`}
              prefetch={false}
              aria-label={post.title}
              className="relative border-t border-muted space-y-8 py-4"
            >
              <div className="flex justify-between">
                <p className="text-muted-foreground text-xs">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}{" "}
                  ·{" "}
                  {new Date(post.date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <p className="text-muted-foreground text-xs">{post.tag}</p>
              </div>

              <p className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2">
                {post.title}
              </p>

              <p className="text-sm text-muted-foreground">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
