"use client";

import { compareDesc } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import type { Book } from "../interfaces/content-item";

export default function Books({ data, showAll = false }: { data: Book[]; showAll?: boolean }) {
	const sortedBooks = data.sort((a, b) =>
		compareDesc(new Date(a.published), new Date(b.published))
	);
	const [expandedBooks, setExpandedBooks] = useState<Set<string>>(new Set());

	const toggleBook = (bookUrl: string) => {
		setExpandedBooks((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(bookUrl)) {
				newSet.delete(bookUrl);
			} else {
				newSet.add(bookUrl);
			}
			return newSet;
		});
	};

	return (
		<div className="space-y-2">
			<div className="flex w-full flex-col gap-4">
				{!showAll && (
					<div className="flex w-full flex-row items-center gap-2">
						<p className="text-muted-foreground text-xs">Books</p>
						<hr className="w-full border-muted-foreground border-dotted" />
						<Link
							className="whitespace-nowrap text-muted-foreground text-xs transition hover:text-blue-400 dark:hover:text-blue-600"
							href="/about/books"
						>
							See all {sortedBooks.length}
						</Link>
					</div>
				)}
				<div
					className={`flex w-full flex-col gap-1 text-sm ${showAll ? "" : "relative h-30 overflow-y-hidden"}`}
				>
					{sortedBooks.map((book: Book) => {
						const isExpanded = expandedBooks.has(book.id.toString());
						return (
							<div className="space-y-1" key={book.id}>
								<button
									aria-label={`${book.title} - Click to ${isExpanded ? "hide" : "show"} details`}
									className="flex w-full justify-between gap-4 text-left transition hover:text-blue-400 dark:hover:text-blue-600"
									onClick={() => toggleBook(book.id.toString())}
									type="button"
								>
									<p className="line-clamp-1">{book.title}</p>
									<p className="text-muted-foreground">
										{new Date(book.published).toLocaleDateString(undefined, {
											year: "numeric",
											month: "2-digit",
											day: "2-digit",
										})}
									</p>
								</button>
								<div
									className={`overflow-hidden transition-all duration-200 ease-in-out ${
										isExpanded ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
									}`}
								>
									<div className="ml-2 border-muted-foreground/20 border-l-2 pb-1 pl-4">
										<p className="text-muted-foreground text-xs">Rating: {book.rating}/10</p>
									</div>
								</div>
							</div>
						);
					})}
					{!showAll && (
						<div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-20 bg-gradient-to-t from-white dark:from-background" />
					)}
				</div>
			</div>
		</div>
	);
}
