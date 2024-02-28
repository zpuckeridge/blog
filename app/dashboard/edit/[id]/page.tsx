import EditArticleForm from "@/components/dashboard/edit-article";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

export const runtime = "edge";

async function retrieveArticle(id: string) {
  return await prisma.posts.findFirst({
    where: {
      id: id,
    },
    select: {
      title: true,
      description: true,
      content: true,
      blocks: true,
      slug: true,
      tag: true,
      published: true,
    },
  });
}

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = auth();

  if (userId !== process.env.ADMIN_ID) {
    redirect("/unauthorised");
  }

  const article = await retrieveArticle(params.id);

  if (!article) {
    notFound();
  }

  return (
    <EditArticleForm
      id={params.id}
      article={{
        title: article.title,
        description: article.description,
        content: article.content,
        blocks: article.blocks,
        slug: article.slug,
        tag: article.tag,
        published: article.published,
      }}
    />
  );
}
