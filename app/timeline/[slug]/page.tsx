import AnimatedSignature from "@/components/animated-signature";
import CopyLink from "@/components/copy-link";
import CopyText from "@/components/copy-text";
import Definition from "@/components/definition";
import LinkWithIcon from "@/components/link-with-icon";
import BlurFade from "@/components/magicui/blur-fade";
import SideNote from "@/components/side-note";
import Subscribe from "@/components/subscribe";
import TableOfContents from "@/components/toc";
import {
  ArrowLeftIcon,
  CalendarIcon,
  EnvelopeClosedIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import { allPosts } from "contentlayer/generated";
import type { MDXComponents } from "mdx/types";
import { Metadata } from "next";
import { getMDXComponent } from "next-contentlayer2/hooks";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";

function countWords(text: any) {
  const words = text.trim().split(/\s+/);
  return words.length;
}

const mdxComponents: MDXComponents = {
  Definition: ({ word, meaning, type }) => (
    <Definition word={word} meaning={meaning} type={type} />
  ),
  SideNote: ({ children, note }) => <SideNote note={note}>{children}</SideNote>,
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
  h1: ({ children }) => {
    const id = children
      ? children
          .toString()
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      : "";

    return <h1 id={id}>{children}</h1>;
  },
  h2: ({ children }) => {
    const id = children
      ? children
          .toString()
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      : "";

    return <h2 id={id}>{children}</h2>;
  },
  h3: ({ children }) => {
    const id = children
      ? children
          .toString()
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      : "";

    return <h3 id={id}>{children}</h3>;
  },
  pre: ({ children, ...props }) => (
    <pre
      {...props}
      className="overflow-auto bg-neutral-50 dark:bg-neutral-900 border rounded-xl p-6 font-mono text-black dark:text-neutral-300 text-sm"
    >
      {children}
    </pre>
  ),
};

export async function generateStaticParams() {
  return allPosts.map((post: { _raw: { flattenedPath: string } }) => ({
    slug: post._raw.flattenedPath,
  }));
}

export default async function Post(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;

  if (!slug) {
    return notFound();
  }

  const post = allPosts.find(
    (post: { _raw: { flattenedPath: string } }) =>
      post._raw.flattenedPath === params.slug,
  );

  if (!post) {
    return notFound();
  }

  const stats = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/page-stats?url=/timeline${post.url}`,
    { cache: "no-store" },
  ).then((res) => res.json());

  const wordCount = countWords(post.body.raw);
  const averageWordsPerMinute = 300; // Adjust this based on audience reading speed
  const readingTime = Math.ceil(wordCount / averageWordsPerMinute);

  const MDXContent = getMDXComponent(post.body.code);

  return (
    <>
      <TableOfContents content={post.body.raw} />

      <div className="max-w-lg mx-auto">
        <div className="text-sm leading-relaxed flex flex-col gap-10 pb-20">
          <BlurFade delay={0.1}>
            <div className="space-y-2">
              <h1 className="font-serif text-2xl italic">{post.title}</h1>

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
                    {post.tag} · {readingTime} minute read
                  </p>
                </div>
              </div>
            </div>
          </BlurFade>

          <div className="space-y-4 flex flex-col gap-4">
            <BlurFade delay={0.2}>
              {post.image && (
                <div className="flex flex-col gap-4">
                  <Image
                    src={`/${post.image}`}
                    width={800}
                    height={400}
                    priority
                    alt={post.title}
                    className="object-cover w-full rounded-xl aspect-video"
                  />
                  <p className="text-center text-xs text-muted-foreground">
                    {post.imageAlt}
                  </p>
                </div>
              )}
            </BlurFade>

            <BlurFade delay={post.image ? 0.3 : 0.2}>
              <article className="w-full prose  prose-blockquote:not-italic prose-headings:text-sm prose-headings:font-semibold prose-headings:text-black dark:prose-headings:text-neutral-300 max-w-prose prose-a:font-normal prose-a:no-underline prose-p:text-sm prose-p:font-normal mx-auto dark:prose-invert prose-blockquote:border-l prose-hr:border-[#e5e5e5] dark:prose-hr:border-[#262626] prose-blockquote:border-[#e5e5e5] dark:prose-blockquote:border-[#262626] prose-blockquote:text-black dark:prose-blockquote:text-neutral-300 font-normal prose-img:rounded-xl prose-img:mx-auto prose-p:text-black dark:prose-p:text-neutral-300 prose-p:leading-relaxed prose-ul:text-black dark:prose-ul:text-neutral-300 prose-ol:text-black dark:prose-ol:text-neutral-300 prose-li:text-black dark:prose-li:text-neutral-300 prose-li:text-sm prose-li:font-normal prose-ol:marker:text-black dark:prose-ol:marker:text-neutral-300 prose-li:marker:text-muted-foreground prose-li:marker:font-normal prose-li:marker:text-xs ">
                <MDXContent components={mdxComponents} />
              </article>
            </BlurFade>

            <BlurFade delay={0.4}>
              {post.signature && (
                <div className="flex flex-col gap-2">
                  <AnimatedSignature />
                  <div>
                    <p className="text-sm">Zacchary Puckeridge</p>
                    <p className="text-xs text-muted-foreground">
                      Web Developer & Designer
                    </p>
                  </div>
                </div>
              )}
            </BlurFade>

            <div className="mt-10 space-y-10">
              <div className="space-y-3">
                <h2 className="text-sm ">Share Article</h2>
                <div className="flex gap-3 text-muted-foreground">
                  <a
                    href={`https://x.com/intent/tweet?text=https%3A%2F%2Fzacchary.me${post.url}`}
                    className="hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-300"
                  >
                    <FaXTwitter className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fzacchary.me${post.url}`}
                    className="hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-300"
                  >
                    <FaFacebook className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:?subject=${post.title}&body=https%3A%2F%2Fzacchary.me${post.url}`}
                    className="hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-300"
                  >
                    <EnvelopeClosedIcon className="w-4 h-4" />
                  </a>
                  <CopyLink />
                </div>
              </div>
              <div className="space-y-3">
                <h2 className="text-sm ">Resources</h2>
                <div className="flex flex-col gap-3 text-muted-foreground text-xs">
                  <CopyText text={post.body.raw} />

                  <div className="flex gap-2">
                    <EyeOpenIcon className="w-4 h-4 my-auto" />

                    <p className="text-muted-foreground text-xs my-auto">
                      {stats.views.value}{" "}
                      {stats.views.value === 1 ? "view" : "views"} in the last
                      30 days
                    </p>
                  </div>

                  {post.lastModified && (
                    <div className="flex gap-2">
                      <CalendarIcon className="w-4 h-4 my-auto" />

                      <p className="text-muted-foreground text-xs my-auto">
                        Last modified on{" "}
                        {new Date(post.lastModified).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-sm ">About Zacchary</h2>

                <p className="text-xs text-muted-foreground">
                  Zacchary is a Christian IT Administrator working for Rising
                  Sun Pictures. Building better artist experiences by day,
                  designing epic web experiences by night.
                </p>
              </div>

              <Subscribe />
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <Link
                href="/timeline"
                className="text-xs text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition"
              >
                <ArrowLeftIcon className="inline-flex" /> /timeline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const post = allPosts.find(
    (post: { _raw: { flattenedPath: string } }) =>
      post._raw.flattenedPath === params.slug,
  );

  if (!post) {
    return notFound();
  }

  const title = `${post.title}`;
  const description = `${post.description}`;

  return {
    title: title,
    description: description,
    openGraph: {
      type: "article",
      title: title,
      description: description,
      siteName: "zacchary.me",
      images: [
        {
          url: post.image || "/avatar.avif",
          width: 1920,
          height: 1080,
          alt: title,
        },
      ],
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}${post.url}`,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [
        {
          url: post.image || "/avatar.avif",
          width: 1920,
          height: 1080,
          alt: title,
        },
      ],
    },
  };
}
