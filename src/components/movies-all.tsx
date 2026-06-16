"use client";

import { useCallback, useState } from "react";

import ContentThumbnail from "@/components/content-thumbnail";
import type { Movie } from "@/interfaces/content-item";
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

export default function MoviesAll({ movies }: { movies: Movie[] }) {
  // Group movies by year
  const moviesByYear: Record<number, Movie[]> = {};
  for (const movie of movies) {
    const year = calendarYearInBrisbane(movie.date_created);
    if (!moviesByYear[year]) {
      moviesByYear[year] = [];
    }
    moviesByYear[year].push(movie);
  }

  // Get years sorted descending
  const years = Object.keys(moviesByYear)
    .map(Number)
    .toSorted((a, b) => b - a);

  const [expandedMovie, setExpandedMovie] = useState<string | null>(null);

  const handleToggle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.id ?? "";
    setExpandedMovie((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className={expandableListYearPageClassName}>
      <p className="font-redaction text-black text-xl dark:text-white">
        Movies
      </p>

      <div className={expandableListYearGroupsClassName}>
        {years.map((year) => (
          <div className={expandableListGridClassName} key={year}>
            <div className={expandableListYearHeaderClassName}>
              <div className={expandableListSectionHeaderMainClassName}>
                <p className="shrink-0 text-muted-foreground text-sm">
                  {moviesByYear[year].length}
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
              {moviesByYear[year]
                .toSorted((a, b) => +b.date_created - +a.date_created)
                .map((movie: Movie) => {
                  const isExpanded = expandedMovie === movie.id.toString();
                  return (
                    <div
                      className={`${expandableListItemClassName} ${isExpanded ? expandableListItemExpandedClassName : ""}`}
                      key={movie.id}
                    >
                      <button
                        aria-label={`${movie.title} - Click to ${isExpanded ? "hide" : "show"} details`}
                        className={expandableListTriggerClassName}
                        data-id={movie.id.toString()}
                        onClick={handleToggle}
                        type="button"
                      >
                        <p className={expandableListTitleClassName}>
                          {movie.title}
                        </p>
                        <p
                          className={`${expandableListMetaClassName} text-muted-foreground`}
                        >
                          {formatDdMm(movie.date_created)}
                        </p>
                      </button>
                      <div
                        className={`${expandableListDetailsClassName} overflow-hidden transition-all duration-200 ease-in-out ${
                          isExpanded
                            ? "max-h-20 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="flex flex-row gap-1">
                          {movie.image && (
                            <ContentThumbnail
                              alt={movie.title}
                              assetId={movie.image}
                            />
                          )}
                          <div className="min-w-20 bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
                            <p className="text-sm text-muted-foreground">
                              Rating
                            </p>
                            <p className="text-sm">{movie.rating}/10</p>
                          </div>

                          {movie.setting && (
                            <div className="min-w-20 bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
                              <p className="text-sm text-muted-foreground">
                                Setting
                              </p>
                              <p className="text-sm">{movie.setting}</p>
                            </div>
                          )}

                          {movie.with && (
                            <div className="min-w-20 bg-neutral-100 px-3 py-1 dark:bg-neutral-900">
                              <p className="text-sm text-muted-foreground">
                                With
                              </p>
                              <p className="text-sm">
                                {(() => {
                                  if (Array.isArray(movie.with)) {
                                    const processedItems = movie.with.map(
                                      (item) => {
                                        // Handle both string and object cases
                                        if (typeof item === "string") {
                                          return item;
                                        }
                                        if (
                                          typeof item === "object" &&
                                          item !== null
                                        ) {
                                          // If it's an object, try to extract a name or title property
                                          const obj = item as Record<
                                            string,
                                            unknown
                                          >;
                                          return (
                                            (obj.name as string) ||
                                            (obj.title as string) ||
                                            (obj.value as string) ||
                                            String(item)
                                          );
                                        }
                                        return String(item);
                                      }
                                    );

                                    // Use "&" for two items, commas for more
                                    if (processedItems.length === 2) {
                                      return processedItems.join(" & ");
                                    }
                                    return processedItems.join(", ");
                                  }
                                  // Handle non-array cases
                                  if (
                                    typeof movie.with === "object" &&
                                    movie.with !== null
                                  ) {
                                    const obj = movie.with as Record<
                                      string,
                                      unknown
                                    >;
                                    return (
                                      (obj.name as string) ||
                                      (obj.title as string) ||
                                      (obj.value as string) ||
                                      String(movie.with)
                                    );
                                  }
                                  return String(movie.with);
                                })()}
                              </p>
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
