import prisma from "@/lib/prisma";
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/html";
import Image from "@tiptap/extension-image";

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  const post = await prisma.posts.findUnique({
    where: { slug },
  });

  // @ts-ignore
  const output = generateHTML(post?.content, [StarterKit, Image]);

  return (
    <main>
      <div className="mx-auto max-w-2xl my-4 space-y-8">
        <h1 className="text-4xl font-bold">{post?.title}</h1>
        <article
          className="prose prose-muted dark:prose-invert max-w-2xl prose-img:shadow-2xl prose-img:rounded-md"
          dangerouslySetInnerHTML={{ __html: output }}
        ></article>
      </div>
    </main>
  );
}
