import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export async function DELETE(
  request: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { userId } = auth();

    if (userId !== process.env.ADMIN_ID) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { params } = routeContextSchema.parse(context);

    const count = await prisma.posts.count({
      where: {
        id: params.id,
      },
    });

    if (count === 0) {
      return new Response("Forbidden", { status: 403 });
    }

    await prisma.posts.delete({
      where: {
        id: params.id,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

const patchDocSchema = z.object({
  title: z.string().min(1).max(128),
  description: z.any(),
  slug: z.string().min(1).max(128),
  tag: z.string().min(1).max(128),
  published: z.boolean(),
  content: z.any(),
});

export type PatchDocType = z.infer<typeof patchDocSchema>;

export async function PATCH(
  request: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { userId } = auth();

    if (userId !== process.env.ADMIN_ID) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { params } = routeContextSchema.parse(context);

    const count = await prisma.posts.count({
      where: {
        id: params.id,
      },
    });

    if (count === 0) {
      return new Response("Forbidden", { status: 403 });
    }

    const json = await request.json();
    const body = patchDocSchema.parse(json);

    await prisma.posts.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        slug: body.slug,
        tag: body.tag,
        published: body.published,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
