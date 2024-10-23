"use client";

import Link from "next/link";
import { useState } from "react";

interface Post {
  url: string;
  title: string;
  date: string;
}

interface PostsProps {
  postsByYear: Record<number, Post[]>;
}

const PostRendering: React.FC<PostsProps> = ({ postsByYear }) => {
  const [isAnyPostHovered, setIsAnyPostHovered] = useState(false);

  return (
    <div className="flex flex-col w-full group">
      {Object.entries(postsByYear)
        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, yearPosts]) => (
          <div key={year} className="border-t border-muted flex w-full">
            <h2 className="text-muted-foreground w-[100px] py-3">{year}</h2>
            <div className="flex flex-col w-full">
              {yearPosts.map((post: Post, index: number) => (
                <Link
                  key={post.url}
                  href={`${post.url}`}
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
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostRendering;
