import prisma from "@/lib/prisma";
import { Edit, MoveLeft, MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Separator } from "@/components/ui/separator";
import CopyLink from "@/components/copy-link";

function countWords(text: any) {
  const words = text.trim().split(/\s+/);
  return words.length;
}

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  const post = await prisma.posts.findUnique({
    where: { slug },
  });

  if (!post) {
    redirect("/404");
  }

  await prisma.posts.update({
    where: { slug },
    data: { views: post.views + 1 },
  });

  const PostStatus = ({ published }: any) => {
    return published ? (
      <Button variant="ghost">Published</Button>
    ) : (
      <Button variant="ghost">Draft</Button>
    );
  };

  const { userId } = auth();

  const wordCount = countWords(post.content);
  const averageWordsPerMinute = 250; // Adjust this based on audience reading speed
  const readingTime = Math.ceil(wordCount / averageWordsPerMinute);

  const prevPost = await prisma.posts.findFirst({
    where: { createdAt: { lt: post.createdAt }, published: true },
    orderBy: { createdAt: "desc" },
  });

  const nextPost = await prisma.posts.findFirst({
    where: { createdAt: { gt: post.createdAt }, published: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <main>
      <div className="sticky py-4 px-4 top-4 z-50 max-w-4xl mx-auto flex justify-between rounded-lg bg-opacity-75 backdrop-blur-lg font-mono border">
        <Link
          href="/articles"
          className={`flex gap-2 ${buttonVariants({
            variant: "ghost",
          })}`}
        >
          <MoveLeftIcon /> Back
        </Link>

        <p className="text-sm my-auto">{post.title}</p>

        <div className="flex my-auto">
          {userId === process.env.ADMIN_ID && (
            <>
              <PostStatus published={post.published} />
              <Link
                href={`/dashboard/edit/${post.id}`}
                className={buttonVariants({ variant: "ghost" })}
                aria-label="Edit Post"
              >
                <Edit className="w-4 h-4" />
              </Link>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
      <div className="mx-auto my-10 space-y-12">
        <div className="max-w-2xl mx-auto space-y-2">
          <div className="flex justify-between gap-8">
            <h1 className="text-xl font-semibold truncate">{post.title}</h1>
            <CopyLink />
          </div>
          <div className="flex justify-between text-muted-foreground text-sm">
            <p>
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <div className="flex gap-4">
              <p>{post.views + 1} views</p>
              <p>{readingTime} minute read</p>
            </div>
          </div>
          <Separator />
        </div>
        <article className="prose prose-muted dark:prose-invert max-w-2xl mx-auto prose-img:shadow-2xl prose-img:rounded-md prose-img:mx-auto dark:prose-p:text-white prose-p:text-black">
          <MDXRemote source={post.content} />
        </article>
        {post.updatedAt && (
          <div className="max-w-2xl mx-auto space-y-2">
            <p className="text-muted-foreground text-sm flex justify-end">
              Last updated{" "}
              {new Date(post.updatedAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        )}
        <div className="flex justify-between max-w-2xl mx-auto gap-4">
          {prevPost && (
            <Link
              href={`/article/${prevPost.slug}`}
              className={`flex gap-2 max-w-[20rem] w-full h-auto ${buttonVariants(
                {
                  variant: "ghost",
                },
              )}`}
              style={{ justifyContent: "flex-start" }}
            >
              {prevPost.title}
            </Link>
          )}

          {nextPost && (
            <Link
              href={`/article/${nextPost.slug}`}
              className={`flex gap-2 max-w-[20rem] w-full h-auto ${buttonVariants(
                {
                  variant: "ghost",
                },
              )}`}
              style={{ justifyContent: "flex-end" }}
            >
              {nextPost.title}
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
