"use client";

import Image from "next/image";
import { useState } from "react";
import type { Movie } from "../interfaces/content-item";
import { ImageZoom } from "./zoom-image";

export default function MoviesAll({ movies }: { movies: Movie[] }) {
	// Group movies by year
	const moviesByYear = movies.reduce((acc: Record<number, Movie[]>, movie) => {
		const year = new Date(movie.date_created).getFullYear();
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
			<p className="font-redaction text-white text-xl">Movies</p>

			<div className="flex w-full flex-col gap-4">
				{years.map((year) => (
					<div key={year}>
						<div className="mb-2 flex w-full flex-row items-center gap-2">
							<p className="text-muted-foreground text-xs">{moviesByYear[year].length}</p>
							<hr className="w-full border-muted-foreground border-dotted" />
							<p className="text-muted-foreground text-xs">{year}</p>
						</div>
						<div className="relative flex w-full flex-col gap-1 overflow-y-hidden text-sm">
							{moviesByYear[year]
								.sort(
									(a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
								)
								.map((movie: Movie) => {
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
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
