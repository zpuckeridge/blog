"use client";

import { compareDesc } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Movie } from "../interfaces/content-item";
import { ImageZoom } from "./zoom-image";

export default function MoviesPreview({ movies }: { movies: Movie[] }) {
	const sortedMovies = movies.sort((a, b) =>
		compareDesc(new Date(a.date_created), new Date(b.date_created))
	);
	const [expandedMovie, setExpandedMovie] = useState<string | null>(null);

	const toggleMovie = (movieUrl: string) => {
		setExpandedMovie((prev) => (prev === movieUrl ? null : movieUrl));
	};

	return (
		<div className="space-y-2">
			<div className="flex w-full flex-col gap-4">
				<div className="flex w-full flex-row items-center gap-2">
					<p className="text-muted-foreground text-xs">Movies</p>
					<hr className="w-full border-muted-foreground border-dotted" />
					<Link
						className="whitespace-nowrap text-muted-foreground text-xs transition hover:text-blue-400 dark:hover:text-blue-600"
						href="/about/movies"
					>
						See all {sortedMovies.length}
					</Link>
				</div>
				<div className="relative flex h-30 w-full flex-col gap-1 overflow-y-hidden text-sm">
					{sortedMovies.map((movie: Movie) => {
						const isExpanded = expandedMovie === movie.id.toString();
						return (
							<div className="space-y-1" key={movie.id}>
								<button
									aria-label={`${movie.title} - Click to ${isExpanded ? "hide" : "show"} details`}
									className="flex w-full justify-between gap-4 text-left transition hover:text-blue-400 dark:hover:text-blue-600"
									onClick={() => toggleMovie(movie.id.toString())}
									type="button"
								>
									<p className="line-clamp-1">{movie.title}</p>
									<p className="text-muted-foreground">
										{(() => {
											const date = new Date(movie.date_created);
											const day = String(date.getDate()).padStart(2, "0");
											const month = String(date.getMonth() + 1).padStart(2, "0");
											const year = date.getFullYear();
											return `${day}-${month}-${year}`;
										})()}
									</p>
								</button>
								<div
									className={`overflow-hidden transition-all duration-200 ease-in-out ${
										isExpanded ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
									}`}
								>
									<div className="flex flex-row gap-1">
										{movie.image && (
											<div className="relative w-7">
												<ImageZoom>
													<Image
														alt={movie.title}
														className="h-full w-full rounded shadow"
														height={150}
														src={`https://directus.obambulo.studio/assets/${movie.image}`}
														width={150}
													/>
												</ImageZoom>
											</div>
										)}
										<div className="min-w-20 rounded bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
											<p className="text-[0.7rem] text-muted-foreground">Rating</p>
											<p className="text-sm">{movie.rating}/10</p>
										</div>

										{movie.setting && (
											<div className="min-w-20 rounded bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
												<p className="text-[0.7rem] text-muted-foreground">Setting</p>
												<p className="text-sm">{movie.setting}</p>
											</div>
										)}

										{movie.with && (
											<div className="min-w-20 rounded bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
												<p className="text-[0.7rem] text-muted-foreground">With</p>
												<p className="text-sm">
													{Array.isArray(movie.with) ? movie.with.join(", ") : movie.with}
												</p>
											</div>
										)}
									</div>
								</div>
							</div>
						);
					})}
					<div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-20 bg-gradient-to-t from-white dark:from-background" />
				</div>
			</div>
		</div>
	);
}
