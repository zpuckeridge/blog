import prisma from "@/lib/prisma";
import * as z from "zod";
import { auth } from "@clerk/nextjs";

const createDocSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  tag: z.string(),
});

export type CreateDocType = z.infer<typeof createDocSchema>;

export async function POST(request: Request) {
  try {
    const { userId } = auth();

    if (userId !== process.env.ADMIN_ID) {
      return new Response("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    const body = createDocSchema.parse(json);

    const document = await prisma.posts.create({
      data: {
        id: body.id,
        title: body.title,
        description: body.description,
        slug: body.slug,
        tag: body.tag,
        published: false,
      },
    });

    return new Response(JSON.stringify(document));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
