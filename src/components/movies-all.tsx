"use client";

import Image from "next/image";
import { useState } from "react";
import type { Movie } from "../interfaces/content-item";

export default function MoviesAll({ movies }: { movies: Movie[] }) {
	// Group movies by year
	const moviesByYear = movies.reduce((acc: Record<number, Movie[]>, movie) => {
		const year = new Date(movie.date).getFullYear();
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year].push(movie);
		return acc;
	}, {});

	// Get years sorted descending
	const years = Object.keys(moviesByYear)
		.map(Number)
		.sort((a, b) => b - a);

	const [expandedMovie, setExpandedMovie] = useState<string | null>(null);

	const toggleMovie = (movieUrl: string) => {
		setExpandedMovie((prev) => (prev === movieUrl ? null : movieUrl));
	};

	return (
		<div className="space-y-20">
			<p className="text-2xl font-semibold font-serif italic">Movies</p>

			<div className="flex flex-col w-full gap-4">
				{years.map((year) => (
					<div key={year}>
						<div className="flex flex-row w-full gap-2 items-center mb-2">
							<p className="text-muted-foreground text-xs">{moviesByYear[year].length}</p>
							<hr className="w-full border-muted-foreground border-dotted" />
							<p className="text-muted-foreground text-xs">{year}</p>
						</div>
						<div className="flex flex-col w-full gap-1 text-sm overflow-y-hidden relative">
							{moviesByYear[year]
								.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
								.map((movie: Movie) => {
									const isExpanded = expandedMovie === movie.url;
									return (
										<div key={movie.url} className="space-y-1">
											<button
												type="button"
												onClick={() => toggleMovie(movie.url)}
												aria-label={`${movie.title} - Click to ${isExpanded ? "hide" : "show"} details`}
												className="hover:text-blue-400 dark:hover:text-blue-600 transition flex justify-between gap-4 w-full text-left"
											>
												<p className="line-clamp-1">{movie.title}</p>
												<p className="text-muted-foreground">
													{(() => {
														const date = new Date(movie.date);
														const month = String(date.getMonth() + 1).padStart(2, "0");
														const day = String(date.getDate()).padStart(2, "0");
														return `${day}-${month}`;
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
														<p className="text-sm">{movie.review}/10</p>
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
																{movie.with.map((person) => person.name).join(", ")}
															</p>
														</div>
													)}
												</div>
											</div>
										</div>
									);
								})}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
