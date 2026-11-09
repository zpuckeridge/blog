import type { ReactNode } from "react";

import BackLink from "@/components/back-link";
import { MdxContent } from "@/components/mdx-content";
import {
  PostDetailsMenu,
  TimelineContentsNav,
  TimelinePostDisclaimers,
  TimelinePostFooter,
  TimelinePostHero,
} from "@/components/timeline-post-sections";
import type { Post } from "@/interfaces/content-item";
import type { ContentImageMeta } from "@/lib/content-image";
import { resolveHeroAlt } from "@/lib/content-image";
import { formatPublishedArticleDate } from "@/lib/format-in-brisbane";
import { articleHeadingOutline } from "@/lib/heading-shift";
import { shouldShowOldPostDisclaimer } from "@/lib/is-old-post";
import { parseTimelineMdxSource } from "@/lib/mdx-source";
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

const articleProseClassName =
  "prose dark:prose-invert prose-img:mx-auto prose-headings:mt-6 prose-headings:-mb-2 prose-img:aspect-video prose-img:w-full prose-pre:w-full prose-table:w-full w-full max-w-none prose-pre:max-w-full prose-table:max-w-full prose-pre:overflow-x-auto prose-pre:whitespace-pre prose-table:overflow-x-auto prose-blockquote:text-balance [&_li_code]:whitespace-normal [&_li_code]:wrap-break-word [&_p_code]:whitespace-normal [&_p_code]:wrap-break-word prose-hr:border-border prose-hr:border-dotted prose-blockquote:border-none prose-img:object-cover prose-a:font-normal prose-blockquote:font-medium prose-blockquote:font-redaction prose-headings:font-medium prose-headings:font-redaction prose-li:font-normal prose-a:text-black prose-a:no-underline prose-blockquote:text-black prose-headings:text-black prose-headings:text-lg prose-li:text-black prose-li:text-sm prose-ol:text-black prose-p:text-black prose-p:text-sm prose-ul:text-black prose-blockquote:not-italic prose-p:leading-relaxed prose-headings:tracking-tight prose-li:marker:font-normal prose-li:marker:text-muted-foreground prose-li:marker:text-sm prose-ol:marker:text-black dark:prose-a:text-neutral-300 dark:prose-blockquote:text-neutral-300 dark:prose-headings:text-white dark:prose-li:text-neutral-300 dark:prose-ol:text-neutral-300 dark:prose-p:text-neutral-300 dark:prose-ul:text-neutral-300 dark:prose-ol:marker:text-neutral-300 [&_blockquote_p]:text-2xl";

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
  const readingTime = Math.ceil(wordCount / 300);
  const showOldPostDisclaimer = shouldShowOldPostDisclaimer(post);
  const showWorkInProgressDisclaimer = post.work_in_progress === true;
  const parsed = parseTimelineMdxSource(post.content ?? "", slug);
  const headings = parsed.mdast
    ? articleHeadingOutline(parsed.mdast).headings
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
              <TimelinePostDisclaimers
                showOld={showOldPostDisclaimer}
                showWorkInProgress={showWorkInProgressDisclaimer}
              />
              <div className="space-y-0.5">
                <h1 className="font-redaction text-black text-xl dark:text-white">
                  {post.title}
                </h1>
                <div className="flex w-full justify-between gap-3 text-muted-foreground text-sm">
                  <div className="w-full text-muted-foreground text-sm">
                    {formatPublishedArticleDate(post.date_created)}
                  </div>
                  <div className="flex items-center gap-3">
                    <PostDetailsMenu readingTime={readingTime} tags={tags} />
                  </div>
                </div>
              </div>
            </div>

            {post.image ? (
              <TimelinePostHero
                alt={heroAlt}
                assetId={post.image}
                caption={post.image_alt}
              />
            ) : null}

            <TimelineContentsNav headings={headings} />

            <article className={articleProseClassName}>
              <MdxContent
                contentSlug={slug}
                imageMeta={imageMeta}
                parsed={parsed}
                source={post.content ?? ""}
              />
            </article>

            <TimelinePostFooter post={post} related={related} slug={slug}>
              {children}
            </TimelinePostFooter>
          </div>

          <BackLink href="/timeline">../timeline</BackLink>
        </div>
      </div>
    </div>
  );
};

export default TimelinePost;
