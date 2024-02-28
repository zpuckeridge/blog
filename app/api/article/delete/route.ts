import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function DELETE(request: Request) {
  try {
    const { userId } = auth();

    if (userId !== process.env.ADMIN_ID) {
      return new Response("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    const { id } = json;

    await prisma.posts.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json("Something went wrong.", { status: 500 });
  }
}
