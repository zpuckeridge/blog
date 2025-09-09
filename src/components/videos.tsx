"use client";

import { ArrowLeftIcon, ArrowRightIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Input } from "@/src/components/ui/input";
import type { Video } from "@/src/interfaces/content-item";

type VideosProps = {
	videos: Video[];
	itemsPerPage: number;
};

// Extract search component outside of Videos component
const SearchBar = ({
	searchTerm,
	setSearchTerm,
	setCurrentPage,
}: {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	setCurrentPage: (page: number) => void;
}) => (
	<div className="group relative flex">
		<div className="has-[+input:not(:placeholder-shown)):-translate-y-1/2 -translate-y-1/2 group-focus-within:-translate-y-1/2 pointer-events-none absolute top-1/2 z-1 block origin-start cursor-text px-1 text-muted-foreground text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:font-normal group-focus-within:text-black group-focus-within:text-xs has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:font-normal has-[+input:not(:placeholder-shown)]:text-xs has-[input:not(:placeholder-shown)]:text-black dark:has-[+input:not(:placeholder-shown)]:text-neutral-300 dark:group-focus-within:text-neutral-300">
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
					<span className="-top-[1px] relative inline-flex bg-background px-2 text-xs">
						{alternatives[randomIndex]}
					</span>
				);
			})()}
		</div>
		<Input
			className="-me-px flex-1 rounded-lg text-black text-xs shadow-none dark:text-neutral-300"
			onChange={(e) => {
				setSearchTerm(e.target.value);
				setCurrentPage(1);
			}}
			placeholder=""
			type="text"
			value={searchTerm}
		/>

		<div className="absolute inset-y-px end-px my-auto flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground transition-all duration-200 hover:text-blue-400 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:hover:text-blue-600">
			<MagnifyingGlassIcon />
		</div>
	</div>
);

export default function Videos({ videos, itemsPerPage }: VideosProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedTag, setSelectedTag] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	// Moved useMemo hooks before the early return
	const filteredVideos = useMemo(() => {
		return videos
			.filter((video) => video.title.toLowerCase().includes(searchTerm.toLowerCase()))
			.filter((video) => !selectedTag || video.tags.includes(selectedTag));
	}, [videos, searchTerm, selectedTag]);

	const currentVideos = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return filteredVideos.slice(startIndex, startIndex + itemsPerPage);
	}, [filteredVideos, currentPage, itemsPerPage]);

	const uniqueTags = useMemo(() => {
		return Array.from(new Set(videos?.flatMap((video) => video.tags) || []));
	}, [videos]);

	// Moved the early return after all hooks
	if (!videos?.length) {
		return <div className="py-8 text-center">No videos available</div>;
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

	return (
		<div className="space-y-6">
			<div className="space-y-1">
				<SearchBar
					searchTerm={searchTerm}
					setCurrentPage={setCurrentPage}
					setSearchTerm={setSearchTerm}
				/>
				<div className="flex flex-wrap gap-1">
					{uniqueTags.map((tag) => (
						<button
							className={`rounded px-2.5 py-0.5 text-xs ${
								selectedTag === tag
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
							type="button"
						>
							{tag}
						</button>
					))}
				</div>
			</div>

			<div className="mt-2 grid grid-cols-2 gap-4">
				{currentVideos.map((video: Video) => (
					<Link
						className="group relative rounded transition-all duration-200 hover:grayscale"
						href={`/video/${video.slug}`}
						key={video.slug}
						title={video.title}
					>
						<div className="transform">
							<div className="absolute top-2 left-2 z-10 rounded bg-muted/60 px-2.5 py-0.5 text-xs backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-0 dark:bg-neutral-900/60">
								{video.tags.join(", ")}
							</div>
							<div className="absolute top-2 right-2 z-10 rounded bg-muted/60 px-2.5 py-0.5 text-xs backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-0 dark:bg-neutral-900/60">
								{video.duration ? (
									<span className="duration">{formatDuration(video.duration)}</span>
								) : (
									<span className="duration">N/A</span>
								)}
							</div>

							<div className="aspect-video overflow-hidden rounded-lg transition-all duration-200 group-hover:drop-shadow-2xl">
								<Image
									alt={video.title}
									className="aspect-video rounded-lg transition-all duration-200 group-hover:scale-110"
									height={600}
									priority={true}
									src={`https://image.mux.com/${video.playback_id}/thumbnail.png`}
									width={600}
								/>
							</div>
							<div className="mt-1 flex justify-between">
								<div className="truncate text-sm">{video.title}</div>
							</div>
							<div className="flex justify-between text-muted-foreground text-xs">
								<p>
									{new Date(video.date_created).toLocaleDateString("en-US", {
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
				<nav aria-label="Pagination" className="mt-4 flex justify-between">
					<button
						aria-label="Previous page"
						className="text-muted-foreground text-xs transition hover:text-blue-400 dark:hover:text-blue-600"
						disabled={currentPage === 1}
						onClick={handlePrevPage}
						type="button"
					>
						<ArrowLeftIcon className="inline-flex" /> Prev Page
					</button>
					<button
						className="text-muted-foreground text-xs transition hover:text-blue-400 dark:hover:text-blue-600"
						onClick={() => setCurrentPage(1)}
						type="button"
					>
						{currentPage} of {totalPages}
					</button>
					<button
						className="text-muted-foreground text-xs transition hover:text-blue-400 dark:hover:text-blue-600"
						disabled={currentPage === totalPages}
						onClick={handleNextPage}
						type="button"
					>
						Next Page <ArrowRightIcon className="inline-flex" />
					</button>
				</nav>
			)}
		</div>
	);
}
