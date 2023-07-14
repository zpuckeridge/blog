import prisma from "@/lib/prisma";
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/html";
import Image from "@tiptap/extension-image";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs";

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  const post = await prisma.posts.findUnique({
    where: { slug },
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
      <div className="mx-auto max-w-2xl my-4 space-y-8">
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
        <article
          className="prose prose-muted dark:prose-invert max-w-2xl prose-img:shadow-2xl prose-img:rounded-md"
          dangerouslySetInnerHTML={{ __html: output }}
        ></article>
      </div>
    </main>
  );
}
