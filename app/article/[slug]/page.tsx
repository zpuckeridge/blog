import prisma from "@/lib/prisma";
import { Edit, MoveLeft, MoveLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Separator } from "@/components/ui/separator";

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
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <div className="flex justify-between text-muted-foreground text-sm">
            <p>
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p>{post.views + 1} views</p>
          </div>
          <Separator />
        </div>

        <article className="prose prose-muted dark:prose-invert max-w-2xl mx-auto prose-img:shadow-2xl prose-img:rounded-md prose-img:mx-auto dark:prose-p:text-white prose-p:text-black">
          <MDXRemote source={post.content} />
        </article>

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
      </div>
    </main>
  );
}
