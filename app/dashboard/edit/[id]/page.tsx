import Editor from "@/components/editor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

type DocumentProps = {
  params: {
    id: string;
  };
};

async function getDocument(id: string) {
  return await prisma.posts.findFirst({
    where: {
      id: id,
    },
    select: {
      title: true,
      description: true,
      content: true,
      slug: true,
      tag: true,
      published: true,
    },
  });
}

export default async function DocumentPage(props: DocumentProps) {
  const { userId } = auth();

  if (userId !== process.env.ADMIN_ID) {
    redirect("/unauthorised");
  }

  const document = await getDocument(props.params.id);

  if (!document) {
    notFound();
  }

  return (
    <Editor
      id={props.params.id}
      document={{
        title: document.title,
        description: document.description,
        content: document.content,
        slug: document.slug,
        tag: document.tag,
        published: document.published,
      }}
    />
  );
}
