import AnimatedSignature from "@/components/animated-signature";
import CopyLink from "@/components/copy-link";
import LinkWithIcon from "@/components/link-with-icon";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { allPosts } from "contentlayer/generated";
import type { MDXComponents } from "mdx/types";
import { Metadata } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

function countWords(text: any) {
  const words = text.trim().split(/\s+/);
  return words.length;
}

const mdxComponents: MDXComponents = {
  a: ({ href, children, ...props }) => {
    // Check if the link is a footnote reference
    if (href?.startsWith("#user-content") || href?.startsWith("#fnref-")) {
      return (
        <a href={href} {...props} className="text-muted-foreground">
          {children}
        </a>
      );
    }
    // For all other links, use the LinkWithIcon component
    return <LinkWithIcon href={href as string}>{children}</LinkWithIcon>;
  },
};

export default function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!slug) {
    return notFound();
  }

  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) {
    return notFound();
  }

  const wordCount = countWords(post.body.code);
  const averageWordsPerMinute = 250; // Adjust this based on audience reading speed
  const readingTime = Math.ceil(wordCount / averageWordsPerMinute);

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div className="max-w-lg lg:mx-auto">
      <div className="text-sm leading-relaxed flex flex-col gap-20 pb-20">
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

        <div className="space-y-4 flex flex-col gap-4">
          {post.image && (
            <div className="flex flex-col gap-4">
              <Image
                src={`/${post.image}`}
                width={800}
                height={400}
                alt={post.title}
                className="object-cover w-full rounded-xl"
              />
              <p className="text-center text-xs text-muted-foreground">
                {post.imageAlt}
              </p>
            </div>
          )}

          <article className="w-full prose max-w-prose prose-a:font-normal prose-a:no-underline prose-p:text-sm prose-p:font-normal mx-auto dark:prose-invert prose-hr:border-muted prose-blockquote:border-l-2 prose-blockquote:text-black font-medium prose-blockquote:border-muted prose-img:rounded-xl prose-img:mx-auto prose-p:text-black prose-p:leading-relaxed prose-ul:text-black prose-ol:text-black prose-li:text-black">
            <MDXContent components={mdxComponents} />
          </article>

          {post.signature && (
            <div className="flex flex-col gap-1">
              <AnimatedSignature />
              <div>
                <p className="text-sm">Zacchary Puckeridge</p>
                <p className="text-xs text-muted-foreground">
                  Web Developer & Designer
                </p>
              </div>
            </div>
          )}
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
          {/* <div>
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
          </div> */}
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
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title}`;
  // const description = `${post.description}`;

  return {
    title: title,
    // description: description,
    // openGraph: {
    //   type: "article",
    //   title: title,
    //   description: description,
    //   siteName: "zacchary.me",
    //   images: [
    //     {
    //       url: post.image || "/avatar.avif",
    //       width: 1920,
    //       height: 1080,
    //       alt: title,
    //     },
    //   ],
    //   url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/timeline/${post.slug}`,
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title: title,
    //   description: description,
    //   images: [
    //     {
    //       url: post.image || "/avatar.avif",
    //       width: 1920,
    //       height: 1080,
    //       alt: title,
    //     },
    //   ],
    // },
  };
}

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));
