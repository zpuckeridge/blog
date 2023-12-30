import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Separator } from "@/components/ui/separator";
import CopyLink from "@/components/copy-link";
import type { Metadata, ResolvingMetadata } from "next";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

function countWords(text: any) {
  const words = text.trim().split(/\s+/);
  return words.length;
}

async function retrievePost(slug: string) {
  const data = await prisma.posts.findUnique({
    where: {
      slug: slug,
      published: true,
    },
  });

  if (!data) {
    redirect("/404");
  }

  return data;
}

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = params.slug;

  if (!slug) {
    redirect("/404");
  }

  const post = await retrievePost(slug);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${post.title}`,
    description: post.description,
    openGraph: {
      images: [post.image || "/avatar.jpg", ...previousImages],
    },
  };
}

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  if (!slug) {
    redirect("/404");
  }

  const post = await retrievePost(slug);

  await prisma.posts.update({
    where: { slug },
    data: { views: post.views + 1 },
  });

  const wordCount = countWords(post.content);
  const averageWordsPerMinute = 250; // Adjust this based on audience reading speed
  const readingTime = Math.ceil(wordCount / averageWordsPerMinute);

  const prevPost = await prisma.posts.findFirst({
    where: { createdAt: { lt: post.createdAt }, published: true },
    orderBy: { createdAt: "desc" },
  });

  const nextPost = await prisma.posts.findFirst({
    where: { createdAt: { gt: post.createdAt }, published: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="mx-auto py-20 px-4 space-y-12">
      <div className="max-w-2xl mx-auto space-y-2">
        <div className="flex gap-2 text-muted-foreground text-xs">
          <Link
            href="/"
            className="hover:text-white transition-all duration-200"
          >
            Home
          </Link>
          <span> / </span>
          <Link
            href="/articles"
            className="hover:text-white transition-all duration-200"
          >
            Articles
          </Link>
          <span> / </span>
          <span className="text-white">{post.title}</span>
        </div>
        <div className="flex justify-between gap-8">
          <h1 className="text-xl font-semibold truncate">{post.title}</h1>
          <CopyLink />
        </div>
        <div className="flex justify-between text-muted-foreground text-sm">
          <p>
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <div className="flex gap-4">
            <p>{post.views + 1} views</p>
            <p>{readingTime} minute read</p>
          </div>
        </div>
        <Separator />
      </div>
      <article className="prose prose-muted dark:prose-invert prose-ol:text-white prose-li:text-white prose-ul:text-white prose-hr:border-muted prose-blockquote:border-l-4 prose-blockquote:border-muted max-w-2xl mx-auto prose-img:shadow-2xl prose-img:object-cover prose-img:w-full prose-img:rounded-lg prose-img:border-2 prose-img:border-muted prose-img:mx-auto dark:prose-p:text-white prose-p:text-black">
        <MDXRemote source={post.content} />
      </article>
      {post.updatedAt && (
        <div className="max-w-2xl mx-auto space-y-2">
          <p className="text-muted-foreground text-sm flex justify-end">
            Last updated{" "}
            {new Date(post.updatedAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      )}

      <Separator className="max-w-2xl mx-auto" />

      <div className="md:flex space-y-4 md:space-y-0 justify-between max-w-2xl mx-auto gap-4">
        {prevPost && (
          <Link
            href={`/article/${prevPost.slug}`}
            className={`flex justify-between gap-2 p-4 md:w-1/2 bg-neutral-900 hover:bg-muted transition-all duration-200 rounded-lg border-2`}
          >
            <ArrowLeftIcon className="my-auto w-5 h-5" />{" "}
            <p className="my-auto">{prevPost.title}</p>
          </Link>
        )}

        {nextPost && (
          <Link
            href={`/article/${nextPost.slug}`}
            className={`flex justify-between gap-2 p-4 md:w-1/2 bg-neutral-900 hover:bg-muted transition-all duration-200 rounded-lg border-2`}
          >
            <p className="my-auto">{nextPost.title}</p>{" "}
            <ArrowRightIcon className="my-auto w-5 h-5" />
          </Link>
        )}
      </div>
    </div>
  );
}
