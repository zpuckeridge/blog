import prisma from "@/lib/prisma";
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/html";
import Image from "@tiptap/extension-image";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Back from "@/components/back";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";

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

  // @ts-ignore
  const output = generateHTML(post.content, [StarterKit, Image]);

  return (
    <main>
      <div className="mx-auto space-y-8">
        <div className="sticky py-4 top-0 z-50 flex justify-between w-full bg-opacity-75 backdrop-blur-lg">
          <Back />

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
            <p>{post.views} views</p>
          </div>
        </div>

        <article
          className="prose prose-muted dark:prose-invert max-w-2xl mx-auto prose-img:shadow-2xl prose-img:rounded-md prose-img:mx-auto dark:prose-p:text-white prose-p:text-black"
          dangerouslySetInnerHTML={{ __html: output }}
        ></article>

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
