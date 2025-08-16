"use client";

import { compareDesc } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Movie } from "../interfaces/content-item";

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
			<div className="flex flex-col w-full gap-4">
				<div className="flex flex-row w-full gap-2 items-center">
					<p className="text-muted-foreground text-xs">Movies</p>
					<hr className="w-full border-muted-foreground border-dotted" />
					<Link
						href="/about/movies"
						className="text-muted-foreground text-xs hover:text-blue-400 dark:hover:text-blue-600 transition whitespace-nowrap"
					>
						See all {sortedMovies.length}
					</Link>
				</div>
				<div className="flex flex-col w-full gap-1 text-sm h-30 overflow-y-hidden relative">
					{sortedMovies.map((movie: Movie) => {
						const isExpanded = expandedMovie === movie.id.toString();
						return (
							<div key={movie.id} className="space-y-1">
								<button
									type="button"
									onClick={() => toggleMovie(movie.id.toString())}
									aria-label={`${movie.title} - Click to ${isExpanded ? "hide" : "show"} details`}
									className="hover:text-blue-400 dark:hover:text-blue-600 transition flex justify-between gap-4 w-full text-left"
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
											<div className="w-7 relative">
												<Image
													src={movie.image}
													alt={movie.title}
													fill
													className="rounded shadow w-full h-full"
												/>
											</div>
										)}
										<div className="py-1 px-3 min-w-20 dark:bg-neutral-900 bg-neutral-100 rounded">
											<p className="text-[0.7rem] text-muted-foreground">Rating</p>
											<p className="text-sm">{movie.rating}/10</p>
										</div>

										{movie.setting && (
											<div className="py-1 px-3 min-w-20 dark:bg-neutral-900 bg-neutral-100 rounded">
												<p className="text-[0.7rem] text-muted-foreground">Setting</p>
												<p className="text-sm">{movie.setting}</p>
											</div>
										)}

										{movie.with && (
											<div className="py-1 px-3 min-w-20 dark:bg-neutral-900 bg-neutral-100 rounded">
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
					<div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 z-40 bg-gradient-to-t from-white dark:from-background" />
				</div>
			</div>
		</div>
	);
}
