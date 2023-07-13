import CreateDocButton from "@/components/create-document";
import DocumentCard from "@/components/document-card";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

export type DocumentType = {
  id: string;
  title: string;
};

async function getDocuments() {
  return await prisma.posts.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
    },
  });
}

export default async function Sidebar() {
  const { userId } = auth();

  if (userId !== process.env.ADMIN_ID) {
    redirect("/unauthorised");
  }

  const documents = await getDocuments();

  return (
    <ScrollArea className="flex h-screen w-full flex-col items-start justify-start">
      <CreateDocButton />
      {documents.map((document, index) => (
        <DocumentCard key={index} document={document} />
      ))}
    </ScrollArea>
  );
}
