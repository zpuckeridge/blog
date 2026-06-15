import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import { RxCalendar, RxDotsHorizontal, RxEnvelopeClosed } from "react-icons/rx";

import AnimatedSignature from "@/components/animated-signature";
import BackLink from "@/components/back-link";
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
import { directusAssetUrl } from "@/lib/directus-asset";
import {
  formatPublishedFullWeekday,
  formatPublishedLongDate,
  formatPublishedMonthYear,
} from "@/lib/format-in-brisbane";

const WORD_SPLIT_REGEX = /\s+/u;

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
    <div className="overflow-x-hidden pb-20 text-sm">
      <div className="mx-auto flex max-w-lg flex-col gap-4 px-6">
        <div className="flex flex-col gap-y-20 text-sm">
          <div className="space-y-10">
            <div className="space-y-2">
              <h1 className="font-redaction text-black text-xl dark:text-white">
                {post.title}
              </h1>
              <div className="flex w-full justify-between gap-3 text-muted-foreground text-sm">
                <div className="w-full text-muted-foreground text-sm">
                  {formatPublishedMonthYear(post.date_created)}
                </div>
                <div className="flex items-center gap-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="transition-all duration-200 hover:text-blue-400 dark:hover:text-blue-600">
                        <RxDotsHorizontal />
                      </TooltipTrigger>
                      <TooltipContent
                        className="bg-muted text-foreground dark:bg-neutral-900 dark:text-muted-foreground"
                        side="bottom"
                      >
                        {formatPublishedFullWeekday(post.date_created)} ·{" "}
                        {post.tags.join(", ")} · {readingTime} minute read
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <CopyLink />
                </div>
              </div>
            </div>

            {post.image && (
              <div className="flex flex-col gap-4">
                <ImageZoom aspectVideo className="size-full">
                  <SiteImage
                    alt={post.title}
                    className="size-full object-cover"
                    height={720}
                    priority
                    sizes="(max-width: 768px) 100vw, 800px"
                    src={directusAssetUrl(post.image, {
                      format: "webp",
                      width: 1200,
                    })}
                    width={1200}
                  />
                </ImageZoom>
                <p className="text-center text-muted-foreground text-sm">
                  {post.image_alt}
                </p>
              </div>
            )}

            <TableOfContents />

            <article className="prose dark:prose-invert prose-img:mx-auto prose-headings:mt-6 prose-headings:-mb-2 prose-img:aspect-video prose-img:w-full prose-pre:w-full prose-table:w-full w-full max-w-none prose-pre:max-w-full prose-table:max-w-full prose-pre:overflow-x-auto prose-table:overflow-x-auto prose-code:whitespace-normal prose-blockquote:text-balance prose-code:wrap-break-word prose-img: prose-hr:border-border prose-hr:border-dotted prose-blockquote:border-none prose-img:object-cover prose-a:font-normal prose-blockquote:font-medium prose-blockquote:font-redaction prose-headings:font-medium prose-headings:font-redaction prose-li:font-normal prose-a:text-black prose-a:no-underline prose-blockquote:text-black prose-headings:text-black prose-headings:text-lg prose-li:text-black prose-li:text-sm prose-ol:text-black prose-p:text-black prose-p:text-sm prose-ul:text-black prose-blockquote:not-italic prose-p:leading-relaxed prose-headings:tracking-tight prose-li:marker:font-normal prose-li:marker:text-muted-foreground prose-li:marker:text-sm prose-ol:marker:text-black dark:prose-a:text-neutral-300 dark:prose-blockquote:text-neutral-300 dark:prose-headings:text-white dark:prose-li:text-neutral-300 dark:prose-ol:text-neutral-300 dark:prose-p:text-neutral-300 dark:prose-ul:text-neutral-300 dark:prose-ol:marker:text-neutral-300 [&_blockquote_p]:text-2xl">
              <MdxContent source={post.content} />
            </article>

            <div className="space-y-10">
              {post.signature && (
                <div className="flex flex-col gap-2">
                  <AnimatedSignature />
                  <div>
                    <p className="text-sm">Zacchary Puckeridge</p>
                    <p className="text-muted-foreground text-sm">
                      Web Developer & Designer
                    </p>
                  </div>
                </div>
              )}
              <div className="space-y-3">
                <h2 className="text-sm">Share Article</h2>
                <div className="flex gap-3 text-muted-foreground">
                  <a
                    className="transition-all duration-200 hover:text-blue-400 dark:hover:text-blue-600"
                    href={`https://x.com/intent/tweet?text=https%3A%2F%2Fzacchary.me/timeline/${slug}`}
                  >
                    <FaXTwitter className="size-4" />
                  </a>
                  <a
                    className="transition-all duration-200 hover:text-blue-400 dark:hover:text-blue-600"
                    href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fzacchary.me/timeline/${slug}`}
                  >
                    <FaFacebook className="size-4" />
                  </a>
                  <a
                    className="transition-all duration-200 hover:text-blue-400 dark:hover:text-blue-600"
                    href={`mailto:?subject=${post.title}&body=https%3A%2F%2Fzacchary.me/timeline/${slug}`}
                  >
                    <RxEnvelopeClosed className="size-4" />
                  </a>
                  <CopyLink />
                </div>
              </div>
              <div className="space-y-3">
                <h2 className="text-sm">Resources</h2>
                <div className="flex flex-col gap-3 text-muted-foreground text-sm">
                  <CopyText text={post.content} />
                  {post.date_updated && (
                    <div className="flex gap-2">
                      <RxCalendar className="my-auto size-4" />
                      <p className="my-auto text-muted-foreground text-sm">
                        Last modified on{" "}
                        {formatPublishedLongDate(post.date_updated)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <Subscribe />
            </div>
          </div>

          <BackLink href="/timeline">../timeline</BackLink>
        </div>
      </div>
    </div>
  );
}
