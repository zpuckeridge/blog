import type { ReactNode } from "react";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import {
  RxCalendar,
  RxCopy,
  RxDotsHorizontal,
  RxEnvelopeClosed,
} from "react-icons/rx";

import AnimatedSignature from "@/components/animated-signature";
import BackLink from "@/components/back-link";
import ContentPicture from "@/components/content-picture";
import { MdxContent } from "@/components/mdx-content";
import { ImageZoom } from "@/components/zoom-image";
import type { Post } from "@/interfaces/content-item";
import type { ContentImageMeta } from "@/lib/content-image";
import { resolveHeroAlt } from "@/lib/content-image";
import { CONTENT_IMAGE_SIZES } from "@/lib/directus-asset";
import {
  formatPublishedArticleDate,
  formatPublishedLongDate,
} from "@/lib/format-in-brisbane";
import { headingsFromTree, shiftedHeadings } from "@/lib/heading-shift";
import { shouldShowOldPostDisclaimer } from "@/lib/is-old-post";
import { parseTimelineMdxSource } from "@/lib/mdx-source";
import { tagSlug } from "@/lib/related-posts";
import type { RelatedPostLink } from "@/lib/related-posts";

const WORD_SPLIT_REGEX = /\s+/u;
const emptyImageMeta: Readonly<Record<string, ContentImageMeta>> = {};
const emptyRelated: readonly RelatedPostLink[] = [];

interface TimelinePostProps {
  children?: ReactNode;
  imageMeta?: Readonly<Record<string, ContentImageMeta>>;
  post: Post;
  related?: readonly RelatedPostLink[];
  slug: string;
}

const TimelinePost = ({
  children,
  imageMeta = emptyImageMeta,
  post,
  related = emptyRelated,
  slug,
}: TimelinePostProps) => {
  const wordCount = post.content
    ? post.content.split(WORD_SPLIT_REGEX).length
    : 200;
  const averageWordsPerMinute = 300;
  const readingTime = Math.ceil(wordCount / averageWordsPerMinute);
  const showOldPostDisclaimer = shouldShowOldPostDisclaimer(post);
  const showWorkInProgressDisclaimer = post.work_in_progress === true;
  const parsed = parseTimelineMdxSource(post.content ?? "", slug);
  const headings = parsed.mdast
    ? shiftedHeadings(headingsFromTree(parsed.mdast))
    : [];
  const heroAlt = resolveHeroAlt(
    post,
    post.image ? imageMeta[post.image.toLowerCase()] : undefined
  );
  const tags = post.tags ?? [];

  return (
    <div className="overflow-x-hidden pb-20 text-sm">
      <div className="mx-auto flex max-w-lg flex-col gap-4 px-6">
        <div className="flex flex-col gap-y-20 text-sm">
          <div className="space-y-10">
            <div className="space-y-4">
              {(showOldPostDisclaimer || showWorkInProgressDisclaimer) && (
                <div className="space-y-2 border border-dotted border-border px-3 py-2">
                  {showOldPostDisclaimer && (
                    <p className="text-muted-foreground text-sm">
                      This article is old. Some of my views may have changed.
                    </p>
                  )}
                  {showWorkInProgressDisclaimer && (
                    <p className="text-muted-foreground text-sm">
                      This article is a work in progress. I have not fully
                      worked these ideas through yet.
                    </p>
                  )}
                </div>
              )}
              <div className="space-y-0.5">
                <h1 className="font-redaction text-black text-xl dark:text-white">
                  {post.title}
                </h1>
                <div className="flex w-full justify-between gap-3 text-muted-foreground text-sm">
                  <div className="w-full text-muted-foreground text-sm">
                    {formatPublishedArticleDate(post.date_created)}
                  </div>
                  <div className="flex items-center gap-3">
                    <details className="relative">
                      <summary className="cursor-pointer list-none transition-colors duration-200 hover:text-blue-400 dark:hover:text-blue-600 [&::-webkit-details-marker]:hidden">
                        <RxDotsHorizontal />
                        <span className="sr-only">Post details</span>
                      </summary>
                      <div className="absolute right-0 z-10 mt-2 w-max max-w-xs border border-border bg-muted p-2 text-foreground dark:bg-neutral-900 dark:text-muted-foreground">
                        {tags.length > 0 && (
                          <p className="flex flex-wrap gap-x-2 gap-y-1">
                            {tags.map((tag) => {
                              const slugified = tagSlug(tag);
                              if (!slugified) {
                                return <span key={tag}>{tag}</span>;
                              }
                              return (
                                <a
                                  className="underline"
                                  href={`/timeline/tag/${slugified}`}
                                  key={slugified}
                                >
                                  {tag}
                                </a>
                              );
                            })}
                          </p>
                        )}
                        <p>{readingTime} minute read</p>
                      </div>
                    </details>
                    <p className="sr-only">
                      {tags.join(", ")}. {readingTime} minute read.
                    </p>
                    <button
                      className="cursor-pointer"
                      data-copy-link
                      type="button"
                    >
                      <RxCopy className="size-4 text-muted-foreground transition-colors duration-200 hover:text-blue-400 dark:hover:text-blue-600" />
                      <span className="sr-only">Copy link</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {post.image && (
              <div className="flex flex-col gap-4">
                <ImageZoom aspectVideo className="size-full">
                  <ContentPicture
                    alt={heroAlt}
                    assetId={post.image}
                    className="size-full object-cover"
                    priority
                    sizes={CONTENT_IMAGE_SIZES}
                  />
                </ImageZoom>
                {post.image_alt ? (
                  <p className="text-center text-muted-foreground text-sm">
                    {post.image_alt}
                  </p>
                ) : null}
              </div>
            )}

            {headings.length > 0 && (
              <nav aria-label="Contents" className="space-y-2">
                <p className="text-sm">Contents</p>
                <ol className="space-y-1 text-muted-foreground text-sm">
                  {headings.map((heading) => (
                    <li
                      key={heading.id}
                      style={{
                        paddingLeft: `${Math.max(0, heading.depth - 2)}rem`,
                      }}
                    >
                      <a
                        className="transition-colors duration-200 hover:text-blue-400 dark:hover:text-blue-600"
                        href={`#${heading.id}`}
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <article className="prose dark:prose-invert prose-img:mx-auto prose-headings:mt-6 prose-headings:-mb-2 prose-img:aspect-video prose-img:w-full prose-pre:w-full prose-table:w-full w-full max-w-none prose-pre:max-w-full prose-table:max-w-full prose-pre:overflow-x-auto prose-pre:whitespace-pre prose-table:overflow-x-auto prose-blockquote:text-balance [&_li_code]:whitespace-normal [&_li_code]:wrap-break-word [&_p_code]:whitespace-normal [&_p_code]:wrap-break-word prose-img: prose-hr:border-border prose-hr:border-dotted prose-blockquote:border-none prose-img:object-cover prose-a:font-normal prose-blockquote:font-medium prose-blockquote:font-redaction prose-headings:font-medium prose-headings:font-redaction prose-li:font-normal prose-a:text-black prose-a:no-underline prose-blockquote:text-black prose-headings:text-black prose-headings:text-lg prose-li:text-black prose-li:text-sm prose-ol:text-black prose-p:text-black prose-p:text-sm prose-ul:text-black prose-blockquote:not-italic prose-p:leading-relaxed prose-headings:tracking-tight prose-li:marker:font-normal prose-li:marker:text-muted-foreground prose-li:marker:text-sm prose-ol:marker:text-black dark:prose-a:text-neutral-300 dark:prose-blockquote:text-neutral-300 dark:prose-headings:text-white dark:prose-li:text-neutral-300 dark:prose-ol:text-neutral-300 dark:prose-p:text-neutral-300 dark:prose-ul:text-neutral-300 dark:prose-ol:marker:text-neutral-300 [&_blockquote_p]:text-2xl">
              <MdxContent
                contentSlug={slug}
                imageMeta={imageMeta}
                source={post.content}
              />
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
              {related.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-sm">Related posts</h2>
                  <ul className="flex flex-col gap-2 text-sm">
                    {related.map((item) => (
                      <li key={item.slug}>
                        <a
                          className="text-muted-foreground transition-colors duration-200 hover:text-blue-400 dark:hover:text-blue-600"
                          href={`/timeline/${item.slug}`}
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="space-y-3">
                <h2 className="text-sm">Share article</h2>
                <div className="flex gap-3 text-muted-foreground">
                  <a
                    aria-label="Share on X"
                    className="transition-colors duration-200 hover:text-blue-400 dark:hover:text-blue-600"
                    href={`https://x.com/intent/tweet?text=https%3A%2F%2Fzacchary.me/timeline/${slug}`}
                  >
                    <FaXTwitter className="size-4" />
                  </a>
                  <a
                    aria-label="Share on Facebook"
                    className="transition-colors duration-200 hover:text-blue-400 dark:hover:text-blue-600"
                    href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fzacchary.me/timeline/${slug}`}
                  >
                    <FaFacebook className="size-4" />
                  </a>
                  <a
                    aria-label="Share by email"
                    className="transition-colors duration-200 hover:text-blue-400 dark:hover:text-blue-600"
                    href={`mailto:?subject=${encodeURIComponent(post.title)}&body=https%3A%2F%2Fzacchary.me/timeline/${slug}`}
                  >
                    <RxEnvelopeClosed className="size-4" />
                  </a>
                  <button
                    className="cursor-pointer"
                    data-copy-link
                    type="button"
                  >
                    <RxCopy className="size-4" />
                    <span className="sr-only">Copy link</span>
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <h2 className="text-sm">Resources</h2>
                <div className="flex flex-col gap-3 text-muted-foreground text-sm">
                  <button
                    className="flex w-auto cursor-pointer gap-2 text-muted-foreground transition-colors duration-200 hover:text-blue-400 dark:hover:text-blue-600"
                    data-copy-article
                    type="button"
                  >
                    <RxCopy className="size-4" /> Copy text
                  </button>
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
              {children}
              <p aria-live="polite" className="sr-only" data-copy-status />
            </div>
          </div>

          <BackLink href="/timeline">../timeline</BackLink>
        </div>
      </div>
    </div>
  );
};

export default TimelinePost;
