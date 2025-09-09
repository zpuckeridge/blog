"use client";

import Image from "next/image";
import { useState } from "react";
import type { Credit } from "../interfaces/content-item";
import { ImageZoom } from "./zoom-image";

export default function CreditsAll({ credits }: { credits: Credit[] }) {
	// Group credits by year
	const creditsByYear = credits.reduce((acc: Record<number, Credit[]>, credit) => {
		const year = new Date(credit.release_date).getFullYear();
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year].push(credit);
		return acc;
	}, {});

	// Get years sorted descending
	const years = Object.keys(creditsByYear)
		.map(Number)
		.sort((a, b) => b - a);

	const [expandedCredit, setExpandedCredit] = useState<string | null>(null);

	const toggleCredit = (creditUrl: string) => {
		setExpandedCredit((prev) => (prev === creditUrl ? null : creditUrl));
	};

	return (
		<div className="space-y-20">
			<p className="font-redaction text-white text-xl">Credits</p>
			<div className="flex w-full flex-col gap-4">
				{years.map((year) => (
					<div key={year}>
						<div className="mb-2 flex w-full flex-row items-center gap-2">
							<p className="text-muted-foreground text-xs">{creditsByYear[year].length}</p>
							<hr className="w-full border-muted-foreground border-dotted" />
							<p className="text-muted-foreground text-xs">{year}</p>
						</div>
						<div className="relative flex w-full flex-col gap-1 overflow-y-hidden text-sm">
							{creditsByYear[year]
								.sort(
									(a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
								)
								.map((credit: Credit) => {
									const isExpanded = expandedCredit === credit.id.toString();
									return (
										<div className="space-y-1" key={credit.id}>
											<button
												aria-label={`${credit.title} - Click to ${isExpanded ? "hide" : "show"} details`}
												className="flex w-full justify-between gap-4 text-left transition hover:text-blue-400 dark:hover:text-blue-600"
												onClick={() => toggleCredit(credit.id.toString())}
												type="button"
											>
												<p className="line-clamp-1">{credit.title}</p>
												<p className="text-muted-foreground">
													{(() => {
														const date = new Date(credit.release_date);
														const month = String(date.getMonth() + 1).padStart(2, "0");
														const day = String(date.getDate()).padStart(2, "0");
														return `${day}-${month}`;
													})()}
												</p>
											</button>
											<div
												className={`overflow-hidden transition-all duration-200 ease-in-out ${
													isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
												}`}
											>
												<div className="flex flex-row flex-wrap gap-1">
													{credit.image && (
														<div className="relative w-7">
															<ImageZoom>
																<Image
																	alt={credit.title}
																	className="h-full w-full rounded shadow"
																	height={150}
																	src={`https://directus.obambulo.studio/assets/${credit.image}`}
																	width={150}
																/>
															</ImageZoom>
														</div>
													)}

													{credit.director && (
														<div className="min-w-20 whitespace-nowrap rounded bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
															<p className="text-[0.7rem] text-muted-foreground">Director</p>
															<p className="text-sm">{credit.director}</p>
														</div>
													)}

													{credit.tags && (
														<div className="min-w-20 whitespace-nowrap rounded bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
															<p className="text-[0.7rem] text-muted-foreground">
																{credit.tags.length === 1 ? "Tag" : "Tags"}
															</p>

															{credit.tags.map((tag: string, idx: number) => (
																<span key={tag}>
																	{tag}
																	{idx < credit.tags.length - 1 && ", "}
																</span>
															))}
														</div>
													)}

													{credit.link && (
														<div className="min-w-20 whitespace-nowrap rounded bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
															<p className="text-[0.7rem] text-muted-foreground">Link</p>
															<a
																className="text-sm"
																href={credit.link}
																rel="noopener noreferrer"
																target="_blank"
															>
																RSP
															</a>
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
