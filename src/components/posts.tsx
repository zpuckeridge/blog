import { useCallback, useMemo, useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";

import type { TimelineItem } from "@/interfaces/content-item";
import { formatPublishedShortDayMonth } from "@/lib/format-in-brisbane";
import { isNewPost, NEW_POST_TAG } from "@/lib/is-new-post";
import { resolveSafeHref } from "@/lib/safe-href";
import { substringMatchInsensitive } from "@/lib/substring-match";

import { Input } from "./ui/input";

interface PostsProps {
  postsByYear: Record<number, TimelineItem[]>;
}

const PostRendering: React.FC<PostsProps> = ({ postsByYear }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [showNotes, setShowNotes] = useState(true);
  const [showX, setShowX] = useState(true);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
    []
  );

  const handleTagClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const tag = e.currentTarget.dataset.tag ?? "";
      setSelectedTag((prev) => (new Set(prev).has(tag) ? [] : [tag]));
    },
    []
  );

  const selectedTagSet = useMemo(() => new Set(selectedTag), [selectedTag]);

  const allTags = useMemo(() => {
    const seen = new Set<string>();
    const ordered: string[] = [];
    let hasNewPost = false;
    for (const items of Object.values(postsByYear)) {
      for (const item of items) {
        if (item.type === "Post" && isNewPost(item.date_created)) {
          hasNewPost = true;
        }
        for (const tag of item.tags) {
          if (tag && tag !== NEW_POST_TAG && !seen.has(tag)) {
            seen.add(tag);
            ordered.push(tag);
          }
        }
      }
    }
    const sorted = ordered.toSorted();
    return hasNewPost ? [NEW_POST_TAG, ...sorted] : sorted;
  }, [postsByYear]);

  // Filter posts based on search query, selected tags, and notes/X toggles
  const filteredPostsByYear: Record<string, TimelineItem[]> = {};
  const query = searchQuery.toLowerCase();
  const [selectedTagSingleton] = selectedTag;
  for (const [year, items] of Object.entries(postsByYear)) {
    const filteredItems = items.filter((item) => {
      const matchesSearch =
        substringMatchInsensitive(item.title, query) ||
        (item.type === "X" && substringMatchInsensitive(item.content, query));
      const matchesTags =
        selectedTagSingleton === undefined ||
        (selectedTagSingleton === NEW_POST_TAG
          ? item.type === "Post" && isNewPost(item.date_created)
          : new Set(item.tags).has(selectedTagSingleton));
      const matchesNotesToggle = showNotes || item.type !== "Note";
      const matchesXToggle = showX || item.type !== "X";
      return (
        matchesSearch && matchesTags && matchesNotesToggle && matchesXToggle
      );
    });

    if (filteredItems.length > 0) {
      filteredPostsByYear[year] = filteredItems;
    }
  }

  const resultCount = Object.values(filteredPostsByYear).reduce(
    (total, items) => total + items.length,
    0
  );

  return (
    <div className="flex w-full flex-col">
      <div className="mb-6 space-y-1">
        <div className="group relative flex">
          <label
            className="has-[+input:not(:placeholder-shown)):-translate-y-1/2 pointer-events-none absolute top-1/2 z-1 block origin-start -translate-y-1/2 cursor-text px-1 text-muted-foreground text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:-translate-y-1/2 group-focus-within:cursor-default group-focus-within:font-normal group-focus-within:text-black group-focus-within:text-sm has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:font-normal has-[+input:not(:placeholder-shown)]:text-sm has-[input:not(:placeholder-shown)]:text-black dark:has-[+input:not(:placeholder-shown)]:text-neutral-300 dark:group-focus-within:text-neutral-300"
            htmlFor="timeline-search"
          >
            <span className="relative -top-[1px] inline-flex bg-background px-2 text-sm">
              Search
            </span>
          </label>

          <Input
            className="-me-px flex-1 pe-48 text-black text-sm shadow-none dark:text-neutral-300"
            id="timeline-search"
            name="q"
            onChange={handleSearchChange}
            placeholder=""
            type="search"
            value={searchQuery}
          />

          <div className="absolute inset-y-px end-px z-10 my-auto flex h-full items-center">
            <button
              aria-pressed={showNotes}
              className={`inline-flex px-1 text-sm bg-muted hover:bg-muted/80 ${
                showNotes ? "text-muted-foreground" : "text-foreground"
              }`}
              onClick={() => setShowNotes((prev) => !prev)}
              type="button"
            >
              Toggle Notes
            </button>
            <button
              aria-pressed={showX}
              className={`inline-flex px-1 text-sm bg-muted hover:bg-muted/80 ${
                showX ? "text-muted-foreground" : "text-foreground"
              }`}
              onClick={() => setShowX((prev) => !prev)}
              type="button"
            >
              Toggle X
            </button>
            <div className="flex h-full w-9 items-center justify-center text-muted-foreground">
              <RxMagnifyingGlass />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {allTags.map((tag) => (
            <button
              aria-pressed={selectedTagSet.has(tag)}
              className={`inline-flex px-1 text-sm bg-muted hover:bg-muted/80 ${
                selectedTagSet.has(tag)
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
              key={`tag-${tag}`}
              data-tag={tag}
              onClick={handleTagClick}
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>
        <output className="sr-only">
          {resultCount === 0
            ? "No matching posts"
            : `${resultCount} matching ${resultCount === 1 ? "post" : "posts"}`}
        </output>
      </div>

      <div className="group/list">
        {Object.entries(filteredPostsByYear)
          .toSorted(([yearA], [yearB]) => Number(yearB) - Number(yearA))
          .map(([year, yearItems]) => (
            <div
              className="flex w-full border-t border-dotted border-border text-sm"
              key={`year-${year}`}
            >
              <h2 className="w-[100px] py-3 text-muted-foreground">{year}</h2>
              <div className="flex w-full flex-col">
                {yearItems.map((item: TimelineItem, index: number) => {
                  const rowClassName = `flex w-full justify-between gap-8 py-3 transition-opacity duration-200 group-has-[a:hover]/list:opacity-50 group-has-[article:hover]/list:opacity-50 hover:!opacity-100 ${
                    index === yearItems.length - 1
                      ? ""
                      : "border-b border-dotted border-border"
                  }`;

                  if (item.type === "X") {
                    const safeXHref = item.x_url
                      ? resolveSafeHref(item.x_url)
                      : null;
                    const xRow = (
                      <>
                        <div className="flex min-w-0 w-full items-baseline gap-1">
                          <span
                            aria-hidden="true"
                            className="inline-flex shrink-0 bg-muted px-1 text-muted-foreground"
                          >
                            X
                          </span>
                          <p className="min-w-0 line-clamp-3 whitespace-pre-wrap">
                            {item.content}
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-muted-foreground">
                          <span>
                            {formatPublishedShortDayMonth(item.date_created)}
                          </span>
                        </div>
                      </>
                    );

                    if (safeXHref) {
                      return (
                        <a
                          aria-label={`X post (opens in a new tab): ${item.title}`}
                          className={rowClassName}
                          href={safeXHref.href}
                          key={`x-${item.slug}-${item.date_created}`}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {xRow}
                        </a>
                      );
                    }

                    return (
                      <article
                        className={rowClassName}
                        key={`x-${item.slug}-${item.date_created}`}
                      >
                        {xRow}
                      </article>
                    );
                  }

                  if (item.type === "Note") {
                    return (
                      <article
                        className={rowClassName}
                        key={`note-${item.slug}-${item.date_created}`}
                      >
                        <div className="w-full space-y-2 bg-yellow-100 p-3 selection:bg-yellow-200 selection:text-yellow-600 dark:bg-yellow-900">
                          <div className="flex justify-between text-sm text-yellow-600 dark:text-yellow-500">
                            <p>Note</p>
                            <p>
                              {formatPublishedShortDayMonth(item.date_created)}
                            </p>
                          </div>
                          <p className="text-left text-yellow-950 dark:text-yellow-100">
                            {item.content}
                          </p>
                        </div>
                      </article>
                    );
                  }

                  const isRecent = isNewPost(item.date_created);

                  return (
                    <a
                      aria-label={
                        isRecent ? `${NEW_POST_TAG}: ${item.title}` : item.title
                      }
                      className={rowClassName}
                      href={`/timeline/${item.slug}`}
                      key={`post-${item.slug}-${item.date_created}`}
                    >
                      <div className="flex min-w-0 w-full items-baseline gap-1">
                        {isRecent && (
                          <span
                            aria-hidden="true"
                            className="inline-flex shrink-0 bg-muted px-1 text-muted-foreground"
                          >
                            {NEW_POST_TAG}
                          </span>
                        )}
                        <p className="min-w-0">{item.title}</p>
                      </div>
                      <div className="whitespace-nowrap text-muted-foreground">
                        <span>
                          {formatPublishedShortDayMonth(item.date_created)}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostRendering;
