"use client";

import { useCallback, useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";

import { Switch } from "@/components/ui/switch";
import type { TimelineItem } from "@/interfaces/content-item";

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
      setSelectedTag((prev) => (prev.includes(tag) ? [] : [tag]));
    },
    []
  );

  const handleMouseEnter = useCallback(() => setIsAnyPostHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsAnyPostHovered(false), []);

  // Get unique tags from all posts
  const allTags = [
    ...new Set(
      Object.values(postsByYear)
        .flat()
        .flatMap((item) => item.tags)
        .filter(Boolean)
    ),
  ].toSorted();

  // Filter posts based on search query, selected tags, and notes toggle
  const filteredPostsByYear: Record<string, TimelineItem[]> = {};
  for (const [year, items] of Object.entries(postsByYear)) {
    const filteredItems = items.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTags = selectedTag.every((tag) => item.tags.includes(tag));
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
          <div className="has-[+input:not(:placeholder-shown)):-translate-y-1/2 pointer-events-none absolute top-1/2 z-1 block origin-start -translate-y-1/2 cursor-text px-1 text-muted-foreground text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:-translate-y-1/2 group-focus-within:cursor-default group-focus-within:font-normal group-focus-within:text-black group-focus-within:text-xs has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:font-normal has-[+input:not(:placeholder-shown)]:text-xs has-[input:not(:placeholder-shown)]:text-black dark:has-[+input:not(:placeholder-shown)]:text-neutral-300 dark:group-focus-within:text-neutral-300">
            <span className="relative -top-[1px] inline-flex bg-background px-2 text-xs">
              Search
            </span>
          </div>

          <Input
            className="-me-px flex-1 rounded-lg text-black text-xs shadow-none dark:text-neutral-300"
            onChange={handleSearchChange}
            placeholder=""
            type="text"
            value={searchQuery}
          />

          <div className="absolute inset-y-px end-px my-auto flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground transition-all duration-200 hover:text-blue-400 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:hover:text-blue-600">
            <RxMagnifyingGlass />
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {allTags.map((tag) => (
            <button
              className={`rounded px-2.5 py-0.5 text-xs ${
                selectedTag.includes(tag)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
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

        <div className="flex items-center justify-end gap-2">
          <p className="text-muted-foreground text-xs">Toggle Notes</p>
          <Switch checked={showNotes} onCheckedChange={setShowNotes} />{" "}
        </div>
      </div>

      {Object.entries(filteredPostsByYear)
        .toSorted(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, yearItems]) => (
          <div
            className="flex w-full border-muted-foreground border-t border-dotted text-sm"
            key={`year-${year}`}
          >
            <h2 className="w-[100px] py-3 text-muted-foreground">{year}</h2>
            <div className="flex w-full flex-col">
              {yearItems.map((item: TimelineItem, index: number) =>
                item.type === "Note" ? (
                  <button
                    className={`flex w-full justify-between gap-8 py-3 ${
                      index === yearItems.length - 1
                        ? ""
                        : "border-muted-foreground border-b border-dotted"
                    } group/item`}
                    key={`note-${item.slug}-${item.date_created}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    type="button"
                  >
                    <div
                      className={`w-full space-y-2 rounded-xl bg-yellow-100 p-4 selection:bg-yellow-200 selection:text-yellow-600 dark:bg-yellow-900 ${
                        isAnyPostHovered
                          ? "opacity-50 group-hover/item:opacity-100"
                          : "opacity-100"
                      } transition-opacity`}
                    >
                      <div className="flex justify-between text-xs text-yellow-600 dark:text-yellow-500">
                        <p>Note</p>
                        <p>
                          {new Date(item.date_created).toLocaleDateString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "short",
                            }
                          )}
                        </p>
                      </div>
                      <p className="text-left text-yellow-950 dark:text-yellow-100">
                        {item.content}
                      </p>
                    </div>
                  </button>
                ) : (
                  <a
                    className={`flex w-full justify-between gap-8 py-3 ${
                      index === yearItems.length - 1
                        ? ""
                        : "border-muted-foreground border-b border-dotted"
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
                        } transition-opacity`}
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
                        } transition-opacity`}
                      >
                        {new Date(item.date_created).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "short",
                          }
                        )}
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
