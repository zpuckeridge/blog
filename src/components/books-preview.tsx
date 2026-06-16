"use client";

import { compareDesc } from "date-fns";
import { useCallback, useState } from "react";

import ContentThumbnail from "@/components/content-thumbnail";
import type { Book } from "@/interfaces/content-item";
import {
  expandableListDetailsClassName,
  expandableListPreviewGridClassName,
  expandableListItemClassName,
  expandableListItemExpandedClassName,
  expandableListItemsClassName,
  expandableListMetaClassName,
  expandableListSectionHeaderClassName,
  expandableListSectionHeaderMainClassName,
  expandableListSectionLinkClassName,
  expandableListTitleClassName,
  expandableListTriggerClassName,
} from "@/lib/expandable-list";
import { formatDdMmYy } from "@/lib/format-in-brisbane";

export default function BooksPreview({ books }: { books: Book[] }) {
  const sortedBooks = books.toSorted((a, b) =>
    compareDesc(new Date(a.date_created), new Date(b.date_created))
  );
  const previewBooks = sortedBooks.slice(0, 7);
  const [expandedBook, setExpandedBook] = useState<string | null>(null);

  const handleToggle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.id ?? "";
    setExpandedBook((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="space-y-2">
      <div className={expandableListPreviewGridClassName}>
        <div className={expandableListSectionHeaderClassName}>
          <div className={expandableListSectionHeaderMainClassName}>
            <p className="shrink-0 text-muted-foreground text-sm">Books</p>
            <hr className="min-w-0 flex-1 border-dotted border-border" />
          </div>
          <a
            className={expandableListSectionLinkClassName}
            href="/about/books"
          >
            See all {sortedBooks.length}
          </a>
        </div>
        <div
          className={`${expandableListItemsClassName} relative h-36 overflow-hidden`}
        >
          {previewBooks.map((book: Book) => {
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
                    {formatDdMmYy(book.date_created)}
                  </p>
                </button>
                <div
                  className={`${expandableListDetailsClassName} overflow-hidden transition-all duration-200 ease-in-out ${
                    isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
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
                      <p className="text-sm text-muted-foreground">Rating</p>
                      <p className="text-sm">{book.rating}/10</p>
                    </div>

                    {book.isbn && (
                      <div className="min-w-20 whitespace-nowrap bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
                        <p className="text-sm text-muted-foreground">ISBN</p>
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
                        <p className="text-sm text-muted-foreground">Author</p>
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
