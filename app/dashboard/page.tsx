import CreateDocButton from "@/components/create-document";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export type DocumentType = {
  id: string;
  title: string;
};

async function getDocuments() {
  return await prisma.posts.findMany({
    select: {
      id: true,
      title: true,
      tag: true,
      slug: true,
      views: true,
      published: true,
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
    <div className="max-w-2xl mx-auto">
      <CreateDocButton />

      <DataTable columns={columns} data={documents} />
    </div>
  );
}
