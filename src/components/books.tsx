"use client";

import { compareDesc } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import type { Book } from "../interfaces/content-item";

export default function Books({ data, showAll = false }: { data: Book[]; showAll?: boolean }) {
	const sortedBooks = data.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
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
			<div className="flex flex-col w-full gap-4">
				{!showAll && (
					<div className="flex flex-row w-full gap-2 items-center">
						<p className="text-muted-foreground text-xs">Books</p>
						<hr className="w-full border-muted-foreground border-dotted" />
						<Link
							href="/about/books"
							className="text-muted-foreground text-xs hover:text-blue-400 dark:hover:text-blue-600 transition whitespace-nowrap"
						>
							See all {sortedBooks.length}
						</Link>
					</div>
				)}
				<div
					className={`flex flex-col w-full gap-1 text-sm ${!showAll ? "h-30 overflow-y-hidden relative" : ""}`}
				>
					{sortedBooks.map((book: Book) => {
						const isExpanded = expandedBooks.has(book.url);
						return (
							<div key={book.url} className="space-y-1">
								<button
									type="button"
									onClick={() => toggleBook(book.url)}
									aria-label={`${book.title} - Click to ${isExpanded ? "hide" : "show"} details`}
									className="hover:text-blue-400 dark:hover:text-blue-600 transition flex justify-between gap-4 w-full text-left"
								>
									<p className="line-clamp-1">{book.title}</p>
									<p className="text-muted-foreground">
										{new Date(book.date).toLocaleDateString(undefined, {
											year: "numeric",
											month: "2-digit",
											day: "2-digit",
										})}
									</p>
								</button>
								<div
									className={`overflow-hidden transition-all duration-300 ease-in-out ${
										isExpanded ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
									}`}
								>
									<div className="pl-4 border-l-2 border-muted-foreground/20 ml-2 pb-1">
										<p className="text-xs text-muted-foreground">Rating: {book.review}/10</p>
									</div>
								</div>
							</div>
						);
					})}
					{!showAll && (
						<div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 z-40 bg-gradient-to-t from-white dark:from-background" />
					)}
				</div>
			</div>
		</div>
	);
}
