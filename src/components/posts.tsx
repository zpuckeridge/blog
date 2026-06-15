"use client";

import { useCallback, useMemo, useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";

import type { TimelineItem } from "@/interfaces/content-item";
import {
  formatPublishedNumericDMY,
  formatPublishedShortDayMonth,
} from "@/lib/format-in-brisbane";
import { substringMatchInsensitive } from "@/lib/substring-match";

import { Input } from "./ui/input";

interface PostsProps {
  postsByYear: Record<number, TimelineItem[]>;
}

const PostRendering: React.FC<PostsProps> = ({ postsByYear }) => {
  const [isAnyPostHovered, setIsAnyPostHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [showNotes, setShowNotes] = useState(true);

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

  const handleMouseEnter = useCallback(() => setIsAnyPostHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsAnyPostHovered(false), []);

  const allTags = useMemo(() => {
    const seen = new Set<string>();
    const ordered: string[] = [];
    for (const items of Object.values(postsByYear)) {
      for (const item of items) {
        for (const tag of item.tags) {
          if (tag && !seen.has(tag)) {
            seen.add(tag);
            ordered.push(tag);
          }
        }
      }
    }
    return ordered.toSorted();
  }, [postsByYear]);

  // Filter posts based on search query, selected tags, and notes toggle
  const filteredPostsByYear: Record<string, TimelineItem[]> = {};
  const query = searchQuery.toLowerCase();
  const [selectedTagSingleton] = selectedTag;
  for (const [year, items] of Object.entries(postsByYear)) {
    const filteredItems = items.filter((item) => {
      const matchesSearch = substringMatchInsensitive(item.title, query);
      const matchesTags =
        selectedTagSingleton === undefined ||
        new Set(item.tags).has(selectedTagSingleton);
      const matchesNotesToggle = showNotes || item.type !== "Note";
      return matchesSearch && matchesTags && matchesNotesToggle;
    });

    if (filteredItems.length > 0) {
      filteredPostsByYear[year] = filteredItems;
    }
  }

  return (
    <div className="flex w-full flex-col">
      <div className="mb-6 space-y-1">
        <div className="group relative flex">
          <div className="has-[+input:not(:placeholder-shown)):-translate-y-1/2 pointer-events-none absolute top-1/2 z-1 block origin-start -translate-y-1/2 cursor-text px-1 text-muted-foreground text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:-translate-y-1/2 group-focus-within:cursor-default group-focus-within:font-normal group-focus-within:text-black group-focus-within:text-sm has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:font-normal has-[+input:not(:placeholder-shown)]:text-sm has-[input:not(:placeholder-shown)]:text-black dark:has-[+input:not(:placeholder-shown)]:text-neutral-300 dark:group-focus-within:text-neutral-300">
            <span className="relative -top-[1px] inline-flex bg-background px-2 text-sm">
              Search
            </span>
          </div>

          <Input
            className="-me-px flex-1 pe-32 text-black text-sm shadow-none dark:text-neutral-300"
            onChange={handleSearchChange}
            placeholder=""
            type="text"
            value={searchQuery}
          />

          <div className="absolute inset-y-px end-px z-10 my-auto flex h-full items-center">
            <button
              className={`inline-flex px-1 text-sm bg-muted hover:bg-muted/80 ${
                showNotes ? "text-muted-foreground" : "text-foreground"
              }`}
              onClick={() => setShowNotes((prev) => !prev)}
              type="button"
            >
              Toggle Notes
            </button>
            <div className="flex h-full w-9 items-center justify-center text-muted-foreground">
              <RxMagnifyingGlass />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {allTags.map((tag) => (
            <button
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
      </div>

      {Object.entries(filteredPostsByYear)
        .toSorted(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, yearItems]) => (
          <div
            className="flex w-full border-t border-dotted border-border text-sm"
            key={`year-${year}`}
          >
            <h2 className="w-[100px] py-3 text-muted-foreground">{year}</h2>
            <div className="flex w-full flex-col">
              {yearItems.map((item: TimelineItem, index: number) =>
                item.type === "Note" ? (
                  <button
                    aria-label={`Timeline note (${formatPublishedNumericDMY(item.date_created)})`}
                    className={`flex w-full justify-between gap-8 py-3 ${
                      index === yearItems.length - 1
                        ? ""
                        : "border-b border-dotted border-border"
                    } group/item`}
                    key={`note-${item.slug}-${item.date_created}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    type="button"
                  >
                    <div
                      className={`w-full space-y-2 bg-yellow-100 p-3 selection:bg-yellow-200 selection:text-yellow-600 dark:bg-yellow-900 ${
                        isAnyPostHovered
                          ? "opacity-50 group-hover/item:opacity-100"
                          : "opacity-100"
                      } transition-opacity duration-200`}
                    >
                      <div className="flex justify-between text-sm text-yellow-600 dark:text-yellow-500">
                        <p>Note</p>
                        <p>{formatPublishedShortDayMonth(item.date_created)}</p>
                      </div>
                      <p className="text-left text-yellow-950 dark:text-yellow-100">
                        {item.content}
                      </p>
                    </div>
                  </button>
                ) : (
                  <a
                    aria-label={item.title}
                    className={`flex w-full justify-between gap-8 py-3 ${
                      index === yearItems.length - 1
                        ? ""
                        : "border-b border-dotted border-border"
                    } group/item`}
                    href={`/timeline/${item.slug}`}
                    key={`post-${item.slug}-${item.date_created}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="w-full">
                      <p
                        className={`${
                          isAnyPostHovered
                            ? "opacity-50 group-hover/item:opacity-100"
                            : "opacity-100"
                        } transition-opacity duration-200`}
                      >
                        {item.title}
                      </p>
                    </div>
                    <div className="whitespace-nowrap text-muted-foreground">
                      <span
                        className={`${
                          isAnyPostHovered
                            ? "opacity-50 group-hover/item:opacity-100"
                            : "opacity-100"
                        } transition-opacity duration-200`}
                      >
                        {formatPublishedShortDayMonth(item.date_created)}
                      </span>
                    </div>
                  </a>
                )
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostRendering;
