import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Separator } from "@/components/ui/separator";
import CopyLink from "@/components/copy-link";
import { getAllPosts, getPostBySlug } from "@/lib/get-posts";
import { Metadata } from "next";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

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

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

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
            href="/blog"
            className="hover:text-white transition-all duration-200"
          >
            Blog
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
            {new Date(post.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <div className="flex gap-4">
            <p>{readingTime} minute read</p>
          </div>
        </div>
        <Separator />
      </div>
      <article className="prose prose-muted dark:prose-invert prose-ol:text-white prose-li:text-white prose-ul:text-white prose-hr:border-muted prose-blockquote:border-l-4 prose-blockquote:border-muted max-w-2xl mx-auto prose-img:shadow-2xl prose-img:object-cover prose-img:w-full prose-img:rounded-lg prose-img:border-2 prose-img:border-muted prose-img:mx-auto dark:prose-p:text-white prose-p:text-black">
        <MDXRemote source={post.content} />
      </article>
      <Separator className="max-w-2xl mx-auto" />
      <div className="md:flex space-y-4 md:space-y-0 justify-between max-w-2xl mx-auto gap-4">
        {prevPost && (
          <Link
            href={`/blog/${prevPost.slug}`}
            className={`flex justify-between gap-2 p-4 md:w-1/2 bg-neutral-900 hover:bg-muted transition-all duration-200 rounded-lg border-2`}
          >
            <ArrowLeftIcon className="my-auto w-5 h-5" />{" "}
            <p className="my-auto">{prevPost.title}</p>
          </Link>
        )}
        {nextPost && (
          <Link
            href={`/blog/${nextPost.slug}`}
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
