"use client";

import { compareDesc } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Credit } from "@/src/interfaces/content-item";
import { ImageZoom } from "./zoom-image";

export default function CreditsPreview({ credits }: { credits: Credit[] }) {
	const sortedCredits = credits.sort((a, b) =>
		compareDesc(new Date(a.release_date), new Date(b.release_date))
	);
	const [expandedCredit, setExpandedCredit] = useState<string | null>(null);

	const toggleCredit = (creditUrl: string) => {
		setExpandedCredit((prev) => (prev === creditUrl ? null : creditUrl));
	};

	return (
		<div className="space-y-2">
			<div className="flex w-full flex-col gap-4">
				<div className="flex w-full flex-row items-center gap-2">
					<p className="text-muted-foreground text-xs">Credits</p>
					<hr className="w-full border-muted-foreground border-dotted" />
					<Link
						className="whitespace-nowrap text-muted-foreground text-xs transition hover:text-blue-400 dark:hover:text-blue-600"
						href="/about/credits"
					>
						See all {sortedCredits.length}
					</Link>
				</div>
				<div className="relative flex h-30 w-full flex-col gap-1 overflow-y-hidden text-sm">
					{sortedCredits.map((credit: Credit) => {
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
											const day = String(date.getDate()).padStart(2, "0");
											const month = String(date.getMonth() + 1).padStart(2, "0");
											const year = date.getFullYear();
											return `${day}-${month}-${year}`;
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
					<div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-20 bg-gradient-to-t from-white dark:from-background" />
				</div>
			</div>
		</div>
	);
}
