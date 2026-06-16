"use client";

import { useCallback, useState } from "react";

import ContentThumbnail from "@/components/content-thumbnail";
import type { Book } from "@/interfaces/content-item";
import {
  expandableListDetailsClassName,
  expandableListGridClassName,
  expandableListItemClassName,
  expandableListItemExpandedClassName,
  expandableListItemsClassName,
  expandableListMetaClassName,
  expandableListSectionHeaderMainClassName,
  expandableListTitleClassName,
  expandableListTriggerClassName,
  expandableListYearGroupsClassName,
  expandableListYearHeaderClassName,
  expandableListYearPageClassName,
} from "@/lib/expandable-list";
import { calendarYearInBrisbane, formatDdMm } from "@/lib/format-in-brisbane";

export default function BooksAll({ books }: { books: Book[] }) {
  // Group books by year
  const booksByYear: Record<number, Book[]> = {};
  for (const book of books) {
    const year = calendarYearInBrisbane(book.date_created);
    if (!booksByYear[year]) {
      booksByYear[year] = [];
    }
    booksByYear[year].push(book);
  }

  // Get years sorted descending
  const years = Object.keys(booksByYear)
    .map(Number)
    .toSorted((a, b) => b - a);

  const [expandedBook, setExpandedBook] = useState<string | null>(null);

  const handleToggle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.id ?? "";
    setExpandedBook((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className={expandableListYearPageClassName}>
      <p className="font-redaction text-black text-xl dark:text-white">Books</p>
      <div className={expandableListYearGroupsClassName}>
        {years.map((year) => (
          <div className={expandableListGridClassName} key={year}>
            <div className={expandableListYearHeaderClassName}>
              <div className={expandableListSectionHeaderMainClassName}>
                <p className="shrink-0 text-muted-foreground text-sm">
                  {booksByYear[year].length}
                </p>
                <hr className="min-w-0 flex-1 border-dotted border-border" />
              </div>
              <p
                className={`${expandableListMetaClassName} text-muted-foreground text-sm`}
              >
                {year}
              </p>
            </div>
            <div className={expandableListItemsClassName}>
              {booksByYear[year]
                .toSorted((a, b) => +b.date_created - +a.date_created)
                .map((book: Book) => {
                  const isExpanded = expandedBook === book.id.toString();
                  return (
                    <div
                      className={`${expandableListItemClassName} ${isExpanded ? expandableListItemExpandedClassName : ""}`}
                      key={book.id}
                    >
                      <button
                        aria-label={`${book.title} - Click to ${isExpanded ? "hide" : "show"} details`}
                        className={expandableListTriggerClassName}
                        data-id={book.id.toString()}
                        onClick={handleToggle}
                        type="button"
                      >
                        <p className={expandableListTitleClassName}>{book.title}</p>
                        <p
                          className={`${expandableListMetaClassName} text-muted-foreground`}
                        >
                          {formatDdMm(book.date_created)}
                        </p>
                      </button>
                      <div
                        className={`${expandableListDetailsClassName} overflow-hidden transition-all duration-200 ease-in-out ${
                          isExpanded
                            ? "max-h-40 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="flex flex-row flex-wrap gap-1">
                          {book.image && (
                            <ContentThumbnail
                              alt={book.title}
                              assetId={book.image}
                            />
                          )}
                          <div className="min-w-20 whitespace-nowrap bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
                            <p className="text-sm text-muted-foreground">
                              Rating
                            </p>
                            <p className="text-sm">{book.rating}/10</p>
                          </div>
                          {book.isbn && (
                            <div className="min-w-20 whitespace-nowrap bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
                              <p className="text-sm text-muted-foreground">
                                ISBN
                              </p>
                              <p className="text-sm">{book.isbn}</p>
                            </div>
                          )}
                          {book.published && (
                            <div className="min-w-20 whitespace-nowrap bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
                              <p className="text-sm text-muted-foreground">
                                Published
                              </p>
                              <p className="text-sm">
                                {book.published instanceof Date
                                  ? book.published.toLocaleDateString()
                                  : book.published}
                              </p>
                            </div>
                          )}
                          {book.author && (
                            <div className="min-w-20 whitespace-nowrap bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
                              <p className="text-sm text-muted-foreground">
                                Author
                              </p>
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
