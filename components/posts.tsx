"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";
import { Input } from "./ui/input";

interface Post {
  url: string;
  title: string;
  date: string;
  tag: string;
  type: string;
  body: { raw: string };
}

interface PostsProps {
  postsByYear: Record<number, Post[]>;
}

const PostRendering: React.FC<PostsProps> = ({ postsByYear }) => {
  const [isAnyPostHovered, setIsAnyPostHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string[]>([]);

  // Get unique tags from all posts
  const allTags = Array.from(
    new Set(
      Object.values(postsByYear)
        .flat()
        .map((post) => post.tag)
        .filter(Boolean),
    ),
  ).sort();

  // Filter posts based on search query and selected tags
  const filteredPostsByYear = Object.entries(postsByYear).reduce<
    Record<string, Post[]>
  >((acc, [year, posts]) => {
    const filteredPosts = posts.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTags =
        selectedTag.length === 0 ||
        selectedTag.every((tag) => post.tag === tag);
      return matchesSearch && matchesTags;
    });

    if (filteredPosts.length > 0) {
      acc[year] = filteredPosts;
    }
    return acc;
  }, {});

  return (
    <div className="flex flex-col w-full">
      <div className="space-y-2 mb-6">
        <div className="flex group relative">
          <label className="z-[1] pointer-events-none has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)):-translate-y-1/2 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-normal dark:has-[+input:not(:placeholder-shown)]:text-neutral-300 has-[input:not(:placeholder-shown)]:text-black origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:-translate-y-1/2 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-normal group-focus-within:text-black dark:group-focus-within:text-neutral-300">
            <span className="inline-flex text-xs bg-background px-2 relative -top-[1px]">
              Search
            </span>
          </label>
          <Input
            type="text"
            placeholder=""
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="-me-px text-xs flex-1 shadow-none text-black dark:text-neutral-300"
          />

          <div className="absolute text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-300 inset-y-px end-px flex h-full w-9 my-auto items-center justify-center rounded-e-lg disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50">
            <MagnifyingGlassIcon />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={`tag-${tag}`}
              onClick={() =>
                setSelectedTag(selectedTag.includes(tag) ? [] : [tag])
              }
              className={`px-3 py-1 rounded-md text-xs ${
                selectedTag.includes(tag)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {Object.entries(filteredPostsByYear)
        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, yearPosts]) => (
          <div
            key={`year-${year}`}
            className="border-t border-muted text-sm flex w-full"
          >
            <h2 className="text-muted-foreground w-[100px] py-3">{year}</h2>
            <div className="flex flex-col w-full">
              {yearPosts.map((post: Post, index: number) =>
                post.type === "Note" ? (
                  <div
                    key={`note-${post.url}-${post.date}`}
                    className={`flex justify-between w-full py-3 gap-8 ${
                      index === yearPosts.length - 1
                        ? ""
                        : "border-b border-muted"
                    } group/item`}
                    onMouseEnter={() => setIsAnyPostHovered(true)}
                    onMouseLeave={() => setIsAnyPostHovered(false)}
                  >
                    <div
                      className={`bg-yellow-100 dark:bg-yellow-900 p-4 w-full rounded-xl space-y-2 selection:bg-yellow-200 selection:text-yellow-600 ${
                        isAnyPostHovered
                          ? "opacity-50 group-hover/item:opacity-100"
                          : "opacity-100"
                      } transition-opacity`}
                    >
                      <div className="text-xs text-muted-foreground text-yellow-600 dark:text-yellow-500 flex justify-between">
                        <p>Note</p>
                        <p>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                          })}
                        </p>
                      </div>
                      <p className="text-yellow-950 dark:text-yellow-100">
                        {post.body.raw}
                      </p>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={`post-${post.url}-${post.date}`}
                    href={`/timeline${post.url}`}
                    className={`flex justify-between w-full py-3 gap-8 ${
                      index === yearPosts.length - 1
                        ? ""
                        : "border-b border-muted"
                    } group/item`}
                    onMouseEnter={() => setIsAnyPostHovered(true)}
                    onMouseLeave={() => setIsAnyPostHovered(false)}
                  >
                    <div className="w-full">
                      <p
                        className={`${
                          isAnyPostHovered
                            ? "opacity-50 group-hover/item:opacity-100"
                            : "opacity-100"
                        } transition-opacity`}
                      >
                        {post.title}
                      </p>
                    </div>
                    <div className="text-muted-foreground whitespace-nowrap">
                      <span
                        className={`${
                          isAnyPostHovered
                            ? "opacity-50 group-hover/item:opacity-100"
                            : "opacity-100"
                        } transition-opacity`}
                      >
                        {new Date(post.date).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </span>
                    </div>
                  </Link>
                ),
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostRendering;
