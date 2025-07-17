"use client";

import { ArrowLeftIcon, ArrowRightIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Input } from "@/src/components/ui/input";

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
			.filter((video) => video.title.toLowerCase().includes(searchTerm.toLowerCase()))
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
			<div className="z-1 pointer-events-none has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)):-translate-y-1/2 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-normal dark:has-[+input:not(:placeholder-shown)]:text-neutral-300 has-[input:not(:placeholder-shown)]:text-black origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:-translate-y-1/2 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-normal group-focus-within:text-black dark:group-focus-within:text-neutral-300">
				{(() => {
					const alternatives = [
						"Search the ether",
						"Find the funny bits",
						"Scour the archives",
						"Summon a video",
						"Unleash the memes",
						"Probe the pixels",
						"Quest for content",
					];
					const randomIndex = Math.floor(Math.random() * alternatives.length);
					return (
						<span className="inline-flex text-xs bg-background px-2 relative -top-[1px]">
							{alternatives[randomIndex]}
						</span>
					);
				})()}
			</div>
			<Input
				type="text"
				placeholder=""
				value={searchTerm}
				onChange={(e) => {
					setSearchTerm(e.target.value);
					setCurrentPage(1);
				}}
				className="-me-px text-xs flex-1 shadow-none text-black dark:text-neutral-300 rounded-lg"
			/>

			<div className="absolute text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-300 inset-y-px end-px flex h-full w-9 my-auto items-center justify-center rounded-e-lg disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50">
				<MagnifyingGlassIcon />
			</div>
		</div>
	);

	return (
		<div className="space-y-6">
			<div className="space-y-1">
				<SearchBar />
				<div className="flex flex-wrap gap-1">
					{uniqueTags.map((tag) => (
						<button
							type="button"
							className={`px-2.5 py-0.5 rounded text-xs ${
								selectedTag.includes(tag)
									? "bg-primary text-primary-foreground"
									: "bg-muted text-muted-foreground hover:bg-muted/80"
							}`}
							key={tag}
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

			<div className="grid grid-cols-2 gap-4 mt-2">
				{currentVideos.map((video: Video) => (
					<Link
						href={`/video${video.url}`}
						title={video.title}
						key={video.url}
						className="relative rounded hover:grayscale transition-all duration-300 group "
					>
						<div className="transform">
							<div className="z-10 absolute top-2 left-2 bg-muted/60 dark:bg-neutral-900/60 backdrop-blur-sm rounded px-2.5 py-0.5 text-xs transition-opacity duration-300 group-hover:opacity-0">
								{video.tag}
							</div>
							<div className="z-10 absolute top-2 right-2 bg-muted/60 dark:bg-neutral-900/60 backdrop-blur-sm rounded px-2.5 py-0.5 text-xs transition-opacity duration-300 group-hover:opacity-0">
								{video.duration ? (
									<span className="duration">{formatDuration(video.duration)}</span>
								) : (
									<span className="duration">N/A</span>
								)}
							</div>

							<div className="aspect-video rounded-lg overflow-hidden group-hover:drop-shadow-2xl transition-all duration-300">
								<Image
									src={`https://image.mux.com/${video.videoUrl}/thumbnail.png`}
									alt={video.title}
									width={600}
									height={600}
									className="aspect-video rounded-lg group-hover:scale-110 transition-all duration-300"
									priority={true}
								/>
							</div>
							<div className="flex justify-between mt-1">
								<div className="text-sm truncate ">{video.title}</div>
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

			{totalPages > 1 && (
				<nav aria-label="Pagination" className="flex justify-between mt-4">
					<button
						type="button"
						onClick={handlePrevPage}
						disabled={currentPage === 1}
						className="text-xs text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition"
						aria-label="Previous page"
					>
						<ArrowLeftIcon className="inline-flex" /> Prev Page
					</button>
					<button
						type="button"
						onClick={() => setCurrentPage(1)}
						className="text-xs text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition"
					>
						{currentPage} of {totalPages}
					</button>
					<button
						type="button"
						onClick={handleNextPage}
						disabled={currentPage === totalPages}
						className="text-xs text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition"
					>
						Next Page <ArrowRightIcon className="inline-flex" />
					</button>
				</nav>
			)}
		</div>
	);
}
