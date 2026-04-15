import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import { RxCalendar, RxDotsHorizontal, RxEnvelopeClosed } from "react-icons/rx";

import AnimatedSignature from "@/components/animated-signature";
import CopyLink from "@/components/copy-link";
import CopyText from "@/components/copy-text";
import { MdxContent } from "@/components/mdx-content";
import SiteImage from "@/components/site-image";
import Subscribe from "@/components/subscribe";
import TableOfContents from "@/components/toc";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ImageZoom } from "@/components/zoom-image";
import type { Post } from "@/interfaces/content-item";

const WORD_SPLIT_REGEX = /\s+/;

interface TimelinePostProps {
  post: Post;
  slug: string;
}

export default function TimelinePost({ post, slug }: TimelinePostProps) {
  const wordCount = post.content
    ? post.content.split(WORD_SPLIT_REGEX).length
    : 200;
  const averageWordsPerMinute = 300;
  const readingTime = Math.ceil(wordCount / averageWordsPerMinute);

  return (
    <div className="overflow-x-hidden pt-4 pb-20 text-sm">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-20 px-6">
        <div className="space-y-4">
          <div>
            <h1 className="font-redaction text-black text-xl dark:text-white">
              {post.title}
            </h1>
            <div className="flex w-full justify-between gap-3 text-muted-foreground text-sm">
              <div className="w-full text-muted-foreground text-xs">
                {new Date(post.date_created).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="transition-all duration-300 hover:text-blue-400 dark:hover:text-blue-600">
                      <RxDotsHorizontal />
                    </TooltipTrigger>
                    <TooltipContent
                      className="bg-muted/60 text-black text-xs backdrop-blur-sm dark:bg-neutral-900/60 dark:text-muted-foreground"
                      side="bottom"
                    >
                      {new Date(post.date_created).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        weekday: "long",
                        year: "numeric",
                      })}{" "}
                      · {post.tags.join(", ")} · {readingTime} minute read
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <CopyLink />
              </div>
            </div>
          </div>

          {post.image && (
            <div className="flex aspect-video h-full w-full flex-col gap-4">
              <ImageZoom>
                <SiteImage
                  alt={post.title}
                  className="aspect-video w-full rounded-xl object-cover"
                  height={720}
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                  src={`https://directus.obambulo.studio/assets/${post.image}`}
                  width={1200}
                />
              </ImageZoom>
              <p className="text-center text-muted-foreground text-xs">
                {post.image_alt}
              </p>
            </div>
          )}

          <TableOfContents />
        </div>

        <article className="prose dark:prose-invert prose-img:mx-auto prose-headings:mt-6 prose-headings:-mb-2 prose-img:aspect-video prose-img:w-full prose-pre:w-full prose-table:w-full w-full max-w-none prose-pre:max-w-full prose-table:max-w-full prose-pre:overflow-x-auto prose-table:overflow-x-auto prose-code:whitespace-normal prose-blockquote:text-balance prose-code:wrap-break-word prose-img:rounded-xl prose-hr:border-muted-foreground prose-hr:border-dotted prose-blockquote:border-none prose-img:object-cover prose-a:font-normal prose-blockquote:font-medium prose-blockquote:font-redaction prose-headings:font-medium prose-headings:font-redaction prose-li:font-normal prose-a:text-black prose-blockquote:text-black prose-headings:text-black prose-headings:text-lg prose-li:text-black prose-li:text-sm prose-ol:text-black prose-p:text-black prose-p:text-sm prose-ul:text-black prose-blockquote:not-italic prose-p:leading-relaxed prose-headings:tracking-tight prose-a:underline prose-a:decoration-dotted prose-a:underline-offset-2 prose-li:marker:font-normal prose-li:marker:text-muted-foreground prose-li:marker:text-xs prose-ol:marker:text-black prose-a:hover:decoration-solid prose-a:hover:underline-offset-4 dark:prose-a:text-neutral-300 dark:prose-blockquote:text-neutral-300 dark:prose-headings:text-white dark:prose-li:text-neutral-300 dark:prose-ol:text-neutral-300 dark:prose-p:text-neutral-300 dark:prose-ul:text-neutral-300 dark:prose-ol:marker:text-neutral-300 [&_blockquote_p]:text-2xl">
          <MdxContent source={post.content} />
        </article>

        <div className="space-y-10">
          {post.signature && (
            <div className="flex flex-col gap-2">
              <AnimatedSignature />
              <div>
                <p className="text-sm">Zacchary Puckeridge</p>
                <p className="text-muted-foreground text-xs">
                  Web Developer & Designer
                </p>
              </div>
            </div>
          )}
          <div className="space-y-3">
            <h2 className="text-sm">Share Article</h2>
            <div className="flex gap-3 text-muted-foreground">
              <a
                className="transition-all duration-300 hover:text-blue-400 dark:hover:text-blue-600"
                href={`https://x.com/intent/tweet?text=https%3A%2F%2Fzacchary.me/timeline/${slug}`}
              >
                <FaXTwitter className="h-4 w-4" />
              </a>
              <a
                className="transition-all duration-300 hover:text-blue-400 dark:hover:text-blue-600"
                href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fzacchary.me/timeline/${slug}`}
              >
                <FaFacebook className="h-4 w-4" />
              </a>
              <a
                className="transition-all duration-300 hover:text-blue-400 dark:hover:text-blue-600"
                href={`mailto:?subject=${post.title}&body=https%3A%2F%2Fzacchary.me/timeline/${slug}`}
              >
                <RxEnvelopeClosed className="h-4 w-4" />
              </a>
              <CopyLink />
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-sm">Resources</h2>
            <div className="flex flex-col gap-3 text-muted-foreground text-xs">
              <CopyText text={post.content} />
              {post.date_updated && (
                <div className="flex gap-2">
                  <RxCalendar className="my-auto h-4 w-4" />
                  <p className="my-auto text-muted-foreground text-xs">
                    Last modified on{" "}
                    {new Date(post.date_updated).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
          <Subscribe />
          <a
            className="group inline-flex w-fit text-muted-foreground text-xs underline decoration-dotted underline-offset-2 transition ease-in-out hover:decoration-solid hover:underline-offset-4"
            href="/timeline"
          >
            ../timeline
          </a>
        </div>
      </div>
    </div>
  );
}
