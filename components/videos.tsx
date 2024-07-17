"use client";

import { Input } from "@/components/ui/input";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Video {
  asset_id: string;
  playback_id: string;
  title: string;
  duration: number;
  tag: string;
  views: number;
  date: Date;
}

interface Props {
  videos: Video[];
  tags: { tag: string }[];
  itemsPerPage: number;
}

export default function Videos({ videos, itemsPerPage, tags }: Props) {
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

  //   @ts-ignore
  const uniqueTags = [...new Set(tags.map((item: any) => item.tag))];

  return (
    <div className="space-y-20">
      <div className="w-full">
        <Input
          placeholder="Search videos"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div className="md:inline-flex gap-2 grid grid-cols-2 mt-2">
          {uniqueTags.map((tag: any, index: number) => (
            <button
              className={`text-sm ${
                selectedTag === tag
                  ? "text-white"
                  : "text-muted-foreground hover:text-white"
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

      <div className="grid grid-cols-2 gap-4 mt-4">
        {currentVideos
          .filter((video) =>
            video.title.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map((video: Video) => (
            <Link
              href={`/video/${video.asset_id}`}
              title={video.title}
              key={video.asset_id}
            >
              <div className="transform">
                <div className="absolute top-2 left-2 text-white bg-black/75 p-1 text-xs font-semibold ">
                  {video.tag}
                </div>
                <div className="absolute top-2 right-2 text-white bg-black/75 p-1 text-xs font-semibold ">
                  {video.duration ? (
                    <span className="duration">
                      {formatDuration(video.duration)}
                    </span>
                  ) : (
                    <span className="duration">N/A</span>
                  )}
                </div>

                <Image
                  src={`https://image.mux.com/${video.playback_id}/thumbnail.png`}
                  alt={video.title}
                  width={600}
                  height={600}
                  className="aspect-video"
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
                  {video.views} views
                </div>
              </div>
            </Link>
          ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="text-xs text-muted-foreground hover:text-white"
        >
          <ArrowLeftIcon className="inline-flex" /> Prev Page
        </button>

        <button
          onClick={() => setCurrentPage(1)}
          className="text-xs text-muted-foreground hover:text-white"
        >
          {currentPage} of {totalPages}
        </button>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="text-xs text-muted-foreground hover:text-white"
        >
          Next Page <ArrowRightIcon className="inline-flex" />
        </button>
      </div>
    </div>
  );
}
