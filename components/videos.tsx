"use client";

import { Input } from "@/components/ui/input";
import { Video } from "@/interfaces/video";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BlurFade from "./magicui/blur-fade";

interface Props {
  videos: Video[];
  itemsPerPage: number;
}

export default function Videos({ videos, itemsPerPage }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentVideos = videos
    .filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((video) => {
      if (selectedTag === "") {
        return true;
      } else {
        return video.tag.includes(selectedTag);
      }
    })
    .slice(startIndex, endIndex);

  const totalPages = Math.ceil(
    videos.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()),
    ).length / itemsPerPage,
  );

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

  // Extract unique tags from videos array
  // @ts-ignore
  const uniqueTags = [...new Set(videos.map((video) => video.tag))];

  return (
    <div className="space-y-20">
      <BlurFade delay={0.1}>
        <div className="w-full">
          <Input
            placeholder="Search videos"
            value={searchTerm}
            className="rounded"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

          <div className="md:inline-flex gap-2 grid grid-cols-2 mt-2">
            {uniqueTags.map((tag, index) => (
              <button
                className={`text-sm ${
                  selectedTag === tag
                    ? "text-blue-500"
                    : "text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition"
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

      <BlurFade delay={0.2}>
        <div className="grid grid-cols-2 gap-6 mt-2">
          {currentVideos
            .filter((video) =>
              video.title.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((video: Video) => (
              <Link
                href={`/video/${video.slug}`}
                title={video.title}
                key={video.slug}
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

      <BlurFade delay={0.3}>
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="text-xs text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition"
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
        </div>
      </BlurFade>
    </div>
  );
}
