import CreateArticle from "@/components/dashboard/create-article";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Sidebar() {
  const { userId } = auth();

  if (userId !== process.env.ADMIN_ID) {
    redirect("/unauthorised");
  }

  const posts = await prisma.posts.findMany();

  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <CreateArticle />

      <DataTable columns={columns} data={posts} />
    </div>
  );
}
