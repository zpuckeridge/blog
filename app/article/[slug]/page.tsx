import prisma from "@/lib/prisma";
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/html";

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
  const output = generateHTML(post?.content, [StarterKit]);

  return (
    <main>
      <div className="mx-auto max-w-2xl my-4 space-y-8">
        <h1 className="text-4xl font-bold">{post?.title}</h1>
        <article
          className="prose prose-muted dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: output }}
        ></article>
      </div>
    </main>
  );
}
