"use client";

import { Input } from "@/components/ui/input";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import BlurFade from "./magicui/blur-fade";

// Add proper interfaces at the top
interface Video {
  title: string;
  url: string;
  tag: string;
  videoUrl: string;
  duration: number;
  date: string;
}

interface VideosProps {
  videos: Video[];
  itemsPerPage: number;
}

// Update the component signature with proper typing
export default function Videos({ videos, itemsPerPage }: VideosProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Moved useMemo hooks before the early return
  const filteredVideos = useMemo(() => {
    return videos
      .filter((video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .filter((video) => !selectedTag || video.tag.includes(selectedTag));
  }, [videos, searchTerm, selectedTag]);

  const currentVideos = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredVideos.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredVideos, currentPage, itemsPerPage]);

  const uniqueTags = useMemo(() => {
    return Array.from(new Set(videos?.map((video) => video.tag) || []));
  }, [videos]);

  // Moved the early return after all hooks
  if (!videos?.length) {
    return <div className="text-center py-8">No videos available</div>;
  }

  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Extract search component
  const SearchBar = () => (
    <div className="flex group relative">
      <label htmlFor="video-search" className="sr-only">
        Search videos
      </label>
      <Input
        id="video-search"
        type="text"
        placeholder="Search videos..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="-me-px text-xs flex-1 shadow-none text-black dark:text-neutral-300"
        aria-label="Search videos"
      />
      <div className="absolute text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-300 inset-y-px end-px flex h-full w-9 my-auto items-center justify-center rounded-e-lg disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50">
        <MagnifyingGlassIcon />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <BlurFade delay={0.3}>
        <div className="space-y-2">
          <SearchBar />
          <div className="flex flex-wrap gap-2">
            {uniqueTags.map((tag, index) => (
              <button
                className={`px-3 py-1 rounded-md text-xs ${
                  selectedTag.includes(tag)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                key={index}
                onClick={() => {
                  if (selectedTag === tag) {
                    setSelectedTag("");
                    setCurrentPage(1);
                  } else {
                    setSelectedTag(tag);
                    setCurrentPage(1);
                  }
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.4}>
        <div className="grid grid-cols-2 gap-6 mt-2">
          {currentVideos.map((video: Video) => (
            <Link
              href={`/video${video.url}`}
              title={video.title}
              key={video.url}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              <div className="transform">
                <div className="absolute top-2 left-2 text-white bg-black/75 rounded p-1 text-xs font-semibold ">
                  {video.tag}
                </div>
                <div className="absolute top-2 right-2 text-white bg-black/75 rounded p-1 text-xs font-semibold ">
                  {video.duration ? (
                    <span className="duration">
                      {formatDuration(video.duration)}
                    </span>
                  ) : (
                    <span className="duration">N/A</span>
                  )}
                </div>

                <Image
                  src={`https://image.mux.com/${video.videoUrl}/thumbnail.png`}
                  alt={video.title}
                  width={600}
                  height={600}
                  className="aspect-video rounded"
                  priority={true}
                />
                <div className="flex justify-between mt-1">
                  <div className="font-semibold text-sm truncate ">
                    {video.title}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <p>
                    {new Date(video.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </BlurFade>

      {totalPages > 1 && (
        <BlurFade delay={0.5}>
          <nav aria-label="Pagination" className="flex justify-between mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="text-xs text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition"
              aria-label="Previous page"
            >
              <ArrowLeftIcon className="inline-flex" /> Prev Page
            </button>
            <button
              onClick={() => setCurrentPage(1)}
              className="text-xs text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition"
            >
              {currentPage} of {totalPages}
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="text-xs text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition"
            >
              Next Page <ArrowRightIcon className="inline-flex" />
            </button>
          </nav>
        </BlurFade>
      )}
    </div>
  );
}
