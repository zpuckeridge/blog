import { useCallback, useState } from "react";

import ContentThumbnail from "@/components/content-thumbnail";
import ExpandableListItem from "@/components/expandable-list-item";
import type { Book } from "@/interfaces/content-item";
import {
  expandableListGridClassName,
  expandableListItemsClassName,
  expandableListMetaClassName,
  expandableListSectionHeaderMainClassName,
  expandableListYearGroupsClassName,
  expandableListYearHeaderClassName,
  expandableListYearPageClassName,
} from "@/lib/expandable-list";
import {
  calendarYearInBrisbane,
  formatDdMm,
  formatDdMmYy,
} from "@/lib/format-in-brisbane";

const BooksAll = ({ books }: { books: Book[] }) => {
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
      <h1 className="font-redaction text-black text-xl dark:text-white">
        Books
      </h1>
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
                    <ExpandableListItem
                      contentClassName="flex flex-row flex-wrap gap-1"
                      date={formatDdMm(book.date_created)}
                      expandedDetailsClassName="max-h-40 opacity-100"
                      id={book.id.toString()}
                      isExpanded={isExpanded}
                      key={book.id}
                      onToggle={handleToggle}
                      title={book.title}
                    >
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
                            {formatDdMmYy(book.published)}
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
                    </ExpandableListItem>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksAll;
