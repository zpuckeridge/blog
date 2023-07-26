import prisma from "@/lib/prisma";
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/html";
import Image from "@tiptap/extension-image";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

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
  const output = generateHTML(post?.content, [StarterKit, Image]);

  return (
    <main>
      <div className="mx-auto space-y-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold">{post?.title}</h1>
            {userId === process.env.ADMIN_ID && (
              <div className="flex my-auto">
                <PostStatus published={post?.published} />
                <Link href={`/dashboard/edit/${post?.id}`}>
                  <Button variant="ghost">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <article
          className="prose prose-muted dark:prose-invert max-w-2xl mx-auto prose-img:shadow-2xl prose-img:rounded-md prose-img:mx-auto dark:prose-p:text-white prose-p:text-black"
          dangerouslySetInnerHTML={{ __html: output }}
        ></article>
      </div>
    </main>
  );
}
