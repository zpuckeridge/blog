import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";

import Link from "next/link";

export default async function Articles() {
  const posts = await prisma.posts.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <div className="mx-auto max-w-2xl space-y-8 my-10">
        {posts.map((post) => (
          <div key={post.id} className="p-8 bg-muted rounded-2xl">
            <Link
              href={`/article/${encodeURIComponent(post.slug)}`}
              prefetch={false}
              aria-label={post.title}
            >
              <div className="space-y-2">
                <p className="font-semibold hover:underline">{post.title}</p>
                <div className="flex gap-2">
                  <p>{post.views} views</p>/
                  <Badge variant="default">{post.tag}</Badge>/
                  <p>
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <p>{post.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
