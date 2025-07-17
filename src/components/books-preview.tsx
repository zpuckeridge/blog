"use client";

import { compareDesc } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Book } from "../interfaces/content-item";

export default function BooksPreview({ books }: { books: Book[] }) {
	const sortedBooks = books.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
	const [expandedBook, setExpandedBook] = useState<string | null>(null);

	const toggleBook = (bookUrl: string) => {
		setExpandedBook((prev) => (prev === bookUrl ? null : bookUrl));
	};

	return (
		<div className="space-y-2">
			<div className="flex flex-col w-full gap-4">
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
				<div className="flex flex-col w-full gap-1 text-sm h-30 overflow-y-hidden relative">
					{sortedBooks.map((book: Book) => {
						const isExpanded = expandedBook === book.url;
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
										{(() => {
											const date = new Date(book.date);
											const day = String(date.getDate()).padStart(2, "0");
											const month = String(date.getMonth() + 1).padStart(2, "0");
											const year = date.getFullYear();
											return `${day}-${month}-${year}`;
										})()}
									</p>
								</button>
								<div
									className={`overflow-hidden transition-all duration-300 ease-in-out ${
										isExpanded ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
									}`}
								>
									<div className="flex flex-row gap-1">
										{book.image && (
											<div className="w-7 relative">
												<Image
													src={book.image}
													alt={book.title}
													fill
													className="rounded shadow w-full h-full"
												/>
											</div>
										)}
										<div className="py-1 px-3 min-w-20 bg-neutral-900 rounded">
											<p className="text-[0.7rem] text-muted-foreground">Rating</p>
											<p className="text-sm">{book.review}/10</p>
										</div>

										{book.ISBN && (
											<div className="py-1 px-3 min-w-20 bg-neutral-900 rounded">
												<p className="text-[0.7rem] text-muted-foreground">ISBN</p>
												<p className="text-sm">{book.ISBN}</p>
											</div>
										)}

										{book.published && (
											<div className="py-1 px-3 min-w-20 bg-neutral-900 rounded">
												<p className="text-[0.7rem] text-muted-foreground">Published</p>
												<p className="text-sm">{book.published}</p>
											</div>
										)}
										{book.author && (
											<div className="py-1 px-3 min-w-20 bg-neutral-900 rounded">
												<p className="text-[0.7rem] text-muted-foreground">Author</p>
												<p className="text-sm">{book.author}</p>
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
