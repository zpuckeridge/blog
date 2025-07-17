"use client";

import Image from "next/image";
import { useState } from "react";
import type { Book } from "../interfaces/content-item";

export default function BooksAll({ books }: { books: Book[] }) {
	// Group books by year
	const booksByYear = books.reduce((acc: Record<number, Book[]>, book) => {
		const year = new Date(book.date).getFullYear();
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year].push(book);
		return acc;
	}, {});

	// Get years sorted descending
	const years = Object.keys(booksByYear)
		.map(Number)
		.sort((a, b) => b - a);

	const [expandedBook, setExpandedBook] = useState<string | null>(null);

	const toggleBook = (bookUrl: string) => {
		setExpandedBook((prev) => (prev === bookUrl ? null : bookUrl));
	};

	return (
		<div className="space-y-20">
			<p className="text-2xl font-semibold font-serif">Books</p>
			<div className="flex flex-col w-full gap-4">
				{years.map((year) => (
					<div key={year}>
						<div className="flex flex-row w-full gap-2 items-center mb-2">
							<p className="text-muted-foreground text-xs ">{booksByYear[year].length}</p>
							<hr className="w-full border-muted-foreground border-dotted" />
							<p className="text-muted-foreground text-xs ">{year}</p>
						</div>
						<div className="flex flex-col w-full gap-1 text-sm overflow-y-hidden relative">
							{booksByYear[year]
								.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
								.map((book: Book) => {
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
													<div className="py-1 px-3 min-w-20 dark:bg-neutral-900 bg-neutral-100 rounded">
														<p className="text-[0.7rem] text-muted-foreground">Rating</p>
														<p className="text-sm">{book.review}/10</p>
													</div>
													{book.ISBN && (
														<div className="py-1 px-3 min-w-20 dark:bg-neutral-900 bg-neutral-100 rounded">
															<p className="text-[0.7rem] text-muted-foreground">ISBN</p>
															<p className="text-sm">{book.ISBN}</p>
														</div>
													)}
													{book.published && (
														<div className="py-1 px-3 min-w-20 dark:bg-neutral-900 bg-neutral-100 rounded">
															<p className="text-[0.7rem] text-muted-foreground">Published</p>
															<p className="text-sm">{book.published}</p>
														</div>
													)}
													{book.author && (
														<div className="py-1 px-3 min-w-20 dark:bg-neutral-900 bg-neutral-100 rounded">
															<p className="text-[0.7rem] text-muted-foreground">Author</p>
															<p className="text-sm">{book.author}</p>
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
