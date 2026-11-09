import type { ReactNode } from "react";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import {
  RxCalendar,
  RxCopy,
  RxDotsHorizontal,
  RxEnvelopeClosed,
} from "react-icons/rx";

import AnimatedSignature from "@/components/animated-signature";
import ContentPicture from "@/components/content-picture";
import { ImageZoom } from "@/components/zoom-image";
import type { Post } from "@/interfaces/content-item";
import { CONTENT_IMAGE_SIZES } from "@/lib/directus-asset";
import { formatPublishedLongDate } from "@/lib/format-in-brisbane";
import type { ArticleHeading } from "@/lib/heading-shift";
import { tagSlug } from "@/lib/related-posts";
import type { RelatedPostLink } from "@/lib/related-posts";

export const TimelinePostDisclaimers = ({
  showOld,
  showWorkInProgress,
}: {
  showOld: boolean;
  showWorkInProgress: boolean;
}) => {
  if (!showOld && !showWorkInProgress) {
    return null;
  }

  return (
    <div className="space-y-2 border border-dotted border-border px-3 py-2">
      {showOld ? (
        <p className="text-muted-foreground text-sm">
          This article is old. Some of my views may have changed.
        </p>
      ) : null}
      {showWorkInProgress ? (
        <p className="text-muted-foreground text-sm">
          This article is a work in progress. I have not fully worked these
          ideas through yet.
        </p>
      ) : null}
    </div>
  );
};

export const PostDetailsMenu = ({
  readingTime,
  tags,
}: {
  readingTime: number;
  tags: readonly string[];
}) => (
  <>
    <details className="relative">
      <summary className="cursor-pointer list-none transition-colors duration-200 hover:text-blue-400 dark:hover:text-blue-600 [&::-webkit-details-marker]:hidden">
        <RxDotsHorizontal />
        <span className="sr-only">Post details</span>
      </summary>
      <div className="absolute right-0 z-10 mt-2 w-max max-w-xs border border-border bg-muted p-2 text-foreground dark:bg-neutral-900 dark:text-muted-foreground">
        {tags.length > 0 ? (
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
        ) : null}
        <p>{readingTime} minute read</p>
      </div>
    </details>
    <p className="sr-only">
      {tags.join(", ")}. {readingTime} minute read.
    </p>
    <button className="cursor-pointer" data-copy-link type="button">
      <RxCopy className="size-4 text-muted-foreground transition-colors duration-200 hover:text-blue-400 dark:hover:text-blue-600" />
      <span className="sr-only">Copy link</span>
    </button>
  </>
);

export const TimelinePostHero = ({
  alt,
  assetId,
  caption,
}: {
  alt: string;
  assetId: string;
  caption?: string | null;
}) => (
  <div className="flex flex-col gap-4">
    <ImageZoom aspectVideo className="size-full">
      <ContentPicture
        alt={alt}
        assetId={assetId}
        className="size-full object-cover"
        priority
        sizes={CONTENT_IMAGE_SIZES}
      />
    </ImageZoom>
    {caption ? (
      <p className="text-center text-muted-foreground text-sm">{caption}</p>
    ) : null}
  </div>
);

export const TimelineContentsNav = ({
  headings,
}: {
  headings: readonly ArticleHeading[];
}) => {
  if (headings.length === 0) {
    return null;
  }

  return (
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
  );
};

const TimelinePostShareLinks = ({
  postTitle,
  slug,
}: {
  postTitle: string;
  slug: string;
}) => (
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
        href={`mailto:?subject=${encodeURIComponent(postTitle)}&body=https%3A%2F%2Fzacchary.me/timeline/${slug}`}
      >
        <RxEnvelopeClosed className="size-4" />
      </a>
      <button className="cursor-pointer" data-copy-link type="button">
        <RxCopy className="size-4" />
        <span className="sr-only">Copy link</span>
      </button>
    </div>
  </div>
);

export const TimelinePostFooter = ({
  children,
  post,
  related,
  slug,
}: {
  children?: ReactNode;
  post: Post;
  related: readonly RelatedPostLink[];
  slug: string;
}) => (
  <div className="space-y-10">
    {post.signature ? (
      <div className="flex flex-col gap-2">
        <AnimatedSignature />
        <div>
          <p className="text-sm">Zacchary Puckeridge</p>
          <p className="text-muted-foreground text-sm">
            Web Developer & Designer
          </p>
        </div>
      </div>
    ) : null}
    {related.length > 0 ? (
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
    ) : null}
    <TimelinePostShareLinks postTitle={post.title} slug={slug} />
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
        {post.date_updated ? (
          <div className="flex gap-2">
            <RxCalendar className="my-auto size-4" />
            <p className="my-auto text-muted-foreground text-sm">
              Last modified on {formatPublishedLongDate(post.date_updated)}
            </p>
          </div>
        ) : null}
      </div>
    </div>
    {children}
    <p aria-live="polite" className="sr-only" data-copy-status />
  </div>
);
