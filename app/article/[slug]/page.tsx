import Back from "@/components/back";
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
        <Back />
        <h1 className="text-4xl font-bold">{post?.title}</h1>
        <article
          className="prose text-white prose-invert prose-img:shadow-xl prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: output }}
        ></article>
      </div>
    </main>
  );
}
