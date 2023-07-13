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
      content: true,
      slug: true,
      tag: true,
    },
  });
}

export default async function DocumentPage(props: DocumentProps) {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
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
        content: document.content,
        slug: document.slug,
        tag: document.tag,
      }}
    />
  );
}
