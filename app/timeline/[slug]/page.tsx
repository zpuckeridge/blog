import AnimatedSignature from "@/components/animated-signature";
import CopyLink from "@/components/copy-link";
import CopyText from "@/components/copy-text";
import Definition from "@/components/definition";
import LinkWithIcon from "@/components/link-with-icon";
import { BlurFade } from "@/components/magicui/blur-fade";
import SideNote from "@/components/side-note";
import Subscribe from "@/components/subscribe";
import TableOfContents from "@/components/toc";
import {
  ArrowLeftIcon,
  CalendarIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";

const mdxComponents = {
  Definition: ({
    word,
    meaning,
    type,
  }: {
    word: string;
    meaning: string;
    type?: string | undefined;
  }) => <Definition word={word} meaning={meaning} type={type} />,
  SideNote: ({
    children,
    note,
    position,
  }: {
    children: React.ReactNode;
    note: string;
    position?: string;
  }) => (
    <SideNote note={note} position={position as "left" | "right" | undefined}>
      {children}
    </SideNote>
  ),
  a: ({
    href = "",
    children,
    ...props
  }: {
    href?: string;
    children: React.ReactNode;
    [key: string]: any;
  }) => {
    if (href.startsWith("#user-content") || href.startsWith("#fnref-")) {
      return (
        <a href={href} {...props} className="text-muted-foreground">
          {children}
        </a>
      );
    }
    return <LinkWithIcon href={href}>{children}</LinkWithIcon>;
  },
  h1: ({ children }: { children: React.ReactNode }) => {
    const id = children
      ? children
          .toString()
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      : "";
    return <h1 id={id}>{children}</h1>;
  },
  h2: ({ children }: { children: React.ReactNode }) => {
    const id = children
      ? children
          .toString()
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      : "";
    return <h2 id={id}>{children}</h2>;
  },
  h3: ({ children }: { children: React.ReactNode }) => {
    const id = children
      ? children
          .toString()
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      : "";
    return <h3 id={id}>{children}</h3>;
  },
  pre: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: any;
  }) => (
    <pre
      {...props}
      className="overflow-auto bg-neutral-50 dark:bg-neutral-900 border rounded-xl p-6 font-mono text-black dark:text-neutral-300 text-sm"
    >
      {children}
    </pre>
  ),
};

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let MDXContent, frontmatter, content;

  try {
    // Dynamically import the MDX file for the slug
    const post = await import(`@/_content/posts/${slug}.mdx`);
    MDXContent = post.default;
    frontmatter = post.frontmatter;
    content = post.default?.compiledSource || ""; // fallback if needed
  } catch {
    return notFound();
  }

  // Calculate reading time
  // If you want to use the raw content, you may need to import it differently
  // For now, fallback to 1 minute if content is not available
  const wordCount = content ? content.split(/\s+/).length : 200;
  const averageWordsPerMinute = 300;
  const readingTime = Math.ceil(wordCount / averageWordsPerMinute);

  return (
    <>
      <TableOfContents content={content} />
      <div className="max-w-lg mx-auto">
        <div className="text-sm leading-relaxed flex flex-col gap-10 pb-20">
          <BlurFade delay={0.1}>
            <div className="space-y-2">
              <h1 className="font-serif text-2xl italic">
                {frontmatter.title}
              </h1>
              <div className="flex gap-1 justify-between text-muted-foreground text-sm">
                <div className="text-nowrap">
                  <p className="text-muted-foreground text-xs">
                    {new Date(frontmatter.date).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}{" "}
                    ·{" "}
                    {new Date(frontmatter.date).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <hr className="w-full border-muted my-auto" />
                <div className="flex gap-2 text-nowrap">
                  <p className="text-muted-foreground text-xs">
                    {frontmatter.tag} · {readingTime} minute read
                  </p>
                </div>
              </div>
            </div>
          </BlurFade>
          <div className="space-y-4 flex flex-col gap-4">
            <BlurFade delay={0.2}>
              {frontmatter.image && (
                <div className="flex flex-col gap-4 w=full h-full aspect-video">
                  <Image
                    src={`/${frontmatter.image}`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 800px"
                    alt={frontmatter.title}
                    className="object-cover w-full rounded-xl aspect-video"
                  />
                  <p className="text-center text-xs text-muted-foreground">
                    {frontmatter.imageAlt}
                  </p>
                </div>
              )}
            </BlurFade>
            <BlurFade delay={frontmatter.image ? 0.3 : 0.2}>
              <article className="w-full prose prose-blockquote:not-italic prose-headings:text-sm prose-headings:font-semibold prose-headings:text-black dark:prose-headings:text-neutral-300 max-w-prose prose-a:font-normal prose-a:no-underline prose-p:text-sm prose-p:font-normal mx-auto dark:prose-invert prose-blockquote:border-l prose-hr:border-[#e5e5e5] dark:prose-hr:border-[#262626] prose-blockquote:border-[#e5e5e5] dark:prose-blockquote:border-[#262626] prose-blockquote:text-black dark:prose-blockquote:text-neutral-300 font-normal prose-img:rounded-xl prose-img:mx-auto prose-p:text-black dark:prose-p:text-neutral-300 prose-p:leading-relaxed prose-ul:text-black dark:prose-ul:text-neutral-300 prose-ol:text-black dark:prose-ol:text-neutral-300 prose-li:text-black dark:prose-li:text-neutral-300 prose-li:text-sm prose-li:font-normal prose-ol:marker:text-black dark:prose-ol:marker:text-neutral-300 prose-li:marker:text-muted-foreground prose-li:marker:font-normal prose-li:marker:text-xs">
                <MDXContent components={mdxComponents} />
              </article>
            </BlurFade>
            <BlurFade delay={0.4}>
              {frontmatter.signature && (
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
                    href={`https://x.com/intent/tweet?text=https%3A%2F%2Fzacchary.me/timeline/${slug}`}
                    className="hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-300"
                  >
                    <FaXTwitter className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fzacchary.me/timeline/${slug}`}
                    className="hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-300"
                  >
                    <FaFacebook className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:?subject=${frontmatter.title}&body=https%3A%2F%2Fzacchary.me/timeline/${slug}`}
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
                  <CopyText text={content} />
                  {frontmatter.lastModified && (
                    <div className="flex gap-2">
                      <CalendarIcon className="w-4 h-4 my-auto" />
                      <p className="text-muted-foreground text-xs my-auto">
                        Last modified on{" "}
                        {new Date(frontmatter.lastModified).toLocaleDateString(
                          "en-US",
                          { day: "numeric", month: "long", year: "numeric" },
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-sm ">About Zacchary</h2>
                <p className="text-xs text-muted-foreground">
                  Zacchary is a Christian working for{" "}
                  <LinkWithIcon
                    href="https://starcompass.com.au?ref=zacchary.me"
                    aria-label="Star Compass website"
                  >
                    Star Compass
                  </LinkWithIcon>
                  , a disability support service operating in Brisbane Australia
                  and{" "}
                  <LinkWithIcon
                    href="https://haddoninstitute.org?ref=zacchary.me"
                    aria-label="Haddon Institute website"
                  >
                    Haddon Institute
                  </LinkWithIcon>
                  , a distinctly Reformed seminary seeking for the Australian
                  Church to fear and behold the majesty of the creator King. His
                  goal is to advance the Kingdom of God through companies that
                  participate in the global marketplace.
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let frontmatter;

  try {
    const post = await import(`@/_content/posts/${slug}.mdx`);
    frontmatter = post.frontmatter;
  } catch {
    return notFound();
  }

  const title = frontmatter.title;
  const description = frontmatter.description;

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
          url: frontmatter.image || "/avatar.avif",
          width: 1920,
          height: 1080,
          alt: title,
        },
      ],
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/timeline/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [
        {
          url: frontmatter.image || "/avatar.avif",
          width: 1920,
          height: 1080,
          alt: title,
        },
      ],
    },
  };
}
