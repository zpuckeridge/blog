"use client";

import { compareDesc } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Book } from "@/interfaces/content-item";
import { ImageZoom } from "./zoom-image";

export default function BooksPreview({ books }: { books: Book[] }) {
	const sortedBooks = books.sort((a, b) =>
		compareDesc(new Date(a.date_created), new Date(b.date_created))
	);
	const [expandedBook, setExpandedBook] = useState<string | null>(null);

	const toggleBook = (bookUrl: string) => {
		setExpandedBook((prev) => (prev === bookUrl ? null : bookUrl));
	};

	return (
		<div className="space-y-2">
			<div className="flex w-full flex-col gap-4">
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
				<div className="relative flex h-30 w-full flex-col gap-1 overflow-y-hidden text-sm">
					{sortedBooks.map((book: Book) => {
						const isExpanded = expandedBook === book.id.toString();
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
										{(() => {
											const date = new Date(book.date_created);
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
										{book.image && (
											<div className="relative w-7">
												<ImageZoom>
													<Image
														alt={book.title}
														className="h-full w-full rounded shadow"
														height={150}
														src={`https://directus.obambulo.studio/assets/${book.image}`}
														width={150}
													/>
												</ImageZoom>
											</div>
										)}
										<div className="min-w-20 whitespace-nowrap rounded bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
											<p className="text-[0.7rem] text-muted-foreground">Rating</p>
											<p className="text-sm">{book.rating}/10</p>
										</div>

										{book.isbn && (
											<div className="min-w-20 whitespace-nowrap rounded bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
												<p className="text-[0.7rem] text-muted-foreground">ISBN</p>
												<p className="text-sm">{book.isbn}</p>
											</div>
										)}

										{book.published && (
											<div className="min-w-20 whitespace-nowrap rounded bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
												<p className="text-[0.7rem] text-muted-foreground">Published</p>
												<p className="text-sm">
													{book.published instanceof Date
														? book.published.toLocaleDateString()
														: book.published}
												</p>
											</div>
										)}
										{book.author && (
											<div className="min-w-20 whitespace-nowrap rounded bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
												<p className="text-[0.7rem] text-muted-foreground">Author</p>
												<p className="text-sm">{book.author}</p>
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
