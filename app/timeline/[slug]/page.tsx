import CopyLink from "@/components/copy-link";
import { getAllPosts, getPostBySlug } from "@/lib/get-posts";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

function countWords(text: any) {
  const words = text.trim().split(/\s+/);
  return words.length;
}

export default function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!slug) {
    return notFound();
  }

  const post = getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const wordCount = countWords(post.content);
  const averageWordsPerMinute = 250; // Adjust this based on audience reading speed
  const readingTime = Math.ceil(wordCount / averageWordsPerMinute);

  return (
    <div className="max-w-md lg:mx-auto pb-10">
      <div className="text-sm flex flex-col gap-20">
        <div className="space-y-2">
          <div className="flex justify-between gap-8">
            <h1 className="font-serif text-2xl italic">{post.title}</h1>
            <CopyLink />
          </div>

          <div className="flex gap-1 justify-between text-muted-foreground text-sm">
            <div className="text-nowrap">
              <p className="text-muted-foreground text-xs">
                {new Date(post.date).toLocaleDateString("en-US", {
                  weekday: "long",
                })}{" "}
                ·{" "}
                {new Date(post.date).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <hr className="w-full border-muted my-auto" />
            <div className="flex gap-2 text-nowrap">
              <p className="text-muted-foreground text-xs">
                {readingTime} minute read
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {post.image && (
            <div>
              <Image
                src={`/${post.image}`}
                width={800}
                height={400}
                alt={post.title}
                className="object-cover w-full"
              />
              <p className="text-center text-xs text-muted-foreground pt-2">
                {post.imageAlt}
              </p>
            </div>
          )}

          <article className="prose max-w-prose prose-a:underline hover:prose-a:text-violet-400 hover:prose-a:no-underline prose-a:font-normal prose-a:decoration-dotted prose-a:underline-offset-2 prose-p:text-sm prose-p:font-normal mx-auto dark:prose-invert prose-hr:border-muted prose-blockquote:border-l-2 prose-blockquote:text-white font-medium prose-blockquote:border-muted prose-img:shadow-2xl prose-img:object-cover prose-img:w-full prose-img:mx-auto prose-img:h-full prose-p:text-white">
            <MDXRemote source={post.content} />
          </article>
        </div>

        <div className="flex justify-between">
          <div>
            <Link
              href="/timeline"
              className="text-xs text-muted-foreground hover:text-violet-400"
            >
              <ArrowLeftIcon className="inline-flex" /> /timeline
            </Link>
          </div>
          <div>
            {post.lastModified && (
              <p className="text-muted-foreground text-xs">
                Last modified on{" "}
                {new Date(post.lastModified).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title}`;
  const description = `${post.description}`;

  return {
    title,
    openGraph: {
      title,
      description,
      images: [post.image || "/avatar.jpg"],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
