"use client";

import Link from "next/link";
import { useState } from "react";

interface Post {
  slug: string;
  title: string;
  date: string;
}

interface PostsProps {
  postsByYear: Record<number, Post[]>;
}

const PostRendering: React.FC<PostsProps> = ({ postsByYear }) => {
  const [hoveredIndex, setHoveredIndex] = useState<
    Record<string, number | null>
  >({}); // Change state to track hovered index per year

  return (
    <div className="flex flex-col w-full group ">
      {Object.entries(postsByYear)
        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA)) // Sort years in descending order
        .map(([year, yearPosts]) => (
          <div key={year} className="border-t border-muted flex w-full">
            <h2 className="text-muted-foreground w-[100px] py-3">{year}</h2>
            <div className="flex flex-col w-full">
              {yearPosts.map((post: Post, index: number) => (
                <Link
                  key={post.slug}
                  href={`/timeline/${post.slug}`}
                  className={`flex justify-between w-full py-3 gap-8 ${index === yearPosts.length - 1 ? "" : "border-b border-muted"}`}
                  onMouseEnter={() =>
                    setHoveredIndex((prev) => ({ ...prev, [year]: index }))
                  } // Set hovered index for the specific year
                  onMouseLeave={() =>
                    setHoveredIndex((prev) => ({ ...prev, [year]: null }))
                  } // Reset hovered index for the specific year
                >
                  <div className="w-full group">
                    <p
                      className={`opacity-100 ${hoveredIndex[year] === index ? "" : "group-hover:opacity-50"} transition-all line-clamp-2`} // Change condition to use hoveredIndex for the specific year
                    >
                      {post.title}
                    </p>
                  </div>
                  <div className="text-muted-foreground whitespace-nowrap">
                    <span
                      className={`opacity-100 ${hoveredIndex[year] === index ? "" : "group-hover:opacity-50"} transition-all`}
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
