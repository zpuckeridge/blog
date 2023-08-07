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
      <div className="mx-auto max-w-2xl my-4 space-y-8 my-10">
        <ul className="space-y-16">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/article/${encodeURIComponent(post.slug)}`}
                prefetch={false}
                aria-label={post.title}
              >
                <div className="space-y-4">
                  <p className="font-semibold hover:underline">{post.title}</p>
                  <p>{post.description}</p>
                  <div className="flex gap-2">
                    <p>{post.views} views</p>/
                    <Badge variant="secondary">{post.tag}</Badge>/
                    <p>
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
