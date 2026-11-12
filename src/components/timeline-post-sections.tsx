import { Popover } from "@base-ui/react/popover";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import {
  RxCalendar,
  RxCheck,
  RxCopy,
  RxDotsHorizontal,
  RxEnvelopeClosed,
} from "react-icons/rx";
import { toast } from "sonner";

import AnimatedSignature from "@/components/animated-signature";
import ContentPicture from "@/components/content-picture";
import { BounceSidebar } from "@/components/motion/bounce-sidebar";
import type { BounceSidebarItem } from "@/components/motion/bounce-sidebar";
import { ImageZoom } from "@/components/zoom-image";
import type { Post } from "@/interfaces/content-item";
import { CONTENT_IMAGE_SIZES } from "@/lib/directus-asset";
import { formatPublishedLongDate } from "@/lib/format-in-brisbane";
import type { ArticleHeading } from "@/lib/heading-shift";
import { buildMetadataUrl } from "@/lib/metadata";
import { tagSlug } from "@/lib/related-posts";
import type { RelatedPostLink } from "@/lib/related-posts";
import { timelinePostPath } from "@/lib/site";

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

const postDetailsPopupClassName =
  "z-50 origin-(--transform-origin) bg-muted text-foreground text-sm outline-hidden transition-[scale,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] data-[instant]:transition-none data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 dark:bg-neutral-900 dark:text-muted-foreground";

export const PostDetailsMenu = ({
  readingTime,
  tags,
}: {
  readingTime: number;
  tags: readonly string[];
}) => (
  <>
    <Popover.Root>
      <Popover.Trigger
        aria-label="Post details"
        className="cursor-pointer border-0 bg-transparent p-0 text-inherit transition-colors duration-200 hover:text-blue-400 dark:hover:text-blue-600"
        closeDelay={120}
        delay={0}
        openOnHover
      >
        <RxDotsHorizontal />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner align="end" side="bottom" sideOffset={6}>
          <Popover.Popup className={postDetailsPopupClassName}>
            <div className="flex items-baseline whitespace-nowrap px-3 py-1">
              {tags.map((tag, index) => {
                const slugified = tagSlug(tag);
                return (
                  <span className="contents" key={tag}>
                    {index > 0 ? (
                      <span aria-hidden="true" className="px-1.5">
                        ·
                      </span>
                    ) : null}
                    {slugified ? (
                      <a
                        className="no-underline"
                        href={`/timeline/tag/${slugified}`}
                      >
                        {tag}
                      </a>
                    ) : (
                      tag
                    )}
                  </span>
                );
              })}
              {tags.length > 0 ? (
                <span aria-hidden="true" className="px-1.5">
                  ·
                </span>
              ) : null}
              <span>{readingTime} minute read</span>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
    <p className="sr-only">
      {tags.join(", ")}. {readingTime} minute read.
    </p>
    <CopyPostLinkButton />
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

const tocItemClassName =
  "min-h-6 min-w-0 rounded-none px-0 text-xs font-normal transition-colors duration-200 hover:text-blue-400 dark:hover:text-blue-600";

const headingItems = (
  headings: readonly ArticleHeading[]
): BounceSidebarItem[] =>
  headings.map((heading) => ({
    href: `#${heading.id}`,
    id: heading.id,
    label: (
      <span
        className="block min-w-0 truncate whitespace-nowrap"
        style={{ paddingLeft: `${Math.max(0, heading.depth - 2) * 0.75}rem` }}
        title={heading.text}
      >
        {heading.text}
      </span>
    ),
  }));

/**
 * A heading becomes current once it enters the upper reading band, not only
 * when it touches the sticky TOC line. Click targets still use 4rem padding.
 */
const tocActivationOffset = (): number =>
  Math.min(240, Math.max(96, window.innerHeight * 0.22));

const activeHeadingFromScroll = (
  headings: readonly ArticleHeading[]
): string | undefined => {
  const lastHeading = headings.at(-1);
  const atPageBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 8;
  if (atPageBottom && lastHeading) {
    return lastHeading.id;
  }

  const scrollLine = window.scrollY + tocActivationOffset();

  for (let index = headings.length - 1; index >= 0; index -= 1) {
    const heading = headings[index];
    if (!heading) {
      continue;
    }
    const element = document.querySelector<HTMLElement>(
      `#${CSS.escape(heading.id)}`
    );
    if (!element) {
      continue;
    }
    const documentTop = element.getBoundingClientRect().top + window.scrollY;
    if (documentTop <= scrollLine) {
      return heading.id;
    }
  }

  return headings[0]?.id;
};

export const TimelinePostTocAside = ({
  headings,
}: {
  headings: readonly ArticleHeading[];
}) => {
  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="pointer-events-none absolute top-0 bottom-0 left-16 z-20 hidden w-[min(18rem,calc((100vw-32rem)/2-5.5rem))] min-w-44 max-w-72 xl:block">
      <div className="pointer-events-auto sticky top-16">
        <TimelineContentsNav headings={headings} />
      </div>
    </aside>
  );
};

export const TimelineContentsNav = ({
  headings,
}: {
  headings: readonly ArticleHeading[];
}) => {
  const items = headingItems(headings);
  const [activeId, setActiveId] = useState(() => headings[0]?.id ?? "");
  const scrollSpyLockRef = useRef<string | null>(null);
  const scrollSpyUnlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const releaseScrollSpyLock = useCallback(() => {
    if (scrollSpyUnlockTimerRef.current !== null) {
      clearTimeout(scrollSpyUnlockTimerRef.current);
      scrollSpyUnlockTimerRef.current = null;
    }
    scrollSpyLockRef.current = null;
    const next = activeHeadingFromScroll(headings);
    if (next) {
      setActiveId(next);
    }
  }, [headings]);

  const onTocAnchorNavigate = useCallback((id: string) => {
    scrollSpyLockRef.current = id;
    setActiveId(id);
  }, []);

  useEffect(() => {
    if (headings.length === 0) {
      return;
    }

    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/u, "");
      if (hash && headings.some((heading) => heading.id === hash)) {
        scrollSpyLockRef.current = null;
        setActiveId(hash);
      }
    };

    const onScroll = () => {
      if (scrollSpyLockRef.current !== null) {
        if (scrollSpyUnlockTimerRef.current !== null) {
          clearTimeout(scrollSpyUnlockTimerRef.current);
        }
        scrollSpyUnlockTimerRef.current = setTimeout(releaseScrollSpyLock, 120);
        return;
      }

      const next = activeHeadingFromScroll(headings);
      if (next) {
        setActiveId(next);
      }
    };

    syncFromHash();
    onScroll();
    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", releaseScrollSpyLock);
    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", releaseScrollSpyLock);
      if (scrollSpyUnlockTimerRef.current !== null) {
        clearTimeout(scrollSpyUnlockTimerRef.current);
      }
    };
  }, [headings, releaseScrollSpyLock]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <BounceSidebar
      ariaLabel="Contents"
      className="w-full"
      itemClassName={tocItemClassName}
      items={items}
      listClassName="w-full gap-0 pl-8"
      onAnchorNavigate={onTocAnchorNavigate}
      onValueChange={setActiveId}
      value={activeId}
    />
  );
};

const COPY_RESET_MS = 2000;

const copyIconClassName =
  "size-4 text-muted-foreground transition-colors duration-200 hover:text-blue-400 dark:hover:text-blue-600";

const CopyPostLinkButton = ({
  className = "cursor-pointer",
  iconClassName = copyIconClassName,
  url,
}: {
  className?: string;
  iconClassName?: string;
  url?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    const text = url ?? window.location.href;

    try {
      await navigator.clipboard.writeText(text);
      toast.success("URL Copied!");
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, COPY_RESET_MS);
    } catch {
      toast.error("Could not copy");
    }
  }, [url]);

  return (
    <button
      aria-label={copied ? "Copied" : "Copy link"}
      className={className}
      onClick={() => {
        void onCopy();
      }}
      type="button"
    >
      {copied ? (
        <RxCheck className={`${iconClassName} text-green-500`} />
      ) : (
        <RxCopy className={iconClassName} />
      )}
      <span className="sr-only">{copied ? "Copied" : "Copy link"}</span>
    </button>
  );
};

const CopyArticleText = () => {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    const article = document.querySelector("article");
    const text = article?.textContent ?? "";

    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied!");
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, COPY_RESET_MS);
    } catch {
      toast.error("Could not copy");
    }
  }, []);

  return (
    <button
      className="flex w-auto cursor-pointer gap-2 text-muted-foreground transition-colors duration-200 hover:text-blue-400 dark:hover:text-blue-600"
      onClick={() => {
        void onCopy();
      }}
      type="button"
    >
      <RxCopy className="size-4" />
      {copied ? "Copied!" : "Copy text"}
    </button>
  );
};

const TimelinePostShareLinks = ({
  postTitle,
  slug,
}: {
  postTitle: string;
  slug: string;
}) => {
  const postUrl = buildMetadataUrl(timelinePostPath(slug));
  const encodedPostUrl = encodeURIComponent(postUrl);

  return (
    <div className="space-y-3">
      <h2 className="text-sm">Share article</h2>
      <div className="flex gap-3 text-muted-foreground">
        <a
          aria-label="Share on X"
          className="transition-colors duration-200 hover:text-blue-400 dark:hover:text-blue-600"
          href={`https://x.com/intent/tweet?text=${encodedPostUrl}`}
        >
          <FaXTwitter className="size-4" />
        </a>
        <a
          aria-label="Share on Facebook"
          className="transition-colors duration-200 hover:text-blue-400 dark:hover:text-blue-600"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedPostUrl}`}
        >
          <FaFacebook className="size-4" />
        </a>
        <a
          aria-label="Share by email"
          className="transition-colors duration-200 hover:text-blue-400 dark:hover:text-blue-600"
          href={`mailto:?subject=${encodeURIComponent(postTitle)}&body=${encodedPostUrl}`}
        >
          <RxEnvelopeClosed className="size-4" />
        </a>
        <CopyPostLinkButton iconClassName="size-4" url={postUrl} />
      </div>
    </div>
  );
};

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
                href={timelinePostPath(item.slug)}
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
        <CopyArticleText />
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
  </div>
);
