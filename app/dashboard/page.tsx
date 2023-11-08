import CreateArticle from "@/components/create-article";
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
    <div className="max-w-4xl mx-auto my-10">
      <CreateArticle />

      <DataTable columns={columns} data={posts} />
    </div>
  );
}
