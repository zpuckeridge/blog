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
			<div className="flex flex-col w-full gap-4">
				<div className="flex flex-row w-full gap-2 items-center">
					<p className="text-muted-foreground text-xs">Credits</p>
					<hr className="w-full border-muted-foreground border-dotted" />
					<Link
						href="/about/credits"
						className="text-muted-foreground text-xs hover:text-blue-400 dark:hover:text-blue-600 transition whitespace-nowrap"
					>
						See all {sortedCredits.length}
					</Link>
				</div>
				<div className="flex flex-col w-full gap-1 text-sm h-30 overflow-y-hidden relative">
					{sortedCredits.map((credit: Credit) => {
						const isExpanded = expandedCredit === credit.id.toString();
						return (
							<div key={credit.id} className="space-y-1">
								<button
									type="button"
									onClick={() => toggleCredit(credit.id.toString())}
									aria-label={`${credit.title} - Click to ${isExpanded ? "hide" : "show"} details`}
									className="hover:text-blue-400 dark:hover:text-blue-600 transition flex justify-between gap-4 w-full text-left"
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
											<div className="w-7 relative">
												<ImageZoom>
													<Image
														src={`https://directus.obambulo.studio/assets/${credit.image}`}
														alt={credit.title}
														width={150}
														height={150}
														className="rounded shadow w-full h-full"
													/>
												</ImageZoom>
											</div>
										)}

										{credit.director && (
											<div className="py-1 px-3 min-w-20 dark:bg-neutral-900 bg-neutral-100 rounded whitespace-nowrap">
												<p className="text-[0.7rem] text-muted-foreground">Director</p>
												<p className="text-sm">{credit.director}</p>
											</div>
										)}

										{credit.tags && (
											<div className="py-1 px-3 min-w-20 dark:bg-neutral-900 bg-neutral-100 rounded whitespace-nowrap">
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
											<div className="py-1 px-3 min-w-20 dark:bg-neutral-900 bg-neutral-100 rounded whitespace-nowrap">
												<p className="text-[0.7rem] text-muted-foreground">Link</p>
												<a
													href={credit.link}
													className="text-sm"
													target="_blank"
													rel="noopener noreferrer"
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
					<div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 z-40 bg-gradient-to-t from-white dark:from-background" />
				</div>
			</div>
		</div>
	);
}
